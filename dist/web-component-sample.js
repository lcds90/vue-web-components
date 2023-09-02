function bt(a, e) {
  const t = /* @__PURE__ */ Object.create(null), i = a.split(",");
  for (let d = 0; d < i.length; d++)
    t[i[d]] = !0;
  return e ? (d) => !!t[d.toLowerCase()] : (d) => !!t[d];
}
const M = {}, Ua = [], ca = () => {
}, gd = () => !1, xd = /^on[^a-z]/, Ae = (a) => xd.test(a), mt = (a) => a.startsWith("onUpdate:"), V = Object.assign, ut = (a, e) => {
  const t = a.indexOf(e);
  t > -1 && a.splice(t, 1);
}, wd = Object.prototype.hasOwnProperty, N = (a, e) => wd.call(a, e), E = Array.isArray, Ka = (a) => Ne(a) === "[object Map]", wi = (a) => Ne(a) === "[object Set]", P = (a) => typeof a == "function", K = (a) => typeof a == "string", pt = (a) => typeof a == "symbol", G = (a) => a !== null && typeof a == "object", ki = (a) => G(a) && P(a.then) && P(a.catch), yi = Object.prototype.toString, Ne = (a) => yi.call(a), kd = (a) => Ne(a).slice(8, -1), _i = (a) => Ne(a) === "[object Object]", ht = (a) => K(a) && a !== "NaN" && a[0] !== "-" && "" + parseInt(a, 10) === a, _e = /* @__PURE__ */ bt(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
), Te = (a) => {
  const e = /* @__PURE__ */ Object.create(null);
  return (t) => e[t] || (e[t] = a(t));
}, yd = /-(\w)/g, wa = Te((a) => a.replace(yd, (e, t) => t ? t.toUpperCase() : "")), _d = /\B([A-Z])/g, ra = Te(
  (a) => a.replace(_d, "-$1").toLowerCase()
), zi = Te(
  (a) => a.charAt(0).toUpperCase() + a.slice(1)
), qe = Te(
  (a) => a ? `on${zi(a)}` : ""
), Ee = (a, e) => !Object.is(a, e), Be = (a, e) => {
  for (let t = 0; t < a.length; t++)
    a[t](e);
}, Oe = (a, e, t) => {
  Object.defineProperty(a, e, {
    configurable: !0,
    enumerable: !1,
    value: t
  });
}, zd = (a) => {
  const e = parseFloat(a);
  return isNaN(e) ? a : e;
}, Ht = (a) => {
  const e = K(a) ? Number(a) : NaN;
  return isNaN(e) ? a : e;
};
let Vt;
const at = () => Vt || (Vt = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function gt(a) {
  if (E(a)) {
    const e = {};
    for (let t = 0; t < a.length; t++) {
      const i = a[t], d = K(i) ? Id(i) : gt(i);
      if (d)
        for (const o in d)
          e[o] = d[o];
    }
    return e;
  } else {
    if (K(a))
      return a;
    if (G(a))
      return a;
  }
}
const Sd = /;(?![^(]*\))/g, Ed = /:([^]+)/, Od = /\/\*[^]*?\*\//g;
function Id(a) {
  const e = {};
  return a.replace(Od, "").split(Sd).forEach((t) => {
    if (t) {
      const i = t.split(Ed);
      i.length > 1 && (e[i[0].trim()] = i[1].trim());
    }
  }), e;
}
function De(a) {
  let e = "";
  if (K(a))
    e = a;
  else if (E(a))
    for (let t = 0; t < a.length; t++) {
      const i = De(a[t]);
      i && (e += i + " ");
    }
  else if (G(a))
    for (const t in a)
      a[t] && (e += t + " ");
  return e.trim();
}
const Pd = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", jd = /* @__PURE__ */ bt(Pd);
function Si(a) {
  return !!a || a === "";
}
const Cd = (a) => K(a) ? a : a == null ? "" : E(a) || G(a) && (a.toString === yi || !P(a.toString)) ? JSON.stringify(a, Ei, 2) : String(a), Ei = (a, e) => e && e.__v_isRef ? Ei(a, e.value) : Ka(e) ? {
  [`Map(${e.size})`]: [...e.entries()].reduce((t, [i, d]) => (t[`${i} =>`] = d, t), {})
} : wi(e) ? {
  [`Set(${e.size})`]: [...e.values()]
} : G(e) && !E(e) && !_i(e) ? String(e) : e;
let oa;
class Ad {
  constructor(e = !1) {
    this.detached = e, this._active = !0, this.effects = [], this.cleanups = [], this.parent = oa, !e && oa && (this.index = (oa.scopes || (oa.scopes = [])).push(
      this
    ) - 1);
  }
  get active() {
    return this._active;
  }
  run(e) {
    if (this._active) {
      const t = oa;
      try {
        return oa = this, e();
      } finally {
        oa = t;
      }
    }
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  on() {
    oa = this;
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  off() {
    oa = this.parent;
  }
  stop(e) {
    if (this._active) {
      let t, i;
      for (t = 0, i = this.effects.length; t < i; t++)
        this.effects[t].stop();
      for (t = 0, i = this.cleanups.length; t < i; t++)
        this.cleanups[t]();
      if (this.scopes)
        for (t = 0, i = this.scopes.length; t < i; t++)
          this.scopes[t].stop(!0);
      if (!this.detached && this.parent && !e) {
        const d = this.parent.scopes.pop();
        d && d !== this && (this.parent.scopes[this.index] = d, d.index = this.index);
      }
      this.parent = void 0, this._active = !1;
    }
  }
}
function Nd(a, e = oa) {
  e && e.active && e.effects.push(a);
}
function Td() {
  return oa;
}
const xt = (a) => {
  const e = new Set(a);
  return e.w = 0, e.n = 0, e;
}, Oi = (a) => (a.w & Ia) > 0, Ii = (a) => (a.n & Ia) > 0, Dd = ({ deps: a }) => {
  if (a.length)
    for (let e = 0; e < a.length; e++)
      a[e].w |= Ia;
}, Rd = (a) => {
  const { deps: e } = a;
  if (e.length) {
    let t = 0;
    for (let i = 0; i < e.length; i++) {
      const d = e[i];
      Oi(d) && !Ii(d) ? d.delete(a) : e[t++] = d, d.w &= ~Ia, d.n &= ~Ia;
    }
    e.length = t;
  }
}, et = /* @__PURE__ */ new WeakMap();
let te = 0, Ia = 1;
const tt = 30;
let sa;
const Ma = Symbol(""), it = Symbol("");
class wt {
  constructor(e, t = null, i) {
    this.fn = e, this.scheduler = t, this.active = !0, this.deps = [], this.parent = void 0, Nd(this, i);
  }
  run() {
    if (!this.active)
      return this.fn();
    let e = sa, t = Ea;
    for (; e; ) {
      if (e === this)
        return;
      e = e.parent;
    }
    try {
      return this.parent = sa, sa = this, Ea = !0, Ia = 1 << ++te, te <= tt ? Dd(this) : Ut(this), this.fn();
    } finally {
      te <= tt && Rd(this), Ia = 1 << --te, sa = this.parent, Ea = t, this.parent = void 0, this.deferStop && this.stop();
    }
  }
  stop() {
    sa === this ? this.deferStop = !0 : this.active && (Ut(this), this.onStop && this.onStop(), this.active = !1);
  }
}
function Ut(a) {
  const { deps: e } = a;
  if (e.length) {
    for (let t = 0; t < e.length; t++)
      e[t].delete(a);
    e.length = 0;
  }
}
let Ea = !0;
const Pi = [];
function Xa() {
  Pi.push(Ea), Ea = !1;
}
function Ja() {
  const a = Pi.pop();
  Ea = a === void 0 ? !0 : a;
}
function ta(a, e, t) {
  if (Ea && sa) {
    let i = et.get(a);
    i || et.set(a, i = /* @__PURE__ */ new Map());
    let d = i.get(t);
    d || i.set(t, d = xt()), ji(d);
  }
}
function ji(a, e) {
  let t = !1;
  te <= tt ? Ii(a) || (a.n |= Ia, t = !Oi(a)) : t = !a.has(sa), t && (a.add(sa), sa.deps.push(a));
}
function ka(a, e, t, i, d, o) {
  const r = et.get(a);
  if (!r)
    return;
  let l = [];
  if (e === "clear")
    l = [...r.values()];
  else if (t === "length" && E(a)) {
    const c = Number(i);
    r.forEach((v, p) => {
      (p === "length" || p >= c) && l.push(v);
    });
  } else
    switch (t !== void 0 && l.push(r.get(t)), e) {
      case "add":
        E(a) ? ht(t) && l.push(r.get("length")) : (l.push(r.get(Ma)), Ka(a) && l.push(r.get(it)));
        break;
      case "delete":
        E(a) || (l.push(r.get(Ma)), Ka(a) && l.push(r.get(it)));
        break;
      case "set":
        Ka(a) && l.push(r.get(Ma));
        break;
    }
  if (l.length === 1)
    l[0] && dt(l[0]);
  else {
    const c = [];
    for (const v of l)
      v && c.push(...v);
    dt(xt(c));
  }
}
function dt(a, e) {
  const t = E(a) ? a : [...a];
  for (const i of t)
    i.computed && Kt(i);
  for (const i of t)
    i.computed || Kt(i);
}
function Kt(a, e) {
  (a !== sa || a.allowRecurse) && (a.scheduler ? a.scheduler() : a.run());
}
const Ld = /* @__PURE__ */ bt("__proto__,__v_isRef,__isVue"), Ci = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((a) => a !== "arguments" && a !== "caller").map((a) => Symbol[a]).filter(pt)
), Md = /* @__PURE__ */ kt(), Wd = /* @__PURE__ */ kt(!1, !0), Gd = /* @__PURE__ */ kt(!0), qt = /* @__PURE__ */ Fd();
function Fd() {
  const a = {};
  return ["includes", "indexOf", "lastIndexOf"].forEach((e) => {
    a[e] = function(...t) {
      const i = T(this);
      for (let o = 0, r = this.length; o < r; o++)
        ta(i, "get", o + "");
      const d = i[e](...t);
      return d === -1 || d === !1 ? i[e](...t.map(T)) : d;
    };
  }), ["push", "pop", "shift", "unshift", "splice"].forEach((e) => {
    a[e] = function(...t) {
      Xa();
      const i = T(this)[e].apply(this, t);
      return Ja(), i;
    };
  }), a;
}
function Hd(a) {
  const e = T(this);
  return ta(e, "has", a), e.hasOwnProperty(a);
}
function kt(a = !1, e = !1) {
  return function(i, d, o) {
    if (d === "__v_isReactive")
      return !a;
    if (d === "__v_isReadonly")
      return a;
    if (d === "__v_isShallow")
      return e;
    if (d === "__v_raw" && o === (a ? e ? oo : Ri : e ? Di : Ti).get(i))
      return i;
    const r = E(i);
    if (!a) {
      if (r && N(qt, d))
        return Reflect.get(qt, d, o);
      if (d === "hasOwnProperty")
        return Hd;
    }
    const l = Reflect.get(i, d, o);
    return (pt(d) ? Ci.has(d) : Ld(d)) || (a || ta(i, "get", d), e) ? l : Q(l) ? r && ht(d) ? l : l.value : G(l) ? a ? Li(l) : zt(l) : l;
  };
}
const Vd = /* @__PURE__ */ Ai(), Ud = /* @__PURE__ */ Ai(!0);
function Ai(a = !1) {
  return function(t, i, d, o) {
    let r = t[i];
    if (re(r) && Q(r) && !Q(d))
      return !1;
    if (!a && (!ot(d) && !re(d) && (r = T(r), d = T(d)), !E(t) && Q(r) && !Q(d)))
      return r.value = d, !0;
    const l = E(t) && ht(i) ? Number(i) < t.length : N(t, i), c = Reflect.set(t, i, d, o);
    return t === T(o) && (l ? Ee(d, r) && ka(t, "set", i, d) : ka(t, "add", i, d)), c;
  };
}
function Kd(a, e) {
  const t = N(a, e);
  a[e];
  const i = Reflect.deleteProperty(a, e);
  return i && t && ka(a, "delete", e, void 0), i;
}
function qd(a, e) {
  const t = Reflect.has(a, e);
  return (!pt(e) || !Ci.has(e)) && ta(a, "has", e), t;
}
function Bd(a) {
  return ta(a, "iterate", E(a) ? "length" : Ma), Reflect.ownKeys(a);
}
const Ni = {
  get: Md,
  set: Vd,
  deleteProperty: Kd,
  has: qd,
  ownKeys: Bd
}, $d = {
  get: Gd,
  set(a, e) {
    return !0;
  },
  deleteProperty(a, e) {
    return !0;
  }
}, Yd = /* @__PURE__ */ V(
  {},
  Ni,
  {
    get: Wd,
    set: Ud
  }
), yt = (a) => a, Re = (a) => Reflect.getPrototypeOf(a);
function he(a, e, t = !1, i = !1) {
  a = a.__v_raw;
  const d = T(a), o = T(e);
  t || (e !== o && ta(d, "get", e), ta(d, "get", o));
  const { has: r } = Re(d), l = i ? yt : t ? Ot : Et;
  if (r.call(d, e))
    return l(a.get(e));
  if (r.call(d, o))
    return l(a.get(o));
  a !== d && a.get(e);
}
function ge(a, e = !1) {
  const t = this.__v_raw, i = T(t), d = T(a);
  return e || (a !== d && ta(i, "has", a), ta(i, "has", d)), a === d ? t.has(a) : t.has(a) || t.has(d);
}
function xe(a, e = !1) {
  return a = a.__v_raw, !e && ta(T(a), "iterate", Ma), Reflect.get(a, "size", a);
}
function Bt(a) {
  a = T(a);
  const e = T(this);
  return Re(e).has.call(e, a) || (e.add(a), ka(e, "add", a, a)), this;
}
function $t(a, e) {
  e = T(e);
  const t = T(this), { has: i, get: d } = Re(t);
  let o = i.call(t, a);
  o || (a = T(a), o = i.call(t, a));
  const r = d.call(t, a);
  return t.set(a, e), o ? Ee(e, r) && ka(t, "set", a, e) : ka(t, "add", a, e), this;
}
function Yt(a) {
  const e = T(this), { has: t, get: i } = Re(e);
  let d = t.call(e, a);
  d || (a = T(a), d = t.call(e, a)), i && i.call(e, a);
  const o = e.delete(a);
  return d && ka(e, "delete", a, void 0), o;
}
function Xt() {
  const a = T(this), e = a.size !== 0, t = a.clear();
  return e && ka(a, "clear", void 0, void 0), t;
}
function we(a, e) {
  return function(i, d) {
    const o = this, r = o.__v_raw, l = T(r), c = e ? yt : a ? Ot : Et;
    return !a && ta(l, "iterate", Ma), r.forEach((v, p) => i.call(d, c(v), c(p), o));
  };
}
function ke(a, e, t) {
  return function(...i) {
    const d = this.__v_raw, o = T(d), r = Ka(o), l = a === "entries" || a === Symbol.iterator && r, c = a === "keys" && r, v = d[a](...i), p = t ? yt : e ? Ot : Et;
    return !e && ta(
      o,
      "iterate",
      c ? it : Ma
    ), {
      // iterator protocol
      next() {
        const { value: k, done: _ } = v.next();
        return _ ? { value: k, done: _ } : {
          value: l ? [p(k[0]), p(k[1])] : p(k),
          done: _
        };
      },
      // iterable protocol
      [Symbol.iterator]() {
        return this;
      }
    };
  };
}
function za(a) {
  return function(...e) {
    return a === "delete" ? !1 : this;
  };
}
function Xd() {
  const a = {
    get(o) {
      return he(this, o);
    },
    get size() {
      return xe(this);
    },
    has: ge,
    add: Bt,
    set: $t,
    delete: Yt,
    clear: Xt,
    forEach: we(!1, !1)
  }, e = {
    get(o) {
      return he(this, o, !1, !0);
    },
    get size() {
      return xe(this);
    },
    has: ge,
    add: Bt,
    set: $t,
    delete: Yt,
    clear: Xt,
    forEach: we(!1, !0)
  }, t = {
    get(o) {
      return he(this, o, !0);
    },
    get size() {
      return xe(this, !0);
    },
    has(o) {
      return ge.call(this, o, !0);
    },
    add: za("add"),
    set: za("set"),
    delete: za("delete"),
    clear: za("clear"),
    forEach: we(!0, !1)
  }, i = {
    get(o) {
      return he(this, o, !0, !0);
    },
    get size() {
      return xe(this, !0);
    },
    has(o) {
      return ge.call(this, o, !0);
    },
    add: za("add"),
    set: za("set"),
    delete: za("delete"),
    clear: za("clear"),
    forEach: we(!0, !0)
  };
  return ["keys", "values", "entries", Symbol.iterator].forEach((o) => {
    a[o] = ke(
      o,
      !1,
      !1
    ), t[o] = ke(
      o,
      !0,
      !1
    ), e[o] = ke(
      o,
      !1,
      !0
    ), i[o] = ke(
      o,
      !0,
      !0
    );
  }), [
    a,
    t,
    e,
    i
  ];
}
const [
  Jd,
  Zd,
  Qd,
  ao
] = /* @__PURE__ */ Xd();
function _t(a, e) {
  const t = e ? a ? ao : Qd : a ? Zd : Jd;
  return (i, d, o) => d === "__v_isReactive" ? !a : d === "__v_isReadonly" ? a : d === "__v_raw" ? i : Reflect.get(
    N(t, d) && d in i ? t : i,
    d,
    o
  );
}
const eo = {
  get: /* @__PURE__ */ _t(!1, !1)
}, to = {
  get: /* @__PURE__ */ _t(!1, !0)
}, io = {
  get: /* @__PURE__ */ _t(!0, !1)
}, Ti = /* @__PURE__ */ new WeakMap(), Di = /* @__PURE__ */ new WeakMap(), Ri = /* @__PURE__ */ new WeakMap(), oo = /* @__PURE__ */ new WeakMap();
function no(a) {
  switch (a) {
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
function ro(a) {
  return a.__v_skip || !Object.isExtensible(a) ? 0 : no(kd(a));
}
function zt(a) {
  return re(a) ? a : St(
    a,
    !1,
    Ni,
    eo,
    Ti
  );
}
function so(a) {
  return St(
    a,
    !1,
    Yd,
    to,
    Di
  );
}
function Li(a) {
  return St(
    a,
    !0,
    $d,
    io,
    Ri
  );
}
function St(a, e, t, i, d) {
  if (!G(a) || a.__v_raw && !(e && a.__v_isReactive))
    return a;
  const o = d.get(a);
  if (o)
    return o;
  const r = ro(a);
  if (r === 0)
    return a;
  const l = new Proxy(
    a,
    r === 2 ? i : t
  );
  return d.set(a, l), l;
}
function qa(a) {
  return re(a) ? qa(a.__v_raw) : !!(a && a.__v_isReactive);
}
function re(a) {
  return !!(a && a.__v_isReadonly);
}
function ot(a) {
  return !!(a && a.__v_isShallow);
}
function Mi(a) {
  return qa(a) || re(a);
}
function T(a) {
  const e = a && a.__v_raw;
  return e ? T(e) : a;
}
function Wi(a) {
  return Oe(a, "__v_skip", !0), a;
}
const Et = (a) => G(a) ? zt(a) : a, Ot = (a) => G(a) ? Li(a) : a;
function lo(a) {
  Ea && sa && (a = T(a), ji(a.dep || (a.dep = xt())));
}
function co(a, e) {
  a = T(a);
  const t = a.dep;
  t && dt(t);
}
function Q(a) {
  return !!(a && a.__v_isRef === !0);
}
function vo(a) {
  return Q(a) ? a.value : a;
}
const fo = {
  get: (a, e, t) => vo(Reflect.get(a, e, t)),
  set: (a, e, t, i) => {
    const d = a[e];
    return Q(d) && !Q(t) ? (d.value = t, !0) : Reflect.set(a, e, t, i);
  }
};
function Gi(a) {
  return qa(a) ? a : new Proxy(a, fo);
}
class bo {
  constructor(e, t, i, d) {
    this._setter = t, this.dep = void 0, this.__v_isRef = !0, this.__v_isReadonly = !1, this._dirty = !0, this.effect = new wt(e, () => {
      this._dirty || (this._dirty = !0, co(this));
    }), this.effect.computed = this, this.effect.active = this._cacheable = !d, this.__v_isReadonly = i;
  }
  get value() {
    const e = T(this);
    return lo(e), (e._dirty || !e._cacheable) && (e._dirty = !1, e._value = e.effect.run()), e._value;
  }
  set value(e) {
    this._setter(e);
  }
}
function mo(a, e, t = !1) {
  let i, d;
  const o = P(a);
  return o ? (i = a, d = ca) : (i = a.get, d = a.set), new bo(i, d, o || !d, t);
}
function Oa(a, e, t, i) {
  let d;
  try {
    d = i ? a(...i) : a();
  } catch (o) {
    Le(o, e, t);
  }
  return d;
}
function va(a, e, t, i) {
  if (P(a)) {
    const o = Oa(a, e, t, i);
    return o && ki(o) && o.catch((r) => {
      Le(r, e, t);
    }), o;
  }
  const d = [];
  for (let o = 0; o < a.length; o++)
    d.push(va(a[o], e, t, i));
  return d;
}
function Le(a, e, t, i = !0) {
  const d = e ? e.vnode : null;
  if (e) {
    let o = e.parent;
    const r = e.proxy, l = t;
    for (; o; ) {
      const v = o.ec;
      if (v) {
        for (let p = 0; p < v.length; p++)
          if (v[p](a, r, l) === !1)
            return;
      }
      o = o.parent;
    }
    const c = e.appContext.config.errorHandler;
    if (c) {
      Oa(
        c,
        null,
        10,
        [a, r, l]
      );
      return;
    }
  }
  uo(a, t, d, i);
}
function uo(a, e, t, i = !0) {
  console.error(a);
}
let se = !1, nt = !1;
const Y = [];
let ha = 0;
const Ba = [];
let xa = null, Ra = 0;
const Fi = /* @__PURE__ */ Promise.resolve();
let It = null;
function Hi(a) {
  const e = It || Fi;
  return a ? e.then(this ? a.bind(this) : a) : e;
}
function po(a) {
  let e = ha + 1, t = Y.length;
  for (; e < t; ) {
    const i = e + t >>> 1;
    le(Y[i]) < a ? e = i + 1 : t = i;
  }
  return e;
}
function Pt(a) {
  (!Y.length || !Y.includes(
    a,
    se && a.allowRecurse ? ha + 1 : ha
  )) && (a.id == null ? Y.push(a) : Y.splice(po(a.id), 0, a), Vi());
}
function Vi() {
  !se && !nt && (nt = !0, It = Fi.then(Ki));
}
function ho(a) {
  const e = Y.indexOf(a);
  e > ha && Y.splice(e, 1);
}
function go(a) {
  E(a) ? Ba.push(...a) : (!xa || !xa.includes(
    a,
    a.allowRecurse ? Ra + 1 : Ra
  )) && Ba.push(a), Vi();
}
function Jt(a, e = se ? ha + 1 : 0) {
  for (; e < Y.length; e++) {
    const t = Y[e];
    t && t.pre && (Y.splice(e, 1), e--, t());
  }
}
function Ui(a) {
  if (Ba.length) {
    const e = [...new Set(Ba)];
    if (Ba.length = 0, xa) {
      xa.push(...e);
      return;
    }
    for (xa = e, xa.sort((t, i) => le(t) - le(i)), Ra = 0; Ra < xa.length; Ra++)
      xa[Ra]();
    xa = null, Ra = 0;
  }
}
const le = (a) => a.id == null ? 1 / 0 : a.id, xo = (a, e) => {
  const t = le(a) - le(e);
  if (t === 0) {
    if (a.pre && !e.pre)
      return -1;
    if (e.pre && !a.pre)
      return 1;
  }
  return t;
};
function Ki(a) {
  nt = !1, se = !0, Y.sort(xo);
  const e = ca;
  try {
    for (ha = 0; ha < Y.length; ha++) {
      const t = Y[ha];
      t && t.active !== !1 && Oa(t, null, 14);
    }
  } finally {
    ha = 0, Y.length = 0, Ui(), se = !1, It = null, (Y.length || Ba.length) && Ki();
  }
}
function wo(a, e, ...t) {
  if (a.isUnmounted)
    return;
  const i = a.vnode.props || M;
  let d = t;
  const o = e.startsWith("update:"), r = o && e.slice(7);
  if (r && r in i) {
    const p = `${r === "modelValue" ? "model" : r}Modifiers`, { number: k, trim: _ } = i[p] || M;
    _ && (d = t.map((I) => K(I) ? I.trim() : I)), k && (d = t.map(zd));
  }
  let l, c = i[l = qe(e)] || // also try camelCase event handler (#2249)
  i[l = qe(wa(e))];
  !c && o && (c = i[l = qe(ra(e))]), c && va(
    c,
    a,
    6,
    d
  );
  const v = i[l + "Once"];
  if (v) {
    if (!a.emitted)
      a.emitted = {};
    else if (a.emitted[l])
      return;
    a.emitted[l] = !0, va(
      v,
      a,
      6,
      d
    );
  }
}
function qi(a, e, t = !1) {
  const i = e.emitsCache, d = i.get(a);
  if (d !== void 0)
    return d;
  const o = a.emits;
  let r = {}, l = !1;
  if (!P(a)) {
    const c = (v) => {
      const p = qi(v, e, !0);
      p && (l = !0, V(r, p));
    };
    !t && e.mixins.length && e.mixins.forEach(c), a.extends && c(a.extends), a.mixins && a.mixins.forEach(c);
  }
  return !o && !l ? (G(a) && i.set(a, null), null) : (E(o) ? o.forEach((c) => r[c] = null) : V(r, o), G(a) && i.set(a, r), r);
}
function Me(a, e) {
  return !a || !Ae(e) ? !1 : (e = e.slice(2).replace(/Once$/, ""), N(a, e[0].toLowerCase() + e.slice(1)) || N(a, ra(e)) || N(a, e));
}
let ea = null, Bi = null;
function Ie(a) {
  const e = ea;
  return ea = a, Bi = a && a.type.__scopeId || null, e;
}
function ko(a, e = ea, t) {
  if (!e || a._n)
    return a;
  const i = (...d) => {
    i._d && ri(-1);
    const o = Ie(e);
    let r;
    try {
      r = a(...d);
    } finally {
      Ie(o), i._d && ri(1);
    }
    return r;
  };
  return i._n = !0, i._c = !0, i._d = !0, i;
}
function $e(a) {
  const {
    type: e,
    vnode: t,
    proxy: i,
    withProxy: d,
    props: o,
    propsOptions: [r],
    slots: l,
    attrs: c,
    emit: v,
    render: p,
    renderCache: k,
    data: _,
    setupState: I,
    ctx: F,
    inheritAttrs: A
  } = a;
  let U, q;
  const B = Ie(a);
  try {
    if (t.shapeFlag & 4) {
      const j = d || i;
      U = pa(
        p.call(
          j,
          j,
          k,
          o,
          I,
          _,
          F
        )
      ), q = c;
    } else {
      const j = e;
      U = pa(
        j.length > 1 ? j(
          o,
          { attrs: c, slots: l, emit: v }
        ) : j(
          o,
          null
          /* we know it doesn't need it */
        )
      ), q = e.props ? c : yo(c);
    }
  } catch (j) {
    ne.length = 0, Le(j, a, 1), U = fa(Pa);
  }
  let $ = U;
  if (q && A !== !1) {
    const j = Object.keys(q), { shapeFlag: _a } = $;
    j.length && _a & 7 && (r && j.some(mt) && (q = _o(
      q,
      r
    )), $ = $a($, q));
  }
  return t.dirs && ($ = $a($), $.dirs = $.dirs ? $.dirs.concat(t.dirs) : t.dirs), t.transition && ($.transition = t.transition), U = $, Ie(B), U;
}
const yo = (a) => {
  let e;
  for (const t in a)
    (t === "class" || t === "style" || Ae(t)) && ((e || (e = {}))[t] = a[t]);
  return e;
}, _o = (a, e) => {
  const t = {};
  for (const i in a)
    (!mt(i) || !(i.slice(9) in e)) && (t[i] = a[i]);
  return t;
};
function zo(a, e, t) {
  const { props: i, children: d, component: o } = a, { props: r, children: l, patchFlag: c } = e, v = o.emitsOptions;
  if (e.dirs || e.transition)
    return !0;
  if (t && c >= 0) {
    if (c & 1024)
      return !0;
    if (c & 16)
      return i ? Zt(i, r, v) : !!r;
    if (c & 8) {
      const p = e.dynamicProps;
      for (let k = 0; k < p.length; k++) {
        const _ = p[k];
        if (r[_] !== i[_] && !Me(v, _))
          return !0;
      }
    }
  } else
    return (d || l) && (!l || !l.$stable) ? !0 : i === r ? !1 : i ? r ? Zt(i, r, v) : !0 : !!r;
  return !1;
}
function Zt(a, e, t) {
  const i = Object.keys(e);
  if (i.length !== Object.keys(a).length)
    return !0;
  for (let d = 0; d < i.length; d++) {
    const o = i[d];
    if (e[o] !== a[o] && !Me(t, o))
      return !0;
  }
  return !1;
}
function So({ vnode: a, parent: e }, t) {
  for (; e && e.subTree === a; )
    (a = e.vnode).el = t, e = e.parent;
}
const Eo = (a) => a.__isSuspense;
function Oo(a, e) {
  e && e.pendingBranch ? E(a) ? e.effects.push(...a) : e.effects.push(a) : go(a);
}
const ye = {};
function Ye(a, e, t) {
  return $i(a, e, t);
}
function $i(a, e, { immediate: t, deep: i, flush: d, onTrack: o, onTrigger: r } = M) {
  var l;
  const c = Td() === ((l = X) == null ? void 0 : l.scope) ? X : null;
  let v, p = !1, k = !1;
  if (Q(a) ? (v = () => a.value, p = ot(a)) : qa(a) ? (v = () => a, i = !0) : E(a) ? (k = !0, p = a.some((j) => qa(j) || ot(j)), v = () => a.map((j) => {
    if (Q(j))
      return j.value;
    if (qa(j))
      return Va(j);
    if (P(j))
      return Oa(j, c, 2);
  })) : P(a) ? e ? v = () => Oa(a, c, 2) : v = () => {
    if (!(c && c.isUnmounted))
      return _ && _(), va(
        a,
        c,
        3,
        [I]
      );
  } : v = ca, e && i) {
    const j = v;
    v = () => Va(j());
  }
  let _, I = (j) => {
    _ = B.onStop = () => {
      Oa(j, c, 4);
    };
  }, F;
  if (ve)
    if (I = ca, e ? t && va(e, c, 3, [
      v(),
      k ? [] : void 0,
      I
    ]) : v(), d === "sync") {
      const j = zn();
      F = j.__watcherHandles || (j.__watcherHandles = []);
    } else
      return ca;
  let A = k ? new Array(a.length).fill(ye) : ye;
  const U = () => {
    if (B.active)
      if (e) {
        const j = B.run();
        (i || p || (k ? j.some(
          (_a, Za) => Ee(_a, A[Za])
        ) : Ee(j, A))) && (_ && _(), va(e, c, 3, [
          j,
          // pass undefined as the old value when it's changed for the first time
          A === ye ? void 0 : k && A[0] === ye ? [] : A,
          I
        ]), A = j);
      } else
        B.run();
  };
  U.allowRecurse = !!e;
  let q;
  d === "sync" ? q = U : d === "post" ? q = () => aa(U, c && c.suspense) : (U.pre = !0, c && (U.id = c.uid), q = () => Pt(U));
  const B = new wt(v, q);
  e ? t ? U() : A = B.run() : d === "post" ? aa(
    B.run.bind(B),
    c && c.suspense
  ) : B.run();
  const $ = () => {
    B.stop(), c && c.scope && ut(c.scope.effects, B);
  };
  return F && F.push($), $;
}
function Io(a, e, t) {
  const i = this.proxy, d = K(a) ? a.includes(".") ? Yi(i, a) : () => i[a] : a.bind(i, i);
  let o;
  P(e) ? o = e : (o = e.handler, t = e);
  const r = X;
  Ya(this);
  const l = $i(d, o.bind(i), t);
  return r ? Ya(r) : Wa(), l;
}
function Yi(a, e) {
  const t = e.split(".");
  return () => {
    let i = a;
    for (let d = 0; d < t.length && i; d++)
      i = i[t[d]];
    return i;
  };
}
function Va(a, e) {
  if (!G(a) || a.__v_skip || (e = e || /* @__PURE__ */ new Set(), e.has(a)))
    return a;
  if (e.add(a), Q(a))
    Va(a.value, e);
  else if (E(a))
    for (let t = 0; t < a.length; t++)
      Va(a[t], e);
  else if (wi(a) || Ka(a))
    a.forEach((t) => {
      Va(t, e);
    });
  else if (_i(a))
    for (const t in a)
      Va(a[t], e);
  return a;
}
function Ta(a, e, t, i) {
  const d = a.dirs, o = e && e.dirs;
  for (let r = 0; r < d.length; r++) {
    const l = d[r];
    o && (l.oldValue = o[r].value);
    let c = l.dir[i];
    c && (Xa(), va(c, t, 8, [
      a.el,
      l,
      a,
      e
    ]), Ja());
  }
}
function Xi(a, e) {
  return P(a) ? (
    // #8326: extend call and options.name access are considered side-effects
    // by Rollup, so we have to wrap it in a pure-annotated IIFE.
    /* @__PURE__ */ (() => V({ name: a.name }, e, { setup: a }))()
  ) : a;
}
const de = (a) => !!a.type.__asyncLoader, Ji = (a) => a.type.__isKeepAlive;
function Po(a, e) {
  Zi(a, "a", e);
}
function jo(a, e) {
  Zi(a, "da", e);
}
function Zi(a, e, t = X) {
  const i = a.__wdc || (a.__wdc = () => {
    let d = t;
    for (; d; ) {
      if (d.isDeactivated)
        return;
      d = d.parent;
    }
    return a();
  });
  if (We(e, i, t), t) {
    let d = t.parent;
    for (; d && d.parent; )
      Ji(d.parent.vnode) && Co(i, e, t, d), d = d.parent;
  }
}
function Co(a, e, t, i) {
  const d = We(
    e,
    a,
    i,
    !0
    /* prepend */
  );
  Qi(() => {
    ut(i[e], d);
  }, t);
}
function We(a, e, t = X, i = !1) {
  if (t) {
    const d = t[a] || (t[a] = []), o = e.__weh || (e.__weh = (...r) => {
      if (t.isUnmounted)
        return;
      Xa(), Ya(t);
      const l = va(e, t, a, r);
      return Wa(), Ja(), l;
    });
    return i ? d.unshift(o) : d.push(o), o;
  }
}
const ya = (a) => (e, t = X) => (
  // post-create lifecycle registrations are noops during SSR (except for serverPrefetch)
  (!ve || a === "sp") && We(a, (...i) => e(...i), t)
), Ao = ya("bm"), No = ya("m"), To = ya("bu"), Do = ya("u"), Ro = ya("bum"), Qi = ya("um"), Lo = ya("sp"), Mo = ya(
  "rtg"
), Wo = ya(
  "rtc"
);
function Go(a, e = X) {
  We("ec", a, e);
}
const Fo = Symbol.for("v-ndc");
function Ho(a, e, t = {}, i, d) {
  if (ea.isCE || ea.parent && de(ea.parent) && ea.parent.isCE)
    return e !== "default" && (t.name = e), fa("slot", t, i && i());
  let o = a[e];
  o && o._c && (o._d = !1), Ce();
  const r = o && ad(o(t)), l = cd(
    na,
    {
      key: t.key || // slot content array of a dynamic conditional slot may have a branch
      // key attached in the `createSlots` helper, respect that
      r && r.key || `_${e}`
    },
    r || (i ? i() : []),
    r && a._ === 1 ? 64 : -2
  );
  return !d && l.scopeId && (l.slotScopeIds = [l.scopeId + "-s"]), o && o._c && (o._d = !0), l;
}
function ad(a) {
  return a.some((e) => vd(e) ? !(e.type === Pa || e.type === na && !ad(e.children)) : !0) ? a : null;
}
const rt = (a) => a ? md(a) ? Tt(a) || a.proxy : rt(a.parent) : null, oe = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ V(/* @__PURE__ */ Object.create(null), {
    $: (a) => a,
    $el: (a) => a.vnode.el,
    $data: (a) => a.data,
    $props: (a) => a.props,
    $attrs: (a) => a.attrs,
    $slots: (a) => a.slots,
    $refs: (a) => a.refs,
    $parent: (a) => rt(a.parent),
    $root: (a) => rt(a.root),
    $emit: (a) => a.emit,
    $options: (a) => jt(a),
    $forceUpdate: (a) => a.f || (a.f = () => Pt(a.update)),
    $nextTick: (a) => a.n || (a.n = Hi.bind(a.proxy)),
    $watch: (a) => Io.bind(a)
  })
), Xe = (a, e) => a !== M && !a.__isScriptSetup && N(a, e), Vo = {
  get({ _: a }, e) {
    const { ctx: t, setupState: i, data: d, props: o, accessCache: r, type: l, appContext: c } = a;
    let v;
    if (e[0] !== "$") {
      const I = r[e];
      if (I !== void 0)
        switch (I) {
          case 1:
            return i[e];
          case 2:
            return d[e];
          case 4:
            return t[e];
          case 3:
            return o[e];
        }
      else {
        if (Xe(i, e))
          return r[e] = 1, i[e];
        if (d !== M && N(d, e))
          return r[e] = 2, d[e];
        if (
          // only cache other properties when instance has declared (thus stable)
          // props
          (v = a.propsOptions[0]) && N(v, e)
        )
          return r[e] = 3, o[e];
        if (t !== M && N(t, e))
          return r[e] = 4, t[e];
        st && (r[e] = 0);
      }
    }
    const p = oe[e];
    let k, _;
    if (p)
      return e === "$attrs" && ta(a, "get", e), p(a);
    if (
      // css module (injected by vue-loader)
      (k = l.__cssModules) && (k = k[e])
    )
      return k;
    if (t !== M && N(t, e))
      return r[e] = 4, t[e];
    if (
      // global properties
      _ = c.config.globalProperties, N(_, e)
    )
      return _[e];
  },
  set({ _: a }, e, t) {
    const { data: i, setupState: d, ctx: o } = a;
    return Xe(d, e) ? (d[e] = t, !0) : i !== M && N(i, e) ? (i[e] = t, !0) : N(a.props, e) || e[0] === "$" && e.slice(1) in a ? !1 : (o[e] = t, !0);
  },
  has({
    _: { data: a, setupState: e, accessCache: t, ctx: i, appContext: d, propsOptions: o }
  }, r) {
    let l;
    return !!t[r] || a !== M && N(a, r) || Xe(e, r) || (l = o[0]) && N(l, r) || N(i, r) || N(oe, r) || N(d.config.globalProperties, r);
  },
  defineProperty(a, e, t) {
    return t.get != null ? a._.accessCache[e] = 0 : N(t, "value") && this.set(a, e, t.value, null), Reflect.defineProperty(a, e, t);
  }
};
function Qt(a) {
  return E(a) ? a.reduce(
    (e, t) => (e[t] = null, e),
    {}
  ) : a;
}
let st = !0;
function Uo(a) {
  const e = jt(a), t = a.proxy, i = a.ctx;
  st = !1, e.beforeCreate && ai(e.beforeCreate, a, "bc");
  const {
    // state
    data: d,
    computed: o,
    methods: r,
    watch: l,
    provide: c,
    inject: v,
    // lifecycle
    created: p,
    beforeMount: k,
    mounted: _,
    beforeUpdate: I,
    updated: F,
    activated: A,
    deactivated: U,
    beforeDestroy: q,
    beforeUnmount: B,
    destroyed: $,
    unmounted: j,
    render: _a,
    renderTracked: Za,
    renderTriggered: fe,
    errorCaptured: ja,
    serverPrefetch: He,
    // public API
    expose: Ca,
    inheritAttrs: Qa,
    // assets
    components: be,
    directives: me,
    filters: Ve
  } = e;
  if (v && Ko(v, i, null), r)
    for (const W in r) {
      const R = r[W];
      P(R) && (i[W] = R.bind(t));
    }
  if (d) {
    const W = d.call(t, t);
    G(W) && (a.data = zt(W));
  }
  if (st = !0, o)
    for (const W in o) {
      const R = o[W], Aa = P(R) ? R.bind(t, t) : P(R.get) ? R.get.bind(t, t) : ca, ue = !P(R) && P(R.set) ? R.set.bind(t) : ca, Na = yn({
        get: Aa,
        set: ue
      });
      Object.defineProperty(i, W, {
        enumerable: !0,
        configurable: !0,
        get: () => Na.value,
        set: (ba) => Na.value = ba
      });
    }
  if (l)
    for (const W in l)
      ed(l[W], i, t, W);
  if (c) {
    const W = P(c) ? c.call(t) : c;
    Reflect.ownKeys(W).forEach((R) => {
      Jo(R, W[R]);
    });
  }
  p && ai(p, a, "c");
  function J(W, R) {
    E(R) ? R.forEach((Aa) => W(Aa.bind(t))) : R && W(R.bind(t));
  }
  if (J(Ao, k), J(No, _), J(To, I), J(Do, F), J(Po, A), J(jo, U), J(Go, ja), J(Wo, Za), J(Mo, fe), J(Ro, B), J(Qi, j), J(Lo, He), E(Ca))
    if (Ca.length) {
      const W = a.exposed || (a.exposed = {});
      Ca.forEach((R) => {
        Object.defineProperty(W, R, {
          get: () => t[R],
          set: (Aa) => t[R] = Aa
        });
      });
    } else
      a.exposed || (a.exposed = {});
  _a && a.render === ca && (a.render = _a), Qa != null && (a.inheritAttrs = Qa), be && (a.components = be), me && (a.directives = me);
}
function Ko(a, e, t = ca) {
  E(a) && (a = lt(a));
  for (const i in a) {
    const d = a[i];
    let o;
    G(d) ? "default" in d ? o = ze(
      d.from || i,
      d.default,
      !0
      /* treat default function as factory */
    ) : o = ze(d.from || i) : o = ze(d), Q(o) ? Object.defineProperty(e, i, {
      enumerable: !0,
      configurable: !0,
      get: () => o.value,
      set: (r) => o.value = r
    }) : e[i] = o;
  }
}
function ai(a, e, t) {
  va(
    E(a) ? a.map((i) => i.bind(e.proxy)) : a.bind(e.proxy),
    e,
    t
  );
}
function ed(a, e, t, i) {
  const d = i.includes(".") ? Yi(t, i) : () => t[i];
  if (K(a)) {
    const o = e[a];
    P(o) && Ye(d, o);
  } else if (P(a))
    Ye(d, a.bind(t));
  else if (G(a))
    if (E(a))
      a.forEach((o) => ed(o, e, t, i));
    else {
      const o = P(a.handler) ? a.handler.bind(t) : e[a.handler];
      P(o) && Ye(d, o, a);
    }
}
function jt(a) {
  const e = a.type, { mixins: t, extends: i } = e, {
    mixins: d,
    optionsCache: o,
    config: { optionMergeStrategies: r }
  } = a.appContext, l = o.get(e);
  let c;
  return l ? c = l : !d.length && !t && !i ? c = e : (c = {}, d.length && d.forEach(
    (v) => Pe(c, v, r, !0)
  ), Pe(c, e, r)), G(e) && o.set(e, c), c;
}
function Pe(a, e, t, i = !1) {
  const { mixins: d, extends: o } = e;
  o && Pe(a, o, t, !0), d && d.forEach(
    (r) => Pe(a, r, t, !0)
  );
  for (const r in e)
    if (!(i && r === "expose")) {
      const l = qo[r] || t && t[r];
      a[r] = l ? l(a[r], e[r]) : e[r];
    }
  return a;
}
const qo = {
  data: ei,
  props: ti,
  emits: ti,
  // objects
  methods: ie,
  computed: ie,
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
  components: ie,
  directives: ie,
  // watch
  watch: $o,
  // provide / inject
  provide: ei,
  inject: Bo
};
function ei(a, e) {
  return e ? a ? function() {
    return V(
      P(a) ? a.call(this, this) : a,
      P(e) ? e.call(this, this) : e
    );
  } : e : a;
}
function Bo(a, e) {
  return ie(lt(a), lt(e));
}
function lt(a) {
  if (E(a)) {
    const e = {};
    for (let t = 0; t < a.length; t++)
      e[a[t]] = a[t];
    return e;
  }
  return a;
}
function Z(a, e) {
  return a ? [...new Set([].concat(a, e))] : e;
}
function ie(a, e) {
  return a ? V(/* @__PURE__ */ Object.create(null), a, e) : e;
}
function ti(a, e) {
  return a ? E(a) && E(e) ? [.../* @__PURE__ */ new Set([...a, ...e])] : V(
    /* @__PURE__ */ Object.create(null),
    Qt(a),
    Qt(e ?? {})
  ) : e;
}
function $o(a, e) {
  if (!a)
    return e;
  if (!e)
    return a;
  const t = V(/* @__PURE__ */ Object.create(null), a);
  for (const i in e)
    t[i] = Z(a[i], e[i]);
  return t;
}
function td() {
  return {
    app: null,
    config: {
      isNativeTag: gd,
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
let Yo = 0;
function Xo(a, e) {
  return function(i, d = null) {
    P(i) || (i = V({}, i)), d != null && !G(d) && (d = null);
    const o = td(), r = /* @__PURE__ */ new Set();
    let l = !1;
    const c = o.app = {
      _uid: Yo++,
      _component: i,
      _props: d,
      _container: null,
      _context: o,
      _instance: null,
      version: Sn,
      get config() {
        return o.config;
      },
      set config(v) {
      },
      use(v, ...p) {
        return r.has(v) || (v && P(v.install) ? (r.add(v), v.install(c, ...p)) : P(v) && (r.add(v), v(c, ...p))), c;
      },
      mixin(v) {
        return o.mixins.includes(v) || o.mixins.push(v), c;
      },
      component(v, p) {
        return p ? (o.components[v] = p, c) : o.components[v];
      },
      directive(v, p) {
        return p ? (o.directives[v] = p, c) : o.directives[v];
      },
      mount(v, p, k) {
        if (!l) {
          const _ = fa(
            i,
            d
          );
          return _.appContext = o, p && e ? e(_, v) : a(_, v, k), l = !0, c._container = v, v.__vue_app__ = c, Tt(_.component) || _.component.proxy;
        }
      },
      unmount() {
        l && (a(null, c._container), delete c._container.__vue_app__);
      },
      provide(v, p) {
        return o.provides[v] = p, c;
      },
      runWithContext(v) {
        je = c;
        try {
          return v();
        } finally {
          je = null;
        }
      }
    };
    return c;
  };
}
let je = null;
function Jo(a, e) {
  if (X) {
    let t = X.provides;
    const i = X.parent && X.parent.provides;
    i === t && (t = X.provides = Object.create(i)), t[a] = e;
  }
}
function ze(a, e, t = !1) {
  const i = X || ea;
  if (i || je) {
    const d = i ? i.parent == null ? i.vnode.appContext && i.vnode.appContext.provides : i.parent.provides : je._context.provides;
    if (d && a in d)
      return d[a];
    if (arguments.length > 1)
      return t && P(e) ? e.call(i && i.proxy) : e;
  }
}
function Zo(a, e, t, i = !1) {
  const d = {}, o = {};
  Oe(o, Fe, 1), a.propsDefaults = /* @__PURE__ */ Object.create(null), id(a, e, d, o);
  for (const r in a.propsOptions[0])
    r in d || (d[r] = void 0);
  t ? a.props = i ? d : so(d) : a.type.props ? a.props = d : a.props = o, a.attrs = o;
}
function Qo(a, e, t, i) {
  const {
    props: d,
    attrs: o,
    vnode: { patchFlag: r }
  } = a, l = T(d), [c] = a.propsOptions;
  let v = !1;
  if (
    // always force full diff in dev
    // - #1942 if hmr is enabled with sfc component
    // - vite#872 non-sfc component used by sfc component
    (i || r > 0) && !(r & 16)
  ) {
    if (r & 8) {
      const p = a.vnode.dynamicProps;
      for (let k = 0; k < p.length; k++) {
        let _ = p[k];
        if (Me(a.emitsOptions, _))
          continue;
        const I = e[_];
        if (c)
          if (N(o, _))
            I !== o[_] && (o[_] = I, v = !0);
          else {
            const F = wa(_);
            d[F] = ct(
              c,
              l,
              F,
              I,
              a,
              !1
              /* isAbsent */
            );
          }
        else
          I !== o[_] && (o[_] = I, v = !0);
      }
    }
  } else {
    id(a, e, d, o) && (v = !0);
    let p;
    for (const k in l)
      (!e || // for camelCase
      !N(e, k) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((p = ra(k)) === k || !N(e, p))) && (c ? t && // for camelCase
      (t[k] !== void 0 || // for kebab-case
      t[p] !== void 0) && (d[k] = ct(
        c,
        l,
        k,
        void 0,
        a,
        !0
        /* isAbsent */
      )) : delete d[k]);
    if (o !== l)
      for (const k in o)
        (!e || !N(e, k)) && (delete o[k], v = !0);
  }
  v && ka(a, "set", "$attrs");
}
function id(a, e, t, i) {
  const [d, o] = a.propsOptions;
  let r = !1, l;
  if (e)
    for (let c in e) {
      if (_e(c))
        continue;
      const v = e[c];
      let p;
      d && N(d, p = wa(c)) ? !o || !o.includes(p) ? t[p] = v : (l || (l = {}))[p] = v : Me(a.emitsOptions, c) || (!(c in i) || v !== i[c]) && (i[c] = v, r = !0);
    }
  if (o) {
    const c = T(t), v = l || M;
    for (let p = 0; p < o.length; p++) {
      const k = o[p];
      t[k] = ct(
        d,
        c,
        k,
        v[k],
        a,
        !N(v, k)
      );
    }
  }
  return r;
}
function ct(a, e, t, i, d, o) {
  const r = a[t];
  if (r != null) {
    const l = N(r, "default");
    if (l && i === void 0) {
      const c = r.default;
      if (r.type !== Function && !r.skipFactory && P(c)) {
        const { propsDefaults: v } = d;
        t in v ? i = v[t] : (Ya(d), i = v[t] = c.call(
          null,
          e
        ), Wa());
      } else
        i = c;
    }
    r[
      0
      /* shouldCast */
    ] && (o && !l ? i = !1 : r[
      1
      /* shouldCastTrue */
    ] && (i === "" || i === ra(t)) && (i = !0));
  }
  return i;
}
function dd(a, e, t = !1) {
  const i = e.propsCache, d = i.get(a);
  if (d)
    return d;
  const o = a.props, r = {}, l = [];
  let c = !1;
  if (!P(a)) {
    const p = (k) => {
      c = !0;
      const [_, I] = dd(k, e, !0);
      V(r, _), I && l.push(...I);
    };
    !t && e.mixins.length && e.mixins.forEach(p), a.extends && p(a.extends), a.mixins && a.mixins.forEach(p);
  }
  if (!o && !c)
    return G(a) && i.set(a, Ua), Ua;
  if (E(o))
    for (let p = 0; p < o.length; p++) {
      const k = wa(o[p]);
      ii(k) && (r[k] = M);
    }
  else if (o)
    for (const p in o) {
      const k = wa(p);
      if (ii(k)) {
        const _ = o[p], I = r[k] = E(_) || P(_) ? { type: _ } : V({}, _);
        if (I) {
          const F = ni(Boolean, I.type), A = ni(String, I.type);
          I[
            0
            /* shouldCast */
          ] = F > -1, I[
            1
            /* shouldCastTrue */
          ] = A < 0 || F < A, (F > -1 || N(I, "default")) && l.push(k);
        }
      }
    }
  const v = [r, l];
  return G(a) && i.set(a, v), v;
}
function ii(a) {
  return a[0] !== "$";
}
function di(a) {
  const e = a && a.toString().match(/^\s*(function|class) (\w+)/);
  return e ? e[2] : a === null ? "null" : "";
}
function oi(a, e) {
  return di(a) === di(e);
}
function ni(a, e) {
  return E(e) ? e.findIndex((t) => oi(t, a)) : P(e) && oi(e, a) ? 0 : -1;
}
const od = (a) => a[0] === "_" || a === "$stable", Ct = (a) => E(a) ? a.map(pa) : [pa(a)], an = (a, e, t) => {
  if (e._n)
    return e;
  const i = ko((...d) => Ct(e(...d)), t);
  return i._c = !1, i;
}, nd = (a, e, t) => {
  const i = a._ctx;
  for (const d in a) {
    if (od(d))
      continue;
    const o = a[d];
    if (P(o))
      e[d] = an(d, o, i);
    else if (o != null) {
      const r = Ct(o);
      e[d] = () => r;
    }
  }
}, rd = (a, e) => {
  const t = Ct(e);
  a.slots.default = () => t;
}, en = (a, e) => {
  if (a.vnode.shapeFlag & 32) {
    const t = e._;
    t ? (a.slots = T(e), Oe(e, "_", t)) : nd(
      e,
      a.slots = {}
    );
  } else
    a.slots = {}, e && rd(a, e);
  Oe(a.slots, Fe, 1);
}, tn = (a, e, t) => {
  const { vnode: i, slots: d } = a;
  let o = !0, r = M;
  if (i.shapeFlag & 32) {
    const l = e._;
    l ? t && l === 1 ? o = !1 : (V(d, e), !t && l === 1 && delete d._) : (o = !e.$stable, nd(e, d)), r = e;
  } else
    e && (rd(a, e), r = { default: 1 });
  if (o)
    for (const l in d)
      !od(l) && !(l in r) && delete d[l];
};
function vt(a, e, t, i, d = !1) {
  if (E(a)) {
    a.forEach(
      (_, I) => vt(
        _,
        e && (E(e) ? e[I] : e),
        t,
        i,
        d
      )
    );
    return;
  }
  if (de(i) && !d)
    return;
  const o = i.shapeFlag & 4 ? Tt(i.component) || i.component.proxy : i.el, r = d ? null : o, { i: l, r: c } = a, v = e && e.r, p = l.refs === M ? l.refs = {} : l.refs, k = l.setupState;
  if (v != null && v !== c && (K(v) ? (p[v] = null, N(k, v) && (k[v] = null)) : Q(v) && (v.value = null)), P(c))
    Oa(c, l, 12, [r, p]);
  else {
    const _ = K(c), I = Q(c);
    if (_ || I) {
      const F = () => {
        if (a.f) {
          const A = _ ? N(k, c) ? k[c] : p[c] : c.value;
          d ? E(A) && ut(A, o) : E(A) ? A.includes(o) || A.push(o) : _ ? (p[c] = [o], N(k, c) && (k[c] = p[c])) : (c.value = [o], a.k && (p[a.k] = c.value));
        } else
          _ ? (p[c] = r, N(k, c) && (k[c] = r)) : I && (c.value = r, a.k && (p[a.k] = r));
      };
      r ? (F.id = -1, aa(F, t)) : F();
    }
  }
}
const aa = Oo;
function dn(a) {
  return on(a);
}
function on(a, e) {
  const t = at();
  t.__VUE__ = !0;
  const {
    insert: i,
    remove: d,
    patchProp: o,
    createElement: r,
    createText: l,
    createComment: c,
    setText: v,
    setElementText: p,
    parentNode: k,
    nextSibling: _,
    setScopeId: I = ca,
    insertStaticContent: F
  } = a, A = (n, s, f, m = null, b = null, g = null, w = !1, h = null, x = !!s.dynamicChildren) => {
    if (n === s)
      return;
    n && !ee(n, s) && (m = pe(n), ba(n, b, g, !0), n = null), s.patchFlag === -2 && (x = !1, s.dynamicChildren = null);
    const { type: u, ref: z, shapeFlag: y } = s;
    switch (u) {
      case Ge:
        U(n, s, f, m);
        break;
      case Pa:
        q(n, s, f, m);
        break;
      case Je:
        n == null && B(s, f, m, w);
        break;
      case na:
        be(
          n,
          s,
          f,
          m,
          b,
          g,
          w,
          h,
          x
        );
        break;
      default:
        y & 1 ? _a(
          n,
          s,
          f,
          m,
          b,
          g,
          w,
          h,
          x
        ) : y & 6 ? me(
          n,
          s,
          f,
          m,
          b,
          g,
          w,
          h,
          x
        ) : (y & 64 || y & 128) && u.process(
          n,
          s,
          f,
          m,
          b,
          g,
          w,
          h,
          x,
          Ga
        );
    }
    z != null && b && vt(z, n && n.ref, g, s || n, !s);
  }, U = (n, s, f, m) => {
    if (n == null)
      i(
        s.el = l(s.children),
        f,
        m
      );
    else {
      const b = s.el = n.el;
      s.children !== n.children && v(b, s.children);
    }
  }, q = (n, s, f, m) => {
    n == null ? i(
      s.el = c(s.children || ""),
      f,
      m
    ) : s.el = n.el;
  }, B = (n, s, f, m) => {
    [n.el, n.anchor] = F(
      n.children,
      s,
      f,
      m,
      n.el,
      n.anchor
    );
  }, $ = ({ el: n, anchor: s }, f, m) => {
    let b;
    for (; n && n !== s; )
      b = _(n), i(n, f, m), n = b;
    i(s, f, m);
  }, j = ({ el: n, anchor: s }) => {
    let f;
    for (; n && n !== s; )
      f = _(n), d(n), n = f;
    d(s);
  }, _a = (n, s, f, m, b, g, w, h, x) => {
    w = w || s.type === "svg", n == null ? Za(
      s,
      f,
      m,
      b,
      g,
      w,
      h,
      x
    ) : He(
      n,
      s,
      b,
      g,
      w,
      h,
      x
    );
  }, Za = (n, s, f, m, b, g, w, h) => {
    let x, u;
    const { type: z, props: y, shapeFlag: S, transition: O, dirs: C } = n;
    if (x = n.el = r(
      n.type,
      g,
      y && y.is,
      y
    ), S & 8 ? p(x, n.children) : S & 16 && ja(
      n.children,
      x,
      null,
      m,
      b,
      g && z !== "foreignObject",
      w,
      h
    ), C && Ta(n, null, m, "created"), fe(x, n, n.scopeId, w, m), y) {
      for (const D in y)
        D !== "value" && !_e(D) && o(
          x,
          D,
          null,
          y[D],
          g,
          n.children,
          m,
          b,
          ga
        );
      "value" in y && o(x, "value", null, y.value), (u = y.onVnodeBeforeMount) && ua(u, m, n);
    }
    C && Ta(n, null, m, "beforeMount");
    const L = (!b || b && !b.pendingBranch) && O && !O.persisted;
    L && O.beforeEnter(x), i(x, s, f), ((u = y && y.onVnodeMounted) || L || C) && aa(() => {
      u && ua(u, m, n), L && O.enter(x), C && Ta(n, null, m, "mounted");
    }, b);
  }, fe = (n, s, f, m, b) => {
    if (f && I(n, f), m)
      for (let g = 0; g < m.length; g++)
        I(n, m[g]);
    if (b) {
      let g = b.subTree;
      if (s === g) {
        const w = b.vnode;
        fe(
          n,
          w,
          w.scopeId,
          w.slotScopeIds,
          b.parent
        );
      }
    }
  }, ja = (n, s, f, m, b, g, w, h, x = 0) => {
    for (let u = x; u < n.length; u++) {
      const z = n[u] = h ? Sa(n[u]) : pa(n[u]);
      A(
        null,
        z,
        s,
        f,
        m,
        b,
        g,
        w,
        h
      );
    }
  }, He = (n, s, f, m, b, g, w) => {
    const h = s.el = n.el;
    let { patchFlag: x, dynamicChildren: u, dirs: z } = s;
    x |= n.patchFlag & 16;
    const y = n.props || M, S = s.props || M;
    let O;
    f && Da(f, !1), (O = S.onVnodeBeforeUpdate) && ua(O, f, s, n), z && Ta(s, n, f, "beforeUpdate"), f && Da(f, !0);
    const C = b && s.type !== "foreignObject";
    if (u ? Ca(
      n.dynamicChildren,
      u,
      h,
      f,
      m,
      C,
      g
    ) : w || R(
      n,
      s,
      h,
      null,
      f,
      m,
      C,
      g,
      !1
    ), x > 0) {
      if (x & 16)
        Qa(
          h,
          s,
          y,
          S,
          f,
          m,
          b
        );
      else if (x & 2 && y.class !== S.class && o(h, "class", null, S.class, b), x & 4 && o(h, "style", y.style, S.style, b), x & 8) {
        const L = s.dynamicProps;
        for (let D = 0; D < L.length; D++) {
          const H = L[D], da = y[H], Fa = S[H];
          (Fa !== da || H === "value") && o(
            h,
            H,
            da,
            Fa,
            b,
            n.children,
            f,
            m,
            ga
          );
        }
      }
      x & 1 && n.children !== s.children && p(h, s.children);
    } else
      !w && u == null && Qa(
        h,
        s,
        y,
        S,
        f,
        m,
        b
      );
    ((O = S.onVnodeUpdated) || z) && aa(() => {
      O && ua(O, f, s, n), z && Ta(s, n, f, "updated");
    }, m);
  }, Ca = (n, s, f, m, b, g, w) => {
    for (let h = 0; h < s.length; h++) {
      const x = n[h], u = s[h], z = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        x.el && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (x.type === na || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !ee(x, u) || // - In the case of a component, it could contain anything.
        x.shapeFlag & 70) ? k(x.el) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          f
        )
      );
      A(
        x,
        u,
        z,
        null,
        m,
        b,
        g,
        w,
        !0
      );
    }
  }, Qa = (n, s, f, m, b, g, w) => {
    if (f !== m) {
      if (f !== M)
        for (const h in f)
          !_e(h) && !(h in m) && o(
            n,
            h,
            f[h],
            null,
            w,
            s.children,
            b,
            g,
            ga
          );
      for (const h in m) {
        if (_e(h))
          continue;
        const x = m[h], u = f[h];
        x !== u && h !== "value" && o(
          n,
          h,
          u,
          x,
          w,
          s.children,
          b,
          g,
          ga
        );
      }
      "value" in m && o(n, "value", f.value, m.value);
    }
  }, be = (n, s, f, m, b, g, w, h, x) => {
    const u = s.el = n ? n.el : l(""), z = s.anchor = n ? n.anchor : l("");
    let { patchFlag: y, dynamicChildren: S, slotScopeIds: O } = s;
    O && (h = h ? h.concat(O) : O), n == null ? (i(u, f, m), i(z, f, m), ja(
      s.children,
      f,
      z,
      b,
      g,
      w,
      h,
      x
    )) : y > 0 && y & 64 && S && // #2715 the previous fragment could've been a BAILed one as a result
    // of renderSlot() with no valid children
    n.dynamicChildren ? (Ca(
      n.dynamicChildren,
      S,
      f,
      b,
      g,
      w,
      h
    ), // #2080 if the stable fragment has a key, it's a <template v-for> that may
    //  get moved around. Make sure all root level vnodes inherit el.
    // #2134 or if it's a component root, it may also get moved around
    // as the component is being moved.
    (s.key != null || b && s === b.subTree) && sd(
      n,
      s,
      !0
      /* shallow */
    )) : R(
      n,
      s,
      f,
      z,
      b,
      g,
      w,
      h,
      x
    );
  }, me = (n, s, f, m, b, g, w, h, x) => {
    s.slotScopeIds = h, n == null ? s.shapeFlag & 512 ? b.ctx.activate(
      s,
      f,
      m,
      w,
      x
    ) : Ve(
      s,
      f,
      m,
      b,
      g,
      w,
      x
    ) : Rt(n, s, x);
  }, Ve = (n, s, f, m, b, g, w) => {
    const h = n.component = pn(
      n,
      m,
      b
    );
    if (Ji(n) && (h.ctx.renderer = Ga), hn(h), h.asyncDep) {
      if (b && b.registerDep(h, J), !n.el) {
        const x = h.subTree = fa(Pa);
        q(null, x, s, f);
      }
      return;
    }
    J(
      h,
      n,
      s,
      f,
      b,
      g,
      w
    );
  }, Rt = (n, s, f) => {
    const m = s.component = n.component;
    if (zo(n, s, f))
      if (m.asyncDep && !m.asyncResolved) {
        W(m, s, f);
        return;
      } else
        m.next = s, ho(m.update), m.update();
    else
      s.el = n.el, m.vnode = s;
  }, J = (n, s, f, m, b, g, w) => {
    const h = () => {
      if (n.isMounted) {
        let { next: z, bu: y, u: S, parent: O, vnode: C } = n, L = z, D;
        Da(n, !1), z ? (z.el = C.el, W(n, z, w)) : z = C, y && Be(y), (D = z.props && z.props.onVnodeBeforeUpdate) && ua(D, O, z, C), Da(n, !0);
        const H = $e(n), da = n.subTree;
        n.subTree = H, A(
          da,
          H,
          // parent may have changed if it's in a teleport
          k(da.el),
          // anchor may have changed if it's in a fragment
          pe(da),
          n,
          b,
          g
        ), z.el = H.el, L === null && So(n, H.el), S && aa(S, b), (D = z.props && z.props.onVnodeUpdated) && aa(
          () => ua(D, O, z, C),
          b
        );
      } else {
        let z;
        const { el: y, props: S } = s, { bm: O, m: C, parent: L } = n, D = de(s);
        if (Da(n, !1), O && Be(O), !D && (z = S && S.onVnodeBeforeMount) && ua(z, L, s), Da(n, !0), y && Ke) {
          const H = () => {
            n.subTree = $e(n), Ke(
              y,
              n.subTree,
              n,
              b,
              null
            );
          };
          D ? s.type.__asyncLoader().then(
            // note: we are moving the render call into an async callback,
            // which means it won't track dependencies - but it's ok because
            // a server-rendered async wrapper is already in resolved state
            // and it will never need to change.
            () => !n.isUnmounted && H()
          ) : H();
        } else {
          const H = n.subTree = $e(n);
          A(
            null,
            H,
            f,
            m,
            n,
            b,
            g
          ), s.el = H.el;
        }
        if (C && aa(C, b), !D && (z = S && S.onVnodeMounted)) {
          const H = s;
          aa(
            () => ua(z, L, H),
            b
          );
        }
        (s.shapeFlag & 256 || L && de(L.vnode) && L.vnode.shapeFlag & 256) && n.a && aa(n.a, b), n.isMounted = !0, s = f = m = null;
      }
    }, x = n.effect = new wt(
      h,
      () => Pt(u),
      n.scope
      // track it in component's effect scope
    ), u = n.update = () => x.run();
    u.id = n.uid, Da(n, !0), u();
  }, W = (n, s, f) => {
    s.component = n;
    const m = n.vnode.props;
    n.vnode = s, n.next = null, Qo(n, s.props, m, f), tn(n, s.children, f), Xa(), Jt(), Ja();
  }, R = (n, s, f, m, b, g, w, h, x = !1) => {
    const u = n && n.children, z = n ? n.shapeFlag : 0, y = s.children, { patchFlag: S, shapeFlag: O } = s;
    if (S > 0) {
      if (S & 128) {
        ue(
          u,
          y,
          f,
          m,
          b,
          g,
          w,
          h,
          x
        );
        return;
      } else if (S & 256) {
        Aa(
          u,
          y,
          f,
          m,
          b,
          g,
          w,
          h,
          x
        );
        return;
      }
    }
    O & 8 ? (z & 16 && ga(u, b, g), y !== u && p(f, y)) : z & 16 ? O & 16 ? ue(
      u,
      y,
      f,
      m,
      b,
      g,
      w,
      h,
      x
    ) : ga(u, b, g, !0) : (z & 8 && p(f, ""), O & 16 && ja(
      y,
      f,
      m,
      b,
      g,
      w,
      h,
      x
    ));
  }, Aa = (n, s, f, m, b, g, w, h, x) => {
    n = n || Ua, s = s || Ua;
    const u = n.length, z = s.length, y = Math.min(u, z);
    let S;
    for (S = 0; S < y; S++) {
      const O = s[S] = x ? Sa(s[S]) : pa(s[S]);
      A(
        n[S],
        O,
        f,
        null,
        b,
        g,
        w,
        h,
        x
      );
    }
    u > z ? ga(
      n,
      b,
      g,
      !0,
      !1,
      y
    ) : ja(
      s,
      f,
      m,
      b,
      g,
      w,
      h,
      x,
      y
    );
  }, ue = (n, s, f, m, b, g, w, h, x) => {
    let u = 0;
    const z = s.length;
    let y = n.length - 1, S = z - 1;
    for (; u <= y && u <= S; ) {
      const O = n[u], C = s[u] = x ? Sa(s[u]) : pa(s[u]);
      if (ee(O, C))
        A(
          O,
          C,
          f,
          null,
          b,
          g,
          w,
          h,
          x
        );
      else
        break;
      u++;
    }
    for (; u <= y && u <= S; ) {
      const O = n[y], C = s[S] = x ? Sa(s[S]) : pa(s[S]);
      if (ee(O, C))
        A(
          O,
          C,
          f,
          null,
          b,
          g,
          w,
          h,
          x
        );
      else
        break;
      y--, S--;
    }
    if (u > y) {
      if (u <= S) {
        const O = S + 1, C = O < z ? s[O].el : m;
        for (; u <= S; )
          A(
            null,
            s[u] = x ? Sa(s[u]) : pa(s[u]),
            f,
            C,
            b,
            g,
            w,
            h,
            x
          ), u++;
      }
    } else if (u > S)
      for (; u <= y; )
        ba(n[u], b, g, !0), u++;
    else {
      const O = u, C = u, L = /* @__PURE__ */ new Map();
      for (u = C; u <= S; u++) {
        const ia = s[u] = x ? Sa(s[u]) : pa(s[u]);
        ia.key != null && L.set(ia.key, u);
      }
      let D, H = 0;
      const da = S - C + 1;
      let Fa = !1, Wt = 0;
      const ae = new Array(da);
      for (u = 0; u < da; u++)
        ae[u] = 0;
      for (u = O; u <= y; u++) {
        const ia = n[u];
        if (H >= da) {
          ba(ia, b, g, !0);
          continue;
        }
        let ma;
        if (ia.key != null)
          ma = L.get(ia.key);
        else
          for (D = C; D <= S; D++)
            if (ae[D - C] === 0 && ee(ia, s[D])) {
              ma = D;
              break;
            }
        ma === void 0 ? ba(ia, b, g, !0) : (ae[ma - C] = u + 1, ma >= Wt ? Wt = ma : Fa = !0, A(
          ia,
          s[ma],
          f,
          null,
          b,
          g,
          w,
          h,
          x
        ), H++);
      }
      const Gt = Fa ? nn(ae) : Ua;
      for (D = Gt.length - 1, u = da - 1; u >= 0; u--) {
        const ia = C + u, ma = s[ia], Ft = ia + 1 < z ? s[ia + 1].el : m;
        ae[u] === 0 ? A(
          null,
          ma,
          f,
          Ft,
          b,
          g,
          w,
          h,
          x
        ) : Fa && (D < 0 || u !== Gt[D] ? Na(ma, f, Ft, 2) : D--);
      }
    }
  }, Na = (n, s, f, m, b = null) => {
    const { el: g, type: w, transition: h, children: x, shapeFlag: u } = n;
    if (u & 6) {
      Na(n.component.subTree, s, f, m);
      return;
    }
    if (u & 128) {
      n.suspense.move(s, f, m);
      return;
    }
    if (u & 64) {
      w.move(n, s, f, Ga);
      return;
    }
    if (w === na) {
      i(g, s, f);
      for (let y = 0; y < x.length; y++)
        Na(x[y], s, f, m);
      i(n.anchor, s, f);
      return;
    }
    if (w === Je) {
      $(n, s, f);
      return;
    }
    if (m !== 2 && u & 1 && h)
      if (m === 0)
        h.beforeEnter(g), i(g, s, f), aa(() => h.enter(g), b);
      else {
        const { leave: y, delayLeave: S, afterLeave: O } = h, C = () => i(g, s, f), L = () => {
          y(g, () => {
            C(), O && O();
          });
        };
        S ? S(g, C, L) : L();
      }
    else
      i(g, s, f);
  }, ba = (n, s, f, m = !1, b = !1) => {
    const {
      type: g,
      props: w,
      ref: h,
      children: x,
      dynamicChildren: u,
      shapeFlag: z,
      patchFlag: y,
      dirs: S
    } = n;
    if (h != null && vt(h, null, f, n, !0), z & 256) {
      s.ctx.deactivate(n);
      return;
    }
    const O = z & 1 && S, C = !de(n);
    let L;
    if (C && (L = w && w.onVnodeBeforeUnmount) && ua(L, s, n), z & 6)
      hd(n.component, f, m);
    else {
      if (z & 128) {
        n.suspense.unmount(f, m);
        return;
      }
      O && Ta(n, null, s, "beforeUnmount"), z & 64 ? n.type.remove(
        n,
        s,
        f,
        b,
        Ga,
        m
      ) : u && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (g !== na || y > 0 && y & 64) ? ga(
        u,
        s,
        f,
        !1,
        !0
      ) : (g === na && y & 384 || !b && z & 16) && ga(x, s, f), m && Lt(n);
    }
    (C && (L = w && w.onVnodeUnmounted) || O) && aa(() => {
      L && ua(L, s, n), O && Ta(n, null, s, "unmounted");
    }, f);
  }, Lt = (n) => {
    const { type: s, el: f, anchor: m, transition: b } = n;
    if (s === na) {
      pd(f, m);
      return;
    }
    if (s === Je) {
      j(n);
      return;
    }
    const g = () => {
      d(f), b && !b.persisted && b.afterLeave && b.afterLeave();
    };
    if (n.shapeFlag & 1 && b && !b.persisted) {
      const { leave: w, delayLeave: h } = b, x = () => w(f, g);
      h ? h(n.el, g, x) : x();
    } else
      g();
  }, pd = (n, s) => {
    let f;
    for (; n !== s; )
      f = _(n), d(n), n = f;
    d(s);
  }, hd = (n, s, f) => {
    const { bum: m, scope: b, update: g, subTree: w, um: h } = n;
    m && Be(m), b.stop(), g && (g.active = !1, ba(w, n, s, f)), h && aa(h, s), aa(() => {
      n.isUnmounted = !0;
    }, s), s && s.pendingBranch && !s.isUnmounted && n.asyncDep && !n.asyncResolved && n.suspenseId === s.pendingId && (s.deps--, s.deps === 0 && s.resolve());
  }, ga = (n, s, f, m = !1, b = !1, g = 0) => {
    for (let w = g; w < n.length; w++)
      ba(n[w], s, f, m, b);
  }, pe = (n) => n.shapeFlag & 6 ? pe(n.component.subTree) : n.shapeFlag & 128 ? n.suspense.next() : _(n.anchor || n.el), Mt = (n, s, f) => {
    n == null ? s._vnode && ba(s._vnode, null, null, !0) : A(s._vnode || null, n, s, null, null, null, f), Jt(), Ui(), s._vnode = n;
  }, Ga = {
    p: A,
    um: ba,
    m: Na,
    r: Lt,
    mt: Ve,
    mc: ja,
    pc: R,
    pbc: Ca,
    n: pe,
    o: a
  };
  let Ue, Ke;
  return e && ([Ue, Ke] = e(
    Ga
  )), {
    render: Mt,
    hydrate: Ue,
    createApp: Xo(Mt, Ue)
  };
}
function Da({ effect: a, update: e }, t) {
  a.allowRecurse = e.allowRecurse = t;
}
function sd(a, e, t = !1) {
  const i = a.children, d = e.children;
  if (E(i) && E(d))
    for (let o = 0; o < i.length; o++) {
      const r = i[o];
      let l = d[o];
      l.shapeFlag & 1 && !l.dynamicChildren && ((l.patchFlag <= 0 || l.patchFlag === 32) && (l = d[o] = Sa(d[o]), l.el = r.el), t || sd(r, l)), l.type === Ge && (l.el = r.el);
    }
}
function nn(a) {
  const e = a.slice(), t = [0];
  let i, d, o, r, l;
  const c = a.length;
  for (i = 0; i < c; i++) {
    const v = a[i];
    if (v !== 0) {
      if (d = t[t.length - 1], a[d] < v) {
        e[i] = d, t.push(i);
        continue;
      }
      for (o = 0, r = t.length - 1; o < r; )
        l = o + r >> 1, a[t[l]] < v ? o = l + 1 : r = l;
      v < a[t[o]] && (o > 0 && (e[i] = t[o - 1]), t[o] = i);
    }
  }
  for (o = t.length, r = t[o - 1]; o-- > 0; )
    t[o] = r, r = e[r];
  return t;
}
const rn = (a) => a.__isTeleport, na = Symbol.for("v-fgt"), Ge = Symbol.for("v-txt"), Pa = Symbol.for("v-cmt"), Je = Symbol.for("v-stc"), ne = [];
let la = null;
function Ce(a = !1) {
  ne.push(la = a ? null : []);
}
function sn() {
  ne.pop(), la = ne[ne.length - 1] || null;
}
let ce = 1;
function ri(a) {
  ce += a;
}
function ld(a) {
  return a.dynamicChildren = ce > 0 ? la || Ua : null, sn(), ce > 0 && la && la.push(a), a;
}
function si(a, e, t, i, d, o) {
  return ld(
    bd(
      a,
      e,
      t,
      i,
      d,
      o,
      !0
      /* isBlock */
    )
  );
}
function cd(a, e, t, i, d) {
  return ld(
    fa(
      a,
      e,
      t,
      i,
      d,
      !0
      /* isBlock: prevent a block from tracking itself */
    )
  );
}
function vd(a) {
  return a ? a.__v_isVNode === !0 : !1;
}
function ee(a, e) {
  return a.type === e.type && a.key === e.key;
}
const Fe = "__vInternal", fd = ({ key: a }) => a ?? null, Se = ({
  ref: a,
  ref_key: e,
  ref_for: t
}) => (typeof a == "number" && (a = "" + a), a != null ? K(a) || Q(a) || P(a) ? { i: ea, r: a, k: e, f: !!t } : a : null);
function bd(a, e = null, t = null, i = 0, d = null, o = a === na ? 0 : 1, r = !1, l = !1) {
  const c = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: a,
    props: e,
    key: e && fd(e),
    ref: e && Se(e),
    scopeId: Bi,
    slotScopeIds: null,
    children: t,
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
    shapeFlag: o,
    patchFlag: i,
    dynamicProps: d,
    dynamicChildren: null,
    appContext: null,
    ctx: ea
  };
  return l ? (At(c, t), o & 128 && a.normalize(c)) : t && (c.shapeFlag |= K(t) ? 8 : 16), ce > 0 && // avoid a block node from tracking itself
  !r && // has current parent block
  la && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (c.patchFlag > 0 || o & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  c.patchFlag !== 32 && la.push(c), c;
}
const fa = ln;
function ln(a, e = null, t = null, i = 0, d = null, o = !1) {
  if ((!a || a === Fo) && (a = Pa), vd(a)) {
    const l = $a(
      a,
      e,
      !0
      /* mergeRef: true */
    );
    return t && At(l, t), ce > 0 && !o && la && (l.shapeFlag & 6 ? la[la.indexOf(a)] = l : la.push(l)), l.patchFlag |= -2, l;
  }
  if (kn(a) && (a = a.__vccOpts), e) {
    e = cn(e);
    let { class: l, style: c } = e;
    l && !K(l) && (e.class = De(l)), G(c) && (Mi(c) && !E(c) && (c = V({}, c)), e.style = gt(c));
  }
  const r = K(a) ? 1 : Eo(a) ? 128 : rn(a) ? 64 : G(a) ? 4 : P(a) ? 2 : 0;
  return bd(
    a,
    e,
    t,
    i,
    d,
    r,
    o,
    !0
  );
}
function cn(a) {
  return a ? Mi(a) || Fe in a ? V({}, a) : a : null;
}
function $a(a, e, t = !1) {
  const { props: i, ref: d, patchFlag: o, children: r } = a, l = e ? bn(i || {}, e) : i;
  return {
    __v_isVNode: !0,
    __v_skip: !0,
    type: a.type,
    props: l,
    key: l && fd(l),
    ref: e && e.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      t && d ? E(d) ? d.concat(Se(e)) : [d, Se(e)] : Se(e)
    ) : d,
    scopeId: a.scopeId,
    slotScopeIds: a.slotScopeIds,
    children: r,
    target: a.target,
    targetAnchor: a.targetAnchor,
    staticCount: a.staticCount,
    shapeFlag: a.shapeFlag,
    // if the vnode is cloned with extra props, we can no longer assume its
    // existing patch flag to be reliable and need to add the FULL_PROPS flag.
    // note: preserve flag for fragments since they use the flag for children
    // fast paths only.
    patchFlag: e && a.type !== na ? o === -1 ? 16 : o | 16 : o,
    dynamicProps: a.dynamicProps,
    dynamicChildren: a.dynamicChildren,
    appContext: a.appContext,
    dirs: a.dirs,
    transition: a.transition,
    // These should technically only be non-null on mounted VNodes. However,
    // they *should* be copied for kept-alive vnodes. So we just always copy
    // them since them being non-null during a mount doesn't affect the logic as
    // they will simply be overwritten.
    component: a.component,
    suspense: a.suspense,
    ssContent: a.ssContent && $a(a.ssContent),
    ssFallback: a.ssFallback && $a(a.ssFallback),
    el: a.el,
    anchor: a.anchor,
    ctx: a.ctx,
    ce: a.ce
  };
}
function vn(a = " ", e = 0) {
  return fa(Ge, null, a, e);
}
function fn(a = "", e = !1) {
  return e ? (Ce(), cd(Pa, null, a)) : fa(Pa, null, a);
}
function pa(a) {
  return a == null || typeof a == "boolean" ? fa(Pa) : E(a) ? fa(
    na,
    null,
    // #3666, avoid reference pollution when reusing vnode
    a.slice()
  ) : typeof a == "object" ? Sa(a) : fa(Ge, null, String(a));
}
function Sa(a) {
  return a.el === null && a.patchFlag !== -1 || a.memo ? a : $a(a);
}
function At(a, e) {
  let t = 0;
  const { shapeFlag: i } = a;
  if (e == null)
    e = null;
  else if (E(e))
    t = 16;
  else if (typeof e == "object")
    if (i & 65) {
      const d = e.default;
      d && (d._c && (d._d = !1), At(a, d()), d._c && (d._d = !0));
      return;
    } else {
      t = 32;
      const d = e._;
      !d && !(Fe in e) ? e._ctx = ea : d === 3 && ea && (ea.slots._ === 1 ? e._ = 1 : (e._ = 2, a.patchFlag |= 1024));
    }
  else
    P(e) ? (e = { default: e, _ctx: ea }, t = 32) : (e = String(e), i & 64 ? (t = 16, e = [vn(e)]) : t = 8);
  a.children = e, a.shapeFlag |= t;
}
function bn(...a) {
  const e = {};
  for (let t = 0; t < a.length; t++) {
    const i = a[t];
    for (const d in i)
      if (d === "class")
        e.class !== i.class && (e.class = De([e.class, i.class]));
      else if (d === "style")
        e.style = gt([e.style, i.style]);
      else if (Ae(d)) {
        const o = e[d], r = i[d];
        r && o !== r && !(E(o) && o.includes(r)) && (e[d] = o ? [].concat(o, r) : r);
      } else
        d !== "" && (e[d] = i[d]);
  }
  return e;
}
function ua(a, e, t, i = null) {
  va(a, e, 7, [
    t,
    i
  ]);
}
const mn = td();
let un = 0;
function pn(a, e, t) {
  const i = a.type, d = (e ? e.appContext : a.appContext) || mn, o = {
    uid: un++,
    vnode: a,
    type: i,
    parent: e,
    appContext: d,
    root: null,
    // to be immediately set
    next: null,
    subTree: null,
    // will be set synchronously right after creation
    effect: null,
    update: null,
    // will be set synchronously right after creation
    scope: new Ad(
      !0
      /* detached */
    ),
    render: null,
    proxy: null,
    exposed: null,
    exposeProxy: null,
    withProxy: null,
    provides: e ? e.provides : Object.create(d.provides),
    accessCache: null,
    renderCache: [],
    // local resolved assets
    components: null,
    directives: null,
    // resolved props and emits options
    propsOptions: dd(i, d),
    emitsOptions: qi(i, d),
    // emit
    emit: null,
    // to be set immediately
    emitted: null,
    // props default value
    propsDefaults: M,
    // inheritAttrs
    inheritAttrs: i.inheritAttrs,
    // state
    ctx: M,
    data: M,
    props: M,
    attrs: M,
    slots: M,
    refs: M,
    setupState: M,
    setupContext: null,
    attrsProxy: null,
    slotsProxy: null,
    // suspense related
    suspense: t,
    suspenseId: t ? t.pendingId : 0,
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
  return o.ctx = { _: o }, o.root = e ? e.root : o, o.emit = wo.bind(null, o), a.ce && a.ce(o), o;
}
let X = null, Nt, Ha, li = "__VUE_INSTANCE_SETTERS__";
(Ha = at()[li]) || (Ha = at()[li] = []), Ha.push((a) => X = a), Nt = (a) => {
  Ha.length > 1 ? Ha.forEach((e) => e(a)) : Ha[0](a);
};
const Ya = (a) => {
  Nt(a), a.scope.on();
}, Wa = () => {
  X && X.scope.off(), Nt(null);
};
function md(a) {
  return a.vnode.shapeFlag & 4;
}
let ve = !1;
function hn(a, e = !1) {
  ve = e;
  const { props: t, children: i } = a.vnode, d = md(a);
  Zo(a, t, d, e), en(a, i);
  const o = d ? gn(a, e) : void 0;
  return ve = !1, o;
}
function gn(a, e) {
  const t = a.type;
  a.accessCache = /* @__PURE__ */ Object.create(null), a.proxy = Wi(new Proxy(a.ctx, Vo));
  const { setup: i } = t;
  if (i) {
    const d = a.setupContext = i.length > 1 ? wn(a) : null;
    Ya(a), Xa();
    const o = Oa(
      i,
      a,
      0,
      [a.props, d]
    );
    if (Ja(), Wa(), ki(o)) {
      if (o.then(Wa, Wa), e)
        return o.then((r) => {
          ci(a, r, e);
        }).catch((r) => {
          Le(r, a, 0);
        });
      a.asyncDep = o;
    } else
      ci(a, o, e);
  } else
    ud(a, e);
}
function ci(a, e, t) {
  P(e) ? a.type.__ssrInlineRender ? a.ssrRender = e : a.render = e : G(e) && (a.setupState = Gi(e)), ud(a, t);
}
let vi;
function ud(a, e, t) {
  const i = a.type;
  if (!a.render) {
    if (!e && vi && !i.render) {
      const d = i.template || jt(a).template;
      if (d) {
        const { isCustomElement: o, compilerOptions: r } = a.appContext.config, { delimiters: l, compilerOptions: c } = i, v = V(
          V(
            {
              isCustomElement: o,
              delimiters: l
            },
            r
          ),
          c
        );
        i.render = vi(d, v);
      }
    }
    a.render = i.render || ca;
  }
  Ya(a), Xa(), Uo(a), Ja(), Wa();
}
function xn(a) {
  return a.attrsProxy || (a.attrsProxy = new Proxy(
    a.attrs,
    {
      get(e, t) {
        return ta(a, "get", "$attrs"), e[t];
      }
    }
  ));
}
function wn(a) {
  const e = (t) => {
    a.exposed = t || {};
  };
  return {
    get attrs() {
      return xn(a);
    },
    slots: a.slots,
    emit: a.emit,
    expose: e
  };
}
function Tt(a) {
  if (a.exposed)
    return a.exposeProxy || (a.exposeProxy = new Proxy(Gi(Wi(a.exposed)), {
      get(e, t) {
        if (t in e)
          return e[t];
        if (t in oe)
          return oe[t](a);
      },
      has(e, t) {
        return t in e || t in oe;
      }
    }));
}
function kn(a) {
  return P(a) && "__vccOpts" in a;
}
const yn = (a, e) => mo(a, e, ve), _n = Symbol.for("v-scx"), zn = () => ze(_n), Sn = "3.3.4", En = "http://www.w3.org/2000/svg", La = typeof document < "u" ? document : null, fi = La && /* @__PURE__ */ La.createElement("template"), On = {
  insert: (a, e, t) => {
    e.insertBefore(a, t || null);
  },
  remove: (a) => {
    const e = a.parentNode;
    e && e.removeChild(a);
  },
  createElement: (a, e, t, i) => {
    const d = e ? La.createElementNS(En, a) : La.createElement(a, t ? { is: t } : void 0);
    return a === "select" && i && i.multiple != null && d.setAttribute("multiple", i.multiple), d;
  },
  createText: (a) => La.createTextNode(a),
  createComment: (a) => La.createComment(a),
  setText: (a, e) => {
    a.nodeValue = e;
  },
  setElementText: (a, e) => {
    a.textContent = e;
  },
  parentNode: (a) => a.parentNode,
  nextSibling: (a) => a.nextSibling,
  querySelector: (a) => La.querySelector(a),
  setScopeId(a, e) {
    a.setAttribute(e, "");
  },
  // __UNSAFE__
  // Reason: innerHTML.
  // Static content here can only come from compiled templates.
  // As long as the user only uses trusted templates, this is safe.
  insertStaticContent(a, e, t, i, d, o) {
    const r = t ? t.previousSibling : e.lastChild;
    if (d && (d === o || d.nextSibling))
      for (; e.insertBefore(d.cloneNode(!0), t), !(d === o || !(d = d.nextSibling)); )
        ;
    else {
      fi.innerHTML = i ? `<svg>${a}</svg>` : a;
      const l = fi.content;
      if (i) {
        const c = l.firstChild;
        for (; c.firstChild; )
          l.appendChild(c.firstChild);
        l.removeChild(c);
      }
      e.insertBefore(l, t);
    }
    return [
      // first
      r ? r.nextSibling : e.firstChild,
      // last
      t ? t.previousSibling : e.lastChild
    ];
  }
};
function In(a, e, t) {
  const i = a._vtc;
  i && (e = (e ? [e, ...i] : [...i]).join(" ")), e == null ? a.removeAttribute("class") : t ? a.setAttribute("class", e) : a.className = e;
}
function Pn(a, e, t) {
  const i = a.style, d = K(t);
  if (t && !d) {
    if (e && !K(e))
      for (const o in e)
        t[o] == null && ft(i, o, "");
    for (const o in t)
      ft(i, o, t[o]);
  } else {
    const o = i.display;
    d ? e !== t && (i.cssText = t) : e && a.removeAttribute("style"), "_vod" in a && (i.display = o);
  }
}
const bi = /\s*!important$/;
function ft(a, e, t) {
  if (E(t))
    t.forEach((i) => ft(a, e, i));
  else if (t == null && (t = ""), e.startsWith("--"))
    a.setProperty(e, t);
  else {
    const i = jn(a, e);
    bi.test(t) ? a.setProperty(
      ra(i),
      t.replace(bi, ""),
      "important"
    ) : a[i] = t;
  }
}
const mi = ["Webkit", "Moz", "ms"], Ze = {};
function jn(a, e) {
  const t = Ze[e];
  if (t)
    return t;
  let i = wa(e);
  if (i !== "filter" && i in a)
    return Ze[e] = i;
  i = zi(i);
  for (let d = 0; d < mi.length; d++) {
    const o = mi[d] + i;
    if (o in a)
      return Ze[e] = o;
  }
  return e;
}
const ui = "http://www.w3.org/1999/xlink";
function Cn(a, e, t, i, d) {
  if (i && e.startsWith("xlink:"))
    t == null ? a.removeAttributeNS(ui, e.slice(6, e.length)) : a.setAttributeNS(ui, e, t);
  else {
    const o = jd(e);
    t == null || o && !Si(t) ? a.removeAttribute(e) : a.setAttribute(e, o ? "" : t);
  }
}
function An(a, e, t, i, d, o, r) {
  if (e === "innerHTML" || e === "textContent") {
    i && r(i, d, o), a[e] = t ?? "";
    return;
  }
  const l = a.tagName;
  if (e === "value" && l !== "PROGRESS" && // custom elements may use _value internally
  !l.includes("-")) {
    a._value = t;
    const v = l === "OPTION" ? a.getAttribute("value") : a.value, p = t ?? "";
    v !== p && (a.value = p), t == null && a.removeAttribute(e);
    return;
  }
  let c = !1;
  if (t === "" || t == null) {
    const v = typeof a[e];
    v === "boolean" ? t = Si(t) : t == null && v === "string" ? (t = "", c = !0) : v === "number" && (t = 0, c = !0);
  }
  try {
    a[e] = t;
  } catch {
  }
  c && a.removeAttribute(e);
}
function Nn(a, e, t, i) {
  a.addEventListener(e, t, i);
}
function Tn(a, e, t, i) {
  a.removeEventListener(e, t, i);
}
function Dn(a, e, t, i, d = null) {
  const o = a._vei || (a._vei = {}), r = o[e];
  if (i && r)
    r.value = i;
  else {
    const [l, c] = Rn(e);
    if (i) {
      const v = o[e] = Wn(i, d);
      Nn(a, l, v, c);
    } else
      r && (Tn(a, l, r, c), o[e] = void 0);
  }
}
const pi = /(?:Once|Passive|Capture)$/;
function Rn(a) {
  let e;
  if (pi.test(a)) {
    e = {};
    let i;
    for (; i = a.match(pi); )
      a = a.slice(0, a.length - i[0].length), e[i[0].toLowerCase()] = !0;
  }
  return [a[2] === ":" ? a.slice(3) : ra(a.slice(2)), e];
}
let Qe = 0;
const Ln = /* @__PURE__ */ Promise.resolve(), Mn = () => Qe || (Ln.then(() => Qe = 0), Qe = Date.now());
function Wn(a, e) {
  const t = (i) => {
    if (!i._vts)
      i._vts = Date.now();
    else if (i._vts <= t.attached)
      return;
    va(
      Gn(i, t.value),
      e,
      5,
      [i]
    );
  };
  return t.value = a, t.attached = Mn(), t;
}
function Gn(a, e) {
  if (E(e)) {
    const t = a.stopImmediatePropagation;
    return a.stopImmediatePropagation = () => {
      t.call(a), a._stopped = !0;
    }, e.map((i) => (d) => !d._stopped && i && i(d));
  } else
    return e;
}
const hi = /^on[a-z]/, Fn = (a, e, t, i, d = !1, o, r, l, c) => {
  e === "class" ? In(a, i, d) : e === "style" ? Pn(a, t, i) : Ae(e) ? mt(e) || Dn(a, e, t, i, r) : (e[0] === "." ? (e = e.slice(1), !0) : e[0] === "^" ? (e = e.slice(1), !1) : Hn(a, e, i, d)) ? An(
    a,
    e,
    i,
    o,
    r,
    l,
    c
  ) : (e === "true-value" ? a._trueValue = i : e === "false-value" && (a._falseValue = i), Cn(a, e, i, d));
};
function Hn(a, e, t, i) {
  return i ? !!(e === "innerHTML" || e === "textContent" || e in a && hi.test(e) && P(t)) : e === "spellcheck" || e === "draggable" || e === "translate" || e === "form" || e === "list" && a.tagName === "INPUT" || e === "type" && a.tagName === "TEXTAREA" || hi.test(e) && K(t) ? !1 : e in a;
}
function Vn(a, e) {
  const t = Xi(a);
  class i extends Dt {
    constructor(o) {
      super(t, o, e);
    }
  }
  return i.def = t, i;
}
const Un = typeof HTMLElement < "u" ? HTMLElement : class {
};
class Dt extends Un {
  constructor(e, t = {}, i) {
    super(), this._def = e, this._props = t, this._instance = null, this._connected = !1, this._resolved = !1, this._numberProps = null, this.shadowRoot && i ? i(this._createVNode(), this.shadowRoot) : (this.attachShadow({ mode: "open" }), this._def.__asyncLoader || this._resolveProps(this._def));
  }
  connectedCallback() {
    this._connected = !0, this._instance || (this._resolved ? this._update() : this._resolveDef());
  }
  disconnectedCallback() {
    this._connected = !1, Hi(() => {
      this._connected || (xi(null, this.shadowRoot), this._instance = null);
    });
  }
  /**
   * resolve inner component definition (handle possible async component)
   */
  _resolveDef() {
    this._resolved = !0;
    for (let i = 0; i < this.attributes.length; i++)
      this._setAttr(this.attributes[i].name);
    new MutationObserver((i) => {
      for (const d of i)
        this._setAttr(d.attributeName);
    }).observe(this, { attributes: !0 });
    const e = (i, d = !1) => {
      const { props: o, styles: r } = i;
      let l;
      if (o && !E(o))
        for (const c in o) {
          const v = o[c];
          (v === Number || v && v.type === Number) && (c in this._props && (this._props[c] = Ht(this._props[c])), (l || (l = /* @__PURE__ */ Object.create(null)))[wa(c)] = !0);
        }
      this._numberProps = l, d && this._resolveProps(i), this._applyStyles(r), this._update();
    }, t = this._def.__asyncLoader;
    t ? t().then((i) => e(i, !0)) : e(this._def);
  }
  _resolveProps(e) {
    const { props: t } = e, i = E(t) ? t : Object.keys(t || {});
    for (const d of Object.keys(this))
      d[0] !== "_" && i.includes(d) && this._setProp(d, this[d], !0, !1);
    for (const d of i.map(wa))
      Object.defineProperty(this, d, {
        get() {
          return this._getProp(d);
        },
        set(o) {
          this._setProp(d, o);
        }
      });
  }
  _setAttr(e) {
    let t = this.getAttribute(e);
    const i = wa(e);
    this._numberProps && this._numberProps[i] && (t = Ht(t)), this._setProp(i, t, !1);
  }
  /**
   * @internal
   */
  _getProp(e) {
    return this._props[e];
  }
  /**
   * @internal
   */
  _setProp(e, t, i = !0, d = !0) {
    t !== this._props[e] && (this._props[e] = t, d && this._instance && this._update(), i && (t === !0 ? this.setAttribute(ra(e), "") : typeof t == "string" || typeof t == "number" ? this.setAttribute(ra(e), t + "") : t || this.removeAttribute(ra(e))));
  }
  _update() {
    xi(this._createVNode(), this.shadowRoot);
  }
  _createVNode() {
    const e = fa(this._def, V({}, this._props));
    return this._instance || (e.ce = (t) => {
      this._instance = t, t.isCE = !0;
      const i = (o, r) => {
        this.dispatchEvent(
          new CustomEvent(o, {
            detail: r
          })
        );
      };
      t.emit = (o, ...r) => {
        i(o, r), ra(o) !== o && i(ra(o), r);
      };
      let d = this;
      for (; d = d && (d.parentNode || d.host); )
        if (d instanceof Dt) {
          t.parent = d._instance, t.provides = d._instance.provides;
          break;
        }
    }), e;
  }
  _applyStyles(e) {
    e && e.forEach((t) => {
      const i = document.createElement("style");
      i.textContent = t, this.shadowRoot.appendChild(i);
    });
  }
}
const Kn = /* @__PURE__ */ V({ patchProp: Fn }, On);
let gi;
function qn() {
  return gi || (gi = dn(Kn));
}
const xi = (...a) => {
  qn().render(...a);
}, Bn = {
  key: 0,
  class: "has-text-small mx-1 px-1 has-text-black"
}, $n = /* @__PURE__ */ Xi({
  __name: "BaseButton.ce",
  props: {
    color: {
      type: String
    },
    count: {
      type: Number
    },
    cursor: {
      type: Boolean,
      default: !0
    }
  },
  setup(a) {
    return (e, t) => (Ce(), si("button", {
      class: De(["button px-4 py-3", {
        "is-light": a.color == null,
        "is-success": a.color === "green",
        "is-danger": a.color === "red",
        "is-clickable": a.cursor
      }])
    }, [
      Ho(e.$slots, "default", {}, void 0, !0),
      a.count != null ? (Ce(), si("span", Bn, Cd(a.count), 1)) : fn("", !0)
    ], 2));
  }
}), Yn = `/*! bulma.io v0.9.4 | MIT License | github.com/jgthms/bulma */.button[data-v-527e8d26],.input[data-v-527e8d26],.textarea[data-v-527e8d26],.select select[data-v-527e8d26],.file-cta[data-v-527e8d26],.file-name[data-v-527e8d26],.pagination-previous[data-v-527e8d26],.pagination-next[data-v-527e8d26],.pagination-link[data-v-527e8d26],.pagination-ellipsis[data-v-527e8d26]{-moz-appearance:none;-webkit-appearance:none;align-items:center;border:1px solid transparent;border-radius:4px;box-shadow:none;display:inline-flex;font-size:1rem;height:2.5em;justify-content:flex-start;line-height:1.5;padding-bottom:calc(.5em - 1px);padding-left:calc(.75em - 1px);padding-right:calc(.75em - 1px);padding-top:calc(.5em - 1px);position:relative;vertical-align:top}.button[data-v-527e8d26]:focus,.input[data-v-527e8d26]:focus,.textarea[data-v-527e8d26]:focus,.select select[data-v-527e8d26]:focus,.file-cta[data-v-527e8d26]:focus,.file-name[data-v-527e8d26]:focus,.pagination-previous[data-v-527e8d26]:focus,.pagination-next[data-v-527e8d26]:focus,.pagination-link[data-v-527e8d26]:focus,.pagination-ellipsis[data-v-527e8d26]:focus,.is-focused.button[data-v-527e8d26],.is-focused.input[data-v-527e8d26],.is-focused.textarea[data-v-527e8d26],.select select.is-focused[data-v-527e8d26],.is-focused.file-cta[data-v-527e8d26],.is-focused.file-name[data-v-527e8d26],.is-focused.pagination-previous[data-v-527e8d26],.is-focused.pagination-next[data-v-527e8d26],.is-focused.pagination-link[data-v-527e8d26],.is-focused.pagination-ellipsis[data-v-527e8d26],.button[data-v-527e8d26]:active,.input[data-v-527e8d26]:active,.textarea[data-v-527e8d26]:active,.select select[data-v-527e8d26]:active,.file-cta[data-v-527e8d26]:active,.file-name[data-v-527e8d26]:active,.pagination-previous[data-v-527e8d26]:active,.pagination-next[data-v-527e8d26]:active,.pagination-link[data-v-527e8d26]:active,.pagination-ellipsis[data-v-527e8d26]:active,.is-active.button[data-v-527e8d26],.is-active.input[data-v-527e8d26],.is-active.textarea[data-v-527e8d26],.select select.is-active[data-v-527e8d26],.is-active.file-cta[data-v-527e8d26],.is-active.file-name[data-v-527e8d26],.is-active.pagination-previous[data-v-527e8d26],.is-active.pagination-next[data-v-527e8d26],.is-active.pagination-link[data-v-527e8d26],.is-active.pagination-ellipsis[data-v-527e8d26]{outline:none}.button[disabled][data-v-527e8d26],.input[disabled][data-v-527e8d26],.textarea[disabled][data-v-527e8d26],.select select[disabled][data-v-527e8d26],.file-cta[disabled][data-v-527e8d26],.file-name[disabled][data-v-527e8d26],.pagination-previous[disabled][data-v-527e8d26],.pagination-next[disabled][data-v-527e8d26],.pagination-link[disabled][data-v-527e8d26],.pagination-ellipsis[disabled][data-v-527e8d26],fieldset[disabled] .button[data-v-527e8d26],fieldset[disabled] .input[data-v-527e8d26],fieldset[disabled] .textarea[data-v-527e8d26],fieldset[disabled] .select select[data-v-527e8d26],.select fieldset[disabled] select[data-v-527e8d26],fieldset[disabled] .file-cta[data-v-527e8d26],fieldset[disabled] .file-name[data-v-527e8d26],fieldset[disabled] .pagination-previous[data-v-527e8d26],fieldset[disabled] .pagination-next[data-v-527e8d26],fieldset[disabled] .pagination-link[data-v-527e8d26],fieldset[disabled] .pagination-ellipsis[data-v-527e8d26]{cursor:not-allowed}.button[data-v-527e8d26],.file[data-v-527e8d26],.breadcrumb[data-v-527e8d26],.pagination-previous[data-v-527e8d26],.pagination-next[data-v-527e8d26],.pagination-link[data-v-527e8d26],.pagination-ellipsis[data-v-527e8d26],.tabs[data-v-527e8d26],.is-unselectable[data-v-527e8d26]{-webkit-touch-callout:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.select[data-v-527e8d26]:not(.is-multiple):not(.is-loading):after,.navbar-link[data-v-527e8d26]:not(.is-arrowless):after{border:3px solid transparent;border-radius:2px;border-right:0;border-top:0;content:" ";display:block;height:.625em;margin-top:-.4375em;pointer-events:none;position:absolute;top:50%;transform:rotate(-45deg);transform-origin:center;width:.625em}.box[data-v-527e8d26]:not(:last-child),.content[data-v-527e8d26]:not(:last-child),.notification[data-v-527e8d26]:not(:last-child),.progress[data-v-527e8d26]:not(:last-child),.table[data-v-527e8d26]:not(:last-child),.table-container[data-v-527e8d26]:not(:last-child),.title[data-v-527e8d26]:not(:last-child),.subtitle[data-v-527e8d26]:not(:last-child),.block[data-v-527e8d26]:not(:last-child),.breadcrumb[data-v-527e8d26]:not(:last-child),.level[data-v-527e8d26]:not(:last-child),.message[data-v-527e8d26]:not(:last-child),.pagination[data-v-527e8d26]:not(:last-child),.tabs[data-v-527e8d26]:not(:last-child){margin-bottom:1.5rem}.delete[data-v-527e8d26],.modal-close[data-v-527e8d26]{-webkit-touch-callout:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;-moz-appearance:none;-webkit-appearance:none;background-color:#0a0a0a33;border:none;border-radius:9999px;cursor:pointer;pointer-events:auto;display:inline-block;flex-grow:0;flex-shrink:0;font-size:0;height:20px;max-height:20px;max-width:20px;min-height:20px;min-width:20px;outline:none;position:relative;vertical-align:top;width:20px}.delete[data-v-527e8d26]:before,.modal-close[data-v-527e8d26]:before,.delete[data-v-527e8d26]:after,.modal-close[data-v-527e8d26]:after{background-color:#fff;content:"";display:block;left:50%;position:absolute;top:50%;transform:translate(-50%) translateY(-50%) rotate(45deg);transform-origin:center center}.delete[data-v-527e8d26]:before,.modal-close[data-v-527e8d26]:before{height:2px;width:50%}.delete[data-v-527e8d26]:after,.modal-close[data-v-527e8d26]:after{height:50%;width:2px}.delete[data-v-527e8d26]:hover,.modal-close[data-v-527e8d26]:hover,.delete[data-v-527e8d26]:focus,.modal-close[data-v-527e8d26]:focus{background-color:#0a0a0a4d}.delete[data-v-527e8d26]:active,.modal-close[data-v-527e8d26]:active{background-color:#0a0a0a66}.is-small.delete[data-v-527e8d26],.is-small.modal-close[data-v-527e8d26]{height:16px;max-height:16px;max-width:16px;min-height:16px;min-width:16px;width:16px}.is-medium.delete[data-v-527e8d26],.is-medium.modal-close[data-v-527e8d26]{height:24px;max-height:24px;max-width:24px;min-height:24px;min-width:24px;width:24px}.is-large.delete[data-v-527e8d26],.is-large.modal-close[data-v-527e8d26]{height:32px;max-height:32px;max-width:32px;min-height:32px;min-width:32px;width:32px}.button.is-loading[data-v-527e8d26]:after,.loader[data-v-527e8d26],.select.is-loading[data-v-527e8d26]:after,.control.is-loading[data-v-527e8d26]:after{-webkit-animation:spinAround-527e8d26 .5s infinite linear;animation:spinAround-527e8d26 .5s infinite linear;border:2px solid #dbdbdb;border-radius:9999px;border-right-color:transparent;border-top-color:transparent;content:"";display:block;height:1em;position:relative;width:1em}.image.is-square img[data-v-527e8d26],.image.is-square .has-ratio[data-v-527e8d26],.image.is-1by1 img[data-v-527e8d26],.image.is-1by1 .has-ratio[data-v-527e8d26],.image.is-5by4 img[data-v-527e8d26],.image.is-5by4 .has-ratio[data-v-527e8d26],.image.is-4by3 img[data-v-527e8d26],.image.is-4by3 .has-ratio[data-v-527e8d26],.image.is-3by2 img[data-v-527e8d26],.image.is-3by2 .has-ratio[data-v-527e8d26],.image.is-5by3 img[data-v-527e8d26],.image.is-5by3 .has-ratio[data-v-527e8d26],.image.is-16by9 img[data-v-527e8d26],.image.is-16by9 .has-ratio[data-v-527e8d26],.image.is-2by1 img[data-v-527e8d26],.image.is-2by1 .has-ratio[data-v-527e8d26],.image.is-3by1 img[data-v-527e8d26],.image.is-3by1 .has-ratio[data-v-527e8d26],.image.is-4by5 img[data-v-527e8d26],.image.is-4by5 .has-ratio[data-v-527e8d26],.image.is-3by4 img[data-v-527e8d26],.image.is-3by4 .has-ratio[data-v-527e8d26],.image.is-2by3 img[data-v-527e8d26],.image.is-2by3 .has-ratio[data-v-527e8d26],.image.is-3by5 img[data-v-527e8d26],.image.is-3by5 .has-ratio[data-v-527e8d26],.image.is-9by16 img[data-v-527e8d26],.image.is-9by16 .has-ratio[data-v-527e8d26],.image.is-1by2 img[data-v-527e8d26],.image.is-1by2 .has-ratio[data-v-527e8d26],.image.is-1by3 img[data-v-527e8d26],.image.is-1by3 .has-ratio[data-v-527e8d26],.modal[data-v-527e8d26],.modal-background[data-v-527e8d26],.is-overlay[data-v-527e8d26],.hero-video[data-v-527e8d26]{bottom:0;left:0;position:absolute;right:0;top:0}.navbar-burger[data-v-527e8d26]{-moz-appearance:none;-webkit-appearance:none;appearance:none;background:none;border:none;color:currentColor;font-family:inherit;font-size:1em;margin:0;padding:0}/*! minireset.css v0.0.6 | MIT License | github.com/jgthms/minireset.css */html[data-v-527e8d26],body[data-v-527e8d26],p[data-v-527e8d26],ol[data-v-527e8d26],ul[data-v-527e8d26],li[data-v-527e8d26],dl[data-v-527e8d26],dt[data-v-527e8d26],dd[data-v-527e8d26],blockquote[data-v-527e8d26],figure[data-v-527e8d26],fieldset[data-v-527e8d26],legend[data-v-527e8d26],textarea[data-v-527e8d26],pre[data-v-527e8d26],iframe[data-v-527e8d26],hr[data-v-527e8d26],h1[data-v-527e8d26],h2[data-v-527e8d26],h3[data-v-527e8d26],h4[data-v-527e8d26],h5[data-v-527e8d26],h6[data-v-527e8d26]{margin:0;padding:0}h1[data-v-527e8d26],h2[data-v-527e8d26],h3[data-v-527e8d26],h4[data-v-527e8d26],h5[data-v-527e8d26],h6[data-v-527e8d26]{font-size:100%;font-weight:400}ul[data-v-527e8d26]{list-style:none}button[data-v-527e8d26],input[data-v-527e8d26],select[data-v-527e8d26],textarea[data-v-527e8d26]{margin:0}html[data-v-527e8d26]{box-sizing:border-box}*[data-v-527e8d26],*[data-v-527e8d26]:before,*[data-v-527e8d26]:after{box-sizing:inherit}img[data-v-527e8d26],video[data-v-527e8d26]{height:auto;max-width:100%}iframe[data-v-527e8d26]{border:0}table[data-v-527e8d26]{border-collapse:collapse;border-spacing:0}td[data-v-527e8d26],th[data-v-527e8d26]{padding:0}td[data-v-527e8d26]:not([align]),th[data-v-527e8d26]:not([align]){text-align:inherit}html[data-v-527e8d26]{background-color:#fff;font-size:16px;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;min-width:300px;overflow-x:hidden;overflow-y:scroll;text-rendering:optimizeLegibility;-webkit-text-size-adjust:100%;-moz-text-size-adjust:100%;text-size-adjust:100%}article[data-v-527e8d26],aside[data-v-527e8d26],figure[data-v-527e8d26],footer[data-v-527e8d26],header[data-v-527e8d26],hgroup[data-v-527e8d26],section[data-v-527e8d26]{display:block}body[data-v-527e8d26],button[data-v-527e8d26],input[data-v-527e8d26],optgroup[data-v-527e8d26],select[data-v-527e8d26],textarea[data-v-527e8d26]{font-family:BlinkMacSystemFont,-apple-system,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,Helvetica,Arial,sans-serif}code[data-v-527e8d26],pre[data-v-527e8d26]{-moz-osx-font-smoothing:auto;-webkit-font-smoothing:auto;font-family:monospace}body[data-v-527e8d26]{color:#4a4a4a;font-size:1em;font-weight:400;line-height:1.5}a[data-v-527e8d26]{color:#485fc7;cursor:pointer;text-decoration:none}a strong[data-v-527e8d26]{color:currentColor}a[data-v-527e8d26]:hover{color:#363636}code[data-v-527e8d26]{background-color:#f5f5f5;color:#da1039;font-size:.875em;font-weight:400;padding:.25em .5em}hr[data-v-527e8d26]{background-color:#f5f5f5;border:none;display:block;height:2px;margin:1.5rem 0}img[data-v-527e8d26]{height:auto;max-width:100%}input[type=checkbox][data-v-527e8d26],input[type=radio][data-v-527e8d26]{vertical-align:baseline}small[data-v-527e8d26]{font-size:.875em}span[data-v-527e8d26]{font-style:inherit;font-weight:inherit}strong[data-v-527e8d26]{color:#363636;font-weight:700}fieldset[data-v-527e8d26]{border:none}pre[data-v-527e8d26]{-webkit-overflow-scrolling:touch;background-color:#f5f5f5;color:#4a4a4a;font-size:.875em;overflow-x:auto;padding:1.25rem 1.5rem;white-space:pre;word-wrap:normal}pre code[data-v-527e8d26]{background-color:transparent;color:currentColor;font-size:1em;padding:0}table td[data-v-527e8d26],table th[data-v-527e8d26]{vertical-align:top}table td[data-v-527e8d26]:not([align]),table th[data-v-527e8d26]:not([align]){text-align:inherit}table th[data-v-527e8d26]{color:#363636}@-webkit-keyframes spinAround-527e8d26{0%{transform:rotate(0)}to{transform:rotate(359deg)}}@keyframes spinAround-527e8d26{0%{transform:rotate(0)}to{transform:rotate(359deg)}}.box[data-v-527e8d26]{background-color:#fff;border-radius:6px;box-shadow:0 .5em 1em -.125em #0a0a0a1a,0 0 0 1px #0a0a0a05;color:#4a4a4a;display:block;padding:1.25rem}a.box[data-v-527e8d26]:hover,a.box[data-v-527e8d26]:focus{box-shadow:0 .5em 1em -.125em #0a0a0a1a,0 0 0 1px #485fc7}a.box[data-v-527e8d26]:active{box-shadow:inset 0 1px 2px #0a0a0a33,0 0 0 1px #485fc7}.button[data-v-527e8d26]{background-color:#fff;border-color:#dbdbdb;border-width:1px;color:#363636;cursor:pointer;justify-content:center;padding-bottom:calc(.5em - 1px);padding-left:1em;padding-right:1em;padding-top:calc(.5em - 1px);text-align:center;white-space:nowrap}.button strong[data-v-527e8d26]{color:inherit}.button .icon[data-v-527e8d26],.button .icon.is-small[data-v-527e8d26],.button .icon.is-medium[data-v-527e8d26],.button .icon.is-large[data-v-527e8d26]{height:1.5em;width:1.5em}.button .icon[data-v-527e8d26]:first-child:not(:last-child){margin-left:calc(-.5em - 1px);margin-right:.25em}.button .icon[data-v-527e8d26]:last-child:not(:first-child){margin-left:.25em;margin-right:calc(-.5em - 1px)}.button .icon[data-v-527e8d26]:first-child:last-child{margin-left:calc(-.5em - 1px);margin-right:calc(-.5em - 1px)}.button[data-v-527e8d26]:hover,.button.is-hovered[data-v-527e8d26]{border-color:#b5b5b5;color:#363636}.button[data-v-527e8d26]:focus,.button.is-focused[data-v-527e8d26]{border-color:#485fc7;color:#363636}.button[data-v-527e8d26]:focus:not(:active),.button.is-focused[data-v-527e8d26]:not(:active){box-shadow:0 0 0 .125em #485fc740}.button[data-v-527e8d26]:active,.button.is-active[data-v-527e8d26]{border-color:#4a4a4a;color:#363636}.button.is-text[data-v-527e8d26]{background-color:transparent;border-color:transparent;color:#4a4a4a;text-decoration:underline}.button.is-text[data-v-527e8d26]:hover,.button.is-text.is-hovered[data-v-527e8d26],.button.is-text[data-v-527e8d26]:focus,.button.is-text.is-focused[data-v-527e8d26]{background-color:#f5f5f5;color:#363636}.button.is-text[data-v-527e8d26]:active,.button.is-text.is-active[data-v-527e8d26]{background-color:#e8e8e8;color:#363636}.button.is-text[disabled][data-v-527e8d26],fieldset[disabled] .button.is-text[data-v-527e8d26]{background-color:transparent;border-color:transparent;box-shadow:none}.button.is-ghost[data-v-527e8d26]{background:none;border-color:transparent;color:#485fc7;text-decoration:none}.button.is-ghost[data-v-527e8d26]:hover,.button.is-ghost.is-hovered[data-v-527e8d26]{color:#485fc7;text-decoration:underline}.button.is-white[data-v-527e8d26]{background-color:#fff;border-color:transparent;color:#0a0a0a}.button.is-white[data-v-527e8d26]:hover,.button.is-white.is-hovered[data-v-527e8d26]{background-color:#f9f9f9;border-color:transparent;color:#0a0a0a}.button.is-white[data-v-527e8d26]:focus,.button.is-white.is-focused[data-v-527e8d26]{border-color:transparent;color:#0a0a0a}.button.is-white[data-v-527e8d26]:focus:not(:active),.button.is-white.is-focused[data-v-527e8d26]:not(:active){box-shadow:0 0 0 .125em #ffffff40}.button.is-white[data-v-527e8d26]:active,.button.is-white.is-active[data-v-527e8d26]{background-color:#f2f2f2;border-color:transparent;color:#0a0a0a}.button.is-white[disabled][data-v-527e8d26],fieldset[disabled] .button.is-white[data-v-527e8d26]{background-color:#fff;border-color:#fff;box-shadow:none}.button.is-white.is-inverted[data-v-527e8d26]{background-color:#0a0a0a;color:#fff}.button.is-white.is-inverted[data-v-527e8d26]:hover,.button.is-white.is-inverted.is-hovered[data-v-527e8d26]{background-color:#000}.button.is-white.is-inverted[disabled][data-v-527e8d26],fieldset[disabled] .button.is-white.is-inverted[data-v-527e8d26]{background-color:#0a0a0a;border-color:transparent;box-shadow:none;color:#fff}.button.is-white.is-loading[data-v-527e8d26]:after{border-color:transparent transparent #0a0a0a #0a0a0a!important}.button.is-white.is-outlined[data-v-527e8d26]{background-color:transparent;border-color:#fff;color:#fff}.button.is-white.is-outlined[data-v-527e8d26]:hover,.button.is-white.is-outlined.is-hovered[data-v-527e8d26],.button.is-white.is-outlined[data-v-527e8d26]:focus,.button.is-white.is-outlined.is-focused[data-v-527e8d26]{background-color:#fff;border-color:#fff;color:#0a0a0a}.button.is-white.is-outlined.is-loading[data-v-527e8d26]:after{border-color:transparent transparent white white!important}.button.is-white.is-outlined.is-loading[data-v-527e8d26]:hover:after,.button.is-white.is-outlined.is-loading.is-hovered[data-v-527e8d26]:after,.button.is-white.is-outlined.is-loading[data-v-527e8d26]:focus:after,.button.is-white.is-outlined.is-loading.is-focused[data-v-527e8d26]:after{border-color:transparent transparent #0a0a0a #0a0a0a!important}.button.is-white.is-outlined[disabled][data-v-527e8d26],fieldset[disabled] .button.is-white.is-outlined[data-v-527e8d26]{background-color:transparent;border-color:#fff;box-shadow:none;color:#fff}.button.is-white.is-inverted.is-outlined[data-v-527e8d26]{background-color:transparent;border-color:#0a0a0a;color:#0a0a0a}.button.is-white.is-inverted.is-outlined[data-v-527e8d26]:hover,.button.is-white.is-inverted.is-outlined.is-hovered[data-v-527e8d26],.button.is-white.is-inverted.is-outlined[data-v-527e8d26]:focus,.button.is-white.is-inverted.is-outlined.is-focused[data-v-527e8d26]{background-color:#0a0a0a;color:#fff}.button.is-white.is-inverted.is-outlined.is-loading[data-v-527e8d26]:hover:after,.button.is-white.is-inverted.is-outlined.is-loading.is-hovered[data-v-527e8d26]:after,.button.is-white.is-inverted.is-outlined.is-loading[data-v-527e8d26]:focus:after,.button.is-white.is-inverted.is-outlined.is-loading.is-focused[data-v-527e8d26]:after{border-color:transparent transparent white white!important}.button.is-white.is-inverted.is-outlined[disabled][data-v-527e8d26],fieldset[disabled] .button.is-white.is-inverted.is-outlined[data-v-527e8d26]{background-color:transparent;border-color:#0a0a0a;box-shadow:none;color:#0a0a0a}.button.is-black[data-v-527e8d26]{background-color:#0a0a0a;border-color:transparent;color:#fff}.button.is-black[data-v-527e8d26]:hover,.button.is-black.is-hovered[data-v-527e8d26]{background-color:#040404;border-color:transparent;color:#fff}.button.is-black[data-v-527e8d26]:focus,.button.is-black.is-focused[data-v-527e8d26]{border-color:transparent;color:#fff}.button.is-black[data-v-527e8d26]:focus:not(:active),.button.is-black.is-focused[data-v-527e8d26]:not(:active){box-shadow:0 0 0 .125em #0a0a0a40}.button.is-black[data-v-527e8d26]:active,.button.is-black.is-active[data-v-527e8d26]{background-color:#000;border-color:transparent;color:#fff}.button.is-black[disabled][data-v-527e8d26],fieldset[disabled] .button.is-black[data-v-527e8d26]{background-color:#0a0a0a;border-color:#0a0a0a;box-shadow:none}.button.is-black.is-inverted[data-v-527e8d26]{background-color:#fff;color:#0a0a0a}.button.is-black.is-inverted[data-v-527e8d26]:hover,.button.is-black.is-inverted.is-hovered[data-v-527e8d26]{background-color:#f2f2f2}.button.is-black.is-inverted[disabled][data-v-527e8d26],fieldset[disabled] .button.is-black.is-inverted[data-v-527e8d26]{background-color:#fff;border-color:transparent;box-shadow:none;color:#0a0a0a}.button.is-black.is-loading[data-v-527e8d26]:after{border-color:transparent transparent white white!important}.button.is-black.is-outlined[data-v-527e8d26]{background-color:transparent;border-color:#0a0a0a;color:#0a0a0a}.button.is-black.is-outlined[data-v-527e8d26]:hover,.button.is-black.is-outlined.is-hovered[data-v-527e8d26],.button.is-black.is-outlined[data-v-527e8d26]:focus,.button.is-black.is-outlined.is-focused[data-v-527e8d26]{background-color:#0a0a0a;border-color:#0a0a0a;color:#fff}.button.is-black.is-outlined.is-loading[data-v-527e8d26]:after{border-color:transparent transparent #0a0a0a #0a0a0a!important}.button.is-black.is-outlined.is-loading[data-v-527e8d26]:hover:after,.button.is-black.is-outlined.is-loading.is-hovered[data-v-527e8d26]:after,.button.is-black.is-outlined.is-loading[data-v-527e8d26]:focus:after,.button.is-black.is-outlined.is-loading.is-focused[data-v-527e8d26]:after{border-color:transparent transparent white white!important}.button.is-black.is-outlined[disabled][data-v-527e8d26],fieldset[disabled] .button.is-black.is-outlined[data-v-527e8d26]{background-color:transparent;border-color:#0a0a0a;box-shadow:none;color:#0a0a0a}.button.is-black.is-inverted.is-outlined[data-v-527e8d26]{background-color:transparent;border-color:#fff;color:#fff}.button.is-black.is-inverted.is-outlined[data-v-527e8d26]:hover,.button.is-black.is-inverted.is-outlined.is-hovered[data-v-527e8d26],.button.is-black.is-inverted.is-outlined[data-v-527e8d26]:focus,.button.is-black.is-inverted.is-outlined.is-focused[data-v-527e8d26]{background-color:#fff;color:#0a0a0a}.button.is-black.is-inverted.is-outlined.is-loading[data-v-527e8d26]:hover:after,.button.is-black.is-inverted.is-outlined.is-loading.is-hovered[data-v-527e8d26]:after,.button.is-black.is-inverted.is-outlined.is-loading[data-v-527e8d26]:focus:after,.button.is-black.is-inverted.is-outlined.is-loading.is-focused[data-v-527e8d26]:after{border-color:transparent transparent #0a0a0a #0a0a0a!important}.button.is-black.is-inverted.is-outlined[disabled][data-v-527e8d26],fieldset[disabled] .button.is-black.is-inverted.is-outlined[data-v-527e8d26]{background-color:transparent;border-color:#fff;box-shadow:none;color:#fff}.button.is-light[data-v-527e8d26]{background-color:#f5f5f5;border-color:transparent;color:#000000b3}.button.is-light[data-v-527e8d26]:hover,.button.is-light.is-hovered[data-v-527e8d26]{background-color:#eee;border-color:transparent;color:#000000b3}.button.is-light[data-v-527e8d26]:focus,.button.is-light.is-focused[data-v-527e8d26]{border-color:transparent;color:#000000b3}.button.is-light[data-v-527e8d26]:focus:not(:active),.button.is-light.is-focused[data-v-527e8d26]:not(:active){box-shadow:0 0 0 .125em #f5f5f540}.button.is-light[data-v-527e8d26]:active,.button.is-light.is-active[data-v-527e8d26]{background-color:#e8e8e8;border-color:transparent;color:#000000b3}.button.is-light[disabled][data-v-527e8d26],fieldset[disabled] .button.is-light[data-v-527e8d26]{background-color:#f5f5f5;border-color:#f5f5f5;box-shadow:none}.button.is-light.is-inverted[data-v-527e8d26]{background-color:#000000b3;color:#f5f5f5}.button.is-light.is-inverted[data-v-527e8d26]:hover,.button.is-light.is-inverted.is-hovered[data-v-527e8d26]{background-color:#000000b3}.button.is-light.is-inverted[disabled][data-v-527e8d26],fieldset[disabled] .button.is-light.is-inverted[data-v-527e8d26]{background-color:#000000b3;border-color:transparent;box-shadow:none;color:#f5f5f5}.button.is-light.is-loading[data-v-527e8d26]:after{border-color:transparent transparent rgba(0,0,0,.7) rgba(0,0,0,.7)!important}.button.is-light.is-outlined[data-v-527e8d26]{background-color:transparent;border-color:#f5f5f5;color:#f5f5f5}.button.is-light.is-outlined[data-v-527e8d26]:hover,.button.is-light.is-outlined.is-hovered[data-v-527e8d26],.button.is-light.is-outlined[data-v-527e8d26]:focus,.button.is-light.is-outlined.is-focused[data-v-527e8d26]{background-color:#f5f5f5;border-color:#f5f5f5;color:#000000b3}.button.is-light.is-outlined.is-loading[data-v-527e8d26]:after{border-color:transparent transparent whitesmoke whitesmoke!important}.button.is-light.is-outlined.is-loading[data-v-527e8d26]:hover:after,.button.is-light.is-outlined.is-loading.is-hovered[data-v-527e8d26]:after,.button.is-light.is-outlined.is-loading[data-v-527e8d26]:focus:after,.button.is-light.is-outlined.is-loading.is-focused[data-v-527e8d26]:after{border-color:transparent transparent rgba(0,0,0,.7) rgba(0,0,0,.7)!important}.button.is-light.is-outlined[disabled][data-v-527e8d26],fieldset[disabled] .button.is-light.is-outlined[data-v-527e8d26]{background-color:transparent;border-color:#f5f5f5;box-shadow:none;color:#f5f5f5}.button.is-light.is-inverted.is-outlined[data-v-527e8d26]{background-color:transparent;border-color:#000000b3;color:#000000b3}.button.is-light.is-inverted.is-outlined[data-v-527e8d26]:hover,.button.is-light.is-inverted.is-outlined.is-hovered[data-v-527e8d26],.button.is-light.is-inverted.is-outlined[data-v-527e8d26]:focus,.button.is-light.is-inverted.is-outlined.is-focused[data-v-527e8d26]{background-color:#000000b3;color:#f5f5f5}.button.is-light.is-inverted.is-outlined.is-loading[data-v-527e8d26]:hover:after,.button.is-light.is-inverted.is-outlined.is-loading.is-hovered[data-v-527e8d26]:after,.button.is-light.is-inverted.is-outlined.is-loading[data-v-527e8d26]:focus:after,.button.is-light.is-inverted.is-outlined.is-loading.is-focused[data-v-527e8d26]:after{border-color:transparent transparent whitesmoke whitesmoke!important}.button.is-light.is-inverted.is-outlined[disabled][data-v-527e8d26],fieldset[disabled] .button.is-light.is-inverted.is-outlined[data-v-527e8d26]{background-color:transparent;border-color:#000000b3;box-shadow:none;color:#000000b3}.button.is-dark[data-v-527e8d26]{background-color:#363636;border-color:transparent;color:#fff}.button.is-dark[data-v-527e8d26]:hover,.button.is-dark.is-hovered[data-v-527e8d26]{background-color:#2f2f2f;border-color:transparent;color:#fff}.button.is-dark[data-v-527e8d26]:focus,.button.is-dark.is-focused[data-v-527e8d26]{border-color:transparent;color:#fff}.button.is-dark[data-v-527e8d26]:focus:not(:active),.button.is-dark.is-focused[data-v-527e8d26]:not(:active){box-shadow:0 0 0 .125em #36363640}.button.is-dark[data-v-527e8d26]:active,.button.is-dark.is-active[data-v-527e8d26]{background-color:#292929;border-color:transparent;color:#fff}.button.is-dark[disabled][data-v-527e8d26],fieldset[disabled] .button.is-dark[data-v-527e8d26]{background-color:#363636;border-color:#363636;box-shadow:none}.button.is-dark.is-inverted[data-v-527e8d26]{background-color:#fff;color:#363636}.button.is-dark.is-inverted[data-v-527e8d26]:hover,.button.is-dark.is-inverted.is-hovered[data-v-527e8d26]{background-color:#f2f2f2}.button.is-dark.is-inverted[disabled][data-v-527e8d26],fieldset[disabled] .button.is-dark.is-inverted[data-v-527e8d26]{background-color:#fff;border-color:transparent;box-shadow:none;color:#363636}.button.is-dark.is-loading[data-v-527e8d26]:after{border-color:transparent transparent #fff #fff!important}.button.is-dark.is-outlined[data-v-527e8d26]{background-color:transparent;border-color:#363636;color:#363636}.button.is-dark.is-outlined[data-v-527e8d26]:hover,.button.is-dark.is-outlined.is-hovered[data-v-527e8d26],.button.is-dark.is-outlined[data-v-527e8d26]:focus,.button.is-dark.is-outlined.is-focused[data-v-527e8d26]{background-color:#363636;border-color:#363636;color:#fff}.button.is-dark.is-outlined.is-loading[data-v-527e8d26]:after{border-color:transparent transparent #363636 #363636!important}.button.is-dark.is-outlined.is-loading[data-v-527e8d26]:hover:after,.button.is-dark.is-outlined.is-loading.is-hovered[data-v-527e8d26]:after,.button.is-dark.is-outlined.is-loading[data-v-527e8d26]:focus:after,.button.is-dark.is-outlined.is-loading.is-focused[data-v-527e8d26]:after{border-color:transparent transparent #fff #fff!important}.button.is-dark.is-outlined[disabled][data-v-527e8d26],fieldset[disabled] .button.is-dark.is-outlined[data-v-527e8d26]{background-color:transparent;border-color:#363636;box-shadow:none;color:#363636}.button.is-dark.is-inverted.is-outlined[data-v-527e8d26]{background-color:transparent;border-color:#fff;color:#fff}.button.is-dark.is-inverted.is-outlined[data-v-527e8d26]:hover,.button.is-dark.is-inverted.is-outlined.is-hovered[data-v-527e8d26],.button.is-dark.is-inverted.is-outlined[data-v-527e8d26]:focus,.button.is-dark.is-inverted.is-outlined.is-focused[data-v-527e8d26]{background-color:#fff;color:#363636}.button.is-dark.is-inverted.is-outlined.is-loading[data-v-527e8d26]:hover:after,.button.is-dark.is-inverted.is-outlined.is-loading.is-hovered[data-v-527e8d26]:after,.button.is-dark.is-inverted.is-outlined.is-loading[data-v-527e8d26]:focus:after,.button.is-dark.is-inverted.is-outlined.is-loading.is-focused[data-v-527e8d26]:after{border-color:transparent transparent #363636 #363636!important}.button.is-dark.is-inverted.is-outlined[disabled][data-v-527e8d26],fieldset[disabled] .button.is-dark.is-inverted.is-outlined[data-v-527e8d26]{background-color:transparent;border-color:#fff;box-shadow:none;color:#fff}.button.is-primary[data-v-527e8d26]{background-color:#00d1b2;border-color:transparent;color:#fff}.button.is-primary[data-v-527e8d26]:hover,.button.is-primary.is-hovered[data-v-527e8d26]{background-color:#00c4a7;border-color:transparent;color:#fff}.button.is-primary[data-v-527e8d26]:focus,.button.is-primary.is-focused[data-v-527e8d26]{border-color:transparent;color:#fff}.button.is-primary[data-v-527e8d26]:focus:not(:active),.button.is-primary.is-focused[data-v-527e8d26]:not(:active){box-shadow:0 0 0 .125em #00d1b240}.button.is-primary[data-v-527e8d26]:active,.button.is-primary.is-active[data-v-527e8d26]{background-color:#00b89c;border-color:transparent;color:#fff}.button.is-primary[disabled][data-v-527e8d26],fieldset[disabled] .button.is-primary[data-v-527e8d26]{background-color:#00d1b2;border-color:#00d1b2;box-shadow:none}.button.is-primary.is-inverted[data-v-527e8d26]{background-color:#fff;color:#00d1b2}.button.is-primary.is-inverted[data-v-527e8d26]:hover,.button.is-primary.is-inverted.is-hovered[data-v-527e8d26]{background-color:#f2f2f2}.button.is-primary.is-inverted[disabled][data-v-527e8d26],fieldset[disabled] .button.is-primary.is-inverted[data-v-527e8d26]{background-color:#fff;border-color:transparent;box-shadow:none;color:#00d1b2}.button.is-primary.is-loading[data-v-527e8d26]:after{border-color:transparent transparent #fff #fff!important}.button.is-primary.is-outlined[data-v-527e8d26]{background-color:transparent;border-color:#00d1b2;color:#00d1b2}.button.is-primary.is-outlined[data-v-527e8d26]:hover,.button.is-primary.is-outlined.is-hovered[data-v-527e8d26],.button.is-primary.is-outlined[data-v-527e8d26]:focus,.button.is-primary.is-outlined.is-focused[data-v-527e8d26]{background-color:#00d1b2;border-color:#00d1b2;color:#fff}.button.is-primary.is-outlined.is-loading[data-v-527e8d26]:after{border-color:transparent transparent #00d1b2 #00d1b2!important}.button.is-primary.is-outlined.is-loading[data-v-527e8d26]:hover:after,.button.is-primary.is-outlined.is-loading.is-hovered[data-v-527e8d26]:after,.button.is-primary.is-outlined.is-loading[data-v-527e8d26]:focus:after,.button.is-primary.is-outlined.is-loading.is-focused[data-v-527e8d26]:after{border-color:transparent transparent #fff #fff!important}.button.is-primary.is-outlined[disabled][data-v-527e8d26],fieldset[disabled] .button.is-primary.is-outlined[data-v-527e8d26]{background-color:transparent;border-color:#00d1b2;box-shadow:none;color:#00d1b2}.button.is-primary.is-inverted.is-outlined[data-v-527e8d26]{background-color:transparent;border-color:#fff;color:#fff}.button.is-primary.is-inverted.is-outlined[data-v-527e8d26]:hover,.button.is-primary.is-inverted.is-outlined.is-hovered[data-v-527e8d26],.button.is-primary.is-inverted.is-outlined[data-v-527e8d26]:focus,.button.is-primary.is-inverted.is-outlined.is-focused[data-v-527e8d26]{background-color:#fff;color:#00d1b2}.button.is-primary.is-inverted.is-outlined.is-loading[data-v-527e8d26]:hover:after,.button.is-primary.is-inverted.is-outlined.is-loading.is-hovered[data-v-527e8d26]:after,.button.is-primary.is-inverted.is-outlined.is-loading[data-v-527e8d26]:focus:after,.button.is-primary.is-inverted.is-outlined.is-loading.is-focused[data-v-527e8d26]:after{border-color:transparent transparent #00d1b2 #00d1b2!important}.button.is-primary.is-inverted.is-outlined[disabled][data-v-527e8d26],fieldset[disabled] .button.is-primary.is-inverted.is-outlined[data-v-527e8d26]{background-color:transparent;border-color:#fff;box-shadow:none;color:#fff}.button.is-primary.is-light[data-v-527e8d26]{background-color:#ebfffc;color:#00947e}.button.is-primary.is-light[data-v-527e8d26]:hover,.button.is-primary.is-light.is-hovered[data-v-527e8d26]{background-color:#defffa;border-color:transparent;color:#00947e}.button.is-primary.is-light[data-v-527e8d26]:active,.button.is-primary.is-light.is-active[data-v-527e8d26]{background-color:#d1fff8;border-color:transparent;color:#00947e}.button.is-link[data-v-527e8d26]{background-color:#485fc7;border-color:transparent;color:#fff}.button.is-link[data-v-527e8d26]:hover,.button.is-link.is-hovered[data-v-527e8d26]{background-color:#3e56c4;border-color:transparent;color:#fff}.button.is-link[data-v-527e8d26]:focus,.button.is-link.is-focused[data-v-527e8d26]{border-color:transparent;color:#fff}.button.is-link[data-v-527e8d26]:focus:not(:active),.button.is-link.is-focused[data-v-527e8d26]:not(:active){box-shadow:0 0 0 .125em #485fc740}.button.is-link[data-v-527e8d26]:active,.button.is-link.is-active[data-v-527e8d26]{background-color:#3a51bb;border-color:transparent;color:#fff}.button.is-link[disabled][data-v-527e8d26],fieldset[disabled] .button.is-link[data-v-527e8d26]{background-color:#485fc7;border-color:#485fc7;box-shadow:none}.button.is-link.is-inverted[data-v-527e8d26]{background-color:#fff;color:#485fc7}.button.is-link.is-inverted[data-v-527e8d26]:hover,.button.is-link.is-inverted.is-hovered[data-v-527e8d26]{background-color:#f2f2f2}.button.is-link.is-inverted[disabled][data-v-527e8d26],fieldset[disabled] .button.is-link.is-inverted[data-v-527e8d26]{background-color:#fff;border-color:transparent;box-shadow:none;color:#485fc7}.button.is-link.is-loading[data-v-527e8d26]:after{border-color:transparent transparent #fff #fff!important}.button.is-link.is-outlined[data-v-527e8d26]{background-color:transparent;border-color:#485fc7;color:#485fc7}.button.is-link.is-outlined[data-v-527e8d26]:hover,.button.is-link.is-outlined.is-hovered[data-v-527e8d26],.button.is-link.is-outlined[data-v-527e8d26]:focus,.button.is-link.is-outlined.is-focused[data-v-527e8d26]{background-color:#485fc7;border-color:#485fc7;color:#fff}.button.is-link.is-outlined.is-loading[data-v-527e8d26]:after{border-color:transparent transparent #485fc7 #485fc7!important}.button.is-link.is-outlined.is-loading[data-v-527e8d26]:hover:after,.button.is-link.is-outlined.is-loading.is-hovered[data-v-527e8d26]:after,.button.is-link.is-outlined.is-loading[data-v-527e8d26]:focus:after,.button.is-link.is-outlined.is-loading.is-focused[data-v-527e8d26]:after{border-color:transparent transparent #fff #fff!important}.button.is-link.is-outlined[disabled][data-v-527e8d26],fieldset[disabled] .button.is-link.is-outlined[data-v-527e8d26]{background-color:transparent;border-color:#485fc7;box-shadow:none;color:#485fc7}.button.is-link.is-inverted.is-outlined[data-v-527e8d26]{background-color:transparent;border-color:#fff;color:#fff}.button.is-link.is-inverted.is-outlined[data-v-527e8d26]:hover,.button.is-link.is-inverted.is-outlined.is-hovered[data-v-527e8d26],.button.is-link.is-inverted.is-outlined[data-v-527e8d26]:focus,.button.is-link.is-inverted.is-outlined.is-focused[data-v-527e8d26]{background-color:#fff;color:#485fc7}.button.is-link.is-inverted.is-outlined.is-loading[data-v-527e8d26]:hover:after,.button.is-link.is-inverted.is-outlined.is-loading.is-hovered[data-v-527e8d26]:after,.button.is-link.is-inverted.is-outlined.is-loading[data-v-527e8d26]:focus:after,.button.is-link.is-inverted.is-outlined.is-loading.is-focused[data-v-527e8d26]:after{border-color:transparent transparent #485fc7 #485fc7!important}.button.is-link.is-inverted.is-outlined[disabled][data-v-527e8d26],fieldset[disabled] .button.is-link.is-inverted.is-outlined[data-v-527e8d26]{background-color:transparent;border-color:#fff;box-shadow:none;color:#fff}.button.is-link.is-light[data-v-527e8d26]{background-color:#eff1fa;color:#3850b7}.button.is-link.is-light[data-v-527e8d26]:hover,.button.is-link.is-light.is-hovered[data-v-527e8d26]{background-color:#e6e9f7;border-color:transparent;color:#3850b7}.button.is-link.is-light[data-v-527e8d26]:active,.button.is-link.is-light.is-active[data-v-527e8d26]{background-color:#dce0f4;border-color:transparent;color:#3850b7}.button.is-info[data-v-527e8d26]{background-color:#3e8ed0;border-color:transparent;color:#fff}.button.is-info[data-v-527e8d26]:hover,.button.is-info.is-hovered[data-v-527e8d26]{background-color:#3488ce;border-color:transparent;color:#fff}.button.is-info[data-v-527e8d26]:focus,.button.is-info.is-focused[data-v-527e8d26]{border-color:transparent;color:#fff}.button.is-info[data-v-527e8d26]:focus:not(:active),.button.is-info.is-focused[data-v-527e8d26]:not(:active){box-shadow:0 0 0 .125em #3e8ed040}.button.is-info[data-v-527e8d26]:active,.button.is-info.is-active[data-v-527e8d26]{background-color:#3082c5;border-color:transparent;color:#fff}.button.is-info[disabled][data-v-527e8d26],fieldset[disabled] .button.is-info[data-v-527e8d26]{background-color:#3e8ed0;border-color:#3e8ed0;box-shadow:none}.button.is-info.is-inverted[data-v-527e8d26]{background-color:#fff;color:#3e8ed0}.button.is-info.is-inverted[data-v-527e8d26]:hover,.button.is-info.is-inverted.is-hovered[data-v-527e8d26]{background-color:#f2f2f2}.button.is-info.is-inverted[disabled][data-v-527e8d26],fieldset[disabled] .button.is-info.is-inverted[data-v-527e8d26]{background-color:#fff;border-color:transparent;box-shadow:none;color:#3e8ed0}.button.is-info.is-loading[data-v-527e8d26]:after{border-color:transparent transparent #fff #fff!important}.button.is-info.is-outlined[data-v-527e8d26]{background-color:transparent;border-color:#3e8ed0;color:#3e8ed0}.button.is-info.is-outlined[data-v-527e8d26]:hover,.button.is-info.is-outlined.is-hovered[data-v-527e8d26],.button.is-info.is-outlined[data-v-527e8d26]:focus,.button.is-info.is-outlined.is-focused[data-v-527e8d26]{background-color:#3e8ed0;border-color:#3e8ed0;color:#fff}.button.is-info.is-outlined.is-loading[data-v-527e8d26]:after{border-color:transparent transparent #3e8ed0 #3e8ed0!important}.button.is-info.is-outlined.is-loading[data-v-527e8d26]:hover:after,.button.is-info.is-outlined.is-loading.is-hovered[data-v-527e8d26]:after,.button.is-info.is-outlined.is-loading[data-v-527e8d26]:focus:after,.button.is-info.is-outlined.is-loading.is-focused[data-v-527e8d26]:after{border-color:transparent transparent #fff #fff!important}.button.is-info.is-outlined[disabled][data-v-527e8d26],fieldset[disabled] .button.is-info.is-outlined[data-v-527e8d26]{background-color:transparent;border-color:#3e8ed0;box-shadow:none;color:#3e8ed0}.button.is-info.is-inverted.is-outlined[data-v-527e8d26]{background-color:transparent;border-color:#fff;color:#fff}.button.is-info.is-inverted.is-outlined[data-v-527e8d26]:hover,.button.is-info.is-inverted.is-outlined.is-hovered[data-v-527e8d26],.button.is-info.is-inverted.is-outlined[data-v-527e8d26]:focus,.button.is-info.is-inverted.is-outlined.is-focused[data-v-527e8d26]{background-color:#fff;color:#3e8ed0}.button.is-info.is-inverted.is-outlined.is-loading[data-v-527e8d26]:hover:after,.button.is-info.is-inverted.is-outlined.is-loading.is-hovered[data-v-527e8d26]:after,.button.is-info.is-inverted.is-outlined.is-loading[data-v-527e8d26]:focus:after,.button.is-info.is-inverted.is-outlined.is-loading.is-focused[data-v-527e8d26]:after{border-color:transparent transparent #3e8ed0 #3e8ed0!important}.button.is-info.is-inverted.is-outlined[disabled][data-v-527e8d26],fieldset[disabled] .button.is-info.is-inverted.is-outlined[data-v-527e8d26]{background-color:transparent;border-color:#fff;box-shadow:none;color:#fff}.button.is-info.is-light[data-v-527e8d26]{background-color:#eff5fb;color:#296fa8}.button.is-info.is-light[data-v-527e8d26]:hover,.button.is-info.is-light.is-hovered[data-v-527e8d26]{background-color:#e4eff9;border-color:transparent;color:#296fa8}.button.is-info.is-light[data-v-527e8d26]:active,.button.is-info.is-light.is-active[data-v-527e8d26]{background-color:#dae9f6;border-color:transparent;color:#296fa8}.button.is-success[data-v-527e8d26]{background-color:#48c78e;border-color:transparent;color:#fff}.button.is-success[data-v-527e8d26]:hover,.button.is-success.is-hovered[data-v-527e8d26]{background-color:#3ec487;border-color:transparent;color:#fff}.button.is-success[data-v-527e8d26]:focus,.button.is-success.is-focused[data-v-527e8d26]{border-color:transparent;color:#fff}.button.is-success[data-v-527e8d26]:focus:not(:active),.button.is-success.is-focused[data-v-527e8d26]:not(:active){box-shadow:0 0 0 .125em #48c78e40}.button.is-success[data-v-527e8d26]:active,.button.is-success.is-active[data-v-527e8d26]{background-color:#3abb81;border-color:transparent;color:#fff}.button.is-success[disabled][data-v-527e8d26],fieldset[disabled] .button.is-success[data-v-527e8d26]{background-color:#48c78e;border-color:#48c78e;box-shadow:none}.button.is-success.is-inverted[data-v-527e8d26]{background-color:#fff;color:#48c78e}.button.is-success.is-inverted[data-v-527e8d26]:hover,.button.is-success.is-inverted.is-hovered[data-v-527e8d26]{background-color:#f2f2f2}.button.is-success.is-inverted[disabled][data-v-527e8d26],fieldset[disabled] .button.is-success.is-inverted[data-v-527e8d26]{background-color:#fff;border-color:transparent;box-shadow:none;color:#48c78e}.button.is-success.is-loading[data-v-527e8d26]:after{border-color:transparent transparent #fff #fff!important}.button.is-success.is-outlined[data-v-527e8d26]{background-color:transparent;border-color:#48c78e;color:#48c78e}.button.is-success.is-outlined[data-v-527e8d26]:hover,.button.is-success.is-outlined.is-hovered[data-v-527e8d26],.button.is-success.is-outlined[data-v-527e8d26]:focus,.button.is-success.is-outlined.is-focused[data-v-527e8d26]{background-color:#48c78e;border-color:#48c78e;color:#fff}.button.is-success.is-outlined.is-loading[data-v-527e8d26]:after{border-color:transparent transparent #48c78e #48c78e!important}.button.is-success.is-outlined.is-loading[data-v-527e8d26]:hover:after,.button.is-success.is-outlined.is-loading.is-hovered[data-v-527e8d26]:after,.button.is-success.is-outlined.is-loading[data-v-527e8d26]:focus:after,.button.is-success.is-outlined.is-loading.is-focused[data-v-527e8d26]:after{border-color:transparent transparent #fff #fff!important}.button.is-success.is-outlined[disabled][data-v-527e8d26],fieldset[disabled] .button.is-success.is-outlined[data-v-527e8d26]{background-color:transparent;border-color:#48c78e;box-shadow:none;color:#48c78e}.button.is-success.is-inverted.is-outlined[data-v-527e8d26]{background-color:transparent;border-color:#fff;color:#fff}.button.is-success.is-inverted.is-outlined[data-v-527e8d26]:hover,.button.is-success.is-inverted.is-outlined.is-hovered[data-v-527e8d26],.button.is-success.is-inverted.is-outlined[data-v-527e8d26]:focus,.button.is-success.is-inverted.is-outlined.is-focused[data-v-527e8d26]{background-color:#fff;color:#48c78e}.button.is-success.is-inverted.is-outlined.is-loading[data-v-527e8d26]:hover:after,.button.is-success.is-inverted.is-outlined.is-loading.is-hovered[data-v-527e8d26]:after,.button.is-success.is-inverted.is-outlined.is-loading[data-v-527e8d26]:focus:after,.button.is-success.is-inverted.is-outlined.is-loading.is-focused[data-v-527e8d26]:after{border-color:transparent transparent #48c78e #48c78e!important}.button.is-success.is-inverted.is-outlined[disabled][data-v-527e8d26],fieldset[disabled] .button.is-success.is-inverted.is-outlined[data-v-527e8d26]{background-color:transparent;border-color:#fff;box-shadow:none;color:#fff}.button.is-success.is-light[data-v-527e8d26]{background-color:#effaf5;color:#257953}.button.is-success.is-light[data-v-527e8d26]:hover,.button.is-success.is-light.is-hovered[data-v-527e8d26]{background-color:#e6f7ef;border-color:transparent;color:#257953}.button.is-success.is-light[data-v-527e8d26]:active,.button.is-success.is-light.is-active[data-v-527e8d26]{background-color:#dcf4e9;border-color:transparent;color:#257953}.button.is-warning[data-v-527e8d26]{background-color:#ffe08a;border-color:transparent;color:#000000b3}.button.is-warning[data-v-527e8d26]:hover,.button.is-warning.is-hovered[data-v-527e8d26]{background-color:#ffdc7d;border-color:transparent;color:#000000b3}.button.is-warning[data-v-527e8d26]:focus,.button.is-warning.is-focused[data-v-527e8d26]{border-color:transparent;color:#000000b3}.button.is-warning[data-v-527e8d26]:focus:not(:active),.button.is-warning.is-focused[data-v-527e8d26]:not(:active){box-shadow:0 0 0 .125em #ffe08a40}.button.is-warning[data-v-527e8d26]:active,.button.is-warning.is-active[data-v-527e8d26]{background-color:#ffd970;border-color:transparent;color:#000000b3}.button.is-warning[disabled][data-v-527e8d26],fieldset[disabled] .button.is-warning[data-v-527e8d26]{background-color:#ffe08a;border-color:#ffe08a;box-shadow:none}.button.is-warning.is-inverted[data-v-527e8d26]{background-color:#000000b3;color:#ffe08a}.button.is-warning.is-inverted[data-v-527e8d26]:hover,.button.is-warning.is-inverted.is-hovered[data-v-527e8d26]{background-color:#000000b3}.button.is-warning.is-inverted[disabled][data-v-527e8d26],fieldset[disabled] .button.is-warning.is-inverted[data-v-527e8d26]{background-color:#000000b3;border-color:transparent;box-shadow:none;color:#ffe08a}.button.is-warning.is-loading[data-v-527e8d26]:after{border-color:transparent transparent rgba(0,0,0,.7) rgba(0,0,0,.7)!important}.button.is-warning.is-outlined[data-v-527e8d26]{background-color:transparent;border-color:#ffe08a;color:#ffe08a}.button.is-warning.is-outlined[data-v-527e8d26]:hover,.button.is-warning.is-outlined.is-hovered[data-v-527e8d26],.button.is-warning.is-outlined[data-v-527e8d26]:focus,.button.is-warning.is-outlined.is-focused[data-v-527e8d26]{background-color:#ffe08a;border-color:#ffe08a;color:#000000b3}.button.is-warning.is-outlined.is-loading[data-v-527e8d26]:after{border-color:transparent transparent #ffe08a #ffe08a!important}.button.is-warning.is-outlined.is-loading[data-v-527e8d26]:hover:after,.button.is-warning.is-outlined.is-loading.is-hovered[data-v-527e8d26]:after,.button.is-warning.is-outlined.is-loading[data-v-527e8d26]:focus:after,.button.is-warning.is-outlined.is-loading.is-focused[data-v-527e8d26]:after{border-color:transparent transparent rgba(0,0,0,.7) rgba(0,0,0,.7)!important}.button.is-warning.is-outlined[disabled][data-v-527e8d26],fieldset[disabled] .button.is-warning.is-outlined[data-v-527e8d26]{background-color:transparent;border-color:#ffe08a;box-shadow:none;color:#ffe08a}.button.is-warning.is-inverted.is-outlined[data-v-527e8d26]{background-color:transparent;border-color:#000000b3;color:#000000b3}.button.is-warning.is-inverted.is-outlined[data-v-527e8d26]:hover,.button.is-warning.is-inverted.is-outlined.is-hovered[data-v-527e8d26],.button.is-warning.is-inverted.is-outlined[data-v-527e8d26]:focus,.button.is-warning.is-inverted.is-outlined.is-focused[data-v-527e8d26]{background-color:#000000b3;color:#ffe08a}.button.is-warning.is-inverted.is-outlined.is-loading[data-v-527e8d26]:hover:after,.button.is-warning.is-inverted.is-outlined.is-loading.is-hovered[data-v-527e8d26]:after,.button.is-warning.is-inverted.is-outlined.is-loading[data-v-527e8d26]:focus:after,.button.is-warning.is-inverted.is-outlined.is-loading.is-focused[data-v-527e8d26]:after{border-color:transparent transparent #ffe08a #ffe08a!important}.button.is-warning.is-inverted.is-outlined[disabled][data-v-527e8d26],fieldset[disabled] .button.is-warning.is-inverted.is-outlined[data-v-527e8d26]{background-color:transparent;border-color:#000000b3;box-shadow:none;color:#000000b3}.button.is-warning.is-light[data-v-527e8d26]{background-color:#fffaeb;color:#946c00}.button.is-warning.is-light[data-v-527e8d26]:hover,.button.is-warning.is-light.is-hovered[data-v-527e8d26]{background-color:#fff6de;border-color:transparent;color:#946c00}.button.is-warning.is-light[data-v-527e8d26]:active,.button.is-warning.is-light.is-active[data-v-527e8d26]{background-color:#fff3d1;border-color:transparent;color:#946c00}.button.is-danger[data-v-527e8d26]{background-color:#f14668;border-color:transparent;color:#fff}.button.is-danger[data-v-527e8d26]:hover,.button.is-danger.is-hovered[data-v-527e8d26]{background-color:#f03a5f;border-color:transparent;color:#fff}.button.is-danger[data-v-527e8d26]:focus,.button.is-danger.is-focused[data-v-527e8d26]{border-color:transparent;color:#fff}.button.is-danger[data-v-527e8d26]:focus:not(:active),.button.is-danger.is-focused[data-v-527e8d26]:not(:active){box-shadow:0 0 0 .125em #f1466840}.button.is-danger[data-v-527e8d26]:active,.button.is-danger.is-active[data-v-527e8d26]{background-color:#ef2e55;border-color:transparent;color:#fff}.button.is-danger[disabled][data-v-527e8d26],fieldset[disabled] .button.is-danger[data-v-527e8d26]{background-color:#f14668;border-color:#f14668;box-shadow:none}.button.is-danger.is-inverted[data-v-527e8d26]{background-color:#fff;color:#f14668}.button.is-danger.is-inverted[data-v-527e8d26]:hover,.button.is-danger.is-inverted.is-hovered[data-v-527e8d26]{background-color:#f2f2f2}.button.is-danger.is-inverted[disabled][data-v-527e8d26],fieldset[disabled] .button.is-danger.is-inverted[data-v-527e8d26]{background-color:#fff;border-color:transparent;box-shadow:none;color:#f14668}.button.is-danger.is-loading[data-v-527e8d26]:after{border-color:transparent transparent #fff #fff!important}.button.is-danger.is-outlined[data-v-527e8d26]{background-color:transparent;border-color:#f14668;color:#f14668}.button.is-danger.is-outlined[data-v-527e8d26]:hover,.button.is-danger.is-outlined.is-hovered[data-v-527e8d26],.button.is-danger.is-outlined[data-v-527e8d26]:focus,.button.is-danger.is-outlined.is-focused[data-v-527e8d26]{background-color:#f14668;border-color:#f14668;color:#fff}.button.is-danger.is-outlined.is-loading[data-v-527e8d26]:after{border-color:transparent transparent #f14668 #f14668!important}.button.is-danger.is-outlined.is-loading[data-v-527e8d26]:hover:after,.button.is-danger.is-outlined.is-loading.is-hovered[data-v-527e8d26]:after,.button.is-danger.is-outlined.is-loading[data-v-527e8d26]:focus:after,.button.is-danger.is-outlined.is-loading.is-focused[data-v-527e8d26]:after{border-color:transparent transparent #fff #fff!important}.button.is-danger.is-outlined[disabled][data-v-527e8d26],fieldset[disabled] .button.is-danger.is-outlined[data-v-527e8d26]{background-color:transparent;border-color:#f14668;box-shadow:none;color:#f14668}.button.is-danger.is-inverted.is-outlined[data-v-527e8d26]{background-color:transparent;border-color:#fff;color:#fff}.button.is-danger.is-inverted.is-outlined[data-v-527e8d26]:hover,.button.is-danger.is-inverted.is-outlined.is-hovered[data-v-527e8d26],.button.is-danger.is-inverted.is-outlined[data-v-527e8d26]:focus,.button.is-danger.is-inverted.is-outlined.is-focused[data-v-527e8d26]{background-color:#fff;color:#f14668}.button.is-danger.is-inverted.is-outlined.is-loading[data-v-527e8d26]:hover:after,.button.is-danger.is-inverted.is-outlined.is-loading.is-hovered[data-v-527e8d26]:after,.button.is-danger.is-inverted.is-outlined.is-loading[data-v-527e8d26]:focus:after,.button.is-danger.is-inverted.is-outlined.is-loading.is-focused[data-v-527e8d26]:after{border-color:transparent transparent #f14668 #f14668!important}.button.is-danger.is-inverted.is-outlined[disabled][data-v-527e8d26],fieldset[disabled] .button.is-danger.is-inverted.is-outlined[data-v-527e8d26]{background-color:transparent;border-color:#fff;box-shadow:none;color:#fff}.button.is-danger.is-light[data-v-527e8d26]{background-color:#feecf0;color:#cc0f35}.button.is-danger.is-light[data-v-527e8d26]:hover,.button.is-danger.is-light.is-hovered[data-v-527e8d26]{background-color:#fde0e6;border-color:transparent;color:#cc0f35}.button.is-danger.is-light[data-v-527e8d26]:active,.button.is-danger.is-light.is-active[data-v-527e8d26]{background-color:#fcd4dc;border-color:transparent;color:#cc0f35}.button.is-small[data-v-527e8d26]{font-size:.75rem}.button.is-small[data-v-527e8d26]:not(.is-rounded){border-radius:2px}.button.is-normal[data-v-527e8d26]{font-size:1rem}.button.is-medium[data-v-527e8d26]{font-size:1.25rem}.button.is-large[data-v-527e8d26]{font-size:1.5rem}.button[disabled][data-v-527e8d26],fieldset[disabled] .button[data-v-527e8d26]{background-color:#fff;border-color:#dbdbdb;box-shadow:none;opacity:.5}.button.is-fullwidth[data-v-527e8d26]{display:flex;width:100%}.button.is-loading[data-v-527e8d26]{color:transparent!important;pointer-events:none}.button.is-loading[data-v-527e8d26]:after{position:absolute;left:calc(50% - .5em);top:calc(50% - .5em);position:absolute!important}.button.is-static[data-v-527e8d26]{background-color:#f5f5f5;border-color:#dbdbdb;color:#7a7a7a;box-shadow:none;pointer-events:none}.button.is-rounded[data-v-527e8d26]{border-radius:9999px;padding-left:1.25em;padding-right:1.25em}.buttons[data-v-527e8d26]{align-items:center;display:flex;flex-wrap:wrap;justify-content:flex-start}.buttons .button[data-v-527e8d26]{margin-bottom:.5rem}.buttons .button[data-v-527e8d26]:not(:last-child):not(.is-fullwidth){margin-right:.5rem}.buttons[data-v-527e8d26]:last-child{margin-bottom:-.5rem}.buttons[data-v-527e8d26]:not(:last-child){margin-bottom:1rem}.buttons.are-small .button[data-v-527e8d26]:not(.is-normal):not(.is-medium):not(.is-large){font-size:.75rem}.buttons.are-small .button[data-v-527e8d26]:not(.is-normal):not(.is-medium):not(.is-large):not(.is-rounded){border-radius:2px}.buttons.are-medium .button[data-v-527e8d26]:not(.is-small):not(.is-normal):not(.is-large){font-size:1.25rem}.buttons.are-large .button[data-v-527e8d26]:not(.is-small):not(.is-normal):not(.is-medium){font-size:1.5rem}.buttons.has-addons .button[data-v-527e8d26]:not(:first-child){border-bottom-left-radius:0;border-top-left-radius:0}.buttons.has-addons .button[data-v-527e8d26]:not(:last-child){border-bottom-right-radius:0;border-top-right-radius:0;margin-right:-1px}.buttons.has-addons .button[data-v-527e8d26]:last-child{margin-right:0}.buttons.has-addons .button[data-v-527e8d26]:hover,.buttons.has-addons .button.is-hovered[data-v-527e8d26]{z-index:2}.buttons.has-addons .button[data-v-527e8d26]:focus,.buttons.has-addons .button.is-focused[data-v-527e8d26],.buttons.has-addons .button[data-v-527e8d26]:active,.buttons.has-addons .button.is-active[data-v-527e8d26],.buttons.has-addons .button.is-selected[data-v-527e8d26]{z-index:3}.buttons.has-addons .button[data-v-527e8d26]:focus:hover,.buttons.has-addons .button.is-focused[data-v-527e8d26]:hover,.buttons.has-addons .button[data-v-527e8d26]:active:hover,.buttons.has-addons .button.is-active[data-v-527e8d26]:hover,.buttons.has-addons .button.is-selected[data-v-527e8d26]:hover{z-index:4}.buttons.has-addons .button.is-expanded[data-v-527e8d26]{flex-grow:1;flex-shrink:1}.buttons.is-centered[data-v-527e8d26]{justify-content:center}.buttons.is-centered:not(.has-addons) .button[data-v-527e8d26]:not(.is-fullwidth){margin-left:.25rem;margin-right:.25rem}.buttons.is-right[data-v-527e8d26]{justify-content:flex-end}.buttons.is-right:not(.has-addons) .button[data-v-527e8d26]:not(.is-fullwidth){margin-left:.25rem;margin-right:.25rem}@media screen and (max-width: 768px){.button.is-responsive.is-small[data-v-527e8d26]{font-size:.5625rem}.button.is-responsive[data-v-527e8d26],.button.is-responsive.is-normal[data-v-527e8d26]{font-size:.65625rem}.button.is-responsive.is-medium[data-v-527e8d26]{font-size:.75rem}.button.is-responsive.is-large[data-v-527e8d26]{font-size:1rem}}@media screen and (min-width: 769px) and (max-width: 1023px){.button.is-responsive.is-small[data-v-527e8d26]{font-size:.65625rem}.button.is-responsive[data-v-527e8d26],.button.is-responsive.is-normal[data-v-527e8d26]{font-size:.75rem}.button.is-responsive.is-medium[data-v-527e8d26]{font-size:1rem}.button.is-responsive.is-large[data-v-527e8d26]{font-size:1.25rem}}.container[data-v-527e8d26]{flex-grow:1;margin:0 auto;position:relative;width:auto}.container.is-fluid[data-v-527e8d26]{max-width:none!important;padding-left:32px;padding-right:32px;width:100%}@media screen and (min-width: 1024px){.container[data-v-527e8d26]{max-width:960px}}@media screen and (max-width: 1215px){.container.is-widescreen[data-v-527e8d26]:not(.is-max-desktop){max-width:1152px}}@media screen and (max-width: 1407px){.container.is-fullhd[data-v-527e8d26]:not(.is-max-desktop):not(.is-max-widescreen){max-width:1344px}}@media screen and (min-width: 1216px){.container[data-v-527e8d26]:not(.is-max-desktop){max-width:1152px}}@media screen and (min-width: 1408px){.container[data-v-527e8d26]:not(.is-max-desktop):not(.is-max-widescreen){max-width:1344px}}.content li+li[data-v-527e8d26]{margin-top:.25em}.content p[data-v-527e8d26]:not(:last-child),.content dl[data-v-527e8d26]:not(:last-child),.content ol[data-v-527e8d26]:not(:last-child),.content ul[data-v-527e8d26]:not(:last-child),.content blockquote[data-v-527e8d26]:not(:last-child),.content pre[data-v-527e8d26]:not(:last-child),.content table[data-v-527e8d26]:not(:last-child){margin-bottom:1em}.content h1[data-v-527e8d26],.content h2[data-v-527e8d26],.content h3[data-v-527e8d26],.content h4[data-v-527e8d26],.content h5[data-v-527e8d26],.content h6[data-v-527e8d26]{color:#363636;font-weight:600;line-height:1.125}.content h1[data-v-527e8d26]{font-size:2em;margin-bottom:.5em}.content h1[data-v-527e8d26]:not(:first-child){margin-top:1em}.content h2[data-v-527e8d26]{font-size:1.75em;margin-bottom:.5714em}.content h2[data-v-527e8d26]:not(:first-child){margin-top:1.1428em}.content h3[data-v-527e8d26]{font-size:1.5em;margin-bottom:.6666em}.content h3[data-v-527e8d26]:not(:first-child){margin-top:1.3333em}.content h4[data-v-527e8d26]{font-size:1.25em;margin-bottom:.8em}.content h5[data-v-527e8d26]{font-size:1.125em;margin-bottom:.8888em}.content h6[data-v-527e8d26]{font-size:1em;margin-bottom:1em}.content blockquote[data-v-527e8d26]{background-color:#f5f5f5;border-left:5px solid #dbdbdb;padding:1.25em 1.5em}.content ol[data-v-527e8d26]{list-style-position:outside;margin-left:2em;margin-top:1em}.content ol[data-v-527e8d26]:not([type]){list-style-type:decimal}.content ol:not([type]).is-lower-alpha[data-v-527e8d26]{list-style-type:lower-alpha}.content ol:not([type]).is-lower-roman[data-v-527e8d26]{list-style-type:lower-roman}.content ol:not([type]).is-upper-alpha[data-v-527e8d26]{list-style-type:upper-alpha}.content ol:not([type]).is-upper-roman[data-v-527e8d26]{list-style-type:upper-roman}.content ul[data-v-527e8d26]{list-style:disc outside;margin-left:2em;margin-top:1em}.content ul ul[data-v-527e8d26]{list-style-type:circle;margin-top:.5em}.content ul ul ul[data-v-527e8d26]{list-style-type:square}.content dd[data-v-527e8d26]{margin-left:2em}.content figure[data-v-527e8d26]{margin-left:2em;margin-right:2em;text-align:center}.content figure[data-v-527e8d26]:not(:first-child){margin-top:2em}.content figure[data-v-527e8d26]:not(:last-child){margin-bottom:2em}.content figure img[data-v-527e8d26]{display:inline-block}.content figure figcaption[data-v-527e8d26]{font-style:italic}.content pre[data-v-527e8d26]{-webkit-overflow-scrolling:touch;overflow-x:auto;padding:1.25em 1.5em;white-space:pre;word-wrap:normal}.content sup[data-v-527e8d26],.content sub[data-v-527e8d26]{font-size:75%}.content table[data-v-527e8d26]{width:100%}.content table td[data-v-527e8d26],.content table th[data-v-527e8d26]{border:1px solid #dbdbdb;border-width:0 0 1px;padding:.5em .75em;vertical-align:top}.content table th[data-v-527e8d26]{color:#363636}.content table th[data-v-527e8d26]:not([align]){text-align:inherit}.content table thead td[data-v-527e8d26],.content table thead th[data-v-527e8d26]{border-width:0 0 2px;color:#363636}.content table tfoot td[data-v-527e8d26],.content table tfoot th[data-v-527e8d26]{border-width:2px 0 0;color:#363636}.content table tbody tr:last-child td[data-v-527e8d26],.content table tbody tr:last-child th[data-v-527e8d26]{border-bottom-width:0}.content .tabs li+li[data-v-527e8d26]{margin-top:0}.content.is-small[data-v-527e8d26]{font-size:.75rem}.content.is-normal[data-v-527e8d26]{font-size:1rem}.content.is-medium[data-v-527e8d26]{font-size:1.25rem}.content.is-large[data-v-527e8d26]{font-size:1.5rem}.icon[data-v-527e8d26]{align-items:center;display:inline-flex;justify-content:center;height:1.5rem;width:1.5rem}.icon.is-small[data-v-527e8d26]{height:1rem;width:1rem}.icon.is-medium[data-v-527e8d26]{height:2rem;width:2rem}.icon.is-large[data-v-527e8d26]{height:3rem;width:3rem}.icon-text[data-v-527e8d26]{align-items:flex-start;color:inherit;display:inline-flex;flex-wrap:wrap;line-height:1.5rem;vertical-align:top}.icon-text .icon[data-v-527e8d26]{flex-grow:0;flex-shrink:0}.icon-text .icon[data-v-527e8d26]:not(:last-child){margin-right:.25em}.icon-text .icon[data-v-527e8d26]:not(:first-child){margin-left:.25em}div.icon-text[data-v-527e8d26]{display:flex}.image[data-v-527e8d26]{display:block;position:relative}.image img[data-v-527e8d26]{display:block;height:auto;width:100%}.image img.is-rounded[data-v-527e8d26]{border-radius:9999px}.image.is-fullwidth[data-v-527e8d26]{width:100%}.image.is-square img[data-v-527e8d26],.image.is-square .has-ratio[data-v-527e8d26],.image.is-1by1 img[data-v-527e8d26],.image.is-1by1 .has-ratio[data-v-527e8d26],.image.is-5by4 img[data-v-527e8d26],.image.is-5by4 .has-ratio[data-v-527e8d26],.image.is-4by3 img[data-v-527e8d26],.image.is-4by3 .has-ratio[data-v-527e8d26],.image.is-3by2 img[data-v-527e8d26],.image.is-3by2 .has-ratio[data-v-527e8d26],.image.is-5by3 img[data-v-527e8d26],.image.is-5by3 .has-ratio[data-v-527e8d26],.image.is-16by9 img[data-v-527e8d26],.image.is-16by9 .has-ratio[data-v-527e8d26],.image.is-2by1 img[data-v-527e8d26],.image.is-2by1 .has-ratio[data-v-527e8d26],.image.is-3by1 img[data-v-527e8d26],.image.is-3by1 .has-ratio[data-v-527e8d26],.image.is-4by5 img[data-v-527e8d26],.image.is-4by5 .has-ratio[data-v-527e8d26],.image.is-3by4 img[data-v-527e8d26],.image.is-3by4 .has-ratio[data-v-527e8d26],.image.is-2by3 img[data-v-527e8d26],.image.is-2by3 .has-ratio[data-v-527e8d26],.image.is-3by5 img[data-v-527e8d26],.image.is-3by5 .has-ratio[data-v-527e8d26],.image.is-9by16 img[data-v-527e8d26],.image.is-9by16 .has-ratio[data-v-527e8d26],.image.is-1by2 img[data-v-527e8d26],.image.is-1by2 .has-ratio[data-v-527e8d26],.image.is-1by3 img[data-v-527e8d26],.image.is-1by3 .has-ratio[data-v-527e8d26]{height:100%;width:100%}.image.is-square[data-v-527e8d26],.image.is-1by1[data-v-527e8d26]{padding-top:100%}.image.is-5by4[data-v-527e8d26]{padding-top:80%}.image.is-4by3[data-v-527e8d26]{padding-top:75%}.image.is-3by2[data-v-527e8d26]{padding-top:66.6666%}.image.is-5by3[data-v-527e8d26]{padding-top:60%}.image.is-16by9[data-v-527e8d26]{padding-top:56.25%}.image.is-2by1[data-v-527e8d26]{padding-top:50%}.image.is-3by1[data-v-527e8d26]{padding-top:33.3333%}.image.is-4by5[data-v-527e8d26]{padding-top:125%}.image.is-3by4[data-v-527e8d26]{padding-top:133.3333%}.image.is-2by3[data-v-527e8d26]{padding-top:150%}.image.is-3by5[data-v-527e8d26]{padding-top:166.6666%}.image.is-9by16[data-v-527e8d26]{padding-top:177.7777%}.image.is-1by2[data-v-527e8d26]{padding-top:200%}.image.is-1by3[data-v-527e8d26]{padding-top:300%}.image.is-16x16[data-v-527e8d26]{height:16px;width:16px}.image.is-24x24[data-v-527e8d26]{height:24px;width:24px}.image.is-32x32[data-v-527e8d26]{height:32px;width:32px}.image.is-48x48[data-v-527e8d26]{height:48px;width:48px}.image.is-64x64[data-v-527e8d26]{height:64px;width:64px}.image.is-96x96[data-v-527e8d26]{height:96px;width:96px}.image.is-128x128[data-v-527e8d26]{height:128px;width:128px}.notification[data-v-527e8d26]{background-color:#f5f5f5;border-radius:4px;position:relative;padding:1.25rem 2.5rem 1.25rem 1.5rem}.notification a[data-v-527e8d26]:not(.button):not(.dropdown-item){color:currentColor;text-decoration:underline}.notification strong[data-v-527e8d26]{color:currentColor}.notification code[data-v-527e8d26],.notification pre[data-v-527e8d26]{background:white}.notification pre code[data-v-527e8d26]{background:transparent}.notification>.delete[data-v-527e8d26]{right:.5rem;position:absolute;top:.5rem}.notification .title[data-v-527e8d26],.notification .subtitle[data-v-527e8d26],.notification .content[data-v-527e8d26]{color:currentColor}.notification.is-white[data-v-527e8d26]{background-color:#fff;color:#0a0a0a}.notification.is-black[data-v-527e8d26]{background-color:#0a0a0a;color:#fff}.notification.is-light[data-v-527e8d26]{background-color:#f5f5f5;color:#000000b3}.notification.is-dark[data-v-527e8d26]{background-color:#363636;color:#fff}.notification.is-primary[data-v-527e8d26]{background-color:#00d1b2;color:#fff}.notification.is-primary.is-light[data-v-527e8d26]{background-color:#ebfffc;color:#00947e}.notification.is-link[data-v-527e8d26]{background-color:#485fc7;color:#fff}.notification.is-link.is-light[data-v-527e8d26]{background-color:#eff1fa;color:#3850b7}.notification.is-info[data-v-527e8d26]{background-color:#3e8ed0;color:#fff}.notification.is-info.is-light[data-v-527e8d26]{background-color:#eff5fb;color:#296fa8}.notification.is-success[data-v-527e8d26]{background-color:#48c78e;color:#fff}.notification.is-success.is-light[data-v-527e8d26]{background-color:#effaf5;color:#257953}.notification.is-warning[data-v-527e8d26]{background-color:#ffe08a;color:#000000b3}.notification.is-warning.is-light[data-v-527e8d26]{background-color:#fffaeb;color:#946c00}.notification.is-danger[data-v-527e8d26]{background-color:#f14668;color:#fff}.notification.is-danger.is-light[data-v-527e8d26]{background-color:#feecf0;color:#cc0f35}.progress[data-v-527e8d26]{-moz-appearance:none;-webkit-appearance:none;border:none;border-radius:9999px;display:block;height:1rem;overflow:hidden;padding:0;width:100%}.progress[data-v-527e8d26]::-webkit-progress-bar{background-color:#ededed}.progress[data-v-527e8d26]::-webkit-progress-value{background-color:#4a4a4a}.progress[data-v-527e8d26]::-moz-progress-bar{background-color:#4a4a4a}.progress[data-v-527e8d26]::-ms-fill{background-color:#4a4a4a;border:none}.progress.is-white[data-v-527e8d26]::-webkit-progress-value{background-color:#fff}.progress.is-white[data-v-527e8d26]::-moz-progress-bar{background-color:#fff}.progress.is-white[data-v-527e8d26]::-ms-fill{background-color:#fff}.progress.is-white[data-v-527e8d26]:indeterminate{background-image:linear-gradient(to right,white 30%,#ededed 30%)}.progress.is-black[data-v-527e8d26]::-webkit-progress-value{background-color:#0a0a0a}.progress.is-black[data-v-527e8d26]::-moz-progress-bar{background-color:#0a0a0a}.progress.is-black[data-v-527e8d26]::-ms-fill{background-color:#0a0a0a}.progress.is-black[data-v-527e8d26]:indeterminate{background-image:linear-gradient(to right,#0a0a0a 30%,#ededed 30%)}.progress.is-light[data-v-527e8d26]::-webkit-progress-value{background-color:#f5f5f5}.progress.is-light[data-v-527e8d26]::-moz-progress-bar{background-color:#f5f5f5}.progress.is-light[data-v-527e8d26]::-ms-fill{background-color:#f5f5f5}.progress.is-light[data-v-527e8d26]:indeterminate{background-image:linear-gradient(to right,whitesmoke 30%,#ededed 30%)}.progress.is-dark[data-v-527e8d26]::-webkit-progress-value{background-color:#363636}.progress.is-dark[data-v-527e8d26]::-moz-progress-bar{background-color:#363636}.progress.is-dark[data-v-527e8d26]::-ms-fill{background-color:#363636}.progress.is-dark[data-v-527e8d26]:indeterminate{background-image:linear-gradient(to right,#363636 30%,#ededed 30%)}.progress.is-primary[data-v-527e8d26]::-webkit-progress-value{background-color:#00d1b2}.progress.is-primary[data-v-527e8d26]::-moz-progress-bar{background-color:#00d1b2}.progress.is-primary[data-v-527e8d26]::-ms-fill{background-color:#00d1b2}.progress.is-primary[data-v-527e8d26]:indeterminate{background-image:linear-gradient(to right,#00d1b2 30%,#ededed 30%)}.progress.is-link[data-v-527e8d26]::-webkit-progress-value{background-color:#485fc7}.progress.is-link[data-v-527e8d26]::-moz-progress-bar{background-color:#485fc7}.progress.is-link[data-v-527e8d26]::-ms-fill{background-color:#485fc7}.progress.is-link[data-v-527e8d26]:indeterminate{background-image:linear-gradient(to right,#485fc7 30%,#ededed 30%)}.progress.is-info[data-v-527e8d26]::-webkit-progress-value{background-color:#3e8ed0}.progress.is-info[data-v-527e8d26]::-moz-progress-bar{background-color:#3e8ed0}.progress.is-info[data-v-527e8d26]::-ms-fill{background-color:#3e8ed0}.progress.is-info[data-v-527e8d26]:indeterminate{background-image:linear-gradient(to right,#3e8ed0 30%,#ededed 30%)}.progress.is-success[data-v-527e8d26]::-webkit-progress-value{background-color:#48c78e}.progress.is-success[data-v-527e8d26]::-moz-progress-bar{background-color:#48c78e}.progress.is-success[data-v-527e8d26]::-ms-fill{background-color:#48c78e}.progress.is-success[data-v-527e8d26]:indeterminate{background-image:linear-gradient(to right,#48c78e 30%,#ededed 30%)}.progress.is-warning[data-v-527e8d26]::-webkit-progress-value{background-color:#ffe08a}.progress.is-warning[data-v-527e8d26]::-moz-progress-bar{background-color:#ffe08a}.progress.is-warning[data-v-527e8d26]::-ms-fill{background-color:#ffe08a}.progress.is-warning[data-v-527e8d26]:indeterminate{background-image:linear-gradient(to right,#ffe08a 30%,#ededed 30%)}.progress.is-danger[data-v-527e8d26]::-webkit-progress-value{background-color:#f14668}.progress.is-danger[data-v-527e8d26]::-moz-progress-bar{background-color:#f14668}.progress.is-danger[data-v-527e8d26]::-ms-fill{background-color:#f14668}.progress.is-danger[data-v-527e8d26]:indeterminate{background-image:linear-gradient(to right,#f14668 30%,#ededed 30%)}.progress[data-v-527e8d26]:indeterminate{-webkit-animation-duration:1.5s;animation-duration:1.5s;-webkit-animation-iteration-count:infinite;animation-iteration-count:infinite;-webkit-animation-name:moveIndeterminate-527e8d26;animation-name:moveIndeterminate-527e8d26;-webkit-animation-timing-function:linear;animation-timing-function:linear;background-color:#ededed;background-image:linear-gradient(to right,#4a4a4a 30%,#ededed 30%);background-position:top left;background-repeat:no-repeat;background-size:150% 150%}.progress[data-v-527e8d26]:indeterminate::-webkit-progress-bar{background-color:transparent}.progress[data-v-527e8d26]:indeterminate::-moz-progress-bar{background-color:transparent}.progress[data-v-527e8d26]:indeterminate::-ms-fill{animation-name:none}.progress.is-small[data-v-527e8d26]{height:.75rem}.progress.is-medium[data-v-527e8d26]{height:1.25rem}.progress.is-large[data-v-527e8d26]{height:1.5rem}@-webkit-keyframes moveIndeterminate-527e8d26{0%{background-position:200% 0}to{background-position:-200% 0}}@keyframes moveIndeterminate-527e8d26{0%{background-position:200% 0}to{background-position:-200% 0}}.table[data-v-527e8d26]{background-color:#fff;color:#363636}.table td[data-v-527e8d26],.table th[data-v-527e8d26]{border:1px solid #dbdbdb;border-width:0 0 1px;padding:.5em .75em;vertical-align:top}.table td.is-white[data-v-527e8d26],.table th.is-white[data-v-527e8d26]{background-color:#fff;border-color:#fff;color:#0a0a0a}.table td.is-black[data-v-527e8d26],.table th.is-black[data-v-527e8d26]{background-color:#0a0a0a;border-color:#0a0a0a;color:#fff}.table td.is-light[data-v-527e8d26],.table th.is-light[data-v-527e8d26]{background-color:#f5f5f5;border-color:#f5f5f5;color:#000000b3}.table td.is-dark[data-v-527e8d26],.table th.is-dark[data-v-527e8d26]{background-color:#363636;border-color:#363636;color:#fff}.table td.is-primary[data-v-527e8d26],.table th.is-primary[data-v-527e8d26]{background-color:#00d1b2;border-color:#00d1b2;color:#fff}.table td.is-link[data-v-527e8d26],.table th.is-link[data-v-527e8d26]{background-color:#485fc7;border-color:#485fc7;color:#fff}.table td.is-info[data-v-527e8d26],.table th.is-info[data-v-527e8d26]{background-color:#3e8ed0;border-color:#3e8ed0;color:#fff}.table td.is-success[data-v-527e8d26],.table th.is-success[data-v-527e8d26]{background-color:#48c78e;border-color:#48c78e;color:#fff}.table td.is-warning[data-v-527e8d26],.table th.is-warning[data-v-527e8d26]{background-color:#ffe08a;border-color:#ffe08a;color:#000000b3}.table td.is-danger[data-v-527e8d26],.table th.is-danger[data-v-527e8d26]{background-color:#f14668;border-color:#f14668;color:#fff}.table td.is-narrow[data-v-527e8d26],.table th.is-narrow[data-v-527e8d26]{white-space:nowrap;width:1%}.table td.is-selected[data-v-527e8d26],.table th.is-selected[data-v-527e8d26]{background-color:#00d1b2;color:#fff}.table td.is-selected a[data-v-527e8d26],.table td.is-selected strong[data-v-527e8d26],.table th.is-selected a[data-v-527e8d26],.table th.is-selected strong[data-v-527e8d26]{color:currentColor}.table td.is-vcentered[data-v-527e8d26],.table th.is-vcentered[data-v-527e8d26]{vertical-align:middle}.table th[data-v-527e8d26]{color:#363636}.table th[data-v-527e8d26]:not([align]){text-align:left}.table tr.is-selected[data-v-527e8d26]{background-color:#00d1b2;color:#fff}.table tr.is-selected a[data-v-527e8d26],.table tr.is-selected strong[data-v-527e8d26]{color:currentColor}.table tr.is-selected td[data-v-527e8d26],.table tr.is-selected th[data-v-527e8d26]{border-color:#fff;color:currentColor}.table thead[data-v-527e8d26]{background-color:transparent}.table thead td[data-v-527e8d26],.table thead th[data-v-527e8d26]{border-width:0 0 2px;color:#363636}.table tfoot[data-v-527e8d26]{background-color:transparent}.table tfoot td[data-v-527e8d26],.table tfoot th[data-v-527e8d26]{border-width:2px 0 0;color:#363636}.table tbody[data-v-527e8d26]{background-color:transparent}.table tbody tr:last-child td[data-v-527e8d26],.table tbody tr:last-child th[data-v-527e8d26]{border-bottom-width:0}.table.is-bordered td[data-v-527e8d26],.table.is-bordered th[data-v-527e8d26]{border-width:1px}.table.is-bordered tr:last-child td[data-v-527e8d26],.table.is-bordered tr:last-child th[data-v-527e8d26]{border-bottom-width:1px}.table.is-fullwidth[data-v-527e8d26]{width:100%}.table.is-hoverable tbody tr[data-v-527e8d26]:not(.is-selected):hover{background-color:#fafafa}.table.is-hoverable.is-striped tbody tr[data-v-527e8d26]:not(.is-selected):hover{background-color:#fafafa}.table.is-hoverable.is-striped tbody tr[data-v-527e8d26]:not(.is-selected):hover:nth-child(2n){background-color:#f5f5f5}.table.is-narrow td[data-v-527e8d26],.table.is-narrow th[data-v-527e8d26]{padding:.25em .5em}.table.is-striped tbody tr[data-v-527e8d26]:not(.is-selected):nth-child(2n){background-color:#fafafa}.table-container[data-v-527e8d26]{-webkit-overflow-scrolling:touch;overflow:auto;overflow-y:hidden;max-width:100%}.tags[data-v-527e8d26]{align-items:center;display:flex;flex-wrap:wrap;justify-content:flex-start}.tags .tag[data-v-527e8d26]{margin-bottom:.5rem}.tags .tag[data-v-527e8d26]:not(:last-child){margin-right:.5rem}.tags[data-v-527e8d26]:last-child{margin-bottom:-.5rem}.tags[data-v-527e8d26]:not(:last-child){margin-bottom:1rem}.tags.are-medium .tag[data-v-527e8d26]:not(.is-normal):not(.is-large){font-size:1rem}.tags.are-large .tag[data-v-527e8d26]:not(.is-normal):not(.is-medium){font-size:1.25rem}.tags.is-centered[data-v-527e8d26]{justify-content:center}.tags.is-centered .tag[data-v-527e8d26]{margin-right:.25rem;margin-left:.25rem}.tags.is-right[data-v-527e8d26]{justify-content:flex-end}.tags.is-right .tag[data-v-527e8d26]:not(:first-child){margin-left:.5rem}.tags.is-right .tag[data-v-527e8d26]:not(:last-child){margin-right:0}.tags.has-addons .tag[data-v-527e8d26]{margin-right:0}.tags.has-addons .tag[data-v-527e8d26]:not(:first-child){margin-left:0;border-top-left-radius:0;border-bottom-left-radius:0}.tags.has-addons .tag[data-v-527e8d26]:not(:last-child){border-top-right-radius:0;border-bottom-right-radius:0}.tag[data-v-527e8d26]:not(body){align-items:center;background-color:#f5f5f5;border-radius:4px;color:#4a4a4a;display:inline-flex;font-size:.75rem;height:2em;justify-content:center;line-height:1.5;padding-left:.75em;padding-right:.75em;white-space:nowrap}.tag:not(body) .delete[data-v-527e8d26]{margin-left:.25rem;margin-right:-.375rem}.tag:not(body).is-white[data-v-527e8d26]{background-color:#fff;color:#0a0a0a}.tag:not(body).is-black[data-v-527e8d26]{background-color:#0a0a0a;color:#fff}.tag:not(body).is-light[data-v-527e8d26]{background-color:#f5f5f5;color:#000000b3}.tag:not(body).is-dark[data-v-527e8d26]{background-color:#363636;color:#fff}.tag:not(body).is-primary[data-v-527e8d26]{background-color:#00d1b2;color:#fff}.tag:not(body).is-primary.is-light[data-v-527e8d26]{background-color:#ebfffc;color:#00947e}.tag:not(body).is-link[data-v-527e8d26]{background-color:#485fc7;color:#fff}.tag:not(body).is-link.is-light[data-v-527e8d26]{background-color:#eff1fa;color:#3850b7}.tag:not(body).is-info[data-v-527e8d26]{background-color:#3e8ed0;color:#fff}.tag:not(body).is-info.is-light[data-v-527e8d26]{background-color:#eff5fb;color:#296fa8}.tag:not(body).is-success[data-v-527e8d26]{background-color:#48c78e;color:#fff}.tag:not(body).is-success.is-light[data-v-527e8d26]{background-color:#effaf5;color:#257953}.tag:not(body).is-warning[data-v-527e8d26]{background-color:#ffe08a;color:#000000b3}.tag:not(body).is-warning.is-light[data-v-527e8d26]{background-color:#fffaeb;color:#946c00}.tag:not(body).is-danger[data-v-527e8d26]{background-color:#f14668;color:#fff}.tag:not(body).is-danger.is-light[data-v-527e8d26]{background-color:#feecf0;color:#cc0f35}.tag:not(body).is-normal[data-v-527e8d26]{font-size:.75rem}.tag:not(body).is-medium[data-v-527e8d26]{font-size:1rem}.tag:not(body).is-large[data-v-527e8d26]{font-size:1.25rem}.tag:not(body) .icon[data-v-527e8d26]:first-child:not(:last-child){margin-left:-.375em;margin-right:.1875em}.tag:not(body) .icon[data-v-527e8d26]:last-child:not(:first-child){margin-left:.1875em;margin-right:-.375em}.tag:not(body) .icon[data-v-527e8d26]:first-child:last-child{margin-left:-.375em;margin-right:-.375em}.tag:not(body).is-delete[data-v-527e8d26]{margin-left:1px;padding:0;position:relative;width:2em}.tag:not(body).is-delete[data-v-527e8d26]:before,.tag:not(body).is-delete[data-v-527e8d26]:after{background-color:currentColor;content:"";display:block;left:50%;position:absolute;top:50%;transform:translate(-50%) translateY(-50%) rotate(45deg);transform-origin:center center}.tag:not(body).is-delete[data-v-527e8d26]:before{height:1px;width:50%}.tag:not(body).is-delete[data-v-527e8d26]:after{height:50%;width:1px}.tag:not(body).is-delete[data-v-527e8d26]:hover,.tag:not(body).is-delete[data-v-527e8d26]:focus{background-color:#e8e8e8}.tag:not(body).is-delete[data-v-527e8d26]:active{background-color:#dbdbdb}.tag:not(body).is-rounded[data-v-527e8d26]{border-radius:9999px}a.tag[data-v-527e8d26]:hover{text-decoration:underline}.title[data-v-527e8d26],.subtitle[data-v-527e8d26]{word-break:break-word}.title em[data-v-527e8d26],.title span[data-v-527e8d26],.subtitle em[data-v-527e8d26],.subtitle span[data-v-527e8d26]{font-weight:inherit}.title sub[data-v-527e8d26],.subtitle sub[data-v-527e8d26],.title sup[data-v-527e8d26],.subtitle sup[data-v-527e8d26]{font-size:.75em}.title .tag[data-v-527e8d26],.subtitle .tag[data-v-527e8d26]{vertical-align:middle}.title[data-v-527e8d26]{color:#363636;font-size:2rem;font-weight:600;line-height:1.125}.title strong[data-v-527e8d26]{color:inherit;font-weight:inherit}.title:not(.is-spaced)+.subtitle[data-v-527e8d26]{margin-top:-1.25rem}.title.is-1[data-v-527e8d26]{font-size:3rem}.title.is-2[data-v-527e8d26]{font-size:2.5rem}.title.is-3[data-v-527e8d26]{font-size:2rem}.title.is-4[data-v-527e8d26]{font-size:1.5rem}.title.is-5[data-v-527e8d26]{font-size:1.25rem}.title.is-6[data-v-527e8d26]{font-size:1rem}.title.is-7[data-v-527e8d26]{font-size:.75rem}.subtitle[data-v-527e8d26]{color:#4a4a4a;font-size:1.25rem;font-weight:400;line-height:1.25}.subtitle strong[data-v-527e8d26]{color:#363636;font-weight:600}.subtitle:not(.is-spaced)+.title[data-v-527e8d26]{margin-top:-1.25rem}.subtitle.is-1[data-v-527e8d26]{font-size:3rem}.subtitle.is-2[data-v-527e8d26]{font-size:2.5rem}.subtitle.is-3[data-v-527e8d26]{font-size:2rem}.subtitle.is-4[data-v-527e8d26]{font-size:1.5rem}.subtitle.is-5[data-v-527e8d26]{font-size:1.25rem}.subtitle.is-6[data-v-527e8d26]{font-size:1rem}.subtitle.is-7[data-v-527e8d26]{font-size:.75rem}.heading[data-v-527e8d26]{display:block;font-size:11px;letter-spacing:1px;margin-bottom:5px;text-transform:uppercase}.number[data-v-527e8d26]{align-items:center;background-color:#f5f5f5;border-radius:9999px;display:inline-flex;font-size:1.25rem;height:2em;justify-content:center;margin-right:1.5rem;min-width:2.5em;padding:.25rem .5rem;text-align:center;vertical-align:top}.input[data-v-527e8d26],.textarea[data-v-527e8d26],.select select[data-v-527e8d26]{background-color:#fff;border-color:#dbdbdb;border-radius:4px;color:#363636}.input[data-v-527e8d26]::-moz-placeholder,.textarea[data-v-527e8d26]::-moz-placeholder,.select select[data-v-527e8d26]::-moz-placeholder{color:#3636364d}.input[data-v-527e8d26]::-webkit-input-placeholder,.textarea[data-v-527e8d26]::-webkit-input-placeholder,.select select[data-v-527e8d26]::-webkit-input-placeholder{color:#3636364d}.input[data-v-527e8d26]:-moz-placeholder,.textarea[data-v-527e8d26]:-moz-placeholder,.select select[data-v-527e8d26]:-moz-placeholder{color:#3636364d}.input[data-v-527e8d26]:-ms-input-placeholder,.textarea[data-v-527e8d26]:-ms-input-placeholder,.select select[data-v-527e8d26]:-ms-input-placeholder{color:#3636364d}.input[data-v-527e8d26]:hover,.textarea[data-v-527e8d26]:hover,.select select[data-v-527e8d26]:hover,.is-hovered.input[data-v-527e8d26],.is-hovered.textarea[data-v-527e8d26],.select select.is-hovered[data-v-527e8d26]{border-color:#b5b5b5}.input[data-v-527e8d26]:focus,.textarea[data-v-527e8d26]:focus,.select select[data-v-527e8d26]:focus,.is-focused.input[data-v-527e8d26],.is-focused.textarea[data-v-527e8d26],.select select.is-focused[data-v-527e8d26],.input[data-v-527e8d26]:active,.textarea[data-v-527e8d26]:active,.select select[data-v-527e8d26]:active,.is-active.input[data-v-527e8d26],.is-active.textarea[data-v-527e8d26],.select select.is-active[data-v-527e8d26]{border-color:#485fc7;box-shadow:0 0 0 .125em #485fc740}.input[disabled][data-v-527e8d26],.textarea[disabled][data-v-527e8d26],.select select[disabled][data-v-527e8d26],fieldset[disabled] .input[data-v-527e8d26],fieldset[disabled] .textarea[data-v-527e8d26],fieldset[disabled] .select select[data-v-527e8d26],.select fieldset[disabled] select[data-v-527e8d26]{background-color:#f5f5f5;border-color:#f5f5f5;box-shadow:none;color:#7a7a7a}.input[disabled][data-v-527e8d26]::-moz-placeholder,.textarea[disabled][data-v-527e8d26]::-moz-placeholder,.select select[disabled][data-v-527e8d26]::-moz-placeholder,fieldset[disabled] .input[data-v-527e8d26]::-moz-placeholder,fieldset[disabled] .textarea[data-v-527e8d26]::-moz-placeholder,fieldset[disabled] .select select[data-v-527e8d26]::-moz-placeholder,.select fieldset[disabled] select[data-v-527e8d26]::-moz-placeholder{color:#7a7a7a4d}.input[disabled][data-v-527e8d26]::-webkit-input-placeholder,.textarea[disabled][data-v-527e8d26]::-webkit-input-placeholder,.select select[disabled][data-v-527e8d26]::-webkit-input-placeholder,fieldset[disabled] .input[data-v-527e8d26]::-webkit-input-placeholder,fieldset[disabled] .textarea[data-v-527e8d26]::-webkit-input-placeholder,fieldset[disabled] .select select[data-v-527e8d26]::-webkit-input-placeholder,.select fieldset[disabled] select[data-v-527e8d26]::-webkit-input-placeholder{color:#7a7a7a4d}.input[disabled][data-v-527e8d26]:-moz-placeholder,.textarea[disabled][data-v-527e8d26]:-moz-placeholder,.select select[disabled][data-v-527e8d26]:-moz-placeholder,fieldset[disabled] .input[data-v-527e8d26]:-moz-placeholder,fieldset[disabled] .textarea[data-v-527e8d26]:-moz-placeholder,fieldset[disabled] .select select[data-v-527e8d26]:-moz-placeholder,.select fieldset[disabled] select[data-v-527e8d26]:-moz-placeholder{color:#7a7a7a4d}.input[disabled][data-v-527e8d26]:-ms-input-placeholder,.textarea[disabled][data-v-527e8d26]:-ms-input-placeholder,.select select[disabled][data-v-527e8d26]:-ms-input-placeholder,fieldset[disabled] .input[data-v-527e8d26]:-ms-input-placeholder,fieldset[disabled] .textarea[data-v-527e8d26]:-ms-input-placeholder,fieldset[disabled] .select select[data-v-527e8d26]:-ms-input-placeholder,.select fieldset[disabled] select[data-v-527e8d26]:-ms-input-placeholder{color:#7a7a7a4d}.input[data-v-527e8d26],.textarea[data-v-527e8d26]{box-shadow:inset 0 .0625em .125em #0a0a0a0d;max-width:100%;width:100%}.input[readonly][data-v-527e8d26],.textarea[readonly][data-v-527e8d26]{box-shadow:none}.is-white.input[data-v-527e8d26],.is-white.textarea[data-v-527e8d26]{border-color:#fff}.is-white.input[data-v-527e8d26]:focus,.is-white.textarea[data-v-527e8d26]:focus,.is-white.is-focused.input[data-v-527e8d26],.is-white.is-focused.textarea[data-v-527e8d26],.is-white.input[data-v-527e8d26]:active,.is-white.textarea[data-v-527e8d26]:active,.is-white.is-active.input[data-v-527e8d26],.is-white.is-active.textarea[data-v-527e8d26]{box-shadow:0 0 0 .125em #ffffff40}.is-black.input[data-v-527e8d26],.is-black.textarea[data-v-527e8d26]{border-color:#0a0a0a}.is-black.input[data-v-527e8d26]:focus,.is-black.textarea[data-v-527e8d26]:focus,.is-black.is-focused.input[data-v-527e8d26],.is-black.is-focused.textarea[data-v-527e8d26],.is-black.input[data-v-527e8d26]:active,.is-black.textarea[data-v-527e8d26]:active,.is-black.is-active.input[data-v-527e8d26],.is-black.is-active.textarea[data-v-527e8d26]{box-shadow:0 0 0 .125em #0a0a0a40}.is-light.input[data-v-527e8d26],.is-light.textarea[data-v-527e8d26]{border-color:#f5f5f5}.is-light.input[data-v-527e8d26]:focus,.is-light.textarea[data-v-527e8d26]:focus,.is-light.is-focused.input[data-v-527e8d26],.is-light.is-focused.textarea[data-v-527e8d26],.is-light.input[data-v-527e8d26]:active,.is-light.textarea[data-v-527e8d26]:active,.is-light.is-active.input[data-v-527e8d26],.is-light.is-active.textarea[data-v-527e8d26]{box-shadow:0 0 0 .125em #f5f5f540}.is-dark.input[data-v-527e8d26],.is-dark.textarea[data-v-527e8d26]{border-color:#363636}.is-dark.input[data-v-527e8d26]:focus,.is-dark.textarea[data-v-527e8d26]:focus,.is-dark.is-focused.input[data-v-527e8d26],.is-dark.is-focused.textarea[data-v-527e8d26],.is-dark.input[data-v-527e8d26]:active,.is-dark.textarea[data-v-527e8d26]:active,.is-dark.is-active.input[data-v-527e8d26],.is-dark.is-active.textarea[data-v-527e8d26]{box-shadow:0 0 0 .125em #36363640}.is-primary.input[data-v-527e8d26],.is-primary.textarea[data-v-527e8d26]{border-color:#00d1b2}.is-primary.input[data-v-527e8d26]:focus,.is-primary.textarea[data-v-527e8d26]:focus,.is-primary.is-focused.input[data-v-527e8d26],.is-primary.is-focused.textarea[data-v-527e8d26],.is-primary.input[data-v-527e8d26]:active,.is-primary.textarea[data-v-527e8d26]:active,.is-primary.is-active.input[data-v-527e8d26],.is-primary.is-active.textarea[data-v-527e8d26]{box-shadow:0 0 0 .125em #00d1b240}.is-link.input[data-v-527e8d26],.is-link.textarea[data-v-527e8d26]{border-color:#485fc7}.is-link.input[data-v-527e8d26]:focus,.is-link.textarea[data-v-527e8d26]:focus,.is-link.is-focused.input[data-v-527e8d26],.is-link.is-focused.textarea[data-v-527e8d26],.is-link.input[data-v-527e8d26]:active,.is-link.textarea[data-v-527e8d26]:active,.is-link.is-active.input[data-v-527e8d26],.is-link.is-active.textarea[data-v-527e8d26]{box-shadow:0 0 0 .125em #485fc740}.is-info.input[data-v-527e8d26],.is-info.textarea[data-v-527e8d26]{border-color:#3e8ed0}.is-info.input[data-v-527e8d26]:focus,.is-info.textarea[data-v-527e8d26]:focus,.is-info.is-focused.input[data-v-527e8d26],.is-info.is-focused.textarea[data-v-527e8d26],.is-info.input[data-v-527e8d26]:active,.is-info.textarea[data-v-527e8d26]:active,.is-info.is-active.input[data-v-527e8d26],.is-info.is-active.textarea[data-v-527e8d26]{box-shadow:0 0 0 .125em #3e8ed040}.is-success.input[data-v-527e8d26],.is-success.textarea[data-v-527e8d26]{border-color:#48c78e}.is-success.input[data-v-527e8d26]:focus,.is-success.textarea[data-v-527e8d26]:focus,.is-success.is-focused.input[data-v-527e8d26],.is-success.is-focused.textarea[data-v-527e8d26],.is-success.input[data-v-527e8d26]:active,.is-success.textarea[data-v-527e8d26]:active,.is-success.is-active.input[data-v-527e8d26],.is-success.is-active.textarea[data-v-527e8d26]{box-shadow:0 0 0 .125em #48c78e40}.is-warning.input[data-v-527e8d26],.is-warning.textarea[data-v-527e8d26]{border-color:#ffe08a}.is-warning.input[data-v-527e8d26]:focus,.is-warning.textarea[data-v-527e8d26]:focus,.is-warning.is-focused.input[data-v-527e8d26],.is-warning.is-focused.textarea[data-v-527e8d26],.is-warning.input[data-v-527e8d26]:active,.is-warning.textarea[data-v-527e8d26]:active,.is-warning.is-active.input[data-v-527e8d26],.is-warning.is-active.textarea[data-v-527e8d26]{box-shadow:0 0 0 .125em #ffe08a40}.is-danger.input[data-v-527e8d26],.is-danger.textarea[data-v-527e8d26]{border-color:#f14668}.is-danger.input[data-v-527e8d26]:focus,.is-danger.textarea[data-v-527e8d26]:focus,.is-danger.is-focused.input[data-v-527e8d26],.is-danger.is-focused.textarea[data-v-527e8d26],.is-danger.input[data-v-527e8d26]:active,.is-danger.textarea[data-v-527e8d26]:active,.is-danger.is-active.input[data-v-527e8d26],.is-danger.is-active.textarea[data-v-527e8d26]{box-shadow:0 0 0 .125em #f1466840}.is-small.input[data-v-527e8d26],.is-small.textarea[data-v-527e8d26]{border-radius:2px;font-size:.75rem}.is-medium.input[data-v-527e8d26],.is-medium.textarea[data-v-527e8d26]{font-size:1.25rem}.is-large.input[data-v-527e8d26],.is-large.textarea[data-v-527e8d26]{font-size:1.5rem}.is-fullwidth.input[data-v-527e8d26],.is-fullwidth.textarea[data-v-527e8d26]{display:block;width:100%}.is-inline.input[data-v-527e8d26],.is-inline.textarea[data-v-527e8d26]{display:inline;width:auto}.input.is-rounded[data-v-527e8d26]{border-radius:9999px;padding-left:calc(1.125em - 1px);padding-right:calc(1.125em - 1px)}.input.is-static[data-v-527e8d26]{background-color:transparent;border-color:transparent;box-shadow:none;padding-left:0;padding-right:0}.textarea[data-v-527e8d26]{display:block;max-width:100%;min-width:100%;padding:calc(.75em - 1px);resize:vertical}.textarea[data-v-527e8d26]:not([rows]){max-height:40em;min-height:8em}.textarea[rows][data-v-527e8d26]{height:initial}.textarea.has-fixed-size[data-v-527e8d26]{resize:none}.checkbox[data-v-527e8d26],.radio[data-v-527e8d26]{cursor:pointer;display:inline-block;line-height:1.25;position:relative}.checkbox input[data-v-527e8d26],.radio input[data-v-527e8d26]{cursor:pointer}.checkbox[data-v-527e8d26]:hover,.radio[data-v-527e8d26]:hover{color:#363636}.checkbox[disabled][data-v-527e8d26],.radio[disabled][data-v-527e8d26],fieldset[disabled] .checkbox[data-v-527e8d26],fieldset[disabled] .radio[data-v-527e8d26],.checkbox input[disabled][data-v-527e8d26],.radio input[disabled][data-v-527e8d26]{color:#7a7a7a;cursor:not-allowed}.radio+.radio[data-v-527e8d26]{margin-left:.5em}.select[data-v-527e8d26]{display:inline-block;max-width:100%;position:relative;vertical-align:top}.select[data-v-527e8d26]:not(.is-multiple){height:2.5em}.select[data-v-527e8d26]:not(.is-multiple):not(.is-loading):after{border-color:#485fc7;right:1.125em;z-index:4}.select.is-rounded select[data-v-527e8d26]{border-radius:9999px;padding-left:1em}.select select[data-v-527e8d26]{cursor:pointer;display:block;font-size:1em;max-width:100%;outline:none}.select select[data-v-527e8d26]::-ms-expand{display:none}.select select[disabled][data-v-527e8d26]:hover,fieldset[disabled] .select select[data-v-527e8d26]:hover{border-color:#f5f5f5}.select select[data-v-527e8d26]:not([multiple]){padding-right:2.5em}.select select[multiple][data-v-527e8d26]{height:auto;padding:0}.select select[multiple] option[data-v-527e8d26]{padding:.5em 1em}.select[data-v-527e8d26]:not(.is-multiple):not(.is-loading):hover:after{border-color:#363636}.select.is-white[data-v-527e8d26]:not(:hover):after{border-color:#fff}.select.is-white select[data-v-527e8d26]{border-color:#fff}.select.is-white select[data-v-527e8d26]:hover,.select.is-white select.is-hovered[data-v-527e8d26]{border-color:#f2f2f2}.select.is-white select[data-v-527e8d26]:focus,.select.is-white select.is-focused[data-v-527e8d26],.select.is-white select[data-v-527e8d26]:active,.select.is-white select.is-active[data-v-527e8d26]{box-shadow:0 0 0 .125em #ffffff40}.select.is-black[data-v-527e8d26]:not(:hover):after{border-color:#0a0a0a}.select.is-black select[data-v-527e8d26]{border-color:#0a0a0a}.select.is-black select[data-v-527e8d26]:hover,.select.is-black select.is-hovered[data-v-527e8d26]{border-color:#000}.select.is-black select[data-v-527e8d26]:focus,.select.is-black select.is-focused[data-v-527e8d26],.select.is-black select[data-v-527e8d26]:active,.select.is-black select.is-active[data-v-527e8d26]{box-shadow:0 0 0 .125em #0a0a0a40}.select.is-light[data-v-527e8d26]:not(:hover):after{border-color:#f5f5f5}.select.is-light select[data-v-527e8d26]{border-color:#f5f5f5}.select.is-light select[data-v-527e8d26]:hover,.select.is-light select.is-hovered[data-v-527e8d26]{border-color:#e8e8e8}.select.is-light select[data-v-527e8d26]:focus,.select.is-light select.is-focused[data-v-527e8d26],.select.is-light select[data-v-527e8d26]:active,.select.is-light select.is-active[data-v-527e8d26]{box-shadow:0 0 0 .125em #f5f5f540}.select.is-dark[data-v-527e8d26]:not(:hover):after{border-color:#363636}.select.is-dark select[data-v-527e8d26]{border-color:#363636}.select.is-dark select[data-v-527e8d26]:hover,.select.is-dark select.is-hovered[data-v-527e8d26]{border-color:#292929}.select.is-dark select[data-v-527e8d26]:focus,.select.is-dark select.is-focused[data-v-527e8d26],.select.is-dark select[data-v-527e8d26]:active,.select.is-dark select.is-active[data-v-527e8d26]{box-shadow:0 0 0 .125em #36363640}.select.is-primary[data-v-527e8d26]:not(:hover):after{border-color:#00d1b2}.select.is-primary select[data-v-527e8d26]{border-color:#00d1b2}.select.is-primary select[data-v-527e8d26]:hover,.select.is-primary select.is-hovered[data-v-527e8d26]{border-color:#00b89c}.select.is-primary select[data-v-527e8d26]:focus,.select.is-primary select.is-focused[data-v-527e8d26],.select.is-primary select[data-v-527e8d26]:active,.select.is-primary select.is-active[data-v-527e8d26]{box-shadow:0 0 0 .125em #00d1b240}.select.is-link[data-v-527e8d26]:not(:hover):after{border-color:#485fc7}.select.is-link select[data-v-527e8d26]{border-color:#485fc7}.select.is-link select[data-v-527e8d26]:hover,.select.is-link select.is-hovered[data-v-527e8d26]{border-color:#3a51bb}.select.is-link select[data-v-527e8d26]:focus,.select.is-link select.is-focused[data-v-527e8d26],.select.is-link select[data-v-527e8d26]:active,.select.is-link select.is-active[data-v-527e8d26]{box-shadow:0 0 0 .125em #485fc740}.select.is-info[data-v-527e8d26]:not(:hover):after{border-color:#3e8ed0}.select.is-info select[data-v-527e8d26]{border-color:#3e8ed0}.select.is-info select[data-v-527e8d26]:hover,.select.is-info select.is-hovered[data-v-527e8d26]{border-color:#3082c5}.select.is-info select[data-v-527e8d26]:focus,.select.is-info select.is-focused[data-v-527e8d26],.select.is-info select[data-v-527e8d26]:active,.select.is-info select.is-active[data-v-527e8d26]{box-shadow:0 0 0 .125em #3e8ed040}.select.is-success[data-v-527e8d26]:not(:hover):after{border-color:#48c78e}.select.is-success select[data-v-527e8d26]{border-color:#48c78e}.select.is-success select[data-v-527e8d26]:hover,.select.is-success select.is-hovered[data-v-527e8d26]{border-color:#3abb81}.select.is-success select[data-v-527e8d26]:focus,.select.is-success select.is-focused[data-v-527e8d26],.select.is-success select[data-v-527e8d26]:active,.select.is-success select.is-active[data-v-527e8d26]{box-shadow:0 0 0 .125em #48c78e40}.select.is-warning[data-v-527e8d26]:not(:hover):after{border-color:#ffe08a}.select.is-warning select[data-v-527e8d26]{border-color:#ffe08a}.select.is-warning select[data-v-527e8d26]:hover,.select.is-warning select.is-hovered[data-v-527e8d26]{border-color:#ffd970}.select.is-warning select[data-v-527e8d26]:focus,.select.is-warning select.is-focused[data-v-527e8d26],.select.is-warning select[data-v-527e8d26]:active,.select.is-warning select.is-active[data-v-527e8d26]{box-shadow:0 0 0 .125em #ffe08a40}.select.is-danger[data-v-527e8d26]:not(:hover):after{border-color:#f14668}.select.is-danger select[data-v-527e8d26]{border-color:#f14668}.select.is-danger select[data-v-527e8d26]:hover,.select.is-danger select.is-hovered[data-v-527e8d26]{border-color:#ef2e55}.select.is-danger select[data-v-527e8d26]:focus,.select.is-danger select.is-focused[data-v-527e8d26],.select.is-danger select[data-v-527e8d26]:active,.select.is-danger select.is-active[data-v-527e8d26]{box-shadow:0 0 0 .125em #f1466840}.select.is-small[data-v-527e8d26]{border-radius:2px;font-size:.75rem}.select.is-medium[data-v-527e8d26]{font-size:1.25rem}.select.is-large[data-v-527e8d26]{font-size:1.5rem}.select.is-disabled[data-v-527e8d26]:after{border-color:#7a7a7a!important;opacity:.5}.select.is-fullwidth[data-v-527e8d26],.select.is-fullwidth select[data-v-527e8d26]{width:100%}.select.is-loading[data-v-527e8d26]:after{margin-top:0;position:absolute;right:.625em;top:.625em;transform:none}.select.is-loading.is-small[data-v-527e8d26]:after{font-size:.75rem}.select.is-loading.is-medium[data-v-527e8d26]:after{font-size:1.25rem}.select.is-loading.is-large[data-v-527e8d26]:after{font-size:1.5rem}.file[data-v-527e8d26]{align-items:stretch;display:flex;justify-content:flex-start;position:relative}.file.is-white .file-cta[data-v-527e8d26]{background-color:#fff;border-color:transparent;color:#0a0a0a}.file.is-white:hover .file-cta[data-v-527e8d26],.file.is-white.is-hovered .file-cta[data-v-527e8d26]{background-color:#f9f9f9;border-color:transparent;color:#0a0a0a}.file.is-white:focus .file-cta[data-v-527e8d26],.file.is-white.is-focused .file-cta[data-v-527e8d26]{border-color:transparent;box-shadow:0 0 .5em #ffffff40;color:#0a0a0a}.file.is-white:active .file-cta[data-v-527e8d26],.file.is-white.is-active .file-cta[data-v-527e8d26]{background-color:#f2f2f2;border-color:transparent;color:#0a0a0a}.file.is-black .file-cta[data-v-527e8d26]{background-color:#0a0a0a;border-color:transparent;color:#fff}.file.is-black:hover .file-cta[data-v-527e8d26],.file.is-black.is-hovered .file-cta[data-v-527e8d26]{background-color:#040404;border-color:transparent;color:#fff}.file.is-black:focus .file-cta[data-v-527e8d26],.file.is-black.is-focused .file-cta[data-v-527e8d26]{border-color:transparent;box-shadow:0 0 .5em #0a0a0a40;color:#fff}.file.is-black:active .file-cta[data-v-527e8d26],.file.is-black.is-active .file-cta[data-v-527e8d26]{background-color:#000;border-color:transparent;color:#fff}.file.is-light .file-cta[data-v-527e8d26]{background-color:#f5f5f5;border-color:transparent;color:#000000b3}.file.is-light:hover .file-cta[data-v-527e8d26],.file.is-light.is-hovered .file-cta[data-v-527e8d26]{background-color:#eee;border-color:transparent;color:#000000b3}.file.is-light:focus .file-cta[data-v-527e8d26],.file.is-light.is-focused .file-cta[data-v-527e8d26]{border-color:transparent;box-shadow:0 0 .5em #f5f5f540;color:#000000b3}.file.is-light:active .file-cta[data-v-527e8d26],.file.is-light.is-active .file-cta[data-v-527e8d26]{background-color:#e8e8e8;border-color:transparent;color:#000000b3}.file.is-dark .file-cta[data-v-527e8d26]{background-color:#363636;border-color:transparent;color:#fff}.file.is-dark:hover .file-cta[data-v-527e8d26],.file.is-dark.is-hovered .file-cta[data-v-527e8d26]{background-color:#2f2f2f;border-color:transparent;color:#fff}.file.is-dark:focus .file-cta[data-v-527e8d26],.file.is-dark.is-focused .file-cta[data-v-527e8d26]{border-color:transparent;box-shadow:0 0 .5em #36363640;color:#fff}.file.is-dark:active .file-cta[data-v-527e8d26],.file.is-dark.is-active .file-cta[data-v-527e8d26]{background-color:#292929;border-color:transparent;color:#fff}.file.is-primary .file-cta[data-v-527e8d26]{background-color:#00d1b2;border-color:transparent;color:#fff}.file.is-primary:hover .file-cta[data-v-527e8d26],.file.is-primary.is-hovered .file-cta[data-v-527e8d26]{background-color:#00c4a7;border-color:transparent;color:#fff}.file.is-primary:focus .file-cta[data-v-527e8d26],.file.is-primary.is-focused .file-cta[data-v-527e8d26]{border-color:transparent;box-shadow:0 0 .5em #00d1b240;color:#fff}.file.is-primary:active .file-cta[data-v-527e8d26],.file.is-primary.is-active .file-cta[data-v-527e8d26]{background-color:#00b89c;border-color:transparent;color:#fff}.file.is-link .file-cta[data-v-527e8d26]{background-color:#485fc7;border-color:transparent;color:#fff}.file.is-link:hover .file-cta[data-v-527e8d26],.file.is-link.is-hovered .file-cta[data-v-527e8d26]{background-color:#3e56c4;border-color:transparent;color:#fff}.file.is-link:focus .file-cta[data-v-527e8d26],.file.is-link.is-focused .file-cta[data-v-527e8d26]{border-color:transparent;box-shadow:0 0 .5em #485fc740;color:#fff}.file.is-link:active .file-cta[data-v-527e8d26],.file.is-link.is-active .file-cta[data-v-527e8d26]{background-color:#3a51bb;border-color:transparent;color:#fff}.file.is-info .file-cta[data-v-527e8d26]{background-color:#3e8ed0;border-color:transparent;color:#fff}.file.is-info:hover .file-cta[data-v-527e8d26],.file.is-info.is-hovered .file-cta[data-v-527e8d26]{background-color:#3488ce;border-color:transparent;color:#fff}.file.is-info:focus .file-cta[data-v-527e8d26],.file.is-info.is-focused .file-cta[data-v-527e8d26]{border-color:transparent;box-shadow:0 0 .5em #3e8ed040;color:#fff}.file.is-info:active .file-cta[data-v-527e8d26],.file.is-info.is-active .file-cta[data-v-527e8d26]{background-color:#3082c5;border-color:transparent;color:#fff}.file.is-success .file-cta[data-v-527e8d26]{background-color:#48c78e;border-color:transparent;color:#fff}.file.is-success:hover .file-cta[data-v-527e8d26],.file.is-success.is-hovered .file-cta[data-v-527e8d26]{background-color:#3ec487;border-color:transparent;color:#fff}.file.is-success:focus .file-cta[data-v-527e8d26],.file.is-success.is-focused .file-cta[data-v-527e8d26]{border-color:transparent;box-shadow:0 0 .5em #48c78e40;color:#fff}.file.is-success:active .file-cta[data-v-527e8d26],.file.is-success.is-active .file-cta[data-v-527e8d26]{background-color:#3abb81;border-color:transparent;color:#fff}.file.is-warning .file-cta[data-v-527e8d26]{background-color:#ffe08a;border-color:transparent;color:#000000b3}.file.is-warning:hover .file-cta[data-v-527e8d26],.file.is-warning.is-hovered .file-cta[data-v-527e8d26]{background-color:#ffdc7d;border-color:transparent;color:#000000b3}.file.is-warning:focus .file-cta[data-v-527e8d26],.file.is-warning.is-focused .file-cta[data-v-527e8d26]{border-color:transparent;box-shadow:0 0 .5em #ffe08a40;color:#000000b3}.file.is-warning:active .file-cta[data-v-527e8d26],.file.is-warning.is-active .file-cta[data-v-527e8d26]{background-color:#ffd970;border-color:transparent;color:#000000b3}.file.is-danger .file-cta[data-v-527e8d26]{background-color:#f14668;border-color:transparent;color:#fff}.file.is-danger:hover .file-cta[data-v-527e8d26],.file.is-danger.is-hovered .file-cta[data-v-527e8d26]{background-color:#f03a5f;border-color:transparent;color:#fff}.file.is-danger:focus .file-cta[data-v-527e8d26],.file.is-danger.is-focused .file-cta[data-v-527e8d26]{border-color:transparent;box-shadow:0 0 .5em #f1466840;color:#fff}.file.is-danger:active .file-cta[data-v-527e8d26],.file.is-danger.is-active .file-cta[data-v-527e8d26]{background-color:#ef2e55;border-color:transparent;color:#fff}.file.is-small[data-v-527e8d26]{font-size:.75rem}.file.is-normal[data-v-527e8d26]{font-size:1rem}.file.is-medium[data-v-527e8d26]{font-size:1.25rem}.file.is-medium .file-icon .fa[data-v-527e8d26]{font-size:21px}.file.is-large[data-v-527e8d26]{font-size:1.5rem}.file.is-large .file-icon .fa[data-v-527e8d26]{font-size:28px}.file.has-name .file-cta[data-v-527e8d26]{border-bottom-right-radius:0;border-top-right-radius:0}.file.has-name .file-name[data-v-527e8d26]{border-bottom-left-radius:0;border-top-left-radius:0}.file.has-name.is-empty .file-cta[data-v-527e8d26]{border-radius:4px}.file.has-name.is-empty .file-name[data-v-527e8d26]{display:none}.file.is-boxed .file-label[data-v-527e8d26]{flex-direction:column}.file.is-boxed .file-cta[data-v-527e8d26]{flex-direction:column;height:auto;padding:1em 3em}.file.is-boxed .file-name[data-v-527e8d26]{border-width:0 1px 1px}.file.is-boxed .file-icon[data-v-527e8d26]{height:1.5em;width:1.5em}.file.is-boxed .file-icon .fa[data-v-527e8d26]{font-size:21px}.file.is-boxed.is-small .file-icon .fa[data-v-527e8d26]{font-size:14px}.file.is-boxed.is-medium .file-icon .fa[data-v-527e8d26]{font-size:28px}.file.is-boxed.is-large .file-icon .fa[data-v-527e8d26]{font-size:35px}.file.is-boxed.has-name .file-cta[data-v-527e8d26]{border-radius:4px 4px 0 0}.file.is-boxed.has-name .file-name[data-v-527e8d26]{border-radius:0 0 4px 4px;border-width:0 1px 1px}.file.is-centered[data-v-527e8d26]{justify-content:center}.file.is-fullwidth .file-label[data-v-527e8d26]{width:100%}.file.is-fullwidth .file-name[data-v-527e8d26]{flex-grow:1;max-width:none}.file.is-right[data-v-527e8d26]{justify-content:flex-end}.file.is-right .file-cta[data-v-527e8d26]{border-radius:0 4px 4px 0}.file.is-right .file-name[data-v-527e8d26]{border-radius:4px 0 0 4px;border-width:1px 0 1px 1px;order:-1}.file-label[data-v-527e8d26]{align-items:stretch;display:flex;cursor:pointer;justify-content:flex-start;overflow:hidden;position:relative}.file-label:hover .file-cta[data-v-527e8d26]{background-color:#eee;color:#363636}.file-label:hover .file-name[data-v-527e8d26]{border-color:#d5d5d5}.file-label:active .file-cta[data-v-527e8d26]{background-color:#e8e8e8;color:#363636}.file-label:active .file-name[data-v-527e8d26]{border-color:#cfcfcf}.file-input[data-v-527e8d26]{height:100%;left:0;opacity:0;outline:none;position:absolute;top:0;width:100%}.file-cta[data-v-527e8d26],.file-name[data-v-527e8d26]{border-color:#dbdbdb;border-radius:4px;font-size:1em;padding-left:1em;padding-right:1em;white-space:nowrap}.file-cta[data-v-527e8d26]{background-color:#f5f5f5;color:#4a4a4a}.file-name[data-v-527e8d26]{border-color:#dbdbdb;border-style:solid;border-width:1px 1px 1px 0;display:block;max-width:16em;overflow:hidden;text-align:inherit;text-overflow:ellipsis}.file-icon[data-v-527e8d26]{align-items:center;display:flex;height:1em;justify-content:center;margin-right:.5em;width:1em}.file-icon .fa[data-v-527e8d26]{font-size:14px}.label[data-v-527e8d26]{color:#363636;display:block;font-size:1rem;font-weight:700}.label[data-v-527e8d26]:not(:last-child){margin-bottom:.5em}.label.is-small[data-v-527e8d26]{font-size:.75rem}.label.is-medium[data-v-527e8d26]{font-size:1.25rem}.label.is-large[data-v-527e8d26]{font-size:1.5rem}.help[data-v-527e8d26]{display:block;font-size:.75rem;margin-top:.25rem}.help.is-white[data-v-527e8d26]{color:#fff}.help.is-black[data-v-527e8d26]{color:#0a0a0a}.help.is-light[data-v-527e8d26]{color:#f5f5f5}.help.is-dark[data-v-527e8d26]{color:#363636}.help.is-primary[data-v-527e8d26]{color:#00d1b2}.help.is-link[data-v-527e8d26]{color:#485fc7}.help.is-info[data-v-527e8d26]{color:#3e8ed0}.help.is-success[data-v-527e8d26]{color:#48c78e}.help.is-warning[data-v-527e8d26]{color:#ffe08a}.help.is-danger[data-v-527e8d26]{color:#f14668}.field[data-v-527e8d26]:not(:last-child){margin-bottom:.75rem}.field.has-addons[data-v-527e8d26]{display:flex;justify-content:flex-start}.field.has-addons .control[data-v-527e8d26]:not(:last-child){margin-right:-1px}.field.has-addons .control:not(:first-child):not(:last-child) .button[data-v-527e8d26],.field.has-addons .control:not(:first-child):not(:last-child) .input[data-v-527e8d26],.field.has-addons .control:not(:first-child):not(:last-child) .select select[data-v-527e8d26]{border-radius:0}.field.has-addons .control:first-child:not(:only-child) .button[data-v-527e8d26],.field.has-addons .control:first-child:not(:only-child) .input[data-v-527e8d26],.field.has-addons .control:first-child:not(:only-child) .select select[data-v-527e8d26]{border-bottom-right-radius:0;border-top-right-radius:0}.field.has-addons .control:last-child:not(:only-child) .button[data-v-527e8d26],.field.has-addons .control:last-child:not(:only-child) .input[data-v-527e8d26],.field.has-addons .control:last-child:not(:only-child) .select select[data-v-527e8d26]{border-bottom-left-radius:0;border-top-left-radius:0}.field.has-addons .control .button[data-v-527e8d26]:not([disabled]):hover,.field.has-addons .control .button:not([disabled]).is-hovered[data-v-527e8d26],.field.has-addons .control .input[data-v-527e8d26]:not([disabled]):hover,.field.has-addons .control .input:not([disabled]).is-hovered[data-v-527e8d26],.field.has-addons .control .select select[data-v-527e8d26]:not([disabled]):hover,.field.has-addons .control .select select:not([disabled]).is-hovered[data-v-527e8d26]{z-index:2}.field.has-addons .control .button[data-v-527e8d26]:not([disabled]):focus,.field.has-addons .control .button:not([disabled]).is-focused[data-v-527e8d26],.field.has-addons .control .button[data-v-527e8d26]:not([disabled]):active,.field.has-addons .control .button:not([disabled]).is-active[data-v-527e8d26],.field.has-addons .control .input[data-v-527e8d26]:not([disabled]):focus,.field.has-addons .control .input:not([disabled]).is-focused[data-v-527e8d26],.field.has-addons .control .input[data-v-527e8d26]:not([disabled]):active,.field.has-addons .control .input:not([disabled]).is-active[data-v-527e8d26],.field.has-addons .control .select select[data-v-527e8d26]:not([disabled]):focus,.field.has-addons .control .select select:not([disabled]).is-focused[data-v-527e8d26],.field.has-addons .control .select select[data-v-527e8d26]:not([disabled]):active,.field.has-addons .control .select select:not([disabled]).is-active[data-v-527e8d26]{z-index:3}.field.has-addons .control .button[data-v-527e8d26]:not([disabled]):focus:hover,.field.has-addons .control .button:not([disabled]).is-focused[data-v-527e8d26]:hover,.field.has-addons .control .button[data-v-527e8d26]:not([disabled]):active:hover,.field.has-addons .control .button:not([disabled]).is-active[data-v-527e8d26]:hover,.field.has-addons .control .input[data-v-527e8d26]:not([disabled]):focus:hover,.field.has-addons .control .input:not([disabled]).is-focused[data-v-527e8d26]:hover,.field.has-addons .control .input[data-v-527e8d26]:not([disabled]):active:hover,.field.has-addons .control .input:not([disabled]).is-active[data-v-527e8d26]:hover,.field.has-addons .control .select select[data-v-527e8d26]:not([disabled]):focus:hover,.field.has-addons .control .select select:not([disabled]).is-focused[data-v-527e8d26]:hover,.field.has-addons .control .select select[data-v-527e8d26]:not([disabled]):active:hover,.field.has-addons .control .select select:not([disabled]).is-active[data-v-527e8d26]:hover{z-index:4}.field.has-addons .control.is-expanded[data-v-527e8d26]{flex-grow:1;flex-shrink:1}.field.has-addons.has-addons-centered[data-v-527e8d26]{justify-content:center}.field.has-addons.has-addons-right[data-v-527e8d26]{justify-content:flex-end}.field.has-addons.has-addons-fullwidth .control[data-v-527e8d26]{flex-grow:1;flex-shrink:0}.field.is-grouped[data-v-527e8d26]{display:flex;justify-content:flex-start}.field.is-grouped>.control[data-v-527e8d26]{flex-shrink:0}.field.is-grouped>.control[data-v-527e8d26]:not(:last-child){margin-bottom:0;margin-right:.75rem}.field.is-grouped>.control.is-expanded[data-v-527e8d26]{flex-grow:1;flex-shrink:1}.field.is-grouped.is-grouped-centered[data-v-527e8d26]{justify-content:center}.field.is-grouped.is-grouped-right[data-v-527e8d26]{justify-content:flex-end}.field.is-grouped.is-grouped-multiline[data-v-527e8d26]{flex-wrap:wrap}.field.is-grouped.is-grouped-multiline>.control[data-v-527e8d26]:last-child,.field.is-grouped.is-grouped-multiline>.control[data-v-527e8d26]:not(:last-child){margin-bottom:.75rem}.field.is-grouped.is-grouped-multiline[data-v-527e8d26]:last-child{margin-bottom:-.75rem}.field.is-grouped.is-grouped-multiline[data-v-527e8d26]:not(:last-child){margin-bottom:0}@media screen and (min-width: 769px),print{.field.is-horizontal[data-v-527e8d26]{display:flex}}.field-label .label[data-v-527e8d26]{font-size:inherit}@media screen and (max-width: 768px){.field-label[data-v-527e8d26]{margin-bottom:.5rem}}@media screen and (min-width: 769px),print{.field-label[data-v-527e8d26]{flex-basis:0;flex-grow:1;flex-shrink:0;margin-right:1.5rem;text-align:right}.field-label.is-small[data-v-527e8d26]{font-size:.75rem;padding-top:.375em}.field-label.is-normal[data-v-527e8d26]{padding-top:.375em}.field-label.is-medium[data-v-527e8d26]{font-size:1.25rem;padding-top:.375em}.field-label.is-large[data-v-527e8d26]{font-size:1.5rem;padding-top:.375em}}.field-body .field .field[data-v-527e8d26]{margin-bottom:0}@media screen and (min-width: 769px),print{.field-body[data-v-527e8d26]{display:flex;flex-basis:0;flex-grow:5;flex-shrink:1}.field-body .field[data-v-527e8d26]{margin-bottom:0}.field-body>.field[data-v-527e8d26]{flex-shrink:1}.field-body>.field[data-v-527e8d26]:not(.is-narrow){flex-grow:1}.field-body>.field[data-v-527e8d26]:not(:last-child){margin-right:.75rem}}.control[data-v-527e8d26]{box-sizing:border-box;clear:both;font-size:1rem;position:relative;text-align:inherit}.control.has-icons-left .input:focus~.icon[data-v-527e8d26],.control.has-icons-left .select:focus~.icon[data-v-527e8d26],.control.has-icons-right .input:focus~.icon[data-v-527e8d26],.control.has-icons-right .select:focus~.icon[data-v-527e8d26]{color:#4a4a4a}.control.has-icons-left .input.is-small~.icon[data-v-527e8d26],.control.has-icons-left .select.is-small~.icon[data-v-527e8d26],.control.has-icons-right .input.is-small~.icon[data-v-527e8d26],.control.has-icons-right .select.is-small~.icon[data-v-527e8d26]{font-size:.75rem}.control.has-icons-left .input.is-medium~.icon[data-v-527e8d26],.control.has-icons-left .select.is-medium~.icon[data-v-527e8d26],.control.has-icons-right .input.is-medium~.icon[data-v-527e8d26],.control.has-icons-right .select.is-medium~.icon[data-v-527e8d26]{font-size:1.25rem}.control.has-icons-left .input.is-large~.icon[data-v-527e8d26],.control.has-icons-left .select.is-large~.icon[data-v-527e8d26],.control.has-icons-right .input.is-large~.icon[data-v-527e8d26],.control.has-icons-right .select.is-large~.icon[data-v-527e8d26]{font-size:1.5rem}.control.has-icons-left .icon[data-v-527e8d26],.control.has-icons-right .icon[data-v-527e8d26]{color:#dbdbdb;height:2.5em;pointer-events:none;position:absolute;top:0;width:2.5em;z-index:4}.control.has-icons-left .input[data-v-527e8d26],.control.has-icons-left .select select[data-v-527e8d26]{padding-left:2.5em}.control.has-icons-left .icon.is-left[data-v-527e8d26]{left:0}.control.has-icons-right .input[data-v-527e8d26],.control.has-icons-right .select select[data-v-527e8d26]{padding-right:2.5em}.control.has-icons-right .icon.is-right[data-v-527e8d26]{right:0}.control.is-loading[data-v-527e8d26]:after{position:absolute!important;right:.625em;top:.625em;z-index:4}.control.is-loading.is-small[data-v-527e8d26]:after{font-size:.75rem}.control.is-loading.is-medium[data-v-527e8d26]:after{font-size:1.25rem}.control.is-loading.is-large[data-v-527e8d26]:after{font-size:1.5rem}.breadcrumb[data-v-527e8d26]{font-size:1rem;white-space:nowrap}.breadcrumb a[data-v-527e8d26]{align-items:center;color:#485fc7;display:flex;justify-content:center;padding:0 .75em}.breadcrumb a[data-v-527e8d26]:hover{color:#363636}.breadcrumb li[data-v-527e8d26]{align-items:center;display:flex}.breadcrumb li:first-child a[data-v-527e8d26]{padding-left:0}.breadcrumb li.is-active a[data-v-527e8d26]{color:#363636;cursor:default;pointer-events:none}.breadcrumb li+li[data-v-527e8d26]:before{color:#b5b5b5;content:"/"}.breadcrumb ul[data-v-527e8d26],.breadcrumb ol[data-v-527e8d26]{align-items:flex-start;display:flex;flex-wrap:wrap;justify-content:flex-start}.breadcrumb .icon[data-v-527e8d26]:first-child{margin-right:.5em}.breadcrumb .icon[data-v-527e8d26]:last-child{margin-left:.5em}.breadcrumb.is-centered ol[data-v-527e8d26],.breadcrumb.is-centered ul[data-v-527e8d26]{justify-content:center}.breadcrumb.is-right ol[data-v-527e8d26],.breadcrumb.is-right ul[data-v-527e8d26]{justify-content:flex-end}.breadcrumb.is-small[data-v-527e8d26]{font-size:.75rem}.breadcrumb.is-medium[data-v-527e8d26]{font-size:1.25rem}.breadcrumb.is-large[data-v-527e8d26]{font-size:1.5rem}.breadcrumb.has-arrow-separator li+li[data-v-527e8d26]:before{content:"→"}.breadcrumb.has-bullet-separator li+li[data-v-527e8d26]:before{content:"•"}.breadcrumb.has-dot-separator li+li[data-v-527e8d26]:before{content:"·"}.breadcrumb.has-succeeds-separator li+li[data-v-527e8d26]:before{content:"≻"}.card[data-v-527e8d26]{background-color:#fff;border-radius:.25rem;box-shadow:0 .5em 1em -.125em #0a0a0a1a,0 0 0 1px #0a0a0a05;color:#4a4a4a;max-width:100%;position:relative}.card-header[data-v-527e8d26]:first-child,.card-content[data-v-527e8d26]:first-child,.card-footer[data-v-527e8d26]:first-child{border-top-left-radius:.25rem;border-top-right-radius:.25rem}.card-header[data-v-527e8d26]:last-child,.card-content[data-v-527e8d26]:last-child,.card-footer[data-v-527e8d26]:last-child{border-bottom-left-radius:.25rem;border-bottom-right-radius:.25rem}.card-header[data-v-527e8d26]{background-color:transparent;align-items:stretch;box-shadow:0 .125em .25em #0a0a0a1a;display:flex}.card-header-title[data-v-527e8d26]{align-items:center;color:#363636;display:flex;flex-grow:1;font-weight:700;padding:.75rem 1rem}.card-header-title.is-centered[data-v-527e8d26]{justify-content:center}.card-header-icon[data-v-527e8d26]{-moz-appearance:none;-webkit-appearance:none;appearance:none;background:none;border:none;color:currentColor;font-family:inherit;font-size:1em;margin:0;padding:0;align-items:center;cursor:pointer;display:flex;justify-content:center;padding:.75rem 1rem}.card-image[data-v-527e8d26]{display:block;position:relative}.card-image:first-child img[data-v-527e8d26]{border-top-left-radius:.25rem;border-top-right-radius:.25rem}.card-image:last-child img[data-v-527e8d26]{border-bottom-left-radius:.25rem;border-bottom-right-radius:.25rem}.card-content[data-v-527e8d26]{background-color:transparent;padding:1.5rem}.card-footer[data-v-527e8d26]{background-color:transparent;border-top:1px solid #ededed;align-items:stretch;display:flex}.card-footer-item[data-v-527e8d26]{align-items:center;display:flex;flex-basis:0;flex-grow:1;flex-shrink:0;justify-content:center;padding:.75rem}.card-footer-item[data-v-527e8d26]:not(:last-child){border-right:1px solid #ededed}.card .media[data-v-527e8d26]:not(:last-child){margin-bottom:1.5rem}.dropdown[data-v-527e8d26]{display:inline-flex;position:relative;vertical-align:top}.dropdown.is-active .dropdown-menu[data-v-527e8d26],.dropdown.is-hoverable:hover .dropdown-menu[data-v-527e8d26]{display:block}.dropdown.is-right .dropdown-menu[data-v-527e8d26]{left:auto;right:0}.dropdown.is-up .dropdown-menu[data-v-527e8d26]{bottom:100%;padding-bottom:4px;padding-top:initial;top:auto}.dropdown-menu[data-v-527e8d26]{display:none;left:0;min-width:12rem;padding-top:4px;position:absolute;top:100%;z-index:20}.dropdown-content[data-v-527e8d26]{background-color:#fff;border-radius:4px;box-shadow:0 .5em 1em -.125em #0a0a0a1a,0 0 0 1px #0a0a0a05;padding-bottom:.5rem;padding-top:.5rem}.dropdown-item[data-v-527e8d26]{color:#4a4a4a;display:block;font-size:.875rem;line-height:1.5;padding:.375rem 1rem;position:relative}a.dropdown-item[data-v-527e8d26],button.dropdown-item[data-v-527e8d26]{padding-right:3rem;text-align:inherit;white-space:nowrap;width:100%}a.dropdown-item[data-v-527e8d26]:hover,button.dropdown-item[data-v-527e8d26]:hover{background-color:#f5f5f5;color:#0a0a0a}a.dropdown-item.is-active[data-v-527e8d26],button.dropdown-item.is-active[data-v-527e8d26]{background-color:#485fc7;color:#fff}.dropdown-divider[data-v-527e8d26]{background-color:#ededed;border:none;display:block;height:1px;margin:.5rem 0}.level[data-v-527e8d26]{align-items:center;justify-content:space-between}.level code[data-v-527e8d26]{border-radius:4px}.level img[data-v-527e8d26]{display:inline-block;vertical-align:top}.level.is-mobile[data-v-527e8d26],.level.is-mobile .level-left[data-v-527e8d26],.level.is-mobile .level-right[data-v-527e8d26]{display:flex}.level.is-mobile .level-left+.level-right[data-v-527e8d26]{margin-top:0}.level.is-mobile .level-item[data-v-527e8d26]:not(:last-child){margin-bottom:0;margin-right:.75rem}.level.is-mobile .level-item[data-v-527e8d26]:not(.is-narrow){flex-grow:1}@media screen and (min-width: 769px),print{.level[data-v-527e8d26]{display:flex}.level>.level-item[data-v-527e8d26]:not(.is-narrow){flex-grow:1}}.level-item[data-v-527e8d26]{align-items:center;display:flex;flex-basis:auto;flex-grow:0;flex-shrink:0;justify-content:center}.level-item .title[data-v-527e8d26],.level-item .subtitle[data-v-527e8d26]{margin-bottom:0}@media screen and (max-width: 768px){.level-item[data-v-527e8d26]:not(:last-child){margin-bottom:.75rem}}.level-left[data-v-527e8d26],.level-right[data-v-527e8d26]{flex-basis:auto;flex-grow:0;flex-shrink:0}.level-left .level-item.is-flexible[data-v-527e8d26],.level-right .level-item.is-flexible[data-v-527e8d26]{flex-grow:1}@media screen and (min-width: 769px),print{.level-left .level-item[data-v-527e8d26]:not(:last-child),.level-right .level-item[data-v-527e8d26]:not(:last-child){margin-right:.75rem}}.level-left[data-v-527e8d26]{align-items:center;justify-content:flex-start}@media screen and (max-width: 768px){.level-left+.level-right[data-v-527e8d26]{margin-top:1.5rem}}@media screen and (min-width: 769px),print{.level-left[data-v-527e8d26]{display:flex}}.level-right[data-v-527e8d26]{align-items:center;justify-content:flex-end}@media screen and (min-width: 769px),print{.level-right[data-v-527e8d26]{display:flex}}.media[data-v-527e8d26]{align-items:flex-start;display:flex;text-align:inherit}.media .content[data-v-527e8d26]:not(:last-child){margin-bottom:.75rem}.media .media[data-v-527e8d26]{border-top:1px solid rgba(219,219,219,.5);display:flex;padding-top:.75rem}.media .media .content[data-v-527e8d26]:not(:last-child),.media .media .control[data-v-527e8d26]:not(:last-child){margin-bottom:.5rem}.media .media .media[data-v-527e8d26]{padding-top:.5rem}.media .media .media+.media[data-v-527e8d26]{margin-top:.5rem}.media+.media[data-v-527e8d26]{border-top:1px solid rgba(219,219,219,.5);margin-top:1rem;padding-top:1rem}.media.is-large+.media[data-v-527e8d26]{margin-top:1.5rem;padding-top:1.5rem}.media-left[data-v-527e8d26],.media-right[data-v-527e8d26]{flex-basis:auto;flex-grow:0;flex-shrink:0}.media-left[data-v-527e8d26]{margin-right:1rem}.media-right[data-v-527e8d26]{margin-left:1rem}.media-content[data-v-527e8d26]{flex-basis:auto;flex-grow:1;flex-shrink:1;text-align:inherit}@media screen and (max-width: 768px){.media-content[data-v-527e8d26]{overflow-x:auto}}.menu[data-v-527e8d26]{font-size:1rem}.menu.is-small[data-v-527e8d26]{font-size:.75rem}.menu.is-medium[data-v-527e8d26]{font-size:1.25rem}.menu.is-large[data-v-527e8d26]{font-size:1.5rem}.menu-list[data-v-527e8d26]{line-height:1.25}.menu-list a[data-v-527e8d26]{border-radius:2px;color:#4a4a4a;display:block;padding:.5em .75em}.menu-list a[data-v-527e8d26]:hover{background-color:#f5f5f5;color:#363636}.menu-list a.is-active[data-v-527e8d26]{background-color:#485fc7;color:#fff}.menu-list li ul[data-v-527e8d26]{border-left:1px solid #dbdbdb;margin:.75em;padding-left:.75em}.menu-label[data-v-527e8d26]{color:#7a7a7a;font-size:.75em;letter-spacing:.1em;text-transform:uppercase}.menu-label[data-v-527e8d26]:not(:first-child){margin-top:1em}.menu-label[data-v-527e8d26]:not(:last-child){margin-bottom:1em}.message[data-v-527e8d26]{background-color:#f5f5f5;border-radius:4px;font-size:1rem}.message strong[data-v-527e8d26]{color:currentColor}.message a[data-v-527e8d26]:not(.button):not(.tag):not(.dropdown-item){color:currentColor;text-decoration:underline}.message.is-small[data-v-527e8d26]{font-size:.75rem}.message.is-medium[data-v-527e8d26]{font-size:1.25rem}.message.is-large[data-v-527e8d26]{font-size:1.5rem}.message.is-white[data-v-527e8d26]{background-color:#fff}.message.is-white .message-header[data-v-527e8d26]{background-color:#fff;color:#0a0a0a}.message.is-white .message-body[data-v-527e8d26]{border-color:#fff}.message.is-black[data-v-527e8d26]{background-color:#fafafa}.message.is-black .message-header[data-v-527e8d26]{background-color:#0a0a0a;color:#fff}.message.is-black .message-body[data-v-527e8d26]{border-color:#0a0a0a}.message.is-light[data-v-527e8d26]{background-color:#fafafa}.message.is-light .message-header[data-v-527e8d26]{background-color:#f5f5f5;color:#000000b3}.message.is-light .message-body[data-v-527e8d26]{border-color:#f5f5f5}.message.is-dark[data-v-527e8d26]{background-color:#fafafa}.message.is-dark .message-header[data-v-527e8d26]{background-color:#363636;color:#fff}.message.is-dark .message-body[data-v-527e8d26]{border-color:#363636}.message.is-primary[data-v-527e8d26]{background-color:#ebfffc}.message.is-primary .message-header[data-v-527e8d26]{background-color:#00d1b2;color:#fff}.message.is-primary .message-body[data-v-527e8d26]{border-color:#00d1b2;color:#00947e}.message.is-link[data-v-527e8d26]{background-color:#eff1fa}.message.is-link .message-header[data-v-527e8d26]{background-color:#485fc7;color:#fff}.message.is-link .message-body[data-v-527e8d26]{border-color:#485fc7;color:#3850b7}.message.is-info[data-v-527e8d26]{background-color:#eff5fb}.message.is-info .message-header[data-v-527e8d26]{background-color:#3e8ed0;color:#fff}.message.is-info .message-body[data-v-527e8d26]{border-color:#3e8ed0;color:#296fa8}.message.is-success[data-v-527e8d26]{background-color:#effaf5}.message.is-success .message-header[data-v-527e8d26]{background-color:#48c78e;color:#fff}.message.is-success .message-body[data-v-527e8d26]{border-color:#48c78e;color:#257953}.message.is-warning[data-v-527e8d26]{background-color:#fffaeb}.message.is-warning .message-header[data-v-527e8d26]{background-color:#ffe08a;color:#000000b3}.message.is-warning .message-body[data-v-527e8d26]{border-color:#ffe08a;color:#946c00}.message.is-danger[data-v-527e8d26]{background-color:#feecf0}.message.is-danger .message-header[data-v-527e8d26]{background-color:#f14668;color:#fff}.message.is-danger .message-body[data-v-527e8d26]{border-color:#f14668;color:#cc0f35}.message-header[data-v-527e8d26]{align-items:center;background-color:#4a4a4a;border-radius:4px 4px 0 0;color:#fff;display:flex;font-weight:700;justify-content:space-between;line-height:1.25;padding:.75em 1em;position:relative}.message-header .delete[data-v-527e8d26]{flex-grow:0;flex-shrink:0;margin-left:.75em}.message-header+.message-body[data-v-527e8d26]{border-width:0;border-top-left-radius:0;border-top-right-radius:0}.message-body[data-v-527e8d26]{border-color:#dbdbdb;border-radius:4px;border-style:solid;border-width:0 0 0 4px;color:#4a4a4a;padding:1.25em 1.5em}.message-body code[data-v-527e8d26],.message-body pre[data-v-527e8d26]{background-color:#fff}.message-body pre code[data-v-527e8d26]{background-color:transparent}.modal[data-v-527e8d26]{align-items:center;display:none;flex-direction:column;justify-content:center;overflow:hidden;position:fixed;z-index:40}.modal.is-active[data-v-527e8d26]{display:flex}.modal-background[data-v-527e8d26]{background-color:#0a0a0adb}.modal-content[data-v-527e8d26],.modal-card[data-v-527e8d26]{margin:0 20px;max-height:calc(100vh - 160px);overflow:auto;position:relative;width:100%}@media screen and (min-width: 769px){.modal-content[data-v-527e8d26],.modal-card[data-v-527e8d26]{margin:0 auto;max-height:calc(100vh - 40px);width:640px}}.modal-close[data-v-527e8d26]{background:none;height:40px;position:fixed;right:20px;top:20px;width:40px}.modal-card[data-v-527e8d26]{display:flex;flex-direction:column;max-height:calc(100vh - 40px);overflow:hidden;-ms-overflow-y:visible}.modal-card-head[data-v-527e8d26],.modal-card-foot[data-v-527e8d26]{align-items:center;background-color:#f5f5f5;display:flex;flex-shrink:0;justify-content:flex-start;padding:20px;position:relative}.modal-card-head[data-v-527e8d26]{border-bottom:1px solid #dbdbdb;border-top-left-radius:6px;border-top-right-radius:6px}.modal-card-title[data-v-527e8d26]{color:#363636;flex-grow:1;flex-shrink:0;font-size:1.5rem;line-height:1}.modal-card-foot[data-v-527e8d26]{border-bottom-left-radius:6px;border-bottom-right-radius:6px;border-top:1px solid #dbdbdb}.modal-card-foot .button[data-v-527e8d26]:not(:last-child){margin-right:.5em}.modal-card-body[data-v-527e8d26]{-webkit-overflow-scrolling:touch;background-color:#fff;flex-grow:1;flex-shrink:1;overflow:auto;padding:20px}.navbar[data-v-527e8d26]{background-color:#fff;min-height:3.25rem;position:relative;z-index:30}.navbar.is-white[data-v-527e8d26]{background-color:#fff;color:#0a0a0a}.navbar.is-white .navbar-brand>.navbar-item[data-v-527e8d26],.navbar.is-white .navbar-brand .navbar-link[data-v-527e8d26]{color:#0a0a0a}.navbar.is-white .navbar-brand>a.navbar-item[data-v-527e8d26]:focus,.navbar.is-white .navbar-brand>a.navbar-item[data-v-527e8d26]:hover,.navbar.is-white .navbar-brand>a.navbar-item.is-active[data-v-527e8d26],.navbar.is-white .navbar-brand .navbar-link[data-v-527e8d26]:focus,.navbar.is-white .navbar-brand .navbar-link[data-v-527e8d26]:hover,.navbar.is-white .navbar-brand .navbar-link.is-active[data-v-527e8d26]{background-color:#f2f2f2;color:#0a0a0a}.navbar.is-white .navbar-brand .navbar-link[data-v-527e8d26]:after{border-color:#0a0a0a}.navbar.is-white .navbar-burger[data-v-527e8d26]{color:#0a0a0a}@media screen and (min-width: 1024px){.navbar.is-white .navbar-start>.navbar-item[data-v-527e8d26],.navbar.is-white .navbar-start .navbar-link[data-v-527e8d26],.navbar.is-white .navbar-end>.navbar-item[data-v-527e8d26],.navbar.is-white .navbar-end .navbar-link[data-v-527e8d26]{color:#0a0a0a}.navbar.is-white .navbar-start>a.navbar-item[data-v-527e8d26]:focus,.navbar.is-white .navbar-start>a.navbar-item[data-v-527e8d26]:hover,.navbar.is-white .navbar-start>a.navbar-item.is-active[data-v-527e8d26],.navbar.is-white .navbar-start .navbar-link[data-v-527e8d26]:focus,.navbar.is-white .navbar-start .navbar-link[data-v-527e8d26]:hover,.navbar.is-white .navbar-start .navbar-link.is-active[data-v-527e8d26],.navbar.is-white .navbar-end>a.navbar-item[data-v-527e8d26]:focus,.navbar.is-white .navbar-end>a.navbar-item[data-v-527e8d26]:hover,.navbar.is-white .navbar-end>a.navbar-item.is-active[data-v-527e8d26],.navbar.is-white .navbar-end .navbar-link[data-v-527e8d26]:focus,.navbar.is-white .navbar-end .navbar-link[data-v-527e8d26]:hover,.navbar.is-white .navbar-end .navbar-link.is-active[data-v-527e8d26]{background-color:#f2f2f2;color:#0a0a0a}.navbar.is-white .navbar-start .navbar-link[data-v-527e8d26]:after,.navbar.is-white .navbar-end .navbar-link[data-v-527e8d26]:after{border-color:#0a0a0a}.navbar.is-white .navbar-item.has-dropdown:focus .navbar-link[data-v-527e8d26],.navbar.is-white .navbar-item.has-dropdown:hover .navbar-link[data-v-527e8d26],.navbar.is-white .navbar-item.has-dropdown.is-active .navbar-link[data-v-527e8d26]{background-color:#f2f2f2;color:#0a0a0a}.navbar.is-white .navbar-dropdown a.navbar-item.is-active[data-v-527e8d26]{background-color:#fff;color:#0a0a0a}}.navbar.is-black[data-v-527e8d26]{background-color:#0a0a0a;color:#fff}.navbar.is-black .navbar-brand>.navbar-item[data-v-527e8d26],.navbar.is-black .navbar-brand .navbar-link[data-v-527e8d26]{color:#fff}.navbar.is-black .navbar-brand>a.navbar-item[data-v-527e8d26]:focus,.navbar.is-black .navbar-brand>a.navbar-item[data-v-527e8d26]:hover,.navbar.is-black .navbar-brand>a.navbar-item.is-active[data-v-527e8d26],.navbar.is-black .navbar-brand .navbar-link[data-v-527e8d26]:focus,.navbar.is-black .navbar-brand .navbar-link[data-v-527e8d26]:hover,.navbar.is-black .navbar-brand .navbar-link.is-active[data-v-527e8d26]{background-color:#000;color:#fff}.navbar.is-black .navbar-brand .navbar-link[data-v-527e8d26]:after{border-color:#fff}.navbar.is-black .navbar-burger[data-v-527e8d26]{color:#fff}@media screen and (min-width: 1024px){.navbar.is-black .navbar-start>.navbar-item[data-v-527e8d26],.navbar.is-black .navbar-start .navbar-link[data-v-527e8d26],.navbar.is-black .navbar-end>.navbar-item[data-v-527e8d26],.navbar.is-black .navbar-end .navbar-link[data-v-527e8d26]{color:#fff}.navbar.is-black .navbar-start>a.navbar-item[data-v-527e8d26]:focus,.navbar.is-black .navbar-start>a.navbar-item[data-v-527e8d26]:hover,.navbar.is-black .navbar-start>a.navbar-item.is-active[data-v-527e8d26],.navbar.is-black .navbar-start .navbar-link[data-v-527e8d26]:focus,.navbar.is-black .navbar-start .navbar-link[data-v-527e8d26]:hover,.navbar.is-black .navbar-start .navbar-link.is-active[data-v-527e8d26],.navbar.is-black .navbar-end>a.navbar-item[data-v-527e8d26]:focus,.navbar.is-black .navbar-end>a.navbar-item[data-v-527e8d26]:hover,.navbar.is-black .navbar-end>a.navbar-item.is-active[data-v-527e8d26],.navbar.is-black .navbar-end .navbar-link[data-v-527e8d26]:focus,.navbar.is-black .navbar-end .navbar-link[data-v-527e8d26]:hover,.navbar.is-black .navbar-end .navbar-link.is-active[data-v-527e8d26]{background-color:#000;color:#fff}.navbar.is-black .navbar-start .navbar-link[data-v-527e8d26]:after,.navbar.is-black .navbar-end .navbar-link[data-v-527e8d26]:after{border-color:#fff}.navbar.is-black .navbar-item.has-dropdown:focus .navbar-link[data-v-527e8d26],.navbar.is-black .navbar-item.has-dropdown:hover .navbar-link[data-v-527e8d26],.navbar.is-black .navbar-item.has-dropdown.is-active .navbar-link[data-v-527e8d26]{background-color:#000;color:#fff}.navbar.is-black .navbar-dropdown a.navbar-item.is-active[data-v-527e8d26]{background-color:#0a0a0a;color:#fff}}.navbar.is-light[data-v-527e8d26]{background-color:#f5f5f5;color:#000000b3}.navbar.is-light .navbar-brand>.navbar-item[data-v-527e8d26],.navbar.is-light .navbar-brand .navbar-link[data-v-527e8d26]{color:#000000b3}.navbar.is-light .navbar-brand>a.navbar-item[data-v-527e8d26]:focus,.navbar.is-light .navbar-brand>a.navbar-item[data-v-527e8d26]:hover,.navbar.is-light .navbar-brand>a.navbar-item.is-active[data-v-527e8d26],.navbar.is-light .navbar-brand .navbar-link[data-v-527e8d26]:focus,.navbar.is-light .navbar-brand .navbar-link[data-v-527e8d26]:hover,.navbar.is-light .navbar-brand .navbar-link.is-active[data-v-527e8d26]{background-color:#e8e8e8;color:#000000b3}.navbar.is-light .navbar-brand .navbar-link[data-v-527e8d26]:after{border-color:#000000b3}.navbar.is-light .navbar-burger[data-v-527e8d26]{color:#000000b3}@media screen and (min-width: 1024px){.navbar.is-light .navbar-start>.navbar-item[data-v-527e8d26],.navbar.is-light .navbar-start .navbar-link[data-v-527e8d26],.navbar.is-light .navbar-end>.navbar-item[data-v-527e8d26],.navbar.is-light .navbar-end .navbar-link[data-v-527e8d26]{color:#000000b3}.navbar.is-light .navbar-start>a.navbar-item[data-v-527e8d26]:focus,.navbar.is-light .navbar-start>a.navbar-item[data-v-527e8d26]:hover,.navbar.is-light .navbar-start>a.navbar-item.is-active[data-v-527e8d26],.navbar.is-light .navbar-start .navbar-link[data-v-527e8d26]:focus,.navbar.is-light .navbar-start .navbar-link[data-v-527e8d26]:hover,.navbar.is-light .navbar-start .navbar-link.is-active[data-v-527e8d26],.navbar.is-light .navbar-end>a.navbar-item[data-v-527e8d26]:focus,.navbar.is-light .navbar-end>a.navbar-item[data-v-527e8d26]:hover,.navbar.is-light .navbar-end>a.navbar-item.is-active[data-v-527e8d26],.navbar.is-light .navbar-end .navbar-link[data-v-527e8d26]:focus,.navbar.is-light .navbar-end .navbar-link[data-v-527e8d26]:hover,.navbar.is-light .navbar-end .navbar-link.is-active[data-v-527e8d26]{background-color:#e8e8e8;color:#000000b3}.navbar.is-light .navbar-start .navbar-link[data-v-527e8d26]:after,.navbar.is-light .navbar-end .navbar-link[data-v-527e8d26]:after{border-color:#000000b3}.navbar.is-light .navbar-item.has-dropdown:focus .navbar-link[data-v-527e8d26],.navbar.is-light .navbar-item.has-dropdown:hover .navbar-link[data-v-527e8d26],.navbar.is-light .navbar-item.has-dropdown.is-active .navbar-link[data-v-527e8d26]{background-color:#e8e8e8;color:#000000b3}.navbar.is-light .navbar-dropdown a.navbar-item.is-active[data-v-527e8d26]{background-color:#f5f5f5;color:#000000b3}}.navbar.is-dark[data-v-527e8d26]{background-color:#363636;color:#fff}.navbar.is-dark .navbar-brand>.navbar-item[data-v-527e8d26],.navbar.is-dark .navbar-brand .navbar-link[data-v-527e8d26]{color:#fff}.navbar.is-dark .navbar-brand>a.navbar-item[data-v-527e8d26]:focus,.navbar.is-dark .navbar-brand>a.navbar-item[data-v-527e8d26]:hover,.navbar.is-dark .navbar-brand>a.navbar-item.is-active[data-v-527e8d26],.navbar.is-dark .navbar-brand .navbar-link[data-v-527e8d26]:focus,.navbar.is-dark .navbar-brand .navbar-link[data-v-527e8d26]:hover,.navbar.is-dark .navbar-brand .navbar-link.is-active[data-v-527e8d26]{background-color:#292929;color:#fff}.navbar.is-dark .navbar-brand .navbar-link[data-v-527e8d26]:after{border-color:#fff}.navbar.is-dark .navbar-burger[data-v-527e8d26]{color:#fff}@media screen and (min-width: 1024px){.navbar.is-dark .navbar-start>.navbar-item[data-v-527e8d26],.navbar.is-dark .navbar-start .navbar-link[data-v-527e8d26],.navbar.is-dark .navbar-end>.navbar-item[data-v-527e8d26],.navbar.is-dark .navbar-end .navbar-link[data-v-527e8d26]{color:#fff}.navbar.is-dark .navbar-start>a.navbar-item[data-v-527e8d26]:focus,.navbar.is-dark .navbar-start>a.navbar-item[data-v-527e8d26]:hover,.navbar.is-dark .navbar-start>a.navbar-item.is-active[data-v-527e8d26],.navbar.is-dark .navbar-start .navbar-link[data-v-527e8d26]:focus,.navbar.is-dark .navbar-start .navbar-link[data-v-527e8d26]:hover,.navbar.is-dark .navbar-start .navbar-link.is-active[data-v-527e8d26],.navbar.is-dark .navbar-end>a.navbar-item[data-v-527e8d26]:focus,.navbar.is-dark .navbar-end>a.navbar-item[data-v-527e8d26]:hover,.navbar.is-dark .navbar-end>a.navbar-item.is-active[data-v-527e8d26],.navbar.is-dark .navbar-end .navbar-link[data-v-527e8d26]:focus,.navbar.is-dark .navbar-end .navbar-link[data-v-527e8d26]:hover,.navbar.is-dark .navbar-end .navbar-link.is-active[data-v-527e8d26]{background-color:#292929;color:#fff}.navbar.is-dark .navbar-start .navbar-link[data-v-527e8d26]:after,.navbar.is-dark .navbar-end .navbar-link[data-v-527e8d26]:after{border-color:#fff}.navbar.is-dark .navbar-item.has-dropdown:focus .navbar-link[data-v-527e8d26],.navbar.is-dark .navbar-item.has-dropdown:hover .navbar-link[data-v-527e8d26],.navbar.is-dark .navbar-item.has-dropdown.is-active .navbar-link[data-v-527e8d26]{background-color:#292929;color:#fff}.navbar.is-dark .navbar-dropdown a.navbar-item.is-active[data-v-527e8d26]{background-color:#363636;color:#fff}}.navbar.is-primary[data-v-527e8d26]{background-color:#00d1b2;color:#fff}.navbar.is-primary .navbar-brand>.navbar-item[data-v-527e8d26],.navbar.is-primary .navbar-brand .navbar-link[data-v-527e8d26]{color:#fff}.navbar.is-primary .navbar-brand>a.navbar-item[data-v-527e8d26]:focus,.navbar.is-primary .navbar-brand>a.navbar-item[data-v-527e8d26]:hover,.navbar.is-primary .navbar-brand>a.navbar-item.is-active[data-v-527e8d26],.navbar.is-primary .navbar-brand .navbar-link[data-v-527e8d26]:focus,.navbar.is-primary .navbar-brand .navbar-link[data-v-527e8d26]:hover,.navbar.is-primary .navbar-brand .navbar-link.is-active[data-v-527e8d26]{background-color:#00b89c;color:#fff}.navbar.is-primary .navbar-brand .navbar-link[data-v-527e8d26]:after{border-color:#fff}.navbar.is-primary .navbar-burger[data-v-527e8d26]{color:#fff}@media screen and (min-width: 1024px){.navbar.is-primary .navbar-start>.navbar-item[data-v-527e8d26],.navbar.is-primary .navbar-start .navbar-link[data-v-527e8d26],.navbar.is-primary .navbar-end>.navbar-item[data-v-527e8d26],.navbar.is-primary .navbar-end .navbar-link[data-v-527e8d26]{color:#fff}.navbar.is-primary .navbar-start>a.navbar-item[data-v-527e8d26]:focus,.navbar.is-primary .navbar-start>a.navbar-item[data-v-527e8d26]:hover,.navbar.is-primary .navbar-start>a.navbar-item.is-active[data-v-527e8d26],.navbar.is-primary .navbar-start .navbar-link[data-v-527e8d26]:focus,.navbar.is-primary .navbar-start .navbar-link[data-v-527e8d26]:hover,.navbar.is-primary .navbar-start .navbar-link.is-active[data-v-527e8d26],.navbar.is-primary .navbar-end>a.navbar-item[data-v-527e8d26]:focus,.navbar.is-primary .navbar-end>a.navbar-item[data-v-527e8d26]:hover,.navbar.is-primary .navbar-end>a.navbar-item.is-active[data-v-527e8d26],.navbar.is-primary .navbar-end .navbar-link[data-v-527e8d26]:focus,.navbar.is-primary .navbar-end .navbar-link[data-v-527e8d26]:hover,.navbar.is-primary .navbar-end .navbar-link.is-active[data-v-527e8d26]{background-color:#00b89c;color:#fff}.navbar.is-primary .navbar-start .navbar-link[data-v-527e8d26]:after,.navbar.is-primary .navbar-end .navbar-link[data-v-527e8d26]:after{border-color:#fff}.navbar.is-primary .navbar-item.has-dropdown:focus .navbar-link[data-v-527e8d26],.navbar.is-primary .navbar-item.has-dropdown:hover .navbar-link[data-v-527e8d26],.navbar.is-primary .navbar-item.has-dropdown.is-active .navbar-link[data-v-527e8d26]{background-color:#00b89c;color:#fff}.navbar.is-primary .navbar-dropdown a.navbar-item.is-active[data-v-527e8d26]{background-color:#00d1b2;color:#fff}}.navbar.is-link[data-v-527e8d26]{background-color:#485fc7;color:#fff}.navbar.is-link .navbar-brand>.navbar-item[data-v-527e8d26],.navbar.is-link .navbar-brand .navbar-link[data-v-527e8d26]{color:#fff}.navbar.is-link .navbar-brand>a.navbar-item[data-v-527e8d26]:focus,.navbar.is-link .navbar-brand>a.navbar-item[data-v-527e8d26]:hover,.navbar.is-link .navbar-brand>a.navbar-item.is-active[data-v-527e8d26],.navbar.is-link .navbar-brand .navbar-link[data-v-527e8d26]:focus,.navbar.is-link .navbar-brand .navbar-link[data-v-527e8d26]:hover,.navbar.is-link .navbar-brand .navbar-link.is-active[data-v-527e8d26]{background-color:#3a51bb;color:#fff}.navbar.is-link .navbar-brand .navbar-link[data-v-527e8d26]:after{border-color:#fff}.navbar.is-link .navbar-burger[data-v-527e8d26]{color:#fff}@media screen and (min-width: 1024px){.navbar.is-link .navbar-start>.navbar-item[data-v-527e8d26],.navbar.is-link .navbar-start .navbar-link[data-v-527e8d26],.navbar.is-link .navbar-end>.navbar-item[data-v-527e8d26],.navbar.is-link .navbar-end .navbar-link[data-v-527e8d26]{color:#fff}.navbar.is-link .navbar-start>a.navbar-item[data-v-527e8d26]:focus,.navbar.is-link .navbar-start>a.navbar-item[data-v-527e8d26]:hover,.navbar.is-link .navbar-start>a.navbar-item.is-active[data-v-527e8d26],.navbar.is-link .navbar-start .navbar-link[data-v-527e8d26]:focus,.navbar.is-link .navbar-start .navbar-link[data-v-527e8d26]:hover,.navbar.is-link .navbar-start .navbar-link.is-active[data-v-527e8d26],.navbar.is-link .navbar-end>a.navbar-item[data-v-527e8d26]:focus,.navbar.is-link .navbar-end>a.navbar-item[data-v-527e8d26]:hover,.navbar.is-link .navbar-end>a.navbar-item.is-active[data-v-527e8d26],.navbar.is-link .navbar-end .navbar-link[data-v-527e8d26]:focus,.navbar.is-link .navbar-end .navbar-link[data-v-527e8d26]:hover,.navbar.is-link .navbar-end .navbar-link.is-active[data-v-527e8d26]{background-color:#3a51bb;color:#fff}.navbar.is-link .navbar-start .navbar-link[data-v-527e8d26]:after,.navbar.is-link .navbar-end .navbar-link[data-v-527e8d26]:after{border-color:#fff}.navbar.is-link .navbar-item.has-dropdown:focus .navbar-link[data-v-527e8d26],.navbar.is-link .navbar-item.has-dropdown:hover .navbar-link[data-v-527e8d26],.navbar.is-link .navbar-item.has-dropdown.is-active .navbar-link[data-v-527e8d26]{background-color:#3a51bb;color:#fff}.navbar.is-link .navbar-dropdown a.navbar-item.is-active[data-v-527e8d26]{background-color:#485fc7;color:#fff}}.navbar.is-info[data-v-527e8d26]{background-color:#3e8ed0;color:#fff}.navbar.is-info .navbar-brand>.navbar-item[data-v-527e8d26],.navbar.is-info .navbar-brand .navbar-link[data-v-527e8d26]{color:#fff}.navbar.is-info .navbar-brand>a.navbar-item[data-v-527e8d26]:focus,.navbar.is-info .navbar-brand>a.navbar-item[data-v-527e8d26]:hover,.navbar.is-info .navbar-brand>a.navbar-item.is-active[data-v-527e8d26],.navbar.is-info .navbar-brand .navbar-link[data-v-527e8d26]:focus,.navbar.is-info .navbar-brand .navbar-link[data-v-527e8d26]:hover,.navbar.is-info .navbar-brand .navbar-link.is-active[data-v-527e8d26]{background-color:#3082c5;color:#fff}.navbar.is-info .navbar-brand .navbar-link[data-v-527e8d26]:after{border-color:#fff}.navbar.is-info .navbar-burger[data-v-527e8d26]{color:#fff}@media screen and (min-width: 1024px){.navbar.is-info .navbar-start>.navbar-item[data-v-527e8d26],.navbar.is-info .navbar-start .navbar-link[data-v-527e8d26],.navbar.is-info .navbar-end>.navbar-item[data-v-527e8d26],.navbar.is-info .navbar-end .navbar-link[data-v-527e8d26]{color:#fff}.navbar.is-info .navbar-start>a.navbar-item[data-v-527e8d26]:focus,.navbar.is-info .navbar-start>a.navbar-item[data-v-527e8d26]:hover,.navbar.is-info .navbar-start>a.navbar-item.is-active[data-v-527e8d26],.navbar.is-info .navbar-start .navbar-link[data-v-527e8d26]:focus,.navbar.is-info .navbar-start .navbar-link[data-v-527e8d26]:hover,.navbar.is-info .navbar-start .navbar-link.is-active[data-v-527e8d26],.navbar.is-info .navbar-end>a.navbar-item[data-v-527e8d26]:focus,.navbar.is-info .navbar-end>a.navbar-item[data-v-527e8d26]:hover,.navbar.is-info .navbar-end>a.navbar-item.is-active[data-v-527e8d26],.navbar.is-info .navbar-end .navbar-link[data-v-527e8d26]:focus,.navbar.is-info .navbar-end .navbar-link[data-v-527e8d26]:hover,.navbar.is-info .navbar-end .navbar-link.is-active[data-v-527e8d26]{background-color:#3082c5;color:#fff}.navbar.is-info .navbar-start .navbar-link[data-v-527e8d26]:after,.navbar.is-info .navbar-end .navbar-link[data-v-527e8d26]:after{border-color:#fff}.navbar.is-info .navbar-item.has-dropdown:focus .navbar-link[data-v-527e8d26],.navbar.is-info .navbar-item.has-dropdown:hover .navbar-link[data-v-527e8d26],.navbar.is-info .navbar-item.has-dropdown.is-active .navbar-link[data-v-527e8d26]{background-color:#3082c5;color:#fff}.navbar.is-info .navbar-dropdown a.navbar-item.is-active[data-v-527e8d26]{background-color:#3e8ed0;color:#fff}}.navbar.is-success[data-v-527e8d26]{background-color:#48c78e;color:#fff}.navbar.is-success .navbar-brand>.navbar-item[data-v-527e8d26],.navbar.is-success .navbar-brand .navbar-link[data-v-527e8d26]{color:#fff}.navbar.is-success .navbar-brand>a.navbar-item[data-v-527e8d26]:focus,.navbar.is-success .navbar-brand>a.navbar-item[data-v-527e8d26]:hover,.navbar.is-success .navbar-brand>a.navbar-item.is-active[data-v-527e8d26],.navbar.is-success .navbar-brand .navbar-link[data-v-527e8d26]:focus,.navbar.is-success .navbar-brand .navbar-link[data-v-527e8d26]:hover,.navbar.is-success .navbar-brand .navbar-link.is-active[data-v-527e8d26]{background-color:#3abb81;color:#fff}.navbar.is-success .navbar-brand .navbar-link[data-v-527e8d26]:after{border-color:#fff}.navbar.is-success .navbar-burger[data-v-527e8d26]{color:#fff}@media screen and (min-width: 1024px){.navbar.is-success .navbar-start>.navbar-item[data-v-527e8d26],.navbar.is-success .navbar-start .navbar-link[data-v-527e8d26],.navbar.is-success .navbar-end>.navbar-item[data-v-527e8d26],.navbar.is-success .navbar-end .navbar-link[data-v-527e8d26]{color:#fff}.navbar.is-success .navbar-start>a.navbar-item[data-v-527e8d26]:focus,.navbar.is-success .navbar-start>a.navbar-item[data-v-527e8d26]:hover,.navbar.is-success .navbar-start>a.navbar-item.is-active[data-v-527e8d26],.navbar.is-success .navbar-start .navbar-link[data-v-527e8d26]:focus,.navbar.is-success .navbar-start .navbar-link[data-v-527e8d26]:hover,.navbar.is-success .navbar-start .navbar-link.is-active[data-v-527e8d26],.navbar.is-success .navbar-end>a.navbar-item[data-v-527e8d26]:focus,.navbar.is-success .navbar-end>a.navbar-item[data-v-527e8d26]:hover,.navbar.is-success .navbar-end>a.navbar-item.is-active[data-v-527e8d26],.navbar.is-success .navbar-end .navbar-link[data-v-527e8d26]:focus,.navbar.is-success .navbar-end .navbar-link[data-v-527e8d26]:hover,.navbar.is-success .navbar-end .navbar-link.is-active[data-v-527e8d26]{background-color:#3abb81;color:#fff}.navbar.is-success .navbar-start .navbar-link[data-v-527e8d26]:after,.navbar.is-success .navbar-end .navbar-link[data-v-527e8d26]:after{border-color:#fff}.navbar.is-success .navbar-item.has-dropdown:focus .navbar-link[data-v-527e8d26],.navbar.is-success .navbar-item.has-dropdown:hover .navbar-link[data-v-527e8d26],.navbar.is-success .navbar-item.has-dropdown.is-active .navbar-link[data-v-527e8d26]{background-color:#3abb81;color:#fff}.navbar.is-success .navbar-dropdown a.navbar-item.is-active[data-v-527e8d26]{background-color:#48c78e;color:#fff}}.navbar.is-warning[data-v-527e8d26]{background-color:#ffe08a;color:#000000b3}.navbar.is-warning .navbar-brand>.navbar-item[data-v-527e8d26],.navbar.is-warning .navbar-brand .navbar-link[data-v-527e8d26]{color:#000000b3}.navbar.is-warning .navbar-brand>a.navbar-item[data-v-527e8d26]:focus,.navbar.is-warning .navbar-brand>a.navbar-item[data-v-527e8d26]:hover,.navbar.is-warning .navbar-brand>a.navbar-item.is-active[data-v-527e8d26],.navbar.is-warning .navbar-brand .navbar-link[data-v-527e8d26]:focus,.navbar.is-warning .navbar-brand .navbar-link[data-v-527e8d26]:hover,.navbar.is-warning .navbar-brand .navbar-link.is-active[data-v-527e8d26]{background-color:#ffd970;color:#000000b3}.navbar.is-warning .navbar-brand .navbar-link[data-v-527e8d26]:after{border-color:#000000b3}.navbar.is-warning .navbar-burger[data-v-527e8d26]{color:#000000b3}@media screen and (min-width: 1024px){.navbar.is-warning .navbar-start>.navbar-item[data-v-527e8d26],.navbar.is-warning .navbar-start .navbar-link[data-v-527e8d26],.navbar.is-warning .navbar-end>.navbar-item[data-v-527e8d26],.navbar.is-warning .navbar-end .navbar-link[data-v-527e8d26]{color:#000000b3}.navbar.is-warning .navbar-start>a.navbar-item[data-v-527e8d26]:focus,.navbar.is-warning .navbar-start>a.navbar-item[data-v-527e8d26]:hover,.navbar.is-warning .navbar-start>a.navbar-item.is-active[data-v-527e8d26],.navbar.is-warning .navbar-start .navbar-link[data-v-527e8d26]:focus,.navbar.is-warning .navbar-start .navbar-link[data-v-527e8d26]:hover,.navbar.is-warning .navbar-start .navbar-link.is-active[data-v-527e8d26],.navbar.is-warning .navbar-end>a.navbar-item[data-v-527e8d26]:focus,.navbar.is-warning .navbar-end>a.navbar-item[data-v-527e8d26]:hover,.navbar.is-warning .navbar-end>a.navbar-item.is-active[data-v-527e8d26],.navbar.is-warning .navbar-end .navbar-link[data-v-527e8d26]:focus,.navbar.is-warning .navbar-end .navbar-link[data-v-527e8d26]:hover,.navbar.is-warning .navbar-end .navbar-link.is-active[data-v-527e8d26]{background-color:#ffd970;color:#000000b3}.navbar.is-warning .navbar-start .navbar-link[data-v-527e8d26]:after,.navbar.is-warning .navbar-end .navbar-link[data-v-527e8d26]:after{border-color:#000000b3}.navbar.is-warning .navbar-item.has-dropdown:focus .navbar-link[data-v-527e8d26],.navbar.is-warning .navbar-item.has-dropdown:hover .navbar-link[data-v-527e8d26],.navbar.is-warning .navbar-item.has-dropdown.is-active .navbar-link[data-v-527e8d26]{background-color:#ffd970;color:#000000b3}.navbar.is-warning .navbar-dropdown a.navbar-item.is-active[data-v-527e8d26]{background-color:#ffe08a;color:#000000b3}}.navbar.is-danger[data-v-527e8d26]{background-color:#f14668;color:#fff}.navbar.is-danger .navbar-brand>.navbar-item[data-v-527e8d26],.navbar.is-danger .navbar-brand .navbar-link[data-v-527e8d26]{color:#fff}.navbar.is-danger .navbar-brand>a.navbar-item[data-v-527e8d26]:focus,.navbar.is-danger .navbar-brand>a.navbar-item[data-v-527e8d26]:hover,.navbar.is-danger .navbar-brand>a.navbar-item.is-active[data-v-527e8d26],.navbar.is-danger .navbar-brand .navbar-link[data-v-527e8d26]:focus,.navbar.is-danger .navbar-brand .navbar-link[data-v-527e8d26]:hover,.navbar.is-danger .navbar-brand .navbar-link.is-active[data-v-527e8d26]{background-color:#ef2e55;color:#fff}.navbar.is-danger .navbar-brand .navbar-link[data-v-527e8d26]:after{border-color:#fff}.navbar.is-danger .navbar-burger[data-v-527e8d26]{color:#fff}@media screen and (min-width: 1024px){.navbar.is-danger .navbar-start>.navbar-item[data-v-527e8d26],.navbar.is-danger .navbar-start .navbar-link[data-v-527e8d26],.navbar.is-danger .navbar-end>.navbar-item[data-v-527e8d26],.navbar.is-danger .navbar-end .navbar-link[data-v-527e8d26]{color:#fff}.navbar.is-danger .navbar-start>a.navbar-item[data-v-527e8d26]:focus,.navbar.is-danger .navbar-start>a.navbar-item[data-v-527e8d26]:hover,.navbar.is-danger .navbar-start>a.navbar-item.is-active[data-v-527e8d26],.navbar.is-danger .navbar-start .navbar-link[data-v-527e8d26]:focus,.navbar.is-danger .navbar-start .navbar-link[data-v-527e8d26]:hover,.navbar.is-danger .navbar-start .navbar-link.is-active[data-v-527e8d26],.navbar.is-danger .navbar-end>a.navbar-item[data-v-527e8d26]:focus,.navbar.is-danger .navbar-end>a.navbar-item[data-v-527e8d26]:hover,.navbar.is-danger .navbar-end>a.navbar-item.is-active[data-v-527e8d26],.navbar.is-danger .navbar-end .navbar-link[data-v-527e8d26]:focus,.navbar.is-danger .navbar-end .navbar-link[data-v-527e8d26]:hover,.navbar.is-danger .navbar-end .navbar-link.is-active[data-v-527e8d26]{background-color:#ef2e55;color:#fff}.navbar.is-danger .navbar-start .navbar-link[data-v-527e8d26]:after,.navbar.is-danger .navbar-end .navbar-link[data-v-527e8d26]:after{border-color:#fff}.navbar.is-danger .navbar-item.has-dropdown:focus .navbar-link[data-v-527e8d26],.navbar.is-danger .navbar-item.has-dropdown:hover .navbar-link[data-v-527e8d26],.navbar.is-danger .navbar-item.has-dropdown.is-active .navbar-link[data-v-527e8d26]{background-color:#ef2e55;color:#fff}.navbar.is-danger .navbar-dropdown a.navbar-item.is-active[data-v-527e8d26]{background-color:#f14668;color:#fff}}.navbar>.container[data-v-527e8d26]{align-items:stretch;display:flex;min-height:3.25rem;width:100%}.navbar.has-shadow[data-v-527e8d26]{box-shadow:0 2px #f5f5f5}.navbar.is-fixed-bottom[data-v-527e8d26],.navbar.is-fixed-top[data-v-527e8d26]{left:0;position:fixed;right:0;z-index:30}.navbar.is-fixed-bottom[data-v-527e8d26]{bottom:0}.navbar.is-fixed-bottom.has-shadow[data-v-527e8d26]{box-shadow:0 -2px #f5f5f5}.navbar.is-fixed-top[data-v-527e8d26]{top:0}html.has-navbar-fixed-top[data-v-527e8d26],body.has-navbar-fixed-top[data-v-527e8d26]{padding-top:3.25rem}html.has-navbar-fixed-bottom[data-v-527e8d26],body.has-navbar-fixed-bottom[data-v-527e8d26]{padding-bottom:3.25rem}.navbar-brand[data-v-527e8d26],.navbar-tabs[data-v-527e8d26]{align-items:stretch;display:flex;flex-shrink:0;min-height:3.25rem}.navbar-brand a.navbar-item[data-v-527e8d26]:focus,.navbar-brand a.navbar-item[data-v-527e8d26]:hover{background-color:transparent}.navbar-tabs[data-v-527e8d26]{-webkit-overflow-scrolling:touch;max-width:100vw;overflow-x:auto;overflow-y:hidden}.navbar-burger[data-v-527e8d26]{color:#4a4a4a;-moz-appearance:none;-webkit-appearance:none;appearance:none;background:none;border:none;cursor:pointer;display:block;height:3.25rem;position:relative;width:3.25rem;margin-left:auto}.navbar-burger span[data-v-527e8d26]{background-color:currentColor;display:block;height:1px;left:calc(50% - 8px);position:absolute;transform-origin:center;transition-duration:86ms;transition-property:background-color,opacity,transform;transition-timing-function:ease-out;width:16px}.navbar-burger span[data-v-527e8d26]:nth-child(1){top:calc(50% - 6px)}.navbar-burger span[data-v-527e8d26]:nth-child(2){top:calc(50% - 1px)}.navbar-burger span[data-v-527e8d26]:nth-child(3){top:calc(50% + 4px)}.navbar-burger[data-v-527e8d26]:hover{background-color:#0000000d}.navbar-burger.is-active span[data-v-527e8d26]:nth-child(1){transform:translateY(5px) rotate(45deg)}.navbar-burger.is-active span[data-v-527e8d26]:nth-child(2){opacity:0}.navbar-burger.is-active span[data-v-527e8d26]:nth-child(3){transform:translateY(-5px) rotate(-45deg)}.navbar-menu[data-v-527e8d26]{display:none}.navbar-item[data-v-527e8d26],.navbar-link[data-v-527e8d26]{color:#4a4a4a;display:block;line-height:1.5;padding:.5rem .75rem;position:relative}.navbar-item .icon[data-v-527e8d26]:only-child,.navbar-link .icon[data-v-527e8d26]:only-child{margin-left:-.25rem;margin-right:-.25rem}a.navbar-item[data-v-527e8d26],.navbar-link[data-v-527e8d26]{cursor:pointer}a.navbar-item[data-v-527e8d26]:focus,a.navbar-item[data-v-527e8d26]:focus-within,a.navbar-item[data-v-527e8d26]:hover,a.navbar-item.is-active[data-v-527e8d26],.navbar-link[data-v-527e8d26]:focus,.navbar-link[data-v-527e8d26]:focus-within,.navbar-link[data-v-527e8d26]:hover,.navbar-link.is-active[data-v-527e8d26]{background-color:#fafafa;color:#485fc7}.navbar-item[data-v-527e8d26]{flex-grow:0;flex-shrink:0}.navbar-item img[data-v-527e8d26]{max-height:1.75rem}.navbar-item.has-dropdown[data-v-527e8d26]{padding:0}.navbar-item.is-expanded[data-v-527e8d26]{flex-grow:1;flex-shrink:1}.navbar-item.is-tab[data-v-527e8d26]{border-bottom:1px solid transparent;min-height:3.25rem;padding-bottom:calc(.5rem - 1px)}.navbar-item.is-tab[data-v-527e8d26]:focus,.navbar-item.is-tab[data-v-527e8d26]:hover{background-color:transparent;border-bottom-color:#485fc7}.navbar-item.is-tab.is-active[data-v-527e8d26]{background-color:transparent;border-bottom-color:#485fc7;border-bottom-style:solid;border-bottom-width:3px;color:#485fc7;padding-bottom:calc(.5rem - 3px)}.navbar-content[data-v-527e8d26]{flex-grow:1;flex-shrink:1}.navbar-link[data-v-527e8d26]:not(.is-arrowless){padding-right:2.5em}.navbar-link[data-v-527e8d26]:not(.is-arrowless):after{border-color:#485fc7;margin-top:-.375em;right:1.125em}.navbar-dropdown[data-v-527e8d26]{font-size:.875rem;padding-bottom:.5rem;padding-top:.5rem}.navbar-dropdown .navbar-item[data-v-527e8d26]{padding-left:1.5rem;padding-right:1.5rem}.navbar-divider[data-v-527e8d26]{background-color:#f5f5f5;border:none;display:none;height:2px;margin:.5rem 0}@media screen and (max-width: 1023px){.navbar>.container[data-v-527e8d26]{display:block}.navbar-brand .navbar-item[data-v-527e8d26],.navbar-tabs .navbar-item[data-v-527e8d26]{align-items:center;display:flex}.navbar-link[data-v-527e8d26]:after{display:none}.navbar-menu[data-v-527e8d26]{background-color:#fff;box-shadow:0 8px 16px #0a0a0a1a;padding:.5rem 0}.navbar-menu.is-active[data-v-527e8d26]{display:block}.navbar.is-fixed-bottom-touch[data-v-527e8d26],.navbar.is-fixed-top-touch[data-v-527e8d26]{left:0;position:fixed;right:0;z-index:30}.navbar.is-fixed-bottom-touch[data-v-527e8d26]{bottom:0}.navbar.is-fixed-bottom-touch.has-shadow[data-v-527e8d26]{box-shadow:0 -2px 3px #0a0a0a1a}.navbar.is-fixed-top-touch[data-v-527e8d26]{top:0}.navbar.is-fixed-top .navbar-menu[data-v-527e8d26],.navbar.is-fixed-top-touch .navbar-menu[data-v-527e8d26]{-webkit-overflow-scrolling:touch;max-height:calc(100vh - 3.25rem);overflow:auto}html.has-navbar-fixed-top-touch[data-v-527e8d26],body.has-navbar-fixed-top-touch[data-v-527e8d26]{padding-top:3.25rem}html.has-navbar-fixed-bottom-touch[data-v-527e8d26],body.has-navbar-fixed-bottom-touch[data-v-527e8d26]{padding-bottom:3.25rem}}@media screen and (min-width: 1024px){.navbar[data-v-527e8d26],.navbar-menu[data-v-527e8d26],.navbar-start[data-v-527e8d26],.navbar-end[data-v-527e8d26]{align-items:stretch;display:flex}.navbar[data-v-527e8d26]{min-height:3.25rem}.navbar.is-spaced[data-v-527e8d26]{padding:1rem 2rem}.navbar.is-spaced .navbar-start[data-v-527e8d26],.navbar.is-spaced .navbar-end[data-v-527e8d26]{align-items:center}.navbar.is-spaced a.navbar-item[data-v-527e8d26],.navbar.is-spaced .navbar-link[data-v-527e8d26]{border-radius:4px}.navbar.is-transparent a.navbar-item[data-v-527e8d26]:focus,.navbar.is-transparent a.navbar-item[data-v-527e8d26]:hover,.navbar.is-transparent a.navbar-item.is-active[data-v-527e8d26],.navbar.is-transparent .navbar-link[data-v-527e8d26]:focus,.navbar.is-transparent .navbar-link[data-v-527e8d26]:hover,.navbar.is-transparent .navbar-link.is-active[data-v-527e8d26]{background-color:transparent!important}.navbar.is-transparent .navbar-item.has-dropdown.is-active .navbar-link[data-v-527e8d26],.navbar.is-transparent .navbar-item.has-dropdown.is-hoverable:focus .navbar-link[data-v-527e8d26],.navbar.is-transparent .navbar-item.has-dropdown.is-hoverable:focus-within .navbar-link[data-v-527e8d26],.navbar.is-transparent .navbar-item.has-dropdown.is-hoverable:hover .navbar-link[data-v-527e8d26]{background-color:transparent!important}.navbar.is-transparent .navbar-dropdown a.navbar-item[data-v-527e8d26]:focus,.navbar.is-transparent .navbar-dropdown a.navbar-item[data-v-527e8d26]:hover{background-color:#f5f5f5;color:#0a0a0a}.navbar.is-transparent .navbar-dropdown a.navbar-item.is-active[data-v-527e8d26]{background-color:#f5f5f5;color:#485fc7}.navbar-burger[data-v-527e8d26]{display:none}.navbar-item[data-v-527e8d26],.navbar-link[data-v-527e8d26]{align-items:center;display:flex}.navbar-item.has-dropdown[data-v-527e8d26]{align-items:stretch}.navbar-item.has-dropdown-up .navbar-link[data-v-527e8d26]:after{transform:rotate(135deg) translate(.25em,-.25em)}.navbar-item.has-dropdown-up .navbar-dropdown[data-v-527e8d26]{border-bottom:2px solid #dbdbdb;border-radius:6px 6px 0 0;border-top:none;bottom:100%;box-shadow:0 -8px 8px #0a0a0a1a;top:auto}.navbar-item.is-active .navbar-dropdown[data-v-527e8d26],.navbar-item.is-hoverable:focus .navbar-dropdown[data-v-527e8d26],.navbar-item.is-hoverable:focus-within .navbar-dropdown[data-v-527e8d26],.navbar-item.is-hoverable:hover .navbar-dropdown[data-v-527e8d26]{display:block}.navbar.is-spaced .navbar-item.is-active .navbar-dropdown[data-v-527e8d26],.navbar-item.is-active .navbar-dropdown.is-boxed[data-v-527e8d26],.navbar.is-spaced .navbar-item.is-hoverable:focus .navbar-dropdown[data-v-527e8d26],.navbar-item.is-hoverable:focus .navbar-dropdown.is-boxed[data-v-527e8d26],.navbar.is-spaced .navbar-item.is-hoverable:focus-within .navbar-dropdown[data-v-527e8d26],.navbar-item.is-hoverable:focus-within .navbar-dropdown.is-boxed[data-v-527e8d26],.navbar.is-spaced .navbar-item.is-hoverable:hover .navbar-dropdown[data-v-527e8d26],.navbar-item.is-hoverable:hover .navbar-dropdown.is-boxed[data-v-527e8d26]{opacity:1;pointer-events:auto;transform:translateY(0)}.navbar-menu[data-v-527e8d26]{flex-grow:1;flex-shrink:0}.navbar-start[data-v-527e8d26]{justify-content:flex-start;margin-right:auto}.navbar-end[data-v-527e8d26]{justify-content:flex-end;margin-left:auto}.navbar-dropdown[data-v-527e8d26]{background-color:#fff;border-bottom-left-radius:6px;border-bottom-right-radius:6px;border-top:2px solid #dbdbdb;box-shadow:0 8px 8px #0a0a0a1a;display:none;font-size:.875rem;left:0;min-width:100%;position:absolute;top:100%;z-index:20}.navbar-dropdown .navbar-item[data-v-527e8d26]{padding:.375rem 1rem;white-space:nowrap}.navbar-dropdown a.navbar-item[data-v-527e8d26]{padding-right:3rem}.navbar-dropdown a.navbar-item[data-v-527e8d26]:focus,.navbar-dropdown a.navbar-item[data-v-527e8d26]:hover{background-color:#f5f5f5;color:#0a0a0a}.navbar-dropdown a.navbar-item.is-active[data-v-527e8d26]{background-color:#f5f5f5;color:#485fc7}.navbar.is-spaced .navbar-dropdown[data-v-527e8d26],.navbar-dropdown.is-boxed[data-v-527e8d26]{border-radius:6px;border-top:none;box-shadow:0 8px 8px #0a0a0a1a,0 0 0 1px #0a0a0a1a;display:block;opacity:0;pointer-events:none;top:calc(100% - 4px);transform:translateY(-5px);transition-duration:86ms;transition-property:opacity,transform}.navbar-dropdown.is-right[data-v-527e8d26]{left:auto;right:0}.navbar-divider[data-v-527e8d26]{display:block}.navbar>.container .navbar-brand[data-v-527e8d26],.container>.navbar .navbar-brand[data-v-527e8d26]{margin-left:-.75rem}.navbar>.container .navbar-menu[data-v-527e8d26],.container>.navbar .navbar-menu[data-v-527e8d26]{margin-right:-.75rem}.navbar.is-fixed-bottom-desktop[data-v-527e8d26],.navbar.is-fixed-top-desktop[data-v-527e8d26]{left:0;position:fixed;right:0;z-index:30}.navbar.is-fixed-bottom-desktop[data-v-527e8d26]{bottom:0}.navbar.is-fixed-bottom-desktop.has-shadow[data-v-527e8d26]{box-shadow:0 -2px 3px #0a0a0a1a}.navbar.is-fixed-top-desktop[data-v-527e8d26]{top:0}html.has-navbar-fixed-top-desktop[data-v-527e8d26],body.has-navbar-fixed-top-desktop[data-v-527e8d26]{padding-top:3.25rem}html.has-navbar-fixed-bottom-desktop[data-v-527e8d26],body.has-navbar-fixed-bottom-desktop[data-v-527e8d26]{padding-bottom:3.25rem}html.has-spaced-navbar-fixed-top[data-v-527e8d26],body.has-spaced-navbar-fixed-top[data-v-527e8d26]{padding-top:5.25rem}html.has-spaced-navbar-fixed-bottom[data-v-527e8d26],body.has-spaced-navbar-fixed-bottom[data-v-527e8d26]{padding-bottom:5.25rem}a.navbar-item.is-active[data-v-527e8d26],.navbar-link.is-active[data-v-527e8d26]{color:#0a0a0a}a.navbar-item.is-active[data-v-527e8d26]:not(:focus):not(:hover),.navbar-link.is-active[data-v-527e8d26]:not(:focus):not(:hover){background-color:transparent}.navbar-item.has-dropdown:focus .navbar-link[data-v-527e8d26],.navbar-item.has-dropdown:hover .navbar-link[data-v-527e8d26],.navbar-item.has-dropdown.is-active .navbar-link[data-v-527e8d26]{background-color:#fafafa}}.hero.is-fullheight-with-navbar[data-v-527e8d26]{min-height:calc(100vh - 3.25rem)}.pagination[data-v-527e8d26]{font-size:1rem;margin:-.25rem}.pagination.is-small[data-v-527e8d26]{font-size:.75rem}.pagination.is-medium[data-v-527e8d26]{font-size:1.25rem}.pagination.is-large[data-v-527e8d26]{font-size:1.5rem}.pagination.is-rounded .pagination-previous[data-v-527e8d26],.pagination.is-rounded .pagination-next[data-v-527e8d26]{padding-left:1em;padding-right:1em;border-radius:9999px}.pagination.is-rounded .pagination-link[data-v-527e8d26]{border-radius:9999px}.pagination[data-v-527e8d26],.pagination-list[data-v-527e8d26]{align-items:center;display:flex;justify-content:center;text-align:center}.pagination-previous[data-v-527e8d26],.pagination-next[data-v-527e8d26],.pagination-link[data-v-527e8d26],.pagination-ellipsis[data-v-527e8d26]{font-size:1em;justify-content:center;margin:.25rem;padding-left:.5em;padding-right:.5em;text-align:center}.pagination-previous[data-v-527e8d26],.pagination-next[data-v-527e8d26],.pagination-link[data-v-527e8d26]{border-color:#dbdbdb;color:#363636;min-width:2.5em}.pagination-previous[data-v-527e8d26]:hover,.pagination-next[data-v-527e8d26]:hover,.pagination-link[data-v-527e8d26]:hover{border-color:#b5b5b5;color:#363636}.pagination-previous[data-v-527e8d26]:focus,.pagination-next[data-v-527e8d26]:focus,.pagination-link[data-v-527e8d26]:focus{border-color:#485fc7}.pagination-previous[data-v-527e8d26]:active,.pagination-next[data-v-527e8d26]:active,.pagination-link[data-v-527e8d26]:active{box-shadow:inset 0 1px 2px #0a0a0a33}.pagination-previous[disabled][data-v-527e8d26],.pagination-previous.is-disabled[data-v-527e8d26],.pagination-next[disabled][data-v-527e8d26],.pagination-next.is-disabled[data-v-527e8d26],.pagination-link[disabled][data-v-527e8d26],.pagination-link.is-disabled[data-v-527e8d26]{background-color:#dbdbdb;border-color:#dbdbdb;box-shadow:none;color:#7a7a7a;opacity:.5}.pagination-previous[data-v-527e8d26],.pagination-next[data-v-527e8d26]{padding-left:.75em;padding-right:.75em;white-space:nowrap}.pagination-link.is-current[data-v-527e8d26]{background-color:#485fc7;border-color:#485fc7;color:#fff}.pagination-ellipsis[data-v-527e8d26]{color:#b5b5b5;pointer-events:none}.pagination-list[data-v-527e8d26]{flex-wrap:wrap}.pagination-list li[data-v-527e8d26]{list-style:none}@media screen and (max-width: 768px){.pagination[data-v-527e8d26]{flex-wrap:wrap}.pagination-previous[data-v-527e8d26],.pagination-next[data-v-527e8d26],.pagination-list li[data-v-527e8d26]{flex-grow:1;flex-shrink:1}}@media screen and (min-width: 769px),print{.pagination-list[data-v-527e8d26]{flex-grow:1;flex-shrink:1;justify-content:flex-start;order:1}.pagination-previous[data-v-527e8d26],.pagination-next[data-v-527e8d26],.pagination-link[data-v-527e8d26],.pagination-ellipsis[data-v-527e8d26]{margin-bottom:0;margin-top:0}.pagination-previous[data-v-527e8d26]{order:2}.pagination-next[data-v-527e8d26]{order:3}.pagination[data-v-527e8d26]{justify-content:space-between;margin-bottom:0;margin-top:0}.pagination.is-centered .pagination-previous[data-v-527e8d26]{order:1}.pagination.is-centered .pagination-list[data-v-527e8d26]{justify-content:center;order:2}.pagination.is-centered .pagination-next[data-v-527e8d26]{order:3}.pagination.is-right .pagination-previous[data-v-527e8d26]{order:1}.pagination.is-right .pagination-next[data-v-527e8d26]{order:2}.pagination.is-right .pagination-list[data-v-527e8d26]{justify-content:flex-end;order:3}}.panel[data-v-527e8d26]{border-radius:6px;box-shadow:0 .5em 1em -.125em #0a0a0a1a,0 0 0 1px #0a0a0a05;font-size:1rem}.panel[data-v-527e8d26]:not(:last-child){margin-bottom:1.5rem}.panel.is-white .panel-heading[data-v-527e8d26]{background-color:#fff;color:#0a0a0a}.panel.is-white .panel-tabs a.is-active[data-v-527e8d26]{border-bottom-color:#fff}.panel.is-white .panel-block.is-active .panel-icon[data-v-527e8d26]{color:#fff}.panel.is-black .panel-heading[data-v-527e8d26]{background-color:#0a0a0a;color:#fff}.panel.is-black .panel-tabs a.is-active[data-v-527e8d26]{border-bottom-color:#0a0a0a}.panel.is-black .panel-block.is-active .panel-icon[data-v-527e8d26]{color:#0a0a0a}.panel.is-light .panel-heading[data-v-527e8d26]{background-color:#f5f5f5;color:#000000b3}.panel.is-light .panel-tabs a.is-active[data-v-527e8d26]{border-bottom-color:#f5f5f5}.panel.is-light .panel-block.is-active .panel-icon[data-v-527e8d26]{color:#f5f5f5}.panel.is-dark .panel-heading[data-v-527e8d26]{background-color:#363636;color:#fff}.panel.is-dark .panel-tabs a.is-active[data-v-527e8d26]{border-bottom-color:#363636}.panel.is-dark .panel-block.is-active .panel-icon[data-v-527e8d26]{color:#363636}.panel.is-primary .panel-heading[data-v-527e8d26]{background-color:#00d1b2;color:#fff}.panel.is-primary .panel-tabs a.is-active[data-v-527e8d26]{border-bottom-color:#00d1b2}.panel.is-primary .panel-block.is-active .panel-icon[data-v-527e8d26]{color:#00d1b2}.panel.is-link .panel-heading[data-v-527e8d26]{background-color:#485fc7;color:#fff}.panel.is-link .panel-tabs a.is-active[data-v-527e8d26]{border-bottom-color:#485fc7}.panel.is-link .panel-block.is-active .panel-icon[data-v-527e8d26]{color:#485fc7}.panel.is-info .panel-heading[data-v-527e8d26]{background-color:#3e8ed0;color:#fff}.panel.is-info .panel-tabs a.is-active[data-v-527e8d26]{border-bottom-color:#3e8ed0}.panel.is-info .panel-block.is-active .panel-icon[data-v-527e8d26]{color:#3e8ed0}.panel.is-success .panel-heading[data-v-527e8d26]{background-color:#48c78e;color:#fff}.panel.is-success .panel-tabs a.is-active[data-v-527e8d26]{border-bottom-color:#48c78e}.panel.is-success .panel-block.is-active .panel-icon[data-v-527e8d26]{color:#48c78e}.panel.is-warning .panel-heading[data-v-527e8d26]{background-color:#ffe08a;color:#000000b3}.panel.is-warning .panel-tabs a.is-active[data-v-527e8d26]{border-bottom-color:#ffe08a}.panel.is-warning .panel-block.is-active .panel-icon[data-v-527e8d26]{color:#ffe08a}.panel.is-danger .panel-heading[data-v-527e8d26]{background-color:#f14668;color:#fff}.panel.is-danger .panel-tabs a.is-active[data-v-527e8d26]{border-bottom-color:#f14668}.panel.is-danger .panel-block.is-active .panel-icon[data-v-527e8d26]{color:#f14668}.panel-tabs[data-v-527e8d26]:not(:last-child),.panel-block[data-v-527e8d26]:not(:last-child){border-bottom:1px solid #ededed}.panel-heading[data-v-527e8d26]{background-color:#ededed;border-radius:6px 6px 0 0;color:#363636;font-size:1.25em;font-weight:700;line-height:1.25;padding:.75em 1em}.panel-tabs[data-v-527e8d26]{align-items:flex-end;display:flex;font-size:.875em;justify-content:center}.panel-tabs a[data-v-527e8d26]{border-bottom:1px solid #dbdbdb;margin-bottom:-1px;padding:.5em}.panel-tabs a.is-active[data-v-527e8d26]{border-bottom-color:#4a4a4a;color:#363636}.panel-list a[data-v-527e8d26]{color:#4a4a4a}.panel-list a[data-v-527e8d26]:hover{color:#485fc7}.panel-block[data-v-527e8d26]{align-items:center;color:#363636;display:flex;justify-content:flex-start;padding:.5em .75em}.panel-block input[type=checkbox][data-v-527e8d26]{margin-right:.75em}.panel-block>.control[data-v-527e8d26]{flex-grow:1;flex-shrink:1;width:100%}.panel-block.is-wrapped[data-v-527e8d26]{flex-wrap:wrap}.panel-block.is-active[data-v-527e8d26]{border-left-color:#485fc7;color:#363636}.panel-block.is-active .panel-icon[data-v-527e8d26]{color:#485fc7}.panel-block[data-v-527e8d26]:last-child{border-bottom-left-radius:6px;border-bottom-right-radius:6px}a.panel-block[data-v-527e8d26],label.panel-block[data-v-527e8d26]{cursor:pointer}a.panel-block[data-v-527e8d26]:hover,label.panel-block[data-v-527e8d26]:hover{background-color:#f5f5f5}.panel-icon[data-v-527e8d26]{display:inline-block;font-size:14px;height:1em;line-height:1em;text-align:center;vertical-align:top;width:1em;color:#7a7a7a;margin-right:.75em}.panel-icon .fa[data-v-527e8d26]{font-size:inherit;line-height:inherit}.tabs[data-v-527e8d26]{-webkit-overflow-scrolling:touch;align-items:stretch;display:flex;font-size:1rem;justify-content:space-between;overflow:hidden;overflow-x:auto;white-space:nowrap}.tabs a[data-v-527e8d26]{align-items:center;border-bottom-color:#dbdbdb;border-bottom-style:solid;border-bottom-width:1px;color:#4a4a4a;display:flex;justify-content:center;margin-bottom:-1px;padding:.5em 1em;vertical-align:top}.tabs a[data-v-527e8d26]:hover{border-bottom-color:#363636;color:#363636}.tabs li[data-v-527e8d26]{display:block}.tabs li.is-active a[data-v-527e8d26]{border-bottom-color:#485fc7;color:#485fc7}.tabs ul[data-v-527e8d26]{align-items:center;border-bottom-color:#dbdbdb;border-bottom-style:solid;border-bottom-width:1px;display:flex;flex-grow:1;flex-shrink:0;justify-content:flex-start}.tabs ul.is-left[data-v-527e8d26]{padding-right:.75em}.tabs ul.is-center[data-v-527e8d26]{flex:none;justify-content:center;padding-left:.75em;padding-right:.75em}.tabs ul.is-right[data-v-527e8d26]{justify-content:flex-end;padding-left:.75em}.tabs .icon[data-v-527e8d26]:first-child{margin-right:.5em}.tabs .icon[data-v-527e8d26]:last-child{margin-left:.5em}.tabs.is-centered ul[data-v-527e8d26]{justify-content:center}.tabs.is-right ul[data-v-527e8d26]{justify-content:flex-end}.tabs.is-boxed a[data-v-527e8d26]{border:1px solid transparent;border-radius:4px 4px 0 0}.tabs.is-boxed a[data-v-527e8d26]:hover{background-color:#f5f5f5;border-bottom-color:#dbdbdb}.tabs.is-boxed li.is-active a[data-v-527e8d26]{background-color:#fff;border-color:#dbdbdb;border-bottom-color:transparent!important}.tabs.is-fullwidth li[data-v-527e8d26]{flex-grow:1;flex-shrink:0}.tabs.is-toggle a[data-v-527e8d26]{border-color:#dbdbdb;border-style:solid;border-width:1px;margin-bottom:0;position:relative}.tabs.is-toggle a[data-v-527e8d26]:hover{background-color:#f5f5f5;border-color:#b5b5b5;z-index:2}.tabs.is-toggle li+li[data-v-527e8d26]{margin-left:-1px}.tabs.is-toggle li:first-child a[data-v-527e8d26]{border-top-left-radius:4px;border-bottom-left-radius:4px}.tabs.is-toggle li:last-child a[data-v-527e8d26]{border-top-right-radius:4px;border-bottom-right-radius:4px}.tabs.is-toggle li.is-active a[data-v-527e8d26]{background-color:#485fc7;border-color:#485fc7;color:#fff;z-index:1}.tabs.is-toggle ul[data-v-527e8d26]{border-bottom:none}.tabs.is-toggle.is-toggle-rounded li:first-child a[data-v-527e8d26]{border-bottom-left-radius:9999px;border-top-left-radius:9999px;padding-left:1.25em}.tabs.is-toggle.is-toggle-rounded li:last-child a[data-v-527e8d26]{border-bottom-right-radius:9999px;border-top-right-radius:9999px;padding-right:1.25em}.tabs.is-small[data-v-527e8d26]{font-size:.75rem}.tabs.is-medium[data-v-527e8d26]{font-size:1.25rem}.tabs.is-large[data-v-527e8d26]{font-size:1.5rem}.column[data-v-527e8d26]{display:block;flex-basis:0;flex-grow:1;flex-shrink:1;padding:.75rem}.columns.is-mobile>.column.is-narrow[data-v-527e8d26]{flex:none;width:unset}.columns.is-mobile>.column.is-full[data-v-527e8d26]{flex:none;width:100%}.columns.is-mobile>.column.is-three-quarters[data-v-527e8d26]{flex:none;width:75%}.columns.is-mobile>.column.is-two-thirds[data-v-527e8d26]{flex:none;width:66.6666%}.columns.is-mobile>.column.is-half[data-v-527e8d26]{flex:none;width:50%}.columns.is-mobile>.column.is-one-third[data-v-527e8d26]{flex:none;width:33.3333%}.columns.is-mobile>.column.is-one-quarter[data-v-527e8d26]{flex:none;width:25%}.columns.is-mobile>.column.is-one-fifth[data-v-527e8d26]{flex:none;width:20%}.columns.is-mobile>.column.is-two-fifths[data-v-527e8d26]{flex:none;width:40%}.columns.is-mobile>.column.is-three-fifths[data-v-527e8d26]{flex:none;width:60%}.columns.is-mobile>.column.is-four-fifths[data-v-527e8d26]{flex:none;width:80%}.columns.is-mobile>.column.is-offset-three-quarters[data-v-527e8d26]{margin-left:75%}.columns.is-mobile>.column.is-offset-two-thirds[data-v-527e8d26]{margin-left:66.6666%}.columns.is-mobile>.column.is-offset-half[data-v-527e8d26]{margin-left:50%}.columns.is-mobile>.column.is-offset-one-third[data-v-527e8d26]{margin-left:33.3333%}.columns.is-mobile>.column.is-offset-one-quarter[data-v-527e8d26]{margin-left:25%}.columns.is-mobile>.column.is-offset-one-fifth[data-v-527e8d26]{margin-left:20%}.columns.is-mobile>.column.is-offset-two-fifths[data-v-527e8d26]{margin-left:40%}.columns.is-mobile>.column.is-offset-three-fifths[data-v-527e8d26]{margin-left:60%}.columns.is-mobile>.column.is-offset-four-fifths[data-v-527e8d26]{margin-left:80%}.columns.is-mobile>.column.is-0[data-v-527e8d26]{flex:none;width:0%}.columns.is-mobile>.column.is-offset-0[data-v-527e8d26]{margin-left:0%}.columns.is-mobile>.column.is-1[data-v-527e8d26]{flex:none;width:8.33333%}.columns.is-mobile>.column.is-offset-1[data-v-527e8d26]{margin-left:8.33333%}.columns.is-mobile>.column.is-2[data-v-527e8d26]{flex:none;width:16.66667%}.columns.is-mobile>.column.is-offset-2[data-v-527e8d26]{margin-left:16.66667%}.columns.is-mobile>.column.is-3[data-v-527e8d26]{flex:none;width:25%}.columns.is-mobile>.column.is-offset-3[data-v-527e8d26]{margin-left:25%}.columns.is-mobile>.column.is-4[data-v-527e8d26]{flex:none;width:33.33333%}.columns.is-mobile>.column.is-offset-4[data-v-527e8d26]{margin-left:33.33333%}.columns.is-mobile>.column.is-5[data-v-527e8d26]{flex:none;width:41.66667%}.columns.is-mobile>.column.is-offset-5[data-v-527e8d26]{margin-left:41.66667%}.columns.is-mobile>.column.is-6[data-v-527e8d26]{flex:none;width:50%}.columns.is-mobile>.column.is-offset-6[data-v-527e8d26]{margin-left:50%}.columns.is-mobile>.column.is-7[data-v-527e8d26]{flex:none;width:58.33333%}.columns.is-mobile>.column.is-offset-7[data-v-527e8d26]{margin-left:58.33333%}.columns.is-mobile>.column.is-8[data-v-527e8d26]{flex:none;width:66.66667%}.columns.is-mobile>.column.is-offset-8[data-v-527e8d26]{margin-left:66.66667%}.columns.is-mobile>.column.is-9[data-v-527e8d26]{flex:none;width:75%}.columns.is-mobile>.column.is-offset-9[data-v-527e8d26]{margin-left:75%}.columns.is-mobile>.column.is-10[data-v-527e8d26]{flex:none;width:83.33333%}.columns.is-mobile>.column.is-offset-10[data-v-527e8d26]{margin-left:83.33333%}.columns.is-mobile>.column.is-11[data-v-527e8d26]{flex:none;width:91.66667%}.columns.is-mobile>.column.is-offset-11[data-v-527e8d26]{margin-left:91.66667%}.columns.is-mobile>.column.is-12[data-v-527e8d26]{flex:none;width:100%}.columns.is-mobile>.column.is-offset-12[data-v-527e8d26]{margin-left:100%}@media screen and (max-width: 768px){.column.is-narrow-mobile[data-v-527e8d26]{flex:none;width:unset}.column.is-full-mobile[data-v-527e8d26]{flex:none;width:100%}.column.is-three-quarters-mobile[data-v-527e8d26]{flex:none;width:75%}.column.is-two-thirds-mobile[data-v-527e8d26]{flex:none;width:66.6666%}.column.is-half-mobile[data-v-527e8d26]{flex:none;width:50%}.column.is-one-third-mobile[data-v-527e8d26]{flex:none;width:33.3333%}.column.is-one-quarter-mobile[data-v-527e8d26]{flex:none;width:25%}.column.is-one-fifth-mobile[data-v-527e8d26]{flex:none;width:20%}.column.is-two-fifths-mobile[data-v-527e8d26]{flex:none;width:40%}.column.is-three-fifths-mobile[data-v-527e8d26]{flex:none;width:60%}.column.is-four-fifths-mobile[data-v-527e8d26]{flex:none;width:80%}.column.is-offset-three-quarters-mobile[data-v-527e8d26]{margin-left:75%}.column.is-offset-two-thirds-mobile[data-v-527e8d26]{margin-left:66.6666%}.column.is-offset-half-mobile[data-v-527e8d26]{margin-left:50%}.column.is-offset-one-third-mobile[data-v-527e8d26]{margin-left:33.3333%}.column.is-offset-one-quarter-mobile[data-v-527e8d26]{margin-left:25%}.column.is-offset-one-fifth-mobile[data-v-527e8d26]{margin-left:20%}.column.is-offset-two-fifths-mobile[data-v-527e8d26]{margin-left:40%}.column.is-offset-three-fifths-mobile[data-v-527e8d26]{margin-left:60%}.column.is-offset-four-fifths-mobile[data-v-527e8d26]{margin-left:80%}.column.is-0-mobile[data-v-527e8d26]{flex:none;width:0%}.column.is-offset-0-mobile[data-v-527e8d26]{margin-left:0%}.column.is-1-mobile[data-v-527e8d26]{flex:none;width:8.33333%}.column.is-offset-1-mobile[data-v-527e8d26]{margin-left:8.33333%}.column.is-2-mobile[data-v-527e8d26]{flex:none;width:16.66667%}.column.is-offset-2-mobile[data-v-527e8d26]{margin-left:16.66667%}.column.is-3-mobile[data-v-527e8d26]{flex:none;width:25%}.column.is-offset-3-mobile[data-v-527e8d26]{margin-left:25%}.column.is-4-mobile[data-v-527e8d26]{flex:none;width:33.33333%}.column.is-offset-4-mobile[data-v-527e8d26]{margin-left:33.33333%}.column.is-5-mobile[data-v-527e8d26]{flex:none;width:41.66667%}.column.is-offset-5-mobile[data-v-527e8d26]{margin-left:41.66667%}.column.is-6-mobile[data-v-527e8d26]{flex:none;width:50%}.column.is-offset-6-mobile[data-v-527e8d26]{margin-left:50%}.column.is-7-mobile[data-v-527e8d26]{flex:none;width:58.33333%}.column.is-offset-7-mobile[data-v-527e8d26]{margin-left:58.33333%}.column.is-8-mobile[data-v-527e8d26]{flex:none;width:66.66667%}.column.is-offset-8-mobile[data-v-527e8d26]{margin-left:66.66667%}.column.is-9-mobile[data-v-527e8d26]{flex:none;width:75%}.column.is-offset-9-mobile[data-v-527e8d26]{margin-left:75%}.column.is-10-mobile[data-v-527e8d26]{flex:none;width:83.33333%}.column.is-offset-10-mobile[data-v-527e8d26]{margin-left:83.33333%}.column.is-11-mobile[data-v-527e8d26]{flex:none;width:91.66667%}.column.is-offset-11-mobile[data-v-527e8d26]{margin-left:91.66667%}.column.is-12-mobile[data-v-527e8d26]{flex:none;width:100%}.column.is-offset-12-mobile[data-v-527e8d26]{margin-left:100%}}@media screen and (min-width: 769px),print{.column.is-narrow[data-v-527e8d26],.column.is-narrow-tablet[data-v-527e8d26]{flex:none;width:unset}.column.is-full[data-v-527e8d26],.column.is-full-tablet[data-v-527e8d26]{flex:none;width:100%}.column.is-three-quarters[data-v-527e8d26],.column.is-three-quarters-tablet[data-v-527e8d26]{flex:none;width:75%}.column.is-two-thirds[data-v-527e8d26],.column.is-two-thirds-tablet[data-v-527e8d26]{flex:none;width:66.6666%}.column.is-half[data-v-527e8d26],.column.is-half-tablet[data-v-527e8d26]{flex:none;width:50%}.column.is-one-third[data-v-527e8d26],.column.is-one-third-tablet[data-v-527e8d26]{flex:none;width:33.3333%}.column.is-one-quarter[data-v-527e8d26],.column.is-one-quarter-tablet[data-v-527e8d26]{flex:none;width:25%}.column.is-one-fifth[data-v-527e8d26],.column.is-one-fifth-tablet[data-v-527e8d26]{flex:none;width:20%}.column.is-two-fifths[data-v-527e8d26],.column.is-two-fifths-tablet[data-v-527e8d26]{flex:none;width:40%}.column.is-three-fifths[data-v-527e8d26],.column.is-three-fifths-tablet[data-v-527e8d26]{flex:none;width:60%}.column.is-four-fifths[data-v-527e8d26],.column.is-four-fifths-tablet[data-v-527e8d26]{flex:none;width:80%}.column.is-offset-three-quarters[data-v-527e8d26],.column.is-offset-three-quarters-tablet[data-v-527e8d26]{margin-left:75%}.column.is-offset-two-thirds[data-v-527e8d26],.column.is-offset-two-thirds-tablet[data-v-527e8d26]{margin-left:66.6666%}.column.is-offset-half[data-v-527e8d26],.column.is-offset-half-tablet[data-v-527e8d26]{margin-left:50%}.column.is-offset-one-third[data-v-527e8d26],.column.is-offset-one-third-tablet[data-v-527e8d26]{margin-left:33.3333%}.column.is-offset-one-quarter[data-v-527e8d26],.column.is-offset-one-quarter-tablet[data-v-527e8d26]{margin-left:25%}.column.is-offset-one-fifth[data-v-527e8d26],.column.is-offset-one-fifth-tablet[data-v-527e8d26]{margin-left:20%}.column.is-offset-two-fifths[data-v-527e8d26],.column.is-offset-two-fifths-tablet[data-v-527e8d26]{margin-left:40%}.column.is-offset-three-fifths[data-v-527e8d26],.column.is-offset-three-fifths-tablet[data-v-527e8d26]{margin-left:60%}.column.is-offset-four-fifths[data-v-527e8d26],.column.is-offset-four-fifths-tablet[data-v-527e8d26]{margin-left:80%}.column.is-0[data-v-527e8d26],.column.is-0-tablet[data-v-527e8d26]{flex:none;width:0%}.column.is-offset-0[data-v-527e8d26],.column.is-offset-0-tablet[data-v-527e8d26]{margin-left:0%}.column.is-1[data-v-527e8d26],.column.is-1-tablet[data-v-527e8d26]{flex:none;width:8.33333%}.column.is-offset-1[data-v-527e8d26],.column.is-offset-1-tablet[data-v-527e8d26]{margin-left:8.33333%}.column.is-2[data-v-527e8d26],.column.is-2-tablet[data-v-527e8d26]{flex:none;width:16.66667%}.column.is-offset-2[data-v-527e8d26],.column.is-offset-2-tablet[data-v-527e8d26]{margin-left:16.66667%}.column.is-3[data-v-527e8d26],.column.is-3-tablet[data-v-527e8d26]{flex:none;width:25%}.column.is-offset-3[data-v-527e8d26],.column.is-offset-3-tablet[data-v-527e8d26]{margin-left:25%}.column.is-4[data-v-527e8d26],.column.is-4-tablet[data-v-527e8d26]{flex:none;width:33.33333%}.column.is-offset-4[data-v-527e8d26],.column.is-offset-4-tablet[data-v-527e8d26]{margin-left:33.33333%}.column.is-5[data-v-527e8d26],.column.is-5-tablet[data-v-527e8d26]{flex:none;width:41.66667%}.column.is-offset-5[data-v-527e8d26],.column.is-offset-5-tablet[data-v-527e8d26]{margin-left:41.66667%}.column.is-6[data-v-527e8d26],.column.is-6-tablet[data-v-527e8d26]{flex:none;width:50%}.column.is-offset-6[data-v-527e8d26],.column.is-offset-6-tablet[data-v-527e8d26]{margin-left:50%}.column.is-7[data-v-527e8d26],.column.is-7-tablet[data-v-527e8d26]{flex:none;width:58.33333%}.column.is-offset-7[data-v-527e8d26],.column.is-offset-7-tablet[data-v-527e8d26]{margin-left:58.33333%}.column.is-8[data-v-527e8d26],.column.is-8-tablet[data-v-527e8d26]{flex:none;width:66.66667%}.column.is-offset-8[data-v-527e8d26],.column.is-offset-8-tablet[data-v-527e8d26]{margin-left:66.66667%}.column.is-9[data-v-527e8d26],.column.is-9-tablet[data-v-527e8d26]{flex:none;width:75%}.column.is-offset-9[data-v-527e8d26],.column.is-offset-9-tablet[data-v-527e8d26]{margin-left:75%}.column.is-10[data-v-527e8d26],.column.is-10-tablet[data-v-527e8d26]{flex:none;width:83.33333%}.column.is-offset-10[data-v-527e8d26],.column.is-offset-10-tablet[data-v-527e8d26]{margin-left:83.33333%}.column.is-11[data-v-527e8d26],.column.is-11-tablet[data-v-527e8d26]{flex:none;width:91.66667%}.column.is-offset-11[data-v-527e8d26],.column.is-offset-11-tablet[data-v-527e8d26]{margin-left:91.66667%}.column.is-12[data-v-527e8d26],.column.is-12-tablet[data-v-527e8d26]{flex:none;width:100%}.column.is-offset-12[data-v-527e8d26],.column.is-offset-12-tablet[data-v-527e8d26]{margin-left:100%}}@media screen and (max-width: 1023px){.column.is-narrow-touch[data-v-527e8d26]{flex:none;width:unset}.column.is-full-touch[data-v-527e8d26]{flex:none;width:100%}.column.is-three-quarters-touch[data-v-527e8d26]{flex:none;width:75%}.column.is-two-thirds-touch[data-v-527e8d26]{flex:none;width:66.6666%}.column.is-half-touch[data-v-527e8d26]{flex:none;width:50%}.column.is-one-third-touch[data-v-527e8d26]{flex:none;width:33.3333%}.column.is-one-quarter-touch[data-v-527e8d26]{flex:none;width:25%}.column.is-one-fifth-touch[data-v-527e8d26]{flex:none;width:20%}.column.is-two-fifths-touch[data-v-527e8d26]{flex:none;width:40%}.column.is-three-fifths-touch[data-v-527e8d26]{flex:none;width:60%}.column.is-four-fifths-touch[data-v-527e8d26]{flex:none;width:80%}.column.is-offset-three-quarters-touch[data-v-527e8d26]{margin-left:75%}.column.is-offset-two-thirds-touch[data-v-527e8d26]{margin-left:66.6666%}.column.is-offset-half-touch[data-v-527e8d26]{margin-left:50%}.column.is-offset-one-third-touch[data-v-527e8d26]{margin-left:33.3333%}.column.is-offset-one-quarter-touch[data-v-527e8d26]{margin-left:25%}.column.is-offset-one-fifth-touch[data-v-527e8d26]{margin-left:20%}.column.is-offset-two-fifths-touch[data-v-527e8d26]{margin-left:40%}.column.is-offset-three-fifths-touch[data-v-527e8d26]{margin-left:60%}.column.is-offset-four-fifths-touch[data-v-527e8d26]{margin-left:80%}.column.is-0-touch[data-v-527e8d26]{flex:none;width:0%}.column.is-offset-0-touch[data-v-527e8d26]{margin-left:0%}.column.is-1-touch[data-v-527e8d26]{flex:none;width:8.33333%}.column.is-offset-1-touch[data-v-527e8d26]{margin-left:8.33333%}.column.is-2-touch[data-v-527e8d26]{flex:none;width:16.66667%}.column.is-offset-2-touch[data-v-527e8d26]{margin-left:16.66667%}.column.is-3-touch[data-v-527e8d26]{flex:none;width:25%}.column.is-offset-3-touch[data-v-527e8d26]{margin-left:25%}.column.is-4-touch[data-v-527e8d26]{flex:none;width:33.33333%}.column.is-offset-4-touch[data-v-527e8d26]{margin-left:33.33333%}.column.is-5-touch[data-v-527e8d26]{flex:none;width:41.66667%}.column.is-offset-5-touch[data-v-527e8d26]{margin-left:41.66667%}.column.is-6-touch[data-v-527e8d26]{flex:none;width:50%}.column.is-offset-6-touch[data-v-527e8d26]{margin-left:50%}.column.is-7-touch[data-v-527e8d26]{flex:none;width:58.33333%}.column.is-offset-7-touch[data-v-527e8d26]{margin-left:58.33333%}.column.is-8-touch[data-v-527e8d26]{flex:none;width:66.66667%}.column.is-offset-8-touch[data-v-527e8d26]{margin-left:66.66667%}.column.is-9-touch[data-v-527e8d26]{flex:none;width:75%}.column.is-offset-9-touch[data-v-527e8d26]{margin-left:75%}.column.is-10-touch[data-v-527e8d26]{flex:none;width:83.33333%}.column.is-offset-10-touch[data-v-527e8d26]{margin-left:83.33333%}.column.is-11-touch[data-v-527e8d26]{flex:none;width:91.66667%}.column.is-offset-11-touch[data-v-527e8d26]{margin-left:91.66667%}.column.is-12-touch[data-v-527e8d26]{flex:none;width:100%}.column.is-offset-12-touch[data-v-527e8d26]{margin-left:100%}}@media screen and (min-width: 1024px){.column.is-narrow-desktop[data-v-527e8d26]{flex:none;width:unset}.column.is-full-desktop[data-v-527e8d26]{flex:none;width:100%}.column.is-three-quarters-desktop[data-v-527e8d26]{flex:none;width:75%}.column.is-two-thirds-desktop[data-v-527e8d26]{flex:none;width:66.6666%}.column.is-half-desktop[data-v-527e8d26]{flex:none;width:50%}.column.is-one-third-desktop[data-v-527e8d26]{flex:none;width:33.3333%}.column.is-one-quarter-desktop[data-v-527e8d26]{flex:none;width:25%}.column.is-one-fifth-desktop[data-v-527e8d26]{flex:none;width:20%}.column.is-two-fifths-desktop[data-v-527e8d26]{flex:none;width:40%}.column.is-three-fifths-desktop[data-v-527e8d26]{flex:none;width:60%}.column.is-four-fifths-desktop[data-v-527e8d26]{flex:none;width:80%}.column.is-offset-three-quarters-desktop[data-v-527e8d26]{margin-left:75%}.column.is-offset-two-thirds-desktop[data-v-527e8d26]{margin-left:66.6666%}.column.is-offset-half-desktop[data-v-527e8d26]{margin-left:50%}.column.is-offset-one-third-desktop[data-v-527e8d26]{margin-left:33.3333%}.column.is-offset-one-quarter-desktop[data-v-527e8d26]{margin-left:25%}.column.is-offset-one-fifth-desktop[data-v-527e8d26]{margin-left:20%}.column.is-offset-two-fifths-desktop[data-v-527e8d26]{margin-left:40%}.column.is-offset-three-fifths-desktop[data-v-527e8d26]{margin-left:60%}.column.is-offset-four-fifths-desktop[data-v-527e8d26]{margin-left:80%}.column.is-0-desktop[data-v-527e8d26]{flex:none;width:0%}.column.is-offset-0-desktop[data-v-527e8d26]{margin-left:0%}.column.is-1-desktop[data-v-527e8d26]{flex:none;width:8.33333%}.column.is-offset-1-desktop[data-v-527e8d26]{margin-left:8.33333%}.column.is-2-desktop[data-v-527e8d26]{flex:none;width:16.66667%}.column.is-offset-2-desktop[data-v-527e8d26]{margin-left:16.66667%}.column.is-3-desktop[data-v-527e8d26]{flex:none;width:25%}.column.is-offset-3-desktop[data-v-527e8d26]{margin-left:25%}.column.is-4-desktop[data-v-527e8d26]{flex:none;width:33.33333%}.column.is-offset-4-desktop[data-v-527e8d26]{margin-left:33.33333%}.column.is-5-desktop[data-v-527e8d26]{flex:none;width:41.66667%}.column.is-offset-5-desktop[data-v-527e8d26]{margin-left:41.66667%}.column.is-6-desktop[data-v-527e8d26]{flex:none;width:50%}.column.is-offset-6-desktop[data-v-527e8d26]{margin-left:50%}.column.is-7-desktop[data-v-527e8d26]{flex:none;width:58.33333%}.column.is-offset-7-desktop[data-v-527e8d26]{margin-left:58.33333%}.column.is-8-desktop[data-v-527e8d26]{flex:none;width:66.66667%}.column.is-offset-8-desktop[data-v-527e8d26]{margin-left:66.66667%}.column.is-9-desktop[data-v-527e8d26]{flex:none;width:75%}.column.is-offset-9-desktop[data-v-527e8d26]{margin-left:75%}.column.is-10-desktop[data-v-527e8d26]{flex:none;width:83.33333%}.column.is-offset-10-desktop[data-v-527e8d26]{margin-left:83.33333%}.column.is-11-desktop[data-v-527e8d26]{flex:none;width:91.66667%}.column.is-offset-11-desktop[data-v-527e8d26]{margin-left:91.66667%}.column.is-12-desktop[data-v-527e8d26]{flex:none;width:100%}.column.is-offset-12-desktop[data-v-527e8d26]{margin-left:100%}}@media screen and (min-width: 1216px){.column.is-narrow-widescreen[data-v-527e8d26]{flex:none;width:unset}.column.is-full-widescreen[data-v-527e8d26]{flex:none;width:100%}.column.is-three-quarters-widescreen[data-v-527e8d26]{flex:none;width:75%}.column.is-two-thirds-widescreen[data-v-527e8d26]{flex:none;width:66.6666%}.column.is-half-widescreen[data-v-527e8d26]{flex:none;width:50%}.column.is-one-third-widescreen[data-v-527e8d26]{flex:none;width:33.3333%}.column.is-one-quarter-widescreen[data-v-527e8d26]{flex:none;width:25%}.column.is-one-fifth-widescreen[data-v-527e8d26]{flex:none;width:20%}.column.is-two-fifths-widescreen[data-v-527e8d26]{flex:none;width:40%}.column.is-three-fifths-widescreen[data-v-527e8d26]{flex:none;width:60%}.column.is-four-fifths-widescreen[data-v-527e8d26]{flex:none;width:80%}.column.is-offset-three-quarters-widescreen[data-v-527e8d26]{margin-left:75%}.column.is-offset-two-thirds-widescreen[data-v-527e8d26]{margin-left:66.6666%}.column.is-offset-half-widescreen[data-v-527e8d26]{margin-left:50%}.column.is-offset-one-third-widescreen[data-v-527e8d26]{margin-left:33.3333%}.column.is-offset-one-quarter-widescreen[data-v-527e8d26]{margin-left:25%}.column.is-offset-one-fifth-widescreen[data-v-527e8d26]{margin-left:20%}.column.is-offset-two-fifths-widescreen[data-v-527e8d26]{margin-left:40%}.column.is-offset-three-fifths-widescreen[data-v-527e8d26]{margin-left:60%}.column.is-offset-four-fifths-widescreen[data-v-527e8d26]{margin-left:80%}.column.is-0-widescreen[data-v-527e8d26]{flex:none;width:0%}.column.is-offset-0-widescreen[data-v-527e8d26]{margin-left:0%}.column.is-1-widescreen[data-v-527e8d26]{flex:none;width:8.33333%}.column.is-offset-1-widescreen[data-v-527e8d26]{margin-left:8.33333%}.column.is-2-widescreen[data-v-527e8d26]{flex:none;width:16.66667%}.column.is-offset-2-widescreen[data-v-527e8d26]{margin-left:16.66667%}.column.is-3-widescreen[data-v-527e8d26]{flex:none;width:25%}.column.is-offset-3-widescreen[data-v-527e8d26]{margin-left:25%}.column.is-4-widescreen[data-v-527e8d26]{flex:none;width:33.33333%}.column.is-offset-4-widescreen[data-v-527e8d26]{margin-left:33.33333%}.column.is-5-widescreen[data-v-527e8d26]{flex:none;width:41.66667%}.column.is-offset-5-widescreen[data-v-527e8d26]{margin-left:41.66667%}.column.is-6-widescreen[data-v-527e8d26]{flex:none;width:50%}.column.is-offset-6-widescreen[data-v-527e8d26]{margin-left:50%}.column.is-7-widescreen[data-v-527e8d26]{flex:none;width:58.33333%}.column.is-offset-7-widescreen[data-v-527e8d26]{margin-left:58.33333%}.column.is-8-widescreen[data-v-527e8d26]{flex:none;width:66.66667%}.column.is-offset-8-widescreen[data-v-527e8d26]{margin-left:66.66667%}.column.is-9-widescreen[data-v-527e8d26]{flex:none;width:75%}.column.is-offset-9-widescreen[data-v-527e8d26]{margin-left:75%}.column.is-10-widescreen[data-v-527e8d26]{flex:none;width:83.33333%}.column.is-offset-10-widescreen[data-v-527e8d26]{margin-left:83.33333%}.column.is-11-widescreen[data-v-527e8d26]{flex:none;width:91.66667%}.column.is-offset-11-widescreen[data-v-527e8d26]{margin-left:91.66667%}.column.is-12-widescreen[data-v-527e8d26]{flex:none;width:100%}.column.is-offset-12-widescreen[data-v-527e8d26]{margin-left:100%}}@media screen and (min-width: 1408px){.column.is-narrow-fullhd[data-v-527e8d26]{flex:none;width:unset}.column.is-full-fullhd[data-v-527e8d26]{flex:none;width:100%}.column.is-three-quarters-fullhd[data-v-527e8d26]{flex:none;width:75%}.column.is-two-thirds-fullhd[data-v-527e8d26]{flex:none;width:66.6666%}.column.is-half-fullhd[data-v-527e8d26]{flex:none;width:50%}.column.is-one-third-fullhd[data-v-527e8d26]{flex:none;width:33.3333%}.column.is-one-quarter-fullhd[data-v-527e8d26]{flex:none;width:25%}.column.is-one-fifth-fullhd[data-v-527e8d26]{flex:none;width:20%}.column.is-two-fifths-fullhd[data-v-527e8d26]{flex:none;width:40%}.column.is-three-fifths-fullhd[data-v-527e8d26]{flex:none;width:60%}.column.is-four-fifths-fullhd[data-v-527e8d26]{flex:none;width:80%}.column.is-offset-three-quarters-fullhd[data-v-527e8d26]{margin-left:75%}.column.is-offset-two-thirds-fullhd[data-v-527e8d26]{margin-left:66.6666%}.column.is-offset-half-fullhd[data-v-527e8d26]{margin-left:50%}.column.is-offset-one-third-fullhd[data-v-527e8d26]{margin-left:33.3333%}.column.is-offset-one-quarter-fullhd[data-v-527e8d26]{margin-left:25%}.column.is-offset-one-fifth-fullhd[data-v-527e8d26]{margin-left:20%}.column.is-offset-two-fifths-fullhd[data-v-527e8d26]{margin-left:40%}.column.is-offset-three-fifths-fullhd[data-v-527e8d26]{margin-left:60%}.column.is-offset-four-fifths-fullhd[data-v-527e8d26]{margin-left:80%}.column.is-0-fullhd[data-v-527e8d26]{flex:none;width:0%}.column.is-offset-0-fullhd[data-v-527e8d26]{margin-left:0%}.column.is-1-fullhd[data-v-527e8d26]{flex:none;width:8.33333%}.column.is-offset-1-fullhd[data-v-527e8d26]{margin-left:8.33333%}.column.is-2-fullhd[data-v-527e8d26]{flex:none;width:16.66667%}.column.is-offset-2-fullhd[data-v-527e8d26]{margin-left:16.66667%}.column.is-3-fullhd[data-v-527e8d26]{flex:none;width:25%}.column.is-offset-3-fullhd[data-v-527e8d26]{margin-left:25%}.column.is-4-fullhd[data-v-527e8d26]{flex:none;width:33.33333%}.column.is-offset-4-fullhd[data-v-527e8d26]{margin-left:33.33333%}.column.is-5-fullhd[data-v-527e8d26]{flex:none;width:41.66667%}.column.is-offset-5-fullhd[data-v-527e8d26]{margin-left:41.66667%}.column.is-6-fullhd[data-v-527e8d26]{flex:none;width:50%}.column.is-offset-6-fullhd[data-v-527e8d26]{margin-left:50%}.column.is-7-fullhd[data-v-527e8d26]{flex:none;width:58.33333%}.column.is-offset-7-fullhd[data-v-527e8d26]{margin-left:58.33333%}.column.is-8-fullhd[data-v-527e8d26]{flex:none;width:66.66667%}.column.is-offset-8-fullhd[data-v-527e8d26]{margin-left:66.66667%}.column.is-9-fullhd[data-v-527e8d26]{flex:none;width:75%}.column.is-offset-9-fullhd[data-v-527e8d26]{margin-left:75%}.column.is-10-fullhd[data-v-527e8d26]{flex:none;width:83.33333%}.column.is-offset-10-fullhd[data-v-527e8d26]{margin-left:83.33333%}.column.is-11-fullhd[data-v-527e8d26]{flex:none;width:91.66667%}.column.is-offset-11-fullhd[data-v-527e8d26]{margin-left:91.66667%}.column.is-12-fullhd[data-v-527e8d26]{flex:none;width:100%}.column.is-offset-12-fullhd[data-v-527e8d26]{margin-left:100%}}.columns[data-v-527e8d26]{margin-left:-.75rem;margin-right:-.75rem;margin-top:-.75rem}.columns[data-v-527e8d26]:last-child{margin-bottom:-.75rem}.columns[data-v-527e8d26]:not(:last-child){margin-bottom:.75rem}.columns.is-centered[data-v-527e8d26]{justify-content:center}.columns.is-gapless[data-v-527e8d26]{margin-left:0;margin-right:0;margin-top:0}.columns.is-gapless>.column[data-v-527e8d26]{margin:0;padding:0!important}.columns.is-gapless[data-v-527e8d26]:not(:last-child){margin-bottom:1.5rem}.columns.is-gapless[data-v-527e8d26]:last-child{margin-bottom:0}.columns.is-mobile[data-v-527e8d26]{display:flex}.columns.is-multiline[data-v-527e8d26]{flex-wrap:wrap}.columns.is-vcentered[data-v-527e8d26]{align-items:center}@media screen and (min-width: 769px),print{.columns[data-v-527e8d26]:not(.is-desktop){display:flex}}@media screen and (min-width: 1024px){.columns.is-desktop[data-v-527e8d26]{display:flex}}.columns.is-variable[data-v-527e8d26]{--columnGap: .75rem;margin-left:calc(-1 * var(--columnGap));margin-right:calc(-1 * var(--columnGap))}.columns.is-variable>.column[data-v-527e8d26]{padding-left:var(--columnGap);padding-right:var(--columnGap)}.columns.is-variable.is-0[data-v-527e8d26]{--columnGap: 0rem}@media screen and (max-width: 768px){.columns.is-variable.is-0-mobile[data-v-527e8d26]{--columnGap: 0rem}}@media screen and (min-width: 769px),print{.columns.is-variable.is-0-tablet[data-v-527e8d26]{--columnGap: 0rem}}@media screen and (min-width: 769px) and (max-width: 1023px){.columns.is-variable.is-0-tablet-only[data-v-527e8d26]{--columnGap: 0rem}}@media screen and (max-width: 1023px){.columns.is-variable.is-0-touch[data-v-527e8d26]{--columnGap: 0rem}}@media screen and (min-width: 1024px){.columns.is-variable.is-0-desktop[data-v-527e8d26]{--columnGap: 0rem}}@media screen and (min-width: 1024px) and (max-width: 1215px){.columns.is-variable.is-0-desktop-only[data-v-527e8d26]{--columnGap: 0rem}}@media screen and (min-width: 1216px){.columns.is-variable.is-0-widescreen[data-v-527e8d26]{--columnGap: 0rem}}@media screen and (min-width: 1216px) and (max-width: 1407px){.columns.is-variable.is-0-widescreen-only[data-v-527e8d26]{--columnGap: 0rem}}@media screen and (min-width: 1408px){.columns.is-variable.is-0-fullhd[data-v-527e8d26]{--columnGap: 0rem}}.columns.is-variable.is-1[data-v-527e8d26]{--columnGap: .25rem}@media screen and (max-width: 768px){.columns.is-variable.is-1-mobile[data-v-527e8d26]{--columnGap: .25rem}}@media screen and (min-width: 769px),print{.columns.is-variable.is-1-tablet[data-v-527e8d26]{--columnGap: .25rem}}@media screen and (min-width: 769px) and (max-width: 1023px){.columns.is-variable.is-1-tablet-only[data-v-527e8d26]{--columnGap: .25rem}}@media screen and (max-width: 1023px){.columns.is-variable.is-1-touch[data-v-527e8d26]{--columnGap: .25rem}}@media screen and (min-width: 1024px){.columns.is-variable.is-1-desktop[data-v-527e8d26]{--columnGap: .25rem}}@media screen and (min-width: 1024px) and (max-width: 1215px){.columns.is-variable.is-1-desktop-only[data-v-527e8d26]{--columnGap: .25rem}}@media screen and (min-width: 1216px){.columns.is-variable.is-1-widescreen[data-v-527e8d26]{--columnGap: .25rem}}@media screen and (min-width: 1216px) and (max-width: 1407px){.columns.is-variable.is-1-widescreen-only[data-v-527e8d26]{--columnGap: .25rem}}@media screen and (min-width: 1408px){.columns.is-variable.is-1-fullhd[data-v-527e8d26]{--columnGap: .25rem}}.columns.is-variable.is-2[data-v-527e8d26]{--columnGap: .5rem}@media screen and (max-width: 768px){.columns.is-variable.is-2-mobile[data-v-527e8d26]{--columnGap: .5rem}}@media screen and (min-width: 769px),print{.columns.is-variable.is-2-tablet[data-v-527e8d26]{--columnGap: .5rem}}@media screen and (min-width: 769px) and (max-width: 1023px){.columns.is-variable.is-2-tablet-only[data-v-527e8d26]{--columnGap: .5rem}}@media screen and (max-width: 1023px){.columns.is-variable.is-2-touch[data-v-527e8d26]{--columnGap: .5rem}}@media screen and (min-width: 1024px){.columns.is-variable.is-2-desktop[data-v-527e8d26]{--columnGap: .5rem}}@media screen and (min-width: 1024px) and (max-width: 1215px){.columns.is-variable.is-2-desktop-only[data-v-527e8d26]{--columnGap: .5rem}}@media screen and (min-width: 1216px){.columns.is-variable.is-2-widescreen[data-v-527e8d26]{--columnGap: .5rem}}@media screen and (min-width: 1216px) and (max-width: 1407px){.columns.is-variable.is-2-widescreen-only[data-v-527e8d26]{--columnGap: .5rem}}@media screen and (min-width: 1408px){.columns.is-variable.is-2-fullhd[data-v-527e8d26]{--columnGap: .5rem}}.columns.is-variable.is-3[data-v-527e8d26]{--columnGap: .75rem}@media screen and (max-width: 768px){.columns.is-variable.is-3-mobile[data-v-527e8d26]{--columnGap: .75rem}}@media screen and (min-width: 769px),print{.columns.is-variable.is-3-tablet[data-v-527e8d26]{--columnGap: .75rem}}@media screen and (min-width: 769px) and (max-width: 1023px){.columns.is-variable.is-3-tablet-only[data-v-527e8d26]{--columnGap: .75rem}}@media screen and (max-width: 1023px){.columns.is-variable.is-3-touch[data-v-527e8d26]{--columnGap: .75rem}}@media screen and (min-width: 1024px){.columns.is-variable.is-3-desktop[data-v-527e8d26]{--columnGap: .75rem}}@media screen and (min-width: 1024px) and (max-width: 1215px){.columns.is-variable.is-3-desktop-only[data-v-527e8d26]{--columnGap: .75rem}}@media screen and (min-width: 1216px){.columns.is-variable.is-3-widescreen[data-v-527e8d26]{--columnGap: .75rem}}@media screen and (min-width: 1216px) and (max-width: 1407px){.columns.is-variable.is-3-widescreen-only[data-v-527e8d26]{--columnGap: .75rem}}@media screen and (min-width: 1408px){.columns.is-variable.is-3-fullhd[data-v-527e8d26]{--columnGap: .75rem}}.columns.is-variable.is-4[data-v-527e8d26]{--columnGap: 1rem}@media screen and (max-width: 768px){.columns.is-variable.is-4-mobile[data-v-527e8d26]{--columnGap: 1rem}}@media screen and (min-width: 769px),print{.columns.is-variable.is-4-tablet[data-v-527e8d26]{--columnGap: 1rem}}@media screen and (min-width: 769px) and (max-width: 1023px){.columns.is-variable.is-4-tablet-only[data-v-527e8d26]{--columnGap: 1rem}}@media screen and (max-width: 1023px){.columns.is-variable.is-4-touch[data-v-527e8d26]{--columnGap: 1rem}}@media screen and (min-width: 1024px){.columns.is-variable.is-4-desktop[data-v-527e8d26]{--columnGap: 1rem}}@media screen and (min-width: 1024px) and (max-width: 1215px){.columns.is-variable.is-4-desktop-only[data-v-527e8d26]{--columnGap: 1rem}}@media screen and (min-width: 1216px){.columns.is-variable.is-4-widescreen[data-v-527e8d26]{--columnGap: 1rem}}@media screen and (min-width: 1216px) and (max-width: 1407px){.columns.is-variable.is-4-widescreen-only[data-v-527e8d26]{--columnGap: 1rem}}@media screen and (min-width: 1408px){.columns.is-variable.is-4-fullhd[data-v-527e8d26]{--columnGap: 1rem}}.columns.is-variable.is-5[data-v-527e8d26]{--columnGap: 1.25rem}@media screen and (max-width: 768px){.columns.is-variable.is-5-mobile[data-v-527e8d26]{--columnGap: 1.25rem}}@media screen and (min-width: 769px),print{.columns.is-variable.is-5-tablet[data-v-527e8d26]{--columnGap: 1.25rem}}@media screen and (min-width: 769px) and (max-width: 1023px){.columns.is-variable.is-5-tablet-only[data-v-527e8d26]{--columnGap: 1.25rem}}@media screen and (max-width: 1023px){.columns.is-variable.is-5-touch[data-v-527e8d26]{--columnGap: 1.25rem}}@media screen and (min-width: 1024px){.columns.is-variable.is-5-desktop[data-v-527e8d26]{--columnGap: 1.25rem}}@media screen and (min-width: 1024px) and (max-width: 1215px){.columns.is-variable.is-5-desktop-only[data-v-527e8d26]{--columnGap: 1.25rem}}@media screen and (min-width: 1216px){.columns.is-variable.is-5-widescreen[data-v-527e8d26]{--columnGap: 1.25rem}}@media screen and (min-width: 1216px) and (max-width: 1407px){.columns.is-variable.is-5-widescreen-only[data-v-527e8d26]{--columnGap: 1.25rem}}@media screen and (min-width: 1408px){.columns.is-variable.is-5-fullhd[data-v-527e8d26]{--columnGap: 1.25rem}}.columns.is-variable.is-6[data-v-527e8d26]{--columnGap: 1.5rem}@media screen and (max-width: 768px){.columns.is-variable.is-6-mobile[data-v-527e8d26]{--columnGap: 1.5rem}}@media screen and (min-width: 769px),print{.columns.is-variable.is-6-tablet[data-v-527e8d26]{--columnGap: 1.5rem}}@media screen and (min-width: 769px) and (max-width: 1023px){.columns.is-variable.is-6-tablet-only[data-v-527e8d26]{--columnGap: 1.5rem}}@media screen and (max-width: 1023px){.columns.is-variable.is-6-touch[data-v-527e8d26]{--columnGap: 1.5rem}}@media screen and (min-width: 1024px){.columns.is-variable.is-6-desktop[data-v-527e8d26]{--columnGap: 1.5rem}}@media screen and (min-width: 1024px) and (max-width: 1215px){.columns.is-variable.is-6-desktop-only[data-v-527e8d26]{--columnGap: 1.5rem}}@media screen and (min-width: 1216px){.columns.is-variable.is-6-widescreen[data-v-527e8d26]{--columnGap: 1.5rem}}@media screen and (min-width: 1216px) and (max-width: 1407px){.columns.is-variable.is-6-widescreen-only[data-v-527e8d26]{--columnGap: 1.5rem}}@media screen and (min-width: 1408px){.columns.is-variable.is-6-fullhd[data-v-527e8d26]{--columnGap: 1.5rem}}.columns.is-variable.is-7[data-v-527e8d26]{--columnGap: 1.75rem}@media screen and (max-width: 768px){.columns.is-variable.is-7-mobile[data-v-527e8d26]{--columnGap: 1.75rem}}@media screen and (min-width: 769px),print{.columns.is-variable.is-7-tablet[data-v-527e8d26]{--columnGap: 1.75rem}}@media screen and (min-width: 769px) and (max-width: 1023px){.columns.is-variable.is-7-tablet-only[data-v-527e8d26]{--columnGap: 1.75rem}}@media screen and (max-width: 1023px){.columns.is-variable.is-7-touch[data-v-527e8d26]{--columnGap: 1.75rem}}@media screen and (min-width: 1024px){.columns.is-variable.is-7-desktop[data-v-527e8d26]{--columnGap: 1.75rem}}@media screen and (min-width: 1024px) and (max-width: 1215px){.columns.is-variable.is-7-desktop-only[data-v-527e8d26]{--columnGap: 1.75rem}}@media screen and (min-width: 1216px){.columns.is-variable.is-7-widescreen[data-v-527e8d26]{--columnGap: 1.75rem}}@media screen and (min-width: 1216px) and (max-width: 1407px){.columns.is-variable.is-7-widescreen-only[data-v-527e8d26]{--columnGap: 1.75rem}}@media screen and (min-width: 1408px){.columns.is-variable.is-7-fullhd[data-v-527e8d26]{--columnGap: 1.75rem}}.columns.is-variable.is-8[data-v-527e8d26]{--columnGap: 2rem}@media screen and (max-width: 768px){.columns.is-variable.is-8-mobile[data-v-527e8d26]{--columnGap: 2rem}}@media screen and (min-width: 769px),print{.columns.is-variable.is-8-tablet[data-v-527e8d26]{--columnGap: 2rem}}@media screen and (min-width: 769px) and (max-width: 1023px){.columns.is-variable.is-8-tablet-only[data-v-527e8d26]{--columnGap: 2rem}}@media screen and (max-width: 1023px){.columns.is-variable.is-8-touch[data-v-527e8d26]{--columnGap: 2rem}}@media screen and (min-width: 1024px){.columns.is-variable.is-8-desktop[data-v-527e8d26]{--columnGap: 2rem}}@media screen and (min-width: 1024px) and (max-width: 1215px){.columns.is-variable.is-8-desktop-only[data-v-527e8d26]{--columnGap: 2rem}}@media screen and (min-width: 1216px){.columns.is-variable.is-8-widescreen[data-v-527e8d26]{--columnGap: 2rem}}@media screen and (min-width: 1216px) and (max-width: 1407px){.columns.is-variable.is-8-widescreen-only[data-v-527e8d26]{--columnGap: 2rem}}@media screen and (min-width: 1408px){.columns.is-variable.is-8-fullhd[data-v-527e8d26]{--columnGap: 2rem}}.tile[data-v-527e8d26]{align-items:stretch;display:block;flex-basis:0;flex-grow:1;flex-shrink:1;min-height:-webkit-min-content;min-height:-moz-min-content;min-height:min-content}.tile.is-ancestor[data-v-527e8d26]{margin-left:-.75rem;margin-right:-.75rem;margin-top:-.75rem}.tile.is-ancestor[data-v-527e8d26]:last-child{margin-bottom:-.75rem}.tile.is-ancestor[data-v-527e8d26]:not(:last-child){margin-bottom:.75rem}.tile.is-child[data-v-527e8d26]{margin:0!important}.tile.is-parent[data-v-527e8d26]{padding:.75rem}.tile.is-vertical[data-v-527e8d26]{flex-direction:column}.tile.is-vertical>.tile.is-child[data-v-527e8d26]:not(:last-child){margin-bottom:1.5rem!important}@media screen and (min-width: 769px),print{.tile[data-v-527e8d26]:not(.is-child){display:flex}.tile.is-1[data-v-527e8d26]{flex:none;width:8.33333%}.tile.is-2[data-v-527e8d26]{flex:none;width:16.66667%}.tile.is-3[data-v-527e8d26]{flex:none;width:25%}.tile.is-4[data-v-527e8d26]{flex:none;width:33.33333%}.tile.is-5[data-v-527e8d26]{flex:none;width:41.66667%}.tile.is-6[data-v-527e8d26]{flex:none;width:50%}.tile.is-7[data-v-527e8d26]{flex:none;width:58.33333%}.tile.is-8[data-v-527e8d26]{flex:none;width:66.66667%}.tile.is-9[data-v-527e8d26]{flex:none;width:75%}.tile.is-10[data-v-527e8d26]{flex:none;width:83.33333%}.tile.is-11[data-v-527e8d26]{flex:none;width:91.66667%}.tile.is-12[data-v-527e8d26]{flex:none;width:100%}}.has-text-white[data-v-527e8d26]{color:#fff!important}a.has-text-white[data-v-527e8d26]:hover,a.has-text-white[data-v-527e8d26]:focus{color:#e6e6e6!important}.has-background-white[data-v-527e8d26]{background-color:#fff!important}.has-text-black[data-v-527e8d26]{color:#0a0a0a!important}a.has-text-black[data-v-527e8d26]:hover,a.has-text-black[data-v-527e8d26]:focus{color:#000!important}.has-background-black[data-v-527e8d26]{background-color:#0a0a0a!important}.has-text-light[data-v-527e8d26]{color:#f5f5f5!important}a.has-text-light[data-v-527e8d26]:hover,a.has-text-light[data-v-527e8d26]:focus{color:#dbdbdb!important}.has-background-light[data-v-527e8d26]{background-color:#f5f5f5!important}.has-text-dark[data-v-527e8d26]{color:#363636!important}a.has-text-dark[data-v-527e8d26]:hover,a.has-text-dark[data-v-527e8d26]:focus{color:#1c1c1c!important}.has-background-dark[data-v-527e8d26]{background-color:#363636!important}.has-text-primary[data-v-527e8d26]{color:#00d1b2!important}a.has-text-primary[data-v-527e8d26]:hover,a.has-text-primary[data-v-527e8d26]:focus{color:#009e86!important}.has-background-primary[data-v-527e8d26]{background-color:#00d1b2!important}.has-text-primary-light[data-v-527e8d26]{color:#ebfffc!important}a.has-text-primary-light[data-v-527e8d26]:hover,a.has-text-primary-light[data-v-527e8d26]:focus{color:#b8fff4!important}.has-background-primary-light[data-v-527e8d26]{background-color:#ebfffc!important}.has-text-primary-dark[data-v-527e8d26]{color:#00947e!important}a.has-text-primary-dark[data-v-527e8d26]:hover,a.has-text-primary-dark[data-v-527e8d26]:focus{color:#00c7a9!important}.has-background-primary-dark[data-v-527e8d26]{background-color:#00947e!important}.has-text-link[data-v-527e8d26]{color:#485fc7!important}a.has-text-link[data-v-527e8d26]:hover,a.has-text-link[data-v-527e8d26]:focus{color:#3449a8!important}.has-background-link[data-v-527e8d26]{background-color:#485fc7!important}.has-text-link-light[data-v-527e8d26]{color:#eff1fa!important}a.has-text-link-light[data-v-527e8d26]:hover,a.has-text-link-light[data-v-527e8d26]:focus{color:#c8cfee!important}.has-background-link-light[data-v-527e8d26]{background-color:#eff1fa!important}.has-text-link-dark[data-v-527e8d26]{color:#3850b7!important}a.has-text-link-dark[data-v-527e8d26]:hover,a.has-text-link-dark[data-v-527e8d26]:focus{color:#576dcb!important}.has-background-link-dark[data-v-527e8d26]{background-color:#3850b7!important}.has-text-info[data-v-527e8d26]{color:#3e8ed0!important}a.has-text-info[data-v-527e8d26]:hover,a.has-text-info[data-v-527e8d26]:focus{color:#2b74b1!important}.has-background-info[data-v-527e8d26]{background-color:#3e8ed0!important}.has-text-info-light[data-v-527e8d26]{color:#eff5fb!important}a.has-text-info-light[data-v-527e8d26]:hover,a.has-text-info-light[data-v-527e8d26]:focus{color:#c6ddf1!important}.has-background-info-light[data-v-527e8d26]{background-color:#eff5fb!important}.has-text-info-dark[data-v-527e8d26]{color:#296fa8!important}a.has-text-info-dark[data-v-527e8d26]:hover,a.has-text-info-dark[data-v-527e8d26]:focus{color:#368ace!important}.has-background-info-dark[data-v-527e8d26]{background-color:#296fa8!important}.has-text-success[data-v-527e8d26]{color:#48c78e!important}a.has-text-success[data-v-527e8d26]:hover,a.has-text-success[data-v-527e8d26]:focus{color:#34a873!important}.has-background-success[data-v-527e8d26]{background-color:#48c78e!important}.has-text-success-light[data-v-527e8d26]{color:#effaf5!important}a.has-text-success-light[data-v-527e8d26]:hover,a.has-text-success-light[data-v-527e8d26]:focus{color:#c8eedd!important}.has-background-success-light[data-v-527e8d26]{background-color:#effaf5!important}.has-text-success-dark[data-v-527e8d26]{color:#257953!important}a.has-text-success-dark[data-v-527e8d26]:hover,a.has-text-success-dark[data-v-527e8d26]:focus{color:#31a06e!important}.has-background-success-dark[data-v-527e8d26]{background-color:#257953!important}.has-text-warning[data-v-527e8d26]{color:#ffe08a!important}a.has-text-warning[data-v-527e8d26]:hover,a.has-text-warning[data-v-527e8d26]:focus{color:#ffd257!important}.has-background-warning[data-v-527e8d26]{background-color:#ffe08a!important}.has-text-warning-light[data-v-527e8d26]{color:#fffaeb!important}a.has-text-warning-light[data-v-527e8d26]:hover,a.has-text-warning-light[data-v-527e8d26]:focus{color:#ffecb8!important}.has-background-warning-light[data-v-527e8d26]{background-color:#fffaeb!important}.has-text-warning-dark[data-v-527e8d26]{color:#946c00!important}a.has-text-warning-dark[data-v-527e8d26]:hover,a.has-text-warning-dark[data-v-527e8d26]:focus{color:#c79200!important}.has-background-warning-dark[data-v-527e8d26]{background-color:#946c00!important}.has-text-danger[data-v-527e8d26]{color:#f14668!important}a.has-text-danger[data-v-527e8d26]:hover,a.has-text-danger[data-v-527e8d26]:focus{color:#ee1742!important}.has-background-danger[data-v-527e8d26]{background-color:#f14668!important}.has-text-danger-light[data-v-527e8d26]{color:#feecf0!important}a.has-text-danger-light[data-v-527e8d26]:hover,a.has-text-danger-light[data-v-527e8d26]:focus{color:#fabdc9!important}.has-background-danger-light[data-v-527e8d26]{background-color:#feecf0!important}.has-text-danger-dark[data-v-527e8d26]{color:#cc0f35!important}a.has-text-danger-dark[data-v-527e8d26]:hover,a.has-text-danger-dark[data-v-527e8d26]:focus{color:#ee2049!important}.has-background-danger-dark[data-v-527e8d26]{background-color:#cc0f35!important}.has-text-black-bis[data-v-527e8d26]{color:#121212!important}.has-background-black-bis[data-v-527e8d26]{background-color:#121212!important}.has-text-black-ter[data-v-527e8d26]{color:#242424!important}.has-background-black-ter[data-v-527e8d26]{background-color:#242424!important}.has-text-grey-darker[data-v-527e8d26]{color:#363636!important}.has-background-grey-darker[data-v-527e8d26]{background-color:#363636!important}.has-text-grey-dark[data-v-527e8d26]{color:#4a4a4a!important}.has-background-grey-dark[data-v-527e8d26]{background-color:#4a4a4a!important}.has-text-grey[data-v-527e8d26]{color:#7a7a7a!important}.has-background-grey[data-v-527e8d26]{background-color:#7a7a7a!important}.has-text-grey-light[data-v-527e8d26]{color:#b5b5b5!important}.has-background-grey-light[data-v-527e8d26]{background-color:#b5b5b5!important}.has-text-grey-lighter[data-v-527e8d26]{color:#dbdbdb!important}.has-background-grey-lighter[data-v-527e8d26]{background-color:#dbdbdb!important}.has-text-white-ter[data-v-527e8d26]{color:#f5f5f5!important}.has-background-white-ter[data-v-527e8d26]{background-color:#f5f5f5!important}.has-text-white-bis[data-v-527e8d26]{color:#fafafa!important}.has-background-white-bis[data-v-527e8d26]{background-color:#fafafa!important}.is-flex-direction-row[data-v-527e8d26]{flex-direction:row!important}.is-flex-direction-row-reverse[data-v-527e8d26]{flex-direction:row-reverse!important}.is-flex-direction-column[data-v-527e8d26]{flex-direction:column!important}.is-flex-direction-column-reverse[data-v-527e8d26]{flex-direction:column-reverse!important}.is-flex-wrap-nowrap[data-v-527e8d26]{flex-wrap:nowrap!important}.is-flex-wrap-wrap[data-v-527e8d26]{flex-wrap:wrap!important}.is-flex-wrap-wrap-reverse[data-v-527e8d26]{flex-wrap:wrap-reverse!important}.is-justify-content-flex-start[data-v-527e8d26]{justify-content:flex-start!important}.is-justify-content-flex-end[data-v-527e8d26]{justify-content:flex-end!important}.is-justify-content-center[data-v-527e8d26]{justify-content:center!important}.is-justify-content-space-between[data-v-527e8d26]{justify-content:space-between!important}.is-justify-content-space-around[data-v-527e8d26]{justify-content:space-around!important}.is-justify-content-space-evenly[data-v-527e8d26]{justify-content:space-evenly!important}.is-justify-content-start[data-v-527e8d26]{justify-content:start!important}.is-justify-content-end[data-v-527e8d26]{justify-content:end!important}.is-justify-content-left[data-v-527e8d26]{justify-content:left!important}.is-justify-content-right[data-v-527e8d26]{justify-content:right!important}.is-align-content-flex-start[data-v-527e8d26]{align-content:flex-start!important}.is-align-content-flex-end[data-v-527e8d26]{align-content:flex-end!important}.is-align-content-center[data-v-527e8d26]{align-content:center!important}.is-align-content-space-between[data-v-527e8d26]{align-content:space-between!important}.is-align-content-space-around[data-v-527e8d26]{align-content:space-around!important}.is-align-content-space-evenly[data-v-527e8d26]{align-content:space-evenly!important}.is-align-content-stretch[data-v-527e8d26]{align-content:stretch!important}.is-align-content-start[data-v-527e8d26]{align-content:start!important}.is-align-content-end[data-v-527e8d26]{align-content:end!important}.is-align-content-baseline[data-v-527e8d26]{align-content:baseline!important}.is-align-items-stretch[data-v-527e8d26]{align-items:stretch!important}.is-align-items-flex-start[data-v-527e8d26]{align-items:flex-start!important}.is-align-items-flex-end[data-v-527e8d26]{align-items:flex-end!important}.is-align-items-center[data-v-527e8d26]{align-items:center!important}.is-align-items-baseline[data-v-527e8d26]{align-items:baseline!important}.is-align-items-start[data-v-527e8d26]{align-items:start!important}.is-align-items-end[data-v-527e8d26]{align-items:end!important}.is-align-items-self-start[data-v-527e8d26]{align-items:self-start!important}.is-align-items-self-end[data-v-527e8d26]{align-items:self-end!important}.is-align-self-auto[data-v-527e8d26]{align-self:auto!important}.is-align-self-flex-start[data-v-527e8d26]{align-self:flex-start!important}.is-align-self-flex-end[data-v-527e8d26]{align-self:flex-end!important}.is-align-self-center[data-v-527e8d26]{align-self:center!important}.is-align-self-baseline[data-v-527e8d26]{align-self:baseline!important}.is-align-self-stretch[data-v-527e8d26]{align-self:stretch!important}.is-flex-grow-0[data-v-527e8d26]{flex-grow:0!important}.is-flex-grow-1[data-v-527e8d26]{flex-grow:1!important}.is-flex-grow-2[data-v-527e8d26]{flex-grow:2!important}.is-flex-grow-3[data-v-527e8d26]{flex-grow:3!important}.is-flex-grow-4[data-v-527e8d26]{flex-grow:4!important}.is-flex-grow-5[data-v-527e8d26]{flex-grow:5!important}.is-flex-shrink-0[data-v-527e8d26]{flex-shrink:0!important}.is-flex-shrink-1[data-v-527e8d26]{flex-shrink:1!important}.is-flex-shrink-2[data-v-527e8d26]{flex-shrink:2!important}.is-flex-shrink-3[data-v-527e8d26]{flex-shrink:3!important}.is-flex-shrink-4[data-v-527e8d26]{flex-shrink:4!important}.is-flex-shrink-5[data-v-527e8d26]{flex-shrink:5!important}.is-clearfix[data-v-527e8d26]:after{clear:both;content:" ";display:table}.is-pulled-left[data-v-527e8d26]{float:left!important}.is-pulled-right[data-v-527e8d26]{float:right!important}.is-radiusless[data-v-527e8d26]{border-radius:0!important}.is-shadowless[data-v-527e8d26]{box-shadow:none!important}.is-clickable[data-v-527e8d26]{cursor:pointer!important;pointer-events:all!important}.is-clipped[data-v-527e8d26]{overflow:hidden!important}.is-relative[data-v-527e8d26]{position:relative!important}.is-marginless[data-v-527e8d26]{margin:0!important}.is-paddingless[data-v-527e8d26]{padding:0!important}.m-0[data-v-527e8d26]{margin:0!important}.mt-0[data-v-527e8d26]{margin-top:0!important}.mr-0[data-v-527e8d26]{margin-right:0!important}.mb-0[data-v-527e8d26]{margin-bottom:0!important}.ml-0[data-v-527e8d26]{margin-left:0!important}.mx-0[data-v-527e8d26]{margin-left:0!important;margin-right:0!important}.my-0[data-v-527e8d26]{margin-top:0!important;margin-bottom:0!important}.m-1[data-v-527e8d26]{margin:.25rem!important}.mt-1[data-v-527e8d26]{margin-top:.25rem!important}.mr-1[data-v-527e8d26]{margin-right:.25rem!important}.mb-1[data-v-527e8d26]{margin-bottom:.25rem!important}.ml-1[data-v-527e8d26]{margin-left:.25rem!important}.mx-1[data-v-527e8d26]{margin-left:.25rem!important;margin-right:.25rem!important}.my-1[data-v-527e8d26]{margin-top:.25rem!important;margin-bottom:.25rem!important}.m-2[data-v-527e8d26]{margin:.5rem!important}.mt-2[data-v-527e8d26]{margin-top:.5rem!important}.mr-2[data-v-527e8d26]{margin-right:.5rem!important}.mb-2[data-v-527e8d26]{margin-bottom:.5rem!important}.ml-2[data-v-527e8d26]{margin-left:.5rem!important}.mx-2[data-v-527e8d26]{margin-left:.5rem!important;margin-right:.5rem!important}.my-2[data-v-527e8d26]{margin-top:.5rem!important;margin-bottom:.5rem!important}.m-3[data-v-527e8d26]{margin:.75rem!important}.mt-3[data-v-527e8d26]{margin-top:.75rem!important}.mr-3[data-v-527e8d26]{margin-right:.75rem!important}.mb-3[data-v-527e8d26]{margin-bottom:.75rem!important}.ml-3[data-v-527e8d26]{margin-left:.75rem!important}.mx-3[data-v-527e8d26]{margin-left:.75rem!important;margin-right:.75rem!important}.my-3[data-v-527e8d26]{margin-top:.75rem!important;margin-bottom:.75rem!important}.m-4[data-v-527e8d26]{margin:1rem!important}.mt-4[data-v-527e8d26]{margin-top:1rem!important}.mr-4[data-v-527e8d26]{margin-right:1rem!important}.mb-4[data-v-527e8d26]{margin-bottom:1rem!important}.ml-4[data-v-527e8d26]{margin-left:1rem!important}.mx-4[data-v-527e8d26]{margin-left:1rem!important;margin-right:1rem!important}.my-4[data-v-527e8d26]{margin-top:1rem!important;margin-bottom:1rem!important}.m-5[data-v-527e8d26]{margin:1.5rem!important}.mt-5[data-v-527e8d26]{margin-top:1.5rem!important}.mr-5[data-v-527e8d26]{margin-right:1.5rem!important}.mb-5[data-v-527e8d26]{margin-bottom:1.5rem!important}.ml-5[data-v-527e8d26]{margin-left:1.5rem!important}.mx-5[data-v-527e8d26]{margin-left:1.5rem!important;margin-right:1.5rem!important}.my-5[data-v-527e8d26]{margin-top:1.5rem!important;margin-bottom:1.5rem!important}.m-6[data-v-527e8d26]{margin:3rem!important}.mt-6[data-v-527e8d26]{margin-top:3rem!important}.mr-6[data-v-527e8d26]{margin-right:3rem!important}.mb-6[data-v-527e8d26]{margin-bottom:3rem!important}.ml-6[data-v-527e8d26]{margin-left:3rem!important}.mx-6[data-v-527e8d26]{margin-left:3rem!important;margin-right:3rem!important}.my-6[data-v-527e8d26]{margin-top:3rem!important;margin-bottom:3rem!important}.m-auto[data-v-527e8d26]{margin:auto!important}.mt-auto[data-v-527e8d26]{margin-top:auto!important}.mr-auto[data-v-527e8d26]{margin-right:auto!important}.mb-auto[data-v-527e8d26]{margin-bottom:auto!important}.ml-auto[data-v-527e8d26]{margin-left:auto!important}.mx-auto[data-v-527e8d26]{margin-left:auto!important;margin-right:auto!important}.my-auto[data-v-527e8d26]{margin-top:auto!important;margin-bottom:auto!important}.p-0[data-v-527e8d26]{padding:0!important}.pt-0[data-v-527e8d26]{padding-top:0!important}.pr-0[data-v-527e8d26]{padding-right:0!important}.pb-0[data-v-527e8d26]{padding-bottom:0!important}.pl-0[data-v-527e8d26]{padding-left:0!important}.px-0[data-v-527e8d26]{padding-left:0!important;padding-right:0!important}.py-0[data-v-527e8d26]{padding-top:0!important;padding-bottom:0!important}.p-1[data-v-527e8d26]{padding:.25rem!important}.pt-1[data-v-527e8d26]{padding-top:.25rem!important}.pr-1[data-v-527e8d26]{padding-right:.25rem!important}.pb-1[data-v-527e8d26]{padding-bottom:.25rem!important}.pl-1[data-v-527e8d26]{padding-left:.25rem!important}.px-1[data-v-527e8d26]{padding-left:.25rem!important;padding-right:.25rem!important}.py-1[data-v-527e8d26]{padding-top:.25rem!important;padding-bottom:.25rem!important}.p-2[data-v-527e8d26]{padding:.5rem!important}.pt-2[data-v-527e8d26]{padding-top:.5rem!important}.pr-2[data-v-527e8d26]{padding-right:.5rem!important}.pb-2[data-v-527e8d26]{padding-bottom:.5rem!important}.pl-2[data-v-527e8d26]{padding-left:.5rem!important}.px-2[data-v-527e8d26]{padding-left:.5rem!important;padding-right:.5rem!important}.py-2[data-v-527e8d26]{padding-top:.5rem!important;padding-bottom:.5rem!important}.p-3[data-v-527e8d26]{padding:.75rem!important}.pt-3[data-v-527e8d26]{padding-top:.75rem!important}.pr-3[data-v-527e8d26]{padding-right:.75rem!important}.pb-3[data-v-527e8d26]{padding-bottom:.75rem!important}.pl-3[data-v-527e8d26]{padding-left:.75rem!important}.px-3[data-v-527e8d26]{padding-left:.75rem!important;padding-right:.75rem!important}.py-3[data-v-527e8d26]{padding-top:.75rem!important;padding-bottom:.75rem!important}.p-4[data-v-527e8d26]{padding:1rem!important}.pt-4[data-v-527e8d26]{padding-top:1rem!important}.pr-4[data-v-527e8d26]{padding-right:1rem!important}.pb-4[data-v-527e8d26]{padding-bottom:1rem!important}.pl-4[data-v-527e8d26]{padding-left:1rem!important}.px-4[data-v-527e8d26]{padding-left:1rem!important;padding-right:1rem!important}.py-4[data-v-527e8d26]{padding-top:1rem!important;padding-bottom:1rem!important}.p-5[data-v-527e8d26]{padding:1.5rem!important}.pt-5[data-v-527e8d26]{padding-top:1.5rem!important}.pr-5[data-v-527e8d26]{padding-right:1.5rem!important}.pb-5[data-v-527e8d26]{padding-bottom:1.5rem!important}.pl-5[data-v-527e8d26]{padding-left:1.5rem!important}.px-5[data-v-527e8d26]{padding-left:1.5rem!important;padding-right:1.5rem!important}.py-5[data-v-527e8d26]{padding-top:1.5rem!important;padding-bottom:1.5rem!important}.p-6[data-v-527e8d26]{padding:3rem!important}.pt-6[data-v-527e8d26]{padding-top:3rem!important}.pr-6[data-v-527e8d26]{padding-right:3rem!important}.pb-6[data-v-527e8d26]{padding-bottom:3rem!important}.pl-6[data-v-527e8d26]{padding-left:3rem!important}.px-6[data-v-527e8d26]{padding-left:3rem!important;padding-right:3rem!important}.py-6[data-v-527e8d26]{padding-top:3rem!important;padding-bottom:3rem!important}.p-auto[data-v-527e8d26]{padding:auto!important}.pt-auto[data-v-527e8d26]{padding-top:auto!important}.pr-auto[data-v-527e8d26]{padding-right:auto!important}.pb-auto[data-v-527e8d26]{padding-bottom:auto!important}.pl-auto[data-v-527e8d26]{padding-left:auto!important}.px-auto[data-v-527e8d26]{padding-left:auto!important;padding-right:auto!important}.py-auto[data-v-527e8d26]{padding-top:auto!important;padding-bottom:auto!important}.is-size-1[data-v-527e8d26]{font-size:3rem!important}.is-size-2[data-v-527e8d26]{font-size:2.5rem!important}.is-size-3[data-v-527e8d26]{font-size:2rem!important}.is-size-4[data-v-527e8d26]{font-size:1.5rem!important}.is-size-5[data-v-527e8d26]{font-size:1.25rem!important}.is-size-6[data-v-527e8d26]{font-size:1rem!important}.is-size-7[data-v-527e8d26]{font-size:.75rem!important}@media screen and (max-width: 768px){.is-size-1-mobile[data-v-527e8d26]{font-size:3rem!important}.is-size-2-mobile[data-v-527e8d26]{font-size:2.5rem!important}.is-size-3-mobile[data-v-527e8d26]{font-size:2rem!important}.is-size-4-mobile[data-v-527e8d26]{font-size:1.5rem!important}.is-size-5-mobile[data-v-527e8d26]{font-size:1.25rem!important}.is-size-6-mobile[data-v-527e8d26]{font-size:1rem!important}.is-size-7-mobile[data-v-527e8d26]{font-size:.75rem!important}}@media screen and (min-width: 769px),print{.is-size-1-tablet[data-v-527e8d26]{font-size:3rem!important}.is-size-2-tablet[data-v-527e8d26]{font-size:2.5rem!important}.is-size-3-tablet[data-v-527e8d26]{font-size:2rem!important}.is-size-4-tablet[data-v-527e8d26]{font-size:1.5rem!important}.is-size-5-tablet[data-v-527e8d26]{font-size:1.25rem!important}.is-size-6-tablet[data-v-527e8d26]{font-size:1rem!important}.is-size-7-tablet[data-v-527e8d26]{font-size:.75rem!important}}@media screen and (max-width: 1023px){.is-size-1-touch[data-v-527e8d26]{font-size:3rem!important}.is-size-2-touch[data-v-527e8d26]{font-size:2.5rem!important}.is-size-3-touch[data-v-527e8d26]{font-size:2rem!important}.is-size-4-touch[data-v-527e8d26]{font-size:1.5rem!important}.is-size-5-touch[data-v-527e8d26]{font-size:1.25rem!important}.is-size-6-touch[data-v-527e8d26]{font-size:1rem!important}.is-size-7-touch[data-v-527e8d26]{font-size:.75rem!important}}@media screen and (min-width: 1024px){.is-size-1-desktop[data-v-527e8d26]{font-size:3rem!important}.is-size-2-desktop[data-v-527e8d26]{font-size:2.5rem!important}.is-size-3-desktop[data-v-527e8d26]{font-size:2rem!important}.is-size-4-desktop[data-v-527e8d26]{font-size:1.5rem!important}.is-size-5-desktop[data-v-527e8d26]{font-size:1.25rem!important}.is-size-6-desktop[data-v-527e8d26]{font-size:1rem!important}.is-size-7-desktop[data-v-527e8d26]{font-size:.75rem!important}}@media screen and (min-width: 1216px){.is-size-1-widescreen[data-v-527e8d26]{font-size:3rem!important}.is-size-2-widescreen[data-v-527e8d26]{font-size:2.5rem!important}.is-size-3-widescreen[data-v-527e8d26]{font-size:2rem!important}.is-size-4-widescreen[data-v-527e8d26]{font-size:1.5rem!important}.is-size-5-widescreen[data-v-527e8d26]{font-size:1.25rem!important}.is-size-6-widescreen[data-v-527e8d26]{font-size:1rem!important}.is-size-7-widescreen[data-v-527e8d26]{font-size:.75rem!important}}@media screen and (min-width: 1408px){.is-size-1-fullhd[data-v-527e8d26]{font-size:3rem!important}.is-size-2-fullhd[data-v-527e8d26]{font-size:2.5rem!important}.is-size-3-fullhd[data-v-527e8d26]{font-size:2rem!important}.is-size-4-fullhd[data-v-527e8d26]{font-size:1.5rem!important}.is-size-5-fullhd[data-v-527e8d26]{font-size:1.25rem!important}.is-size-6-fullhd[data-v-527e8d26]{font-size:1rem!important}.is-size-7-fullhd[data-v-527e8d26]{font-size:.75rem!important}}.has-text-centered[data-v-527e8d26]{text-align:center!important}.has-text-justified[data-v-527e8d26]{text-align:justify!important}.has-text-left[data-v-527e8d26]{text-align:left!important}.has-text-right[data-v-527e8d26]{text-align:right!important}@media screen and (max-width: 768px){.has-text-centered-mobile[data-v-527e8d26]{text-align:center!important}}@media screen and (min-width: 769px),print{.has-text-centered-tablet[data-v-527e8d26]{text-align:center!important}}@media screen and (min-width: 769px) and (max-width: 1023px){.has-text-centered-tablet-only[data-v-527e8d26]{text-align:center!important}}@media screen and (max-width: 1023px){.has-text-centered-touch[data-v-527e8d26]{text-align:center!important}}@media screen and (min-width: 1024px){.has-text-centered-desktop[data-v-527e8d26]{text-align:center!important}}@media screen and (min-width: 1024px) and (max-width: 1215px){.has-text-centered-desktop-only[data-v-527e8d26]{text-align:center!important}}@media screen and (min-width: 1216px){.has-text-centered-widescreen[data-v-527e8d26]{text-align:center!important}}@media screen and (min-width: 1216px) and (max-width: 1407px){.has-text-centered-widescreen-only[data-v-527e8d26]{text-align:center!important}}@media screen and (min-width: 1408px){.has-text-centered-fullhd[data-v-527e8d26]{text-align:center!important}}@media screen and (max-width: 768px){.has-text-justified-mobile[data-v-527e8d26]{text-align:justify!important}}@media screen and (min-width: 769px),print{.has-text-justified-tablet[data-v-527e8d26]{text-align:justify!important}}@media screen and (min-width: 769px) and (max-width: 1023px){.has-text-justified-tablet-only[data-v-527e8d26]{text-align:justify!important}}@media screen and (max-width: 1023px){.has-text-justified-touch[data-v-527e8d26]{text-align:justify!important}}@media screen and (min-width: 1024px){.has-text-justified-desktop[data-v-527e8d26]{text-align:justify!important}}@media screen and (min-width: 1024px) and (max-width: 1215px){.has-text-justified-desktop-only[data-v-527e8d26]{text-align:justify!important}}@media screen and (min-width: 1216px){.has-text-justified-widescreen[data-v-527e8d26]{text-align:justify!important}}@media screen and (min-width: 1216px) and (max-width: 1407px){.has-text-justified-widescreen-only[data-v-527e8d26]{text-align:justify!important}}@media screen and (min-width: 1408px){.has-text-justified-fullhd[data-v-527e8d26]{text-align:justify!important}}@media screen and (max-width: 768px){.has-text-left-mobile[data-v-527e8d26]{text-align:left!important}}@media screen and (min-width: 769px),print{.has-text-left-tablet[data-v-527e8d26]{text-align:left!important}}@media screen and (min-width: 769px) and (max-width: 1023px){.has-text-left-tablet-only[data-v-527e8d26]{text-align:left!important}}@media screen and (max-width: 1023px){.has-text-left-touch[data-v-527e8d26]{text-align:left!important}}@media screen and (min-width: 1024px){.has-text-left-desktop[data-v-527e8d26]{text-align:left!important}}@media screen and (min-width: 1024px) and (max-width: 1215px){.has-text-left-desktop-only[data-v-527e8d26]{text-align:left!important}}@media screen and (min-width: 1216px){.has-text-left-widescreen[data-v-527e8d26]{text-align:left!important}}@media screen and (min-width: 1216px) and (max-width: 1407px){.has-text-left-widescreen-only[data-v-527e8d26]{text-align:left!important}}@media screen and (min-width: 1408px){.has-text-left-fullhd[data-v-527e8d26]{text-align:left!important}}@media screen and (max-width: 768px){.has-text-right-mobile[data-v-527e8d26]{text-align:right!important}}@media screen and (min-width: 769px),print{.has-text-right-tablet[data-v-527e8d26]{text-align:right!important}}@media screen and (min-width: 769px) and (max-width: 1023px){.has-text-right-tablet-only[data-v-527e8d26]{text-align:right!important}}@media screen and (max-width: 1023px){.has-text-right-touch[data-v-527e8d26]{text-align:right!important}}@media screen and (min-width: 1024px){.has-text-right-desktop[data-v-527e8d26]{text-align:right!important}}@media screen and (min-width: 1024px) and (max-width: 1215px){.has-text-right-desktop-only[data-v-527e8d26]{text-align:right!important}}@media screen and (min-width: 1216px){.has-text-right-widescreen[data-v-527e8d26]{text-align:right!important}}@media screen and (min-width: 1216px) and (max-width: 1407px){.has-text-right-widescreen-only[data-v-527e8d26]{text-align:right!important}}@media screen and (min-width: 1408px){.has-text-right-fullhd[data-v-527e8d26]{text-align:right!important}}.is-capitalized[data-v-527e8d26]{text-transform:capitalize!important}.is-lowercase[data-v-527e8d26]{text-transform:lowercase!important}.is-uppercase[data-v-527e8d26]{text-transform:uppercase!important}.is-italic[data-v-527e8d26]{font-style:italic!important}.is-underlined[data-v-527e8d26]{text-decoration:underline!important}.has-text-weight-light[data-v-527e8d26]{font-weight:300!important}.has-text-weight-normal[data-v-527e8d26]{font-weight:400!important}.has-text-weight-medium[data-v-527e8d26]{font-weight:500!important}.has-text-weight-semibold[data-v-527e8d26]{font-weight:600!important}.has-text-weight-bold[data-v-527e8d26]{font-weight:700!important}.is-family-primary[data-v-527e8d26],.is-family-secondary[data-v-527e8d26],.is-family-sans-serif[data-v-527e8d26]{font-family:BlinkMacSystemFont,-apple-system,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,Helvetica,Arial,sans-serif!important}.is-family-monospace[data-v-527e8d26],.is-family-code[data-v-527e8d26]{font-family:monospace!important}.is-block[data-v-527e8d26]{display:block!important}@media screen and (max-width: 768px){.is-block-mobile[data-v-527e8d26]{display:block!important}}@media screen and (min-width: 769px),print{.is-block-tablet[data-v-527e8d26]{display:block!important}}@media screen and (min-width: 769px) and (max-width: 1023px){.is-block-tablet-only[data-v-527e8d26]{display:block!important}}@media screen and (max-width: 1023px){.is-block-touch[data-v-527e8d26]{display:block!important}}@media screen and (min-width: 1024px){.is-block-desktop[data-v-527e8d26]{display:block!important}}@media screen and (min-width: 1024px) and (max-width: 1215px){.is-block-desktop-only[data-v-527e8d26]{display:block!important}}@media screen and (min-width: 1216px){.is-block-widescreen[data-v-527e8d26]{display:block!important}}@media screen and (min-width: 1216px) and (max-width: 1407px){.is-block-widescreen-only[data-v-527e8d26]{display:block!important}}@media screen and (min-width: 1408px){.is-block-fullhd[data-v-527e8d26]{display:block!important}}.is-flex[data-v-527e8d26]{display:flex!important}@media screen and (max-width: 768px){.is-flex-mobile[data-v-527e8d26]{display:flex!important}}@media screen and (min-width: 769px),print{.is-flex-tablet[data-v-527e8d26]{display:flex!important}}@media screen and (min-width: 769px) and (max-width: 1023px){.is-flex-tablet-only[data-v-527e8d26]{display:flex!important}}@media screen and (max-width: 1023px){.is-flex-touch[data-v-527e8d26]{display:flex!important}}@media screen and (min-width: 1024px){.is-flex-desktop[data-v-527e8d26]{display:flex!important}}@media screen and (min-width: 1024px) and (max-width: 1215px){.is-flex-desktop-only[data-v-527e8d26]{display:flex!important}}@media screen and (min-width: 1216px){.is-flex-widescreen[data-v-527e8d26]{display:flex!important}}@media screen and (min-width: 1216px) and (max-width: 1407px){.is-flex-widescreen-only[data-v-527e8d26]{display:flex!important}}@media screen and (min-width: 1408px){.is-flex-fullhd[data-v-527e8d26]{display:flex!important}}.is-inline[data-v-527e8d26]{display:inline!important}@media screen and (max-width: 768px){.is-inline-mobile[data-v-527e8d26]{display:inline!important}}@media screen and (min-width: 769px),print{.is-inline-tablet[data-v-527e8d26]{display:inline!important}}@media screen and (min-width: 769px) and (max-width: 1023px){.is-inline-tablet-only[data-v-527e8d26]{display:inline!important}}@media screen and (max-width: 1023px){.is-inline-touch[data-v-527e8d26]{display:inline!important}}@media screen and (min-width: 1024px){.is-inline-desktop[data-v-527e8d26]{display:inline!important}}@media screen and (min-width: 1024px) and (max-width: 1215px){.is-inline-desktop-only[data-v-527e8d26]{display:inline!important}}@media screen and (min-width: 1216px){.is-inline-widescreen[data-v-527e8d26]{display:inline!important}}@media screen and (min-width: 1216px) and (max-width: 1407px){.is-inline-widescreen-only[data-v-527e8d26]{display:inline!important}}@media screen and (min-width: 1408px){.is-inline-fullhd[data-v-527e8d26]{display:inline!important}}.is-inline-block[data-v-527e8d26]{display:inline-block!important}@media screen and (max-width: 768px){.is-inline-block-mobile[data-v-527e8d26]{display:inline-block!important}}@media screen and (min-width: 769px),print{.is-inline-block-tablet[data-v-527e8d26]{display:inline-block!important}}@media screen and (min-width: 769px) and (max-width: 1023px){.is-inline-block-tablet-only[data-v-527e8d26]{display:inline-block!important}}@media screen and (max-width: 1023px){.is-inline-block-touch[data-v-527e8d26]{display:inline-block!important}}@media screen and (min-width: 1024px){.is-inline-block-desktop[data-v-527e8d26]{display:inline-block!important}}@media screen and (min-width: 1024px) and (max-width: 1215px){.is-inline-block-desktop-only[data-v-527e8d26]{display:inline-block!important}}@media screen and (min-width: 1216px){.is-inline-block-widescreen[data-v-527e8d26]{display:inline-block!important}}@media screen and (min-width: 1216px) and (max-width: 1407px){.is-inline-block-widescreen-only[data-v-527e8d26]{display:inline-block!important}}@media screen and (min-width: 1408px){.is-inline-block-fullhd[data-v-527e8d26]{display:inline-block!important}}.is-inline-flex[data-v-527e8d26]{display:inline-flex!important}@media screen and (max-width: 768px){.is-inline-flex-mobile[data-v-527e8d26]{display:inline-flex!important}}@media screen and (min-width: 769px),print{.is-inline-flex-tablet[data-v-527e8d26]{display:inline-flex!important}}@media screen and (min-width: 769px) and (max-width: 1023px){.is-inline-flex-tablet-only[data-v-527e8d26]{display:inline-flex!important}}@media screen and (max-width: 1023px){.is-inline-flex-touch[data-v-527e8d26]{display:inline-flex!important}}@media screen and (min-width: 1024px){.is-inline-flex-desktop[data-v-527e8d26]{display:inline-flex!important}}@media screen and (min-width: 1024px) and (max-width: 1215px){.is-inline-flex-desktop-only[data-v-527e8d26]{display:inline-flex!important}}@media screen and (min-width: 1216px){.is-inline-flex-widescreen[data-v-527e8d26]{display:inline-flex!important}}@media screen and (min-width: 1216px) and (max-width: 1407px){.is-inline-flex-widescreen-only[data-v-527e8d26]{display:inline-flex!important}}@media screen and (min-width: 1408px){.is-inline-flex-fullhd[data-v-527e8d26]{display:inline-flex!important}}.is-hidden[data-v-527e8d26]{display:none!important}.is-sr-only[data-v-527e8d26]{border:none!important;clip:rect(0,0,0,0)!important;height:.01em!important;overflow:hidden!important;padding:0!important;position:absolute!important;white-space:nowrap!important;width:.01em!important}@media screen and (max-width: 768px){.is-hidden-mobile[data-v-527e8d26]{display:none!important}}@media screen and (min-width: 769px),print{.is-hidden-tablet[data-v-527e8d26]{display:none!important}}@media screen and (min-width: 769px) and (max-width: 1023px){.is-hidden-tablet-only[data-v-527e8d26]{display:none!important}}@media screen and (max-width: 1023px){.is-hidden-touch[data-v-527e8d26]{display:none!important}}@media screen and (min-width: 1024px){.is-hidden-desktop[data-v-527e8d26]{display:none!important}}@media screen and (min-width: 1024px) and (max-width: 1215px){.is-hidden-desktop-only[data-v-527e8d26]{display:none!important}}@media screen and (min-width: 1216px){.is-hidden-widescreen[data-v-527e8d26]{display:none!important}}@media screen and (min-width: 1216px) and (max-width: 1407px){.is-hidden-widescreen-only[data-v-527e8d26]{display:none!important}}@media screen and (min-width: 1408px){.is-hidden-fullhd[data-v-527e8d26]{display:none!important}}.is-invisible[data-v-527e8d26]{visibility:hidden!important}@media screen and (max-width: 768px){.is-invisible-mobile[data-v-527e8d26]{visibility:hidden!important}}@media screen and (min-width: 769px),print{.is-invisible-tablet[data-v-527e8d26]{visibility:hidden!important}}@media screen and (min-width: 769px) and (max-width: 1023px){.is-invisible-tablet-only[data-v-527e8d26]{visibility:hidden!important}}@media screen and (max-width: 1023px){.is-invisible-touch[data-v-527e8d26]{visibility:hidden!important}}@media screen and (min-width: 1024px){.is-invisible-desktop[data-v-527e8d26]{visibility:hidden!important}}@media screen and (min-width: 1024px) and (max-width: 1215px){.is-invisible-desktop-only[data-v-527e8d26]{visibility:hidden!important}}@media screen and (min-width: 1216px){.is-invisible-widescreen[data-v-527e8d26]{visibility:hidden!important}}@media screen and (min-width: 1216px) and (max-width: 1407px){.is-invisible-widescreen-only[data-v-527e8d26]{visibility:hidden!important}}@media screen and (min-width: 1408px){.is-invisible-fullhd[data-v-527e8d26]{visibility:hidden!important}}.hero[data-v-527e8d26]{align-items:stretch;display:flex;flex-direction:column;justify-content:space-between}.hero .navbar[data-v-527e8d26]{background:none}.hero .tabs ul[data-v-527e8d26]{border-bottom:none}.hero.is-white[data-v-527e8d26]{background-color:#fff;color:#0a0a0a}.hero.is-white a[data-v-527e8d26]:not(.button):not(.dropdown-item):not(.tag):not(.pagination-link.is-current),.hero.is-white strong[data-v-527e8d26]{color:inherit}.hero.is-white .title[data-v-527e8d26]{color:#0a0a0a}.hero.is-white .subtitle[data-v-527e8d26]{color:#0a0a0ae6}.hero.is-white .subtitle a[data-v-527e8d26]:not(.button),.hero.is-white .subtitle strong[data-v-527e8d26]{color:#0a0a0a}@media screen and (max-width: 1023px){.hero.is-white .navbar-menu[data-v-527e8d26]{background-color:#fff}}.hero.is-white .navbar-item[data-v-527e8d26],.hero.is-white .navbar-link[data-v-527e8d26]{color:#0a0a0ab3}.hero.is-white a.navbar-item[data-v-527e8d26]:hover,.hero.is-white a.navbar-item.is-active[data-v-527e8d26],.hero.is-white .navbar-link[data-v-527e8d26]:hover,.hero.is-white .navbar-link.is-active[data-v-527e8d26]{background-color:#f2f2f2;color:#0a0a0a}.hero.is-white .tabs a[data-v-527e8d26]{color:#0a0a0a;opacity:.9}.hero.is-white .tabs a[data-v-527e8d26]:hover{opacity:1}.hero.is-white .tabs li.is-active a[data-v-527e8d26]{color:#fff!important;opacity:1}.hero.is-white .tabs.is-boxed a[data-v-527e8d26],.hero.is-white .tabs.is-toggle a[data-v-527e8d26]{color:#0a0a0a}.hero.is-white .tabs.is-boxed a[data-v-527e8d26]:hover,.hero.is-white .tabs.is-toggle a[data-v-527e8d26]:hover{background-color:#0a0a0a1a}.hero.is-white .tabs.is-boxed li.is-active a[data-v-527e8d26],.hero.is-white .tabs.is-boxed li.is-active a[data-v-527e8d26]:hover,.hero.is-white .tabs.is-toggle li.is-active a[data-v-527e8d26],.hero.is-white .tabs.is-toggle li.is-active a[data-v-527e8d26]:hover{background-color:#0a0a0a;border-color:#0a0a0a;color:#fff}.hero.is-white.is-bold[data-v-527e8d26]{background-image:linear-gradient(141deg,#e6e6e6 0%,white 71%,white 100%)}@media screen and (max-width: 768px){.hero.is-white.is-bold .navbar-menu[data-v-527e8d26]{background-image:linear-gradient(141deg,#e6e6e6 0%,white 71%,white 100%)}}.hero.is-black[data-v-527e8d26]{background-color:#0a0a0a;color:#fff}.hero.is-black a[data-v-527e8d26]:not(.button):not(.dropdown-item):not(.tag):not(.pagination-link.is-current),.hero.is-black strong[data-v-527e8d26]{color:inherit}.hero.is-black .title[data-v-527e8d26]{color:#fff}.hero.is-black .subtitle[data-v-527e8d26]{color:#ffffffe6}.hero.is-black .subtitle a[data-v-527e8d26]:not(.button),.hero.is-black .subtitle strong[data-v-527e8d26]{color:#fff}@media screen and (max-width: 1023px){.hero.is-black .navbar-menu[data-v-527e8d26]{background-color:#0a0a0a}}.hero.is-black .navbar-item[data-v-527e8d26],.hero.is-black .navbar-link[data-v-527e8d26]{color:#ffffffb3}.hero.is-black a.navbar-item[data-v-527e8d26]:hover,.hero.is-black a.navbar-item.is-active[data-v-527e8d26],.hero.is-black .navbar-link[data-v-527e8d26]:hover,.hero.is-black .navbar-link.is-active[data-v-527e8d26]{background-color:#000;color:#fff}.hero.is-black .tabs a[data-v-527e8d26]{color:#fff;opacity:.9}.hero.is-black .tabs a[data-v-527e8d26]:hover{opacity:1}.hero.is-black .tabs li.is-active a[data-v-527e8d26]{color:#0a0a0a!important;opacity:1}.hero.is-black .tabs.is-boxed a[data-v-527e8d26],.hero.is-black .tabs.is-toggle a[data-v-527e8d26]{color:#fff}.hero.is-black .tabs.is-boxed a[data-v-527e8d26]:hover,.hero.is-black .tabs.is-toggle a[data-v-527e8d26]:hover{background-color:#0a0a0a1a}.hero.is-black .tabs.is-boxed li.is-active a[data-v-527e8d26],.hero.is-black .tabs.is-boxed li.is-active a[data-v-527e8d26]:hover,.hero.is-black .tabs.is-toggle li.is-active a[data-v-527e8d26],.hero.is-black .tabs.is-toggle li.is-active a[data-v-527e8d26]:hover{background-color:#fff;border-color:#fff;color:#0a0a0a}.hero.is-black.is-bold[data-v-527e8d26]{background-image:linear-gradient(141deg,black 0%,#0a0a0a 71%,#181616 100%)}@media screen and (max-width: 768px){.hero.is-black.is-bold .navbar-menu[data-v-527e8d26]{background-image:linear-gradient(141deg,black 0%,#0a0a0a 71%,#181616 100%)}}.hero.is-light[data-v-527e8d26]{background-color:#f5f5f5;color:#000000b3}.hero.is-light a[data-v-527e8d26]:not(.button):not(.dropdown-item):not(.tag):not(.pagination-link.is-current),.hero.is-light strong[data-v-527e8d26]{color:inherit}.hero.is-light .title[data-v-527e8d26]{color:#000000b3}.hero.is-light .subtitle[data-v-527e8d26]{color:#000000e6}.hero.is-light .subtitle a[data-v-527e8d26]:not(.button),.hero.is-light .subtitle strong[data-v-527e8d26]{color:#000000b3}@media screen and (max-width: 1023px){.hero.is-light .navbar-menu[data-v-527e8d26]{background-color:#f5f5f5}}.hero.is-light .navbar-item[data-v-527e8d26],.hero.is-light .navbar-link[data-v-527e8d26]{color:#000000b3}.hero.is-light a.navbar-item[data-v-527e8d26]:hover,.hero.is-light a.navbar-item.is-active[data-v-527e8d26],.hero.is-light .navbar-link[data-v-527e8d26]:hover,.hero.is-light .navbar-link.is-active[data-v-527e8d26]{background-color:#e8e8e8;color:#000000b3}.hero.is-light .tabs a[data-v-527e8d26]{color:#000000b3;opacity:.9}.hero.is-light .tabs a[data-v-527e8d26]:hover{opacity:1}.hero.is-light .tabs li.is-active a[data-v-527e8d26]{color:#f5f5f5!important;opacity:1}.hero.is-light .tabs.is-boxed a[data-v-527e8d26],.hero.is-light .tabs.is-toggle a[data-v-527e8d26]{color:#000000b3}.hero.is-light .tabs.is-boxed a[data-v-527e8d26]:hover,.hero.is-light .tabs.is-toggle a[data-v-527e8d26]:hover{background-color:#0a0a0a1a}.hero.is-light .tabs.is-boxed li.is-active a[data-v-527e8d26],.hero.is-light .tabs.is-boxed li.is-active a[data-v-527e8d26]:hover,.hero.is-light .tabs.is-toggle li.is-active a[data-v-527e8d26],.hero.is-light .tabs.is-toggle li.is-active a[data-v-527e8d26]:hover{background-color:#000000b3;border-color:#000000b3;color:#f5f5f5}.hero.is-light.is-bold[data-v-527e8d26]{background-image:linear-gradient(141deg,#dfd8d9 0%,whitesmoke 71%,white 100%)}@media screen and (max-width: 768px){.hero.is-light.is-bold .navbar-menu[data-v-527e8d26]{background-image:linear-gradient(141deg,#dfd8d9 0%,whitesmoke 71%,white 100%)}}.hero.is-dark[data-v-527e8d26]{background-color:#363636;color:#fff}.hero.is-dark a[data-v-527e8d26]:not(.button):not(.dropdown-item):not(.tag):not(.pagination-link.is-current),.hero.is-dark strong[data-v-527e8d26]{color:inherit}.hero.is-dark .title[data-v-527e8d26]{color:#fff}.hero.is-dark .subtitle[data-v-527e8d26]{color:#ffffffe6}.hero.is-dark .subtitle a[data-v-527e8d26]:not(.button),.hero.is-dark .subtitle strong[data-v-527e8d26]{color:#fff}@media screen and (max-width: 1023px){.hero.is-dark .navbar-menu[data-v-527e8d26]{background-color:#363636}}.hero.is-dark .navbar-item[data-v-527e8d26],.hero.is-dark .navbar-link[data-v-527e8d26]{color:#ffffffb3}.hero.is-dark a.navbar-item[data-v-527e8d26]:hover,.hero.is-dark a.navbar-item.is-active[data-v-527e8d26],.hero.is-dark .navbar-link[data-v-527e8d26]:hover,.hero.is-dark .navbar-link.is-active[data-v-527e8d26]{background-color:#292929;color:#fff}.hero.is-dark .tabs a[data-v-527e8d26]{color:#fff;opacity:.9}.hero.is-dark .tabs a[data-v-527e8d26]:hover{opacity:1}.hero.is-dark .tabs li.is-active a[data-v-527e8d26]{color:#363636!important;opacity:1}.hero.is-dark .tabs.is-boxed a[data-v-527e8d26],.hero.is-dark .tabs.is-toggle a[data-v-527e8d26]{color:#fff}.hero.is-dark .tabs.is-boxed a[data-v-527e8d26]:hover,.hero.is-dark .tabs.is-toggle a[data-v-527e8d26]:hover{background-color:#0a0a0a1a}.hero.is-dark .tabs.is-boxed li.is-active a[data-v-527e8d26],.hero.is-dark .tabs.is-boxed li.is-active a[data-v-527e8d26]:hover,.hero.is-dark .tabs.is-toggle li.is-active a[data-v-527e8d26],.hero.is-dark .tabs.is-toggle li.is-active a[data-v-527e8d26]:hover{background-color:#fff;border-color:#fff;color:#363636}.hero.is-dark.is-bold[data-v-527e8d26]{background-image:linear-gradient(141deg,#1f191a 0%,#363636 71%,#46403f 100%)}@media screen and (max-width: 768px){.hero.is-dark.is-bold .navbar-menu[data-v-527e8d26]{background-image:linear-gradient(141deg,#1f191a 0%,#363636 71%,#46403f 100%)}}.hero.is-primary[data-v-527e8d26]{background-color:#00d1b2;color:#fff}.hero.is-primary a[data-v-527e8d26]:not(.button):not(.dropdown-item):not(.tag):not(.pagination-link.is-current),.hero.is-primary strong[data-v-527e8d26]{color:inherit}.hero.is-primary .title[data-v-527e8d26]{color:#fff}.hero.is-primary .subtitle[data-v-527e8d26]{color:#ffffffe6}.hero.is-primary .subtitle a[data-v-527e8d26]:not(.button),.hero.is-primary .subtitle strong[data-v-527e8d26]{color:#fff}@media screen and (max-width: 1023px){.hero.is-primary .navbar-menu[data-v-527e8d26]{background-color:#00d1b2}}.hero.is-primary .navbar-item[data-v-527e8d26],.hero.is-primary .navbar-link[data-v-527e8d26]{color:#ffffffb3}.hero.is-primary a.navbar-item[data-v-527e8d26]:hover,.hero.is-primary a.navbar-item.is-active[data-v-527e8d26],.hero.is-primary .navbar-link[data-v-527e8d26]:hover,.hero.is-primary .navbar-link.is-active[data-v-527e8d26]{background-color:#00b89c;color:#fff}.hero.is-primary .tabs a[data-v-527e8d26]{color:#fff;opacity:.9}.hero.is-primary .tabs a[data-v-527e8d26]:hover{opacity:1}.hero.is-primary .tabs li.is-active a[data-v-527e8d26]{color:#00d1b2!important;opacity:1}.hero.is-primary .tabs.is-boxed a[data-v-527e8d26],.hero.is-primary .tabs.is-toggle a[data-v-527e8d26]{color:#fff}.hero.is-primary .tabs.is-boxed a[data-v-527e8d26]:hover,.hero.is-primary .tabs.is-toggle a[data-v-527e8d26]:hover{background-color:#0a0a0a1a}.hero.is-primary .tabs.is-boxed li.is-active a[data-v-527e8d26],.hero.is-primary .tabs.is-boxed li.is-active a[data-v-527e8d26]:hover,.hero.is-primary .tabs.is-toggle li.is-active a[data-v-527e8d26],.hero.is-primary .tabs.is-toggle li.is-active a[data-v-527e8d26]:hover{background-color:#fff;border-color:#fff;color:#00d1b2}.hero.is-primary.is-bold[data-v-527e8d26]{background-image:linear-gradient(141deg,#009e6c 0%,#00d1b2 71%,#00e7eb 100%)}@media screen and (max-width: 768px){.hero.is-primary.is-bold .navbar-menu[data-v-527e8d26]{background-image:linear-gradient(141deg,#009e6c 0%,#00d1b2 71%,#00e7eb 100%)}}.hero.is-link[data-v-527e8d26]{background-color:#485fc7;color:#fff}.hero.is-link a[data-v-527e8d26]:not(.button):not(.dropdown-item):not(.tag):not(.pagination-link.is-current),.hero.is-link strong[data-v-527e8d26]{color:inherit}.hero.is-link .title[data-v-527e8d26]{color:#fff}.hero.is-link .subtitle[data-v-527e8d26]{color:#ffffffe6}.hero.is-link .subtitle a[data-v-527e8d26]:not(.button),.hero.is-link .subtitle strong[data-v-527e8d26]{color:#fff}@media screen and (max-width: 1023px){.hero.is-link .navbar-menu[data-v-527e8d26]{background-color:#485fc7}}.hero.is-link .navbar-item[data-v-527e8d26],.hero.is-link .navbar-link[data-v-527e8d26]{color:#ffffffb3}.hero.is-link a.navbar-item[data-v-527e8d26]:hover,.hero.is-link a.navbar-item.is-active[data-v-527e8d26],.hero.is-link .navbar-link[data-v-527e8d26]:hover,.hero.is-link .navbar-link.is-active[data-v-527e8d26]{background-color:#3a51bb;color:#fff}.hero.is-link .tabs a[data-v-527e8d26]{color:#fff;opacity:.9}.hero.is-link .tabs a[data-v-527e8d26]:hover{opacity:1}.hero.is-link .tabs li.is-active a[data-v-527e8d26]{color:#485fc7!important;opacity:1}.hero.is-link .tabs.is-boxed a[data-v-527e8d26],.hero.is-link .tabs.is-toggle a[data-v-527e8d26]{color:#fff}.hero.is-link .tabs.is-boxed a[data-v-527e8d26]:hover,.hero.is-link .tabs.is-toggle a[data-v-527e8d26]:hover{background-color:#0a0a0a1a}.hero.is-link .tabs.is-boxed li.is-active a[data-v-527e8d26],.hero.is-link .tabs.is-boxed li.is-active a[data-v-527e8d26]:hover,.hero.is-link .tabs.is-toggle li.is-active a[data-v-527e8d26],.hero.is-link .tabs.is-toggle li.is-active a[data-v-527e8d26]:hover{background-color:#fff;border-color:#fff;color:#485fc7}.hero.is-link.is-bold[data-v-527e8d26]{background-image:linear-gradient(141deg,#2959b3 0%,#485fc7 71%,#5658d2 100%)}@media screen and (max-width: 768px){.hero.is-link.is-bold .navbar-menu[data-v-527e8d26]{background-image:linear-gradient(141deg,#2959b3 0%,#485fc7 71%,#5658d2 100%)}}.hero.is-info[data-v-527e8d26]{background-color:#3e8ed0;color:#fff}.hero.is-info a[data-v-527e8d26]:not(.button):not(.dropdown-item):not(.tag):not(.pagination-link.is-current),.hero.is-info strong[data-v-527e8d26]{color:inherit}.hero.is-info .title[data-v-527e8d26]{color:#fff}.hero.is-info .subtitle[data-v-527e8d26]{color:#ffffffe6}.hero.is-info .subtitle a[data-v-527e8d26]:not(.button),.hero.is-info .subtitle strong[data-v-527e8d26]{color:#fff}@media screen and (max-width: 1023px){.hero.is-info .navbar-menu[data-v-527e8d26]{background-color:#3e8ed0}}.hero.is-info .navbar-item[data-v-527e8d26],.hero.is-info .navbar-link[data-v-527e8d26]{color:#ffffffb3}.hero.is-info a.navbar-item[data-v-527e8d26]:hover,.hero.is-info a.navbar-item.is-active[data-v-527e8d26],.hero.is-info .navbar-link[data-v-527e8d26]:hover,.hero.is-info .navbar-link.is-active[data-v-527e8d26]{background-color:#3082c5;color:#fff}.hero.is-info .tabs a[data-v-527e8d26]{color:#fff;opacity:.9}.hero.is-info .tabs a[data-v-527e8d26]:hover{opacity:1}.hero.is-info .tabs li.is-active a[data-v-527e8d26]{color:#3e8ed0!important;opacity:1}.hero.is-info .tabs.is-boxed a[data-v-527e8d26],.hero.is-info .tabs.is-toggle a[data-v-527e8d26]{color:#fff}.hero.is-info .tabs.is-boxed a[data-v-527e8d26]:hover,.hero.is-info .tabs.is-toggle a[data-v-527e8d26]:hover{background-color:#0a0a0a1a}.hero.is-info .tabs.is-boxed li.is-active a[data-v-527e8d26],.hero.is-info .tabs.is-boxed li.is-active a[data-v-527e8d26]:hover,.hero.is-info .tabs.is-toggle li.is-active a[data-v-527e8d26],.hero.is-info .tabs.is-toggle li.is-active a[data-v-527e8d26]:hover{background-color:#fff;border-color:#fff;color:#3e8ed0}.hero.is-info.is-bold[data-v-527e8d26]{background-image:linear-gradient(141deg,#208fbc 0%,#3e8ed0 71%,#4d83db 100%)}@media screen and (max-width: 768px){.hero.is-info.is-bold .navbar-menu[data-v-527e8d26]{background-image:linear-gradient(141deg,#208fbc 0%,#3e8ed0 71%,#4d83db 100%)}}.hero.is-success[data-v-527e8d26]{background-color:#48c78e;color:#fff}.hero.is-success a[data-v-527e8d26]:not(.button):not(.dropdown-item):not(.tag):not(.pagination-link.is-current),.hero.is-success strong[data-v-527e8d26]{color:inherit}.hero.is-success .title[data-v-527e8d26]{color:#fff}.hero.is-success .subtitle[data-v-527e8d26]{color:#ffffffe6}.hero.is-success .subtitle a[data-v-527e8d26]:not(.button),.hero.is-success .subtitle strong[data-v-527e8d26]{color:#fff}@media screen and (max-width: 1023px){.hero.is-success .navbar-menu[data-v-527e8d26]{background-color:#48c78e}}.hero.is-success .navbar-item[data-v-527e8d26],.hero.is-success .navbar-link[data-v-527e8d26]{color:#ffffffb3}.hero.is-success a.navbar-item[data-v-527e8d26]:hover,.hero.is-success a.navbar-item.is-active[data-v-527e8d26],.hero.is-success .navbar-link[data-v-527e8d26]:hover,.hero.is-success .navbar-link.is-active[data-v-527e8d26]{background-color:#3abb81;color:#fff}.hero.is-success .tabs a[data-v-527e8d26]{color:#fff;opacity:.9}.hero.is-success .tabs a[data-v-527e8d26]:hover{opacity:1}.hero.is-success .tabs li.is-active a[data-v-527e8d26]{color:#48c78e!important;opacity:1}.hero.is-success .tabs.is-boxed a[data-v-527e8d26],.hero.is-success .tabs.is-toggle a[data-v-527e8d26]{color:#fff}.hero.is-success .tabs.is-boxed a[data-v-527e8d26]:hover,.hero.is-success .tabs.is-toggle a[data-v-527e8d26]:hover{background-color:#0a0a0a1a}.hero.is-success .tabs.is-boxed li.is-active a[data-v-527e8d26],.hero.is-success .tabs.is-boxed li.is-active a[data-v-527e8d26]:hover,.hero.is-success .tabs.is-toggle li.is-active a[data-v-527e8d26],.hero.is-success .tabs.is-toggle li.is-active a[data-v-527e8d26]:hover{background-color:#fff;border-color:#fff;color:#48c78e}.hero.is-success.is-bold[data-v-527e8d26]{background-image:linear-gradient(141deg,#29b35e 0%,#48c78e 71%,#56d2af 100%)}@media screen and (max-width: 768px){.hero.is-success.is-bold .navbar-menu[data-v-527e8d26]{background-image:linear-gradient(141deg,#29b35e 0%,#48c78e 71%,#56d2af 100%)}}.hero.is-warning[data-v-527e8d26]{background-color:#ffe08a;color:#000000b3}.hero.is-warning a[data-v-527e8d26]:not(.button):not(.dropdown-item):not(.tag):not(.pagination-link.is-current),.hero.is-warning strong[data-v-527e8d26]{color:inherit}.hero.is-warning .title[data-v-527e8d26]{color:#000000b3}.hero.is-warning .subtitle[data-v-527e8d26]{color:#000000e6}.hero.is-warning .subtitle a[data-v-527e8d26]:not(.button),.hero.is-warning .subtitle strong[data-v-527e8d26]{color:#000000b3}@media screen and (max-width: 1023px){.hero.is-warning .navbar-menu[data-v-527e8d26]{background-color:#ffe08a}}.hero.is-warning .navbar-item[data-v-527e8d26],.hero.is-warning .navbar-link[data-v-527e8d26]{color:#000000b3}.hero.is-warning a.navbar-item[data-v-527e8d26]:hover,.hero.is-warning a.navbar-item.is-active[data-v-527e8d26],.hero.is-warning .navbar-link[data-v-527e8d26]:hover,.hero.is-warning .navbar-link.is-active[data-v-527e8d26]{background-color:#ffd970;color:#000000b3}.hero.is-warning .tabs a[data-v-527e8d26]{color:#000000b3;opacity:.9}.hero.is-warning .tabs a[data-v-527e8d26]:hover{opacity:1}.hero.is-warning .tabs li.is-active a[data-v-527e8d26]{color:#ffe08a!important;opacity:1}.hero.is-warning .tabs.is-boxed a[data-v-527e8d26],.hero.is-warning .tabs.is-toggle a[data-v-527e8d26]{color:#000000b3}.hero.is-warning .tabs.is-boxed a[data-v-527e8d26]:hover,.hero.is-warning .tabs.is-toggle a[data-v-527e8d26]:hover{background-color:#0a0a0a1a}.hero.is-warning .tabs.is-boxed li.is-active a[data-v-527e8d26],.hero.is-warning .tabs.is-boxed li.is-active a[data-v-527e8d26]:hover,.hero.is-warning .tabs.is-toggle li.is-active a[data-v-527e8d26],.hero.is-warning .tabs.is-toggle li.is-active a[data-v-527e8d26]:hover{background-color:#000000b3;border-color:#000000b3;color:#ffe08a}.hero.is-warning.is-bold[data-v-527e8d26]{background-image:linear-gradient(141deg,#ffb657 0%,#ffe08a 71%,#fff6a3 100%)}@media screen and (max-width: 768px){.hero.is-warning.is-bold .navbar-menu[data-v-527e8d26]{background-image:linear-gradient(141deg,#ffb657 0%,#ffe08a 71%,#fff6a3 100%)}}.hero.is-danger[data-v-527e8d26]{background-color:#f14668;color:#fff}.hero.is-danger a[data-v-527e8d26]:not(.button):not(.dropdown-item):not(.tag):not(.pagination-link.is-current),.hero.is-danger strong[data-v-527e8d26]{color:inherit}.hero.is-danger .title[data-v-527e8d26]{color:#fff}.hero.is-danger .subtitle[data-v-527e8d26]{color:#ffffffe6}.hero.is-danger .subtitle a[data-v-527e8d26]:not(.button),.hero.is-danger .subtitle strong[data-v-527e8d26]{color:#fff}@media screen and (max-width: 1023px){.hero.is-danger .navbar-menu[data-v-527e8d26]{background-color:#f14668}}.hero.is-danger .navbar-item[data-v-527e8d26],.hero.is-danger .navbar-link[data-v-527e8d26]{color:#ffffffb3}.hero.is-danger a.navbar-item[data-v-527e8d26]:hover,.hero.is-danger a.navbar-item.is-active[data-v-527e8d26],.hero.is-danger .navbar-link[data-v-527e8d26]:hover,.hero.is-danger .navbar-link.is-active[data-v-527e8d26]{background-color:#ef2e55;color:#fff}.hero.is-danger .tabs a[data-v-527e8d26]{color:#fff;opacity:.9}.hero.is-danger .tabs a[data-v-527e8d26]:hover{opacity:1}.hero.is-danger .tabs li.is-active a[data-v-527e8d26]{color:#f14668!important;opacity:1}.hero.is-danger .tabs.is-boxed a[data-v-527e8d26],.hero.is-danger .tabs.is-toggle a[data-v-527e8d26]{color:#fff}.hero.is-danger .tabs.is-boxed a[data-v-527e8d26]:hover,.hero.is-danger .tabs.is-toggle a[data-v-527e8d26]:hover{background-color:#0a0a0a1a}.hero.is-danger .tabs.is-boxed li.is-active a[data-v-527e8d26],.hero.is-danger .tabs.is-boxed li.is-active a[data-v-527e8d26]:hover,.hero.is-danger .tabs.is-toggle li.is-active a[data-v-527e8d26],.hero.is-danger .tabs.is-toggle li.is-active a[data-v-527e8d26]:hover{background-color:#fff;border-color:#fff;color:#f14668}.hero.is-danger.is-bold[data-v-527e8d26]{background-image:linear-gradient(141deg,#fa0a62 0%,#f14668 71%,#f7595f 100%)}@media screen and (max-width: 768px){.hero.is-danger.is-bold .navbar-menu[data-v-527e8d26]{background-image:linear-gradient(141deg,#fa0a62 0%,#f14668 71%,#f7595f 100%)}}.hero.is-small .hero-body[data-v-527e8d26]{padding:1.5rem}@media screen and (min-width: 769px),print{.hero.is-medium .hero-body[data-v-527e8d26]{padding:9rem 4.5rem}}@media screen and (min-width: 769px),print{.hero.is-large .hero-body[data-v-527e8d26]{padding:18rem 6rem}}.hero.is-halfheight .hero-body[data-v-527e8d26],.hero.is-fullheight .hero-body[data-v-527e8d26],.hero.is-fullheight-with-navbar .hero-body[data-v-527e8d26]{align-items:center;display:flex}.hero.is-halfheight .hero-body>.container[data-v-527e8d26],.hero.is-fullheight .hero-body>.container[data-v-527e8d26],.hero.is-fullheight-with-navbar .hero-body>.container[data-v-527e8d26]{flex-grow:1;flex-shrink:1}.hero.is-halfheight[data-v-527e8d26]{min-height:50vh}.hero.is-fullheight[data-v-527e8d26]{min-height:100vh}.hero-video[data-v-527e8d26]{overflow:hidden}.hero-video video[data-v-527e8d26]{left:50%;min-height:100%;min-width:100%;position:absolute;top:50%;transform:translate3d(-50%,-50%,0)}.hero-video.is-transparent[data-v-527e8d26]{opacity:.3}@media screen and (max-width: 768px){.hero-video[data-v-527e8d26]{display:none}}.hero-buttons[data-v-527e8d26]{margin-top:1.5rem}@media screen and (max-width: 768px){.hero-buttons .button[data-v-527e8d26]{display:flex}.hero-buttons .button[data-v-527e8d26]:not(:last-child){margin-bottom:.75rem}}@media screen and (min-width: 769px),print{.hero-buttons[data-v-527e8d26]{display:flex;justify-content:center}.hero-buttons .button[data-v-527e8d26]:not(:last-child){margin-right:1.5rem}}.hero-head[data-v-527e8d26],.hero-foot[data-v-527e8d26]{flex-grow:0;flex-shrink:0}.hero-body[data-v-527e8d26]{flex-grow:1;flex-shrink:0;padding:3rem 1.5rem}@media screen and (min-width: 769px),print{.hero-body[data-v-527e8d26]{padding:3rem}}.section[data-v-527e8d26]{padding:3rem 1.5rem}@media screen and (min-width: 1024px){.section[data-v-527e8d26]{padding:3rem}.section.is-medium[data-v-527e8d26]{padding:9rem 4.5rem}.section.is-large[data-v-527e8d26]{padding:18rem 6rem}}.footer[data-v-527e8d26]{background-color:#fafafa;padding:3rem 1.5rem 6rem}
`, Xn = (a, e) => {
  const t = a.__vccOpts || a;
  for (const [i, d] of e)
    t[i] = d;
  return t;
}, Jn = /* @__PURE__ */ Xn($n, [["styles", [Yn]], ["__scopeId", "data-v-527e8d26"]]), Zn = Vn(Jn);
customElements.define("wc-base-button", Zn);
