import fs from 'node:fs';
import { JSDOM } from 'jsdom';

const html = fs.readFileSync('index.html', 'utf8').replace(/<script type="module" src="\.\/script\.js"><\/script>/, '');
const js = fs.readFileSync('script.js', 'utf8');
const dom = new JSDOM(html, { runScripts: 'dangerously', url: 'https://example.com/', pretendToBeVisual: true });
const { window } = dom;
const errors = [];
window.addEventListener('error', (e) => errors.push('window error: ' + e.message));
window.eval(js);

const $ = (s) => window.document.querySelector(s);
const $$ = (s) => Array.from(window.document.querySelectorAll(s));
const click = (el) => el.dispatchEvent(new window.MouseEvent('click', { bubbles: true }));
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const cardByCode = (code) => $$('.product-card').find((c) => c.querySelector('.card-code').textContent === code);

const log = [];
const check = (name, cond, extra = '') => log.push((cond ? 'PASS ' : 'FAIL ') + name + (extra ? ' :: ' + extra : ''));

async function run() {
  await wait(150);
  check('20 product cards', $$('.product-card').length === 20, $$('.product-card').length);
  check('20 machine slots', $$('.slot').length === 20, $$('.slot').length);
  check('wallet 100', $('#wallet-balance').textContent === '100');
  check('hero icons', $$('.art-icon svg').length === 4, $$('.art-icon svg').length);
  check('mood line set', $('#machine-line').textContent.length > 5, $('#machine-line').textContent);
  check('8 achievements', $$('.ach-item').length === 8, $$('.ach-item').length);
  check('7 secret dots', $$('.secret-dot').length === 7, $$('.secret-dot').length);

  // language
  click($$('.lang-btn')[1]);
  check('ID switch', $('#hero-cta').textContent === 'CEK ISINYA', $('#hero-cta').textContent);
  check('ID tag shown', !$('.hero-tag--id').hidden && $('.hero-tag').hidden);
  check('ID names', $('.card-title').textContent.indexOf('Tiga Jam') === 0, $('.card-title').textContent);
  check('ID mood', $('#machine-mood').textContent === 'PENASARAN', $('#machine-mood').textContent);
  check('ID rarity label', /Rare/.test($('.tag--rare').textContent), $('.tag--rare').textContent);
  click($$('.lang-btn')[0]);
  check('EN switch back', $('#hero-cta').textContent === 'EXPLORE THE MACHINE');

  // search / filter / sort
  const search = $('#search');
  search.value = 'motivation';
  search.dispatchEvent(new window.Event('input', { bubbles: true }));
  check('search 1 result', $$('.product-card').length === 1, $$('.product-card').length);
  search.value = 'motivasi';
  search.dispatchEvent(new window.Event('input', { bubbles: true }));
  check('ID search 1 result', $$('.product-card').length === 1, $$('.product-card').length);
  search.value = 'zzzz';
  search.dispatchEvent(new window.Event('input', { bubbles: true }));
  check('empty state', !$('#empty-state').hidden);
  click($('#empty-reset'));
  check('reset filters', $$('.product-card').length === 20, $$('.product-card').length);
  click($$('.chip').find((c) => c.getAttribute('data-category') === 'nonsense'));
  check('category filter', $$('.product-card').length === 4, $$('.product-card').length);
  click($$('.chip').find((c) => c.getAttribute('data-category') === 'all'));
  const sort = $('#sort-select');
  sort.value = 'priceAsc';
  sort.dispatchEvent(new window.Event('change', { bubbles: true }));
  const p = $$('.card-price').map((x) => parseInt(x.textContent, 10));
  check('sort asc', p.every((v, i) => i === 0 || p[i - 1] <= v), p.join(','));
  sort.value = 'default';
  sort.dispatchEvent(new window.Event('change', { bubbles: true }));

  // purchase + effect
  click(cardByCode('TM-01').querySelector('.btn-primary'));
  check('modal open', !$('#product-modal').hidden);
  check('modal rarity', /Rare/.test($('#modal-rarity').textContent));
  click($('#modal-buy'));
  await wait(1900);
  check('coins deducted', $('#wallet-balance').textContent === '65', $('#wallet-balance').textContent);
  check('inventory 1', $('#nav-inv-count').textContent === '1', $('#nav-inv-count').textContent);
  check('toast shown', $$('.toast').length > 0);
  check('mood excited', $('#machine-mood').textContent === 'EXCITED', $('#machine-mood').textContent);
  check('tray item', $('#tray-item').innerHTML.length > 0);
  click($('#inv-grid [data-action="use"]'));
  check('scene open', !$('#scene-layer').hidden);
  check('scene content', $('#scene-content').textContent.length > 10);
  check('scene visual', $('#scene-visual').innerHTML.length > 20);
  check('scene actions', $$('#scene-actions button').length >= 1);
  click($('#scene-close'));
  check('item used', /USED/.test($('#inv-grid .inv-status').textContent));

  // one-time item cannot be used twice
  check('used item disabled', $('#inv-grid [data-action="use"]').disabled);

  // repeatable item can be used again
  click(cardByCode('TM-04').querySelector('.btn-primary'));
  click($('#modal-buy'));
  await wait(1900);
  check('repeatable bought', $('#nav-inv-count').textContent === '2', $('#nav-inv-count').textContent);
  const repeatBtn = $$('#inv-grid [data-action="use"]').find((b) => !b.disabled);
  click(repeatBtn);
  check('repeatable scene open', !$('#scene-layer').hidden);
  click($('#scene-close'));

  // insufficient funds
  for (let i = 0; i < 3; i++) click($('#wallet-topup'));
  check('topup', $('#wallet-balance').textContent === '80', $('#wallet-balance').textContent);
  click(cardByCode('TM-08').querySelector('.btn-primary'));
  click($('#modal-buy'));
  await wait(1900);
  check('big purchase', $('#wallet-balance').textContent === '10', $('#wallet-balance').textContent);
  check('inventory 3', $('#nav-inv-count').textContent === '3');
  click(cardByCode('TM-02').querySelector('.btn-primary'));
  click($('#modal-buy'));
  check('insufficient msg', /wallet says no|Not enough coins|Short by a few/i.test($('#modal-msg').textContent), $('#modal-msg').textContent);
  check('coins unchanged', $('#wallet-balance').textContent === '10', $('#wallet-balance').textContent);
  click($('#modal-close'));

  // coins
  click($('#coin-slot'));
  check('coin slot', $('#wallet-balance').textContent === '11', $('#wallet-balance').textContent);

  // secrets
  search.value = 'receipt';
  search.dispatchEvent(new window.Event('input', { bubbles: true }));
  check('secret 1', $('#secret-count').textContent === '2', $('#secret-count').textContent);
  check('secret card', $$('.product-card.is-secret').length === 1, $$('.product-card.is-secret').length);
  search.value = '42';
  search.dispatchEvent(new window.Event('input', { bubbles: true }));
  check('secret 2', $('#secret-count').textContent === '3', $('#secret-count').textContent);
  search.value = '';
  search.dispatchEvent(new window.Event('input', { bubbles: true }));
  const st = $('#machine-sticker');
  st.click();
  st.click();
  st.click();
  check('secret 3 (sticker)', $('#secret-count').textContent === '4', $('#secret-count').textContent);
  click($('#inventory-toggle'));
  click($('#inventory-toggle'));
  click($('#inventory-toggle'));
  check('secret 4 (inventory)', $('#secret-count').textContent === '5', $('#secret-count').textContent);

  // persistence
  const saved = JSON.parse(window.localStorage.getItem('vmnb_unit07_v1'));
  check('saved coins', saved.coins === 51, saved.coins);
  check('saved secrets', saved.secrets.length === 5, saved.secrets.length);
  window.eval(js);
  await wait(150);
  check('refresh wallet', $('#wallet-balance').textContent === '51', $('#wallet-balance').textContent);
  check('refresh inventory', $('#nav-inv-count').textContent === '3');
  check('refresh secrets', $('#secret-count').textContent === '5');

  // reset
  click($('#wallet-reset'));
  check('confirm open', !$('#confirm-modal').hidden);
  click($('#confirm-yes'));
  check('reset coins', $('#wallet-balance').textContent === '100', $('#wallet-balance').textContent);
  check('reset inventory', $('#nav-inv-count').textContent === '0');
  check('reset secrets', $('#secret-count').textContent === '0');
  check('reset achievements', $$('.ach-item.is-unlocked').length === 0, $$('.ach-item.is-unlocked').length);

  check('no runtime errors', errors.length === 0, errors.join(' | '));
  console.log(log.join('\n'));
  const failed = log.filter((l) => l.startsWith('FAIL'));
  console.log('\n' + (log.length - failed.length) + '/' + log.length + ' checks passed');
  if (failed.length) process.exitCode = 1;
}
run();
