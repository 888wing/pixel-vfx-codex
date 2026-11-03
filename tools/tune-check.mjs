// Open the detail view of one effect headless, move a few knobs, screenshot, report errors.
import puppeteer from 'puppeteer';
import fsx from 'node:fs';
// set CHROME to use a local Chrome; otherwise puppeteer's own browser is used
const CHROME = process.env.CHROME || (fsx.existsSync('/Applications/Google Chrome.app') ? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' : undefined);
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const id = process.argv[2] || 'fireball';
const browser = await puppeteer.launch({ executablePath: CHROME, headless: true });
const page = await browser.newPage();
const errors = [];
page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
page.on('pageerror', e => errors.push('pageerror: ' + e.message));
await page.setViewport({ width: 1440, height: 1100, deviceScaleFactor: 1 });
await page.goto('file://' + root + '/index.html#' + id);
await new Promise(r => setTimeout(r, 2000));
const set = async (label, value) => page.evaluate((label, value) => {
  const row = [...document.querySelectorAll('#d-tune .knob')].find(r => r.querySelector('span').textContent === label);
  const input = row.querySelector('input'); input.value = value; input.dispatchEvent(new Event('input', { bubbles: true }));
}, label, value);
await set('尺寸', 1.3); await set('頓幀（秒）', .2); await set('粒子密度', .5);
await page.evaluate(() => { const c = document.querySelector('#d-tune input[type=color]'); c.value = '#4aa8ff'; c.dispatchEvent(new Event('input', { bubbles: true })); });
await new Promise(r => setTimeout(r, 600));
const info = await page.evaluate(() => ({ knobs: document.querySelectorAll('#d-tune .knob').length, changed: document.querySelectorAll('#d-tune .knob.changed').length, prompt: document.querySelector('#d-prompt').value.includes('size（尺寸）：1.3'), stored: !!localStorage.getItem('pxfx.tw.' + location.hash.slice(1)) }));
await page.screenshot({ path: path.join(root, 'tools/out/tune-' + id + '.png') });
console.log(JSON.stringify(info), errors.length ? errors.join('\n') : 'no console errors');
await browser.close();
