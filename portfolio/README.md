# Abdul Rasheed — Portfolio

A premium dark-themed, 3D-accented developer portfolio built with React, Vite, Tailwind CSS, Framer Motion and React Three Fiber.

## Setup

```bash
npm install
cp .env.example .env.local   # then fill in your EmailJS values
npm run dev                  # http://localhost:5173
npm run build                # production build in /dist
npm run preview
```

## Configuring the contact form (EmailJS)

1. Create a free account at https://www.emailjs.com.
2. Add an email service (e.g. Gmail) and note the **Service ID**.
3. Create an email template. Use these variables: `{{from_name}}`, `{{reply_to}}`, `{{subject}}`, `{{service}}`, `{{budget}}`, `{{message}}`. Note the **Template ID**.
4. Copy your **Public Key** from Account → API Keys.
5. Put the three values into `.env.local` as `VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID` and `VITE_EMAILJS_PUBLIC_KEY`.

The public key is safe in the frontend. Never put a private key or backend secret in a `VITE_` variable, because Vite exposes those to the browser. If you need stronger protection, route submissions through a small backend endpoint instead.

Until these values are set, the form shows a clear "not configured" message and never claims a message was sent.

## Replacing placeholder projects

Edit `src/data/projects.js`. Each entry has a `isDemo` flag. Set it to `false` when you add a real project, and point `image` at a screenshot in `/public`. Remove the "Demo placeholder" badge rendering in `src/components/Projects.jsx` once real images are in place.

## Content

All text and contact details live in `src/data/` (`profile.js`, `skills.js`, `services.js`, `experience.js`, `projects.js`).

## Notes

- The 3D hero scene only loads on capable desktop devices with WebGL. Other devices get a lightweight gradient fallback.
- The cursor glow is desktop-only and disabled under reduced-motion preferences.
- Motion respects `prefers-reduced-motion`.
