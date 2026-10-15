const wantsJson = (req) => req.originalUrl.startsWith("/api/") || (req.headers.accept || "").includes("application/json");

function notFound(req, res) {
  if (wantsJson(req)) return res.status(404).json({ ok: false, error: "Not found" });
  res.status(404).render("404", {
    title: "Page not found | XPITUDE",
    description: "The page you were looking for could not be found.",
    noindex: true,
  });
}

// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {
  const status = err.status || err.statusCode || (err.type === "entity.too.large" ? 413 : err.type === "entity.parse.failed" ? 400 : 500);
  if (status >= 500) console.error(err);
  if (res.headersSent) return;

  if (wantsJson(req)) {
    return res.status(status).json({ ok: false, error: status >= 500 ? "Something went wrong. Please try again." : err.message });
  }
  if (req.originalUrl.startsWith("/admin")) {
    return res.status(status).type("html").send(
      `<!doctype html><meta charset="utf-8"><title>Error</title><body style="font-family:sans-serif;padding:40px"><h1>${status}</h1><p>${
        status >= 500 ? "Something went wrong." : String(err.message).replace(/[<>&]/g, "")
      }</p><p><a href="/admin">Back to admin</a></p></body>`
    );
  }
  // Render without the nav data if that is what failed.
  res.locals.nav = res.locals.nav || { trekking: [], tours: [], spiritual: [], corporate: [], guides: [] };
  res.status(status).render("404", {
    title: "Something went wrong | XPITUDE",
    description: "Something went wrong.",
    noindex: true,
    errorPage: true,
  });
}

module.exports = { notFound, errorHandler };
