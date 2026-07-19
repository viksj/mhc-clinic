# MHC — Maya Homoeopathic Clinic

A lightweight, static clinic website built with HTML5, CSS3, and vanilla JavaScript. It has no build step and can be opened directly from `index.html` or deployed to GitHub Pages, Netlify, or standard shared hosting.

## Folder structure

```text
.
├── index.html
├── privacy-policy.html
├── terms.html
├── disclaimer.html
├── manifest.webmanifest
├── favicon.svg
├── robots.txt
├── sitemap.xml
├── assets/
│   ├── css/
│   │   ├── style.css
│   │   └── responsive.css
│   ├── js/
│   │   ├── content-data.js   # editable clinic facts and content
│   │   ├── main.js            # navigation, gallery, FAQ, SEO data
│   │   ├── reviews.js         # review rendering and controls
│   │   └── appointment.js     # validation and WhatsApp submission
│   ├── images/
│   │   ├── logo/
│   │   ├── clinic/
│   │   ├── services/
│   │   ├── reviews/
│   │   └── placeholders/      # local illustrated placeholders
│   └── video/                 # add an owner-approved MP4 here
└── README.md
```

## Run locally

1. Double-click `index.html` to open the site directly. All essential content is local and does not require a build command.
2. For a more production-like local server, open the folder in VS Code, install the **Live Server** extension, right-click `index.html`, and choose **Open with Live Server**.
3. Open the printed local URL, usually `http://127.0.0.1:5500/`.

## Before publishing: owner verification checklist

`assets/js/content-data.js` deliberately leaves unverified information empty. Before publishing, the clinic owner should provide and verify:

- Current Google rating, review count, and 4–6 public reviews.
- Confirmed opening hours and any accessibility or appointment information.
- The practitioner’s public name, qualification, registration number, experience, and photo if these should appear.
- A confirmed service list. The visible consultation areas are suggestions, not claims that the clinic offers each category.
- Reuse-cleared clinic exterior, reception, consultation area, signboard, and environment photographs.
- An owner-approved 30–60 second MP4, poster image, and captions/transcript.
- The final website domain for `siteUrl`, `robots.txt`, `sitemap.xml`, canonical tags, and social sharing URLs.

Do not fill fields with estimates or copied, unverified information. Do not present placeholder images as MHC photographs.

## Updating business content

Open `assets/js/content-data.js` and edit only factual, verified values.

### Logo

The current logo is a CSS/text mark using the letter `M`. To use a real logo, add an owner-approved SVG or WebP to `assets/images/logo/`, then replace the `.brand-mark` element in the HTML with an image and meaningful alt text. Keep the text name for accessibility and recognition.

### Clinic images

Add optimized WebP, AVIF, or SVG files to `assets/images/clinic/`. Update the `gallery` array with each file path, a truthful title/category, and descriptive alt text. Replace the hero/about `img` sources in `index.html` with approved photos. Keep the placeholder comments until the replacement is complete.

### Google rating, timings, and reviews

Set `rating` and `reviewCount` only after checking the public Google Business Profile. Add `openingHours` entries using verified day/hour strings. Add reviews with the public display name, exact rating, exact text, and date only when publicly visible and reuse is allowed. The page does not claim live synchronisation; manually entered reviews must be refreshed by the owner.

### Practitioner details

Add only owner-approved public details in `practitioner`. The structured data adds an employee only when `practitioner.name` is non-empty. Do not add a registration number or qualification without verification.

### WhatsApp message

Change `clinicData.appointment.whatsappIntro` in `content-data.js`. The form still appends the non-sensitive fields entered by the visitor and a clear statement that the request is not a confirmed booking.

## Adding the clinic video

1. Add the approved file at `assets/video/clinic-introduction.mp4`.
2. Add a poster image path and caption transcript path in `clinicData.video`.
3. Set `clinicData.video.src` to the MP4 path.
4. `main.js` will replace the designed placeholder with a native `<video controls playsinline preload="metadata">` element and a captions track.

Do not add a copyrighted or random medical video. The final video should show only content the business is allowed to publish.

## Appointment backend options

The current mode is deliberately WhatsApp-only: it validates in the browser, creates an encoded message, and opens WhatsApp. There is no fake backend and no claim that data was saved on a server.

To connect Formspree, Netlify Forms, a custom PHP endpoint, or an API:

1. Keep the existing validation and consent copy.
2. Add the endpoint and submission mode to `clinicData.appointment`.
3. Replace the `window.open(whatsappUrl, ...)` block in `assets/js/appointment.js` with a real `fetch()` request to the approved endpoint.
4. Add server-side validation, spam protection, privacy documentation, HTTPS, and an explicit success/error response.
5. Never treat a successful HTTP request as appointment confirmation unless the clinic has actually confirmed availability.

## Deploy

### GitHub Pages

1. Create a repository and add all project files at its root.
2. Push the branch to GitHub.
3. In **Settings → Pages**, choose **Deploy from a branch**, select the main branch and `/root` folder, then save.
4. Replace `example.com` in `robots.txt` and `sitemap.xml` with the actual Pages URL.

### Netlify

1. Create a new site from the repository, or drag the project folder into Netlify Drop.
2. Leave the build command blank.
3. Use the project root as the publish directory.
4. Update the final domain in `sitemap.xml`, `robots.txt`, canonical tags, and `clinicData.siteUrl`.

## QA before launch

- Open every page and check the browser console for errors.
- Test phone, WhatsApp, Google Business Profile, and directions links.
- Use the menu at 320px, 360px, 375px, 414px, 768px, 1024px, 1280px, and 1440px widths.
- Check the mobile action bar does not cover content.
- Use only the keyboard: skip link, menu, FAQ, form, gallery lightbox, and close/previous/next controls.
- Test form errors, invalid Indian numbers, empty consent, and a past date.
- Confirm the form says “request” and never “confirmed booking”.
- Replace every placeholder review/image/video before launch.
- Confirm the JSON-LD has no aggregate rating until the visible rating and count are verified.
- Update the privacy policy if analytics, forms, or third-party services are added.
- Run a link checker or click every internal link after deployment.
