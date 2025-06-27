const e = ({ url: e2, method: t2, headers: o2, body: r2, responseType: n2, withCredentials: s2, onDownloadProgress: i2, onUploadProgress: a2, onResponse: d2, onNetworkError: c2, onHeadersReceived: l2 }) => {
  const u2 = new XMLHttpRequest();
  u2.open(t2, e2), u2.withCredentials = s2, u2.responseType = n2;
  for (const [e3, t3] of Object.entries(o2)) u2.setRequestHeader(e3, t3);
  a2 && u2.upload.addEventListener("progress", (e3) => {
    a2({ lengthComputable: e3.lengthComputable, percent: e3.lengthComputable ? e3.loaded / e3.total * 100 : 0, loaded: e3.loaded, total: e3.total, detail: e3, originalRequest: u2 });
  }), i2 && u2.addEventListener("progress", (e3) => {
    i2({ lengthComputable: e3.lengthComputable, percent: e3.lengthComputable ? e3.loaded / e3.total * 100 : 0, loaded: e3.loaded, total: e3.total, detail: e3, originalRequest: u2 });
  });
  let p2 = null, E = () => (null === p2 && (p2 = function(e3) {
    if (!e3) return {};
    const t3 = {};
    return e3.trim().split(/[\r\n]+/).forEach(function(e4) {
      const o3 = e4.split(":"), r3 = (o3[0] || "").trim().toLowerCase(), n3 = (o3[1] || "").trim();
      t3[r3] = n3;
    }), t3;
  }(u2.getAllResponseHeaders())), p2);
  u2.addEventListener("loadend", (e3) => {
    d2({ status: u2.status, headers: E(), body: u2.response }, e3);
  });
  const R = () => {
    u2.readyState === u2.HEADERS_RECEIVED && l2 && l2(E(), u2), u2.removeEventListener("readystatechange", R);
  };
  return u2.addEventListener("readystatechange", R), u2.addEventListener("error", (e3) => {
    c2(e3);
  }), u2.send(r2), { abort() {
    u2.abort();
  } };
};
var t;
function o(e2, t2) {
  const o2 = function() {
    const e3 = new Error();
    return e3.__lylaError = true, e3;
  }();
  o2.name = `LylaError[${e2.type}]`, t2 && (o2.stack += t2), Object.assign(o2, e2);
  return o2.spread = () => {
    const e3 = o2;
    return { name: e3.name, message: e3.message, stack: e3.stack, type: e3.type, error: e3.error, detail: e3.detail, context: e3.context, response: e3.response, requestOptions: e3.requestOptions, __lylaError: true };
  }, o2;
}
!function(e2) {
  e2.NETWORK = "NETWORK", e2.ABORTED = "ABORTED", e2.INVALID_JSON = "INVALID_JSON", e2.INVALID_CONVERSION = "INVALID_CONVERSION", e2.TIMEOUT = "TIMEOUT", e2.HTTP = "HTTP", e2.BAD_REQUEST = "BAD_REQUEST", e2.BROKEN_ON_AFTER_RESPONSE = "BROKEN_ON_AFTER_RESPONSE", e2.BROKEN_ON_BEFORE_REQUEST = "BROKEN_ON_BEFORE_REQUEST", e2.BROKEN_ON_INIT = "BROKEN_ON_INIT", e2.BROKEN_ON_RESPONSE_ERROR = "BROKEN_ON_RESPONSE_ERROR", e2.BROKEN_ON_NON_RESPONSE_ERROR = "BROKEN_ON_NON_RESPONSE_ERROR", e2.BROKEN_ON_HEADERS_RECEIVED = "BROKEN_ON_HEADERS_RECEIVED";
}(t || (t = {}));
class r {
  constructor() {
    this.signal = new n();
  }
  abort(e2) {
    this.signal.aborted || (this.signal.__abort(e2), this.signal.__listeners);
  }
}
class n {
  constructor() {
    this.aborted = false, this.__listeners = /* @__PURE__ */ new Set();
  }
  addEventListener(e2, t2) {
    this.__listeners.add(t2);
  }
  removeEventListener(e2, t2) {
    this.__listeners.delete(t2);
  }
  __abort(e2) {
    this.aborted = true, this.reason = e2, this.__listeners.forEach((e3) => {
      e3();
    });
  }
}
function s(e2) {
  return e2 && "object" == typeof e2;
}
function i(e2, t2) {
  if (!t2) return e2;
  for (const [o2, r2] of Object.entries(t2)) void 0 === r2 ? delete e2[o2] : e2[o2.toLowerCase()] = "string" == typeof r2 ? r2 : `${r2}`;
  return e2;
}
function a(...e2) {
  let t2 = {};
  for (const o2 of e2) if (Array.isArray(o2)) Array.isArray(t2) || (t2 = []), t2.push(...o2);
  else if (s(o2)) for (let [e3, r2] of Object.entries(o2)) s(r2) && e3 in t2 && (r2 = a(t2[e3], r2)), t2[e3] = r2;
  return t2;
}
const d = { 100: "Continue", 101: "Switching Protocols", 102: "Processing", 103: "Early Hints", 200: "OK", 201: "Created", 202: "Accepted", 203: "Non-Authoritative Information", 204: "No Content", 205: "Reset Content", 206: "Partial Content", 207: "Multi-Status", 208: "Already Reported", 226: "IM Used", 300: "Multiple Choices", 301: "Moved Permanently", 302: "Found", 303: "See Other", 304: "Not Modified", 305: "Use Proxy", 307: "Temporary Redirect", 308: "Permanent Redirect", 400: "Bad Request", 401: "Unauthorized", 402: "Payment Required", 403: "Forbidden", 404: "Not Found", 405: "Method Not Allowed", 406: "Not Acceptable", 407: "Proxy Authentication Required", 408: "Request Timeout", 409: "Conflict", 410: "Gone", 411: "Length Required", 412: "Precondition Failed", 413: "Payload Too Large", 414: "URI Too Long", 415: "Unsupported Media Type", 416: "Range Not Satisfiable", 417: "Expectation Failed", 418: "I'm a teapot", 421: "Misdirected Request", 422: "Upprocessable Entity", 423: "Locked", 424: "Failed Dependency", 425: "Too Early", 426: "Upgrade Required", 428: "Precondition Required", 429: "Too Many Requests", 431: "Request Header Fields Too Large", 451: "Unavailable For Legal Reasons", 500: "Internal Server Error", 501: "Not Implemented", 502: "Bad Gateway", 503: "Service Unavailable", 504: "Gateway TImeout", 505: "HTTP Version Not Supported", 506: "Variant Also Negotiates", 507: "INsufficient Storage", 508: "Loop Detected", 510: "Not Extended", 511: "Network Authentication Required" };
function c(e2, r2, ...n2) {
  const s2 = a(r2, ...n2);
  async function c2(r3) {
    var n3, c3, l3, u2, p2, E, R, v, O;
    const h = void 0 === r3.context ? s2.context : r3.context;
    let f = Object.assign({}, r3, { context: "object" == typeof h ? JSON.parse(JSON.stringify(h)) : h });
    async function N(e3) {
      var r4, n4;
      if (null === (r4 = y.hooks) || void 0 === r4 ? void 0 : r4.onNonResponseError) try {
        for (const t2 of null === (n4 = y.hooks) || void 0 === n4 ? void 0 : n4.onNonResponseError) {
          const o2 = t2(e3);
          o2 instanceof Promise && await o2;
        }
      } catch (r5) {
        return void C(o({ type: t.BROKEN_ON_NON_RESPONSE_ERROR, error: r5, message: "`onNonResponseError` hook throws error", detail: void 0, response: void 0, context: e3.context, requestOptions: y }, void 0));
      }
    }
    try {
      if (null === (n3 = null == s2 ? void 0 : s2.hooks) || void 0 === n3 ? void 0 : n3.onInit) for (const e3 of s2.hooks.onInit) {
        const t2 = e3(f);
        f = t2 instanceof Promise ? await t2 : t2;
      }
      if (null === (c3 = null == r3 ? void 0 : r3.hooks) || void 0 === c3 ? void 0 : c3.onInit) for (const e3 of r3.hooks.onInit) {
        const t2 = e3(f);
        f = t2 instanceof Promise ? await t2 : t2;
      }
    } catch (e3) {
      const r4 = o({ type: t.BROKEN_ON_INIT, message: "`onInit` hook throws error", detail: void 0, error: e3, response: void 0, context: f.context, requestOptions: f }, void 0);
      throw N(r4), r4;
    }
    let y = a(s2, f);
    var _, g;
    let m;
    y.method = null === (l3 = y.method) || void 0 === l3 ? void 0 : l3.toUpperCase(), y.responseType = r3.responseType || "text", y.url = y.url || "", y.baseUrl && (y.url = (_ = y.baseUrl, g = y.url, /^([a-z][a-z\d+\-.]*:)?\/\//i.test(g) ? g : g ? _.replace(/\/+$/, "") + "/" + g.replace(/^\/+/, "") : _));
    try {
      m = null === (u2 = new Error().stack) || void 0 === u2 ? void 0 : u2.replace(/^Error/, "");
    } catch (e3) {
    }
    if (y.query) {
      const e3 = new URLSearchParams();
      for (const [t2, o2] of Object.entries(y.query)) if (Array.isArray(o2)) for (const r5 of o2) e3.append(t2, r5.toString());
      else null != o2 && e3.append(t2, o2.toString());
      const r4 = e3.toString();
      if (y.url.includes("?")) {
        const e4 = o({ type: t.BAD_REQUEST, message: "`options.query` can't be set if `options.url` contains '?'", detail: void 0, error: void 0, response: void 0, context: y.context, requestOptions: y }, void 0);
        throw N(e4), e4;
      }
      r4.length && (y.url = y.url + "?" + r4);
    }
    if (null === (p2 = y.hooks) || void 0 === p2 ? void 0 : p2.onBeforeRequest) try {
      for (const e3 of null === (E = y.hooks) || void 0 === E ? void 0 : E.onBeforeRequest) {
        const t2 = e3(y);
        y = t2 instanceof Promise ? await t2 : t2;
      }
    } catch (e3) {
      const r4 = o({ type: t.BROKEN_ON_BEFORE_REQUEST, message: "`onBeforeRequest` hook throws error", detail: void 0, error: e3, response: void 0, context: f.context, requestOptions: y }, void 0);
      throw N(r4), r4;
    }
    if (void 0 !== y.json) {
      if (void 0 !== y.body) {
        const e3 = o({ type: t.BAD_REQUEST, message: "`options.json` can't be used together with `options.body`. If you want to use `options.json`, you should left `options.body` as `undefined`", detail: void 0, error: void 0, response: void 0, context: y.context, requestOptions: y }, void 0);
        throw N(e3), e3;
      }
      y.body = JSON.stringify(y.json);
    }
    const { timeout: b, url: T = "", method: S = "get", body: x, responseType: w = "text", withCredentials: q = false, signal: I, onUploadProgress: A, onDownloadProgress: P } = y;
    async function B(e3) {
      var r4, n4;
      if (null === (r4 = y.hooks) || void 0 === r4 ? void 0 : r4.onResponseError) try {
        for (const t2 of null === (n4 = y.hooks) || void 0 === n4 ? void 0 : n4.onResponseError) {
          const o2 = t2(e3, k);
          o2 instanceof Promise && await o2;
        }
      } catch (r5) {
        const n5 = o({ type: t.BROKEN_ON_RESPONSE_ERROR, error: r5, message: "`onResponseError` hook throws error", detail: void 0, response: void 0, context: e3.context, requestOptions: y }, void 0);
        return N(n5), void C(n5);
      }
    }
    let L, C, k;
    const D = {};
    i(D, s2.headers), i(D, y.headers), void 0 !== y.json && (D["content-type"] = null !== (R = D["content-type"]) && void 0 !== R ? R : "application/json"), D.accept = null !== (v = D.accept) && void 0 !== v ? v : "*/*", y.headers = D;
    let U = false, j = false;
    function K() {
      U = true, j || H();
    }
    function H() {
      j = true, I && I.removeEventListener("abort", M);
    }
    const V = new Promise((e3, t2) => {
      L = e3, C = (e4) => {
        U || (K(), t2(e4));
      }, k = (e4) => {
        U || (K(), t2(e4));
      };
    });
    let F = false;
    function M() {
      if (F) return;
      F = true;
      const e3 = o({ type: t.ABORTED, message: "Request aborted", detail: void 0, error: void 0, response: void 0, context: y.context, requestOptions: y }, m);
      B(e3), C(e3), $.abort();
    }
    I && I.addEventListener("abort", M);
    let J = false;
    const Q = null === (O = y.hooks) || void 0 === O ? void 0 : O.onHeadersReceived, $ = e2({ url: T, method: S, body: x, json: y.json, headers: D, responseType: w, withCredentials: q, extraOptions: y.extraOptions, onNetworkError(e3) {
      J = true, H();
      const r4 = o({ type: t.NETWORK, message: "Network error", detail: e3, error: void 0, response: void 0, context: y.context, requestOptions: y }, m);
      B(r4), C(r4);
    }, onDownloadProgress: P ? (e3) => {
      P(Object.assign(Object.assign({}, e3), { requestOptions: y }));
    } : void 0, onUploadProgress: A ? (e3) => {
      A(Object.assign(Object.assign({}, e3), { requestOptions: y }));
    } : void 0, onHeadersReceived: Q ? (e3, r4) => {
      if (!F && !J && Q) {
        const n4 = i({}, e3);
        try {
          for (const e4 of Q) e4({ headers: n4, requestOptions: y, originalRequest: r4 }, k);
        } catch (e4) {
          const r5 = o({ type: t.BROKEN_ON_HEADERS_RECEIVED, message: "`onHeadersReceived` hook throws error", detail: void 0, response: void 0, error: e4, context: y.context, requestOptions: y }, void 0);
          return N(r5), void C(r5);
        }
      }
    } : void 0, async onResponse(e3, r4) {
      var n4;
      if (F) return;
      if (J) return;
      let s3;
      H();
      let a2, c4, l4 = false;
      const u3 = (p3 = e3.status, d[p3] || "");
      var p3;
      let E2 = { context: y.context, requestOptions: y, status: e3.status, statusText: u3, headers: i({}, e3.headers), body: e3.body, detail: r4, set json(e4) {
        l4 = true, s3 = e4;
      }, get json() {
        if (l4) return s3;
        if ("text" !== w) {
          const e4 = o({ type: t.INVALID_CONVERSION, message: `Can not convert ${w} to JSON`, detail: void 0, error: void 0, response: E2, context: E2.context, requestOptions: y }, void 0);
          throw N(e4), e4;
        }
        if (void 0 !== a2) return a2;
        try {
          return a2 = JSON.parse(e3.body);
        } catch (e4) {
          c4 = e4;
        }
        if (c4) {
          const e4 = o({ type: t.INVALID_JSON, message: c4.message, detail: void 0, error: c4, context: E2.context, response: E2, requestOptions: y }, void 0);
          throw N(e4), e4;
        }
      } };
      if (!function(e4) {
        return 200 <= e4 && e4 < 300;
      }(e3.status)) {
        const r5 = `${e3.status} ${u3}`, n5 = o({ type: t.HTTP, message: `Request failed with ${r5}`, detail: void 0, error: void 0, response: E2, context: y.context, requestOptions: y }, m);
        return B(n5), void C(n5);
      }
      if (null === (n4 = y.hooks) || void 0 === n4 ? void 0 : n4.onAfterResponse) try {
        for (const e4 of y.hooks.onAfterResponse) {
          const t2 = e4(E2, k);
          E2 = t2 instanceof Promise ? await t2 : t2;
        }
      } catch (e4) {
        const r5 = o({ type: t.BROKEN_ON_AFTER_RESPONSE, message: "`onAfterResponse` hook throws error", detail: void 0, response: E2, error: e4, context: E2.context, requestOptions: y }, void 0);
        return N(r5), void C(r5);
      }
      L(E2);
    } });
    if (b && setTimeout(() => {
      if (U) return;
      $.abort(), F = true;
      const e3 = o({ type: t.TIMEOUT, message: b ? `Timeout of ${b}ms exceeded` : "Timeout exceeded", detail: void 0, error: void 0, response: void 0, context: y.context, requestOptions: y }, m);
      B(e3), C(e3);
    }, b), !y.allowGetBody && "GET" === S && x) {
      const e3 = o({ type: t.BAD_REQUEST, message: "Can not send a request with body in 'GET' method.", error: void 0, response: void 0, detail: void 0, context: y.context, requestOptions: y }, void 0);
      throw N(e3), e3;
    }
    return V;
  }
  function l2(e3) {
    return (t2, o2) => c2(Object.assign(Object.assign({}, o2), { method: e3, url: t2 }));
  }
  return { lyla: Object.assign(c2, { get: l2("get"), post: l2("post"), put: l2("put"), patch: l2("patch"), head: l2("head"), delete: l2("delete"), options: l2("options"), trace: l2("trace"), connect: l2("connect"), get errorType() {
    return {};
  } }), isLylaError(e3) {
    return "object" == typeof (t2 = e3) && !!t2 && "__lylaError" in t2;
    var t2;
  } };
}
const { lyla: l, isLylaError: u } = c(e, { context: void 0 }), p = (t2, ...o2) => c(e, t2, ...o2);
export {
  t as LYLA_ERROR,
  r as LylaAbortController,
  e as adapter,
  p as createLyla,
  u as isLylaError,
  l as lyla
};
