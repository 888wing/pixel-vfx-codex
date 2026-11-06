'use strict';
/* PXFX kit: reusable building blocks for the Ultimates, Mass Spells and Scale Ladder packs. Each block is a method on the drawing API (`p`), so an
 * effect composes them: Pose (p.figure) -> Charge -> Shape -> Motion -> Impact -> Aftermath.
 * Load after engine/pxfx.js. PXFX.KIT documents every module for the copyable prompts. */
(function (G) {
  const X = G.PXFX, K = X.Api.prototype, TAU = Math.PI * 2, E = {};
  const clamp = (v, a, b) => (v < a ? a : v > b ? b : v);
  const norm = v => { const l = Math.hypot(v[0], v[1], v[2]) || 1; return [v[0] / l, v[1] / l, v[2] / l]; };
  const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
  const along = (c, d, k) => [c[0] + d[0] * k, c[1] + d[1] * k, c[2] + d[2] * k];
  const sum3 = (a, b, kb, c, kc) => [a[0] + b[0] * kb + c[0] * kc, a[1] + b[1] * kb + c[1] * kc, a[2] + b[2] * kb + c[2] * kc];
  K.v3 = { norm, cross, along, lerp: (a, b, k) => [a[0] + (b[0] - a[0]) * k, a[1] + (b[1] - a[1]) * k, a[2] + (b[2] - a[2]) * k] };

  // random unit vector for particle k (upper hemisphere biased when up > 0)
  K.rdir = function (k, salt = 0, up = 0) {
    const a = this.r(k, salt + 31) * TAU, zz = clamp(this.r(k, salt + 32) * 2 - 1 + up, -1, 1), s = Math.sqrt(1 - zz * zz);
    return [Math.cos(a) * s, Math.sin(a) * s, zz];
  };
  // point on a curved flight from a to b: u 0..1 (already eased by the caller), h = arc height
  K.arcPos = function (a, b, u, h = 0) {
    return [a[0] + (b[0] - a[0]) * u, a[1] + (b[1] - a[1]) * u, a[2] + (b[2] - a[2]) * u + Math.sin(Math.PI * u) * h];
  };

  /* ---------- Charge: motes and streaks converging on a point. u = charge progress 0..1 ---------- */
  K.charge = function (x, y, z, u, o = E) {
    if (u <= 0 || u >= 1.2) return;
    const n = Math.round((o.n || 18) * this.density), R = o.R || 1.5, ramp = o.ramp, I = o.I == null ? 1 : o.I, seed = o.seed || 0;
    const len = o.len == null ? .3 : o.len, up = o.up || 0;
    for (let k = 0; k < n; k++) {
      const s0 = this.r(k, seed + 1) * .6, l = this.ph(u, s0, s0 + .4);
      if (l <= 0 || l >= 1) continue;
      const d = this.rdir(k, seed, up), dist = R * (.55 + .45 * this.r(k, seed + 2)) * (1 - this.easeInCubic(l));
      const pt = along([x, y, z], d, dist), tail = along(pt, d, len * (.4 + l));
      this.line(pt, tail, o.w || .05, ramp, I * (.45 + .55 * l), { w1: .01, i1: .1 });
    }
  };

  /* ---------- Energy Core: hot orb + halo + rotating rays + optional ring ---------- */
  K.core = function (x, y, z, o = E) {
    const r = o.r || .3, ramp = o.ramp, I = o.I == null ? 1 : o.I, t = o.t || 0;
    if (I <= 0 || r <= 0) return;
    this.glow(x, y, z, r * (o.halo || 2.4), ramp, .55 * I);
    this.orb(x, y, z, r, ramp, I);
    const rays = o.rays || 0;
    if (rays) {
      const c = this.cam(), rot = t * (o.spin == null ? 1.5 : o.spin), L = r * (o.rayLen || 3);
      for (let k = 0; k < rays; k++) {
        const a = rot + k / rays * TAU, f = .65 + .35 * Math.sin(t * 9 + k * 2.3);
        const d = sum3([0, 0, 0], c.right, Math.cos(a), c.up, Math.sin(a));
        this.line(along([x, y, z], d, r * .6), along([x, y, z], d, r * .6 + L * f), r * .35, ramp, .9 * I, { w1: .01, i1: .2 });
      }
    }
    if (o.ring) this.ring(x, y, z, r * o.ring, r * .25, ramp, .8 * I, { axis: o.axis || this.cam().fwd });
  };

  /* ---------- Slash: crescent mesh (dark solid body or bright fill) with a hot edge ----------
   * o: c centre, dir (the way the convex edge faces / travels), side (second axis of the crescent plane; default
   * horizontal), R radius, thick (max width), arc (radians), body solid ramp or null, edge emissive ramp, I,
   * u (life 0..1: thins and dissolves), streaks (motion lines behind), seed */
  K.crescent = function (o) {
    const c = o.c, dir = norm(o.dir || [1, 0, 0]);
    let side = o.side ? norm(o.side) : norm(cross([0, 0, 1], dir));
    if (o.tilt) { const up = cross(dir, side), ca = Math.cos(o.tilt), sa = Math.sin(o.tilt); side = norm(sum3([0, 0, 0], side, ca, up, sa)); }
    const R = o.R || 1.2, arc = o.arc || 2.2, u = o.u || 0, I = (o.I == null ? 1 : o.I) * Math.pow(1 - clamp(u, 0, 1), .7);
    const thick = (o.thick || .45) * (1 - .55 * u), S = o.segs || 22, seed = o.seed || 0;
    if (I <= .01) return;
    const outer = [], inner = [], halo = [], edgeIn = [];
    for (let k = 0; k <= S; k++) {
      const s = k / S * 2 - 1, a = s * arc / 2, rd = sum3([0, 0, 0], dir, Math.cos(a), side, Math.sin(a));
      const w = thick * Math.pow(Math.max(0, 1 - s * s), .8);
      outer.push(along(c, rd, R)); inner.push(along(c, rd, R - w));
      halo.push(along(c, rd, R + w * .45 + .04)); edgeIn.push(along(c, rd, R - w * .4));
    }
    const dis = o.dissolve == null ? .55 : o.dissolve;
    if (o.body) {
      this.sribbon(outer, inner, (uu, vv) => {
        if (u > dis && this.noise(uu * 9 + seed, vv * 3) < (u - dis) / (1 - dis) * 1.15) return -1;
        return .05 + .45 * Math.pow(1 - vv, 2) + this.noise(uu * 14 + seed * 3, vv * 2) * .2;
      }, o.body);
      this.ribbon(halo, outer, (uu, vv) => Math.sin(Math.PI * uu) * vv * vv, o.edge, I);
      this.ribbon(outer, edgeIn, (uu, vv) => Math.sin(Math.PI * uu) * Math.pow(1 - vv, 1.4) * 1.1, o.edge, I);
    } else {
      this.ribbon(halo, outer, (uu, vv) => Math.sin(Math.PI * uu) * vv * vv * .8, o.edge, I);
      this.ribbon(outer, inner, (uu, vv) => {
        if (u > dis && this.noise(uu * 9 + seed, vv * 3) < (u - dis) / (1 - dis) * 1.15) return 0;
        return Math.pow(Math.sin(Math.PI * uu), .5) * (.35 + .75 * Math.pow(1 - vv, 2));
      }, o.edge, I);
    }
    const ns = o.streaks || 0;
    for (let k = 0; k < ns; k++) {
      const s = (k + .5) / ns, j = Math.round(s * S), pt = outer[j], L = (o.streakLen || .9) * (.5 + this.r(k, seed + 7) * .7) * Math.sin(Math.PI * s);
      this.line(pt, along(pt, dir, -L), .05, o.edge, .7 * I, { w1: .01, i1: .05 });
    }
    return { outer, inner };
  };
  // thin straight slash flash from a to b. u = life 0..1 (grows from the middle in the first 15 %, then thins)
  K.slash = function (a, b, o = E) {
    const u = o.u || 0;
    if (u >= 1) return;
    const grow = this.easeOutExpo(u / .15), m = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2, (a[2] + b[2]) / 2];
    const A = this.v3.lerp(m, a, grow), B = this.v3.lerp(m, b, grow), w = (o.w || .1) * Math.pow(1 - u, .6), I = (o.I || 1.3) * Math.pow(1 - u, .5);
    this.line(m, A, w, o.ramp, I, { w1: .005, i1: I * .4 });
    this.line(m, B, w, o.ramp, I, { w1: .005, i1: I * .4 });
    if (o.glow) this.glow(m[0], m[1], m[2], o.glow * (1 - u), o.ramp, .5 * I);
  };

  /* ---------- Shockwave: expanding ring that thins, optional ground band and dust ---------- */
  K.shock = function (x, y, z, u, o = E) {
    if (u <= 0 || u >= 1) return;
    const R = o.R || 2, e = this.easeOutExpo(u), rr = .1 + R * e, I = (o.I == null ? 1 : o.I) * Math.pow(1 - u, 1.3);
    this.ring(x, y, z, rr, (o.w || .25) * Math.pow(1 - u, 1.2) + .03, o.ramp, I, { axis: o.axis || [0, 0, 1], fn: o.fn });
    if (o.ground) this.decal(x, y, 0, rr + .2, (dx, dy, rho) => this.band(rho, rr, .18 + .2 * (1 - u)), o.ramp, I * .7);
    if (o.dust) {
      const n = Math.round((o.dustN || 14) * this.density);
      for (let k = 0; k < n; k++) {
        const a = k / n * TAU + this.r(k, 5) * .4, rad = rr * (.85 + this.r(k, 6) * .2);
        this.ball(x + Math.cos(a) * rad, y + Math.sin(a) * rad, .12 + u * .35 + this.r(k, 7) * .15, .14 + .22 * e, o.dust, { alpha: (1 - u) * .9, rough: .5, shadow: false, seed: k });
      }
    }
    if (o.light !== false) this.light(x, y, z, rr + .4, o.ramp, .6 * I);
  };
  // sphere of force: bright fresnel rim, faint fill, optional lens warp at the boundary
  K.dome = function (x, y, z, r, o = E) {
    if (r <= .02) return;
    const I = o.I == null ? 1 : o.I, pw = o.rim || 3, fill = o.fill || 0;   // any fill > 0 dithers to ~50% coverage: use a sparse pattern instead
    if (o.refract) this.warp(x, y, z, r * 1.08, (dx, dy, rho) => (rho > .7 ? [-dx * o.refract * (rho - .7) * 3, -dy * o.refract * (rho - .7) * 3] : null));   // offset: sample inwards near the rim
    this.shell(x, y, z, r, (nx, ny, nz, rim) => Math.pow(rim, pw) + fill * (o.pattern ? o.pattern(nx, ny, nz) : 1), o.ramp, I, { zmin: o.zmin, back: o.back });
  };

  /* ---------- Impact: radial speed lines, impact frame ---------- */
  // speed lines in the screen plane around a point; change seed per frame for the anime flicker
  K.speedLines = function (x, y, z, o = E) {
    const n = Math.round((o.n || 24) * Math.min(1.5, this.density)), c = this.cam(), seed = o.seed || 0, R0 = o.R0 || .6, R1 = o.R1 || 3;
    for (let k = 0; k < n; k++) {
      const a = this.r(k, seed) * TAU, d = sum3([0, 0, 0], c.right, Math.cos(a), c.up, Math.sin(a));
      const r0 = R0 * (1 + this.r(k, seed + 1) * .6), r1 = R1 * (.55 + .45 * this.r(k, seed + 2));
      this.line(along([x, y, z], d, r1), along([x, y, z], d, r0), o.w || .05, o.ramp, o.I || 1, { w1: .005, i1: .15 });
    }
  };
  // two-tone impact frame (manga negative): whole frame snaps to ink / paper, emissive pixels to accent.
  // Use for 1-3 frames at the hit. o: { ink, paper, accent, invert, thr }
  K.impactFrame = function (o = E) {
    const ink = X.hex(o.ink || '#140a12'), paper = X.hex(o.paper || '#f6eeee'), acc = X.hex(o.accent || '#e8203c'), thr = o.thr || 120;
    const inv = !!o.invert;
    this.post(({ pix, W, H, kind, rgb }) => {
      const I = rgb(ink[0], ink[1], ink[2]), Pp = rgb(paper[0], paper[1], paper[2]), A = rgb(acc[0], acc[1], acc[2]);
      for (let i = 0; i < W * H; i++) {
        const c = pix[i];
        if (!(c >>> 24)) continue;
        const yv = (c & 255) * .3 + (c >> 8 & 255) * .59 + (c >> 16 & 255) * .11;
        if (kind[i] === 3) { pix[i] = yv > 225 ? (inv ? I : Pp) : A; continue; }
        const lightPx = yv > thr;
        pix[i] = lightPx !== inv ? Pp : I;
      }
    });
  };

  /* ---------- Particle Swarm: formations for many small blades / petals / shards ----------
   * kind: scatter | orbit | spiral | sphere | stream. k = index, n = count, t = time. o: c, R, H, spin, path(s) */
  K.formation = function (kind, k, n, t, o = E) {
    const c = o.c || [0, 0, 1], R = o.R || 1, spin = o.spin == null ? 1 : o.spin, r1 = this.r(k, 51), r2 = this.r(k, 52), r3 = this.r(k, 53);
    if (kind === 'scatter') { const d = this.rdir(k, 54, o.up || 0); return along(c, d, R * (.3 + .7 * r1)); }
    if (kind === 'orbit') { const a = k / n * TAU + t * spin * (.8 + .4 * r1); return [c[0] + Math.cos(a) * R, c[1] + Math.sin(a) * R, c[2] + (r2 - .5) * (o.H || .3)]; }
    if (kind === 'spiral') {
      const H = o.H || 2.5, h = r1 * H, rad = R * (.25 + .75 * Math.pow(h / H, .8)), a = r2 * TAU + t * spin * (2.2 - h / H);
      return [c[0] + Math.cos(a) * rad, c[1] + Math.sin(a) * rad, (o.z0 || 0) + h];
    }
    if (kind === 'sphere') {
      const zz = 1 - 2 * (k + .5) / n, s = Math.sqrt(1 - zz * zz), a = k * 2.39996 + t * spin;
      return [c[0] + Math.cos(a) * s * R, c[1] + Math.sin(a) * s * R, c[2] + zz * R];
    }
    if (kind === 'stream' && o.path) {
      const s = ((k / n + t * (o.speed || .5)) % 1 + 1) % 1, pt = o.path(s), j = (o.spread || .25);
      return [pt[0] + (r2 - .5) * j, pt[1] + (r3 - .5) * j, pt[2] + (r1 - .5) * j];
    }
    return c.slice();
  };
  // small diamond blade / petal of light pointing along dir
  K.petal = function (x, y, z, dir, len, ramp, I = 1, o = E) {
    const d = norm(dir), h = len / 2, a = [x - d[0] * h, y - d[1] * h, z - d[2] * h], b = [x + d[0] * h, y + d[1] * h, z + d[2] * h], m = [x, y, z];
    const w = o.w || len * .38;
    this.line(a, m, .01, ramp, I * .7, { w1: w, i1: I });
    this.line(m, b, w, ramp, I, { w1: .01, i1: I * .8 });
  };

  /* ---------- Growth: spikes erupting along a path, vines growing along a polyline ---------- */
  // path(s) -> [x, y] on the ground. Spike k erupts when u passes its stagger. Returns tip positions.
  K.spikes = function (path, u, o = E) {
    const n = o.n || 8, h = o.h || 1, wid = o.wid || .3, spread = o.spread == null ? .7 : o.spread, seed = o.seed || 0, tips = [];
    for (let k = 0; k < n; k++) {
      const s = n > 1 ? k / (n - 1) : 0, b = s * spread, l = this.ph(u, b, b + (o.rise || .16));
      if (l <= 0) continue;
      const pt = path(s), hh = h * (.65 + .55 * this.r(k, seed + 1)) * this.easeOutBack(l, 2.2) * (o.shrink ? 1 - o.shrink : 1);
      if (hh <= .02) continue;
      const lean = [(this.r(k, seed + 2) - .5) * .6 + (o.lean ? o.lean[0] : 0), (this.r(k, seed + 3) - .5) * .6 + (o.lean ? o.lean[1] : 0), 1];
      const d = norm(lean), mid = [pt[0] + d[0] * hh * .3, pt[1] + d[1] * hh * .3, hh * .3];
      this.shard(mid[0], mid[1], mid[2], hh * 1.35, wid * (.7 + .5 * this.r(k, seed + 4)), d, o.ramp, { back: .25, sides: o.sides || 4, spin: this.r(k, seed + 5) * 3 });
      tips.push([pt[0] + d[0] * hh, pt[1] + d[1] * hh, hh, k, l]);
    }
    return tips;
  };
  // tube along pts up to fraction u of its length; radius r0 -> r1; thorns every o.thorn units. Returns the tip.
  K.vine = function (pts, u, o = E) {
    if (u <= 0) return null;
    const segs = [];
    let total = 0;
    for (let k = 1; k < pts.length; k++) { const L = Math.hypot(pts[k][0] - pts[k - 1][0], pts[k][1] - pts[k - 1][1], pts[k][2] - pts[k - 1][2]); segs.push(L); total += L; }
    const goal = total * clamp(u, 0, 1), r0 = o.r0 || .1, r1 = o.r1 || .03;
    let acc = 0, tip = pts[0], nextThorn = o.thorn || 0, tk = 0;
    for (let k = 1; k < pts.length && acc < goal; k++) {
      const L = segs[k - 1], f = Math.min(1, (goal - acc) / L), a = pts[k - 1], b = this.v3.lerp(a, pts[k], f);
      const ra = r0 + (r1 - r0) * (acc / total), rb = r0 + (r1 - r0) * ((acc + L * f) / total);
      this.capsule(a, b, ra, rb, o.ramp, { shadow: k % 2 === 0 });
      if (o.thorn) while (nextThorn < acc + L * f) {
        const q = (nextThorn - acc) / L, p0 = this.v3.lerp(a, pts[k], q), side = this.rdir(tk, 77, .3);
        this.shard(p0[0] + side[0] * ra, p0[1] + side[1] * ra, p0[2] + side[2] * ra, ra * 2.6, ra * .8, side, o.thornRamp || o.ramp, { back: .1, sides: 3, shadow: false });
        nextThorn += o.thorn; tk++;
      }
      acc += L * f; tip = b;
    }
    return tip;
  };

  /* ---------- Energy Creature: serpent body along a path with a dragon head ----------
   * path(s) -> [x, y, z], s = 0 head ... 1 tail. o: n, w (max radius), ramp (light), dark (solid ramp: dark body with a
   * light rim), t (flicker), jaw 0..1 (mouth open), eye ramp, head (true) */
  K.serpent = function (path, o = E) {
    const n = o.n || 26, w = o.w || .3, t = o.t || 0, ramp = o.ramp, I = o.I == null ? 1 : o.I, dark = o.dark;
    for (let k = n; k >= 0; k--) {
      const s = k / n, pt = path(s), prof = s < .12 ? .75 + 2 * s : Math.pow(1 - (s - .12) / .88, .75);
      const rr = w * prof * (1 + .12 * Math.sin(t * 14 + k * 1.3));
      if (rr < .015) continue;
      if (dark) {
        this.ball(pt[0], pt[1], pt[2], rr * .85, dark, { flat: true, shadow: k % 3 === 0 });
        this.glow(pt[0], pt[1], pt[2], rr * 1.45, ramp, I * .9, { pow: 1.2 });
      } else {
        this.glow(pt[0], pt[1], pt[2], rr * 1.5, ramp, I * .55);
        this.orb(pt[0], pt[1], pt[2], rr * .6, ramp, I * (.6 + .4 * (1 - s)));
      }
      if (o.licks !== false && k % 2 === 0 && k > 1) {
        const up = this.rdir(k + Math.floor(t * 12) * 7, 61, .6), L = rr * (1.2 + this.r(k + Math.floor(t * 12), 62) * 1.6);
        this.line(pt, along(pt, up, L), rr * .5, ramp, I * .65, { w1: .01, i1: .05 });
      }
    }
    if (o.head === false) return;
    const h = path(0), back = path(.035), d = norm([h[0] - back[0], h[1] - back[1], h[2] - back[2]]);
    const side = norm(cross([0, 0, 1], d)), up = norm(cross(d, side)), hs = w * (o.headScale || 1.6), jaw = o.jaw == null ? .4 : o.jaw;
    const snout = along(h, d, hs * 1.3), upperTip = sum3(snout, up, hs * .15 * (1 + jaw), d, .2 * hs), lowerTip = sum3(snout, up, -hs * (.25 + .7 * jaw), d, -.1 * hs);
    const skull = sum3(h, up, hs * .35, d, 0);
    const hl = sum3(skull, side, hs * .35, d, 0), hr = sum3(skull, side, -hs * .35, d, 0), jl = sum3(h, side, hs * .3, up, -hs * .25), jr = sum3(h, side, -hs * .3, up, -hs * .25);
    if (dark) {
      this.tri(hl, hr, upperTip, dark, { shade: .35 }); this.tri(skull, hl, upperTip, dark, { shade: .45 }); this.tri(skull, hr, upperTip, dark, { shade: .3 });
      this.tri(jl, jr, lowerTip, dark, { shade: .2 });
    }
    this.line(skull, upperTip, hs * .45, ramp, I * (dark ? .9 : 1), { w1: .02 });
    this.line(h, lowerTip, hs * .35, ramp, I * .85, { w1: .02 });
    for (const sg of [1, -1]) {
      const base = sum3(skull, side, sg * hs * .3, d, -hs * .2), horn = sum3(base, up, hs * .9, d, -hs * 1.1);
      this.line(base, horn, hs * .2, ramp, I * .9, { w1: .01 });
      const eye = sum3(skull, side, sg * hs * .32, d, hs * .25);
      this.dot(eye[0], eye[1], eye[2] + hs * .05, o.eye || ramp, 1.2 * I, 1);
    }
    return { head: h, dir: d, mouth: along(snout, up, -hs * .1) };
  };

  /* ---------- Aura / black flame: camera-facing flame silhouettes ---------- */
  // flame shape: signed margin (> 0 inside) for u, v in -1..1 (v up), tongues scroll upwards with t
  K.flameShape = function (u, v, t, seed = 0, tongues = 1) {
    const y = (v + 1) / 2, base = Math.pow(1 - y, .55) * (1 - Math.pow(1 - y, 8) * .4);
    const n = this.noise(u * 2.4 + seed, y * 2.2 - t * 2.6 + seed * 3) - .5, n2 = this.noise(u * 5 + seed * 7, y * 4 - t * 4.2);
    return base * (1 + n * 1.2 * tongues) + (n2 - .5) * .25 * y - Math.abs(u);
  };
  // opaque dark flame with a glowing rim (black flames, ink fire, shadow flames). o: w, h, t, seed, body (solid ramp),
  // edge (light ramp), I, rim (rim width in margin units), alpha
  K.blackFlame = function (x, y, z, o = E) {
    const w = o.w || .6, h = o.h || 1.2, t = o.t || 0, seed = o.seed || 0, rim = o.rim || .14, I = o.I == null ? 1 : o.I;
    const cz = z + h / 2;
    this.scard(x, y, cz, w * 1.3, h, (u, v) => {
      const m = this.flameShape(u * 1.3, v, t, seed, o.tongues);
      return m > 0 ? .08 + .5 * Math.min(1, m * 2.2) * (.4 + .6 * this.noise(u * 3 + seed, v * 3 - t * 3)) : -1;
    }, o.body, { alpha: o.alpha, shadow: o.shadow });
    if (I > 0) this.card(x, y, cz, w * 1.3, h, (u, v) => {
      const m = this.flameShape(u * 1.3, v, t, seed, o.tongues);
      return m <= 0 && m > -rim ? Math.pow(1 + m / rim, 1.2) : 0;
    }, o.edge, I);
  };
  // rising aura around a body: flame tongues of light + vertical streaks. o: r, h, ramp, I, t, seed, n
  K.aura = function (x, y, z, o = E) {
    const r = o.r || .45, h = o.h || 1.7, t = o.t || 0, I = o.I == null ? 1 : o.I, seed = o.seed || 0;
    if (I <= 0) return;
    this.card(x, y, z + h / 2, r * 2.6, h * 1.15, (u, v) => {
      const m = this.flameShape(u * 1.05, v, t * 1.3, seed);
      return m > 0 ? Math.min(1, .25 + m * 1.6) * (Math.abs(u) > .5 - v * .1 ? 1 : .45) : 0;
    }, o.ramp, I * .55);
    const n = Math.round((o.n || 10) * this.density);
    for (let k = 0; k < n; k++) {
      const ph = (t * (1.2 + this.r(k, seed + 1)) + this.r(k, seed + 2)) % 1, a = this.r(k, seed + 3) * TAU, rr = r * (.6 + .5 * this.r(k, seed + 4));
      const px = x + Math.cos(a) * rr, py = y + Math.sin(a) * rr, pz = z + ph * h * 1.2;
      this.line([px, py, pz], [px, py, pz + .25 + .3 * (1 - ph)], .04, o.ramp, I * (1 - ph), { w1: .01 });
    }
    this.light(x, y, 0, r * 3, o.ramp, .5 * I);
  };

  /* ---------- Domain: replace the page and the ground with another world (dithered radial wipe) ----------
   * o: amt 0..1 (wipe progress), c [x, y, z] wipe origin, sky preset name or { top, bottom, nebula, stars, star },
   * ground: ramp to remap the ground into (dark -> bright) or null to keep, solids: darken solids 0..1, t (twinkle),
   * fade: true = an even dithered fade instead of the radial wipe (use it for the way out: no floating disc) */
  const SKIES = {
    void: { top: '#07060f', bottom: '#151029', nebula: '#2e2357', stars: .012, star: '#d8d4ff' },
    cosmos: { top: '#04040f', bottom: '#120d33', nebula: '#43307e', neb2: '#1f5fa8', stars: .03, star: '#ffffff' },
    blood: { top: '#140306', bottom: '#4a0b14', nebula: '#6e1420', stars: 0 },
    ember: { top: '#170806', bottom: '#4e170b', nebula: '#8a2c12', stars: .006, star: '#ffb050' },
    ink: { top: '#05060a', bottom: '#0e121a', nebula: '#18202c', stars: 0 },
    frost: { top: '#d7e3f2', bottom: '#f4f8fc', nebula: '#c4d4ea', stars: .004, star: '#ffffff' },
    abyss: { top: '#030508', bottom: '#0a1620', nebula: '#103040', stars: .004, star: '#7fd8ff' },
  };
  // the sky only depends on the frame size, the preset and time in 1/5 s steps: cache whole frames of it
  const skyCache = new Map();
  function skyFrame(self, W, H, sk, t, bayer, rgb) {
    const tq = Math.floor(t * 5), key = W + 'x' + H + '|' + (typeof sk === 'object' ? JSON.stringify(sk) : sk) + '|' + tq;
    let buf = skyCache.get(key);
    if (buf) return buf;
    buf = new Uint32Array(W * H);
    const top = X.hex(sk.top), bot = X.hex(sk.bottom), neb = sk.nebula && X.hex(sk.nebula), neb2 = sk.neb2 && X.hex(sk.neb2), star = sk.star && X.hex(sk.star);
    const tt = tq / 5;
    for (let iy = 0; iy < H; iy++) for (let ix = 0; ix < W; ix++) {
      const yy = iy / H + (bayer(ix, iy) - .5) * .18, band = Math.floor(clamp(yy, 0, .999) * 4) / 3;
      let col = [top[0] + (bot[0] - top[0]) * band, top[1] + (bot[1] - top[1]) * band, top[2] + (bot[2] - top[2]) * band];
      const nv = self.noise(ix * .045 + 3, iy * .08 - tt * .05) + (bayer(ix, iy) - .5) * .12;
      if (neb && nv > .66) col = neb; else if (neb2 && nv < .2) col = neb2;
      if (sk.stars && X.hash(ix * 1.31, iy * 2.17) < sk.stars) col = X.hash(ix, iy + tq) > .35 ? star || col : neb || col;
      buf[iy * W + ix] = rgb(col[0], col[1], col[2]);
    }
    if (skyCache.size > 12) skyCache.delete(skyCache.keys().next().value);
    skyCache.set(key, buf);
    return buf;
  }
  // threshold map for a non-radial domain fade: large soft cloud patches with a dithered edge (a plain Bayer threshold
  // turns the whole frame into a checkerboard halfway through)
  const fadeCache = new Map();
  function fadeMap(self, W, H, bayer) {
    const key = W + 'x' + H;
    let m = fadeCache.get(key);
    if (m) return m;
    m = new Float32Array(W * H);
    const s = 240 / W;
    for (let iy = 0; iy < H; iy++) for (let ix = 0; ix < W; ix++) {
      const n = self.fbm(ix * s * .035 + 5.3, iy * s * .05 - 2.1, 3);
      m[iy * W + ix] = clamp((n - .25) / .5, 0, 1) * .82 + bayer(ix, iy) * .18;
    }
    fadeCache.set(key, m);
    return m;
  }
  K.domain = function (o = E) {
    const amt = o.amt == null ? 1 : o.amt;
    if (amt <= 0) return;
    const sk = typeof o.sky === 'string' ? SKIES[o.sky] : o.sky, gr = o.ground ? o.ground.map(X.hex) : null, sd = o.solids || 0;
    const t = o.t || 0, c = o.c || [0, 0, 0], self = this;
    this.post(({ pix, W, H, kind, rgb, P, bayer }) => {
      const cp = P(c[0], c[1], c[2]) || [W / 2, H / 2], maxD = Math.hypot(W, H) * .62;
      const sky = sk ? skyFrame(self, W, H, sk, t, bayer, rgb) : null;
      const gcol = gr ? gr.map(g => rgb(g[0], g[1], g[2])) : null, full = amt >= 1, fm = o.fade && !full ? fadeMap(self, W, H, bayer) : null;
      for (let iy = 0; iy < H; iy++) for (let ix = 0; ix < W; ix++) {
        const i = iy * W + ix;
        if (!full && (fm ? fm[i] >= amt : Math.hypot(ix - cp[0], iy - cp[1]) / maxD > amt * 1.3 - bayer(ix, iy) * .3)) continue;
        const k = kind[i], cur = pix[i];
        if (k === 0) {
          if (!sky || !(cur >>> 24) && o.keepTransparent !== false) continue;
          pix[i] = sky[i];
        } else if (k === 1 && gcol) {
          const yv = ((cur & 255) * .3 + (cur >> 8 & 255) * .59 + (cur >> 16 & 255) * .11) / 255;
          pix[i] = gcol[clamp(Math.floor((yv - .25) * 1.6 * gcol.length + (bayer(ix, iy) - .5) * .8), 0, gcol.length - 1)];
        } else if ((k === 2 || k === 4) && sd > 0) {
          pix[i] = rgb((cur & 255) * (1 - sd), (cur >> 8 & 255) * (1 - sd), (cur >> 16 & 255) * (1 - sd * .8));
        }
      }
    });
  };

  /* ---------- Aftermath: scorch, frost, cracks, ink on the ground ---------- */
  K.aftermath = function (x, y, R, kind, o = E) {
    const amt = o.amt == null ? 1 : o.amt, seed = o.seed || 0;
    if (amt <= 0) return;
    if (kind === 'burn') {
      this.stain(x, y, R, (dx, dy, rho) => (1 - rho / R) * 1.4 * (.6 + .6 * this.noise(dx * 2 + seed, dy * 2)), o.color || '#241a20', amt);
      if (o.ramp) this.decal(x, y, 0, R * .9, (dx, dy, rho, ang) => (Math.abs(Math.sin(ang * 4 + this.noise(rho * 3, ang + seed) * 2.5)) < .1 && rho > R * .1 ? 1 - rho / R : 0), o.ramp, (o.I || .9) * (o.glow == null ? amt : o.glow));
    } else if (kind === 'frost') {
      this.stain(x, y, R, (dx, dy, rho, ang) => {
        const star = Math.abs(Math.cos(ang * 3 + seed)) * (1 - rho / R);
        return (1 - rho / R) * 1.1 + (star > .55 ? .4 : 0) - this.noise(dx * 3, dy * 3) * .3;
      }, o.color || '#e6f0fb', amt);
    } else if (kind === 'crack') {
      this.stain(x, y, R, (dx, dy, rho, ang) => (Math.abs(Math.sin(ang * (o.n || 5) + this.noise(rho * 2.5 + seed, ang) * 2.2)) < .1 + .06 * (1 - rho / R) ? 1.2 : rho < R * .25 ? .5 : 0), o.color || '#2a2430', amt);
      if (o.ramp) this.decal(x, y, 0, R * .6, (dx, dy, rho, ang) => (Math.abs(Math.sin(ang * (o.n || 5) + this.noise(rho * 2.5 + seed, ang) * 2.2)) < .07 ? 1 - rho / (R * .6) : 0), o.ramp, (o.I || .8) * (o.glow == null ? amt : o.glow));
    } else if (kind === 'ink') {
      this.stain(x, y, R, (dx, dy, rho, ang) => (rho < R * (.55 + .4 * this.noise(ang * 1.5 + seed, seed)) ? 1.2 : 0), o.color || '#0c0a12', amt);
    }
  };

  /* ---------- Crowd: a horde of small enemy pawns that a mass spell hits as a wave ----------
   * p.crowdLayout(o) -> units [{ i, x, y, r1, r2, r3, face }] (cached; units.spacing = soldier spacing). o.n count,
   *   o.seed, o.area { x, y, rx, ry, shape: 'ellipse' | 'rect' }, o.faceTo [x, y] (default [-4, 0]: towards the caster
   *   on the left), o.formation: 'scatter' (default) | 'block' | 'line' | 'column' | 'wedge' | 'ring' | 'crescent' |
   *   'squads' (PXFX.TROOPS lists them with zh/en names; rx = half depth towards the caster, ry = half width; a ring
   *   or a crescent's horns surround the centre / point at the caster), o.hole: keep a clear radius around the centre
   * p.crowd(o) draws the horde and returns live states [{ u, hitT, alive, x, y, z, chest, head, hidden }].
   *   t: effect time. hit(u): the time unit u is hit (null = never); a wave is t0 + distance / speed (+ u.r1 * jitter)
   *   react: 'knock' | 'launch' | 'fall' | 'crush' | 'freeze' | 'burn' | 'zap' | 'pull' | 'vapor', or fn(s, a, u, p, o)
   *     editing the pawn state s (a = time since the hit; fields below). reactOf(u) -> name picks one per unit
   *   at [x, y, z] (or at(u) per unit): origin of the push / pull; power(u) or a number, ~0.3..2 (falloff with distance is up to you)
   *   shatter(u): 'freeze' only, the time the ice statue breaks (null = stays). ramp: emissive ramp for glows
   *   fear 0..1: units lean away from `at` and tremble before the hit. advance { to: [x, y], v }: march until hit
   *   respawn [t0, t1]: corpses fade and fresh units walk in from o.from (default [1, 0]) back to their spots, so the
   *     loop starts and ends on a standing crowd (clear [t0, t1] overrides the corpse fade window)
   *   scale (1 = about 0.6 tall, 40% of the caster; 'auto' fits the formation spacing, capped by maxScale / minScale),
   *   lod: 'auto' (full 3D pawns while a pawn is >= 7.5 px tall, pixel sprites below: hundreds to tens of thousands),
   *   'full' | 'sprite'; reach: throw distance scale for knock / launch (auto scale: = scale), spears (default true),
   *   pal { body, helm, spear } or a name from PXFX.PAWN_PALS ('red' | 'steel' | 'bone' | 'jade' | 'gold'),
   *   enter: 'walk' (default, from o.from [dx, dy] or o.from(u), o.enterD units away) | 'fade' (fade in on the spot: armies at the island edge)
   * p.crowdGrid(units, cell) -> { near(x, y, r) } spatial hash for neighbour queries (contagion, bounce targets)
   * p.tally(states, { t, alpha, right }) draws the kill counter HUD (skull + killed/total); call it last in draw();
   *   armies too big for per-unit states pass their own counts: p.tally(null, { total, dead, last })
   * pawn state s: x, y, z, tilt (radians, falls along tdir [dx, dy]), sq (squash height), wide, mat ('ice' | 'char' |
   *   'white' | 'stone' | 'bone' | 'rot' | 'wet', or a ramp array of your own, or null; freeze takes o.freezeMat), shardMat, alpha, hide, noShadow (sprites: no ground shadow, e.g. units flung far off the ground), walk (stride phase or null), jit, glow (0..1, with s.glowRamp), fire,
   *   motes ({ a, ramp } rising sparks), shards (time since shatter), ash (0..1 pile), spear (bool) */
  const PAWN = {
    body: ['#2a1f2a', '#3b2c38', '#52404c', '#6c5662'],
    helm: ['#5a1e22', '#7e2a2c', '#a8403a', '#cc6a52'],
    spear: ['#3d3640', '#6e6672', '#d8d2dc'],
  };
  const MAT = {
    ice: ['#4f7fb4', '#7fb2e0', '#b8dcf6', '#eaf6ff'],
    char: ['#0f0d10', '#1a171b', '#262227', '#332e33'],
    white: ['#c8c8d8', '#e8e8f2', '#ffffff'],
    stone: ['#4a4650', '#6a6570', '#8e8996', '#b0abb6'],
    bone: ['#8a8070', '#b4aa94', '#d8d0bc', '#f2ecdc'],
    rot: ['#2e3a1e', '#46582a', '#64783a', '#8ca050'],
    wet: ['#1a2436', '#25344c', '#344a66', '#4a6684'],
  };
  X.PAWN_MATS = MAT;
  const ASH = ['#2a2628', '#3d383b', '#57514f', '#76706a'];
  // troop formations for p.crowdLayout({ formation }); rx = half depth (towards the caster), ry = half width
  const TROOPS = [
    { id: 'block', zh: '方陣', en: 'block' }, { id: 'line', zh: '橫列', en: 'line' }, { id: 'column', zh: '縱隊', en: 'column' },
    { id: 'wedge', zh: '楔形', en: 'wedge' }, { id: 'ring', zh: '圓陣', en: 'ring' }, { id: 'crescent', zh: '鶴翼', en: 'crescent' },
    { id: 'squads', zh: '分隊', en: 'squads' }, { id: 'scatter', zh: '散兵', en: 'scatter' },
  ];
  X.TROOPS = TROOPS;
  // positions in a local frame: q = depth (+ = away from the caster), w = across; returns { pts: [[q, w]], s: spacing }
  function troopShape(form, n, D, Wd, seed) {
    const pts = [], H = (i, k) => X.hash(i * 1.37 + k * 7.1 + seed * 3.3, k * 2.9 + seed + .7);
    const rows = (counts, sd, sw, q0) => {   // centred rows of given counts, row k at depth q0 + k * sd
      let i = 0;
      counts.forEach((c, k) => { for (let j = 0; j < c && i < n; j++, i++) pts.push([q0 + k * sd, (j - (c - 1) / 2) * sw]); });
    };
    const split = (total, per) => { const out = []; for (let left = total; left > 0; left -= per) out.push(Math.min(per, left)); return out; };
    if (form === 'block') {
      const cols = Math.max(1, Math.round(Math.sqrt(n * Wd / D))), nr = Math.ceil(n / cols), sw = 2 * Wd / cols, sd = 2 * D / nr;
      rows(split(n, cols), sd, sw, -(nr - 1) / 2 * sd);
      return { pts, s: Math.min(sw, sd) };
    }
    if (form === 'line') {
      const nr = Math.max(1, Math.round(Math.sqrt(n / 5))), per = Math.ceil(n / nr), sw = 2.3 * Wd / per, sd = Math.min(sw * 1.3, 2 * D / nr);
      rows(split(n, per), sd, sw, -(nr - 1) / 2 * sd);
      return { pts, s: Math.min(sw, sd) };
    }
    if (form === 'column') {
      const files = Math.max(1, Math.round(Math.sqrt(n / 5))), per = Math.ceil(n / files), sd = 2.4 * D / per, sw = Math.min(sd * 1.3, 2 * Wd / files);
      split(n, per).forEach((c, f) => { for (let j = 0; j < c; j++) pts.push([(j - (per - 1) / 2) * sd, (f - (files - 1) / 2) * sw]); });
      return { pts, s: Math.min(sw, sd) };
    }
    if (form === 'wedge') {   // apex towards the caster, row k holds k + 1 soldiers
      let R = 1; while (R * (R + 1) / 2 < n) R++;
      const sd = 2 * D / R, sw = Math.min(sd * 1.2, 2.2 * Wd / R);
      rows(Array.from({ length: R }, (_, k) => k + 1), sd, sw, -D + sd / 2);
      return { pts, s: Math.min(sw, sd) };
    }
    if (form === 'ring' || form === 'crescent') {
      const cres = form === 'crescent';
      // ring: an ellipse D x Wd around the centre. crescent: an arc whose horns point at the caster
      const Rc = cres ? Math.max(D, Wd) * 1.35 : 0, span = cres ? Math.min(1.25, Math.asin(Math.min(1, Wd / Rc)) + .25) : Math.PI;
      const perim = cres ? 2 * span * Rc : TAU * Math.sqrt((D * D + Wd * Wd) / 2);
      const nr = Math.max(1, Math.round(Math.sqrt(n) / 3)), s = Math.max(perim / Math.ceil(n / nr), 1e-3);
      const th = Math.min(nr * s, .7 * (cres ? Rc * .5 : Math.min(D, Wd))), sr = nr > 1 ? th / (nr - 1) : 0;
      let i = 0;
      for (let k = 0; k < nr; k++) {
        const off = (k - (nr - 1) / 2) * sr, c = k < nr - 1 ? Math.round(n / nr) : n - i;
        for (let j = 0; j < c; j++, i++) {
          const a = cres ? -span + (j + .5) / c * 2 * span : (j + .5 * (k & 1)) / c * TAU;
          if (cres) pts.push([D * .5 - Rc + (Rc + off) * Math.cos(a), (Rc + off) * Math.sin(a)]);
          else pts.push([(D + off) * Math.cos(a), (Wd + off) * Math.sin(a)]);
        }
      }
      return { pts, s: Math.min(s, nr > 1 ? sr : s) };
    }
    if (form === 'squads') {
      const k = Math.max(2, Math.min(9, Math.round(n / 22))), gc = Math.ceil(Math.sqrt(k * Wd / D)), gr = Math.ceil(k / gc);
      const cw = 2 * Wd / gc, cd = 2 * D / gr, per = Math.ceil(n / k), sc = Math.ceil(Math.sqrt(per)), ss = Math.min(cw, cd) * .62 / sc;
      let i = 0;
      for (let g = 0; g < k; g++) {
        const r = Math.floor(g / gc), inRow = r < gr - 1 ? gc : k - r * gc, c = g % gc;
        const q0 = (r - (gr - 1) / 2) * cd + (H(g, 1) - .5) * cd * .25, w0 = (c - (inRow - 1) / 2) * cw + (H(g, 2) - .5) * cw * .25;
        const m = Math.min(per, n - i), cols = Math.ceil(Math.sqrt(m)), nr = Math.ceil(m / cols);
        for (let j = 0; j < m; j++, i++) pts.push([q0 + (Math.floor(j / cols) - (nr - 1) / 2) * ss, w0 + (j % cols - (Math.min(cols, m - Math.floor(j / cols) * cols) - 1) / 2) * ss]);
      }
      return { pts, s: ss };
    }
    // scatter: a jittered grid inside the ellipse, thinned to n (large counts; small ones use dart throwing)
    let s = Math.sqrt(Math.PI * D * Wd / n) * .97;
    for (let tries = 0; tries < 30; tries++, s *= .96) {
      pts.length = 0;
      const nq = Math.ceil(D / s) + 1, nw = Math.ceil(Wd / s) + 1;
      for (let a = -nq; a <= nq; a++) for (let b = -nw; b <= nw; b++) {
        const q = (a + (H(a * 131 + b, 3) - .5) * .8) * s, w = (b + (H(a * 131 + b, 4) - .5) * .8) * s;
        if ((q * q) / (D * D) + (w * w) / (Wd * Wd) <= 1) pts.push([q, w, H(a * 131 + b, 5)]);
      }
      if (pts.length >= n) break;
    }
    if (pts.length > n) { const keep = pts.slice().sort((p1, p2) => p1[2] - p2[2]); pts.length = 0; for (let i = 0; i < n; i++) pts.push(keep[i]); }
    return { pts, s };
  }
  const layoutCache = new Map();
  K.crowdLayout = function (o = E) {
    const n = Math.max(1, Math.round(o.n || 30)), seed = o.seed || 0, A = o.area || E;
    const cx = A.x == null ? 1.4 : A.x, cy = A.y || 0, rx = A.rx || 2.2, ry = A.ry || rx, rect = A.shape === 'rect';
    const ft = o.faceTo || [-4, 0], form = o.formation || 'scatter', hole = o.hole || 0;
    const key = [n, seed, cx, cy, rx, ry, rect ? 1 : 0, ft[0], ft[1], form, hole].join('|');
    let units = layoutCache.get(key);
    if (units) return units;
    let pts = [], spacing;
    if (form === 'scatter' && n <= 400 && !hole) {
      // dart throwing with a shrinking minimum spacing: an even but organic spread
      const size = rect ? 4 * rx * ry : Math.PI * rx * ry;
      let dmin = Math.sqrt(size / n) * .8, k = 0, fails = 0;
      while (pts.length < n && k < n * 400) {
        const a = X.hash(k * 1.731 + seed * 9.1 + .3, 3.17 + seed), b = X.hash(k * 2.377 + 1.1, 7.71 + seed * 3.3); k++;
        let x, y;
        if (rect) { x = cx + (a * 2 - 1) * rx; y = cy + (b * 2 - 1) * ry; }
        else { const ang = a * TAU, rr = Math.sqrt(b); x = cx + Math.cos(ang) * rr * rx; y = cy + Math.sin(ang) * rr * ry; }
        let ok = true;
        for (const q of pts) if ((q.x - x) * (q.x - x) + (q.y - y) * (q.y - y) < dmin * dmin) { ok = false; break; }
        if (!ok) { if (++fails > 40) { dmin *= .9; fails = 0; } continue; }
        fails = 0;
        pts.push({ x, y });
      }
      spacing = dmin * 1.1;
    } else {
      // local frame: depth axis points away from faceTo, across axis is its normal
      // (faceTo at the centre, e.g. a ring around the caster: fall back to depth = +x)
      const fl = Math.hypot(ft[0] - cx, ft[1] - cy), ex = fl > 1e-6 ? -(ft[0] - cx) / fl : 1, ey = fl > 1e-6 ? -(ft[1] - cy) / fl : 0;
      const neat = form !== 'scatter', jig = neat ? (n > 300 ? .35 : .1) : 0;   // more jitter on big grids breaks the moire
      let nn = n;
      for (let tries = 0; tries < 6; tries++) {
        const sh = troopShape(form, nn, rx, ry, seed);
        spacing = sh.s;
        pts = [];
        sh.pts.forEach((q, i) => {
          const qq = q[0] + (X.hash(i * 2.71 + seed, 6.1) - .5) * jig * sh.s, ww = q[1] + (X.hash(i * 3.17 + seed, 6.7) - .5) * jig * sh.s;
          const x = cx + ex * qq - ey * ww, y = cy + ey * qq + ex * ww;
          if (hole && Math.hypot(x - cx, y - cy) < hole) return;
          pts.push({ x, y });
        });
        if (pts.length >= n || !hole) break;
        nn = Math.min(nn * 4, Math.ceil(nn * n / Math.max(1, pts.length)) + 1);   // grow to make up for the hole, never explode
      }
      if (pts.length > n) { const step = pts.length / n; pts = Array.from({ length: n }, (_, i) => pts[Math.floor(i * step)]); }
    }
    const fj = form === 'scatter' ? .5 : .16;
    units = pts.map((q, i) => ({
      i, x: q.x, y: q.y, r1: X.hash(i * 3.1 + seed, 1.7), r2: X.hash(i * 5.3 + seed, 2.9), r3: X.hash(i * 7.7 + seed, 4.3), vr: X.hash(i * 1.913, 5.17),
      face: Math.atan2(ft[1] - q.y, ft[0] - q.x) + (X.hash(i * 2.2 + seed, 8.8) - .5) * fj,
    }));
    units.spacing = spacing;
    if (layoutCache.size > 64) layoutCache.delete(layoutCache.keys().next().value);
    layoutCache.set(key, units);
    return units;
  };
  // greedy nearest-neighbour order through the units starting near (x, y): chain lightning, lock-on sequences
  K.crowdChain = function (units, x, y) {
    const left = units.slice(), order = [];
    let px = x, py = y;
    while (left.length) {
      let bi = 0, bd = Infinity;
      for (let j = 0; j < left.length; j++) { const d = (left[j].x - px) ** 2 + (left[j].y - py) ** 2; if (d < bd) { bd = d; bi = j; } }
      const u = left.splice(bi, 1)[0];
      order.push(u); px = u.x; py = u.y;
    }
    return order;
  };

  // shorten a throw of length D along s.tdir so the body lands on the island (stage radius x .88)
  function landing(s, D, p) {
    const d = p.def || E, R = ((d.stage && d.stage.r) || ((d.view && d.view.r) || 3) * .92) * .88;
    const x = s.x, y = s.y, dx = s.tdir[0], dy = s.tdir[1], b = x * dx + y * dy, c = x * x + y * y - R * R;
    if (c >= 0) return Math.min(D, .3);                    // already at the edge: barely move
    const reach = -b + Math.sqrt(b * b - c);              // distance to the stage edge along tdir
    return D <= reach ? D : reach * (.85 + .15 * Math.min(1, reach / D));
  }
  // reactions: edit the pawn state s, a = seconds since the hit, s.pw = power, s.tdir = away from o.at
  const REACT = {
    knock(s, a, u, p) {
      const pw = s.pw, rs = s.rs || 1, T = .45 + .25 * pw, D = landing(s, (1 + .9 * u.r2) * pw * rs * 1.2 * 1.12, p) / 1.12, Hh = (.4 + .6 * u.r3) * pw * rs, k = clamp(a / T, 0, 1);
      const d = D * p.easeOut(k) + (a > T ? D * .12 * p.easeOutCubic((a - T) / .35) : 0);
      s.x += s.tdir[0] * d; s.y += s.tdir[1] * d; s.z = 4 * Hh * k * (1 - k);
      s.tilt = (Math.PI / 2 + (pw > .6 ? TAU : 0)) * p.easeOut(k); s.walk = null; s.spear = false;
    },
    launch(s, a, u, p) {
      const pw = s.pw, rs = s.rs || 1, T = .75 + .3 * u.r2, Hh = (1 + .9 * u.r3) * pw * rs, k = clamp(a / T, 0, 1), d = landing(s, .35 * pw * rs, p) * p.easeOut(k);
      s.x += s.tdir[0] * d; s.y += s.tdir[1] * d; s.z = 4 * Hh * k * (1 - k);
      s.tilt = (Math.PI / 2 + TAU * (u.r1 > .5 ? 2 : 1)) * k; s.walk = null; s.spear = false;
    },
    fall(s, a, u, p) {
      s.tilt = Math.PI / 2 * p.easeIn(a / (.35 + .15 * u.r2)); s.walk = null;
      if (a > .2) s.spear = false;
    },
    crush(s, a, u, p) {
      const k = p.easeOutExpo(a / .06);
      s.sq = 1 - .8 * k; s.wide = 1 + .55 * k; s.walk = null; s.spear = false;
    },
    freeze(s, a, u, p, o) {
      s.walk = null; s.jit = 0;
      if (a > .04 + .1 * u.r1) s.mat = o.freezeMat || 'ice';   // freezeMat 'stone': petrify
      const ts = o.shatter ? o.shatter(u) : null;
      if (ts != null && o.t >= ts) { s.hide = true; s.shards = o.t - ts; s.shardMat = o.freezeMat; s.spear = false; }
    },
    burn(s, a, u, p) {
      s.walk = a < .7 ? s.walk : null;
      if (a > .2) s.mat = 'char';
      s.fire = 1 - p.ph(a, .8, 1.5);
      s.jit = a < .7 ? .03 : 0;
      if (a > .7) { const k = p.easeIn((a - .7) / .35); s.sq = 1 - .7 * k; s.wide = 1 + .3 * k; s.spear = false; }
      if (a > 1.05) { s.hide = true; s.ash = 1; }
      s.motes = { a, ramp: s.glowRamp, n: 5 };
    },
    zap(s, a, u, p) {
      s.walk = null;
      if (a < .55) { s.mat = Math.floor(a * 22 + u.r1 * 2) % 2 ? 'white' : 'char'; s.jit = .035; s.glow = .9 * (1 - a / .55); }
      else { s.mat = 'char'; s.tilt = Math.PI / 2 * p.easeIn((a - .55) / .3); s.spear = false; }
    },
    pull(s, a, u, p, o) {
      const at = typeof o.at === 'function' ? o.at(u) : o.at || [0, 0, 1], T = o.pullT || 1, k = p.easeInCubic(a / T), sw = (o.swirl == null ? 2.4 : o.swirl) * k;
      const dx = s.x - at[0], dy = s.y - at[1], c = Math.cos(sw), sn = Math.sin(sw);
      s.x = at[0] + (dx * c - dy * sn) * (1 - k); s.y = at[1] + (dx * sn + dy * c) * (1 - k);
      s.z = (at[2] || 0) * Math.pow(k, .7); s.tilt = k * (2 + u.r2 * 3); s.walk = null; s.spear = false;
      if (k >= 1) s.hide = true;
    },
    vapor(s, a, u, p) {
      s.walk = null; s.mat = 'white'; s.spear = false;
      s.glow = 1 - p.ph(a, .1, .6); s.alpha = 1 - p.ph(a, .12, .6);
      s.motes = { a, ramp: s.glowRamp, n: 6 };
      if (a > .6) s.hide = true;
    },
  };
  K.crowdReactions = Object.keys(REACT);
  X.REACT = REACT;   // custom reactions can call a built-in one: PXFX.REACT.knock(s, a, u, p, o)

  // draw one pawn from a state (also usable on its own: packed bodies, statues, a lone survivor)
  K.pawn = function (s, o = E) {
    if (s.hide && s.shards == null && !s.ash) return null;
    const sc = o.scale || 1, td = s.tdir || [1, 0], tilt = s.tilt || 0, sq = s.sq == null ? 1 : s.sq, wd = s.wide || 1;
    const alpha = s.alpha == null ? 1 : s.alpha, pal = o.pal || PAWN;
    let x = s.x, y = s.y;
    if (s.jit) { const f = Math.floor(this.t * 30); x += (X.hash(f, s.i * 3.3) - .5) * 2 * s.jit; y += (X.hash(f + 7, s.i * 1.9) - .5) * 2 * s.jit; }
    const groundZ = s.z || 0, ct = Math.cos(tilt), st = Math.sin(tilt);
    const cz = groundZ + (.08 + .22 * Math.abs(ct) * sq) * sc;
    const res = { chest: [x, y, cz + .1 * sc], head: [x, y, cz + .25 * sc] };
    // ice shards flying from where the statue stood
    if (s.shards != null) {
      const n = Math.max(3, Math.round(5 * this.density)), g = 4.9;
      for (let k = 0; k < n; k++) {
        const d = this.rdir(s.i * 13 + k, 77, .7), v = (1 + .9 * this.r(s.i * 13 + k, 78)) * (o.shardV || 1);
        const z0 = groundZ + .3 * sc * this.r(k, 79) + .1, vz = d[2] * v;
        const land = (vz + Math.sqrt(vz * vz + 4 * g * Math.max(.01, z0 - .04))) / (2 * g), tt = Math.min(s.shards, land);
        const px = x + d[0] * v * tt, py = y + d[1] * v * tt, pz = Math.max(.04, z0 + vz * tt - g * tt * tt);
        const spin = tt * 9 + k, dir = s.shards < land ? [Math.cos(spin), Math.sin(spin), Math.sin(spin * .7)] : [Math.cos(k * 2.1), Math.sin(k * 2.1), .15];
        this.shard(px, py, pz, (.1 + .06 * this.r(k, 80)) * sc, .05 * sc, dir, MAT[s.shardMat] || MAT.ice, { alpha, shadow: false });
      }
      return res;
    }
    if (s.ash) {
      const A = s.ash * alpha;
      if (A > .05) this.scard(x, y, .045 * sc, .34 * sc, .12 * sc, (uu, vv) => (vv < .75 - 1.7 * uu * uu ? .25 + .4 * (vv + 1) : -1), ASH, { alpha: Math.min(1, A * 1.2) });
      if (s.motes) this._motes(x, y, groundZ + .15 * sc, s, sc);
      return res;
    }
    // local frame: forward F, side S, up U, all rotated by the tilt about the horizontal axis normal to tdir
    const f = s.face == null ? Math.PI : s.face, F0 = [Math.cos(f), Math.sin(f), 0], S0 = [-Math.sin(f), Math.cos(f), 0];
    const ax = [-td[1], td[0], 0];
    const rot = vv => { const cr = cross(ax, vv), dd = ax[0] * vv[0] + ax[1] * vv[1]; return [vv[0] * ct + cr[0] * st + ax[0] * dd * (1 - ct), vv[1] * ct + cr[1] * st + ax[1] * dd * (1 - ct), vv[2] * ct + cr[2] * st]; };
    const F = rot(F0), S = rot(S0), U = rot([0, 0, 1]);
    const P = (fw, sd, up) => [x + (F[0] * fw + S[0] * sd) * sc * wd + U[0] * up * sc * sq, y + (F[1] * fw + S[1] * sd) * sc * wd + U[1] * up * sc * sq, cz + (F[2] * fw + S[2] * sd) * sc * wd + U[2] * up * sc * sq];
    const mat = s.flash ? MAT.white : s.mat ? (typeof s.mat === 'string' ? MAT[s.mat] : s.mat) : null, body = mat || pal.body, helm = mat || pal.helm;
    const bo = { shadow: false, alpha };
    const seg = (a, b, r, ramp) => {
      const len = Math.hypot(b[0] - a[0], b[1] - a[1], b[2] - a[2]), n = Math.max(1, Math.ceil(len / (r * .9)));
      for (let k = 0; k <= n; k++) { const q = k / n; this.ball(a[0] + (b[0] - a[0]) * q, a[1] + (b[1] - a[1]) * q, a[2] + (b[2] - a[2]) * q, r, ramp, bo); }
    };
    const stride = s.walk != null ? Math.sin(s.walk) * .07 : 0;
    // stubby legs, a round torso, red shoulder pads and helmet: a chunky soldier that still reads at ~10 px tall
    seg(P(0, .07, -.12), P(stride, .075, -.27), .055 * sc, body);
    seg(P(0, -.07, -.12), P(-stride, -.075, -.27), .055 * sc, body);
    seg(P(0, 0, -.07), P(.01, 0, .06), .125 * sc, body);
    const sh1 = P(0, .13, .07), sh2 = P(0, -.13, .07), hd = P(.02, 0, .22);
    this.ball(sh1[0], sh1[1], sh1[2], .065 * sc, helm, bo);
    this.ball(sh2[0], sh2[1], sh2[2], .065 * sc, helm, bo);
    this.ball(hd[0], hd[1], hd[2], .09 * sc, helm, bo);
    res.chest = P(0, 0, 0); res.head = hd;
    if (s.spear !== false && o.spears !== false && Math.abs(tilt) < .5 && sq > .6 && alpha > .5) {
      const hb = P(.07, -.18, -.2), ht = P(.07, -.18, .45), mx = (hb[0] + ht[0]) / 2, my = (hb[1] + ht[1]) / 2, mz = (hb[2] + ht[2]) / 2;
      this.scard(mx, my, mz, .03 * sc, .65 * sc * U[2], (uu, vv) => (vv > .84 ? .99 : .4), pal.spear);
    }
    if (alpha > .35) this.shadow(x, y, groundZ, .17 * sc * wd, groundZ > .05 ? .6 : 1);
    if (s.glow > 0 && s.glowRamp) this.glow(res.chest[0], res.chest[1], res.chest[2], .32 * sc, s.glowRamp, s.glow);
    if (s.fire > 0 && s.glowRamp) {
      const cf = this.cam().fwd, c = [res.chest[0] + cf[0] * .14 * sc, res.chest[1] + cf[1] * .14 * sc, res.chest[2] + cf[2] * .14 * sc], fl = .7 + .3 * Math.sin(this.t * 31 + s.i);
      this.glow(c[0], c[1], c[2], .3 * sc, s.glowRamp, .8 * s.fire * fl);
      for (let k = 0; k < 2; k++) {
        const ox = (k - .5) * .1 * sc, hgt = (.3 + .2 * this.noise(this.t * 6 + k * 3, s.i)) * sc;
        this.line([c[0] + ox, c[1], c[2] - .05 * sc], [c[0] + ox * 1.6, c[1], c[2] + hgt], .1 * sc, s.glowRamp, s.fire * fl, { w1: .01, i1: .2 });
      }
    }
    if (s.motes) this._motes(x, y, cz, s, sc);
    return res;
  };
  // rising sparks / embers / motes above a pawn
  K._motes = function (x, y, z, s, sc) {
    const m = s.motes;
    if (!m.ramp) return;
    for (let k = 0; k < (m.n || 5); k++) {
      const age = m.a - this.r(s.i * 7 + k, 91) * .4;
      if (age < 0 || age > 1) continue;
      const a = this.r(s.i * 7 + k, 92) * TAU, rr = .12 * sc * (1 + age);
      this.dot(x + Math.cos(a) * rr, y + Math.sin(a) * rr, z + age * .9 * sc, m.ramp, 1 - age);
    }
  };

  // pawn palettes: the default red-helmed spearmen plus a few armies
  const PALS = {
    red: PAWN,
    steel: { body: ['#262a36', '#363c4c', '#4c5468', '#667088'], helm: ['#5c6474', '#8a93a4', '#bcc4d0', '#e8ecf2'], spear: PAWN.spear },
    bone: { body: ['#2c2626', '#403836', '#5a504c', '#766a64'], helm: ['#8a8070', '#b4aa94', '#d8d0bc', '#f2ecdc'], spear: PAWN.spear },
    jade: { body: ['#1c2a24', '#283a32', '#385044', '#4c6a5a'], helm: ['#2c5a3a', '#3e7c4c', '#5aa462', '#8cc878'], spear: PAWN.spear },
    gold: { body: ['#2a2230', '#3c3044', '#54445c', '#6e5a76'], helm: ['#7a5418', '#a87624', '#d8a83c', '#f6d878'], spear: PAWN.spear },
  };
  X.PAWN_PALS = PALS;
  const rampCache = new WeakMap();   // palette array -> { hue, arr }: per-unit lookups must not build strings
  const ramp32 = (r, hue) => {
    let e = rampCache.get(r);
    if (!e || e.hue !== hue) { e = { hue, arr: X.rampArr(X.rampId(r), hue) }; rampCache.set(r, e); }
    return e.arr;
  };
  // far LOD: a pawn as a few pixels (a 1-2 px wide stroke from the feet to the helmet), for hordes of hundreds to
  // tens of thousands. Same state fields as K.pawn; writes soft solids (no outline) with depth and a ground shadow.
  // Seen from above a dense army is a sea of helmets, so each unit varies its helmet shade and a few show a spear
  // glint: the carpet reads as a crowd instead of a flat slab
  let SV = null, SA = 1;
  function sput(ix, iy, d, c) {
    const v = SV;
    if (ix < 0 || iy < 0 || ix >= v.W || iy >= v.H) return;
    if (SA < 1 && X.bayerAt(ix, iy) >= SA) return;
    const i = iy * v.W + ix;
    if (d <= v.zb[i]) return;
    v.pix[i] = c; v.zb[i] = d; v.kind[i] = 4;
  }
  function sshade(ix, iy) {
    const v = SV;
    if (ix >= 0 && iy >= 0 && ix < v.W && iy < v.H) { const i = iy * v.W + ix; if (v.shadow[i] < 1) v.shadow[i] = 1; }
  }
  K.pawnSprite = function (s, o = E) {
    if (s.hide && s.shards == null && !s.ash) return null;
    const v = this.v, sc = o.scale || 1, pal = o.pal || PAWN;
    let x = s.x, y = s.y;
    if (s.jit) { const h = X.hash(Math.floor(this.t * 30), s.i * 3.3), h2 = h * 7.13 % 1; x += (h - .5) * 2 * s.jit; y += (h2 - .5) * 2 * s.jit; }
    const gz = s.z || 0, tilt = s.tilt || 0, ct = Math.cos(tilt), st = Math.sin(tilt), td = s.tdir || [1, 0];
    const sq = s.sq == null ? 1 : s.sq, wd = s.wide || 1, alpha = s.alpha == null ? 1 : s.alpha, Hh = .62 * sc * sq;
    const ux = td[0] * st, uy = td[1] * st, uz = ct;
    const res = { chest: [x + ux * Hh * .45, y + uy * Hh * .45, gz + .02 + uz * Hh * .45], head: [x + ux * Hh * .85, y + uy * Hh * .85, gz + .02 + uz * Hh * .85] };
    const hue = v.hue, hpx = .62 * sc * v.S * v.fs;
    SV = v; SA = alpha;
    if (s.shards != null) {
      const ice = ramp32(MAT[s.shardMat] || MAT.ice, hue), g = 4.9;
      for (let k = 0; k < 3; k++) {
        const d = this.rdir(s.i * 13 + k, 77, .7), sp = (.6 + .6 * this.r(s.i * 13 + k, 78)) * (o.shardV || 1) * Math.max(.4, sc * 2);
        const z0 = gz + Hh * .5, vz = d[2] * sp, land = (vz + Math.sqrt(vz * vz + 4 * g * Math.max(.01, z0))) / (2 * g), tt = Math.min(s.shards, land);
        if (s.shards > land + .5) continue;
        if (!v.P(x + d[0] * sp * tt, y + d[1] * sp * tt, Math.max(0, z0 + vz * tt - g * tt * tt))) continue;
        sput(Math.floor(v.px), Math.floor(v.py), v.pd + .03, ice[k === 0 ? 3 : 2]);
      }
      return res;
    }
    if (s.ash) {
      if (alpha * s.ash < .05 || !v.P(x, y, 0)) return res;
      const ash = ramp32(ASH, hue), ix = Math.floor(v.px), iy = Math.floor(v.py), w = Math.max(1, Math.round(hpx * .45));
      for (let k = 0; k < w; k++) sput(ix + k - (w >> 1), iy, v.pd + .02, ash[1 + ((k + s.i) & 1)]);
      if (s.motes && (s.i & 1)) this._motes(x, y, gz + Hh * .3, { i: s.i, motes: { a: s.motes.a, ramp: s.motes.ramp, n: 1 } }, sc);
      return res;
    }
    if (!v.P(x, y, gz)) return res;
    const bx = v.px, by = v.py, bd = v.pd;
    if (!v.P(x + ux * Hh, y + uy * Hh, gz + uz * Hh)) return res;
    const tx = v.px, ty = v.py, tdp = v.pd;
    const mat = s.flash ? MAT.white : s.mat ? (typeof s.mat === 'string' ? MAT[s.mat] : s.mat) : null, body = ramp32(mat || pal.body, hue), helm = ramp32(mat || pal.helm, hue);
    const w = Math.max(1, Math.min(3, Math.round(hpx * .3 * wd))), dx = tx - bx, dy = ty - by;
    const n = Math.max(1, Math.round(Math.max(Math.abs(dx), Math.abs(dy)))), vert = Math.abs(dy) >= Math.abs(dx);
    const bob = s.walk != null && Math.sin(s.walk) > .3 ? 1 : 0, legs = hpx >= 6 && Math.abs(tilt) < .5 && w >= 2;
    const hl = body.length - 1, hh = helm.length - 1, o0 = (w - 1) >> 1, nh = hpx >= 6 ? 2 : 1;
    // per-unit helmet shade: most catch the light, some sit in shadow, a few show the dark back of the head
    // (specks under 3 px: fewer helmets and a darker body so the carpet stays dark with red dots)
    const vr = s.vr != null ? s.vr : X.hash(s.i * 1.913, 5.17), speck = hpx < 3;
    const hc = mat ? hh : vr < (speck ? .4 : .55) ? hh - 1 : vr < (speck ? .62 : .85) ? Math.max(1, hh - 2) : -1;
    for (let k = 0; k < n; k++) {
      const f = (k + .5) / n, ix = Math.floor(bx + dx * f), iy = Math.floor(by + dy * f) - (k ? bob : 0), d = bd + (tdp - bd) * f + .03, top = k >= n - nh;
      for (let j = 0; j < w; j++) {
        if (legs && k === 0 && ((w === 2 && s.walk != null && j === (Math.sin(s.walk) > 0 ? 0 : 1)) || (w === 3 && j === 1))) continue;
        let c;
        if (top && hc >= 0) c = helm[w > 1 && j === 0 && k === n - 1 ? Math.min(hh, hc + 1) : j === w - 1 && w > 1 ? Math.max(0, hc - 1) : hc];
        else c = body[w === 1 ? (top ? (speck ? 1 : hl) : speck ? 1 : hl - 1) : j === 0 ? hl : j === w - 1 ? 1 : hl - 1];
        if (vert) sput(ix + j - o0, iy, d, c); else sput(ix, iy + j - o0, d, c);
      }
    }
    // spear: a one pixel shaft beside the upright body; on specks only a rare tip glint
    if (o.spears !== false && s.spear !== false && Math.abs(tilt) < .4 && sq > .6 && alpha > .5) {
      const spr = ramp32(pal.spear || PAWN.spear, hue);
      if (hpx >= 5.5) { const sx = Math.floor(bx) + w - o0, len = Math.round(hpx * 1.1); for (let k = 1; k <= len; k++) sput(sx, Math.floor(by) - k - bob, bd + .035, k >= len - 1 ? spr[2] : spr[1]); }
      else if (vr > (speck ? .996 : .93)) sput(Math.floor(tx) + 1, Math.floor(ty) - 1 - bob, tdp + .035, spr[2]);
    }
    // ground shadow: a pixel or two beside the feet (under the body when airborne)
    if (alpha > .35 && !s.noShadow) {
      if (gz > .04) { if (v.P(x + X.SHADOW_X * gz, y + X.SHADOW_Y * gz, 0)) for (let j = 0; j < w; j++) sshade(Math.floor(v.px) + j - o0, Math.floor(v.py)); }
      else { const ix = Math.floor(bx), iy = Math.floor(by); for (let j = 0; j <= w; j++) sshade(ix + j - o0 + 1, iy); if (w > 1) sshade(ix + 1, iy + 1); }
    }
    if (s.glow > 0 && s.glowRamp) this.glow(res.chest[0], res.chest[1], res.chest[2], .32 * sc, s.glowRamp, s.glow);
    if (s.fire > 0 && s.glowRamp) {
      const fl = .7 + .3 * Math.sin(this.t * 31 + s.i);
      this.glow(res.chest[0], res.chest[1], res.chest[2] + .1 * sc, .3 * sc, s.glowRamp, .8 * s.fire * fl);
      this.dot(res.head[0], res.head[1], res.head[2] + (.15 + .1 * this.noise(this.t * 6, s.i)) * sc, s.glowRamp, s.fire * fl);
    }
    if (s.motes) this._motes(x, y, gz + Hh * .5, { i: s.i, motes: { a: s.motes.a, ramp: s.motes.ramp, n: Math.min(2, s.motes.n || 2) } }, sc);
    return res;
  };

  // spatial hash over a layout for neighbour queries (contagion, bounce targets, local chains); cached per layout
  K.crowdGrid = function (units, cell) {
    cell = cell || Math.max(.05, (units.spacing || .3) * 2);
    if (units._grid && units._grid.cell === cell) return units._grid;
    const map = new Map(), key = (a, b) => a * 73856093 ^ b * 19349663;
    for (const u of units) { const k = key(Math.floor(u.x / cell), Math.floor(u.y / cell)); let a = map.get(k); if (!a) map.set(k, a = []); a.push(u); }
    const g = {
      cell,
      near(x, y, r) {
        const out = [], a0 = Math.floor((x - r) / cell), a1 = Math.floor((x + r) / cell), b0 = Math.floor((y - r) / cell), b1 = Math.floor((y + r) / cell);
        for (let a = a0; a <= a1; a++) for (let b = b0; b <= b1; b++) {
          const l = map.get(key(a, b));
          if (l) for (const u of l) if ((u.x - x) ** 2 + (u.y - y) ** 2 <= r * r) out.push(u);
        }
        return out;
      },
    };
    Object.defineProperty(units, '_grid', { value: g, writable: true, configurable: true });
    return g;
  };

  // kill counter HUD: a skull and "killed/total" in 3x5 pixel digits with a dark outline, pinned to a screen corner.
  // Draw it LAST in draw(). o: t, alpha (0..1, fade it out before the loop ends), x, y (pixels from the top-left),
  // right: true pins it to the top-right. Turns gold with a short pop when every unit is down.
  const GLYPH = {
    0: '111101101101111', 1: '010110010010111', 2: '111001111100111', 3: '111001111001111', 4: '101101111001001',
    5: '111100111001111', 6: '111100111101111', 7: '111001001010010', 8: '111101111101111', 9: '111101111001111',
    '/': '001001010100100', ' ': '000000000000000',
  };
  const SKULL = ['01110', '11111', '10101', '11111', '01010'];
  K.tally = function (states, o = E) {
    const v = this.v, t = o.t == null ? this.t : o.t, alpha = o.alpha == null ? 1 : o.alpha, given = o.total != null;
    if (!this.props || alpha <= 0 || (!given && (!states || !states.length))) return 0;
    // o.total / o.dead / o.last: counts computed by the effect itself (armies too big for per-unit states)
    let dead = 0, last = -Infinity, all = true;
    if (given) { dead = o.dead || 0; last = o.last == null ? t : o.last; all = dead >= o.total; }
    else for (const s of states) {
      if (s.hitT != null && t >= s.hitT) { dead++; if (s.hitT > last) last = s.hitT; } else all = false;
    }
    const total = given ? o.total : states.length, done = all && dead === total;
    const pop = done ? 1 - this.ph(t - last, .05, .3) : 0, big = pop > 0 ? 2 : 1;
    const cells = [];   // [col, row, colour index]
    SKULL.forEach((r, ry) => [...r].forEach((c, rx) => { if (c === '1') cells.push([rx, ry, 0]); }));
    const str = String(dead), tot = '/' + total;
    let cx = 7;
    for (const [part, ci] of [[str, 1], [tot, 2]]) for (const ch of part) {
      const g = GLYPH[ch] || GLYPH[' '];
      for (let k = 0; k < 15; k++) if (g[k] === '1') cells.push([cx + k % 3, Math.floor(k / 3), ci]);
      cx += 4;
    }
    const night = v.night, cols = done
      ? [X.rgb(232, 72, 60), X.rgb(255, 214, 92), X.rgb(255, 238, 170)]
      : [X.rgb(240, 236, 244), X.rgb(255, 255, 255), night ? X.rgb(170, 164, 184) : X.rgb(196, 190, 206)];
    const ink = X.rgb(26, 22, 34), W = v.W, H = v.H, wide = cx * big;
    const X0 = o.right ? W - (o.x == null ? 3 : o.x) - wide : (o.x == null ? 3 : o.x), Y0 = o.y == null ? 3 : o.y;
    const mask = new Map();
    for (const [c, r, ci] of cells) for (let a = 0; a < big; a++) for (let b = 0; b < big; b++) mask.set((Y0 + r * big + b) * W + X0 + c * big + a, ci);
    const put = (i, c) => {
      const ix = i % W, iy = (i / W) | 0;
      if (ix < 0 || iy < 0 || ix >= W || iy >= H || (alpha < 1 && X.bayerAt(ix, iy) >= alpha)) return;
      v.pix[i] = c; v.zb[i] = 1e9; v.kind[i] = 4;
    };
    for (const i of mask.keys()) for (const d of [-1, 1, -W, W, -W - 1, -W + 1, W - 1, W + 1]) if (!mask.has(i + d)) put(i + d, ink);
    for (const [i, ci] of mask) put(i, cols[ci]);
    return dead;
  };

  K.crowd = function (o = E) {
    const units = this.crowdLayout(o), t = o.t == null ? this.t : o.t;
    // scale 'auto' fits the pawns to the formation spacing (o.maxScale caps it); lod 'auto' swaps to pixel sprites
    // once a pawn would be under ~7.5 px tall (hundreds and more), 'full' / 'sprite' force one
    const sc = o.scale === 'auto' ? clamp((units.spacing || .4) / .4 * (o.fill || 1), o.minScale || .08, o.maxScale || 1.5) : o.scale || 1;
    const vw = (this.def && this.def.view) || E, S0 = 240 / (2 * (vw.r || 3) * 1.12) * (vw.zoom || 1) * this.v.fs;   // mode-independent px per unit
    const lod = o.lod && o.lod !== 'auto' ? o.lod : .62 * sc * S0 < 7.5 ? 'sprite' : 'full';
    const pal = typeof o.pal === 'string' ? PALS[o.pal] || PAWN : o.pal, draw = lod === 'sprite' ? this.pawnSprite : this.pawn;
    const po = { scale: sc, pal, spears: o.spears }, ro = Object.assign({ t }, o);
    // reach: throw distances / heights of knock and launch scale with small pawns (auto scale) unless o.reach is set
    const rs0 = o.reach != null ? o.reach : o.scale === 'auto' ? clamp(sc, .25, 1) : 1;
    const rf0 = typeof o.react === 'function' ? o.react : REACT[o.react || 'knock'];
    const atF = typeof o.at === 'function' ? o.at : null, at = atF ? null : o.at || [0, 0, 0], fromF = typeof o.from === 'function' ? o.from : null;
    let from = fromF ? [1, 0] : o.from || [1, 0], fl = Math.hypot(from[0], from[1]) || 1;
    const rs = o.respawn, cl = o.clear || rs, fear = o.fear || 0, adv = o.advance;
    const out = [];
    for (const u of units) {
      const th = o.hit ? o.hit(u) : null;
      const s = { i: u.i, vr: u.vr, x: u.x, y: u.y, z: 0, tilt: 0, tdir: [1, 0], sq: 1, wide: 1, face: u.face, alpha: 1, walk: null, spear: true, glowRamp: o.ramp };
      let alive = th == null || t < th, fresh = false;
      // a fresh unit walking back in to its spot (only for units that were hit)
      if (rs && th != null && th < rs[0]) {
        const len = (rs[1] - rs[0]) * .55, st = rs[0] + u.r1 * (rs[1] - rs[0] - len);
        if (t >= st && fromF) { const f = fromF(u); from = f; fl = Math.hypot(f[0], f[1]) || 1; }
        if (t >= st) {
          const k = this.easeOut((t - st) / len), D = o.enter === 'fade' ? 0 : (o.enterD || 1.6) * (1 + .375 * u.r2);
          s.x = u.x + from[0] / fl * D * (1 - k); s.y = u.y + from[1] / fl * D * (1 - k);
          s.face = Math.atan2(-from[1], -from[0]) * (1 - k) + u.face * k;
          s.alpha = this.ph(k, 0, o.enter === 'fade' ? 1 : .4); s.walk = k < 1 && o.enter !== 'fade' ? t * 11 + u.r1 * TAU : null;
          alive = true; fresh = true;
        }
      }
      if (!fresh) {
        const tt = th == null ? t : Math.min(t, th);
        if (adv) {
          const dx = adv.to[0] - u.x, dy = adv.to[1] - u.y, dl = Math.hypot(dx, dy) || 1, d = Math.min(dl, adv.v * tt);
          s.x += dx / dl * d; s.y += dy / dl * d; s.face = Math.atan2(dy, dx); s.walk = tt * 9 + u.r1 * TAU;
        }
        const au = atF ? atF(u) : at, ddx = s.x - au[0], ddy = s.y - au[1], dd = Math.hypot(ddx, ddy) || 1;
        s.tdir = [ddx / dd, ddy / dd];
        if (alive) {
          const fr = typeof fear === 'function' ? fear(u) : fear;
          if (fr > 0) { s.tilt = .3 * fr * (.6 + .4 * u.r2); s.jit = .02 * fr; s.walk = adv ? s.walk : t * 14 * fr + u.r1 * TAU; }
        } else {
          const a = t - th;
          s.pw = typeof o.power === 'function' ? o.power(u) : o.power == null ? 1 : o.power; s.rs = rs0;
          s.flash = a < .07;
          (o.reactOf ? REACT[o.reactOf(u)] || rf0 : rf0)(s, a, u, this, ro);
          // corpses fade (and sink a little) during the clear window
          if (cl) {
            const len = (cl[1] - cl[0]) * .5, st = cl[0] + u.r2 * (cl[1] - cl[0] - len), k = this.ph(t, st, st + len);
            if (k > 0) { s.alpha = (s.alpha == null ? 1 : s.alpha) * (1 - k); if (k >= 1) { s.hide = true; s.shards = null; s.ash = 0; } }
          }
        }
      }
      const r = s.hide && s.shards == null && !s.ash ? null : draw.call(this, s, po);
      out.push({ u, hitT: th, alive, fresh, x: s.x, y: s.y, z: s.z, chest: r ? r.chest : [s.x, s.y, s.z + .3 * sc], head: r ? r.head : [s.x, s.y, s.z + .5 * sc], hidden: !r });
    }
    out.scale = sc; out.lod = lod;
    return out;
  };

  // module documentation for the copyable prompts (def.modules lists the keys an effect uses)
  X.KIT = {
    figure: { zh: '起手姿勢（Pose）：無臉人偶施法者，關鍵姿勢之間用緩動插值，手部與刀尖位置作為特效錨點。', en: 'Pose: a faceless caster mannequin; key poses blended with easing; hand and blade-tip positions anchor the effect.' },
    charge: { zh: '集氣（Charge）：光點與短光線由四周加速匯聚到一點，越近越亮，核心同時變亮。', en: 'Charge: motes and short streaks accelerate into one point, brightening as they arrive while the core grows hotter.' },
    core: { zh: '能量核心（Energy Core）：硬邊亮球＋光暈＋旋轉光芒，蓄力時先縮小再爆開。', en: 'Energy Core: a hard-edged hot orb, halo and rotating rays; contracts before it releases.' },
    slash: { zh: '斬擊（Slash）：彎月形網格，中間厚兩端尖；暗色實心主體配發光刀邊，或整片發光；後方拖速度線，消散時溶解。', en: 'Slash: a crescent mesh, thick in the middle and pointed at both ends; a dark solid body with a glowing edge or a fully bright fill; motion streaks behind; dissolves out.' },
    swarm: { zh: '粒子群（Particle Swarm）：大量細小刀片／花瓣共用一套素材，按陣形（散射、環繞、螺旋、球形、沿路徑流動）切換。', en: 'Particle Swarm: many small blades or petals sharing one sprite, switching between formations (scatter, orbit, spiral, sphere, stream along a path).' },
    creature: { zh: '能量生物（Energy Creature）：龍頭＋沿曲線取樣的身體（頭粗尾細），身體邊緣有火舌；可做暗色實心身體配發光輪廓。', en: 'Energy Creature: a dragon head plus a body sampled along a curve (thick head, thin tail) with flame licks; can be a dark solid body with a glowing outline.' },
    growth: { zh: '生長（Growth）：尖刺／冰柱／藤蔓沿路徑按次序冒出，用回彈緩動，生長前沿最亮。', en: 'Growth: spikes, ice pillars or vines erupt in sequence along a path with an overshoot ease; the growth front is brightest.' },
    shockwave: { zh: '衝擊波（Shockwave）：圓環先極快擴張再減速，越大越細越暗，地面同步一圈光帶與塵土。', en: 'Shockwave: a ring that expands very fast then slows, thinning and dimming as it grows, with a matching ground band and dust.' },
    aura: { zh: '氣場（Aura）：包住角色的火焰形光層＋向上流動的光線，地面受光。', en: 'Aura: a flame-shaped light layer around the body plus streaks flowing upwards; lights the ground.' },
    domain: { zh: '領域（Domain）：以抖色圓形擦除由施法點向外替換背景與地面（星空、血紅、熔岩、黑水），招式本身保持高亮。', en: 'Domain: a dithered radial wipe from the caster replaces the background and the ground (starfield, blood red, lava, black water) while the move itself stays bright.' },
    debris: { zh: '碎片（Debris）：預先生成的低多邊形碎石，用動畫曲線飛向目標或被推開，不做真實物理。', en: 'Debris: pre-made low-poly rocks moved along animation curves towards a target or pushed outwards; no real physics.' },
    impact: { zh: '命中（Impact）：頓幀＋短促強震屏＋放射速度線，必要時插入 1–3 格黑白反相的衝擊格。', en: 'Impact: hit-stop, a short hard camera shake and radial speed lines; optionally 1–3 frames of a two-tone negative impact frame.' },
    aftermath: { zh: '餘波（Aftermath）：地面留下焦痕、冰霜、裂紋或墨跡，慢慢淡出，令招式有重量。', en: 'Aftermath: scorch, frost, cracks or ink left on the ground, fading slowly so the move has weight.' },
    crowd: { zh: '群眾（Crowd）：一群細小敵兵（人數見「敵兵數量」參數；近景時高約施法者的 40%，暗色身體、紅色頭盔與肩甲、長矛）以均勻但不規則的點陣排成一群；每個單位的命中時間 = 起始時間 + 與爆心／波前的距離 ÷ 波速，傷害像波浪一樣掃過人群；每個單位按招式播放反應（拋飛翻滾後躺下、升空、原地倒下、壓扁、凍成冰雕後碎裂、燒成焦炭再崩成灰、觸電抽搐倒下、被吸走、化成白光蒸發），命中瞬間全身閃白 2 格；屍體淡出後新一批敵兵由場邊走回原位，令動畫可以無縫循環。', en: 'Crowd: a horde of small enemy soldiers (count from the enemy-count knob; about 40% of the caster’s height up close; dark bodies, red helmets and shoulder pads, spears) spread evenly but irregularly in a group. Each unit is hit at start time + its distance from the blast centre or wave front / wave speed, so the damage sweeps through the horde as a wave. Each unit plays the move’s reaction (thrown with a tumble then lying down, launched, toppling, flattened, frozen into a statue then shattered, burnt to charcoal then crumbling to ash, convulsing from a shock then falling, pulled away, or vaporised into white light) and flashes white for 2 frames on the hit. The bodies fade and a fresh horde walks back in from the edge, so the animation loops seamlessly.' },
    troops: { zh: '陣型（Formation）：敵兵按陣型排列（方陣、橫列、縱隊、楔形、圓陣、鶴翼、分隊、散兵），陣型在固定範圍內排開，兵距決定士兵大小；人數由十到一萬時自動換細節級別：近景是有頭盔、肩甲、長矛的 3D 小兵，數百人以上改為 1–3 像素寬的像素小兵（頭盔深淺隨機、偶有矛尖反光），一萬人時成為一片頭盔海。', en: 'Formation: enemies stand in a formation (block, line, column, wedge, ring, crescent, squads, scatter) laid out inside a fixed area, and the spacing sets the soldier size; from ten to ten thousand the level of detail switches automatically: 3D soldiers with helmet, shoulder pads and spear up close, 1–3 px wide pixel soldiers from a few hundred on (random helmet shades, the odd spear-tip glint), and a sea of helmets at ten thousand.' },
    tally: { zh: '擊殺計數（Kill Counter）：畫面角落的 3×5 像素字 HUD，一個骷髏加「已擊殺／總數」，帶深色外框；命中時即時累加，全滅時變金色並放大一下；有漏網之魚時停在實際數字，一眼看出招式有沒有覆蓋整個陣型。', en: 'Kill counter: a HUD in the corner in 3×5 pixel digits, a skull plus "killed/total" with a dark outline; it counts up live as units are hit, turns gold with a short pop on a full wipe, and stops at the real number when some survive, so you can see at a glance whether the spell covered the whole formation.' },
    grade: { zh: '環境調色（Grade）：出招前把環境壓暗、去飽和或染色（不影響發光部分）。', en: 'Grade: darken, desaturate or tint the environment before the move (emissive parts unaffected).' },
  };
  X.STAGES = {
    pose: ['起手', 'Pose'], charge: ['集氣', 'Charge'], shape: ['成形', 'Shape'], motion: ['推進', 'Motion'], impact: ['命中', 'Impact'], after: ['餘波', 'Aftermath'],
  };
  X.SKIES = SKIES;
})(typeof window !== 'undefined' ? window : globalThis);
