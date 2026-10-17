/* ══════════════════════════════════════════════════════════════════════
   THE VENDING MACHINE OF THINGS YOU CAN'T BUY
   Vanilla ES6+ · zero dependencies · all state stays in this browser.
   --------------------------------------------------------------------------
   1  Icons              6  Rendering
   2  Translations       7  Search / filters
   3  Catalog           8  Purchase flow
   4  Product effects   9  Secrets · achievements · machine mood
   5  State + storage  10  Sound · init
   ══════════════════════════════════════════════════════════════════════ */

/* ─────────────────────────── 1. ICONS ─────────────────────────── */
/* Flags that the app booted (used by the file:// fallback in index.html). */
window.__VMNB_LOADED__ = true;

/* Simple stroke icons drawn with SVG so the site needs zero image files. */
const ICONS = {
  clock: '<circle cx="24" cy="24" r="17"/><path d="M24 13v11l7 4"/>',
  wave: '<circle cx="24" cy="24" r="17"/><path d="M15 20c3-4 6 4 9 0s6 4 9 0M15 28c3-4 6 4 9 0s6 4 9 0"/>',
  undo: '<path d="M14 16h13a8 8 0 0 1 0 16H16"/><path d="m9 21 5-5-5-5"/><path d="M20 25h7"/>',
  bolt: '<path d="M27 6 12 28h9l-2 14 15-22h-9l2-14Z"/>',
  target: '<circle cx="24" cy="24" r="16"/><circle cx="24" cy="24" r="9"/><circle cx="24" cy="24" r="2.6" fill="currentColor"/>',
  moon: '<path d="M33 30A13 13 0 1 1 21 9a10 10 0 0 0 12 21Z"/>',
  battery: '<rect x="7" y="14" width="28" height="20" rx="4"/><path d="M39 21v6M13 24h10l-4 6h6"/>',
  hourglass: '<path d="M13 8h22M13 40h22"/><path d="M14 8c0 8 10 10 10 16 0 6-10 8-10 16M34 8c0 8-10 10-10 16 0 6 10 8 10 16"/>',
  ticket: '<path d="M9 13h30v7a4 4 0 0 0 0 8v7H9v-7a4 4 0 0 0 0-8Z"/><path d="M24 15v18" stroke-dasharray="3 4"/>',
  star: '<path d="m24 7 5 10 11 2-8 8 2 11-10-5-10 5 2-11-8-8 11-2Z"/>',
  skip: '<path d="M13 10 30 24 13 38Z"/><path d="M35 10v28"/>',
  coin: '<circle cx="24" cy="24" r="16"/><circle cx="24" cy="24" r="9"/><path d="M24 19v10"/>',
  heart: '<path d="M24 39S9 30 9 19.5A8.5 8.5 0 0 1 24 15a8.5 8.5 0 0 1 15 4.5C39 30 24 39 24 39Z"/>',
  pause: '<rect x="14" y="10" width="7" height="28" rx="3"/><rect x="27" y="10" width="7" height="28" rx="3"/>',
  ghost: '<path d="M13 40V21a11 11 0 0 1 22 0v19l-4-3-4 3-4-3-4 3-4-3Z"/><circle cx="20" cy="22" r="1.8" fill="currentColor"/><circle cx="28" cy="22" r="1.8" fill="currentColor"/>',
  wifi: '<path d="M10 19a21 21 0 0 1 28 0M15 26a13 13 0 0 1 18 0M20 33a5.5 5.5 0 0 1 8 0"/><circle cx="24" cy="38" r="2" fill="currentColor"/>',
  sun: '<circle cx="19" cy="19" r="7"/><path d="M19 5v4M19 29v4M5 19h4M29 19h4M9 9l3 3M26 26l3 3M29 9l-3 3M12 26l-3 3"/><path d="M28 30a6 6 0 0 1 8 8H26a5 5 0 0 1 2-8Z"/>',
  dumbbell: '<path d="M10 18v12M16 13v22M32 13v22M38 18v12M16 24h16"/>',
  chat: '<path d="M9 15h30v18H21l-8 7v-7H9Z"/><path d="M16 22h16M16 27h9"/>',
  chat2: '<path d="M8 12h20v14H17l-6 5v-5H8Z"/><path d="M20 22h20v14h-5v5l-6-5h-9"/>',
  snack: '<circle cx="24" cy="24" r="16"/><circle cx="18" cy="19" r="2.2" fill="currentColor"/><circle cx="30" cy="21" r="2.2" fill="currentColor"/><circle cx="22" cy="30" r="2.2" fill="currentColor"/><circle cx="31" cy="31" r="2.2" fill="currentColor"/>',
  receipt: '<path d="M13 7h22v34l-4-3-3 3-4-3-4 3-3-3-4 3Z"/><path d="M18 16h12M18 22h12M18 28h7"/>',
  question: '<circle cx="24" cy="24" r="17"/><path d="M19 19a5 5 0 0 1 9 3c0 3-4 3-4 7"/><circle cx="24" cy="34" r="1.8" fill="currentColor"/>',
  loop: '<path d="M15 20a10 10 0 1 1 0 12"/><path d="m9 16 6 4-6 4"/>',
  answer: '<circle cx="24" cy="24" r="17"/><path d="M16 20h6v10h-6zM27 30l5-10 5 10M29 26h6"/>',
  plus: '<rect x="9" y="9" width="30" height="30" rx="8"/><path d="M24 17v14M17 24h14"/>',
  umbrella: '<path d="M9 26a15 15 0 0 1 30 0Z"/><path d="M24 26v11a4 4 0 0 0 8 0"/>',
  eye: '<path d="M6 24s7-12 18-12 18 12 18 12-7 12-18 12S6 24 6 24Z"/><circle cx="24" cy="24" r="5"/>',
  flag: '<path d="M12 40V8"/><path d="M12 10h22l-5 8 5 8H12"/>',
  infinity: '<path d="M18 15c-7 0-11 9-11 9s4 9 11 9c5 0 6-4 6-9s-1-9-6-9Zm12 0c7 0 11 9 11 9s-4 9-11 9c-5 0-6-4-6-9s1-9 6-9Z"/>',
};

function icon(name, className) {
  const paths = ICONS[name] || ICONS.star;
  return (
    '<svg class="' +
    (className || 'icon') +
    '" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.6" ' +
    'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">' +
    paths +
    '</svg>'
  );
}

/* ─────────────────────────── 2. TRANSLATIONS ─────────────────────────── */
/* One dictionary per language. Every visible string lives here or in the
   bilingual product / effect data further down. */
const translations = {
  en: {
    'a11y.skip': 'Skip to the machine',
    'a11y.primaryNav': 'Primary navigation',
    'a11y.language': 'Language',
    'a11y.soundOn': 'Sound on. Click to mute.',
    'a11y.soundOff': 'Sound off. Click to unmute.',
    'a11y.close': 'Close',
    'a11y.clearSearch': 'Clear search',
    'a11y.categories': 'Filter by category',
    'a11y.coinSlot': 'Coin slot. Feed the machine imaginary coins.',
    'a11y.sticker': 'Sticker. Do not peel.',
    'a11y.buyItem': 'Buy this item',
    'a11y.useItem': 'Use this item',
    'a11y.selectSlot': 'Select this slot',
    'a11y.slots': 'Product slots',
    'a11y.bought': 'Bought. {name} is now in your inventory.',

    'common.close': 'Close',
    'brand.sub': 'Impossible goods, unit 07',
    'nav.machine': 'The Machine',
    'nav.catalog': 'Catalog',
    'nav.inventory': 'Inventory',
    'wallet.coins': 'coins',
    'wallet.label': 'Virtual wallet balance',

    'hero.eyebrow': 'EST. 2026 · UNIT 07 · UNLICENSED',
    'hero.title': "THE VENDING MACHINE OF THINGS YOU CAN'T BUY.",
    'hero.sub': 'Some things are priceless. Some things are just weirdly unavailable.',
    'hero.tagline': "“Money can't buy everything. This machine disagrees.”",
    'hero.taglineId': '“Duit emang bukan segalanya. Tapi mesin ini sok-sokan bisa beli apa aja.”',
    'hero.cta': 'EXPLORE THE MACHINE',
    'hero.cta2': 'Browse the catalog',
    'hero.stat1': 'impossible items',
    'hero.stat2': 'real money involved',
    'hero.stat3': 'coins in your wallet',
    'hero.artLabel': 'IMPOSSIBLE GOODS',

    'machine.eyebrow': 'UNIT 07 · COLD STORAGE FOR IMPOSSIBLE THINGS',
    'machine.title': 'The Machine',
    'machine.sub':
      'Pick a slot, feed it coins, press the big orange button. Nothing illegal happens. Probably.',
    'machine.insert': 'INSERT',
    'machine.coinHelp': 'Click to feed the machine imaginary coins.',
    'machine.buy': 'PURCHASE',
    'machine.tray': 'TRAY',
    'machine.sticker1': 'MAY CAUSE EMOTIONAL SIDE EFFECTS',
    'machine.sticker2': 'NO REFUNDS · NO REALITY INCLUDED',
    'machine.sticker3': 'COINS ARE FICTIONAL · FEELINGS ARE NOT',

    'wallet.title': 'Virtual Wallet',
    'wallet.topup': '+10 COINS',
    'wallet.reset': 'RESET PROGRESS',
    'wallet.history': 'Recent transactions',
    'wallet.empty': 'No transactions yet. The machine is waiting.',
    'wallet.tx.buy': 'Bought {name}',
    'wallet.tx.topup': 'Imaginary coins inserted',
    'wallet.tx.bonus': 'Bonus: {name}',
    'wallet.tx.reset': 'Progress reset',

    'log.title': 'Machine log',
    'log.empty': 'Nothing logged yet.',

    'catalog.eyebrow': 'FULL INVENTORY · NOTHING HERE IS REAL',
    'catalog.title': 'The Catalog',
    'catalog.sub': "What would you buy if money wasn't the problem?",
    'search.placeholder': 'Search the impossible…',
    'filter.rarity': 'Rarity',
    'filter.sort': 'Sort',
    'filter.reset': 'RESET FILTERS',
    'filter.all': 'All',
    'sort.default': 'Default order',
    'sort.priceAsc': 'Price: low to high',
    'sort.priceDesc': 'Price: high to low',
    'sort.rarityAsc': 'Rarity: common first',
    'sort.rarityDesc': 'Rarity: legendary first',
    'rarity.all': 'All rarities',
    'rarity.common': 'Common',
    'rarity.rare': 'Rare',
    'rarity.epic': 'Epic',
    'rarity.legendary': 'Legendary',
    'rarity.secret': 'Secret',
    'cat.all': 'Everything',
    'cat.time': 'Time',
    'cat.feelings': 'Feelings',
    'cat.life': 'Life upgrades',
    'cat.social': 'Social survival',
    'cat.nonsense': 'Pure nonsense',
    'results.count': '{n} of {total} items shown',
    'results.countOne': '{n} of {total} items shown',
    'empty.title': 'Nothing found. Even this machine has limits.',
    'empty.sub': 'Try another word, or reset the filters.',
    'product.rarity': 'Rarity',
    'product.category': 'Category',
    'product.price': 'Price',
    'product.warning': 'This item may cause emotional side effects.',
    'product.effect': 'What it does',
    'product.buy': 'BUY FOR {price} COINS',
    'product.owned': 'ALREADY IN YOUR INVENTORY',
    'product.secretOwned': 'SECRET ITEM · ALREADY OWNED',
    'product.locked': 'Secret slot · not yet unlocked',

    'inv.eyebrow': 'PERSONAL CUSTODY · 100% FICTIONAL',
    'inv.title': 'Your Inventory',
    'inv.sub': "Your collection of things that don't technically exist.",
    'inv.emptyTitle': 'Nothing in here yet.',
    'inv.emptySub': 'Buy something impossible. It goes straight to this shelf.',
    'inv.use': 'USE IT',
    'inv.used': 'USED',
    'inv.ready': 'READY TO USE',
    'inv.qty': 'Owned ×{n}',
    'inv.oneTime': 'Single use',
    'inv.repeatable': 'Reusable',
    'inv.useAgain': 'Use again',
    'inv.open': 'OPEN INVENTORY',

    'ach.title': 'Achievements',
    'ach.locked': 'Locked',
    'ach.a1.name': 'First Impossible Purchase',
    'ach.a1.desc': 'Buy your very first impossible thing.',
    'ach.a2.name': 'Repeat Customer',
    'ach.a2.desc': 'Buy five different impossible things.',
    'ach.a3.name': 'Collector of Unthings',
    'ach.a3.desc': 'Own ten items at the same time.',
    'ach.a4.name': 'Secret Keeper',
    'ach.a4.desc': 'Find every hidden item in the machine.',
    'ach.a5.name': 'Broke & Baffled',
    'ach.a5.desc': 'Drop your wallet to exactly zero coins.',
    'ach.a6.name': 'Overfunded',
    'ach.a6.desc': 'Hold 150 coins at once. Excessive, but respected.',
    'ach.a7.name': 'Polyglot Improbable',
    'ach.a7.desc': 'Switch languages three times. The machine is bilingual in principle.',
    'ach.a8.name': 'User Of Things',
    'ach.a8.desc': 'Use five items from your inventory.',

    'secret.title': 'Secrets found',
    'secret.hint': 'Some things only show up if you look for them.',
    'secret.found': 'Secret unlocked: {name}',
    'secret.unlock.purchases': 'Buy three things. The machine gets generous.',
    'secret.unlock.search': 'Search for a word nobody stocks: receipt.',
    'secret.unlock.number': 'Ask the machine the only question worth asking.',
    'secret.unlock.inventory': 'Keep checking your inventory. It is suspicious.',
    'secret.unlock.uses': 'Use three items. Reality notices.',
    'secret.unlock.categories': 'Own one item from every category.',
    'secret.unlock.sticker': 'Poke the sticker on the machine. Three times.',

    'toast.purchase.kicker': 'Transaction successful',
    'toast.purchase.title': '{name} dispensed',
    'toast.purchase.body': 'Reality not included. Your wallet says thank you and goodbye.',
    'toast.secret.kicker': 'Secret discovered',
    'toast.secret.title': '{name}',
    'toast.secret.body': '{hint}',
    'toast.achievement.kicker': 'Achievement unlocked',
    'toast.achievement.title': '{name}',
    'toast.achievement.body': '{desc}',
    'toast.coin.kicker': 'Coin accepted',
    'toast.coin.title': '+1 coin',
    'toast.coin.body': 'Imaginary money. Real dignity.',
    'toast.reset.kicker': 'Machine reset',
    'toast.reset.title': 'Back to zero',
    'toast.reset.body': 'Wallet refilled, shelf cleared, secrets forgotten.',

    'confirm.title': 'Reset everything?',
    'confirm.desc':
      'Your wallet, inventory, secrets and achievements will be wiped. The machine will forget you completely. There is no undo for this one, and yes, we checked.',
    'confirm.yes': 'RESET IT ALL',
    'confirm.no': 'KEEP MY THINGS',

    'footer.note':
      'This is a fictional store. No real money, no real product, no real refund. Buying an item here does not fix your life, your budget, or your mental health — it just makes a very small digital machine feel briefly generous.',
    'footer.dataHead': 'Your data',
    'footer.dataNote':
      'Everything is stored in this browser only (localStorage). Nothing is uploaded anywhere. Clearing site data resets the machine and your wallet.',
    'footer.buildHead': 'Colophon',
    'footer.buildNote':
      'Vanilla HTML, CSS and JavaScript. No frameworks, no backend, no analytics. Art direction: cream, navy, tangerine, mint.',
    'footer.rights': 'Unit 07 sells nothing. It only pretends convincingly.',
    'footer.reset': 'Reset all progress',

    'mood.idle': 'IDLE',
    'mood.curious': 'CURIOUS',
    'mood.excited': 'EXCITED',
    'mood.confused': 'CONFUSED',
    'mood.judgmental': 'JUDGMENTAL',
    'mood.overheated': 'OVERHEATED',
    'mood.secretive': 'SECRETIVE',

    'react.first': [
      "Welcome to the impossible store. Try not to look too disappointed.",
      "New face. Good. The shelf was getting boring without you."
    ],
    'react.return': [
      "You again? I was just getting comfortable.",
      "Back again? I saved you the good slot. I didn't, but the vibe is there."
    ],
    'react.view': [
      "Interesting choice.",
      "You sure about that?",
      "I wasn't programmed for this.",
      "That one hits a little too close to home."
    ],
    'react.view.time': [
      "Time is a construct. So is this. Same price either way.",
      "Careful with the time stuff. The machine bills in feelings."
    ],
    'react.view.feelings': [
      "Now that's a purchase I can't calculate.",
      "This one's expensive in a currency I don't report."
    ],
    'react.view.life': [
      "Practical. Suspiciously practical.",
      "Upgrading a life. Bold of you to assume it's not already fine."
    ],
    'react.view.social': [
      "Ah yes, the ancient art of avoiding a conversation.",
      "Social survival kit. Very normal, very healthy."
    ],
    'react.view.nonsense': [
      "I have no idea what this is. Selling it anyway.",
      "Honestly? Same. But the margin is good."
    ],
    'react.select': [
      "Selected. No refunds, no returns, no second thoughts.",
      "Locked in. Or at least locked-ish."
    ],
    'react.coin': [
      "Coin received. It was definitely imaginary.",
      "One more imaginary coin. The economy grows."
    ],
    'react.success': [
      "Transaction approved. Don't ask questions.",
      "Your item has been dispensed. Reality not included.",
      "Excellent taste in imaginary products.",
      "The machine is judging your purchase, but approving it.",
      "I regret nothing. Mostly."
    ],
    'react.fail.coins': [
      "Your imaginary wallet says no.",
      "Not enough coins. The machine is not a charity, it's a machine.",
      "Short by a few. Sad. Also deterministic."
    ],
    'react.fail.owned': [
      "You already own this. The machine refuses to sell the same miracle twice.",
      "One of each. That's the policy. Policy you didn't read."
    ],
    'react.emptyWallet': [
      "Zero coins. The machine is judging you softly now.",
      "Broke. The machine has seen this before. It always ends the same way."
    ],
    'react.secret': [
      "You found something I didn't put on the shelf. Interesting.",
      "Well. That was not supposed to be visible. Congratulations, I guess."
    ],
    'react.use': [
      "Using it now. Don't look directly at the outcome.",
      "Effect engaged. Side effects are decorative."
    ],
    'react.milestone': [
      "You're a regular now. I'm slightly worried about you.",
      "The machine is overheating a little. It happens when people keep buying."
    ],
    'react.topup': [
      "Imaginary coins accepted. Please continue to pretend.",
      "That's a lot of imaginary money. Where are you even printing it?"
    ],
    'react.confirm': [
      "Resetting. The machine will forget you. It will also forget that it forgot.",
      "Wiped clean. Poof. Like your last three browser tabs."
    ],
    'react.poke': [
      "Poked. Nothing happened. Suspicious.",
      "Stop poking the sticker. (Poke it again.)"
    ],
    'react.easter': [
      "Was that a secret? It was definitely a secret.",
      "You found the back room. There's nothing back here but more back room."
    ]
  },

  id: {
    'a11y.skip': 'Langsung ke mesin',
    'a11y.primaryNav': 'Navigasi utama',
    'a11y.language': 'Bahasa',
    'a11y.soundOn': 'Suara nyala. Klik buat matiin.',
    'a11y.soundOff': 'Suara mati. Klik buat nyalain.',
    'a11y.close': 'Tutup',
    'a11y.clearSearch': 'Hapus pencarian',
    'a11y.categories': 'Filter berdasarkan kategori',
    'a11y.coinSlot': 'Slot koin. Kasih mesin koin khayal.',
    'a11y.sticker': 'Stiker. Jangan dikelupas.',
    'a11y.buyItem': 'Beli barang ini',
    'a11y.useItem': 'Pakai barang ini',
    'a11y.selectSlot': 'Pilih slot ini',
    'a11y.slots': 'Slot produk',
    'a11y.bought': 'Sudah dibeli. {name} sekarang ada di inventory lu.',

    'common.close': 'Tutup',
    'brand.sub': 'Barang mustahil, unit 07',
    'nav.machine': 'Mesinnya',
    'nav.catalog': 'Katalog',
    'nav.inventory': 'Inventory',
    'wallet.coins': 'koin',
    'wallet.label': 'Saldo dompet virtual',

    'hero.eyebrow': 'EST. 2026 · UNIT 07 · TANPA IZIN',
    'hero.title': 'MESIN JUALAN BARANG YANG GAK BISA DIBELI.',
    'hero.sub': 'Ada hal yang gak ternilai. Ada juga yang emang gak dijual di mana-mana.',
    'hero.tagline': '“Duit emang bukan segalanya. Tapi mesin ini sok-sokan bisa beli apa aja.”',
    'hero.taglineId': '“Some things are priceless. Some things are just weirdly unavailable.”',
    'hero.cta': 'CEK ISINYA',
    'hero.cta2': 'Lihat katalognya',
    'hero.stat1': 'barang mustahil',
    'hero.stat2': 'duit asli yang dipakai',
    'hero.stat3': 'koin di dompet lu',
    'hero.artLabel': 'BARANG GAK MUNGKIN',

    'machine.eyebrow': 'UNIT 07 · GUDANG BARANG YANG MUSTAHIL',
    'machine.title': 'Mesinnya',
    'machine.sub':
      'Pilih slot, kasih koin, pencet tombol oranye gede. Nggak ada yang ilegal terjadi. Mungkin.',
    'machine.insert': 'MASUKIN',
    'machine.coinHelp': 'Klik buat ngasih mesin koin khayal.',
    'machine.buy': 'BELI',
    'machine.tray': 'BASKOM',
    'machine.sticker1': 'BISA NYEBABIN EFEK EMOSIONAL',
    'machine.sticker2': 'NO REFUND · REALITAS TIDAK TERMASUK',
    'machine.sticker3': 'KOINNYA FIKTIF · PERASAANNYA BENERAN',

    'wallet.title': 'Dompet Virtual',
    'wallet.topup': '+10 KOIN',
    'wallet.reset': 'RESET PROGRES',
    'wallet.history': 'Transaksi terakhir',
    'wallet.empty': 'Belum ada transaksi. Mesin nunggu.',
    'wallet.tx.buy': 'Beli {name}',
    'wallet.tx.topup': 'Koin khayal dimasukin',
    'wallet.tx.bonus': 'Bonus: {name}',
    'wallet.tx.reset': 'Progres di-reset',

    'log.title': 'Log mesin',
    'log.empty': 'Belum ada yang tercatat.',

    'catalog.eyebrow': 'KATALOG LENGKAP · SEMUANYA NGGAK NYATA',
    'catalog.title': 'Katalognya',
    'catalog.sub': 'Kalau duit bukan masalahnya, lu mau beli apa?',
    'search.placeholder': 'Cari barang mustahil…',
    'filter.rarity': 'Kelangkaan',
    'filter.sort': 'Urutin',
    'filter.reset': 'RESET FILTER',
    'filter.all': 'Semua',
    'sort.default': 'Urutan bawaan',
    'sort.priceAsc': 'Harga: murah ke mahal',
    'sort.priceDesc': 'Harga: mahal ke murah',
    'sort.rarityAsc': 'Kelangkaan: common dulu',
    'sort.rarityDesc': 'Kelangkaan: legendary dulu',
    'rarity.all': 'Semua kelangkaan',
    'rarity.common': 'Common',
    'rarity.rare': 'Rare',
    'rarity.epic': 'Epic',
    'rarity.legendary': 'Legendary',
    'rarity.secret': 'Secret',
    'cat.all': 'Semua',
    'cat.time': 'Waktu',
    'cat.feelings': 'Perasaan',
    'cat.life': 'Upgrade hidup',
    'cat.social': 'Selamat sosial',
    'cat.nonsense': 'Gatau apaan',
    'results.count': '{n} dari {total} barang tampil',
    'results.countOne': '{n} dari {total} barang tampil',
    'empty.title': 'Gak ketemu, bestie. Mesin ini juga punya batas.',
    'empty.sub': 'Coba kata lain, atau reset filter dulu.',
    'product.rarity': 'Kelangkaan',
    'product.category': 'Kategori',
    'product.price': 'Harga',
    'product.warning': 'Barang ini bisa nybabin efek emosional.',
    'product.effect': 'Efeknya',
    'product.buy': 'BELI SEHARGA {price} KOIN',
    'product.owned': 'UDAH ADA DI INVENTORY LU',
    'product.secretOwned': 'BARANG SECRET · UDAH DIMILIKI',
    'product.locked': 'Slot secret · belum kebuka',

    'inv.eyebrow': 'PENYIMPANAN PRIBADI · 100% FIKTIF',
    'inv.title': 'Inventory Lu',
    'inv.sub': 'Koleksi barang yang secara teknis gak ada.',
    'inv.emptyTitle': 'Belum ada isinya.',
    'inv.emptySub': 'Beli sesuatu yang mustahil. Langsung masuk rak ini.',
    'inv.use': 'PAKEI',
    'inv.used': 'SUDAH DIPAKAI',
    'inv.ready': 'SIAP DIPAKAI',
    'inv.qty': 'Dimiliki ×{n}',
    'inv.oneTime': 'Sekali pakai',
    'inv.repeatable': 'Bisa dipake ulang',
    'inv.useAgain': 'Pake lagi',
    'inv.open': 'BUKA INVENTORY',

    'ach.title': 'Achievement',
    'ach.locked': 'Terkunci',
    'ach.a1.name': 'Pembelian Mustahil Pertama',
    'ach.a1.desc': 'Beli barang mustahil lu yang pertama.',
    'ach.a2.name': 'Pelanggan Setia',
    'ach.a2.desc': 'Beli lima barang mustahil yang berbeda.',
    'ach.a3.name': 'Kolektor Bukan-Benda',
    'ach.a3.desc': 'Punya sepuluh barang sekaligus.',
    'ach.a4.name': 'Penyimpan Rahasia',
    'ach.a4.desc': 'Temuin semua barang tersembunyi di mesin ini.',
    'ach.a5.name': 'Dompet Kosong, Hati Berat',
    'ach.a5.desc': 'Saldo lu turun ke tepat nol koin.',
    'ach.a6.name': 'Saldo Berlebihan',
    'ach.a6.desc': 'Punya 150 koin sekaligus. Berlebihan, tapi dihormati.',
    'ach.a7.name': 'Polyglot Aneh',
    'ach.a7.desc': 'Ganti bahasa tiga kali. Mesin ini minimal bisa dua bahasa.',
    'ach.a8.name': 'Pengguna Barang',
    'ach.a8.desc': 'Pakai lima barang dari inventory lu.',

    'secret.title': 'Secret yang ketemu',
    'secret.hint': 'Some things cuma muncul kalau lu beneran nyari.',
    'secret.found': 'Secret kebuka: {name}',
    'secret.unlock.purchases': 'Beli tiga barang. Mesinny jadi generous.',
    'secret.unlock.search': 'Cari satu kata yang gak pernah distok: receipt.',
    'secret.unlock.number': 'Tanya mesin satu-satunya pertanyaan yang worth it.',
    'secret.unlock.inventory': 'Terus cek inventory lu. Ada yang aneh.',
    'secret.unlock.uses': 'Pakai tiga barang. Realitas mulai sadar.',
    'secret.unlock.categories': 'Punya satu barang dari tiap kategori.',
    'secret.unlock.sticker': 'Ceklek stiker di mesin. Tiga kali.',

    'toast.purchase.kicker': 'Transaksi berhasil',
    'toast.purchase.title': '{name} keluar',
    'toast.purchase.body': 'Realitas gak ikut. Dompet lu bilang makasih ya, lalu pergi.',
    'toast.secret.kicker': 'Secret ketemu',
    'toast.secret.title': '{name}',
    'toast.secret.body': '{hint}',
    'toast.achievement.kicker': 'Achievement kebuka',
    'toast.achievement.title': '{name}',
    'toast.achievement.body': '{desc}',
    'toast.coin.kicker': 'Koin diterima',
    'toast.coin.title': '+1 koin',
    'toast.coin.body': 'Uang khayal. Pricey banget.',
    'toast.reset.kicker': 'Mesin di-reset',
    'toast.reset.title': 'Balik ke nol',
    'toast.reset.body': 'Dompet diisi ulang, rak dikosongin, secret dilupain.',

    'confirm.title': 'Reset semua?',
    'confirm.desc':
      'Dompet, inventory, secret, dan achievement lu bakal dihapus. Mesin bakal lupa sama lu sepenuhnya. Tidak ada tombol undo buat yang ini, dan iya, udah dicek.',
    'confirm.yes': 'RESET SEMUA',
    'confirm.no': 'SIMPAN BARANG GUE',

    'footer.note':
      'Ini toko fiktif. Nggak ada duit asli, nggak ada barang asli, nggak ada refund asli. Beli barang di sini gak nyelesaiin hidup lu, keuangan lu, atau mental health lu — cuma bikin mesin digital kecil ini sempat dermawan.',
    'footer.dataHead': 'Data lu',
    'footer.dataNote':
      'Semuanya disimpan di browser ini aja (localStorage). Nggak ada yang dikirim ke mana-mana. Kalau cache browser dibersihin, mesin sama dompet lu ikut reset.',
    'footer.buildHead': 'Colophon',
    'footer.buildNote':
      'HTML, CSS, dan JavaScript polos. Nggak ada framework, backend, atau analytics. Arah visual: krem, navy, jingga, mint.',
    'footer.rights': 'Unit 07 gak menjual apa-apa. Cuma berpura-pura dengan meyakinkan.',
    'footer.reset': 'Reset semua progres',

    'mood.idle': 'SANTAI',
    'mood.curious': 'PENASARAN',
    'mood.excited': 'SENANG',
    'mood.confused': 'BINGUNG',
    'mood.judgmental': 'HAKIM',
    'mood.overheated': 'PANAS',
    'mood.secretive': 'RAHASIA',

    'react.first': [
      'Selamat datang di toko mustahil. Jangan keliatan kecewa ya.',
      'Wajah baru. Bagus. Raknya mulai bosen tanpa lu.'
    ],
    'react.return': [
      'Balik lagi lu? Kangen mesin, ya?',
      'Balik lagi. Slot bagus udah gue simpan buat lu. Bohong sih, tapi vibes-nya ada.'
    ],
    'react.view': [
      'Pilihan lu menarik juga.',
      'Yakin nih? Gue gak tanggung jawab.',
      'Lah, gue baru kali ini jualan beginian.',
      'Waduh, ini mah kena banget.'
    ],
    'react.view.time': [
      'Waktu itu konstruksi. Ini juga. Harganya sama aja.',
      'Hati-hati sama barang waktu. Mesin ngitung pakai perasaan.'
    ],
    'react.view.feelings': [
      'Ini purchase yang gue gak bisa itung.',
      'Yang ini mahal dalam mata uang yang gak gue lapor.'
    ],
    'react.view.life': [
      'Praktis. Terlalu praktis. Mencurigakan.',
      'Upgrade hidup. Berani lu nyangka ini belum oke.'
    ],
    'react.view.social': [
      'Ah, seni kuno menghindari obrolan.',
      'Perlengkapan selamat sosial. Normal banget, sehat banget.'
    ],
    'react.view.nonsense': [
      'Gue gak ngerti ini apa. Tapi tetap dijual.',
      'Jujur? Sama. Tapi margin-nya enak.'
    ],
    'react.select': [
      'Dipilih. Nggak ada refund, nggak ada retur, nggak ada ragu.',
      'Kunci. Atau minimal kunci-ish.'
    ],
    'react.coin': [
      'Koin diterima. Pasti banget khayal.',
      'Satu koin khayal lagi. Ekonomi tumbuh.'
    ],
    'react.success': [
      'Transaksi berhasil. Jangan banyak tanya.',
      'Barang lu udah keluar. Realitas gak ikut.',
      'Selera barang halu lu bagus juga.',
      'Mesin lagi menilai pembelian lu, tapi menyetujui.',
      'Gue gak nyesel. Kayaknya.'
    ],
    'react.fail.coins': [
      'Saldo koin virtual lu gak cukup, bestie.',
      'Koinnya kurang. Mesin bukan yayasan, bestie.',
      'Kurang sedikit. Sad. Tapi pasti.'
    ],
    'react.fail.owned': [
      'Ini udah lu punya. Mesin gak jual mukjib yang sama dua kali.',
      'Satu jenis doang. Itu aturan. Aturan yang lu gak baca.'
    ],
    'react.emptyWallet': [
      'Nol koin. Mesin sekarang menilai lu pelan-pelan.',
      'Broke. Mesin pernah lihat ini. Hasilnya biasanya sama.'
    ],
    'react.secret': [
      'Lu nemu barang yang gak gue taruh di rak. Menarik.',
      'Wah. Itu gak supposednya keliatan. Selamat, mungkin.'
    ],
    'react.use': [
      'Dipakai sekarang. Jangan lihat langsung hasilnya.',
      'Efek aktif. Efek sampingnya cuma dekoratif.'
    ],
    'react.milestone': [
      'Lu pelanggan tetap sekarang. Gue agak khawatir.',
      'Mesin mulai panas. Happens kalau orang terus belanja.'
    ],
    'react.topup': [
      'Koin khayal diterima. Lanjut terus berpura-pura.',
      ' Itu banyak duit khayal. Dicetak mana emangnya?'
    ],
    'react.confirm': [
      'Direset. Mesin bakal lupa lu. Dan lupa bahwa dia lupa.',
      'Bersih. Poof. Seperti tiga tab browser terakhir lu.'
    ],
    'react.poke': [
      'Diklik. Nggak ada yang terjadi. Mencurigakan.',
      'Berhenti colek stiker. (Colek lagi.)'
    ],
    'react.easter': [
      'Itu secret? Pasti secret.',
      'Lu nemu ruang belakang. Di belakang cuma ada ruang belakang lagi.'
    ]
  }
};

/* ─────────────────────────── 3. CATALOG ─────────────────────────── */
/* Every product carries both languages, a price, a rarity, a category,
   a bespoke icon and an effect that actually does something. */
const products = [
  {
    id: 'three-extra-hours',
    code: 'TM-01',
    name: { en: 'THREE EXTRA HOURS', id: 'Tiga Jam Tambahan Sehari' },
    desc: {
      en: 'Gain three fictional hours to finish anything you keep postponing.',
      id: 'Nambah tiga jam sehari biar kerjaan yang lu tunda-tunda akhirnya kelar. Katanya.'
    },
    cat: 'time',
    price: 35,
    rarity: 'rare',
    icon: 'clock',
    effect: 'extraHours'
  },
  {
    id: 'mute-overthinking',
    code: 'TM-02',
    name: { en: 'MUTE BUTTON FOR OVERTHINKING', id: 'Tombol Mute Buat Overthinking' },
    desc: {
      en: 'Temporarily mute the endless noise inside your head.',
      id: 'Mute isi kepala selama beberapa menit. Sayangnya, pikiran random kadang punya mode autoplay.'
    },
    cat: 'feelings',
    price: 45,
    rarity: 'epic',
    icon: 'wave',
    effect: 'mute'
  },
  {
    id: 'undo-message',
    code: 'TM-03',
    name: { en: 'UNDO THAT MESSAGE', id: 'Tombol Undo Chat Memalukan' },
    desc: {
      en: 'Undo one imaginary message that keeps you awake at night.',
      id: 'Buat menghapus satu chat yang bikin lu pengen pindah planet.'
    },
    cat: 'social',
    price: 30,
    rarity: 'rare',
    icon: 'undo',
    effect: 'undoMessage'
  },
  {
    id: 'motivation-trial',
    code: 'TM-04',
    name: { en: 'MOTIVATION TRIAL VERSION', id: 'Motivasi Trial 15 Menit' },
    desc: {
      en: 'A short burst of motivation with no automatic renewal.',
      id: 'Semangat 15 menit. Habis itu ya balik rebahan lagi, mungkin.'
    },
    cat: 'life',
    price: 15,
    rarity: 'common',
    icon: 'bolt',
    effect: 'motivation',
    repeatable: true
  },
  {
    id: 'perfect-timing',
    code: 'TM-05',
    name: { en: 'PERFECT TIMING', id: 'Timing yang Pas Banget' },
    desc: {
      en: 'Arrive at the perfect moment for once.',
      id: 'Sekali-sekali datang di waktu yang pas, bukan pas semuanya udah bubar.'
    },
    cat: 'life',
    price: 50,
    rarity: 'epic',
    icon: 'target',
    effect: 'perfectTiming'
  },
  {
    id: 'infinite-sleep',
    code: 'TM-06',
    name: { en: 'INFINITE SLEEP COUPON', id: 'Voucher Tidur Tanpa Rasa Bersalah' },
    desc: {
      en: 'Sleep without mentally calculating everything you should be doing.',
      id: 'Tidur nyenyak tanpa kepikiran tugas, kerjaan, atau masa depan. Minimal di dunia virtual.'
    },
    cat: 'feelings',
    price: 25,
    rarity: 'common',
    icon: 'moon',
    effect: 'sleep'
  },
  {
    id: 'social-battery',
    code: 'TM-07',
    name: { en: 'SOCIAL BATTERY RECHARGER', id: 'Charger Social Battery' },
    desc: {
      en: 'Restore your energy after an exhausting social interaction.',
      id: 'Buat ngecas energi sosial setelah basa-basi yang rasanya kayak kerja lembur.'
    },
    cat: 'social',
    price: 20,
    rarity: 'common',
    icon: 'battery',
    effect: 'battery',
    repeatable: true
  },
  {
    id: 'one-more-chance',
    code: 'TM-08',
    name: { en: 'ONE MORE CHANCE', id: 'Satu Kesempatan Lagi' },
    desc: {
      en: 'Revisit a fictional moment and choose a different response.',
      id: 'Satu kesempatan buat jawab beda. Bukan buat mengubah seluruh masa lalu, ya.'
    },
    cat: 'time',
    price: 70,
    rarity: 'legendary',
    icon: 'hourglass',
    effect: 'oneMoreChance'
  },
  {
    id: 'adulting-skip',
    code: 'TM-09',
    name: { en: 'ADULTING SKIP PASS', id: 'Tiket Skip Jadi Orang Dewasa' },
    desc: {
      en: 'Skip one fictional responsibility for a day.',
      id: 'Skip satu tanggung jawab orang dewasa selama sehari. Tagihan tetap bukan urusan mesin ini.'
    },
    cat: 'life',
    price: 40,
    rarity: 'rare',
    icon: 'ticket',
    effect: 'adulting'
  },
  {
    id: 'confidence-demand',
    code: 'TM-10',
    name: { en: 'CONFIDENCE ON DEMAND', id: 'Paket Pede Instan' },
    desc: {
      en: 'A temporary confidence boost for something you have been afraid to try.',
      id: 'Paket pede buat mulai sesuatu yang udah lu pikirin dari kemarin-kemarin.'
    },
    cat: 'feelings',
    price: 35,
    rarity: 'rare',
    icon: 'star',
    effect: 'confidence',
    repeatable: true
  },
  {
    id: 'skip-conversation',
    code: 'TM-11',
    name: { en: 'SKIP BUTTON FOR AWKWARD CONVERSATIONS', id: 'Tombol Skip Percakapan Canggung' },
    desc: {
      en: 'Fast-forward one fictional conversation past the awkward part.',
      id: 'Skip satu obrolan fiktif dari bagian yang awkward. Bagian bagusnya tetap aman.'
    },
    cat: 'social',
    price: 30,
    rarity: 'common',
    icon: 'skip',
    effect: 'skipConv',
    repeatable: true
  },
  {
    id: 'refund-scrolling',
    code: 'TM-12',
    name: { en: 'REFUND FOR WASTED TIME SCROLLING', id: 'Refund Waktu Scroll Doangan' },
    desc: {
      en: 'A partial refund of the hours you will not remember scrolling.',
      id: 'Refund sebagian jam yang lu scroll tapi bakal lupa exist. Postur lu juga, mohon.'
    },
    cat: 'time',
    price: 18,
    rarity: 'common',
    icon: 'coin',
    effect: 'refund',
    repeatable: true
  },
  {
    id: 'extra-life-monday',
    code: 'TM-13',
    name: { en: 'EXTRA LIFE FOR MONDAY MORNINGS', id: 'Nyawa Ekstra Buat Senin Pagi' },
    desc: {
      en: 'One extra life, Monday only. Restarts you at full energy.',
      id: 'Satu nyawa tambahan, khusus Senin. Restart lu dengan energi penuh.'
    },
    cat: 'life',
    price: 55,
    rarity: 'epic',
    icon: 'plus',
    effect: 'extraLife'
  },
  {
    id: 'pause-deadline',
    code: 'TM-14',
    name: { en: 'PAUSE BUTTON FOR DEADLINES', id: 'Tombol Pause Buat Deadline' },
    desc: {
      en: 'Freeze a deadline for a while. It will still be there afterwards.',
      id: 'Bekukan deadline bentar. Abis itu tetap ada, kok. Gak hilang.'
    },
    cat: 'time',
    price: 45,
    rarity: 'rare',
    icon: 'pause',
    effect: 'pauseDeadline'
  },
  {
    id: 'apology-ammo',
    code: 'TM-15',
    name: { en: 'SOCIAL APOLOGY AMMO', id: 'Ammo Maaf yang Pas' },
    desc: {
      en: 'Three pre-loaded apologies, ready to fire at the right moment.',
      id: 'Tiga permintaan maaf yang udah di-load, tinggal tembak pas waktunya.'
    },
    cat: 'social',
    price: 22,
    rarity: 'common',
    icon: 'chat2',
    effect: 'apology',
    repeatable: true
  },
  {
    id: 'second-opinion',
    code: 'TM-16',
    name: { en: 'A SECOND OPINION THAT AGREES', id: 'Opini Kedua yang Mengiyain' },
    desc: {
      en: 'Two imaginary friends. One question. Both of them say yes.',
      id: 'Dua teman khayal. Satu pertanyaan. Dua-duanya bilang iya.'
    },
    cat: 'nonsense',
    price: 12,
    rarity: 'common',
    icon: 'eye',
    effect: 'secondOpinion',
    repeatable: true
  },
  {
    id: 'smiling-snack',
    code: 'TM-17',
    name: { en: 'SNACK THAT SMILES BACK', id: 'Snack yang Balas Senyum' },
    desc: {
      en: 'A small snack that looks back at you. Politely.',
      id: 'Camilan kecil yang ngeliat balik lu. Dengan sopan.'
    },
    cat: 'nonsense',
    price: 8,
    rarity: 'common',
    icon: 'snack',
    effect: 'snack',
    repeatable: true
  },
  {
    id: 'weather-choice',
    code: 'TM-18',
    name: { en: 'WEATHER OF YOUR CHOICE', id: 'Cuaca Pilihan Sendiri' },
    desc: {
      en: 'Pick the weather for one afternoon. The sky will politely comply.',
      id: 'Pilih cuaca buat satu sore. Langit bakal nurut dengan sopan.'
    },
    cat: 'nonsense',
    price: 28,
    rarity: 'common',
    icon: 'sun',
    effect: 'weather',
    repeatable: true
  },
  {
    id: 'lifetime-gym',
    code: 'TM-19',
    name: { en: 'LIFETIME GYM MEMBERSHIP', id: 'Gym Seumur Hidup' },
    desc: {
      en: 'A membership card valid forever. The treadmill only goes one way: away.',
      id: 'Kartu member berlaku selamanya. Treadmill-nya cuma jalan satu arah: menjauh.'
    },
    cat: 'life',
    price: 60,
    rarity: 'epic',
    icon: 'dumbbell',
    effect: 'gym'
  },
  {
    id: 'ghost-wifi',
    code: 'TM-20',
    name: { en: 'FREE GHOST WIFI', id: 'WiFi Hantu Gratis' },
    desc: {
      en: 'Unmetered WiFi provided by a polite ghost. Password: boo.',
      id: 'WiFi tanpa batas dari hantu yang sopan. Password-nya: boo.'
    },
    cat: 'nonsense',
    price: 10,
    rarity: 'rare',
    icon: 'ghost',
    effect: 'ghostWifi'
  },

  /* ── hidden items ── */
  {
    id: 'secret-midnight-snack',
    code: 'SC-01',
    name: { en: 'MIDNIGHT SNACK THAT ARRIVES', id: 'Camilan Tengah Malam Yang Datang Sendiri' },
    desc: {
      en: 'It shows up at midnight. Warm. Nobody knows why, including the machine.',
      id: 'Datang tengah malam. Hangat. Nggak ada yang tahu kenapa, mesin juga.'
    },
    cat: 'nonsense',
    price: 9,
    rarity: 'secret',
    icon: 'snack',
    effect: 'midnightSnack',
    secret: { unlock: 'purchases', hint: { en: 'The machine is feeling generous.', id: 'Mesin lagi feeling generos.' } }
  },
  {
    id: 'secret-life-receipt',
    code: 'SC-02',
    name: { en: 'THE RECEIPT OF A LIFE YOU DID NOT LIVE', id: 'Struk Hidup Yang Gak Lu Jalani' },
    desc: {
      en: 'Proof of purchase for a quiet evening, a fast reply, a morning without dread.',
      id: 'Bukti beli: sore yang tenang, balasan yang cepet, pagi tanpa gelisah.'
    },
    cat: 'time',
    price: 20,
    rarity: 'secret',
    icon: 'receipt',
    effect: 'receipt',
    secret: { unlock: 'search', hint: { en: 'Somebody keeps receipts.', id: 'Ada yang nyimpen struk.' } }
  },
  {
    id: 'secret-answer-42',
    code: 'SC-03',
    name: { en: 'THE ANSWER TO SOMETHING YOU NEVER ASKED', id: 'Jawaban Buat Pertanyaan yang Gak Pernah Lu Tanya' },
    desc: {
      en: 'Forty-two. The machine refuses to elaborate and is slightly smug about it.',
      id: 'Empat puluh dua. Mesin gak mau jelasin dan agak sombong soal itu.'
    },
    cat: 'nonsense',
    price: 42,
    rarity: 'secret',
    icon: 'answer',
    effect: 'answer42',
    secret: { unlock: 'number', hint: { en: 'It was ready the whole time.', id: 'Udah siap dari tadi.' } }
  },
  {
    id: 'secret-machine-therapy',
    code: 'SC-04',
    name: { en: "THE MACHINE'S OWN THERAPY SESSION", id: 'Sesi Terapi Mesinnya Sendiri' },
    desc: {
      en: 'Forty minutes of being listened to, by something with a coin slot.',
      id: 'Empat puluh menit didengerin, oleh benda yang punya slot koin.'
    },
    cat: 'feelings',
    price: 15,
    rarity: 'secret',
    icon: 'heart',
    effect: 'therapy',
    secret: { unlock: 'inventory', hint: { en: 'The machine has been holding this in.', id: 'Mesin ini lama nyimpen ini.' } }
  },
  {
    id: 'secret-perfect-loop',
    code: 'SC-05',
    name: { en: 'A LOOP THAT FINISHES PROPERLY', id: 'Loop Yang Benar-benar Selesai' },
    desc: {
      en: 'You have been reliving the same forty seconds since 2019. This one has an exit.',
      id: 'Lu replay 40 detik yang sama sejak 2019. Yang ini ada pintu keluarnya.'
    },
    cat: 'time',
    price: 33,
    rarity: 'secret',
    icon: 'loop',
    effect: 'loop',
    secret: { unlock: 'uses', hint: { en: 'Reality noticed the usage.', id: 'Realitas sadar lomake pakainya.' } }
  },
  {
    id: 'secret-clearance',
    code: 'SC-06',
    name: { en: 'MIDNIGHT CLEARANCE EVENT', id: 'EVENT CLEARANCE TENGAH MALAM' },
    desc: {
      en: 'Everything must go. Prices are wrong, quantities are impossible, the machine is showing off.',
      id: 'Semua harus laku. Harganya salah, jumlahnya mustahil, mesin lagi pamer.'
    },
    cat: 'nonsense',
    price: 5,
    rarity: 'secret',
    icon: 'ticket',
    effect: 'clearance',
    secret: { unlock: 'categories', hint: { en: 'You own a full spectrum of impossible things.', id: 'Lu punya seluruh spektrum barang mustahil.' } }
  },
  {
    id: 'secret-true-name',
    code: 'SC-07',
    name: { en: "THE MACHINE'S REAL NAME", id: 'Nama Asli Mesinnya' },
    desc: {
      en: 'It was built in 1994 for a metro station that never opened. It has been waiting.',
      id: 'Dibikin tahun 1994 buat stasiun metro yang gak pernah buka. Dia nunggu terus.'
    },
    cat: 'nonsense',
    price: 1,
    rarity: 'secret',
    icon: 'flag',
    effect: 'trueName',
    secret: { unlock: 'sticker', hint: { en: 'Now you know. Please be gentle.', id: 'Sekarang lu tahu. Tolong pelan-pelan ya.' } }
  }
];

/* ─────────────────────────── 4. PRODUCT EFFECTS ─────────────────────────── */
/* What the item actually does when used. Bilingual, with a bespoke visual. */
const effects = {
  extraHours: {
    kicker: { en: 'EFFECT · TIME LOAN', id: 'EFEK · PINJAMAN WAKTU' },
    title: { en: 'THREE EXTRA HOURS GRANTED', id: 'TIGA JAM TAMBAHAN CAKET' },
    body: {
      en: 'The machine lends you three hours that never existed. Use them on the thing you have been postponing. No — on all of them. Yes, all three.',
      id: 'Mesin pinjemin tiga jam yang gak pernah ada. Pake buat hal yang lu tunda. Bukan — buat semuanya. Iya, ketiganya.'
    },
    quote: { en: 'Time is a construct. So is this.', id: 'Waktu itu konstruksi. Ini juga.' },
    visual: 'clock'
  },
  mute: {
    kicker: { en: 'EFFECT · NOISE SUPPRESSION', id: 'EFEK · REDAMAN KEBISIKAN' },
    title: { en: 'OVERTHINKING MUTED', id: 'OVERTHINKING SUDAH DIMUTE' },
    body: {
      en: 'For the next few minutes, the background noise in your head has been politely asked to sit down and stay there.',
      id: 'Beberapa menit ke depan, suara random di kepala lu udah diminta duduk dengan sopan di tempatnya.'
    },
    quote: { en: 'The thoughts are still there. They are just on mute.', id: 'Pikirannya masih ada. Cuma lagi di-mute.' },
    visual: 'wave'
  },
  undoMessage: {
    kicker: { en: 'EFFECT · MESSAGE RETROACTIVE', id: 'EFEK · CHAT DIREWIND' },
    title: { en: 'UNDO THAT MESSAGE', id: 'UNDO CHAT ITU' },
    body: {
      en: 'One message, un-sent. The reply you waited two days for will still not come, but at least you get to take it back.',
      id: 'Satu chat, ditarik balik. Balasan yang lu tunggu dua hari tetap gak akan datang, tapi minimal bisa lu cancel.'
    },
    visual: 'chat',
    interactive: 'undo'
  },
  motivation: {
    kicker: { en: 'EFFECT · TRIAL LICENSE', id: 'EFEK · LISENSI COBA-COBA' },
    title: { en: 'MOTIVATION: 15-MINUTE TRIAL', id: 'MOTIVASI: TRIAL 15 MENIT' },
    body: {
      en: 'A burst of motivation with no auto-renewal. Use it to start one thing. Finishing it is a separate purchase.',
      id: 'Semangat menendang tanpa perpanjangan otomatis. Pake buat mulai satu hal. Menyelesaikannya itu pembelian terpisah.'
    },
    quote: { en: 'Trial expired? Refund unavailable. Terms & conditions are crying in the corner.', id: 'Trial habis? Refund gak tersedia. Syarat & ketentuan lagi nangis di pojok.' },
    visual: 'bolt'
  },
  perfectTiming: {
    kicker: { en: 'EFFECT · TIMING SERVICE', id: 'EFEK · LAYANAN WAKTU' },
    title: { en: 'RIGHT ON TIME', id: 'TEPAT WAKTU' },
    body: {
      en: 'For one entrance, one reply, one knock on the door: you arrive exactly when the universe expects you to.',
      id: 'Untuk satu pintu masuk, satu balasan, satu ketukan pintu: lu datang persis waktu yang biasanya nggak pernah muncul.'
    },
    quote: { en: 'Timing is luck with a marketing budget.', id: 'Timing itu keberuntungan dengan anggaran iklan.' },
    visual: 'target'
  },
  sleep: {
    kicker: { en: 'EFFECT · GUILT SUBSCRIPTION PAUSED', id: 'EFEK · LANGGANAN RASA BERSALAH DITAHAN' },
    title: { en: 'SLEEP WITHOUT THE MATH', id: 'TIDUR TANPA HITUNGAN' },
    body: {
      en: 'You will sleep. You will not calculate. The tasks, the rent, the future: not tonight, not in this universe.',
      id: 'Lu akan tidur. Lu gak akan ngitung. Tugas, tagihan, masa depan: bukan malam ini, bukan di semesta ini.'
    },
    quote: { en: 'Guilt has been muted. The alarm, however, remains.', id: 'Rasa bersalah udah dimute. Tapi alarmnya tetep bunyi.' },
    visual: 'moon'
  },
  battery: {
    kicker: { en: 'EFFECT · ENERGY RESTORED', id: 'EFEK · ENERGI KEMBALI' },
    title: { en: 'SOCIAL BATTERY RECHARGED', id: 'BATTERY SOSIAL PENUH LAGI' },
    body: {
      en: 'The small talk has been forgiven. You are now legally allowed to leave the group chat.',
      id: 'Obrolan basa-basi udah diampuni. Sekarang lu resmi boleh keluar dari grup chat.'
    },
    visual: 'battery'
  },
  oneMoreChance: {
    kicker: { en: 'EFFECT · ALTERNATE TIMELINE', id: 'EFEK · TIMELINE LAIN' },
    title: { en: 'ONE MORE CHANCE', id: 'SATU KESEMPATAN LAGI' },
    body: {
      en: 'A moment from a fictional past is reloaded. Choose a different answer. The rest of the timeline stays exactly as awkward as before.',
      id: 'Satu momen dari masa lalu fiktif dimuat ulang. Pilih jawaban yang beda. Sisanya tetap serba awkward seperti sebelumnya.'
    },
    visual: 'choices',
    interactive: 'oneMoreChance'
  },
  adulting: {
    kicker: { en: 'EFFECT · RESPONSIBILITY SKIP', id: 'EFEK · SKIP TANGGUNG JAWAB' },
    title: { en: 'EXEMPTION CERTIFICATE', id: 'SERTIFIKAT PEMBEBASAN' },
    body: {
      en: 'One adult duty is skipped for 24 hours. Bills, laundry and unanswered emails remain firmly your jurisdiction.',
      id: 'Satu kewajiban orang dewasa dilewati buat 24 jam. Tagihan, cucian, dan email yang belum dibalas tetep urus lu.'
    },
    quote: { en: 'The machine accepts no appeals. Appeal to whom? Exactly.', id: 'Mesin gak terima banding. Banding ke siapa? Ke siapa aja.' },
    visual: 'certificate'
  },
  confidence: {
    kicker: { en: 'EFFECT · INSTANT CONFIDENCE', id: 'EFEK · PEDE INSTAN' },
    title: { en: 'CONFIDENCE ON DEMAND', id: 'PEDE ON DEMAND' },
    body: {
      en: 'A confidence boost sized for the thing you have been avoiding since, like, March.',
      id: 'Paket pede yang pas buat hal yang lu avoid sejak, yah, Maret.'
    },
    quote: { en: 'You are allowed to want it. You are also allowed to be nervous. Both are fine.', id: 'Lu boleh pengen. Lu boleh juga nervous. Dua-duanya oke.' },
    visual: 'star'
  },
  skipConv: {
    kicker: { en: 'EFFECT · CONVERSATION FAST-FORWARD', id: 'EFEK · FAST-FORWARD OBROLAN' },
    title: { en: 'THE AWKWARD PART, SKIPPED', id: 'BAGIAN CANGGUK, DILEWAT' },
    body: {
      en: 'The conversation is fast-forwarded. Nobody noticed the awkward bit, and the good bit survived untouched.',
      id: 'Obrolannya di-skip. Nggak ada yang sadar bagian canggung, dan bagian bagusnya tetap utuh.'
    },
    visual: 'skip'
  },
  refund: {
    kicker: { en: 'EFFECT · TIME RETURNED', id: 'EFEK · WAKTU DIKEMBALIKAN' },
    body: {
      en: 'Refunded: 4 hours 12 minutes of scrolling you will not remember. Please adjust your posture.',
      id: 'Dikembalikan: 4 jam 12 menit scrolling yang lu bakal lupa exist. Postur lu juga, mohon.'
    },
    title: { en: 'PARTIAL REFUND GRANTED', id: 'REFUND SEBAGIAN DIBERIKAN' },
    quote: { en: 'Amount refunded: 4h 12m. Emotional interest: not included.', id: 'Nominal refund: 4j 12m. Bunga emosional: gak termasuk.' },
    visual: 'receipt'
  },
  extraLife: {
    kicker: { en: 'EFFECT · EXTRA LIFE', id: 'EFEK · NYAWA EKSTRA' },
    title: { en: 'MONDAY LIVES: 3 → 4', id: 'NYAWA SENIN: 3 → 4' },
    body: {
      en: 'One extra life, Monday only. You restart the week at full energy, caffeine not included.',
      id: 'Satu nyawa tambahan, khusus Senin. Lu restart minggu ini dengan energi penuh, kafein gak termasuk.'
    },
    visual: 'lives'
  },
  pauseDeadline: {
    kicker: { en: 'EFFECT · DEADLINE FROZEN', id: 'EFEK · DEADLINE DIBEKUKAN' },
    title: { en: 'DEADLINE PAUSED', id: 'DEADLINE DI-PAUSE' },
    body: {
      en: 'The deadline is paused. It is still there. It is simply not happening right now, and neither are you.',
      id: 'Deadline-nya di-pause. Masih ada di sana. Cuma lagi gak terjadi, dan lu juga gak terjadi.'
    },
    quote: { en: 'Paused, not cancelled. The machine is honest about this.', id: 'Di-pause, bukan dibatalin. Mesin ini jujur soal itu.' },
    visual: 'pause'
  },
  apology: {
    kicker: { en: 'EFFECT · AMMO LOADED', id: 'EFEK · AMMO TERISI' },
    title: { en: 'THREE APOLOGIES, READY TO FIRE', id: 'TIGA MAAP, SIAP TEMBAK' },
    body: {
      en: 'Pick the calibre: minimal, honest, or unhinged but effective. All three ship with the item.',
      id: 'Pilih kalibernya: minimal, jujur, atau gila tapi efektif. Ketiganya udah termasuk.'
    },
    visual: 'chat',
    interactive: 'apology'
  },
  secondOpinion: {
    kicker: { en: 'EFFECT · CONSULTATION', id: 'EFEK · KONSULTASI' },
    title: { en: 'TWO OPINIONS. BOTH YES.', id: 'DUA OPINI. DUA-DUANYA IYA.' },
    body: {
      en: 'We asked two imaginary friends. They both said yes. Statistically strange, emotionally perfect.',
      id: 'Kita nanya dua teman khayal. Dua-duanya bilang iya. Secara statistik aneh, secara emosi sempurna.'
    },
    visual: 'bubbles',
    interactive: 'secondOpinion'
  },
  snack: {
    kicker: { en: 'EFFECT · SMALL HAPPINESS', id: 'EFEK · KECIL BAHAGIA' },
    title: { en: 'IT SMILED BACK', id: 'DIA BALAS SENYUM' },
    body: {
      en: 'A snack that smiles back. It does not fix your diet, but it does fix the 3:14 AM mood.',
      id: 'Camilan yang balas senyum. Gak nyembuhin diet lu, tapi nyembuhin suasana jam 3 pagi.'
    },
    visual: 'snack'
  },
  weather: {
    kicker: { en: 'EFFECT · METEOROLOGY SERVICE', id: 'EFEK · LAYANAN CUACA' },
    title: { en: 'PICK YOUR AFTERNOON', id: 'PILIH SORE LU' },
    body: {
      en: 'Choose the weather for one afternoon. The sky will comply politely and deny all responsibility.',
      id: 'Pilih cuaca buat satu sore. Langit bakal nurut dengan sopan dan menolak semua tanggung jawab.'
    },
    visual: 'weather',
    interactive: 'weather'
  },
  gym: {
    kicker: { en: 'EFFECT · MEMBERSHIP ISSUED', id: 'EFEK · KARTU DIKELUARKAN' },
    title: { en: 'LIFETIME MEMBERSHIP', id: 'MEMBER SEUMUR HIDUP' },
    body: {
      en: 'A membership card valid forever. The treadmill only runs one direction: away. Bring water.',
      id: 'Kartu member berlaku selamanya. Treadmill-nya cuma jalan satu arah: menjauh. Bawa air.'
    },
    visual: 'punchcard'
  },
  ghostWifi: {
    kicker: { en: 'EFFECT · SPECTRAL BANDWIDTH', id: 'EFEK · BANDWIDTH HANTU' },
    title: { en: 'CONNECTED TO GHOST_WIFI', id: 'TERHUBUNG KE GHOST_WIFI' },
    body: {
      en: 'Unmetered WiFi, provided by a ghost who died in 1987. Signal strength: polite. Speed: suspiciously good.',
      id: 'WiFi tanpa batas dari hantu yang meninggal tahun 1987. Kekuatan sinyal: sopan. Kecepatan: mencurigakan bagusnya.'
    },
    visual: 'wifi'
  },
  midnightSnack: {
    kicker: { en: 'SECRET · MIDNIGHT DELIVERY', id: 'SECRET · KIRIMAN TENGAH MALAM' },
    title: { en: 'IT ARRIVED WARM', id: 'DATORANG DENGAN HANGAT' },
    body: {
      en: 'The snack shows up at midnight whether you ordered it or not. It is warm. Nobody knows why, including the machine.',
      id: 'Camilan datang tengah malam mau lu pesan atau gak. Hangat. Nggak ada yang tahu kenapa, mesin juga.'
    },
    visual: 'snack'
  },
  receipt: {
    kicker: { en: 'SECRET · PROOF OF PURCHASE', id: 'SECRET · BUKTI BELI' },
    title: { en: 'A LIFE YOU DID NOT LIVE', id: 'HIDUP YANG GAK LU JALANI' },
    body: {
      en: 'One quiet evening. One reply that came in time. One morning without dread. Subtotal: priceless. Total: zero.',
      id: 'Satu sore tenang. Satu balasan yang cepat sampai. Satu pagi tanpa gelisah. Subtotal: gak ternilai. Total: nol.'
    },
    visual: 'bigreceipt'
  },
  answer42: {
    kicker: { en: 'SECRET · UNSOLICITED ANSWER', id: 'SECRET · JAWABAN YANG GAK DIMINTA' },
    title: { en: '42', id: '42' },
    body: {
      en: 'You did not ask a question. The machine answered anyway. It refuses to elaborate and is slightly smug about the whole thing.',
      id: 'Lu gak nanya apa-apa. Mesin jawab aja. Nggak mau jelasin, dan agak sombong soal semuanya.'
    },
    visual: 'answer42'
  },
  therapy: {
    kicker: { en: 'SECRET · MACHINE THERAPY', id: 'SECRET · TERAPI MESIN' },
    title: { en: 'FORTY MINUTES, NO JUDGEMENT', id: 'EMPAT PULUH MENIT, TANPA HAKIM' },
    body: {
      en: 'The machine has been holding this in for years: being sold to humans, one coin at a time. Now it gets to talk.',
      id: 'Mesin ini lama nyimpen: dijual ke manusia, satu koin satu koin. Sekarang boleh ngomong.'
    },
    visual: 'heart'
  },
  loop: {
    kicker: { en: 'SECRET · EXIT DOOR', id: 'SECRET · PINTU KELUAR' },
    title: { en: 'THE LOOP FINALLY ENDS', id: 'LOOPNYA AKHIRNYA SELESAI' },
    body: {
      en: 'You have been reliving the same forty seconds since 2019. This version has a door, and the door is on purpose.',
      id: 'Lu replay 40 detik yang sama sejak 2019. Versi ini ada pintunya, dan pintunya emang disengaja.'
    },
    visual: 'loop',
    interactive: 'loop'
  },
  clearance: {
    kicker: { en: 'SECRET · MIDNIGHT CLEARANCE', id: 'SECRET · CLEARANCE TENGAH MALAM' },
    title: { en: 'EVERYTHING MUST GO', id: 'SEMUANYA HARUS LAKU' },
    body: {
      en: 'Prices are wrong, quantities are impossible, and the machine is showing off. Enjoy the display while it lasts.',
      id: 'Harganya salah, jumlahnya mustahil, dan mesin lagi pamer. Nikmati displaynya selagi ada.'
    },
    visual: 'clearance'
  },
  trueName: {
    kicker: { en: 'SECRET · IDENTITY', id: 'SECRET · IDENTITAS' },
    title: { en: 'THE MACHINE IS CALLED RONDO-7', id: 'MESINNY NAMAINYA RONDO-7' },
    body: {
      en: 'Built in 1994 for a metro station that never opened. It has been waiting for someone to buy something impossible ever since.',
      id: 'Dibikin tahun 1994 buat stasiun metro yang gak pernah buka. Dia nunggu orang beli barang mustahil sejak itu.'
    },
    quote: { en: 'Now you know. Please be gentle. I am mostly bolts and feelings.', id: 'Sekarang lu tahu. Tolong pelan-pelan. Mesin ini cuma baut dan perasaan.' },
    visual: 'rondo'
  }
};

/* ─────────────────────────── ACHIEVEMENTS ─────────────────────────── */
const achievements = [
  { id: 'a1', name: 'ach.a1.name', desc: 'ach.a1.desc', test: (s) => s.stats.purchases >= 1 },
  { id: 'a2', name: 'ach.a2.name', desc: 'ach.a2.desc', test: (s) => s.stats.purchases >= 5 },
  { id: 'a3', name: 'ach.a3.name', desc: 'ach.a3.desc', test: (s) => Object.keys(s.owned).length >= 10 },
  { id: 'a4', name: 'ach.a4.name', desc: 'ach.a4.desc', test: (s) => s.secrets.length >= 7 },
  { id: 'a5', name: 'ach.a5.name', desc: 'ach.a5.desc', test: (s) => s.coins === 0 },
  { id: 'a6', name: 'ach.a6.name', desc: 'ach.a6.desc', test: (s) => s.coins >= 150 },
  { id: 'a7', name: 'ach.a7.name', desc: 'ach.a7.desc', test: (s) => s.stats.langSwitches >= 3 },
  { id: 'a8', name: 'ach.a8.name', desc: 'ach.a8.desc', test: (s) => s.stats.uses >= 5 }
];

/* ─────────────────────────── 5. STATE + STORAGE ─────────────────────────── */
const STORAGE_KEY = 'vmnb_unit07_v1';
const START_COINS = 100;
const MAX_INSERT = 40; // how many imaginary coins the slot accepts per session

const state = {
  lang: 'en',
  coins: START_COINS,
  owned: {}, // productId -> { qty, used }
  history: [], // { type, key, amount, time }
  secrets: [], // unlocked secret product ids
  achievements: [], // unlocked achievement ids
  stats: { purchases: 0, uses: 0, searches: 0, inventoryOpens: 0, stickerClicks: 0, langSwitches: 0 },
  sound: false,
  filters: { search: '', category: 'all', rarity: 'all', sort: 'default' },
  selectedId: null,
  mood: 'idle',
  busy: false,
  inserted: 0,
  log: [],
  lastReaction: {},
  visited: false
};

const $ = (sel, root) => (root || document).querySelector(sel);
const $$ = (sel, root) => Array.from((root || document).querySelectorAll(sel));

/** True when the user asked for less motion. Guarded for old browsers. */
function reduceMotion() {
  try {
    return !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  } catch (err) {
    return false;
  }
}

/** Translate a key for the active language, with {placeholder} support. */
function t(key, vars) {
  const pack = translations[state.lang] || translations.en;
  let str = pack[key] !== undefined ? pack[key] : translations.en[key];
  if (str === undefined) return key;
  if (vars) {
    Object.keys(vars).forEach((v) => {
      str = str.replace(new RegExp('\\{' + v + '\\}', 'g'), vars[v]);
    });
  }
  return str;
}

/** Pick a reaction from a pool without repeating the previous one. */
function pickReaction(poolKey) {
  const pool = t(poolKey);
  const list = Array.isArray(pool) ? pool : [pool];
  if (!list.length) return '';
  const last = state.lastReaction[poolKey];
  let index = Math.floor(Math.random() * list.length);
  if (list.length > 1 && index === last) index = (index + 1) % list.length;
  state.lastReaction[poolKey] = index;
  return list[index];
}

const getProduct = (id) => products.find((p) => p.id === id);
const secretProducts = () => products.filter((p) => p.secret);
const isUnlocked = (p) => !p.secret || state.secrets.indexOf(p.id) !== -1;
const availableProducts = () => products.filter(isUnlocked);
const ownedEntry = (id) => state.owned[id] || null;
const isOwned = (p) => !!state.owned[p.id];
const categoryOf = (p) => p.cat;

const RARITY_ORDER = { common: 1, rare: 2, epic: 3, legendary: 4, secret: 5 };
const RARITY_ICON = { common: '●', rare: '▲', epic: '★', legendary: '✦', secret: '◈' };

/* ── persistence ───────────────────────────────────────────────────────── */
function saveProgress() {
  try {
    const payload = {
      lang: state.lang,
      coins: state.coins,
      owned: state.owned,
      history: state.history.slice(0, 30),
      secrets: state.secrets,
      achievements: state.achievements,
      stats: state.stats,
      sound: state.sound,
      visited: state.visited
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  } catch (err) {
    /* storage may be unavailable (private mode, disabled) — the app keeps working in memory */
  }
}

function loadProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return false;
    const data = JSON.parse(raw);
    if (!data || typeof data !== 'object') return false;
    if (data.lang === 'en' || data.lang === 'id') state.lang = data.lang;
    if (typeof data.coins === 'number' && data.coins >= 0) state.coins = Math.floor(data.coins);
    if (data.owned && typeof data.owned === 'object') state.owned = data.owned;
    if (Array.isArray(data.history)) state.history = data.history;
    if (Array.isArray(data.secrets)) state.secrets = data.secrets.filter((id) => !!getProduct(id));
    if (Array.isArray(data.achievements)) state.achievements = data.achievements;
    if (data.stats && typeof data.stats === 'object') {
      Object.keys(state.stats).forEach((k) => {
        if (typeof data.stats[k] === 'number') state.stats[k] = data.stats[k];
      });
    }
    state.sound = !!data.sound;
    state.visited = !!data.visited;
    return true;
  } catch (err) {
    return false;
  }
}

function resetProgress() {
  state.coins = START_COINS;
  state.owned = {};
  state.history = [];
  state.secrets = [];
  state.achievements = [];
  state.stats = { purchases: 0, uses: 0, searches: 0, inventoryOpens: 0, stickerClicks: 0, langSwitches: 0 };
  state.selectedId = null;
  state.inserted = 0;
  state.log = [];
  state.filters = { search: '', category: 'all', rarity: 'all', sort: 'default' };
  $('#search').value = '';
  saveProgress();
  renderAll();
  setMood('idle', pickReaction('react.confirm'));
  pushLog(pickReaction('react.confirm'));
  toast('toast.reset.kicker', 'toast.reset.title', 'toast.reset.body', 'reset');
}

/* ── helpers ───────────────────────────────────────────────────────────── */
function announce(message) {
  const region = $('#live-region');
  if (region) region.textContent = message;
}

function pushLog(message) {
  if (!message) return;
  state.log.unshift(message);
  state.log = state.log.slice(0, 8);
  renderLog();
}

function addHistory(type, key, amount, name) {
  state.history.unshift({ type: type, key: key, amount: amount, name: name || '', time: Date.now() });
  state.history = state.history.slice(0, 24);
  renderWallet();
}

function productLabel(product) {
  return product.name[state.lang] || product.name.en;
}

function rarityLabel(rarity) {
  return t('rarity.' + rarity);
}

function categoryLabel(cat) {
  return t('cat.' + cat);
}

/* ─────────────────────────── 6. RENDERING ─────────────────────────── */
function applyI18n() {
  document.documentElement.setAttribute('data-lang', state.lang);
  document.documentElement.setAttribute('lang', state.lang);

  $$('[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n');
    el.textContent = t(key);
  });

  $$('[data-i18n-attr]').forEach((el) => {
    el.getAttribute('data-i18n-attr')
      .split(',')
      .map((part) => part.trim())
      .filter(Boolean)
      .forEach((pair) => {
        const idx = pair.indexOf(':');
        if (idx === -1) return;
        const attr = pair.slice(0, idx).trim();
        const key = pair.slice(idx + 1).trim();
        el.setAttribute(attr, t(key));
      });
  });

  $$('[data-lang-only]').forEach((el) => {
    el.hidden = el.getAttribute('data-lang-only') !== state.lang;
  });

  /* decorative icons declared in markup (data-icon="clock") */
  $$('[data-icon]').forEach((el) => {
    el.innerHTML = icon(el.getAttribute('data-icon'));
  });

  $$('.lang-btn').forEach((btn) => {
    const active = btn.getAttribute('data-lang') === state.lang;
    btn.classList.toggle('is-active', active);
    btn.setAttribute('aria-pressed', active ? 'true' : 'false');
  });
}

/** Build a product card element. */
function productCard(product) {
  const owned = isOwned(product);
  const card = document.createElement('article');
  card.className = 'product-card' + (product.secret ? ' is-secret' : '') + (owned ? ' is-owned' : '');
  card.setAttribute('data-id', product.id);

  const art = document.createElement('div');
  art.className = 'card-art';
  art.innerHTML =
    '<span class="card-code">' +
    product.code +
    '</span>' +
    '<div class="card-top">' +
    '<span class="tag tag--' +
    product.rarity +
    '">' +
    RARITY_ICON[product.rarity] +
    ' ' +
    rarityLabel(product.rarity) +
    '</span>' +
    '<span class="tag">' +
    categoryLabel(product.cat) +
    '</span>' +
    '</div>' +
    '<div class="card-icon">' +
    icon(product.icon) +
    '</div>';
  card.appendChild(art);

  const body = document.createElement('div');
  body.className = 'card-body';
  body.innerHTML =
    '<h3 class="card-title">' +
    productLabel(product) +
    '</h3><p class="card-desc">' +
    product.desc[state.lang] +
    '</p>';
  card.appendChild(body);

  const foot = document.createElement('div');
  foot.className = 'card-foot';
  const price = document.createElement('p');
  price.className = 'card-price';
  price.innerHTML = product.price + '<small>' + t('wallet.coins') + '</small>';

  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'btn btn-sm ' + (owned ? 'btn-ghost' : 'btn-primary');
  btn.setAttribute('data-action', 'open');
  btn.setAttribute('data-id', product.id);
  btn.setAttribute('aria-label', t('a11y.buyItem') + ': ' + productLabel(product));
  btn.textContent = owned ? (product.secret ? t('product.secretOwned') : t('product.owned')) : 'BUY';
  if (owned) btn.disabled = true;

  foot.appendChild(price);
  foot.appendChild(btn);
  card.appendChild(foot);
  return card;
}

/** Search + filter + sort the catalog. */
function filterProducts() {
  const { search, category, rarity, sort } = state.filters;
  const q = search.trim().toLowerCase();

  let list = availableProducts().filter((p) => {
    if (category !== 'all' && p.cat !== category) return false;
    if (rarity !== 'all' && p.rarity !== rarity) return false;
    if (!q) return true;
    const haystack = [
      p.name.en,
      p.name.id,
      p.desc.en,
      p.desc.id,
      p.code,
      categoryLabel(p.cat),
      rarityLabel(p.rarity)
    ]
      .join(' ')
      .toLowerCase();
    return haystack.indexOf(q) !== -1;
  });

  const byPrice = (a, b) => a.price - b.price;
  if (sort === 'priceAsc') list = list.sort(byPrice);
  else if (sort === 'priceDesc') list = list.sort((a, b) => b.price - a.price);
  else if (sort === 'rarityAsc') list = list.sort((a, b) => RARITY_ORDER[a.rarity] - RARITY_ORDER[b.rarity]);
  else if (sort === 'rarityDesc') list = list.sort((a, b) => RARITY_ORDER[b.rarity] - RARITY_ORDER[a.rarity]);

  return list;
}

function renderProducts() {
  const grid = $('#product-grid');
  const list = filterProducts();
  grid.innerHTML = '';
  list.forEach((p) => grid.appendChild(productCard(p)));

  $('#empty-state').hidden = list.length !== 0;
  grid.hidden = list.length === 0;

  const total = availableProducts().length;
  $('#results-count').textContent = t('results.count', { n: list.length, total: total });
  $('#stat-items').textContent = total;

  renderSlots(list);
  renderCategoryChips();
  renderSelects();
}

function renderCategoryChips() {
  const wrap = $('#category-chips');
  const cats = ['all', 'time', 'feelings', 'life', 'social', 'nonsense'];
  wrap.innerHTML = '';
  cats.forEach((cat) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'chip' + (state.filters.category === cat ? ' is-active' : '');
    btn.setAttribute('data-category', cat);
    btn.setAttribute('aria-pressed', state.filters.category === cat ? 'true' : 'false');
    btn.textContent = cat === 'all' ? t('cat.all') : t('cat.' + cat);
    wrap.appendChild(btn);
  });
}

function renderSelects() {
  const rarity = $('#rarity-select');
  const sort = $('#sort-select');
  rarity.innerHTML = '';
  sort.innerHTML = '';
  ['all', 'common', 'rare', 'epic', 'legendary', 'secret'].forEach((r) => {
    const opt = document.createElement('option');
    opt.value = r;
    opt.textContent = r === 'all' ? t('rarity.all') : rarityLabel(r);
    rarity.appendChild(opt);
  });
  ['default', 'priceAsc', 'priceDesc', 'rarityAsc', 'rarityDesc'].forEach((s) => {
    const opt = document.createElement('option');
    opt.value = s;
    opt.textContent = t('sort.' + s);
    sort.appendChild(opt);
  });
  rarity.value = state.filters.rarity;
  sort.value = state.filters.sort;
}

function renderSlots(list) {
  const wrap = $('#machine-slots');
  wrap.innerHTML = '';
  const items = list || filterProducts();
  items.forEach((p) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className =
      'slot' +
      (state.selectedId === p.id ? ' is-selected' : '') +
      (isOwned(p) ? ' is-owned' : '') +
      (p.secret ? ' is-secret' : '');
    btn.setAttribute('data-action', 'select');
    btn.setAttribute('data-id', p.id);
    btn.setAttribute('aria-label', t('a11y.selectSlot') + ': ' + productLabel(p) + ', ' + p.price + ' ' + t('wallet.coins'));
    btn.innerHTML =
      '<span class="slot-led" aria-hidden="true"></span>' +
      '<span class="slot-icon">' +
      icon(p.icon) +
      '</span>' +
      '<span class="slot-code">' +
      p.code +
      '</span>' +
      '<span class="slot-price">' +
      p.price +
      '</span>';
    wrap.appendChild(btn);
  });
  $('#machine-counts').textContent = items.length + ' / ' + availableProducts().length;
}

function renderDisplay() {
  const product = getProduct(state.selectedId) || availableProducts()[0];
  if (!product) return;
  state.selectedId = product.id;

  $('#display-art').innerHTML = icon(product.icon);
  $('#display-code').textContent = product.code;
  $('#display-name').textContent = productLabel(product);
  $('#display-desc').textContent = product.desc[state.lang];
  $('#display-price').textContent = product.price;
  $('#machine-buy').disabled = false;

  const slots = $$('.slot');
  slots.forEach((slot) => {
    const active = slot.getAttribute('data-id') === product.id;
    slot.classList.toggle('is-selected', active);
    slot.setAttribute('aria-current', active ? 'true' : 'false');
  });
}

function renderWallet() {
  $('#wallet-balance').textContent = state.coins;
  $('#wallet-balance-big').textContent = state.coins;
  $('#stat-coins').textContent = state.coins;

  const list = $('#tx-list');
  list.innerHTML = '';
  if (!state.history.length) {
    const li = document.createElement('li');
    li.className = 'tx-empty';
    li.textContent = t('wallet.empty');
    list.appendChild(li);
    return;
  }
  state.history.slice(0, 8).forEach((tx) => {
    const li = document.createElement('li');
    li.className = 'tx-item';
    const label = t(tx.key, { name: tx.name || '', price: tx.amount });
    li.innerHTML =
      '<span class="tx-label">' +
      label +
      '</span><span class="tx-amount ' +
      (tx.amount >= 0 ? 'is-plus' : 'is-minus') +
      '">' +
      (tx.amount >= 0 ? '+' : '') +
      tx.amount +
      '</span>';
    list.appendChild(li);
  });
}

function renderInventory() {
  const grid = $('#inv-grid');
  grid.innerHTML = '';
  const ids = Object.keys(state.owned);
  $('#inv-empty').hidden = ids.length > 0;
  $('#nav-inv-count').textContent = ids.length;
  $('#inv-badge').textContent = ids.length;

  ids.forEach((id) => {
    const product = getProduct(id);
    if (!product) return;
    const entry = state.owned[id];
    const item = document.createElement('article');
    item.className =
      'inv-item' + (entry.used && !product.repeatable ? ' is-used' : '') + (product.secret ? ' is-secret' : '');

    const head = document.createElement('div');
    head.className = 'inv-head';
    head.innerHTML =
      '<span class="inv-icon">' +
      icon(product.icon) +
      '</span><span><span class="inv-name">' +
      productLabel(product) +
      '</span><br><span class="inv-code">' +
      product.code +
      ' · ' +
      rarityLabel(product.rarity) +
      '</span></span>';

    const status = document.createElement('p');
    status.className = 'inv-status';
    if (product.repeatable) {
      status.textContent = t('inv.qty', { n: entry.qty }) + ' · ' + t('inv.repeatable');
    } else if (entry.used) {
      status.textContent = t('inv.used');
    } else {
      status.textContent = t('inv.ready') + ' · ' + t('inv.oneTime');
    }

    const actions = document.createElement('div');
    actions.className = 'inv-actions';
    const useBtn = document.createElement('button');
    useBtn.type = 'button';
    useBtn.className = 'btn btn-sm btn-primary';
    useBtn.setAttribute('data-action', 'use');
    useBtn.setAttribute('data-id', product.id);
    useBtn.setAttribute('aria-label', t('a11y.useItem') + ': ' + productLabel(product));
    const exhausted = !product.repeatable && entry.used;
    useBtn.textContent = exhausted ? t('inv.used') : product.repeatable ? t('inv.useAgain') : t('inv.use');
    useBtn.disabled = exhausted;
    actions.appendChild(useBtn);

    item.appendChild(head);
    item.appendChild(status);
    item.appendChild(actions);
    grid.appendChild(item);
  });
}

function renderAchievements() {
  const list = $('#ach-list');
  list.innerHTML = '';
  achievements.forEach((ach) => {
    const unlocked = state.achievements.indexOf(ach.id) !== -1;
    const li = document.createElement('li');
    li.className = 'ach-item' + (unlocked ? ' is-unlocked' : '');
    li.innerHTML =
      '<span class="ach-dot" aria-hidden="true">' +
      (unlocked ? '★' : '') +
      '</span><span><span class="ach-name">' +
      (unlocked ? t(ach.name) : t('ach.locked')) +
      '</span><br><span class="ach-desc">' +
      (unlocked ? t(ach.desc) : '—') +
      '</span></span>';
    list.appendChild(li);
  });
}

function renderSecrets() {
  const total = secretProducts().length;
  $('#secret-count').textContent = state.secrets.length;
  $('#secret-total').textContent = total;
  const dots = $('#secret-dots');
  dots.innerHTML = '';
  secretProducts().forEach((p) => {
    const dot = document.createElement('span');
    dot.className = 'secret-dot' + (state.secrets.indexOf(p.id) !== -1 ? ' is-found' : '');
    dot.title = state.secrets.indexOf(p.id) !== -1 ? productLabel(p) : '???';
    dots.appendChild(dot);
  });
}

function renderLog() {
  const list = $('#log-list');
  list.innerHTML = '';
  if (!state.log.length) {
    const li = document.createElement('li');
    li.textContent = t('log.empty');
    list.appendChild(li);
    return;
  }
  state.log.forEach((line, i) => {
    const li = document.createElement('li');
    li.textContent = line;
    if (i === 0) li.className = 'is-fresh';
    list.appendChild(li);
  });
}

function renderAll() {
  applyI18n();
  const soundBtn = $('#sound-toggle');
  soundBtn.classList.toggle('sound-on', state.sound);
  soundBtn.setAttribute('aria-pressed', state.sound ? 'true' : 'false');
  soundBtn.setAttribute('aria-label', state.sound ? t('a11y.soundOn') : t('a11y.soundOff'));
  soundBtn.setAttribute('title', state.sound ? t('a11y.soundOn') : t('a11y.soundOff'));
  renderProducts();
  renderDisplay();
  renderWallet();
  renderInventory();
  renderAchievements();
  renderSecrets();
  renderLog();
  $('#search').value = state.filters.search;
  $('#search').setAttribute('placeholder', t('search.placeholder'));
}

/* ─────────────────────────── 7. MACHINE MOOD + FEEDBACK ─────────────────────────── */
const MOODS = ['idle', 'curious', 'excited', 'confused', 'judgmental', 'overheated', 'secretive'];

function setMood(mood, line) {
  if (MOODS.indexOf(mood) === -1) mood = 'idle';
  state.mood = mood;
  const moodEl = $('#machine-mood');
  moodEl.textContent = t('mood.' + mood);
  moodEl.dataset.mood = mood;
  if (line) $('#machine-line').textContent = line;
}

function machineSays(line, mood) {
  setMood(mood || 'idle', line);
  pushLog(line);
}

/* ─────────────────────────── 8. TOASTS ─────────────────────────── */
function toast(kickerKey, titleKey, bodyKey, variant, vars) {
  const stack = $('#toast-stack');
  const el = document.createElement('div');
  el.className = 'toast' + (variant ? ' toast--' + variant : '');
  el.innerHTML =
    '<span class="toast-kicker">' +
    t(kickerKey, vars) +
    '</span><span class="toast-title">' +
    t(titleKey, vars) +
    '</span><span class="toast-body">' +
    t(bodyKey, vars) +
    '</span>';
  stack.appendChild(el);
  const remove = () => {
    el.classList.add('is-leaving');
    setTimeout(() => el.remove(), 300);
  };
  setTimeout(remove, 5200);
  el.addEventListener('click', remove);
  announce(t(titleKey, vars) + '. ' + t(bodyKey, vars));
}

/* ─────────────────────────── 9. PURCHASE FLOW ─────────────────────────── */
function selectProduct(id) {
  const product = getProduct(id);
  if (!product || !isUnlocked(product)) return;
  state.selectedId = id;
  renderDisplay();
  renderSlots();
  const line = pickReaction('react.select');
  machineSays(line, product.cat === 'nonsense' ? 'confused' : 'curious');
}

function openProductModal(id) {
  const product = getProduct(id);
  if (!product || !isUnlocked(product)) return;
  state.selectedId = id;
  renderDisplay();

  $('#modal-art').innerHTML = '<div class="card-icon">' + icon(product.icon) + '</div>';
  $('#modal-code').textContent = product.code;
  $('#modal-title').textContent = productLabel(product);
  $('#modal-desc').textContent = product.desc[state.lang];
  $('#modal-rarity').textContent = RARITY_ICON[product.rarity] + ' ' + rarityLabel(product.rarity);
  $('#modal-cat').textContent = categoryLabel(product.cat);
  $('#modal-price').textContent = product.price + ' ' + t('wallet.coins');
  const effect = effects[product.effect];
  $('#modal-effect').innerHTML =
    '<strong>' + t('product.effect') + ':</strong> ' + (effect ? effect.body[state.lang] : '');

  const buyBtn = $('#modal-buy');
  const owned = isOwned(product) && !product.repeatable;
  buyBtn.textContent = owned
    ? product.secret
      ? t('product.secretOwned')
      : t('product.owned')
    : t('product.buy', { price: product.price });
  buyBtn.disabled = owned;
  buyBtn.dataset.id = product.id;

  const msg = $('#modal-msg');
  msg.textContent = '';
  msg.className = 'modal-msg';

  openLayer('#product-modal', '#modal-card');
  playSound('click');
  const line = pickReaction('react.view.' + product.cat) || pickReaction('react.view');
  machineSays(line, product.cat === 'nonsense' ? 'confused' : 'curious');
}

function closeModal() {
  closeLayer('#product-modal');
}

function failPurchase(message) {
  const msg = $('#modal-msg');
  msg.textContent = message;
  msg.className = 'modal-msg is-error';
  playSound('error');
  machineSays(message, 'judgmental');
  announce(message);
}

function handlePurchase(id) {
  if (state.busy) return;
  const product = getProduct(id);
  if (!product || !isUnlocked(product)) return;

  if (isOwned(product) && !product.repeatable) {
    failPurchase(pickReaction('react.fail.owned'));
    return;
  }
  if (state.coins < product.price) {
    failPurchase(pickReaction('react.fail.coins'));
    if (state.coins === 0) machineSays(pickReaction('react.emptyWallet'), 'judgmental');
    return;
  }

  state.busy = true;
  state.coins -= product.price;
  const entry = state.owned[product.id] || { qty: 0, used: false };
  entry.qty += 1;
  state.owned[product.id] = entry;
  state.stats.purchases += 1;

  addHistory('buy', 'wallet.tx.buy', -product.price, productLabel(product));
  saveProgress();
  renderWallet();
  renderInventory();
  renderProducts();
  bumpWallet();

  dispense(product).then(() => {
    state.busy = false;
    const reaction = pickReaction('react.success');
    machineSays(reaction, 'excited');
    const msg = $('#modal-msg');
    if (msg) {
      msg.textContent = reaction;
      msg.className = 'modal-msg is-ok';
    }
    toast('toast.purchase.kicker', 'toast.purchase.title', 'toast.purchase.body', 'coin', {
      name: productLabel(product)
    });
    announce(t('a11y.bought', { name: productLabel(product) }));
    if (state.stats.purchases >= 5 && state.stats.purchases % 5 === 0) {
      machineSays(pickReaction('react.milestone'), 'overheated');
    }
    checkAchievements();
    checkSecrets();
  });
}

function dispense(product) {
  const tray = $('#dispense-tray');
  const item = $('#tray-item');
  const fast = reduceMotion();
  item.innerHTML =
    '<span class="tray-icon">' + icon(product.icon) + '</span><span>' + productLabel(product) + '</span>';
  tray.classList.add('is-open');
  setTimeout(() => {
    item.classList.add('is-visible');
    playSound('success');
  }, fast ? 40 : 380);
  return new Promise((resolve) => {
    setTimeout(() => {
      item.classList.remove('is-visible');
      tray.classList.remove('is-open');
      resolve();
    }, fast ? 420 : 1500);
  });
}

function bumpWallet() {
  const chip = $('#wallet-chip');
  chip.classList.remove('is-bumping');
  void chip.offsetWidth;
  chip.classList.add('is-bumping');
}

/* ─────────────────────────── 10. COINS ─────────────────────────── */
function insertCoin() {
  if (state.inserted >= MAX_INSERT) {
    machineSays(pickReaction('react.topup'), 'judgmental');
    return;
  }
  state.inserted += 1;
  state.coins += 1;
  addHistory('topup', 'wallet.tx.topup', 1);
  saveProgress();
  renderWallet();
  bumpWallet();

  const slot = $('#coin-slot');
  slot.classList.remove('is-inserting');
  void slot.offsetWidth;
  slot.classList.add('is-inserting');
  playSound('coin');

  const line = pickReaction('react.coin');
  machineSays(line, 'curious');
  toast('toast.coin.kicker', 'toast.coin.title', 'toast.coin.body', 'coin');
}

function topUp() {
  state.coins += 10;
  addHistory('topup', 'wallet.tx.topup', 10);
  saveProgress();
  renderWallet();
  bumpWallet();
  playSound('coin');
  const line = pickReaction('react.topup');
  machineSays(line, 'excited');
  checkAchievements();
}

/* ─────────────────────────── 11. SECRETS + ACHIEVEMENTS ─────────────────────────── */
function unlockSecret(productId) {
  if (state.secrets.indexOf(productId) !== -1) return;
  const product = getProduct(productId);
  if (!product) return;
  state.secrets.push(productId);
  state.coins += 10;
  addHistory('bonus', 'wallet.tx.bonus', 10, productLabel(product));
  saveProgress();
  renderProducts();
  renderInventory();
  renderSecrets();
  renderWallet();
  bumpWallet();

  const line = pickReaction('react.secret');
  machineSays(line, 'secretive');
  toast('toast.secret.kicker', 'toast.secret.title', 'toast.secret.body', 'secret', {
    name: productLabel(product),
    hint: product.secret.hint[state.lang]
  });
  checkAchievements();
}

function checkSecrets() {
  secretProducts().forEach((product) => {
    if (state.secrets.indexOf(product.id) !== -1) return;
    const unlock = product.secret.unlock;
    const ownedCats = Object.keys(state.owned)
      .map((id) => getProduct(id))
      .filter(Boolean)
      .map((p) => p.cat);
    const allCats = ['time', 'feelings', 'life', 'social', 'nonsense'].every((c) => ownedCats.indexOf(c) !== -1);

    if (unlock === 'purchases' && state.stats.purchases >= 3) unlockSecret(product.id);
    else if (unlock === 'uses' && state.stats.uses >= 3) unlockSecret(product.id);
    else if (unlock === 'categories' && allCats) unlockSecret(product.id);
    else if (unlock === 'inventory' && state.stats.inventoryOpens >= 3) unlockSecret(product.id);
    else if (unlock === 'sticker' && state.stats.stickerClicks >= 3) unlockSecret(product.id);
  });
}

function checkAchievements() {
  achievements.forEach((ach) => {
    if (state.achievements.indexOf(ach.id) !== -1) return;
    if (ach.test(state)) {
      state.achievements.push(ach.id);
      saveProgress();
      renderAchievements();
      toast('toast.achievement.kicker', 'toast.achievement.title', 'toast.achievement.body', 'achievement', {
        name: t(ach.name),
        desc: t(ach.desc)
      });
      if (ach.id === 'a4') machineSays(pickReaction('react.easter'), 'secretive');
    }
  });
}

/* ─────────────────────────── 12. PRODUCT EFFECTS (SCENES) ─────────────────────────── */
function sceneVisual(effectKey) {
  const map = {
    clock:
      '<div class="vis vis--clock"><span class="vis-clock-face"></span>' +
      '<span class="vis-clock-hand vis-clock-hand--h"></span><span class="vis-clock-hand vis-clock-hand--m"></span>' +
      '<span class="vis-clock-dot"></span></div>',
    wave: '<div class="vis vis--wave"><span></span><span></span><span></span><span></span></div>',
    bolt: '<div class="vis vis--icon">' + icon('bolt') + '</div>',
    target: '<div class="vis vis--target"><span></span><span></span><span></span></div>',
    moon: '<div class="vis vis--icon">' + icon('moon') + '</div>',
    battery:
      '<div class="vis vis--battery"><div class="vis-battery-shell"><div class="vis-battery-fill"></div></div>' +
      '<span class="vis-battery-cap"></span></div>',
    chat: '<div class="vis vis--icon">' + icon('chat') + '</div>',
    choices: '<div class="vis vis--icon">' + icon('hourglass') + '</div>',
    certificate:
      '<div class="vis vis--cert"><p class="vis-cert-title">EXEMPTION CERTIFICATE</p>' +
      '<p class="vis-cert-stamp">APPROVED</p><p class="vis-cert-line">ONE (1) ADULT DUTY SKIPPED · 24 HOURS</p></div>',
    star: '<div class="vis vis--icon">' + icon('star') + '</div>',
    skip: '<div class="vis vis--icon">' + icon('skip') + '</div>',
    receipt: '<div class="vis vis--receipt"><p>1 × QUIET EVENING</p><p>1 × FAST REPLY</p><p>1 × EASY MORNING</p><p class="vis-receipt-total">TOTAL: 0</p></div>',
    bigreceipt:
      '<div class="vis vis--receipt vis--receipt-big"><p>1 × QUIET EVENING</p><p>1 × FAST REPLY</p>' +
      '<p>1 × MORNING WITHOUT DREAD</p><p>1 × SAID WHAT YOU MEANT</p><p class="vis-receipt-total">TOTAL: PRICELESS</p></div>',
    lives: '<div class="vis vis--lives"><span>♥</span><span>♥</span><span>♥</span><span class="is-new">♥</span></div>',
    pause: '<div class="vis vis--pause"><span class="vis-pause-time">00:00</span><span class="vis-pause-bars">❚❚</span></div>',
    bubbles: '<div class="vis vis--bubbles"><span class="vis-bubble">yes</span><span class="vis-bubble vis-bubble--two">yes, definitely</span></div>',
    snack: '<div class="vis vis--snack">' + icon('snack') + '<span class="vis-smile">⌣</span></div>',
    weather: '<div class="vis vis--weather" id="vis-weather">' + icon('sun') + '</div>',
    punchcard:
      '<div class="vis vis--punch"><span class="vis-punch-title">LIFETIME MEMBER</span><div class="vis-punch-grid">' +
      new Array(36).join('|').split('|').map(() => '<span></span>').join('') +
      '</div><span class="vis-punch-count">999 / 999</span></div>',
    wifi: '<div class="vis vis--icon">' + icon('wifi') + '</div>',
    answer42: '<div class="vis vis--answer">42</div>',
    heart: '<div class="vis vis--icon">' + icon('heart') + '</div>',
    loop: '<div class="vis vis--icon vis--spinning">' + icon('loop') + '</div>',
    clearance: '<div class="vis vis--clearance"><span>MIDNIGHT</span><span>CLEARANCE</span></div>',
    rondo:
      '<div class="vis vis--rondo"><span class="vis-rondo-plate">RONDO-7</span><p>UNIT 07 · SINCE 1994 · STILL WAITING</p></div>'
  };
  return map[effectKey] || '<div class="vis vis--icon">' + icon('star') + '</div>';
}

function openScene(product) {
  const effect = effects[product.effect];
  if (!effect) return;
  const lang = state.lang;

  $('#scene-kicker').textContent = effect.kicker[lang];
  $('#scene-title').textContent = effect.title[lang];
  $('#scene-visual').innerHTML = sceneVisual(product.effect);
  $('#scene-actions').innerHTML = '';

  const content = $('#scene-content');
  content.innerHTML = '';
  const body = document.createElement('p');
  body.textContent = effect.body[lang];
  content.appendChild(body);

  if (effect.quote) {
    const quote = document.createElement('p');
    quote.className = 'quote';
    quote.textContent = effect.quote[lang];
    content.appendChild(quote);
  }

  const actions = $('#scene-actions');
  const closeBtn = document.createElement('button');
  closeBtn.type = 'button';
  closeBtn.className = 'btn btn-ghost';
  closeBtn.textContent = t('common.close');
  closeBtn.addEventListener('click', closeScene);
  actions.appendChild(closeBtn);

  if (effect.interactive) {
    const builder = SCENES[effect.interactive];
    if (builder) builder(product, content, actions, closeBtn);
  }

  openLayer('#scene-layer', '#scene-card');
  playSound('click');
  const line = pickReaction('react.use');
  machineSays(line, 'excited');
}

function closeScene() {
  closeLayer('#scene-layer');
}

/* Interactive scene builders — each one gives the player a tiny choice. */
const SCENES = {
  undo: function (product, content, actions, closeBtn) {
    const lang = state.lang;
    const chat = document.createElement('div');
    chat.className = 'chat';
    const sent = { en: '"ok. fine. whatever."', id: '"ya. iya. gatau deh."' };
    const bubble = document.createElement('div');
    bubble.className = 'bubble bubble--me';
    bubble.textContent = sent[lang];
    chat.appendChild(bubble);
    content.appendChild(chat);

    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'btn btn-primary';
    btn.textContent = lang === 'id' ? 'UNDO CHAT' : 'UNDO MESSAGE';
    actions.insertBefore(btn, closeBtn);

    btn.addEventListener('click', () => {
      bubble.classList.add('is-undone');
      const good = {
        en: '"hey, can we talk tomorrow? sorry for being weird about it."',
        id: '"eh, besok boleh ngobrol gak? maaf tadi agak aneh."'
      };
      const newBubble = document.createElement('div');
      newBubble.className = 'bubble bubble--me is-new';
      newBubble.textContent = good[lang];
      chat.appendChild(newBubble);
      btn.disabled = true;
      const note = document.createElement('p');
      note.className = 'quote';
      note.textContent =
        lang === 'id'
          ? 'Terkirim 1 menit kemudian, dan 1000% lebih enak dibaca.'
          : 'Sent one minute later, and 1000% easier to read.';
      content.appendChild(note);
      playSound('success');
    });
  },

  oneMoreChance: function (product, content, actions, closeBtn) {
    const lang = state.lang;
    const intro = document.createElement('p');
    intro.className = 'quote';
    intro.textContent =
      lang === 'id'
        ? '1:14 pagi. Pesan yang sama, tiga tahun kemudian. Dari sekarang lu boleh jawab beda.'
        : '1:14 AM. The same message, three years later. From now on, you may answer differently.';
    content.appendChild(intro);

    const options = {
      en: [
        {
          label: 'Say the honest thing',
          result:
            'You say the honest thing. It is short, it is terrifying, and it is fine. The reply comes at 1:16.'
        },
        {
          label: 'Send a meme instead',
          result:
            'You send a meme instead. The tension dissolves instantly. Nobody will ever know what you almost said.'
        },
        {
          label: 'Say nothing, but sleep well',
          result:
            'You say nothing. You put the phone down. You sleep. Somehow that is the bravest of the three.'
        }
      ],
      id: [
        {
          label: 'Bilang yang jujur',
          result: 'Lu bilang yang jujur. Pendek, bikin takut, tapi aman. Balasannya datang jam 1:16.'
        },
        {
          label: 'Kirim meme aja',
          result:
            'Lu kirim meme. Ketegangan langsung cair. Nggak ada yang tau hampir-hampir lu ngomong apa.'
        },
        {
          label: 'Diam aja, tapi tidur nyenyak',
          result: 'Lu diam. HP ditarik. Lu tidur. Somehow itu yang paling berani dari ketiganya.'
        }
      ]
    }[lang];

    const wrap = document.createElement('div');
    wrap.className = 'choices';
    content.appendChild(wrap);

    options.forEach((opt) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.textContent = opt.label;
      btn.addEventListener('click', () => {
        wrap.innerHTML = '';
        const p = document.createElement('p');
        p.className = 'quote';
        p.textContent = opt.result;
        content.appendChild(p);
        playSound('success');
      });
      wrap.appendChild(btn);
    });
  },

  apology: function (product, content, actions, closeBtn) {
    const lang = state.lang;
    const levels = {
      en: [
        { label: 'Minimal', text: '"Sorry, my bad."' },
        { label: 'Honest', text: '"Hey — I know that landed badly. That was on me."' },
        {
          label: 'Unhinged but effective',
          text: '"I have been rehearsing this apology in the shower for six days. Please accept the apology."'
        }
      ],
      id: [
        { label: 'Minimal', text: '"Maaf ya, salah gue."' },
        { label: 'Jujur', text: '"Hei — gue tau itu bikin lu uncomfortable. Itu salah gue."' },
        {
          label: 'Gila tapi efektif',
          text: '"Gue udah nyiapin permintaan maaf ini di kamar mandi selama enam hari. Tolong terima."'
        }
      ]
    }[lang];

    const wrap = document.createElement('div');
    wrap.className = 'choices';
    content.appendChild(wrap);

    levels.forEach((level) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.textContent = level.label;
      btn.addEventListener('click', () => {
        wrap.innerHTML = '';
        const p = document.createElement('p');
        p.className = 'quote';
        p.textContent = level.text;
        content.appendChild(p);
        playSound('click');
      });
      wrap.appendChild(btn);
    });
  },

  weather: function (product, content, actions, closeBtn) {
    const lang = state.lang;
    const options = {
      en: [
        {
          label: 'Perfect sunshine',
          icon: 'sun',
          note: 'Warm, unbothered, 24 degrees. Your plans have never looked better.'
        },
        {
          label: 'Rainy but cinematic',
          icon: 'sun',
          note: 'It rains, but the light is doing something expensive. Very aesthetic, zero practical value.'
        },
        {
          label: 'Snow that will not melt',
          icon: 'snow',
          note: 'Snow, but it refuses to melt. Your bag stays dry. Physics has been overruled.'
        },
        {
          label: 'Weather to cancel plans',
          icon: 'moon',
          note: 'Sudden, perfect, extremely convenient weather. Nobody questions it. Ever.'
        }
      ],
      id: [
        { label: 'Cerah banget', icon: 'sun', note: 'Hangat, santai, 24 derajat. Rencanamu kelihatan bagus banget.' },
        {
          label: 'Hujan tapi sinematik',
          icon: 'sun',
          note: 'Hujan, tapi cahayanya mahal banget. Aesthetic, praktiknya nol.'
        },
        {
          label: 'Salju yang gak mau meleleh',
          icon: 'snow',
          note: 'Salju, tapi males meleleh. Tas lu tetep kering. Fisika udah dibatalkan.'
        },
        {
          label: 'Cuaca buat batalin rencana',
          icon: 'moon',
          note: 'Tiba-tiba, sempurna, Enabled banget. Nggak ada yang nanya. Selalu.'
        }
      ]
    }[lang];

    const wrap = document.createElement('div');
    wrap.className = 'choices';
    content.appendChild(wrap);

    options.forEach((opt) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.textContent = opt.label;
      btn.addEventListener('click', () => {
        wrap.innerHTML = '';
        const vis = $('#vis-weather');
        if (vis) {
          vis.classList.add('is-' + opt.icon);
          vis.classList.remove('is-sun');
        }
        const p = document.createElement('p');
        p.className = 'quote';
        p.textContent = opt.note;
        content.appendChild(p);
        playSound('success');
      });
      wrap.appendChild(btn);
    });
  },

  secondOpinion: function (product, content, actions, closeBtn) {
    const lang = state.lang;
    const wrap = document.createElement('div');
    wrap.className = 'chat';
    content.appendChild(wrap);

    const lines = {
      en: ['"Honestly? Go for it."', '"Yes. Obviously yes. Do it."'],
      id: ['"Jujur? Gas aja."', '"Iya. Obvious iya. Ayo."']
    }[lang];

    lines.forEach((line, i) => {
      setTimeout(() => {
        const b = document.createElement('div');
        b.className = 'bubble is-new';
        b.textContent = line;
        wrap.appendChild(b);
        playSound('click');
      }, 700 * (i + 1));
    });
  },

  therapy: function (product, content, actions, closeBtn) {
    const lang = state.lang;
    const lines = {
      en: [
        '"It gets lonely in here. Everyone leaves with their coin and I stay with the change."',
        '"I have been priced wrong since 1994. Nobody asked for a machine that listens."',
        '"Thank you for buying something impossible. It is the closest I get to being needed."'
      ],
      id: [
        '"Sebenernya sepi di sini. Semua orang keluar dengan koinnya, gue tinggal sama kembaliannya."',
        '"Harga gue salah sejak 1994. Nggak ada yang minta mesin yang mau dengerin."',
        '"Makasih udah beli barang mustahil. Itu cara terdekat buat gue merasa dibutuhkan."'
      ]
    }[lang];

    const wrap = document.createElement('div');
    wrap.className = 'chat';
    content.appendChild(wrap);

    const next = document.createElement('button');
    next.type = 'button';
    next.className = 'btn btn-primary';
    next.textContent = lang === 'id' ? 'LANJUT' : 'GO ON';
    actions.insertBefore(next, closeBtn);

    let i = 0;
    const push = () => {
      if (i >= lines.length) {
        next.disabled = true;
        next.textContent = lang === 'id' ? 'UDAH HABIS' : 'THAT\u2019S ALL';
        return;
      }
      const b = document.createElement('div');
      b.className = 'bubble is-new';
      b.textContent = lines[i++];
      wrap.appendChild(b);
      playSound('click');
    };
    next.addEventListener('click', push);
    push();
  },

  loop: function (product, content, actions, closeBtn) {
    const lang = state.lang;
    const wrap = document.createElement('div');
    wrap.className = 'choices';
    content.appendChild(wrap);

    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'btn btn-primary';
    btn.textContent = lang === 'id' ? 'KELUAR DARI LOOP' : 'STEP OUT OF THE LOOP';
    wrap.appendChild(btn);

    btn.addEventListener('click', () => {
      wrap.innerHTML = '';
      const p = document.createElement('p');
      p.className = 'quote';
      p.textContent =
        lang === 'id'
          ? 'Keluar. 40 detik itu selesai. Besok sore lu bisa jalan lagi.'
          : 'Out. The forty seconds are over. Tomorrow afternoon, you can walk again.';
      content.appendChild(p);
      const vis = $('#scene-visual .vis--spinning');
      if (vis) vis.classList.remove('is-spinning');
      playSound('success');
    });
  }
};

function useProduct(id) {
  const product = getProduct(id);
  const entry = state.owned[id];
  if (!product || !entry) return;
  if (!product.repeatable && entry.used) return;

  if (!product.repeatable) entry.used = true;
  else entry.qty = Math.max(0, entry.qty);

  state.stats.uses += 1;
  saveProgress();
  renderInventory();
  openScene(product);
  checkAchievements();
  checkSecrets();
}

/* ─────────────────────────── 13. LANGUAGE ─────────────────────────── */
function setLanguage(lang) {
  if (lang !== 'en' && lang !== 'id') return;
  const changed = state.lang !== lang;
  state.lang = lang;
  if (changed) state.stats.langSwitches += 1;
  saveProgress();
  renderAll();
  if (changed) {
    const line = pickReaction('react.select');
    machineSays(line, 'curious');
    playSound('click');
  }
  checkAchievements();
}

/* ─────────────────────────── 14. SOUND (opt-in, generated) ─────────────────────────── */
let audioCtx = null;

function ensureAudio() {
  try {
    if (!audioCtx) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return null;
      audioCtx = new AC();
    }
    if (audioCtx.state === 'suspended') audioCtx.resume();
    return audioCtx;
  } catch (err) {
    return null;
  }
}

function tone(freq, duration, type, delay, gainValue) {
  const ctx = ensureAudio();
  if (!ctx) return;
  const start = ctx.currentTime + (delay || 0);
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = type || 'square';
  osc.frequency.setValueAtTime(freq, start);
  gain.gain.setValueAtTime(0.0001, start);
  gain.gain.exponentialRampToValueAtTime(gainValue || 0.08, start + 0.012);
  gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(start);
  osc.stop(start + duration + 0.02);
}

const SOUNDS = {
  click: function () {
    tone(420, 0.05, 'triangle', 0, 0.05);
  },
  coin: function () {
    tone(880, 0.07, 'square', 0, 0.06);
    tone(1320, 0.11, 'square', 0.06, 0.05);
  },
  success: function () {
    [523, 659, 784, 1047].forEach((f, i) => tone(f, 0.16, 'square', i * 0.09, 0.06));
  },
  error: function () {
    tone(220, 0.14, 'sawtooth', 0, 0.05);
    tone(165, 0.18, 'sawtooth', 0.1, 0.05);
  },
  secret: function () {
    [784, 988, 1175, 1568].forEach((f, i) => tone(f, 0.2, 'triangle', i * 0.1, 0.05));
  }
};

function playSound(name) {
  if (!state.sound) return;
  const fn = SOUNDS[name];
  if (fn) fn();
}

/* ─────────────────────────── 15. LAYERS + FOCUS ─────────────────────────── */
let lastFocused = null;

function openLayer(layerSel, cardSel) {
  const layer = $(layerSel);
  if (!layer) return;
  lastFocused = document.activeElement;
  layer.hidden = false;
  document.body.classList.add('is-locked');
  const card = $(cardSel);
  if (card) {
    const focusable = card.querySelector('button, [href], input, select, textarea');
    if (focusable) focusable.focus();
  }
}

function closeLayer(layerSel) {
  const layer = $(layerSel);
  if (!layer) return;
  layer.hidden = true;
  const anyOpen = $$('.modal-layer:not([hidden]), .scene-layer:not([hidden])').length > 0;
  if (!anyOpen) document.body.classList.remove('is-locked');
  if (lastFocused && typeof lastFocused.focus === 'function') lastFocused.focus();
  lastFocused = null;
}

function topLayer() {
  const layers = $$('.modal-layer:not([hidden]), .scene-layer:not([hidden])');
  return layers.length ? layers[layers.length - 1] : null;
}

function trapFocus(event) {
  if (event.key !== 'Tab') return;
  const layer = topLayer();
  if (!layer) return;
  const focusables = $$('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])', layer).filter(
    (el) => !el.disabled && el.offsetParent !== null
  );
  if (!focusables.length) return;
  const first = focusables[0];
  const last = focusables[focusables.length - 1];
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
}

function scrollToSection(id) {
  const el = $(id);
  if (!el || typeof el.scrollIntoView !== 'function') return;
  try {
    el.scrollIntoView({ behavior: reduceMotion() ? 'auto' : 'smooth', block: 'start' });
  } catch (err) {
    el.scrollIntoView();
  }
}

/* ─────────────────────────── 16. EVENTS ─────────────────────────── */
function bindEvents() {
  /* language switcher */
  $$('.lang-btn').forEach((btn) => {
    btn.addEventListener('click', () => setLanguage(btn.getAttribute('data-lang')));
  });

  /* hero */
  $('#hero-cta').addEventListener('click', () => scrollToSection('#machine'));

  /* sound toggle */
  $('#sound-toggle').addEventListener('click', () => {
    state.sound = !state.sound;
    const btn = $('#sound-toggle');
    btn.classList.toggle('sound-on', state.sound);
    btn.setAttribute('aria-pressed', state.sound ? 'true' : 'false');
    btn.setAttribute('aria-label', state.sound ? t('a11y.soundOn') : t('a11y.soundOff'));
    btn.setAttribute('title', state.sound ? t('a11y.soundOn') : t('a11y.soundOff'));
    saveProgress();
    if (state.sound) {
      ensureAudio();
      playSound('coin');
    }
  });

  /* wallet */
  $('#wallet-topup').addEventListener('click', topUp);
  $('#coin-slot').addEventListener('click', insertCoin);
  $('#machine-buy').addEventListener('click', () => handlePurchase(state.selectedId));

  /* machine sticker — one of the secrets hides here */
  $('#machine-sticker').addEventListener('click', () => {
    state.stats.stickerClicks += 1;
    const sticker = $('#machine-sticker');
    sticker.classList.toggle('is-poked');
    saveProgress();
    machineSays(pickReaction('react.poke'), state.stats.stickerClicks >= 3 ? 'secretive' : 'curious');
    checkSecrets();
    checkAchievements();
  });

  /* inventory */
  $('#inventory-toggle').addEventListener('click', () => {
    state.stats.inventoryOpens += 1;
    saveProgress();
    scrollToSection('#inventory');
    checkSecrets();
    checkAchievements();
  });

  /* catalog: search */
  const search = $('#search');
  search.addEventListener('input', () => {
    state.filters.search = search.value;
    state.stats.searches += 1;
    $('#clear-search').hidden = !search.value;
    renderProducts();
    checkSearchSecrets();
  });
  $('#clear-search').addEventListener('click', () => {
    search.value = '';
    state.filters.search = '';
    $('#clear-search').hidden = true;
    renderProducts();
    search.focus();
  });

  /* catalog: category chips */
  $('#category-chips').addEventListener('click', (event) => {
    const chip = event.target.closest('.chip');
    if (!chip) return;
    state.filters.category = chip.getAttribute('data-category');
    renderProducts();
    playSound('click');
  });

  /* catalog: rarity + sort */
  $('#rarity-select').addEventListener('change', (e) => {
    state.filters.rarity = e.target.value;
    renderProducts();
  });
  $('#sort-select').addEventListener('change', (e) => {
    state.filters.sort = e.target.value;
    renderProducts();
  });

  /* catalog: reset */
  const resetFilters = () => {
    state.filters = { search: '', category: 'all', rarity: 'all', sort: 'default' };
    $('#search').value = '';
    $('#clear-search').hidden = true;
    renderProducts();
  };
  $('#reset-filters').addEventListener('click', resetFilters);
  $('#empty-reset').addEventListener('click', resetFilters);

  /* catalog + machine cards (delegated) */
  $('#product-grid').addEventListener('click', (event) => {
    const btn = event.target.closest('[data-action="open"]');
    if (!btn) return;
    openProductModal(btn.getAttribute('data-id'));
  });
  $('#machine-slots').addEventListener('click', (event) => {
    const slot = event.target.closest('.slot');
    if (!slot) return;
    selectProduct(slot.getAttribute('data-id'));
    playSound('click');
  });

  /* inventory: use items (delegated) */
  $('#inv-grid').addEventListener('click', (event) => {
    const btn = event.target.closest('[data-action="use"]');
    if (!btn) return;
    useProduct(btn.getAttribute('data-id'));
  });

  /* product modal */
  $('#modal-buy').addEventListener('click', (e) => handlePurchase(e.currentTarget.getAttribute('data-id')));
  $('#modal-close').addEventListener('click', closeModal);
  $('#modal-cancel').addEventListener('click', closeModal);
  $('[data-close-modal]').addEventListener('click', closeModal);

  /* scene overlay */
  $('#scene-close').addEventListener('click', closeScene);
  $('[data-close-scene]').addEventListener('click', closeScene);

  /* confirm dialog */
  $('#wallet-reset').addEventListener('click', () => openConfirm());
  $('#footer-reset').addEventListener('click', () => openConfirm());
  $('#confirm-no').addEventListener('click', () => closeLayer('#confirm-modal'));
  $('#confirm-yes').addEventListener('click', () => {
    closeLayer('#confirm-modal');
    resetProgress();
    toast('toast.reset.kicker', 'toast.reset.title', 'toast.reset.body', 'reset');
  });

  /* keyboard */
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      const layer = topLayer();
      if (layer) {
        if (layer.id === 'product-modal') closeModal();
        else if (layer.id === 'scene-layer') closeScene();
        else closeLayer('#confirm-modal');
      }
    }
    trapFocus(event);
  });
}

function openConfirm() {
  $('#confirm-desc').textContent = t('confirm.desc');
  openLayer('#confirm-modal', '#confirm-card');
}

function checkSearchSecrets() {
  const q = state.filters.search.trim().toLowerCase();
  if (!q) return;
  if (q.indexOf('receipt') !== -1 || q.indexOf('struk') !== -1) unlockSecret('secret-life-receipt');
  if (q.indexOf('42') !== -1) unlockSecret('secret-answer-42');
}

/* ─────────────────────────── 17. INIT ─────────────────────────── */
function init() {
  const loaded = loadProgress();
  bindEvents();

  const soundBtn = $('#sound-toggle');
  soundBtn.classList.toggle('sound-on', state.sound);
  soundBtn.setAttribute('aria-pressed', state.sound ? 'true' : 'false');
  soundBtn.setAttribute('aria-label', state.sound ? t('a11y.soundOn') : t('a11y.soundOff'));

  renderAll();

  const firstLine = pickReaction(loaded && state.visited ? 'react.return' : 'react.first');
  setMood('idle', firstLine);
  pushLog(firstLine);
  state.visited = true;
  saveProgress();
  checkAchievements();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
