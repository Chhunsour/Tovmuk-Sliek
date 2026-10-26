# ស្លៀក (Sliek) — Khmer Fashion E-Commerce Store 👗 🇰🇭

<p align="center">
  <sub>Developed by <strong>Seng Chhunsour</strong></sub>
</p>

<p align="center">
  <a href="https://github.com/Chhunsour"><img src="https://img.shields.io/badge/Author-Seng%20Chhunsour-FF5A1F?style=flat-square&logo=github&logoColor=white" alt="Author: Seng Chhunsour" /></a>
  <img src="https://img.shields.io/badge/Language-Khmer%20Localization-red?style=flat-square" alt="Khmer" />
  <img src="https://img.shields.io/badge/Bundler-Vite-646CFF?style=flat-square&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/License-MIT-green?style=flat-square" alt="MIT License" />
</p>

This is the working Khmer e-commerce adaptation of the original **Moly** Bootstrap 4 HTML template. The original downloaded source remains untouched in `../moly-html`.

## Run locally

```bash
npm install
npm run dev
```

Open the URL printed by Vite (normally `http://127.0.0.1:5173/`). To validate files or create a production build:

```bash
npm run check
npm run build
npm run preview
```

## Homepage and shared layout

- Primary homepage: `index.html`, based on the original `index-2.html` composition.
- All eight original homepage variants remain available as `index.html` through `index-8.html`.
- The shared Khmer header, footer, search, mobile menu, product binding, form handling, cart, and wishlist behavior live in `assets/js/moly-khmer.js`.
- The brand, contacts, banners, categories, 24 products, prices, stock, sizes, colors, and blog posts live in `assets/js/store-config.js`.
- The Khmer design layer and responsive overrides live in `assets/css/khmer-store.css`, imported from the original `assets/css/style.css`.

## Customize

Edit `assets/js/store-config.js` for store content, contact links, theme colors, catalog data, and image paths. Replace optimized product images within `assets/img/khmer/products/` at 1080×1080 while keeping the current filenames. Shared navigation/footer edits belong in `assets/js/moly-khmer.js` so every page stays consistent.

## Pages

The project preserves the original shop grids/lists/details, cart, checkout, account, blog, about, contact, and homepage variants. `404.html` is the deployment-friendly not-found page; `404-page.html` is retained as the original template-named equivalent.

Forms and checkout are front-end demonstrations only. They validate locally and show Khmer status messages but do not submit payments, credentials, or email to a server.

---

## 👤 Author & Developer

**Developed by Seng Chhunsour**
- **GitHub:** [@Chhunsour](https://github.com/Chhunsour)
- **Repository:** [https://github.com/Chhunsour/Tovmuk-Sliek](https://github.com/Chhunsour/Tovmuk-Sliek)

---

## 📄 License

Personal and open-source project. Developed by Seng Chhunsour. All rights reserved.
