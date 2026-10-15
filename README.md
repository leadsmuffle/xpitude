# XPITUDE website

The XPITUDE site as a full-stack app: Node.js and Express on the server, MongoDB (through Mongoose) for content and enquiries, EJS templates, and the same vanilla CSS and JavaScript as the original static site.

## What you need

- Node.js 18.11 or newer (`node -v`)
- A MongoDB database: either MongoDB installed on your computer, or a free MongoDB Atlas cluster

## 1. Install

```bash
cd xpitude
npm install
```

Copy the settings file and open it in an editor:

```bash
# macOS / Linux / Git Bash
cp .env.example .env
# Windows PowerShell
Copy-Item .env.example .env
```

Fill in at least these four:

| Setting | What to put |
| --- | --- |
| `MONGO_URI` | Your database address (see step 2) |
| `JWT_SECRET` | A long random string. Generate one with `node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"` |
| `ADMIN_EMAIL` | The email you will log in to `/admin` with |
| `ADMIN_PASSWORD` | A password of 10 characters or more |

Everything else is explained inside `.env.example`.

## 2. Database

### Option A: MongoDB Atlas (recommended, works everywhere)

1. Create a free account at <https://www.mongodb.com/atlas> and create a free (M0) cluster.
2. **Database Access**: add a database user with a password.
3. **Network Access**: add your IP address. For a hosted site on Render or Railway, allow `0.0.0.0/0`.
4. **Connect > Drivers**: copy the connection string and put it in `.env`, with the database name `xpitude` added before the `?`:

   ```
   MONGO_URI=mongodb+srv://USER:PASSWORD@CLUSTER.mongodb.net/xpitude?retryWrites=true&w=majority
   ```

### Option B: MongoDB on your computer

Install MongoDB Community Server, make sure the service is running, and use:

```
MONGO_URI=mongodb://127.0.0.1:27017/xpitude
```

> **Windows 10 note.** MongoDB 8.x does not start on Windows 10 (it exits immediately with an "entry point not found" error). On Windows 10 install MongoDB **7.0** instead, or use Atlas.

## 3. Seed the content

```bash
npm run seed
```

This imports every trip, tour, retreat, signature destination, travel guide article, testimonial and journal item from the original site, and creates the admin user from `ADMIN_EMAIL` and `ADMIN_PASSWORD`.

- It is safe to run again: it only adds what is missing and never overwrites your edits. It never touches enquiries.
- Running it again is also how you **change the admin password**: edit `.env`, then `npm run seed`.
- `npm run seed -- --reset` wipes trips, guide articles, testimonials, blog posts and destinations and re-imports the originals. Enquiries and the admin user are kept.

## 4. Run

```bash
npm run dev     # restarts when you change a file
npm start       # production
```

Open <http://localhost:3000>. The admin panel is at <http://localhost:3000/admin>.

## How the site is organised

```
server.js              app setup, security headers, routes
config/                db.js (database), site.js (settings from .env), mailer.js, icons.js
models/                Trip, Enquiry, GuideArticle, Testimonial, BlogPost, Destination, Admin
routes/                pages.js (website), api.js (/api), admin.js (/admin)
controllers/           the logic behind each route
middleware/            auth.js (admin login), nav.js (menu data), errorHandler.js
views/                 EJS pages; views/partials holds the head, header, mega menu, drawer, footer, forms
views/admin/           admin panel pages
public/assets/         site.css, site.js, admin.css, admin.js, photographs
public/uploads/        images uploaded through the admin
scripts/seed.js        imports the content; scripts/data holds it
```

### Pages

| URL | Page |
| --- | --- |
| `/` | Homepage |
| `/trekking`, `/tours`, `/spiritual`, `/corporate` | Category listings |
| `/trips/:slug` | Trip detail, with the enquiry form pre-filled for that trip |
| `/travel-guide`, `/travel-guide/:slug` | Travel Guide |
| `/about`, `/blog`, `/blog/:slug`, `/testimonials`, `/contact` | Company pages |
| `/privacy`, `/terms` | Legal pages (edit `views/legal.ejs`) |
| `/sitemap.xml`, `/robots.txt` | Generated for search engines |

The old static addresses (`/contact.html`, `/travel-guide/pakistan-visa-guide.html` and so on) redirect permanently to the new ones.

### API

| Route | What it does |
| --- | --- |
| `GET /api/trips?category=trekking` | Trips for the enquiry form's destination menu. `category` is `trekking`, `tours`, `spiritual` or `corporate`. |
| `POST /api/enquiries` | Saves an enquiry and sends the two emails. Limited to 5 per 15 minutes per visitor. |

### Admin panel

- **Dashboard**: new enquiries, totals for the last 7 days and this month, and a breakdown by travel type and status.
- **Enquiries**: filter by status, change status, add private notes, export to CSV.
- **Trips, Testimonials, Blog, Travel Guide**: add, edit and delete. Trips, testimonials, blog posts and guide articles each take an image upload.

Things worth knowing:

- A trip with no photograph shows the "Photograph needed" placeholder. Upload a photo on the trip's edit screen to replace it.
- A blog post is a **draft** until you give it a publish date. Drafts never appear on `/blog`.
- Social icons only appear once their link is set in `.env`.
- Itineraries are typed one day per line, as `Title | Description`.

## Email

Set `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER` and `SMTP_PASS` in `.env` using the details from your email provider (Google Workspace, Zoho, Brevo, Mailgun and so on). Each enquiry then sends:

1. a notification to `NOTIFY_EMAIL`, and
2. an automatic reply to the customer.

With `SMTP_HOST` empty, email is switched off and enquiries are still saved; you will see them in the admin.

## Deployment

The site needs two things: somewhere to run Node.js, and a MongoDB Atlas database.

### MongoDB Atlas

Follow Option A above. In **Network Access** allow `0.0.0.0/0`, because Render and Railway do not have fixed IP addresses on their free plans.

### Render

1. Put this `xpitude` folder in a GitHub repository. `.env` is ignored by git on purpose.
2. On <https://render.com>: **New > Web Service**, connect the repository.
3. Settings:
   - **Root Directory**: `xpitude` if the repository contains the folder, otherwise leave empty
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
4. **Environment**: add every setting from `.env`, plus `NODE_ENV=production`. Set `SITE_URL` to your real address, for example `https://www.xpitude.com`. Do not set `PORT`; Render provides it.
5. Deploy. Then open the service's **Shell** tab and run `npm run seed` once.

### Railway

1. On <https://railway.app>: **New Project > Deploy from GitHub repo**.
2. **Variables**: add the same settings as above, with `NODE_ENV=production`.
3. **Settings > Deploy > Start Command**: `npm start`. Set the root directory to `xpitude` if needed.
4. Run the seed once: `railway run npm run seed` from your computer with the Railway CLI, or run `npm run seed` locally with `MONGO_URI` pointed at the Atlas database.

### Uploaded images on a hosted site

Images uploaded in the admin are saved to `public/uploads` on the server's disk. On Render and Railway that disk is wiped on every deploy unless you attach persistent storage:

- **Render**: add a Disk mounted at `<root>/public/uploads` (paid plans).
- **Railway**: add a Volume mounted at `/app/public/uploads`.

Without one, upload photos locally, commit them to `public/assets`, and type the path (for example `/assets/rakaposhi.jpg`) into the trip's Photographs box instead.

### Custom domain

1. In Render (**Settings > Custom Domains**) or Railway (**Settings > Networking**), add `www.yourdomain.com` and `yourdomain.com`.
2. At your domain registrar, add the DNS records the host shows you: usually a `CNAME` for `www` and an `A` or `ALIAS` record for the bare domain.
3. Wait for the certificate to be issued; HTTPS is automatic.
4. Set `SITE_URL` to the final address and redeploy, so canonical links, the sitemap and emails use it.
5. Submit `https://www.yourdomain.com/sitemap.xml` in Google Search Console.

## Security notes

- The admin session is a signed token in an HTTP-only, SameSite=Strict cookie that lasts 8 hours. In production it is also marked Secure, so the admin only works over HTTPS.
- Login is limited to 10 attempts per 15 minutes.
- The enquiry form is validated on the server, rate limited, and carries a hidden honeypot field that catches most bots.
- Blog and guide bodies are HTML written by an admin and are shown as written. Only give admin access to people you trust.
