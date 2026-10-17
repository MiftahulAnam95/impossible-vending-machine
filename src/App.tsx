/**
 * NOTE — this project is intentionally framework-free.
 *
 * The brief for "The Vending Machine of Things You Can't Buy" explicitly asks for
 * plain HTML5 + CSS3 + vanilla JavaScript (ES6+), with `index.html`, `style.css`
 * and `script.js` as the real entry points, so that the site can be opened
 * directly from the filesystem and deployed to GitHub Pages without a build step.
 *
 * The complete application therefore lives in:
 *   ├── index.html   (semantic markup + i18n hooks)
 *   ├── style.css    (art direction, responsive layout, animations)
 *   ├── script.js    (state, translations, catalog, rendering, effects)
 *   └── assets/      (favicon)
 *
 * The Vite setup that ships this folder simply bundles those files into a
 * single self-contained `dist/index.html`. This file is kept as a reference
 * point for the harness and intentionally renders nothing.
 */
export default function App() {
  return null;
}
