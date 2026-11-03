// Headless check of the full site: console errors with all effects loaded, render-loop health, and the
// sprite-sheet download from the detail view.
import puppeteer from 'puppeteer';
import fsx from 'node:fs';
// set CHROME to use a local Chrome; otherwise puppeteer's own browser is used
const CHROME = process.env.CHROME || (fsx.existsSync('/Applications/Google Chrome.app') ? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' : undefined);
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dl = path.join(root, 'tools/out/dl');
fs.rmSync(dl, { recursive: true, force: true }); fs.mkdirSync(dl, { recursive: true });
const browser = await puppeteer.launch({ executablePath: CHROME, headless: true });
const page = await browser.newPage();
const errors = [];
page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
page.on('pageerror', e => errors.push('pageerror: ' + e.message));
const cdp = await page.createCDPSession();
await cdp.send('Browser.setDownloadBehavior', { behavior: 'allow', downloadPath: dl });
await page.setViewport({ width: 1440, height: 1000, deviceScaleFactor: 2 });
await page.goto('file://' + root + '/index.html');
await new Promise(r => setTimeout(r, 2500));
const info = await page.evaluate(() => ({ count: document.querySelector('#count').textContent, defs: PXFX.all().length }));
// measure how many card frames the loop manages per second
const fps = await page.evaluate(() => new Promise(res => { let n = 0; const t0 = performance.now(); const f = () => { n++; if (performance.now() - t0 < 2000) requestAnimationFrame(f); else res(n / 2); }; requestAnimationFrame(f); }));
await page.evaluate(() => { location.hash = ''; });
await page.click('.card[data-id="impact-frame"] .open');
await new Promise(r => setTimeout(r, 800));
await page.screenshot({ path: path.join(root, 'tools/out/site-detail-impact.png') });
for (const m of ['2d', '3d']) { await page.click(`#d-modes [data-mode="${m}"]`); await new Promise(r => setTimeout(r, 300)); }
await page.click('#x-png');
await new Promise(r => setTimeout(r, 2500));
const files = fs.readdirSync(dl);
console.log(JSON.stringify(info), 'rAF fps', fps, 'downloads', files.join(', ') || 'none');
for (const f of files) { const b = fs.readFileSync(path.join(dl, f)); console.log(f, b.length, 'bytes', 'png', b.readUInt32BE(16) + 'x' + b.readUInt32BE(20)); }
console.log(errors.length ? errors.slice(0, 8).join('\n') : 'no console errors');
await browser.close();
