'use strict';
/* PXFX kit: reusable building blocks for the Ultimates pack. Each block is a method on the drawing API (`p`), so an
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
   * ground: ramp to remap the ground into (dark -> bright) or null to keep, solids: darken solids 0..1, t (twinkle) */
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
  K.domain = function (o = E) {
    const amt = o.amt == null ? 1 : o.amt;
    if (amt <= 0) return;
    const sk = typeof o.sky === 'string' ? SKIES[o.sky] : o.sky, gr = o.ground ? o.ground.map(X.hex) : null, sd = o.solids || 0;
    const t = o.t || 0, c = o.c || [0, 0, 0], self = this;
    this.post(({ pix, W, H, kind, rgb, P, bayer }) => {
      const cp = P(c[0], c[1], c[2]) || [W / 2, H / 2], maxD = Math.hypot(W, H) * .62;
      const sky = sk ? skyFrame(self, W, H, sk, t, bayer, rgb) : null;
      const gcol = gr ? gr.map(g => rgb(g[0], g[1], g[2])) : null, full = amt >= 1;
      for (let iy = 0; iy < H; iy++) for (let ix = 0; ix < W; ix++) {
        const i = iy * W + ix;
        if (!full && Math.hypot(ix - cp[0], iy - cp[1]) / maxD > amt * 1.3 - bayer(ix, iy) * .3) continue;
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
    grade: { zh: '環境調色（Grade）：出招前把環境壓暗、去飽和或染色（不影響發光部分）。', en: 'Grade: darken, desaturate or tint the environment before the move (emissive parts unaffected).' },
  };
  X.STAGES = {
    pose: ['起手', 'Pose'], charge: ['集氣', 'Charge'], shape: ['成形', 'Shape'], motion: ['推進', 'Motion'], impact: ['命中', 'Impact'], after: ['餘波', 'Aftermath'],
  };
  X.SKIES = SKIES;
})(typeof window !== 'undefined' ? window : globalThis);
