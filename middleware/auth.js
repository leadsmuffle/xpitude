const jwt = require("jsonwebtoken");

const COOKIE = "xp_admin";
const MAX_AGE_MS = 8 * 60 * 60 * 1000;

function secret() {
  const s = process.env.JWT_SECRET || "";
  return s.length >= 32 ? s : null;
}

function readCookie(req, name) {
  const header = req.headers.cookie || "";
  for (const part of header.split(";")) {
    const i = part.indexOf("=");
    if (i > -1 && part.slice(0, i).trim() === name) return decodeURIComponent(part.slice(i + 1).trim());
  }
  return "";
}

function setSession(res, admin) {
  const token = jwt.sign({ sub: String(admin._id), email: admin.email }, secret(), { expiresIn: "8h" });
  res.cookie(COOKIE, token, {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    maxAge: MAX_AGE_MS,
    path: "/admin",
  });
}

function clearSession(res) {
  res.clearCookie(COOKIE, { path: "/admin" });
}

function currentAdmin(req) {
  const s = secret();
  const token = readCookie(req, COOKIE);
  if (!s || !token) return null;
  try {
    return jwt.verify(token, s);
  } catch {
    return null;
  }
}

function requireAdmin(req, res, next) {
  const admin = currentAdmin(req);
  if (!admin) {
    clearSession(res);
    return res.redirect("/admin/login");
  }
  req.admin = admin;
  res.locals.admin = admin;
  next();
}

// The session cookie is SameSite=Strict. This is a second check for state-changing requests:
// the Origin (or Referer) of a POST must be this site.
function sameOrigin(req, res, next) {
  if (req.method === "GET" || req.method === "HEAD") return next();
  const source = req.headers.origin || req.headers.referer || "";
  let host = "";
  try { host = new URL(source).host; } catch { /* missing or malformed */ }
  if (!host || host !== req.headers.host) {
    const err = new Error("Request blocked: it did not come from this site.");
    err.status = 403;
    return next(err);
  }
  next();
}

// Admin pages must never be cached or indexed.
function noStore(req, res, next) {
  res.set("Cache-Control", "no-store");
  res.set("X-Robots-Tag", "noindex, nofollow");
  next();
}

module.exports = { secret, setSession, clearSession, currentAdmin, requireAdmin, sameOrigin, noStore };
