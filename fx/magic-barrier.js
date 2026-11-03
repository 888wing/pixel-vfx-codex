// 符網結界 / Runic Mesh Barrier — pixel version of 00GameDevs "magic-barrier" (MIT)
PXFX.define({
  id: 'magic-barrier',
  loop: 4.4,
  beats: [{ t: .05, kind: 'cast', power: .6 }, { t: .95, kind: 'pulse', power: .7 }, { t: 1.9, kind: 'pulse', power: .5 }, { t: 2.8, kind: 'pulse', power: .5 }, { t: 3.2, kind: 'burst', power: .8 }],
  view: { r: 2.5, h: 2.1 },
  stage: { ground: 'void' },
  palette: {
    arcane: ['#6450b4', '#8670d6', '#bba3ff', '#d8caff', '#f1ebff', '#ffffff'],
    mesh: ['#5a48a8', '#7a64cc', '#a08cf0', '#bba3ff', '#e6dcff'],
  },
  timeline: [
    { t: [0, .5], zh: '中心小方框先亮，地面法陣由中心彈出（放大到約 110% 再回彈）並向外展開：兩個交錯方形→內圈→符文環→外齒圈；方形邊轉邊減速', en: 'a small square lights at the centre, the ground sigil pops out (to ~110%, then settles) and spreads: two crossed squares, inner ring, rune band, toothed ring; the squares spin fast, then slow down' },
    { t: [.2, .95], zh: '光罩由地面一圈圈往上長成半球（起步快、近頂變慢），亮邊沿著生長前緣上升', en: 'the dome grows up from the ground row by row (fast at first, slowing near the top), a bright edge riding the growth front' },
    { t: [.95, 1.3], zh: '封頂：光罩閃亮並彈一下（半徑 +7% 的阻尼回彈），罩腳光環同時亮起', en: 'lock: the dome flashes and bounces (damped +7% radius wobble), the foot ring flares' },
    { t: [1.3, 3.2], zh: '持續：兩個方形反向慢轉，格子內小方塊每 0.15 秒隨機閃動；1.9、2.8 秒兩次能量脈衝：一道亮帶 0.5 秒內由罩腳急衝到罩頂後減速，格網瞬間變亮再慢慢回落；方形光點起飛快、之後慢慢上飄', en: 'sustain: the squares counter-rotate, cell squares flicker every 0.15 s; energy pulses at 1.9 and 2.8 s: a bright band rushes from the foot to the top within 0.5 s (slowing at the top), the grid flares and slowly settles; square motes lift off fast, then drift' },
    { t: [3.2, 3.9], zh: '破碎（爆發）：光罩全亮一下，地面法陣裂成 8 片扇形以 ease-out-expo 飛散，光罩格子由下而上急速熄滅，16 片方形碎光先快後慢飛出再落下', en: 'break (burst): the dome flashes, the ground sigil splits into 8 wedges that fly out (ease-out-expo), dome cells snap off from the bottom up, 16 square flecks fly out fast, slow down and fall' },
  ],
  layers: [
    { zh: '地面法陣（光罩半徑 1.5 時外圈 1.8）：外圈＋60 齒、虛線段與方塊符文交替的符文環、1.47 圓', en: 'ground sigil (outer ring 1.8 for a 1.5 dome): outer ring with 60 teeth, rune band alternating dashes and blocky runes, circle at 1.47' },
    { zh: '兩個外接半徑 1.2 的正方形相差 45° 疊成八角星，中心 0.3 小方框', en: 'two squares (circumradius 1.2) offset by 45 degrees form an 8-point star, small 0.3 square at the centre' },
    { zh: '半球光罩（預設半徑 1.5）：經線 20 等分 × 緯線 6 層的發光格網，邊緣（菲涅耳）較亮，背面較暗', en: 'dome (default radius 1.5): glowing grid of 20 longitude x 6 latitude cells, brighter at the fresnel rim, dimmer on the back side' },
    { zh: '閃動方塊：約 20% 的格子中心亮起實心小方塊，每 0.15 秒重新抽選', en: 'flicker squares: about 20% of the cells show a solid inner square, re-rolled every 0.15 s' },
    { zh: '脈衝亮帶：緯度方向一圈 0.12 寬的亮帶沿罩面上衝；罩腳地面亮圈同時閃亮', en: 'pulse band: a 0.12-wide bright latitude band rushing up the dome; the foot ring on the ground flares with it' },
    { zh: '光點：10 粒 2×2 方形光點在罩內上升；破碎時 16 片 2×2 碎光帶阻力與重力飛散', en: 'motes: 10 square 2x2 motes rise inside the dome; on the break 16 square 2x2 flecks fly out with drag and gravity' },
  ],
  params: {
    domeRadius: { zh: '光罩半徑', en: 'dome radius', min: 1, max: 2, step: .05, value: 1.5 },
    cells: { zh: '經線格數', en: 'grid columns', min: 8, max: 32, step: 2, value: 20 },
    spin: { zh: '法陣轉速', en: 'sigil spin', min: 0, max: 3, step: .1, value: 1 },
    motes: { zh: '光點數量', en: 'motes', min: 0, max: 30, step: 1, value: 10 },
  },
  draw(p, t) {
    const C = this.palette.arcane, M = this.palette.mesh, TAU = p.TAU, Q = Math.PI / 2;
    const DR0 = p.param('domeRadius'), kz = DR0 / 1.5, spinK = p.param('spin'), NC = Math.max(4, Math.round(p.param('cells')));
    const end = p.ph(t, 3.2, 3.9), fade = 1 - p.easeInCubic(p.ph(end, .3, 1));
    const sc = p.easeOutBack(p.ph(t, .05, .5), 1.8);
    if (sc <= .02 || fade < .05) return;
    const R = 1.8, reach = .32 + (R + .1) * p.easeOutCubic(p.ph(t, .1, .55));
    const rot = spinK * (.3 * t - 1.1 * (1 - p.easeOutCubic(p.ph(t, .05, 1)))), push = p.easeOutExpo(end) * 1.3;
    // flares: the lock, the two energy pulses and the break; sharp attack, slow decay
    let flare = 0;
    for (const [tp, a] of [[.95, 1], [1.9, .8], [2.8, .8], [3.2, 1.2]]) { const d = t - tp; if (d >= 0 && d < .7) flare = Math.max(flare, a * Math.pow(1 - d / .7, 3)); }
    const poly = (rho, ang, n, r, a0, w) => {             // regular n-gon outline by angle folding
      const s = TAU / n, a = ((ang - a0) % s + s) % s - s / 2;
      return Math.abs(rho * Math.cos(a) - r * Math.cos(Math.PI / n)) < w;
    };
    const sigil = (x, y, rho, ang) => {
      if (rho > reach) return 0;
      let v = 0;
      if (poly(rho, ang, 4, .3, -rot * 1.5 + Math.PI / 4, .03)) v = 1;
      v = Math.max(v, p.band(rho, R, .045), p.band(rho, R - .07, .022) * .6, p.band(rho, 1.47, .03) * .8, p.band(rho, 1.36, .02) * .5);
      if (rho > R + .03 && rho < R + .12 && ((ang / TAU * 60 + 60) % 1) < .3) v = Math.max(v, .6);
      if (rho > 1.52 && rho < 1.7) {
        const a = ((ang + rot * .4) / TAU % 1 + 1) % 1, cell = Math.floor(a * 32), u = a * 32 - cell, vv = (rho - 1.53) / .16;
        v = Math.max(v, cell % 2 ? p.rune(u * 1.2 - .1, vv, cell) * .7 : (vv > .3 && vv < .7 && u > .1 && u < .9 ? .85 : 0));
      }
      if (poly(rho, ang, 4, 1.2, rot, .028) || poly(rho, ang, 4, 1.2, -rot + Math.PI / 4, .028)) v = Math.max(v, .9);
      return v;
    };
    const S = sc * kz;
    const wedge = (x, y, rho, ang) => {
      x /= S; y /= S; rho /= S;
      if (end <= 0) return sigil(x, y, rho, ang);
      const k = Math.floor(((ang / TAU + 1.0625) % 1) * 8), mid = (k / 8) * TAU;
      const d = push * (.7 + p.r(k, 5) * .6), sx = x - Math.cos(mid) * d, sy = y - Math.sin(mid) * d;
      const sr = Math.hypot(sx, sy), sa = Math.atan2(sy, sx);
      if (Math.floor(((sa / TAU + 1.0625) % 1) * 8) !== k || sr < .45) return 0;
      return sigil(sx, sy, sr, sa);
    };
    p.light(0, 0, .3, 2.4 * kz, C, (.45 + .3 * flare) * Math.min(1, sc) * fade);
    p.decal(0, 0, 0, (R + .14 + push * 1.3) * Math.max(S, kz), wedge, C, .95 * fade);

    // dome: rows grow fast then slow; a damped bounce when it locks; pulse bands rush up the shell
    const rise = p.easeOutCubic(p.ph(t, .2, .95)), dl = t - .95;
    const DR = DR0 * (1 + (dl > 0 ? .07 * Math.exp(-6 * dl) * Math.sin(dl * TAU * 2.6) : 0));
    const bands = [1.9, 2.8].map(tp => { const d = t - tp; return d >= 0 && d < .6 ? p.easeOutCubic(d / .5) : -1; });
    const off = p.easeOutCubic(p.ph(t, 3.22, 3.8));                // fraction of cells already switched off
    if (rise > 0 && off < 1) {
      const flick = Math.floor(t / .15), lonSpin = rot * .07;
      p.shell(0, 0, 0, DR, (nx, ny, nz, rim) => {
        const lat = Math.asin(Math.min(1, nz)) / Q;
        if (lat > rise) return 0;
        const lo = ((Math.atan2(ny, nx) / TAU + 1 + lonSpin) % 1) * NC, la = lat * 6;
        const cu = Math.floor(lo), cv = Math.floor(la), fu = lo - cu, fv = la - cv;
        const id = cu * 7 + cv;
        if (end > 0 && p.r(id, 9) * .7 + lat * .3 < off * 1.05) return 0;
        let v = fu < .09 * NC / 20 || fv < .1 ? .42 + .4 * flare : 0;
        if (fu > .3 && fu < .7 && fv > .3 && fv < .72 && p.r(id, flick) > .8) v = .95;
        if (rim > .45) v = Math.max(v, (rim - .45) * 1.5);
        if (rise < 1 && lat > rise - .08) v = Math.max(v, .9);
        for (const b of bands) if (b >= 0) v = Math.max(v, p.band(lat, b, .12) * (1.1 - .5 * b));
        return v;
      }, M, fade, { zmin: 0, back: .45 });
      p.ring(0, 0, .02, DR, .06 + .04 * flare, C, (.9 + .5 * flare) * Math.min(1, rise * 1.5) * fade * (1 - off));
    }
    // break flecks: thrown off the dome, drag, gravity
    const nF = Math.round(16 * p.density);
    if (end > 0) for (let k = 0; k < nF; k++) {
      const a = t - 3.2, ang = p.r(k, 31) * TAU, lat = .1 + p.r(k, 32) * .8, ce = Math.cos(lat * Q), se = Math.sin(lat * Q);
      const sp = 2 + p.r(k, 33) * 2.5, d = p.drag(sp, 3.5, a);
      const x = Math.cos(ang) * ce * (DR + d), y = Math.sin(ang) * ce * (DR + d), z = se * DR + d * se * .6 - 2.5 * a * a;
      if (z > 0) p.dot(x, y, z, C, (1 - end) * 1.2, 2);
    }
    // rising square motes: lift off fast, then drift
    const nM = Math.round(p.param('motes') * p.density);
    for (let k = 0; k < nM; k++) {
      const u = (t * .4 + p.r(k, 1)) % 1, ang = p.r(k, 2) * TAU, rad = p.r(k, 3) * .73 * DR0;
      if (end <= .3 && u < .85) p.dot(Math.cos(ang) * rad, Math.sin(ang) * rad, .1 + p.easeOutCubic(u) * .87 * DR0 * rise, C, (1 - u) * Math.min(1, sc) * fade, 2);
    }
  },
});
