// Sound cues for a twist promo part: the edit's own cues (segment starts, hits, ticks) plus a chime on every frame a
// kill counter first turns gold. usage: node promo/cues.mjs <part>  -> promo/cues-<part>.json (headless Chrome, file://)
import puppeteer from 'puppeteer';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const dir = path.dirname(fileURLToPath(import.meta.url)), part = process.argv[2] || '1';
const CHROME = process.env.CHROME || (fs.existsSync('/Applications/Google Chrome.app') ? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' : undefined);
const browser = await puppeteer.launch({ executablePath: CHROME, headless: true, args: ['--allow-file-access-from-files'] });
const page = await browser.newPage();
await page.setViewport({ width: 1080, height: 1350 });
await page.goto('file://' + path.join(dir, 'twist.html') + '?v=' + part);
await page.waitForFunction('window.REEL');
const cues = await page.evaluate(() => {
  const c = REEL.cues();
  let gold = false;
  for (let i = 0; i < REEL.FRAMES; i++) {
    const t = i / REEL.FPS, seg = REEL.SEGS.find(s => t >= s.at && t < s.end);
    if (!seg) { gold = false; continue; }
    window.TLOG = []; REEL.frame(i);
    const g = TLOG.some(x => x.endsWith('!'));
    if (g && !gold) c.push({ t, f: 'tally', v: .45, len: .9 });
    gold = g;
  }
  return c.sort((a, b) => a.t - b.t);
});
fs.writeFileSync(path.join(dir, `cues-${part}.json`), JSON.stringify({ duration: await page.evaluate('REEL.FRAMES / REEL.FPS'), cues }, null, 1));
console.log(part, cues.length, 'cues');
await browser.close();
