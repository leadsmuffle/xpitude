const path = require("path");
const crypto = require("crypto");
const router = require("express").Router();
const multer = require("multer");
const { rateLimit } = require("express-rate-limit");
const admin = require("../controllers/admin");
const { requireAdmin, sameOrigin, noStore } = require("../middleware/auth");

/* Image uploads go to public/uploads with a random name; only real image types are accepted. */
const TYPES = { "image/jpeg": ".jpg", "image/png": ".png", "image/webp": ".webp", "image/avif": ".avif" };
const upload = multer({
  storage: multer.diskStorage({
    destination: path.join(__dirname, "..", "public", "uploads"),
    filename: (req, file, cb) => cb(null, Date.now().toString(36) + "-" + crypto.randomBytes(6).toString("hex") + TYPES[file.mimetype]),
  }),
  limits: { fileSize: 5 * 1024 * 1024, files: 1 },
  fileFilter: (req, file, cb) => {
    if (TYPES[file.mimetype]) return cb(null, true);
    const err = new multer.MulterError("LIMIT_UNEXPECTED_FILE");
    err.message = "Only JPG, PNG, WebP and AVIF images can be uploaded.";
    cb(err);
  },
});

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, limit: 10, standardHeaders: "draft-7", legacyHeaders: false,
  message: "Too many login attempts. Please wait 15 minutes and try again.",
});

router.use(noStore);

router.get("/login", admin.loginPage);
router.post("/login", loginLimiter, sameOrigin, admin.login);

router.use(requireAdmin, sameOrigin);

router.post("/logout", admin.logout);
router.get("/", admin.dashboard);

router.get("/enquiries", admin.enquiries);
router.get("/enquiries.csv", admin.enquiriesCsv);
router.get("/enquiries/:id", admin.enquiry);
router.post("/enquiries/:id", admin.updateEnquiry);
router.post("/enquiries/:id/delete", admin.deleteEnquiry);

router.get("/:resource", admin.resource, admin.list);
router.get("/:resource/new", admin.resource, admin.newForm);
router.post("/:resource", admin.resource, upload.single("upload"), admin.save, admin.uploadError);
router.get("/:resource/:id/edit", admin.resource, admin.editForm);
router.post("/:resource/:id", admin.resource, upload.single("upload"), admin.save, admin.uploadError);
router.post("/:resource/:id/delete", admin.resource, admin.remove);

router.use((req, res) => res.status(404).render("admin/message", { section: "", heading: "Not found", text: "That admin page does not exist." }));

module.exports = router;
