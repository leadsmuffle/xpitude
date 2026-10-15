const nodemailer = require("nodemailer");

let transport = null;

function getTransport() {
  if (transport) return transport;
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;
  if (!SMTP_HOST) return null;
  const port = Number(SMTP_PORT) || 587;
  transport = nodemailer.createTransport({
    host: SMTP_HOST,
    port,
    secure: port === 465,
    auth: SMTP_USER ? { user: SMTP_USER, pass: SMTP_PASS } : undefined,
  });
  return transport;
}

const esc = (s) => String(s == null ? "" : s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
// Strip line breaks so user input can never add a header.
const oneLine = (s) => String(s == null ? "" : s).replace(/[\r\n]+/g, " ").trim();

/**
 * Sends the company notification and the customer auto-reply.
 * Never throws: an enquiry that is saved must not fail because mail is down.
 */
async function sendEnquiryEmails(enquiry, site, typeLabel) {
  const t = getTransport();
  if (!t) {
    console.log("[mail] SMTP not configured, skipping emails for enquiry", String(enquiry._id));
    return { sent: false, reason: "smtp-not-configured" };
  }
  const from = `"${site.name}" <${process.env.SMTP_FROM || process.env.SMTP_USER || site.email}>`;
  const notify = process.env.NOTIFY_EMAIL || site.email;
  const rows = [
    ["Name", enquiry.name], ["Country", enquiry.country], ["Group size", enquiry.groupSize],
    ["Travel type", typeLabel], ["Destination", enquiry.destination],
    ["Email", enquiry.email], ["Phone", enquiry.phone], ["Message", enquiry.message],
  ].filter((r) => r[1]);

  const jobs = [];
  if (notify) {
    jobs.push(t.sendMail({
      from, to: notify, replyTo: oneLine(enquiry.email),
      subject: oneLine(`New enquiry: ${enquiry.name}, ${enquiry.destination || typeLabel}`),
      text: rows.map((r) => `${r[0]}: ${r[1]}`).join("\n") + `\n\nOpen in admin: ${site.url}/admin/enquiries/${enquiry._id}`,
      html: `<h2 style="font-family:sans-serif">New enquiry</h2><table style="font-family:sans-serif;font-size:14px;border-collapse:collapse">${
        rows.map((r) => `<tr><td style="padding:6px 16px 6px 0;color:#6E6E6E">${esc(r[0])}</td><td style="padding:6px 0">${esc(r[1]).replace(/\n/g, "<br>")}</td></tr>`).join("")
      }</table><p style="font-family:sans-serif;font-size:14px"><a href="${site.url}/admin/enquiries/${enquiry._id}">Open in admin</a></p>`,
    }));
  }
  const contact = [site.phone && `Call or WhatsApp: ${site.phone}`, site.email && `Email: ${site.email}`].filter(Boolean).join("\n");
  jobs.push(t.sendMail({
    from, to: oneLine(enquiry.email), replyTo: notify || undefined,
    subject: `We have your enquiry | ${site.name}`,
    text: `Dear ${oneLine(enquiry.name)},\n\nThank you. We have your enquiry${enquiry.destination ? " about " + oneLine(enquiry.destination) : ""}.\n\nA planner replies within one working day.\n\n${contact}\n\n${site.name}\n${site.address.street}, ${site.address.city}`,
    html: `<div style="font-family:sans-serif;font-size:15px;line-height:1.6;color:#0A0A0A"><p>Dear ${esc(oneLine(enquiry.name))},</p><p>Thank you. We have your enquiry${enquiry.destination ? " about <b>" + esc(oneLine(enquiry.destination)) + "</b>" : ""}.</p><p><b>A planner replies within one working day.</b></p><p style="color:#4A4A4A">${esc(contact).replace(/\n/g, "<br>")}</p><p style="color:#6E6E6E">${esc(site.name)}<br>${esc(site.address.street)}, ${esc(site.address.city)}</p></div>`,
  }));

  const results = await Promise.allSettled(jobs);
  const failed = results.filter((r) => r.status === "rejected");
  failed.forEach((f) => console.error("[mail] send failed:", f.reason && f.reason.message));
  return { sent: failed.length === 0, failed: failed.length };
}

module.exports = { sendEnquiryEmails };
