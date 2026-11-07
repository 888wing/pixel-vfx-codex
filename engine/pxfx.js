'use strict';
/* PXFX: a small software renderer for pixel-art VFX. MIT License (see LICENSE).
 *
 * Rendering style follows pixel-plays (github.com/amirmushichge/pixel-plays, MIT): a low-resolution
 * buffer with a depth buffer, hue-shifted colour ramps, a 4x4 Bayer dither, hard cast shadows and a
 * small diorama floating on a plain background.
 *
 * One effect definition renders through three cameras:
 *   '3d'  perspective camera that orbits, light dither
 *   '25d' fixed 30-degree isometric orthographic camera (the pixel-plays camera), full Bayer dither
 *   '2d'  front-on oblique camera, flat colour bands (no dither), 1px outlines on solids, 12 fps steps
 *
 * Effects are pure functions of time: def.draw(p, t), where p is the drawing API below. The same t
 * always gives the same frame, which is what makes sprite-sheet export and scrubbing possible.
 */
(function (G) {
  const TAU = Math.PI * 2;
  const BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5].map(v => (v + .5) / 16);
  const bayerAt = (ix, iy) => BAYER[(iy & 3) * 4 + (ix & 3)];
  const clamp = (v, a, b) => (v < a ? a : v > b ? b : v);
  const lerp = (a, b, t) => a + (b - a) * t;
  const smooth = (a, b, x) => { const t = clamp((x - a) / (b - a), 0, 1); return t * t * (3 - 2 * t); };
  const ease = t => t * t * (3 - 2 * t);
  function hash(x, y) { const s = Math.sin(x * 127.1 + y * 311.7) * 43758.5453; return s - Math.floor(s); }
  function noise(x, y) {
    const ix = Math.floor(x), iy = Math.floor(y), fx = ease(x - ix), fy = ease(y - iy);
    return lerp(lerp(hash(ix, iy), hash(ix + 1, iy), fx), lerp(hash(ix, iy + 1), hash(ix + 1, iy + 1), fx), fy);
  }
  function fbm(x, y, oct = 3) {
    let v = 0, a = .5, f = 1, n = 0;
    for (let k = 0; k < oct; k++) { v += noise(x * f + k * 17.3, y * f - k * 9.1) * a; n += a; a *= .5; f *= 2.03; }
    return v / n;
  }
  const rgb = (r, g, b) => (0xff000000 | clamp(b | 0, 0, 255) << 16 | clamp(g | 0, 0, 255) << 8 | clamp(r | 0, 0, 255)) >>> 0;
  function hex(h) {
    if (Array.isArray(h)) return h;
    h = String(h).replace('#', '');
    if (h.length === 3) h = h.replace(/./g, c => c + c);
    const n = parseInt(h, 16);
    return [n >> 16 & 255, n >> 8 & 255, n & 255];
  }
  const toHex = c => '#' + c.map(v => clamp(Math.round(v), 0, 255).toString(16).padStart(2, '0')).join('');
  const mixc = (a, b, k) => [lerp(a[0], b[0], k), lerp(a[1], b[1], k), lerp(a[2], b[2], k)];
  const mulc = (a, k) => [a[0] * k, a[1] * k, a[2] * k];
  const COOL = [46, 38, 84], WARM = [255, 232, 180], HOT = [255, 252, 238];

  /* ---------- colour ramps ---------- */
  // A ramp is an array of colours ordered dark to bright. Effects pass ramps by value; the registry
  // turns each distinct ramp into a small integer so the light buffer can store "which ramp" per pixel.
  const RAMPS = [], RAMP_RGB = [], byKey = new Map(), byObj = new WeakMap();
  function rampId(r) {
    if (typeof r === 'number') return r;
    if (typeof r === 'string') r = glowRamp(r);
    let id = byObj.get(r);
    if (id !== undefined) return id;
    const cols = r.map(hex), key = cols.map(toHex).join(',');
    id = byKey.get(key);
    if (id === undefined) {
      id = RAMPS.length;
      RAMP_RGB.push(cols);
      RAMPS.push(Uint32Array.from(cols.map(c => rgb(c[0], c[1], c[2]))));
      byKey.set(key, id);
    }
    byObj.set(r, id);
    return id;
  }
  const glowCache = new Map(), solidCache = new Map();
  // emissive ramp: violet-shifted rim -> base colour -> warm white-hot core. No near-black level:
  // emissive light fades out through the dither, so a dark first level would read as a dirty halo
  function glowRamp(base) {
    const k = String(base);
    if (glowCache.has(k)) return glowCache.get(k);
    const c = hex(base);
    const r = [mixc(mulc(c, .58), COOL, .18), mixc(mulc(c, .8), COOL, .06), c, mixc(c, WARM, .4), mixc(c, HOT, .72), HOT].map(toHex);
    glowCache.set(k, r);
    return r;
  }
  // solid ramp, the pixel-plays rule: shadows drift to violet, lights drift to warm yellow
  function solidRamp(base) {
    const k = String(base);
    if (solidCache.has(k)) return solidCache.get(k);
    const c = hex(base), m = (mul, tint, kk) => toHex(mixc(mulc(c, mul), tint, kk));
    const r = [m(.4, COOL, .34), m(.62, COOL, .18), m(.84, COOL, .05), m(1, WARM, 0), m(1.1, WARM, .22)];
    solidCache.set(k, r);
    return r;
  }
  function hueRot(c, deg) {
    const a = deg * Math.PI / 180, cs = Math.cos(a), sn = Math.sin(a);
    const [r, g, b] = c, Y = .299 * r + .587 * g + .114 * b, I = .596 * r - .274 * g - .322 * b, Q = .211 * r - .523 * g + .312 * b;
    const I2 = I * cs - Q * sn, Q2 = I * sn + Q * cs;
    return [Y + .956 * I2 + .621 * Q2, Y - .272 * I2 - .647 * Q2, Y - 1.106 * I2 + 1.703 * Q2];
  }
  const hueCache = new Map(), chromaCache = [];
  // greys (stone, smoke, ash) keep their colour when the effect's hue is changed
  function chroma(id) {
    if (chromaCache[id] == null) {
      let c = 0;
      for (const [r, g, b] of RAMP_RGB[id]) { const Y = .299 * r + .587 * g + .114 * b, I = .596 * r - .274 * g - .322 * b, Q = .211 * r - .523 * g + .312 * b; c += Math.hypot(I, Q) / (Y + 24); }
      chromaCache[id] = c / RAMP_RGB[id].length;
    }
    return chromaCache[id];
  }
  function rampArr(id, hue) {
    if (!hue || chroma(id) < .075) return RAMPS[id];
    const key = id * 4096 + (hue | 0);
    let r = hueCache.get(key);
    if (!r) { r = Uint32Array.from(RAMP_RGB[id].map(c => { const h = hueRot(c, hue); return rgb(h[0], h[1], h[2]); })); hueCache.set(key, r); }
    return r;
  }

  /* ---------- stage grounds ---------- */
  // four closely spaced tones per ground: wide steps make the dither read as a checkerboard
  const GROUNDS = {
    stone: { tones: ['#7f7c88', '#8a8792', '#95929c', '#a09da5'], speck: ['#b8b4b8', '#625e6e'] },
    slate: { tones: ['#545868', '#5c6071', '#64687a', '#6c7083'], speck: ['#8a8ea0', '#3f4252'] },
    grass: { tones: ['#3a6a44', '#4a7a46', '#5a8a4a', '#6c984e'], speck: ['#a8b45a', '#2a4c36'] },
    moss: { tones: ['#4b5c44', '#55684b', '#5f7351', '#6a7e58'], speck: ['#93a06c', '#36442f'] },
    sand: { tones: ['#c8ac82', '#d3b98d', '#dcc497', '#e5cfa3'], speck: ['#efe0bb', '#9c8160'] },
    dirt: { tones: ['#7a6450', '#846c56', '#8e755d', '#987e64'], speck: ['#b09478', '#5a4a3c'] },
    snow: { tones: ['#b6c3d4', '#c2cede', '#ced9e7', '#dae3ef'], speck: ['#f2f6fb', '#8e9cb4'] },
    ash: { tones: ['#3e3843', '#46404b', '#4e4753', '#564f5b'], speck: ['#6e6572', '#2a2530'] },
    marble: { tones: ['#c9c2b6', '#d2ccc1', '#dbd6cc', '#e4dfd6'], speck: ['#f4efe6', '#a59d90'] },
    void: { tones: ['#2a2638', '#302b40', '#363048', '#3c3550'], speck: ['#5a4f78', '#1c1928'] },
    teal: { tones: ['#3d5f63', '#45686c', '#4d7175', '#567a7e'], speck: ['#7ea2a2', '#2c4649'] },
  };
  const groundCache = new Map();
  function groundSet(name, night) {
    const key = name + (night ? ':n' : '');
    if (groundCache.has(key)) return groundCache.get(key);
    const g = GROUNDS[name] || GROUNDS.stone;
    const conv = h => { let c = hex(h); if (night) c = mixc(mulc(c, .42), [26, 24, 44], .22); return rgb(c[0], c[1], c[2]); };
    const s = { tones: g.tones.map(conv), speck: g.speck.map(conv) };
    groundCache.set(key, s);
    return s;
  }

  // per-stage ground texture over [-1.15R, 1.15R]^2: edge distance, tone (0..1) and speck index per texel
  const texCache = new Map();
  function groundTex(def, R, shape, tiles) {
    const key = def.id + '|' + R + '|' + shape + '|' + (tiles ? 1 : 0);
    let t = texCache.get(key);
    if (t) return t;
    const n = 256, ext = R * 1.15, step = 2 * ext / n;
    t = { n, ext, inv: 1 / step, edge: new Float32Array(n * n), tone: new Float32Array(n * n), speck: new Uint8Array(n * n) };
    for (let w = 0; w < n; w++) for (let u = 0; u < n; u++) {
      const x = -ext + (u + .5) * step, y = -ext + (w + .5) * step, k = w * n + u;
      const ax = Math.abs(x) / R, ay = Math.abs(y) / R;
      const edge = shape === 'square' ? Math.pow(Math.pow(ax, 5) + Math.pow(ay, 5), .2) : Math.pow(Math.pow(ax, 2.4) + Math.pow(ay, 2.4), 1 / 2.4);
      t.edge[k] = edge + (noise(x * 1.3 + 7, y * 1.3) - .5) * .14;
      const fine = hash(Math.floor(x * 9), Math.floor(y * 9));
      if (fine > .972) { t.speck[k] = 1; continue; }
      if (hash(Math.floor(x * 9) - 1, Math.floor(y * 9) - 1) > .972) { t.speck[k] = 2; continue; }
      let v = .5 + (noise(x * .7, y * .9) - .5) * .8 + (fine - .5) * .22 - edge * .18;
      if (tiles) {
        const tx = x / .9 + (Math.floor(y / .9) & 1) * .5, ty = y / .9;
        if (Math.abs(tx - Math.round(tx)) < .045 || Math.abs(ty - Math.round(ty)) < .045) v -= .45;
      }
      t.tone[k] = v;
    }
    texCache.set(key, t);
    return t;
  }

  const MODES = {
    '3d': { label: '3D', dither: .55, fps: 30, edges: true, outline: false },
    '25d': { label: '2.5D', dither: .9, fps: 20, edges: true, outline: false },
    '2d': { label: '2D', dither: 0, fps: 12, edges: false, outline: true },
  };
  const OBLIQUE = .55;                               // 2D: ground depth drawn at 55% height
  const SHADOW_X = 1.3, SHADOW_Y = -.12;              // pixel-plays shadow direction (screen-right in 2.5D)
  const LL = Math.hypot(SHADOW_X, SHADOW_Y, 1);
  const LX = -SHADOW_X / LL, LY = -SHADOW_Y / LL, LZ = 1 / LL;   // world vector towards the light
  const E = {};

  /* ---------- caster figure poses: hand offsets from each shoulder and foot positions, local [forward, left, up] ---------- */
  const POSES = {
    idle: { hr: [.04, -.06, -.48], hl: [.04, .06, -.48], fr: [0, -.12, 0], fl: [0, .12, 0], lean: 0, crouch: 0 },
    ready: { hr: [.3, -.02, -.25], hl: [.22, .08, -.2], fr: [-.16, -.13, 0], fl: [.18, .12, 0], lean: .1, crouch: .2 },
    point: { hr: [.5, .06, .02], hl: [.05, .05, -.46], fr: [-.12, -.14, 0], fl: [.16, .12, 0], lean: .05, crouch: .1 },
    palm: { hr: [.44, .13, -.06], hl: [.44, -.13, -.06], fr: [-.2, -.16, 0], fl: [.22, .14, 0], lean: .15, crouch: .3 },
    raise: { hr: [.08, -.04, .48], hl: [.05, .06, -.46], fr: [0, -.13, 0], fl: [.05, .13, 0], lean: -.05, crouch: 0 },
    bothUp: { hr: [.05, .05, .48], hl: [.05, -.05, .48], fr: [0, -.14, 0], fl: [0, .14, 0], lean: -.08, crouch: 0 },
    spread: { hr: [.05, -.48, .05], hl: [.05, .48, .05], fr: [0, -.15, 0], fl: [0, .15, 0], lean: -.05, crouch: 0 },
    windup: { hr: [-.3, .05, .25], hl: [-.2, -.12, .2], fr: [-.2, -.15, 0], fl: [.2, .12, 0], lean: -.15, crouch: .25 },
    swing: { hr: [.45, .25, -.25], hl: [.38, .1, -.25], fr: [-.3, -.15, 0], fl: [.3, .12, 0], lean: .35, crouch: .35 },
    punch: { hr: [.52, .1, -.02], hl: [.05, .02, -.25], fr: [-.3, -.14, 0], fl: [.28, .12, 0], lean: .3, crouch: .3 },
    charge: { hr: [-.12, .1, -.36], hl: [-.12, -.12, -.36], fr: [-.18, -.2, 0], fl: [.18, .2, 0], lean: .05, crouch: .45 },
    kick: { hr: [-.15, -.1, -.3], hl: [.15, .1, -.1], fr: [.55, -.1, .75], fl: [0, .1, 0], lean: -.25, crouch: .1 },
    dash: { hr: [-.35, -.05, -.3], hl: [-.35, .05, -.3], fr: [-.45, -.12, .05], fl: [.25, .12, 0], lean: .7, crouch: .5 },
    float: { hr: [.1, -.3, -.25], hl: [.1, .3, -.25], fr: [-.04, -.08, -.04], fl: [.04, .08, 0], lean: 0, crouch: 0 },
    guard: { hr: [.25, .22, -.05], hl: [.25, -.22, -.05], fr: [-.14, -.14, 0], fl: [.16, .13, 0], lean: .05, crouch: .2 },
    gaze: { hr: [.15, .12, .18], hl: [.04, .06, -.46], fr: [-.05, -.13, 0], fl: [.08, .12, 0], lean: .04, crouch: 0 },
  };
  const FIGURE_RAMP = ['#2b2a3c', '#3c3b53', '#51536c', '#6a6e87', '#868ba2'];
  const BLADE_RAMP = ['#5d6378', '#8d93a6', '#c3c8d4', '#eef1f6'];
  const GUIDE_COLORS = { red: '#e8463a', green: '#62c447', blue: '#3f9cff', gold: '#ffc83a', violet: '#b06cff', white: '#ffffff' };

  /* ---------- the view: buffers, camera, stage ---------- */
  class View {
    constructor(canvas, W, H) {
      this.canvas = canvas || null;
      this.ctx = canvas ? canvas.getContext('2d') : null;
      this.mode = '25d'; this.night = false; this.hue = 0; this.yaw = null; this.pitch = null;
      this.transparent = false; this.noProps = false;   // sprite export: no background, no diorama props
      this.params = {};                                   // effect-specific parameter values (def.params)
      this.tune = {};                                     // shared knobs: size, gain, density, dither, outline
      this.shakeX = 0; this.shakeY = 0; this.gainNow = 1; // set per frame by the timing layer (see timing())
      this.errors = 0;
      this.api = new Api(this);
      this.resize(W, H);
    }
    resize(W, H) {
      this.W = W; this.H = H;
      const N = W * H;
      if (this.canvas) {
        this.canvas.width = W; this.canvas.height = H;
        this.image = this.ctx.createImageData(W, H);
        this.pix = new Uint32Array(this.image.data.buffer);
      } else this.pix = new Uint32Array(N);
      this.zb = new Float32Array(N); this.kind = new Uint8Array(N); this.kind2 = new Uint8Array(N);
      this.gx = new Float32Array(N); this.gy = new Float32Array(N); this.gd = new Float32Array(N); this.ghit = new Uint8Array(N);
      this.L = new Float32Array(N); this.LM = new Float32Array(N); this.LR = new Uint16Array(N); this.LD = new Float32Array(N);
      this.GL = new Float32Array(N); this.GLR = new Uint16Array(N);
      this.shadow = new Uint8Array(N); this.tmp = new Uint32Array(N);
      this.basePix = new Uint32Array(N); this.baseZ = new Float32Array(N); this.baseKind = new Uint8Array(N);
      this.zEdge = new Float32Array(N); this.kEdge = new Uint8Array(N);   // solids already outlined by an earlier flush this frame
      this.bakeKey = ''; this.guides = []; this.guide = null; this.lens = null; this.lensNow = null;
    }
    get M() { return MODES[this.mode]; }
    get dither() { return this.tune.dither == null ? MODES[this.mode].dither : this.tune.dither; }

    camera(def) {
      const v = def.view || E, r = v.r || 3, h = v.h == null ? 2.4 : v.h;
      const m = this.mode;
      let yaw, pitch;
      if (m === '25d') { yaw = Math.PI / 4; pitch = Math.PI / 6; }
      else if (m === '3d') { yaw = this.yaw == null ? (v.yaw == null ? .5 : v.yaw) : this.yaw; pitch = this.pitch == null ? .44 : this.pitch; }
      else { yaw = 0; pitch = 0; }
      const cy = Math.cos(yaw), sy = Math.sin(yaw), cp = Math.cos(pitch), sp = Math.sin(pitch);
      this.rx = cy; this.ry = -sy;                         // screen right
      this.fx = cp * sy; this.fy = cp * cy; this.fz = sp;   // towards the viewer
      this.ux = -sp * sy; this.uy = -sp * cy; this.uz = cp; // screen up
      this.hx = sy; this.hy = cy;                         // 2D: horizontal depth axis
      this.yawV = yaw;
      const Tz = v.z == null ? h * .4 : v.z;
      this.Tz = Tz;
      const W = this.W, H = this.H, zoom = v.zoom || 1;
      let S, top, bot;
      if (m === '2d') {
        S = Math.min(W / (2 * r * 1.12), H / ((h + 2 * r * OBLIQUE) * 1.12));
        top = (h - Tz) + r * OBLIQUE; bot = -Tz - r * OBLIQUE;
      } else {
        S = Math.min(W / (2 * r * 1.12), H / ((h * cp + 2 * r * sp) * 1.12));
        top = (h - Tz) * cp + r * sp; bot = -Tz * cp - r * sp;
      }
      if (m === '3d') S *= .86;
      S *= zoom;
      this.S = S; this.OX = W / 2 + (this.shakeX | 0); this.OY = H / 2 + (top + bot) / 2 * S + (this.shakeY | 0);
      this.fs = this.tune.size || 1;                      // effect scale about the origin (props scale with it)
      // per-frame lens (def.lensAt): world point c is moved to world point to and everything is scaled by k about it,
      // ground included (close-ups that pull back to the battlefield). Stored in scaled (fs) units.
      const ln = this.lensNow, fs0 = this.fs;
      this.lens = ln && (ln.k !== 1 || ln.c !== ln.to) ? { k: ln.k, cx: ln.c[0] * fs0, cy: ln.c[1] * fs0, cz: ln.c[2] * fs0,
        tx: (ln.to || ln.c)[0] * fs0, ty: (ln.to || ln.c)[1] * fs0, tz: (ln.to || ln.c)[2] * fs0 } : null;
      this.persp = m === '3d';
      if (this.persp) { this.f = (H / 2) / Math.tan(.3); this.D = this.f / S; }
    }
    // project a world point: sets px, py (pixels), pd (depth, larger is nearer), ps (pixels per world unit)
    P(x, y, z) {
      let fs = this.fs;
      if (fs !== 1) { x *= fs; y *= fs; z *= fs; }
      const ln = this.lens;
      if (ln) { x = ln.tx + (x - ln.cx) * ln.k; y = ln.ty + (y - ln.cy) * ln.k; z = ln.tz + (z - ln.cz) * ln.k; fs *= ln.k; }
      const Z = z - this.Tz, a = x * this.rx + y * this.ry;
      if (this.mode === '2d') {
        const yy = x * this.hx + y * this.hy;
        this.px = this.OX + a * this.S; this.py = this.OY - (Z - yy * OBLIQUE) * this.S;
        this.pd = yy + z * .001; this.ps = this.S * fs;
        return true;
      }
      const b = x * this.ux + y * this.uy + Z * this.uz, c = x * this.fx + y * this.fy + Z * this.fz;
      if (this.persp) {
        const dist = this.D - c;
        if (dist < .3) return false;
        const k = this.f / dist;
        this.px = this.OX + a * k; this.py = this.OY - b * k; this.pd = -dist; this.ps = k * fs;
        return true;
      }
      this.px = this.OX + a * this.S; this.py = this.OY - b * this.S; this.pd = c; this.ps = this.S * fs;
      return true;
    }
    // intersect the pixel's view ray with the plane z = h0: sets qx, qy, qd
    Q(sx, sy, h0) {
      const ln = this.lens;
      if (!ln) return this._Q(sx, sy, h0);
      if (!this._Q(sx, sy, ln.tz + (h0 - ln.cz) * ln.k)) return false;
      this.qx = ln.cx + (this.qx - ln.tx) / ln.k; this.qy = ln.cy + (this.qy - ln.ty) / ln.k;
      return true;
    }
    _Q(sx, sy, h0) {
      const a = sx - this.OX, b = this.OY - sy;
      if (this.mode === '2d') {
        const A = a / this.S, up = b / this.S, yy = ((h0 - this.Tz) - up) / OBLIQUE;
        this.qx = A * this.rx + yy * this.hx; this.qy = A * this.ry + yy * this.hy; this.qd = yy + h0 * .001;
        return true;
      }
      if (!this.persp) {
        const A = a / this.S, B = b / this.S, c = ((h0 - this.Tz) - B * this.uz) / this.fz;
        this.qx = A * this.rx + B * this.ux + c * this.fx; this.qy = A * this.ry + B * this.uy + c * this.fy; this.qd = c;
        return true;
      }
      const A = a / this.f, B = b / this.f;
      const dz = B * this.uz - this.fz;
      if (dz > -1e-5) return false;
      const s = ((h0 - this.Tz) - this.D * this.fz) / dz;
      if (s <= 0) return false;
      this.qx = this.D * this.fx + s * (A * this.rx + B * this.ux - this.fx);
      this.qy = this.D * this.fy + s * (A * this.ry + B * this.uy - this.fy);
      this.qd = -s;
      return true;
    }
    bake(def) {
      const st = def.stage || E, v = def.view || E;
      const key = [def.id, this.mode, this.W, this.H, this.night ? 1 : 0, this.transparent ? 1 : 0, this.OX, this.OY.toFixed(3), this.mode === '3d' ? this.yawV.toFixed(4) + this.pitch : 0, this.lens ? [this.lens.k, this.lens.cx, this.lens.cy, this.lens.cz, this.lens.tx, this.lens.ty, this.lens.tz].map(x => x.toFixed(4)).join() : 0].join('|');
      if (key === this.bakeKey) return;
      this.bakeKey = key;
      const W = this.W, H = this.H, gs = groundSet(st.ground || 'stone', this.night);
      const R = st.r || (v.r || 3) * .92, shape = st.shape || 'round', tiles = st.tiles;
      const bg = this.transparent ? 0 : this.night ? rgb(20, 19, 26) : rgb(255, 255, 255), flat = this.mode === '2d';
      const pix = this.basePix, zb = this.baseZ, kind = this.baseKind, tex = groundTex(def, R, shape, tiles);
      for (let iy = 0; iy < H; iy++) for (let ix = 0; ix < W; ix++) {
        const i = iy * W + ix;
        pix[i] = bg; zb[i] = -1e9; kind[i] = 0;
        if (!this.Q(ix + .5, iy + .5, 0)) { this.ghit[i] = 0; continue; }
        const x = this.qx, y = this.qy;
        this.ghit[i] = 1; this.gx[i] = x; this.gy[i] = y; this.gd[i] = this.qd;
        if (st.ground === 'none' || this.transparent) continue;
        // ground material comes from a world-space texture cached per stage, so re-baking every frame
        // (the orbiting 3D camera) costs one lookup per pixel
        const gt = tex, u = Math.floor((x + gt.ext) * gt.inv), w = Math.floor((y + gt.ext) * gt.inv);
        if (u < 0 || w < 0 || u >= gt.n || w >= gt.n) continue;
        const k = w * gt.n + u, rough = gt.edge[k];
        if (rough > 1.04) continue;
        if (rough > .93 && bayerAt(ix, iy) < (rough - .93) / .11) continue;   // ragged dithered edge
        const sp = gt.speck[k];
        const c = sp ? gs.speck[sp - 1] : gs.tones[clamp(Math.floor(gt.tone[k] * 4 + (flat ? 0 : (bayerAt(ix, iy) - .5) * .6)), 0, 3)];
        pix[i] = c; zb[i] = this.qd; kind[i] = 1;
      }
    }
    render(def, t) {
      this.lensNow = null; this.guides.length = 0;
      const ap = this.api;
      ap.t = t; ap.mode = this.mode; ap.night = this.night; ap.props = !this.noProps; ap.def = def;   // lens may read params
      if (def.lensAt) { try { this.lensNow = def.lensAt.call(def, t, this.api); } catch (e) { if (this.errors++ < 3) console.error('[pxfx]', def.id, e); } }
      this.camera(def);
      this.bake(def);
      this.pix.set(this.basePix); this.zb.set(this.baseZ); this.kind.set(this.baseKind);
      this.anySolid = false; this.edged = false;
      const p = this.api;
      p.t = t; p.mode = this.mode; p.night = this.night; p.props = !this.noProps; p.def = def;
      try { def.draw(p, t); }
      catch (e) { if (this.errors++ < 3) console.error('[pxfx]', def.id, e); }
      this.flush();
      if (this.guides.length) this.paintGuides();
      if (this.ctx) this.ctx.putImageData(this.image, 0, 0);
    }
    // guide overlay (site toggle / tune.guide): 1 = guides over the effect, 2 = guides only (emissive light hidden)
    get guideMode() { return this.guide != null ? this.guide : (this.tune.guide || 0); }
    // paint the guide paths registered with p.guide(): 1 px lines in their colour, dotted where a solid or the
    // ground sits in front (the part of the path that goes behind the weapon), white square markers on top
    paintGuides() {
      const W = this.W, H = this.H, pix = this.pix, zb = this.zb, ink = rgb(24, 20, 30), white = rgb(255, 255, 255);
      for (const g of this.guides) {
        const col = g.col, pts = g.pts;
        for (let k = 0; k + 1 < pts.length; k++) {
          const a = pts[k], b = pts[k + 1];
          if (!a || !b) continue;
          let x0 = Math.floor(a[0]), y0 = Math.floor(a[1]);
          const x1 = Math.floor(b[0]), y1 = Math.floor(b[1]), dx = Math.abs(x1 - x0), dy = -Math.abs(y1 - y0);
          const sx = x0 < x1 ? 1 : -1, sy = y0 < y1 ? 1 : -1, n = Math.max(dx, -dy) || 1;
          let err = dx + dy, j = 0;
          for (;;) {
            if (x0 >= 0 && y0 >= 0 && x0 < W && y0 < H) {
              const i = y0 * W + x0, d = a[2] + (b[2] - a[2]) * (j / n);
              if (zb[i] <= d + .05 || ((x0 + y0) & 1)) pix[i] = col;
            }
            if (x0 === x1 && y0 === y1) break;
            const e2 = 2 * err;
            if (e2 >= dy) { err += dy; x0 += sx; }
            if (e2 <= dx) { err += dx; y0 += sy; }
            j++;
          }
        }
      }
      for (const g of this.guides) for (const m of g.marks) {
        const cx = Math.floor(m[0]), cy = Math.floor(m[1]);
        for (let yy = -2; yy <= 2; yy++) for (let xx = -2; xx <= 2; xx++) {
          const ix = cx + xx, iy = cy + yy;
          if (ix < 0 || iy < 0 || ix >= W || iy >= H) continue;
          pix[iy * W + ix] = Math.abs(xx) === 2 || Math.abs(yy) === 2 ? ink : white;
        }
      }
    }
    // render at display time tau through a timing() map: hit-stop, eased pacing, screen shake, flash
    renderAt(def, tau, timing, o = E) {
      const s = timing.at(tau);
      this.shakeX = o.noShake ? 0 : s.shakeX; this.shakeY = o.noShake ? 0 : s.shakeY; this.gainNow = s.gain;
      this.render(def, s.t);
      this.shakeX = 0; this.shakeY = 0; this.gainNow = 1;
      return s;
    }
    // resolve the deferred layers: ground shadows, ground light, solid edges, then emissive light
    flush() {
      const W = this.W, H = this.H, N = W * H, pix = this.pix, kind = this.kind, zb = this.zb;
      const hue = this.hue, dith = this.dither, gain = (this.tune.gain || 1) * this.gainNow;
      const sh = this.shadow;
      for (let i = 0; i < N; i++) {
        const s = sh[i];
        if (!s) continue;
        sh[i] = 0;
        if (kind[i] !== 1) continue;
        const c = pix[i], k = s === 1 ? [.6, .58, .76] : [.42, .4, .6];
        pix[i] = rgb((c & 255) * k[0], (c >> 8 & 255) * k[1], (c >> 16 & 255) * k[2]);
      }
      const GL = this.GL, gOnly = this.guideMode === 2;
      for (let i = 0; i < N; i++) {
        const g = GL[i];
        if (!g) continue;
        GL[i] = 0;
        if (kind[i] !== 1 || gOnly) continue;
        const ix = i % W, iy = (i / W) | 0;
        const q = g + (bayerAt(ix, iy) - .5) * (dith ? .35 : 0);
        const amt = q < .16 ? 0 : q < .42 ? .28 : q < .7 ? .5 : .72;
        if (!amt) continue;
        const R = rampArr(this.GLR[i], hue), lc = R[Math.min(R.length - 1, (R.length * .55) | 0)], c = pix[i];
        pix[i] = rgb(lerp(c & 255, lc & 255, amt) + 14 * amt, lerp(c >> 8 & 255, lc >> 8 & 255, amt) + 10 * amt, lerp(c >> 16 & 255, lc >> 16 & 255, amt));
      }
      if (this.anySolid) {
        this.anySolid = false;
        const k2 = this.kind2;
        k2.set(kind);
        // after an earlier flush this frame (post, grade, domain...), only solids drawn since then get edges:
        // a solid pixel is old when it was solid at that flush and its depth has not changed
        const old = this.edged, zE = this.zEdge, kE = this.kEdge;
        const fresh = j => k2[j] === 2 && (!old || kE[j] !== 2 || zb[j] !== zE[j]);
        if (this.tune.outline == null ? this.M.outline : this.tune.outline) {
          const ink = this.night ? rgb(8, 7, 14) : rgb(36, 32, 48);
          for (let iy = 1; iy < H - 1; iy++) for (let ix = 1; ix < W - 1; ix++) {
            const i = iy * W + ix;
            if (k2[i] === 2) continue;
            if (fresh(i - 1) || fresh(i + 1) || fresh(i - W) || fresh(i + W)) { pix[i] = ink; kind[i] = 2; zb[i] = Math.max(zb[i - 1], zb[i + 1], zb[i - W], zb[i + W]); }
          }
        } else if (this.M.edges) {
          for (let iy = 1; iy < H - 1; iy++) for (let ix = 1; ix < W - 1; ix++) {
            const i = iy * W + ix;
            if (!fresh(i)) continue;
            const c = pix[i];
            if (k2[i - 1] !== 2 || k2[i + 1] !== 2 || k2[i - W] !== 2 || k2[i + W] !== 2) {
              pix[i] = rgb((c & 255) * .7, (c >> 8 & 255) * .68, (c >> 16 & 255) * .8);
            } else if (zb[i] - zb[i - W] > .3 || zb[i] - zb[i - 1] > .3) {
              pix[i] = rgb(lerp(c & 255, WARM[0], .3), lerp(c >> 8 & 255, WARM[1], .3), lerp(c >> 16 & 255, WARM[2], .22));
            }
          }
        }
        this.zEdge.set(zb); this.kEdge.set(kind); this.edged = true;
      }
      const L = this.L, LM = this.LM, LR = this.LR, LD = this.LD;
      for (let i = 0; i < N; i++) {
        const l = L[i] * gain;
        if (!l) continue;
        L[i] = 0; LM[i] = 0;
        if (gOnly) continue;
        if (zb[i] > LD[i] + .12 && (kind[i] === 2 || kind[i] === 4)) continue;   // a solid drawn later sits in front
        const R = rampArr(LR[i], hue), n = R.length, ix = i % W, iy = (i / W) | 0;
        // dithered modes fade out through the Bayer pattern; flat 2D needs half a step of light before the
        // first colour, otherwise every faint tail would draw as a solid patch of the darkest level
        const lv = dith ? Math.floor(l * n + (bayerAt(ix, iy) - .5) * dith) : Math.floor(l * n - .5);
        if (lv < 0) continue;
        pix[i] = R[lv < n ? lv : n - 1];
        if (kind[i] !== 2 && kind[i] !== 4) kind[i] = 3;
      }
    }
  }

  /* ---------- drawing API handed to effects ---------- */
  class Api {
    constructor(view) { this.v = view; this.t = 0; this.mode = '25d'; }
    get W() { return this.v.W; }
    get H() { return this.v.H; }

    // ----- math helpers -----
    r(k, salt = 0) { return hash(k * 1.618 + salt * 17.13 + .5, salt * 3.7 + k * .131 + 1.3); }  // stable random in [0,1)
    noise(x, y) { return noise(x, y); }
    fbm(x, y, o) { return fbm(x, y, o); }
    clamp(v, a, b) { return clamp(v, a, b); }
    lerp(a, b, t) { return lerp(a, b, t); }
    smooth(a, b, x) { return smooth(a, b, x); }
    ease(t) { return ease(clamp(t, 0, 1)); }
    easeOut(t) { t = clamp(t, 0, 1); return 1 - (1 - t) * (1 - t); }
    easeIn(t) { t = clamp(t, 0, 1); return t * t; }
    ph(t, a, b) { return clamp((t - a) / (b - a), 0, 1); }
    // envelope: 0 before a, rises to 1 at b, holds until c, falls to 0 at d
    env(t, a, b, c, d) { return t <= a || t >= d ? 0 : t < b ? smooth(a, b, t) : t <= c ? 1 : 1 - smooth(c, d, t); }
    // snappier curves for impact and speed
    easeOutCubic(t) { t = clamp(t, 0, 1); return 1 - (1 - t) ** 3; }
    easeInCubic(t) { t = clamp(t, 0, 1); return t * t * t; }
    easeOutExpo(t) { t = clamp(t, 0, 1); return t >= 1 ? 1 : 1 - Math.pow(2, -10 * t); }
    easeInExpo(t) { t = clamp(t, 0, 1); return t <= 0 ? 0 : Math.pow(2, 10 * t - 10); }
    easeOutBack(t, s = 1.7) { t = clamp(t, 0, 1) - 1; return 1 + t * t * ((s + 1) * t + s); }      // overshoot
    easeInBack(t, s = 1.7) { t = clamp(t, 0, 1); return t * t * ((s + 1) * t - s); }               // wind-up
    spring(t, freq = 3, damp = 5) { return t <= 0 ? 0 : 1 - Math.exp(-damp * t) * Math.cos(TAU * freq * t); }
    // distance travelled by something launched at speed v0 that loses speed to drag k (per second)
    drag(v0, k, t) { return t <= 0 ? 0 : v0 * (1 - Math.exp(-k * t)) / k; }
    // effect-specific parameter (def.params[key]) as set in the site, or its default
    param(key) {
      const v = this.v.params[key];
      if (v != null) return v;
      const d = this.def && this.def.params && this.def.params[key];
      return d ? d.value : 0;
    }
    // particle-count multiplier from the shared "density" knob: Math.round(base * p.density)
    get density() { return this.v.tune.density || 1; }
    get TAU() { return TAU; }
    glowRamp(c) { return glowRamp(c); }
    solidRamp(c) { return solidRamp(c); }

    // ----- solids: write colour + depth, cast shadows, get edges/outlines -----
    ball(x, y, z, r, ramp, o = E) {
      const v = this.v;
      if (!v.P(x, y, z)) return;
      const R = rampArr(rampId(ramp), v.hue), n = R.length;
      const rp = Math.max(r * v.ps, .7), cx = v.px, cy = v.py, cd = v.pd, W = v.W, H = v.H;
      const alpha = o.alpha == null ? 1 : o.alpha, rough = o.rough || 0, lit = o.lit || 0;
      const flat = v.mode === '2d' || o.flat, dith = v.dither, off = o.seed ? (o.seed * 7) & 3 : 0;
      if (alpha <= 0) return;
      const y0 = Math.max(0, Math.floor(cy - rp)), y1 = Math.min(H - 1, Math.ceil(cy + rp));
      const x0 = Math.max(0, Math.floor(cx - rp)), x1 = Math.min(W - 1, Math.ceil(cx + rp));
      const pix = v.pix, zb = v.zb, kind = v.kind, K = alpha < 1 ? 4 : 2;   // 4 = soft solid: dithered, no edges
      let drew = false;
      for (let iy = y0; iy <= y1; iy++) for (let ix = x0; ix <= x1; ix++) {
        const dx = (ix + .5 - cx) / rp, dy = (iy + .5 - cy) / rp, nn = dx * dx + dy * dy;
        if (nn > 1) continue;
        if (alpha < 1 && bayerAt(ix + off, iy + off) >= alpha) continue;
        const nz = Math.sqrt(1 - nn), d = cd + r * nz, i = iy * W + ix;
        if (d <= zb[i]) continue;
        const wx = dx * v.rx - dy * v.ux + nz * v.fx, wy = dx * v.ry - dy * v.uy + nz * v.fy, wz = -dy * v.uz + nz * v.fz;
        let l = (wx * LX + wy * LY + wz * LZ) * .5 + .5 + lit;
        if (rough) l += (hash(ix, iy) - .5) * rough;
        const lv = Math.floor(l * n + (flat ? 0 : (bayerAt(ix, iy) - .5) * dith * .8));
        pix[i] = R[lv < 0 ? 0 : lv >= n ? n - 1 : lv]; zb[i] = d; kind[i] = K; drew = true;
      }
      if (drew && K === 2) v.anySolid = true;
      if (o.shadow !== false && alpha > .35) this.shadow(x, y, z, r * .9);
    }
    capsule(a, b, r0, r1, ramp, o = E) {
      const len = Math.hypot(b[0] - a[0], b[1] - a[1], b[2] - a[2]);
      const n = Math.max(1, Math.ceil(len / (Math.min(r0, r1) * .5)));
      for (let k = 0; k <= n; k++) {
        const t = k / n;
        this.ball(lerp(a[0], b[0], t), lerp(a[1], b[1], t), lerp(a[2], b[2], t), lerp(r0, r1, t), ramp, k % 3 === 0 ? o : Object.assign({}, o, { shadow: false }));
      }
    }
    // flat-shaded triangle; shade is 0..1 (auto from the face normal when omitted)
    tri(a, b, c, ramp, o = E) {
      const v = this.v;
      const R = rampArr(rampId(ramp), v.hue), n = R.length;
      let sh = o.shade;
      if (sh == null) {
        const ux = b[0] - a[0], uy = b[1] - a[1], uz = b[2] - a[2], wx = c[0] - a[0], wy = c[1] - a[1], wz = c[2] - a[2];
        let nx = uy * wz - uz * wy, ny = uz * wx - ux * wz, nz = ux * wy - uy * wx;
        const len = Math.hypot(nx, ny, nz) || 1;
        nx /= len; ny /= len; nz /= len;
        let vx = v.fx, vy = v.fy, vz = v.fz;
        if (v.mode === '2d') { vx = v.hx * .8; vy = v.hy * .8; vz = .6; }
        if (nx * vx + ny * vy + nz * vz < 0) { nx = -nx; ny = -ny; nz = -nz; }
        sh = (nx * LX + ny * LY + nz * LZ) * .5 + .5;
      }
      sh += o.lit || 0;
      if (!v.P(a[0], a[1], a[2])) return;
      const ax = v.px, ay = v.py, ad = v.pd;
      if (!v.P(b[0], b[1], b[2])) return;
      const bx = v.px, by = v.py, bd = v.pd;
      if (!v.P(c[0], c[1], c[2])) return;
      const cx = v.px, cy = v.py, cd = v.pd;
      const area = (bx - ax) * (cy - ay) - (by - ay) * (cx - ax);
      if (Math.abs(area) < 1e-6) return;
      const W = v.W, H = v.H, flat = v.mode === '2d' || o.flat, dith = v.dither, alpha = o.alpha == null ? 1 : o.alpha;
      const x0 = Math.max(0, Math.floor(Math.min(ax, bx, cx))), x1 = Math.min(W - 1, Math.ceil(Math.max(ax, bx, cx)));
      const y0 = Math.max(0, Math.floor(Math.min(ay, by, cy))), y1 = Math.min(H - 1, Math.ceil(Math.max(ay, by, cy)));
      const pix = v.pix, zb = v.zb, kind = v.kind, inv = 1 / area, K = alpha < 1 ? 4 : 2;
      let drew = false;
      for (let iy = y0; iy <= y1; iy++) for (let ix = x0; ix <= x1; ix++) {
        const px = ix + .5, py = iy + .5;
        const w0 = ((bx - px) * (cy - py) - (by - py) * (cx - px)) * inv;
        const w1 = ((cx - px) * (ay - py) - (cy - py) * (ax - px)) * inv;
        const w2 = 1 - w0 - w1;
        if (w0 < -1e-4 || w1 < -1e-4 || w2 < -1e-4) continue;
        if (alpha < 1 && bayerAt(ix, iy) >= alpha) continue;
        const d = w0 * ad + w1 * bd + w2 * cd, i = iy * W + ix;
        if (d <= zb[i]) continue;
        const lv = Math.floor(sh * n + (flat ? 0 : (bayerAt(ix, iy) - .5) * dith * .5));
        pix[i] = R[lv < 0 ? 0 : lv >= n ? n - 1 : lv]; zb[i] = d; kind[i] = K; drew = true;
      }
      if (drew && K === 2) v.anySolid = true;
    }
    quad(a, b, c, d, ramp, o) { this.tri(a, b, c, ramp, o); this.tri(a, c, d, ramp, o); }
    box(x0, y0, z0, x1, y1, z1, ramp, o = E) {
      const p = (x, y, z) => [x, y, z];
      const A = p(x0, y0, z0), B = p(x1, y0, z0), C = p(x1, y1, z0), D = p(x0, y1, z0);
      const A2 = p(x0, y0, z1), B2 = p(x1, y0, z1), C2 = p(x1, y1, z1), D2 = p(x0, y1, z1);
      this.quad(A2, B2, C2, D2, ramp, o); this.quad(A, B, B2, A2, ramp, o); this.quad(B, C, C2, B2, ramp, o);
      this.quad(C, D, D2, C2, ramp, o); this.quad(D, A, A2, D2, ramp, o);
      if (o.shadow !== false) {
        const cx = (x0 + x1) / 2, cy = (y0 + y1) / 2, rr = Math.max(x1 - x0, y1 - y0) * .6;
        for (let z = z0; z <= z1; z += Math.max(.2, rr * .6)) this.shadow(cx, cy, z, rr);
      }
    }
    // crystal: a bipyramid around centre c pointing along dir (normalised inside)
    shard(x, y, z, len, wid, dir, ramp, o = E) {
      let [dx, dy, dz] = dir;
      const l = Math.hypot(dx, dy, dz) || 1;
      dx /= l; dy /= l; dz /= l;
      let ex, ey, ez;
      if (Math.abs(dz) < .9) { ex = dy; ey = -dx; ez = 0; } else { ex = 0; ey = dz; ez = -dy; }
      const el = Math.hypot(ex, ey, ez) || 1;
      ex /= el; ey /= el; ez /= el;
      const fx = dy * ez - dz * ey, fy = dz * ex - dx * ez, fz = dx * ey - dy * ex;
      const back = o.back == null ? .45 : o.back, spin = o.spin || 0, sides = o.sides || 4;
      const tip = [x + dx * len * .5, y + dy * len * .5, z + dz * len * .5];
      const tail = [x - dx * len * back, y - dy * len * back, z - dz * len * back];
      const ring = [];
      for (let k = 0; k < sides; k++) {
        const a = spin + k / sides * TAU, ca = Math.cos(a) * wid * .5, sa = Math.sin(a) * wid * .5;
        ring.push([x + ex * ca + fx * sa, y + ey * ca + fy * sa, z + ez * ca + fz * sa]);
      }
      for (let k = 0; k < sides; k++) {
        const r0 = ring[k], r1 = ring[(k + 1) % sides];
        this.tri(tip, r0, r1, ramp, o);
        this.tri(tail, r1, r0, ramp, o);
      }
      if (o.shadow !== false) this.shadow(x, y, z, Math.max(wid, len * .3) * .5);
    }
    // a low-poly rock: an octahedron with jittered corners
    rock(x, y, z, r, ramp, seed = 0, o = E) {
      const j = k => .7 + this.r(seed, k) * .55;
      const ang = this.r(seed, 9) * TAU, ca = Math.cos(ang), sa = Math.sin(ang);
      const P = (px, py, pz) => [x + (px * ca - py * sa), y + (px * sa + py * ca), z + pz];
      const v = [P(r * j(1), 0, 0), P(-r * j(2), 0, 0), P(0, r * j(3), 0), P(0, -r * j(4), 0), P(0, 0, r * .8 * j(5)), P(0, 0, -r * .5 * j(6))];
      const F = [[4, 0, 2], [4, 2, 1], [4, 1, 3], [4, 3, 0], [5, 2, 0], [5, 1, 2], [5, 3, 1], [5, 0, 3]];
      for (const [a, b, c] of F) this.tri(v[a], v[b], v[c], ramp, o);
      if (o.shadow !== false) this.shadow(x, y, z, r * .85);
    }
    // ----- props for the diorama -----
    pillar(x, y, w, h, ramp = '#8e8a96', o = E) {
      if (this.v.noProps) return;
      const R = Array.isArray(ramp) ? ramp : solidRamp(ramp), hue = this.v.hue;
      this.v.hue = 0;                                    // props keep their colours when the effect's hue changes
      this.box(x - w / 2, y - w / 2, 0, x + w / 2, y + w / 2, h, R, o);
      this.v.hue = hue;
    }
    dummy(x, y, o = E) {
      if (this.v.noProps) return;
      const wood = solidRamp(o.color || '#9a6e48'), straw = solidRamp('#d8b66a'), hue = this.v.hue;
      this.v.hue = 0;
      this.capsule([x, y, 0], [x, y, 1.05], .08, .08, wood);
      this.capsule([x, y, .55], [x, y, 1.15], .3, .26, straw);
      this.capsule([x - .45, y, .95], [x + .45, y, .95], .07, .07, wood, { shadow: false });
      this.ball(x, y, 1.48, .22, straw);
      this.v.hue = hue;
    }

    // faceless caster mannequin (~1.5 tall) with keyframed poses. o.pose: a POSES name, or { a, b, k } to blend
    // two poses; o.face: facing angle (0 = +x); o.lift: hover height; o.color: body colour; o.scale; o.lean: extra
    // forward tilt; o.alpha < 1: dithered see-through body (afterimages); o.draw === false: anchors only, nothing drawn; o.blade: { len, w, ramp, dir: [f, s, z] local }
    // held in the right hand (dir defaults to the arm).
    // Returns world positions { hand, handL, elbow, head, chest, hip, foot, footL, tip, f, s } even when props are
    // hidden (sprite export), so effects can anchor to the hand or blade tip.
    figure(x, y, o = E) {
      const P0 = typeof o.pose === 'object' && o.pose ? o.pose : null;
      const A = POSES[P0 ? P0.a : o.pose] || POSES.idle, B = P0 ? POSES[P0.b] || A : A, k = P0 ? clamp(P0.k, 0, 1) : 0;
      const mix = (a, b) => (Array.isArray(a) ? a.map((v, i) => lerp(v, b[i], k)) : lerp(a, b, k));
      const q = {}; for (const key in A) q[key] = mix(A[key], B[key]);
      const face = o.face || 0, sc = o.scale || 1, lift = o.lift || 0;
      const f = [Math.cos(face), Math.sin(face), 0], s = [-Math.sin(face), Math.cos(face), 0];
      const W3 = (a, b, c) => [x + (f[0] * a + s[0] * b) * sc, y + (f[1] * a + s[1] * b) * sc, (c * sc) + lift];
      const lean = q.lean + (o.lean || 0), crouch = q.crouch;
      const hipZ = .76 * (1 - .28 * crouch), sl = Math.sin(lean), cl = Math.cos(lean);
      const hipL = [0, 0, hipZ], chestL = [sl * .4, 0, hipZ + cl * .4], headL = [sl * .62, 0, hipZ + cl * .62];
      const shR = [chestL[0], -.17, chestL[2] - .03], shL = [chestL[0], .17, chestL[2] - .03];
      const add = (a, b) => [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
      const handRL = add(shR, q.hr), handLL = add(shL, q.hl);
      // elbow / knee: midpoint pushed out so the two bones keep their length
      const joint = (a, b, len, bend) => {
        const m = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2, (a[2] + b[2]) / 2], d = Math.hypot(b[0] - a[0], b[1] - a[1], b[2] - a[2]);
        const h = Math.sqrt(Math.max(0, len * len / 4 - d * d / 4));
        return [m[0] + bend[0] * h, m[1] + bend[1] * h, m[2] + bend[2] * h];
      };
      const elR = joint(shR, handRL, .52, [-.35, -.55, -.75]), elL = joint(shL, handLL, .52, [-.35, .55, -.75]);
      const hipR = [hipL[0], -.1, hipZ], hipLL = [hipL[0], .1, hipZ];
      const knR = joint(hipR, q.fr, .8, [.9, -.1, .3]), knL = joint(hipLL, q.fl, .8, [.9, .1, .3]);
      const w = pt => W3(pt[0], pt[1], pt[2]);
      const out = { hand: w(handRL), handL: w(handLL), elbow: w(elR), head: w(headL), chest: w(chestL), hip: w(hipL), foot: w(q.fr), footL: w(q.fl), f, s, tip: null };
      if (o.blade) {
        const bl = o.blade, len = bl.len || 1.1;
        let dl = bl.dir || [handRL[0] - elR[0], handRL[1] - elR[1], handRL[2] - elR[2]];
        const dn = Math.hypot(dl[0], dl[1], dl[2]) || 1;
        const dw = [(f[0] * dl[0] + s[0] * dl[1]) / dn, (f[1] * dl[0] + s[1] * dl[1]) / dn, dl[2] / dn];
        out.tip = [out.hand[0] + dw[0] * len * sc, out.hand[1] + dw[1] * len * sc, out.hand[2] + dw[2] * len * sc];
        out.bladeDir = dw;
      }
      if (this.v.noProps || o.draw === false) return out;
      const body = o.color ? (Array.isArray(o.color) ? o.color : solidRamp(o.color)) : FIGURE_RAMP, hue = this.v.hue;
      this.v.hue = 0;
      const r = .075 * sc, al = o.alpha == null ? 1 : o.alpha, ns = { shadow: false, alpha: al }, sh = { alpha: al, shadow: al > .5 };
      this.capsule(w(hipR), w(knR), r * 1.05, r * .95, body, ns); this.capsule(w(knR), w(q.fr), r * .95, r * .8, body, sh);
      this.capsule(w(hipLL), w(knL), r * 1.05, r * .95, body, ns); this.capsule(w(knL), w(q.fl), r * .95, r * .8, body, sh);
      this.capsule(w(hipL), w(chestL), r * 1.7, r * 1.9, body, sh);
      this.capsule(w(shR), w(elR), r * .9, r * .8, body, ns); this.capsule(w(elR), w(handRL), r * .8, r * .75, body, ns);
      this.capsule(w(shL), w(elL), r * .9, r * .8, body, ns); this.capsule(w(elL), w(handLL), r * .8, r * .75, body, ns);
      this.ball(...out.head, .13 * sc, body, { lit: .08, alpha: al, shadow: al > .5 });
      if (o.blade && out.tip) {
        const bl = o.blade, ramp = bl.ramp || BLADE_RAMP, bw = (bl.w || .09) * sc, c = this.cam();
        const d = out.bladeDir, px = [d[1] * c.fwd[2] - d[2] * c.fwd[1], d[2] * c.fwd[0] - d[0] * c.fwd[2], d[0] * c.fwd[1] - d[1] * c.fwd[0]];
        const pl = Math.hypot(px[0], px[1], px[2]) || 1, hw = [px[0] / pl * bw / 2, px[1] / pl * bw / 2, px[2] / pl * bw / 2];
        const h = out.hand, t2 = out.tip;
        this.quad([h[0] - hw[0], h[1] - hw[1], h[2] - hw[2]], [h[0] + hw[0], h[1] + hw[1], h[2] + hw[2]], [t2[0], t2[1], t2[2]], [t2[0], t2[1], t2[2]], ramp, { shade: .8 });
      }
      this.v.hue = hue;
      return out;
    }
    // camera axes in world space: right, up (screen) and fwd (towards the viewer). 2D: right = +x, up = +z
    cam() {
      const v = this.v;
      if (v.mode === '2d') return { right: [v.rx, v.ry, 0], up: [0, 0, 1], fwd: [v.hx, v.hy, 0] };
      return { right: [v.rx, v.ry, 0], up: [v.ux, v.uy, v.uz], fwd: [v.fx, v.fy, v.fz] };
    }
    // camera-facing SOLID sprite: fn(u, v) (u, v in -1..1, v up) returns a level 0..1 picking the ramp step,
    // or a negative value / null for no pixel. Writes depth, gets edges / 2D outline like other solids.
    // o.dz: depth bias towards the viewer, o.alpha < 1: soft solid, o.shadow: blob shadow under it
    scard(x, y, z, w, h, fn, ramp, o = E) {
      const v = this.v;
      if (!v.P(x, y, z)) return;
      const R = rampArr(rampId(ramp), v.hue), n = R.length;
      const cx = v.px, cy = v.py, cd = v.pd + (o.dz || 0), hw = Math.max(w * .5 * v.ps, .5), hh = Math.max(h * .5 * v.ps, .5);
      const W = v.W, H = v.H, zb = v.zb, pix = v.pix, kind = v.kind, alpha = o.alpha == null ? 1 : o.alpha, K = alpha < 1 ? 4 : 2;
      const x0 = Math.max(0, Math.floor(cx - hw)), x1 = Math.min(W - 1, Math.ceil(cx + hw));
      const y0 = Math.max(0, Math.floor(cy - hh)), y1 = Math.min(H - 1, Math.ceil(cy + hh));
      let drew = false;
      for (let iy = y0; iy <= y1; iy++) for (let ix = x0; ix <= x1; ix++) {
        const u = (ix + .5 - cx) / hw, vv = (cy - iy - .5) / hh;
        if (u < -1 || u > 1 || vv < -1 || vv > 1) continue;
        if (alpha < 1 && bayerAt(ix, iy) >= alpha) continue;
        const i = iy * W + ix;
        if (zb[i] > cd) continue;
        const l = fn(u, vv);
        if (l == null || l < 0) continue;
        const lv = Math.floor(l * n);
        pix[i] = R[lv < 0 ? 0 : lv >= n ? n - 1 : lv]; zb[i] = cd; kind[i] = K; drew = true;
      }
      if (drew && K === 2) v.anySolid = true;
      if (o.shadow) this.shadow(x, y, Math.max(0, z - h * .5), Math.min(w, h) * .4);
    }
    // SOLID strip between two point lists (like ribbon, but opaque): fn(u, v) -> level 0..1 or negative = hole
    sribbon(left, right, fn, ramp, o = E) {
      const n = left.length - 1;
      for (let k = 0; k < n; k++) {
        const u0 = k / n, u1 = (k + 1) / n;
        this._stri(left[k], left[k + 1], right[k + 1], [u0, 0], [u1, 0], [u1, 1], fn, ramp, o);
        this._stri(left[k], right[k + 1], right[k], [u0, 0], [u1, 1], [u0, 1], fn, ramp, o);
      }
    }
    _stri(a, b, c, ta, tb, tc, fn, ramp, o) {
      const v = this.v;
      if (!v.P(a[0], a[1], a[2])) return;
      const ax = v.px, ay = v.py, ad = v.pd;
      if (!v.P(b[0], b[1], b[2])) return;
      const bx = v.px, by = v.py, bd = v.pd;
      if (!v.P(c[0], c[1], c[2])) return;
      const cx = v.px, cy = v.py, cd = v.pd;
      const area = (bx - ax) * (cy - ay) - (by - ay) * (cx - ax);
      if (Math.abs(area) < 1e-6) return;
      const R = rampArr(rampId(ramp), v.hue), n = R.length, alpha = o.alpha == null ? 1 : o.alpha, K = alpha < 1 ? 4 : 2;
      const W = v.W, H = v.H, zb = v.zb, pix = v.pix, kind = v.kind, inv = 1 / area, dz = o.dz || 0;
      const x0 = Math.max(0, Math.floor(Math.min(ax, bx, cx))), x1 = Math.min(W - 1, Math.ceil(Math.max(ax, bx, cx)));
      const y0 = Math.max(0, Math.floor(Math.min(ay, by, cy))), y1 = Math.min(H - 1, Math.ceil(Math.max(ay, by, cy)));
      let drew = false;
      for (let iy = y0; iy <= y1; iy++) for (let ix = x0; ix <= x1; ix++) {
        const px = ix + .5, py = iy + .5;
        const w0 = ((bx - px) * (cy - py) - (by - py) * (cx - px)) * inv;
        const w1 = ((cx - px) * (ay - py) - (cy - py) * (ax - px)) * inv;
        const w2 = 1 - w0 - w1;
        if (w0 < -1e-4 || w1 < -1e-4 || w2 < -1e-4) continue;
        if (alpha < 1 && bayerAt(ix, iy) >= alpha) continue;
        const d = w0 * ad + w1 * bd + w2 * cd + dz, i = iy * W + ix;
        if (d <= zb[i]) continue;
        const l = fn(w0 * ta[0] + w1 * tb[0] + w2 * tc[0], w0 * ta[1] + w1 * tb[1] + w2 * tc[1]);
        if (l == null || l < 0) continue;
        const lv = Math.floor(l * n);
        pix[i] = R[lv < 0 ? 0 : lv >= n ? n - 1 : lv]; zb[i] = d; kind[i] = K; drew = true;
      }
      if (drew && K === 2) v.anySolid = true;
    }
    // stain the uncovered ground right away (scorch, frost, ink, char): fn(x, y, rho, angle) -> 0..1 strength,
    // mixed towards color in three dithered steps. Coordinates are local to (x, y); rho in world units
    stain(x, y, R, fn, color, amt = 1) {
      const v = this.v;
      if (amt <= 0) return;
      const W = v.W, H = v.H, c = hex(color), fs = v.fs, dith = v.dither;
      let x0 = 1e9, x1 = -1e9, y0 = 1e9, y1 = -1e9;
      for (let k = 0; k < 12; k++) {
        const a = k / 12 * TAU;
        if (!v.P(x + Math.cos(a) * R * 1.05, y + Math.sin(a) * R * 1.05, 0)) continue;
        x0 = Math.min(x0, v.px); x1 = Math.max(x1, v.px); y0 = Math.min(y0, v.py); y1 = Math.max(y1, v.py);
      }
      if (x0 > x1) return;
      x0 = Math.max(0, Math.floor(x0)); x1 = Math.min(W - 1, Math.ceil(x1));
      y0 = Math.max(0, Math.floor(y0)); y1 = Math.min(H - 1, Math.ceil(y1));
      for (let iy = y0; iy <= y1; iy++) for (let ix = x0; ix <= x1; ix++) {
        const i = iy * W + ix;
        if (!v.ghit[i] || v.kind[i] !== 1) continue;
        const dx = v.gx[i] / fs - x, dy = v.gy[i] / fs - y, rho = Math.hypot(dx, dy);
        if (rho >= R) continue;
        const q = fn(dx, dy, rho, Math.atan2(dy, dx)) * amt + (dith ? (bayerAt(ix, iy) - .5) * .3 : 0);
        const m = q < .14 ? 0 : q < .4 ? .3 : q < .7 ? .58 : .85;
        if (!m) continue;
        const p0 = v.pix[i];
        v.pix[i] = rgb(lerp(p0 & 255, c[0], m), lerp(p0 >> 8 & 255, c[1], m), lerp(p0 >> 16 & 255, c[2], m));
      }
    }
    // shadow blob on the ground under a point, offset along the light like pixel-plays
    shadow(x, y, z, r, strength = 1) {
      const v = this.v;
      if (z < -.05) return;
      const sx = x + SHADOW_X * Math.max(0, z), sy = y + SHADOW_Y * Math.max(0, z);
      if (!v.P(sx, sy, 0)) return;
      const rp = r * v.ps * 1.3 + 2, cx = v.px, cy = v.py, W = v.W, H = v.H;
      const y0 = Math.max(0, Math.floor(cy - rp)), y1 = Math.min(H - 1, Math.ceil(cy + rp));
      const x0 = Math.max(0, Math.floor(cx - rp)), x1 = Math.min(W - 1, Math.ceil(cx + rp));
      const r2 = r * r, fs = v.fs;
      for (let iy = y0; iy <= y1; iy++) for (let ix = x0; ix <= x1; ix++) {
        const i = iy * W + ix;
        if (!v.ghit[i]) continue;
        const dx = v.gx[i] / fs - sx, dy = v.gy[i] / fs - sy;
        if ((dx * dx + dy * dy) / r2 + (bayerAt(ix, iy) - .5) * .35 > 1) continue;
        if (v.shadow[i] < strength) v.shadow[i] = strength;
      }
    }

    // ----- emissive light: accumulated, then resolved through the ramp with the Bayer dither -----
    _put(i, val, rid, d, add) {
      const v = this.v;
      if (add) v.L[i] += val; else if (val > v.L[i]) v.L[i] = val;
      if (val > v.LM[i]) { v.LM[i] = val; v.LR[i] = rid; v.LD[i] = d; }
    }
    // soft radial glow, additive. o.pow shapes the falloff (higher = tighter core)
    glow(x, y, z, r, ramp, I = 1, o = E) {
      const v = this.v;
      if (I <= 0 || !v.P(x, y, z)) return;
      const rid = rampId(ramp), rp = r * v.ps, cx = v.px, cy = v.py, cd = v.pd, W = v.W, H = v.H;
      if (rp < .8) { this.dot(x, y, z, rid, I); return; }
      const pow = o.pow || 2, add = o.add !== false, flatten = o.flatten || 1;
      const y0 = Math.max(0, Math.floor(cy - rp * flatten)), y1 = Math.min(H - 1, Math.ceil(cy + rp * flatten));
      const x0 = Math.max(0, Math.floor(cx - rp)), x1 = Math.min(W - 1, Math.ceil(cx + rp));
      const zb = v.zb;
      for (let iy = y0; iy <= y1; iy++) for (let ix = x0; ix <= x1; ix++) {
        const dx = (ix + .5 - cx) / rp, dy = (iy + .5 - cy) / (rp * flatten), q = dx * dx + dy * dy;
        if (q >= 1) continue;
        const i = iy * W + ix, front = cd + r * Math.sqrt(1 - q);
        if (zb[i] > front + .05) continue;
        let f = 1 - q;
        f = pow === 2 ? f * f : pow === 1 ? f : Math.pow(f, pow);
        this._put(i, I * f, rid, cd, add);
      }
    }
    // hard-edged emissive ball: full intensity inside, with a short dithered rim
    orb(x, y, z, r, ramp, I = 1) { this.glow(x, y, z, r, ramp, I * 1.6, { pow: .45 }); }
    // a single pixel (or size x size block) of light
    dot(x, y, z, ramp, I = 1, size = 1) {
      const v = this.v;
      if (I <= 0 || !v.P(x, y, z)) return;
      const rid = rampId(ramp), ix0 = Math.floor(v.px - (size - 1) / 2), iy0 = Math.floor(v.py - (size - 1) / 2), d = v.pd;
      for (let yy = 0; yy < size; yy++) for (let xx = 0; xx < size; xx++) {
        const ix = ix0 + xx, iy = iy0 + yy;
        if (ix < 0 || iy < 0 || ix >= v.W || iy >= v.H) continue;
        const i = iy * v.W + ix;
        if (v.zb[i] > d + .05) continue;
        this._put(i, I, rid, d, false);
      }
    }
    // four-point pixel sparkle, arm = length in pixels
    sparkle(x, y, z, arm, ramp, I = 1) {
      const v = this.v;
      if (I <= 0 || !v.P(x, y, z)) return;
      const rid = rampId(ramp), cx = Math.floor(v.px), cy = Math.floor(v.py), d = v.pd;
      const put = (ix, iy, val) => {
        if (ix < 0 || iy < 0 || ix >= v.W || iy >= v.H) return;
        const i = iy * v.W + ix;
        if (v.zb[i] > d + .05) return;
        this._put(i, val, rid, d, false);
      };
      put(cx, cy, I);
      const a = Math.max(0, Math.round(arm));
      for (let k = 1; k <= a; k++) {
        const f = I * (1 - k / (a + 1)) * .9;
        put(cx + k, cy, f); put(cx - k, cy, f); put(cx, cy + k, f); put(cx, cy - k, f);
      }
    }
    // tapered emissive segment from a to b. o.w1 end width, o.i1 end intensity, o.pow profile, o.add
    line(a, b, w, ramp, I = 1, o = E) {
      const v = this.v;
      if (I <= 0 && !(o.i1 > 0)) return;
      if (!v.P(a[0], a[1], a[2])) return;
      const ax = v.px, ay = v.py, ad = v.pd, as = v.ps;
      if (!v.P(b[0], b[1], b[2])) return;
      const bx = v.px, by = v.py, bd = v.pd, bs = v.ps;
      const rid = rampId(ramp), w1 = o.w1 == null ? w : o.w1, I1 = o.i1 == null ? I : o.i1;
      const ha = Math.max(w * as * .5, .72), hb = Math.max(w1 * bs * .5, .72), pow = o.pow || 1.5, add = !!o.add;
      const W = v.W, H = v.H, hm = Math.max(ha, hb);
      const x0 = Math.max(0, Math.floor(Math.min(ax, bx) - hm)), x1 = Math.min(W - 1, Math.ceil(Math.max(ax, bx) + hm));
      const y0 = Math.max(0, Math.floor(Math.min(ay, by) - hm)), y1 = Math.min(H - 1, Math.ceil(Math.max(ay, by) + hm));
      const dx = bx - ax, dy = by - ay, L2 = dx * dx + dy * dy || 1e-6, zb = v.zb;
      for (let iy = y0; iy <= y1; iy++) for (let ix = x0; ix <= x1; ix++) {
        const px = ix + .5 - ax, py = iy + .5 - ay;
        const s = clamp((px * dx + py * dy) / L2, 0, 1);
        const ex = px - dx * s, ey = py - dy * s, dist = Math.sqrt(ex * ex + ey * ey), hw = ha + (hb - ha) * s;
        if (dist > hw) continue;
        const i = iy * W + ix, d = ad + (bd - ad) * s;
        if (zb[i] > d + .05) continue;
        let f = hw < 1.3 ? 1 - .45 * dist / hw : 1 - (dist / hw) * (dist / hw);
        if (pow !== 1 && hw >= 1.3) f = Math.pow(f, pow);
        const val = (I + (I1 - I) * s) * f;
        if (val > 0) this._put(i, val, rid, d, add);
      }
    }
    // polyline with width/intensity interpolated from start to end
    trail(pts, w0, w1, ramp, I0 = 1, I1 = 0, o = E) {
      const n = pts.length - 1;
      for (let k = 0; k < n; k++) {
        const t0 = k / n, t1 = (k + 1) / n;
        this.line(pts[k], pts[k + 1], lerp(w0, w1, t0), ramp, lerp(I0, I1, t0), Object.assign({}, o, { w1: lerp(w0, w1, t1), i1: lerp(I0, I1, t1) }));
      }
    }
    // circle (or arc) of light. o.axis: normal vector (default [0,0,1] = flat on the ground)
    // o.a0/o.a1 arc range in radians, o.fn(angle, u) multiplies intensity along the arc (u = 0..1)
    ring(cx, cy, cz, r, w, ramp, I = 1, o = E) {
      const v = this.v;
      if (I <= 0 || r <= 0 || !v.P(cx, cy, cz)) return;
      const [e1, e2] = basis(o.axis || [0, 0, 1]);
      const a0 = o.a0 || 0, a1 = o.a1 == null ? TAU : o.a1, span = Math.abs(a1 - a0);
      const segs = clamp(Math.ceil(r * v.ps * span / 2.5), 6, 220);
      let prev = null, prevI = 0;
      for (let k = 0; k <= segs; k++) {
        const u = k / segs, a = a0 + (a1 - a0) * u, ca = Math.cos(a) * r, sa = Math.sin(a) * r;
        const p = [cx + e1[0] * ca + e2[0] * sa, cy + e1[1] * ca + e2[1] * sa, cz + e1[2] * ca + e2[2] * sa];
        const ii = o.fn ? I * o.fn(a, u) : I;
        if (prev && (ii > 0 || prevI > 0)) this.line(prev, p, w, ramp, prevI, { i1: ii, w1: w, pow: o.pow, add: o.add });
        prev = p; prevI = ii;
      }
    }
    // jagged lightning from a to b. Returns the main path points.
    // o: seed, jag (offset as a fraction of length), depth (subdivisions), branches, w, I, glow (halo intensity)
    bolt(a, b, ramp, o = E) {
      const seed = o.seed || 0, jag = o.jag == null ? .18 : o.jag, depth = o.depth || 5;
      let pts = [a.slice(), b.slice()];
      const len = Math.hypot(b[0] - a[0], b[1] - a[1], b[2] - a[2]);
      const dir = [(b[0] - a[0]) / len, (b[1] - a[1]) / len, (b[2] - a[2]) / len];
      const [e1, e2] = basis(dir);
      let amp = len * jag;
      for (let d = 0; d < depth; d++) {
        const next = [pts[0]];
        for (let k = 0; k < pts.length - 1; k++) {
          const p = pts[k], q = pts[k + 1], h1 = this.r(seed * 31 + d * 7 + k, 1) - .5, h2 = this.r(seed * 31 + d * 7 + k, 2) - .5;
          next.push([(p[0] + q[0]) / 2 + (e1[0] * h1 + e2[0] * h2) * amp, (p[1] + q[1]) / 2 + (e1[1] * h1 + e2[1] * h2) * amp, (p[2] + q[2]) / 2 + (e1[2] * h1 + e2[2] * h2) * amp], q);
        }
        pts = next; amp *= .52;
      }
      const w = o.w == null ? .06 : o.w, I = o.I == null ? 1 : o.I, halo = o.glow == null ? .35 : o.glow;
      if (halo > 0) for (let k = 0; k < pts.length - 1; k++) this.line(pts[k], pts[k + 1], w * 4, ramp, I * halo, { pow: 2 });
      for (let k = 0; k < pts.length - 1; k++) this.line(pts[k], pts[k + 1], w, ramp, I);
      const nb = o.branches || 0;
      for (let k = 0; k < nb; k++) {
        const from = pts[Math.floor((.15 + this.r(seed + k, 5) * .7) * (pts.length - 1))];
        const bl = len * (.18 + this.r(seed + k, 6) * .25), side = this.r(seed + k, 7) * TAU;
        const to = [from[0] + (dir[0] * .6 + (e1[0] * Math.cos(side) + e2[0] * Math.sin(side))) * bl,
          from[1] + (dir[1] * .6 + (e1[1] * Math.cos(side) + e2[1] * Math.sin(side))) * bl,
          from[2] + (dir[2] * .6 + (e1[2] * Math.cos(side) + e2[2] * Math.sin(side))) * bl];
        this.bolt(from, to, ramp, { seed: seed * 7 + k + 101, jag: jag * 1.2, depth: Math.max(2, depth - 2), w: w * .6, I: I * .75, glow: halo * .6 });
      }
      return pts;
    }
    // emissive pattern painted on a horizontal plane (z = cz) within radius R.
    // fn(x, y, rho, angle) returns intensity (0 = nothing), coordinates are local to (cx, cy)
    decal(cx, cy, cz, R, fn, ramp, I = 1, o = E) {
      const v = this.v;
      if (I <= 0) return;
      const rid = rampId(ramp), W = v.W, H = v.H;
      let x0 = 1e9, x1 = -1e9, y0 = 1e9, y1 = -1e9;
      for (let k = 0; k < 16; k++) {
        const a = k / 16 * TAU;
        if (!v.P(cx + Math.cos(a) * R * 1.05, cy + Math.sin(a) * R * 1.05, cz)) continue;
        x0 = Math.min(x0, v.px); x1 = Math.max(x1, v.px); y0 = Math.min(y0, v.py); y1 = Math.max(y1, v.py);
      }
      if (x0 > x1) return;
      x0 = Math.max(0, Math.floor(x0)); x1 = Math.min(W - 1, Math.ceil(x1));
      y0 = Math.max(0, Math.floor(y0)); y1 = Math.min(H - 1, Math.ceil(y1));
      const onGround = Math.abs(cz) < 1e-6, R2 = R * R, zb = v.zb, add = !!o.add, fs = v.fs;
      // ground decals stay on the island: pixels where the stage has no ground (the page) are skipped, unless the
      // stage has no ground at all or the frame is a transparent export (o.offIsland: true paints everywhere)
      const st = this.def && this.def.stage, clip = !o.offIsland && !v.transparent && !(st && st.ground === 'none');
      for (let iy = y0; iy <= y1; iy++) for (let ix = x0; ix <= x1; ix++) {
        const i = iy * W + ix;
        let gx, gy, gd;
        if (onGround) { if (!v.ghit[i] || (clip && v.baseKind[i] === 0)) continue; gx = v.gx[i] / fs; gy = v.gy[i] / fs; gd = v.gd[i]; }
        else { if (!v.Q(ix + .5, iy + .5, cz * fs)) continue; gx = v.qx / fs; gy = v.qy / fs; gd = v.qd; }
        const x = gx - cx, y = gy - cy, q = x * x + y * y;
        if (q > R2) continue;
        if (zb[i] > gd + .06) continue;
        const val = fn(x, y, Math.sqrt(q), Math.atan2(y, x));
        if (val > .004) this._put(i, val * I, rid, gd + .02, add);
      }
    }
    // camera-facing rectangle of light centred at (x, y, z), w x h world units.
    // fn(u, v) with u in [-1, 1] left to right and v in [-1, 1] bottom to top returns intensity
    card(x, y, z, w, h, fn, ramp, I = 1, o = E) {
      const v = this.v;
      if (I <= 0 || !v.P(x, y, z)) return;
      const rid = rampId(ramp), cx = v.px, cy = v.py, cd = v.pd, hw = Math.max(w * .5 * v.ps, .5), hh = Math.max(h * .5 * v.ps, .5);
      const W = v.W, H = v.H, zb = v.zb, add = !!o.add;
      const x0 = Math.max(0, Math.floor(cx - hw)), x1 = Math.min(W - 1, Math.ceil(cx + hw));
      const y0 = Math.max(0, Math.floor(cy - hh)), y1 = Math.min(H - 1, Math.ceil(cy + hh));
      for (let iy = y0; iy <= y1; iy++) for (let ix = x0; ix <= x1; ix++) {
        const u = (ix + .5 - cx) / hw, vv = (cy - iy - .5) / hh;
        if (u < -1 || u > 1 || vv < -1 || vv > 1) continue;
        const i = iy * W + ix;
        if (zb[i] > cd + .05) continue;
        const val = fn(u, vv);
        if (val > .004) this._put(i, val * I, rid, cd, add);
      }
    }
    // sphere surface of light (shields, domes, orbs with patterns).
    // fn(nx, ny, nz, rim, front) gets the world-space normal; rim = 1 at the silhouette.
    // o.back multiplies the far side (default .35), o.zmin hides normals below it (domes: 0)
    shell(cx, cy, cz, r, fn, ramp, I = 1, o = E) {
      const v = this.v;
      if (I <= 0 || !v.P(cx, cy, cz)) return;
      const rid = rampId(ramp), px = v.px, py = v.py, pd = v.pd, rp = r * v.ps, W = v.W, H = v.H, zb = v.zb;
      const back = o.back == null ? .35 : o.back, zmin = o.zmin == null ? -2 : o.zmin, add = !!o.add;
      const y0 = Math.max(0, Math.floor(py - rp)), y1 = Math.min(H - 1, Math.ceil(py + rp));
      const x0 = Math.max(0, Math.floor(px - rp)), x1 = Math.min(W - 1, Math.ceil(px + rp));
      for (let iy = y0; iy <= y1; iy++) for (let ix = x0; ix <= x1; ix++) {
        const dx = (ix + .5 - px) / rp, dy = (iy + .5 - py) / rp, q = dx * dx + dy * dy;
        if (q >= 1) continue;
        const nz = Math.sqrt(1 - q), i = iy * W + ix, rim = 1 - nz;
        const sx = dx * v.rx - dy * v.ux, sy = dx * v.ry - dy * v.uy, sz = -dy * v.uz;
        // front surface
        let wx = sx + nz * v.fx, wy = sy + nz * v.fy, wz = sz + nz * v.fz;
        if (wz >= zmin && zb[i] <= pd + r * nz + .05) {
          const val = fn(wx, wy, wz, rim, true);
          if (val > .004) this._put(i, val * I, rid, pd + r * nz, add);
        }
        if (back > 0) {
          wx = sx - nz * v.fx; wy = sy - nz * v.fy; wz = sz - nz * v.fz;
          if (wz >= zmin && zb[i] <= pd - r * nz + .05) {
            const val = fn(wx, wy, wz, rim, false) * back;
            if (val > .004) this._put(i, val * I, rid, pd - r * nz, add);
          }
        }
      }
    }
    // emissive quad a-b-c-d (any orientation). fn(u, v) gives intensity, u runs a->b, v runs a->d.
    // o.add accumulates instead of taking the max
    lquad(a, b, c, d, fn, ramp, I = 1, o = E) {
      if (I <= 0) return;
      const rid = rampId(ramp);
      this._ltri(a, b, c, [0, 0], [1, 0], [1, 1], fn, rid, I, o);
      this._ltri(a, c, d, [0, 0], [1, 1], [0, 1], fn, rid, I, o);
    }
    // emissive strip between two point lists of equal length. fn(u, v): u along the strip 0..1, v across 0..1
    ribbon(left, right, fn, ramp, I = 1, o = E) {
      if (I <= 0) return;
      const rid = rampId(ramp), n = left.length - 1;
      for (let k = 0; k < n; k++) {
        const u0 = k / n, u1 = (k + 1) / n;
        this._ltri(left[k], left[k + 1], right[k + 1], [u0, 0], [u1, 0], [u1, 1], fn, rid, I, o);
        this._ltri(left[k], right[k + 1], right[k], [u0, 0], [u1, 1], [u0, 1], fn, rid, I, o);
      }
    }
    _ltri(a, b, c, ta, tb, tc, fn, rid, I, o) {
      const v = this.v;
      if (!v.P(a[0], a[1], a[2])) return;
      const ax = v.px, ay = v.py, ad = v.pd;
      if (!v.P(b[0], b[1], b[2])) return;
      const bx = v.px, by = v.py, bd = v.pd;
      if (!v.P(c[0], c[1], c[2])) return;
      const cx = v.px, cy = v.py, cd = v.pd;
      const area = (bx - ax) * (cy - ay) - (by - ay) * (cx - ax);
      if (Math.abs(area) < 1e-6) return;
      const W = v.W, H = v.H, zb = v.zb, inv = 1 / area, add = !!o.add;
      const x0 = Math.max(0, Math.floor(Math.min(ax, bx, cx))), x1 = Math.min(W - 1, Math.ceil(Math.max(ax, bx, cx)));
      const y0 = Math.max(0, Math.floor(Math.min(ay, by, cy))), y1 = Math.min(H - 1, Math.ceil(Math.max(ay, by, cy)));
      for (let iy = y0; iy <= y1; iy++) for (let ix = x0; ix <= x1; ix++) {
        const px = ix + .5, py = iy + .5;
        const w0 = ((bx - px) * (cy - py) - (by - py) * (cx - px)) * inv;
        const w1 = ((cx - px) * (ay - py) - (cy - py) * (ax - px)) * inv;
        const w2 = 1 - w0 - w1;
        if (w0 < -1e-4 || w1 < -1e-4 || w2 < -1e-4) continue;
        const d = w0 * ad + w1 * bd + w2 * cd, i = iy * W + ix;
        if (zb[i] > d + .05) continue;
        const val = fn(w0 * ta[0] + w1 * tb[0] + w2 * tc[0], w0 * ta[1] + w1 * tb[1] + w2 * tc[1]);
        if (val > .004) this._put(i, val * I, rid, d, add);
      }
    }
    // light pool on the ground: tints uncovered ground pixels within radius r around (x, y)
    light(x, y, z, r, ramp, I = 1) {
      const v = this.v;
      if (I <= 0) return;
      I /= 1 + Math.max(0, z) * .3;
      const rid = rampId(ramp), W = v.W, H = v.H;
      let x0 = 1e9, x1 = -1e9, y0 = 1e9, y1 = -1e9;
      for (let k = 0; k < 12; k++) {
        const a = k / 12 * TAU;
        if (!v.P(x + Math.cos(a) * r, y + Math.sin(a) * r, 0)) continue;
        x0 = Math.min(x0, v.px); x1 = Math.max(x1, v.px); y0 = Math.min(y0, v.py); y1 = Math.max(y1, v.py);
      }
      if (x0 > x1) return;
      x0 = Math.max(0, Math.floor(x0)); x1 = Math.min(W - 1, Math.ceil(x1));
      y0 = Math.max(0, Math.floor(y0)); y1 = Math.min(H - 1, Math.ceil(y1));
      const r2 = r * r, fs = v.fs;
      for (let iy = y0; iy <= y1; iy++) for (let ix = x0; ix <= x1; ix++) {
        const i = iy * W + ix;
        if (!v.ghit[i]) continue;
        const dx = v.gx[i] / fs - x, dy = v.gy[i] / fs - y, q = (dx * dx + dy * dy) / r2;
        if (q >= 1) continue;
        const val = I * (1 - q) * (1 - q);
        if (val > v.GL[i]) { v.GL[i] = val; v.GLR[i] = rid; }
      }
    }

    // ----- screen operations (resolve everything drawn so far first) -----
    flush() { this.v.flush(); }
    // displace pixels inside a screen circle around a world point. fn(dx, dy, rho) gets coordinates in
    // units of the radius and returns [ox, oy], the offset to sample from (same units)
    warp(x, y, z, R, fn) {
      const v = this.v;
      v.flush();
      if (!v.P(x, y, z)) return;
      const rp = R * v.ps, cx = v.px, cy = v.py, W = v.W, H = v.H, pix = v.pix, tmp = v.tmp;
      tmp.set(pix);
      const y0 = Math.max(0, Math.floor(cy - rp)), y1 = Math.min(H - 1, Math.ceil(cy + rp));
      const x0 = Math.max(0, Math.floor(cx - rp)), x1 = Math.min(W - 1, Math.ceil(cx + rp));
      for (let iy = y0; iy <= y1; iy++) for (let ix = x0; ix <= x1; ix++) {
        const dx = (ix + .5 - cx) / rp, dy = (iy + .5 - cy) / rp, q = dx * dx + dy * dy;
        if (q >= 1) continue;
        const off = fn(dx, dy, Math.sqrt(q));
        if (!off) continue;
        const sx = clamp(Math.round(ix + off[0] * rp), 0, W - 1), sy = clamp(Math.round(iy + off[1] * rp), 0, H - 1);
        pix[iy * W + ix] = tmp[sy * W + sx];
      }
    }
    // ordered-dither flash of the whole frame towards a colour (amount 0..1)
    flash(color, amount) {
      const v = this.v;
      if (amount <= 0) return;
      v.flush();
      const c = hex(color), col = rgb(c[0], c[1], c[2]), W = v.W, H = v.H;
      for (let iy = 0; iy < H; iy++) for (let ix = 0; ix < W; ix++) if (bayerAt(ix, iy) < amount) v.pix[iy * W + ix] = col;
    }
    // custom full-frame pass: fn({ pix, W, H, kind, zb, bayer, rgb, hex, P, Q, night, mode }) after resolving the frame
    post(fn) {
      const v = this.v;
      v.flush();
      fn({ pix: v.pix, W: v.W, H: v.H, kind: v.kind, zb: v.zb, bayer: bayerAt, rgb, hex, P: (x, y, z) => (v.P(x, y, z) ? [v.px, v.py, v.pd, v.ps] : null),
        // inverse: the world point at height h under screen pixel (sx, sy), in the same (scaled) units P takes
        Q: (sx, sy, h = 0) => (v.Q(sx, sy, h * v.fs) ? [v.qx / v.fs, v.qy / v.fs, v.qd] : null), night: v.night, mode: v.mode });
    }
    // scale everything drawn after this call (in this frame) by k about the origin, on top of the size knob:
    // camera zoom-outs and growing worlds. The baked ground does not scale (use stage ground 'none' and draw your own).
    worldScale(k) { const v = this.v; v.fs = (v.tune.size || 1) * k; }
    // guide overlay: register a path (array of [x, y, z] or an object with .pts) to be drawn as a 1 px line in a
    // guide colour when the guide toggle is on; o.marks: world points drawn as white square markers (the moving
    // markers of a timing test). Free when the toggle is off: check p.guiding before building expensive paths.
    get guiding() { return !!this.v.guideMode; }
    guide(path, color = 'red', o = E) {
      const v = this.v;
      if (!v.guideMode) return;
      const src = Array.isArray(path) ? path : path && path.pts ? path.pts : [];
      const pts = src.map(q => (v.P(q[0], q[1], q[2]) ? [v.px, v.py, v.pd] : null));
      const marks = (o.marks || []).map(q => (v.P(q[0], q[1], q[2]) ? [v.px, v.py] : null)).filter(Boolean);
      const c = hex(GUIDE_COLORS[color] || color);
      v.guides.push({ pts, marks, col: rgb(c[0], c[1], c[2]) });
    }
    // colour-grade everything drawn so far (environment darkening, desaturation, tinted domains).
    // o: { dark 0..1, desat 0..1, tint '#hex', tintAmt 0..1, bg 0..1 (how much of the page background is graded,
    // default 0), light (also grade resolved emissive pixels, default false) }. Draw the scene, grade it, then draw
    // the effect's light on top so the move stays bright while the world goes dark / white / red.
    grade(o = E) {
      const v = this.v;
      const dark = o.dark || 0, desat = o.desat || 0, ta = o.tint ? (o.tintAmt == null ? .5 : o.tintAmt) : 0, bgA = o.bg || 0;
      if (!dark && !desat && !ta) return;
      v.flush();
      const tc = o.tint ? hex(o.tint) : [0, 0, 0], pix = v.pix, kind = v.kind, N = v.W * v.H, light = !!o.light;
      const memo = new Map();
      const map = c => {
        let r = c & 255, g = c >> 8 & 255, b = c >> 16 & 255;
        const y = r * .3 + g * .59 + b * .11;
        if (desat) { r = lerp(r, y, desat); g = lerp(g, y, desat); b = lerp(b, y, desat); }
        if (ta) { const yy = (r * .3 + g * .59 + b * .11) / 255; r = lerp(r, tc[0] * yy * 1.2, ta); g = lerp(g, tc[1] * yy * 1.2, ta); b = lerp(b, tc[2] * yy * 1.2, ta); }
        if (dark) { r *= 1 - dark; g *= 1 - dark; b *= 1 - dark * .85; }
        return rgb(r, g, b);
      };
      for (let i = 0; i < N; i++) {
        const k = kind[i];
        if (k === 3 && !light) continue;
        const c = pix[i];
        if (!(c >>> 24)) continue;                       // transparent export background stays transparent
        let m = memo.get(c);
        if (m === undefined) { m = map(c); memo.set(c, m); }
        if (k === 0) { if (bgA <= 0) continue; if (bgA < 1) { const iy = (i / v.W) | 0; if (bayerAt(i - iy * v.W, iy) >= bgA) continue; } }
        pix[i] = m;
      }
    }
    // project a world point for custom work: [sx, sy, depth, pixelsPerUnit] or null
    project(x, y, z) { const v = this.v; return v.P(x, y, z) ? [v.px, v.py, v.pd, v.ps] : null; }

    // ----- pattern helpers for decals / cards / shells (all return 0..1) -----
    band(x, c, w) { const d = Math.abs(x - c); return d >= w ? 0 : 1 - d / w; }
    hard(x, c, w) { return Math.abs(x - c) <= w ? 1 : 0; }
    sdSeg(px, py, ax, ay, bx, by) {
      const dx = bx - ax, dy = by - ay, t = clamp(((px - ax) * dx + (py - ay) * dy) / (dx * dx + dy * dy || 1e-9), 0, 1);
      return Math.hypot(px - ax - dx * t, py - ay - dy * t);
    }
    // distance to the outline of a regular n-gon (or star polygon when step > 1) of radius r
    sdPoly(px, py, n, r, rot = 0, step = 1) {
      let best = 1e9;
      for (let k = 0; k < n; k++) {
        const a0 = rot + k * step / n * TAU, a1 = rot + (k + 1) * step / n * TAU;
        best = Math.min(best, this.sdSeg(px, py, Math.cos(a0) * r, Math.sin(a0) * r, Math.cos(a1) * r, Math.sin(a1) * r));
      }
      return best;
    }
    // blocky rune glyph: u, v in [0, 1) inside one cell, seed picks the glyph (5x5 bits, mirrored)
    rune(u, v, seed) {
      if (u < 0 || u >= 1 || v < 0 || v >= 1) return 0;
      const gx = Math.floor(u * 5), gy = Math.floor(v * 5), mx = gx > 2 ? 4 - gx : gx;
      return this.r(seed * 13 + mx * 5 + gy, 4) > .52 ? 1 : 0;
    }
  }
  function basis(n) {
    let [x, y, z] = n;
    const l = Math.hypot(x, y, z) || 1;
    x /= l; y /= l; z /= l;
    let ax = 0, ay = 0, az = 1;
    if (Math.abs(z) > .9) { ax = 1; az = 0; }
    let e1x = y * az - z * ay, e1y = z * ax - x * az, e1z = x * ay - y * ax;
    const l1 = Math.hypot(e1x, e1y, e1z) || 1;
    e1x /= l1; e1y /= l1; e1z /= l1;
    return [[e1x, e1y, e1z], [y * e1z - z * e1y, z * e1x - x * e1z, x * e1y - y * e1x]];
  }

  /* ---------- registry ---------- */
  const FX = new Map();
  function define(def) {
    if (!def || !def.id || typeof def.draw !== 'function') throw new Error('PXFX.define needs { id, draw }');
    def.loop = def.loop || 3;
    def.palette = def.palette || {};
    def.params = def.params || {};
    def.beats = def.beats || [];
    FX.set(def.id, def);
    return def;
  }
  const frameTime = (t, mode) => { const f = MODES[mode].fps; return Math.floor(t * f + 1e-6) / f; };

  /* ---------- timing: pacing and impact on top of the effect's own clock ----------
   * def.beats marks the moments that should land hard: { t, kind, power }.
   *   hit   speeds up into t, freezes (hit-stop), shakes the camera, flashes, then bursts out fast and slows down
   *   burst no approach (things start there): freeze, shake, flash, fast-then-slow release
   *   cast  a launch or appearance: flash and a short fast-then-slow release
   *   pulse a flash accent only
   * tune: hitstop (seconds), shake (pixels), flash (extra light), snap (top speed multiplier; 1 = even pace).
   * Returns { length, beats, hits, segs, at(tau) -> { t, shakeX, shakeY, gain } } where tau is display time. */
  const BEAT = {
    hit: { approach: 1, hold: 1, shake: 1, flash: 1, release: 1 },
    burst: { approach: 0, hold: .8, shake: .8, flash: 1, release: 1 },
    cast: { approach: 0, hold: 0, shake: 0, flash: .5, release: .55 },
    pulse: { approach: 0, hold: 0, shake: .3, flash: .6, release: 0 },
  };
  const TUNE_DEFAULTS = { hitstop: .1, shake: 2, flash: .7, snap: 2.2 };
  function timing(def, tune = E) {
    const L = def.loop, k = tune.snap == null ? TUNE_DEFAULTS.snap : tune.snap;
    const hold0 = tune.hitstop == null ? TUNE_DEFAULTS.hitstop : tune.hitstop;
    const shake0 = tune.shake == null ? TUNE_DEFAULTS.shake : tune.shake;
    const flash0 = tune.flash == null ? TUNE_DEFAULTS.flash : tune.flash;
    const beats = (def.beats || []).filter(b => b.t >= 0 && b.t < L).slice().sort((a, b) => a.t - b.t);
    const segs = [], hits = [];
    let e = 0, d = 0;
    const push = (type, ee, dd, x) => { if (dd <= 1e-6 && type !== 'hold') return; segs.push(Object.assign({ type, d0: d, dd, e0: e, ee }, x)); d += dd; e += ee; };
    beats.forEach((b, i) => {
      if (b.t < e - 1e-6) return;                          // swallowed by the previous release
      const K = BEAT[b.kind] || BEAT.hit, pw = b.power == null ? 1 : b.power;
      const next = i + 1 < beats.length ? beats[i + 1].t : L;
      const a = K.approach && k > 1 ? Math.min(.4, b.t - e) : 0;
      if (b.t - a - e > 1e-6) push('lin', b.t - a - e, b.t - a - e);
      if (a > 1e-6) push('in', a, a / (1 + (k - 1) / 3), { k });
      const hold = K.hold * hold0 * pw, eps = Math.min(.02, (next - b.t) * .5);
      hits.push({ d, hold, shake: K.shake * shake0 * pw, flash: K.flash * flash0 * pw, t: b.t, kind: b.kind || 'hit' });
      if (hold > 0) push('hold', eps, hold); else if (eps > 0) push('lin', eps, eps);
      const r = K.release && k > 1 ? Math.min(.7 * K.release, (next - e) * .6) : 0;
      if (r > 1e-6) push('out', r, r / (1 + (k - 1) / 3), { k });
    });
    if (L - e > 1e-6) push('lin', L - e, L - e);
    const length = d || L;
    return {
      length, beats, hits, segs,
      at(tau) {
        tau = ((tau % length) + length) % length;
        let s = segs[segs.length - 1];
        for (const g of segs) if (tau < g.d0 + g.dd) { s = g; break; }
        let t;
        if (!s) t = tau;
        else {
          const u = s.dd > 0 ? clamp((tau - s.d0) / s.dd, 0, 1) : 1;
          if (s.type === 'lin') t = s.e0 + (tau - s.d0);
          else if (s.type === 'hold') t = s.e0 + s.ee;
          else if (s.type === 'in') t = s.e0 + s.dd * (u + (s.k - 1) * u * u * u / 3);
          else t = s.e0 + s.dd * (u + (s.k - 1) * (1 - Math.pow(1 - u, 3)) / 3);
        }
        let sx = 0, sy = 0, gain = 1;
        for (const h of hits) {
          const dt = tau - h.d;
          if (dt < 0 || dt > .5) continue;
          if (h.flash) gain += h.flash * (dt < h.hold ? 1 : Math.exp(-(dt - h.hold) / .07));
          if (h.shake && dt < .32) {
            const amp = h.shake * (1 - dt / .32) * (1 - dt / .32), f = Math.floor(dt * 30), ang = hash(f + 1, h.d * 13 + 1) * TAU;
            sx += Math.round(Math.cos(ang) * amp); sy += Math.round(Math.sin(ang) * amp * .7);
          }
        }
        return { t: clamp(t, 0, L - 1e-4), shakeX: sx, shakeY: sy, gain };
      },
    };
  }
  const shiftHex = (h, deg) => toHex(hueRot(hex(h), deg).map(v => clamp(v, 0, 255)));
  // a ramp as the renderer will show it after a hue change (greys stay as they are)
  const shiftRamp = (r, deg) => { const hs = r.map(c => (typeof c === 'string' ? c : toHex(c))); return !deg || chroma(rampId(r)) < .075 ? hs : hs.map(h => shiftHex(h, deg)); };

  G.PXFX = { View, Api, MODES, GROUNDS, POSES, define, timing, TUNE_DEFAULTS, BEAT, shiftHex, shiftRamp, get: id => FX.get(id), all: () => [...FX.values()], frameTime, glowRamp, solidRamp, rampId, rampArr, hex, toHex, hash, noise, fbm, bayerAt, rgb, SHADOW_X, SHADOW_Y };
})(typeof window !== 'undefined' ? window : globalThis);
