let t = [];
const n = /* @__PURE__ */ new WeakMap();
function r() {
  t.forEach((t2) => t2(...n.get(t2))), t = [];
}
function e(e2, ...o2) {
  n.set(e2, o2), t.includes(e2) || 1 === t.push(e2) && requestAnimationFrame(r);
}
let o = [], u = [];
function i() {
  o.forEach((t2, n2) => t2(...u[n2])), o = [], u = [];
}
function a(t2, ...n2) {
  1 === o.push(t2) && requestAnimationFrame(i), u.push(n2);
}
function c(t2) {
  if (null === t2) return null;
  const n2 = function(t3) {
    return 9 === t3.nodeType ? null : t3.parentNode;
  }(t2);
  if (null === n2) return null;
  if (9 === n2.nodeType) return document.documentElement;
  if (1 === n2.nodeType) {
    const { overflow: t3, overflowX: r2, overflowY: e2 } = getComputedStyle(n2);
    if (/(auto|scroll|overlay)/.test(t3 + e2 + r2)) return n2;
  }
  return c(n2);
}
function $(t2) {
  return "string" == typeof t2 ? document.querySelector(t2) : "function" == typeof t2 ? t2() : t2;
}
function s(t2, n2) {
  let { target: r2 } = t2;
  for (; r2; ) {
    if (r2.dataset && void 0 !== r2.dataset[n2]) return true;
    r2 = r2.parentElement;
  }
  return false;
}
function f(t2) {
  return t2.composedPath()[0] || null;
}
function l(t2) {
  if ("number" == typeof t2) return { "": t2.toString() };
  const n2 = {};
  return t2.split(/ +/).forEach((t3) => {
    if ("" === t3) return;
    const [r2, e2] = t3.split(":");
    void 0 === e2 ? n2[""] = r2 : n2[r2] = e2;
  }), n2;
}
function h(t2, n2) {
  var r2;
  if (null == t2) return;
  const e2 = l(t2);
  if (void 0 === n2) return e2[""];
  if ("string" == typeof n2) return null !== (r2 = e2[n2]) && void 0 !== r2 ? r2 : e2[""];
  if (Array.isArray(n2)) {
    for (let t3 = n2.length - 1; t3 >= 0; --t3) {
      const r3 = n2[t3];
      if (r3 in e2) return e2[r3];
    }
    return e2[""];
  }
  {
    let t3, r3 = -1;
    return Object.keys(e2).forEach((o2) => {
      const u2 = Number(o2);
      !Number.isNaN(u2) && n2 >= u2 && u2 >= r3 && (r3 = u2, t3 = e2[o2]);
    }), t3;
  }
}
function p(t2) {
  return "string" == typeof t2 ? t2.endsWith("px") ? Number(t2.slice(0, t2.length - 2)) : Number(t2) : t2;
}
function m(t2) {
  if (null != t2) return "number" == typeof t2 ? `${t2}px` : t2.endsWith("px") ? t2 : `${t2}px`;
}
function g(t2, n2) {
  const r2 = t2.trim().split(/\s+/g), e2 = { top: r2[0] };
  switch (r2.length) {
    case 1:
      e2.right = r2[0], e2.bottom = r2[0], e2.left = r2[0];
      break;
    case 2:
      e2.right = r2[1], e2.left = r2[1], e2.bottom = r2[0];
      break;
    case 3:
      e2.right = r2[1], e2.bottom = r2[2], e2.left = r2[1];
      break;
    case 4:
      e2.right = r2[1], e2.bottom = r2[2], e2.left = r2[3];
      break;
    default:
      throw new Error("[seemly/getMargin]:" + t2 + " is not a valid value.");
  }
  return void 0 === n2 ? e2 : e2[n2];
}
function d(t2, n2) {
  const [r2, e2] = t2.split(" ");
  return n2 ? "row" === n2 ? r2 : e2 : { row: r2, col: e2 || r2 };
}
const y = { black: "#000", silver: "#C0C0C0", gray: "#808080", white: "#FFF", maroon: "#800000", red: "#F00", purple: "#800080", fuchsia: "#F0F", green: "#008000", lime: "#0F0", olive: "#808000", yellow: "#FF0", navy: "#000080", blue: "#00F", teal: "#008080", aqua: "#0FF", transparent: "#0000" };
function x(t2, n2, r2) {
  r2 /= 100;
  const e2 = (n2 /= 100) * Math.min(r2, 1 - r2) + r2;
  return [t2, e2 ? 100 * (2 - 2 * r2 / e2) : 0, 100 * e2];
}
function w(t2, n2, r2) {
  const e2 = (r2 /= 100) - r2 * (n2 /= 100) / 2, o2 = Math.min(e2, 1 - e2);
  return [t2, o2 ? (r2 - e2) / o2 * 100 : 0, 100 * e2];
}
function v(t2, n2, r2) {
  n2 /= 100, r2 /= 100;
  let e2 = (e3, o2 = (e3 + t2 / 60) % 6) => r2 - r2 * n2 * Math.max(Math.min(o2, 4 - o2, 1), 0);
  return [255 * e2(5), 255 * e2(3), 255 * e2(1)];
}
function b(t2, n2, r2) {
  t2 /= 255, n2 /= 255, r2 /= 255;
  let e2 = Math.max(t2, n2, r2), o2 = e2 - Math.min(t2, n2, r2), u2 = o2 && (e2 == t2 ? (n2 - r2) / o2 : e2 == n2 ? 2 + (r2 - t2) / o2 : 4 + (t2 - n2) / o2);
  return [60 * (u2 < 0 ? u2 + 6 : u2), e2 && o2 / e2 * 100, 100 * e2];
}
function E(t2, n2, r2) {
  t2 /= 255, n2 /= 255, r2 /= 255;
  let e2 = Math.max(t2, n2, r2), o2 = e2 - Math.min(t2, n2, r2), u2 = 1 - Math.abs(e2 + e2 - o2 - 1), i2 = o2 && (e2 == t2 ? (n2 - r2) / o2 : e2 == n2 ? 2 + (r2 - t2) / o2 : 4 + (t2 - n2) / o2);
  return [60 * (i2 < 0 ? i2 + 6 : i2), u2 ? o2 / u2 * 100 : 0, 50 * (e2 + e2 - o2)];
}
function F(t2, n2, r2) {
  r2 /= 100;
  let e2 = (n2 /= 100) * Math.min(r2, 1 - r2), o2 = (n3, o3 = (n3 + t2 / 30) % 12) => r2 - e2 * Math.max(Math.min(o3 - 3, 9 - o3, 1), -1);
  return [255 * o2(0), 255 * o2(8), 255 * o2(4)];
}
const M = "^\\s*", A = "\\s*$", S = "\\s*((\\.\\d+)|(\\d+(\\.\\d*)?))%\\s*", N = "\\s*((\\.\\d+)|(\\d+(\\.\\d*)?))\\s*", R = "([0-9A-Fa-f])", k = "([0-9A-Fa-f]{2})", C = new RegExp(`${M}hsl\\s*\\(${N},${S},${S}\\)${A}`), I = new RegExp(`${M}hsv\\s*\\(${N},${S},${S}\\)${A}`), q = new RegExp(`${M}hsla\\s*\\(${N},${S},${S},${N}\\)${A}`), T = new RegExp(`${M}hsva\\s*\\(${N},${S},${S},${N}\\)${A}`), j = new RegExp(`${M}rgb\\s*\\(${N},${N},${N}\\)${A}`), P = new RegExp(`${M}rgba\\s*\\(${N},${N},${N},${N}\\)${A}`), U = new RegExp(`${M}#${R}${R}${R}${A}`), W = new RegExp(`${M}#${k}${k}${k}${A}`), H = new RegExp(`${M}#${R}${R}${R}${R}${A}`), O = new RegExp(`${M}#${k}${k}${k}${k}${A}`);
function X(t2) {
  return parseInt(t2, 16);
}
function Y(t2) {
  try {
    let n2;
    if (n2 = q.exec(t2)) return [_(n2[1]), nt(n2[5]), nt(n2[9]), Z(n2[13])];
    if (n2 = C.exec(t2)) return [_(n2[1]), nt(n2[5]), nt(n2[9]), 1];
    throw new Error(`[seemly/hsla]: Invalid color value ${t2}.`);
  } catch (t3) {
    throw t3;
  }
}
function z(t2) {
  try {
    let n2;
    if (n2 = T.exec(t2)) return [_(n2[1]), nt(n2[5]), nt(n2[9]), Z(n2[13])];
    if (n2 = I.exec(t2)) return [_(n2[1]), nt(n2[5]), nt(n2[9]), 1];
    throw new Error(`[seemly/hsva]: Invalid color value ${t2}.`);
  } catch (t3) {
    throw t3;
  }
}
function B(t2) {
  try {
    let n2;
    if (n2 = W.exec(t2)) return [X(n2[1]), X(n2[2]), X(n2[3]), 1];
    if (n2 = j.exec(t2)) return [tt(n2[1]), tt(n2[5]), tt(n2[9]), 1];
    if (n2 = P.exec(t2)) return [tt(n2[1]), tt(n2[5]), tt(n2[9]), Z(n2[13])];
    if (n2 = U.exec(t2)) return [X(n2[1] + n2[1]), X(n2[2] + n2[2]), X(n2[3] + n2[3]), 1];
    if (n2 = O.exec(t2)) return [X(n2[1]), X(n2[2]), X(n2[3]), Z(X(n2[4]) / 255)];
    if (n2 = H.exec(t2)) return [X(n2[1] + n2[1]), X(n2[2] + n2[2]), X(n2[3] + n2[3]), Z(X(n2[4] + n2[4]) / 255)];
    if (t2 in y) return B(y[t2]);
    throw new Error(`[seemly/rgba]: Invalid color value ${t2}.`);
  } catch (t3) {
    throw t3;
  }
}
function D(t2, n2, r2, e2) {
  return `rgba(${tt(t2)}, ${tt(n2)}, ${tt(r2)}, ${o2 = e2, o2 > 1 ? 1 : o2 < 0 ? 0 : o2})`;
  var o2;
}
function G(t2, n2, r2, e2, o2) {
  return tt((t2 * n2 * (1 - e2) + r2 * e2) / o2);
}
function J(t2, n2) {
  Array.isArray(t2) || (t2 = B(t2)), Array.isArray(n2) || (n2 = B(n2));
  const r2 = t2[3], e2 = n2[3], o2 = Z(r2 + e2 - r2 * e2);
  return D(G(t2[0], r2, n2[0], e2, o2), G(t2[1], r2, n2[1], e2, o2), G(t2[2], r2, n2[2], e2, o2), o2);
}
function K(t2, n2) {
  const [r2, e2, o2, u2 = 1] = Array.isArray(t2) ? t2 : B(t2);
  return n2.alpha ? D(r2, e2, o2, n2.alpha) : D(r2, e2, o2, u2);
}
function L(t2, n2) {
  const [r2, e2, o2, u2 = 1] = Array.isArray(t2) ? t2 : B(t2), { lightness: i2 = 1, alpha: a2 = 1 } = n2;
  return et([r2 * i2, e2 * i2, o2 * i2, u2 * a2]);
}
function Q(t2) {
  var n2;
  return null !== (n2 = (Array.isArray(t2) ? t2 : B(t2))[3]) && void 0 !== n2 ? n2 : 1;
}
function V(t2) {
  return `${Q(t2)}`;
}
function Z(t2) {
  const n2 = Math.round(100 * Number(t2)) / 100;
  return n2 > 1 ? 1 : n2 < 0 ? 0 : n2;
}
function _(t2) {
  const n2 = Math.round(Number(t2));
  return n2 >= 360 || n2 < 0 ? 0 : n2;
}
function tt(t2) {
  const n2 = Math.round(Number(t2));
  return n2 > 255 ? 255 : n2 < 0 ? 0 : n2;
}
function nt(t2) {
  const n2 = Math.round(Number(t2));
  return n2 > 100 ? 100 : n2 < 0 ? 0 : n2;
}
function rt(t2) {
  const [n2, r2, e2] = Array.isArray(t2) ? t2 : B(t2);
  return function(t3, n3, r3) {
    return `rgb(${tt(t3)}, ${tt(n3)}, ${tt(r3)})`;
  }(n2, r2, e2);
}
function et(t2) {
  const [n2, r2, e2] = t2;
  return 3 in t2 ? `rgba(${tt(n2)}, ${tt(r2)}, ${tt(e2)}, ${Z(t2[3])})` : `rgba(${tt(n2)}, ${tt(r2)}, ${tt(e2)}, 1)`;
}
function ot(t2) {
  return `hsv(${_(t2[0])}, ${nt(t2[1])}%, ${nt(t2[2])}%)`;
}
function ut(t2) {
  const [n2, r2, e2] = t2;
  return 3 in t2 ? `hsva(${_(n2)}, ${nt(r2)}%, ${nt(e2)}%, ${Z(t2[3])})` : `hsva(${_(n2)}, ${nt(r2)}%, ${nt(e2)}%, 1)`;
}
function it(t2) {
  return `hsl(${_(t2[0])}, ${nt(t2[1])}%, ${nt(t2[2])}%)`;
}
function at(t2) {
  const [n2, r2, e2] = t2;
  return 3 in t2 ? `hsla(${_(n2)}, ${nt(r2)}%, ${nt(e2)}%, ${Z(t2[3])})` : `hsla(${_(n2)}, ${nt(r2)}%, ${nt(e2)}%, 1)`;
}
function ct(t2) {
  if ("string" == typeof t2) {
    let n2;
    if (n2 = W.exec(t2)) return `${n2[0]}FF`;
    if (n2 = O.exec(t2)) return n2[0];
    if (n2 = U.exec(t2)) return `#${n2[1]}${n2[1]}${n2[2]}${n2[2]}${n2[3]}${n2[3]}FF`;
    if (n2 = H.exec(t2)) return `#${n2[1]}${n2[1]}${n2[2]}${n2[2]}${n2[3]}${n2[3]}${n2[4]}${n2[4]}`;
    throw new Error(`[seemly/toHexString]: Invalid hex value ${t2}.`);
  }
  return `#${t2.slice(0, 3).map((t3) => tt(t3).toString(16).toUpperCase().padStart(2, "0")).join("")}` + (3 === t2.length ? "FF" : tt(255 * t2[3]).toString(16).padStart(2, "0").toUpperCase());
}
function $t(t2) {
  if ("string" == typeof t2) {
    let n2;
    if (n2 = W.exec(t2)) return n2[0];
    if (n2 = O.exec(t2)) return n2[0].slice(0, 7);
    if (n2 = U.exec(t2) || H.exec(t2)) return `#${n2[1]}${n2[1]}${n2[2]}${n2[2]}${n2[3]}${n2[3]}`;
    throw new Error(`[seemly/toHexString]: Invalid hex value ${t2}.`);
  }
  return `#${t2.slice(0, 3).map((t3) => tt(t3).toString(16).toUpperCase().padStart(2, "0")).join("")}`;
}
function st(t2 = 8) {
  return Math.random().toString(16).slice(2, 2 + t2);
}
function ft(t2, n2) {
  const r2 = [];
  for (let e2 = 0; e2 < t2; ++e2) r2.push(n2);
  return r2;
}
function lt(t2, n2) {
  const r2 = [];
  if (!n2) {
    for (let n3 = 0; n3 < t2; ++n3) r2.push(n3);
    return r2;
  }
  for (let e2 = 0; e2 < t2; ++e2) r2.push(n2(e2));
  return r2;
}
async function ht(t2) {
  return new Promise((n2) => {
    setTimeout(n2, t2);
  });
}
export {
  a as beforeNextFrame,
  e as beforeNextFrameOnce,
  K as changeColor,
  J as composite,
  st as createId,
  p as depx,
  Q as getAlpha,
  V as getAlphaString,
  d as getGap,
  g as getMargin,
  g as getPadding,
  f as getPreciseEventTarget,
  c as getScrollParent,
  s as happensIn,
  x as hsl2hsv,
  F as hsl2rgb,
  Y as hsla,
  w as hsv2hsl,
  v as hsv2rgb,
  z as hsva,
  lt as indexMap,
  l as parseResponsiveProp,
  h as parseResponsivePropValue,
  m as pxfy,
  ft as repeat,
  E as rgb2hsl,
  b as rgb2hsv,
  B as rgba,
  Z as roundAlpha,
  tt as roundChannel,
  _ as roundDeg,
  nt as roundPercent,
  L as scaleColor,
  ht as sleep,
  $t as toHexString,
  ct as toHexaString,
  it as toHslString,
  at as toHslaString,
  ot as toHsvString,
  ut as toHsvaString,
  rt as toRgbString,
  et as toRgbaString,
  $ as unwrapElement
};
