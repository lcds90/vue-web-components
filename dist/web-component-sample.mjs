function ms(e, t) {
  const s = /* @__PURE__ */ Object.create(null), n = e.split(",");
  for (let o = 0; o < n.length; o++)
    s[n[o]] = !0;
  return t ? (o) => !!s[o.toLowerCase()] : (o) => !!s[o];
}
const z = {}, Be = [], ue = () => {
}, vo = () => !1, So = /^on[^a-z]/, Dt = (e) => So.test(e), ps = (e) => e.startsWith("onUpdate:"), K = Object.assign, hs = (e, t) => {
  const s = e.indexOf(t);
  s > -1 && e.splice(s, 1);
}, xo = Object.prototype.hasOwnProperty, R = (e, t) => xo.call(e, t), I = Array.isArray, ke = (e) => Rt(e) === "[object Map]", xn = (e) => Rt(e) === "[object Set]", C = (e) => typeof e == "function", k = (e) => typeof e == "string", _s = (e) => typeof e == "symbol", V = (e) => e !== null && typeof e == "object", En = (e) => V(e) && C(e.then) && C(e.catch), wn = Object.prototype.toString, Rt = (e) => wn.call(e), Eo = (e) => Rt(e).slice(8, -1), On = (e) => Rt(e) === "[object Object]", gs = (e) => k(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, wt = /* @__PURE__ */ ms(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
), Lt = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return (s) => t[s] || (t[s] = e(s));
}, wo = /-(\w)/g, Se = Lt((e) => e.replace(wo, (t, s) => s ? s.toUpperCase() : "")), Oo = /\B([A-Z])/g, le = Lt(
  (e) => e.replace(Oo, "-$1").toLowerCase()
), yn = Lt(
  (e) => e.charAt(0).toUpperCase() + e.slice(1)
), $t = Lt(
  (e) => e ? `on${yn(e)}` : ""
), It = (e, t) => !Object.is(e, t), Gt = (e, t) => {
  for (let s = 0; s < e.length; s++)
    e[s](t);
}, Pt = (e, t, s) => {
  Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !1,
    value: s
  });
}, yo = (e) => {
  const t = parseFloat(e);
  return isNaN(t) ? e : t;
}, Us = (e) => {
  const t = k(e) ? Number(e) : NaN;
  return isNaN(t) ? e : t;
};
let Ks;
const es = () => Ks || (Ks = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function bs(e) {
  if (I(e)) {
    const t = {};
    for (let s = 0; s < e.length; s++) {
      const n = e[s], o = k(n) ? Co(n) : bs(n);
      if (o)
        for (const r in o)
          t[r] = o[r];
    }
    return t;
  } else {
    if (k(e))
      return e;
    if (V(e))
      return e;
  }
}
const Io = /;(?![^(]*\))/g, Po = /:([^]+)/, Ao = /\/\*[^]*?\*\//g;
function Co(e) {
  const t = {};
  return e.replace(Ao, "").split(Io).forEach((s) => {
    if (s) {
      const n = s.split(Po);
      n.length > 1 && (t[n[0].trim()] = n[1].trim());
    }
  }), t;
}
function Mt(e) {
  let t = "";
  if (k(e))
    t = e;
  else if (I(e))
    for (let s = 0; s < e.length; s++) {
      const n = Mt(e[s]);
      n && (t += n + " ");
    }
  else if (V(e))
    for (const s in e)
      e[s] && (t += s + " ");
  return t.trim();
}
const No = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", To = /* @__PURE__ */ ms(No);
function In(e) {
  return !!e || e === "";
}
const Do = (e) => k(e) ? e : e == null ? "" : I(e) || V(e) && (e.toString === wn || !C(e.toString)) ? JSON.stringify(e, Pn, 2) : String(e), Pn = (e, t) => t && t.__v_isRef ? Pn(e, t.value) : ke(t) ? {
  [`Map(${t.size})`]: [...t.entries()].reduce((s, [n, o]) => (s[`${n} =>`] = o, s), {})
} : xn(t) ? {
  [`Set(${t.size})`]: [...t.values()]
} : V(t) && !I(t) && !On(t) ? String(t) : t;
let re;
class Ro {
  constructor(t = !1) {
    this.detached = t, this._active = !0, this.effects = [], this.cleanups = [], this.parent = re, !t && re && (this.index = (re.scopes || (re.scopes = [])).push(
      this
    ) - 1);
  }
  get active() {
    return this._active;
  }
  run(t) {
    if (this._active) {
      const s = re;
      try {
        return re = this, t();
      } finally {
        re = s;
      }
    }
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  on() {
    re = this;
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  off() {
    re = this.parent;
  }
  stop(t) {
    if (this._active) {
      let s, n;
      for (s = 0, n = this.effects.length; s < n; s++)
        this.effects[s].stop();
      for (s = 0, n = this.cleanups.length; s < n; s++)
        this.cleanups[s]();
      if (this.scopes)
        for (s = 0, n = this.scopes.length; s < n; s++)
          this.scopes[s].stop(!0);
      if (!this.detached && this.parent && !t) {
        const o = this.parent.scopes.pop();
        o && o !== this && (this.parent.scopes[this.index] = o, o.index = this.index);
      }
      this.parent = void 0, this._active = !1;
    }
  }
}
function Lo(e, t = re) {
  t && t.active && t.effects.push(e);
}
function Mo() {
  return re;
}
const vs = (e) => {
  const t = new Set(e);
  return t.w = 0, t.n = 0, t;
}, An = (e) => (e.w & Ae) > 0, Cn = (e) => (e.n & Ae) > 0, Wo = ({ deps: e }) => {
  if (e.length)
    for (let t = 0; t < e.length; t++)
      e[t].w |= Ae;
}, jo = (e) => {
  const { deps: t } = e;
  if (t.length) {
    let s = 0;
    for (let n = 0; n < t.length; n++) {
      const o = t[n];
      An(o) && !Cn(o) ? o.delete(e) : t[s++] = o, o.w &= ~Ae, o.n &= ~Ae;
    }
    t.length = s;
  }
}, ts = /* @__PURE__ */ new WeakMap();
let st = 0, Ae = 1;
const ss = 30;
let ce;
const ze = Symbol(""), ns = Symbol("");
class Ss {
  constructor(t, s = null, n) {
    this.fn = t, this.scheduler = s, this.active = !0, this.deps = [], this.parent = void 0, Lo(this, n);
  }
  run() {
    if (!this.active)
      return this.fn();
    let t = ce, s = Ie;
    for (; t; ) {
      if (t === this)
        return;
      t = t.parent;
    }
    try {
      return this.parent = ce, ce = this, Ie = !0, Ae = 1 << ++st, st <= ss ? Wo(this) : Bs(this), this.fn();
    } finally {
      st <= ss && jo(this), Ae = 1 << --st, ce = this.parent, Ie = s, this.parent = void 0, this.deferStop && this.stop();
    }
  }
  stop() {
    ce === this ? this.deferStop = !0 : this.active && (Bs(this), this.onStop && this.onStop(), this.active = !1);
  }
}
function Bs(e) {
  const { deps: t } = e;
  if (t.length) {
    for (let s = 0; s < t.length; s++)
      t[s].delete(e);
    t.length = 0;
  }
}
let Ie = !0;
const Nn = [];
function qe() {
  Nn.push(Ie), Ie = !1;
}
function Je() {
  const e = Nn.pop();
  Ie = e === void 0 ? !0 : e;
}
function se(e, t, s) {
  if (Ie && ce) {
    let n = ts.get(e);
    n || ts.set(e, n = /* @__PURE__ */ new Map());
    let o = n.get(s);
    o || n.set(s, o = vs()), Tn(o);
  }
}
function Tn(e, t) {
  let s = !1;
  st <= ss ? Cn(e) || (e.n |= Ae, s = !An(e)) : s = !e.has(ce), s && (e.add(ce), ce.deps.push(e));
}
function xe(e, t, s, n, o, r) {
  const l = ts.get(e);
  if (!l)
    return;
  let f = [];
  if (t === "clear")
    f = [...l.values()];
  else if (s === "length" && I(e)) {
    const u = Number(n);
    l.forEach((a, _) => {
      (_ === "length" || _ >= u) && f.push(a);
    });
  } else
    switch (s !== void 0 && f.push(l.get(s)), t) {
      case "add":
        I(e) ? gs(s) && f.push(l.get("length")) : (f.push(l.get(ze)), ke(e) && f.push(l.get(ns)));
        break;
      case "delete":
        I(e) || (f.push(l.get(ze)), ke(e) && f.push(l.get(ns)));
        break;
      case "set":
        ke(e) && f.push(l.get(ze));
        break;
    }
  if (f.length === 1)
    f[0] && os(f[0]);
  else {
    const u = [];
    for (const a of f)
      a && u.push(...a);
    os(vs(u));
  }
}
function os(e, t) {
  const s = I(e) ? e : [...e];
  for (const n of s)
    n.computed && ks(n);
  for (const n of s)
    n.computed || ks(n);
}
function ks(e, t) {
  (e !== ce || e.allowRecurse) && (e.scheduler ? e.scheduler() : e.run());
}
const zo = /* @__PURE__ */ ms("__proto__,__v_isRef,__isVue"), Dn = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(_s)
), Fo = /* @__PURE__ */ xs(), Vo = /* @__PURE__ */ xs(!1, !0), Ho = /* @__PURE__ */ xs(!0), $s = /* @__PURE__ */ Uo();
function Uo() {
  const e = {};
  return ["includes", "indexOf", "lastIndexOf"].forEach((t) => {
    e[t] = function(...s) {
      const n = L(this);
      for (let r = 0, l = this.length; r < l; r++)
        se(n, "get", r + "");
      const o = n[t](...s);
      return o === -1 || o === !1 ? n[t](...s.map(L)) : o;
    };
  }), ["push", "pop", "shift", "unshift", "splice"].forEach((t) => {
    e[t] = function(...s) {
      qe();
      const n = L(this)[t].apply(this, s);
      return Je(), n;
    };
  }), e;
}
function Ko(e) {
  const t = L(this);
  return se(t, "has", e), t.hasOwnProperty(e);
}
function xs(e = !1, t = !1) {
  return function(n, o, r) {
    if (o === "__v_isReactive")
      return !e;
    if (o === "__v_isReadonly")
      return e;
    if (o === "__v_isShallow")
      return t;
    if (o === "__v_raw" && r === (e ? t ? rr : jn : t ? Wn : Mn).get(n))
      return n;
    const l = I(n);
    if (!e) {
      if (l && R($s, o))
        return Reflect.get($s, o, r);
      if (o === "hasOwnProperty")
        return Ko;
    }
    const f = Reflect.get(n, o, r);
    return (_s(o) ? Dn.has(o) : zo(o)) || (e || se(n, "get", o), t) ? f : Q(f) ? l && gs(o) ? f : f.value : V(f) ? e ? zn(f) : Os(f) : f;
  };
}
const Bo = /* @__PURE__ */ Rn(), ko = /* @__PURE__ */ Rn(!0);
function Rn(e = !1) {
  return function(s, n, o, r) {
    let l = s[n];
    if (lt(l) && Q(l) && !Q(o))
      return !1;
    if (!e && (!rs(o) && !lt(o) && (l = L(l), o = L(o)), !I(s) && Q(l) && !Q(o)))
      return l.value = o, !0;
    const f = I(s) && gs(n) ? Number(n) < s.length : R(s, n), u = Reflect.set(s, n, o, r);
    return s === L(r) && (f ? It(o, l) && xe(s, "set", n, o) : xe(s, "add", n, o)), u;
  };
}
function $o(e, t) {
  const s = R(e, t);
  e[t];
  const n = Reflect.deleteProperty(e, t);
  return n && s && xe(e, "delete", t, void 0), n;
}
function Go(e, t) {
  const s = Reflect.has(e, t);
  return (!_s(t) || !Dn.has(t)) && se(e, "has", t), s;
}
function Yo(e) {
  return se(e, "iterate", I(e) ? "length" : ze), Reflect.ownKeys(e);
}
const Ln = {
  get: Fo,
  set: Bo,
  deleteProperty: $o,
  has: Go,
  ownKeys: Yo
}, Xo = {
  get: Ho,
  set(e, t) {
    return !0;
  },
  deleteProperty(e, t) {
    return !0;
  }
}, qo = /* @__PURE__ */ K(
  {},
  Ln,
  {
    get: Vo,
    set: ko
  }
), Es = (e) => e, Wt = (e) => Reflect.getPrototypeOf(e);
function gt(e, t, s = !1, n = !1) {
  e = e.__v_raw;
  const o = L(e), r = L(t);
  s || (t !== r && se(o, "get", t), se(o, "get", r));
  const { has: l } = Wt(o), f = n ? Es : s ? Ps : Is;
  if (l.call(o, t))
    return f(e.get(t));
  if (l.call(o, r))
    return f(e.get(r));
  e !== o && e.get(t);
}
function bt(e, t = !1) {
  const s = this.__v_raw, n = L(s), o = L(e);
  return t || (e !== o && se(n, "has", e), se(n, "has", o)), e === o ? s.has(e) : s.has(e) || s.has(o);
}
function vt(e, t = !1) {
  return e = e.__v_raw, !t && se(L(e), "iterate", ze), Reflect.get(e, "size", e);
}
function Gs(e) {
  e = L(e);
  const t = L(this);
  return Wt(t).has.call(t, e) || (t.add(e), xe(t, "add", e, e)), this;
}
function Ys(e, t) {
  t = L(t);
  const s = L(this), { has: n, get: o } = Wt(s);
  let r = n.call(s, e);
  r || (e = L(e), r = n.call(s, e));
  const l = o.call(s, e);
  return s.set(e, t), r ? It(t, l) && xe(s, "set", e, t) : xe(s, "add", e, t), this;
}
function Xs(e) {
  const t = L(this), { has: s, get: n } = Wt(t);
  let o = s.call(t, e);
  o || (e = L(e), o = s.call(t, e)), n && n.call(t, e);
  const r = t.delete(e);
  return o && xe(t, "delete", e, void 0), r;
}
function qs() {
  const e = L(this), t = e.size !== 0, s = e.clear();
  return t && xe(e, "clear", void 0, void 0), s;
}
function St(e, t) {
  return function(n, o) {
    const r = this, l = r.__v_raw, f = L(l), u = t ? Es : e ? Ps : Is;
    return !e && se(f, "iterate", ze), l.forEach((a, _) => n.call(o, u(a), u(_), r));
  };
}
function xt(e, t, s) {
  return function(...n) {
    const o = this.__v_raw, r = L(o), l = ke(r), f = e === "entries" || e === Symbol.iterator && l, u = e === "keys" && l, a = o[e](...n), _ = s ? Es : t ? Ps : Is;
    return !t && se(
      r,
      "iterate",
      u ? ns : ze
    ), {
      // iterator protocol
      next() {
        const { value: x, done: w } = a.next();
        return w ? { value: x, done: w } : {
          value: f ? [_(x[0]), _(x[1])] : _(x),
          done: w
        };
      },
      // iterable protocol
      [Symbol.iterator]() {
        return this;
      }
    };
  };
}
function Oe(e) {
  return function(...t) {
    return e === "delete" ? !1 : this;
  };
}
function Jo() {
  const e = {
    get(r) {
      return gt(this, r);
    },
    get size() {
      return vt(this);
    },
    has: bt,
    add: Gs,
    set: Ys,
    delete: Xs,
    clear: qs,
    forEach: St(!1, !1)
  }, t = {
    get(r) {
      return gt(this, r, !1, !0);
    },
    get size() {
      return vt(this);
    },
    has: bt,
    add: Gs,
    set: Ys,
    delete: Xs,
    clear: qs,
    forEach: St(!1, !0)
  }, s = {
    get(r) {
      return gt(this, r, !0);
    },
    get size() {
      return vt(this, !0);
    },
    has(r) {
      return bt.call(this, r, !0);
    },
    add: Oe("add"),
    set: Oe("set"),
    delete: Oe("delete"),
    clear: Oe("clear"),
    forEach: St(!0, !1)
  }, n = {
    get(r) {
      return gt(this, r, !0, !0);
    },
    get size() {
      return vt(this, !0);
    },
    has(r) {
      return bt.call(this, r, !0);
    },
    add: Oe("add"),
    set: Oe("set"),
    delete: Oe("delete"),
    clear: Oe("clear"),
    forEach: St(!0, !0)
  };
  return ["keys", "values", "entries", Symbol.iterator].forEach((r) => {
    e[r] = xt(
      r,
      !1,
      !1
    ), s[r] = xt(
      r,
      !0,
      !1
    ), t[r] = xt(
      r,
      !1,
      !0
    ), n[r] = xt(
      r,
      !0,
      !0
    );
  }), [
    e,
    s,
    t,
    n
  ];
}
const [
  Zo,
  Qo,
  er,
  tr
] = /* @__PURE__ */ Jo();
function ws(e, t) {
  const s = t ? e ? tr : er : e ? Qo : Zo;
  return (n, o, r) => o === "__v_isReactive" ? !e : o === "__v_isReadonly" ? e : o === "__v_raw" ? n : Reflect.get(
    R(s, o) && o in n ? s : n,
    o,
    r
  );
}
const sr = {
  get: /* @__PURE__ */ ws(!1, !1)
}, nr = {
  get: /* @__PURE__ */ ws(!1, !0)
}, or = {
  get: /* @__PURE__ */ ws(!0, !1)
}, Mn = /* @__PURE__ */ new WeakMap(), Wn = /* @__PURE__ */ new WeakMap(), jn = /* @__PURE__ */ new WeakMap(), rr = /* @__PURE__ */ new WeakMap();
function ir(e) {
  switch (e) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function lr(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : ir(Eo(e));
}
function Os(e) {
  return lt(e) ? e : ys(
    e,
    !1,
    Ln,
    sr,
    Mn
  );
}
function cr(e) {
  return ys(
    e,
    !1,
    qo,
    nr,
    Wn
  );
}
function zn(e) {
  return ys(
    e,
    !0,
    Xo,
    or,
    jn
  );
}
function ys(e, t, s, n, o) {
  if (!V(e) || e.__v_raw && !(t && e.__v_isReactive))
    return e;
  const r = o.get(e);
  if (r)
    return r;
  const l = lr(e);
  if (l === 0)
    return e;
  const f = new Proxy(
    e,
    l === 2 ? n : s
  );
  return o.set(e, f), f;
}
function $e(e) {
  return lt(e) ? $e(e.__v_raw) : !!(e && e.__v_isReactive);
}
function lt(e) {
  return !!(e && e.__v_isReadonly);
}
function rs(e) {
  return !!(e && e.__v_isShallow);
}
function Fn(e) {
  return $e(e) || lt(e);
}
function L(e) {
  const t = e && e.__v_raw;
  return t ? L(t) : e;
}
function Vn(e) {
  return Pt(e, "__v_skip", !0), e;
}
const Is = (e) => V(e) ? Os(e) : e, Ps = (e) => V(e) ? zn(e) : e;
function fr(e) {
  Ie && ce && (e = L(e), Tn(e.dep || (e.dep = vs())));
}
function ur(e, t) {
  e = L(e);
  const s = e.dep;
  s && os(s);
}
function Q(e) {
  return !!(e && e.__v_isRef === !0);
}
function ar(e) {
  return Q(e) ? e.value : e;
}
const dr = {
  get: (e, t, s) => ar(Reflect.get(e, t, s)),
  set: (e, t, s, n) => {
    const o = e[t];
    return Q(o) && !Q(s) ? (o.value = s, !0) : Reflect.set(e, t, s, n);
  }
};
function Hn(e) {
  return $e(e) ? e : new Proxy(e, dr);
}
class mr {
  constructor(t, s, n, o) {
    this._setter = s, this.dep = void 0, this.__v_isRef = !0, this.__v_isReadonly = !1, this._dirty = !0, this.effect = new Ss(t, () => {
      this._dirty || (this._dirty = !0, ur(this));
    }), this.effect.computed = this, this.effect.active = this._cacheable = !o, this.__v_isReadonly = n;
  }
  get value() {
    const t = L(this);
    return fr(t), (t._dirty || !t._cacheable) && (t._dirty = !1, t._value = t.effect.run()), t._value;
  }
  set value(t) {
    this._setter(t);
  }
}
function pr(e, t, s = !1) {
  let n, o;
  const r = C(e);
  return r ? (n = e, o = ue) : (n = e.get, o = e.set), new mr(n, o, r || !o, s);
}
function Pe(e, t, s, n) {
  let o;
  try {
    o = n ? e(...n) : e();
  } catch (r) {
    jt(r, t, s);
  }
  return o;
}
function ae(e, t, s, n) {
  if (C(e)) {
    const r = Pe(e, t, s, n);
    return r && En(r) && r.catch((l) => {
      jt(l, t, s);
    }), r;
  }
  const o = [];
  for (let r = 0; r < e.length; r++)
    o.push(ae(e[r], t, s, n));
  return o;
}
function jt(e, t, s, n = !0) {
  const o = t ? t.vnode : null;
  if (t) {
    let r = t.parent;
    const l = t.proxy, f = s;
    for (; r; ) {
      const a = r.ec;
      if (a) {
        for (let _ = 0; _ < a.length; _++)
          if (a[_](e, l, f) === !1)
            return;
      }
      r = r.parent;
    }
    const u = t.appContext.config.errorHandler;
    if (u) {
      Pe(
        u,
        null,
        10,
        [e, l, f]
      );
      return;
    }
  }
  hr(e, s, o, n);
}
function hr(e, t, s, n = !0) {
  console.error(e);
}
let ct = !1, is = !1;
const X = [];
let ge = 0;
const Ge = [];
let ve = null, We = 0;
const Un = /* @__PURE__ */ Promise.resolve();
let As = null;
function Kn(e) {
  const t = As || Un;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function _r(e) {
  let t = ge + 1, s = X.length;
  for (; t < s; ) {
    const n = t + s >>> 1;
    ft(X[n]) < e ? t = n + 1 : s = n;
  }
  return t;
}
function Cs(e) {
  (!X.length || !X.includes(
    e,
    ct && e.allowRecurse ? ge + 1 : ge
  )) && (e.id == null ? X.push(e) : X.splice(_r(e.id), 0, e), Bn());
}
function Bn() {
  !ct && !is && (is = !0, As = Un.then($n));
}
function gr(e) {
  const t = X.indexOf(e);
  t > ge && X.splice(t, 1);
}
function br(e) {
  I(e) ? Ge.push(...e) : (!ve || !ve.includes(
    e,
    e.allowRecurse ? We + 1 : We
  )) && Ge.push(e), Bn();
}
function Js(e, t = ct ? ge + 1 : 0) {
  for (; t < X.length; t++) {
    const s = X[t];
    s && s.pre && (X.splice(t, 1), t--, s());
  }
}
function kn(e) {
  if (Ge.length) {
    const t = [...new Set(Ge)];
    if (Ge.length = 0, ve) {
      ve.push(...t);
      return;
    }
    for (ve = t, ve.sort((s, n) => ft(s) - ft(n)), We = 0; We < ve.length; We++)
      ve[We]();
    ve = null, We = 0;
  }
}
const ft = (e) => e.id == null ? 1 / 0 : e.id, vr = (e, t) => {
  const s = ft(e) - ft(t);
  if (s === 0) {
    if (e.pre && !t.pre)
      return -1;
    if (t.pre && !e.pre)
      return 1;
  }
  return s;
};
function $n(e) {
  is = !1, ct = !0, X.sort(vr);
  const t = ue;
  try {
    for (ge = 0; ge < X.length; ge++) {
      const s = X[ge];
      s && s.active !== !1 && Pe(s, null, 14);
    }
  } finally {
    ge = 0, X.length = 0, kn(), ct = !1, As = null, (X.length || Ge.length) && $n();
  }
}
function Sr(e, t, ...s) {
  if (e.isUnmounted)
    return;
  const n = e.vnode.props || z;
  let o = s;
  const r = t.startsWith("update:"), l = r && t.slice(7);
  if (l && l in n) {
    const _ = `${l === "modelValue" ? "model" : l}Modifiers`, { number: x, trim: w } = n[_] || z;
    w && (o = s.map((A) => k(A) ? A.trim() : A)), x && (o = s.map(yo));
  }
  let f, u = n[f = $t(t)] || // also try camelCase event handler (#2249)
  n[f = $t(Se(t))];
  !u && r && (u = n[f = $t(le(t))]), u && ae(
    u,
    e,
    6,
    o
  );
  const a = n[f + "Once"];
  if (a) {
    if (!e.emitted)
      e.emitted = {};
    else if (e.emitted[f])
      return;
    e.emitted[f] = !0, ae(
      a,
      e,
      6,
      o
    );
  }
}
function Gn(e, t, s = !1) {
  const n = t.emitsCache, o = n.get(e);
  if (o !== void 0)
    return o;
  const r = e.emits;
  let l = {}, f = !1;
  if (!C(e)) {
    const u = (a) => {
      const _ = Gn(a, t, !0);
      _ && (f = !0, K(l, _));
    };
    !s && t.mixins.length && t.mixins.forEach(u), e.extends && u(e.extends), e.mixins && e.mixins.forEach(u);
  }
  return !r && !f ? (V(e) && n.set(e, null), null) : (I(r) ? r.forEach((u) => l[u] = null) : K(l, r), V(e) && n.set(e, l), l);
}
function zt(e, t) {
  return !e || !Dt(t) ? !1 : (t = t.slice(2).replace(/Once$/, ""), R(e, t[0].toLowerCase() + t.slice(1)) || R(e, le(t)) || R(e, t));
}
let te = null, Yn = null;
function At(e) {
  const t = te;
  return te = e, Yn = e && e.type.__scopeId || null, t;
}
function xr(e, t = te, s) {
  if (!t || e._n)
    return e;
  const n = (...o) => {
    n._d && cn(-1);
    const r = At(t);
    let l;
    try {
      l = e(...o);
    } finally {
      At(r), n._d && cn(1);
    }
    return l;
  };
  return n._n = !0, n._c = !0, n._d = !0, n;
}
function Yt(e) {
  const {
    type: t,
    vnode: s,
    proxy: n,
    withProxy: o,
    props: r,
    propsOptions: [l],
    slots: f,
    attrs: u,
    emit: a,
    render: _,
    renderCache: x,
    data: w,
    setupState: A,
    ctx: H,
    inheritAttrs: D
  } = e;
  let B, $;
  const G = At(e);
  try {
    if (s.shapeFlag & 4) {
      const N = o || n;
      B = _e(
        _.call(
          N,
          N,
          x,
          r,
          A,
          w,
          H
        )
      ), $ = u;
    } else {
      const N = t;
      B = _e(
        N.length > 1 ? N(
          r,
          { attrs: u, slots: f, emit: a }
        ) : N(
          r,
          null
          /* we know it doesn't need it */
        )
      ), $ = t.props ? u : Er(u);
    }
  } catch (N) {
    it.length = 0, jt(N, e, 1), B = de(Ce);
  }
  let Y = B;
  if ($ && D !== !1) {
    const N = Object.keys($), { shapeFlag: we } = Y;
    N.length && we & 7 && (l && N.some(ps) && ($ = wr(
      $,
      l
    )), Y = Ye(Y, $));
  }
  return s.dirs && (Y = Ye(Y), Y.dirs = Y.dirs ? Y.dirs.concat(s.dirs) : s.dirs), s.transition && (Y.transition = s.transition), B = Y, At(G), B;
}
const Er = (e) => {
  let t;
  for (const s in e)
    (s === "class" || s === "style" || Dt(s)) && ((t || (t = {}))[s] = e[s]);
  return t;
}, wr = (e, t) => {
  const s = {};
  for (const n in e)
    (!ps(n) || !(n.slice(9) in t)) && (s[n] = e[n]);
  return s;
};
function Or(e, t, s) {
  const { props: n, children: o, component: r } = e, { props: l, children: f, patchFlag: u } = t, a = r.emitsOptions;
  if (t.dirs || t.transition)
    return !0;
  if (s && u >= 0) {
    if (u & 1024)
      return !0;
    if (u & 16)
      return n ? Zs(n, l, a) : !!l;
    if (u & 8) {
      const _ = t.dynamicProps;
      for (let x = 0; x < _.length; x++) {
        const w = _[x];
        if (l[w] !== n[w] && !zt(a, w))
          return !0;
      }
    }
  } else
    return (o || f) && (!f || !f.$stable) ? !0 : n === l ? !1 : n ? l ? Zs(n, l, a) : !0 : !!l;
  return !1;
}
function Zs(e, t, s) {
  const n = Object.keys(t);
  if (n.length !== Object.keys(e).length)
    return !0;
  for (let o = 0; o < n.length; o++) {
    const r = n[o];
    if (t[r] !== e[r] && !zt(s, r))
      return !0;
  }
  return !1;
}
function yr({ vnode: e, parent: t }, s) {
  for (; t && t.subTree === e; )
    (e = t.vnode).el = s, t = t.parent;
}
const Ir = (e) => e.__isSuspense;
function Pr(e, t) {
  t && t.pendingBranch ? I(e) ? t.effects.push(...e) : t.effects.push(e) : br(e);
}
const Et = {};
function Xt(e, t, s) {
  return Xn(e, t, s);
}
function Xn(e, t, { immediate: s, deep: n, flush: o, onTrack: r, onTrigger: l } = z) {
  var f;
  const u = Mo() === ((f = q) == null ? void 0 : f.scope) ? q : null;
  let a, _ = !1, x = !1;
  if (Q(e) ? (a = () => e.value, _ = rs(e)) : $e(e) ? (a = () => e, n = !0) : I(e) ? (x = !0, _ = e.some((N) => $e(N) || rs(N)), a = () => e.map((N) => {
    if (Q(N))
      return N.value;
    if ($e(N))
      return Ke(N);
    if (C(N))
      return Pe(N, u, 2);
  })) : C(e) ? t ? a = () => Pe(e, u, 2) : a = () => {
    if (!(u && u.isUnmounted))
      return w && w(), ae(
        e,
        u,
        3,
        [A]
      );
  } : a = ue, t && n) {
    const N = a;
    a = () => Ke(N());
  }
  let w, A = (N) => {
    w = G.onStop = () => {
      Pe(N, u, 4);
    };
  }, H;
  if (at)
    if (A = ue, t ? s && ae(t, u, 3, [
      a(),
      x ? [] : void 0,
      A
    ]) : a(), o === "sync") {
      const N = Oi();
      H = N.__watcherHandles || (N.__watcherHandles = []);
    } else
      return ue;
  let D = x ? new Array(e.length).fill(Et) : Et;
  const B = () => {
    if (G.active)
      if (t) {
        const N = G.run();
        (n || _ || (x ? N.some(
          (we, Ze) => It(we, D[Ze])
        ) : It(N, D))) && (w && w(), ae(t, u, 3, [
          N,
          // pass undefined as the old value when it's changed for the first time
          D === Et ? void 0 : x && D[0] === Et ? [] : D,
          A
        ]), D = N);
      } else
        G.run();
  };
  B.allowRecurse = !!t;
  let $;
  o === "sync" ? $ = B : o === "post" ? $ = () => ee(B, u && u.suspense) : (B.pre = !0, u && (B.id = u.uid), $ = () => Cs(B));
  const G = new Ss(a, $);
  t ? s ? B() : D = G.run() : o === "post" ? ee(
    G.run.bind(G),
    u && u.suspense
  ) : G.run();
  const Y = () => {
    G.stop(), u && u.scope && hs(u.scope.effects, G);
  };
  return H && H.push(Y), Y;
}
function Ar(e, t, s) {
  const n = this.proxy, o = k(e) ? e.includes(".") ? qn(n, e) : () => n[e] : e.bind(n, n);
  let r;
  C(t) ? r = t : (r = t.handler, s = t);
  const l = q;
  Xe(this);
  const f = Xn(o, r.bind(n), s);
  return l ? Xe(l) : Fe(), f;
}
function qn(e, t) {
  const s = t.split(".");
  return () => {
    let n = e;
    for (let o = 0; o < s.length && n; o++)
      n = n[s[o]];
    return n;
  };
}
function Ke(e, t) {
  if (!V(e) || e.__v_skip || (t = t || /* @__PURE__ */ new Set(), t.has(e)))
    return e;
  if (t.add(e), Q(e))
    Ke(e.value, t);
  else if (I(e))
    for (let s = 0; s < e.length; s++)
      Ke(e[s], t);
  else if (xn(e) || ke(e))
    e.forEach((s) => {
      Ke(s, t);
    });
  else if (On(e))
    for (const s in e)
      Ke(e[s], t);
  return e;
}
function Le(e, t, s, n) {
  const o = e.dirs, r = t && t.dirs;
  for (let l = 0; l < o.length; l++) {
    const f = o[l];
    r && (f.oldValue = r[l].value);
    let u = f.dir[n];
    u && (qe(), ae(u, s, 8, [
      e.el,
      f,
      e,
      t
    ]), Je());
  }
}
function Cr(e, t) {
  return C(e) ? (
    // #8326: extend call and options.name access are considered side-effects
    // by Rollup, so we have to wrap it in a pure-annotated IIFE.
    /* @__PURE__ */ (() => K({ name: e.name }, t, { setup: e }))()
  ) : e;
}
const ot = (e) => !!e.type.__asyncLoader, Jn = (e) => e.type.__isKeepAlive;
function Nr(e, t) {
  Zn(e, "a", t);
}
function Tr(e, t) {
  Zn(e, "da", t);
}
function Zn(e, t, s = q) {
  const n = e.__wdc || (e.__wdc = () => {
    let o = s;
    for (; o; ) {
      if (o.isDeactivated)
        return;
      o = o.parent;
    }
    return e();
  });
  if (Ft(t, n, s), s) {
    let o = s.parent;
    for (; o && o.parent; )
      Jn(o.parent.vnode) && Dr(n, t, s, o), o = o.parent;
  }
}
function Dr(e, t, s, n) {
  const o = Ft(
    t,
    e,
    n,
    !0
    /* prepend */
  );
  Qn(() => {
    hs(n[t], o);
  }, s);
}
function Ft(e, t, s = q, n = !1) {
  if (s) {
    const o = s[e] || (s[e] = []), r = t.__weh || (t.__weh = (...l) => {
      if (s.isUnmounted)
        return;
      qe(), Xe(s);
      const f = ae(t, s, e, l);
      return Fe(), Je(), f;
    });
    return n ? o.unshift(r) : o.push(r), r;
  }
}
const Ee = (e) => (t, s = q) => (
  // post-create lifecycle registrations are noops during SSR (except for serverPrefetch)
  (!at || e === "sp") && Ft(e, (...n) => t(...n), s)
), Rr = Ee("bm"), Lr = Ee("m"), Mr = Ee("bu"), Wr = Ee("u"), jr = Ee("bum"), Qn = Ee("um"), zr = Ee("sp"), Fr = Ee(
  "rtg"
), Vr = Ee(
  "rtc"
);
function Hr(e, t = q) {
  Ft("ec", e, t);
}
const Ur = Symbol.for("v-ndc");
function Kr(e, t, s = {}, n, o) {
  if (te.isCE || te.parent && ot(te.parent) && te.parent.isCE)
    return t !== "default" && (s.name = t), de("slot", s, n && n());
  let r = e[t];
  r && r._c && (r._d = !1), Tt();
  const l = r && eo(r(s)), f = uo(
    ie,
    {
      key: s.key || // slot content array of a dynamic conditional slot may have a branch
      // key attached in the `createSlots` helper, respect that
      l && l.key || `_${t}`
    },
    l || (n ? n() : []),
    l && e._ === 1 ? 64 : -2
  );
  return !o && f.scopeId && (f.slotScopeIds = [f.scopeId + "-s"]), r && r._c && (r._d = !0), f;
}
function eo(e) {
  return e.some((t) => ao(t) ? !(t.type === Ce || t.type === ie && !eo(t.children)) : !0) ? e : null;
}
const ls = (e) => e ? ho(e) ? Ls(e) || e.proxy : ls(e.parent) : null, rt = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ K(/* @__PURE__ */ Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => e.props,
    $attrs: (e) => e.attrs,
    $slots: (e) => e.slots,
    $refs: (e) => e.refs,
    $parent: (e) => ls(e.parent),
    $root: (e) => ls(e.root),
    $emit: (e) => e.emit,
    $options: (e) => Ns(e),
    $forceUpdate: (e) => e.f || (e.f = () => Cs(e.update)),
    $nextTick: (e) => e.n || (e.n = Kn.bind(e.proxy)),
    $watch: (e) => Ar.bind(e)
  })
), qt = (e, t) => e !== z && !e.__isScriptSetup && R(e, t), Br = {
  get({ _: e }, t) {
    const { ctx: s, setupState: n, data: o, props: r, accessCache: l, type: f, appContext: u } = e;
    let a;
    if (t[0] !== "$") {
      const A = l[t];
      if (A !== void 0)
        switch (A) {
          case 1:
            return n[t];
          case 2:
            return o[t];
          case 4:
            return s[t];
          case 3:
            return r[t];
        }
      else {
        if (qt(n, t))
          return l[t] = 1, n[t];
        if (o !== z && R(o, t))
          return l[t] = 2, o[t];
        if (
          // only cache other properties when instance has declared (thus stable)
          // props
          (a = e.propsOptions[0]) && R(a, t)
        )
          return l[t] = 3, r[t];
        if (s !== z && R(s, t))
          return l[t] = 4, s[t];
        cs && (l[t] = 0);
      }
    }
    const _ = rt[t];
    let x, w;
    if (_)
      return t === "$attrs" && se(e, "get", t), _(e);
    if (
      // css module (injected by vue-loader)
      (x = f.__cssModules) && (x = x[t])
    )
      return x;
    if (s !== z && R(s, t))
      return l[t] = 4, s[t];
    if (
      // global properties
      w = u.config.globalProperties, R(w, t)
    )
      return w[t];
  },
  set({ _: e }, t, s) {
    const { data: n, setupState: o, ctx: r } = e;
    return qt(o, t) ? (o[t] = s, !0) : n !== z && R(n, t) ? (n[t] = s, !0) : R(e.props, t) || t[0] === "$" && t.slice(1) in e ? !1 : (r[t] = s, !0);
  },
  has({
    _: { data: e, setupState: t, accessCache: s, ctx: n, appContext: o, propsOptions: r }
  }, l) {
    let f;
    return !!s[l] || e !== z && R(e, l) || qt(t, l) || (f = r[0]) && R(f, l) || R(n, l) || R(rt, l) || R(o.config.globalProperties, l);
  },
  defineProperty(e, t, s) {
    return s.get != null ? e._.accessCache[t] = 0 : R(s, "value") && this.set(e, t, s.value, null), Reflect.defineProperty(e, t, s);
  }
};
function Qs(e) {
  return I(e) ? e.reduce(
    (t, s) => (t[s] = null, t),
    {}
  ) : e;
}
let cs = !0;
function kr(e) {
  const t = Ns(e), s = e.proxy, n = e.ctx;
  cs = !1, t.beforeCreate && en(t.beforeCreate, e, "bc");
  const {
    // state
    data: o,
    computed: r,
    methods: l,
    watch: f,
    provide: u,
    inject: a,
    // lifecycle
    created: _,
    beforeMount: x,
    mounted: w,
    beforeUpdate: A,
    updated: H,
    activated: D,
    deactivated: B,
    beforeDestroy: $,
    beforeUnmount: G,
    destroyed: Y,
    unmounted: N,
    render: we,
    renderTracked: Ze,
    renderTriggered: dt,
    errorCaptured: Ne,
    serverPrefetch: Ut,
    // public API
    expose: Te,
    inheritAttrs: Qe,
    // assets
    components: mt,
    directives: pt,
    filters: Kt
  } = t;
  if (a && $r(a, n, null), l)
    for (const F in l) {
      const W = l[F];
      C(W) && (n[F] = W.bind(s));
    }
  if (o) {
    const F = o.call(s, s);
    V(F) && (e.data = Os(F));
  }
  if (cs = !0, r)
    for (const F in r) {
      const W = r[F], De = C(W) ? W.bind(s, s) : C(W.get) ? W.get.bind(s, s) : ue, ht = !C(W) && C(W.set) ? W.set.bind(s) : ue, Re = Ei({
        get: De,
        set: ht
      });
      Object.defineProperty(n, F, {
        enumerable: !0,
        configurable: !0,
        get: () => Re.value,
        set: (me) => Re.value = me
      });
    }
  if (f)
    for (const F in f)
      to(f[F], n, s, F);
  if (u) {
    const F = C(u) ? u.call(s) : u;
    Reflect.ownKeys(F).forEach((W) => {
      Zr(W, F[W]);
    });
  }
  _ && en(_, e, "c");
  function J(F, W) {
    I(W) ? W.forEach((De) => F(De.bind(s))) : W && F(W.bind(s));
  }
  if (J(Rr, x), J(Lr, w), J(Mr, A), J(Wr, H), J(Nr, D), J(Tr, B), J(Hr, Ne), J(Vr, Ze), J(Fr, dt), J(jr, G), J(Qn, N), J(zr, Ut), I(Te))
    if (Te.length) {
      const F = e.exposed || (e.exposed = {});
      Te.forEach((W) => {
        Object.defineProperty(F, W, {
          get: () => s[W],
          set: (De) => s[W] = De
        });
      });
    } else
      e.exposed || (e.exposed = {});
  we && e.render === ue && (e.render = we), Qe != null && (e.inheritAttrs = Qe), mt && (e.components = mt), pt && (e.directives = pt);
}
function $r(e, t, s = ue) {
  I(e) && (e = fs(e));
  for (const n in e) {
    const o = e[n];
    let r;
    V(o) ? "default" in o ? r = Ot(
      o.from || n,
      o.default,
      !0
      /* treat default function as factory */
    ) : r = Ot(o.from || n) : r = Ot(o), Q(r) ? Object.defineProperty(t, n, {
      enumerable: !0,
      configurable: !0,
      get: () => r.value,
      set: (l) => r.value = l
    }) : t[n] = r;
  }
}
function en(e, t, s) {
  ae(
    I(e) ? e.map((n) => n.bind(t.proxy)) : e.bind(t.proxy),
    t,
    s
  );
}
function to(e, t, s, n) {
  const o = n.includes(".") ? qn(s, n) : () => s[n];
  if (k(e)) {
    const r = t[e];
    C(r) && Xt(o, r);
  } else if (C(e))
    Xt(o, e.bind(s));
  else if (V(e))
    if (I(e))
      e.forEach((r) => to(r, t, s, n));
    else {
      const r = C(e.handler) ? e.handler.bind(s) : t[e.handler];
      C(r) && Xt(o, r, e);
    }
}
function Ns(e) {
  const t = e.type, { mixins: s, extends: n } = t, {
    mixins: o,
    optionsCache: r,
    config: { optionMergeStrategies: l }
  } = e.appContext, f = r.get(t);
  let u;
  return f ? u = f : !o.length && !s && !n ? u = t : (u = {}, o.length && o.forEach(
    (a) => Ct(u, a, l, !0)
  ), Ct(u, t, l)), V(t) && r.set(t, u), u;
}
function Ct(e, t, s, n = !1) {
  const { mixins: o, extends: r } = t;
  r && Ct(e, r, s, !0), o && o.forEach(
    (l) => Ct(e, l, s, !0)
  );
  for (const l in t)
    if (!(n && l === "expose")) {
      const f = Gr[l] || s && s[l];
      e[l] = f ? f(e[l], t[l]) : t[l];
    }
  return e;
}
const Gr = {
  data: tn,
  props: sn,
  emits: sn,
  // objects
  methods: nt,
  computed: nt,
  // lifecycle
  beforeCreate: Z,
  created: Z,
  beforeMount: Z,
  mounted: Z,
  beforeUpdate: Z,
  updated: Z,
  beforeDestroy: Z,
  beforeUnmount: Z,
  destroyed: Z,
  unmounted: Z,
  activated: Z,
  deactivated: Z,
  errorCaptured: Z,
  serverPrefetch: Z,
  // assets
  components: nt,
  directives: nt,
  // watch
  watch: Xr,
  // provide / inject
  provide: tn,
  inject: Yr
};
function tn(e, t) {
  return t ? e ? function() {
    return K(
      C(e) ? e.call(this, this) : e,
      C(t) ? t.call(this, this) : t
    );
  } : t : e;
}
function Yr(e, t) {
  return nt(fs(e), fs(t));
}
function fs(e) {
  if (I(e)) {
    const t = {};
    for (let s = 0; s < e.length; s++)
      t[e[s]] = e[s];
    return t;
  }
  return e;
}
function Z(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function nt(e, t) {
  return e ? K(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function sn(e, t) {
  return e ? I(e) && I(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : K(
    /* @__PURE__ */ Object.create(null),
    Qs(e),
    Qs(t ?? {})
  ) : t;
}
function Xr(e, t) {
  if (!e)
    return t;
  if (!t)
    return e;
  const s = K(/* @__PURE__ */ Object.create(null), e);
  for (const n in t)
    s[n] = Z(e[n], t[n]);
  return s;
}
function so() {
  return {
    app: null,
    config: {
      isNativeTag: vo,
      performance: !1,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {}
    },
    mixins: [],
    components: {},
    directives: {},
    provides: /* @__PURE__ */ Object.create(null),
    optionsCache: /* @__PURE__ */ new WeakMap(),
    propsCache: /* @__PURE__ */ new WeakMap(),
    emitsCache: /* @__PURE__ */ new WeakMap()
  };
}
let qr = 0;
function Jr(e, t) {
  return function(n, o = null) {
    C(n) || (n = K({}, n)), o != null && !V(o) && (o = null);
    const r = so(), l = /* @__PURE__ */ new Set();
    let f = !1;
    const u = r.app = {
      _uid: qr++,
      _component: n,
      _props: o,
      _container: null,
      _context: r,
      _instance: null,
      version: yi,
      get config() {
        return r.config;
      },
      set config(a) {
      },
      use(a, ..._) {
        return l.has(a) || (a && C(a.install) ? (l.add(a), a.install(u, ..._)) : C(a) && (l.add(a), a(u, ..._))), u;
      },
      mixin(a) {
        return r.mixins.includes(a) || r.mixins.push(a), u;
      },
      component(a, _) {
        return _ ? (r.components[a] = _, u) : r.components[a];
      },
      directive(a, _) {
        return _ ? (r.directives[a] = _, u) : r.directives[a];
      },
      mount(a, _, x) {
        if (!f) {
          const w = de(
            n,
            o
          );
          return w.appContext = r, _ && t ? t(w, a) : e(w, a, x), f = !0, u._container = a, a.__vue_app__ = u, Ls(w.component) || w.component.proxy;
        }
      },
      unmount() {
        f && (e(null, u._container), delete u._container.__vue_app__);
      },
      provide(a, _) {
        return r.provides[a] = _, u;
      },
      runWithContext(a) {
        Nt = u;
        try {
          return a();
        } finally {
          Nt = null;
        }
      }
    };
    return u;
  };
}
let Nt = null;
function Zr(e, t) {
  if (q) {
    let s = q.provides;
    const n = q.parent && q.parent.provides;
    n === s && (s = q.provides = Object.create(n)), s[e] = t;
  }
}
function Ot(e, t, s = !1) {
  const n = q || te;
  if (n || Nt) {
    const o = n ? n.parent == null ? n.vnode.appContext && n.vnode.appContext.provides : n.parent.provides : Nt._context.provides;
    if (o && e in o)
      return o[e];
    if (arguments.length > 1)
      return s && C(t) ? t.call(n && n.proxy) : t;
  }
}
function Qr(e, t, s, n = !1) {
  const o = {}, r = {};
  Pt(r, Ht, 1), e.propsDefaults = /* @__PURE__ */ Object.create(null), no(e, t, o, r);
  for (const l in e.propsOptions[0])
    l in o || (o[l] = void 0);
  s ? e.props = n ? o : cr(o) : e.type.props ? e.props = o : e.props = r, e.attrs = r;
}
function ei(e, t, s, n) {
  const {
    props: o,
    attrs: r,
    vnode: { patchFlag: l }
  } = e, f = L(o), [u] = e.propsOptions;
  let a = !1;
  if (
    // always force full diff in dev
    // - #1942 if hmr is enabled with sfc component
    // - vite#872 non-sfc component used by sfc component
    (n || l > 0) && !(l & 16)
  ) {
    if (l & 8) {
      const _ = e.vnode.dynamicProps;
      for (let x = 0; x < _.length; x++) {
        let w = _[x];
        if (zt(e.emitsOptions, w))
          continue;
        const A = t[w];
        if (u)
          if (R(r, w))
            A !== r[w] && (r[w] = A, a = !0);
          else {
            const H = Se(w);
            o[H] = us(
              u,
              f,
              H,
              A,
              e,
              !1
              /* isAbsent */
            );
          }
        else
          A !== r[w] && (r[w] = A, a = !0);
      }
    }
  } else {
    no(e, t, o, r) && (a = !0);
    let _;
    for (const x in f)
      (!t || // for camelCase
      !R(t, x) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((_ = le(x)) === x || !R(t, _))) && (u ? s && // for camelCase
      (s[x] !== void 0 || // for kebab-case
      s[_] !== void 0) && (o[x] = us(
        u,
        f,
        x,
        void 0,
        e,
        !0
        /* isAbsent */
      )) : delete o[x]);
    if (r !== f)
      for (const x in r)
        (!t || !R(t, x)) && (delete r[x], a = !0);
  }
  a && xe(e, "set", "$attrs");
}
function no(e, t, s, n) {
  const [o, r] = e.propsOptions;
  let l = !1, f;
  if (t)
    for (let u in t) {
      if (wt(u))
        continue;
      const a = t[u];
      let _;
      o && R(o, _ = Se(u)) ? !r || !r.includes(_) ? s[_] = a : (f || (f = {}))[_] = a : zt(e.emitsOptions, u) || (!(u in n) || a !== n[u]) && (n[u] = a, l = !0);
    }
  if (r) {
    const u = L(s), a = f || z;
    for (let _ = 0; _ < r.length; _++) {
      const x = r[_];
      s[x] = us(
        o,
        u,
        x,
        a[x],
        e,
        !R(a, x)
      );
    }
  }
  return l;
}
function us(e, t, s, n, o, r) {
  const l = e[s];
  if (l != null) {
    const f = R(l, "default");
    if (f && n === void 0) {
      const u = l.default;
      if (l.type !== Function && !l.skipFactory && C(u)) {
        const { propsDefaults: a } = o;
        s in a ? n = a[s] : (Xe(o), n = a[s] = u.call(
          null,
          t
        ), Fe());
      } else
        n = u;
    }
    l[
      0
      /* shouldCast */
    ] && (r && !f ? n = !1 : l[
      1
      /* shouldCastTrue */
    ] && (n === "" || n === le(s)) && (n = !0));
  }
  return n;
}
function oo(e, t, s = !1) {
  const n = t.propsCache, o = n.get(e);
  if (o)
    return o;
  const r = e.props, l = {}, f = [];
  let u = !1;
  if (!C(e)) {
    const _ = (x) => {
      u = !0;
      const [w, A] = oo(x, t, !0);
      K(l, w), A && f.push(...A);
    };
    !s && t.mixins.length && t.mixins.forEach(_), e.extends && _(e.extends), e.mixins && e.mixins.forEach(_);
  }
  if (!r && !u)
    return V(e) && n.set(e, Be), Be;
  if (I(r))
    for (let _ = 0; _ < r.length; _++) {
      const x = Se(r[_]);
      nn(x) && (l[x] = z);
    }
  else if (r)
    for (const _ in r) {
      const x = Se(_);
      if (nn(x)) {
        const w = r[_], A = l[x] = I(w) || C(w) ? { type: w } : K({}, w);
        if (A) {
          const H = ln(Boolean, A.type), D = ln(String, A.type);
          A[
            0
            /* shouldCast */
          ] = H > -1, A[
            1
            /* shouldCastTrue */
          ] = D < 0 || H < D, (H > -1 || R(A, "default")) && f.push(x);
        }
      }
    }
  const a = [l, f];
  return V(e) && n.set(e, a), a;
}
function nn(e) {
  return e[0] !== "$";
}
function on(e) {
  const t = e && e.toString().match(/^\s*(function|class) (\w+)/);
  return t ? t[2] : e === null ? "null" : "";
}
function rn(e, t) {
  return on(e) === on(t);
}
function ln(e, t) {
  return I(t) ? t.findIndex((s) => rn(s, e)) : C(t) && rn(t, e) ? 0 : -1;
}
const ro = (e) => e[0] === "_" || e === "$stable", Ts = (e) => I(e) ? e.map(_e) : [_e(e)], ti = (e, t, s) => {
  if (t._n)
    return t;
  const n = xr((...o) => Ts(t(...o)), s);
  return n._c = !1, n;
}, io = (e, t, s) => {
  const n = e._ctx;
  for (const o in e) {
    if (ro(o))
      continue;
    const r = e[o];
    if (C(r))
      t[o] = ti(o, r, n);
    else if (r != null) {
      const l = Ts(r);
      t[o] = () => l;
    }
  }
}, lo = (e, t) => {
  const s = Ts(t);
  e.slots.default = () => s;
}, si = (e, t) => {
  if (e.vnode.shapeFlag & 32) {
    const s = t._;
    s ? (e.slots = L(t), Pt(t, "_", s)) : io(
      t,
      e.slots = {}
    );
  } else
    e.slots = {}, t && lo(e, t);
  Pt(e.slots, Ht, 1);
}, ni = (e, t, s) => {
  const { vnode: n, slots: o } = e;
  let r = !0, l = z;
  if (n.shapeFlag & 32) {
    const f = t._;
    f ? s && f === 1 ? r = !1 : (K(o, t), !s && f === 1 && delete o._) : (r = !t.$stable, io(t, o)), l = t;
  } else
    t && (lo(e, t), l = { default: 1 });
  if (r)
    for (const f in o)
      !ro(f) && !(f in l) && delete o[f];
};
function as(e, t, s, n, o = !1) {
  if (I(e)) {
    e.forEach(
      (w, A) => as(
        w,
        t && (I(t) ? t[A] : t),
        s,
        n,
        o
      )
    );
    return;
  }
  if (ot(n) && !o)
    return;
  const r = n.shapeFlag & 4 ? Ls(n.component) || n.component.proxy : n.el, l = o ? null : r, { i: f, r: u } = e, a = t && t.r, _ = f.refs === z ? f.refs = {} : f.refs, x = f.setupState;
  if (a != null && a !== u && (k(a) ? (_[a] = null, R(x, a) && (x[a] = null)) : Q(a) && (a.value = null)), C(u))
    Pe(u, f, 12, [l, _]);
  else {
    const w = k(u), A = Q(u);
    if (w || A) {
      const H = () => {
        if (e.f) {
          const D = w ? R(x, u) ? x[u] : _[u] : u.value;
          o ? I(D) && hs(D, r) : I(D) ? D.includes(r) || D.push(r) : w ? (_[u] = [r], R(x, u) && (x[u] = _[u])) : (u.value = [r], e.k && (_[e.k] = u.value));
        } else
          w ? (_[u] = l, R(x, u) && (x[u] = l)) : A && (u.value = l, e.k && (_[e.k] = l));
      };
      l ? (H.id = -1, ee(H, s)) : H();
    }
  }
}
const ee = Pr;
function oi(e) {
  return ri(e);
}
function ri(e, t) {
  const s = es();
  s.__VUE__ = !0;
  const {
    insert: n,
    remove: o,
    patchProp: r,
    createElement: l,
    createText: f,
    createComment: u,
    setText: a,
    setElementText: _,
    parentNode: x,
    nextSibling: w,
    setScopeId: A = ue,
    insertStaticContent: H
  } = e, D = (i, c, d, p = null, m = null, b = null, S = !1, g = null, v = !!c.dynamicChildren) => {
    if (i === c)
      return;
    i && !tt(i, c) && (p = _t(i), me(i, m, b, !0), i = null), c.patchFlag === -2 && (v = !1, c.dynamicChildren = null);
    const { type: h, ref: O, shapeFlag: E } = c;
    switch (h) {
      case Vt:
        B(i, c, d, p);
        break;
      case Ce:
        $(i, c, d, p);
        break;
      case Jt:
        i == null && G(c, d, p, S);
        break;
      case ie:
        mt(
          i,
          c,
          d,
          p,
          m,
          b,
          S,
          g,
          v
        );
        break;
      default:
        E & 1 ? we(
          i,
          c,
          d,
          p,
          m,
          b,
          S,
          g,
          v
        ) : E & 6 ? pt(
          i,
          c,
          d,
          p,
          m,
          b,
          S,
          g,
          v
        ) : (E & 64 || E & 128) && h.process(
          i,
          c,
          d,
          p,
          m,
          b,
          S,
          g,
          v,
          Ve
        );
    }
    O != null && m && as(O, i && i.ref, b, c || i, !c);
  }, B = (i, c, d, p) => {
    if (i == null)
      n(
        c.el = f(c.children),
        d,
        p
      );
    else {
      const m = c.el = i.el;
      c.children !== i.children && a(m, c.children);
    }
  }, $ = (i, c, d, p) => {
    i == null ? n(
      c.el = u(c.children || ""),
      d,
      p
    ) : c.el = i.el;
  }, G = (i, c, d, p) => {
    [i.el, i.anchor] = H(
      i.children,
      c,
      d,
      p,
      i.el,
      i.anchor
    );
  }, Y = ({ el: i, anchor: c }, d, p) => {
    let m;
    for (; i && i !== c; )
      m = w(i), n(i, d, p), i = m;
    n(c, d, p);
  }, N = ({ el: i, anchor: c }) => {
    let d;
    for (; i && i !== c; )
      d = w(i), o(i), i = d;
    o(c);
  }, we = (i, c, d, p, m, b, S, g, v) => {
    S = S || c.type === "svg", i == null ? Ze(
      c,
      d,
      p,
      m,
      b,
      S,
      g,
      v
    ) : Ut(
      i,
      c,
      m,
      b,
      S,
      g,
      v
    );
  }, Ze = (i, c, d, p, m, b, S, g) => {
    let v, h;
    const { type: O, props: E, shapeFlag: y, transition: P, dirs: T } = i;
    if (v = i.el = l(
      i.type,
      b,
      E && E.is,
      E
    ), y & 8 ? _(v, i.children) : y & 16 && Ne(
      i.children,
      v,
      null,
      p,
      m,
      b && O !== "foreignObject",
      S,
      g
    ), T && Le(i, null, p, "created"), dt(v, i, i.scopeId, S, p), E) {
      for (const M in E)
        M !== "value" && !wt(M) && r(
          v,
          M,
          null,
          E[M],
          b,
          i.children,
          p,
          m,
          be
        );
      "value" in E && r(v, "value", null, E.value), (h = E.onVnodeBeforeMount) && he(h, p, i);
    }
    T && Le(i, null, p, "beforeMount");
    const j = (!m || m && !m.pendingBranch) && P && !P.persisted;
    j && P.beforeEnter(v), n(v, c, d), ((h = E && E.onVnodeMounted) || j || T) && ee(() => {
      h && he(h, p, i), j && P.enter(v), T && Le(i, null, p, "mounted");
    }, m);
  }, dt = (i, c, d, p, m) => {
    if (d && A(i, d), p)
      for (let b = 0; b < p.length; b++)
        A(i, p[b]);
    if (m) {
      let b = m.subTree;
      if (c === b) {
        const S = m.vnode;
        dt(
          i,
          S,
          S.scopeId,
          S.slotScopeIds,
          m.parent
        );
      }
    }
  }, Ne = (i, c, d, p, m, b, S, g, v = 0) => {
    for (let h = v; h < i.length; h++) {
      const O = i[h] = g ? ye(i[h]) : _e(i[h]);
      D(
        null,
        O,
        c,
        d,
        p,
        m,
        b,
        S,
        g
      );
    }
  }, Ut = (i, c, d, p, m, b, S) => {
    const g = c.el = i.el;
    let { patchFlag: v, dynamicChildren: h, dirs: O } = c;
    v |= i.patchFlag & 16;
    const E = i.props || z, y = c.props || z;
    let P;
    d && Me(d, !1), (P = y.onVnodeBeforeUpdate) && he(P, d, c, i), O && Le(c, i, d, "beforeUpdate"), d && Me(d, !0);
    const T = m && c.type !== "foreignObject";
    if (h ? Te(
      i.dynamicChildren,
      h,
      g,
      d,
      p,
      T,
      b
    ) : S || W(
      i,
      c,
      g,
      null,
      d,
      p,
      T,
      b,
      !1
    ), v > 0) {
      if (v & 16)
        Qe(
          g,
          c,
          E,
          y,
          d,
          p,
          m
        );
      else if (v & 2 && E.class !== y.class && r(g, "class", null, y.class, m), v & 4 && r(g, "style", E.style, y.style, m), v & 8) {
        const j = c.dynamicProps;
        for (let M = 0; M < j.length; M++) {
          const U = j[M], oe = E[U], He = y[U];
          (He !== oe || U === "value") && r(
            g,
            U,
            oe,
            He,
            m,
            i.children,
            d,
            p,
            be
          );
        }
      }
      v & 1 && i.children !== c.children && _(g, c.children);
    } else
      !S && h == null && Qe(
        g,
        c,
        E,
        y,
        d,
        p,
        m
      );
    ((P = y.onVnodeUpdated) || O) && ee(() => {
      P && he(P, d, c, i), O && Le(c, i, d, "updated");
    }, p);
  }, Te = (i, c, d, p, m, b, S) => {
    for (let g = 0; g < c.length; g++) {
      const v = i[g], h = c[g], O = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        v.el && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (v.type === ie || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !tt(v, h) || // - In the case of a component, it could contain anything.
        v.shapeFlag & 70) ? x(v.el) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          d
        )
      );
      D(
        v,
        h,
        O,
        null,
        p,
        m,
        b,
        S,
        !0
      );
    }
  }, Qe = (i, c, d, p, m, b, S) => {
    if (d !== p) {
      if (d !== z)
        for (const g in d)
          !wt(g) && !(g in p) && r(
            i,
            g,
            d[g],
            null,
            S,
            c.children,
            m,
            b,
            be
          );
      for (const g in p) {
        if (wt(g))
          continue;
        const v = p[g], h = d[g];
        v !== h && g !== "value" && r(
          i,
          g,
          h,
          v,
          S,
          c.children,
          m,
          b,
          be
        );
      }
      "value" in p && r(i, "value", d.value, p.value);
    }
  }, mt = (i, c, d, p, m, b, S, g, v) => {
    const h = c.el = i ? i.el : f(""), O = c.anchor = i ? i.anchor : f("");
    let { patchFlag: E, dynamicChildren: y, slotScopeIds: P } = c;
    P && (g = g ? g.concat(P) : P), i == null ? (n(h, d, p), n(O, d, p), Ne(
      c.children,
      d,
      O,
      m,
      b,
      S,
      g,
      v
    )) : E > 0 && E & 64 && y && // #2715 the previous fragment could've been a BAILed one as a result
    // of renderSlot() with no valid children
    i.dynamicChildren ? (Te(
      i.dynamicChildren,
      y,
      d,
      m,
      b,
      S,
      g
    ), // #2080 if the stable fragment has a key, it's a <template v-for> that may
    //  get moved around. Make sure all root level vnodes inherit el.
    // #2134 or if it's a component root, it may also get moved around
    // as the component is being moved.
    (c.key != null || m && c === m.subTree) && co(
      i,
      c,
      !0
      /* shallow */
    )) : W(
      i,
      c,
      d,
      O,
      m,
      b,
      S,
      g,
      v
    );
  }, pt = (i, c, d, p, m, b, S, g, v) => {
    c.slotScopeIds = g, i == null ? c.shapeFlag & 512 ? m.ctx.activate(
      c,
      d,
      p,
      S,
      v
    ) : Kt(
      c,
      d,
      p,
      m,
      b,
      S,
      v
    ) : Ws(i, c, v);
  }, Kt = (i, c, d, p, m, b, S) => {
    const g = i.component = _i(
      i,
      p,
      m
    );
    if (Jn(i) && (g.ctx.renderer = Ve), gi(g), g.asyncDep) {
      if (m && m.registerDep(g, J), !i.el) {
        const v = g.subTree = de(Ce);
        $(null, v, c, d);
      }
      return;
    }
    J(
      g,
      i,
      c,
      d,
      m,
      b,
      S
    );
  }, Ws = (i, c, d) => {
    const p = c.component = i.component;
    if (Or(i, c, d))
      if (p.asyncDep && !p.asyncResolved) {
        F(p, c, d);
        return;
      } else
        p.next = c, gr(p.update), p.update();
    else
      c.el = i.el, p.vnode = c;
  }, J = (i, c, d, p, m, b, S) => {
    const g = () => {
      if (i.isMounted) {
        let { next: O, bu: E, u: y, parent: P, vnode: T } = i, j = O, M;
        Me(i, !1), O ? (O.el = T.el, F(i, O, S)) : O = T, E && Gt(E), (M = O.props && O.props.onVnodeBeforeUpdate) && he(M, P, O, T), Me(i, !0);
        const U = Yt(i), oe = i.subTree;
        i.subTree = U, D(
          oe,
          U,
          // parent may have changed if it's in a teleport
          x(oe.el),
          // anchor may have changed if it's in a fragment
          _t(oe),
          i,
          m,
          b
        ), O.el = U.el, j === null && yr(i, U.el), y && ee(y, m), (M = O.props && O.props.onVnodeUpdated) && ee(
          () => he(M, P, O, T),
          m
        );
      } else {
        let O;
        const { el: E, props: y } = c, { bm: P, m: T, parent: j } = i, M = ot(c);
        if (Me(i, !1), P && Gt(P), !M && (O = y && y.onVnodeBeforeMount) && he(O, j, c), Me(i, !0), E && kt) {
          const U = () => {
            i.subTree = Yt(i), kt(
              E,
              i.subTree,
              i,
              m,
              null
            );
          };
          M ? c.type.__asyncLoader().then(
            // note: we are moving the render call into an async callback,
            // which means it won't track dependencies - but it's ok because
            // a server-rendered async wrapper is already in resolved state
            // and it will never need to change.
            () => !i.isUnmounted && U()
          ) : U();
        } else {
          const U = i.subTree = Yt(i);
          D(
            null,
            U,
            d,
            p,
            i,
            m,
            b
          ), c.el = U.el;
        }
        if (T && ee(T, m), !M && (O = y && y.onVnodeMounted)) {
          const U = c;
          ee(
            () => he(O, j, U),
            m
          );
        }
        (c.shapeFlag & 256 || j && ot(j.vnode) && j.vnode.shapeFlag & 256) && i.a && ee(i.a, m), i.isMounted = !0, c = d = p = null;
      }
    }, v = i.effect = new Ss(
      g,
      () => Cs(h),
      i.scope
      // track it in component's effect scope
    ), h = i.update = () => v.run();
    h.id = i.uid, Me(i, !0), h();
  }, F = (i, c, d) => {
    c.component = i;
    const p = i.vnode.props;
    i.vnode = c, i.next = null, ei(i, c.props, p, d), ni(i, c.children, d), qe(), Js(), Je();
  }, W = (i, c, d, p, m, b, S, g, v = !1) => {
    const h = i && i.children, O = i ? i.shapeFlag : 0, E = c.children, { patchFlag: y, shapeFlag: P } = c;
    if (y > 0) {
      if (y & 128) {
        ht(
          h,
          E,
          d,
          p,
          m,
          b,
          S,
          g,
          v
        );
        return;
      } else if (y & 256) {
        De(
          h,
          E,
          d,
          p,
          m,
          b,
          S,
          g,
          v
        );
        return;
      }
    }
    P & 8 ? (O & 16 && be(h, m, b), E !== h && _(d, E)) : O & 16 ? P & 16 ? ht(
      h,
      E,
      d,
      p,
      m,
      b,
      S,
      g,
      v
    ) : be(h, m, b, !0) : (O & 8 && _(d, ""), P & 16 && Ne(
      E,
      d,
      p,
      m,
      b,
      S,
      g,
      v
    ));
  }, De = (i, c, d, p, m, b, S, g, v) => {
    i = i || Be, c = c || Be;
    const h = i.length, O = c.length, E = Math.min(h, O);
    let y;
    for (y = 0; y < E; y++) {
      const P = c[y] = v ? ye(c[y]) : _e(c[y]);
      D(
        i[y],
        P,
        d,
        null,
        m,
        b,
        S,
        g,
        v
      );
    }
    h > O ? be(
      i,
      m,
      b,
      !0,
      !1,
      E
    ) : Ne(
      c,
      d,
      p,
      m,
      b,
      S,
      g,
      v,
      E
    );
  }, ht = (i, c, d, p, m, b, S, g, v) => {
    let h = 0;
    const O = c.length;
    let E = i.length - 1, y = O - 1;
    for (; h <= E && h <= y; ) {
      const P = i[h], T = c[h] = v ? ye(c[h]) : _e(c[h]);
      if (tt(P, T))
        D(
          P,
          T,
          d,
          null,
          m,
          b,
          S,
          g,
          v
        );
      else
        break;
      h++;
    }
    for (; h <= E && h <= y; ) {
      const P = i[E], T = c[y] = v ? ye(c[y]) : _e(c[y]);
      if (tt(P, T))
        D(
          P,
          T,
          d,
          null,
          m,
          b,
          S,
          g,
          v
        );
      else
        break;
      E--, y--;
    }
    if (h > E) {
      if (h <= y) {
        const P = y + 1, T = P < O ? c[P].el : p;
        for (; h <= y; )
          D(
            null,
            c[h] = v ? ye(c[h]) : _e(c[h]),
            d,
            T,
            m,
            b,
            S,
            g,
            v
          ), h++;
      }
    } else if (h > y)
      for (; h <= E; )
        me(i[h], m, b, !0), h++;
    else {
      const P = h, T = h, j = /* @__PURE__ */ new Map();
      for (h = T; h <= y; h++) {
        const ne = c[h] = v ? ye(c[h]) : _e(c[h]);
        ne.key != null && j.set(ne.key, h);
      }
      let M, U = 0;
      const oe = y - T + 1;
      let He = !1, Fs = 0;
      const et = new Array(oe);
      for (h = 0; h < oe; h++)
        et[h] = 0;
      for (h = P; h <= E; h++) {
        const ne = i[h];
        if (U >= oe) {
          me(ne, m, b, !0);
          continue;
        }
        let pe;
        if (ne.key != null)
          pe = j.get(ne.key);
        else
          for (M = T; M <= y; M++)
            if (et[M - T] === 0 && tt(ne, c[M])) {
              pe = M;
              break;
            }
        pe === void 0 ? me(ne, m, b, !0) : (et[pe - T] = h + 1, pe >= Fs ? Fs = pe : He = !0, D(
          ne,
          c[pe],
          d,
          null,
          m,
          b,
          S,
          g,
          v
        ), U++);
      }
      const Vs = He ? ii(et) : Be;
      for (M = Vs.length - 1, h = oe - 1; h >= 0; h--) {
        const ne = T + h, pe = c[ne], Hs = ne + 1 < O ? c[ne + 1].el : p;
        et[h] === 0 ? D(
          null,
          pe,
          d,
          Hs,
          m,
          b,
          S,
          g,
          v
        ) : He && (M < 0 || h !== Vs[M] ? Re(pe, d, Hs, 2) : M--);
      }
    }
  }, Re = (i, c, d, p, m = null) => {
    const { el: b, type: S, transition: g, children: v, shapeFlag: h } = i;
    if (h & 6) {
      Re(i.component.subTree, c, d, p);
      return;
    }
    if (h & 128) {
      i.suspense.move(c, d, p);
      return;
    }
    if (h & 64) {
      S.move(i, c, d, Ve);
      return;
    }
    if (S === ie) {
      n(b, c, d);
      for (let E = 0; E < v.length; E++)
        Re(v[E], c, d, p);
      n(i.anchor, c, d);
      return;
    }
    if (S === Jt) {
      Y(i, c, d);
      return;
    }
    if (p !== 2 && h & 1 && g)
      if (p === 0)
        g.beforeEnter(b), n(b, c, d), ee(() => g.enter(b), m);
      else {
        const { leave: E, delayLeave: y, afterLeave: P } = g, T = () => n(b, c, d), j = () => {
          E(b, () => {
            T(), P && P();
          });
        };
        y ? y(b, T, j) : j();
      }
    else
      n(b, c, d);
  }, me = (i, c, d, p = !1, m = !1) => {
    const {
      type: b,
      props: S,
      ref: g,
      children: v,
      dynamicChildren: h,
      shapeFlag: O,
      patchFlag: E,
      dirs: y
    } = i;
    if (g != null && as(g, null, d, i, !0), O & 256) {
      c.ctx.deactivate(i);
      return;
    }
    const P = O & 1 && y, T = !ot(i);
    let j;
    if (T && (j = S && S.onVnodeBeforeUnmount) && he(j, c, i), O & 6)
      bo(i.component, d, p);
    else {
      if (O & 128) {
        i.suspense.unmount(d, p);
        return;
      }
      P && Le(i, null, c, "beforeUnmount"), O & 64 ? i.type.remove(
        i,
        c,
        d,
        m,
        Ve,
        p
      ) : h && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (b !== ie || E > 0 && E & 64) ? be(
        h,
        c,
        d,
        !1,
        !0
      ) : (b === ie && E & 384 || !m && O & 16) && be(v, c, d), p && js(i);
    }
    (T && (j = S && S.onVnodeUnmounted) || P) && ee(() => {
      j && he(j, c, i), P && Le(i, null, c, "unmounted");
    }, d);
  }, js = (i) => {
    const { type: c, el: d, anchor: p, transition: m } = i;
    if (c === ie) {
      go(d, p);
      return;
    }
    if (c === Jt) {
      N(i);
      return;
    }
    const b = () => {
      o(d), m && !m.persisted && m.afterLeave && m.afterLeave();
    };
    if (i.shapeFlag & 1 && m && !m.persisted) {
      const { leave: S, delayLeave: g } = m, v = () => S(d, b);
      g ? g(i.el, b, v) : v();
    } else
      b();
  }, go = (i, c) => {
    let d;
    for (; i !== c; )
      d = w(i), o(i), i = d;
    o(c);
  }, bo = (i, c, d) => {
    const { bum: p, scope: m, update: b, subTree: S, um: g } = i;
    p && Gt(p), m.stop(), b && (b.active = !1, me(S, i, c, d)), g && ee(g, c), ee(() => {
      i.isUnmounted = !0;
    }, c), c && c.pendingBranch && !c.isUnmounted && i.asyncDep && !i.asyncResolved && i.suspenseId === c.pendingId && (c.deps--, c.deps === 0 && c.resolve());
  }, be = (i, c, d, p = !1, m = !1, b = 0) => {
    for (let S = b; S < i.length; S++)
      me(i[S], c, d, p, m);
  }, _t = (i) => i.shapeFlag & 6 ? _t(i.component.subTree) : i.shapeFlag & 128 ? i.suspense.next() : w(i.anchor || i.el), zs = (i, c, d) => {
    i == null ? c._vnode && me(c._vnode, null, null, !0) : D(c._vnode || null, i, c, null, null, null, d), Js(), kn(), c._vnode = i;
  }, Ve = {
    p: D,
    um: me,
    m: Re,
    r: js,
    mt: Kt,
    mc: Ne,
    pc: W,
    pbc: Te,
    n: _t,
    o: e
  };
  let Bt, kt;
  return t && ([Bt, kt] = t(
    Ve
  )), {
    render: zs,
    hydrate: Bt,
    createApp: Jr(zs, Bt)
  };
}
function Me({ effect: e, update: t }, s) {
  e.allowRecurse = t.allowRecurse = s;
}
function co(e, t, s = !1) {
  const n = e.children, o = t.children;
  if (I(n) && I(o))
    for (let r = 0; r < n.length; r++) {
      const l = n[r];
      let f = o[r];
      f.shapeFlag & 1 && !f.dynamicChildren && ((f.patchFlag <= 0 || f.patchFlag === 32) && (f = o[r] = ye(o[r]), f.el = l.el), s || co(l, f)), f.type === Vt && (f.el = l.el);
    }
}
function ii(e) {
  const t = e.slice(), s = [0];
  let n, o, r, l, f;
  const u = e.length;
  for (n = 0; n < u; n++) {
    const a = e[n];
    if (a !== 0) {
      if (o = s[s.length - 1], e[o] < a) {
        t[n] = o, s.push(n);
        continue;
      }
      for (r = 0, l = s.length - 1; r < l; )
        f = r + l >> 1, e[s[f]] < a ? r = f + 1 : l = f;
      a < e[s[r]] && (r > 0 && (t[n] = s[r - 1]), s[r] = n);
    }
  }
  for (r = s.length, l = s[r - 1]; r-- > 0; )
    s[r] = l, l = t[l];
  return s;
}
const li = (e) => e.__isTeleport, ie = Symbol.for("v-fgt"), Vt = Symbol.for("v-txt"), Ce = Symbol.for("v-cmt"), Jt = Symbol.for("v-stc"), it = [];
let fe = null;
function Tt(e = !1) {
  it.push(fe = e ? null : []);
}
function ci() {
  it.pop(), fe = it[it.length - 1] || null;
}
let ut = 1;
function cn(e) {
  ut += e;
}
function fo(e) {
  return e.dynamicChildren = ut > 0 ? fe || Be : null, ci(), ut > 0 && fe && fe.push(e), e;
}
function fn(e, t, s, n, o, r) {
  return fo(
    po(
      e,
      t,
      s,
      n,
      o,
      r,
      !0
      /* isBlock */
    )
  );
}
function uo(e, t, s, n, o) {
  return fo(
    de(
      e,
      t,
      s,
      n,
      o,
      !0
      /* isBlock: prevent a block from tracking itself */
    )
  );
}
function ao(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function tt(e, t) {
  return e.type === t.type && e.key === t.key;
}
const Ht = "__vInternal", mo = ({ key: e }) => e ?? null, yt = ({
  ref: e,
  ref_key: t,
  ref_for: s
}) => (typeof e == "number" && (e = "" + e), e != null ? k(e) || Q(e) || C(e) ? { i: te, r: e, k: t, f: !!s } : e : null);
function po(e, t = null, s = null, n = 0, o = null, r = e === ie ? 0 : 1, l = !1, f = !1) {
  const u = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && mo(t),
    ref: t && yt(t),
    scopeId: Yn,
    slotScopeIds: null,
    children: s,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag: r,
    patchFlag: n,
    dynamicProps: o,
    dynamicChildren: null,
    appContext: null,
    ctx: te
  };
  return f ? (Ds(u, s), r & 128 && e.normalize(u)) : s && (u.shapeFlag |= k(s) ? 8 : 16), ut > 0 && // avoid a block node from tracking itself
  !l && // has current parent block
  fe && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (u.patchFlag > 0 || r & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  u.patchFlag !== 32 && fe.push(u), u;
}
const de = fi;
function fi(e, t = null, s = null, n = 0, o = null, r = !1) {
  if ((!e || e === Ur) && (e = Ce), ao(e)) {
    const f = Ye(
      e,
      t,
      !0
      /* mergeRef: true */
    );
    return s && Ds(f, s), ut > 0 && !r && fe && (f.shapeFlag & 6 ? fe[fe.indexOf(e)] = f : fe.push(f)), f.patchFlag |= -2, f;
  }
  if (xi(e) && (e = e.__vccOpts), t) {
    t = ui(t);
    let { class: f, style: u } = t;
    f && !k(f) && (t.class = Mt(f)), V(u) && (Fn(u) && !I(u) && (u = K({}, u)), t.style = bs(u));
  }
  const l = k(e) ? 1 : Ir(e) ? 128 : li(e) ? 64 : V(e) ? 4 : C(e) ? 2 : 0;
  return po(
    e,
    t,
    s,
    n,
    o,
    l,
    r,
    !0
  );
}
function ui(e) {
  return e ? Fn(e) || Ht in e ? K({}, e) : e : null;
}
function Ye(e, t, s = !1) {
  const { props: n, ref: o, patchFlag: r, children: l } = e, f = t ? mi(n || {}, t) : n;
  return {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: f,
    key: f && mo(f),
    ref: t && t.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      s && o ? I(o) ? o.concat(yt(t)) : [o, yt(t)] : yt(t)
    ) : o,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: l,
    target: e.target,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    // if the vnode is cloned with extra props, we can no longer assume its
    // existing patch flag to be reliable and need to add the FULL_PROPS flag.
    // note: preserve flag for fragments since they use the flag for children
    // fast paths only.
    patchFlag: t && e.type !== ie ? r === -1 ? 16 : r | 16 : r,
    dynamicProps: e.dynamicProps,
    dynamicChildren: e.dynamicChildren,
    appContext: e.appContext,
    dirs: e.dirs,
    transition: e.transition,
    // These should technically only be non-null on mounted VNodes. However,
    // they *should* be copied for kept-alive vnodes. So we just always copy
    // them since them being non-null during a mount doesn't affect the logic as
    // they will simply be overwritten.
    component: e.component,
    suspense: e.suspense,
    ssContent: e.ssContent && Ye(e.ssContent),
    ssFallback: e.ssFallback && Ye(e.ssFallback),
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce
  };
}
function ai(e = " ", t = 0) {
  return de(Vt, null, e, t);
}
function di(e = "", t = !1) {
  return t ? (Tt(), uo(Ce, null, e)) : de(Ce, null, e);
}
function _e(e) {
  return e == null || typeof e == "boolean" ? de(Ce) : I(e) ? de(
    ie,
    null,
    // #3666, avoid reference pollution when reusing vnode
    e.slice()
  ) : typeof e == "object" ? ye(e) : de(Vt, null, String(e));
}
function ye(e) {
  return e.el === null && e.patchFlag !== -1 || e.memo ? e : Ye(e);
}
function Ds(e, t) {
  let s = 0;
  const { shapeFlag: n } = e;
  if (t == null)
    t = null;
  else if (I(t))
    s = 16;
  else if (typeof t == "object")
    if (n & 65) {
      const o = t.default;
      o && (o._c && (o._d = !1), Ds(e, o()), o._c && (o._d = !0));
      return;
    } else {
      s = 32;
      const o = t._;
      !o && !(Ht in t) ? t._ctx = te : o === 3 && te && (te.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
    }
  else
    C(t) ? (t = { default: t, _ctx: te }, s = 32) : (t = String(t), n & 64 ? (s = 16, t = [ai(t)]) : s = 8);
  e.children = t, e.shapeFlag |= s;
}
function mi(...e) {
  const t = {};
  for (let s = 0; s < e.length; s++) {
    const n = e[s];
    for (const o in n)
      if (o === "class")
        t.class !== n.class && (t.class = Mt([t.class, n.class]));
      else if (o === "style")
        t.style = bs([t.style, n.style]);
      else if (Dt(o)) {
        const r = t[o], l = n[o];
        l && r !== l && !(I(r) && r.includes(l)) && (t[o] = r ? [].concat(r, l) : l);
      } else
        o !== "" && (t[o] = n[o]);
  }
  return t;
}
function he(e, t, s, n = null) {
  ae(e, t, 7, [
    s,
    n
  ]);
}
const pi = so();
let hi = 0;
function _i(e, t, s) {
  const n = e.type, o = (t ? t.appContext : e.appContext) || pi, r = {
    uid: hi++,
    vnode: e,
    type: n,
    parent: t,
    appContext: o,
    root: null,
    // to be immediately set
    next: null,
    subTree: null,
    // will be set synchronously right after creation
    effect: null,
    update: null,
    // will be set synchronously right after creation
    scope: new Ro(
      !0
      /* detached */
    ),
    render: null,
    proxy: null,
    exposed: null,
    exposeProxy: null,
    withProxy: null,
    provides: t ? t.provides : Object.create(o.provides),
    accessCache: null,
    renderCache: [],
    // local resolved assets
    components: null,
    directives: null,
    // resolved props and emits options
    propsOptions: oo(n, o),
    emitsOptions: Gn(n, o),
    // emit
    emit: null,
    // to be set immediately
    emitted: null,
    // props default value
    propsDefaults: z,
    // inheritAttrs
    inheritAttrs: n.inheritAttrs,
    // state
    ctx: z,
    data: z,
    props: z,
    attrs: z,
    slots: z,
    refs: z,
    setupState: z,
    setupContext: null,
    attrsProxy: null,
    slotsProxy: null,
    // suspense related
    suspense: s,
    suspenseId: s ? s.pendingId : 0,
    asyncDep: null,
    asyncResolved: !1,
    // lifecycle hooks
    // not using enums here because it results in computed properties
    isMounted: !1,
    isUnmounted: !1,
    isDeactivated: !1,
    bc: null,
    c: null,
    bm: null,
    m: null,
    bu: null,
    u: null,
    um: null,
    bum: null,
    da: null,
    a: null,
    rtg: null,
    rtc: null,
    ec: null,
    sp: null
  };
  return r.ctx = { _: r }, r.root = t ? t.root : r, r.emit = Sr.bind(null, r), e.ce && e.ce(r), r;
}
let q = null, Rs, Ue, un = "__VUE_INSTANCE_SETTERS__";
(Ue = es()[un]) || (Ue = es()[un] = []), Ue.push((e) => q = e), Rs = (e) => {
  Ue.length > 1 ? Ue.forEach((t) => t(e)) : Ue[0](e);
};
const Xe = (e) => {
  Rs(e), e.scope.on();
}, Fe = () => {
  q && q.scope.off(), Rs(null);
};
function ho(e) {
  return e.vnode.shapeFlag & 4;
}
let at = !1;
function gi(e, t = !1) {
  at = t;
  const { props: s, children: n } = e.vnode, o = ho(e);
  Qr(e, s, o, t), si(e, n);
  const r = o ? bi(e, t) : void 0;
  return at = !1, r;
}
function bi(e, t) {
  const s = e.type;
  e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = Vn(new Proxy(e.ctx, Br));
  const { setup: n } = s;
  if (n) {
    const o = e.setupContext = n.length > 1 ? Si(e) : null;
    Xe(e), qe();
    const r = Pe(
      n,
      e,
      0,
      [e.props, o]
    );
    if (Je(), Fe(), En(r)) {
      if (r.then(Fe, Fe), t)
        return r.then((l) => {
          an(e, l, t);
        }).catch((l) => {
          jt(l, e, 0);
        });
      e.asyncDep = r;
    } else
      an(e, r, t);
  } else
    _o(e, t);
}
function an(e, t, s) {
  C(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : V(t) && (e.setupState = Hn(t)), _o(e, s);
}
let dn;
function _o(e, t, s) {
  const n = e.type;
  if (!e.render) {
    if (!t && dn && !n.render) {
      const o = n.template || Ns(e).template;
      if (o) {
        const { isCustomElement: r, compilerOptions: l } = e.appContext.config, { delimiters: f, compilerOptions: u } = n, a = K(
          K(
            {
              isCustomElement: r,
              delimiters: f
            },
            l
          ),
          u
        );
        n.render = dn(o, a);
      }
    }
    e.render = n.render || ue;
  }
  Xe(e), qe(), kr(e), Je(), Fe();
}
function vi(e) {
  return e.attrsProxy || (e.attrsProxy = new Proxy(
    e.attrs,
    {
      get(t, s) {
        return se(e, "get", "$attrs"), t[s];
      }
    }
  ));
}
function Si(e) {
  const t = (s) => {
    e.exposed = s || {};
  };
  return {
    get attrs() {
      return vi(e);
    },
    slots: e.slots,
    emit: e.emit,
    expose: t
  };
}
function Ls(e) {
  if (e.exposed)
    return e.exposeProxy || (e.exposeProxy = new Proxy(Hn(Vn(e.exposed)), {
      get(t, s) {
        if (s in t)
          return t[s];
        if (s in rt)
          return rt[s](e);
      },
      has(t, s) {
        return s in t || s in rt;
      }
    }));
}
function xi(e) {
  return C(e) && "__vccOpts" in e;
}
const Ei = (e, t) => pr(e, t, at), wi = Symbol.for("v-scx"), Oi = () => Ot(wi), yi = "3.3.4", Ii = "http://www.w3.org/2000/svg", je = typeof document < "u" ? document : null, mn = je && /* @__PURE__ */ je.createElement("template"), Pi = {
  insert: (e, t, s) => {
    t.insertBefore(e, s || null);
  },
  remove: (e) => {
    const t = e.parentNode;
    t && t.removeChild(e);
  },
  createElement: (e, t, s, n) => {
    const o = t ? je.createElementNS(Ii, e) : je.createElement(e, s ? { is: s } : void 0);
    return e === "select" && n && n.multiple != null && o.setAttribute("multiple", n.multiple), o;
  },
  createText: (e) => je.createTextNode(e),
  createComment: (e) => je.createComment(e),
  setText: (e, t) => {
    e.nodeValue = t;
  },
  setElementText: (e, t) => {
    e.textContent = t;
  },
  parentNode: (e) => e.parentNode,
  nextSibling: (e) => e.nextSibling,
  querySelector: (e) => je.querySelector(e),
  setScopeId(e, t) {
    e.setAttribute(t, "");
  },
  // __UNSAFE__
  // Reason: innerHTML.
  // Static content here can only come from compiled templates.
  // As long as the user only uses trusted templates, this is safe.
  insertStaticContent(e, t, s, n, o, r) {
    const l = s ? s.previousSibling : t.lastChild;
    if (o && (o === r || o.nextSibling))
      for (; t.insertBefore(o.cloneNode(!0), s), !(o === r || !(o = o.nextSibling)); )
        ;
    else {
      mn.innerHTML = n ? `<svg>${e}</svg>` : e;
      const f = mn.content;
      if (n) {
        const u = f.firstChild;
        for (; u.firstChild; )
          f.appendChild(u.firstChild);
        f.removeChild(u);
      }
      t.insertBefore(f, s);
    }
    return [
      // first
      l ? l.nextSibling : t.firstChild,
      // last
      s ? s.previousSibling : t.lastChild
    ];
  }
};
function Ai(e, t, s) {
  const n = e._vtc;
  n && (t = (t ? [t, ...n] : [...n]).join(" ")), t == null ? e.removeAttribute("class") : s ? e.setAttribute("class", t) : e.className = t;
}
function Ci(e, t, s) {
  const n = e.style, o = k(s);
  if (s && !o) {
    if (t && !k(t))
      for (const r in t)
        s[r] == null && ds(n, r, "");
    for (const r in s)
      ds(n, r, s[r]);
  } else {
    const r = n.display;
    o ? t !== s && (n.cssText = s) : t && e.removeAttribute("style"), "_vod" in e && (n.display = r);
  }
}
const pn = /\s*!important$/;
function ds(e, t, s) {
  if (I(s))
    s.forEach((n) => ds(e, t, n));
  else if (s == null && (s = ""), t.startsWith("--"))
    e.setProperty(t, s);
  else {
    const n = Ni(e, t);
    pn.test(s) ? e.setProperty(
      le(n),
      s.replace(pn, ""),
      "important"
    ) : e[n] = s;
  }
}
const hn = ["Webkit", "Moz", "ms"], Zt = {};
function Ni(e, t) {
  const s = Zt[t];
  if (s)
    return s;
  let n = Se(t);
  if (n !== "filter" && n in e)
    return Zt[t] = n;
  n = yn(n);
  for (let o = 0; o < hn.length; o++) {
    const r = hn[o] + n;
    if (r in e)
      return Zt[t] = r;
  }
  return t;
}
const _n = "http://www.w3.org/1999/xlink";
function Ti(e, t, s, n, o) {
  if (n && t.startsWith("xlink:"))
    s == null ? e.removeAttributeNS(_n, t.slice(6, t.length)) : e.setAttributeNS(_n, t, s);
  else {
    const r = To(t);
    s == null || r && !In(s) ? e.removeAttribute(t) : e.setAttribute(t, r ? "" : s);
  }
}
function Di(e, t, s, n, o, r, l) {
  if (t === "innerHTML" || t === "textContent") {
    n && l(n, o, r), e[t] = s ?? "";
    return;
  }
  const f = e.tagName;
  if (t === "value" && f !== "PROGRESS" && // custom elements may use _value internally
  !f.includes("-")) {
    e._value = s;
    const a = f === "OPTION" ? e.getAttribute("value") : e.value, _ = s ?? "";
    a !== _ && (e.value = _), s == null && e.removeAttribute(t);
    return;
  }
  let u = !1;
  if (s === "" || s == null) {
    const a = typeof e[t];
    a === "boolean" ? s = In(s) : s == null && a === "string" ? (s = "", u = !0) : a === "number" && (s = 0, u = !0);
  }
  try {
    e[t] = s;
  } catch {
  }
  u && e.removeAttribute(t);
}
function Ri(e, t, s, n) {
  e.addEventListener(t, s, n);
}
function Li(e, t, s, n) {
  e.removeEventListener(t, s, n);
}
function Mi(e, t, s, n, o = null) {
  const r = e._vei || (e._vei = {}), l = r[t];
  if (n && l)
    l.value = n;
  else {
    const [f, u] = Wi(t);
    if (n) {
      const a = r[t] = Fi(n, o);
      Ri(e, f, a, u);
    } else
      l && (Li(e, f, l, u), r[t] = void 0);
  }
}
const gn = /(?:Once|Passive|Capture)$/;
function Wi(e) {
  let t;
  if (gn.test(e)) {
    t = {};
    let n;
    for (; n = e.match(gn); )
      e = e.slice(0, e.length - n[0].length), t[n[0].toLowerCase()] = !0;
  }
  return [e[2] === ":" ? e.slice(3) : le(e.slice(2)), t];
}
let Qt = 0;
const ji = /* @__PURE__ */ Promise.resolve(), zi = () => Qt || (ji.then(() => Qt = 0), Qt = Date.now());
function Fi(e, t) {
  const s = (n) => {
    if (!n._vts)
      n._vts = Date.now();
    else if (n._vts <= s.attached)
      return;
    ae(
      Vi(n, s.value),
      t,
      5,
      [n]
    );
  };
  return s.value = e, s.attached = zi(), s;
}
function Vi(e, t) {
  if (I(t)) {
    const s = e.stopImmediatePropagation;
    return e.stopImmediatePropagation = () => {
      s.call(e), e._stopped = !0;
    }, t.map((n) => (o) => !o._stopped && n && n(o));
  } else
    return t;
}
const bn = /^on[a-z]/, Hi = (e, t, s, n, o = !1, r, l, f, u) => {
  t === "class" ? Ai(e, n, o) : t === "style" ? Ci(e, s, n) : Dt(t) ? ps(t) || Mi(e, t, s, n, l) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : Ui(e, t, n, o)) ? Di(
    e,
    t,
    n,
    r,
    l,
    f,
    u
  ) : (t === "true-value" ? e._trueValue = n : t === "false-value" && (e._falseValue = n), Ti(e, t, n, o));
};
function Ui(e, t, s, n) {
  return n ? !!(t === "innerHTML" || t === "textContent" || t in e && bn.test(t) && C(s)) : t === "spellcheck" || t === "draggable" || t === "translate" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA" || bn.test(t) && k(s) ? !1 : t in e;
}
function Ki(e, t) {
  const s = Cr(e);
  class n extends Ms {
    constructor(r) {
      super(s, r, t);
    }
  }
  return n.def = s, n;
}
const Bi = typeof HTMLElement < "u" ? HTMLElement : class {
};
class Ms extends Bi {
  constructor(t, s = {}, n) {
    super(), this._def = t, this._props = s, this._instance = null, this._connected = !1, this._resolved = !1, this._numberProps = null, this.shadowRoot && n ? n(this._createVNode(), this.shadowRoot) : (this.attachShadow({ mode: "open" }), this._def.__asyncLoader || this._resolveProps(this._def));
  }
  connectedCallback() {
    this._connected = !0, this._instance || (this._resolved ? this._update() : this._resolveDef());
  }
  disconnectedCallback() {
    this._connected = !1, Kn(() => {
      this._connected || (Sn(null, this.shadowRoot), this._instance = null);
    });
  }
  /**
   * resolve inner component definition (handle possible async component)
   */
  _resolveDef() {
    this._resolved = !0;
    for (let n = 0; n < this.attributes.length; n++)
      this._setAttr(this.attributes[n].name);
    new MutationObserver((n) => {
      for (const o of n)
        this._setAttr(o.attributeName);
    }).observe(this, { attributes: !0 });
    const t = (n, o = !1) => {
      const { props: r, styles: l } = n;
      let f;
      if (r && !I(r))
        for (const u in r) {
          const a = r[u];
          (a === Number || a && a.type === Number) && (u in this._props && (this._props[u] = Us(this._props[u])), (f || (f = /* @__PURE__ */ Object.create(null)))[Se(u)] = !0);
        }
      this._numberProps = f, o && this._resolveProps(n), this._applyStyles(l), this._update();
    }, s = this._def.__asyncLoader;
    s ? s().then((n) => t(n, !0)) : t(this._def);
  }
  _resolveProps(t) {
    const { props: s } = t, n = I(s) ? s : Object.keys(s || {});
    for (const o of Object.keys(this))
      o[0] !== "_" && n.includes(o) && this._setProp(o, this[o], !0, !1);
    for (const o of n.map(Se))
      Object.defineProperty(this, o, {
        get() {
          return this._getProp(o);
        },
        set(r) {
          this._setProp(o, r);
        }
      });
  }
  _setAttr(t) {
    let s = this.getAttribute(t);
    const n = Se(t);
    this._numberProps && this._numberProps[n] && (s = Us(s)), this._setProp(n, s, !1);
  }
  /**
   * @internal
   */
  _getProp(t) {
    return this._props[t];
  }
  /**
   * @internal
   */
  _setProp(t, s, n = !0, o = !0) {
    s !== this._props[t] && (this._props[t] = s, o && this._instance && this._update(), n && (s === !0 ? this.setAttribute(le(t), "") : typeof s == "string" || typeof s == "number" ? this.setAttribute(le(t), s + "") : s || this.removeAttribute(le(t))));
  }
  _update() {
    Sn(this._createVNode(), this.shadowRoot);
  }
  _createVNode() {
    const t = de(this._def, K({}, this._props));
    return this._instance || (t.ce = (s) => {
      this._instance = s, s.isCE = !0;
      const n = (r, l) => {
        this.dispatchEvent(
          new CustomEvent(r, {
            detail: l
          })
        );
      };
      s.emit = (r, ...l) => {
        n(r, l), le(r) !== r && n(le(r), l);
      };
      let o = this;
      for (; o = o && (o.parentNode || o.host); )
        if (o instanceof Ms) {
          s.parent = o._instance, s.provides = o._instance.provides;
          break;
        }
    }), t;
  }
  _applyStyles(t) {
    t && t.forEach((s) => {
      const n = document.createElement("style");
      n.textContent = s, this.shadowRoot.appendChild(n);
    });
  }
}
const ki = /* @__PURE__ */ K({ patchProp: Hi }, Pi);
let vn;
function $i() {
  return vn || (vn = oi(ki));
}
const Sn = (...e) => {
  $i().render(...e);
}, Gi = `.bg-green-200{background:green}
`, Yi = (e, t) => {
  const s = e.__vccOpts || e;
  for (const [n, o] of t)
    s[n] = o;
  return s;
}, Xi = {
  key: 0,
  class: "text-xs ml-2 bg-white rounded-full px-1.5"
}, qi = {
  __name: "BaseButton.ce",
  props: {
    color: {
      type: String
    },
    count: {
      type: Number
    }
  },
  setup(e) {
    return (t, s) => (Tt(), fn("button", {
      class: Mt(["px-6 py-3 rounded-md", {
        "bg-gray-200": e.color == null,
        "bg-green-200": e.color === "green",
        "bg-red-200": e.color === "red"
      }])
    }, [
      Kr(t.$slots, "default"),
      e.count != null ? (Tt(), fn("span", Xi, Do(e.count), 1)) : di("", !0)
    ], 2));
  }
}, Ji = /* @__PURE__ */ Yi(qi, [["styles", [Gi]]]), Zi = Ki(Ji);
customElements.define("wc-base-button", Zi);
