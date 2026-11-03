// 聖遺物・治癒降臨 / Sacred Relic Descent — pixel version of 00GameDevs "sacred-relic-descent" (MIT)
PXFX.define({
  id: 'sacred-relic-descent',
  loop: 6.8,
  beats: [{ t: .05, kind: 'cast', power: .5 }, { t: 1.1, kind: 'hit', power: 1.2 }, { t: 2, kind: 'pulse', power: .6 }, { t: 4, kind: 'pulse', power: .6 }],
  view: { r: 2.7, h: 2.3 },
  stage: { ground: 'slate', tiles: true },
  palette: {
    gold: ['#a8742c', '#d49a3c', '#f5cc75', '#ffe4a6', '#fff4d8', '#ffffff'],
    mist: ['#c9a060', '#e6c488', '#f6e0b4', '#fff4e0', '#ffffff'],
    relic: ['#7c7064', '#a89a88', '#d2c6b2', '#ece4d4', '#fffaf0'],
    dust: ['#6e6658', '#8a8070', '#a69c88', '#c2b8a2'],
    rock: ['#4a4652', '#625d6a', '#7c7684', '#958f9c'],
  },
  timeline: [
    { t: [0, .7], zh: '法陣：白金法陣由一點開始順時針掃出（先快後慢，掃描前端帶一顆星光），外圈→符文環→封印→六芒網依序亮起', en: 'sigil: the white-gold circle sweeps itself in clockwise from one point, fast then slowing, a sparkle riding the sweep; outer rings, rune band, seals, then the hexagram web light up' },
    { t: [.55, .95], zh: '鎖定：中心升起一道細光柱；地面一圈鎖定光環先微微外擴，再急收到中心，法陣中心變亮', en: 'lock-on: a thin light pillar rises from the centre; a ground lock-on ring swells slightly, then snaps into the centre; the sigil centre brightens' },
    { t: [.8, 1.1], zh: '降臨：倒三角錐沿光柱由上空急加速（ease-in-cubic）砸下，上方拖 3 條越拉越長的金色速度線', en: 'descent: an inverted triangular pyramid slams down the pillar from above with ease-in-cubic acceleration, trailing 3 golden speed lines that stretch with speed' },
    { t: [1.1, 2], zh: '落地（1.1 秒命中拍）：尖端插入地面先過衝到約 0.36 再回彈到 0.3，頂部一下撐大 14% 後彈回；白閃與 8 道星芒在 0.18 秒內收縮，5 道壓力環 ease-out-cubic 急衝後減速、越擴越細越淡，16 塊碎石先快後慢飛出並彈跳一次，一圈塵土急速噴出後懸停淡出', en: 'impact (hit beat at 1.1 s): the tip punches about 0.36 into the ground and springs back to 0.3, the top flexes 14% wider and back; a white flash and 8 star rays collapse within 0.18 s, 5 pressure rings shoot out (ease-out-cubic), thinning and fading as they grow, 16 rocks fly fast then slow with one bounce, a ring of dust bursts out then hangs and dithers away' },
    { t: [2, 5.6], zh: '治癒波：2 秒、4 秒各一次（脈衝拍），法陣瞬間變亮後慢慢回落；地面水紋光環 ease-out-expo 急衝到半徑 2.5 後減速淡出，半透明金色煙牆隨之擴散上升', en: 'healing waves at 2 s and 4 s (pulse beats): the sigil flares instantly and decays slowly; a rippling ground light ring shoots out to radius 2.5 with ease-out-expo and slows as it fades, a translucent golden smoke wall spreads and rises with it' },
    { t: [5.6, 6.8], zh: '收尾：三角錐先慢後急沉入地面並抖色淡出，法陣由外向內加速熄滅', en: 'end: the pyramid sinks, slowly then fast, and dithers away; the sigil switches off from the outside in, accelerating' },
  ],
  layers: [
    { zh: '法陣（半徑 1.45）：雙外圈、24 格符文環、12 個小封印圈、六芒星網、內圈 16 格符文、中心圈；相鄰層反向旋轉；命中與每次治癒波時以快攻慢衰的方式變亮', en: 'sigil (radius 1.45): double outer ring, 24-cell rune band, 12 small seal circles, hexagram web, 16-cell inner rune ring, centre ring; neighbouring layers counter-rotate; it flares with a sharp attack and slow decay on impact and on each healing wave' },
    { zh: '環繞徽記：4 個菱形徽記貼地繞圈', en: 'orbiting emblems: 4 diamond emblems circling on the ground' },
    { zh: '鎖定：落下前的 1 像素中心光柱＋半徑 1.75 的地面光環，光環半徑 easeInBack（先撐後收）', en: 'lock-on: a 1 px centre light pillar before the drop plus a 1.75-radius ground ring whose radius follows ease-in-back (swell, then snap in)' },
    { zh: '聖遺物：倒三角錐，高 1.5、頂面三角邊長約 1，三個白色側面平塗明暗，金色發光稜線；命中後稜線白熱 0.4 秒', en: 'relic: inverted triangular pyramid, 1.5 tall, top triangle about 1 wide; three flat-shaded white faces with glowing gold edges that burn white-hot for 0.4 s after the impact' },
    { zh: '碎石與塵：16 塊低多邊形碎石水平帶阻力、垂直受重力並彈跳一次，約 0.8–1 秒後急縮消失；10 團塵球貼地急速外擴後懸停，以抖色淡出', en: 'debris: 16 low-poly rocks with horizontal drag and gravity, bouncing once, shrinking away fast after 0.8–1 s; 10 dust puffs burst outwards along the ground, then hang and dither away' },
    { zh: '水紋光環：寬 0.4 的環帶，內含細密同心波紋，越擴越淡', en: 'ripple ring: a 0.4-wide band filled with fine concentric ripples, fading as it grows' },
    { zh: '煙牆：18 片面向鏡頭的火焰狀煙片圍成一圈，高約 1.1，噪聲向上流動，頂端透明', en: 'smoke wall: 18 camera-facing flame-like smoke cards in a ring, about 1.1 tall, noise flowing upwards, transparent at the top' },
  ],
  params: {
    relicSize: { zh: '聖遺物大小', en: 'relic size', min: .6, max: 1.4, step: .05, value: 1 },
    waveRadius: { zh: '治癒波半徑', en: 'wave radius', min: 1.6, max: 3, step: .1, value: 2.5 },
    smokeWall: { zh: '煙牆高度', en: 'smoke wall height', min: 0, max: 1.6, step: .1, value: 1 },
    debris: { zh: '碎石數量', en: 'debris count', min: 0, max: 30, step: 1, value: 16 },
  },
  draw(p, t) {
    const G = this.palette.gold, MI = this.palette.mist, RL = this.palette.relic, DU = this.palette.dust, RK = this.palette.rock;
    const HIT = 1.1, R = 1.45, END = 5.6, size = p.param('relicSize');
    const off = p.ph(t, END, END + .9), on = p.smooth(0, .15, t) * (1 - p.smooth(END + .4, END + 1.15, t));
    const a = t - HIT, waves = this.waves(t);
    // ---------- relic ----------
    const H = 1.5 * size, TR = .58 * size, spin = .4;
    let zt = null, flex = 1;
    if (t >= .8 && t < HIT) zt = p.lerp(3.4, 0, p.easeInCubic(p.ph(t, .8, HIT)));      // slams down, accelerating
    else if (t >= HIT) {
      zt = -.3 * size * p.spring(a, 3, 10) - 1.1 * p.easeInCubic(off);              // punches in, springs back
      flex = 1 + .14 * Math.exp(-a * 12) * Math.cos(a * 30);                        // top flexes wider, then settles
    }
    if (zt !== null && off < 1) {
      const top = [], tip = [0, 0, zt];
      for (let k = 0; k < 3; k++) { const an = spin + k / 3 * p.TAU; top.push([Math.cos(an) * TR * flex, Math.sin(an) * TR * flex, zt + H]); }
      const alpha = Math.max(0, 1 - off * 1.5);
      for (let k = 0; k < 3; k++) p.tri(tip, top[k], top[(k + 1) % 3], RL, { alpha });
      p.tri(top[0], top[1], top[2], RL, { alpha, lit: .15 });
      const ei = (t < HIT ? .8 : .8 + .6 * Math.pow(1 - p.ph(a, 0, .4), 2)) * alpha;
      if (alpha > .4) for (let k = 0; k < 3; k++) {
        p.line(tip, top[k], .035, G, ei);
        p.line(top[k], top[(k + 1) % 3], .035, G, ei);
      }
      if (t < HIT) {                                         // speed lines, stretching as it accelerates
        const k = p.ph(t, .8, HIT);
        for (let s = 0; s < 3; s++) {
          const an = spin + s / 3 * p.TAU + .5, x = Math.cos(an) * .3 * size, y = Math.sin(an) * .3 * size;
          p.line([x, y, zt + H * .9], [x, y, zt + H + .4 + k * k * 2], .03, G, .6 + .4 * k, { i1: 0 });
        }
      }
    }
    // lock-on before the drop: a thin light pillar, and a ground ring that swells, then snaps into the centre (ease-in-back)
    if (t > .55 && t < HIT) {
      const u = p.ph(t, .55, HIT), I = p.smooth(0, .25, u), lr = 1.75 * (1 - p.easeInBack(p.ph(t, .55, .95), 2.2));
      p.line([0, 0, 0], [0, 0, 3.6], .025, G, .9 * I);
      if (lr > .06) p.ring(0, 0, .03, lr, .06, G, 1.2 * I);
      p.light(0, 0, 0, 1.4, G, .3 + .5 * u * u);
    }
    // ---------- sigil ----------
    if (on > 0) {
      const sw = p.easeOutCubic(p.ph(t, 0, .6)), sweep = p.TAU * sw, a0 = -2.2;
      const sA = t * .25, sB = -t * .35, sC = t * .5;
      // flares: sharp attack, slow decay (impact, each healing wave), plus the lock-on glow
      let flare = a >= 0 ? .6 * Math.pow(1 - p.ph(a, 0, .7), 3) : .3 * p.smooth(.55, HIT, t);
      for (const u of waves) flare = Math.max(flare, .45 * Math.pow(1 - p.ph(u, 0, .5), 3));
      const reach = R * (1 - p.easeInCubic(off));
      p.decal(0, 0, 0, R + .05, (x, y, rho, ang) => {
        if (rho > reach) return 0;
        const rel = ((ang - a0) % p.TAU + p.TAU) % p.TAU;
        if (rel > sweep * (rho < .85 ? p.ph(t, .25, .8) : 1)) return 0;
        let v = Math.max(p.band(rho, 1.45, .05), p.band(rho, 1.35, .03) * .8, p.band(rho, 1.1, .03) * .85, p.band(rho, .8, .03) * .8, p.band(rho, .3, .03));
        if (rho > 1.14 && rho < 1.32) {
          const q = ((ang + sA) / p.TAU + 1) % 1, cell = Math.floor(q * 24);
          v = Math.max(v, p.rune((q * 24 - cell) * 1.2 - .1, (rho - 1.15) / .16, cell + 3) * .75);
        } else if (rho > .88 && rho < 1.04) {                 // 12 seals
          const q = ((ang + sB) / p.TAU + 1) % 1, cell = Math.floor(q * 12), u = (q * 12 - cell - .5) * p.TAU / 12 * .96, d = Math.hypot(u, rho - .96);
          v = Math.max(v, p.band(d, .065, .022), d < .02 ? .9 : 0);
        } else if (rho > .5 && rho < .64) {
          const q = ((ang + sC) / p.TAU + 1) % 1, cell = Math.floor(q * 16);
          v = Math.max(v, p.rune((q * 16 - cell) * 1.25 - .12, (rho - .51) / .12, cell + 40) * .7);
        }
        if (rho < .8) {
          const star = Math.min(p.sdPoly(x, y, 3, .78, sB, 1), p.sdPoly(x, y, 3, .78, sB + Math.PI, 1));
          if (star < .028) v = Math.max(v, .85);
          if (rho < .5 && p.sdPoly(x, y, 3, .46, sA + .3, 1) < .025) v = Math.max(v, .7);
        }
        return v;
      }, G, .95 * on * (1 + flare));
      if (sw < .995) {                                       // sparkle riding the sweep
        const ha = a0 + sweep;
        p.sparkle(Math.cos(ha) * R, Math.sin(ha) * R, .05, 3, G, 1 - sw * .5);
      }
      for (let k = 0; k < 4; k++) {                           // orbiting emblems
        const an = t * .9 + k * p.TAU / 4, x = Math.cos(an) * 1.24, y = Math.sin(an) * 1.24;
        if (Math.hypot(x, y) > reach || t < .5) continue;
        p.decal(x, y, 0, .14, (dx, dy) => (Math.abs(dx) + Math.abs(dy) < .12 && Math.abs(dx) + Math.abs(dy) > .06 ? 1 : 0), G, on);
        p.dot(x, y, .12, G, on * .9);
      }
      p.light(0, 0, .3, 2, G, (.4 + .3 * flare) * on * p.ph(t, .1, .8));
    }
    // ---------- impact ----------
    if (a >= 0 && a < 1.3) {
      const fl = Math.pow(1 - p.ph(a, 0, .18), 2), big = Math.sqrt(size);
      if (fl > 0) {
        p.glow(0, 0, .25, (.9 * fl + .25) * big, G, 1.4 * fl, { pow: 1.4 });
        for (let r = 0; r < 8; r++) {
          const ang = r / 8 * p.TAU + .2, len = (.9 + p.r(r, 9) * .8) * (.4 + fl) * big;
          p.line([0, 0, .2], [Math.cos(ang) * len * .7, Math.sin(ang) * len * .7, .2 + Math.abs(Math.sin(ang)) * len * .5], .08, G, fl, { w1: .01, i1: .3 });
        }
      }
      for (let k = 0; k < 5; k++) {                           // pressure ridges: shoot out, thin out
        const u = p.ph(a, k * .05, .42 + k * .07);
        if (u > 0 && u < 1) p.ring(0, 0, .02, .3 + p.easeOutCubic(u) * (1.4 + k * .25) * big, .1 * (1 - u) + .015, G, Math.pow(1 - u, 2) * 1.1);
      }
      const nR = Math.round(p.param('debris') * p.density);
      for (let d = 0; d < nR; d++) {                          // rocks: horizontal drag, gravity, one bounce
        const ang = p.r(d, 1) * p.TAU, sp = (2 + p.r(d, 2) * 3) * big, vz = 1.8 + p.r(d, 3) * 2.2, g = 8;
        const land = 2 * vz / g, hd = p.drag(sp, 3, a);
        let z = .1 + vz * a - g * a * a / 2;
        if (a > land) { const b = a - land; z = Math.max(0, vz * .3 * b - g * b * b / 2); }
        const life = .75 + p.r(d, 5) * .25, shrink = 1 - p.easeInCubic(p.ph(a, life - .25, life));
        if (shrink <= .2 || hd > 2.4) continue;
        p.rock(Math.cos(ang) * hd, Math.sin(ang) * hd, z + .05, (.05 + p.r(d, 4) * .05) * shrink, RK, d);
      }
      const nD = Math.round(10 * p.density), u = p.ph(a, .02, 1.2);
      if (u < 1) for (let s = 0; s < nD; s++) {               // dust ring: bursts out, then hangs
        const ang = s * 2.39996 + .3, rr = (.45 + p.easeOutExpo(u) * 1.1) * big;
        p.ball(Math.cos(ang) * rr, Math.sin(ang) * rr, .14 + u * .3, (.16 + u * .16) * big, DU, { alpha: (1 - u * u) * .85, rough: .5, shadow: false, seed: s });
      }
    }
    // ---------- healing waves ----------
    const WR = p.param('waveRadius'), wall = p.param('smokeWall'), nK = Math.round(8 * p.density);
    for (const u of waves) {
      const rf = .35 + p.easeOutExpo(u) * (WR - .35), fade = Math.pow(1 - u, 1.5) * p.smooth(0, .04, u);
      p.decal(0, 0, 0, Math.min(WR + .1, rf + .25), (x, y, rho, ang) => {
        const b = p.band(rho, rf, .38);
        if (!b) return 0;
        const rip = .55 + .45 * Math.sin(rho * 34 - u * 30 + Math.sin(ang * 5) * .6);
        const val = b * rip;
        return val < .18 ? 0 : val;
      }, G, fade * 1.15);
      if (wall > 0) for (let k = 0; k < 18; k++) {             // smoke wall cards
        const ang = k / 18 * p.TAU + u * .6, x = Math.cos(ang) * rf * .95, y = Math.sin(ang) * rf * .95;
        const hh = (.8 + .5 * p.easeOutCubic(u) + p.r(k, 31) * .3) * wall;
        p.card(x, y, hh * .5 + .05, .8, hh, (cu, cv) => {
          const h = (cv + 1) / 2, w = 1 - cu * cu * (1.2 + h);
          if (w <= 0) return 0;
          const n = p.fbm(cu * 1.2 + k * 3.1, h * 2.2 - u * 4, 2);
          const val = w * (1 - h) * (n * 2.2 - .35);
          return val < .2 ? 0 : val;
        }, MI, fade * .9);
      }
      for (let k = 0; k < nK; k++) {                          // sparkles thrown up by the wave
        const ang = p.r(k, 41) * p.TAU, rr = rf * (.6 + p.r(k, 42) * .4), z = p.easeOutCubic(u) * 1.6 * (.5 + p.r(k, 43));
        p.sparkle(Math.cos(ang) * rr, Math.sin(ang) * rr, z, 2, G, fade);
      }
      p.light(0, 0, .2, rf + .3, G, .5 * fade);
    }
  },
  // progress 0..1 of the healing waves alive at time t (two waves, 1.6 s each)
  waves(t) {
    const out = [];
    for (const s of [2, 4]) { const u = (t - s) / 1.6; if (u > 0 && u < 1) out.push(u); }
    return out;
  },
});
