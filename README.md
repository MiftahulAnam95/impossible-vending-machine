# THE VENDING MACHINE OF THINGS YOU CAN'T BUY

> “Money can't buy everything. This machine disagrees.”
> “Duit emang bukan segalanya. Tapi mesin ini sok-sokan bisa beli apa aja.”

A fictional vending machine that sells impossible, intangible and slightly absurd things:
three extra hours in a day, a mute button for overthinking, an undo button for that
embarrassing message, motivation that lasts fifteen minutes, one more chance, and a few
things nobody is supposed to find at all.

It is a small, hand-built front-end project: semantic HTML, hand-written CSS and vanilla
JavaScript, with **no frameworks, no backend, no build step and no network calls**. The
whole thing works offline and remembers your progress in your own browser.

---

## ✨ What is inside

| Area | Details |
| --- | --- |
| **The Machine** | A real-looking vending machine UI: mood screen, live product slots, coin slot, big orange purchase button, dispensing tray, warning stickers, serial number. |
| **Catalog** | 20 hand-written products + 7 hidden ones. Each has a bilingual name, description, price, rarity, category, custom SVG illustration and a unique effect. |
| **Wallet** | Fictional economy. 100 coins to start, coin slot, +10 top-up, transaction history, never negative, validated before every purchase. |
| **Inventory** | Everything you own, with rarity, use-status and a working **USE** button for every item. |
| **Product effects** | 27 real in-page effects: an animated clock, a muting wave, an interactive chat-undo, alternative-timeline choices, a battery that refills, a punch card, a therapy session, a loop you can finally leave. |
| **Search / filter / sort** | Search by name *and* description in **both** languages, 5 category filters, 5 rarity filters, 4 sort orders, one-click reset, friendly empty state. |
| **Machine personality** | Seven moods (IDLE → SECRETIVE) with contextual, non-repeating dialogue in both languages. |
| **Secrets** | 7 discoverable hidden items + 8 achievements. |
| **Bilingual** | Complete English ⇄ Bahasa Indonesia (Gen Z) interface. Instant switch, persisted. |
| **Persistence** | Wallet, inventory, secrets, achievements, history, language and sound preference live in `localStorage`. |

---

## 🕹️ How to run it

### Option A — open it directly (no server needed)

The project is dependency-free on purpose. Because the script is a plain classic script
with no imports, you can simply double-click `index.html` and it runs.

> If your browser blocks scripts opened from the filesystem, use Option B.

### Option B — any static server

```bash
# Python
python3 -m http.server 8080

# Node
npx serve .

# PHP
php -S localhost:8080
```

Then open <http://localhost:8080>.

### Option C — the bundled single-file build

This repository also contains a Vite setup that bundles `index.html` + `style.css` +
`script.js` into **one self-contained `dist/index.html`** (no external assets, works
offline, ideal for hosting).

```bash
npm install
npm run build     # → dist/index.html
npm run dev       # local dev server
```

---

## 🚀 Deploy to GitHub Pages

1. Push the repository to GitHub.
2. **Settings → Pages → Build and deployment → Source: _Deploy from a branch_**.
3. Pick `main` / `root` and save. GitHub will publish
   `https://<user>.github.io/<repo>/`.
4. If you want the plain, no-build version, copy `index.html`, `style.css`, `script.js`
   and `assets/` into a `docs/` folder and select `main` / `docs` instead. That folder
   needs no environment variables, no server and no build pipeline.

---

## 📁 Folder structure

```
.
├── index.html          # semantic markup + i18n hooks (data-i18n / data-i18n-attr)
├── style.css           # design tokens, layout, components, animations, responsive rules
├── script.js           # the whole application: state, data, rendering, logic
├── assets/
│   └── favicon.svg     # the machine, as a tiny vector
├── src/                # only used by the optional Vite single-file build
│   ├── App.tsx         # intentionally renders nothing (see the note inside)
│   ├── main.tsx
│   └── index.css
├── package.json        # dev-only tooling for the single-file build
└── README.md
```

---

## 🌐 The bilingual system

* Every visible string lives in one dictionary: `translations.en` and `translations.id`
  in `script.js`. There are no hard-coded sentences in the rendering code.
* Product copy, effect copy, secret hints and machine dialogue are bilingual **data**
  objects (`name: { en, id }`, `desc: { en, id }`, `body: { en, id }` …), so the same
  renderer can output either language.
* The interface is switched with the `EN | ID 🇮🇩` control in the header. Switching
  re-renders the entire page instantly, with **no reload** and no flashing of English
  text.
* `applyI18n()` walks the DOM and applies:
  * `data-i18n="key"` → sets `textContent`
  * `data-i18n-attr="placeholder:key,aria-label:key"` → sets attributes
  * `data-lang-only="en|id"` → shows an element only in that language
* The Indonesian copy is written conversationally (Gen Z), not machine-translated:
  *“Waduh, ini mah kena banget.” · “Duit virtual lu gak cukup, bestie.” · “Bentar,
  mesin lagi mikir.” · “Barang berhasil keluar. Hidup lu belum tentu beres.”*
* The selected language is stored in `localStorage` and restored on the next visit.

---

## 💾 How localStorage works

* One key: `vmnb_unit07_v1`.
* It stores: `lang`, `coins`, `owned` (inventory + use status), `history` (last 30
  transactions), `secrets`, `achievements`, `stats` and `sound`.
* Every write goes through `saveProgress()`; every read through `loadProgress()`.
* `loadProgress()` is wrapped in `try/catch` and validates the shape of the data, so a
  corrupted or unavailable storage (private mode, blocked cookies) never breaks the
  experience — the machine simply starts fresh.
* **Clearing your browser data resets everything.** There is a *Reset progress* button
  (wallet panel and footer) that asks for confirmation first.
* Nothing is ever sent anywhere. No analytics, no requests, no personal data collected.

---

## 🕵️ The secrets (spoilers)

| # | Secret | How to unlock |
| --- | --- | --- |
| 1 | Midnight Snack That Arrives | Buy three things. |
| 2 | The Receipt Of A Life You Did Not Live | Search for `receipt` (or `struk`). |
| 3 | The Answer To Something You Never Asked | Search for `42`. |
| 4 | The Machine's Own Therapy Session | Open your inventory three times. |
| 5 | A Loop That Finishes Properly | Use three items from your inventory. |
| 6 | Midnight Clearance Event | Own one item from every category. |
| 7 | The Machine's Real Name | Poke the `NOT FOR SALE™` sticker three times. |

Finding all seven unlocks the **Secret Keeper** achievement. Each secret also drops
10 bonus coins into your wallet.

---

## ♿ Accessibility

* Semantic landmarks (`header`, `nav`, `main`, `section`, `footer`), real headings and
  real buttons — no clickable `div`s.
* Product modal and effect scenes are proper dialogs: `role="dialog"`,
  `aria-modal="true"`, focus moved in on open, focus returned on close, `Tab` is
  trapped, `Esc` closes.
* A polite `aria-live` region announces purchases, discoveries and machine remarks.
* Rarity and transaction status are communicated with an icon **and** a word, never
  colour alone.
* Visible focus rings, touch-friendly tap targets, and full support for
  `prefers-reduced-motion` (animations collapse, the dispensing sequence shortens).
* No horizontal overflow at 360px, 390px, 768px, 1024px or 1440px.

---

## ⚙️ Tech notes

* **HTML5 + CSS3 + vanilla ES6+.** No React, Vue, Angular, TypeScript or dependencies.
* **SVG** is used for every illustration (icons, product art, scene visuals) — no image
  files, no icon fonts.
* **CSS custom properties** hold the palette (`--cream #F5F0E6`, `--ink #20221F`,
  `--orange #FF6339`, `--mint #A8DCC8`, `--yellow #F5C85B`, `--surface #FFFDF7`).
* **Type**: Bricolage Grotesque (display), Inter (body), Space Mono (labels, codes and
  machine readouts) with system fallbacks if Google Fonts cannot be reached.
* **Sound** is generated with the Web Audio API (no audio files) and is **off by
  default**; the header toggle persists the choice.
* Code organisation inside `script.js`: `translations` → `products` → `effects` →
  `achievements` → `state` → storage helpers → rendering → filters → purchase flow →
  secrets/achievements → scenes → sound → events → init.

---

## ⚠️ Known limitations

* It is fiction. Buying a *Confidence On Demand* does not make anyone confident, and a
  *Refund For Wasted Time Scrolling* does not return any minutes. The site says so in
  the footer on purpose.
* Progress lives in one browser on one device — there is no account, no sync and no
  server. Clearing site data wipes it.
* The coin slot hands out imaginary coins generously so the experience never dead-ends;
  it is a joke economy, not a monetisation loop.
* Some browsers restrict `localStorage` on `file://` pages; the app degrades to an
  in-memory session in that case (everything still works, nothing persists).

---

Made with too much free time and one (1) imaginary coin.
