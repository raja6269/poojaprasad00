# POOJAPRASAD — Website Starter

## What's in here
- `index.html` — homepage
- `satyanarayan-pooja.html` — example SEO landing page for one pooja type (copy this pattern for each pooja: Ganesh Puja, Griha Pravesh, Navgraha Shanti, etc.)
- `booking.html` — order form → WhatsApp confirmation → Razorpay payment
- `style.css` — all styling
- `script.js` — booking form logic

## Run it locally
Just open `index.html` in your browser — no build step needed. In VS Code, install the "Live Server" extension for auto-reload while you edit.

## Deploy for free (Vercel)
1. Create a free account at github.com and vercel.com (use the same email).
2. In VS Code terminal, inside this folder:
   ```
   git init
   git add .
   git commit -m "Initial POOJAPRASAD site"
   ```
3. Create a new empty repo on GitHub, then:
   ```
   git remote add origin <your-repo-url>
   git branch -M main
   git push -u origin main
   ```
4. In Vercel: "Add New Project" → import this GitHub repo → deploy (no build settings needed, it's static HTML).
5. You'll get a free live URL like `poojaprasad.vercel.app` immediately.
6. When ready, buy a `.in` or `.com` domain (~₹500-900/year) and connect it in Vercel's domain settings.

## Next pages to add (copy satyanarayan-pooja.html as a template)
- ganesh-puja.html
- navgraha-shanti-pooja.html
- griha-pravesh-pooja.html
- prasad-delivery.html

Each targets a different search term devotees actually type into Google — this is what drives organic traffic.

## Before going live
- Replace placeholder testimonial and "500+ poojas performed" stat with real numbers once you have them — don't publish unverified claims.
- Set up Google Business Profile (free) and Google Search Console (free) — both critical for organic search.
- Add real photos once available (priest performing poojas, packed prasad) — these build trust more than any copy.
