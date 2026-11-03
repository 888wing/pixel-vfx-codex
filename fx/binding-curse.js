// 鉤咒縛陣 / Hooked Binding Sigil — pixel version of 00GameDevs "binding-curse" (MIT)
PXFX.define({
  id: 'binding-curse',
  loop: 4.4,
  beats: [{ t: .05, kind: 'cast', power: .6 }, { t: 1, kind: 'pulse', power: .6 }, { t: 1.8, kind: 'pulse', power: .6 }, { t: 2.6, kind: 'pulse', power: .6 }, { t: 3.2, kind: 'burst', power: .8 }],
  view: { r: 2.1, h: 2.3 },
  stage: { ground: 'stone' },
  palette: {
    curse: ['#6a3fa8', '#8a58cc', '#ae7be5', '#cba3f2', '#ecdcff', '#ffffff'],
    band: ['#3e2466', '#5e3896', '#8a58cc', '#ae7be5', '#d2b0f5'],
  },
  timeline: [
    { t: [0, .75], zh: '三條咒帶貼地捲成小圈後螺旋竄起（起步最快，頂端衝高約 6% 再回落），一邊上升一邊由快轉慢地旋開；地面三個鉤形符號由中心彈出', en: 'three curse bands start as low tight coils and spiral up (fastest at the start, overshooting ~6% in height and settling), unwinding from fast to slow; three hook glyphs pop out from the centre on the ground' },
    { t: [.75, 3.2], zh: '持續：咒帶籠子慢轉；1.0、1.8、2.6 秒三次勒緊，三條帶輪流：該帶 0.07 秒內猛然向中心收緊並變亮，之後 0.8 秒慢慢鬆回；腰部束環同時急縮並猛轉一段；光珠沿帶向上衝、近頂變慢', en: 'sustain: the band cage turns slowly; three cinches at 1.0, 1.8 and 2.6 s, one band each in turn: it snaps tight towards the centre within 0.07 s and brightens, then relaxes over 0.8 s; the waist ring squeezes and jerks round with it; beads rush up each band and slow near the top' },
    { t: [3.2, 3.9], zh: '掙脫（爆發）：咒帶猛然向外甩開（ease-out-expo）並加速旋轉，0.7 秒內抖色淡出；束環向外彈散，地面一圈紫光環急速擴張，鉤紋熄滅', en: 'break (burst): the bands fling outward (ease-out-expo) while spinning faster and dither out within 0.7 s; the waist ring bursts outward, a violet ground ring shoots out, the hook glyphs go dark' },
  ],
  layers: [
    { zh: '地面：中心雙圈（半徑 0.32 / 0.2）、半徑 0.62 虛線圈、三個鉤形符號：直線伸出到 1.05，末端接一個側向三角旗（外框亮、內部半亮）', en: 'ground: double hub ring (radius 0.32 / 0.2), dashed circle at 0.62, three hook glyphs: a straight line out to 1.05 ending in a sideways triangular pennant (bright outline, half-lit fill)' },
    { zh: '咒帶：3 條實心扁帶（寬 0.22，寬面朝外），由鉤尖附近地面升起，向上扭轉約 125°，中段收窄成腰（半徑 0.25–0.5），頂端（高 1.9）向外張開再下勾', en: 'bands: 3 solid flat ribbons (0.22 wide, broad side facing out) rising from near the hook tips, twisting about 125 degrees, pinched waist mid-height (radius 0.25–0.5), flaring out at the top (1.9 high) and hooking down' },
    { zh: '扁帶沿長度來回扭擺 ±40°，用平面明暗表現扭轉；勒緊的那條帶整條變亮', en: 'each ribbon rocks ±40 degrees along its length, flat shading shows the twist; the cinching band brightens' },
    { zh: '束環：腰部（半高）一圈三段式光環（半徑 0.32–0.42），每次勒緊時急縮並猛轉約 50°', en: 'binding ring: a 3-segment light ring at the waist (half height, radius 0.32–0.42) that squeezes in and jerks round ~50 degrees on every cinch' },
    { zh: '光點：每條帶 3 顆白色光珠向上流動；地面染紫，10 粒暗紫光點起飛快、之後慢慢上飄', en: 'beads: 3 white light beads flow up each band; the ground is tinted violet, 10 dim violet motes lift off fast, then drift up' },
  ],
  params: {
    bands: { zh: '咒帶數量', en: 'band count', min: 2, max: 5, step: 1, value: 3 },
    height: { zh: '咒帶高度', en: 'band height', min: 1.2, max: 2.6, step: .1, value: 1.9 },
    squeeze: { zh: '勒緊力度', en: 'cinch strength', min: 0, max: 1.5, step: .05, value: 1 },
    spin: { zh: '旋轉速度', en: 'spin speed', min: 0, max: 3, step: .1, value: 1 },
  },
  draw(p, t) {
    const C = this.palette.curse, B = this.palette.band, TAU = p.TAU;
    const NB = Math.round(p.param('bands')), HB = p.param('height'), hk = HB / 1.9, sqK = p.param('squeeze'), spinK = p.param('spin');
    const CINCH = [1, 1.8, 2.6];
    const g = p.easeOutBack(p.ph(t, .02, .75), 1.5), reveal = p.easeOutCubic(p.ph(t, .02, .6));
    const end = p.ph(t, 3.2, 3.9), fade = 1 - p.easeInCubic(p.ph(end, .15, 1)), fling = p.easeOutExpo(end);
    if (g <= 0 || fade < .04) return;
    const spin = spinK * (t * .45 + 2.5 * (1 - p.easeOutCubic(p.ph(t, .02, 1)))) + p.easeInCubic(end) * 3 + fling * 1.5;
    // cinch envelopes: snap tight in 0.07 s, relax over 0.8 s
    const cinch = k => {
      let c = 0;
      CINCH.forEach((tc, i) => {
        if (i % NB !== k) return;
        const d = t - tc;
        if (d >= 0 && d < .9) c = Math.max(c, d < .07 ? p.easeOutCubic(d / .07) : Math.pow(1 - (d - .07) / .83, 2));
      });
      return c;
    };
    let flare = 0, jerk = 0;
    for (const tc of CINCH) { const d = t - tc; if (d >= 0 && d < .6) flare = Math.max(flare, Math.pow(1 - d / .6, 3)); jerk += p.easeOutCubic(p.ph(t, tc, tc + .3)); }

    // ground glyphs
    const hookRot = t * .15 * spinK, glyphI = p.ph(t, .1, .35) * (1 - p.easeInCubic(p.ph(t, 3.2, 3.6)));
    const hookReach = .3 + 1.1 * p.easeOutBack(p.ph(t, .1, .55), 2);
    p.light(0, 0, .4, 1.8, C, (.5 + .3 * flare) * Math.min(1, g) * fade);
    if (glyphI > .05) p.decal(0, 0, 0, 1.4, (x, y, rho, ang) => {
      let v = Math.max(p.band(rho, .32, .045), p.band(rho, .2, .03) * .7);
      if (Math.abs(rho - .62) < .02 && ((ang / TAU * 24 + 24) % 1) < .5) v = Math.max(v, .45);
      for (let k = 0; k < 3; k++) {
        const a = hookRot + k * TAU / 3, ca = Math.cos(a), sa = Math.sin(a);
        const lx = x * ca + y * sa, ly = -x * sa + y * ca;
        if (lx > hookReach || lx < .25) continue;
        if (p.sdSeg(lx, ly, .34, 0, 1.0, 0) < .035) v = Math.max(v, .95);
        const d = Math.min(p.sdSeg(lx, ly, .85, 0, 1.25, 0), p.sdSeg(lx, ly, 1.25, 0, .98, .3), p.sdSeg(lx, ly, .98, .3, .85, 0));
        if (d < .035) v = Math.max(v, 1);
        else if (ly > 0 && lx > .9 && ly < .26 && (lx - .85) * .3 > ly * .13 && (1.25 - lx) * .3 > ly * .27) v = Math.max(v, .5);
      }
      return v * (1 + .3 * flare);
    }, C, glyphI);

    // band cage
    const N = 30, nBeads = Math.round(3 * p.density);
    for (let k = 0; k < NB; k++) {
      const ck = cinch(k), tight = .25 + .12 * Math.sin(t * 1.3 + k * 2.1) + ck * .75 * sqK, th0 = k * TAU / NB + .35;
      const pt = s => {
        const th = th0 + spin + s * 2.2;
        const q = (2 * s - 1) * (2 * s - 1), waist = Math.max(.08, .5 - .3 * tight * Math.min(1, g));
        const r = (p.lerp(waist, 1.0, q) + (s > .82 ? (s - .82) * 1.2 : 0)) * (.35 + .65 * Math.min(1, g)) + fling * (.5 + 1.2 * s);
        const z = HB * s * (.25 + .75 * g) - Math.max(0, s - .85) * Math.max(0, s - .85) * 9 * hk + fling * .5 * s;
        return [Math.cos(th) * r, Math.sin(th) * r, Math.max(.02, z), th];
      };
      const segs = Math.max(2, Math.round(N * reveal));
      let prevL = null, prevR = null;
      const lit = .3 * ck;
      for (let i = 0; i <= segs; i++) {
        const ss = i / segs * reveal;
        const P = pt(ss), Pn = pt(Math.min(1, ss + .01)), Pp = pt(Math.max(0, ss - .01));
        let Tx = Pn[0] - Pp[0], Ty = Pn[1] - Pp[1], Tz = Pn[2] - Pp[2];
        const tl = Math.hypot(Tx, Ty, Tz) || 1; Tx /= tl; Ty /= tl; Tz /= tl;
        const rx = Math.cos(P[3]), ry = Math.sin(P[3]), dot = rx * Tx + ry * Ty;
        let Nx = rx - Tx * dot, Ny = ry - Ty * dot, Nz = -Tz * dot;
        const nl = Math.hypot(Nx, Ny, Nz) || 1; Nx /= nl; Ny /= nl; Nz /= nl;
        const Bx = Ty * Nz - Tz * Ny, By = Tz * Nx - Tx * Nz, Bz = Tx * Ny - Ty * Nx;
        const tw = Math.sin(ss * Math.PI * 2 + t * 1.5) * .7, hw = .11 * (1 - Math.pow(ss, 6) * .6), c = Math.cos(tw) * hw, sn = Math.sin(tw) * hw;
        const L = [P[0] + Bx * c + Nx * sn, P[1] + By * c + Ny * sn, P[2] + Bz * c + Nz * sn];
        const R = [P[0] - Bx * c - Nx * sn, P[1] - By * c - Ny * sn, P[2] - Bz * c - Nz * sn];
        if (prevL) p.quad(prevL, L, R, prevR, B, { alpha: fade, lit });
        prevL = L; prevR = R;
      }
      // beads rush up the band and slow near the top
      for (let b = 0; b < nBeads; b++) {
        const u = p.easeOutCubic((t * .35 + b / Math.max(1, nBeads) + k * .11 + p.r(b, 3) * .05) % 1);
        if (u > reveal || fade < .2) continue;
        const P = pt(u);
        p.orb(P[0], P[1], P[2], .045, C, fade * (.9 + .5 * ck));
      }
    }
    // binding ring at the waist: squeezes and jerks round on every cinch, bursts outward on the break
    const ringR = .42 - .14 * flare * Math.min(1, sqK) + fling * 1.2, ringZ = .95 * hk * Math.min(1, g);
    if (g > .6) p.ring(0, 0, ringZ, ringR, .04 + .03 * flare, C, (.75 + .5 * flare) * fade * Math.min(1, (g - .6) * 2.5),
      { fn: a => (Math.cos(a * 3 - t * 2 * spinK - jerk * 2.5) > -.3 ? 1 : 0) });
    // break: a ground ring shoots out
    const bu = p.ph(t, 3.2, 3.75);
    if (bu > 0 && bu < 1) p.ring(0, 0, .03, .3 + p.easeOutExpo(bu) * 1.7, .14 * (1 - bu) + .03, C, 1.3 * Math.pow(1 - bu, 1.5));
    // dim motes: lift off fast, then drift
    const nM = Math.round(10 * p.density);
    for (let m = 0; m < nM; m++) {
      const u = (t * .45 + p.r(m, 1)) % 1, ang = p.r(m, 2) * TAU, rad = .3 + p.r(m, 3) * 1;
      if (u < .85) p.dot(Math.cos(ang) * rad, Math.sin(ang) * rad, .1 + p.easeOutCubic(u) * 1.8 * hk, C, (1 - u) * .7 * Math.min(1, g) * fade);
    }
  },
});
