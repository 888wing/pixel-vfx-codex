// Open the site from file:// in headless Chrome, report console errors, take screenshots.
// usage: node tools/site-check.mjs [--night] [--detail <id>] [--mode 25d] [--width 1440]
import puppeteer from 'puppeteer';
import fsx from 'node:fs';
// set CHROME to use a local Chrome; otherwise puppeteer's own browser is used
const CHROME = process.env.CHROME || (fsx.existsSync('/Applications/Google Chrome.app') ? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' : undefined);
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const opt = (n, d) => { const i = args.indexOf('--' + n); return i < 0 ? d : args[i + 1]; };
const night = args.includes('--night'), detail = opt('detail', null), mode = opt('mode', '25d'), width = +opt('width', 1440), dpr = +opt('dpr', 1);
const browser = await puppeteer.launch({ executablePath: CHROME, headless: true, args: ['--allow-file-access-from-files'] });
const page = await browser.newPage();
const errors = [];
page.on('console', m => { if (m.type() === 'error' || m.type() === 'warning') errors.push(m.type() + ': ' + m.text()); });
page.on('pageerror', e => errors.push('pageerror: ' + e.message));
await page.setViewport({ width, height: 1000, deviceScaleFactor: dpr });
await page.evaluateOnNewDocument((n, m) => { localStorage.setItem('pxfx.night', n ? '1' : '0'); localStorage.setItem('pxfx.mode', m); }, night, mode);
await page.goto('file://' + root + '/index.html' + (detail ? '#' + detail : ''));
await new Promise(r => setTimeout(r, 2500));
const info = await page.evaluate(() => ({ count: document.querySelector('#count').textContent, wip: [...document.querySelectorAll('.wip')].length }));
const tag = (night ? 'night-' : '') + mode + (detail ? '-' + detail : '');
await page.screenshot({ path: `${root}/tools/out/site-${tag}.png` });
if (!detail) {
  await page.click('.card .copy').catch(() => {});
  await new Promise(r => setTimeout(r, 300));
  info.toast = await page.evaluate(() => document.querySelector('#toast').textContent);
}
console.log(JSON.stringify(info), '\n' + (errors.length ? errors.slice(0, 10).join('\n') : 'no console errors'));
await browser.close();
