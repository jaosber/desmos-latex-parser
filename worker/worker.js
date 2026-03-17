var requirejs, require, define;
(!(function (e) {
  function t(e, t) {
    return y.call(e, t);
  }
  function r(e, t) {
    var r,
      n,
      i,
      a,
      s,
      o,
      u,
      c,
      l,
      p,
      f = t && t.split("/"),
      h = m.map,
      d = (h && h["*"]) || {};
    if (e && "." === e.charAt(0))
      if (t) {
        for (
          f = f.slice(0, f.length - 1), e = f.concat(e.split("/")), c = 0;
          c < e.length;
          c += 1
        )
          if (((p = e[c]), "." === p)) (e.splice(c, 1), (c -= 1));
          else if (".." === p) {
            if (1 === c && (".." === e[2] || ".." === e[0])) break;
            c > 0 && (e.splice(c - 1, 2), (c -= 2));
          }
        e = e.join("/");
      } else 0 === e.indexOf("./") && (e = e.substring(2));
    if ((f || d) && h) {
      for (r = e.split("/"), c = r.length; c > 0; c -= 1) {
        if (((n = r.slice(0, c).join("/")), f))
          for (l = f.length; l > 0; l -= 1)
            if (((i = h[f.slice(0, l).join("/")]), i && (i = i[n]))) {
              ((a = i), (s = c));
              break;
            }
        if (a) break;
        !o && d && d[n] && ((o = d[n]), (u = c));
      }
      (!a && o && ((a = o), (s = u)),
        a && (r.splice(0, s, a), (e = r.join("/"))));
    }
    return e;
  }
  function n(t, r) {
    return function () {
      return l.apply(e, v.call(arguments, 0).concat([t, r]));
    };
  }
  function i(e) {
    return function (t) {
      return r(t, e);
    };
  }
  function a(e) {
    return function (t) {
      h[e] = t;
    };
  }
  function s(r) {
    if (t(d, r)) {
      var n = d[r];
      (delete d[r], (g[r] = !0), c.apply(e, n));
    }
    if (!t(h, r) && !t(g, r)) throw new Error("No " + r);
    return h[r];
  }
  function o(e) {
    var t,
      r = e ? e.indexOf("!") : -1;
    return (
      r > -1 && ((t = e.substring(0, r)), (e = e.substring(r + 1, e.length))),
      [t, e]
    );
  }
  function u(e) {
    return function () {
      return (m && m.config && m.config[e]) || {};
    };
  }
  var c,
    l,
    p,
    f,
    h = {},
    d = {},
    m = {},
    g = {},
    y = Object.prototype.hasOwnProperty,
    v = [].slice;
  ((p = function (e, t) {
    var n,
      a = o(e),
      u = a[0];
    return (
      (e = a[1]),
      u && ((u = r(u, t)), (n = s(u))),
      u
        ? (e = n && n.normalize ? n.normalize(e, i(t)) : r(e, t))
        : ((e = r(e, t)), (a = o(e)), (u = a[0]), (e = a[1]), u && (n = s(u))),
      { f: u ? u + "!" + e : e, n: e, pr: u, p: n }
    );
  }),
    (f = {
      require: function (e) {
        return n(e);
      },
      exports: function (e) {
        var t = h[e];
        return "undefined" != typeof t ? t : (h[e] = {});
      },
      module: function (e) {
        return { id: e, uri: "", exports: h[e], config: u(e) };
      },
    }),
    (c = function (r, i, o, u) {
      var c,
        l,
        m,
        y,
        v,
        b,
        x = [];
      if (((u = u || r), "function" == typeof o)) {
        for (
          i = !i.length && o.length ? ["require", "exports", "module"] : i,
            v = 0;
          v < i.length;
          v += 1
        )
          if (((y = p(i[v], u)), (l = y.f), "require" === l))
            x[v] = f.require(r);
          else if ("exports" === l) ((x[v] = f.exports(r)), (b = !0));
          else if ("module" === l) c = x[v] = f.module(r);
          else if (t(h, l) || t(d, l) || t(g, l)) x[v] = s(l);
          else {
            if (!y.p) throw new Error(r + " missing " + l);
            (y.p.load(y.n, n(u, !0), a(l), {}), (x[v] = h[l]));
          }
        ((m = o.apply(h[r], x)),
          r &&
            (c && c.exports !== e && c.exports !== h[r]
              ? (h[r] = c.exports)
              : (m === e && b) || (h[r] = m)));
      } else r && (h[r] = o);
    }),
    (requirejs =
      require =
      l =
        function (t, r, n, i, a) {
          return "string" == typeof t
            ? f[t]
              ? f[t](r)
              : s(p(t, r).f)
            : (t.splice ||
                ((m = t), r.splice ? ((t = r), (r = n), (n = null)) : (t = e)),
              (r = r || function () {}),
              "function" == typeof n && ((n = i), (i = a)),
              i
                ? c(e, t, r, n)
                : setTimeout(function () {
                    c(e, t, r, n);
                  }, 4),
              l);
        }),
    (l.config = function (e) {
      return ((m = e), m.deps && l(m.deps, m.callback), l);
    }),
    (define = function (e, r, n) {
      (r.splice || ((n = r), (r = [])),
        t(h, e) || t(d, e) || (d[e] = [e, r, n]));
    }),
    (define.amd = { jQuery: !0 }));
})(),
  "undefined" != typeof ALMOND_OVERRIDES &&
    ALMOND_OVERRIDES &&
    ((define = ALMOND_OVERRIDES.define || define),
    (require = ALMOND_OVERRIDES.require || require),
    (requirejs = ALMOND_OVERRIDES.requirejs || requirejs)),
  define("vendor/almond", function () {}),
  define("testbridge", ["require"], function (e) {
    function t() {
      window.consoleOverride = !0;
      var e = window.console.log;
      window.console.log = function () {
        for (var t = [], r = 0; r < arguments.length; r++) t.push(arguments[r]);
        e.apply(window.console, [].concat([t.join(" ")], t));
      };
    }
    var r = {
      ready: function () {
        try {
          ((window.TestBridge = r), parent.USING_SELENIUM && t());
        } catch (e) {}
      },
    };
    return r;
  }),
  define("console", ["require"], function (e) {
    var t = function () {},
      r = [
        "log",
        "info",
        "warn",
        "error",
        "assert",
        "dir",
        "clear",
        "profile",
        "profileEnd",
        "time",
        "timeEnd",
        "group",
        "groupCollapsed",
        "groupEnd",
        "trace",
      ],
      n = {},
      i = function (e) {
        "undefined" != typeof window && window.console && window.console[e]
          ? (n[e] = function () {
              Function.prototype.apply.call(
                window.console[e],
                window.console,
                arguments,
              );
            })
          : (n[e] = t);
      };
    return (r.forEach(i), n);
  }),
  define("pjs", [], function () {
    var e = (function (e, t, r) {
      function n(e) {
        return "object" == typeof e;
      }
      function i(e) {
        return "function" == typeof e;
      }
      function a() {}
      function s(o, u) {
        function c() {
          var e = new l();
          return (i(e.init) && e.init.apply(e, arguments), e);
        }
        function l() {}
        (u === r && ((u = o), (o = Object)), (c.Bare = l));
        var p,
          f = (a[e] = o[e]),
          h = (l[e] = c[e] = new a());
        return (
          (h.constructor = c),
          (c.mixin = function (t) {
            return ((l[e] = c[e] = s(c, t)[e]), c);
          }),
          (c.open = function (e) {
            if (
              ((p = {}),
              i(e) ? (p = e.call(c, h, f, c, o)) : n(e) && (p = e),
              n(p))
            )
              for (var r in p) t.call(p, r) && (h[r] = p[r]);
            return (i(h.init) || (h.init = o), c);
          })(u)
        );
      }
      return s;
    })("prototype", {}.hasOwnProperty);
    return e;
  }),
  function () {
    function e(e) {
      function t(t, r, n, i, a, s) {
        for (; a >= 0 && a < s; a += e) {
          var o = i ? i[a] : a;
          n = r(n, t[o], o, t);
        }
        return n;
      }
      return function (r, n, i, a) {
        n = b(n, a, 4);
        var s = !I(r) && v.keys(r),
          o = (s || r).length,
          u = e > 0 ? 0 : o - 1;
        return (
          arguments.length < 3 && ((i = r[s ? s[u] : u]), (u += e)),
          t(r, n, i, s, u, o)
        );
      };
    }
    function t(e) {
      return function (t, r, n) {
        r = x(r, n);
        for (var i = M(t), a = e > 0 ? 0 : i - 1; a >= 0 && a < i; a += e)
          if (r(t[a], a, t)) return a;
        return -1;
      };
    }
    function r(e, t, r) {
      return function (n, i, a) {
        var s = 0,
          o = M(n);
        if ("number" == typeof a)
          e > 0
            ? (s = a >= 0 ? a : Math.max(a + o, s))
            : (o = a >= 0 ? Math.min(a + 1, o) : a + o + 1);
        else if (r && a && o) return ((a = r(n, i)), n[a] === i ? a : -1);
        if (i !== i)
          return ((a = t(l.call(n, s, o), v.isNaN)), a >= 0 ? a + s : -1);
        for (a = e > 0 ? s : o - 1; a >= 0 && a < o; a += e)
          if (n[a] === i) return a;
        return -1;
      };
    }
    function n(e, t) {
      var r = O.length,
        n = e.constructor,
        i = (v.isFunction(n) && n.prototype) || o,
        a = "constructor";
      for (v.has(e, a) && !v.contains(t, a) && t.push(a); r--; )
        ((a = O[r]), a in e && e[a] !== i[a] && !v.contains(t, a) && t.push(a));
    }
    var i = this,
      a = i._,
      s = Array.prototype,
      o = Object.prototype,
      u = Function.prototype,
      c = s.push,
      l = s.slice,
      p = o.toString,
      f = o.hasOwnProperty,
      h = Array.isArray,
      d = Object.keys,
      m = u.bind,
      g = Object.create,
      y = function () {},
      v = function (e) {
        return e instanceof v
          ? e
          : this instanceof v
            ? void (this._wrapped = e)
            : new v(e);
      };
    ("undefined" != typeof exports
      ? ("undefined" != typeof module &&
          module.exports &&
          (exports = module.exports = v),
        (exports._ = v))
      : (i._ = v),
      (v.VERSION = "1.8.3"));
    var b = function (e, t, r) {
        if (void 0 === t) return e;
        switch (null == r ? 3 : r) {
          case 1:
            return function (r) {
              return e.call(t, r);
            };
          case 2:
            return function (r, n) {
              return e.call(t, r, n);
            };
          case 3:
            return function (r, n, i) {
              return e.call(t, r, n, i);
            };
          case 4:
            return function (r, n, i, a) {
              return e.call(t, r, n, i, a);
            };
        }
        return function () {
          return e.apply(t, arguments);
        };
      },
      x = function (e, t, r) {
        return null == e
          ? v.identity
          : v.isFunction(e)
            ? b(e, t, r)
            : v.isObject(e)
              ? v.matcher(e)
              : v.property(e);
      };
    v.iteratee = function (e, t) {
      return x(e, t, 1 / 0);
    };
    var _ = function (e, t) {
        return function (r) {
          var n = arguments.length;
          if (n < 2 || null == r) return r;
          for (var i = 1; i < n; i++)
            for (
              var a = arguments[i], s = e(a), o = s.length, u = 0;
              u < o;
              u++
            ) {
              var c = s[u];
              (t && void 0 !== r[c]) || (r[c] = a[c]);
            }
          return r;
        };
      },
      E = function (e) {
        if (!v.isObject(e)) return {};
        if (g) return g(e);
        y.prototype = e;
        var t = new y();
        return ((y.prototype = null), t);
      },
      S = function (e) {
        return function (t) {
          return null == t ? void 0 : t[e];
        };
      },
      w = Math.pow(2, 53) - 1,
      M = S("length"),
      I = function (e) {
        var t = M(e);
        return "number" == typeof t && t >= 0 && t <= w;
      };
    ((v.each = v.forEach =
      function (e, t, r) {
        t = b(t, r);
        var n, i;
        if (I(e)) for (n = 0, i = e.length; n < i; n++) t(e[n], n, e);
        else {
          var a = v.keys(e);
          for (n = 0, i = a.length; n < i; n++) t(e[a[n]], a[n], e);
        }
        return e;
      }),
      (v.map = v.collect =
        function (e, t, r) {
          t = x(t, r);
          for (
            var n = !I(e) && v.keys(e),
              i = (n || e).length,
              a = Array(i),
              s = 0;
            s < i;
            s++
          ) {
            var o = n ? n[s] : s;
            a[s] = t(e[o], o, e);
          }
          return a;
        }),
      (v.reduce = v.foldl = v.inject = e(1)),
      (v.reduceRight = v.foldr = e(-1)),
      (v.find = v.detect =
        function (e, t, r) {
          var n;
          if (
            ((n = I(e) ? v.findIndex(e, t, r) : v.findKey(e, t, r)),
            void 0 !== n && n !== -1)
          )
            return e[n];
        }),
      (v.filter = v.select =
        function (e, t, r) {
          var n = [];
          return (
            (t = x(t, r)),
            v.each(e, function (e, r, i) {
              t(e, r, i) && n.push(e);
            }),
            n
          );
        }),
      (v.reject = function (e, t, r) {
        return v.filter(e, v.negate(x(t)), r);
      }),
      (v.every = v.all =
        function (e, t, r) {
          t = x(t, r);
          for (
            var n = !I(e) && v.keys(e), i = (n || e).length, a = 0;
            a < i;
            a++
          ) {
            var s = n ? n[a] : a;
            if (!t(e[s], s, e)) return !1;
          }
          return !0;
        }),
      (v.some = v.any =
        function (e, t, r) {
          t = x(t, r);
          for (
            var n = !I(e) && v.keys(e), i = (n || e).length, a = 0;
            a < i;
            a++
          ) {
            var s = n ? n[a] : a;
            if (t(e[s], s, e)) return !0;
          }
          return !1;
        }),
      (v.contains =
        v.includes =
        v.include =
          function (e, t, r, n) {
            return (
              I(e) || (e = v.values(e)),
              ("number" != typeof r || n) && (r = 0),
              v.indexOf(e, t, r) >= 0
            );
          }),
      (v.invoke = function (e, t) {
        var r = l.call(arguments, 2),
          n = v.isFunction(t);
        return v.map(e, function (e) {
          var i = n ? t : e[t];
          return null == i ? i : i.apply(e, r);
        });
      }),
      (v.pluck = function (e, t) {
        return v.map(e, v.property(t));
      }),
      (v.where = function (e, t) {
        return v.filter(e, v.matcher(t));
      }),
      (v.findWhere = function (e, t) {
        return v.find(e, v.matcher(t));
      }),
      (v.max = function (e, t, r) {
        var n,
          i,
          a = -(1 / 0),
          s = -(1 / 0);
        if (null == t && null != e) {
          e = I(e) ? e : v.values(e);
          for (var o = 0, u = e.length; o < u; o++)
            ((n = e[o]), n > a && (a = n));
        } else
          ((t = x(t, r)),
            v.each(e, function (e, r, n) {
              ((i = t(e, r, n)),
                (i > s || (i === -(1 / 0) && a === -(1 / 0))) &&
                  ((a = e), (s = i)));
            }));
        return a;
      }),
      (v.min = function (e, t, r) {
        var n,
          i,
          a = 1 / 0,
          s = 1 / 0;
        if (null == t && null != e) {
          e = I(e) ? e : v.values(e);
          for (var o = 0, u = e.length; o < u; o++)
            ((n = e[o]), n < a && (a = n));
        } else
          ((t = x(t, r)),
            v.each(e, function (e, r, n) {
              ((i = t(e, r, n)),
                (i < s || (i === 1 / 0 && a === 1 / 0)) && ((a = e), (s = i)));
            }));
        return a;
      }),
      (v.shuffle = function (e) {
        for (
          var t, r = I(e) ? e : v.values(e), n = r.length, i = Array(n), a = 0;
          a < n;
          a++
        )
          ((t = v.random(0, a)), t !== a && (i[a] = i[t]), (i[t] = r[a]));
        return i;
      }),
      (v.sample = function (e, t, r) {
        return null == t || r
          ? (I(e) || (e = v.values(e)), e[v.random(e.length - 1)])
          : v.shuffle(e).slice(0, Math.max(0, t));
      }),
      (v.sortBy = function (e, t, r) {
        return (
          (t = x(t, r)),
          v.pluck(
            v
              .map(e, function (e, r, n) {
                return { value: e, index: r, criteria: t(e, r, n) };
              })
              .sort(function (e, t) {
                var r = e.criteria,
                  n = t.criteria;
                if (r !== n) {
                  if (r > n || void 0 === r) return 1;
                  if (r < n || void 0 === n) return -1;
                }
                return e.index - t.index;
              }),
            "value",
          )
        );
      }));
    var P = function (e) {
      return function (t, r, n) {
        var i = {};
        return (
          (r = x(r, n)),
          v.each(t, function (n, a) {
            var s = r(n, a, t);
            e(i, n, s);
          }),
          i
        );
      };
    };
    ((v.groupBy = P(function (e, t, r) {
      v.has(e, r) ? e[r].push(t) : (e[r] = [t]);
    })),
      (v.indexBy = P(function (e, t, r) {
        e[r] = t;
      })),
      (v.countBy = P(function (e, t, r) {
        v.has(e, r) ? e[r]++ : (e[r] = 1);
      })),
      (v.toArray = function (e) {
        return e
          ? v.isArray(e)
            ? l.call(e)
            : I(e)
              ? v.map(e, v.identity)
              : v.values(e)
          : [];
      }),
      (v.size = function (e) {
        return null == e ? 0 : I(e) ? e.length : v.keys(e).length;
      }),
      (v.partition = function (e, t, r) {
        t = x(t, r);
        var n = [],
          i = [];
        return (
          v.each(e, function (e, r, a) {
            (t(e, r, a) ? n : i).push(e);
          }),
          [n, i]
        );
      }),
      (v.first =
        v.head =
        v.take =
          function (e, t, r) {
            if (null != e)
              return null == t || r ? e[0] : v.initial(e, e.length - t);
          }),
      (v.initial = function (e, t, r) {
        return l.call(e, 0, Math.max(0, e.length - (null == t || r ? 1 : t)));
      }),
      (v.last = function (e, t, r) {
        if (null != e)
          return null == t || r
            ? e[e.length - 1]
            : v.rest(e, Math.max(0, e.length - t));
      }),
      (v.rest =
        v.tail =
        v.drop =
          function (e, t, r) {
            return l.call(e, null == t || r ? 1 : t);
          }),
      (v.compact = function (e) {
        return v.filter(e, v.identity);
      }));
    var T = function (e, t, r, n) {
      for (var i = [], a = 0, s = n || 0, o = M(e); s < o; s++) {
        var u = e[s];
        if (I(u) && (v.isArray(u) || v.isArguments(u))) {
          t || (u = T(u, t, r));
          var c = 0,
            l = u.length;
          for (i.length += l; c < l; ) i[a++] = u[c++];
        } else r || (i[a++] = u);
      }
      return i;
    };
    ((v.flatten = function (e, t) {
      return T(e, t, !1);
    }),
      (v.without = function (e) {
        return v.difference(e, l.call(arguments, 1));
      }),
      (v.uniq = v.unique =
        function (e, t, r, n) {
          (v.isBoolean(t) || ((n = r), (r = t), (t = !1)),
            null != r && (r = x(r, n)));
          for (var i = [], a = [], s = 0, o = M(e); s < o; s++) {
            var u = e[s],
              c = r ? r(u, s, e) : u;
            t
              ? ((s && a === c) || i.push(u), (a = c))
              : r
                ? v.contains(a, c) || (a.push(c), i.push(u))
                : v.contains(i, u) || i.push(u);
          }
          return i;
        }),
      (v.union = function () {
        return v.uniq(T(arguments, !0, !0));
      }),
      (v.intersection = function (e) {
        for (var t = [], r = arguments.length, n = 0, i = M(e); n < i; n++) {
          var a = e[n];
          if (!v.contains(t, a)) {
            for (var s = 1; s < r && v.contains(arguments[s], a); s++);
            s === r && t.push(a);
          }
        }
        return t;
      }),
      (v.difference = function (e) {
        var t = T(arguments, !0, !0, 1);
        return v.filter(e, function (e) {
          return !v.contains(t, e);
        });
      }),
      (v.zip = function () {
        return v.unzip(arguments);
      }),
      (v.unzip = function (e) {
        for (
          var t = (e && v.max(e, M).length) || 0, r = Array(t), n = 0;
          n < t;
          n++
        )
          r[n] = v.pluck(e, n);
        return r;
      }),
      (v.object = function (e, t) {
        for (var r = {}, n = 0, i = M(e); n < i; n++)
          t ? (r[e[n]] = t[n]) : (r[e[n][0]] = e[n][1]);
        return r;
      }),
      (v.findIndex = t(1)),
      (v.findLastIndex = t(-1)),
      (v.sortedIndex = function (e, t, r, n) {
        r = x(r, n, 1);
        for (var i = r(t), a = 0, s = M(e); a < s; ) {
          var o = Math.floor((a + s) / 2);
          r(e[o]) < i ? (a = o + 1) : (s = o);
        }
        return a;
      }),
      (v.indexOf = r(1, v.findIndex, v.sortedIndex)),
      (v.lastIndexOf = r(-1, v.findLastIndex)),
      (v.range = function (e, t, r) {
        (null == t && ((t = e || 0), (e = 0)), (r = r || 1));
        for (
          var n = Math.max(Math.ceil((t - e) / r), 0), i = Array(n), a = 0;
          a < n;
          a++, e += r
        )
          i[a] = e;
        return i;
      }));
    var C = function (e, t, r, n, i) {
      if (!(n instanceof t)) return e.apply(r, i);
      var a = E(e.prototype),
        s = e.apply(a, i);
      return v.isObject(s) ? s : a;
    };
    ((v.bind = function (e, t) {
      if (m && e.bind === m) return m.apply(e, l.call(arguments, 1));
      if (!v.isFunction(e))
        throw new TypeError("Bind must be called on a function");
      var r = l.call(arguments, 2),
        n = function () {
          return C(e, n, t, this, r.concat(l.call(arguments)));
        };
      return n;
    }),
      (v.partial = function (e) {
        var t = l.call(arguments, 1),
          r = function () {
            for (var n = 0, i = t.length, a = Array(i), s = 0; s < i; s++)
              a[s] = t[s] === v ? arguments[n++] : t[s];
            for (; n < arguments.length; ) a.push(arguments[n++]);
            return C(e, r, this, this, a);
          };
        return r;
      }),
      (v.bindAll = function (e) {
        var t,
          r,
          n = arguments.length;
        if (n <= 1) throw new Error("bindAll must be passed function names");
        for (t = 1; t < n; t++) ((r = arguments[t]), (e[r] = v.bind(e[r], e)));
        return e;
      }),
      (v.memoize = function (e, t) {
        var r = function (n) {
          var i = r.cache,
            a = "" + (t ? t.apply(this, arguments) : n);
          return (v.has(i, a) || (i[a] = e.apply(this, arguments)), i[a]);
        };
        return ((r.cache = {}), r);
      }),
      (v.delay = function (e, t) {
        var r = l.call(arguments, 2);
        return setTimeout(function () {
          return e.apply(null, r);
        }, t);
      }),
      (v.defer = v.partial(v.delay, v, 1)),
      (v.throttle = function (e, t, r) {
        var n,
          i,
          a,
          s = null,
          o = 0;
        r || (r = {});
        var u = function () {
          ((o = r.leading === !1 ? 0 : v.now()),
            (s = null),
            (a = e.apply(n, i)),
            s || (n = i = null));
        };
        return function () {
          var c = v.now();
          o || r.leading !== !1 || (o = c);
          var l = t - (c - o);
          return (
            (n = this),
            (i = arguments),
            l <= 0 || l > t
              ? (s && (clearTimeout(s), (s = null)),
                (o = c),
                (a = e.apply(n, i)),
                s || (n = i = null))
              : s || r.trailing === !1 || (s = setTimeout(u, l)),
            a
          );
        };
      }),
      (v.debounce = function (e, t, r) {
        var n,
          i,
          a,
          s,
          o,
          u = function () {
            var c = v.now() - s;
            c < t && c >= 0
              ? (n = setTimeout(u, t - c))
              : ((n = null), r || ((o = e.apply(a, i)), n || (a = i = null)));
          };
        return function () {
          ((a = this), (i = arguments), (s = v.now()));
          var c = r && !n;
          return (
            n || (n = setTimeout(u, t)),
            c && ((o = e.apply(a, i)), (a = i = null)),
            o
          );
        };
      }),
      (v.wrap = function (e, t) {
        return v.partial(t, e);
      }),
      (v.negate = function (e) {
        return function () {
          return !e.apply(this, arguments);
        };
      }),
      (v.compose = function () {
        var e = arguments,
          t = e.length - 1;
        return function () {
          for (var r = t, n = e[t].apply(this, arguments); r--; )
            n = e[r].call(this, n);
          return n;
        };
      }),
      (v.after = function (e, t) {
        return function () {
          if (--e < 1) return t.apply(this, arguments);
        };
      }),
      (v.before = function (e, t) {
        var r;
        return function () {
          return (
            --e > 0 && (r = t.apply(this, arguments)),
            e <= 1 && (t = null),
            r
          );
        };
      }),
      (v.once = v.partial(v.before, 2)));
    var D = !{ toString: null }.propertyIsEnumerable("toString"),
      O = [
        "valueOf",
        "isPrototypeOf",
        "toString",
        "propertyIsEnumerable",
        "hasOwnProperty",
        "toLocaleString",
      ];
    ((v.keys = function (e) {
      if (!v.isObject(e)) return [];
      if (d) return d(e);
      var t = [];
      for (var r in e) v.has(e, r) && t.push(r);
      return (D && n(e, t), t);
    }),
      (v.allKeys = function (e) {
        if (!v.isObject(e)) return [];
        var t = [];
        for (var r in e) t.push(r);
        return (D && n(e, t), t);
      }),
      (v.values = function (e) {
        for (var t = v.keys(e), r = t.length, n = Array(r), i = 0; i < r; i++)
          n[i] = e[t[i]];
        return n;
      }),
      (v.mapObject = function (e, t, r) {
        t = x(t, r);
        for (var n, i = v.keys(e), a = i.length, s = {}, o = 0; o < a; o++)
          ((n = i[o]), (s[n] = t(e[n], n, e)));
        return s;
      }),
      (v.pairs = function (e) {
        for (var t = v.keys(e), r = t.length, n = Array(r), i = 0; i < r; i++)
          n[i] = [t[i], e[t[i]]];
        return n;
      }),
      (v.invert = function (e) {
        for (var t = {}, r = v.keys(e), n = 0, i = r.length; n < i; n++)
          t[e[r[n]]] = r[n];
        return t;
      }),
      (v.functions = v.methods =
        function (e) {
          var t = [];
          for (var r in e) v.isFunction(e[r]) && t.push(r);
          return t.sort();
        }),
      (v.extend = _(v.allKeys)),
      (v.extendOwn = v.assign = _(v.keys)),
      (v.findKey = function (e, t, r) {
        t = x(t, r);
        for (var n, i = v.keys(e), a = 0, s = i.length; a < s; a++)
          if (((n = i[a]), t(e[n], n, e))) return n;
      }),
      (v.pick = function (e, t, r) {
        var n,
          i,
          a = {},
          s = e;
        if (null == s) return a;
        v.isFunction(t)
          ? ((i = v.allKeys(s)), (n = b(t, r)))
          : ((i = T(arguments, !1, !1, 1)),
            (n = function (e, t, r) {
              return t in r;
            }),
            (s = Object(s)));
        for (var o = 0, u = i.length; o < u; o++) {
          var c = i[o],
            l = s[c];
          n(l, c, s) && (a[c] = l);
        }
        return a;
      }),
      (v.omit = function (e, t, r) {
        if (v.isFunction(t)) t = v.negate(t);
        else {
          var n = v.map(T(arguments, !1, !1, 1), String);
          t = function (e, t) {
            return !v.contains(n, t);
          };
        }
        return v.pick(e, t, r);
      }),
      (v.defaults = _(v.allKeys, !0)),
      (v.create = function (e, t) {
        var r = E(e);
        return (t && v.extendOwn(r, t), r);
      }),
      (v.clone = function (e) {
        return v.isObject(e) ? (v.isArray(e) ? e.slice() : v.extend({}, e)) : e;
      }),
      (v.tap = function (e, t) {
        return (t(e), e);
      }),
      (v.isMatch = function (e, t) {
        var r = v.keys(t),
          n = r.length;
        if (null == e) return !n;
        for (var i = Object(e), a = 0; a < n; a++) {
          var s = r[a];
          if (t[s] !== i[s] || !(s in i)) return !1;
        }
        return !0;
      }));
    var N = function (e, t, r, n) {
      if (e === t) return 0 !== e || 1 / e === 1 / t;
      if (null == e || null == t) return e === t;
      (e instanceof v && (e = e._wrapped), t instanceof v && (t = t._wrapped));
      var i = p.call(e);
      if (i !== p.call(t)) return !1;
      switch (i) {
        case "[object RegExp]":
        case "[object String]":
          return "" + e == "" + t;
        case "[object Number]":
          return +e !== +e
            ? +t !== +t
            : 0 === +e
              ? 1 / +e === 1 / t
              : +e === +t;
        case "[object Date]":
        case "[object Boolean]":
          return +e === +t;
      }
      var a = "[object Array]" === i;
      if (!a) {
        if ("object" != typeof e || "object" != typeof t) return !1;
        var s = e.constructor,
          o = t.constructor;
        if (
          s !== o &&
          !(
            v.isFunction(s) &&
            s instanceof s &&
            v.isFunction(o) &&
            o instanceof o
          ) &&
          "constructor" in e &&
          "constructor" in t
        )
          return !1;
      }
      ((r = r || []), (n = n || []));
      for (var u = r.length; u--; ) if (r[u] === e) return n[u] === t;
      if ((r.push(e), n.push(t), a)) {
        if (((u = e.length), u !== t.length)) return !1;
        for (; u--; ) if (!N(e[u], t[u], r, n)) return !1;
      } else {
        var c,
          l = v.keys(e);
        if (((u = l.length), v.keys(t).length !== u)) return !1;
        for (; u--; )
          if (((c = l[u]), !v.has(t, c) || !N(e[c], t[c], r, n))) return !1;
      }
      return (r.pop(), n.pop(), !0);
    };
    ((v.isEqual = function (e, t) {
      return N(e, t);
    }),
      (v.isEmpty = function (e) {
        return (
          null == e ||
          (I(e) && (v.isArray(e) || v.isString(e) || v.isArguments(e))
            ? 0 === e.length
            : 0 === v.keys(e).length)
        );
      }),
      (v.isElement = function (e) {
        return !(!e || 1 !== e.nodeType);
      }),
      (v.isArray =
        h ||
        function (e) {
          return "[object Array]" === p.call(e);
        }),
      (v.isObject = function (e) {
        var t = typeof e;
        return "function" === t || ("object" === t && !!e);
      }),
      v.each(
        [
          "Arguments",
          "Function",
          "String",
          "Number",
          "Date",
          "RegExp",
          "Error",
        ],
        function (e) {
          v["is" + e] = function (t) {
            return p.call(t) === "[object " + e + "]";
          };
        },
      ),
      v.isArguments(arguments) ||
        (v.isArguments = function (e) {
          return v.has(e, "callee");
        }),
      "function" != typeof /./ &&
        "object" != typeof Int8Array &&
        (v.isFunction = function (e) {
          return "function" == typeof e || !1;
        }),
      (v.isFinite = function (e) {
        return isFinite(e) && !isNaN(parseFloat(e));
      }),
      (v.isNaN = function (e) {
        return v.isNumber(e) && e !== +e;
      }),
      (v.isBoolean = function (e) {
        return e === !0 || e === !1 || "[object Boolean]" === p.call(e);
      }),
      (v.isNull = function (e) {
        return null === e;
      }),
      (v.isUndefined = function (e) {
        return void 0 === e;
      }),
      (v.has = function (e, t) {
        return null != e && f.call(e, t);
      }),
      (v.noConflict = function () {
        return ((i._ = a), this);
      }),
      (v.identity = function (e) {
        return e;
      }),
      (v.constant = function (e) {
        return function () {
          return e;
        };
      }),
      (v.noop = function () {}),
      (v.property = S),
      (v.propertyOf = function (e) {
        return null == e
          ? function () {}
          : function (t) {
              return e[t];
            };
      }),
      (v.matcher = v.matches =
        function (e) {
          return (
            (e = v.extendOwn({}, e)),
            function (t) {
              return v.isMatch(t, e);
            }
          );
        }),
      (v.times = function (e, t, r) {
        var n = Array(Math.max(0, e));
        t = b(t, r, 1);
        for (var i = 0; i < e; i++) n[i] = t(i);
        return n;
      }),
      (v.random = function (e, t) {
        return (
          null == t && ((t = e), (e = 0)),
          e + Math.floor(Math.random() * (t - e + 1))
        );
      }),
      (v.now =
        Date.now ||
        function () {
          return new Date().getTime();
        }));
    var L = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#x27;",
        "`": "&#x60;",
      },
      q = v.invert(L),
      A = function (e) {
        var t = function (t) {
            return e[t];
          },
          r = "(?:" + v.keys(e).join("|") + ")",
          n = RegExp(r),
          i = RegExp(r, "g");
        return function (e) {
          return (
            (e = null == e ? "" : "" + e),
            n.test(e) ? e.replace(i, t) : e
          );
        };
      };
    ((v.escape = A(L)),
      (v.unescape = A(q)),
      (v.result = function (e, t, r) {
        var n = null == e ? void 0 : e[t];
        return (void 0 === n && (n = r), v.isFunction(n) ? n.call(e) : n);
      }));
    var F = 0;
    ((v.uniqueId = function (e) {
      var t = ++F + "";
      return e ? e + t : t;
    }),
      (v.templateSettings = {
        evaluate: /<%([\s\S]+?)%>/g,
        interpolate: /<%=([\s\S]+?)%>/g,
        escape: /<%-([\s\S]+?)%>/g,
      }));
    var k = /(.)^/,
      V = {
        "'": "'",
        "\\": "\\",
        "\r": "r",
        "\n": "n",
        "\u2028": "u2028",
        "\u2029": "u2029",
      },
      j = /\\|'|\r|\n|\u2028|\u2029/g,
      B = function (e) {
        return "\\" + V[e];
      };
    ((v.template = function (e, t, r) {
      (!t && r && (t = r), (t = v.defaults({}, t, v.templateSettings)));
      var n = RegExp(
          [
            (t.escape || k).source,
            (t.interpolate || k).source,
            (t.evaluate || k).source,
          ].join("|") + "|$",
          "g",
        ),
        i = 0,
        a = "__p+='";
      (e.replace(n, function (t, r, n, s, o) {
        return (
          (a += e.slice(i, o).replace(j, B)),
          (i = o + t.length),
          r
            ? (a += "'+\n((__t=(" + r + "))==null?'':_.escape(__t))+\n'")
            : n
              ? (a += "'+\n((__t=(" + n + "))==null?'':__t)+\n'")
              : s && (a += "';\n" + s + "\n__p+='"),
          t
        );
      }),
        (a += "';\n"),
        t.variable || (a = "with(obj||{}){\n" + a + "}\n"),
        (a =
          "var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n" +
          a +
          "return __p;\n"));
      try {
        var s = new Function(t.variable || "obj", "_", a);
      } catch (e) {
        throw ((e.source = a), e);
      }
      var o = function (e) {
          return s.call(this, e, v);
        },
        u = t.variable || "obj";
      return ((o.source = "function(" + u + "){\n" + a + "}"), o);
    }),
      (v.chain = function (e) {
        var t = v(e);
        return ((t._chain = !0), t);
      }));
    var R = function (e, t) {
      return e._chain ? v(t).chain() : t;
    };
    ((v.mixin = function (e) {
      v.each(v.functions(e), function (t) {
        var r = (v[t] = e[t]);
        v.prototype[t] = function () {
          var e = [this._wrapped];
          return (c.apply(e, arguments), R(this, r.apply(v, e)));
        };
      });
    }),
      v.mixin(v),
      v.each(
        ["pop", "push", "reverse", "shift", "sort", "splice", "unshift"],
        function (e) {
          var t = s[e];
          v.prototype[e] = function () {
            var r = this._wrapped;
            return (
              t.apply(r, arguments),
              ("shift" !== e && "splice" !== e) ||
                0 !== r.length ||
                delete r[0],
              R(this, r)
            );
          };
        },
      ),
      v.each(["concat", "join", "slice"], function (e) {
        var t = s[e];
        v.prototype[e] = function () {
          return R(this, t.apply(this._wrapped, arguments));
        };
      }),
      (v.prototype.value = function () {
        return this._wrapped;
      }),
      (v.prototype.valueOf = v.prototype.toJSON = v.prototype.value),
      (v.prototype.toString = function () {
        return "" + this._wrapped;
      }),
      "function" == typeof define &&
        define.amd &&
        define("underscore", [], function () {
          return v;
        }));
  }.call(this),
  define("math/distance", ["require", "exports"], function (e, t) {
    "use strict";
    function r(e, t) {
      return e > 0 == t > 0 ? e + 0.5 * (t - e) : 0.5 * (e + t);
    }
    function n(e, t, r, n) {
      return e * r + t * n;
    }
    function i(e, r, i, a, s, o) {
      var u = t.hypot(s - i, o - a);
      if (0 === u) return 0;
      var c = n((e - i) / u, (r - a) / u, (s - i) / u, (o - a) / u);
      return c;
    }
    function a(e, t, r, n, a, s) {
      var o = i(e, t, r, n, a, s);
      return o <= 0
        ? [r, n]
        : o >= 1
          ? [a, s]
          : [r + o * (a - r), n + o * (s - n)];
    }
    function s(e, r, n, i, s, o) {
      var u = a(e, r, n, i, s, o);
      return t.hypot(e - u[0], r - u[1]);
    }
    function o(e, t, r) {
      if ((void 0 === r && (r = 1), r > 50))
        throw new Error(
          "Within " + (52 - r) + " bits isn't really approximate any more",
        );
      var n = Math.max(Math.max(Math.abs(e), Math.abs(t)), 1),
        i = 1 === r ? 0.5 : Math.pow(0.5, r);
      return n === n + i * Math.abs(t - e);
    }
    (Object.defineProperty(t, "__esModule", { value: !0 }),
      (t.hypot =
        Math.hypot ||
        function (e, t) {
          if (0 === e && 0 === t) return 0;
          if (Math.abs(e) > Math.abs(t)) {
            var r = t / e;
            return Math.abs(e) * Math.sqrt(r * r + 1);
          }
          var r = e / t;
          return Math.abs(t) * Math.sqrt(r * r + 1);
        }),
      (t.mean = r),
      (t.pointToSegmentParameter = i),
      (t.closestPointOnSegment = a),
      (t.pointToSegment = s),
      (t.approx = o));
  }),
  define("lib/console", ["require", "exports", "console"], function (e, t, r) {
    "use strict";
    (Object.defineProperty(t, "__esModule", { value: !0 }),
      (t.log = r.log),
      (t.warn = r.warn));
  }),
  define(
    "math/poi",
    ["require", "exports", "./distance", "lib/console"],
    function (e, t, r, n) {
      "use strict";
      function i(e, t) {
        var n;
        e > t && ((n = e), (e = t), (t = n));
        var i = e > 0,
          a = t > 0,
          s = Math.abs(e) > 0.01,
          o = Math.abs(t) > 0.01;
        if (s || o) return r.mean(e, t);
        if (0 === e) return t * Math.abs(t);
        if (0 === t) return e * Math.abs(e);
        if (i !== a) return 0;
        var u = i ? Math.sqrt(e * t) : -Math.sqrt(e * t);
        return u >= e && t >= u ? u : r.mean(e, t);
      }
      function a(e, t, r, a, o) {
        if (!isFinite(t) || !isFinite(a) || t < 0 == a < 0)
          return void n.log("bisectZero called with bad y values", [t, a]);
        for (;;) {
          var u = i(e, r),
            c = o(u);
          if (!isFinite(c)) return;
          if (u === e || u === r)
            return Math.abs(t) <= Math.abs(a) ? [e, t] : [r, a];
          if (0 === c) return s(e, t, u, c, r, a, o);
          t < 0 != c < 0 ? ((r = u), (a = c)) : ((e = u), (t = c));
        }
      }
      function s(e, t, r, n, a, s, c) {
        var l;
        if (isFinite(n)) {
          (isFinite(t) ||
            ((l = o(e, t, r, n, c)), l && ((e = l[0]), (t = l[1]))),
            isFinite(s) ||
              ((l = o(r, n, a, s, c)), l && ((a = l[0]), (s = l[1]))));
          var p, f;
          ((p = t === n ? [e, t] : u(e, t, r, n, c, n)),
            (f = s === n ? [a, s] : u(r, n, a, s, c, n)));
          var h;
          return (
            p && f && (h = i(p[0], f[0])),
            void 0 !== h ? [h, c(h)] : void 0
          );
        }
      }
      function o(e, t, r, a, s) {
        if (isFinite(t) === isFinite(a))
          return void n.log("bisectFinite called with bad y values", [t, a]);
        for (;;) {
          var o = i(e, r),
            u = s(o);
          if (o === e || o === r) return isFinite(t) ? [e, t] : [r, a];
          isFinite(u) !== isFinite(t) ? ((r = o), (a = u)) : ((e = o), (t = u));
        }
      }
      function u(e, t, r, a, s, o) {
        if ((t === o) == (a === o))
          return void n.log("bisectConstant called with bad y values", [
            t,
            a,
            o,
          ]);
        for (;;) {
          var u = i(e, r),
            c = s(u);
          if (u === e || u === r) return t === o ? [e, t] : [r, a];
          (c === o) != (t === o) ? ((r = u), (a = c)) : ((e = u), (t = c));
        }
      }
      function c(e, t, r, a, o, u, c) {
        if (!(e < r && r < o))
          return void n.log("bisectExtremum called with bad x values", [
            e,
            r,
            o,
          ]);
        if (
          !(
            isFinite(t) &&
            isFinite(a) &&
            isFinite(u) &&
            t !== a &&
            a !== u &&
            a > t == a > u
          )
        )
          return void n.log("bisectExtremum called with bad y values", [
            t,
            a,
            u,
          ]);
        for (;;) {
          var l = i(e, r),
            p = c(l),
            f = i(r, o),
            h = c(f);
          if (!isFinite(p) || !isFinite(h)) return;
          if (l === e || l === r || f === r || f === o)
            return p > a == a > t ? [l, p] : h > a == a > t ? [f, h] : [r, a];
          if (p === a || h === a) return s(e, t, r, a, o, u, c);
          p > t == a > t && p > t == p > a
            ? ((o = r), (u = a), (r = l), (a = p))
            : h > u == a > u && h > a == h > u
              ? ((e = r), (t = a), (r = f), (a = h))
              : ((e = l), (t = p), (o = f), (u = h));
        }
      }
      function l(e, t, r, n, i, a, s, o) {
        var u = Math.abs(n - t),
          c = Math.abs(a - n),
          l = Math.abs(o - a);
        return u > c && u > l
          ? [
              [e, t],
              [r, n],
            ]
          : l > c && l > u
            ? [
                [i, a],
                [s, o],
              ]
            : [
                [r, n],
                [i, a],
              ];
      }
      function p(e, t, n, a, s, u, c, p) {
        if (
          (p || (p = 0),
          !((n - e) * (s - n) <= 0) &&
            isFinite(e) &&
            isFinite(n) &&
            isFinite(s) &&
            isFinite(t) &&
            isFinite(u))
        ) {
          if (!isFinite(a)) return [o(e, t, n, a, c), o(n, a, s, u, c)];
          if (!(Math.abs(a - ((s - n) * t + (n - e) * u) / (s - e)) < p))
            for (;;) {
              var f = i(e, n),
                h = c(f),
                d = i(n, s),
                m = c(d),
                g = Math.abs(h - r.mean(t, a)),
                y = Math.abs(a - r.mean(h, m)),
                v = Math.abs(m - r.mean(a, u)),
                b = void 0,
                x = void 0;
              if (g <= p && y <= p && v <= p) return;
              if (!isFinite(h))
                return ((b = o(e, t, f, h, c)), (x = o(f, h, s, u, c)), [b, x]);
              if (!isFinite(m))
                return ((b = o(e, t, d, m, c)), (x = o(d, m, s, u, c)), [b, x]);
              if (!((f !== e && f !== n) || (d !== n && d !== s)))
                return (
                  Math.abs(a - t) > Math.abs(u - a)
                    ? ((b = [e, t]), (x = [n, a]))
                    : ((b = [n, a]), (x = [s, u])),
                  [b, x]
                );
              if (f === e || f === n) return l(e, t, n, a, d, m, s, u);
              if (d === n || d === s) return l(e, t, f, h, n, a, s, u);
              g > v && g >= y
                ? ((s = n), (u = a), (n = f), (a = h))
                : v > g && v >= y
                  ? ((e = n), (t = a), (n = d), (a = m))
                  : ((e = f), (t = h), (s = d), (u = m));
            }
        }
      }
      (Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.default = {
          bisectJump: p,
          bisectExtremum: c,
          bisectFinite: o,
          bisectZero: a,
          flatCenter: s,
          INTERSECTION: 1001,
          ZERO: 1002,
          INTERCEPT: 1003,
          EXTREMUM: 1004,
          EDGE: 1005,
          DEFINITION: 1006,
          TRACE: 1007,
          LABEL: 1008,
        }));
    },
  ),
  define(
    "math/curve-accumulator",
    ["require", "exports", "./distance"],
    function (e, t, r) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var n = (function () {
        function e(e) {
          (e
            ? ((this.xtolerance = e.xtolerance || e.tolerance || 0),
              (this.ytolerance = e.ytolerance || e.tolerance || 0),
              (this.map = e.map))
            : (this.xtolerance = this.ytolerance = 0),
            (this.segments = []),
            (this.segment = []),
            (this.pivotPoint = void 0),
            (this.pendingPoint = void 0));
        }
        return (
          (e.prototype.colinear = function (e, t, n) {
            this.map &&
              ((e = this.map(e)), (t = this.map(t)), (n = this.map(n)));
            var i = r.pointToSegmentParameter(
              n[0],
              n[1],
              e[0],
              e[1],
              t[0],
              t[1],
            );
            if (i < 1) return !1;
            var a = [e[0] + i * (t[0] - e[0]), e[1] + i * (t[1] - e[1])];
            return (
              Math.abs(n[0] - a[0]) <= this.xtolerance &&
              Math.abs(n[1] - a[1]) <= this.ytolerance
            );
          }),
          (e.prototype.addPoint = function (e) {
            if (this.xtolerance < 0 && this.ytolerance < 0)
              return void this.segment.push(e[0], e[1]);
            if (!this.segment.length) return void this.segment.push(e[0], e[1]);
            var t = [
              this.segment[this.segment.length - 2],
              this.segment[this.segment.length - 1],
            ];
            if (e[0] !== t[0] || e[1] !== t[1]) {
              if (!this.pivotPoint || !this.pendingPoint)
                return ((this.pivotPoint = e), void (this.pendingPoint = e));
              ((!this.colinear(t, this.pivotPoint, e) ||
                r.hypot(t[0] - e[0], t[1] - e[1]) <
                  r.hypot(
                    t[0] - this.pendingPoint[0],
                    t[1] - this.pendingPoint[1],
                  )) &&
                (this.flushPending(), (this.pivotPoint = e)),
                (this.pendingPoint = e));
            }
          }),
          (e.prototype.flushPending = function () {
            this.pendingPoint &&
              (this.segment.push(this.pendingPoint[0], this.pendingPoint[1]),
              (this.pivotPoint = void 0),
              (this.pendingPoint = void 0));
          }),
          (e.prototype.breakSegment = function () {
            (this.flushPending(),
              this.segment.length > 2 && this.segments.push(this.segment),
              (this.segment = []));
          }),
          (e.prototype.getSegments = function () {
            return (this.breakSegment(), this.segments);
          }),
          (e.prototype.finish = function () {
            return { segments: this.getSegments(), resolved: !0 };
          }),
          e
        );
      })();
      t.default = n;
    },
  ),
  define(
    "math/implicit-plotter",
    ["require", "exports", "./distance", "./curve-accumulator"],
    function (e, t, r, n) {
      "use strict";
      function i(e, t) {
        var r = a(e, t);
        return {
          segments: r.contours.strokeSegments,
          fillSegments: r.contours.fillSegments,
          resolved: r.quadTree.resolved,
        };
      }
      function a(e, t) {
        var r = Math.pow(2, -Y),
          n = c(t, r),
          i = c(t, 2 * r),
          a = f(e, n, i),
          s = T(a.root, e, n),
          o = R(s, e, n);
        return {
          paddedDomain: n,
          rootDomain: i,
          quadTree: a,
          triangles: s,
          contours: o,
        };
      }
      function s(e, t, r) {
        return { x: e, y: t, z: r };
      }
      function o(e, t, r) {
        return { x: e, y: t, isZero: r };
      }
      function u(e, t, r) {
        return { vertices: [e, t, r], visited: !1, next: void 0 };
      }
      function c(e, t) {
        var r = (1 + t) * e.xmin - t * e.xmax,
          n = (1 + t) * e.xmax - t * e.xmin,
          i = (1 + t) * e.ymin - t * e.ymax,
          a = (1 + t) * e.ymax - t * e.ymin;
        return {
          xmin: r,
          ymin: i,
          xmax: n,
          ymax: a,
          xtolerance: e.xtolerance,
          ytolerance: e.ytolerance,
        };
      }
      function l(e, t) {
        return { depth: e, vertices: t, children: void 0, center: void 0 };
      }
      function p(e, t, r) {
        e.center = w(
          e.vertices[0],
          e.vertices[1],
          e.vertices[2],
          e.vertices[3],
          t,
          r,
        );
      }
      function f(e, t, r) {
        var n = h(e, r),
          i = [],
          a = [];
        a.push(n);
        var s = 1,
          o = !0;
        e: for (; a.length; ) {
          var u = i;
          ((i = a), (a = u));
          for (var c = void 0; (c = i.pop()); )
            if (m(c, e, t)) {
              if ((d(c, e), !c.children)) {
                o = !1;
                break e;
              }
              if (
                (a.push(c.children[0]),
                a.push(c.children[1]),
                a.push(c.children[2]),
                a.push(c.children[3]),
                (s += 3),
                s >= W)
              ) {
                o = !1;
                break e;
              }
            } else p(c, e, t);
        }
        for (var l = 0; l < i.length; l++) p(i[l], e, t);
        for (var l = 0; l < a.length; l++) p(a[l], e, t);
        return { root: n, resolved: o };
      }
      function h(e, t) {
        var r = t.xmin,
          n = t.xmax,
          i = t.ymin,
          a = t.ymax;
        return l(0, [_(r, a, e), _(n, a, e), _(n, i, e), _(r, i, e)]);
      }
      function d(e, t) {
        var r = e.depth + 1,
          n = e.vertices[0],
          i = e.vertices[1],
          a = e.vertices[2],
          s = e.vertices[3],
          o = E(n, i, t),
          u = E(i, a, t),
          c = E(a, s, t),
          p = E(s, n, t),
          f = E(n, a, t);
        e.children = [
          l(r, [n, o, f, p]),
          l(r, [o, i, u, f]),
          l(r, [f, u, a, c]),
          l(r, [p, f, c, s]),
        ];
      }
      function m(e, t, r) {
        if (e.depth < Y) return !0;
        if (b(e, r)) return !1;
        if (v(e, r)) return !1;
        var n = e.vertices[0],
          i = e.vertices[1],
          a = e.vertices[2],
          s = e.vertices[3];
        if (isNaN(n.z) && isNaN(i.z) && isNaN(a.z) && isNaN(s.z)) return !1;
        if (isNaN(n.z) || isNaN(i.z) || isNaN(a.z) || isNaN(s.z)) return !0;
        var o = w(n, i, a, s, t, r),
          u = S(n, i, t, r),
          c = S(i, a, t, r),
          l = S(a, s, t, r),
          p = S(s, n, t, r);
        return (
          y(n, u, t) ||
          y(i, u, t) ||
          y(i, c, t) ||
          y(a, c, t) ||
          y(a, l, t) ||
          y(s, l, t) ||
          y(s, p, t) ||
          y(n, p, t) ||
          g(n, u, o, t, r) ||
          g(u, i, o, t, r) ||
          g(i, c, o, t, r) ||
          g(c, a, o, t, r) ||
          g(a, l, o, t, r) ||
          g(l, s, o, t, r) ||
          g(s, p, o, t, r) ||
          g(p, n, o, t, r)
        );
      }
      function g(e, t, n, i, a) {
        if (e.z > 0 == t.z > 0 && t.z > 0 == n.z > 0) return !1;
        var s, o, u, c;
        if (e.z > 0 == t.z > 0) {
          if (((s = E(e, t, i)), s.z > 0 != e.z > 0)) return !0;
          ((o = I(e, n, i, a)), (u = I(t, n, i, a)), (c = I(s, n, i, a)));
        } else if (t.z > 0 == n.z > 0) {
          if (((s = E(t, n, i)), s.z > 0 != t.z > 0)) return !0;
          ((o = I(t, e, i, a)), (u = I(n, e, i, a)), (c = I(s, e, i, a)));
        } else {
          if (((s = E(n, e, i)), s.z > 0 != n.z > 0)) return !0;
          ((o = I(n, t, i, a)), (u = I(e, t, i, a)), (c = I(s, t, i, a)));
        }
        var l = a.xtolerance,
          p = a.ytolerance,
          f = r.pointToSegment(
            p * c.x,
            l * c.y,
            p * o.x,
            l * o.y,
            p * u.x,
            l * u.y,
          );
        return f > l * p;
      }
      function y(e, t, r) {
        if (isNaN(e.z) && isNaN(t.z)) return !1;
        if (isNaN(e.z) || isNaN(t.z)) return e.z > 0 || t.z > 0;
        var n = E(e, t, r),
          i = 4 * n.z - t.z - 3 * e.z,
          a = 1e-4,
          s = (r((1 - a) * e.x + a * t.x, (1 - a) * e.y + a * t.y) - e.z) / a,
          o = Math.max(Math.abs(e.z), Math.abs(t.z));
        return Math.abs(i - s) > 0.125 * o;
      }
      function v(e, t) {
        return (
          e.vertices[1].x - e.vertices[0].x < 10 * t.xtolerance ||
          e.vertices[0].y - e.vertices[3].y < 10 * t.ytolerance
        );
      }
      function b(e, t) {
        return (
          e.vertices[0].x < t.xmin ||
          e.vertices[0].y > t.ymax ||
          e.vertices[2].x > t.xmax ||
          e.vertices[2].y < t.ymin
        );
      }
      function x(e, t) {
        return e.x < t.xmin || e.x > t.xmax || e.y < t.ymin || e.y > t.ymax;
      }
      function _(e, t, r) {
        return s(e, t, r(e, t));
      }
      function E(e, t, r) {
        return _(0.5 * (e.x + t.x), 0.5 * (e.y + t.y), r);
      }
      function S(e, t, r, n) {
        if (x(e, n) || x(t, n)) return E(e, t, r);
        if (isNaN(e.z) || isNaN(t.z)) return P(e, t, r, n);
        if (e.z > 0 != t.z > 0) return E(e, t, r);
        var i = 0.01,
          a = r((1 - i) * e.x + i * t.x, (1 - i) * e.y + i * t.y) - e.z,
          o = t.z - r(i * e.x + (1 - i) * t.x, i * e.y + (1 - i) * t.y);
        return isNaN(a) || isNaN(o)
          ? E(e, t, r)
          : a > 0 == o > 0
            ? E(e, t, r)
            : M(s(e.x, e.y, a), s(t.x, t.y, o), r);
      }
      function w(e, t, r, n, i, a) {
        var s = S(e, r, i, a);
        return e.z > 0 == r.z > 0 && s.z > 0 != e.z > 0
          ? s
          : ((s = S(t, n, i, a)),
            t.z > 0 == n.z > 0 && s.z > 0 != t.z > 0 ? s : E(e, r, i));
      }
      function M(e, t, r) {
        if (isNaN(e.z)) return t;
        if (isNaN(t.z)) return e;
        if (isFinite(e.z) || isFinite(t.z)) {
          if (isFinite(e.z)) {
            if (isFinite(t.z)) {
              var n = 1 - e.z / t.z,
                i = 1 - t.z / e.z;
              return _(e.x / n + t.x / i, e.y / n + t.y / i, r);
            }
            return e;
          }
          return t;
        }
        return E(e, t, r);
      }
      function I(e, t, r, n) {
        var i = e.x,
          a = t.x,
          u = e.y,
          c = t.y,
          l = e.z,
          p = t.z,
          f = n.xtolerance,
          h = n.ytolerance;
        if (x(e, n) || x(t, n)) {
          var d = E(e, t, r);
          return o(d.x, d.y, !1);
        }
        for (; Math.abs(i - a) > f || Math.abs(u - c) > h; ) {
          var m = 0.5 * (i + a),
            g = 0.5 * (u + c),
            y = r(m, g);
          y > 0 == l > 0
            ? ((i = m), (u = g), (l = y))
            : ((a = m), (c = g), (p = y));
        }
        if (isNaN(l)) return o(a, c, !1);
        if (isNaN(p)) return o(i, u, !1);
        var v = M(s(i, u, l), s(a, c, p), r),
          b =
            0 === l ||
            0 === p ||
            0 === v.z ||
            (v.z >= l == p >= v.z && Math.abs(v.z) < 1e250);
        return o(v.x, v.y, b);
      }
      function P(e, t, r, n) {
        if (isNaN(e.z) === isNaN(t.z)) return E(e, t, r);
        if (isNaN(e.z)) {
          var i = e;
          ((e = t), (t = i));
        }
        for (
          var a = e.x,
            o = t.x,
            u = e.y,
            c = t.y,
            l = e.z,
            p = n.xtolerance,
            f = n.ytolerance;
          Math.abs(a - o) > p || Math.abs(u - c) > f;

        ) {
          var h = 0.5 * (a + o),
            d = 0.5 * (u + c),
            m = r(h, d);
          isNaN(m) === isNaN(l)
            ? ((a = h), (u = d), (l = m))
            : ((o = h), (c = d));
        }
        return s(a, u, l);
      }
      function T(e, t, r) {
        var n = { triangles: [], edgeCache: {}, domain: r, fn: t };
        return (C(e, n), n.triangles);
      }
      function C(e, t) {
        e.children &&
          (C(e.children[0], t),
          C(e.children[1], t),
          C(e.children[2], t),
          C(e.children[3], t),
          D(e.children[0], e.children[1], t),
          D(e.children[3], e.children[2], t),
          O(e.children[1], e.children[2], t),
          O(e.children[0], e.children[3], t));
      }
      function D(e, t, r) {
        e.children && t.children
          ? (D(e.children[1], t.children[0], r),
            D(e.children[2], t.children[3], r))
          : e.children
            ? (D(e.children[1], t, r), D(e.children[2], t, r))
            : t.children
              ? (D(e, t.children[0], r), D(e, t.children[3], r))
              : N(e, t, r);
      }
      function O(e, t, r) {
        e.children && t.children
          ? (O(e.children[2], t.children[1], r),
            O(e.children[3], t.children[0], r))
          : e.children
            ? (O(e.children[2], t, r), O(e.children[3], t, r))
            : t.children
              ? (O(e, t.children[1], r), O(e, t.children[0], r))
              : L(e, t, r);
      }
      function N(e, t, r) {
        if (e.center && t.center) {
          var n, i;
          (e.depth >= t.depth
            ? ((n = S(e.vertices[1], e.vertices[2], r.fn, r.domain)),
              (i = q(e.vertices[1], t.center, e.vertices[2], e.center, n)))
            : ((n = S(t.vertices[0], t.vertices[3], r.fn, r.domain)),
              (i = q(t.vertices[0], t.center, t.vertices[3], e.center, n))),
            k(i, r.edgeCache, r.domain));
          for (var a = 0; a < 4; a++) r.triangles.push(i[a]);
        }
      }
      function L(e, t, r) {
        if (e.center && t.center) {
          var n, i;
          (e.depth >= t.depth
            ? ((n = S(e.vertices[3], e.vertices[2], r.fn, r.domain)),
              (i = q(e.vertices[2], t.center, e.vertices[3], e.center, n)))
            : ((n = S(t.vertices[1], t.vertices[0], r.fn, r.domain)),
              (i = q(t.vertices[1], t.center, t.vertices[0], e.center, n))),
            k(i, r.edgeCache, r.domain));
          for (var a = 0; a < 4; a++) r.triangles.push(i[a]);
        }
      }
      function q(e, t, r, n, i) {
        return [u(e, i, t), u(t, i, r), u(r, i, n), u(n, i, e)];
      }
      function A(e, t, r) {
        return e.z > 0 && !x(e, r) && (!(t.z > 0) || x(t, r));
      }
      function F(e, t) {
        return "" + e.x + "," + e.y + "," + t.x + "," + t.y;
      }
      function k(e, t, r) {
        (V(e[0], e[1], e[2], F(e[1].vertices[2], e[1].vertices[0]), t, r),
          V(e[1], e[2], e[3], F(e[2].vertices[0], e[2].vertices[2]), t, r),
          V(e[2], e[3], e[0], F(e[3].vertices[2], e[3].vertices[0]), t, r),
          V(e[3], e[0], e[1], F(e[0].vertices[0], e[0].vertices[2]), t, r));
      }
      function V(e, t, r, n, i, a) {
        var s = t.vertices[0],
          o = t.vertices[1],
          u = t.vertices[2];
        (A(o, u, a) && (t.next = r),
          A(s, o, a) && (t.next = e),
          A(u, s, a) && B(t, n, i),
          A(s, u, a) && j(t, n, i));
      }
      function j(e, t, r) {
        r[t] ? (r[t].next = e) : (r[t] = e);
      }
      function B(e, t, r) {
        r[t] ? (e.next = r[t]) : (r[t] = e);
      }
      function R(e, t, r) {
        for (
          var i = {
              fillAccumulator: new n.default(r),
              strokeAccumulator: new n.default(r),
              fn: t,
              domain: r,
            },
            a = 0;
          a < e.length;
          a++
        ) {
          var s = e[a];
          s.next && !s.visited && z(s, i);
        }
        return {
          strokeSegments: i.strokeAccumulator.finish().segments,
          fillSegments: i.fillAccumulator.finish().segments,
        };
      }
      function z(e, t) {
        for (;;) {
          var r = e.vertices[0],
            n = e.vertices[1],
            i = e.vertices[2];
          if ((G(r, n, t), G(n, i, t), G(i, r, t), e.visited)) break;
          if (!e.next) break;
          ((e.visited = !0), (e = e.next));
        }
        (t.strokeAccumulator.breakSegment(), t.fillAccumulator.breakSegment());
      }
      function G(e, t, r) {
        if (A(e, t, r.domain)) {
          var n = I(e, t, r.fn, r.domain);
          (r.fillAccumulator.addPoint([n.x, n.y]),
            n.isZero
              ? r.strokeAccumulator.addPoint([n.x, n.y])
              : r.strokeAccumulator.breakSegment());
        }
      }
      function U(e) {
        for (var t = [], r = 0; r < e.length; r++) {
          var n = e[r];
          t.push([
            n.vertices[0].x,
            n.vertices[0].y,
            n.vertices[1].x,
            n.vertices[1].y,
            n.vertices[2].x,
            n.vertices[2].y,
            n.vertices[0].x,
            n.vertices[0].y,
          ]);
        }
        return t;
      }
      Object.defineProperty(t, "__esModule", { value: !0 });
      var Y = 5,
        W = Math.pow(2, 14);
      ((t.sampleImplicit = i),
        (t.sampleImplicitDiagnostic = a),
        (t.buildQuadTree = f),
        (t.triangulate = T),
        (t.traceContours = R),
        (t.displayTriangles = U));
    },
  ),
  define("worker/workerconfig", [], function () {
    return { pointsOfInterest: !0, plotSingleVariableImplicitEquations: !0 };
  }),
  (function () {
    var e,
      t,
      r,
      n,
      i,
      a,
      s,
      o,
      u,
      c,
      l,
      p,
      f,
      h,
      d,
      m,
      g = {};
    !(function (e) {
      function t(e, t) {
        return function (r, n) {
          return (e[r] = t ? t(r, n) : n);
        };
      }
      var r =
        "object" == typeof g
          ? g
          : "object" == typeof self
            ? self
            : "object" == typeof this
              ? this
              : {};
      "function" == typeof define && define.amd
        ? define("tslib", ["exports"], function (n) {
            e(t(r, t(n)));
          })
        : e(
            "object" == typeof module && "object" == typeof module.exports
              ? t(r, t(module.exports))
              : t(r),
          );
    })(function (g) {
      var y =
        Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array &&
          function (e, t) {
            e.__proto__ = t;
          }) ||
        function (e, t) {
          for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r]);
        };
      ((e = function (e, t) {
        function r() {
          this.constructor = e;
        }
        (y(e, t),
          (e.prototype =
            null === t
              ? Object.create(t)
              : ((r.prototype = t.prototype), new r())));
      }),
        (t =
          Object.assign ||
          function (e) {
            for (var t, r = 1, n = arguments.length; r < n; r++) {
              t = arguments[r];
              for (var i in t)
                Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
            }
            return e;
          }),
        (r = function (e, t) {
          var r = {};
          for (var n in e)
            Object.prototype.hasOwnProperty.call(e, n) &&
              t.indexOf(n) < 0 &&
              (r[n] = e[n]);
          if (null != e && "function" == typeof Object.getOwnPropertySymbols)
            for (
              var i = 0, n = Object.getOwnPropertySymbols(e);
              i < n.length;
              i++
            )
              t.indexOf(n[i]) < 0 && (r[n[i]] = e[n[i]]);
          return r;
        }),
        (n = function (e, t, r, n) {
          var i,
            a = arguments.length,
            s =
              a < 3
                ? t
                : null === n
                  ? (n = Object.getOwnPropertyDescriptor(t, r))
                  : n;
          if (
            "object" == typeof Reflect &&
            "function" == typeof Reflect.decorate
          )
            s = Reflect.decorate(e, t, r, n);
          else
            for (var o = e.length - 1; o >= 0; o--)
              (i = e[o]) &&
                (s = (a < 3 ? i(s) : a > 3 ? i(t, r, s) : i(t, r)) || s);
          return (a > 3 && s && Object.defineProperty(t, r, s), s);
        }),
        (i = function (e, t) {
          return function (r, n) {
            t(r, n, e);
          };
        }),
        (a = function (e, t) {
          if (
            "object" == typeof Reflect &&
            "function" == typeof Reflect.metadata
          )
            return Reflect.metadata(e, t);
        }),
        (s = function (e, t, r, n) {
          return new (r || (r = Promise))(function (i, a) {
            function s(e) {
              try {
                u(n.next(e));
              } catch (e) {
                a(e);
              }
            }
            function o(e) {
              try {
                u(n.throw(e));
              } catch (e) {
                a(e);
              }
            }
            function u(e) {
              e.done
                ? i(e.value)
                : new r(function (t) {
                    t(e.value);
                  }).then(s, o);
            }
            u((n = n.apply(e, t || [])).next());
          });
        }),
        (o = function (e, t) {
          function r(e) {
            return function (t) {
              return n([e, t]);
            };
          }
          function n(r) {
            if (i) throw new TypeError("Generator is already executing.");
            for (; u; )
              try {
                if (
                  ((i = 1),
                  a &&
                    (s = a[2 & r[0] ? "return" : r[0] ? "throw" : "next"]) &&
                    !(s = s.call(a, r[1])).done)
                )
                  return s;
                switch (((a = 0), s && (r = [0, s.value]), r[0])) {
                  case 0:
                  case 1:
                    s = r;
                    break;
                  case 4:
                    return (u.label++, { value: r[1], done: !1 });
                  case 5:
                    (u.label++, (a = r[1]), (r = [0]));
                    continue;
                  case 7:
                    ((r = u.ops.pop()), u.trys.pop());
                    continue;
                  default:
                    if (
                      ((s = u.trys),
                      !(s = s.length > 0 && s[s.length - 1]) &&
                        (6 === r[0] || 2 === r[0]))
                    ) {
                      u = 0;
                      continue;
                    }
                    if (3 === r[0] && (!s || (r[1] > s[0] && r[1] < s[3]))) {
                      u.label = r[1];
                      break;
                    }
                    if (6 === r[0] && u.label < s[1]) {
                      ((u.label = s[1]), (s = r));
                      break;
                    }
                    if (s && u.label < s[2]) {
                      ((u.label = s[2]), u.ops.push(r));
                      break;
                    }
                    (s[2] && u.ops.pop(), u.trys.pop());
                    continue;
                }
                r = t.call(e, u);
              } catch (e) {
                ((r = [6, e]), (a = 0));
              } finally {
                i = s = 0;
              }
            if (5 & r[0]) throw r[1];
            return { value: r[0] ? r[1] : void 0, done: !0 };
          }
          var i,
            a,
            s,
            o,
            u = {
              label: 0,
              sent: function () {
                if (1 & s[0]) throw s[1];
                return s[1];
              },
              trys: [],
              ops: [],
            };
          return (
            (o = { next: r(0), throw: r(1), return: r(2) }),
            "function" == typeof Symbol &&
              (o[Symbol.iterator] = function () {
                return this;
              }),
            o
          );
        }),
        (u = function (e, t) {
          for (var r in e) t.hasOwnProperty(r) || (t[r] = e[r]);
        }),
        (c = function (e) {
          var t = "function" == typeof Symbol && e[Symbol.iterator],
            r = 0;
          return t
            ? t.call(e)
            : {
                next: function () {
                  return (
                    e && r >= e.length && (e = void 0),
                    { value: e && e[r++], done: !e }
                  );
                },
              };
        }),
        (l = function (e, t) {
          var r = "function" == typeof Symbol && e[Symbol.iterator];
          if (!r) return e;
          var n,
            i,
            a = r.call(e),
            s = [];
          try {
            for (; (void 0 === t || t-- > 0) && !(n = a.next()).done; )
              s.push(n.value);
          } catch (e) {
            i = { error: e };
          } finally {
            try {
              n && !n.done && (r = a.return) && r.call(a);
            } finally {
              if (i) throw i.error;
            }
          }
          return s;
        }),
        (p = function () {
          for (var e = [], t = 0; t < arguments.length; t++)
            e = e.concat(l(arguments[t]));
          return e;
        }),
        (f = function (e) {
          return this instanceof f ? ((this.v = e), this) : new f(e);
        }),
        (h = function (e, t, r) {
          function n(e) {
            l[e] &&
              (c[e] = function (t) {
                return new Promise(function (r, n) {
                  p.push([e, t, r, n]) > 1 || i(e, t);
                });
              });
          }
          function i(e, t) {
            try {
              a(l[e](t));
            } catch (e) {
              u(p[0][3], e);
            }
          }
          function a(e) {
            e.value instanceof f
              ? Promise.resolve(e.value.v).then(s, o)
              : u(p[0][2], e);
          }
          function s(e) {
            i("next", e);
          }
          function o(e) {
            i("throw", e);
          }
          function u(e, t) {
            (e(t), p.shift(), p.length && i(p[0][0], p[0][1]));
          }
          if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
          var c,
            l = r.apply(e, t || []),
            p = [];
          return (
            (c = {}),
            n("next"),
            n("throw"),
            n("return"),
            (c[Symbol.asyncIterator] = function () {
              return this;
            }),
            c
          );
        }),
        (d = function (e) {
          function t(t, i) {
            e[t] &&
              (r[t] = function (r) {
                return (n = !n)
                  ? { value: f(e[t](r)), done: "return" === t }
                  : i
                    ? i(r)
                    : r;
              });
          }
          var r, n;
          return (
            (r = {}),
            t("next"),
            t("throw", function (e) {
              throw e;
            }),
            t("return"),
            (r[Symbol.iterator] = function () {
              return this;
            }),
            r
          );
        }),
        (m = function (e) {
          if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
          var t = e[Symbol.asyncIterator];
          return t
            ? t.call(e)
            : "function" == typeof c
              ? c(e)
              : e[Symbol.iterator]();
        }),
        g("__extends", e),
        g("__assign", t),
        g("__rest", r),
        g("__decorate", n),
        g("__param", i),
        g("__metadata", a),
        g("__awaiter", s),
        g("__generator", o),
        g("__exportStar", u),
        g("__values", c),
        g("__read", l),
        g("__spread", p),
        g("__await", f),
        g("__asyncGenerator", h),
        g("__asyncDelegator", d),
        g("__asyncValues", m));
    });
  })(),
  define(
    "math/poi-finding-accumulator",
    [
      "require",
      "exports",
      "worker/workerconfig",
      "tslib",
      "./curve-accumulator",
      "./poi",
    ],
    function (e, t, r, n, i, a) {
      "use strict";
      function s(e) {
        return Math.abs(e) < 5e-8;
      }
      Object.defineProperty(t, "__esModule", { value: !0 });
      var o = (function (e) {
        function t(t, r, n) {
          var i = e.call(this, t) || this;
          return (
            (i.domain = t),
            (i.fn = r),
            (i.derivative = n),
            (i.poiData = {
              zeros: { x: [], y: [] },
              intercept: { x: [], y: [] },
              extrema: { x: [], y: [] },
            }),
            (i.flatLeft = void 0),
            i
          );
        }
        return (
          n.__extends(t, e),
          (t.prototype.getPOI = function () {
            return r.pointsOfInterest
              ? (void 0 !== this.fn &&
                  (this.poiData.intercept = this.findIntercept(this.fn)),
                this.poiData)
              : {
                  zeros: { x: [], y: [] },
                  intercept: { x: [], y: [] },
                  extrema: { x: [], y: [] },
                };
          }),
          (t.prototype.addLinearZero = function (e) {
            var t = -e[0] / e[1];
            this.isOutsideDomain(t) ||
              (this.poiData.zeros = { x: [t], y: [0] });
          }),
          (t.prototype.addLinearIntercept = function (e) {
            this.isOutsideDomain(0) ||
              (this.poiData.intercept = { x: [0], y: [e[0]] });
          }),
          (t.prototype.isOutsideDomain = function (e) {
            return (
              !this.domain ||
              void 0 === this.domain.min ||
              void 0 === this.domain.max ||
              e < this.domain.min ||
              e > this.domain.max ||
              isNaN(e)
            );
          }),
          (t.prototype.flushPending = function () {
            if (this.pendingPoint) {
              var e = this.pendingPoint[0],
                t = this.pendingPoint[1];
              ((this.pivotPoint = void 0), (this.pendingPoint = void 0));
              var r = this.segment.length,
                n = void 0,
                i = void 0;
              if (
                ((i = this.checkForZero(
                  this.segment[r - 2],
                  this.segment[r - 1],
                  e,
                  t,
                )),
                r >= 4 &&
                  (n = this.checkForExtremum(
                    this.segment[r - 4],
                    this.segment[r - 3],
                    this.segment[r - 2],
                    this.segment[r - 1],
                    e,
                    t,
                  )),
                i &&
                  (this.poiData.zeros.x.push(i[0]),
                  this.poiData.zeros.y.push(i[1])),
                n)
              ) {
                (this.poiData.extrema.x.push(n[0]),
                  this.poiData.extrema.y.push(n[1]));
                var s = void 0;
                n[0] < this.segment[r - 2]
                  ? ((s =
                      !!this.fn &&
                      !!a.default.bisectJump(
                        this.segment[r - 4],
                        this.segment[r - 3],
                        n[0],
                        n[1],
                        this.segment[r - 2],
                        this.segment[r - 1],
                        this.fn,
                        this.ytolerance,
                      )),
                    s || this.segment.splice(-2, 0, n[0], n[1]))
                  : ((s =
                      !!this.fn &&
                      !!a.default.bisectJump(
                        this.segment[r - 2],
                        this.segment[r - 1],
                        n[0],
                        n[1],
                        e,
                        t,
                        this.fn,
                        this.ytolerance,
                      )),
                    s || n[0] === e || this.segment.push(n[0], n[1]));
              }
              this.segment.push(e, t);
            }
          }),
          (t.prototype.breakSegment = function () {
            if ((this.flushPending(), this.segment.length > 2)) {
              this.segments.push(this.segment);
              var e = this.segment.length;
              (s(this.segment[1]) &&
                (this.poiData.zeros.x.push(this.segment[0]),
                this.poiData.zeros.y.push(this.segment[1])),
                s(this.segment[e - 1]) &&
                  (this.poiData.zeros.x.push(this.segment[e - 2]),
                  this.poiData.zeros.y.push(this.segment[e - 1])));
            }
            ((this.segment = []), (this.flatLeft = void 0));
          }),
          (t.prototype.checkForZero = function (e, t, r, n) {
            if (this.fn) {
              var i;
              return (
                0 === this.segment[1] &&
                  (this.flatLeft = [this.segment[0], this.segment[1]]),
                this.flatLeft
                  ? 0 !== n &&
                    (this.flatLeft[0] !== this.segment[0] &&
                      (i = a.default.flatCenter(
                        this.flatLeft[0],
                        this.flatLeft[1],
                        e,
                        t,
                        r,
                        n,
                        this.fn,
                      )),
                    (this.flatLeft = void 0))
                  : 0 === n
                    ? (this.flatLeft = [e, t])
                    : t < 0 != n < 0 &&
                      (i = a.default.bisectZero(e, t, r, n, this.fn)),
                i
              );
            }
          }),
          (t.prototype.checkForExtremum = function (e, t, r, n, i, s) {
            if (this.fn) {
              var o;
              if (isFinite(t) && isFinite(n) && isFinite(s)) {
                if (t !== n && n === s) this.flatLeft = [e, t];
                else if (t === n && n !== s && this.flatLeft)
                  n > this.flatLeft[1] == n > s &&
                    (o = a.default.flatCenter(
                      this.flatLeft[0],
                      this.flatLeft[1],
                      r,
                      n,
                      i,
                      s,
                      this.fn,
                    ));
                else {
                  if (t === n && n === s) return;
                  if (n > t == n > s)
                    if (this.derivative) {
                      if (this.derivative(e) > 0 == this.derivative(i) > 0)
                        return;
                      if (
                        ((o = a.default.bisectZero(
                          e,
                          this.derivative(e),
                          i,
                          this.derivative(i),
                          this.derivative,
                        )),
                        o ||
                          (o = a.default.bisectExtremum(
                            e,
                            t,
                            r,
                            n,
                            i,
                            s,
                            this.fn,
                          )),
                        o)
                      )
                        return [o[0], this.fn(o[0])];
                    } else
                      o = a.default.bisectExtremum(e, t, r, n, i, s, this.fn);
                }
                return o;
              }
            }
          }),
          (t.prototype.findIntercept = function (e) {
            if (!e) return { x: [], y: [] };
            var t = e(0);
            return isFinite(t) ? { x: [0], y: [e(0)] } : { x: [], y: [] };
          }),
          (t.prototype.finish = function () {
            return {
              segments: this.getSegments(),
              resolved: !0,
              poi: this.getPOI(),
            };
          }),
          t
        );
      })(i.default);
      t.default = o;
    },
  ),
  define("graphing/graphmode", ["require", "exports"], function (e, t) {
    "use strict";
    (Object.defineProperty(t, "__esModule", { value: !0 }),
      (t.X = 1),
      (t.Y = 2),
      (t.XYPOINT = 3),
      (t.XYPOINT_MOVABLE = 4),
      (t.PARAMETRIC = 5),
      (t.POLAR = 6),
      (t.POLYGONFILL = 7),
      (t.IMPLICIT = 8),
      (t.NONE = 10));
  }),
  define("math/domaintypes", ["require", "exports"], function (e, t) {
    "use strict";
    (Object.defineProperty(t, "__esModule", { value: !0 }),
      (t.emptyDomain = function () {
        return { type: "empty" };
      }),
      (t.unknownDomain = function () {
        return { type: "unknown" };
      }),
      (t.knownDomain = function (e) {
        return isNaN(e[0]) || isNaN(e[1]) || e[1] < e[0]
          ? t.emptyDomain()
          : { type: "known", bounds: e };
      }),
      (t.allReals = function () {
        return t.knownDomain([-(1 / 0), 1 / 0]);
      }),
      (t.intersectDomains = function (e, r) {
        if ("empty" === e.type || "empty" === r.type) return t.emptyDomain();
        if ("unknown" === e.type || "unknown" === r.type)
          return t.unknownDomain();
        if (e.bounds && r.bounds) {
          var n = [
            Math.max(e.bounds[0], r.bounds[0]),
            Math.min(e.bounds[1], r.bounds[1]),
          ];
          return t.knownDomain(n);
        }
        return t.emptyDomain();
      }));
  }),
  define(
    "math/plotter",
    [
      "require",
      "exports",
      "./distance",
      "./poi",
      "./implicit-plotter",
      "./curve-accumulator",
      "./poi-finding-accumulator",
      "graphing/graphmode",
      "./domaintypes",
    ],
    function (e, t, r, n, i, a, s, o, u) {
      "use strict";
      function c(e, t) {
        for (
          var r, n = new a.default(), i = t.min;
          i <= t.max + t.step / 2;
          i += t.step
        )
          ((r = e(i)),
            isFinite(r[0]) && isFinite(r[1])
              ? n.addPoint(r)
              : n.breakSegment());
        return n.finish();
      }
      function l(e, t) {
        for (
          var r, n = new s.default(t, e), i = t.min;
          i <= t.max + t.step / 2;
          i += t.step
        )
          ((r = e(i)), isFinite(r) ? n.addPoint([i, r]) : n.breakSegment());
        return n.finish();
      }
      function p(e, t) {
        var r = new s.default(t);
        return (
          r.addPoint([t.min, e[0] + t.min * e[1]]),
          r.addPoint([t.max, e[0] + t.max * e[1]]),
          r.addLinearZero(e),
          r.addLinearIntercept(e),
          r.finish()
        );
      }
      function f(e, t) {
        var r = p(e[0], t),
          n = p(e[1], t);
        return r.segments.length &&
          n.segments.length &&
          4 === r.segments[0].length &&
          4 === n.segments[0].length
          ? {
              segments: [
                [
                  r.segments[0][1],
                  n.segments[0][1],
                  r.segments[0][3],
                  n.segments[0][3],
                ],
              ],
              resolved: !0,
            }
          : { segments: [], resolved: !0 };
      }
      function h(e, t, i) {
        var a,
          s,
          o,
          u,
          c,
          l,
          p = i.fn,
          f = i.jumpTolerance,
          h = i.stepPerturbation;
        ((a = e[0]),
          (s = e[1]),
          (c = t[0]),
          (l = t[1]),
          (o = r.mean(a, c)),
          (u = p(o)));
        var d;
        if ((d = n.default.bisectJump(a, s, o, u, c, l, p, f)))
          for (var m = [-h, h], g = 0; g < m.length; g++)
            if (
              ((a = e[0] + m[g]),
              (s = p(a)),
              isFinite(s) || ((a = e[0]), (s = e[1])),
              (c = t[0] + m[g]),
              (l = p(c)),
              isFinite(l) || ((c = t[0]), (l = t[1])),
              (o = r.mean(a, c)),
              (u = p(o)),
              n.default.bisectJump(a, s, o, u, c, l, p, f))
            )
              return d;
      }
      function d(e, t, r) {
        var i,
          a = new P(e, t, r),
          s = t.min,
          o = e(s),
          u = [s, o];
        for (
          isFinite(o) && a.accumulator.addPoint([s, o]), s += t.step;
          s <= t.max + t.step / 2;
          s += t.step
        ) {
          var c = s;
          ((o = e(c)),
            isFinite(o) || ((c = s + a.stepPerturbation), (o = e(c))),
            isFinite(o) || ((c = s - a.stepPerturbation), (o = e(c))),
            isFinite(o) && isFinite(u[1])
              ? (I(u, [c, o], a), a.accumulator.addPoint([c, o]))
              : isFinite(o) && !isFinite(u[1])
                ? ((i = n.default.bisectFinite(u[0], u[1], c, o, e)),
                  i &&
                    (i[0] !== c && a.accumulator.addPoint(i),
                    I(i, [c, o], a),
                    a.accumulator.addPoint([c, o])))
                : !isFinite(o) &&
                  isFinite(u[1]) &&
                  ((i = n.default.bisectFinite(u[0], u[1], c, o, e)),
                  i &&
                    (I(u, i, a),
                    i[0] !== u[0] && a.accumulator.addPoint(i),
                    a.accumulator.breakSegment())),
            (u = [c, o]));
        }
        return a.accumulator.finish();
      }
      function m(e, t, r, n) {
        function i(e, t) {
          var i = t % 2 === 0 ? 1 : -1;
          if (!n && i === -1) return !1;
          for (
            var a = t * (Math.PI / r),
              s = [u, u + 1, u + 2, u + 3],
              o = !1,
              c = 0,
              p = s.length;
            c < p;
            c++
          ) {
            var f = e(s[c]),
              h = e(s[c] + a);
            if (
              (isFinite(f) && isFinite(h) && (o = !0),
              isFinite(f) !== isFinite(h) || Math.abs(f - i * h) > l)
            )
              return !1;
          }
          return !!o;
        }
        var a,
          s,
          o,
          u = t.min,
          c = t.max - t.min,
          l =
            t.xtolerance && t.ytolerance
              ? Math.min(t.xtolerance, t.ytolerance)
              : t.tolerance
                ? t.tolerance
                : 0,
          p = Math.floor(c / (Math.PI / r));
        for (a = 1; a <= p; a++)
          if (i(e, a)) {
            for (o = a, s = 2; s * a <= p; s++) i(e, s * a) || (o = void 0);
            if (o) break;
          }
        return o ? o * (Math.PI / r) : null;
      }
      function g(e) {
        return [e[1] * Math.cos(e[0]), e[1] * Math.sin(e[0])];
      }
      function y(e, t) {
        return ((t.map = g), d(e, t));
      }
      function v(e, t) {
        for (
          var r = e.min,
            n = e.max,
            i = e.step,
            a = n - r,
            s = Math.ceil(a / i),
            o = a / s,
            u = 0;
          u < s;
          u++
        )
          t(r + u * o);
        t(n);
      }
      function b(e, t) {
        if (t.max < t.min) return { segments: [], resolved: !0 };
        var r = new a.default(t),
          n = 10,
          i = t.min,
          s = e(i);
        isFinite(s[0]) && isFinite(s[1]) && r.addPoint(s);
        var o;
        return (
          v(t, function (t) {
            ((o = e(t)), x(e, i, s, t, o, n, r), (i = t), (s = o));
          }),
          r.finish()
        );
      }
      function x(e, t, n, i, a, s, o) {
        if (i !== t) {
          var u = o.xtolerance,
            c = o.ytolerance,
            l = r.mean(t, i),
            p = e(l),
            f = isFinite(n[0]) && isFinite(n[1]),
            h = isFinite(a[0]) && isFinite(a[1]),
            d = isFinite(p[0]) && isFinite(p[1]);
          if (0 === s || l === t || l === i)
            return (o.breakSegment(), void (h && o.addPoint(a)));
          if (f || h) {
            if (f !== h) {
              for (var m = t, g = i, y = n, v = a; t !== l && l !== i; )
                (d == f
                  ? ((t = l), (n = p), (f = d))
                  : ((i = l), (a = p), (h = d)),
                  (l = t + (i - t) / 2),
                  (p = e(l)),
                  (d = isFinite(p[0]) && isFinite(p[1])));
              return void (f
                ? (x(e, m, y, t, n, s - 1, o), o.breakSegment())
                : (o.breakSegment(),
                  o.addPoint(a),
                  x(e, i, a, g, v, s - 1, o)));
            }
            if (f && d && h) {
              var b = r.pointToSegmentParameter(
                p[0],
                p[1],
                n[0],
                n[1],
                a[0],
                a[1],
              );
              if (
                b > 0.2 &&
                b < 0.8 &&
                Math.abs(p[0] - (n[0] + b * (a[0] - n[0]))) <= u &&
                Math.abs(p[1] - (n[1] + b * (a[1] - n[1]))) <= c
              )
                return void o.addPoint(a);
            }
            ((n[0] === p[0] && n[1] === p[1]) || x(e, t, n, l, p, s - 1, o),
              (a[0] === p[0] && a[1] === p[1]) || x(e, l, p, i, a, s - 1, o));
          }
        }
      }
      function _(e) {
        if (!e) return !1;
        var t = e.viewport.xmin,
          r = e.viewport.xmax,
          n = e.viewport.ymin,
          i = e.viewport.ymax;
        return (
          !(!isFinite(t) || !isFinite(r) || r <= t) &&
          !(!isFinite(n) || !isFinite(i) || i <= n) &&
          !(!isFinite(e.screen.width) || e.screen.width <= 0) &&
          !(!isFinite(e.screen.height) || e.screen.height <= 0)
        );
      }
      function E(e, t, r) {
        var n,
          i,
          a = e.viewport.xmin,
          s = e.viewport.xmax,
          c = e.viewport.ymin,
          l = e.viewport.ymax,
          p = e.trigAngleMultiplier || 1,
          f = e.oversample || 4,
          h = ((1 / f) * (s - a)) / e.screen.width,
          d = ((1 / f) * (l - c)) / e.screen.height,
          g = t.domainBound;
        switch (t.graphMode) {
          case o.X:
            switch (
              ((n = u.intersectDomains(u.knownDomain([c, l]), g)), n.type)
            ) {
              case "empty":
                return !1;
              case "known":
                ((c = n.bounds[0]), (l = n.bounds[1]));
            }
            i = { min: c, max: l, xtolerance: d, ytolerance: h, step: d };
            break;
          case o.Y:
            switch (
              ((n = u.intersectDomains(u.knownDomain([a, s]), g)), n.type)
            ) {
              case "empty":
                return !1;
              case "known":
                ((a = n.bounds[0]), (s = n.bounds[1]));
            }
            i = { min: a, max: s, xtolerance: h, ytolerance: d, step: h };
            break;
          case o.POLAR:
            i = {
              min: 0,
              max: ((2 * Math.PI) / p) * 6,
              step: (2 * Math.PI) / p / 1e3,
              tolerance: Math.min(h, d),
            };
            var y = m(r, i, p, "=" === t.operator);
            y && (i.max = i.min + y);
            break;
          case o.PARAMETRIC:
            var v = t.domain ? t.domain.min : 0,
              b = t.domain ? t.domain.max : 1,
              x = t.domain ? t.domain.step : 0.01;
            switch (
              ((n = u.intersectDomains(u.knownDomain([v, b]), g)), n.type)
            ) {
              case "empty":
                return !1;
              case "known":
                ((v = n.bounds[0]), (b = n.bounds[1]));
            }
            i = { min: v, max: b, step: x, xtolerance: h, ytolerance: d };
            break;
          case o.IMPLICIT:
            i = {
              xmin: a,
              xmax: s,
              ymin: c,
              ymax: l,
              xtolerance: h,
              ytolerance: d,
            };
            break;
          default:
            return !1;
        }
        return i;
      }
      function S(e, t, r, n) {
        var a,
          s,
          u,
          c = E(e, t, r);
        if (c) {
          switch (t.graphMode) {
            case o.X:
            case o.Y:
              a = t.isLinear ? p(t.linearCoefficients, c) : d(r, c, n);
              break;
            case o.POLAR:
              a = y(r, c);
              break;
            case o.IMPLICIT:
              a = i.sampleImplicit(r, c);
              break;
            default:
              (c.step || (c.step = (c.max - c.min) / 1e3),
                (a = t.isLinear ? f(t.linearCoefficients, c) : b(r, c)));
          }
          u = a.poi;
        } else a = { segments: [], resolved: !0 };
        if (
          ((!u ||
            u.zeros.x.length + u.extrema.x.length + u.intercept.x.length >
              250) &&
            (u = {
              zeros: { x: [], y: [] },
              extrema: { x: [], y: [] },
              intercept: { x: [], y: [] },
            }),
          t.graphMode === o.X)
        )
          for (var l in u)
            u.hasOwnProperty(l) &&
              ((s = u[l].y), (u[l].y = u[l].x), (u[l].x = s));
        var h = {
          segments: a.segments,
          resolved: a.resolved,
          graphMode: t.graphMode,
          color: t.color,
          style: t.lineStyle,
          operator: t.operator,
          poi: u,
          expr: null,
        };
        return (a.fillSegments && (h.fillSegments = a.fillSegments), h);
      }
      function w(e, t, r) {
        var n,
          i,
          a,
          s,
          u = [],
          c = null;
        switch (r) {
          case o.POLAR:
            c = g;
            break;
          case o.X:
            c = function (e) {
              return [e[1], e[0]];
            };
        }
        for (n = 0; n < e.length; n++)
          for (s = e[n], i = 0; i < s.length; i += 2)
            ((a = [s[i], s[i + 1]]), c && (a = c(a)), u.push(a[0], a[1]));
        for (n = t.length - 1; n >= 0; n--)
          for (s = t[n], i = s.length - 2; i >= 0; i -= 2)
            ((a = [s[i], s[i + 1]]), c && (a = c(a)), u.push(a[0], a[1]));
        return u;
      }
      function M(e, t, n) {
        for (
          var i = function (e) {
              var t = e[e.length - 1];
              return t[t.length - 2];
            },
            a = [],
            s = 0,
            o = 0,
            u = [],
            c = [],
            l = -(1 / 0),
            p = -(1 / 0);
          ;

        ) {
          if (l <= p) {
            if (s >= t.length) break;
            c.push(t[s++]);
          }
          if (p <= l) {
            if (o >= e.length) break;
            u.push(e[o++]);
          }
          if (((l = i(c)), (p = i(u)), r.approx(l, p, 4))) {
            (a.push(w(u, c, n)), (c = []), (u = []));
            var f = Math.max(l, p);
            ((l = f), (p = f));
          }
        }
        return a;
      }
      Object.defineProperty(t, "__esModule", { value: !0 });
      var I = function (e, t, r) {
          if (isFinite(r.jumpTolerance) && !(r.jumpTolerance <= 0)) {
            var n;
            if ((n = h(e, t, r))) {
              var i = n[0],
                a = n[1];
              (i && r.accumulator.addPoint(i),
                r.accumulator.breakSegment(),
                a && r.accumulator.addPoint(a));
            }
          }
        },
        P = (function () {
          function e(e, t, r) {
            ((this.derivative = r),
              (this.accumulator = new s.default(t, e, r)),
              (this.fn = e),
              (this.jumpTolerance = t.ytolerance || t.tolerance || 0),
              (this.stepPerturbation = t.step / 10));
          }
          return e;
        })();
      t.default = {
        sampleParametricNaive: c,
        sampleXYNaive: l,
        sampleLinear: p,
        sampleXY: d,
        findPiPeriod: m,
        samplePolar: y,
        sampleParametricRecursive: b,
        subsampleParametricRecursive: x,
        validateViewState: _,
        computeDomain: E,
        computeGraphData: S,
        polygonsFromSegments: M,
      };
    },
  ),
  define("lib/worker-i18n", ["require", "exports"], function (e, t) {
    "use strict";
    function r(e, t) {
      return { msg: e, vars: t };
    }
    (Object.defineProperty(t, "__esModule", { value: !0 }), (t.t = r));
  }),
  define("math/mathshim", ["require"], function (e) {
    var t = {};
    return (
      (t.cosh =
        Math.cosh ||
        function (e) {
          return 0.5 * (Math.exp(e) + Math.exp(-e));
        }),
      (t.sinh =
        Math.sinh && 0 !== Math.sinh(1e-20)
          ? Math.sinh
          : function (e) {
              var r = e > 0 ? 1 : -1;
              return (
                (e = e > 0 ? e : -e),
                0.5 * -r * Math.exp(e) * t.expm1(-2 * e)
              );
            }),
      (t.tanh =
        Math.tanh && 0 !== Math.tanh(1e-20)
          ? Math.tanh
          : function (e) {
              var r = e > 0 ? 1 : -1;
              e = e > 0 ? e : -e;
              var n = t.expm1(-2 * e);
              return (-r * n) / (2 + n);
            }),
      (t.acosh =
        Math.acosh ||
        function (e) {
          return e < 1 ? NaN : Math.log(e + t.sqrtxsqm1(e));
        }),
      (t.asinh =
        Math.asinh && 0 !== Math.asinh(1e-20)
          ? Math.asinh
          : function (e) {
              var r = e > 0 ? 1 : -1;
              return (
                (e = e > 0 ? e : -e),
                1 + e * e === 1
                  ? r * t.log1p(e)
                  : r * Math.log(e + t.sqrtxsqp1(e))
              );
            }),
      (t.atanh =
        Math.atanh && 0 !== Math.atanh(1e-20)
          ? Math.atanh
          : function (e) {
              return 0.5 * (t.log1p(e) - t.log1p(-e));
            }),
      (t.expm1 =
        Math.expm1 ||
        function (e) {
          return e + 0.5 * e * e === e ? e : Math.exp(e) - 1;
        }),
      (t.log1p =
        Math.log1p ||
        function (e) {
          return e - 0.5 * e * e === e ? e : Math.log(1 + e);
        }),
      (t.sqrtxsqp1 = function (e) {
        var t = e * e;
        return 1 + t === 1 ? 1 : 1 + t === t ? Math.abs(e) : Math.sqrt(t + 1);
      }),
      (t.sqrtxsqm1 = function (e) {
        var t = e * e;
        return t < 1 ? NaN : t - 1 === t ? Math.abs(e) : Math.sqrt(t - 1);
      }),
      t
    );
  }),
  define(
    "math/quadrature",
    ["require", "math/mathshim", "math/poi"],
    function (e) {
      "use strict";
      function t(e, t) {
        for (var r = v; r > 0; r--) {
          var n = (h / v) * r,
            i = c.sinh(n),
            a = c.cosh((Math.PI / 2) * i),
            s = 1 / (Math.exp((Math.PI / 2) * i) * a),
            o = c.cosh(n) / (a * a);
          (e.push(s), t.push(o));
        }
      }
      function r(e, t, r) {
        return 0.5 * (t * (2 - r) + e * r);
      }
      function n(e, t, r) {
        var n = 0.5 * (t + r),
          i = p(t, e(t), n, e(n), r, e(r), e, 0);
        return i ? 0.5 * (i[0][0] + i[1][0]) : n;
      }
      function i(e, t, r, n, i) {
        return { x1: e, x2: t, value: r, error: n, minerror: i };
      }
      function a(e, t, n) {
        var i = Math.abs(e(r(t, n, m))),
          a = Math.abs(e(r(t, n, 2 * m)));
        return !(i < m || a < m) && i > 1.95 * a;
      }
      function s(e, t, n) {
        var s,
          o,
          u = r(n, t, b[0]),
          c = r(t, n, b[0]),
          l = e(u),
          p = e(c),
          h = r(t, n, 1),
          d = e(h);
        if (isFinite(d) && !isFinite(l)) {
          if (((s = f(u, l, h, d, e)), Math.abs((s[0] - t) / (n - t)) > y))
            return i(t, n, NaN, NaN, NaN);
          ((t = s[0]), (l = s[1]));
        }
        if (isFinite(d) && !isFinite(p)) {
          if (((o = f(h, d, c, p, e)), Math.abs((o[0] - n) / (n - t)) > y))
            return i(t, n, NaN, NaN, NaN);
          ((n = o[0]), (p = o[1]));
        }
        if (isFinite(l) && isFinite(p) && !isFinite(d)) {
          if (
            ((s = f(u, l, h, d, e)),
            (o = f(h, d, c, p, e)),
            Math.abs((o[0] - s[0]) / (n - t)) > y)
          )
            return i(t, n, NaN, NaN, NaN);
          d = 0.5 * (s[1] + o[1]);
        }
        if (a(e, t, n) || a(e, n, t)) return i(t, n, NaN, NaN, NaN);
        for (
          var m = d, g = 0, _ = 0, E = 0, w = 0, M = 0, I = 0, P = 0;
          P < v;
          P += 4
        )
          ((M = e(r(t, n, b[P]))),
            (I = e(r(n, t, b[P]))),
            (w = Math.max(w, Math.abs(M), Math.abs(I))),
            (g += x[P] * (M + I)),
            (M = e(r(t, n, b[P + 1]))),
            (I = e(r(n, t, b[P + 1]))),
            (w = Math.max(w, Math.abs(M), Math.abs(I))),
            (E += x[P + 1] * (M + I)),
            (M = e(r(t, n, b[P + 2]))),
            (I = e(r(n, t, b[P + 2]))),
            (w = Math.max(w, Math.abs(M), Math.abs(I))),
            (_ += x[P + 2] * (M + I)),
            (M = e(r(t, n, b[P + 3]))),
            (I = e(r(n, t, b[P + 3]))),
            (w = Math.max(w, Math.abs(M), Math.abs(I))),
            (E += x[P + 3] * (M + I)));
        var T,
          C = m + g,
          D = C + _,
          O = D + E,
          N = Math.abs(_ - C),
          L = Math.abs(E - D),
          q = S * (n - t) * O,
          A = S * Math.abs(n - t) * w * x[0];
        return (
          (T =
            0 === N
              ? S * Math.abs(n - t) * L
              : S * Math.abs(n - t) * L * (L / N) * (L / N)),
          (T = Math.max(T, A)),
          i(t, n, q, T, A)
        );
      }
      function o(e) {
        for (
          var t = -(1 / 0), r = -(1 / 0), n = -1, i = 0, a = 0;
          a < e.length;
          a++
        ) {
          var s = e[a];
          ((i += s.value),
            s.error > t && ((t = s.error), (n = a)),
            s.minerror > r && (r = s.minerror));
        }
        return { maxerror: t, maxminerror: r, maxindex: n, totalvalue: i };
      }
      function u(e, t, i, a) {
        if ((void 0 === a && (a = 32), !isFinite(t) || !isFinite(i)))
          return NaN;
        for (
          var u = [s(e, t, i)], c = o(u), l = 1;
          l < a &&
          !(
            Math.abs(c.maxerror / c.totalvalue) <= 32 * g ||
            c.maxerror <= 32 * g ||
            c.maxerror <= 32 * c.maxminerror
          );
          l++
        ) {
          var p = u[u.length - 1];
          ((u[u.length - 1] = u[c.maxindex]), (u[c.maxindex] = p));
          var f = u.pop(),
            h = n(e, r(f.x2, f.x1, 0.125), r(f.x1, f.x2, 0.125));
          (u.push(s(e, f.x1, h)), u.push(s(e, h, f.x2)), (c = o(u)));
        }
        return c.totalvalue;
      }
      var c = e("math/mathshim"),
        l = e("math/poi").default,
        p = l.bisectJump,
        f = l.bisectFinite,
        h = 3.154019550531224,
        d = Math.pow(2, -13),
        m = d * d,
        g = m * m,
        y = m,
        v = 32,
        b = [],
        x = [];
      t(b, x);
      for (var _ = 0, E = 0; E < x.length; E++) _ += x[E];
      var S = 1 / (1 + 2 * _);
      return { quad: u };
    },
  ),
  define("math/studentt", ["require"], function (e) {
    var t = 0.5772156649015329,
      r = [
        -1.716185138865495, 24.76565080557592, -379.80425647094563,
        629.3311553128184, 866.9662027904133, -31451.272968848367,
        -36144.413418691176, 66456.14382024054,
      ],
      n = [
        -30.840230011973897, 315.35062697960416, -1015.1563674902192,
        -3107.771671572311, 22538.11842098015, 4755.846277527881,
        -134659.9598649693, -115132.25967555349,
      ],
      i = function (e) {
        if (e <= 0) throw new RangeError("Argument must be positive.");
        if (e < 0.001) return 1 / (e * (1 + t * e));
        if (e < 12) {
          var i = e,
            a = 0,
            s = i < 1;
          s ? (i += 1) : ((a = Math.floor(i) - 1), (i -= a));
          for (var u = 0, c = 1, l = i - 1, p = 0; p < 8; p++)
            ((u = (u + r[p]) * l), (c = c * l + n[p]));
          var f = u / c + 1;
          if (s) f /= i - 1;
          else for (p = 0; p < a; p++) f *= i++;
          return f;
        }
        return e > 171.624 ? 1 / 0 : Math.exp(o(e));
      },
      a = [
        1 / 12,
        -1 / 360,
        1 / 1260,
        -1 / 1680,
        1 / 1188,
        -691 / 360360,
        1 / 156,
        -3617 / 122400,
      ],
      s = 0.9189385332046728,
      o = function (e) {
        if (e <= 0) throw new RangeError("Argument must be positive.");
        if (e < 12) return Math.log(Math.abs(i(e)));
        for (var t = 1 / (e * e), r = a[7], n = 6; n >= 0; n--)
          ((r *= t), (r += a[n]));
        var o = r / e;
        return (e - 0.5) * Math.log(e) - e + s + o;
      },
      u = function (e) {
        if (e <= -1) throw new RangeError("Argument mustbe greater than -1.0");
        return Math.abs(e) > 1e-4 ? Math.log(1 + e) : (-0.5 * e + 1) * e;
      },
      c = function (e, t, r) {
        if (e < 0 || e > 1)
          throw new RangeError("First argument must be between 0 and 1.");
        if (1 === t && 1 === r) return e;
        if (0 === e) return 0;
        if (1 === e) return 1;
        if (0 === t) return 1;
        if (0 === r) return 0;
        var n = Math.exp(o(t + r) - o(t) - o(r) + t * Math.log(e) + r * u(-e));
        return e < (t + 1) / (t + r + 2)
          ? (n * l(e, t, r)) / t
          : 1 - (n * l(1 - e, r, t)) / r;
      },
      l = function (e, t, r) {
        var n,
          i,
          a,
          s,
          o,
          u,
          c,
          l,
          p,
          f = 1e-30,
          h = 1;
        for (
          c = t + r,
            p = t + 1,
            l = t - 1,
            a = 1,
            s = 1 - (c * e) / p,
            Math.abs(s) < f && (s = f),
            s = 1 / s,
            u = s;
          h <= 100 &&
          ((n = 2 * h),
          (i = (h * (r - h) * e) / ((l + n) * (t + n))),
          (s = 1 + i * s),
          Math.abs(s) < f && (s = f),
          (a = 1 + i / a),
          Math.abs(a) < f && (a = f),
          (s = 1 / s),
          (u *= s * a),
          (i = (-(t + h) * (c + h) * e) / ((t + n) * (p + n))),
          (s = 1 + i * s),
          Math.abs(s) < f && (s = f),
          (a = 1 + i / a),
          Math.abs(a) < f && (a = f),
          (s = 1 / s),
          (o = s * a),
          (u *= o),
          !(Math.abs(o - 1) < 3e-7));
          h++
        );
        return u;
      },
      p = function (e, t) {
        var r = i((e + 1) / 2) / (Math.sqrt(e * Math.PI) * i(e / 2));
        return r * Math.pow(1 + (t * t) / e, -((e + 1) / 2));
      },
      f = function (e, t) {
        var r = Math.sqrt(t * t + e);
        return c((t + r) / (2 * r), e / 2, e / 2);
      };
    return { cdf: f, pdf: p, gamma: i };
  }),
  define("math/tofraction", ["require", "exports"], function (e, t) {
    "use strict";
    function r(e, t) {
      if ((void 0 === t && (t = 1e6), e === 1 / 0)) return { n: 1 / 0, d: 1 };
      if (e === -(1 / 0)) return { n: -(1 / 0), d: 1 };
      if (!isFinite(e)) return { n: NaN, d: 1 };
      for (var r, n, i, a = 0, s = 1, o = 1, u = 0; ; ) {
        if (((r = Math.floor(e)), (n = r * s + a), (i = r * u + o), i > t))
          break;
        if (((a = s), (o = u), (s = n), (u = i), e === r)) break;
        e = 1 / (e - r);
      }
      return { n: s, d: u };
    }
    (Object.defineProperty(t, "__esModule", { value: !0 }), (t.default = r));
  }),
  define(
    "math/builtin",
    [
      "require",
      "math/mathshim",
      "math/distance",
      "math/quadrature",
      "math/studentt",
      "math/tofraction",
    ],
    function (e) {
      function t(e) {
        return !(e > 1e12) && Math.round(c * e) * Math.PI === e;
      }
      function r(e) {
        if (e > 1e12) return !1;
        var t = Math.round(2 * c * e);
        return t % 2 === 1 && t * Math.PI === 2 * e;
      }
      var n = e("math/mathshim"),
        i = e("math/distance"),
        a = e("math/quadrature"),
        s = e("math/studentt"),
        o = e("math/tofraction").default,
        u = {};
      ((u.cosh = n.cosh),
        (u.sinh = n.sinh),
        (u.tanh = n.tanh),
        (u.acosh = n.acosh),
        (u.asinh = n.asinh),
        (u.atanh = n.atanh),
        (u.expm1 = n.expm1),
        (u.log1p = n.log1p),
        (u.sqrtxsqp1 = n.sqrtxsqp1),
        (u.sqrtxsqm1 = n.sqrtxsqm1),
        (u.mod = function (e, t) {
          return e - t * Math.floor(e / t);
        }),
        (u.sign =
          Math.sign ||
          function (e) {
            return 0 === e ? 0 : e > 0 ? 1 : e < 0 ? -1 : NaN;
          }),
        (u.lcm = function (e, t) {
          ((e = Math.round(e)), (t = Math.round(t)));
          var r = u.gcd(e, t);
          return Math.abs((e * t) / r);
        }),
        (u.gcd = function (e, t) {
          if (
            ((e = Math.round(e)),
            (t = Math.round(t)),
            e < 0 && (e = -e),
            t < 0 && (t = -t),
            t > e)
          ) {
            var r = t;
            ((t = e), (e = r));
          }
          if (0 === t) return e;
          for (var n = e % t; n > 0; ) ((e = t), (t = n), (n = e % t));
          return t;
        }),
        (u.listGCD = function (e) {
          if (0 === e.length) return NaN;
          for (var t = e[0], r = 1; r < e.length; r++) t = u.gcd(t, e[r]);
          return t;
        }),
        (u.listLCM = function (e) {
          if (0 === e.length) return NaN;
          for (var t = e[0], r = 1; r < e.length; r++) t = u.lcm(t, e[r]);
          return t;
        }),
        (u.nCr = function (e, t) {
          if (
            ((e = Math.round(e)), (t = Math.round(t)), t > e || e < 0 || t < 0)
          )
            return 0;
          for (var r = 1, n = 0; n < t; n++) r *= (e - n) / (n + 1);
          return r;
        }),
        (u.nPr = function (e, t) {
          if (
            ((e = Math.round(e)), (t = Math.round(t)), t > e || e < 0 || t < 0)
          )
            return 0;
          for (var r = 1, n = 0; n < t; n++) r *= e - n;
          return r;
        }),
        (u.factorial = function (e) {
          return u.gamma(e + 1);
        }),
        (u._integerFactorial = function (e) {
          if (e !== Math.floor(e)) return NaN;
          if (e < 0) return NaN;
          if (e > 170) return NaN;
          if (0 === e || 1 === e) return 1;
          for (var t = 1, r = 2; r <= e; r++) t *= r;
          return t;
        }),
        (u.gamma = function (e) {
          return e === Math.floor(e)
            ? u._integerFactorial(e - 1)
            : e < 0
              ? Math.PI / (Math.sin(Math.PI * e) * u.gamma(1 - e))
              : Math.exp(u.lnGamma(e));
        }),
        (u.lnGamma = function (e) {
          if (e < 0) return NaN;
          for (
            var t = [
                57.15623566586292, -59.59796035547549, 14.136097974741746,
                -0.4919138160976202, 3399464998481189e-20, 4652362892704858e-20,
                -9837447530487956e-20, 0.0001580887032249125,
                -0.00021026444172410488, 0.00021743961811521265,
                -0.0001643181065367639, 8441822398385275e-20,
                -26190838401581408e-21, 36899182659531625e-22,
              ],
              r = 0.9999999999999971,
              n = 0;
            n < 14;
            n++
          )
            r += t[n] / (e + n + 1);
          var i = e + 5.2421875;
          return (
            (e + 0.5) * Math.log(i) - i + Math.log((2.5066282746310007 * r) / e)
          );
        }),
        (u.bernoulliTable = [
          1 / 6,
          -1 / 30,
          1 / 42,
          -1 / 30,
          5 / 66,
          -691 / 2730,
          7 / 6,
          -3617 / 510,
          43867 / 798,
          -174611 / 330,
          854513 / 138,
          -236364091 / 2730,
          8553103 / 6,
          -23749461029 / 870,
        ]),
        (u.cotDerivative = function (e, t) {
          if (e !== Math.floor(e)) return NaN;
          if (e < 0) return NaN;
          if (0 === e) return 1 / u.tan(t);
          var r = u.sin(t);
          if (1 === e) return -1 / (r * r);
          var n = u.cos(t);
          if (2 === e) return (2 * n) / (r * r * r);
          var i,
            a,
            s,
            o,
            c,
            l = [0, 2];
          for (a = 3; a <= e; a++) {
            for (i = [], s = 0; s < a; s++)
              ((o = 0),
                (c = 0),
                s > 0 && (o = (a - s + 1) * l[s - 1]),
                s + 2 < a && (c = (s + 1) * l[s + 1]),
                i.push(-(o + c)));
            l = i;
          }
          var p = 0;
          for (s = e - 1; s >= 0; s--) p = i[s] + n * p;
          return p / Math.pow(r, e + 1);
        }),
        (u.polyGamma = function (e, t) {
          if (e < 0) return NaN;
          if (e !== Math.floor(e)) return NaN;
          var r = e % 2 === 0 ? -1 : 1;
          if (t < 0)
            return (
              -r * u.polyGamma(e, 1 - t) -
              Math.pow(Math.PI, e + 1) * u.cotDerivative(e, Math.PI * t)
            );
          for (
            var n = u.factorial(e), i = 0, a = Math.pow(t, -(e + 1));
            t < 10;

          )
            ((i += a), t++, (a = Math.pow(t, -(e + 1))));
          ((i += 0 === e ? -Math.log(t) : (a * t) / e), (i += 0.5 * a));
          for (
            var s = u.bernoulliTable,
              o = e + 1,
              c = 2,
              l = (a * t * o) / c,
              p = 1 / (t * t),
              f = 1;
            f <= 14;
            f++
          )
            ((l *= p),
              (i += l * s[f - 1]),
              o++,
              c++,
              (l *= o / c),
              o++,
              c++,
              (l *= o / c));
          return n * r * i;
        }),
        (u.toFraction = o),
        (u.log = function (e) {
          var t = Math.log(e);
          return Math.exp(Math.round(t)) === e ? Math.round(t) : t;
        }),
        (u.log_base = function (e, t) {
          if (0 === t) return NaN;
          var r = Math.log(e) / Math.log(t);
          return Math.pow(t, Math.round(r)) === e ? Math.round(r) : r;
        }),
        (u.common_log = function (e) {
          return u.log_base(e, 10);
        }),
        (u.pow = function (e, t) {
          if (!isFinite(e) && 0 === t) return NaN;
          if (e >= 0 || t === Math.floor(t)) return Math.pow(e, t);
          var r = u.toFraction(t, 100);
          return i.approx(r.n / r.d, t, 2) && r.d % 2 === 1
            ? (r.n % 2 === 0 ? 1 : -1) * Math.pow(-e, t)
            : NaN;
        }),
        (u.nthroot = function (e, t) {
          return u.pow(e, 1 / t);
        }));
      var c = 1 / Math.PI;
      return (
        (u.sin = function (e) {
          return t(Math.abs(e)) ? 0 : Math.sin(e);
        }),
        (u.cos = function (e) {
          return r(Math.abs(e)) ? 0 : Math.cos(e);
        }),
        (u.tan = function (e) {
          var n = Math.abs(e);
          return t(n) ? 0 : r(n) ? 1 / 0 : Math.tan(e);
        }),
        (u.sec = function (e) {
          return r(Math.abs(e)) ? 1 / 0 : 1 / Math.cos(e);
        }),
        (u.csc = function (e) {
          return t(Math.abs(e)) ? 1 / 0 : 1 / Math.sin(e);
        }),
        (u.cot = function (e) {
          var n = Math.abs(e);
          return t(n) ? 1 / 0 : r(n) ? 0 : 1 / Math.tan(e);
        }),
        (u.acot = function (e) {
          return Math.PI / 2 - Math.atan(e);
        }),
        (u.acsc = function (e) {
          return Math.asin(1 / e);
        }),
        (u.asec = function (e) {
          return Math.acos(1 / e);
        }),
        (u.sech = function (e) {
          return 1 / u.cosh(e);
        }),
        (u.csch = function (e) {
          return 1 / u.sinh(e);
        }),
        (u.coth = function (e) {
          return 1 / u.tanh(e);
        }),
        (u.asech = function (e) {
          return u.acosh(1 / e);
        }),
        (u.acsch = function (e) {
          return u.asinh(1 / e);
        }),
        (u.acoth = function (e) {
          return u.atanh(1 / e);
        }),
        (u.mean = function (e) {
          for (var t = 0, r = 0; r < e.length; r++) t += e[r];
          return t / e.length;
        }),
        (u.total = function (e) {
          for (var t = 0, r = 0; r < e.length; r++) t += e[r];
          return t;
        }),
        (u.tpdf = function (e, t) {
          return t !== Math.round(t) ? NaN : t <= 0 ? NaN : s.pdf(t, e);
        }),
        (u.tcdf = function (e, t) {
          return t !== Math.round(t) ? NaN : t <= 0 ? NaN : s.cdf(t, e);
        }),
        (u.normalcdf = function (e, t, r) {
          var n = (e - t) / (Math.SQRT2 * Math.abs(r));
          return n < 0
            ? 0.5 * Math.exp(-n * n) * u.erfcx(-n)
            : 1 - 0.5 * Math.exp(-n * n) * u.erfcx(n);
        }),
        (u.normalpdf = function (e, t, r) {
          return (
            (1 / Math.sqrt(2 * Math.PI * r * r)) *
            Math.exp((-(e - t) * (e - t)) / (2 * r * r))
          );
        }),
        (u.binomcdf = function (e, t, r) {
          if (t !== Math.round(t) || e !== Math.round(e)) return NaN;
          if (r < 0 || r > 1) return NaN;
          if (e < 0 || t < 0) return 0;
          for (
            var n = r / (1 - r), i = Math.pow(1 - r, t), a = i, s = 1;
            s <= Math.min(t, e);
            s++
          )
            ((i *= ((t - s + 1) / s) * n), (a += i));
          return a;
        }),
        (u.binompdf = function (e, t, r) {
          return t !== Math.round(t)
            ? NaN
            : ((e = Math.floor(e)),
              r < 0 || r > 1
                ? NaN
                : e < 0 || t < 0
                  ? 0
                  : u.nCr(t, e) * Math.pow(r, e) * Math.pow(1 - r, t - e));
        }),
        (u.poissonpdf = function (e, t) {
          return t <= 0
            ? NaN
            : e !== Math.round(e)
              ? NaN
              : e < 0
                ? 0
                : Math.exp(-t + e * Math.log(t) - u.lnGamma(e + 1));
        }),
        (u.poissoncdf = function (e, t) {
          if (t <= 0) return NaN;
          if (((e = Math.floor(e)), e < 0)) return 0;
          for (var r = 1, n = 1, i = 1; i <= e; i++) ((r *= t / i), (n += r));
          return Math.exp(-t) * n;
        }),
        (u.erf = function (e) {
          var t = -e * e;
          if (t < -750) return e >= 0 ? 1 : -1;
          if (e >= 0.065) return 1 - Math.exp(t) * u.erfcx(e);
          if (e <= -0.065) return Math.exp(t) * u.erfcx(-e) - 1;
          var r = 1.1283791670955126,
            n = 0.37612638903183754,
            i = 0.11283791670955126,
            a = 0.026866170645131252,
            s = 0.005223977625442188;
          return e * (r + t * (n + t * (i + t * (a + t * s))));
        }),
        (u.erfcx = function (e) {
          var t = 0.9999999999999999,
            r = 2.224574423459406,
            n = 2.444115549920689,
            i = 1.7057986861852539,
            a = 0.8257463703357973,
            s = 0.28647031042892007,
            o = 0.07124513844341643,
            c = 0.012296749268608364,
            l = 0.001347817214557592,
            p = 7263959403471071e-20,
            f = 1,
            h = 3.352953590554884,
            d = 5.227518529742423,
            m = 5.003720878235473,
            g = 3.266590890998987,
            y = 1.5255421920765353,
            v = 0.5185887413188858,
            b = 0.12747319185915415,
            x = 0.02185979575963238,
            _ = 0.0023889438122503674,
            E = 0.00012875032817508128;
          if (e < 0)
            return e < -6.1
              ? 2 * Math.exp(e * e)
              : 2 * Math.exp(e * e) - u.erfcx(-e);
          if (e > 50) {
            var S = 0.5641895835477563,
              w = e * e;
            return e > 5e7
              ? S / e
              : (S * (w * (w + 4.5) + 2)) / (e * (w * (w + 5) + 3.75));
          }
          var M =
              t +
              e *
                (r +
                  e *
                    (n +
                      e *
                        (i +
                          e *
                            (a +
                              e * (s + e * (o + e * (c + e * (l + e * p)))))))),
            I =
              f +
              e *
                (h +
                  e *
                    (d +
                      e *
                        (m +
                          e *
                            (g +
                              e *
                                (y +
                                  e *
                                    (v +
                                      e * (b + e * (x + e * (_ + e * E)))))))));
          return M / I;
        }),
        (u.invNorm = function (e) {
          var t,
            r,
            n,
            i = -39.6968302866538,
            a = 220.946098424521,
            s = -275.928510446969,
            o = 138.357751867269,
            c = -30.6647980661472,
            l = 2.50662827745924,
            p = -54.4760987982241,
            f = 161.585836858041,
            h = -155.698979859887,
            d = 66.8013118877197,
            m = -13.2806815528857,
            g = -0.00778489400243029,
            y = -0.322396458041136,
            v = -2.40075827716184,
            b = -2.54973253934373,
            x = 4.37466414146497,
            _ = 2.93816398269878,
            E = 0.00778469570904146,
            S = 0.32246712907004,
            w = 2.445134137143,
            M = 3.75440866190742,
            I = 0.02425;
          return e > 0.5
            ? -u.invNorm(1 - e)
            : 0.5 === e
              ? 0
              : e < 0
                ? NaN
                : 0 === e
                  ? -(1 / 0)
                  : (e < I
                      ? ((t = Math.sqrt(-2 * Math.log(e))),
                        (n =
                          (((((g * t + y) * t + v) * t + b) * t + x) * t + _) /
                          ((((E * t + S) * t + w) * t + M) * t + 1)))
                      : ((t = e - 0.5),
                        (r = t * t),
                        (n =
                          ((((((i * r + a) * r + s) * r + o) * r + c) * r + l) *
                            t) /
                          (((((p * r + f) * r + h) * r + d) * r + m) * r + 1))),
                    n -
                      Math.sqrt(2 * Math.PI) *
                        (0.5 * u.erfcx(-n / Math.SQRT2) -
                          Math.exp(0.5 * n * n) * e));
        }),
        (u.TScore = function (e, t) {
          var r = u.stdev(e),
            n = u.mean(e);
          return ((n - t) * Math.sqrt(e.length)) / r;
        }),
        (u.TTest = function (e, t) {
          return u.tcdf(u.TScore(e, t), e.length - 1);
        }),
        (u.length = function (e) {
          return e.length;
        }),
        (u.listMin = function (e) {
          if (e.length < 1) return NaN;
          var t = e[0];
          if (isNaN(t)) return NaN;
          for (var r = 1; r < e.length; r++) {
            if (isNaN(e[r])) return NaN;
            e[r] < t && (t = e[r]);
          }
          return t;
        }),
        (u.listMax = function (e) {
          if (e.length < 1) return NaN;
          var t = e[0];
          if (isNaN(t)) return NaN;
          for (var r = 1; r < e.length; r++) {
            if (isNaN(e[r])) return NaN;
            e[r] >= t && (t = e[r]);
          }
          return t;
        }),
        (u.quantile = function (e, t) {
          if (!isFinite(t) || t < 0 || t > 1) return NaN;
          var r = e.length,
            n = u.sortPerm(e),
            i = t * (r - 1);
          return Math.floor(i) === i
            ? e[n[i]]
            : (Math.ceil(i) - i) * e[n[Math.floor(i)]] +
                (i - Math.floor(i)) * e[n[Math.ceil(i)]];
        }),
        (u.quartile = function (e, t) {
          if (!isFinite(t) || t < 0 || t > 4) return NaN;
          var r = u.sortPerm(e),
            n = u.quartileIndex(e, t),
            i = Math.floor(n),
            a = Math.ceil(n);
          return (e[r[i]] + e[r[a]]) / 2;
        }),
        (u.sortPerm = function (e) {
          for (var t = e.length, r = [], n = 0; n < t; n++) r.push(n);
          return (
            r.sort(function (t, r) {
              return e[t] - e[r];
            }),
            r
          );
        }),
        (u.quartileIndex = function (e, t) {
          t = Math.round(t);
          var r,
            n = e.length,
            i = n % 2 === 1;
          return 1 === n
            ? 0
            : (0 === t && (r = 0),
              2 === t && (r = (n - 1) / 2),
              4 === t && (r = n - 1),
              1 === t && (r = i ? (n + 1) / 4 - 1 : (n + 2) / 4 - 1),
              3 === t && (r = i ? (3 * n + 3) / 4 - 1 : (3 * n + 2) / 4 - 1),
              r);
        }),
        (u.upperQuantileIndex = function (e, t) {
          return u.sortPerm(e)[Math.ceil(t * (e.length - 1))] + 1;
        }),
        (u.lowerQuantileIndex = function (e, t) {
          return u.sortPerm(e)[Math.floor(t * (e.length - 1))] + 1;
        }),
        (u.upperQuartileIndex = function (e, t) {
          return u.sortPerm(e)[Math.ceil(u.quartileIndex(e, t))] + 1;
        }),
        (u.lowerQuartileIndex = function (e, t) {
          return u.sortPerm(e)[Math.floor(u.quartileIndex(e, t))] + 1;
        }),
        (u.median = function (e) {
          return u.quantile(e, 0.5);
        }),
        (u.argMin = function (e) {
          if (e.length < 1) return 0;
          var t = e[0];
          if (isNaN(t)) return 0;
          for (var r = 0, n = 1; n < e.length; n++) {
            if (isNaN(e[n])) return 0;
            e[n] < t && ((r = n), (t = e[n]));
          }
          return r + 1;
        }),
        (u.argMax = function (e) {
          if (e.length < 1) return 0;
          var t = e[0];
          if (isNaN(t)) return 0;
          for (var r = 0, n = 1; n < e.length; n++)
            if (e[n] >= t) {
              if (isNaN(e[n])) return 0;
              ((r = n), (t = e[n]));
            }
          return r + 1;
        }),
        (u.varp = function (e) {
          for (var t = u.mean(e), r = 0, n = 0; n < e.length; n++) {
            var i = e[n] - t;
            r += i * i;
          }
          return r / e.length;
        }),
        (u.mad = function (e) {
          for (var t = u.mean(e), r = 0, n = 0; n < e.length; n++)
            r += Math.abs(e[n] - t);
          return r / e.length;
        }),
        (u.var = function (e) {
          var t = e.length;
          return (u.varp(e) * t) / (t - 1);
        }),
        (u.covp = function (e, t) {
          if (e.length !== t.length) return NaN;
          for (
            var r = e.length, n = u.mean(e), i = u.mean(t), a = 0, s = 0;
            s < r;
            s++
          )
            a += (e[s] - n) * (t[s] - i);
          return a / r;
        }),
        (u.cov = function (e, t) {
          if (e.length !== t.length) return NaN;
          var r = e.length;
          return (u.covp(e, t) * r) / (r - 1);
        }),
        (u.corr = function (e, t) {
          if (e.length !== t.length) return NaN;
          for (
            var r,
              n,
              i = e.length,
              a = u.mean(e),
              s = u.mean(t),
              o = 0,
              c = 0,
              l = 0,
              p = 0;
            p < i;
            p++
          )
            ((r = e[p] - a),
              (n = t[p] - s),
              (o += r * r),
              (c += n * n),
              (l += r * n));
          return l / Math.sqrt(o * c);
        }),
        (u.stdev = function (e) {
          return Math.sqrt(u.var(e));
        }),
        (u.stdevp = function (e) {
          return Math.sqrt(u.varp(e));
        }),
        (u.quad = a.quad),
        (u.distance = function (e, t) {
          return i.hypot(t[0] - e[0], t[1] - e[1]);
        }),
        (u.midpoint = function (e, t) {
          return [0.5 * (e[0] + t[0]), 0.5 * (e[1] + t[1])];
        }),
        u
      );
    },
  ),
  define("math/functions", ["require", "math/builtin"], function (e) {
    function t(e) {
      for (var t = 0; t < e.length; t++)
        e[t].compiled && delete e[t].compiled.fn;
    }
    function r(e) {
      for (var t = 0; t < e.length; t++) {
        var r = e[t].compiled;
        r && (r.fn = i(r.args, r.source));
      }
    }
    function n(e, t) {
      for (var r = [], n = 0; n < t; n++) r.push("values[" + n + "]");
      return i(["values"], "return " + e(r));
    }
    function i(e, t) {
      var r = e.join(","),
        n = "return (function(" + r + "){" + t + "})",
        i = new Function(["BuiltIn"], n);
      return i(a);
    }
    var a = e("math/builtin");
    return {
      dehydrateGraphData: t,
      rehydrateGraphData: r,
      closureFunctionWithBuiltIn: i,
      createEvaluateFunction: n,
    };
  }));
var define_enum_constant,
  enum_strings = {},
  debuggable_enums = !0;
if (debuggable_enums)
  define_enum_constant = function (e) {
    this[e] = e;
  };
else {
  var next_enum = 1e3;
  define_enum_constant = function (e) {
    ((enum_strings[next_enum] = e), (this[e] = next_enum++));
  };
}
(define_enum_constant("EXPRESSION"),
  define_enum_constant("FUNCTION_DEFINITION"),
  define_enum_constant("VARIABLE_DEFINITION"),
  define_enum_constant("ORDERED_PAIR_LIST"),
  define_enum_constant("DOUBLE_INEQUALITY"),
  define_enum_constant("COMPARATOR"),
  define_enum_constant("CHAINED_COMPARATOR"),
  define_enum_constant("EQUATION"),
  define_enum_constant("CONSTANT"),
  define_enum_constant("IDENTIFIER"),
  define_enum_constant("LIST"),
  define("math/enums", function () {}),
  define(
    "math/parsenode/base",
    ["require", "pjs", "math/functions", "../enums"],
    function (e) {
      var t = e("pjs"),
        r = e("math/functions");
      return (
        e("../enums"),
        t(function (e, t, n) {
          ((e.init = function () {
            ((this._dependencies = []),
              (this._dummyDependencies = []),
              (this._inputString = ""),
              (this._exports = []));
          }),
            (e.exportPenalty = 0));
          var i = 0;
          ((e.tmpVar = function () {
            return "tmp" + i++;
          }),
            (e.statementType = EXPRESSION),
            (e.dependencies = function () {
              return this.getDependencies();
            }),
            (e.evaluateOnce = function (e) {
              void 0 === e && (e = {});
              var t = this.getConcreteTree(e),
                r = t.getEvaluationInfo();
              return r ? r[0].val : NaN;
            }),
            (e.setInputString = function (e) {
              this._inputString = e;
            }),
            (e.getInputString = function () {
              return this._inputString;
            }),
            (e.shouldExportAns = function () {
              return !1;
            }),
            (e.getAnsVariable = function () {
              return this.shouldExportAns() &&
                this.userData &&
                this.userData.hasOwnProperty("index")
                ? ["ans_" + this.userData.index]
                : [];
            }),
            (e.addDependency = function (e) {
              this.dependsOn(e) || this._dependencies.push(e);
            }),
            (e.addDependencies = function (e) {
              for (var t = 0; t < e.length; t++) this.addDependency(e[t]);
            }),
            (e.addDummyDependency = function (e) {
              this._dummyDependencies.indexOf(e) === -1 &&
                this._dummyDependencies.push(e);
            }),
            (e.addDummyDependencies = function (e) {
              for (var t = 0; t < e.length; t++) this.addDummyDependency(e[t]);
            }),
            (e.mergeDependencies = function () {
              for (var e = 0; e < arguments.length; e++)
                (this.addDependencies(arguments[e].getDependencies()),
                  this.addDummyDependencies(
                    arguments[e].getDummyDependencies(),
                  ));
            }),
            (e.getDependencies = function () {
              return this._dependencies;
            }),
            (e.getDummyDependencies = function () {
              return this._dummyDependencies;
            }),
            (e.removeDependency = function (e) {
              var t = this._dependencies.indexOf(e);
              t >= 0 && this._dependencies.splice(t, 1);
            }),
            (e.dependsOn = function (e) {
              return this._dependencies.indexOf(e) > -1;
            }),
            (e.getExports = function () {
              var e = this._exports || [];
              return e.concat(this.getAnsVariable());
            }),
            (e.getLegalExports = function (e) {
              return this.getExports().filter(function (t) {
                return !e.assignmentForbidden(t);
              });
            }),
            (e.exportsSymbol = function (e) {
              return this._exports.indexOf(e) > -1;
            }),
            (e.exportTo = function (e, t, r) {
              for (var n = this.getLegalExports(e), i = 0; i < n.length; i++) {
                var a = n[i];
                if (r[a]) return;
                r[a] = t.blocksExport ? t : this;
              }
            }),
            (e.getOperator = function () {
              return this.operator || "=";
            }),
            (e.isInequality = function () {
              return !1;
            }),
            (e.isShadeBetween = function () {
              return !1;
            }),
            (e.getAllIds = function () {
              return this.userData ? [this.userData.id] : [];
            }),
            (e.getEvaluationInfo = function () {
              return !1;
            }),
            (e.getSliderInfo = function () {
              return !1;
            }),
            (e.getSliderVariables = function (e, t) {
              return e.sliderVariables(t.getDependencies());
            }),
            (e.tryGetConcreteTree = function () {
              var e;
              try {
                e = this.getConcreteTree.apply(this, arguments);
              } catch (t) {
                if (!(t instanceof n)) throw t;
                e = t;
              }
              return e;
            }),
            (e.getCompiledFunction = function (e) {
              var t = this.getEvalStrings(),
                n = t.statements.join(";") + ";return " + t.expression;
              if (void 0 === e) {
                e = this.getDependencies();
                var i = e.indexOf("x");
                if (i !== -1) {
                  var a = e[0];
                  ((e[0] = e[i]), (e[i] = a));
                }
              }
              return {
                args: e,
                source: n,
                fn: r.closureFunctionWithBuiltIn(e, n),
              };
            }),
            (e.getCompiledDerivative = function () {
              var e = this.getDependencies(),
                t = this.takeDerivative(e[0] || "x");
              return t.getCompiledFunction();
            }));
        })
      );
    },
  ),
  define("math/parsenode/error", ["require", "pjs", "./base"], function (e) {
    var t = e("pjs"),
      r = e("./base");
    return t(r, function (e, t) {
      ((e.init = function (e) {
        (t.init.call(this),
          (this._msg = e),
          (this._sliderVariables = []),
          (this.blocksExport = !0));
      }),
        (e.evaluateOnce = function (e) {
          return this._msg;
        }),
        (e.isError = !0),
        (e.getError = function () {
          return this._msg;
        }),
        (e.setDependencies = function (e) {
          return ((this._dependencies = e), this);
        }),
        (e.allowExport = function () {
          return ((this.blocksExport = !1), this);
        }));
    });
  }),
  define(
    "graphing/label",
    ["require", "exports", "underscore", "math/distance", "math/tofraction"],
    function (e, t, r, n, i) {
      "use strict";
      function a(e, t) {
        if ((void 0 === t && (t = e), isNaN(e) || !isFinite(e)))
          return { ariaString: "undefined", string: "undefined", value: e };
        if (0 === e) return { ariaString: "0", string: "0", value: e };
        Math.abs(e) > Math.abs(t) && (t = e);
        var r,
          a,
          s,
          o = i.default(e / Math.PI, 24);
        if (h(t) && n.approx((o.n / o.d) * Math.PI, e, 3))
          return (
            (r =
              0 === o.n
                ? "0"
                : 1 === o.n
                  ? "π"
                  : o.n === -1
                    ? "-π"
                    : o.n.toString() + "π"),
            (a = 1 === o.d ? "" : "/" + o.d.toString()),
            (s = r + a),
            { ariaString: u(s), string: s, value: (o.n / o.d) * Math.PI }
          );
        if (h(t))
          return (
            (s = f(l(e.toFixed(d(t))))),
            { ariaString: u(s), string: s, value: parseFloat(s) }
          );
        var c = p(e.toExponential(d(t / e))).split("e"),
          m = c[0] + "×10",
          g = c[1].replace("+", "");
        return (
          (s = p(e.toExponential(d(t / e))).replace("+", "")),
          {
            ariaString: u(s),
            string: s,
            mantissa: m,
            superscript: g,
            value: parseFloat(s),
          }
        );
      }
      function s(e) {
        return M["[" + e + "]"];
      }
      function o(e) {
        return e[0] + e.slice(1).split("").join(" ");
      }
      function u(e) {
        return e.replace(P, o).replace(I, s).replace(/ +/gi, " ").trim();
      }
      function c(e, t, r, n) {
        var i = a(e, t),
          s = a(n(i.value), r);
        return [i, s];
      }
      function l(e) {
        return e.indexOf(".") === -1 ? e : e.replace(T, "");
      }
      function p(e) {
        var t = /\.?0+e/;
        return e.replace(t, "e");
      }
      function f(e) {
        return "-0" === e ? "0" : e;
      }
      function h(e) {
        return ((e = Math.abs(e)), 1e-4 < e && e < 1e7);
      }
      function d(e) {
        return (
          (e = Math.abs(e)),
          (e = Math.max(e, 1e-16)),
          Math.max(3, Math.floor(4.5 - Math.log(e) / Math.LN10))
        );
      }
      function m(e, t) {
        if (((t = t || {}), isNaN(e) || !isFinite(e)))
          return { type: "undefined" };
        if (0 === e || (t.zeroCutoff && Math.abs(e) < t.zeroCutoff))
          return { type: "decimal", value: "0" };
        var r = t.smallCutoff || 0.001,
          n = t.bigCutoff || 1e6,
          i = t.digits || 10,
          a = p(e.toExponential(i - 2)),
          s = a.match(/([\d\.\-]+)e\+?([\d\-]+)/);
        if (!s) return { type: "undefined" };
        var o = parseInt(s[2], 10) >= i;
        if (Math.abs(e) > n || Math.abs(e) < r || o)
          return { type: "scientific", mantissa: s[1], exponent: s[2] };
        var u = l(e.toPrecision(i));
        return (
          e !== Number(u) && t.addEllipses && (u += "..."),
          { type: "decimal", value: u }
        );
      }
      function g(e, t) {
        var r = m(e, t);
        switch (r.type) {
          case "undefined":
            return "undefined";
          case "decimal":
            return r.value;
          case "scientific":
            return (
              r.mantissa +
              "<span class='dcg-cross'>×</span>10<sup>" +
              r.exponent +
              "</sup>"
            );
          default:
            var n = r;
            return n;
        }
      }
      function y(e, t) {
        var r = m(e, t);
        switch (r.type) {
          case "undefined":
            return "undefined";
          case "decimal":
            return r.value;
          case "scientific":
            return r.mantissa + " * 10^" + r.exponent;
          default:
            var n = r;
            return n;
        }
      }
      function v(e, t) {
        var r = m(e, t);
        switch (r.type) {
          case "undefined":
            return "undefined";
          case "decimal":
            return r.value;
          case "scientific":
            return r.mantissa + "\\times10^{" + r.exponent + "}";
          default:
            var n = r;
            return n;
        }
      }
      function b(e, t) {
        var r = m(e, t);
        switch (r.type) {
          case "undefined":
            return "undefined";
          case "decimal":
            return u(r.value);
          case "scientific":
            return u(r.mantissa + "e" + r.exponent);
          default:
            var n = r;
            return n;
        }
      }
      function x(e) {
        e = e.replace("\\", "");
        var t = { pi: "π", tau: "τ", theta: "θ", phi: "ϕ" };
        return t.hasOwnProperty(e) ? t[e] : e;
      }
      function _(e) {
        var t = e.split("_"),
          r = "";
        return (
          t[0].length > 1 && (r += "\\"),
          (r += t[0]),
          t[1] && (r += 1 === t[1].length ? "_" + t[1] : "_{" + t[1] + "}"),
          r
        );
      }
      function E(e) {
        if (!e) return "";
        var t = e.split("_").map(x).map(r.escape),
          n = t[0];
        return (t[1] && (n += "<sub>" + t[1] + "</sub>"), n);
      }
      function S(e) {
        return (
          (e = e.replace(/\\operatorname\{(.*)\}/, "$1")),
          e.replace(/[{}\\]/g, "")
        );
      }
      function w(e) {
        return e
          .replace(/^(\\ | |\\space)+/, "")
          .replace(/(\\ | |\\space)+$/, "");
      }
      (Object.defineProperty(t, "__esModule", { value: !0 }), (t.value = a));
      var M = {
          "[e]": " times 10 to the ",
          "[+]": " plus ",
          "[-]": " minus ",
          "[*]": " times ",
          "[/]": " over ",
          "[π]": " pi ",
          "[τ]": " tau ",
          "[θ]": " theta ",
          "[ϕ]": " phi ",
        },
        I = new RegExp(Object.keys(M).join("|"), "gi"),
        P = /\.\d+/g;
      t.point = c;
      var T = /\.?0+$/;
      ((t.numericLabel = m),
        (t.truncatedHTMLLabel = g),
        (t.truncatedPlainmathLabel = y),
        (t.truncatedLatexLabel = v),
        (t.truncatedAriaLabel = b),
        (t.formatSymbol = x),
        (t.identifierToLatex = _),
        (t.identifierToHTML = E),
        (t.latexToIdentifier = S),
        (t.trimLatex = w));
    },
  ),
  define("math/types", ["require", "lib/worker-i18n"], function (e) {
    function t(e) {
      switch (e) {
        case u:
          return "Any";
        case c:
          return "Number";
        case l:
          return "Bool";
        case p:
          return "Point";
        case f:
          return "ListOfAny";
        case h:
          return "ListOfNumber";
        case d:
          return "ListOfBool";
        case m:
          return "ListOfPoint";
        case g:
          return "ErrorType";
        default:
          throw new Error("Invalid type");
      }
    }
    function r(e) {
      switch (e) {
        case u:
          return o.t("an unknown object");
        case c:
          return o.t("a number");
        case l:
          return o.t("a true/false value");
        case p:
          return o.t("a point");
        case f:
          return o.t("a list of unknown objects");
        case h:
          return o.t("a list of numbers");
        case d:
          return o.t("a list of true/false values");
        case m:
          return o.t("a list of points");
        case g:
          return o.t("an error object");
        default:
          throw new Error("Invalid type");
      }
    }
    function n(e) {
      switch (e) {
        case f:
          return !0;
        case h:
          return !0;
        case d:
          return !0;
        case m:
          return !0;
        default:
          return !1;
      }
    }
    function i(e) {
      switch (e) {
        case f:
          return u;
        case h:
          return c;
        case d:
          return l;
        case m:
          return p;
        default:
          return u;
      }
    }
    function a(e) {
      switch (e) {
        case u:
          return f;
        case c:
          return h;
        case l:
          return d;
        case p:
          return m;
        default:
          throw new Error("Type " + t(e) + " does not implement listType.");
      }
    }
    function s(e) {
      switch (e) {
        case u:
          return !0;
        case c:
          return !0;
        case l:
          return !0;
        case p:
          return !0;
        default:
          return !1;
      }
    }
    var o = e("lib/worker-i18n"),
      u = 0,
      c = 1,
      l = 2,
      p = 3,
      f = 4,
      h = 5,
      d = 6,
      m = 7,
      g = 8;
    return {
      Any: u,
      Number: c,
      Bool: l,
      Point: p,
      ListOfAny: f,
      ListOfNumber: h,
      ListOfBool: d,
      ListOfPoint: m,
      ErrorType: g,
      repr: t,
      prettyPrint: r,
      isList: n,
      elementType: i,
      listType: a,
      hasListType: s,
    };
  }),
  define(
    "math/errormsg",
    [
      "require",
      "lib/worker-i18n",
      "math/parsenode/error",
      "graphing/label",
      "math/types",
    ],
    function (e) {
      var t = e("lib/worker-i18n"),
        r = e("math/parsenode/error"),
        n = e("graphing/label"),
        i = e("math/types");
      return {
        parseError: function () {
          return r(t.t("Sorry, I don't understand this."));
        },
        unrecognizedSymbol: function (e) {
          return (
            (e = n.formatSymbol(e)),
            r(
              t.t("Sorry, I don't understand the '__symbol__' symbol.", {
                symbol: e,
              }),
            )
          );
        },
        unexpectedInequality: function () {
          return r(t.t("Cannot use an inequality here."));
        },
        unexpectedSymbol: function (e) {
          return (
            (e = n.formatSymbol(e)),
            r(
              t.t(
                "Sorry, I don't understand the way that '__symbol__' is used here.",
                { symbol: e },
              ),
            )
          );
        },
        addTypeError: function (e) {
          return r(
            t.t("Cannot add __symbol2__ and __symbol1__.", {
              symbol1: e[0],
              symbol2: e[1],
            }),
          ).allowExport();
        },
        subtractTypeError: function (e) {
          return r(
            t.t("Cannot subtract __symbol2__ from __symbol1__.", {
              symbol1: e[0],
              symbol2: e[1],
            }),
          ).allowExport();
        },
        multiplyTypeError: function (e) {
          return r(
            t.t("Cannot multiply __symbol1__ by __symbol2__.", {
              symbol1: e[0],
              symbol2: e[1],
            }),
          ).allowExport();
        },
        divideTypeError: function (e) {
          return r(
            t.t("Cannot divide __symbol1__ by __symbol2__.", {
              symbol1: e[0],
              symbol2: e[1],
            }),
          ).allowExport();
        },
        exponentTypeError: function (e) {
          return r(
            t.t("Cannot raise __symbol1__ to __symbol2__.", {
              symbol1: e[0],
              symbol2: e[1],
            }),
          ).allowExport();
        },
        negativeTypeError: function (e) {
          return r(
            t.t("Cannot negate __symbol__.", { symbol: e[0] }),
          ).allowExport();
        },
        comparatorTypeError: function (e) {
          return r(
            t.t("Cannot compare __symbol1__ to __symbol2__.", {
              symbol1: e[0],
              symbol2: e[1],
            }),
          ).allowExport();
        },
        andTypeError: function (e) {
          return r(
            t.t("Cannot apply __symbol__ to __symbol1__ and __symbol2__.", {
              symbol: "and",
              symbol1: e[0],
              symbol2: e[1],
            }),
          ).allowExport();
        },
        listTypeError: function (e) {
          return r(
            t.t("Cannot store __symbol1__ in a list.", { symbol1: e[0] }),
          ).allowExport();
        },
        pointTypeError: function (e) {
          return r(
            t.t(
              "Cannot use __symbol1__ and __symbol2__ as the coordinates of __symbol3__.",
              { symbol1: e[0], symbol2: e[1], symbol3: i.prettyPrint(i.Point) },
            ),
          ).allowExport();
        },
        indexTypeError: function (e) {
          return r(
            t.t("Cannot index __symbol1__ with __symbol2__.", {
              symbol1: e[0],
              symbol2: e[1],
            }),
          ).allowExport();
        },
        functionTypeError: function (e, i) {
          switch (i.length) {
            case 1:
              return r(
                t.t("Function '__fn__' cannot be applied to __arg__.", {
                  fn: n.formatSymbol(e),
                  arg: i[0],
                }),
              ).allowExport();
            case 2:
              return r(
                t.t(
                  "Function '__fn__' cannot be applied to __arg1__ and __arg2__.",
                  { fn: n.formatSymbol(e), arg1: i[0], arg2: i[1] },
                ),
              ).allowExport();
            default:
              return r(
                t.t("Function '__fn__' cannot be applied to these arguments.", {
                  fn: n.formatSymbol(e),
                }),
              ).allowExport();
          }
        },
        sumLowerBoundTypeError: function (e) {
          return r(
            t.t("Lower bound of a sum cannot be __symbol__.", { symbol: e[0] }),
          ).allowExport();
        },
        sumUpperBoundTypeError: function (e) {
          return r(
            t.t("Upper bound of a sum cannot be __symbol__.", { symbol: e[0] }),
          ).allowExport();
        },
        sumArgumentTypeError: function (e) {
          return r(
            t.t("Cannot take the sum of __symbol__.", { symbol: e[0] }),
          ).allowExport();
        },
        productLowerBoundTypeError: function (e) {
          return r(
            t.t("Lower bound of a product cannot be __symbol__.", {
              symbol: e[0],
            }),
          ).allowExport();
        },
        productUpperBoundTypeError: function (e) {
          return r(
            t.t("Upper bound of a product cannot be __symbol__.", {
              symbol: e[0],
            }),
          ).allowExport();
        },
        productArgumentTypeError: function (e) {
          return r(
            t.t("Cannot take the product of __symbol__.", { symbol: e[0] }),
          ).allowExport();
        },
        integralLowerBoundTypeError: function (e) {
          return r(
            t.t("Lower bound of an integral cannot be __symbol__.", {
              symbol: e[0],
            }),
          ).allowExport();
        },
        integralUpperBoundTypeError: function (e) {
          return r(
            t.t("Upper bound of an integral cannot be __symbol__.", {
              symbol: e[0],
            }),
          ).allowExport();
        },
        integralArgumentTypeError: function (e) {
          return r(
            t.t("Cannot take the integral of __symbol__.", { symbol: e[0] }),
          ).allowExport();
        },
        derivativeTypeError: function (e) {
          return r(
            t.t("Cannot take the derivative of __symbol__.", { symbol: e[0] }),
          ).allowExport();
        },
        derivativeVariableTypeError: function (e, i) {
          return r(
            t.t(
              "Cannot take derivative with respect to '__symbol1__' because it is __symbol2__.",
              { symbol1: n.formatSymbol(e), symbol2: i[0] },
            ),
          );
        },
        piecewiseConditionTypeError: function (e) {
          return r(
            t.t(
              "The condition in a piecewise expression must be __symbol1__ but was __symbol2__.",
              { symbol1: i.prettyPrint(i.Bool), symbol2: e[0] },
            ),
          ).allowExport();
        },
        piecewiseBranchTypeError: function (e) {
          return r(
            t.t(
              "Cannot use __symbol__ as a branch of a piecewise expression.",
              { symbol: e[0] },
            ),
          ).allowExport();
        },
        tableHeaderTypeError: function (e) {
          return r(t.t("Table header cannot be __symbol__.", { symbol: e[0] }));
        },
        tableEntryTypeError: function (e) {
          return r(t.t("Table entry cannot be __symbol__.", { symbol: e[0] }));
        },
        regressionTypeError: function (e) {
          return r(
            t.t("Cannot regress __symbol1__ against __symbol2__.", {
              symbol1: e[0],
              symbol2: e[1],
            }),
          );
        },
        heterogeneousList: function () {
          return r(
            t.t("All elements of a list must have the same type."),
          ).allowExport();
        },
        deeplyNested: function () {
          return r(t.t("Definitions are nested too deeply.")).allowExport();
        },
        polygonListTypeError: function (e) {
          return r(
            t.t(
              "A single argument to polygon should be a point list, not __type__.",
              { type: e[0] },
            ),
          );
        },
        polygonPointArgsError: function () {
          return r(t.t("Some of your arguments are not points."));
        },
        polygonTwoNumbersError: function () {
          return r(t.t("Cannot make a polygon from two numbers."));
        },
        wrongArity: function (e, i, a) {
          e = n.formatSymbol(e);
          var s, o;
          if (1 === i)
            ((o = t.t("For example, try typing: __dependency__(x).", {
              dependency: e,
            })),
              (s =
                a > 1
                  ? t.t(
                      "Function '__dependency__' requires only 1 argument. __supplement__",
                      { dependency: e, supplement: o },
                    )
                  : t.t(
                      "Function '__dependency__' requires an argument. __supplement__",
                      { dependency: e, supplement: o },
                    )));
          else {
            for (var u = [], c = 0; c < i; c++) u[c] = c + 1;
            var l = n.formatSymbol(e) + "(" + u.join(", ") + ")";
            ((o = t.t("For example, try typing: __recommendation__.", {
              recommendation: l,
            })),
              (s = t.t(
                "Function '__dependency__' requires __assignment_arity__ arguments. __supplement__",
                { dependency: e, assignment_arity: i, supplement: o },
              )));
          }
          return r(s);
        },
        wrongParametrizedReducerArity: function (e) {
          return r(
            t.t(
              "Function '__symbol__' requires 2 arguments. For example, try typing: __recommendation__.",
              {
                symbol: n.formatSymbol(e),
                recommendation: n.formatSymbol(e) + "([1,2,3], 1)",
              },
            ),
          );
        },
        wrongDoubleReducerArity: function (e) {
          return r(
            t.t(
              "Function '__symbol__' requires 2 arguments. For example, try typing: __recommendation__.",
              {
                symbol: n.formatSymbol(e),
                recommendation: n.formatSymbol(e) + "([1,2,3], [3,2,1])",
              },
            ),
          );
        },
        primedFunctionArity: function () {
          return r(
            t.t(
              "Prime notation can only be used for functions of a single argument.",
            ),
          );
        },
        zeroArgReducer: function (e) {
          return r(
            t.t(
              "Function '__symbol__' requires at least one argument. For example, try typing: __symbol__(1, 2).",
              { symbol: n.formatSymbol(e) },
            ),
          );
        },
        missingRHS: function (e) {
          return (
            (e = n.formatSymbol(e)),
            r(t.t("What do you want '__symbol__' to equal?", { symbol: e }))
          );
        },
        malformedPoint: function () {
          return r(t.t("Points are written like this: (1, 2)."));
        },
        nonPairTuple: function () {
          return r(t.t("Points may only have 2 coordinates."));
        },
        badImplicitCall: function (e) {
          return (
            (e = n.formatSymbol(e)),
            r(
              t.t("Use parentheses around the argument of '__symbol__'.", {
                symbol: e,
              }),
            )
          );
        },
        badImplicitMultiply: function () {
          return r(
            t.t(
              "Confusing implicit multiplication. Use parentheses or a '*' symbol.",
            ),
          );
        },
        binaryOperatorMissingOperand: function (e) {
          return r(
            t.t(
              "You need something on both sides of the '__symbol__' symbol.",
              { symbol: e },
            ),
          );
        },
        unaryOperatorMissingLeft: function (e) {
          return r(
            t.t("You need something before the '__symbol__' symbol.", {
              symbol: e,
            }),
          );
        },
        unaryOperatorMissingRight: function (e) {
          return r(
            t.t("You need something after the '__symbol__' symbol.", {
              symbol: e,
            }),
          );
        },
        fractionMissingNumerator: function () {
          return r(t.t("You need a numerator for the top of your fraction."));
        },
        fractionMissingDenominator: function () {
          return r(
            t.t("You need a denominator for the bottom of your fraction."),
          );
        },
        fractionEmpty: function () {
          return r(
            t.t("You need a numerator and denominator for your fraction."),
          );
        },
        emptySubscript: function () {
          return r(t.t("Subscripts cannot be empty."));
        },
        emptySuperscript: function () {
          return r(t.t("Superscripts cannot be empty."));
        },
        invalidSubscript: function (e) {
          return (
            (e = n.formatSymbol(e)),
            r(
              t.t(
                "Subscripts may only contain letters and digits. '__symbol__' is not allowed.",
                { symbol: e },
              ),
            )
          );
        },
        invalidOperatorName: function () {
          return r(t.t("Operator names may only contain letters."));
        },
        unexpectedSubscript: function () {
          return r(t.t("Only functions and variables may have subscripts."));
        },
        superscriptWithPrime: function () {
          return r(t.t("Superscripts and primes cannot be combined."));
        },
        unexpectedPrime: function () {
          return r(
            t.t("Sorry, I don't understand this use of prime notation."),
          );
        },
        primeWithoutParen: function () {
          return r(t.t("Primed function calls must use parentheses."));
        },
        emptyRadical: function () {
          return r(t.t("Radical cannot be empty."));
        },
        emptyRadicand: function () {
          return r(t.t("Radicand cannot be empty."));
        },
        emptyParen: function () {
          return r(t.t("Parentheses cannot be empty."));
        },
        emptySquareBracket: function () {
          return r(t.t("Square brackets cannot be empty."));
        },
        emptyPipe: function () {
          return r(t.t("Absolute value symbol cannot be empty."));
        },
        badTrigExponent: function (e) {
          var n = e + "^2",
            i = e + "^-1";
          return r(
            t.t(
              "Only __form1__ and __form2__ are supported. Otherwise, use parens.",
              { form1: n, form2: i },
            ),
          );
        },
        badLogExponent: function (e) {
          var n = e + "^2";
          return r(
            t.t("Only __form__ is supported. Otherwise, use parens.", {
              form: n,
            }),
          );
        },
        inequalityChainTooLong: function () {
          return r(t.t("Cannot chain more than 2 inequalities."));
        },
        piecewiseMissingCondition: function () {
          return r(
            t.t("A piecewise expression must have at least one condition."),
          );
        },
        piecewisePartMissingCondition: function () {
          return r(
            t.t(
              "Every part of a piecewise expression must have a condition except the last.",
            ),
          );
        },
        colonMissingCondition: function () {
          return r(
            t.t("The left side of a ':' must be a condition, like 'x>1'."),
          );
        },
        blankExpression: function () {
          return r(t.t("You haven't written anything yet."));
        },
        functionNotDefined: function (e) {
          return (
            (e = n.formatSymbol(e)),
            r(
              t.t("Function '__dependency__' is not defined.", {
                dependency: e,
              }),
            )
          );
        },
        parameterAlreadyDefined: function (e) {
          return (
            (e = n.formatSymbol(e)),
            r(
              t.t(
                "You can't use '__dependency__' as a parameter of this function because '__dependency__' is already defined.",
                { dependency: e },
              ),
            )
          );
        },
        cannotRedefine: function (e, i) {
          return (
            (e = n.formatSymbol(e)),
            r(
              void 0 === i
                ? t.t(
                    "You can't redefine '__symbol__' because it's already defined.",
                    { symbol: e },
                  )
                : t.t(
                    "You can't define '__symbol__' because '__symbolRoot__' is already defined.",
                    { symbol: e, symbolRoot: i },
                  ),
            )
          );
        },
        cannotSubscript: function (e) {
          return (
            (e = n.formatSymbol(e)),
            r(t.t("'__symbol__' cannot have a subscript.", { symbol: e }))
          );
        },
        multiplyDefined: function (e) {
          return (
            (e = n.formatSymbol(e)),
            r(
              t.t(
                "You've defined '__dependency__' in more than one place. Try picking a different variable, or deleting some of the definitions of '__dependency__'.",
                { dependency: e },
              ),
            )
          );
        },
        shadowedIndex: function (e) {
          return (
            (e = n.formatSymbol(e)),
            r(
              t.t(
                "You can't use '__symbol__' as an index because it's already defined.",
                { symbol: e },
              ),
            )
          );
        },
        cycle: function (e) {
          e = e.map(n.formatSymbol);
          var i = e.pop();
          return r(
            t.t(
              "'__symbols__' and '__lastSymbol__' can't be defined in terms of each other.",
              { symbols: e.join("', '"), lastSymbol: i },
            ),
          );
        },
        selfReferentialFunction: function (e) {
          return r(
            t.t(
              "The definition of function '__symbol__' cannot depend on '__symbol__'.",
              { symbol: n.formatSymbol(e) },
            ),
          );
        },
        tooManyVariables: function (e) {
          if (((e = e.map(n.formatSymbol)), 0 === e.length))
            return r(
              t.t("Too many variables, I don't know what to do with this."),
            );
          var i = e.pop();
          return r(
            t.t("Too many variables. Try defining '__variables__'.", {
              variables: (e.length ? e.join("', '") + "' or '" : "") + i,
            }),
          );
        },
        addArgumentsToDefinition: function (e, i, a) {
          ((e = e.map(n.formatSymbol)),
            (i = n.formatSymbol(i)),
            (a = a.map(n.formatSymbol)));
          var s = i + "(" + a.join(",") + "," + e.join(",") + ")",
            o = e.pop(),
            u = { symbols: e.join("', '"), lastSymbol: o, newSignature: s };
          return r(
            e.length
              ? t.t(
                  "Try including '__symbols__' and '__lastSymbol__' as arguments by defining the function as '__newSignature__'.",
                  u,
                )
              : t.t(
                  "Try including '__lastSymbol__' as an argument by defining the function as '__newSignature__'.",
                  u,
                ),
          );
        },
        invalidLHS: function (e) {
          return (
            (e = n.formatSymbol(e)),
            r(
              t.t(
                "Sorry, you can't graph __symbol__ as a function of anything yet.",
                { symbol: e },
              ),
            )
          );
        },
        unplottablePolarFunction: function () {
          return r(
            t.t(
              "We can't plot θ as a function of r. Try plotting r(θ) instead.",
            ),
          );
        },
        invalidInequalityVariables: function () {
          return r(t.t("We only plot inequalities of x and y, or r and θ."));
        },
        invalidImplicitVariables: function () {
          return r(t.t("We only support implicit equations of x and y."));
        },
        singleVariableImplicitEquationsDisabled: function () {
          return r(
            t.t("Plotting single-variable implicit equations is disabled."),
          );
        },
        complicatedImplicitInequality: function () {
          return r(
            t.t(
              "We can only plot inequalities when one variable is quadratic or linear.",
            ),
          );
        },
        complicatedPolarImplicit: function () {
          return r(t.t("Polar equations must be linear in r."));
        },
        invalidDoubleInequalityVariables: function () {
          return r(t.t("We only plot double inequalities of x and y."));
        },
        mismatchedDoubleInequality: function () {
          return r(
            t.t(
              "Double inequalities must both go the same way, e.g. 1 < y < 2.",
            ),
          );
        },
        complicatedDoubleInequality: function () {
          return r(
            t.t(
              "We only support solved double inequalities. Try deleting one side of the inequality.",
            ),
          );
        },
        equationRequired: function (e) {
          return e
            ? ((e = n.formatSymbol(e)),
              r(
                t.t("Try adding '__lhs__' to the beginning of this equation.", {
                  lhs: e + "=",
                }),
              ))
            : r(
                t.t("Try adding an equals sign to turn this into an equation."),
              );
        },
        variableAsFunction: function (e) {
          return (
            (e = n.formatSymbol(e)),
            r(
              t.t("Variable '__dependency__' can't be used as a function.", {
                dependency: e,
              }),
            )
          );
        },
        emptyList: function () {
          return r(t.t("Empty lists are not allowed."));
        },
        invalidTableHeader: function (e) {
          return r(
            t.t("Table headers must be simple expressions. __supplement__", {
              supplement: e,
            }),
          );
        },
        invalidTableEntry: function (e) {
          return r(
            t.t("Table entries must be simple expressions. __supplement__", {
              supplement: e,
            }),
          );
        },
        invalidFirstTableColumn: function () {
          return r(
            t.t("First column may not be __most__ or __last__.", {
              most: "'y', 'r',",
              last: "'θ'",
            }),
          );
        },
        invalidDependentFirstTableColumn: function () {
          return r(
            t.t(
              "This column header can't be defined elsewhere in the calculator.",
            ),
          );
        },
        invalidRegressionParameter: function (e) {
          return r(
            t.t("'__symbol__' may not be used as a regression parameter.", {
              symbol: n.formatSymbol(e),
            }),
          );
        },
        optimizationError: function () {
          return r(
            t.t("We couldn't find any region where this model is defined."),
          );
        },
        badListInReducer: function (e) {
          return r(
            t.t(
              "When __symbol__ is called with more than two arguments, no argument can be a list.",
              { symbol: n.formatSymbol(e) },
            ),
          ).allowExport();
        },
        nonListDoubleReducer: function (e) {
          return r(
            t.t(
              "Both arguments of '__symbol__' must be lists. For example, try typing: __recommendation__.",
              {
                symbol: n.formatSymbol(e),
                recommendation: n.formatSymbol(e) + "([1,2,3], [3,2,1])",
              },
            ),
          ).allowExport();
        },
        nonListParametrizedReducer: function (e) {
          return r(
            t.t(
              "The first argument of '__symbol__' must be a list. For example, try typing: __recommendation__.",
              {
                symbol: n.formatSymbol(e),
                recommendation: n.formatSymbol(e) + "([1,2,3], 1)",
              },
            ),
          ).allowExport();
        },
        variableRange: function (e) {
          return r(
            t.t("Range cannot depend on free variable '__symbol__'.", {
              symbol: n.formatSymbol(e[0]),
            }),
          ).allowExport();
        },
        nonArithmeticRange: function (e) {
          return r(t.t("Ranges must be arithmetic sequences.")).allowExport();
        },
        sumMissingBound: function () {
          return r(t.t("Sums must have upper and lower bounds."));
        },
        productMissingBound: function () {
          return r(t.t("Products must have upper and lower bounds."));
        },
        incorrectSumLowerBound: function () {
          return r(
            t.t(
              "Lower bound of a sum must set a variable equal to a number. Try n=1.",
            ),
          );
        },
        incorrectProductLowerBound: function () {
          return r(
            t.t(
              "Lower bound of a product must set a variable equal to a number. Try n=1.",
            ),
          );
        },
        integralMissingBound: function () {
          return r(t.t("Integrals must have upper and lower bounds."));
        },
        integralMissingDifferential: function () {
          return r(
            t.t("Integrand must end with an integration variable, like dx."),
          );
        },
        differentialWithSuperscript: function () {
          return r(t.t("Integration variable cannot have a superscript."));
        },
        sumMissingBody: function () {
          return r(t.t("What do you want to take the sum of?"));
        },
        productMissingBody: function () {
          return r(t.t("What do you want to take the product of?"));
        },
        integralMissingBody: function () {
          return r(t.t("What do you want to take the integral of?"));
        },
        derivativeMissingBody: function () {
          return r(t.t("What do you want to take the derivative of?"));
        },
        mismatchedBraces: function (e, i) {
          return (
            (e = n.formatSymbol(e)),
            (i = n.formatSymbol(i)),
            r(
              t.t("Expected '__symbol1__' to match '__symbol2__'.", {
                symbol1: e,
                symbol2: i,
              }),
            )
          );
        },
        shadowedIntegrationVariable: function (e) {
          return r(
            t.t(
              "You can't use '__symbol__' as an integration variable because it's already defined.",
              { symbol: n.formatSymbol(e) },
            ),
          );
        },
        badIntegralBoundDependency: function (e) {
          return r(
            t.t(
              "Integration bounds can't depend on integration variable '__symbol__'.",
              { symbol: n.formatSymbol(e) },
            ),
          );
        },
        percentMissingOf: function () {
          return r(t.t("'%' must be used with 'of'. Try '25% of 12'."));
        },
        badAnsContext: function () {
          return r(t.t("You can't use 'ans' in this context."));
        },
        ansUndefined: function () {
          return r(
            t.t("The previous expression didn't define any value for ans."),
          );
        },
        variablesUnsupported: function (e) {
          return r(
            t.t(
              "This calculator does not support variables like '__variable__'.",
              { variable: n.formatSymbol(e) },
            ),
          );
        },
        functionUnsupported: function (e) {
          return r(
            t.t("This calculator does not support the '__symbol__' function.", {
              symbol: n.formatSymbol(e),
            }),
          );
        },
        constantUnsupported: function (e) {
          return r(
            t.t("This calculator does not support the constant '__symbol__'.", {
              symbol: n.formatSymbol(e),
            }),
          );
        },
        assignmentsUnsupported: function () {
          return r(t.t("This calculator does not support defining variables."));
        },
        functionDefinitionsUnsupported: function () {
          return r(
            t.t("This calculator does not support function definitions."),
          );
        },
        equationsUnsupported: function () {
          return r(
            t.t("This calculator does not support this type of equation."),
          );
        },
        inequalitiesUnsupported: function () {
          return r(t.t("This calculator does not support inequalities."));
        },
        regressionsUnsupported: function () {
          return r(t.t("This calculator does not support regressions."));
        },
        pointsUnsupported: function () {
          return r(t.t("This calculator does not support points."));
        },
        featureUnavailable: function () {
          return r(
            t.t("This feature is not available in the current calculator."),
          );
        },
        nonSquareDeterminant: function () {
          return r(t.t("Only square matrices have a determinant."));
        },
        nonSquareInverse: function () {
          return r(t.t("Only square matrices have an inverse."));
        },
        singularInverse: function () {
          return r(t.t("Singular matrices do not have an inverse."));
        },
        matrixAssignment: function () {
          return r(
            t.t(
              "This calculator does not support this type of variable definition. Try using 'New Matrix'.",
            ),
          );
        },
        matrixAddDimensions: function () {
          return r(t.t("Cannot add matrices with different dimensions."));
        },
        matrixSubtractDimensions: function () {
          return r(t.t("Cannot subtract matrices with different dimensions."));
        },
        matrixMultiplyDimensions: function () {
          return r(
            t.t("Cannot multiply matrices with incompatible dimensions."),
          );
        },
        matrixFractionalPower: function () {
          return r(t.t("A matrix can only be raised to integer powers."));
        },
        matrixPowerDimensions: function () {
          return r(t.t("Only square matrices can be raised to a power."));
        },
        matrixElementTypeError: function (e) {
          return r(
            t.t("Cannot use __arg__ as an element of a matrix.", { arg: e[0] }),
          );
        },
        matrixInvalidVariable: function (e) {
          return r(
            t.t("Cannot use '__symbol__' as a variable.", {
              symbol: n.formatSymbol(e),
            }),
          );
        },
      };
    },
  ),
  define(
    "math/parsenode/expression",
    ["require", "pjs", "./base", "math/errormsg", "math/types"],
    function (e) {
      var t = e("pjs"),
        r = e("./base"),
        n = e("math/errormsg"),
        i = e("math/types");
      return t(r, function (e, t) {
        ((e.init = function (e) {
          if (!Array.isArray(e))
            throw new TypeError(
              "Argument to expression constructor must be an Array.",
            );
          (t.init.call(this),
            (this.args = e),
            (this.valueType = this._getValueType(e)),
            this.registerDependencies(),
            this.computeTreeSize());
        }),
          (e._getValueType = function (e) {
            return i.Any;
          }),
          (e.shouldExportAns = function () {
            return !0;
          }),
          (e.registerDependencies = function () {
            this.mergeDependencies.apply(this, this.args);
          }),
          (e.computeTreeSize = function () {
            for (var e = 0, t = 0; t < this.args.length; t++)
              this.args[t].treeSize && (e += this.args[t].treeSize);
            if (((this.treeSize = e + 1), e > 1e4)) throw n.deeplyNested();
          }),
          (e.copyWithArgs = function (e) {
            return new this.constructor(e);
          }));
      });
    },
  ),
  define(
    "math/parsenode/scalarexpression",
    ["require", "pjs", "./expression"],
    function (e) {
      var t = e("pjs"),
        r = e("./expression");
      return t(r, function (e, t) {
        ((e.init = function (e) {
          t.init.call(this, e);
        }),
          (e.getEvalStrings = function () {
            for (var e = [], t = [], r = 0; r < this.args.length; r++) {
              var n = this.args[r].getEvalStrings();
              ((e = e.concat(n.statements)), t.push(n.expression));
            }
            return { statements: e, expression: this.scalarEvalExpression(t) };
          }));
      });
    },
  ),
  define(
    "math/parsenode/expressionTypes",
    ["require", "pjs", "./scalarexpression"],
    function (e) {
      var t = e("pjs"),
        r = e("./scalarexpression"),
        n = {
          Add: t(r, {}),
          Subtract: t(r, {}),
          Multiply: t(r, {}),
          Divide: t(r, {}),
          Exponent: t(r, {}),
          Negative: t(r, {}),
          And: t(r, {
            isInequality: function () {
              return this.args[0].isInequality() && this.args[1].isInequality();
            },
          }),
          PercentOf: t(r, {}),
        };
      return ((n.RawExponent = t(n.Exponent, {})), n);
    },
  ),
  define(
    "math/parsenode/constant",
    ["require", "pjs", "./scalarexpression"],
    function (e) {
      var t = e("pjs"),
        r = e("./scalarexpression");
      return t(r, function (e, t) {
        ((e.init = function (e) {
          ((this.constantValue = e), t.init.call(this, []));
        }),
          (e.isConstant = !0),
          (e.getEvalStrings = function () {
            return { statements: [], expression: this.scalarExprString() };
          }),
          (e.asValue = function () {
            return this.constantValue;
          }),
          (e.scalarExprString = function () {
            return this.constantValue > 0
              ? String(this.constantValue)
              : "(" + String(this.constantValue) + ")";
          }),
          (e.getEvaluationInfo = function () {
            return [{ val: this.constantValue }];
          }),
          (e.isNaN = function () {
            return (
              "number" == typeof this.constantValue && isNaN(this.constantValue)
            );
          }));
      });
    },
  ),
  define(
    "math/parsenode/identifier",
    ["require", "pjs", "./expression", "graphing/label"],
    function (e) {
      var t = e("pjs"),
        r = e("./expression"),
        n = e("graphing/label");
      return t(r, function (e, t, r) {
        ((e.init = function (e) {
          (t.init.call(this, []),
            (this._symbol = n.latexToIdentifier(e)),
            this.setInputString(e),
            this.addDependency(this._symbol));
        }),
          (e.evaluate = function () {
            throw "Cannot evaluate undefined variable " + this._symbol;
          }));
      });
    },
  ),
  define(
    "math/parsenode/ans",
    ["require", "pjs", "./identifier"],
    function (e) {
      var t = e("pjs"),
        r = e("./identifier");
      return t(r, function (e, t, r) {});
    },
  ),
  define(
    "math/parsenode/freevariable",
    ["require", "pjs", "./scalarexpression"],
    function (e) {
      var t = e("pjs"),
        r = e("./scalarexpression");
      return t(r, function (e, t) {
        ((e.init = function (e) {
          (t.init.call(this, []), this.addDependency(e), (this._symbol = e));
        }),
          (e.isFreeVariable = !0),
          (e.scalarEvalExpression = function (e) {
            return this._symbol;
          }),
          (e.copyWithArgs = function (e) {
            return this;
          }));
      });
    },
  ),
  define(
    "math/parsenode/dummyindex",
    ["require", "pjs", "./freevariable"],
    function (e) {
      var t = e("pjs"),
        r = e("./freevariable");
      return t(r, function () {});
    },
  ),
  define(
    "math/parsenode/list",
    ["require", "pjs", "./expression", "math/errormsg", "math/types"],
    function (e) {
      var t = e("pjs"),
        r = e("./expression"),
        n = e("math/errormsg"),
        i = e("math/types");
      return t(r, function (e, t, r) {
        function a(e) {
          for (var t = 1 / 0, r = 0; r < e.length; r++)
            (e[r].isList || e[r].isBroadcast) && (t = Math.min(t, e[r].length));
          return t;
        }
        ((e.init = function (e) {
          if (
            (t.init.call(this, e), (this.length = e.length), 0 === this.length)
          )
            throw n.emptyList();
        }),
          (e.isList = !0),
          (e.getEvalStrings = function () {
            for (var e = [], t = [], r = 0; r < this.args.length; r++) {
              var n = this.args[r].getEvalStrings();
              (Array.prototype.push.apply(e, n.statements),
                t.push(n.expression));
            }
            return { statements: e, expression: "[" + t.join(",") + "]" };
          }),
          (e.asValue = function () {
            for (var e = [], t = 0; t < this.args.length; t++)
              e.push(this.args[t].asValue());
            return e;
          }),
          (e.getEvaluationInfo = function () {
            if (
              this.args.every(function (e) {
                return e.isConstant;
              })
            )
              return [
                {
                  val: this.args.map(function (e) {
                    return e.constantValue;
                  }),
                },
              ];
          }),
          (r.eachArgs = function (e, t) {
            var r = a(e);
            if (!isFinite(r)) return void t(e);
            for (var n = 0; n < r; n++) {
              for (var s = [], o = 0; o < e.length; o++)
                s.push(
                  e[o].isList || i.isList(e[o].valueType)
                    ? e[o].elementAt(n)
                    : e[o],
                );
              t(s);
            }
          }),
          (r.mapArgs = function (e, t) {
            var n = [];
            return (
              r.eachArgs(e, function (e) {
                n.push(t(e));
              }),
              n
            );
          }),
          (r.wrap = function (e) {
            return e.isList || i.isList(e.valueType) ? e : r([e]);
          }));
      });
    },
  ),
  define(
    "math/parsenode/range",
    ["require", "pjs", "./expression"],
    function (e) {
      var t = e("pjs"),
        r = e("./expression");
      return t(r, function (e, t, r) {
        e.init = function (e) {
          (t.init.call(this, e), (this.beginning = e[0]), (this.end = e[1]));
        };
      });
    },
  ),
  define(
    "math/parsenode/broadcast",
    ["require", "pjs", "./expression"],
    function (e) {
      var t = e("pjs"),
        r = e("./expression");
      return t(r, function (e, t, r) {
        ((e.init = function (e, r) {
          if (
            (t.init.call(this, r),
            (this._replacedSymbols = e),
            (this._expression = r[0]),
            (this._lists = r.slice(1)),
            !e.length)
          )
            throw new Error(
              "Cannot construct a broadcast node with no replaced symbols",
            );
          for (var n = 0; n < e.length; n++) this.removeDependency(e[n]);
          for (var i = 1 / 0, a = 0; a < this._lists.length; a++) {
            if (!this._lists[a].isList)
              throw new Error(
                "List arguments of broadcast must be list literals",
              );
            i = Math.min(i, this._lists[a].length);
          }
          this.length = i;
        }),
          (e.isBroadcast = !0),
          (e.copyWithArgs = function (e) {
            return new this.constructor(this._replacedSymbols, e);
          }),
          (e.evaluate = function (e) {
            for (
              var t = this._expression.getCompiledFunction(
                  this._replacedSymbols,
                ).fn,
                r = [],
                n = 0;
              n < this.length;
              n++
            ) {
              for (var i = [], a = 0; a < e.length; a++) i.push(e[a][n]);
              r.push(t.apply(void 0, i));
            }
            return r;
          }),
          (e.getEvalStrings = function () {
            var e = [],
              t = this._expression.getEvalStrings();
            Array.prototype.push.apply(e, t.statements);
            var r,
              n = [],
              i = [];
            for (r = 0; r < this._lists.length; r++) {
              var a = this._lists[r].getEvalStrings();
              Array.prototype.push.apply(e, a.statements);
              var s = this.tmpVar();
              (i.push(s), n.push("var " + s + " = " + a.expression));
            }
            var o = this.tmpVar(),
              u = this.tmpVar();
            n.push("var " + o + " = []");
            var c = [];
            for (r = 0; r < i.length; r++)
              c.push(
                "var " +
                  this._replacedSymbols[r] +
                  " = " +
                  i[r] +
                  "[" +
                  u +
                  "]",
              );
            return (
              n.push(
                "for (var " +
                  u +
                  " = 0; " +
                  u +
                  " < " +
                  this.length +
                  "; " +
                  u +
                  "++) {\n  " +
                  c.join(";\n  ") +
                  ";\n  " +
                  o +
                  ".push(" +
                  t.expression +
                  ");\n}",
              ),
              { statements: e.concat(n), expression: o }
            );
          }));
      });
    },
  ),
  define(
    "math/parsenode/listaccess",
    ["require", "pjs", "./expression"],
    function (e) {
      var t = e("pjs"),
        r = e("./expression");
      return t(r, function (e, t) {
        ((e.init = function (e) {
          (t.init.call(this, e), (this.list = e[0]), (this.index = e[1]));
        }),
          (e.getEvalStrings = function () {
            var e = this.index.getEvalStrings(),
              t = this.list.getEvalStrings(),
              r = e.statements.concat(t.statements),
              n = this.tmpVar();
            r.push(n + " = " + t.expression);
            var i = this.tmpVar();
            return (
              r.push(i + " = Math.floor(" + e.expression + ") - 1"),
              {
                statements: r,
                expression:
                  "(" +
                  i +
                  " >= 0 && " +
                  i +
                  " < " +
                  n +
                  ".length ? " +
                  n +
                  "[" +
                  i +
                  "] : NaN)",
              }
            );
          }));
      });
    },
  ),
  define(
    "math/parsenode/orderedpair",
    ["require", "pjs", "./scalarexpression"],
    function (e) {
      var t = e("pjs"),
        r = e("./scalarexpression");
      return t(r, function (e, t, r) {
        ((e.asArray = function () {
          return [+this.args[0].asValue(), +this.args[1].asValue()];
        }),
          (e.asValue = e.asArray),
          (e.getSliderVariables = function (e, t) {
            return e.sliderVariables(t.getDependencies()).filter(function (t) {
              return !e.validParametricVariable(t);
            });
          }),
          (e.getEvalStrings = function () {
            for (var e = [], t = [], r = 0; r < this.args.length; r++) {
              var n = this.args[r].getEvalStrings();
              ((e = e.concat(n.statements)), t.push(n.expression));
            }
            return { statements: e, expression: "[" + t.join(",") + "]" };
          }));
      });
    },
  ),
  define(
    "math/parsenode/movablepoint",
    ["require", "pjs", "./orderedpair"],
    function (e) {
      var t = e("pjs"),
        r = e("./orderedpair");
      return t(r, function (e, t) {
        ((e.init = function (e, r, n) {
          (t.init.call(this, e),
            (this.moveStrategy = r),
            (this.defaultDragMode = n));
        }),
          (e.isMovablePoint = !0));
      });
    },
  ),
  define(
    "math/parsenode/orderedpairaccess",
    ["require", "pjs", "./scalarexpression"],
    function (e) {
      var t = e("pjs"),
        r = e("./scalarexpression");
      return t(r, function (e, t) {
        ((e.init = function (e) {
          (t.init.call(this, e), (this.point = e[0]), (this.index = e[1]));
        }),
          (e.getEvalStrings = function () {
            var e = this.index.getEvalStrings(),
              t = this.point.getEvalStrings(),
              r = [];
            (Array.prototype.push.apply(r, e.statements),
              Array.prototype.push.apply(r, t.statements));
            var n = t.expression + "[" + e.expression + "-1]";
            return { statements: r, expression: n };
          }));
      });
    },
  ),
  define(
    "math/parsenode/polygon",
    ["require", "pjs", "./expression"],
    function (e) {
      var t = e("pjs"),
        r = e("./expression");
      return t(r, function (e, t) {
        ((e.init = function (e) {
          t.init.call(this, e);
        }),
          (e.copyWithArgs = function (e) {
            return new this.constructor(e);
          }));
      });
    },
  ),
  define("math/comparators", ["require", "exports"], function (e, t) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });
    var r = {
        "<": { inclusive: !1, direction: -1 },
        "!=": { inclusive: !1, direction: 0 },
        ">": { inclusive: !1, direction: 1 },
        "<=": { inclusive: !0, direction: -1 },
        "=": { inclusive: !0, direction: 0 },
        ">=": { inclusive: !0, direction: 1 },
      },
      n = function (e, t) {
        switch (t) {
          case -1:
            return e ? "<=" : "<";
          case 0:
            return e ? "=" : "!=";
          case 1:
            return e ? ">=" : ">";
          default:
            throw "Programming error.  Comparators must have a direction of -1, 0, or 1";
        }
      };
    ((t.table = r), (t.get = n));
  }),
  define(
    "math/parsenode/basecomparator",
    [
      "require",
      "pjs",
      "./scalarexpression",
      "./expressionTypes",
      "math/comparators",
      "math/functions",
    ],
    function (e) {
      var t = e("pjs"),
        r = e("./scalarexpression"),
        n = e("./expressionTypes").Subtract,
        i = e("math/comparators").table,
        a = e("math/functions");
      return t(r, function (e, r, s) {
        ((s.create = function (e, r) {
          return (
            (r = r || e),
            t(s, function (t, n) {
              ((t.operator = e),
                (t.isInequality = function () {
                  return 0 !== i[e].direction;
                }),
                (t.compiledOperator = r),
                (t.scalarEvalExpression = function (e) {
                  return e.join(r);
                }),
                (t.evaluate = a.createEvaluateFunction(
                  t.scalarEvalExpression,
                  2,
                )));
            })
          );
        }),
          (e.init = function (e) {
            (r.init.call(this, e),
              (this._difference = n(
                i[this.operator].direction === -1 ? [e[1], e[0]] : [e[0], e[1]],
              )));
          }));
      });
    },
  ),
  define(
    "math/parsenode/comparator",
    ["require", "math/parsenode/basecomparator"],
    function (e) {
      var t = e("math/parsenode/basecomparator");
      return {
        "<": t.create("<"),
        ">": t.create(">"),
        "<=": t.create("<="),
        ">=": t.create(">="),
        "=": t.create("=", "==="),
      };
    },
  ),
  define(
    "math/parsenode/doubleinequality",
    ["require", "pjs", "./base", "math/comparators", "./comparator"],
    function (e) {
      var t = e("pjs"),
        r = e("./base"),
        n = e("math/comparators"),
        i = e("./comparator");
      return t(r, function (e, t) {
        ((e.init = function (e) {
          (t.init.call(this),
            (this.args = e),
            (this._symbol = e[2]._symbol),
            (this._operators = [e[1], e[3]]),
            (this._expressions = [e[0], e[4]]));
          var r = n.get(
            n.table[e[1]].inclusive && n.table[e[3]].inclusive,
            n.table[e[1]].direction,
          );
          ((this._indicator = i[r]([e[0], e[4]])),
            this.addDependency(this._symbol),
            this.mergeDependencies(this._expressions[0], this._expressions[1]));
        }),
          (e.isInequality = function () {
            return !0;
          }),
          (e.isShadeBetween = function () {
            return !0;
          }));
      });
    },
  ),
  define(
    "math/parsenode/repeatedoperator",
    ["require", "pjs", "./scalarexpression", "./dummyindex"],
    function (e) {
      var t = e("pjs"),
        r = e("./scalarexpression"),
        n = e("./dummyindex");
      return t(r, function (e, t) {
        ((e.init = function (e) {
          (t.init.call(this, e),
            (this._index = e[0]),
            this.addDummyDependency(this._index._symbol),
            this._index instanceof n &&
              this.removeDependency(this._index._symbol));
        }),
          (e.getEvalStrings = function () {
            var e = [],
              t = this.tmpVar(),
              r = this._index._symbol,
              n = this.tmpVar(),
              i = this.tmpVar(),
              a = this.args[1].getEvalStrings(),
              s = this.args[2].getEvalStrings(),
              o = this.args[3].getEvalStrings();
            (Array.prototype.push.apply(e, a.statements),
              e.push("var " + n + " = Math.round(" + a.expression + ")"),
              Array.prototype.push.apply(e, s.statements),
              e.push("var " + i + " = Math.round(" + s.expression + ")"),
              e.push("var " + t + "=" + this.starting_value));
            var u =
                "for (var " +
                r +
                "=" +
                n +
                ";" +
                r +
                "<=" +
                i +
                ";" +
                r +
                "++) {" +
                o.statements.join(";") +
                ";" +
                t +
                this.in_place_operator +
                o.expression +
                "};",
              c =
                "if(!isFinite(" +
                i +
                "-" +
                n +
                ")) {" +
                t +
                "=(" +
                i +
                "<" +
                n +
                "?" +
                this.starting_value +
                ":NaN);}else{" +
                u +
                "}";
            return (e.push(c), { statements: e, expression: t });
          }),
          (e.evaluate = function (e, t, r) {
            var n = r.getCompiledFunction([this._index._symbol]).fn;
            if (((t = Math.round(t)), (e = Math.round(e)), !isFinite(t - e)))
              return t < e ? this.starting_value : NaN;
            for (var i = this.starting_value, a = e; a <= t; a++)
              i = this.update(i, n(a));
            return i;
          }));
      });
    },
  ),
  define(
    "math/parsenode/sum",
    ["require", "pjs", "./repeatedoperator"],
    function (e) {
      var t = e("pjs"),
        r = e("./repeatedoperator");
      return t(r, function (e, t) {
        ((e.in_place_operator = "+="),
          (e.starting_value = 0),
          (e.evaluateConstant = function (e) {
            var t = 1 + Math.round(e[1]) - Math.round(e[0]);
            return t <= 0 ? this.starting_value : t * e[2];
          }),
          (e.update = function (e, t) {
            return e + t;
          }));
      });
    },
  ),
  define(
    "math/parsenode/product",
    ["require", "pjs", "./repeatedoperator"],
    function (e) {
      var t = e("pjs"),
        r = e("./repeatedoperator");
      return t(r, function (e, t) {
        ((e.in_place_operator = "*="),
          (e.starting_value = 1),
          (e.evaluateConstant = function (e) {
            var t = 1 + Math.round(e[1]) - Math.round(e[0]);
            return t <= 0 ? this.starting_value : Math.pow(e[2], t);
          }),
          (e.update = function (e, t) {
            return e * t;
          }));
      });
    },
  ),
  define(
    "math/parsenode/integral",
    ["require", "pjs", "./scalarexpression", "./dummyindex", "math/builtin"],
    function (e) {
      var t = e("pjs"),
        r = e("./scalarexpression"),
        n = e("./dummyindex"),
        i = e("math/builtin");
      return t(r, function (e, t) {
        ((e.init = function (e) {
          (t.init.call(this, e),
            (this._differential = e[0]),
            this.addDummyDependency(this._differential._symbol),
            this._differential instanceof n &&
              this.removeDependency(this._differential._symbol));
        }),
          (e.getEvalStrings = function () {
            var e = this.args[0],
              t = this.args[1],
              r = this.args[2],
              n = this.args[3],
              i = [],
              a = this.tmpVar(),
              s = e._symbol,
              o = this.tmpVar(),
              u = this.tmpVar(),
              c = t.getEvalStrings(),
              l = r.getEvalStrings(),
              p = n.getEvalStrings();
            (Array.prototype.push.apply(i, c.statements),
              Array.prototype.push.apply(i, l.statements),
              i.push("var " + o + " = " + c.expression),
              i.push("var " + u + " = " + l.expression),
              i.push(
                "var " +
                  a +
                  " = function (" +
                  s +
                  ") { " +
                  p.statements.join("; ") +
                  "; return " +
                  p.expression +
                  ";}",
              ));
            var f = "BuiltIn.quad(" + [a, o, u].join(", ") + ")";
            return { statements: i, expression: f };
          }),
          (e.evaluate = function (e, t, r) {
            var n = this.args[0],
              a = r.getCompiledFunction([n._symbol]).fn;
            return i.quad(a, e, t);
          }));
      });
    },
  ),
  define(
    "math/parsenode/functioncall",
    ["require", "pjs", "./expression", "./identifier"],
    function (e) {
      var t = e("pjs"),
        r = e("./expression"),
        n = e("./identifier");
      return t(r, function (e, t) {
        ((e.init = function (e, r) {
          ("string" == typeof e && (e = n(e)),
            (this._identifier = e),
            (this._symbol = e._symbol),
            t.init.call(this, r),
            this.addDependency(this._symbol));
        }),
          (e.copyWithArgs = function (e) {
            return new this.constructor(n(this._symbol), e);
          }));
      });
    },
  ),
  define(
    "math/parsenode/functionexponent",
    ["require", "pjs", "./expression"],
    function (e) {
      var t = e("pjs"),
        r = e("./expression");
      return t(r, function (e, t) {});
    },
  ),
  define(
    "math/parsenode/prime",
    ["require", "pjs", "./expression"],
    function (e) {
      var t = e("pjs"),
        r = e("./expression");
      return t(r, function (e, t) {
        ((e.init = function (e, r) {
          (t.init.call(this, r), (this.order = e));
        }),
          (e.copyWithArgs = function (e) {
            return new this.constructor(this.order, e);
          }));
      });
    },
  ),
  define(
    "math/parsenode/piecewise",
    ["require", "pjs", "./scalarexpression", "./constant"],
    function (e) {
      var t = e("pjs"),
        r = e("./scalarexpression"),
        n = e("./constant"),
        i = t(r, {});
      return (
        (i.chain = function (e) {
          for (var t, r = n(NaN); e.length; )
            ((t = e.pop()), (r = i([t.condition, t.if_expr, r])));
          return r;
        }),
        (i.empty = function () {
          return i([n(!0), n(1), n(NaN)]);
        }),
        i
      );
    },
  ),
  define(
    "math/parsenode/derivative",
    ["require", "pjs", "./scalarexpression", "./identifier"],
    function (e) {
      var t = e("pjs"),
        r = e("./scalarexpression"),
        n = e("./identifier");
      return t(r, function (e, t) {
        e.init = function (e, r) {
          (e instanceof n
            ? (this._symbol = e._symbol)
            : (this._symbol = n(e)._symbol),
            t.init.call(this, r));
        };
      });
    },
  ),
  define(
    "math/parsenode/nativefunction",
    ["require", "pjs", "./scalarexpression", "math/errormsg", "math/functions"],
    function (e) {
      var t = e("pjs"),
        r = e("./scalarexpression"),
        n = e("math/errormsg"),
        i = e("math/functions");
      return t(r, function (e, r, a) {
        ((e.init = function (e) {
          if (e.length < this._requiredArity)
            throw n.wrongArity(this._symbol, this._requiredArity, e.length);
          if (e.length > this._maxArity)
            throw n.wrongArity(this._symbol, this._maxArity, e.length);
          for (; e.length < this._maxArity; )
            e.push(this._optionalArguments[e.length - this._requiredArity]);
          r.init.call(this, e);
        }),
          (e.scalarEvalExpression = function (e) {
            return this.head + "(" + e.join(",") + ")";
          }),
          (a.create = function (e, r, n, a) {
            return t(this, function (t, s, o) {
              ((o.isFunction = !0),
                (t._symbol = e),
                (t.head = r),
                (t._requiredArity = n),
                (t._optionalArguments = a || []),
                (t._maxArity = t._requiredArity + t._optionalArguments.length),
                (t.evaluate = i.createEvaluateFunction(
                  t.scalarEvalExpression.bind(t),
                  t._maxArity,
                )),
                (o.getConcreteInvocationTree = function (e, t, r) {
                  return o(t).getConcreteTree(e, r);
                }),
                (o.getCacheKeys = function () {
                  return [];
                }));
            });
          }));
      });
    },
  ),
  define(
    "math/parsenode/typedfunction",
    ["require", "pjs", "./nativefunction"],
    function (e) {
      var t = e("pjs"),
        r = e("./nativefunction");
      return t(r, function (e, t, r, n) {
        r.create = function (e, t, r, i) {
          var a = r.length,
            s = n.create.call(this, e, t, a);
          return (
            (s.prototype._inputTypes = r),
            (s.prototype._outputType = i),
            s
          );
        };
      });
    },
  ),
  define(
    "math/parsenode/trigfunction",
    [
      "require",
      "pjs",
      "./nativefunction",
      "./expressionTypes",
      "math/errormsg",
    ],
    function (e) {
      var t = e("pjs"),
        r = e("./nativefunction"),
        n = e("./expressionTypes").Multiply,
        i = e("math/errormsg");
      return t(r, function (e, t, r, a) {
        r.create = function (e, t) {
          var r = 1,
            s = a.create(e, t, r);
          return (
            (s.getConcreteInvocationTree = function (t, a, o) {
              if (a.length < r) throw i.wrongArity(e, r, a.length);
              var u = t.trigAngleMultiplier
                ? [n([a[0], t.trigAngleMultiplier])].concat(a.slice(1))
                : a;
              return s(u).getConcreteTree(t, o);
            }),
            (s.getCacheKeys = function () {
              return ["trigAngleMultiplier"];
            }),
            s
          );
        };
      });
    },
  ),
  define(
    "math/parsenode/inversetrigfunction",
    ["require", "pjs", "./nativefunction", "./expressionTypes"],
    function (e) {
      var t = e("pjs"),
        r = e("./nativefunction"),
        n = e("./expressionTypes").Divide;
      return t(r, function (e, t, r, i) {
        r.create = function (e, t, r) {
          var a = 1,
            s = i.create(e, t, a, r);
          return (
            (s.getConcreteInvocationTree = function (e, t, r) {
              var i = s(t),
                a = e.trigAngleMultiplier ? n([i, e.trigAngleMultiplier]) : i;
              return a.getConcreteTree(e, r);
            }),
            (s.getCacheKeys = function () {
              return ["trigAngleMultiplier"];
            }),
            s
          );
        };
      });
    },
  ),
  define(
    "math/parsenode/reducerfunction",
    ["require", "pjs", "./expression", "math/functions"],
    function (e) {
      var t = e("pjs"),
        r = e("./expression"),
        n = e("math/functions");
      return t(r, function (e, r, i) {
        ((e.evalExpression = function (e) {
          return this.head + "(" + e + ")";
        }),
          (e.getEvalStrings = function () {
            var e = this.args[0].getEvalStrings();
            return {
              statements: e.statements,
              expression: this.evalExpression(e.expression),
            };
          }),
          (i.create = function (e, r) {
            return t(i, function (t, i, a) {
              ((t._symbol = e),
                (t.head = r),
                (t._arity = 1),
                (a.isFunction = !0),
                (t.evaluate = n.createEvaluateFunction(
                  t.evalExpression.bind(t),
                  t._arity,
                )),
                (a.getConcreteInvocationTree = function (e, t, r) {
                  return a(t).getConcreteTree(e, r);
                }),
                (a.getCacheKeys = function () {
                  return [];
                }));
            });
          }));
      });
    },
  ),
  define(
    "math/parsenode/doublereducerfunction",
    ["require", "pjs", "./expression", "math/functions", "math/errormsg"],
    function (e) {
      var t = e("pjs"),
        r = e("./expression"),
        n = e("math/functions"),
        i = e("math/errormsg");
      return t(r, function (e, r, a) {
        ((e.init = function () {
          if ((r.init.apply(this, arguments), 2 !== this.args.length))
            throw i.wrongDoubleReducerArity(this._symbol);
        }),
          (e.evalExpression = function (e) {
            return this.head + "(" + e.join(",") + ")";
          }),
          (e.getEvalStrings = function () {
            for (
              var e = [],
                t = [],
                r = Math.min(this.args[0].length, this.args[1].length),
                n = 0;
              n < this.args.length;
              n++
            ) {
              var i = this.args[n],
                a = i.getEvalStrings();
              (Array.prototype.push.apply(e, a.statements),
                t.push(
                  i.length === r
                    ? a.expression
                    : a.expression + ".slice(0," + r + ")",
                ));
            }
            return { statements: e, expression: this.evalExpression(t) };
          }),
          (a.create = function (e, r) {
            return t(a, function (t, i, a) {
              ((t._symbol = e),
                (t.head = r),
                (t._arity = 2),
                (a.isFunction = !0),
                (t.evaluate = n.createEvaluateFunction(
                  t.evalExpression.bind(t),
                  t._arity,
                )),
                (a.getConcreteInvocationTree = function (e, t, r) {
                  return a(t).getConcreteTree(e, r);
                }),
                (a.getCacheKeys = function () {
                  return [];
                }));
            });
          }));
      });
    },
  ),
  define(
    "math/parsenode/parametrizedreducerfunction",
    ["require", "pjs", "./expression", "math/functions", "math/errormsg"],
    function (e) {
      var t = e("pjs"),
        r = e("./expression"),
        n = e("math/functions"),
        i = e("math/errormsg");
      return t(r, function (e, r, a) {
        ((e.init = function () {
          if ((r.init.apply(this, arguments), 2 !== this.args.length))
            throw i.wrongParametrizedReducerArity(this._symbol);
        }),
          (e.evalExpression = function (e) {
            return this.head + "(" + e.join(",") + ")";
          }),
          (e.getEvalStrings = function () {
            var e = [],
              t = this.args[0].getEvalStrings(),
              r = this.args[1].getEvalStrings();
            (Array.prototype.push.apply(e, t.statements),
              Array.prototype.push.apply(e, r.statements));
            var n = this.evalExpression([t.expression, r.expression]);
            return { statements: e, expression: n };
          }),
          (a.create = function (e, r) {
            return t(a, function (t, i, a) {
              ((t._symbol = e),
                (t.head = r),
                (t._arity = 2),
                (a.isFunction = !0),
                (t.evaluate = n.createEvaluateFunction(
                  t.evalExpression.bind(t),
                  t._arity,
                )),
                (a.getConcreteInvocationTree = function (e, t, r) {
                  return a(t).getConcreteTree(e, r);
                }),
                (a.getCacheKeys = function () {
                  return [];
                }));
            });
          }));
      });
    },
  ),
  define(
    "math/parsenode/builtinfunction",
    [
      "require",
      "math/parsenode/nativefunction",
      "math/parsenode/typedfunction",
      "math/parsenode/trigfunction",
      "math/parsenode/inversetrigfunction",
      "math/parsenode/reducerfunction",
      "math/parsenode/doublereducerfunction",
      "math/parsenode/parametrizedreducerfunction",
      "math/types",
      "math/parsenode/constant",
    ],
    function (e) {
      var t = e("math/parsenode/nativefunction"),
        r = e("math/parsenode/typedfunction"),
        n = e("math/parsenode/trigfunction"),
        i = e("math/parsenode/inversetrigfunction"),
        a = e("math/parsenode/reducerfunction"),
        s = e("math/parsenode/doublereducerfunction"),
        o = e("math/parsenode/parametrizedreducerfunction"),
        u = e("math/types"),
        c = e("math/parsenode/constant"),
        l = c(1),
        p = c(0),
        f = c(0.5);
      return {
        sin: n.create("sin", "BuiltIn.sin"),
        cos: n.create("cos", "BuiltIn.cos"),
        tan: n.create("tan", "BuiltIn.tan"),
        cot: n.create("cot", "BuiltIn.cot"),
        sec: n.create("sec", "BuiltIn.sec"),
        csc: n.create("csc", "BuiltIn.csc"),
        arcsin: i.create("arcsin", "Math.asin"),
        arccos: i.create("arccos", "Math.acos"),
        arctan: i.create("arctan", "Math.atan2", [l]),
        arccot: i.create("arccot", "BuiltIn.acot"),
        arcsec: i.create("arcsec", "BuiltIn.asec"),
        arccsc: i.create("arccsc", "BuiltIn.acsc"),
        sinh: t.create("sinh", "BuiltIn.sinh", 1),
        cosh: t.create("cosh", "BuiltIn.cosh", 1),
        tanh: t.create("tanh", "BuiltIn.tanh", 1),
        coth: t.create("coth", "BuiltIn.coth", 1),
        sech: t.create("sech", "BuiltIn.sech", 1),
        csch: t.create("csch", "BuiltIn.csch", 1),
        arcsinh: t.create("arcsinh", "BuiltIn.asinh", 1),
        arccosh: t.create("arccosh", "BuiltIn.acosh", 1),
        arctanh: t.create("arctanh", "BuiltIn.atanh", 1),
        arccoth: t.create("arccoth", "BuiltIn.acoth", 1),
        arcsech: t.create("arcsech", "BuiltIn.asech", 1),
        arccsch: t.create("arccsch", "BuiltIn.acsch", 1),
        sqrt: t.create("sqrt", "Math.sqrt", 1),
        rtxsqpone: t.create("rtxsqpone", "BuiltIn.sqrtxsqp1", 1),
        rtxsqmone: t.create("rtxsqmone", "BuiltIn.sqrtxsqm1", 1),
        nthroot: t.create("nthroot", "BuiltIn.nthroot", 2),
        log: t.create("log", "BuiltIn.common_log", 1),
        logbase: t.create("logbase", "BuiltIn.log_base", 2),
        ln: t.create("ln", "BuiltIn.log", 1),
        exp: t.create("exp", "Math.exp", 1),
        floor: t.create("floor", "Math.floor", 1),
        ceil: t.create("ceil", "Math.ceil", 1),
        round: t.create("round", "Math.round", 1),
        abs: t.create("abs", "Math.abs", 1),
        sign: t.create("sign", "BuiltIn.sign", 1),
        mod: t.create("mod", "BuiltIn.mod", 2),
        nCr: t.create("nCr", "BuiltIn.nCr", 2),
        nPr: t.create("nPr", "BuiltIn.nPr", 2),
        factorial: t.create("factorial", "BuiltIn.factorial", 1),
        polyGamma: t.create("polyGamma", "BuiltIn.polyGamma", 2),
        lcm: a.create("lcm", "BuiltIn.listLCM"),
        gcd: a.create("gcd", "BuiltIn.listGCD"),
        mean: a.create("mean", "BuiltIn.mean"),
        total: a.create("total", "BuiltIn.total"),
        stdev: a.create("stdev", "BuiltIn.stdev"),
        stdevp: a.create("stdevp", "BuiltIn.stdevp"),
        mad: a.create("mad", "BuiltIn.mad"),
        length: a.create("length", "BuiltIn.length"),
        min: a.create("min", "BuiltIn.listMin"),
        max: a.create("max", "BuiltIn.listMax"),
        argmin: a.create("argmin", "BuiltIn.argMin"),
        argmax: a.create("argmax", "BuiltIn.argMax"),
        median: a.create("median", "BuiltIn.median"),
        var: a.create("var", "BuiltIn.var"),
        varp: a.create("varp", "BuiltIn.varp"),
        cov: s.create("cov", "BuiltIn.cov"),
        covp: s.create("covp", "BuiltIn.covp"),
        corr: s.create("corr", "BuiltIn.corr"),
        quantile: o.create("quantile", "BuiltIn.quantile"),
        quartile: o.create("quartile", "BuiltIn.quartile"),
        upperQuantileIndex: o.create(
          "upperQuantileIndex",
          "BuiltIn.upperQuantileIndex",
        ),
        lowerQuantileIndex: o.create(
          "lowerQuantileIndex",
          "BuiltIn.lowerQuantileIndex",
        ),
        quartileIndex: o.create("quartileIndex", "BuiltIn.quartileIndex"),
        upperQuartileIndex: o.create(
          "upperQuartileIndex",
          "BuiltIn.upperQuartileIndex",
        ),
        lowerQuartileIndex: o.create(
          "lowerQuartileIndex",
          "BuiltIn.lowerQuartileIndex",
        ),
        normalcdf: t.create("normalcdf", "BuiltIn.normalcdf", 1, [p, l]),
        normalpdf: t.create("normalpdf", "BuiltIn.normalpdf", 1, [p, l]),
        binomcdf: t.create("binomcdf", "BuiltIn.binomcdf", 2, [f]),
        binompdf: t.create("binompdf", "BuiltIn.binompdf", 2, [f]),
        poissoncdf: t.create("poissoncdf", "BuiltIn.poissoncdf", 2),
        poissonpdf: t.create("poissonpdf", "BuiltIn.poissonpdf", 2),
        invNorm: t.create("invNorm", "BuiltIn.invNorm", 1),
        erf: t.create("erf", "BuiltIn.erf", 1),
        tpdf: t.create("tpdf", "BuiltIn.tpdf", 2),
        tcdf: t.create("tcdf", "BuiltIn.tcdf", 2),
        TTest: o.create("TTest", "BuiltIn.TTest"),
        TScore: o.create("TScore", "BuiltIn.TScore"),
        distance: r.create(
          "distance",
          "BuiltIn.distance",
          [u.Point, u.Point],
          u.Number,
        ),
        midpoint: r.create(
          "midpoint",
          "BuiltIn.midpoint",
          [u.Point, u.Point],
          u.Point,
        ),
      };
    },
  ),
  define(
    "math/parsenode/equation",
    [
      "require",
      "./base",
      "pjs",
      "./expressionTypes",
      "math/parsenode/comparator",
    ],
    function (e) {
      var t = e("./base"),
        r = e("pjs"),
        n = e("./expressionTypes").Subtract,
        i = e("math/parsenode/comparator");
      return r(t, function (e, t) {
        ((e.init = function (e, r) {
          (t.init.call(this),
            this.mergeDependencies(e, r),
            (this._lhs = e),
            (this._rhs = r),
            (this._difference = n([this._lhs, this._rhs])));
        }),
          (e.asComparator = function () {
            return i["="]([this._lhs, this._rhs]);
          }));
      });
    },
  ),
  define(
    "math/parsenode/assignment",
    ["require", "./base", "./equation", "./identifier", "pjs"],
    function (e) {
      var t = e("./base"),
        r = e("./equation"),
        n = e("./identifier"),
        i = e("pjs");
      return i(t, function (e, t) {
        ((e.init = function (e, r) {
          (t.init.call(this),
            (e = e._symbol),
            this.mergeDependencies(r),
            (this._expression = r),
            (this._symbol = e),
            (this._exports = this.computeExports()));
        }),
          (e.shouldExportAns = function () {
            return !0;
          }),
          (e.computeExports = function () {
            for (
              var e = this._symbol, t = this.getDependencies(), r = 0;
              r < t.length;
              r++
            )
              if (t[r] === e) return [];
            return [e];
          }),
          (e.isEquation = function (e) {
            return e.getDependencies().indexOf(this._symbol) !== -1;
          }),
          (e.asEquation = function () {
            var e = r(n(this._symbol), this._expression);
            return ((e.userData = this.userData), e);
          }),
          (e.getSliderInfo = function () {
            if (
              this._expression.isConstant &&
              "number" == typeof this._expression.constantValue &&
              isFinite(this._expression.constantValue)
            )
              return { value: this._expression.constantValue };
          }));
      });
    },
  ),
  define(
    "math/parsenode/functiondefinition",
    [
      "require",
      "pjs",
      "./base",
      "math/errormsg",
      "./equation",
      "./identifier",
      "./functioncall",
    ],
    function (e) {
      var t = e("pjs"),
        r = e("./base"),
        n = e("math/errormsg"),
        i = e("./equation"),
        a = e("./identifier"),
        s = e("./functioncall");
      return t(r, function (e, t) {
        ((e.init = function (e, r, n) {
          (t.init.call(this),
            (e = e._symbol),
            (this._argSymbols = r.map(function (e) {
              return e._symbol;
            })),
            (this._symbol = e),
            (this._exports = [e]),
            (this._expression = n),
            this.addDependencies(this._argSymbols),
            this.addDummyDependencies(this._argSymbols),
            this.mergeDependencies(this._expression));
        }),
          (e.isFunction = !0),
          (e.getConcreteInvocationTree = function (e, t, r) {
            if (t.length !== this._argSymbols.length)
              throw n.wrongArity(
                this._symbol,
                this._argSymbols.length,
                t.length,
              );
            for (
              var i = Object.create(e), a = 0;
              a < this._argSymbols.length;
              a++
            )
              i[this._argSymbols[a]] = t[a];
            return this._expression.getConcreteTree(i, r);
          }),
          (e.getSliderVariables = function (e, t) {
            var r = this._argSymbols;
            return e.sliderVariables(t.getDependencies()).filter(function (e) {
              return r.indexOf(e) === -1;
            });
          }),
          (e.asEquation = function () {
            var e = this._argSymbols.map(function (e) {
                return a(e);
              }),
              t = i(s(a(this._symbol), e), this._expression);
            return ((t.userData = this.userData), t);
          }));
      });
    },
  ),
  define("numeric", [], function () {
    "use strict";
    var e = "undefined" == typeof exports ? function () {} : exports;
    return (
      "undefined" != typeof global && (global.numeric = e),
      (e.version = "1.2.6"),
      (e._myIndexOf = function (e) {
        var t,
          r = this.length;
        for (t = 0; t < r; ++t) if (this[t] === e) return t;
        return -1;
      }),
      (e.myIndexOf = Array.prototype.indexOf
        ? Array.prototype.indexOf
        : e._myIndexOf),
      (e.precision = 4),
      (e.largeArray = 50),
      (e.compile = function () {
        var t = Array.prototype.slice.call(arguments),
          r = t.pop();
        return (
          (r = "return function (" + t.join(",") + ") {" + r + "}"),
          new Function(["numeric"], r)(e)
        );
      }),
      (e._dim = function (e) {
        for (var t = []; "object" == typeof e; ) (t.push(e.length), (e = e[0]));
        return t;
      }),
      (e.dim = function (t) {
        var r, n;
        return "object" == typeof t
          ? ((r = t[0]),
            "object" == typeof r
              ? ((n = r[0]),
                "object" == typeof n ? e._dim(t) : [t.length, r.length])
              : [t.length])
          : [];
      }),
      (e.mapreduce = function (t, r) {
        return e.compile(
          "x",
          "accum",
          "_s",
          "_k",
          'if(typeof accum === "undefined") accum = ' +
            r +
            ';\nif(typeof x === "number") { var xi = x; ' +
            t +
            '; return accum; }\nif(typeof _s === "undefined") _s = numeric.dim(x);\nif(typeof _k === "undefined") _k = 0;\nvar _n = _s[_k];\nvar i,xi;\nif(_k < _s.length-1) {\n    for(i=_n-1;i>=0;i--) {\n        accum = arguments.callee(x[i],accum,_s,_k+1);\n    }    return accum;\n}\nfor(i=_n-1;i>=1;i-=2) { \n    xi = x[i];\n    ' +
            t +
            ";\n    xi = x[i-1];\n    " +
            t +
            ";\n}\nif(i === 0) {\n    xi = x[i];\n    " +
            t +
            "\n}\nreturn accum;",
        );
      }),
      (e.mapreduce2 = function (t, r) {
        return e.compile(
          "x",
          "var n = x.length;\nvar i,xi;\n" +
            r +
            "\nfor(i=n-1;i!==-1;--i) { \n    xi = x[i];\n    " +
            t +
            "\n}\nreturn accum;",
        );
      }),
      (e.rep = function (t, r, n) {
        "undefined" == typeof n && (n = 0);
        var i,
          a = t[n],
          s = Array(a);
        if (n === t.length - 1) {
          for (i = a - 2; i >= 0; i -= 2) ((s[i + 1] = r), (s[i] = r));
          return (i === -1 && (s[0] = r), s);
        }
        for (i = a - 1; i >= 0; i--) s[i] = e.rep(t, r, n + 1);
        return s;
      }),
      (e.dotMMsmall = function (e, t) {
        var r, n, i, a, s, o, u, c, l, p, f;
        for (
          a = e.length, s = t.length, o = t[0].length, u = Array(a), r = a - 1;
          r >= 0;
          r--
        ) {
          for (c = Array(o), l = e[r], i = o - 1; i >= 0; i--) {
            for (p = l[s - 1] * t[s - 1][i], n = s - 2; n >= 1; n -= 2)
              ((f = n - 1), (p += l[n] * t[n][i] + l[f] * t[f][i]));
            (0 === n && (p += l[0] * t[0][i]), (c[i] = p));
          }
          u[r] = c;
        }
        return u;
      }),
      (e._getCol = function (e, t, r) {
        var n,
          i = e.length;
        for (n = i - 1; n > 0; --n) ((r[n] = e[n][t]), --n, (r[n] = e[n][t]));
        0 === n && (r[0] = e[0][t]);
      }),
      (e.dotMMbig = function (t, r) {
        var n,
          i,
          a,
          s,
          o = e._getCol,
          u = r.length,
          c = Array(u),
          l = t.length,
          p = r[0].length,
          f = new Array(l),
          h = e.dotVV;
        for (--u, --l, i = l; i !== -1; --i) f[i] = Array(p);
        for (--p, i = p; i !== -1; --i)
          for (o(r, i, c), a = l; a !== -1; --a)
            ((s = 0), (n = t[a]), (f[a][i] = h(n, c)));
        return f;
      }),
      (e.dotMV = function (t, r) {
        var n,
          i = t.length,
          a = (r.length, Array(i)),
          s = e.dotVV;
        for (n = i - 1; n >= 0; n--) a[n] = s(t[n], r);
        return a;
      }),
      (e.dotVM = function (e, t) {
        var r, n, i, a, s, o, u;
        for (
          i = e.length, a = t[0].length, s = Array(a), n = a - 1;
          n >= 0;
          n--
        ) {
          for (o = e[i - 1] * t[i - 1][n], r = i - 2; r >= 1; r -= 2)
            ((u = r - 1), (o += e[r] * t[r][n] + e[u] * t[u][n]));
          (0 === r && (o += e[0] * t[0][n]), (s[n] = o));
        }
        return s;
      }),
      (e.dotVV = function (e, t) {
        var r,
          n,
          i = e.length,
          a = e[i - 1] * t[i - 1];
        for (r = i - 2; r >= 1; r -= 2)
          ((n = r - 1), (a += e[r] * t[r] + e[n] * t[n]));
        return (0 === r && (a += e[0] * t[0]), a);
      }),
      (e.dot = function (t, r) {
        var n = e.dim;
        switch (1e3 * n(t).length + n(r).length) {
          case 2002:
            return r.length < 10 ? e.dotMMsmall(t, r) : e.dotMMbig(t, r);
          case 2001:
            return e.dotMV(t, r);
          case 1002:
            return e.dotVM(t, r);
          case 1001:
            return e.dotVV(t, r);
          case 1e3:
            return e.mulVS(t, r);
          case 1:
            return e.mulSV(t, r);
          case 0:
            return t * r;
          default:
            throw new Error("numeric.dot only works on vectors and matrices");
        }
      }),
      (e.diag = function (e) {
        var t,
          r,
          n,
          i,
          a = e.length,
          s = Array(a);
        for (t = a - 1; t >= 0; t--) {
          for (i = Array(a), r = t + 2, n = a - 1; n >= r; n -= 2)
            ((i[n] = 0), (i[n - 1] = 0));
          for (n > t && (i[n] = 0), i[t] = e[t], n = t - 1; n >= 1; n -= 2)
            ((i[n] = 0), (i[n - 1] = 0));
          (0 === n && (i[0] = 0), (s[t] = i));
        }
        return s;
      }),
      (e.getDiag = function (e) {
        var t,
          r = Math.min(e.length, e[0].length),
          n = Array(r);
        for (t = r - 1; t >= 1; --t) ((n[t] = e[t][t]), --t, (n[t] = e[t][t]));
        return (0 === t && (n[0] = e[0][0]), n);
      }),
      (e.identity = function (t) {
        return e.diag(e.rep([t], 1));
      }),
      (e.pointwise = function (t, r, n) {
        "undefined" == typeof n && (n = "");
        var i,
          a,
          s = [],
          o = /\[i\]$/,
          u = "",
          c = !1;
        for (i = 0; i < t.length; i++)
          (o.test(t[i])
            ? ((a = t[i].substring(0, t[i].length - 3)), (u = a))
            : (a = t[i]),
            "ret" === a && (c = !0),
            s.push(a));
        return (
          (s[t.length] = "_s"),
          (s[t.length + 1] = "_k"),
          (s[t.length + 2] =
            'if(typeof _s === "undefined") _s = numeric.dim(' +
            u +
            ');\nif(typeof _k === "undefined") _k = 0;\nvar _n = _s[_k];\nvar i' +
            (c ? "" : ", ret = Array(_n)") +
            ";\nif(_k < _s.length-1) {\n    for(i=_n-1;i>=0;i--) ret[i] = arguments.callee(" +
            t.join(",") +
            ",_s,_k+1);\n    return ret;\n}\n" +
            n +
            "\nfor(i=_n-1;i!==-1;--i) {\n    " +
            r +
            "\n}\nreturn ret;"),
          e.compile.apply(null, s)
        );
      }),
      (e.pointwise2 = function (t, r, n) {
        "undefined" == typeof n && (n = "");
        var i,
          a,
          s = [],
          o = /\[i\]$/,
          u = "",
          c = !1;
        for (i = 0; i < t.length; i++)
          (o.test(t[i])
            ? ((a = t[i].substring(0, t[i].length - 3)), (u = a))
            : (a = t[i]),
            "ret" === a && (c = !0),
            s.push(a));
        return (
          (s[t.length] =
            "var _n = " +
            u +
            ".length;\nvar i" +
            (c ? "" : ", ret = Array(_n)") +
            ";\n" +
            n +
            "\nfor(i=_n-1;i!==-1;--i) {\n" +
            r +
            "\n}\nreturn ret;"),
          e.compile.apply(null, s)
        );
      }),
      (e._biforeach = function e(t, r, n, i, a) {
        if (i === n.length - 1) return void a(t, r);
        var s,
          o = n[i];
        for (s = o - 1; s >= 0; s--)
          e(
            "object" == typeof t ? t[s] : t,
            "object" == typeof r ? r[s] : r,
            n,
            i + 1,
            a,
          );
      }),
      (e._biforeach2 = function e(t, r, n, i, a) {
        if (i === n.length - 1) return a(t, r);
        var s,
          o = n[i],
          u = Array(o);
        for (s = o - 1; s >= 0; --s)
          u[s] = e(
            "object" == typeof t ? t[s] : t,
            "object" == typeof r ? r[s] : r,
            n,
            i + 1,
            a,
          );
        return u;
      }),
      (e._foreach = function e(t, r, n, i) {
        if (n === r.length - 1) return void i(t);
        var a,
          s = r[n];
        for (a = s - 1; a >= 0; a--) e(t[a], r, n + 1, i);
      }),
      (e._foreach2 = function e(t, r, n, i) {
        if (n === r.length - 1) return i(t);
        var a,
          s = r[n],
          o = Array(s);
        for (a = s - 1; a >= 0; a--) o[a] = e(t[a], r, n + 1, i);
        return o;
      }),
      (e.ops2 = {
        add: "+",
        sub: "-",
        mul: "*",
        div: "/",
        mod: "%",
        and: "&&",
        or: "||",
        eq: "===",
        neq: "!==",
        lt: "<",
        gt: ">",
        leq: "<=",
        geq: ">=",
        band: "&",
        bor: "|",
        bxor: "^",
        lshift: "<<",
        rshift: ">>",
        rrshift: ">>>",
      }),
      (e.opseq = {
        addeq: "+=",
        subeq: "-=",
        muleq: "*=",
        diveq: "/=",
        modeq: "%=",
        lshifteq: "<<=",
        rshifteq: ">>=",
        rrshifteq: ">>>=",
        bandeq: "&=",
        boreq: "|=",
        bxoreq: "^=",
      }),
      (e.mathfuns = [
        "abs",
        "acos",
        "asin",
        "atan",
        "ceil",
        "cos",
        "exp",
        "floor",
        "log",
        "round",
        "sin",
        "sqrt",
        "tan",
        "isNaN",
        "isFinite",
      ]),
      (e.mathfuns2 = ["atan2", "pow", "max", "min"]),
      (e.ops1 = { neg: "-", not: "!", bnot: "~", clone: "" }),
      (e.mapreducers = {
        any: ["if(xi) return true;", "var accum = false;"],
        all: ["if(!xi) return false;", "var accum = true;"],
        sum: ["accum += xi;", "var accum = 0;"],
        prod: ["accum *= xi;", "var accum = 1;"],
        norm2Squared: ["accum += xi*xi;", "var accum = 0;"],
        norminf: [
          "accum = max(accum,abs(xi));",
          "var accum = 0, max = Math.max, abs = Math.abs;",
        ],
        norm1: ["accum += abs(xi);", "var accum = 0, abs = Math.abs;"],
        sup: [
          "accum = max(accum,xi);",
          "var accum = -Infinity, max = Math.max;",
        ],
        inf: [
          "accum = min(accum,xi);",
          "var accum = Infinity, min = Math.min;",
        ],
      }),
      (function () {
        var t, r;
        for (t = 0; t < e.mathfuns2.length; ++t)
          ((r = e.mathfuns2[t]), (e.ops2[r] = r));
        for (t in e.ops2)
          if (e.ops2.hasOwnProperty(t)) {
            r = e.ops2[t];
            var n,
              i,
              a = "";
            (e.myIndexOf.call(e.mathfuns2, t) !== -1
              ? ((a = "var " + r + " = Math." + r + ";\n"),
                (n = function (e, t, n) {
                  return e + " = " + r + "(" + t + "," + n + ")";
                }),
                (i = function (e, t) {
                  return e + " = " + r + "(" + e + "," + t + ")";
                }))
              : ((n = function (e, t, n) {
                  return e + " = " + t + " " + r + " " + n;
                }),
                (i = e.opseq.hasOwnProperty(t + "eq")
                  ? function (e, t) {
                      return e + " " + r + "= " + t;
                    }
                  : function (e, t) {
                      return e + " = " + e + " " + r + " " + t;
                    })),
              (e[t + "VV"] = e.pointwise2(
                ["x[i]", "y[i]"],
                n("ret[i]", "x[i]", "y[i]"),
                a,
              )),
              (e[t + "SV"] = e.pointwise2(
                ["x", "y[i]"],
                n("ret[i]", "x", "y[i]"),
                a,
              )),
              (e[t + "VS"] = e.pointwise2(
                ["x[i]", "y"],
                n("ret[i]", "x[i]", "y"),
                a,
              )),
              (e[t] = e.compile(
                "var n = arguments.length, i, x = arguments[0], y;\nvar VV = numeric." +
                  t +
                  "VV, VS = numeric." +
                  t +
                  "VS, SV = numeric." +
                  t +
                  'SV;\nvar dim = numeric.dim;\nfor(i=1;i!==n;++i) { \n  y = arguments[i];\n  if(typeof x === "object") {\n      if(typeof y === "object") x = numeric._biforeach2(x,y,dim(x),0,VV);\n      else x = numeric._biforeach2(x,y,dim(x),0,VS);\n  } else if(typeof y === "object") x = numeric._biforeach2(x,y,dim(y),0,SV);\n  else ' +
                  i("x", "y") +
                  "\n}\nreturn x;\n",
              )),
              (e[r] = e[t]),
              (e[t + "eqV"] = e.pointwise2(
                ["ret[i]", "x[i]"],
                i("ret[i]", "x[i]"),
                a,
              )),
              (e[t + "eqS"] = e.pointwise2(
                ["ret[i]", "x"],
                i("ret[i]", "x"),
                a,
              )),
              (e[t + "eq"] = e.compile(
                "var n = arguments.length, i, x = arguments[0], y;\nvar V = numeric." +
                  t +
                  "eqV, S = numeric." +
                  t +
                  'eqS\nvar s = numeric.dim(x);\nfor(i=1;i!==n;++i) { \n  y = arguments[i];\n  if(typeof y === "object") numeric._biforeach(x,y,s,0,V);\n  else numeric._biforeach(x,y,s,0,S);\n}\nreturn x;\n',
              )));
          }
        for (t = 0; t < e.mathfuns2.length; ++t)
          ((r = e.mathfuns2[t]), delete e.ops2[r]);
        for (t = 0; t < e.mathfuns.length; ++t)
          ((r = e.mathfuns[t]), (e.ops1[r] = r));
        for (t in e.ops1)
          e.ops1.hasOwnProperty(t) &&
            ((a = ""),
            (r = e.ops1[t]),
            e.myIndexOf.call(e.mathfuns, t) !== -1 &&
              Math.hasOwnProperty(r) &&
              (a = "var " + r + " = Math." + r + ";\n"),
            (e[t + "eqV"] = e.pointwise2(
              ["ret[i]"],
              "ret[i] = " + r + "(ret[i]);",
              a,
            )),
            (e[t + "eq"] = e.compile(
              "x",
              'if(typeof x !== "object") return ' +
                r +
                "x\nvar i;\nvar V = numeric." +
                t +
                "eqV;\nvar s = numeric.dim(x);\nnumeric._foreach(x,s,0,V);\nreturn x;\n",
            )),
            (e[t + "V"] = e.pointwise2(
              ["x[i]"],
              "ret[i] = " + r + "(x[i]);",
              a,
            )),
            (e[t] = e.compile(
              "x",
              'if(typeof x !== "object") return ' +
                r +
                "(x)\nvar i;\nvar V = numeric." +
                t +
                "V;\nvar s = numeric.dim(x);\nreturn numeric._foreach2(x,s,0,V);\n",
            )));
        for (t = 0; t < e.mathfuns.length; ++t)
          ((r = e.mathfuns[t]), delete e.ops1[r]);
        for (t in e.mapreducers)
          e.mapreducers.hasOwnProperty(t) &&
            ((r = e.mapreducers[t]),
            (e[t + "V"] = e.mapreduce2(r[0], r[1])),
            (e[t] = e.compile(
              "x",
              "s",
              "k",
              r[1] +
                'if(typeof x !== "object") {    xi = x;\n' +
                r[0] +
                '\n    return accum;\n}if(typeof s === "undefined") s = numeric.dim(x);\nif(typeof k === "undefined") k = 0;\nif(k === s.length-1) return numeric.' +
                t +
                "V(x);\nvar xi;\nvar n = x.length, i;\nfor(i=n-1;i!==-1;--i) {\n   xi = arguments.callee(x[i]);\n" +
                r[0] +
                "\n}\nreturn accum;\n",
            )));
      })(),
      (e.inv = function (t) {
        var r,
          n,
          i,
          a,
          s,
          o,
          u,
          t,
          c = e.dim(t),
          l = Math.abs,
          p = c[0],
          f = c[1],
          h = e.clone(t),
          d = e.identity(p);
        for (o = 0; o < f; ++o) {
          var m = -1,
            g = -1;
          for (s = o; s !== p; ++s)
            ((u = l(h[s][o])), u > g && ((m = s), (g = u)));
          for (
            n = h[m],
              h[m] = h[o],
              h[o] = n,
              a = d[m],
              d[m] = d[o],
              d[o] = a,
              t = n[o],
              u = o;
            u !== f;
            ++u
          )
            n[u] /= t;
          for (u = f - 1; u !== -1; --u) a[u] /= t;
          for (s = p - 1; s !== -1; --s)
            if (s !== o) {
              for (r = h[s], i = d[s], t = r[o], u = o + 1; u !== f; ++u)
                r[u] -= n[u] * t;
              for (u = f - 1; u > 0; --u)
                ((i[u] -= a[u] * t), --u, (i[u] -= a[u] * t));
              0 === u && (i[0] -= a[0] * t);
            }
        }
        return d;
      }),
      (e.det = function (t) {
        var r = e.dim(t);
        if (2 !== r.length || r[0] !== r[1])
          throw new Error("numeric: det() only works on square matrices");
        var n,
          i,
          a,
          s,
          o,
          u,
          c,
          l,
          p = r[0],
          f = 1,
          h = e.clone(t);
        for (i = 0; i < p - 1; i++) {
          for (a = i, n = i + 1; n < p; n++)
            Math.abs(h[n][i]) > Math.abs(h[a][i]) && (a = n);
          for (
            a !== i && ((c = h[a]), (h[a] = h[i]), (h[i] = c), (f *= -1)),
              s = h[i],
              n = i + 1;
            n < p;
            n++
          ) {
            for (o = h[n], u = o[i] / s[i], a = i + 1; a < p - 1; a += 2)
              ((l = a + 1), (o[a] -= s[a] * u), (o[l] -= s[l] * u));
            a !== p && (o[a] -= s[a] * u);
          }
          if (0 === s[i]) return 0;
          f *= s[i];
        }
        return f * h[i][i];
      }),
      (e.transpose = function (e) {
        var t,
          r,
          n,
          i,
          a,
          s = e.length,
          o = e[0].length,
          u = Array(o);
        for (r = 0; r < o; r++) u[r] = Array(s);
        for (t = s - 1; t >= 1; t -= 2) {
          for (i = e[t], n = e[t - 1], r = o - 1; r >= 1; --r)
            ((a = u[r]),
              (a[t] = i[r]),
              (a[t - 1] = n[r]),
              --r,
              (a = u[r]),
              (a[t] = i[r]),
              (a[t - 1] = n[r]));
          0 === r && ((a = u[0]), (a[t] = i[0]), (a[t - 1] = n[0]));
        }
        if (0 === t) {
          for (n = e[0], r = o - 1; r >= 1; --r)
            ((u[r][0] = n[r]), --r, (u[r][0] = n[r]));
          0 === r && (u[0][0] = n[0]);
        }
        return u;
      }),
      (e.negtranspose = function (e) {
        var t,
          r,
          n,
          i,
          a,
          s = e.length,
          o = e[0].length,
          u = Array(o);
        for (r = 0; r < o; r++) u[r] = Array(s);
        for (t = s - 1; t >= 1; t -= 2) {
          for (i = e[t], n = e[t - 1], r = o - 1; r >= 1; --r)
            ((a = u[r]),
              (a[t] = -i[r]),
              (a[t - 1] = -n[r]),
              --r,
              (a = u[r]),
              (a[t] = -i[r]),
              (a[t - 1] = -n[r]));
          0 === r && ((a = u[0]), (a[t] = -i[0]), (a[t - 1] = -n[0]));
        }
        if (0 === t) {
          for (n = e[0], r = o - 1; r >= 1; --r)
            ((u[r][0] = -n[r]), --r, (u[r][0] = -n[r]));
          0 === r && (u[0][0] = -n[0]);
        }
        return u;
      }),
      (e.norm2 = function (t) {
        return Math.sqrt(e.norm2Squared(t));
      }),
      (e.linspace = function (e, t, r) {
        if (
          ("undefined" == typeof r && (r = Math.max(Math.round(t - e) + 1, 1)),
          r < 2)
        )
          return 1 === r ? [e] : [];
        var n,
          i = Array(r);
        for (r--, n = r; n >= 0; n--) i[n] = (n * t + (r - n) * e) / r;
        return i;
      }),
      (e.getBlock = function (t, r, n) {
        function i(e, t) {
          var s,
            o = r[t],
            u = n[t] - o,
            c = Array(u);
          if (t === a.length - 1) {
            for (s = u; s >= 0; s--) c[s] = e[s + o];
            return c;
          }
          for (s = u; s >= 0; s--) c[s] = i(e[s + o], t + 1);
          return c;
        }
        var a = e.dim(t);
        return i(t, 0);
      }),
      (e.setBlock = function (t, r, n, i) {
        function a(e, t, i) {
          var o,
            u = r[i],
            c = n[i] - u;
          if (i === s.length - 1) for (o = c; o >= 0; o--) e[o + u] = t[o];
          for (o = c; o >= 0; o--) a(e[o + u], t[o], i + 1);
        }
        var s = e.dim(t);
        return (a(t, i, 0), t);
      }),
      (e.getRange = function (e, t, r) {
        var n,
          i,
          a,
          s,
          o = t.length,
          u = r.length,
          c = Array(o);
        for (n = o - 1; n !== -1; --n)
          for (c[n] = Array(u), a = c[n], s = e[t[n]], i = u - 1; i !== -1; --i)
            a[i] = s[r[i]];
        return c;
      }),
      (e.blockMatrix = function (t) {
        var r = e.dim(t);
        if (r.length < 4) return e.blockMatrix([t]);
        var n,
          i,
          a,
          s,
          o,
          u = r[0],
          c = r[1];
        for (n = 0, i = 0, a = 0; a < u; ++a) n += t[a][0].length;
        for (s = 0; s < c; ++s) i += t[0][s][0].length;
        var l = Array(n);
        for (a = 0; a < n; ++a) l[a] = Array(i);
        var p,
          f,
          h,
          d,
          m,
          g = 0;
        for (a = 0; a < u; ++a) {
          for (p = i, s = c - 1; s !== -1; --s)
            for (o = t[a][s], p -= o[0].length, h = o.length - 1; h !== -1; --h)
              for (m = o[h], f = l[g + h], d = m.length - 1; d !== -1; --d)
                f[p + d] = m[d];
          g += t[a][0].length;
        }
        return l;
      }),
      (e.tensor = function (t, r) {
        if ("number" == typeof t || "number" == typeof r) return e.mul(t, r);
        var n = e.dim(t),
          i = e.dim(r);
        if (1 !== n.length || 1 !== i.length)
          throw new Error(
            "numeric: tensor product is only defined for vectors",
          );
        var a,
          s,
          o,
          u,
          c = n[0],
          l = i[0],
          p = Array(c);
        for (s = c - 1; s >= 0; s--) {
          for (a = Array(l), u = t[s], o = l - 1; o >= 3; --o)
            ((a[o] = u * r[o]),
              --o,
              (a[o] = u * r[o]),
              --o,
              (a[o] = u * r[o]),
              --o,
              (a[o] = u * r[o]));
          for (; o >= 0; ) ((a[o] = u * r[o]), --o);
          p[s] = a;
        }
        return p;
      }),
      (e.epsilon = 2.220446049250313e-16),
      (e.LU = function (t, r) {
        r = r || !1;
        var n,
          i,
          a,
          s,
          o,
          u,
          c,
          l,
          p,
          f = Math.abs,
          h = t.length,
          d = h - 1,
          m = new Array(h);
        for (r || (t = e.clone(t)), a = 0; a < h; ++a) {
          for (c = a, u = t[a], p = f(u[a]), i = a + 1; i < h; ++i)
            ((s = f(t[i][a])), p < s && ((p = s), (c = i)));
          for (
            m[a] = c,
              c != a && ((t[a] = t[c]), (t[c] = u), (u = t[a])),
              o = u[a],
              n = a + 1;
            n < h;
            ++n
          )
            t[n][a] /= o;
          for (n = a + 1; n < h; ++n) {
            for (l = t[n], i = a + 1; i < d; ++i)
              ((l[i] -= l[a] * u[i]), ++i, (l[i] -= l[a] * u[i]));
            i === d && (l[i] -= l[a] * u[i]);
          }
        }
        return { LU: t, P: m };
      }),
      (e.LUsolve = function (t, r) {
        var n,
          i,
          a,
          s,
          o,
          u = t.LU,
          c = u.length,
          l = e.clone(r),
          p = t.P;
        for (n = c - 1; n !== -1; --n) l[n] = r[n];
        for (n = 0; n < c; ++n)
          for (
            a = p[n],
              p[n] !== n && ((o = l[n]), (l[n] = l[a]), (l[a] = o)),
              s = u[n],
              i = 0;
            i < n;
            ++i
          )
            l[n] -= l[i] * s[i];
        for (n = c - 1; n >= 0; --n) {
          for (s = u[n], i = n + 1; i < c; ++i) l[n] -= l[i] * s[i];
          l[n] /= s[n];
        }
        return l;
      }),
      (e.solve = function (t, r, n) {
        return e.LUsolve(e.LU(t, n), r);
      }),
      (e.svd = function (t) {
        function r(e, t) {
          return (
            (e = Math.abs(e)),
            (t = Math.abs(t)),
            e > t
              ? e * Math.sqrt(1 + (t * t) / e / e)
              : 0 == t
                ? e
                : t * Math.sqrt(1 + (e * e) / t / t)
          );
        }
        var n,
          i = e.epsilon,
          a = 1e-64 / i,
          s = 50,
          o = 0,
          u = 0,
          c = 0,
          l = 0,
          p = 0,
          f = e.clone(t),
          h = f.length,
          d = f[0].length;
        if (h < d) throw "Need more rows than columns";
        var m = new Array(d),
          g = new Array(d);
        for (u = 0; u < d; u++) m[u] = g[u] = 0;
        var y = e.rep([d, d], 0),
          v = 0,
          b = 0,
          x = 0,
          _ = 0,
          E = 0,
          S = 0,
          w = 0;
        for (u = 0; u < d; u++) {
          for (m[u] = b, w = 0, p = u + 1, c = u; c < h; c++)
            w += f[c][u] * f[c][u];
          if (w <= a) b = 0;
          else
            for (
              v = f[u][u],
                b = Math.sqrt(w),
                v >= 0 && (b = -b),
                x = v * b - w,
                f[u][u] = v - b,
                c = p;
              c < d;
              c++
            ) {
              for (w = 0, l = u; l < h; l++) w += f[l][u] * f[l][c];
              for (v = w / x, l = u; l < h; l++) f[l][c] += v * f[l][u];
            }
          for (g[u] = b, w = 0, c = p; c < d; c++) w += f[u][c] * f[u][c];
          if (w <= a) b = 0;
          else {
            for (
              v = f[u][u + 1],
                b = Math.sqrt(w),
                v >= 0 && (b = -b),
                x = v * b - w,
                f[u][u + 1] = v - b,
                c = p;
              c < d;
              c++
            )
              m[c] = f[u][c] / x;
            for (c = p; c < h; c++) {
              for (w = 0, l = p; l < d; l++) w += f[c][l] * f[u][l];
              for (l = p; l < d; l++) f[c][l] += w * m[l];
            }
          }
          ((E = Math.abs(g[u]) + Math.abs(m[u])), E > _ && (_ = E));
        }
        for (u = d - 1; u != -1; u += -1) {
          if (0 != b) {
            for (x = b * f[u][u + 1], c = p; c < d; c++) y[c][u] = f[u][c] / x;
            for (c = p; c < d; c++) {
              for (w = 0, l = p; l < d; l++) w += f[u][l] * y[l][c];
              for (l = p; l < d; l++) y[l][c] += w * y[l][u];
            }
          }
          for (c = p; c < d; c++) ((y[u][c] = 0), (y[c][u] = 0));
          ((y[u][u] = 1), (b = m[u]), (p = u));
        }
        for (u = d - 1; u != -1; u += -1) {
          for (p = u + 1, b = g[u], c = p; c < d; c++) f[u][c] = 0;
          if (0 != b) {
            for (x = f[u][u] * b, c = p; c < d; c++) {
              for (w = 0, l = p; l < h; l++) w += f[l][u] * f[l][c];
              for (v = w / x, l = u; l < h; l++) f[l][c] += v * f[l][u];
            }
            for (c = u; c < h; c++) f[c][u] = f[c][u] / b;
          } else for (c = u; c < h; c++) f[c][u] = 0;
          f[u][u] += 1;
        }
        for (i *= _, l = d - 1; l != -1; l += -1)
          for (var M = 0; M < s; M++) {
            var I = !1;
            for (p = l; p != -1; p += -1) {
              if (Math.abs(m[p]) <= i) {
                I = !0;
                break;
              }
              if (Math.abs(g[p - 1]) <= i) break;
            }
            if (!I) {
              ((o = 0), (w = 1));
              var P = p - 1;
              for (
                u = p;
                u < l + 1 &&
                ((v = w * m[u]), (m[u] = o * m[u]), !(Math.abs(v) <= i));
                u++
              )
                for (
                  b = g[u], x = r(v, b), g[u] = x, o = b / x, w = -v / x, c = 0;
                  c < h;
                  c++
                )
                  ((E = f[c][P]),
                    (S = f[c][u]),
                    (f[c][P] = E * o + S * w),
                    (f[c][u] = -E * w + S * o));
            }
            if (((S = g[l]), p == l)) {
              if (S < 0) for (g[l] = -S, c = 0; c < d; c++) y[c][l] = -y[c][l];
              break;
            }
            if (M >= s - 1) throw "Error: no convergence.";
            for (
              _ = g[p],
                E = g[l - 1],
                b = m[l - 1],
                x = m[l],
                v = ((E - S) * (E + S) + (b - x) * (b + x)) / (2 * x * E),
                b = r(v, 1),
                v =
                  v < 0
                    ? ((_ - S) * (_ + S) + x * (E / (v - b) - x)) / _
                    : ((_ - S) * (_ + S) + x * (E / (v + b) - x)) / _,
                o = 1,
                w = 1,
                u = p + 1;
              u < l + 1;
              u++
            ) {
              for (
                b = m[u],
                  E = g[u],
                  x = w * b,
                  b *= o,
                  S = r(v, x),
                  m[u - 1] = S,
                  o = v / S,
                  w = x / S,
                  v = _ * o + b * w,
                  b = -_ * w + b * o,
                  x = E * w,
                  E *= o,
                  c = 0;
                c < d;
                c++
              )
                ((_ = y[c][u - 1]),
                  (S = y[c][u]),
                  (y[c][u - 1] = _ * o + S * w),
                  (y[c][u] = -_ * w + S * o));
              for (
                S = r(v, x),
                  g[u - 1] = S,
                  o = v / S,
                  w = x / S,
                  v = o * b + w * E,
                  _ = -w * b + o * E,
                  c = 0;
                c < h;
                c++
              )
                ((E = f[c][u - 1]),
                  (S = f[c][u]),
                  (f[c][u - 1] = E * o + S * w),
                  (f[c][u] = -E * w + S * o));
            }
            ((m[p] = 0), (m[l] = v), (g[l] = _));
          }
        for (u = 0; u < g.length; u++) g[u] < i && (g[u] = 0);
        for (u = 0; u < d; u++)
          for (c = u - 1; c >= 0; c--)
            if (g[c] < g[u]) {
              for (o = g[c], g[c] = g[u], g[u] = o, l = 0; l < f.length; l++)
                ((n = f[l][u]), (f[l][u] = f[l][c]), (f[l][c] = n));
              for (l = 0; l < y.length; l++)
                ((n = y[l][u]), (y[l][u] = y[l][c]), (y[l][c] = n));
              u = c;
            }
        return { U: f, S: g, V: y };
      }),
      e
    );
  }),
  define(
    "math/parsenode/optimizedregression",
    ["require", "pjs", "./base"],
    function (e) {
      var t = e("pjs"),
        r = e("./base");
      return t(r, function (e, t) {
        ((e.init = function (e, r, n, i, a) {
          (t.init.call(this),
            (this.parameters = e),
            (this.residuals = r),
            (this.statistics = n),
            (this.model = i),
            (this.isModelValid = a.isModelValid),
            (this.residualVariable = a.residualVariable),
            (this.residualSuggestionId = a.residualSuggestionId),
            (this.shouldSuggestLogMode = a.shouldSuggestLogMode),
            (this._exports = [this.residualVariable]));
          for (var s in e) e.hasOwnProperty(s) && this._exports.push(s);
          this.mergeDependencies(i);
        }),
          (e.getCompiledFunction = function () {
            return this.model.getCompiledFunction.apply(this.model, arguments);
          }),
          (e.getCompiledDerivative = function () {
            return this.model.getCompiledDerivative.apply(
              this.model,
              arguments,
            );
          }),
          (e.evaluate = function () {
            return this.model.evaluate.apply(this.model, arguments);
          }));
      });
    },
  ),
  define(
    "math/parsenode/regression",
    [
      "require",
      "pjs",
      "./base",
      "numeric",
      "math/distance",
      "math/builtin",
      "graphing/label",
      "math/errormsg",
      "./error",
      "./optimizedregression",
      "./list",
      "./functioncall",
      "./identifier",
      "./constant",
      "./freevariable",
      "./expressionTypes",
      "math/types",
    ],
    function (e) {
      var t = e("pjs"),
        r = e("./base"),
        n = e("numeric"),
        i = e("math/distance"),
        a = e("math/builtin"),
        s = e("graphing/label"),
        o = e("math/errormsg"),
        u = e("./error"),
        c = e("./optimizedregression"),
        l = e("./list"),
        p = e("./functioncall"),
        f = e("./identifier"),
        h = e("./constant"),
        d = e("./freevariable"),
        m = e("./expressionTypes"),
        g = e("math/types"),
        y = m.Subtract;
      return t(r, function (e, t, r) {
        function m(e, t) {
          for (var r = 0, n = e.fn.apply(void 0, t), i = 0; i < n.length; i++) {
            var a = n[i];
            r += a * a;
          }
          return r / n.length;
        }
        function v(e, t) {
          return e.fn.apply(void 0, t);
        }
        function b(e, t) {
          for (var r = [], n = 0; n < e.length; n++) {
            var i = e[n].fn.apply(void 0, t);
            r.push(i);
          }
          return r;
        }
        function x(e, t, r, i, a) {
          for (var s = [], o = 0; o < t.length; o++) s.push(0);
          for (
            var u = b(t, s),
              c = n.LU(n.dot(u, n.transpose(u)), !0),
              l = s,
              p = 0;
            p < 2;
            p++
          ) {
            var f = v(e, s),
              h = n.neg(n.LUsolve(c, n.dot(u, f)));
            if (!n.all(n.isFinite(h))) return E(e, t, r, i, a);
            ((s = n.add(l, h)), (l = s));
          }
          return { solution: s, MSE: m(e, s) };
        }
        function _(e, t, r, i) {
          for (
            var a = r, s = m(e, a), o = 0.001, u = 2, c = 0.1, l = [], p = 0;
            p < t.length;
            p++
          )
            l.push(1);
          for (var f = 0, h = !1, d = b(t, a), g = a, y = s; f < i && !h; ) {
            var x = v(e, a),
              _ = n.transpose(d),
              E = n.dot(d, _);
            if (!n.all(n.isFinite(x))) break;
            if (!n.all(n.isFinite(E))) break;
            for (var S = !1; f < i && !h && !S; ) {
              f += 1;
              var w = n.LU(n.add(E, n.diag(n.mul(o, l))), !0),
                M = n.neg(n.LUsolve(w, n.dot(d, x))),
                I = M;
              if (((a = n.add(g, I)), (s = m(e, a)), (h = n.all(n.eq(a, g))))) {
                ((g = a), (y = s));
                break;
              }
              var P;
              if (
                (isFinite(s) &&
                  s <= y &&
                  ((P = b(t, a)), (S = n.all(n.isFinite(P)))),
                S)
              ) {
                ((d = P), (g = a), (y = s), (o *= c), (o = Math.max(1e-64, o)));
                break;
              }
              o *= u;
            }
          }
          return { solution: g, MSE: m(e, g) };
        }
        function E(e, t, r, n, a) {
          var s,
            o = [];
          for (n || (n = {}), a || (a = {}), s = 0; s < r.length; s++) {
            var u = r[s];
            a[u] && isFinite(a[u].constantValue)
              ? o.push(+a[u].constantValue)
              : n.hasOwnProperty(u) && isFinite(n[u])
                ? o.push(+n[u])
                : o.push(1);
          }
          var c = T(30, r),
            l = C(e, t, c, 3, 5),
            p = C(e, t, l, 60, 1),
            f = _(e, t, p[0], 250),
            h = _(e, t, o, 100);
          return isFinite(h.MSE)
            ? h.MSE < f.MSE
              ? h
              : i.approx(h.MSE, f.MSE, 8)
                ? h
                : f
            : f;
        }
        function S(e, t, r, n) {
          var i,
            a,
            s = t.getDependencies();
          for (a = 0; a < s.length; a++)
            if (!e.validRegressionParameter(s[a]))
              throw o.invalidRegressionParameter(s[a]);
          var u = t.getCompiledFunction(s);
          if (s.length) {
            var c = {};
            for (a = 1; a < s.length; a++) c[s[a]] = d(s[0]);
            var l = t.substitute(c).isLinear(s[0]),
              p = [];
            for (a = 0; a < s.length; a++)
              p.push(t.takeDerivative(s[a]).getCompiledFunction(s));
            i = l ? x(u, p, s, r, n) : E(u, p, s, r, n);
          } else i = { solution: [], MSE: m(u, []) };
          var f = {};
          for (a = 0; a < s.length; a++) f[s[a]] = h(i.solution[a]);
          return f;
        }
        function w(e, t) {
          var r = e.length,
            n = e[0],
            a = t[0],
            s = e[r - 1],
            o = t[r - 1];
          if (!(isFinite(n) && isFinite(s) && isFinite(a) && isFinite(o)))
            return !1;
          if (o - a === 0) return !1;
          var u = s - n;
          if (0 === u) return !1;
          for (var c = 1; c < r - 1; c++) {
            var l = e[c],
              p = t[c],
              f = (o * (l - n) + a * (s - l)) / u;
            if (!i.approx(p, f, 5)) return !1;
          }
          return !0;
        }
        function M(e, t, r) {
          var n = Object.create(t);
          for (var i in r) r.hasOwnProperty(i) && (n[i] = r[i]);
          return l.wrap(e.getConcreteTree(n));
        }
        ((e.init = function (e, r) {
          (t.init.call(this),
            (this._lhs = e),
            (this.isLhsSimple = e instanceof f || e instanceof l),
            (this._logLhs = p("ln", [e])),
            (this._rhs = r),
            (this._difference = y([e, r])),
            (this._logDifference = y([p("ln", [e]), p("ln", [r])])),
            this.mergeDependencies(e, r));
        }),
          (e.isRegression = !0),
          (e.chooseResidualVariable = function (e) {
            if (this.userData && this.userData.residualVariable) {
              var t = s.latexToIdentifier(this.userData.residualVariable);
              if (!e[t]) return t;
            }
            for (var r, n = this.getDependencies(), i = 0; i < n.length; i++) {
              var a = n[i].match(/_(.*)/);
              if (a && ((r = "e_" + a[1]), !e[r])) return r;
            }
            for (var o = 1; ; ) {
              if (((r = "e_" + o), !e[r])) return r;
              o++;
            }
          }),
          (e.getRHSModel = function (e, t) {
            function r(e, t) {
              for (var r = 0; r < n.length; r++)
                if (n[r].node === this) return n[r].tmpVar;
              var a = d(this.tmpVar()),
                s = this.getConcreteTree(e);
              return (
                s.getDependencies().length && (i = !1),
                n.push({
                  node: this,
                  tmpVar: a,
                  symbol: a._symbol,
                  concrete: s,
                }),
                a
              );
            }
            var n = [],
              i = !0,
              a = { List: r, TableColumn: r, Range: r },
              s = this._rhs.tryGetConcreteTree(e, a);
            return {
              node: s,
              substituted: s.isError ? s : s.substitute(t),
              replacedNodes: n,
              isValid: i,
            };
          }));
        var I = [
            18.9, 0.105, 0.0113, 0.089, 4.414, 34.32, 8.61, 0.373, 0.06, 0.149,
            1.84, 9.26, 5, 0.7, 0.2, 1.13, 2.61, 1.89, 1, 0.007, 30, 120, 1500,
            4e-4, 7.23, -1, -0.0081, -0.03, -28.6, -1.71, -0.4, -6.94, -0.777,
          ],
          P = function (e) {
            var t = (503 * e) % I.length;
            return I[t];
          },
          T = function (e, t) {
            for (var r, n = [], i = t.length, a = 0; a < e; a++) {
              r = [];
              for (var s = 0; s < i; s++)
                0 === a
                  ? (r[s] = 0)
                  : 1 === a
                    ? (r[s] = 1)
                    : (r[s] = P(a * i + s));
              n.push(r);
            }
            return n;
          },
          C = function (e, t, r, n, i) {
            for (var a = [], s = 0; s < r.length; s++)
              a.push({ soln: _(e, t, r[s], n), startingVals: r[s] });
            a.sort(function (e, t) {
              return isNaN(e.soln.MSE)
                ? 1
                : isNaN(t.soln.MSE)
                  ? -1
                  : e.soln.MSE - t.soln.MSE;
            });
            for (var o = [], u = 0; u < i; u++) o.push(a[u].startingVals);
            return o;
          };
        ((e.computeStatistics = function (e, t, r, n, s) {
          if (r.getDependencies().length) throw o.optimizationError();
          var u = 0;
          r.eachElement(function (e) {
            var t = e.constantValue;
            u += t * t;
          });
          var c = u / r.length;
          if (!isFinite(c)) throw o.optimizationError();
          if (e.getDependencies().length > 0) return { RMSE: Math.sqrt(c) };
          var p = g.isList(e.valueType) ? a.varp(e.asValue()) : 0;
          if (
            e.getDependencies().length ||
            !isFinite(p) ||
            p <= 0 ||
            !this.isLhsSimple
          )
            return { RMSE: Math.sqrt(c) };
          var f = 1 - c / p;
          if (t.isValid && 1 === t.replacedNodes.length) {
            var h = [],
              d = [],
              m = n && (s === D.LINLOG || s === D.LOGLOG);
            l.eachArgs([t.replacedNodes[0].concrete, e], function (e) {
              (h.push(m ? Math.log(e[0].constantValue) : +e[0].constantValue),
                d.push(+e[1].constantValue));
            });
            var y = a.corr(h, d);
            if (i.approx(y * y, f, 8)) return { r: y, rsquared: y * y };
          }
          return { Rsquared: f };
        }),
          (e.getResidualSuggestionId = function (e, t) {
            var r,
              n = this._rhs.getDependencies();
            for (var i in t)
              if (
                t.hasOwnProperty(i) &&
                t[i].concreteTree.isTable &&
                t[i].concreteTree.columns[0]
              ) {
                var a = t[i].rawTree.columns;
                if (a && a.length) {
                  var s = a[0].getExports();
                  if (1 === s.length && n.indexOf(s[0]) !== -1) {
                    for (var o = 1; o < a.length; o++)
                      if (a[o].getDependencies().indexOf(e) !== -1) return;
                    r = r ? r : i;
                  }
                }
              }
            return r ? r : void 0;
          }));
        var D = { NONE: 0, LOGLIN: 1, LOGLOG: 2, LINLOG: 3 };
        ((e.linearizingTransformation = function (e, t) {
          if (!this.isLhsSimple) return D.NONE;
          var r = t.substituted;
          if (r.isError) return D.NONE;
          if (r.valueType !== g.Number) return D.NONE;
          var n = r.getDependencies();
          if (1 !== n.length) return D.NONE;
          if (isFinite(t.node.polynomialOrder(n[0]))) return D.NONE;
          var i = r.getCompiledFunction(n).fn,
            a = t.replacedNodes[0].concrete;
          if (r.valueType !== g.Number) return D.NONE;
          var s = a.mapElements(function (e) {
            return +e.constantValue;
          });
          if (s.length < 3) return D.NONE;
          s.sort(function (e, t) {
            return e - t;
          });
          var o = s.map(i),
            u = o.map(Math.log),
            c = s.map(Math.log),
            p = !0;
          return (
            l.wrap(e).eachElement(function (e) {
              isFinite(Math.log(+e.constantValue)) || (p = !1);
            }),
            w(s, u) && p
              ? D.LOGLIN
              : w(c, u) && p
                ? D.LOGLOG
                : w(c, o)
                  ? D.LINLOG
                  : D.NONE
          );
        }),
          (e.optimize = function (e, t, r, n, i) {
            var a = this._lhs.getConcreteTree(t),
              o = this._rhs.getConcreteTree(t);
            this.typeCheck([a, o]);
            var u,
              p = l.wrap(this._difference.getConcreteTree(t)),
              f = S(e, p, this.userData.regressionParameters, n),
              h = this.getRHSModel(t, f),
              d = M(this._difference, t, f),
              m = this.linearizingTransformation(a, h);
            if (
              !this.userData.isLogModeRegression ||
              (m !== D.LOGLIN && m !== D.LOGLOG)
            )
              u = this.computeStatistics(
                a,
                h,
                d,
                this.userData.isLogModeRegression,
                m,
              );
            else {
              var g = this._logDifference.getConcreteTree(t),
                y = this._logLhs.getConcreteTree(t);
              ((f = S(e, g, this.userData.regressionParamters, n)),
                (h = this.getRHSModel(t, f)),
                (d = M(this._difference, t, f)));
              var v = M(this._logDifference, t, f);
              u = this.computeStatistics(
                y,
                h,
                v,
                this.userData.isLogModeRegression,
                m,
              );
            }
            var b = this.chooseResidualVariable(r),
              x = this.getResidualSuggestionId(b, i);
            return (
              (this.userData.residualVariable = s.identifierToLatex(b)),
              c(f, d, u, h.substituted, {
                isModelValid: h.isValid,
                residualVariable: b,
                residualSuggestionId: x,
                shouldSuggestLogMode: m !== D.NONE,
              })
            );
          }),
          (e.tryOptimize = function () {
            try {
              return this.optimize.apply(this, arguments);
            } catch (e) {
              if (e instanceof u) return e;
              throw e;
            }
          }),
          (e.exportTo = function (e, t, r) {
            if (!t.isError) {
              for (var n in t.parameters)
                t.parameters.hasOwnProperty(n) &&
                  (e.assignmentForbidden(n) ||
                    (r[n] = r[n] ? o.multiplyDefined(n) : t.parameters[n]));
              e.assignmentForbidden(t.residualVariable) ||
                (r[t.residualVariable] = t.residuals);
            }
          }),
          (e.getSliderVariables = function () {
            return [];
          }));
      });
    },
  ),
  define("math/parsenode/image", ["require", "pjs", "./base"], function (e) {
    var t = e("pjs"),
      r = e("./base");
    return t(r, function (e, t, r, n) {
      ((e.isImage = !0),
        (e.init = function (e, r) {
          (t.init.call(this),
            (this.center = e.center),
            (this.radianAngle = e.radianAngle),
            (this.width = e.width),
            (this.height = e.height),
            (this.moveStrategy = r),
            this.mergeDependencies(
              this.center,
              this.radianAngle,
              this.width,
              this.height,
            ));
        }));
    });
  }),
  define("math/parsenode/table", ["require", "pjs", "./base"], function (e) {
    var t = e("pjs"),
      r = e("./base");
    return t(r, function (e, t) {
      ((e.init = function (e) {
        (t.init.call(this),
          (this.columns = e),
          (this._exports = []),
          this.mergeDependencies.apply(this, e));
        for (var r = 0; r < e.length; r++)
          Array.prototype.push.apply(this._exports, e[r].getExports());
      }),
        (e.exportPenalty = 1),
        (e.isTable = !0),
        (e.exportTo = function (e, t, r) {
          for (var n = 0; n < this.columns.length; n++) {
            var i = this.columns[n].getExports();
            if (i.length) {
              var a = i[0];
              e.assignmentForbidden(a) ||
                r[a] ||
                (t.isError
                  ? (r[a] = t)
                  : this.columns[n].exportTo(e, t.columns[n], r));
            }
          }
        }),
        (e.getAllIds = function () {
          return this.columns.map(function (e) {
            return e.header.userData.id;
          });
        }));
    });
  }),
  define(
    "math/parsenode/tablecolumn",
    ["require", "pjs", "./base", "./list", "./constant", "./identifier"],
    function (e) {
      var t = e("pjs"),
        r = e("./base"),
        n = e("./list"),
        i = e("./constant"),
        a = e("./identifier");
      return t(r, function (e, t) {
        function s(e) {
          return e.isError ? i(NaN) : e;
        }
        ((e.init = function (e, r, n) {
          (t.init.call(this),
            (this.header = e),
            (this.length = r),
            (this.values = n),
            (this.isIndependent = !1),
            this.registerDependencies(),
            (this._exports = this.computeExports()));
        }),
          (e.registerDependencies = function () {
            (this.mergeDependencies(this.header),
              this.mergeDependencies.apply(this, this.values));
          }),
          (e.computeExports = function () {
            return this.header instanceof a ? [this.header._symbol] : [];
          }),
          (e.isDiscrete = function (e) {
            return (
              1 !== this.header.getDependencies().length ||
              1 !== e.header.getDependencies().length ||
              this.header.getDependencies()[0] !== e.header.getDependencies()[0]
            );
          }),
          (e._exportSymbolsTo = function (e, t, i) {
            if (e.length) {
              var a = e[0];
              if (t.isError) i[a] = t;
              else
                try {
                  i[a] = n(t.values.map(s));
                } catch (e) {
                  if (!(e instanceof r)) throw e;
                  i[a] = e;
                }
            }
          }),
          (e.exportTo = function (e, t, r) {
            var n = this.getLegalExports(e);
            this._exportSymbolsTo(n, t, r);
          }),
          (e.exportToLocal = function (e, t) {
            this._exportSymbolsTo(this.getExports(), e, t);
          }));
      });
    },
  ),
  define(
    "math/parsenode/solvedequation",
    ["require", "pjs", "./base"],
    function (e) {
      var t = e("pjs"),
        r = e("./base");
      return t(r, function (e, t) {
        ((e.init = function (e, r) {
          (t.init.call(this),
            (this._symbol = e),
            (this._expression = r),
            this.mergeDependencies(r));
        }),
          (e.getCompiledFunction = function () {
            return this._expression.getCompiledFunction.apply(
              this._expression,
              arguments,
            );
          }),
          (e.getCompiledDerivative = function () {
            return this._expression.getCompiledDerivative.apply(
              this._expression,
              arguments,
            );
          }),
          (e.evaluate = function () {
            return this._expression.evaluate.apply(this._expression, arguments);
          }));
      });
    },
  ),
  define(
    "parsenodes",
    [
      "require",
      "math/parsenode/expressionTypes",
      "math/parsenode/base",
      "math/parsenode/expression",
      "math/parsenode/scalarexpression",
      "math/parsenode/error",
      "math/parsenode/constant",
      "math/parsenode/identifier",
      "math/parsenode/ans",
      "math/parsenode/freevariable",
      "math/parsenode/dummyindex",
      "math/parsenode/list",
      "math/parsenode/range",
      "math/parsenode/broadcast",
      "math/parsenode/listaccess",
      "math/parsenode/orderedpair",
      "math/parsenode/movablepoint",
      "math/parsenode/orderedpairaccess",
      "math/parsenode/polygon",
      "math/parsenode/basecomparator",
      "math/parsenode/comparator",
      "math/parsenode/doubleinequality",
      "math/parsenode/repeatedoperator",
      "math/parsenode/sum",
      "math/parsenode/product",
      "math/parsenode/integral",
      "math/parsenode/functioncall",
      "math/parsenode/functionexponent",
      "math/parsenode/prime",
      "math/parsenode/piecewise",
      "math/parsenode/derivative",
      "math/parsenode/builtinfunction",
      "math/parsenode/nativefunction",
      "math/parsenode/typedfunction",
      "math/parsenode/reducerfunction",
      "math/parsenode/parametrizedreducerfunction",
      "math/parsenode/doublereducerfunction",
      "math/parsenode/assignment",
      "math/parsenode/functiondefinition",
      "math/parsenode/equation",
      "math/parsenode/regression",
      "math/parsenode/image",
      "math/parsenode/table",
      "math/parsenode/tablecolumn",
      "math/parsenode/solvedequation",
      "math/parsenode/optimizedregression",
    ],
    function (e) {
      var t = e("math/parsenode/expressionTypes"),
        r = {
          Base: e("math/parsenode/base"),
          Expression: e("math/parsenode/expression"),
          ScalarExpression: e("math/parsenode/scalarexpression"),
          Error: e("math/parsenode/error"),
          Constant: e("math/parsenode/constant"),
          Identifier: e("math/parsenode/identifier"),
          Ans: e("math/parsenode/ans"),
          FreeVariable: e("math/parsenode/freevariable"),
          DummyIndex: e("math/parsenode/dummyindex"),
          List: e("math/parsenode/list"),
          Range: e("math/parsenode/range"),
          Broadcast: e("math/parsenode/broadcast"),
          ListAccess: e("math/parsenode/listaccess"),
          OrderedPair: e("math/parsenode/orderedpair"),
          MovablePoint: e("math/parsenode/movablepoint"),
          OrderedPairAccess: e("math/parsenode/orderedpairaccess"),
          Polygon: e("math/parsenode/polygon"),
          BaseComparator: e("math/parsenode/basecomparator"),
          Comparator: e("math/parsenode/comparator"),
          DoubleInequality: e("math/parsenode/doubleinequality"),
          RepeatedOperator: e("math/parsenode/repeatedoperator"),
          Sum: e("math/parsenode/sum"),
          Product: e("math/parsenode/product"),
          Integral: e("math/parsenode/integral"),
          FunctionCall: e("math/parsenode/functioncall"),
          FunctionExponent: e("math/parsenode/functionexponent"),
          Prime: e("math/parsenode/prime"),
          Piecewise: e("math/parsenode/piecewise"),
          Derivative: e("math/parsenode/derivative"),
          BuiltInFunction: e("math/parsenode/builtinfunction"),
          NativeFunction: e("math/parsenode/nativefunction"),
          TypedFunction: e("math/parsenode/typedfunction"),
          ReducerFunction: e("math/parsenode/reducerfunction"),
          ParametrizedReducerFunction: e(
            "math/parsenode/parametrizedreducerfunction",
          ),
          DoubleReducerFunction: e("math/parsenode/doublereducerfunction"),
          Assignment: e("math/parsenode/assignment"),
          FunctionDefinition: e("math/parsenode/functiondefinition"),
          Equation: e("math/parsenode/equation"),
          Regression: e("math/parsenode/regression"),
          Image: e("math/parsenode/image"),
          Table: e("math/parsenode/table"),
          TableColumn: e("math/parsenode/tablecolumn"),
          SolvedEquation: e("math/parsenode/solvedequation"),
          OptimizedRegression: e("math/parsenode/optimizedregression"),
        };
      for (var n in t) r[n] = t[n];
      for (var i in r)
        r.hasOwnProperty(i) &&
          "Comparator" !== i &&
          "BuiltInFunction" !== i &&
          (r[i].prototype.type = i);
      for (var a in r.Comparator)
        r.Comparator.hasOwnProperty(a) &&
          (r.Comparator[a].prototype.type = "Comparator['" + a + "']");
      for (var s in r.BuiltInFunction)
        r.BuiltInFunction.hasOwnProperty(s) &&
          (r.BuiltInFunction[s].prototype.type =
            "BuiltInFunction['" + s + "']");
      return r;
    },
  ),
  define("math/parser/char-codes", ["require", "exports"], function (e, t) {
    "use strict";
    function r(e) {
      return 48 <= e && e <= 57;
    }
    function n(e) {
      return 97 <= e && e <= 122;
    }
    function i(e) {
      return 65 <= e && e <= 90;
    }
    function a(e) {
      return n(e) || i(e);
    }
    function s(e) {
      return 92 === e;
    }
    function o(e) {
      return 46 === e;
    }
    function u(e) {
      return 39 === e;
    }
    function c(e) {
      if (9 <= e && e <= 13) return !0;
      if (8192 <= e && e <= 8202) return !0;
      switch (e) {
        case 32:
        case 160:
        case 5760:
        case 8232:
        case 8233:
        case 8239:
        case 8287:
        case 12288:
        case 65279:
          return !0;
        default:
          return !1;
      }
    }
    (Object.defineProperty(t, "__esModule", { value: !0 }),
      (t.isDigit = r),
      (t.isLowerCaseLetter = n),
      (t.isUpperCaseLetter = i),
      (t.isLetter = a),
      (t.isBackslash = s),
      (t.isDot = o),
      (t.isSingleQuote = u),
      (t.isWhitespace = c));
  }),
  define("math/parser/input-span", ["require", "exports"], function (e, t) {
    "use strict";
    function r(e, t, r) {
      return { input: e, start: t, end: r };
    }
    function n(e, t) {
      return r(e, t, t);
    }
    function i(e, t) {
      if (e.input !== t.input)
        throw new Error(
          "Programming Error: cannot form a span on different inputs",
        );
      return r(e.input, e.start, t.end);
    }
    function a(e) {
      return e.input.slice(e.start, e.end);
    }
    (Object.defineProperty(t, "__esModule", { value: !0 }),
      (t.Span = r),
      (t.emptySpanAt = n),
      (t.joinSpans = i),
      (t.slice = a));
  }),
  define(
    "math/parser/latex-lexer",
    ["require", "exports", "./char-codes", "./input-span"],
    function (e, t, r, n) {
      "use strict";
      function i(e, t) {
        return n.joinSpans(e.token.span, t.prevSpan);
      }
      function a(e, t, r) {
        return { type: e, span: t, val: r };
      }
      function s(e, t, r, n) {
        return { input: e, prevSpan: t, pos: r, token: n };
      }
      function o(e) {
        return u(e, 0, n.emptySpanAt(e, 0));
      }
      function u(e, t, n) {
        for (; r.isWhitespace(e.charCodeAt(t)); ) t += 1;
        var i = d(e, t);
        return s(e, n, t, i);
      }
      function c(e) {
        return u(e.input, e.token.span.end, e.token.span);
      }
      function l(e) {
        return e.token;
      }
      function p(e, t) {
        if (l(e).type !== t) throw "Parse Error: expected " + t + ".";
        return c(e);
      }
      function f(e, t) {
        return l(e).type === t;
      }
      function h(e) {
        return e.pos >= e.input.length;
      }
      function d(e, t) {
        var i = t;
        if (t >= e.length) return a("End", n.emptySpanAt(e, t), "");
        var s = e.charCodeAt(t);
        if (r.isDigit(s)) {
          var o = n.Span(e, i, t + 1);
          return a("Digit", o, e.charAt(i));
        }
        if (r.isLetter(s)) {
          var o = n.Span(e, i, t + 1);
          return a("Letter", o, e.charAt(i));
        }
        if (r.isBackslash(s)) {
          if (((t += 1), r.isLetter(e.charCodeAt(t)))) {
            for (; r.isLetter(e.charCodeAt(t)); ) t += 1;
            var o = n.Span(e, i, t),
              u = n.slice(o),
              c = m[u] || "Cmd";
            return a(c, o, u);
          }
          t += 1;
          var o = n.Span(e, i, t),
            u = n.slice(o);
          return a("EscapedSymbol", o, u);
        }
        if (r.isSingleQuote(s)) {
          for (t += 1; r.isSingleQuote(e.charCodeAt(t)); ) t += 1;
          if ("^" === e.charAt(t)) {
            t += 1;
            var o = n.Span(e, i, t),
              u = n.slice(o);
            return a("Primes^", o, u);
          }
          var o = n.Span(e, i, t),
            u = n.slice(o);
          return a("Primes", o, u);
        }
        var o = n.Span(e, i, t + 1),
          u = e.charAt(i),
          c = g[u] || "Symbol";
        return a(c, o, u);
      }
      (Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.spanStates = i),
        (t.LatexToken = a),
        (t.lex = o),
        (t.advance = c),
        (t.peek = l),
        (t.eat = p),
        (t.isAt = f),
        (t.isDone = h));
      var m = {
          "\\left": "Left",
          "\\right": "Right",
          "\\sqrt": "Sqrt",
          "\\frac": "Frac",
          "\\operatorname": "OperatorName",
        },
        g = { "[": "[", "]": "]", "{": "{", "}": "}", "^": "^", _: "_" };
    },
  ),
  define("math/parser/latex-node", ["require", "exports"], function (e, t) {
    "use strict";
    function r(e, t) {
      return { type: "Group", span: e, args: t };
    }
    function n(e, t, r) {
      return { type: "Sqrt", span: e, optArg: t, arg: r };
    }
    function i(e, t, r) {
      return { type: "Frac", span: e, num: t, den: r };
    }
    function a(e, t, r, n) {
      return { type: "SupSub", span: e, sup: t, sub: r, nprimes: n };
    }
    function s(e, t, r, n) {
      return { type: "LeftRight", span: e, left: t, right: r, arg: n };
    }
    function o(e, t) {
      return { type: "OperatorName", span: e, arg: t };
    }
    function u(e, t) {
      return { type: "Symbol", span: e, val: t };
    }
    (Object.defineProperty(t, "__esModule", { value: !0 }),
      (t.Group = r),
      (t.Sqrt = n),
      (t.Frac = i),
      (t.SupSub = a),
      (t.LeftRight = s),
      (t.OperatorName = o),
      (t.Symbol = u));
  }),
  define(
    "math/parser/latex-parser",
    ["require", "exports", "./latex-lexer", "./input-span", "./latex-node"],
    function (e, t, r, n, i) {
      "use strict";
      function a(e) {
        switch (e) {
          case "Frac":
            return 2;
          case "^":
          case "_":
          case "Primes^":
          case "Left":
          case "Frac":
          case "Sqrt":
          case "OperatorName":
            return 1;
          default:
            return 0;
        }
      }
      function s(e) {
        var t = u(r.lex(e), !1),
          i = t.state,
          a = t.tree;
        if (!r.isDone(i))
          throw "Parse error: unexpected " + n.slice(r.peek(i).span) + ".";
        return a;
      }
      function o(e, t) {
        return { state: e, tree: t };
      }
      function u(e, t) {
        var n,
          a = e,
          s = [];
        e: for (; !r.isDone(e); ) {
          var u = r.peek(e);
          switch (u.type) {
            case "Cmd":
            case "EscapedSymbol":
            case "Letter":
            case "Digit":
            case "Symbol":
            case "[":
            case "{":
            case "^":
            case "_":
            case "Primes":
            case "Primes^":
            case "Left":
            case "Frac":
            case "Sqrt":
            case "OperatorName":
            case "]":
              if ("]" === u.type && t) break e;
              var l = void 0;
              if (((n = c(e)), (e = n.state), (l = n.tree), "Group" === l.type))
                for (var p = 0, f = l.args; p < f.length; p++) {
                  var h = f[p];
                  s.push(h);
                }
              else s.push(l);
              break;
            case "}":
            case "Right":
            case "End":
              break e;
            default:
              var d = u.type;
              throw "Unexpected token type " + d + ".";
          }
        }
        var m = r.spanStates(a, e);
        return o(e, i.Group(m, s));
      }
      function c(e) {
        var t,
          n = r.peek(e);
        switch (n.type) {
          case "Cmd":
          case "EscapedSymbol":
          case "Letter":
          case "Digit":
          case "Symbol":
            return ((e = r.advance(e)), o(e, n));
          case "[":
          case "]":
            return ((e = r.advance(e)), o(e, i.Symbol(n.span, n.val)));
          case "{":
            e = r.advance(e);
            var a = void 0;
            return (
              (t = u(e, !1)),
              (e = t.state),
              (a = t.tree),
              (e = r.eat(e, "}")),
              o(e, a)
            );
          case "^":
          case "_":
          case "Primes":
          case "Primes^":
            return d(e);
          case "Left":
            return h(e);
          case "Frac":
            return f(e);
          case "Sqrt":
            return p(e);
          case "OperatorName":
            return l(e);
          case "}":
          case "Right":
            throw "Parse Error: unexpected " + n.val + ".";
          case "End":
            throw "Parse Error: unexpected end.";
          default:
            var s = n.type;
            throw "Unexpected token type " + s + ".";
        }
      }
      function l(e) {
        var t,
          n = e,
          a = r.peek(e);
        e = r.eat(e, "OperatorName");
        var s;
        ((t = m(e, a)), (e = t.state), (s = t.tree));
        var u = r.spanStates(n, e);
        return o(e, i.OperatorName(u, s));
      }
      function p(e) {
        var t,
          n,
          a = e,
          s = r.peek(e);
        e = r.eat(e, "Sqrt");
        var u;
        r.isAt(e, "[") && ((t = g(e)), (e = t.state), (u = t.tree));
        var c;
        ((n = m(e, s)), (e = n.state), (c = n.tree));
        var l = r.spanStates(a, e);
        return o(e, i.Sqrt(l, u, c));
      }
      function f(e) {
        var t,
          n,
          a = e,
          s = r.peek(e);
        e = r.eat(e, "Frac");
        var u;
        ((t = m(e, s)), (e = t.state), (u = t.tree));
        var c;
        ((n = m(e, s)), (e = n.state), (c = n.tree));
        var l = r.spanStates(a, e);
        return o(e, i.Frac(l, u, c));
      }
      function h(e) {
        var t,
          n = e;
        e = r.eat(e, "Left");
        var a = r.peek(e);
        e = r.advance(e);
        var s;
        ((t = u(e, !1)), (e = t.state), (s = t.tree), (e = r.eat(e, "Right")));
        var c = r.peek(e);
        e = r.advance(e);
        var l = r.spanStates(n, e);
        return o(e, i.LeftRight(l, a, c, s));
      }
      function d(e) {
        var t,
          n,
          a,
          s,
          u,
          c = e,
          l = 0;
        e: for (; !r.isDone(e); ) {
          var p = r.peek(e);
          switch (p.type) {
            case "^":
              if (((e = r.advance(e)), s))
                throw "Parse Error: double superscript.";
              ((t = m(e, p)), (e = t.state), (s = t.tree));
              break;
            case "_":
              if (((e = r.advance(e)), u))
                throw "Parse Error: double subscript.";
              ((n = m(e, p)), (e = n.state), (u = n.tree));
              break;
            case "Primes":
              if (((e = r.advance(e)), l > 0))
                throw "Parse Error: double primes.";
              l = p.val.length;
              break;
            case "Primes^":
              if (((e = r.advance(e)), l > 0))
                throw "Parse Error: double primes.";
              if (s) throw "Parse Error: double superscript";
              ((l = p.val.length - 1),
                (a = m(e, p)),
                (e = a.state),
                (s = a.tree));
              break;
            default:
              break e;
          }
        }
        var f = r.spanStates(c, e);
        return o(e, i.SupSub(f, s, u, l));
      }
      function m(e, t) {
        var s,
          u,
          l = a(t.type);
        if (l <= 0)
          throw new Error(
            "Programming Error: greediness must be greater than 0.",
          );
        var p = a(r.peek(e).type);
        if (p > 0 && p <= l) {
          var f = n.slice(t.span),
            h = n.slice(r.peek(e).span);
          throw (
            "Parse Error: can't use " + h + " as argument of " + f + ". Use {}."
          );
        }
        return (
          (s = c(e)),
          (e = s.state),
          (u = s.tree),
          "Group" !== u.type && (u = i.Group(u.span, [u])),
          o(e, u)
        );
      }
      function g(e) {
        var t;
        e = r.eat(e, "[");
        var n;
        return (
          (t = u(e, !0)),
          (e = t.state),
          (n = t.tree),
          (e = r.eat(e, "]")),
          o(e, n)
        );
      }
      (Object.defineProperty(t, "__esModule", { value: !0 }), (t.parse = s));
    },
  ),
  define(
    "math/parser/command-aliases",
    ["require", "exports", "./char-codes"],
    function (e, t, r) {
      "use strict";
      function n(e) {
        for (var t = 0; r.isBackslash(e.charCodeAt(t)); ) t += 1;
        return (t > 0 && (e = e.slice(t)), i[e] || e);
      }
      Object.defineProperty(t, "__esModule", { value: !0 });
      var i = {
        mcd: "gcd",
        gcf: "gcd",
        mcm: "lcm",
        signum: "sign",
        stdDevP: "stdevp",
        stddevp: "stdevp",
        stdDev: "stdev",
        stddev: "stdev",
        variance: "var",
      };
      t.translateCmd = n;
    },
  ),
  define(
    "math/parser/surface-node",
    ["require", "exports", "./command-aliases"],
    function (e, t, r) {
      "use strict";
      function n(e, t) {
        return { type: "Equals", span: e, args: t };
      }
      function i(e, t, r) {
        return { type: "Inequality", span: e, symbol: t, args: r };
      }
      function a(e, t, r) {
        return { type: "TrailingInequalityPiece", span: e, symbol: t, args: r };
      }
      function s(e, t, r) {
        return { type: "InequalityChain", span: e, first: t, chain: r };
      }
      function o(e, t) {
        return { type: "Tilde", span: e, args: t };
      }
      function u(e, t) {
        return { type: "Pos", span: e, args: t };
      }
      function c(e, t) {
        return { type: "Neg", span: e, args: t };
      }
      function l(e, t) {
        return { type: "Add", span: e, args: t };
      }
      function p(e, t) {
        return { type: "Sub", span: e, args: t };
      }
      function f(e, t) {
        return { type: "Mul", span: e, args: t };
      }
      function h(e, t) {
        return { type: "Div", span: e, args: t };
      }
      function d(e, t) {
        return { type: "Bang", span: e, args: t };
      }
      function m(e, t) {
        return { type: "Call", span: e, args: t };
      }
      function g(e, t) {
        return { type: "ImplicitCall", span: e, args: t };
      }
      function y(e, t) {
        return { type: "Index", span: e, args: t };
      }
      function v(e, t) {
        return { type: "Paren", span: e, args: t };
      }
      function b(e, t) {
        return { type: "List", span: e, args: t };
      }
      function x(e, t) {
        return { type: "Pipes", span: e, args: t };
      }
      function _(e, t) {
        return { type: "Subscript", span: e, args: t };
      }
      function E(e, t) {
        return { type: "Superscript", span: e, args: t };
      }
      function S(e, t, r) {
        return { type: "Prime", span: e, nprimes: t, args: r };
      }
      function w(e, t) {
        return { type: "Seq", span: e, args: t };
      }
      function M(e, t) {
        return { type: "Sqrt", span: e, args: t };
      }
      function I(e, t) {
        return { type: "Nthroot", span: e, args: t };
      }
      function P(e, t) {
        return { type: "Frac", span: e, args: t };
      }
      function T(e, t) {
        return { type: "Derivative", span: e, args: t };
      }
      function C(e, t) {
        return { type: "Integral", span: e, args: t };
      }
      function D(e, t) {
        return { type: "EmptyIntegral", span: e, args: t };
      }
      function O(e, t) {
        return { type: "Sum", span: e, args: t };
      }
      function N(e, t) {
        return { type: "Product", span: e, args: t };
      }
      function L(e, t) {
        return { type: "Piecewise", span: e, args: t };
      }
      function q(e) {
        return { type: "EmptyPiecewise", span: e };
      }
      function A(e, t) {
        return { type: "Colon", span: e, args: t };
      }
      function F(e, t) {
        return { type: "Ellipsis", span: e, args: t };
      }
      function k(e, t) {
        return { type: "PercentOf", span: e, args: t };
      }
      function V(e, t) {
        return { type: "Juxt", span: e, args: t };
      }
      function j(e, t) {
        return { type: "Letter", span: e, val: t };
      }
      function B(e, t) {
        return { type: "Decimal", span: e, val: t };
      }
      function R(e, t) {
        return { type: "Cmd", span: e, val: r.translateCmd(t) };
      }
      function z(e, t) {
        return { type: "Alphanumeric", span: e, val: t };
      }
      function G(e, t, r, n) {
        return { type: "MixedNumber", span: e, whole: t, num: r, den: n };
      }
      function U(e) {
        if ("Subscript" === e.type) {
          if ("Alphanumeric" !== e.args[1].type) return !1;
          e = e.args[0];
        }
        switch (e.type) {
          case "Cmd":
            return !0;
          case "Letter":
            return !0;
          default:
            return !1;
        }
      }
      function Y(e) {
        return "Superscript" === e.type && U(e.args[0]);
      }
      function W(e, t) {
        if ("Letter" !== e.type || "d" !== e.val) return !1;
        if ("Juxt" !== t.type) return !1;
        var r = t.args,
          n = r[0],
          i = r[1];
        return "Letter" === n.type && "d" === n.val && U(i);
      }
      function X(e) {
        switch (e.type) {
          case "Letter":
          case "Cmd":
          case "Mul":
          case "Div":
          case "Prime":
          case "Call":
          case "ImplicitCall":
          case "Pipes":
          case "Sqrt":
          case "Nthroot":
          case "Frac":
          case "Derivative":
          case "Integral":
          case "EmptyIntegral":
          case "Sum":
          case "Product":
          case "Piecewise":
          case "EmptyPiecewise":
          case "Paren":
          case "Juxt":
            return !0;
          case "Subscript":
          case "Superscript":
          case "Bang":
          case "Index":
            return X(e.args[0]);
          case "Decimal":
          case "MixedNumber":
          case "Equals":
          case "Inequality":
          case "InequalityChain":
          case "Tilde":
          case "Pos":
          case "Neg":
          case "Add":
          case "Sub":
          case "List":
          case "Seq":
          case "Colon":
          case "Ellipsis":
          case "PercentOf":
            return !1;
          default:
            var t = e;
            throw "Unexpected surface node " + t.type + ".";
        }
      }
      function Q(e) {
        switch (e.type) {
          case "Letter":
          case "Decimal":
          case "MixedNumber":
          case "Cmd":
          case "EmptyPiecewise":
            return !0;
          case "Neg":
            for (var t = e.args[0]; ; )
              if ("Pos" === t.type || "Paren" === t.type) t = t.args[0];
              else {
                if ("Neg" !== t.type) break;
                t = t.args[0];
              }
            return "Decimal" === t.type || "MixedNumber" === t.type;
          case "Pos":
            return Q(e.args[0]);
          case "Paren":
            return Q(e.args[0]);
          case "Juxt":
          case "Mul":
          case "Div":
            return Q(e.args[0]) && Q(e.args[1]);
          case "Subscript":
            return Q(e.args[0]);
          case "Superscript":
          case "Frac":
          case "Add":
          case "Sub":
            return Q(e.args[0]) && Q(e.args[1]);
          case "Piecewise":
            var t = e.args[0];
            return (
              "Equals" === t.type ||
              "Inequality" === t.type ||
              "InequalityChain" === t.type
            );
          case "Call":
            var r = e.args,
              n = r[0],
              i = r[1];
            return !U(n) && !Y(n) && Q(n) && Q(i);
          case "Derivative":
          case "Sqrt":
          case "Nthroot":
          case "Pipes":
          case "Bang":
            return !1;
          case "Neg":
          case "Equals":
          case "Inequality":
          case "InequalityChain":
          case "Tilde":
          case "ImplicitCall":
          case "Index":
          case "List":
          case "Seq":
          case "Integral":
          case "EmptyIntegral":
          case "Sum":
          case "Product":
          case "Colon":
          case "Ellipsis":
          case "PercentOf":
          case "Prime":
            return !1;
          default:
            var a = e;
            throw "Unexpected surface node " + a.type + ".";
        }
      }
      (Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.Equals = n),
        (t.Inequality = i),
        (t.TrailingInequalityPiece = a),
        (t.InequalityChain = s),
        (t.Tilde = o),
        (t.Pos = u),
        (t.Neg = c),
        (t.Add = l),
        (t.Sub = p),
        (t.Mul = f),
        (t.Div = h),
        (t.Bang = d),
        (t.Call = m),
        (t.ImplicitCall = g),
        (t.Index = y),
        (t.Paren = v),
        (t.List = b),
        (t.Pipes = x),
        (t.Subscript = _),
        (t.Superscript = E),
        (t.Prime = S),
        (t.Seq = w),
        (t.Sqrt = M),
        (t.Nthroot = I),
        (t.Frac = P),
        (t.Derivative = T),
        (t.Integral = C),
        (t.EmptyIntegral = D),
        (t.Sum = O),
        (t.Product = N),
        (t.Piecewise = L),
        (t.EmptyPiecewise = q),
        (t.Colon = A),
        (t.Ellipsis = F),
        (t.PercentOf = k),
        (t.Juxt = V),
        (t.Letter = j),
        (t.Decimal = B),
        (t.Cmd = R),
        (t.Alphanumeric = z),
        (t.MixedNumber = G),
        (t.isIdentifier = U),
        (t.isSuperscriptedIdentifier = Y),
        (t.isDerivative = W),
        (t.isOkForImplicitMultiply = X),
        (t.isOkForImplicitCall = Q));
    },
  ),
  define(
    "math/parser/surface-node-error",
    ["require", "exports"],
    function (e, t) {
      "use strict";
      function r(e, t) {
        return { type: "Err", span: e, error: t };
      }
      function n() {
        return { type: "UnexpectedParseError" };
      }
      function i() {
        return { type: "EmptyInput" };
      }
      function a() {
        return { type: "EmptyGroup" };
      }
      function s() {
        return { type: "EmptySubscript" };
      }
      function o() {
        return { type: "EmptySuperscript" };
      }
      function u() {
        return { type: "EmptyRadical" };
      }
      function c() {
        return { type: "EmptyParen" };
      }
      function l() {
        return { type: "EmptySquareBracket" };
      }
      function p() {
        return { type: "EmptyPipe" };
      }
      function f() {
        return { type: "EmptyRadicand" };
      }
      function h() {
        return { type: "UnexpectedEnd" };
      }
      function d(e) {
        return { type: "BinaryOperatorMissingRight", val: e };
      }
      function m(e) {
        return { type: "BinaryOperatorMissingLeft", val: e };
      }
      function g(e) {
        return { type: "UnaryOperatorMissingRight", val: e };
      }
      function y(e) {
        return { type: "UnaryOperatorMissingLeft", val: e };
      }
      function v(e, t) {
        return { type: "MissingCloseDelimiter", open: e, close: t };
      }
      function b(e, t) {
        return { type: "UnexpectedCloseDelimiter", open: e, close: t };
      }
      function x() {
        return { type: "UnexpectedDifferential" };
      }
      function _(e) {
        return { type: "UnrecognizedSymbol", val: e };
      }
      function E(e) {
        return { type: "InvalidOperatorName", val: e };
      }
      function S(e) {
        return { type: "InvalidSubscript", val: e };
      }
      function w(e) {
        return { type: "UnexpectedSubscript", base: e };
      }
      function M(e) {
        return { type: "FunctionMissingArgument", val: e };
      }
      function I() {
        return { type: "PercentMissingOf" };
      }
      function P() {
        return { type: "PrimeWithoutParen" };
      }
      function T() {
        return { type: "SuperscriptWithPrime" };
      }
      function C() {
        return { type: "UnexpectedPrime" };
      }
      function D() {
        return { type: "SumMissingBound" };
      }
      function O() {
        return { type: "ProductMissingBound" };
      }
      function N() {
        return { type: "MissingBound" };
      }
      function L() {
        return { type: "IntegralMissingBound" };
      }
      function q() {
        return { type: "SumMissingBody" };
      }
      function A() {
        return { type: "ProductMissingBody" };
      }
      function F() {
        return { type: "IntegralMissingBody" };
      }
      function k() {
        return { type: "DerivativeMissingBody" };
      }
      function V() {
        return { type: "IntegralMissingDifferential" };
      }
      function j() {
        return { type: "DifferentialWithSuperscript" };
      }
      function B() {
        return { type: "FractionMissingNumerator" };
      }
      function R() {
        return { type: "FractionMissingDenominator" };
      }
      function z() {
        return { type: "FractionEmpty" };
      }
      (Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.Err = r),
        (t.UnexpectedParseError = n),
        (t.EmptyInput = i),
        (t.EmptyGroup = a),
        (t.EmptySubscript = s),
        (t.EmptySuperscript = o),
        (t.EmptyRadical = u),
        (t.EmptyParen = c),
        (t.EmptySquareBracket = l),
        (t.EmptyPipe = p),
        (t.EmptyRadicand = f),
        (t.UnexpectedEnd = h),
        (t.BinaryOperatorMissingRight = d),
        (t.BinaryOperatorMissingLeft = m),
        (t.UnaryOperatorMissingRight = g),
        (t.UnaryOperatorMissingLeft = y),
        (t.MissingCloseDelimiter = v),
        (t.UnexpectedCloseDelimiter = b),
        (t.UnexpectedDifferential = x),
        (t.UnrecognizedSymbol = _),
        (t.InvalidOperatorName = E),
        (t.InvalidSubscript = S),
        (t.UnexpectedSubscript = w),
        (t.FunctionMissingArgument = M),
        (t.PercentMissingOf = I),
        (t.PrimeWithoutParen = P),
        (t.SuperscriptWithPrime = T),
        (t.UnexpectedPrime = C),
        (t.SumMissingBound = D),
        (t.ProductMissingBound = O),
        (t.MissingBound = N),
        (t.IntegralMissingBound = L),
        (t.SumMissingBody = q),
        (t.ProductMissingBody = A),
        (t.IntegralMissingBody = F),
        (t.DerivativeMissingBody = k),
        (t.IntegralMissingDifferential = V),
        (t.DifferentialWithSuperscript = j),
        (t.FractionMissingNumerator = B),
        (t.FractionMissingDenominator = R),
        (t.FractionEmpty = z));
    },
  ),
  define(
    "math/parser/expression-token-tables",
    ["require", "exports"],
    function (e, t) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var r = {
        "+": !0,
        "-": !0,
        "*": !0,
        "/": !0,
        "!": !0,
        "(": !0,
        ")": !0,
        "\\{": !0,
        "\\}": !0,
        "(|": !0,
        "|)": !0,
        "[": !0,
        "]": !0,
        ",": !0,
        "...": !0,
        ":": !0,
        "=": !0,
        ">": !0,
        "<": !0,
        ">=": !0,
        "<=": !0,
        "~": !0,
        "%": !0,
        Letter: !0,
        Decimal: !0,
        Cmd: !0,
        Differential: !0,
        End: !0,
        Trig: !0,
        Ln: !0,
        Log: !0,
        Int: !0,
        Sum: !0,
        Prod: !0,
        Err: !0,
      };
      t.commandTable = {
        "\\lt": "<",
        "\\gt": ">",
        "\\le": "<=",
        "\\ge": ">=",
        "\\ldots": "...",
        "\\sim": "~",
        "\\cdot": "*",
        "\\times": "*",
        "\\div": "/",
        "\\ln": "Ln",
        "\\log": "Log",
        "\\int": "Int",
        "\\sum": "Sum",
        "\\prod": "Prod",
        "\\backslash": "Err",
      };
      for (
        var n = ["sin", "cos", "tan", "cot", "sec", "csc"], i = 0, a = n;
        i < a.length;
        i++
      ) {
        var s = a[i];
        ((t.commandTable["\\" + s] = "Trig"),
          (t.commandTable["\\" + s + "h"] = "Trig"),
          (t.commandTable["\\arc" + s] = "Trig"),
          (t.commandTable["\\arc" + s + "h"] = "Trig"));
      }
      ((t.symbolTable = {
        "+": "+",
        "-": "-",
        "*": "*",
        "/": "/",
        "!": "!",
        "(": "(",
        ")": ")",
        "[": "[",
        "]": "]",
        ",": ",",
        "...": "...",
        ":": ":",
        "=": "=",
        ">=": ">=",
        "<=": "<=",
        ">": ">",
        "<": "<",
        "~": "~",
      }),
        (t.escapedSymbolTable = { "\\{": "\\{", "\\}": "\\}", "\\%": "%" }),
        (t.leftTable = { "|": "(|", "\\{": "\\{", "[": "[", "(": "(" }),
        (t.rightTable = { "|": "|)", "\\}": "\\}", "]": "]", ")": ")" }),
        (t.allTokenTypes = Object.keys(r)));
    },
  ),
  define(
    "math/parser/expression-lexer",
    [
      "require",
      "exports",
      "./expression-token-tables",
      "./input-span",
      "./input-span",
      "./surface-node",
    ],
    function (e, t, r, n, i, a) {
      "use strict";
      function s(e, t, r, n, i, a, s) {
        return {
          input: e,
          prevSpan: t,
          startIndex: r,
          endIndex: n,
          token: i,
          mode: a,
          parent: s,
        };
      }
      function o(e, t) {
        return n.joinSpans(e.token.span, t.prevSpan);
      }
      function u(e, t) {
        return n.joinSpans(e, t.prevSpan);
      }
      function c(e, t) {
        return { type: "Differential", span: e, val: t };
      }
      function l(e, t, r) {
        return { type: e, span: t, val: r };
      }
      function p(e) {
        var t = n.emptySpanAt(e.span.input, e.span.start),
          r = void 0,
          i = void 0;
        return f(e, 0, t, i, r);
      }
      function f(e, t, n, i, a) {
        var o = e.args;
        if (t > o.length && a) return d(a, n);
        t = P(o, t);
        var u = E(e, t, i),
          c = u.token,
          p = u.endIndex;
        if ("End" === c.type && a) {
          var f = a.input.args[a.startIndex];
          if ("LeftRight" === f.type) {
            var h = f.right,
              m = r.rightTable[h.val] || "Err",
              v = l(m, h.span, h.val);
            return s(e, n, t, p, v, i, a);
          }
        } else
          "Int" === c.type
            ? (i = g(i))
            : "Differential" === c.type && (i = y(i));
        return s(e, n, t, p, c, i, a);
      }
      function h(e) {
        var t = e.input.args[e.startIndex],
          r = e.token.span;
        return t && "LeftRight" === t.type
          ? f(t.arg, 0, r, e.mode, e)
          : d(e, r);
      }
      function d(e, t) {
        var r = e.input,
          n = e.endIndex,
          i = e.mode,
          a = e.parent;
        return f(r, n + 1, t, i, a);
      }
      function m(e) {
        return e.token;
      }
      function g(e) {
        return { type: "integral", parent: e };
      }
      function y(e) {
        if (!e || "integral" !== e.type)
          throw new Error(
            "Programming Error: expected lexer to be in integral mode.",
          );
        return e.parent;
      }
      function v(e, t) {
        return m(e).type === t;
      }
      function b(e) {
        return e.startIndex >= e.input.args.length;
      }
      function x(e, t) {
        return t.token.span.start > e.token.span.start;
      }
      function _(e, t) {
        return { token: t, endIndex: e };
      }
      function E(e, t, i) {
        var a = e.args;
        if (t >= a.length) {
          var s = n.emptySpanAt(e.span.input, e.span.end);
          return _(t, l("End", s, ""));
        }
        var o = e.args[t];
        switch (o.type) {
          case "Sqrt":
          case "Frac":
          case "SupSub":
            return _(t, o);
          case "Letter":
            if (!i || "integral" !== i.type) return _(t, o);
            if ("d" != o.val) return _(t, o);
            var u = E(e, t + 1, i),
              p = u.endIndex,
              f = u.token;
            if ("Letter" === f.type || "Cmd" === f.type) {
              var h = c(n.joinSpans(o.span, f.span), f.val);
              return _(p, h);
            }
            return _(t, o);
          case "LeftRight":
            var d = o.left,
              m = r.leftTable[d.val] || "Err",
              g = n.joinSpans(o.span, d.span);
            return _(t, l(m, g, d.val));
          case "OperatorName":
            for (var y = [], v = 0, b = o.arg.args; v < b.length; v++) {
              var x = b[v];
              if ("Letter" !== x.type)
                return _(t, l("Err", o.span, n.slice(o.arg.span)));
              y.push(x.val);
            }
            var M = "\\" + y.join(""),
              I = r.commandTable[M] || "Cmd";
            return _(t, l(I, o.span, M));
          case "Cmd":
            var P = r.commandTable[o.val] || "Cmd";
            return _(t, l(P, o.span, o.val));
          case "EscapedSymbol":
            var C = r.escapedSymbolTable[o.val] || "Err";
            return _(t, l(C, o.span, o.val));
          case "Symbol":
            if (T(o)) return S(e, t);
            var D = r.symbolTable[o.val] || "Err";
            return _(t, l(D, o.span, o.val));
          case "Digit":
            return w(e, t);
          default:
            var O = o;
            throw "Unexpected atom " + O.type + ".";
        }
      }
      function S(e, t) {
        var i = e.args[t];
        if ("Symbol" !== i.type || "." !== i.val)
          throw new Error("Programming Error: expected '.'");
        if (t + 2 < e.args.length && T(e.args[t + 1]) && T(e.args[t + 2])) {
          var a = n.joinSpans(i.span, e.args[t + 2].span);
          return _(t + 2, l("...", a, n.slice(a)));
        }
        if (t + 1 < e.args.length && "Digit" === e.args[t + 1].type)
          return w(e, t);
        var s = r.symbolTable[i.val] || "Err";
        return _(t, l(s, i.span, i.val));
      }
      function w(e, t) {
        var r = M(e, t);
        if (r) return r;
        for (
          var i = e.args, a = e.args[t].span, s = [], o = !1, u = !1;
          t < i.length;
          t++
        ) {
          var c = i[t];
          if ("Digit" === c.type) ((o = !0), s.push(c.val));
          else {
            if (u || !T(c)) break;
            if (t + 1 < i.length && T(e.args[t + 1])) break;
            ((u = !0), s.push("."));
          }
        }
        if (!o)
          throw new Error(
            "Programming Error: decimals must have at least one digit.",
          );
        var p = n.joinSpans(a, e.args[t - 1].span);
        return _(t - 1, l("Decimal", p, s.join("")));
      }
      function M(e, t) {
        for (var r = e.args, i = r[t].span, s = []; t < r.length; t++) {
          var o = r[t];
          if ("Digit" !== o.type) break;
          s.push(o.val);
        }
        if (((t = P(r, t)), !(t >= r.length))) {
          var u = r[t];
          if ("Frac" === u.type) {
            for (var c = [], l = [], p = 0, f = u.num.args; p < f.length; p++) {
              var o = f[p];
              if ("Digit" !== o.type) return;
              c.push(o.val);
            }
            for (var h = 0, d = u.den.args; h < d.length; h++) {
              var o = d[h];
              if ("Digit" !== o.type) return;
              l.push(o.val);
            }
            var m = n.joinSpans(i, u.span);
            return _(t, a.MixedNumber(m, s.join(""), c.join(""), l.join("")));
          }
        }
      }
      function I(e) {
        switch (e.type) {
          case "Sqrt":
          case "Frac":
          case "SupSub":
          case "LeftRight":
          case "OperatorName":
          case "Symbol":
          case "Letter":
          case "Digit":
            return !1;
          case "Cmd":
            return "\\space" === e.val;
          case "EscapedSymbol":
            return (
              "\\ " === e.val ||
              "\\:" === e.val ||
              "\\," === e.val ||
              "\\;" === e.val
            );
          default:
            var t = e;
            throw "Unexpected atom " + t.type + ".";
        }
      }
      function P(e, t) {
        for (; t < e.length && I(e[t]); ) t += 1;
        return t;
      }
      function T(e) {
        return "Symbol" === e.type && "." === e.val;
      }
      (Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.Span = i.Span),
        (t.spanStates = o),
        (t.joinState = u),
        (t.lex = p),
        (t.lexAt = f),
        (t.advance = h),
        (t.peek = m),
        (t.beginIntegral = g),
        (t.endIntegral = y),
        (t.isAt = v),
        (t.isDone = b),
        (t.didAdvance = x));
    },
  ),
  define(
    "math/parser/precspec",
    ["require", "exports", "./expression-token-tables"],
    function (e, t, r) {
      "use strict";
      function n(e) {
        return { type: "initial", tokenType: e };
      }
      function i(e) {
        return { type: "l", tokenType: e };
      }
      function a(e) {
        return { type: "r", tokenType: e };
      }
      function s(e) {
        return { type: "la", tokenType: e };
      }
      function o(e) {
        return { type: "ra", tokenType: e };
      }
      function u(e, t) {
        for (var n = 0, i = r.allTokenTypes; n < i.length; n++) {
          var a = i[n];
          if (void 0 === t[a])
            throw new Error(
              "Programming Error: token " +
                a +
                " must be a assigned a " +
                (e + " precedence"),
            );
        }
      }
      function c(e, t, r, n) {
        if (void 0 !== t[r])
          throw new Error(
            "Programming Error: duplicate " + e + " entry for token " + r + ".",
          );
        t[r] = n;
      }
      function l(e) {
        function t(e) {
          return s[e];
        }
        function r(e) {
          return a[e];
        }
        function n(e) {
          var r = i[e];
          return void 0 === r ? t(e) : r;
        }
        for (var i = {}, a = {}, s = {}, o = 0; o < e.length; o++)
          for (var l = e[o], p = 0, f = l; p < f.length; p++) {
            var h = f[p],
              d = h.type,
              m = h.tokenType;
            switch (d) {
              case "initial":
                c("initial", i, m, o);
                break;
              case "l":
                c("left", a, m, o);
                break;
              case "r":
                c("right", s, m, o);
                break;
              case "la":
                (c("left", a, m, o), c("right", s, m, o));
                break;
              case "ra":
                (c("left", a, m, o), c("right", s, m, o - 1));
            }
          }
        return (
          u("left", a),
          u("right", s),
          { rightPrec: t, leftPrec: r, initialPrec: n }
        );
      }
      (Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.initial = n),
        (t.l = i),
        (t.r = a),
        (t.la = s),
        (t.ra = o),
        (t.precSpec = l));
    },
  ),
  define(
    "math/parser/expression-parser",
    [
      "require",
      "exports",
      "./surface-node",
      "./surface-node-error",
      "./input-span",
      "./expression-lexer",
      "./precspec",
    ],
    function (e, t, r, n, i, a, s) {
      "use strict";
      function o(e) {
        var t = u(e);
        return "Err" === t.type && "EmptyGroup" === t.error.type
          ? n.Err(t.span, n.EmptyInput())
          : t;
      }
      function u(e) {
        var t = a.lex(e);
        if (a.isDone(t)) return n.Err(a.spanStates(t, t), n.EmptyGroup());
        var r = l(t, 0),
          i = r.state,
          s = r.tree;
        return "Err" === s.type || a.isDone(i) ? s : w(i).tree;
      }
      function c(e, t) {
        return { state: e, tree: t };
      }
      function l(e, t) {
        var r,
          n,
          i,
          s = e;
        if (((r = f(e)), (e = r.state), (i = r.tree), "Err" === i.type))
          return c(e, i);
        if (!a.didAdvance(s, e))
          throw new Error(
            "Programming Error: parseInitial did not advance state.",
          );
        for (; !a.isDone(e); ) {
          var o = void 0;
          if (
            ((o = a.isAt(e, "(") && !d(i) ? T("(") : P(a.peek(e).type)), t >= o)
          )
            break;
          var u = e;
          if (((n = h(e, i)), (e = n.state), (i = n.tree), "Err" === i.type))
            return c(e, i);
          if (!a.didAdvance(u, e))
            throw new Error(
              "Programming Error: parseSuccessor did not advance state.",
            );
        }
        return c(e, i);
      }
      function p(e) {
        return (
          "UnexpectedDifferential" === e.type ||
          "UnexpectedCloseDelimiter" === e.type ||
          "UnexpectedEnd" === e.type ||
          "BinaryOperatorMissingLeft" === e.type
        );
      }
      function f(e) {
        var t,
          i,
          s,
          o,
          f,
          h,
          d,
          m,
          g,
          v,
          M,
          I,
          T,
          D,
          O,
          N,
          L,
          q,
          A,
          F = e,
          k = a.peek(e),
          V = C(k.type);
        switch (k.type) {
          case "+":
            if (
              ((e = a.advance(e)),
              (t = l(e, V)),
              (e = t.state),
              (A = t.tree),
              "Err" === A.type)
            ) {
              if (!p(A.error)) return c(e, A);
              var j = a.spanStates(F, e),
                B = n.Err(j, n.UnaryOperatorMissingRight(k.type));
              return c(e, B);
            }
            return c(e, r.Pos(a.spanStates(F, e), [A]));
          case "-":
            if (
              ((e = a.advance(e)),
              (i = l(e, V)),
              (e = i.state),
              (A = i.tree),
              "Err" === A.type)
            ) {
              if (!p(A.error)) return c(e, A);
              var j = a.spanStates(F, e),
                B = n.Err(j, n.UnaryOperatorMissingRight(k.type));
              return c(e, B);
            }
            return c(e, r.Neg(a.spanStates(F, e), [A]));
          case "(":
            return _(e);
          case "\\{":
            return (
              (e = a.advance(e)),
              a.isAt(e, "\\}")
                ? ((e = a.advance(e)),
                  c(e, r.EmptyPiecewise(a.spanStates(F, e))))
                : ((s = l(e, V)),
                  (e = s.state),
                  (A = s.tree),
                  (o = S(F, e, A, "\\{", "\\}")),
                  (e = o.state),
                  (A = o.tree),
                  "Err" === A.type
                    ? c(e, A)
                    : c(e, r.Piecewise(a.spanStates(F, e), [A])))
            );
          case "[":
            if (((e = a.advance(e)), a.isAt(e, "]"))) {
              e = a.advance(e);
              var j = a.spanStates(F, e);
              return c(e, n.Err(j, n.EmptySquareBracket()));
            }
            return (
              (f = l(e, V)),
              (e = f.state),
              (A = f.tree),
              (h = S(F, e, A, "[", "]")),
              (e = h.state),
              (A = h.tree),
              "Err" === A.type ? c(e, A) : c(e, r.List(a.spanStates(F, e), [A]))
            );
          case "(|":
            if (((e = a.advance(e)), a.isAt(e, "|)"))) {
              e = a.advance(e);
              var j = a.spanStates(F, e);
              return c(e, n.Err(j, n.EmptyPipe()));
            }
            return (
              (d = l(e, V)),
              (e = d.state),
              (A = d.tree),
              (m = S(F, e, A, "(|", "|)")),
              (e = m.state),
              (A = m.tree),
              "Err" === A.type
                ? c(e, A)
                : c(e, r.Pipes(a.spanStates(F, e), [A]))
            );
          case "Frac":
            e = a.advance(e);
            var R = u(k.num),
              z = u(k.den);
            if (
              "Err" === R.type &&
              "EmptyGroup" === R.error.type &&
              "Err" === z.type &&
              "EmptyGroup" === z.error.type
            ) {
              var j = a.spanStates(F, e),
                B = n.Err(j, n.FractionEmpty());
              return c(e, B);
            }
            if ("Err" === R.type && "EmptyGroup" === R.error.type) {
              var j = a.spanStates(F, e),
                B = n.Err(j, n.FractionMissingNumerator());
              return c(e, B);
            }
            if ("Err" === z.type && "EmptyGroup" === z.error.type) {
              var j = a.spanStates(F, e),
                B = n.Err(j, n.FractionMissingDenominator());
              return c(e, B);
            }
            if ("Err" === R.type) return c(e, R);
            if ("Err" === z.type) return c(e, z);
            if (r.isDerivative(R, z) && "Juxt" === z.type) {
              var G = z.args[1],
                U = void 0;
              if (
                ((g = l(e, P("*") - 1)),
                (e = g.state),
                (U = g.tree),
                "Err" === U.type)
              ) {
                if (p(U.error)) {
                  var j = a.spanStates(F, e);
                  return c(e, n.Err(j, n.DerivativeMissingBody()));
                }
                return c(e, U);
              }
              return c(e, r.Derivative(a.spanStates(F, e), [G, U]));
            }
            return c(e, r.Frac(a.spanStates(F, e), [R, z]));
          case "Sqrt":
            if (((e = a.advance(e)), k.optArg)) {
              var Y = u(k.optArg);
              if ("Err" === Y.type)
                return "EmptyGroup" === Y.error.type
                  ? c(e, n.Err(Y.span, n.EmptyRadicand()))
                  : c(e, Y);
              var W = u(k.arg);
              return "Err" === W.type
                ? "EmptyGroup" === W.error.type
                  ? c(e, n.Err(W.span, n.EmptyRadical()))
                  : c(e, W)
                : c(e, r.Nthroot(a.spanStates(F, e), [Y, W]));
            }
            var W = u(k.arg);
            return "Err" === W.type
              ? "EmptyGroup" === W.error.type
                ? c(e, n.Err(W.span, n.EmptyRadical()))
                : c(e, W)
              : c(e, r.Sqrt(a.spanStates(F, e), [W]));
          case "Trig":
          case "Ln":
            e = a.advance(e);
            var X = r.Cmd(a.spanStates(F, e), k.val),
              Q = 0,
              J = a.peek(e);
            if ("SupSub" === J.type) {
              if (((e = a.advance(e)), J.sub)) {
                var j = a.spanStates(F, e),
                  B = n.Err(j, n.UnexpectedSubscript(X.val));
                return c(e, B);
              }
              var Z = b(J);
              if (Z) {
                if ("Err" === Z.type) return c(e, Z);
                X = r.Superscript(a.spanStates(F, e), [X, Z]);
              }
              Q = J.nprimes;
            }
            var H = a.isAt(e, "(");
            if (H) {
              if (((v = _(e)), (e = v.state), (A = v.tree), "Err" === A.type))
                return c(e, A);
              A = r.Call(a.spanStates(F, e), [X, A.args[0]]);
            } else {
              if (
                ((M = l(e, V - 1)),
                (e = M.state),
                (A = M.tree),
                "Err" === A.type)
              )
                return p(A.error)
                  ? c(
                      e,
                      n.Err(
                        a.spanStates(F, e),
                        n.FunctionMissingArgument(k.val),
                      ),
                    )
                  : c(e, A);
              A = r.ImplicitCall(a.spanStates(F, e), [X, A]);
            }
            if (Q > 0) {
              var j = a.spanStates(F, e);
              if (!H) {
                var B = n.Err(j, n.PrimeWithoutParen());
                return c(e, B);
              }
              A = r.Prime(j, Q, [A]);
            }
            return c(e, A);
          case "Log":
            e = a.advance(e);
            var X = r.Cmd(a.spanStates(F, e), k.val),
              Q = 0,
              K = void 0,
              Z = void 0,
              J = a.peek(e);
            if (
              ("SupSub" === J.type &&
                ((e = a.advance(e)), (K = y(J)), (Z = b(J)), (Q = J.nprimes)),
              K && "Err" === K.type)
            )
              return c(e, K);
            if (Z && "Err" === Z.type) return c(e, Z);
            var H = a.isAt(e, "(");
            if (H) {
              if (((I = _(e)), (e = I.state), (A = I.tree), "Err" === A.type))
                return c(e, A);
              A = A.args[0];
            } else if (
              ((T = l(e, V - 1)), (e = T.state), (A = T.tree), "Err" === A.type)
            )
              return p(A.error)
                ? c(
                    e,
                    n.Err(a.spanStates(F, e), n.FunctionMissingArgument(k.val)),
                  )
                : c(e, A);
            var $ = K ? r.Seq(a.spanStates(F, e), [A, K]) : A,
              ee = K ? r.Cmd(a.spanStates(F, e), "\\logbase") : X;
            if (
              (Z && (ee = r.Superscript(a.spanStates(F, e), [ee, Z])),
              (A = H
                ? r.Call(a.spanStates(F, e), [ee, $])
                : r.ImplicitCall(a.spanStates(F, e), [ee, $])),
              Q > 0)
            ) {
              var j = a.spanStates(F, e);
              if (!H) {
                var B = n.Err(j, n.PrimeWithoutParen());
                return c(e, B);
              }
              A = r.Prime(j, Q, [A]);
            }
            return c(e, A);
          case "Int":
            e = a.advance(e);
            var J = a.peek(e);
            e = a.advance(e);
            var te = x(J, F, e);
            if ("Err" === te.type)
              return "MissingBound" === te.error.type
                ? c(e, n.Err(te.span, n.IntegralMissingBound()))
                : c(e, te);
            var Z = te.sup,
              K = te.sub,
              G = void 0;
            if (a.isAt(e, "Differential"))
              return (
                (D = E(e)),
                (e = D.state),
                (G = D.tree),
                "Err" === G.type
                  ? c(e, G)
                  : c(e, r.EmptyIntegral(a.spanStates(F, e), [G, K, Z]))
              );
            if (((O = l(e, V)), (e = O.state), (A = O.tree), "Err" === A.type))
              return p(A.error)
                ? c(e, n.Err(A.span, n.IntegralMissingBody()))
                : c(e, A);
            var re = A;
            return a.isAt(e, "Differential")
              ? ((N = E(e)),
                (e = N.state),
                (G = N.tree),
                "Err" === G.type
                  ? c(e, G)
                  : c(e, r.Integral(a.spanStates(F, e), [G, K, Z, re])))
              : c(
                  e,
                  n.Err(a.spanStates(F, e), n.IntegralMissingDifferential()),
                );
          case "Sum":
            e = a.advance(e);
            var J = a.peek(e);
            e = a.advance(e);
            var te = x(J, F, e);
            if ("Err" === te.type)
              return "MissingBound" === te.error.type
                ? c(e, n.Err(te.span, n.SumMissingBound()))
                : c(e, te);
            var Z = te.sup,
              K = te.sub;
            return (
              (L = l(e, V)),
              (e = L.state),
              (A = L.tree),
              "Err" === A.type
                ? p(A.error)
                  ? c(e, n.Err(A.span, n.SumMissingBody()))
                  : c(e, A)
                : c(e, r.Sum(a.spanStates(F, e), [A, K, Z]))
            );
          case "Prod":
            e = a.advance(e);
            var J = a.peek(e);
            e = a.advance(e);
            var te = x(J, F, e);
            if ("Err" === te.type)
              return "MissingBound" === te.error.type
                ? c(e, n.Err(te.span, n.ProductMissingBound()))
                : c(e, te);
            var Z = te.sup,
              K = te.sub;
            return (
              (q = l(e, V)),
              (e = q.state),
              (A = q.tree),
              "Err" === A.type
                ? p(A.error)
                  ? c(e, n.Err(A.span, n.ProductMissingBody()))
                  : c(e, A)
                : c(e, r.Product(a.spanStates(F, e), [A, K, Z]))
            );
          case "Cmd":
            return (
              (e = a.advance(e)),
              (A = r.Cmd(a.spanStates(F, e), k.val)),
              c(e, A)
            );
          case "Letter":
            return (
              (e = a.advance(e)),
              (A = r.Letter(a.spanStates(F, e), k.val)),
              c(e, A)
            );
          case "Decimal":
            return (
              (e = a.advance(e)),
              c(e, r.Decimal(a.spanStates(F, e), k.val))
            );
          case "MixedNumber":
            return ((e = a.advance(e)), c(e, k));
          case "*":
          case "/":
          case ",":
          case "=":
          case ">":
          case "<":
          case ">=":
          case "<=":
          case "~":
          case ":":
          case "...":
          case "%":
            e = a.advance(e);
            var j = a.spanStates(F, e),
              B = n.Err(j, n.BinaryOperatorMissingLeft(k.type));
            return c(e, B);
          case "!":
          case "SupSub":
            e = a.advance(e);
            var j = a.spanStates(F, e),
              B = n.Err(j, n.UnaryOperatorMissingLeft(k.type));
            return c(e, B);
          case ")":
          case "\\}":
          case "]":
          case "|)":
          case "Differential":
            return w(e);
          case "Err":
            e = a.advance(e);
            var j = a.spanStates(F, e),
              B = n.Err(j, n.UnrecognizedSymbol(k.val));
            return c(e, B);
          case "End":
            var j = a.spanStates(F, e),
              B = n.Err(j, n.UnexpectedEnd());
            return c(e, B);
          default:
            var ne = k;
            throw "Unexpected token type " + ne.type + ".";
        }
      }
      function h(e, t) {
        var i,
          s,
          o,
          u,
          f,
          h,
          d,
          y,
          x,
          E,
          M,
          I,
          P,
          C,
          D,
          O = a.peek(e),
          N = T(O.type);
        switch (O.type) {
          case "+":
          case "-":
          case "*":
          case "/":
          case "=":
          case "~":
          case ":":
            if (
              ((e = a.advance(e)),
              (i = l(e, N)),
              (e = i.state),
              (D = i.tree),
              "Err" === D.type)
            ) {
              if (p(D.error)) {
                var L = a.joinState(t.span, e),
                  q = n.Err(L, n.BinaryOperatorMissingRight(O.type));
                return c(e, q);
              }
              return c(e, D);
            }
            return c(e, m(O.type, a.joinState(t.span, e), [t, D]));
          case "%":
            e = a.advance(e);
            var A = a.peek(e);
            if ("Cmd" !== A.type || ("of" !== A.val && "\\of" !== A.val)) {
              var q = n.Err(O.span, n.PercentMissingOf());
              return c(e, q);
            }
            if (
              ((e = a.advance(e)),
              (s = l(e, N)),
              (e = s.state),
              (D = s.tree),
              "Err" === D.type)
            ) {
              if (p(D.error)) {
                var L = a.joinState(t.span, e),
                  q = n.Err(L, n.BinaryOperatorMissingRight(O.type));
                return c(e, q);
              }
              return c(e, D);
            }
            return c(e, r.PercentOf(a.joinState(t.span, e), [t, D]));
          case ">=":
          case "<=":
          case ">":
          case "<":
            var F = O.type;
            if (
              ((e = a.advance(e)),
              (o = g(e, F)),
              (e = o.state),
              (F = o.symbol),
              (u = l(e, N)),
              (e = u.state),
              (D = u.tree),
              "Err" === D.type)
            ) {
              if (p(D.error)) {
                var L = a.joinState(t.span, e),
                  q = n.Err(L, n.BinaryOperatorMissingRight(O.type));
                return c(e, q);
              }
              return c(e, D);
            }
            for (
              var k = r.Inequality(a.joinState(t.span, e), F, [t, D]),
                V = [],
                j = a.peek(e).type;
              ">=" === j || "<=" === j || ">" === j || "<" === j;

            ) {
              var B = e;
              if (
                ((F = j),
                (e = a.advance(e)),
                (f = g(e, F)),
                (e = f.state),
                (F = f.symbol),
                (h = l(e, N)),
                (e = h.state),
                (D = h.tree),
                "Err" === D.type)
              ) {
                if (p(D.error)) {
                  var L = a.joinState(t.span, e),
                    q = n.Err(L, n.BinaryOperatorMissingRight(O.type));
                  return c(e, q);
                }
                return c(e, D);
              }
              (V.push(r.TrailingInequalityPiece(a.spanStates(B, e), F, [D])),
                (j = a.peek(e).type));
            }
            return V.length
              ? c(e, r.InequalityChain(a.joinState(t.span, e), k, V))
              : c(e, k);
          case "!":
            return (
              (e = a.advance(e)),
              c(e, r.Bang(a.joinState(t.span, e), [t]))
            );
          case "[":
            var B = e;
            if (((e = a.advance(e)), a.isAt(e, "]"))) {
              e = a.advance(e);
              var L = a.spanStates(B, e);
              return c(e, n.Err(L, n.EmptySquareBracket()));
            }
            return (
              (d = l(e, N)),
              (e = d.state),
              (D = d.tree),
              (y = S(B, e, D, "[", "]")),
              (e = y.state),
              (D = y.tree),
              "Err" === D.type
                ? c(e, D)
                : c(e, r.Index(a.joinState(t.span, e), [t, D]))
            );
          case "Sqrt":
          case "Frac":
          case "Letter":
          case "Cmd":
          case "Trig":
          case "Ln":
          case "Log":
          case "Sum":
          case "Int":
          case "Prod":
          case "Decimal":
          case "MixedNumber":
          case "\\{":
          case "(|":
            return (
              (x = l(e, N)),
              (e = x.state),
              (D = x.tree),
              "Err" === D.type
                ? c(e, D)
                : c(e, r.Juxt(a.joinState(t.span, e), [t, D]))
            );
          case "(":
            if (r.isIdentifier(t))
              return (
                (E = _(e)),
                (e = E.state),
                (D = E.tree),
                "Err" === D.type
                  ? c(e, D)
                  : c(e, r.Call(a.joinState(t.span, e), [t, D.args[0]]))
              );
            if ("Prime" === t.type && r.isIdentifier(t.args[0])) {
              if (((M = _(e)), (e = M.state), (D = M.tree), "Err" === D.type))
                return c(e, D);
              var L = a.joinState(t.span, e);
              return c(
                e,
                r.Prime(L, t.nprimes, [r.Call(L, [t.args[0], D.args[0]])]),
              );
            }
            return (
              (I = l(e, N)),
              (e = I.state),
              (D = I.tree),
              "Err" === D.type
                ? c(e, D)
                : c(e, r.Juxt(a.joinState(t.span, e), [t, D]))
            );
          case "SupSub":
            e = a.advance(e);
            var R = v(O),
              z = b(O);
            if (R && "Err" === R.type) return c(e, R);
            if (z && "Err" === z.type) return c(e, z);
            if (
              (R && (t = r.Subscript(a.joinState(t.span, e), [t, R])),
              z && (t = r.Superscript(a.joinState(t.span, e), [t, z])),
              O.nprimes > 0)
            ) {
              var L = a.joinState(t.span, e);
              if (!r.isIdentifier(t)) {
                var q = n.Err(L, n.UnexpectedPrime());
                return c(e, q);
              }
              t = r.Prime(L, O.nprimes, [t]);
            }
            return c(e, t);
          case ",":
            for (
              var G = [t];
              a.isAt(e, ",") && ((e = a.advance(e)), !a.isAt(e, "..."));

            ) {
              if (
                ((P = l(e, N)), (e = P.state), (D = P.tree), "Err" === D.type)
              ) {
                if (p(D.error)) {
                  var L = a.joinState(t.span, e),
                    q = n.Err(L, n.BinaryOperatorMissingRight(O.type));
                  return c(e, q);
                }
                return c(e, D);
              }
              G.push(D);
            }
            return c(e, r.Seq(a.joinState(t.span, e), G));
          case "...":
            if (
              ((e = a.advance(e)),
              a.isAt(e, ",") && (e = a.advance(e)),
              (C = l(e, N)),
              (e = C.state),
              (D = C.tree),
              "Err" === D.type)
            ) {
              if (p(D.error)) {
                var L = a.joinState(t.span, e),
                  q = n.Err(L, n.BinaryOperatorMissingRight(O.type));
                return c(e, q);
              }
              return c(e, D);
            }
            return c(e, r.Ellipsis(a.joinState(t.span, e), [t, D]));
          case "]":
          case ")":
          case "\\}":
          case "|)":
          case "Differential":
            return w(e);
          case "Err":
            return l(e, N);
          case "End":
            var L = a.spanStates(e, e),
              q = n.Err(L, n.UnexpectedEnd());
            return c(e, q);
          default:
            var U = O;
            throw "Unexpected token type " + U.type + ".";
        }
      }
      function d(e) {
        return (
          !!r.isIdentifier(e) ||
          !("Prime" !== e.type || !r.isIdentifier(e.args[0]))
        );
      }
      function m(e, t, n) {
        switch (e) {
          case "+":
            return r.Add(t, n);
          case "-":
            return r.Sub(t, n);
          case "*":
            return r.Mul(t, n);
          case "/":
            return r.Div(t, n);
          case "=":
            return r.Equals(t, n);
          case "~":
            return r.Tilde(t, n);
          case ":":
            return r.Colon(t, n);
          default:
            var i = e;
            throw "Unexpected token type " + i + ".";
        }
      }
      function g(e, t) {
        if (!a.isAt(e, "=")) return { state: e, symbol: t };
        switch (t) {
          case ">":
            ((e = a.advance(e)), (t = ">="));
            break;
          case "<":
            ((e = a.advance(e)), (t = "<="));
        }
        return { state: e, symbol: t };
      }
      function y(e) {
        if (e.sub) {
          var t = e.sub,
            r = u(t);
          return "Err" === r.type && "EmptyGroup" === r.error.type
            ? n.Err(r.span, n.EmptySubscript())
            : r;
        }
      }
      function v(e) {
        if (e.sub) {
          var t = e.sub;
          if (0 === t.args.length) return n.Err(t.span, n.EmptySubscript());
          for (var a = [], s = 0, o = t.args; s < o.length; s++) {
            var u = o[s];
            if ("Digit" !== u.type && "Letter" !== u.type) {
              var c = u.span,
                l = n.Err(c, n.InvalidSubscript(i.slice(c)));
              return l;
            }
            a.push(u.val);
          }
          return r.Alphanumeric(t.span, a.join(""));
        }
      }
      function b(e) {
        if (e.sup) {
          var t = u(e.sup);
          return "Err" === t.type
            ? "EmptyGroup" === t.error.type
              ? n.Err(t.span, n.EmptySuperscript())
              : t
            : e.nprimes > 0
              ? n.Err(e.span, n.SuperscriptWithPrime())
              : t;
        }
      }
      function x(e, t, r) {
        if ("SupSub" !== e.type) {
          var i = a.spanStates(t, r);
          return n.Err(i, n.MissingBound());
        }
        if (e.nprimes > 0) {
          var i = a.spanStates(t, r);
          return n.Err(i, n.UnexpectedPrime());
        }
        var s = y(e),
          o = b(e);
        if (
          !s ||
          ("Err" === s.type && "EmptySubscript" === s.error.type) ||
          !o ||
          ("Err" === o.type && "EmptySuperscript" === o.error.type)
        ) {
          var i = a.spanStates(t, r);
          return n.Err(i, n.MissingBound());
        }
        return "Err" === s.type
          ? s
          : "Err" === o.type
            ? o
            : { type: "Bounds", sup: o, sub: s };
      }
      function _(e) {
        var t,
          i,
          s = e,
          o = a.peek(e),
          u = C(o.type);
        if (!a.isAt(e, "("))
          throw new Error(
            "Programming Error: expected '(' at start of parseParen.",
          );
        if (((e = a.advance(e)), a.isAt(e, ")"))) {
          e = a.advance(e);
          var p = a.spanStates(s, e);
          return c(e, n.Err(p, n.EmptyParen()));
        }
        var f;
        return (
          (t = l(e, u)),
          (e = t.state),
          (f = t.tree),
          (i = S(s, e, f, "(", ")")),
          (e = i.state),
          (f = i.tree),
          "Err" === f.type ? c(e, f) : c(e, r.Paren(a.spanStates(s, e), [f]))
        );
      }
      function E(e) {
        var t = e,
          i = a.peek(e);
        if ("Differential" !== i.type)
          throw new Error("Programming Error: expected differential");
        e = a.advance(e);
        var s = r.Cmd(i.span, i.val),
          o = a.peek(e);
        if ("SupSub" === o.type) {
          e = a.advance(e);
          var u = a.spanStates(t, e),
            l = v(o);
          if (l) {
            if ("Err" === l.type) return c(e, l);
            s = r.Subscript(u, [s, l]);
          }
          if (o.sup) return c(e, n.Err(u, n.DifferentialWithSuperscript()));
          if (o.nprimes > 0) return c(e, n.Err(u, n.UnexpectedPrime()));
        }
        return c(e, s);
      }
      function S(e, t, r, i, s) {
        if ("Err" === r.type && "UnexpectedEnd" !== r.error.type)
          return c(t, r);
        if ("Err" === r.type || !a.isAt(t, s)) {
          var o = a.spanStates(e, t),
            u = n.Err(o, n.MissingCloseDelimiter(i, s));
          return c(t, u);
        }
        return ((t = a.advance(t)), c(t, r));
      }
      function w(e) {
        var t = e,
          r = a.peek(e);
        switch (r.type) {
          case ")":
            e = a.advance(e);
            var i = a.spanStates(t, e);
            return c(e, n.Err(i, n.UnexpectedCloseDelimiter("(", ")")));
          case "]":
            e = a.advance(e);
            var i = a.spanStates(t, e);
            return c(e, n.Err(i, n.UnexpectedCloseDelimiter("[", "]")));
          case "\\}":
            e = a.advance(e);
            var i = a.spanStates(t, e);
            return c(e, n.Err(i, n.UnexpectedCloseDelimiter("\\{", "\\}")));
          case "|)":
            e = a.advance(e);
            var i = a.spanStates(t, e);
            return c(e, n.Err(i, n.UnexpectedCloseDelimiter("|", "|")));
          case "Differential":
            e = a.advance(e);
            var i = a.spanStates(t, e);
            return c(e, n.Err(i, n.UnexpectedDifferential()));
          default:
            e = a.advance(e);
            var i = a.spanStates(t, e);
            return c(e, n.Err(i, n.UnexpectedParseError()));
        }
      }
      Object.defineProperty(t, "__esModule", { value: !0 });
      var M = [
          [
            s.initial("("),
            s.la(")"),
            s.initial("\\{"),
            s.la("\\}"),
            s.r("["),
            s.la("]"),
            s.initial("(|"),
            s.la("|)"),
            s.la("Differential"),
            s.la("End"),
          ],
          [s.ra("...")],
          [s.la(",")],
          [s.ra(":")],
          [s.la("="), s.la(">"), s.la("<"), s.la(">="), s.la("<="), s.la("~")],
          [s.la("+"), s.la("-")],
          [
            s.la("*"),
            s.la("/"),
            s.la("Decimal"),
            s.la("MixedNumber"),
            s.la("Letter"),
            s.la("Cmd"),
            s.la("%"),
            s.r("("),
            s.la("\\{"),
            s.la("(|"),
            s.la("Frac"),
            s.la("Sqrt"),
            s.la("Trig"),
            s.la("Ln"),
            s.la("Log"),
            s.ra("Int"),
            s.ra("Sum"),
            s.ra("Prod"),
          ],
          [s.initial("+"), s.initial("-")],
          [s.l("("), s.l("[")],
          [s.la("!")],
          [s.la("SupSub")],
          [s.la("Err")],
        ],
        I = s.precSpec(M),
        P = I.leftPrec,
        T = I.rightPrec,
        C = I.initialPrec;
      t.parse = o;
    },
  ),
  define("math/inverses", [], function () {
    var e = {},
      t = [
        "sin",
        "cos",
        "tan",
        "cot",
        "sec",
        "csc",
        "sinh",
        "cosh",
        "tanh",
        "coth",
        "sech",
        "csch",
      ];
    return (
      t.forEach(function (t) {
        ((e[t] = "arc" + t), (e["arc" + t] = t));
      }),
      e
    );
  }),
  define(
    "math/parser/lower",
    [
      "require",
      "exports",
      "math/inverses",
      "math/errormsg",
      "./input-span",
      "./surface-node",
    ],
    function (e, t, r, n, i, a) {
      "use strict";
      function s(e, t) {
        return u(e, t);
      }
      function o(e, t) {
        for (var r = [], n = 0; n < t.length; n++) r.push(f(e, t[n]));
        return r;
      }
      function u(e, t) {
        return e.setInput(c(e, t), i.slice(t.span));
      }
      function c(e, t) {
        var r = e.nodes;
        switch (t.type) {
          case "Equals":
            var i = t.args,
              s = i[0],
              u = i[1];
            if ("Call" === s.type) {
              var c = s.args,
                d = c[0],
                m = c[1],
                g = p(m);
              if (a.isIdentifier(d) && g.every(a.isIdentifier))
                return r.FunctionDefinition(f(e, d), o(e, g), f(e, u));
            } else if (a.isIdentifier(s)) return r.Assignment(f(e, s), f(e, u));
            return r.Equation(f(e, s), f(e, u));
          case "Tilde":
            var y = o(e, t.args),
              s = y[0],
              u = y[1];
            return r.Regression(s, u);
          case "Inequality":
            return E(e, t);
          case "InequalityChain":
            if (t.chain.length > 1) throw n.inequalityChainTooLong();
            var v = t.first,
              b = v.symbol,
              x = v.args,
              _ = x[0],
              S = x[1],
              w = t.chain[0],
              M = w.symbol,
              P = w.args[0];
            return a.isIdentifier(S)
              ? r.DoubleInequality([f(e, _), b, f(e, S), M, f(e, P)])
              : E(e, t);
          case "Seq":
            if (!t.args.every(l)) throw n.malformedPoint();
            return r.List(o(e, t.args));
          case "Call":
            var T = t.args,
              C = T[0],
              D = T[1];
            return I(C) ? r.Polygon(o(e, p(D))) : h(e, t);
          default:
            return h(e, t);
        }
      }
      function l(e) {
        if ("Paren" !== e.type) return !1;
        var t = e.args[0];
        return "Seq" === t.type && 2 === t.args.length;
      }
      function p(e) {
        return "Seq" === e.type ? e.args : [e];
      }
      function f(e, t) {
        return e.setInput(h(e, t), i.slice(t.span));
      }
      function h(e, t) {
        var r = e.nodes;
        switch (t.type) {
          case "Pos":
            return h(e, t.args[0]);
          case "Neg":
            for (var i = -1, s = t.args[0]; ; )
              if ("Pos" === s.type || "Paren" === s.type) s = s.args[0];
              else {
                if ("Neg" !== s.type) break;
                ((s = s.args[0]), (i *= -1));
              }
            switch (s.type) {
              case "Decimal":
                return r.Constant(i * w(s));
              case "MixedNumber":
                return r.Constant(i * M(s));
              default:
                return i === -1 ? r.Negative([f(e, s)]) : h(e, s);
            }
          case "Add":
            return r.Add(o(e, t.args));
          case "Sub":
            return r.Subtract(o(e, t.args));
          case "Mul":
            return r.Multiply(o(e, t.args));
          case "Div":
            return r.Divide(o(e, t.args));
          case "Bang":
            return r.FunctionCall("\\factorial", o(e, t.args));
          case "PercentOf":
            return r.PercentOf(o(e, t.args));
          case "Call":
            return v(e, t);
          case "ImplicitCall":
            return (S(t), v(e, t));
          case "Prime":
            var u = t.args[0];
            if ("Call" === u.type) {
              var c = u.args,
                l = c[0],
                d = c[1],
                m = p(d).length;
              if ("Cmd" === l.type && "logbase" === l.val) {
                if (2 !== m) throw n.primedFunctionArity();
              } else if (1 !== m) throw n.primedFunctionArity();
              return r.Prime(t.nprimes, o(e, t.args));
            }
            throw "ImplicitCall" === u.type
              ? n.primeWithoutParen()
              : n.unexpectedPrime();
          case "Index":
            return r.ListAccess(o(e, t.args));
          case "Paren":
            var g = t.args[0];
            return "Seq" === g.type
              ? 2 === g.args.length
                ? r.OrderedPair(o(e, g.args))
                : n.nonPairTuple()
              : h(e, g);
          case "List":
            var y = t.args[0];
            if ("Ellipsis" === y.type) {
              var _ = y.args,
                E = _[0],
                I = _[1];
              return r.Range([r.List(o(e, p(E))), r.List(o(e, p(I)))]);
            }
            return r.List(o(e, p(y)));
          case "Pipes":
            return r.FunctionCall("\\abs", o(e, t.args));
          case "Subscript":
            var C = t.args,
              D = C[0],
              O = C[1];
            if (0 === O.val.length) throw n.emptySubscript();
            var N = void 0;
            switch (D.type) {
              case "Letter":
                N = D.val;
                break;
              case "Cmd":
                N = D.val;
                break;
              default:
                throw n.unexpectedSubscript();
            }
            return r.Identifier(N + "_" + O.val);
          case "Superscript":
            var L = t.args,
              D = L[0],
              q = L[1];
            return "Call" !== D.type || "Seq" === D.args[1].type || P(D)
              ? r.Exponent(o(e, t.args))
              : r.FunctionExponent(o(e, [D.args[0], D.args[1], q]));
          case "Sqrt":
            return r.FunctionCall("sqrt", o(e, t.args));
          case "Nthroot":
            return r.FunctionCall("nthroot", o(e, [t.args[1], t.args[0]]));
          case "Frac":
            return r.Divide(o(e, t.args));
          case "Derivative":
            var A = o(e, t.args);
            if (!a.isIdentifier(t.args[0])) throw n.parseError();
            return r.Derivative(A[0], [A[1]]);
          case "Integral":
            var F = t.args,
              k = F[0],
              V = F[1],
              j = F[2],
              B = F[3],
              A = o(e, [k, V, j, B]);
            return r.Integral(A);
          case "EmptyIntegral":
            var R = o(e, t.args),
              k = R[0],
              z = R[1],
              j = R[2],
              B = r.Constant(1);
            return r.Integral([k, z, j, B]);
          case "Sum":
            var G = t.args,
              U = G[0],
              Y = G[1],
              j = G[2];
            if ("Equals" != Y.type) throw n.incorrectSumLowerBound();
            if (!a.isIdentifier(Y.args[0])) throw n.incorrectSumLowerBound();
            var A = o(e, [Y.args[0], Y.args[1], j, U]);
            return r.Sum(A);
          case "Product":
            var W = t.args,
              X = W[0],
              Q = W[1],
              j = W[2];
            if ("Equals" != Q.type) throw n.incorrectProductLowerBound();
            if (!a.isIdentifier(Q.args[0]))
              throw n.incorrectProductLowerBound();
            var A = o(e, [Q.args[0], Q.args[1], j, X]);
            return r.Product(A);
          case "Juxt":
            return b(e, t);
          case "Letter":
            return r.Identifier(t.val);
          case "Cmd":
            var J = t.val;
            if ("ans" === J) {
              if (void 0 === e.currentIndex) throw n.badAnsContext();
              return r.Ans("ans_{" + (e.currentIndex - 1) + "}");
            }
            return r.Identifier(J);
          case "Decimal":
            return r.Constant(w(t));
          case "MixedNumber":
            return r.Constant(M(t));
          case "Piecewise":
            return x(e, t);
          case "EmptyPiecewise":
            if (!r.Piecewise.empty) throw n.featureUnavailable();
            return r.Piecewise.empty();
          case "Equals":
            throw n.unexpectedSymbol("=");
          case "Inequality":
          case "InequalityChain":
            throw n.unexpectedInequality();
          case "Tilde":
            throw n.unexpectedSymbol("~");
          case "Seq":
            throw n.unexpectedSymbol(",");
          case "Colon":
            throw n.unexpectedSymbol(":");
          case "Ellipsis":
            throw n.unexpectedSymbol("...");
          case "Err":
            throw T(t.error);
          default:
            var Z = t;
            throw "Unexpected surface node " + Z.type + ".";
        }
      }
      function d(e) {
        return r.hasOwnProperty(e);
      }
      function m(e) {
        return "ln" === e || "log" === e || "logbase" === e;
      }
      function g(e) {
        return "Decimal" === e.type && "2" === e.val;
      }
      function y(e) {
        return (
          "Neg" === e.type &&
          ((e = e.args[0]), "Decimal" === e.type && "1" === e.val)
        );
      }
      function v(e, t) {
        var i = e.nodes,
          s = t.args,
          u = s[0],
          c = s[1],
          l = f(e, u),
          h = p(c),
          v = o(e, h);
        if (I(u)) throw n.unexpectedSymbol("polygon");
        if (a.isIdentifier(u)) return i.FunctionCall(l, v);
        if ("Superscript" === u.type) {
          var b = u.args,
            x = b[0],
            _ = b[1];
          if ("Cmd" === x.type) {
            var E = x.val;
            if (d(E) || m(E)) {
              if (g(_)) return i.Exponent([i.FunctionCall(E, v), f(e, _)]);
              if (y(_) && void 0 !== r[E]) return i.FunctionCall(r[E], v);
              throw d(E)
                ? n.badTrigExponent(E)
                : n.badLogExponent("logbase" === E ? "log" : E);
            }
          }
        }
        return i.Multiply([l, f(e, c)]);
      }
      function b(e, t) {
        var r = e.nodes,
          i = r.Multiply(o(e, t.args));
        if (!a.isOkForImplicitMultiply(t.args[1]))
          throw n.badImplicitMultiply();
        return i;
      }
      function x(e, t) {
        var r,
          i = e.nodes,
          a = t.args[0],
          s = p(a),
          o = [];
        e: for (r = 0; r < s.length; r++) {
          var u = s[r];
          switch (u.type) {
            case "Colon":
              var c = u.args,
                l = c[0],
                h = c[1];
              if (!_(l)) throw n.colonMissingCondition();
              o.push({ condition: E(e, l), if_expr: f(e, h) });
              break;
            case "Equals":
            case "Inequality":
            case "InequalityChain":
              o.push({ condition: E(e, u), if_expr: i.Constant(1) });
              break;
            default:
              break e;
          }
        }
        if (0 === r) throw n.piecewiseMissingCondition();
        if (r < s.length - 1) throw n.piecewisePartMissingCondition();
        if (
          (r === s.length - 1 &&
            o.push({ condition: i.Constant(!0), if_expr: f(e, s[r]) }),
          !i.Piecewise.chain)
        )
          throw n.featureUnavailable();
        return i.Piecewise.chain(o);
      }
      function _(e) {
        return (
          "Equals" === e.type ||
          "Inequality" === e.type ||
          "InequalityChain" === e.type
        );
      }
      function E(e, t) {
        var r = e.nodes;
        switch (t.type) {
          case "Equals":
            return r.Comparator["="](o(e, t.args));
          case "Inequality":
            return r.Comparator[t.symbol](o(e, t.args));
          case "InequalityChain":
            if (t.chain.length > 1) throw n.inequalityChainTooLong();
            var s = t.first,
              u = s.symbol,
              c = s.args,
              l = c[0],
              p = c[1],
              f = t.chain[0],
              h = f.symbol,
              d = f.args[0],
              m = i.emptySpanAt(t.span.input, t.span.start);
            return r.And([
              E(e, a.Inequality(m, u, [l, p])),
              E(e, a.Inequality(m, h, [p, d])),
            ]);
          default:
            throw n.parseError();
        }
      }
      function S(e) {
        var t = e.args,
          r = t[0],
          i = t[1];
        if (
          ("Superscript" === r.type && (r = r.args[0]),
          "Cmd" === r.type &&
            "logbase" === r.val &&
            "Seq" === i.type &&
            2 === i.args.length)
        ) {
          if (!a.isOkForImplicitCall(i.args[0])) throw n.badImplicitCall("log");
        } else if (!a.isOkForImplicitCall(i)) {
          if ("Cmd" === r.type) throw n.badImplicitCall(r.val);
          throw n.parseError();
        }
      }
      function w(e) {
        return parseFloat(e.val);
      }
      function M(e) {
        return parseFloat(e.whole) + parseFloat(e.num) / parseFloat(e.den);
      }
      function I(e) {
        return "Cmd" === e.type && "polygon" === e.val;
      }
      function P(e) {
        if ("Call" !== e.type) return !1;
        for (
          var t = e.args[0];
          "Superscript" === t.type ||
          "Subscript" === t.type ||
          "Prime" === t.type;

        )
          t = t.args[0];
        return "Cmd" === t.type && (d(t.val) || m(t.val));
      }
      function T(e) {
        switch (e.type) {
          case "UnexpectedParseError":
          case "MissingBound":
          case "EmptyGroup":
          case "UnexpectedDifferential":
          case "UnexpectedEnd":
            return n.parseError();
          case "InvalidOperatorName":
            return n.invalidOperatorName();
          case "UnexpectedCloseDelimiter":
          case "MissingCloseDelimiter":
            return n.mismatchedBraces(e.open, e.close);
          case "UnrecognizedSymbol":
            return "." === e.val
              ? n.unexpectedSymbol(e.val)
              : n.unrecognizedSymbol(e.val);
          case "EmptyInput":
            return n.blankExpression();
          case "BinaryOperatorMissingRight":
          case "BinaryOperatorMissingLeft":
            return n.binaryOperatorMissingOperand(
              "%" === e.val ? "% of" : e.val,
            );
          case "UnaryOperatorMissingLeft":
            return n.unaryOperatorMissingLeft(e.val);
          case "UnaryOperatorMissingRight":
            return n.unaryOperatorMissingRight(e.val);
          case "UnexpectedSubscript":
            return n.cannotSubscript(e.base);
          case "PercentMissingOf":
            return n.percentMissingOf();
          case "SumMissingBound":
            return n.sumMissingBound();
          case "ProductMissingBound":
            return n.productMissingBound();
          case "IntegralMissingBound":
            return n.integralMissingBound();
          case "SumMissingBody":
            return n.sumMissingBody();
          case "ProductMissingBody":
            return n.productMissingBody();
          case "IntegralMissingBody":
            return n.integralMissingBody();
          case "DerivativeMissingBody":
            return n.derivativeMissingBody();
          case "IntegralMissingDifferential":
            return n.integralMissingDifferential();
          case "DifferentialWithSuperscript":
            return n.differentialWithSuperscript();
          case "FractionMissingNumerator":
            return n.fractionMissingNumerator();
          case "FractionMissingDenominator":
            return n.fractionMissingDenominator();
          case "FractionEmpty":
            return n.fractionEmpty();
          case "EmptySuperscript":
            return n.emptySuperscript();
          case "EmptySubscript":
            return n.emptySubscript();
          case "InvalidSubscript":
            return n.invalidSubscript(e.val);
          case "SuperscriptWithPrime":
            return n.superscriptWithPrime();
          case "PrimeWithoutParen":
            return n.primeWithoutParen();
          case "UnexpectedPrime":
            return n.unexpectedPrime();
          case "EmptyRadical":
            return n.emptyRadical();
          case "EmptyRadicand":
            return n.emptyRadicand();
          case "EmptyParen":
            return n.emptyParen();
          case "EmptySquareBracket":
            return n.emptySquareBracket();
          case "EmptyPipe":
            return n.emptyPipe();
          case "FunctionMissingArgument":
            return n.wrongArity(e.val, 1, 0);
          default:
            var t = e;
            throw "Unexpected surface node " + t.type + ".";
        }
      }
      (Object.defineProperty(t, "__esModule", { value: !0 }), (t.lower = s));
    },
  ),
  define(
    "math/baseparser",
    [
      "require",
      "exports",
      "math/errormsg",
      "parsenodes",
      "math/parser/latex-parser",
      "math/parser/expression-parser",
      "math/parser/lower",
    ],
    function (e, t, r, n, i, a, s) {
      "use strict";
      function o() {
        throw r.featureUnavailable();
      }
      function u(e, t) {
        return (e.setInputString(t), e);
      }
      function c(e, t) {
        if ("string" != typeof e)
          throw new Error("Type Error: parse can only be called with strings");
        t = t || {};
        var r = n;
        if (t.disabledFeatures) {
          r = Object.create(r);
          for (var c = 0, l = t.disabledFeatures; c < l.length; c++) {
            var p = l[c];
            if (!r[p])
              throw new Error(
                "Programming Error: " +
                  p +
                  " cannot be disabled because it is not a parsenode.",
              );
            r[p] = o;
          }
        }
        var f = { nodes: r, currentIndex: t.index, setInput: u };
        try {
          var h = i.parse(e),
            d = a.parse(h);
          return s.lower(f, d);
        } catch (e) {
          if (e instanceof n.Error) return e;
          if ("string" == typeof e) return n.Error(e);
          throw e;
        }
      }
      (Object.defineProperty(t, "__esModule", { value: !0 }), (t.parse = c));
    },
  ),
  define(
    "math/rational-arithmetic-sequence",
    ["require", "math/distance", "math/builtin"],
    function (e) {
      function t(e, t) {
        var i = n.toFraction(e),
          a = n.toFraction(t);
        if (r.approx(i.n / i.d, e) && r.approx(a.n / a.d, t)) {
          var s = n.lcm(i.d, a.d),
            o = i.n * (s / i.d),
            u = a.n * (s / a.d),
            c = u - o;
          return { nstart: o, nstep: c, lcm: s };
        }
      }
      var r = e("math/distance"),
        n = e("math/builtin");
      return t;
    },
  ),
  define(
    "math/features/getConcreteTree",
    [
      "require",
      "parsenodes",
      "math/errormsg",
      "math/types",
      "graphing/label",
      "math/distance",
      "math/rational-arithmetic-sequence",
    ],
    function (e) {
      function t(e, t, r, n, i) {
        if (r < e.length && !u.approx(i, e.elementAt(r).constantValue, 10))
          throw a.nonArithmeticRange();
        if (
          n - r <= t.length &&
          n - r > 1 &&
          !u.approx(i, t.elementAt(t.length - n + r).constantValue, 10)
        )
          throw a.nonArithmeticRange();
      }
      function r(e, t) {
        for (var r = !1, n = !1, i = 0; i < e.length; i++) {
          var a = e[i];
          (a.isList || a.isBroadcast) && (n = !0);
          for (var s = a.getDependencies(), o = 0; o < s.length; o++)
            if (t.indexOf(s[o]) !== -1) {
              if (a.isList || a.isBroadcast) return "list";
            } else r = !0;
        }
        return n ? (r ? "broadcast" : "list") : "none";
      }
      function n(e) {
        var t,
          r = [],
          n = [],
          a = [];
        for (t = 0; t < e.length; t++) {
          var o,
            u = e[t];
          if (u.isList) {
            for (var c = !1, l = 0; l < a.length; l++)
              if (u === a[l]) {
                ((c = !0),
                  (o = i.DummyIndex(n[l])),
                  (o.valueType = s.elementType(u.valueType)),
                  r.push(o));
                break;
              }
            if (!c) {
              var p = i.Base.prototype.tmpVar();
              (n.push(p),
                a.push(u),
                (o = i.DummyIndex(p)),
                (o.valueType = s.elementType(u.valueType)),
                r.push(o));
            }
          } else
            u.isBroadcast
              ? (Array.prototype.push.apply(n, u._replacedSymbols),
                Array.prototype.push.apply(a, u._lists),
                r.push(u._expression))
              : r.push(u);
        }
        return { replacedArgs: a, concreteArgs: r, replacedSymbols: n };
      }
      var i = e("parsenodes"),
        a = e("math/errormsg"),
        s = e("math/types"),
        o = e("graphing/label"),
        u = e("math/distance"),
        c = e("math/rational-arithmetic-sequence"),
        l = i.List,
        p = i.OrderedPair,
        f = i.ScalarExpression,
        h = i.Constant,
        d = i.Multiply,
        m = i.Identifier,
        g = i.DummyIndex,
        y = i.BuiltInFunction;
      ((i.Base.prototype.getConcreteTree = function (e, t) {
        if (t) return this._getConcreteTree(e, t);
        if (this.isConcreteTreeCacheValid(e))
          return this.__cachedConcreteTree.value;
        for (
          var r = this._getConcreteTree(e, t),
            n = {},
            i = this.getCacheKeys().slice();
          ;

        ) {
          if (!i.length) break;
          var a = i.pop();
          if (!n.hasOwnProperty(a)) {
            var s = e[a];
            ((n[a] = s), s && Array.prototype.push.apply(i, s.getCacheKeys()));
          }
        }
        return ((this.__cachedConcreteTree = { keys: n, value: r }), r);
      }),
        (i.Base.prototype.getCacheKeys = function () {
          return this.getDependencies();
        }),
        (i.Base.prototype.isConcreteTreeCacheValid = function (e) {
          if (!this.__cachedConcreteTree) return !1;
          for (var t in this.__cachedConcreteTree.keys)
            if (
              this.__cachedConcreteTree.keys.hasOwnProperty(t) &&
              e[t] !== this.__cachedConcreteTree.keys[t]
            )
              return !1;
          return !0;
        }),
        (i.PercentOf.prototype._getConcreteTree = function (e, t) {
          return t && t[this.type]
            ? t[this.type].call(this, e, t)
            : i
                .Divide([i.Multiply(this.args), i.Constant(100)])
                .getConcreteTree(e, t);
        }),
        (i.Assignment.prototype._getConcreteTree = function (e, t) {
          return t && t[this.type]
            ? t[this.type].call(this, e, t)
            : this._expression.getConcreteTree(e, t);
        }),
        (i.Identifier.prototype._getConcreteTree = function (e, t) {
          if (t && t[this.type]) return t[this.type].call(this, e, t);
          var r = e[this._symbol];
          if (r) {
            if (r.isError) throw r;
            return r.isFunction
              ? r.getConcreteInvocationTree(e, [], t)
              : r.getConcreteTree(e, t);
          }
          if (y.hasOwnProperty(this._symbol))
            throw a.functionUnsupported(
              o.latexToIdentifier(this.getInputString()),
            );
          return i.FreeVariable(this._symbol);
        }),
        (i.Ans.prototype._getConcreteTree = function (e, t) {
          if (t && t[this.type]) return t[this.type].call(this, e, t);
          if (void 0 === e[this._symbol]) throw a.ansUndefined();
          return m.prototype._getConcreteTree.call(this, e, t);
        }),
        (i.Equation.prototype._getConcreteTree = function (e, t) {
          return t && t[this.type]
            ? t[this.type].call(this, e, t)
            : this.asComparator().getConcreteTree(e, t);
        }),
        (i.Constant.prototype._getConcreteTree = function (e, t) {
          return t && t[this.type]
            ? t[this.type].call(this, e, t)
            : new this.constructor(this.constantValue);
        }),
        (i.Derivative.prototype._getConcreteTree = function (e, t) {
          if (t && t[this.type]) return t[this.type].call(this, e, t);
          var r;
          if (e[this._symbol]) {
            var n = Object.create(e);
            n[this._symbol] = i.FreeVariable(this._symbol);
            var o = e[this._symbol].getConcreteTree(e, t);
            if (o.valueType !== s.Number && o.valueType !== s.ListOfNumber)
              throw a.derivativeVariableTypeError(this._symbol, [
                s.prettyPrint(o.valueType),
              ]);
            var u = {};
            return (
              (u[this._symbol] = o),
              (r = this.args[0].getConcreteTree(n, t)),
              this.typeCheck([r]),
              r.takeDerivative(this._symbol).substitute(u).getConcreteTree(e, t)
            );
          }
          return (
            (r = this.args[0].getConcreteTree(e, t)),
            this.typeCheck([r]),
            r.takeDerivative(this._symbol).getConcreteTree(e, t)
          );
        }),
        (i.DoubleInequality.prototype._getConcreteTree = function (e, t) {
          return t && t[this.type]
            ? t[this.type].call(this, e, t)
            : new this.constructor([
                i
                  .Piecewise([this._indicator, this._expressions[0], h(NaN)])
                  .getConcreteTree(e, t),
                this._operators[0],
                m(this._symbol),
                this._operators[1],
                i
                  .Piecewise([this._indicator, this._expressions[1], h(NaN)])
                  .getConcreteTree(e, t),
              ]);
        }),
        (i.Expression.prototype._getConcreteTree = function (e, t) {
          if (t && t[this.type]) return t[this.type].call(this, e, t);
          for (var r = [], n = 0; n < this.args.length; n++)
            r.push(this.args[n].getConcreteTree(e, t));
          return (this.typeCheck(r), this._constantCollapsedCopy(r));
        }),
        (i.Error.prototype._getConcreteTree = function (e, t) {
          return t && t[this.type] ? t[this.type].call(this, e, t) : this;
        }),
        (i.FreeVariable.prototype._getConcreteTree = function (e, t) {
          return t && t[this.type] ? t[this.type].call(this, e, t) : this;
        }),
        (i.FunctionCall.prototype._getConcreteTree = function (e, t) {
          if (t && t[this.type]) return t[this.type].call(this, e, t);
          var r = e[this._symbol];
          if (r && r.isError) throw r;
          if (!r || !r.isFunction) {
            if (y.hasOwnProperty(this._symbol))
              throw a.functionUnsupported(
                o.latexToIdentifier(this._identifier.getInputString()),
              );
            if (1 == this.args.length) {
              var n = [m(this._symbol), this.args[0]];
              return d(n).getConcreteTree(e, t);
            }
            if (r) throw a.variableAsFunction(this._symbol);
            throw a.functionNotDefined(this._symbol);
          }
          for (var i = [], s = 0; s < this.args.length; s++) {
            var u = this.args[s].getConcreteTree(e, t);
            i.push(u);
          }
          return r.getConcreteInvocationTree(e, i, t);
        }),
        (i.FunctionExponent.prototype._getConcreteTree = function (e, t) {
          if (t && t[this.type]) return t[this.type].call(this, e, t);
          var r = this.args[0]._symbol;
          return e[r] && e[r].isFunction
            ? i
                .Exponent([i.FunctionCall(r, [this.args[1]]), this.args[2]])
                .getConcreteTree(e, t)
            : d([
                this.args[0],
                i.Exponent([this.args[1], this.args[2]]),
              ]).getConcreteTree(e, t);
        }),
        (i.FunctionDefinition.prototype._getConcreteTree = function (e, t) {
          if (t && t[this.type]) return t[this.type].call(this, e, t);
          for (var r = 0; r < this._argSymbols.length; r++) {
            if (e[this._argSymbols[r]])
              throw a.parameterAlreadyDefined(this._argSymbols[r]);
            if (this._argSymbols[r] === this._symbol)
              throw a.parameterAlreadyDefined(this._argSymbols[r]);
          }
          return this._expression.getConcreteTree(e, t);
        }),
        (i.Image.prototype._getConcreteTree = function (e, t) {
          return t && t[this.type]
            ? t[this.type].call(this, e, t)
            : i.Image(
                {
                  center: this.center.tryGetConcreteTree(e, t),
                  radianAngle: this.radianAngle.tryGetConcreteTree(e, t),
                  width: this.width.tryGetConcreteTree(e, t),
                  height: this.height.tryGetConcreteTree(e, t),
                },
                this.moveStrategy,
              );
        }),
        (i.Integral.prototype._getConcreteTree = function (e, t) {
          if (t && t[this.type]) return t[this.type].call(this, e, t);
          if (e[this._differential._symbol])
            throw a.shadowedIntegrationVariable(this._differential._symbol);
          var r = this.args[0],
            n = this.args[1],
            i = this.args[2];
          if (n.dependsOn(r._symbol) || i.dependsOn(r._symbol))
            throw a.badIntegralBoundDependency(r._symbol);
          var s = Object.create(e);
          s[this._differential._symbol] = g(this._differential._symbol);
          var o = f.prototype._getConcreteTree.call(this, s, t);
          return o;
        }),
        (i.ListAccess.prototype._getConcreteTree = function (e, t) {
          if (t && t[this.type]) return t[this.type].call(this, e, t);
          var r = this.index.getConcreteTree(e, t),
            n = this.list.getConcreteTree(e, t),
            i = [n, r];
          return (this.typeCheck(i), this._constantCollapsedCopy(i));
        }),
        (i.List.prototype._getConcreteTree = function (e, t) {
          if (t && t[this.type]) return t[this.type].call(this, e, t);
          for (var r = [], n = 0; n < this.args.length; n++) {
            var i = this.args[n].getConcreteTree(e, t);
            r.push(i);
          }
          return (this.typeCheck(r), new this.constructor(r));
        }),
        (i.ParametrizedReducerFunction.prototype._getConcreteTree = function (
          e,
          t,
        ) {
          if (t && t[this.type]) return t[this.type].call(this, e, t);
          for (var a = [], s = 0; s < this.args.length; s++)
            a.push(this.args[s].getConcreteTree(e, t));
          switch (r([a[1]], this.getDummyDependencies())) {
            case "none":
              return (this.typeCheck(a), this._constantCollapsedCopy(a));
            case "list":
              return i.List(
                i.List.mapArgs(
                  [a[1]],
                  function (e) {
                    return (
                      (e = [a[0]].concat(e)),
                      this.typeCheck(e),
                      this._constantCollapsedCopy(e)
                    );
                  }.bind(this),
                ),
              );
            case "broadcast":
              var o = n([a[1]]),
                u = [a[0]].concat(o.concreteArgs);
              return (
                this.typeCheck(u),
                i.Broadcast(
                  o.replacedSymbols,
                  [this.copyWithArgs(u)].concat(o.replacedArgs),
                )
              );
          }
        }),
        (i.Prime.prototype._getConcreteTree = function (e, t) {
          if (t && t[this.type]) return t[this.type].call(this, e, t);
          var r = this.args[0],
            n = r.args[0];
          if (!e[r._symbol]) throw a.functionNotDefined(r._symbol);
          var i,
            s = this.tmpVar();
          if ("logbase" === r._symbol) {
            if (2 !== r.args.length) throw a.primedFunctionArity();
            i = [m(s), r.args[1]];
          } else {
            if (1 !== r.args.length) throw a.primedFunctionArity();
            i = [m(s)];
          }
          for (
            var o = r.copyWithArgs(i).getConcreteTree(e, t), u = 0;
            u < this.order;
            u++
          )
            o = o.takeDerivative(s);
          var c = {};
          return ((c[s] = n), o.substitute(c).getConcreteTree(e, t));
        }),
        (i.Range.prototype._getConcreteTree = function (e, r) {
          if (r && r[this.type]) return r[this.type].call(this, e, r);
          var n = this.beginning.getConcreteTree(e, r),
            i = this.end.getConcreteTree(e, r);
          if (n.getDependencies().length)
            throw a.variableRange(n.getDependencies());
          if (i.getDependencies().length)
            throw a.variableRange(i.getDependencies());
          if (!n.isList || !i.isList)
            throw new Error(
              "Programming Error: range bounds must be List nodes.",
            );
          var s,
            o,
            u = n.elementAt(0).constantValue,
            p = i.elementAt(i.length - 1).constantValue,
            f = p - u;
          if (1 === n.length) s = f >= 0 ? 1 : -1;
          else {
            var d = n.elementAt(1).constantValue;
            ((o = c(u, d)), (s = n.elementAt(1).constantValue - u));
          }
          var m = Math.round(f / s) + 1;
          if (!isFinite(m) || m < n.length || m < i.length)
            throw a.nonArithmeticRange();
          var g,
            y,
            v = [];
          if (o) {
            var b = o.nstart;
            for (g = 0; g < m; g++)
              ((y = b / o.lcm), t(n, i, g, m, y), v.push(h(y)), (b += o.nstep));
          } else
            for (v.push(h(u)), g = 1; g < m; g++)
              ((y = u + g * s), t(n, i, g, m, y), v.push(h(y)));
          return l(v);
        }),
        (i.ReducerFunction.prototype._getConcreteTree = function (e, t) {
          if (t && t[this.type]) return t[this.type].call(this, e, t);
          if (0 === this.args.length) throw a.zeroArgReducer(this._symbol);
          for (var s = [], o = 0; o < this.args.length; o++)
            s.push(this.args[o].getConcreteTree(e, t));
          if (1 === this.args.length)
            return (
              (s = [i.List.wrap(s[0])]),
              this.typeCheck(s),
              this._constantCollapsedCopy(s)
            );
          switch (r(s, this.getDummyDependencies())) {
            case "none":
              return (
                (s = [i.List(s)]),
                this.typeCheck(s),
                this._constantCollapsedCopy(s)
              );
            case "list":
              return i.List(
                i.List.mapArgs(
                  s,
                  function (e) {
                    return (
                      (e = [i.List(e)]),
                      this.typeCheck(e),
                      this._constantCollapsedCopy(e)
                    );
                  }.bind(this),
                ),
              );
            case "broadcast":
              var u = n(s);
              return (
                (s = [i.List(u.concreteArgs)]),
                this.typeCheck(s),
                i.Broadcast(
                  u.replacedSymbols,
                  [this.copyWithArgs(s)].concat(u.replacedArgs),
                )
              );
          }
        }),
        (i.RepeatedOperator.prototype._getConcreteTree = function (e, t) {
          if (t && t[this.type]) return t[this.type].call(this, e, t);
          if (e[this._index._symbol])
            throw a.shadowedIndex(this._index._symbol);
          var r = Object.create(e);
          r[this._index._symbol] = g(this._index._symbol);
          var n = f.prototype._getConcreteTree.call(this, r, t);
          return n;
        }),
        (i.ScalarExpression.prototype._getConcreteTree = function (e, t) {
          if (t && t[this.type]) return t[this.type].call(this, e, t);
          for (var a = [], s = 0; s < this.args.length; s++)
            a.push(this.args[s].getConcreteTree(e, t));
          switch (r(a, this.getDummyDependencies())) {
            case "none":
              return (this.typeCheck(a), this._constantCollapsedCopy(a));
            case "list":
              return i.List(
                i.List.mapArgs(
                  a,
                  function (e) {
                    return (this.typeCheck(e), this._constantCollapsedCopy(e));
                  }.bind(this),
                ),
              );
            case "broadcast":
              var o = n(a);
              return (
                this.typeCheck(o.concreteArgs),
                i.Broadcast(
                  o.replacedSymbols,
                  [this.copyWithArgs(o.concreteArgs)].concat(o.replacedArgs),
                )
              );
          }
        }),
        (i.Regression.prototype._getConcreteTree = function (e, t) {
          return t && t[this.type]
            ? t[this.type].call(this, e, t)
            : new this.constructor(this._lhs, this._rhs);
        }),
        (i.Polygon.prototype._getConcreteTree = function (e, t) {
          if (t && t[this.type]) return t[this.type].call(this, e, t);
          var r = this.args.map(function (t) {
            return t.getConcreteTree(e);
          });
          return (
            this.typeCheck(r),
            1 === r.length && r[0].valueType === s.ListOfPoint
              ? new this.constructor(r)
              : r.every(function (e) {
                    return e.valueType === s.Point;
                  })
                ? new this.constructor([l(r)])
                : 2 === r.length
                  ? new this.constructor([p(this.args).getConcreteTree(e)])
                  : a.parseError()
          );
        }),
        (i.SolvedEquation.prototype._getConcreteTree = function (e, t) {
          return t && t[this.type]
            ? t[this.type].call(this, e, t)
            : new this.constructor(
                this._symbol,
                this._expression.getConcreteTree(e, t),
              );
        }),
        (i.Table.prototype._getConcreteTree = function (e, t) {
          if (t && t[this.type]) return t[this.type].call(this, e, t);
          for (
            var r = [], n = Object.create(e), i = 0;
            i < this.columns.length;
            i++
          ) {
            var a = this.columns[i].getConcreteTree(n, e, t);
            (a.isIndependent && this.columns[i].exportToLocal(a, n), r.push(a));
          }
          return new this.constructor(r);
        }),
        (i.TableColumn.prototype._getConcreteTree = function (e, t) {
          var r,
            n,
            i = this.header.getConcreteTree(e);
          if (i.isFreeVariable) {
            r = [];
            for (var o = 0; o < this.values.length; o++)
              if (this.values[o].tableError())
                r.push(a.invalidTableEntry(this.values[o].tableError()));
              else {
                var u = this.values[o].tryGetConcreteTree(e);
                u.isError
                  ? r.push(u)
                  : u.tableError()
                    ? r.push(a.invalidTableEntry(u.tableError()))
                    : u.valueType === s.Number
                      ? r.push(u)
                      : r.push(
                          a.tableEntryTypeError([s.prettyPrint(u.valueType)]),
                        );
              }
            return (
              (n = new this.constructor(i, this.length, r)),
              (n.isIndependent = !0),
              n
            );
          }
          if (i.isConstant) {
            for (var c = [], l = 0; l < this.length; l++) c.push(i);
            r = c;
          } else r = i.isList ? i.args : [];
          return (
            (i = this.header.getConcreteTree(t)),
            i.isError ||
              i.valueType === s.Number ||
              i.valueType === s.ListOfNumber ||
              (i = a.tableHeaderTypeError([s.prettyPrint(i.valueType)])),
            (n = new this.constructor(i, this.length, r))
          );
        }));
    },
  ),
  define(
    "math/features/getValueType",
    ["require", "parsenodes", "math/types"],
    function (e) {
      function t() {
        return s.Number;
      }
      function r() {
        return s.Bool;
      }
      function n() {
        return s.Point;
      }
      function i() {
        return s.Any;
      }
      var a = e("parsenodes"),
        s = e("math/types"),
        o = {
          Add: t,
          Multiply: t,
          Divide: t,
          Subtract: t,
          Exponent: t,
          Negative: t,
          And: r,
          Piecewise: function (e) {
            return e[1].valueType;
          },
          BaseComparator: r,
          RepeatedOperator: t,
          List: function (e) {
            if (0 === e.length) return s.ListOfAny;
            for (var t = e[0].valueType, r = 1; r < e.length; r++)
              if (e[r].valueType !== t) return s.ListOfAny;
            return s.hasListType(t) ? s.listType(t) : s.ListOfAny;
          },
          ListAccess: function (e) {
            return s.elementType(e[0].valueType);
          },
          Broadcast: function (e) {
            return s.listType(e[0].valueType);
          },
          OrderedPairAccess: t,
          OrderedPair: n,
          NativeFunction: t,
          ReducerFunction: t,
          DoubleReducerFunction: t,
          ParametrizedReducerFunction: t,
          DummyIndex: t,
          FreeVariable: t,
          Constant: function () {
            switch (typeof this.constantValue) {
              case "number":
                return s.Number;
              case "boolean":
                return s.Bool;
              default:
                throw new Error(
                  "Constant node expects value of type number or boolean, but saw " +
                    typeof value,
                );
            }
          },
          TypedFunction: function () {
            return this._outputType;
          },
          Derivative: t,
          Integral: t,
          Identifier: i,
        };
      for (var u in o) a[u].prototype._getValueType = o[u];
    },
  ),
  define(
    "math/features/typeCheck",
    ["require", "parsenodes", "math/types", "math/errormsg"],
    function (e) {
      function t(e) {
        for (var t = [], r = 0; r < e.length; r++)
          t.push(i.prettyPrint(e[r].valueType));
        return t;
      }
      function r(e, r) {
        return function (n) {
          for (var i = 0; i < n.length; i++)
            if (n[i].valueType !== e[i]) throw r(t(n));
        };
      }
      var n = e("parsenodes"),
        i = e("math/types"),
        a = e("math/errormsg"),
        s = {
          Add: r([i.Number, i.Number], a.addTypeError),
          Multiply: r([i.Number, i.Number], a.multiplyTypeError),
          Divide: r([i.Number, i.Number], a.divideTypeError),
          Subtract: r([i.Number, i.Number], a.subtractTypeError),
          Exponent: r([i.Number, i.Number], a.exponentTypeError),
          Negative: r([i.Number], a.negativeTypeError),
          BaseComparator: r([i.Number, i.Number], a.comparatorTypeError),
          And: r([i.Bool, i.Bool], a.andTypeError),
          List: function (e) {
            if (0 !== e.length) {
              var t = e[0].valueType;
              if (!i.hasListType(t)) throw a.listTypeError([i.prettyPrint(t)]);
              for (var r = 0; r < e.length; r++) {
                var n = e[r].valueType;
                if (!i.hasListType(n))
                  throw a.listTypeError([i.prettyPrint(n)]);
                if (n !== t) throw a.heterogeneousList();
              }
            }
          },
          Broadcast: function (e) {},
          OrderedPair: r([i.Number, i.Number], a.pointTypeError),
          Piecewise: function (e) {
            if (e[0].valueType !== i.Bool)
              throw a.piecewiseConditionTypeError(t(e));
            if (e[1].valueType !== i.Number)
              throw a.piecewiseBranchTypeError([i.prettyPrint(e[1].valueType)]);
            if (e[2].valueType !== i.Number)
              throw a.piecewiseBranchTypeError([i.prettyPrint(e[2].valueType)]);
          },
          ListAccess: function (e) {
            if (!i.isList(e[0].valueType) || e[1].valueType !== i.Number)
              throw a.indexTypeError(t(e));
          },
          OrderedPairAccess: r([i.Point, i.Number], a.indexTypeError),
          Sum: function (e) {
            if (e[1].valueType !== i.Number)
              throw a.sumLowerBoundTypeError([i.prettyPrint(e[1].valueType)]);
            if (e[2].valueType !== i.Number)
              throw a.sumUpperBoundTypeError([i.prettyPrint(e[2].valueType)]);
            if (e[3].valueType !== i.Number)
              throw a.sumArgumentTypeError([i.prettyPrint(e[3].valueType)]);
          },
          Product: function (e) {
            if (e[1].valueType !== i.Number)
              throw a.productLowerBoundTypeError([
                i.prettyPrint(e[1].valueType),
              ]);
            if (e[2].valueType !== i.Number)
              throw a.productUpperBoundTypeError([
                i.prettyPrint(e[2].valueType),
              ]);
            if (e[3].valueType !== i.Number)
              throw a.productArgumentTypeError([i.prettyPrint(e[3].valueType)]);
          },
          Integral: function (e) {
            if (e[1].valueType !== i.Number)
              throw a.integralLowerBoundTypeError([
                i.prettyPrint(e[1].valueType),
              ]);
            if (e[2].valueType !== i.Number)
              throw a.integralUpperBoundTypeError([
                i.prettyPrint(e[2].valueType),
              ]);
            if (e[3].valueType !== i.Number)
              throw a.integralArgumentTypeError([
                i.prettyPrint(e[3].valueType),
              ]);
          },
          NativeFunction: function (e) {
            for (var r = 0; r < e.length; r++)
              if (e[r].valueType !== i.Number)
                throw a.functionTypeError(this._symbol, t(e));
          },
          ReducerFunction: function (e) {
            if (e[0].valueType !== i.ListOfNumber)
              throw a.functionTypeError(this._symbol, t(e));
          },
          DoubleReducerFunction: function (e) {
            if (!i.isList(e[0].valueType) || !i.isList(e[1].valueType))
              throw a.nonListDoubleReducer(this._symbol);
            if (
              e[0].valueType !== i.ListOfNumber ||
              e[1].valueType !== i.ListOfNumber
            )
              throw a.functionTypeError(this._symbol, t(e));
          },
          ParametrizedReducerFunction: function (e) {
            if (e[0].valueType !== i.ListOfNumber)
              throw a.nonListParametrizedReducer(this._symbol);
            if (e[1].valueType !== i.Number)
              throw a.functionTypeError(this._symbol, t(e));
          },
          TypedFunction: function (e) {
            for (var r = 0; r < e.length; r++)
              if (e[r].valueType !== this._inputTypes[r])
                throw a.functionTypeError(this._symbol, t(e));
          },
          Derivative: function (e) {
            if (
              e[0].valueType !== i.Number &&
              e[0].valueType !== i.ListOfNumber
            )
              throw a.derivativeTypeError(t(e));
          },
          Regression: function (e) {
            if (
              (e[0].valueType !== i.Number &&
                e[0].valueType !== i.ListOfNumber) ||
              (e[1].valueType !== i.Number && e[1].valueType !== i.ListOfNumber)
            )
              throw a.regressionTypeError(t(e));
          },
          Polygon: function (e) {
            if (1 === e.length && e[0].valueType !== i.ListOfPoint)
              throw a.polygonListTypeError(t(e));
            if (
              2 === e.length &&
              e[0].valueType === i.Number &&
              e[1].valueType === i.Number
            )
              throw a.polygonTwoNumbersError();
            if (
              e.length > 2 &&
              !e.every(function (e) {
                return e.valueType === i.Point;
              })
            )
              throw a.polygonPointArgsError();
          },
        };
      for (var o in s) n[o].prototype.typeCheck = s[o];
    },
  ),
  define("math/features/repr", ["require", "parsenodes"], function (e) {
    var t = e("parsenodes"),
      r = function (e, t, r) {
        r = r || 0;
        var n = Array(r + 1).join("  "),
          i = n + "  ";
        return (
          "[\n" +
          i +
          e
            .map(function (e) {
              return e.repr(t, r + 1);
            })
            .join(",\n" + i) +
          "\n" +
          n +
          "]"
        );
      },
      n = function (e, t) {
        return ((t = t || ""), "" + t + e);
      };
    ((t.Expression.prototype.repr = function (e, t) {
      return n(this.type, e) + "(" + r(this.args, e, t) + ")";
    }),
      (t.DoubleInequality.prototype.repr = function (e, t) {
        t = t || 0;
        var r = Array(t + 1).join("  "),
          i = r + "  ";
        return (
          n(this.type, e) +
          "([\n" +
          i +
          this.args[0].repr(e, t + 1) +
          ",\n" +
          i +
          "'" +
          this.args[1] +
          "',\n" +
          i +
          this.args[2].repr(e, t + 1) +
          ",\n" +
          i +
          "'" +
          this.args[3] +
          "',\n" +
          i +
          this.args[4].repr(e, t + 1) +
          "\n" +
          r +
          "])"
        );
      }),
      (t.Identifier.prototype.repr = t.FreeVariable.prototype.repr =
        function (e) {
          return n(this.type, e) + "('" + this._symbol + "')";
        }),
      (t.Constant.prototype.repr = function (e) {
        return n(this.type, e) + "(" + this.constantValue + ")";
      }),
      (t.FunctionCall.prototype.repr = function (e, t) {
        return (
          n(this.type, e) +
          "('" +
          this._symbol +
          "', " +
          r(this.args, e, t) +
          ")"
        );
      }),
      (t.Assignment.prototype.repr = function (e, r) {
        return (
          n(this.type, e) +
          "(" +
          t.Identifier(this._symbol).repr(e, r) +
          ", " +
          this._expression.repr(e, r) +
          ")"
        );
      }),
      (t.Regression.prototype.repr = t.Equation.prototype.repr =
        function (e, t) {
          return (
            n(this.type, e) +
            "(" +
            this._lhs.repr(e, t) +
            ", " +
            this._rhs.repr(e, t) +
            ")"
          );
        }),
      (t.FunctionDefinition.prototype.repr = function (e, i) {
        return (
          n(this.type, e) +
          "(" +
          t.Identifier(this._symbol).repr(e, i) +
          ", " +
          r(
            this._argSymbols.map(function (e) {
              return t.Identifier(e);
            }),
            e,
            i,
          ) +
          ", " +
          this._expression.repr(e, i) +
          ")"
        );
      }),
      (t.Error.prototype.repr = function (e, t) {
        return n(this.type, e) + "('" + this._msg + "')";
      }),
      (t.Derivative.prototype.repr = function (e, t) {
        return (
          n(this.type, e) +
          "('" +
          this._symbol +
          "', " +
          r(this.args, e, t) +
          ")"
        );
      }),
      (t.SolvedEquation.prototype.repr = function (e, t) {
        return (
          n(this.type, e) +
          "('" +
          this._symbol +
          "', " +
          this._expression.repr(e, t) +
          ")"
        );
      }),
      (t.OptimizedRegression.prototype.repr = function (e, t) {
        return (
          n(this.type, e) +
          "(" +
          JSON.stringify(this.parameters) +
          ", " +
          JSON.stringify(this.residuals) +
          ", " +
          JSON.stringify(this.statistics) +
          ", " +
          this.model.repr(e, t + 1) +
          ", " +
          JSON.stringify({
            isModelValid: this.isModelValid,
            residualVariable: this.residualVariable,
            residualSuggestionId: this.residualSuggestionId,
            shouldSuggestLogMode: this.shouldSuggestLogMode,
          }) +
          ")"
        );
      }),
      (t.Table.prototype.repr = function (e, t) {
        return n(this.type, e) + "(" + r(this.columns, e, t) + ")";
      }),
      (t.TableColumn.prototype.repr = function (e, t) {
        return (
          n(this.type, e) +
          "(" +
          this.header.repr(e, t) +
          ", " +
          this.length +
          ", " +
          r(this.values, e, t) +
          ")"
        );
      }),
      (t.Image.prototype.repr = function (e, t) {
        var r = Array(t + 1).join("  "),
          i = r + "  ";
        return (
          n(this.type, e) +
          "({\n" +
          i +
          "center: " +
          this.center.repr(e, t + 1) +
          ",\n" +
          i +
          "radianAngle: " +
          this.radianAngle.repr(e, t + 1) +
          ",\n" +
          i +
          "width: " +
          this.width.repr(e, t + 1) +
          ",\n" +
          i +
          "height: " +
          this.height.repr(e, t + 1) +
          "},\n" +
          i +
          JSON.stringify(this.moveStrategy) +
          "\n" +
          r +
          ")"
        );
      }),
      (t.Broadcast.prototype.repr = function (e, t) {
        return (
          n(this.type, e) +
          "(['" +
          this._replacedSymbols.join("', ") +
          "'], " +
          r(this.args, e, t) +
          ")"
        );
      }));
  }),
  define(
    "math/features/scalarEvalExpression",
    ["require", "parsenodes", "math/functions"],
    function (e) {
      var t = e("parsenodes"),
        r = e("math/functions"),
        n = {
          Add: function (e) {
            return "(" + e.join("+") + ")";
          },
          Multiply: function (e) {
            return "(" + e.join("*") + ")";
          },
          Divide: function (e) {
            return "(" + e.join("/") + ")";
          },
          Subtract: function (e) {
            return "(" + e.join("-") + ")";
          },
          Exponent: function (e) {
            return "BuiltIn.pow(" + e.join(",") + ")";
          },
          RawExponent: function (e) {
            return "Math.pow(" + e.join(",") + ")";
          },
          Negative: function (e) {
            return "(-" + e[0] + ")";
          },
          And: function (e) {
            return e.join("&&");
          },
          Piecewise: function (e) {
            return "(" + e[0] + "?" + e[1] + ":" + e[2] + ")";
          },
        },
        i = {
          Add: 2,
          Multiply: 2,
          Divide: 2,
          Subtract: 2,
          Exponent: 2,
          RawExponent: 2,
          Negative: 1,
          And: 2,
          Piecewise: 3,
        };
      for (var a in n) {
        var s = t[a].prototype;
        ((s.scalarEvalExpression = n[a]),
          (s.evaluate = r.createEvaluateFunction(
            s.scalarEvalExpression,
            i[a],
          )));
      }
    },
  ),
  define(
    "math/reconstitute-node",
    ["require", "parsenodes", "math/types"],
    function (e) {
      function t(e, i) {
        if (n.isList(e)) {
          for (var a = [], s = 0; s < i.length; s++)
            a.push(t(n.elementType(e), i[s]));
          var o = r.List(a);
          return ((o.valueType = e), o);
        }
        switch (e) {
          case n.Number:
          case n.Bool:
            return r.Constant(i);
          case n.Point:
            return r.OrderedPair([r.Constant(i[0]), r.Constant(i[1])]);
          default:
            throw new Error(
              "Cannot reconstitute value of a " + n.prettyPrint(e) + ".",
            );
        }
      }
      var r = e("parsenodes"),
        n = e("math/types");
      return t;
    },
  ),
  define(
    "math/features/constantcollapsedcopy",
    [
      "require",
      "parsenodes",
      "math/builtin",
      "math/distance",
      "math/reconstitute-node",
    ],
    function (e) {
      var t = e("parsenodes"),
        r = t.Constant,
        n = t.Multiply,
        i = t.Subtract,
        a = t.RawExponent,
        s = t.BuiltInFunction,
        o = e("math/builtin"),
        u = e("math/distance"),
        c = e("math/reconstitute-node"),
        l = {
          Expression: function (e) {
            return this.copyWithArgs(e);
          },
          FreeVariable: function (e) {
            return this;
          },
          ScalarExpression: function (e) {
            for (var t = [], n = 0; n < e.length; n++) {
              if (!e[n].isConstant) return this.copyWithArgs(e);
              t.push(e[n].constantValue);
            }
            return r(this.evaluate(t));
          },
          OrderedPair: function (e) {
            return this.copyWithArgs(e);
          },
          Add: function (e) {
            return e[0].isConstant && e[1].isConstant
              ? r(this.evaluate([e[0].constantValue, e[1].constantValue]))
              : 0 === e[0].constantValue
                ? e[1]
                : 0 === e[1].constantValue
                  ? e[0]
                  : this.copyWithArgs(e);
          },
          Multiply: function (e) {
            return e[0].isConstant && e[1].isConstant
              ? r(this.evaluate([e[0].constantValue, e[1].constantValue]))
              : 1 === e[0].constantValue
                ? e[1]
                : 1 === e[1].constantValue
                  ? e[0]
                  : this.copyWithArgs(e);
          },
          Subtract: function (e) {
            return e[0].isConstant && e[1].isConstant
              ? r(this.evaluate([e[0].constantValue, e[1].constantValue]))
              : 0 === e[0].constantValue
                ? t.Negative([e[1]])
                : 0 === e[1].constantValue
                  ? e[0]
                  : this.copyWithArgs(e);
          },
          Divide: function (e) {
            return e[0].isConstant && e[1].isConstant
              ? r(this.evaluate([e[0].constantValue, e[1].constantValue]))
              : 1 === e[1].constantValue
                ? e[0]
                : this.copyWithArgs(e);
          },
          Exponent: function (e) {
            if (e[0].isConstant && e[1].isConstant)
              return r(this.evaluate([e[0].constantValue, e[1].constantValue]));
            if (e[0].isConstant) {
              if (e[0].constantValue === Math.E) return s.exp([e[1]]);
              if (e[0].constantValue > 0) return a(e);
            }
            if (e[1].isConstant) {
              var t = e[1].constantValue;
              if (1 === t) return e[0];
              if (t === Math.floor(t)) return a(e);
              var i = o.toFraction(t, 100);
              return u.approx(i.n / i.d, t, 2) && i.d % 2 === 1
                ? n([
                    i.n % 2 === 0 ? r(1) : s.sign([e[0]]),
                    a([s.abs([e[0]]), e[1]]),
                  ])
                : a(e);
            }
            return this.copyWithArgs(e);
          },
          RawExponent: function (e) {
            return e[0].isConstant && e[1].isConstant
              ? r(this.evaluate([e[0].constantValue, e[1].constantValue]))
              : this.copyWithArgs(e);
          },
          Negative: function (e) {
            return e[0].isConstant
              ? r(-e[0].constantValue)
              : e[0] instanceof t.Negative
                ? e[0].args[0]
                : this.copyWithArgs(e);
          },
          And: function (e) {
            return e[0].isConstant && e[1].isConstant
              ? r(e[0].constantValue && e[1].constantValue)
              : e[0].isConstant && e[0] === !0
                ? e[1]
                : e[0].isConstant && e[0] === !1
                  ? r(!1)
                  : e[1].isConstant && e[1] === !0
                    ? e[0]
                    : e[1].isConstant && e[1] === !1
                      ? r(!1)
                      : this.copyWithArgs(e);
          },
          Piecewise: function (e) {
            return e[0].isConstant && e[0].constantValue === !0
              ? e[1]
              : e[0].isConstant && e[0].constantValue === !1
                ? e[2]
                : this.copyWithArgs(e);
          },
          Integral: function (e) {
            var t = e[0],
              a = e[1],
              s = e[2],
              o = e[3],
              u = o.getDependencies();
            if (a.isConstant && s.isConstant) {
              var c = s.constantValue - a.constantValue;
              if (o.isConstant) return r(o.constantValue * c);
              if (!o.dependsOn(t._symbol)) return n([o, r(c)]);
              if (1 === u.length && u[0] === t._symbol)
                return r(this.evaluate(a.constantValue, s.constantValue, o));
            } else if (!o.dependsOn(t._symbol)) return n([o, i([s, a])]);
            return this.copyWithArgs(e);
          },
          ListAccess: function (e) {
            return e[1].isConstant
              ? e[0].elementAt(e[1].constantValue - 1)
              : this.copyWithArgs(e);
          },
          OrderedPairAccess: function (e) {
            return e[1].isConstant && e[0] instanceof t.OrderedPair
              ? e[0].elementAt(e[1].constantValue - 1)
              : this.copyWithArgs(e);
          },
          Broadcast: function (e) {
            var t = e[0].getDependencies();
            for (r = 0; r < t.length; r++)
              if (this._replacedSymbols.indexOf(t[r]) === -1)
                return this.copyWithArgs(e);
            for (var r = 1; r < e.length; r++)
              if (0 !== e[r].getDependencies().length)
                return this.copyWithArgs(e);
            return c(
              this.valueType,
              this.evaluate(
                e.slice(1).map(function (e) {
                  return e.asValue();
                }),
              ),
            );
          },
          ReducerFunction: function (e) {
            return 0 === e[0].getDependencies().length
              ? c(this.valueType, this.evaluate([e[0].asValue()]))
              : this.copyWithArgs(e);
          },
          DoubleReducerFunction: function (e) {
            if (
              0 === e[0].getDependencies().length &&
              0 === e[1].getDependencies().length
            ) {
              var t = Math.min(e[0].length, e[1].length);
              return c(
                this.valueType,
                this.evaluate([
                  e[0].asValue().slice(0, t),
                  e[1].asValue().slice(0, t),
                ]),
              );
            }
            return this.copyWithArgs(e);
          },
          ParametrizedReducerFunction: function (e) {
            var t = e[0],
              r = e[1];
            return r.isConstant && 0 === t.getDependencies().length
              ? c(this.valueType, this.evaluate([t.asValue(), r.asValue()]))
              : this.copyWithArgs(e);
          },
          RepeatedOperator: function (e) {
            if (e[1].isConstant && e[2].isConstant) {
              var t = e[1].constantValue,
                n = e[2].constantValue,
                i = e[3];
              if (i.isConstant)
                return r(this.evaluateConstant([t, n, i.constantValue]));
              var a = i.getDependencies();
              if (0 === a.length || (1 === a.length && a[0] === e[0]._symbol))
                return r(this.evaluate(t, n, i));
            }
            return this.copyWithArgs(e);
          },
        };
      for (var p in l) t[p].prototype._constantCollapsedCopy = l[p];
      ((s.distance.prototype._constantCollapsedCopy = function (e) {
        return 0 === e[0].getDependencies().length &&
          0 === e[1].getDependencies().length
          ? r(this.evaluate([e[0].asArray(), e[1].asArray()]))
          : this.copyWithArgs(e);
      }),
        (s.midpoint.prototype._constantCollapsedCopy = function (e) {
          if (
            0 === e[0].getDependencies().length &&
            0 === e[1].getDependencies().length
          ) {
            var n = this.evaluate([e[0].asArray(), e[1].asArray()]);
            return t.OrderedPair([r(n[0]), r(n[1])]);
          }
          return this.copyWithArgs(e);
        }));
    },
  ),
  define(
    "math/features/polynomialorder",
    ["require", "parsenodes"],
    function (e) {
      var t = e("parsenodes"),
        r = {
          Expression: "this.dependsOn(symbol) ? Infinity : 0",
          FreeVariable: "(symbol === this._symbol ? 1 : 0)",
          Constant: "0",
          Add: "Math.max(order0, order1)",
          Subtract: "Math.max(order0, order1)",
          Multiply: "order0 + order1",
          Negative: "order0",
          Divide: "order1 > 0 ? Infinity : order0",
        },
        n = function (e) {
          return (
            (e = e.replace("order0", "this.args[0].polynomialOrder(symbol)")),
            (e = e.replace("order1", "this.args[1].polynomialOrder(symbol)")),
            new Function(["symbol"], "return " + e)
          );
        };
      for (var i in r) {
        var a = r[i];
        t[i].prototype.polynomialOrder = n(a);
      }
      ((t.Exponent.prototype.polynomialOrder = function (e) {
        var t = this.args[0].polynomialOrder(e),
          r = this.args[1].polynomialOrder(e);
        if (0 === t && 0 === r) return 0;
        var n = this.args[1];
        return n.isConstant &&
          n.constantValue === Math.round(n.constantValue) &&
          n.constantValue > 0
          ? t * n.constantValue
          : 1 / 0;
      }),
        (t.Piecewise.prototype.polynomialOrder = function (e) {
          return this.dependsOn(e)
            ? this.args[2].isConstant && this.args[2].isNaN()
              ? this.args[1].polynomialOrder(e)
              : 1 / 0
            : 0;
        }),
        (t.List.prototype.polynomialOrder = function (e) {
          return 1 / 0;
        }));
    },
  ),
  define(
    "math/features/polynomialcoefficients",
    ["require", "parsenodes"],
    function (e) {
      var t = e("parsenodes"),
        r = t.Constant(0),
        n = t.Constant(1);
      ((t.FreeVariable.prototype.getPolynomialCoefficients = function (e) {
        return e === this._symbol ? [r, n] : [this];
      }),
        (t.Constant.prototype.getPolynomialCoefficients = function (e) {
          return [this];
        }),
        (t.Add.prototype.getPolynomialCoefficients = function (e) {
          for (
            var r = this.args[0].getPolynomialCoefficients(e),
              n = this.args[1].getPolynomialCoefficients(e),
              i = r.length - 1,
              a = n.length - 1,
              s = [],
              o = 0;
            o <= Math.max(i, a);
            o++
          )
            i >= o && a >= o
              ? s.push(t.Add([r[o], n[o]]))
              : s.push(i > a ? r[o] : n[o]);
          return s;
        }),
        (t.Subtract.prototype.getPolynomialCoefficients = function (e) {
          for (
            var r = this.args[0].getPolynomialCoefficients(e),
              n = this.args[1].getPolynomialCoefficients(e),
              i = r.length - 1,
              a = n.length - 1,
              s = [],
              o = 0;
            o <= Math.max(i, a);
            o++
          )
            i >= o && a >= o
              ? s.push(t.Subtract([r[o], n[o]]))
              : s.push(i > a ? r[o] : t.Negative([n[o]]));
          return s;
        }),
        (t.Negative.prototype.getPolynomialCoefficients = function (e) {
          for (
            var r = this.args[0].getPolynomialCoefficients(e), n = [], i = 0;
            i < r.length;
            i++
          )
            n.push(t.Negative([r[i]]));
          return n;
        }),
        (t.Exponent.prototype.getPolynomialCoefficients = function (e) {
          var n = this.args[0].getPolynomialCoefficients(e),
            i = this.args[1].getPolynomialCoefficients(e),
            a = n.length - 1,
            s = i.length - 1;
          if (s > 0) throw "can't solve for variable in exponent";
          if (0 === a) return [t.Exponent([n[0], i[0]])];
          if (this.args[1].isConstant) {
            var o = this.args[1].constantValue;
            switch (o) {
              case 0:
                return [r];
              case 1:
                return n;
              case 2:
                return t
                  .Multiply([this.args[0], this.args[0]])
                  .getPolynomialCoefficients(e);
            }
          }
          throw "Unable to compile polynomial representation";
        }),
        (t.Multiply.prototype.getPolynomialCoefficients = function (e) {
          for (
            var r = this.args[0].getPolynomialCoefficients(e),
              n = this.args[1].getPolynomialCoefficients(e),
              i = r.length - 1,
              a = n.length - 1,
              s = [],
              o = 0;
            o <= i;
            o++
          )
            for (var u = 0; u <= a; u++) {
              var c = t.Multiply([r[o], n[u]]),
                l = s[o + u];
              void 0 === l ? (s[o + u] = c) : (s[o + u] = t.Add([l, c]));
            }
          return s;
        }),
        (t.Divide.prototype.getPolynomialCoefficients = function (e) {
          var r = this.args[0].getPolynomialCoefficients(e),
            n = this.args[1].getPolynomialCoefficients(e),
            i = n.length - 1,
            a = [];
          if (i > 0) throw "Can't solve for variable in denominator";
          for (var s = 0; s < r.length; s++) a.push(t.Divide([r[s], n[0]]));
          return a;
        }),
        (t.Expression.prototype.getPolynomialCoefficients = function (e) {
          if (this.dependsOn(e))
            throw "Unimplemented polynomialCoefficient call";
          return [this];
        }),
        (t.Piecewise.prototype.getPolynomialCoefficients = function (e) {
          if (!this.dependsOn(e)) return [this];
          var t = this.args[1].getPolynomialCoefficients(e);
          return t;
        }));
    },
  ),
  define(
    "math/features/extractconditions",
    ["require", "parsenodes"],
    function (e) {
      var t = e("parsenodes");
      ((t.Expression.prototype.extractConditions = function (e, t) {
        for (var r = 0; r < this.args.length; r++) {
          var n = this.args[r];
          t = n.extractConditions(e, t);
        }
        return t;
      }),
        (t.Constant.prototype.extractConditions = function (e, t) {
          return t;
        }),
        (t.Piecewise.prototype.extractConditions = function (e, r) {
          if (!this.dependsOn(e)) return r;
          if (!this.args[0].dependsOn(e))
            return (
              (r = this.args[1].extractConditions(e, r)),
              (r = this.args[2].extractConditions(e, r))
            );
          var n = {};
          return (
            (n[e] = r),
            t.Piecewise([this.args[0].substitute(n), r, t.Constant(NaN)])
          );
        }));
    },
  ),
  define(
    "math/builtinconstants",
    ["require", "math/parsenode/constant"],
    function (e) {
      var t = e("math/parsenode/constant");
      return {
        pi: t(Math.PI),
        tau: t(2 * Math.PI),
        e: t(Math.E),
        trigAngleMultiplier: t(1),
      };
    },
  ),
  define(
    "math/builtinframe",
    ["require", "math/builtinconstants", "math/parsenode/builtinfunction"],
    function (e) {
      var t,
        r = e("math/builtinconstants"),
        n = e("math/parsenode/builtinfunction"),
        i = {};
      for (t in r) r.hasOwnProperty(t) && (i[t] = r[t]);
      for (t in n) n.hasOwnProperty(t) && (i[t] = n[t]);
      return i;
    },
  ),
  define(
    "math/features/bounddomain",
    ["require", "parsenodes", "math/builtinframe", "math/domaintypes"],
    function (e) {
      var t = e("parsenodes"),
        r = e("math/builtinframe"),
        n = e("math/domaintypes"),
        i = t.Constant(0);
      ((t.Base.prototype.boundDomain = function (e) {
        return n.unknownDomain();
      }),
        (t.List.prototype.boundDomain = function (e) {
          return n.unknownDomain();
        }),
        (t.Expression.prototype.boundDomain = function (e) {
          for (var t = n.allReals(), r = 0; r < this.args.length; r++)
            t = n.intersectDomains(t, this.args[r].boundDomain(e));
          return t;
        }),
        (t.Constant.prototype.boundDomain = function (e) {
          return this.isNaN() ? n.emptyDomain() : n.allReals();
        }),
        (t.Piecewise.prototype.boundDomain = function (e) {
          return this.args[2].isConstant && isNaN(this.args[2].constantValue)
            ? n.intersectDomains(
                this.args[0].boundDomain(e),
                this.args[1].boundDomain(e),
              )
            : n.unknownDomain();
        }),
        (t.OrderedPair.prototype.boundDomain = function (e) {
          return n.intersectDomains(
            this.args[0].boundDomain(e),
            this.args[1].boundDomain(e),
          );
        }),
        (t.BaseComparator.prototype.boundDomain = function (e) {
          if ("=" === this.operator) return n.unknownDomain();
          var t = this._difference,
            a = this._difference.boundDomain(e),
            s = t.polynomialOrder(e);
          if (s > 1) return n.unknownDomain();
          var o = t.getPolynomialCoefficients(e),
            u = o[1] ? o[1].getConcreteTree(r) : i,
            c = o[0] ? o[0].getConcreteTree(r) : i;
          if (!u.isConstant || !c.isConstant) return n.unknownDomain();
          if (isNaN(u.constantValue) || isNaN(c.constantValue))
            return n.emptyDomain();
          if (0 === u.constantValue)
            return c.constantValue >= 0 ? a : n.emptyDomain();
          var l = -c.constantValue / u.constantValue,
            p = u.constantValue < 0 ? [-(1 / 0), l] : [l, 1 / 0];
          return n.intersectDomains(a, n.knownDomain(p));
        }));
    },
  ),
  define(
    "math/features/derivative",
    [
      "require",
      "parsenodes",
      "math/baseparser",
      "math/builtinframe",
      "math/parsenode/builtinfunction",
    ],
    function (e) {
      var t = e("parsenodes"),
        r = e("math/baseparser"),
        n = e("math/builtinframe"),
        i = e("math/parsenode/builtinfunction"),
        a = t.Constant(0),
        s = t.Constant(1),
        o = t.Constant(2),
        u = {
          FreeVariable: function (e) {
            return e === this._symbol ? s : a;
          },
          Constant: function (e) {
            return isFinite(this.constantValue)
              ? a
              : t.Constant(this.constantValue);
          },
          Negative: function (e) {
            return t.Negative([this.args[0].takeDerivative(e)]);
          },
          Add: function (e) {
            return t.Add([
              this.args[0].takeDerivative(e),
              this.args[1].takeDerivative(e),
            ]);
          },
          Subtract: function (e) {
            return t.Subtract([
              this.args[0].takeDerivative(e),
              this.args[1].takeDerivative(e),
            ]);
          },
          Multiply: function (e) {
            return t.Add([
              g(
                e,
                this.args[0],
                t.Multiply([this.args[0].takeDerivative(e), this.args[1]]),
              ),
              g(
                e,
                this.args[1],
                t.Multiply([this.args[0], this.args[1].takeDerivative(e)]),
              ),
            ]);
          },
          Divide: function (e) {
            return t.Subtract([
              g(
                e,
                this.args[0],
                t.Divide([this.args[0].takeDerivative(e), this.args[1]]),
              ),
              g(
                e,
                this.args[1],
                t.Divide([
                  t.Multiply([this.args[0], this.args[1].takeDerivative(e)]),
                  t.Exponent([this.args[1], o]),
                ]),
              ),
            ]);
          },
          Exponent: function (e) {
            return t
              .Add([
                g(
                  e,
                  this.args[0],
                  t.Multiply([
                    t.Multiply([
                      this.args[1],
                      t.Exponent([this.args[0], t.Subtract([this.args[1], s])]),
                    ]),
                    this.args[0].takeDerivative(e),
                  ]),
                ),
                g(
                  e,
                  this.args[1],
                  t.Multiply([
                    t.Piecewise([
                      t.Comparator["="]([this.args[0], a]),
                      t.Piecewise([
                        t.Comparator[">"]([this.args[1], a]),
                        a,
                        t.Constant(NaN),
                      ]),
                      t.Multiply([
                        t.FunctionCall("\\ln", [this.args[0]]),
                        t.Exponent([this.args[0], this.args[1]]),
                      ]),
                    ]),
                    this.args[1].takeDerivative(e),
                  ]),
                ),
              ])
              .getConcreteTree(n);
          },
          Sum: function (e) {
            return this.copyWithArgs([
              this.args[0],
              this.args[1],
              this.args[2],
              this.args[3].takeDerivative(e),
            ]);
          },
          Product: function (e) {
            var r = t.Sum([
                this.args[0],
                this.args[1],
                this.args[2],
                t.Piecewise([t.Comparator["="]([a, this.args[3]]), s, a]),
              ]),
              n = t.Multiply([
                t.Sum([
                  this.args[0],
                  this.args[1],
                  this.args[2],
                  t.Divide([this.args[3].takeDerivative(e), this.args[3]]),
                ]),
                t.Product(this.args),
              ]),
              i = t.Product([
                this.args[0],
                this.args[1],
                this.args[2],
                t.Piecewise([
                  t.Comparator["="]([a, this.args[3]]),
                  this.args[3].takeDerivative(e),
                  this.args[3],
                ]),
              ]);
            return t.Piecewise([
              t.Comparator["="]([a, r]),
              n,
              t.Piecewise([t.Comparator["="]([s, r]), i, a]),
            ]);
          },
          Piecewise: function (e) {
            return 2 === this.args.length
              ? t.Piecewise([this.args[0], this.args[1].takeDerivative(e)])
              : 3 === this.args.length
                ? t.Piecewise([
                    this.args[0],
                    this.args[1].takeDerivative(e),
                    this.args[2].takeDerivative(e),
                  ])
                : void 0;
          },
          List: function (e) {
            return t.List(
              this.args.map(function (t) {
                return t.takeDerivative(e);
              }),
            );
          },
          ListAccess: function (e) {
            return new this.constructor([
              this.args[0].takeDerivative(e),
              this.args[1],
            ]);
          },
          OrderedPair: function (e) {
            return new this.constructor([
              this.args[0].takeDerivative(e),
              this.args[1].takeDerivative(e),
            ]);
          },
          OrderedPairAccess: function (e) {
            return new this.constructor([
              this.args[0].takeDerivative(e),
              this.args[1],
            ]);
          },
          Integral: function (e) {
            var r = this.args[0],
              n = this.args[1],
              i = this.args[2],
              a = this.args[3],
              s = {};
            s[r._symbol] = i;
            var o = {};
            return (
              (o[r._symbol] = n),
              t.Add([
                g(e, a, this.copyWithArgs([r, n, i, a.takeDerivative(e)])),
                t.Subtract([
                  g(e, i, t.Multiply([a.substitute(s), i.takeDerivative(e)])),
                  g(e, n, t.Multiply([a.substitute(o), n.takeDerivative(e)])),
                ]),
              ])
            );
          },
          SolvedEquation: function (e) {
            return this._expression.takeDerivative(e);
          },
          OptimizedRegression: function (e) {
            return this.model.takeDerivative(e);
          },
          Broadcast: function (e) {
            for (
              var r = this._replacedSymbols.slice(),
                n = this.args.slice(1),
                i = this._expression.takeDerivative(e),
                a = 0;
              a < this._replacedSymbols.length;
              a++
            ) {
              var s = this._replacedSymbols[a],
                o = this.args[a + 1];
              if (o.dependsOn(e)) {
                var u = this.tmpVar(),
                  c = t.DummyIndex(u);
                (r.push(u),
                  n.push(o.takeDerivative(e)),
                  (i = t.Add([
                    i,
                    t.Multiply([this._expression.takeDerivative(s), c]),
                  ])));
              }
            }
            return t.Broadcast(r, [i].concat(n));
          },
        },
        c = {
          exp: "\\exp(x)*x_1",
          ln: "\\{x >= 0: x_1/x \\}",
          log: "\\{ x >= 0: x_1/(x*\\ln(10)) \\}",
          sqrt: "x_1/(2*\\sqrt{x})",
          rtxsqpone: "x*x_1/\\rtxsqpone(x)",
          rtxsqmone: "x*x_1/\\rtxsqmone(x)",
          sin: "\\cos(x)*x_1",
          cos: "-\\sin(x)*x_1",
          tan: "\\sec(x)^2*x_1",
          arcsin: "x_1/\\sqrt{1 - x^2}",
          arccos: "-x_1/\\sqrt{1 - x^2}",
          sinh: "\\cosh(x)*x_1",
          cosh: "\\sinh(x)*x_1",
          tanh: "(\\sech(x))^2*x_1",
          arcsinh: "x_1/\\sqrt{x^2 + 1}",
          arccosh: "\\{ x > 0: x_1/\\rtxsqmone(x) \\}",
          arctanh: "\\{ \\abs(x) < 1: x_1/(1 - x^2) \\}",
          csc: "-\\cot(x)*\\csc(x)*x_1",
          sec: "\\tan(x)*\\sec(x)*x_1",
          cot: "-\\csc(x)^2*x_1",
          arccsc: "-x_1/(\\abs(x)*\\rtxsqmone(x))",
          arcsec: "x_1/(\\abs(x)*\\rtxsqmone(x))",
          arccot: "-x_1/(1+x^2)",
          csch: "-\\coth(x)*\\csch(x)*x_1",
          sech: "-\\tanh(x)*\\sech(x)*x_1",
          coth: "-(\\csch(x))^2*x_1",
          arccsch: "-x_1/(\\abs(x)*\\rtxsqpone(x))",
          arcsech: "\\{ x >= 0: -x_1/(x*\\sqrt{1 - x^2}) \\}",
          arccoth: "\\{ \\abs(x) > 1 : x_1/(1 - x^2) \\}",
          factorial: "(x)!*\\polyGamma(0, x + 1)*x_1",
          floor: "\\{ \\mod(x, 1) > 0: 0*x_1 \\}",
          ceil: "\\{ \\mod(x, 1) > 0: 0*x_1 \\}",
          round: "\\{ \\abs(\\mod(x, 1) - 0.5) > 0: 0*x_1 \\}",
          abs: "\\{ \\abs(x) > 0: \\sign(x)*x_1 \\}",
          sign: "\\{ \\abs(x) > 0: 0*x_1 \\}",
          mean: "\\mean(x_1)",
          total: "\\total(x_1)",
          length: "0",
          var: "2*\\cov(x, x_1)",
          varp: "2*\\cov(x, x_1)*(\\length(x)-1)/\\length(x)",
          stdev: "\\cov(x, x_1)/\\stdev(x)",
          stdevp: "\\covp(x, x_1)/\\stdevp(x)",
          mad: "\\mean(\\sign(x-\\mean(x))*(x_1 - \\mean(x_1)))",
          min: "x_1[\\argmin(x)]",
          max: "x_1[\\argmax(x)]",
          median:
            "0.5*(x_1[\\lowerQuantileIndex(x, 0.5)] + x_1[\\upperQuantileIndex(x, 0.5)])",
          argmin: "0/0",
          argmax: "0/0",
          gcd: "0/0",
          lcm: "0/0",
          erf: "\\frac{2}{\\sqrt{\\pi }}e^{-x^2}",
          invNorm: "\\frac{1}{\\normalpdf(\\invNorm(x))}",
        },
        l = {
          logbase: [
            "\\{x > 0: \\frac{x_1}{x*\\ln(y)}\\}",
            "\\frac{-\\log_{y}(x)*y_1}{y*\\ln(y)}",
          ],
          nthroot: ["x^{1/y - 1}/y*x_1", "-\\frac{x^{1/y}*\\ln(x)*y_1}{y^2}"],
          polyGamma: ["0/0", "\\polyGamma(1 + x, y)*y_1"],
          mod: [
            "\\{ \\abs(\\mod(x, y)) > 0: x_1 \\}",
            "\\{ \\mod(x/y, 1) > 0: -\\floor(x/y)*y_1 \\}",
          ],
          cov: ["\\cov(x_1, y)", "\\cov(x, y_1)"],
          covp: ["\\covp(x_1, y)", "\\covp(x, y_1)"],
          corr: [
            "(\\cov(x_1, y) - (\\cov(x, y)*\\cov(x, x_1)/\\var(x)))/(\\stdevp(x)\\stdevp(y))",
            "(\\cov(x, y_1) - (\\cov(x, y)*\\cov(y, y_1)/\\var(y)))/(\\stdevp(x)\\stdevp(y))",
          ],
          quantile: [
            "\\{ \\floor(y*(\\length(x)-1)) = y*(\\length(x)-1) :   x_1[\\upperQuantileIndex(x, y)],  (\\ceil(y*(\\length(x)-1)) - y*(\\length(x)-1))*x_1[\\lowerQuantileIndex(x, y)] +   (y*(\\length(x)-1) - \\floor(y*(\\length(x)-1)))*x_1[\\upperQuantileIndex(x, y)]\\}",
            "\\{ \\floor(y*(\\length(x)-1)) < y*(\\length(x)-1) :   (x[\\upperQuantileIndex(x, y)] - x[\\lowerQuantileIndex(x, y)])*y_1\\}",
          ],
          quartile: [
            "0.5*(x_1[\\lowerQuartileIndex(x, y)] + x_1[\\upperQuartileIndex(x, y)])",
            "0/0",
          ],
          TScore: [
            "\\frac{\\sqrt{\\length(x)}(\\stdev(x)*\\mean(x_1)-(\\mean(x)-y)*\\frac{\\cov(x,x_1)}{\\stdev(x)})}{\\stdev(x)^2}",
            "-y_1*\\sqrt{\\length(x)}/\\stdev(x)",
          ],
          TTest: [
            "\\tpdf(\\TScore(x,y),\\length(x)-1)\\frac{\\sqrt{\\length(x)}(\\stdev(x)*\\mean(x_1)-(\\mean(x)-y)*\\frac{\\cov(x,x_1)}{\\stdev(x)})}{\\stdev(x)^2}",
            "-y_1*\\tpdf(\\TScore(x,y),\\length(x)-1)*\\sqrt{\\length(x)}/\\stdev(x)",
          ],
          quartileIndex: ["0/0", "0/0"],
          upperQuartileIndex: ["0/0", "0/0"],
          lowerQuartileIndex: ["0/0", "0/0"],
          upperQuantileIndex: ["0/0", "0/0"],
          lowerQuantileIndex: ["0/0", "0/0"],
          nCr: ["0/0", "0/0"],
          nPr: ["0/0", "0/0"],
          arctan: ["x_1*y/(y^2+x^2)", "-y_1*x/(y^2+x^2)"],
          poissonpdf: [
            "0/0",
            "y_1\\frac{e^{-y}(\\floor(x)-y)y^{(\\floor(x)-1)}}{\\floor(x)!}",
          ],
          poissoncdf: [
            "0/0",
            "y_1\\sum _{n=0}^{\\floor(x)}\\frac{e^{-y}(n-y)y^{(n-1)}}{n!}",
          ],
          tcdf: ["x_1*\\tpdf(x,y)", "0/0"],
          tpdf: ["x_1*\\tpdf(x,y)*\\frac{-(y+1)*x}{y+x^2}", "0/0"],
        },
        p = {
          normalcdf: [
            "x_1\\normalpdf(x,y,z)",
            "-y_1\\normalpdf(x,y,z)",
            "z_1*\\frac{y-x}{z}\\normalpdf(x,y,z)",
          ],
          normalpdf: [
            "-x_1*\\frac{x-y}{z^2} \\normalpdf(x,y,z)",
            "y_1*\\frac{x-y}{z^2} \\normalpdf(x,y,z)",
            "z_1*(\\frac{(x-y-z)*(x-y+z)}{z^3}) \\normalpdf(x,y,z)",
          ],
          binompdf: [
            "0/0",
            "0/0",
            "z_1*\\binompdf(x,y,z)*(\\frac{\\round(x)}{z}-\\frac{\\round(y)-\\round(x)}{1-z})",
          ],
          binomcdf: [
            "0/0",
            "0/0",
            "z_1*\\sum _{n=0}^{\\round(x)}\\binompdf(n,y,z)*(\\frac{n}{z}-\\frac{\\round(y)-n}{1-z})",
          ],
        },
        f = function (e) {
          return function (t) {
            var r = this.args,
              i = { x: r[0], x_1: r[0].takeDerivative(t) };
            return g(t, r[0], e.substitute(i)).getConcreteTree(n);
          };
        },
        h = function (e, r) {
          return function (i) {
            var a = this.args,
              s = {
                x: a[0],
                x_1: a[0].takeDerivative(i),
                y: a[1],
                y_1: a[1].takeDerivative(i),
              };
            return t
              .Add([g(i, a[0], e.substitute(s)), g(i, a[1], r.substitute(s))])
              .getConcreteTree(n);
          };
        },
        d = function (e, r, i) {
          return function (a) {
            var s = this.args,
              o = {
                x: s[0],
                x_1: s[0].takeDerivative(a),
                y: s[1],
                y_1: s[1].takeDerivative(a),
                z: s[2],
                z_1: s[2].takeDerivative(a),
              };
            return t
              .Add([
                t.Add([
                  g(a, s[0], e.substitute(o)),
                  g(a, s[1], r.substitute(o)),
                ]),
                g(a, s[2], i.substitute(o)),
              ])
              .getConcreteTree(n);
          };
        };
      for (var m in c) i[m].prototype.takeDerivative = f(r.parse(c[m]));
      for (m in l)
        i[m].prototype.takeDerivative = h(r.parse(l[m][0]), r.parse(l[m][1]));
      for (m in p)
        i[m].prototype.takeDerivative = d(
          r.parse(p[m][0]),
          r.parse(p[m][1]),
          r.parse(p[m][2]),
        );
      ((i.distance.prototype.takeDerivative = function (e) {
        var r = this.args[0],
          a = this.args[1],
          u = t.OrderedPairAccess([r, s]),
          c = t.OrderedPairAccess([r, o]),
          l = t.OrderedPairAccess([a, s]),
          p = t.OrderedPairAccess([a, o]),
          f = g(e, u, u.takeDerivative(e)),
          h = g(e, c, c.takeDerivative(e)),
          d = g(e, l, l.takeDerivative(e)),
          m = g(e, p, p.takeDerivative(e));
        return g(
          e,
          this,
          t.Divide([
            t.Add([
              t.Add([
                t.Subtract([t.Multiply([f, u]), t.Multiply([f, l])]),
                t.Subtract([t.Multiply([d, l]), t.Multiply([d, u])]),
              ]),
              t.Add([
                t.Subtract([t.Multiply([h, c]), t.Multiply([h, p])]),
                t.Subtract([t.Multiply([m, p]), t.Multiply([m, c])]),
              ]),
            ]),
            i.distance([this.args[0], this.args[1]]),
          ]),
        ).getConcreteTree(n);
      }),
        (i.midpoint.prototype.takeDerivative = function (e) {
          var r = this.args[0],
            a = this.args[1],
            u = t.OrderedPairAccess([r, s]),
            c = t.OrderedPairAccess([r, o]),
            l = t.OrderedPairAccess([a, s]),
            p = t.OrderedPairAccess([a, o]),
            f = g(e, u, u.takeDerivative(e)),
            h = g(e, c, c.takeDerivative(e)),
            d = g(e, l, l.takeDerivative(e)),
            m = g(e, p, p.takeDerivative(e));
          return t
            .OrderedPair([i.mean([f, d]), i.mean([h, m])])
            .getConcreteTree(n);
        }));
      var g = function (e, t, r) {
        return t.dependsOn(e) ? r : a;
      };
      for (var y in u) {
        var v = u[y];
        t[y].prototype.takeDerivative = v;
      }
    },
  ),
  define("math/features/substitute", ["require", "parsenodes"], function (e) {
    var t = e("parsenodes"),
      r = {
        Identifier: function (e) {
          return e[this._symbol] ? e[this._symbol] : this;
        },
        FreeVariable: function (e) {
          return e[this._symbol] ? e[this._symbol] : this;
        },
        Constant: function (e) {
          return this;
        },
        Expression: function (e) {
          return this.copyWithArgs(
            this.args.map(function (t) {
              return t.substitute(e);
            }),
          );
        },
        List: function (e) {
          return t.List(
            this.args.map(function (t) {
              return t.substitute(e);
            }),
          );
        },
        SolvedEquation: function (e) {
          return new this.constructor(
            this._symbol,
            this._expression.substitute(e),
          );
        },
        OptimizedRegression: function (e) {
          return new this.constructor(
            this.model.substitute(e),
            this.parameters,
            this.residualVariables,
            this.residuals,
            this.statistics,
          );
        },
      };
    for (var n in r) t[n].prototype.substitute = r[n];
  }),
  define(
    "math/features/solve",
    [
      "require",
      "math/baseparser",
      "parsenodes",
      "math/errormsg",
      "math/builtinframe",
      "worker/workerconfig",
    ],
    function (e) {
      function t(e) {
        var t = Object.create(m);
        return (
          (t.a = e[2] ? e[2].tryGetConcreteTree(m) : y),
          (t.b = e[1] ? e[1].tryGetConcreteTree(m) : y),
          (t.c = e[0] ? e[0].tryGetConcreteTree(m) : y),
          t
        );
      }
      function r(e) {
        return 0 === e.a.constantValue ? (0 === e.b.constantValue ? 0 : 1) : 2;
      }
      function n(e, n, i, a) {
        for (var s, o, u = [], c = [], l = 0; l < i.length; l++) {
          var p = i[l],
            f = 0;
          h.eachArgs([n], function (e) {
            var t = e[0];
            f = Math.max(f, t.polynomialOrder(p));
          });
          var d = f > 2,
            m = i.length > 1 && !e.validSolvedVariable(p),
            g = a && n.extractConditions(p, y) !== y;
          d || m || g
            ? ((c[l] = {}), (u[l] = 1 / 0))
            : ((c[l] = []),
              (u[l] = 0),
              h.eachArgs([n], function (e) {
                var n = e[0];
                ((o = t(n.getPolynomialCoefficients(p))),
                  c[l].push(o),
                  (u[l] = Math.max(u[l], r(o))));
              }));
        }
        var v;
        if (1 === i.length) ((o = c[0]), (s = i[0]), (v = u[0]));
        else {
          var b;
          ((b = 0 === u[0] ? 1 : 0 === u[1] ? 0 : u[0] < u[1] ? 0 : 1),
            (o = c[b]),
            (s = i[b]),
            (v = u[b]));
        }
        return { localFrame: o, variableOfInterest: s, effectiveOrder: v };
      }
      function i(e, t) {
        return t ? I.inequality : I.generalEquation;
      }
      function a(e) {
        ((e.f = v.getConcreteTree(e)),
          (e.g = b.getConcreteTree(e)),
          (e.p = x.getConcreteTree(e)),
          (e.q = _.getConcreteTree(e)),
          (e.m = c(1e305)));
      }
      var s = e("math/baseparser"),
        o = e("parsenodes"),
        u = o.Base,
        c = o.Constant,
        l = o.Equation,
        p = o.SolvedEquation,
        f = o.BaseComparator,
        h = o.List,
        d = e("math/errormsg"),
        m = e("math/builtinframe"),
        g = e("worker/workerconfig"),
        y = c(0),
        v = s.parse("b*b"),
        b = s.parse("4*a*c"),
        x = s.parse("(-b+\\sqrt{b*b-4*a*c})/(2*a)"),
        _ = s.parse("(-b-\\sqrt{b*b-4*a*c})/(2*a)"),
        E = s.parse("[\\{\\abs(b)>0:-c/b\\}]"),
        S = s.parse("[\\{\\abs(a)>0:-b/(2*a)\\}]"),
        w = s.parse("[\\{a=0:\\{b<0:-c/b\\},q\\},\\{a=0:\\{b>0:-c/b\\},p\\}]"),
        M = s.parse(
          "[\\{a=0:\\{b<0:-c/b\\},a>0:q\\},\\{a=0:\\{b=0:\\{c>0:-m\\}\\},a>0:\\{f<g:-m\\},p\\},\\{a=0:\\{b=0:\\{c>0:m\\}\\},a>0:\\{f<g:m\\},q\\},\\{a=0:\\{b>0:-c/b\\},a>0:p\\}]",
        ),
        I = {
          inequality: function (e) {
            return (a(e), M.getConcreteTree(e));
          },
          generalEquation: function (e) {
            return (
              a(e),
              e.a.isConstant && 0 === e.a.constantValue
                ? E.getConcreteTree(e)
                : e.f.isConstant &&
                    e.g.isConstant &&
                    e.f.constantValue - e.g.constantValue === 0
                  ? S.getConcreteTree(e)
                  : w.getConcreteTree(e)
            );
          },
        };
      ((u.prototype.trySolve = function (e, t) {
        try {
          return this.solve(e, t);
        } catch (e) {
          if (e instanceof o.Error) return e;
          throw e;
        }
      }),
        (l.prototype.solve = function (e, t) {
          return this.asComparator().solve(e, t);
        }),
        (f.prototype.solve = function (e, t) {
          var r = this.tryGetConcreteTree(t);
          if (r.isError) return r;
          if (r.isConstant) return r;
          var a = "=" !== this.getOperator(),
            s = this._difference.tryGetConcreteTree(t);
          s.isBroadcast &&
            (s = h(
              s.mapElements(function (e) {
                return e;
              }),
            ));
          var o = s.getDependencies();
          if (0 === o.length)
            return s.isList
              ? h(
                  s.args.map(function (e) {
                    return c(0 === e.constantValue);
                  }),
                )
              : c(0 === s.constantValue);
          if (1 === o.length && s.isList && !a) return s;
          if (1 === o.length && !a && !g.plotSingleVariableImplicitEquations)
            return d.singleVariableImplicitEquationsDisabled();
          var u = h.wrap(s);
          if (o.length > 2)
            return d
              .tooManyVariables(this.getSliderVariables(e, r))
              .setDependencies(o);
          if (a && !e.validInequalityVariables(o))
            return d.invalidInequalityVariables().setDependencies(o);
          var l = n(e, u, o, a),
            f = l.localFrame,
            m = l.effectiveOrder,
            y = l.variableOfInterest;
          if (e.complicatedPolarImplicit(y, m))
            return d.complicatedPolarImplicit().setDependencies(o);
          if (!e.validImplicitVariables(o)) return d.invalidImplicitVariables();
          if (m > 2) return s;
          for (var v = i(o, a), b = [], x = 0; x < f.length; x++) {
            var _ = v(f[x]);
            if (_.isError) return _;
            if (_.isConstant) b.push(_);
            else
              for (var E = 0; E < _.args.length; E++) {
                var S = _.args[E],
                  w = u.args[x].extractConditions(y, S).getConcreteTree(t);
                b.push(w);
              }
          }
          return p(y, h(b));
        }));
    },
  ),
  define(
    "math/evaluationstate",
    ["require", "graphing/graphmode", "parsenodes", "graphing/label"],
    function (e) {
      function t(e) {
        return e.isError
          ? e.getError()
          : void 0 === e.constantValue
            ? ""
            : +e.constantValue;
      }
      function r(e, r, n) {
        for (var i = [], a = 0; a < r.columns.length; a++) {
          var s = n.columns[a],
            o = { dependent: !s.isIndependent, discrete: s.isIndependent };
          (s.isError
            ? ((o.error = s.getError()), (o.values = []))
            : (o.values = s.values.map(t)),
            i.push(o));
        }
        return { column_data: i };
      }
      function n(e, t, r) {
        var n = { variables: [], errorMap: {}, dimensions: {} };
        if (
          (r.center.isError && (n.errorMap.center = !0),
          r.radianAngle.isError && (n.errorMap.angle = !0),
          r.width.isError && (n.errorMap.width = !0),
          r.height.isError && (n.errorMap.height = !0),
          r.center.isError ||
            r.radianAngle.isError ||
            r.width.isError ||
            r.height.isError)
        )
          return ((n.variables = t.getSliderVariables(e, r)), n);
        ((n.dimensions.x = []),
          (n.dimensions.y = []),
          (n.dimensions.radianAngle = []),
          (n.dimensions.width = []),
          (n.dimensions.height = []),
          a.List.eachArgs(
            [r.center, r.radianAngle, r.width, r.height],
            function (e) {
              (n.dimensions.x.push(+e[0].args[0].constantValue),
                n.dimensions.y.push(+e[0].args[1].constantValue),
                n.dimensions.radianAngle.push(+e[1].constantValue),
                n.dimensions.width.push(+e[2].constantValue),
                n.dimensions.height.push(+e[3].constantValue));
            },
          ));
        var s = e.graphingEnabled() ? t.getGraphMode(e, r) : i.NONE;
        return (
          s !== i.NONE && (n.is_graphable = !0),
          r.moveStrategy && (n.move_strategy = r.moveStrategy),
          n
        );
      }
      var i = e("graphing/graphmode"),
        a = e("parsenodes"),
        s = e("graphing/label"),
        o = function () {
          return { operator: "=", variables: [] };
        },
        u = function (e, t, u) {
          if (t.isTable) return r(e, t, u);
          if (t.isImage) return n(e, t, u);
          var c = o();
          if (
            u.isError &&
            (!(t instanceof a.FunctionDefinition) || u.blocksExport)
          )
            return (
              (c.error = u.getError()),
              (c.variables = t.getSliderVariables(e, u)),
              (c.is_single_identifier = t instanceof a.Identifier),
              c
            );
          (u.moveStrategy &&
            ((c.move_strategy = u.moveStrategy),
            (c.default_drag_mode = u.defaultDragMode)),
            t.isInequality() && (c.is_inequality = !0),
            (c.operator = t.getOperator()),
            u instanceof a.SolvedEquation
              ? u._expression.constantValue !== !0 &&
                u._expression.constantValue !== !1 &&
                (c.assignment = u._symbol)
              : t instanceof a.Assignment && (c.assignment = t._symbol));
          var l = e.graphingEnabled() ? t.getGraphMode(e, u) : i.NONE;
          if (l !== i.NONE) {
            ((c.is_graphable = !0),
              (c.expression_type = t.getExpressionType(l, u.valueType)),
              u.isShadeBetween() && (c.is_shade_between = !0));
            var p = t.tableInfo(e, u);
            p && ((c.is_tableable = !0), (c.table_info = p));
          }
          ((c.variables = c.is_graphable ? [] : t.getSliderVariables(e, u)),
            (c.is_single_identifier = t instanceof a.Identifier));
          var f = t.getSliderInfo();
          f
            ? ((c.is_slidable = !0),
              (c.is_animatable = !c.is_graphable),
              (c.constant_value = f.value))
            : u.isConstant && (c.constant_value = u.constantValue);
          var h = u.getEvaluationInfo();
          if (
            (!h ||
              "=" !== c.operator ||
              t.isConstant ||
              t.isFunction ||
              c.is_slidable ||
              ((c.is_evaluable = !0), (c.zero_values = h)),
            u instanceof a.OptimizedRegression)
          ) {
            var d = {};
            for (var m in u.parameters)
              u.parameters.hasOwnProperty(m) &&
                (d[s.identifierToLatex(m)] = +u.parameters[m].constantValue);
            ((c.is_regression = !0),
              (c.regression = {
                parameters: d,
                residualVariable: s.identifierToLatex(u.residualVariable),
                residualSuggestionId: u.residualSuggestionId,
                shouldSuggestLogMode: u.shouldSuggestLogMode,
                statistics: u.statistics,
              }));
          }
          return c;
        };
      return ((u.default = o), u);
    },
  ),
  define(
    "math/statementanalysis",
    [
      "require",
      "math/evaluationstate",
      "pjs",
      "graphing/graphmode",
      "worker/workerconfig",
    ],
    function (e) {
      var t = e("math/evaluationstate"),
        r = e("pjs"),
        n = e("graphing/graphmode"),
        i = e("worker/workerconfig");
      return r(function (e) {
        ((e.init = function (e, r, n) {
          ((this.policy = e),
            (this.rawTree = r),
            (this.concreteTree = n),
            (this.evaluationState = t(e, r, n)));
        }),
          (e.exportTo = function (e, t) {
            this.rawTree.exportTo(e, this.concreteTree, t);
          }),
          (e.graph = function (e) {
            return this.rawTree.graph(this.policy, this.concreteTree, e);
          }),
          (e.getGraphMode = function () {
            return this.rawTree.getGraphMode(this.policy, this.concreteTree);
          }),
          (e.getGraphInfo = function () {
            return this.rawTree.getGraphInfo(this.policy, this.concreteTree);
          }),
          (e.shouldIntersect = function () {
            if (!this.evaluationState.is_graphable) return !1;
            if (!this.rawTree.userData.shouldGraph) return !1;
            if (!i.pointsOfInterest) return !1;
            var e = this.getGraphMode();
            return e === n.X || e === n.Y;
          }));
      });
    },
  ),
  define(
    "math/features/analyze",
    [
      "require",
      "parsenodes",
      "math/statementanalysis",
      "math/builtinframe",
      "math/parsenode/builtinfunction",
      "math/errormsg",
      "math/comparators",
      "math/types",
      "graphing/graphmode",
    ],
    function (e) {
      function t(e, t, r, n) {
        var a = n.getDependencies();
        switch (n.valueType) {
          case c.Point:
          case c.ListOfPoint:
            return a.length
              ? e.validParametricVariables(a)
                ? i(e, r, n)
                : i(
                    e,
                    r,
                    o
                      .tooManyVariables(r.getSliderVariables(e, n))
                      .setDependencies(a),
                  )
              : i(e, r, n);
          case c.Number:
          case c.ListOfNumber:
            switch (a.length) {
              case 0:
                return i(e, r, n);
              case 1:
                return e.validExpressionVariable(a[0])
                  ? i(e, r, n)
                  : i(
                      e,
                      r,
                      o
                        .equationRequired(e.implicitDependency(a[0]))
                        .setDependencies(a),
                    );
              default:
                return e.validImplicitVariables(a)
                  ? i(e, r, o.equationRequired().setDependencies(a))
                  : i(
                      e,
                      r,
                      o
                        .tooManyVariables(r.getSliderVariables(e, n))
                        .setDependencies(a),
                    );
            }
        }
      }
      function r(e, t) {
        return e.filter(function (e) {
          return !t[e];
        });
      }
      var n = e("parsenodes"),
        i = e("math/statementanalysis"),
        a = e("math/builtinframe"),
        s = e("math/parsenode/builtinfunction"),
        o = e("math/errormsg"),
        u = e("math/comparators"),
        c = e("math/types"),
        l = e("graphing/graphmode");
      ((n.Base.prototype.analyze = function (e, t) {
        return i(e, this, this.tryGetConcreteTree(t));
      }),
        (n.Expression.prototype.analyze = function (e, r) {
          var n = this.tryGetConcreteTree(r);
          return n.isError ? i(e, this, n) : t(e, r, this, n);
        }),
        (n.Identifier.prototype.analyze = function (e, t) {
          return i(e, this, this.tryGetConcreteTree(t));
        }),
        (n.FunctionDefinition.prototype.analyze = function (e, t) {
          if (a[this._symbol]) return this.asEquation().analyze(e, t);
          var r = this._symbol.split("_")[0];
          if (s[r]) return i(e, this, o.cannotRedefine(this._symbol, r));
          var n = this.tryGetConcreteTree(t);
          if (n.isError) return i(e, this, n);
          var u = this._argSymbols,
            c = n.getDependencies();
          if (c.indexOf(this._symbol) !== -1)
            return i(e, this, o.selfReferentialFunction(this._symbol));
          var l = c.filter(function (e) {
            return u.indexOf(e) === -1;
          });
          return e.unplottablePolarFunction(this._symbol, c)
            ? i(e, this, o.unplottablePolarFunction())
            : l.some(e.assignmentForbidden)
              ? i(
                  e,
                  this,
                  o
                    .addArgumentsToDefinition(l, this._symbol, u)
                    .setDependencies(c),
                )
              : l.length
                ? i(
                    e,
                    this,
                    o
                      .tooManyVariables(this.getSliderVariables(e, n))
                      .setDependencies(c),
                  )
                : i(e, this, n);
        }),
        (n.Assignment.prototype.analyze = function (e, t, r) {
          var s = this._symbol;
          if (!e.validLHS(s)) return i(e, this, o.invalidLHS(s));
          if (a[s]) return this.asEquation().analyze(e, t);
          var u = this.tryGetConcreteTree(t);
          if (u.isError) return i(e, this, u);
          var c = u.getDependencies();
          if (this.isEquation(u)) return this.asEquation().analyze(e, t);
          if (c.length > 1) {
            var l = this.getSliderVariables(e, u);
            return l.length
              ? i(
                  e,
                  this,
                  o.tooManyVariables(l).allowExport().setDependencies(c),
                )
              : i(e, this, u);
          }
          var p = this.getMoveStrategy(t, u, r);
          if (p) {
            var f = this.getDefaultDragMode(p);
            return i(e, this, n.MovablePoint(u.args, p, f));
          }
          return i(e, this, u);
        }),
        (n.Regression.prototype.analyze = function (e, t, r, n, a) {
          return i(e, this, this.tryOptimize(e, t, r, n, a));
        }),
        (n.Polygon.prototype.analyze = function (e, t) {
          var r = this.tryGetConcreteTree(t),
            n = r.getDependencies();
          return n.length
            ? i(
                e,
                this,
                o
                  .tooManyVariables(this.getSliderVariables(e, r))
                  .setDependencies(n),
              )
            : i(e, this, this.tryGetConcreteTree(t));
        }),
        (n.Equation.prototype.analyze = n.BaseComparator.prototype.analyze =
          function (e, t) {
            var r = this.trySolve(e, t);
            if (r.isError) return i(e, this, r);
            if (r instanceof n.SolvedEquation && r.getDependencies().length) {
              var a = r.getDependencies().concat(r._symbol);
              if (!e.validImplicitVariables(a))
                return i(
                  e,
                  this,
                  o.invalidImplicitVariables().setDependencies(a),
                );
            }
            return this.getGraphMode(e, r) !== l.IMPLICIT ||
              e.validImplicitVariables(r.getDependencies())
              ? i(e, this, r)
              : i(
                  e,
                  this,
                  o
                    .invalidImplicitVariables()
                    .setDependencies(r.getDependencies()),
                );
          }),
        (n.DoubleInequality.prototype.analyze = function (e, t) {
          var r = this.tryGetConcreteTree(t);
          if (r.isError) return i(e, this, r);
          var n = r.getDependencies();
          return u.table[this._operators[0]].direction !==
            u.table[this._operators[1]].direction
            ? i(e, this, o.mismatchedDoubleInequality())
            : e.validDoubleInequalitySymbol(r._symbol) &&
                e.validDoubleInequalityVariables(n)
              ? n.length > 2
                ? i(
                    e,
                    this,
                    o
                      .tooManyVariables(this.getSliderVariables(e, r))
                      .setDependencies(n),
                  )
                : r._expressions[0].getDependencies().indexOf(r._symbol) !==
                      -1 ||
                    r._expressions[1].getDependencies().indexOf(r._symbol) !==
                      -1
                  ? i(
                      e,
                      this,
                      o.complicatedDoubleInequality().setDependencies(n),
                    )
                  : i(e, this, r)
              : i(
                  e,
                  this,
                  o.invalidDoubleInequalityVariables().setDependencies(n),
                );
        }),
        (n.And.prototype.analyze = function (e, t) {
          var r = this.tryGetConcreteTree(t);
          if (r.isError) return i(e, this, r);
          var n = r.getDependencies();
          return n.length
            ? e.validDoubleInequalityVariables(n)
              ? i(e, this, o.complicatedDoubleInequality().setDependencies(n))
              : i(
                  e,
                  this,
                  o
                    .tooManyVariables(this.getSliderVariables(e, r))
                    .setDependencies(n),
                )
            : i(e, this, r);
        }),
        (n.OrderedPair.prototype.analyze = function (e, r, a) {
          var s = this.tryGetConcreteTree(r);
          if (s.isError) return i(e, this, s);
          var o = this.getMoveStrategy(r, s, a);
          if (o) {
            var u = this.getDefaultDragMode(o);
            return i(e, this, n.MovablePoint(s.args, o, u));
          }
          return t(e, r, this, s);
        }),
        (n.Table.prototype.analyze = function (e, t) {
          for (
            var a, s = Object.create(t), u = [], c = 0;
            c < this.columns.length;
            c++
          ) {
            var l = this.columns[c].analyze(e, s, t);
            if (
              (0 === c &&
                (l.concreteTree.isIndependent
                  ? e.validFirstColumnVariable(l.concreteTree.header._symbol)
                    ? (a = l.concreteTree.header._symbol)
                    : (l = i(e, this.columns[c], o.invalidFirstTableColumn()))
                  : (l = i(
                      e,
                      this.columns[c],
                      o.invalidDependentFirstTableColumn(),
                    ))),
              l.concreteTree.isIndependent)
            )
              l.rawTree.exportToLocal(l.concreteTree, s);
            else if (!l.concreteTree.isError) {
              var p = l.concreteTree.header.getDependencies(),
                f = r(p, s);
              f.length &&
                (l = i(
                  e,
                  this.columns[c],
                  o.tooManyVariables(f).setDependencies(f),
                ));
            }
            u.push(l.concreteTree);
          }
          var h = n.Table(u),
            d = i(e, this, h);
          return ((d.evaluationState.is_graphable = !0), d);
        }),
        (n.TableColumn.prototype.analyze = function (e, t, r) {
          var n = this.header.tableError();
          if (n) return i(e, this, o.invalidTableHeader(n));
          var a = this.tryGetConcreteTree(t, r);
          if (a.isError) return i(e, this, a);
          if (a.header.isError) return i(e, this, a.header);
          if (a.values.isError) return i(e, this, a.values);
          for (var s = 0; s < a.values.length; s++)
            if (!a.values[s].isError) {
              var u = this.values[s] && this.values[s].tableError();
              if (u) a.values[s] = o.invalidTableEntry(u);
              else {
                var c = a.values[s].getDependencies();
                c.length &&
                  (a.values[s] = o.tooManyVariables(c).setDependencies(c));
              }
            }
          return i(e, this, a);
        }),
        (n.Image.prototype.analyze = function (e, t, r) {
          var a = this.tryGetConcreteTree(t);
          if (
            a.radianAngle.isError ||
            a.center.isError ||
            a.width.isError ||
            a.height.isError
          )
            return i(e, this, a);
          var s = a.center.getDependencies(),
            u = a.radianAngle.getDependencies(),
            c = a.width.getDependencies(),
            l = a.height.getDependencies();
          return "OrderedPair" !== this.center.type
            ? i(
                e,
                this,
                n.Image({
                  center: o.parseError(),
                  radianAngle: a.radianAngle,
                  width: a.width,
                  height: a.height,
                }),
              )
            : s.length || u.length || c.length || l.length
              ? i(
                  e,
                  this,
                  n.Image({
                    center: s.length
                      ? o.tooManyVariables(u).setDependencies(s)
                      : a.center,
                    radianAngle: u.length
                      ? o.tooManyVariables(u).setDependencies(u)
                      : a.radianAngle,
                    width: c.length
                      ? o.tooManyVariables(c).setDependencies(c)
                      : a.width,
                    height: l.length
                      ? o.tooManyVariables(l).setDependencies(l)
                      : a.height,
                  }),
                )
              : ((a.moveStrategy = this.getMoveStrategy(t, a, r)),
                i(e, this, a));
        }));
    },
  ),
  define(
    "math/features/analyzeFourFunction",
    [
      "require",
      "parsenodes",
      "math/statementanalysis",
      "math/errormsg",
      "math/parsenode/builtinfunction",
      "math/builtinconstants",
    ],
    function (e) {
      function t(e, t) {
        return n(e, this, i.inequalitiesUnsupported());
      }
      var r = e("parsenodes"),
        n = e("math/statementanalysis"),
        i = e("math/errormsg"),
        a = e("math/parsenode/builtinfunction"),
        s = e("math/builtinconstants");
      ((r.Base.prototype.analyzeFourFunction = function (e, t) {
        var r = this.tryGetConcreteTree(t);
        return r.isError ? n(e, this, r) : n(e, this, i.parseError());
      }),
        (r.Expression.prototype.analyzeFourFunction = function (e, t) {
          var r = this.tryGetConcreteTree(t);
          if (r.isError) return n(e, this, r);
          var o = r.getDependencies();
          if (o.length > 0) {
            var u,
              c = o[0];
            return (
              (u = a.hasOwnProperty(c)
                ? i.functionUnsupported(c)
                : s.hasOwnProperty(c)
                  ? i.constantUnsupported(c)
                  : i.variablesUnsupported(c)),
              n(e, this, u)
            );
          }
          return n(e, this, r);
        }),
        (r.Assignment.prototype.analyzeFourFunction = function (e, t) {
          return n(e, this, i.assignmentsUnsupported());
        }),
        (r.FunctionDefinition.prototype.analyzeFourFunction = function (e, t) {
          return n(e, this, i.functionDefinitionsUnsupported());
        }),
        (r.Equation.prototype.analyzeFourFunction = function (e, t) {
          return n(e, this, i.equationsUnsupported());
        }),
        (r.And.prototype.analyzeFourFunction = t),
        (r.DoubleInequality.prototype.analyzeFourFunction = t),
        (r.BaseComparator.prototype.analyzeFourFunction = t),
        (r.Regression.prototype.analyzeFourFunction = function (e, t) {
          return n(e, this, i.regressionsUnsupported());
        }),
        (r.OrderedPair.prototype.analyzeFourFunction = function (e, t) {
          return n(e, this, i.pointsUnsupported());
        }));
    },
  ),
  define(
    "math/features/analyzeScientific",
    [
      "require",
      "parsenodes",
      "math/statementanalysis",
      "math/errormsg",
      "math/builtinframe",
    ],
    function (e) {
      function t(e, t) {
        return n(e, this, i.inequalitiesUnsupported());
      }
      var r = e("parsenodes"),
        n = e("math/statementanalysis"),
        i = e("math/errormsg"),
        a = e("math/builtinframe");
      ((r.Base.prototype.analyzeScientific = function (e, t) {
        var r = this.tryGetConcreteTree(t);
        return r.isError ? n(e, this, r) : n(e, this, i.parseError());
      }),
        (r.Expression.prototype.analyzeScientific = function (e, t) {
          var r = this.tryGetConcreteTree(t);
          if (r.isError) return n(e, this, r);
          var a = r.getDependencies();
          return a.length > 0
            ? n(e, this, i.tooManyVariables(a))
            : n(e, this, r);
        }),
        (r.Assignment.prototype.analyzeScientific = function (e, t) {
          var r = this._symbol;
          if (a[r]) return n(e, this, i.cannotRedefine(r));
          var s = this.tryGetConcreteTree(t);
          if (s.isError) return n(e, this, s);
          var o = s.getDependencies();
          return this.isEquation(s)
            ? n(e, this, i.equationsUnsupported())
            : o.length > 0
              ? n(e, this, i.tooManyVariables(o))
              : n(e, this, s);
        }),
        (r.FunctionDefinition.prototype.analyzeScientific = function (e, t) {
          if (a[this._symbol])
            return n(e, this, i.cannotRedefine(this._symbol));
          var r = this.tryGetConcreteTree(t);
          if (r.isError) return n(e, this, r);
          var s = this._argSymbols,
            o = r.getDependencies();
          if (o.indexOf(this._symbol) !== -1)
            return n(e, this, i.selfReferentialFunction(this._symbol));
          var u = o.filter(function (e) {
            return s.indexOf(e) === -1;
          });
          return u.length
            ? n(e, this, i.addArgumentsToDefinition(u, this._symbol, s))
            : n(e, this, r);
        }),
        (r.Equation.prototype.analyzeScientific = function (e, t) {
          return n(e, this, i.equationsUnsupported());
        }),
        (r.And.prototype.analyzeScientific = t),
        (r.DoubleInequality.prototype.analyzeScientific = t),
        (r.BaseComparator.prototype.analyzeScientific = t),
        (r.Regression.prototype.analyzeScientific = function (e, t) {
          return n(e, this, i.regressionsUnsupported());
        }),
        (r.OrderedPair.prototype.analyzeScientific = function (e, t) {
          return n(e, this, i.pointsUnsupported());
        }));
    },
  ),
  define(
    "math/features/analyzeSingleExpressionScientific",
    [
      "require",
      "parsenodes",
      "math/statementanalysis",
      "math/errormsg",
      "math/parsenode/builtinfunction",
      "math/builtinconstants",
    ],
    function (e) {
      function t(e, t) {
        return n(e, this, i.inequalitiesUnsupported());
      }
      var r = e("parsenodes"),
        n = e("math/statementanalysis"),
        i = e("math/errormsg"),
        a = e("math/parsenode/builtinfunction"),
        s = e("math/builtinconstants");
      ((r.Base.prototype.analyzeSingleExpressionScientific = function (e, t) {
        var r = this.tryGetConcreteTree(t);
        return r.isError ? n(e, this, r) : n(e, this, i.parseError());
      }),
        (r.Expression.prototype.analyzeSingleExpressionScientific = function (
          e,
          t,
        ) {
          var r = this.tryGetConcreteTree(t);
          if (r.isError) return n(e, this, r);
          var o = r.getDependencies();
          if (o.length > 0) {
            var u,
              c = o[0];
            return (
              (u = a.hasOwnProperty(c)
                ? i.functionUnsupported(c)
                : s.hasOwnProperty(c)
                  ? i.constantUnsupported(c)
                  : i.variablesUnsupported(c)),
              n(e, this, u)
            );
          }
          return n(e, this, r);
        }),
        (r.Assignment.prototype.analyzeSingleExpressionScientific = function (
          e,
          t,
        ) {
          return n(e, this, i.assignmentsUnsupported());
        }),
        (r.FunctionDefinition.prototype.analyzeSingleExpressionScientific =
          function (e, t) {
            return n(e, this, i.functionDefinitionsUnsupported());
          }),
        (r.Equation.prototype.analyzeSingleExpressionScientific = function (
          e,
          t,
        ) {
          return n(e, this, i.equationsUnsupported());
        }),
        (r.And.prototype.analyzeSingleExpressionScientific = t),
        (r.DoubleInequality.prototype.analyzeSingleExpressionScientific = t),
        (r.BaseComparator.prototype.analyzeSingleExpressionScientific = t),
        (r.Regression.prototype.analyzeSingleExpressionScientific = function (
          e,
          t,
        ) {
          return n(e, this, i.regressionsUnsupported());
        }),
        (r.OrderedPair.prototype.analyzeSingleExpressionScientific = function (
          e,
          t,
        ) {
          return n(e, this, i.pointsUnsupported());
        }));
    },
  ),
  define("graphing/dragmode", ["require", "exports"], function (e, t) {
    "use strict";
    (Object.defineProperty(t, "__esModule", { value: !0 }),
      (t.NONE = "NONE"),
      (t.X = "X"),
      (t.Y = "Y"),
      (t.XY = "XY"),
      (t.AUTO = "AUTO"));
  }),
  define(
    "graphing/reconcileDragMode",
    ["require", "exports", "graphing/dragmode"],
    function (e, t, r) {
      "use strict";
      function n(e) {
        return e
          ? "none" === e[0].type && "none" === e[1].type
            ? r.NONE
            : "none" === e[1].type
              ? r.X
              : "none" === e[0].type
                ? r.Y
                : r.XY
          : r.NONE;
      }
      function i(e, t) {
        var i = n(t);
        switch (e) {
          case r.NONE:
            return r.NONE;
          case r.AUTO:
            return i;
          case r.XY:
            return i;
          case r.X:
            return i === r.X || i === r.XY ? r.X : r.NONE;
          case r.Y:
            return i === r.Y || i === r.XY ? r.Y : r.NONE;
          default:
            return r.NONE;
        }
      }
      (Object.defineProperty(t, "__esModule", { value: !0 }), (t.default = i));
    },
  ),
  define(
    "math/features/getgraphmode",
    [
      "require",
      "parsenodes",
      "graphing/graphmode",
      "graphing/reconcileDragMode",
      "graphing/dragmode",
      "math/types",
    ],
    function (e) {
      function t(e, t) {
        var r;
        return (
          (r =
            e && e.hasOwnProperty("dragMode")
              ? e.dragMode === o.AUTO
                ? t.defaultDragMode
                : e.dragMode
              : t.defaultDragMode),
          s(r, t.moveStrategy)
        );
      }
      function r(e, r) {
        var n = r.getDependencies();
        switch (r.valueType) {
          case u.Point:
          case u.ListOfPoint:
            return r.isMovablePoint && t(this.userData, r) !== o.NONE
              ? a.XYPOINT_MOVABLE
              : 0 === n.length
                ? a.XYPOINT
                : e.validParametricVariables(n)
                  ? a.PARAMETRIC
                  : a.NONE;
          case u.Number:
          case u.ListOfNumber:
            return 1 === n.length ? a.Y : a.NONE;
          default:
            return a.NONE;
        }
      }
      function n(e, t) {
        var r = t._expression.getDependencies();
        if (r.length > 1) return a.NONE;
        if (
          t._expression.valueType !== u.Number &&
          t._expression.valueType !== u.ListOfNumber
        )
          return a.NONE;
        var n = t._symbol,
          i = r[0];
        return e.graphMode(n, i);
      }
      var i = e("parsenodes"),
        a = e("graphing/graphmode"),
        s = e("graphing/reconcileDragMode").default,
        o = e("graphing/dragmode"),
        u = e("math/types");
      ((i.Base.prototype.getGraphMode = function (e, t) {
        return a.NONE;
      }),
        (i.Identifier.prototype.getGraphMode = function (e, t) {
          return e.graphableAsBareIdentifier(this._symbol) ? a.Y : a.NONE;
        }),
        (i.Expression.prototype.getGraphMode = r),
        (i.Equation.prototype.getGraphMode =
          i.BaseComparator.prototype.getGraphMode =
            function (e, t) {
              var r = t.getDependencies();
              return t.isConstant
                ? a.NONE
                : t instanceof i.SolvedEquation
                  ? 0 === r.length
                    ? e.graphableAsConstant(t._symbol)
                      ? e.constantGraphMode(t._symbol)
                      : a.NONE
                    : n(e, t)
                  : r.length <= 2
                    ? a.IMPLICIT
                    : a.NONE;
            }),
        (i.DoubleInequality.prototype.getGraphMode = function (e, t) {
          return e.constantGraphMode(t._symbol);
        }),
        (i.Assignment.prototype.getGraphMode = function (e, t) {
          if (t instanceof i.SolvedEquation) return n(e, t);
          if (this.isEquation(t)) return this.asEquation().getGraphMode(e, t);
          var s = t.getDependencies();
          switch (t.valueType) {
            case u.Number:
            case u.ListOfNumber:
              switch (s.length) {
                case 0:
                  return e.graphableAsConstant(this._symbol)
                    ? e.constantGraphMode(this._symbol)
                    : a.NONE;
                case 1:
                  return t.valueType !== u.ListOfNumber ||
                    e.graphableListVariables(this._symbol, s[0])
                    ? e.graphMode(this._symbol, s[0])
                    : a.NONE;
                default:
                  return a.NONE;
              }
              break;
            default:
              return r.call(this, e, t);
          }
        }),
        (i.FunctionDefinition.prototype.getGraphMode = function (e, t) {
          if (1 !== this._argSymbols.length) return a.NONE;
          var r = e.graphMode(this._symbol, this._argSymbols[0]),
            n = t.getDependencies();
          switch (t.valueType) {
            case u.Number:
            case u.ListOfNumber:
              switch (n.length) {
                case 0:
                  return r;
                case 1:
                  return n[0] !== this._argSymbols[0] ? a.NONE : r;
                default:
                  return a.NONE;
              }
              break;
            default:
              return a.NONE;
          }
        }),
        (i.Regression.prototype.getGraphMode = function (e, t) {
          return this.isLhsSimple && t.isModelValid
            ? 1 !== t.model.getDependencies().length
              ? a.NONE
              : a.Y
            : a.NONE;
        }),
        (i.Polygon.prototype.getGraphMode = function (e, t) {
          return t.isError ? a.NONE : a.POLYGONFILL;
        }),
        (i.Image.prototype.getGraphMode = function (e, t) {
          return this.userData.showPoints
            ? this.center.isError ||
              this.radianAngle.isError ||
              this.width.isError ||
              this.height.isError
              ? a.NONE
              : a.XYPOINT
            : a.NONE;
        }));
    },
  ),
  define(
    "math/features/getgraphinfo",
    ["require", "parsenodes", "math/builtinframe", "math/domaintypes"],
    function (e) {
      var t = e("parsenodes"),
        r = e("math/builtinframe"),
        n = e("math/domaintypes");
      ((t.Base.prototype.getGraphInfo = function (e, t) {
        var r,
          i,
          a = t.getDependencies();
        switch (a.length) {
          case 0:
            ((r = !0), (i = t.boundDomain("x")));
            break;
          case 1:
            ((i = t.boundDomain(a[0])),
              (r = "known" === i.type && t.isLinear(a[0])));
            break;
          case 2:
            ((r = !1), (i = n.unknownDomain()));
        }
        return {
          graphMode: this.getGraphMode(e, t),
          color: this.userData.color,
          pointStyle: this.userData.pointStyle,
          lineStyle: this.userData.lineStyle,
          operator: this.getOperator(),
          isLinear: r,
          linearCoefficients: r ? t.getLinearCoefficients() : void 0,
          domainBound: i,
        };
      }),
        (t.Base.prototype.getLinearCoefficients = function () {
          var e = this.getDependencies();
          switch (e.length) {
            case 0:
              return [+this.constantValue, 0];
            case 1:
              var t = this.getPolynomialCoefficients(e[0]);
              return [
                t[0] ? +t[0].getConcreteTree(r).constantValue : 0,
                t[1] ? +t[1].getConcreteTree(r).constantValue : 0,
              ];
            default:
              return [NaN, NaN];
          }
        }),
        (t.OrderedPair.prototype.getLinearCoefficients = function () {
          return [
            this.args[0].getLinearCoefficients(),
            this.args[1].getLinearCoefficients(),
          ];
        }));
    },
  ),
  define(
    "math/features/getMoveStrategy",
    ["require", "parsenodes", "math/types"],
    function (e) {
      function t(e) {
        return { type: "none", inputString: e };
      }
      function r(e) {
        return { type: "updateCoordinate", inputString: e };
      }
      function n(e, t, r) {
        return { type: "updateSlider", inputString: e, id: t, coefficients: r };
      }
      function i(e, t) {
        for (var r in t)
          if (
            t[r].evaluationState.assignment === e &&
            t[r].evaluationState.is_slidable
          )
            return r;
      }
      function a(e, t, r, n) {
        for (var a = e.getDependencies(), o = 0; o < a.length; o++)
          if (n[a[o]]) return !1;
        for (var c = a.length - 1; c >= 0; c--) {
          var l = a[c],
            p = i(l, r);
          if (void 0 !== p) {
            var f = Object.create(t);
            f[l] = s.FreeVariable(l);
            var h = e.tryGetConcreteTree(f);
            if (!h.isError) {
              var d = h.polynomialOrder(l);
              if (1 === d) {
                var m = h.getPolynomialCoefficients(l),
                  g = m[1] ? m[1].getConcreteTree(f) : u,
                  y = m[0] ? m[0].getConcreteTree(f) : u;
                if (
                  y.isConstant &&
                  g.isConstant &&
                  isFinite(y.constantValue) &&
                  isFinite(g.constantValue) &&
                  0 !== g.constantValue
                ) {
                  var v = [
                    -y.constantValue / g.constantValue,
                    1 / g.constantValue,
                  ];
                  return { symbol: l, id: p, coefficients: v };
                }
              }
            }
          }
        }
        return !1;
      }
      var s = e("parsenodes"),
        o = e("math/types"),
        u = s.Constant(0);
      ((s.Base.prototype.getMoveStrategy = function () {}),
        (s.Assignment.prototype.getMoveStrategy = function (e, t, r) {
          if (this._expression instanceof s.OrderedPair)
            return this._expression.getMoveStrategy(e, t, r);
        }),
        (s.OrderedPair.prototype.getMoveStrategy = function (e, i, s) {
          if (i.valueType === o.Point && 0 === i.getDependencies().length) {
            for (var u = [], c = {}, l = 0; l < 2; l++) {
              var p = this.args[l],
                f = p.getInputString();
              if (p.isConstant) u[l] = r(f);
              else {
                var h = a(p, e, s, c);
                (h && ((u[l] = n(f, h.id, h.coefficients)), (c[h.symbol] = !0)),
                  u[l] || (u[l] = t(f)));
              }
            }
            if ("none" !== u[0].type || "none" !== u[1].type) return u;
          }
        }),
        (s.Image.prototype.getMoveStrategy = function (e, i, s) {
          if (
            (!this.userData || this.userData.shouldGraph !== !1) &&
            "OrderedPair" === i.center.type &&
            i.center.args[0].isConstant &&
            i.center.args[1].isConstant &&
            i.width.isConstant &&
            i.height.isConstant &&
            i.radianAngle.isConstant
          ) {
            for (
              var o = [
                  this.width,
                  this.height,
                  this.center.args[0],
                  this.center.args[1],
                ],
                u = [],
                c = {},
                l = [2, 3, 0, 1],
                p = 0;
              p < l.length;
              p++
            ) {
              var f = l[p],
                h = o[f];
              if (h) {
                var d = h.getInputString();
                if (h.isConstant) u[f] = r(d);
                else {
                  var m = a(h, e, s, c);
                  (m &&
                    ((u[f] = n(d, m.id, m.coefficients)), (c[m.symbol] = !0)),
                    u[f] || (u[f] = t(d)));
                }
              } else u[f] = t("");
            }
            if (
              "none" !== u[0].type ||
              "none" !== u[1].type ||
              "none" !== u[2].type ||
              "none" !== u[3].type
            )
              return u;
          }
        }));
    },
  ),
  define(
    "math/features/getDefaultDragMode",
    ["require", "parsenodes", "graphing/dragmode"],
    function (e) {
      var t = e("parsenodes"),
        r = e("graphing/dragmode");
      ((t.Base.prototype.getMoveStrategy = function () {
        return r.NONE;
      }),
        (t.Assignment.prototype.getDefaultDragMode = function (e) {
          return "none" !== e[0].type && "none" !== e[1].type
            ? r.XY
            : "none" !== e[0].type
              ? r.X
              : "none" !== e[1].type
                ? r.Y
                : r.NONE;
        }),
        (t.OrderedPair.prototype.getDefaultDragMode = function (e) {
          return "updateSlider" === e[0].type && "updateSlider" === e[1].type
            ? r.XY
            : "updateSlider" === e[0].type
              ? r.X
              : "updateSlider" === e[1].type
                ? r.Y
                : r.NONE;
        }));
    },
  ),
  define(
    "math/features/tableinfo",
    ["require", "parsenodes", "math/types", "graphing/label"],
    function (e) {
      var t = e("parsenodes"),
        r = t.List,
        n = e("math/types"),
        i = e("graphing/label");
      ((t.Base.prototype.tableInfo = function (e, t) {
        return !1;
      }),
        (t.Identifier.prototype.tableInfo = function (e, t) {
          return (
            !!e.graphableAsBareIdentifier(this._symbol) &&
            !!e.validFirstColumnVariable(this._symbol) && {
              independent_variable: this._symbol,
              dependent_column: this._inputString,
              by_reference: !1,
            }
          );
        }),
        (t.Expression.prototype.tableInfo = function (e, t) {
          var i = t.getDependencies();
          switch (t.valueType) {
            case n.Point:
            case n.ListOfPoint:
              if (0 !== i.length) return !1;
              if (
                t.isMovablePoint &&
                ("updateSlider" === t.moveStrategy[0].type ||
                  "updateSlider" === t.moveStrategy[1].type)
              )
                return !1;
              var a = r.wrap(t).mapElements(function (e) {
                return e.asArray();
              });
              return {
                independent_variable: "x",
                dependent_column: "y",
                by_reference: !1,
                values: a,
              };
            case n.Number:
              if (1 !== i.length) return !1;
              var s = i[0];
              return (
                !!e.validFirstColumnVariable(s) && {
                  independent_variable: s,
                  dependent_column: this._inputString,
                  by_reference: !1,
                }
              );
            default:
              return !1;
          }
        }),
        (t.Assignment.prototype.tableInfo = function (e, r) {
          if (r instanceof t.SolvedEquation) return !1;
          if (!this._inputString.length) return !1;
          var n = r.getDependencies();
          if (n.length > 1) return !1;
          var a;
          if (0 === n.length) {
            if (!e.tableableAsConstant(this._symbol)) return !1;
            a = e.implicitIndependent(this._symbol);
          } else a = n[0];
          if (!e.validFirstColumnVariable(a)) return !1;
          var s = e.assignmentForbidden(this._symbol)
            ? i.trimLatex(this._inputString.replace(/[^=]*=/, ""))
            : i.trimLatex(this._inputString.split("=")[0]);
          return {
            independent_variable: a,
            dependent_column: s,
            by_reference: !e.assignmentForbidden(this._symbol),
          };
        }),
        (t.FunctionDefinition.prototype.tableInfo = function (e, t) {
          if (1 !== this._argSymbols.length) return !1;
          if (!this._inputString.length) return !1;
          var r = t.getDependencies();
          if (r.length > 1) return !1;
          var n = this._argSymbols[0];
          if (!e.validFirstColumnVariable(n)) return !1;
          var a = e.assignmentForbidden(this._symbol),
            s = a
              ? i.trimLatex(this._inputString.replace(/[^=]*=/, ""))
              : i.trimLatex(this._inputString.split("=")[0]);
          return {
            independent_variable: n,
            dependent_column: s,
            by_reference: !a,
          };
        }),
        (t.BaseComparator.prototype.tableInfo = function (e, t) {
          return !1;
        }),
        (t.DoubleInequality.prototype.tableInfo = function (e, t) {
          return !1;
        }),
        (t.Equation.prototype.tableInfo = function (e, t) {
          return !1;
        }));
    },
  ),
  define(
    "math/features/tableerror",
    ["require", "parsenodes", "lib/worker-i18n"],
    function (e) {
      var t = e("parsenodes"),
        r = e("lib/worker-i18n");
      ((t.Base.prototype.tableError = function () {
        return this.isInequality()
          ? r.t("Inequalities are not allowed.")
          : !(this instanceof t.Expression) &&
              r.t("This type of expression is not allowed.");
      }),
        (t.List.prototype.tableError = function () {
          return r.t("Lists are not allowed.");
        }),
        (t.Equation.prototype.tableError = t.Assignment.prototype.tableError =
          function () {
            return r.t("Equations are not allowed.");
          }),
        (t.FunctionDefinition.prototype.tableError = function () {
          return r.t("Function definitions are not allowed.");
        }),
        (t.Regression.prototype.tableError = function () {
          return r.t("Regressions are not allowed.");
        }));
    },
  ),
  define("math/features/islinear", ["require", "parsenodes"], function (e) {
    var t = e("parsenodes");
    ((t.Base.prototype.isLinear = function (e) {
      return !1;
    }),
      (t.Expression.prototype.isLinear = function (e) {
        return this.polynomialOrder(e) <= 1;
      }),
      (t.SolvedEquation.prototype.isLinear = function (e) {
        return this._expression.isLinear(e);
      }),
      (t.OptimizedRegression.prototype.isLinear = function (e) {
        return this.model.isLinear(e);
      }),
      (t.OrderedPair.prototype.isLinear = function (e) {
        return this.args[0].isLinear(e) && this.args[1].isLinear(e);
      }),
      (t.List.prototype.isLinear = function (e) {
        return this.args.every(function (t) {
          return t.isLinear(e);
        });
      }),
      (t.Broadcast.prototype.isLinear = function (e) {
        for (
          var r = this._replacedSymbols,
            n = this._expression,
            i = this._lists,
            a = {},
            s = 0;
          s < i.length;
          s++
        )
          if (i[s].dependsOn(e)) {
            if (!i[s].isLinear(e)) return !1;
            a[r[s]] = t.FreeVariable(e);
          }
        return n.substitute(a).isLinear(e);
      }));
  }),
  define("math/expression-types", ["require", "exports"], function (e, t) {
    "use strict";
    function r(e, r) {
      switch (e) {
        case t.X_OR_Y:
        case t.SINGLE_POINT:
        case t.POINT_LIST:
        case t.PARAMETRIC:
        case t.POLAR:
        case t.IMPLICIT:
        case t.POLYGON:
          var n = t.EXPRESSION_PROP_DEFAULTS[e];
          return {
            points: void 0 === r.points ? n.points : r.points,
            lines: void 0 === r.lines ? n.lines : r.lines,
            fill: void 0 === r.fill ? n.fill : r.fill,
          };
        default:
          var i = e;
          return i;
      }
    }
    (Object.defineProperty(t, "__esModule", { value: !0 }),
      (t.X_OR_Y = "X_OR_Y"),
      (t.SINGLE_POINT = "SINGLE_POINT"),
      (t.POINT_LIST = "POINT_LIST"),
      (t.PARAMETRIC = "PARAMETRIC"),
      (t.POLAR = "POLAR"),
      (t.IMPLICIT = "IMPLICIT"),
      (t.POLYGON = "POLYGON"),
      (t.EXPRESSION_PROP_DEFAULTS = {
        X_OR_Y: { points: !1, lines: !0, fill: !1 },
        SINGLE_POINT: { points: !0, lines: !1, fill: !1 },
        POINT_LIST: { points: !0, lines: !1, fill: !1 },
        PARAMETRIC: { points: !1, lines: !0, fill: !1 },
        POLAR: { points: !1, lines: !0, fill: !1 },
        IMPLICIT: { points: !1, lines: !0, fill: !1 },
        POLYGON: { points: !1, lines: !0, fill: !0 },
      }),
      (t.getReconciledExpressionProps = r));
  }),
  define(
    "math/features/graph",
    [
      "require",
      "underscore",
      "parsenodes",
      "math/plotter",
      "graphing/graphmode",
      "math/comparators",
      "graphing/dragmode",
      "math/expression-types",
    ],
    function (e) {
      function t(e) {
        for (var t = [], r = [], n = e.length, i = 0; i < n; i++)
          (t.push(e[i][0]), r.push(e[i][1]));
        return { defined: { x: t, y: r } };
      }
      function r(e) {
        return Array.prototype.concat.apply([], e);
      }
      function n(e, t, r) {
        return (
          !!e &&
          (0 === t && 0 === r
            ? "none" !== e[2].type || "none" !== e[3].type
            : 0 !== t && 0 !== r
              ? "none" !== e[0].type && "none" !== e[1].type
              : 0 !== t
                ? "none" !== e[0].type
                : 0 !== r && "none" !== e[1].type)
        );
      }
      var i = e("underscore"),
        a = e("parsenodes"),
        s = e("math/plotter").default,
        o = e("graphing/graphmode"),
        u = e("math/comparators"),
        c = e("graphing/dragmode"),
        l = e("math/expression-types"),
        p = a.List;
      ((a.Base.prototype._graph = function (e, n, u, c) {
        if (n instanceof a.SolvedEquation)
          return this._graph(e, n._expression, u, c);
        var f,
          h,
          d,
          m,
          g,
          y = this,
          v = n.getExpressionType(c.graphMode, n.valueType),
          b = l.getReconciledExpressionProps(v, {
            points: this.userData.points,
            lines: this.userData.lines,
            fill: this.userData.fill,
          });
        switch (c.graphMode) {
          case o.XYPOINT_MOVABLE:
            return (
              (f = [n.asArray()]),
              (d = this.userData.shouldGraph && b.points),
              (g = this.userData.showLabel && !d),
              d
                ? [
                    {
                      segments: [f],
                      graphMode: c.graphMode,
                      color: this.userData.color,
                      style: this.userData.pointStyle,
                      showLabel: !!this.userData.showLabel,
                      labelSize: this.userData.labelSize,
                      labelOrientation: this.userData.labelOrientation,
                      labels: this.computedLabels || [],
                      poi: t(f),
                    },
                  ]
                : g
                  ? [
                      {
                        segments: [f],
                        graphMode: o.XYPOINT,
                        color: this.userData.color,
                        style: this.userData.pointStyle,
                        showLabel: !!this.userData.showLabel,
                        nakedLabel: !0,
                        labelSize: this.userData.labelSize,
                        labelOrientation: this.userData.labelOrientation,
                        labels: this.computedLabels || [],
                        poi: t(f),
                      },
                    ]
                  : []
            );
          case o.XYPOINT:
            return (
              (h = []),
              (f = p.wrap(n).mapElements(function (e) {
                return e.asArray();
              })),
              (d = this.userData.shouldGraph && b.points),
              (m = this.userData.shouldGraph && b.lines),
              (g = this.userData.showLabel && !d && !m),
              (this.userData.showLabel || d) &&
                h.push({
                  segments: [f],
                  graphMode: c.graphMode,
                  color: this.userData.color,
                  style: this.userData.pointStyle,
                  showLabel: !!this.userData.showLabel,
                  showPoint: d,
                  labelSize: this.userData.labelSize,
                  labelOrientation: this.userData.labelOrientation,
                  nakedLabel: g,
                  labels: this.computedLabels || [],
                  poi: t(f),
                }),
              m &&
                h.push({
                  segments: [f].map(r),
                  graphMode: o.PARAMETRIC,
                  color: this.userData.color,
                  style: this.userData.lineStyle,
                  poi: [],
                }),
              h
            );
          case o.PARAMETRIC:
            var x = this.userData,
              _ = [];
            if (
              ((h = p.wrap(n).mapElements(function (r) {
                var n = r.getDependencies();
                if (0 === n.length)
                  return (
                    (f = [r.asArray()]),
                    {
                      segments: [f],
                      graphMode: o.XYPOINT,
                      color: x.color,
                      style: x.lineStyle,
                      poi: t(f),
                    }
                  );
                var i = r.getCompiledFunction().fn,
                  a = y.getGraphInfo(e, r);
                return (
                  (a.graphMode = c.graphMode),
                  (a.domain = y.userData.domain),
                  (a.style = y.userData.lineStyle),
                  s.computeGraphData(u, a, i)
                );
              })),
              b.fill)
            ) {
              if (
                (h.forEach(function (e) {
                  _.push({
                    segments: e.segments,
                    color: x.color,
                    fillOpacity: x.fillOpacity,
                    graphMode: o.POLYGONFILL,
                    poi: [],
                  });
                }),
                !b.lines)
              )
                return _;
              h = h.concat(_);
            }
            return h;
          case o.X:
          case o.Y:
          case o.IMPLICIT:
          case o.POLAR:
            return (
              (h = []),
              p.wrap(n).eachElement(function (t) {
                var r,
                  n =
                    c.graphMode === o.IMPLICIT
                      ? t.getCompiledFunction(["x", "y"])
                      : t.getCompiledFunction();
                try {
                  r = t.getCompiledDerivative();
                } catch (e) {}
                var a = y.getGraphInfo(e, t);
                ((a.graphMode = c.graphMode), (a.style = y.userData.lineStyle));
                var l = r
                  ? s.computeGraphData(u, a, n.fn, r.fn)
                  : s.computeGraphData(u, a, n.fn);
                ((l.compiled = n),
                  l.fillSegments
                    ? h.push(i.omit(l, "fillSegments"))
                    : h.push(l),
                  a.graphMode === o.IMPLICIT &&
                    "=" !== a.operator &&
                    h.push({
                      graphMode: o.POLYGONFILL,
                      segments: l.fillSegments,
                      poi: {},
                    }));
              }),
              h
            );
          default:
            return !1;
        }
      }),
        (a.Base.prototype.graph = function (e, t, r) {
          var n = this.getGraphInfo(e, t);
          return this._graph(e, t, r, n);
        }),
        (a.BaseComparator.prototype.graph = function (e, t, r) {
          var n = this,
            i = this.getGraphInfo(e, t),
            c = i.graphMode;
          if (c === o.IMPLICIT) return this._graph(e, t, r, i);
          if (c === o.NONE) return !1;
          if (!(t instanceof a.SolvedEquation)) return !1;
          var l = this.getOperator(),
            p = [],
            f = [],
            h = !0;
          (t._expression.eachElement(function (e) {
            p.push(e.getCompiledFunction());
            try {
              f.push(e.getCompiledDerivative());
            } catch (e) {
              h = !1;
            }
          }),
            h || (f = void 0));
          var d,
            m,
            g = [],
            y = [-1, 0, 0, 1],
            v = p.length;
          for (m = 0; m < v; m++) {
            var b = this.getGraphInfo(e, t._expression.args[m]);
            ((b.graphMode = c),
              (b.style = n.userData.lineStyle),
              (d = f
                ? s.computeGraphData(r, b, p[m].fn, f[m].fn)
                : s.computeGraphData(r, b, p[m].fn)),
              (d.compiled = p[m]),
              (d.operator = u.get(u.table[l].inclusive, y[m % 4])),
              g.push(d));
          }
          for (m = 0; m < v; m += 4) {
            var x = s.polygonsFromSegments(
              g[m + 1].segments,
              g[m + 2].segments,
              c,
            );
            g.push({ graphMode: o.POLYGONFILL, segments: x, poi: {} });
          }
          return g;
        }),
        (a.DoubleInequality.prototype.graph = function (e, t, r) {
          var n = this.getGraphInfo(e, t);
          if (n.graphMode === o.NONE) return !1;
          var i = [],
            a = u.get(u.table[this._operators[0]].inclusive, 0),
            c = u.get(u.table[this._operators[1]].inclusive, 0),
            l = this.userData,
            f = this;
          return (
            p.eachArgs(t._expressions, function (t) {
              var u, p;
              ((t[0].userData = t[1].userData = l),
                (u = f._graph(e, t[0], r, n)[0]),
                (u.operator = a),
                i.push(u),
                (p = f._graph(e, t[1], r, n)[0]),
                (p.operator = c),
                i.push(p));
              var h = s.polygonsFromSegments(
                u.segments,
                p.segments,
                u.graphMode,
              );
              i.push({ graphMode: o.POLYGONFILL, segments: h, poi: {} });
            }),
            i
          );
        }),
        (a.Regression.prototype.graph = function (e, t, r) {
          var n = this.getGraphInfo(e, t);
          return this._graph(e, t.model, r, n);
        }),
        (a.Polygon.prototype.graph = function (e, t, n) {
          for (
            var i = this.getGraphInfo(e, t),
              a = t.args[0].asValue(),
              s = [],
              u = void 0 === this.userData.lines || this.userData.lines,
              c = void 0 === this.userData.fill || this.userData.fill,
              l = [],
              p = [],
              f = 0;
            f < a.length;
            f++
          ) {
            var h = a[f][0],
              d = a[f][1];
            isFinite(h) && isFinite(d)
              ? (u || c) && p.push([h, d])
              : (u || c) && (p.length > 1 && l.push(p), (p = []));
          }
          if (l.length || p.length) {
            (p.push([a[0][0], a[0][1]]), l.push(p));
            var m = l.map(r);
            (c &&
              s.push({
                segments: m,
                graphMode: o.POLYGONFILL,
                poi: [],
                color: i.color,
                fillOpacity: this.userData.fillOpacity,
                style: i.style,
              }),
              u &&
                s.push({
                  segments: m,
                  graphMode: o.PARAMETRIC,
                  poi: [],
                  color: i.color,
                  style: this.userData.lineStyle,
                }));
          }
          return s;
        }),
        (a.Table.prototype.isValueDraggable = function (e, t, r) {
          if (!e.columns[t].isIndependent) return !1;
          var n = this.columns[t],
            i = n.values,
            a = i && i[r];
          return !(
            !a ||
            !isFinite(a.constantValue) ||
            0 !== a._dependencies.length
          );
        }),
        (a.Table.prototype.graph = function (e, n, i) {
          var a = [];
          if (n.columns[0].isError) return a;
          for (
            var s = n.columns[0], u = s.values, l = 1;
            l < this.columns.length;
            l++
          ) {
            var p = n.columns[l];
            if (!p.isError) {
              var f = this.columns[l].header.userData;
              if (!f.hidden) {
                for (
                  var h = f.dragMode,
                    d = h === c.X || h === c.XY,
                    m = h === c.Y || h === c.XY,
                    g = !!f.points,
                    y = !!f.lines,
                    v = p.isDiscrete(s),
                    b = y && v,
                    x = y && !v,
                    _ = [],
                    E = [],
                    S = [],
                    w = [],
                    M = [],
                    I = [],
                    P = 0;
                  P < u.length;
                  P++
                ) {
                  var T = u[P],
                    C = p.values[P];
                  if (
                    T &&
                    C &&
                    isFinite(T.constantValue) &&
                    isFinite(C.constantValue)
                  ) {
                    if (g) {
                      var D = d && this.isValueDraggable(n, 0, P),
                        O = m && this.isValueDraggable(n, l, P);
                      D || O
                        ? (S.push([T.constantValue, C.constantValue]),
                          w.push({ index: P, dragX: D, dragY: O }))
                        : E.push([T.constantValue, C.constantValue]);
                    }
                    b && I.push([T.constantValue, C.constantValue]);
                  } else b && (I.length > 1 && M.push(I), (I = []));
                }
                if (
                  (S.length &&
                    _.push({
                      graphMode: o.XYPOINT_MOVABLE,
                      segments: [S],
                      color: f.color,
                      tableId: f.tableId,
                      poi: t(S),
                      movablePointInfo: w,
                    }),
                  E.length &&
                    _.push({
                      segments: [E],
                      graphMode: o.XYPOINT,
                      showPoint: !0,
                      poi: t(E),
                      color: f.color,
                      style: f.pointStyle,
                    }),
                  (M.length || I.length) &&
                    (M.push(I),
                    _.push({
                      segments: M.map(r),
                      graphMode: o.PARAMETRIC,
                      poi: [],
                      color: f.color,
                      style: f.lineStyle,
                    })),
                  x)
                ) {
                  var N = this.columns[l].header.graph(
                    e,
                    n.columns[l].header,
                    i,
                  );
                  N.length && Array.prototype.push.apply(_, N);
                }
                _.length && (a[f.id] = _);
              }
            }
          }
          return a;
        }),
        (a.Image.prototype.graph = function (e, r, i) {
          var a = [];
          if (
            !(
              "OrderedPair" === r.center.type &&
              r.center.args[0].isConstant &&
              r.center.args[1].isConstant &&
              r.radianAngle.isConstant &&
              r.width.isConstant &&
              r.height.isConstant
            )
          )
            return a;
          for (
            var s = [],
              u = [],
              c = r.width.constantValue / 2,
              l = r.height.constantValue / 2,
              p = r.radianAngle.constantValue,
              f = -1;
            f <= 1;
            f++
          )
            for (var h = -1; h <= 1; h++) {
              var d = [
                  r.center.args[0].constantValue +
                    f * c * Math.cos(p) +
                    h * l * Math.sin(p),
                  r.center.args[1].constantValue -
                    f * c * Math.sin(p) +
                    h * l * Math.cos(p),
                ],
                m = n(r.moveStrategy, f, h);
              m && (s.push(d), u.push([f, h]));
            }
          return (
            a.push({
              segments: [s],
              scaleFactors: [u],
              graphMode: o.XYPOINT_MOVABLE,
              color: this.userData.color,
              style: this.userData.style,
              poi: t(s),
            }),
            a
          );
        }));
    },
  ),
  define(
    "math/features/elementAt",
    ["require", "parsenodes", "math/builtinframe"],
    function (e) {
      function t(e) {
        for (var t = 0; t < this.length; t++) e(this.elementAt(t));
      }
      function r(e) {
        for (var t = [], r = 0; r < this.length; r++)
          t.push(e(this.elementAt(r)));
        return t;
      }
      var n = e("parsenodes"),
        i = e("math/builtinframe");
      ((n.List.prototype.elementAt = function (e) {
        return (
          (e = Math.floor(e)),
          e >= 0 && e < this.args.length ? this.args[e] : n.Constant(NaN)
        );
      }),
        (n.Broadcast.prototype.elementAt = function (e) {
          if (((e = Math.floor(e)), e < 0 || e >= this.length))
            return n.Constant(NaN);
          for (var t = {}, r = 0; r < this._replacedSymbols.length; r++)
            t[this._replacedSymbols[r]] = this._lists[r].elementAt(e);
          return this._expression.substitute(t).getConcreteTree(i);
        }),
        (n.List.prototype.eachElement = t),
        (n.Broadcast.prototype.eachElement = t),
        (n.List.prototype.mapElements = r),
        (n.Broadcast.prototype.mapElements = r),
        (n.OrderedPair.prototype.elementAt = function (e) {
          switch (e) {
            case 0:
              return this.args[0];
            case 1:
              return this.args[1];
            default:
              return n.Constant(NaN);
          }
        }));
    },
  ),
  define("lib/number-to-latex", ["require", "exports"], function (e, t) {
    "use strict";
    function r(e) {
      if ("string" == typeof e) return e;
      var t = e + "";
      return (
        (t = t.replace(/1e\+?([-\d]+)/, "10^{$1}")),
        (t = t.replace(/([-\d\.]+)e\+?([-\d]+)/, "$1\\cdot 10^{$2}"))
      );
    }
    (Object.defineProperty(t, "__esModule", { value: !0 }), (t.default = r));
  }),
  define(
    "math/features/printLatex",
    ["require", "parsenodes", "graphing/label", "lib/number-to-latex"],
    function (e) {
      function t() {
        return u.identifierToLatex(this._symbol) + " ";
      }
      function r(e) {
        switch (e) {
          case ">":
            return "\\gt ";
          case "<":
            return "\\lt ";
          case ">=":
            return "\\ge ";
          case "<=":
            return "\\le ";
          case "=":
            return "=";
        }
      }
      function n(e) {
        return e.printLatex();
      }
      function i() {
        switch (this._symbol) {
          case "sqrt":
            return "\\sqrt{" + this.args[0].printLatex() + "}";
          case "nthroot":
            return (
              "\\sqrt[" +
              this.args[1].printLatex() +
              "]{" +
              this.args[0].printLatex() +
              "}"
            );
          case "logbase":
            return (
              "\\log_{" +
              this.args[1].printLatex() +
              "}\\left(" +
              this.args[0].printLatex() +
              "\\right)"
            );
          default:
            return (
              u.identifierToLatex(this._symbol) +
              "\\left(" +
              this.args.map(n).join(", ") +
              "\\right)"
            );
        }
      }
      function a(e) {
        return e.isConstant && e.constantValue === !0;
      }
      function s(e) {
        return e.isConstant && e.isNaN();
      }
      var o = e("parsenodes"),
        u = e("graphing/label"),
        c = e("lib/number-to-latex").default;
      ((o.Identifier.prototype.printLatex = t),
        (o.FreeVariable.prototype.printLatex = t),
        (o.Constant.prototype.printLatex = function () {
          return c(this.constantValue);
        }),
        (o.Negative.prototype.printLatex = function () {
          return "-\\left(" + this.args[0].printLatex() + "\\right)";
        }),
        (o.Add.prototype.printLatex = function () {
          return (
            "\\left(" +
            this.args[0].printLatex() +
            "\\right)+\\left(" +
            this.args[1].printLatex() +
            "\\right)"
          );
        }),
        (o.PercentOf.prototype.printLatex = function () {
          return (
            this.args[0].printLatex() +
            " \\% \\operatorname{of} " +
            this.args[1].printLatex()
          );
        }),
        (o.Subtract.prototype.printLatex = function () {
          return (
            "\\left(" +
            this.args[0].printLatex() +
            "\\right)-\\left(" +
            this.args[1].printLatex() +
            "\\right)"
          );
        }),
        (o.Multiply.prototype.printLatex = function () {
          return (
            "\\left(" +
            this.args[0].printLatex() +
            "\\right)*\\left(" +
            this.args[1].printLatex() +
            "\\right)"
          );
        }),
        (o.Divide.prototype.printLatex = function () {
          return (
            "\\frac{" +
            this.args[0].printLatex() +
            "}{" +
            this.args[1].printLatex() +
            "}"
          );
        }),
        (o.Exponent.prototype.printLatex = function () {
          return (
            "\\left(" +
            this.args[0].printLatex() +
            "\\right)^{" +
            this.args[1].printLatex() +
            "}"
          );
        }),
        (o.Assignment.prototype.printLatex = function () {
          return (
            u.identifierToLatex(this._symbol) +
            "=" +
            this._expression.printLatex()
          );
        }),
        (o.Equation.prototype.printLatex = function () {
          return this._lhs.printLatex() + "=" + this._rhs.printLatex();
        }),
        (o.BaseComparator.prototype.printLatex = function () {
          return (
            "\\left(" +
            this.args[0].printLatex() +
            "\\right)" +
            r(this.operator) +
            "\\left(" +
            this.args[1].printLatex() +
            "\\right)"
          );
        }),
        (o.DoubleInequality.prototype.printLatex = function () {
          return (
            "\\left(" +
            this.args[0].printLatex() +
            "\\right)" +
            r(this.args[1]) +
            this.args[2].printLatex() +
            r(this.args[3]) +
            "\\left(" +
            this.args[4].printLatex() +
            "\\right)"
          );
        }),
        (o.And.prototype.printLatex = function () {
          if (
            !(
              this.args[0] instanceof o.BaseComparator &&
              this.args[1] instanceof o.BaseComparator
            )
          )
            throw new Error("Not implemented");
          if (
            this.args[0].args[1].printLatex() !==
            this.args[1].args[0].printLatex()
          )
            throw new Error("Not implemented");
          return (
            "\\left(" +
            this.args[0].args[0].printLatex() +
            "\\right)" +
            r(this.args[0].operator) +
            "\\left(" +
            this.args[0].args[1].printLatex() +
            "\\right)" +
            r(this.args[1].operator) +
            "\\left(" +
            this.args[1].args[1].printLatex() +
            "\\right)"
          );
        }),
        (o.NativeFunction.prototype.printLatex = i),
        (o.TypedFunction.prototype.printLatex = i),
        (o.ReducerFunction.prototype.printLatex = i),
        (o.ParametrizedReducerFunction.prototype.printLatex = i),
        (o.DoubleReducerFunction.prototype.printLatex = i),
        (o.FunctionCall.prototype.printLatex = i),
        (o.Prime.prototype.printLatex = function () {
          switch (this.args[0]._symbol) {
            case "logbase":
              return (
                "\\log_{" +
                this.args[0].args[1].printLatex() +
                "}" +
                Array(this.order + 1).join("'") +
                "\\left(" +
                this.args[0].args[0].printLatex() +
                "\\right)"
              );
            default:
              return (
                u.identifierToLatex(this.args[0]._symbol) +
                Array(this.order + 1).join("'") +
                "\\left(" +
                this.args[0].args.map(n).join(", ") +
                "\\right)"
              );
          }
        }),
        (o.List.prototype.printLatex = function () {
          return "\\left[" + this.args.map(n).join(", ") + "\\right]";
        }),
        (o.Range.prototype.printLatex = function () {
          return (
            "\\left[" +
            this.args[0].args.map(n).join(", ") +
            " ... " +
            this.args[1].args.map(n).join(", ") +
            "\\right]"
          );
        }),
        (o.ListAccess.prototype.printLatex = function () {
          return (
            "\\left(" +
            this.args[0].printLatex() +
            "\\right)\\left[" +
            this.args[1].printLatex() +
            "\\right]"
          );
        }),
        (o.OrderedPair.prototype.printLatex = function () {
          return "\\left(" + this.args.map(n).join(", ") + "\\right)";
        }),
        (o.Sum.prototype.printLatex = function () {
          return (
            "\\sum_{" +
            this.args[0].printLatex() +
            "=" +
            this.args[1].printLatex() +
            "}^{" +
            this.args[2].printLatex() +
            "}\\left(" +
            this.args[3].printLatex() +
            "\\right)"
          );
        }),
        (o.Product.prototype.printLatex = function () {
          return (
            "\\prod_{" +
            this.args[0].printLatex() +
            "=" +
            this.args[1].printLatex() +
            "}^{" +
            this.args[2].printLatex() +
            "}\\left(" +
            this.args[3].printLatex() +
            "\\right)"
          );
        }),
        (o.Integral.prototype.printLatex = function () {
          return (
            "\\int_{" +
            this.args[1].printLatex() +
            "}^{" +
            this.args[2].printLatex() +
            "}\\left(" +
            this.args[3].printLatex() +
            "\\right)d" +
            this.args[0].printLatex()
          );
        }),
        (o.FunctionExponent.prototype.printLatex = function () {
          return (
            this.args[0].printLatex() +
            "\\left(" +
            this.args[1].printLatex() +
            "\\right)^{" +
            this.args[2].printLatex() +
            "}"
          );
        }),
        (o.Piecewise.prototype.printLatex = function () {
          var e = this;
          if (a(e.args[0])) return e.args[1].printLatex();
          for (var t = ["\\left\\{"]; ; ) {
            if (a(e.args[0])) {
              t.push(e.args[1].printLatex());
              break;
            }
            if ((t.push(e.args[0].printLatex(), ": "), s(e.args[2]))) {
              t.push(e.args[1].printLatex());
              break;
            }
            if (
              (t.push(e.args[1].printLatex(), ", "),
              !(e.args[2] instanceof o.Piecewise))
            ) {
              t.push(e.args[2].printLatex());
              break;
            }
            e = e.args[2];
          }
          return (t.push("\\right\\}"), t.join(""));
        }),
        (o.FunctionDefinition.prototype.printLatex = function () {
          return (
            u.identifierToLatex(this._symbol) +
            "\\left(" +
            this._argSymbols.map(u.identifierToLatex).join(", ") +
            "\\right) = " +
            this._expression.printLatex()
          );
        }),
        (o.Derivative.prototype.printLatex = function () {
          return (
            "\\frac{d}{d" +
            u.identifierToLatex(this._symbol) +
            "}\\left(" +
            this.args[0].printLatex() +
            "\\right)"
          );
        }),
        (o.Regression.prototype.printLatex = function () {
          return (
            "\\left(" +
            this._lhs.printLatex() +
            "\\right)\\sim\\left(" +
            this._rhs.printLatex() +
            "\\right)"
          );
        }),
        (o.Polygon.prototype.printLatex = function () {
          return "\\polygon\\left(" + this.args.map(n).join(", ") + "\\right)";
        }));
    },
  ),
  define(
    "math/features/getExpressionType",
    [
      "require",
      "parsenodes",
      "graphing/graphmode",
      "math/expression-types",
      "math/types",
    ],
    function (e) {
      var t = e("parsenodes"),
        r = e("graphing/graphmode"),
        n = e("math/expression-types"),
        i = e("math/types");
      ((t.Base.prototype.getExpressionType = function (e, t) {
        return e === r.X || e === r.Y
          ? n.X_OR_Y
          : e === r.XYPOINT || e === r.XYPOINT_MOVABLE
            ? t === i.Point
              ? n.SINGLE_POINT
              : n.POINT_LIST
            : e === r.PARAMETRIC
              ? n.PARAMETRIC
              : e === r.POLAR
                ? n.POLAR
                : e === r.IMPLICIT
                  ? n.IMPLICIT
                  : n.X_OR_Y;
      }),
        (t.Polygon.prototype.getExpressionType = function (e, t) {
          return n.POLYGON;
        }));
    },
  ),
  define(
    "parser",
    [
      "require",
      "math/baseparser",
      "math/features/getConcreteTree",
      "math/features/getValueType",
      "math/features/typeCheck",
      "math/features/repr",
      "math/features/scalarEvalExpression",
      "math/features/constantcollapsedcopy",
      "math/features/polynomialorder",
      "math/features/polynomialcoefficients",
      "math/features/extractconditions",
      "math/features/bounddomain",
      "math/features/derivative",
      "math/features/substitute",
      "math/features/solve",
      "math/features/analyze",
      "math/features/analyzeFourFunction",
      "math/features/analyzeScientific",
      "math/features/analyzeSingleExpressionScientific",
      "math/features/getgraphmode",
      "math/features/getgraphinfo",
      "math/features/getMoveStrategy",
      "math/features/getDefaultDragMode",
      "math/features/tableinfo",
      "math/features/tableerror",
      "math/features/islinear",
      "math/features/graph",
      "math/features/elementAt",
      "math/features/printLatex",
      "math/features/getExpressionType",
    ],
    function (e) {
      var t = e("math/baseparser");
      return (
        e("math/features/getConcreteTree"),
        e("math/features/getValueType"),
        e("math/features/typeCheck"),
        e("math/features/repr"),
        e("math/features/scalarEvalExpression"),
        e("math/features/constantcollapsedcopy"),
        e("math/features/polynomialorder"),
        e("math/features/polynomialcoefficients"),
        e("math/features/extractconditions"),
        e("math/features/bounddomain"),
        e("math/features/derivative"),
        e("math/features/substitute"),
        e("math/features/solve"),
        e("math/features/analyze"),
        e("math/features/analyzeFourFunction"),
        e("math/features/analyzeScientific"),
        e("math/features/analyzeSingleExpressionScientific"),
        e("math/features/getgraphmode"),
        e("math/features/getgraphinfo"),
        e("math/features/getMoveStrategy"),
        e("math/features/getDefaultDragMode"),
        e("math/features/tableinfo"),
        e("math/features/tableerror"),
        e("math/features/islinear"),
        e("math/features/graph"),
        e("math/features/elementAt"),
        e("math/features/printLatex"),
        e("math/features/getExpressionType"),
        t
      );
    },
  ),
  define(
    "math/finddependencyorder",
    ["require", "math/builtinframe", "underscore"],
    function (e) {
      function t(e, t, i) {
        function a(e) {
          y[e] = y[e] || {};
          var r,
            n = y[e];
          ((n.id = e),
            (n.index = v),
            (n.lowlink = v),
            b.push(n),
            (n.instack = !0),
            v++);
          for (var i = t[e].getDependencies(), u = 0; u < i.length; u++) {
            var c = i[u];
            if (d.hasOwnProperty(c))
              for (var l = d[c], p = 0; p < l.length; p++) {
                var f = l[p];
                y.hasOwnProperty(f)
                  ? ((r = y[f]),
                    r.instack && (n.lowlink = Math.min(n.lowlink, r.index)))
                  : (a(f),
                    (r = y[f]),
                    (n.lowlink = Math.min(n.lowlink, r.lowlink)));
              }
          }
          if (n.lowlink === n.index)
            if (((r = b.pop()), (r.instack = !1), r === n)) s(n);
            else {
              for (var h = [r]; ; )
                if (((r = b.pop()), (r.instack = !1), h.push(r), r === n))
                  break;
              o(h);
            }
        }
        function s(e) {
          x.push(e.id);
        }
        function o(r) {
          var i,
            a,
            s = [];
          for (a = r.length - 1; a >= 0; a--) {
            i = r[a];
            var o = t[i.id].getLegalExports(e);
            (Array.prototype.push.apply(s, o), s.push(o[0]), x.push(i.id));
          }
          for (s = n.unique(s), s.sort(), a = 0; a < s.length; a++) g[s[a]] = s;
        }
        var u,
          c,
          l,
          p,
          f,
          h = [],
          d = {},
          m = {},
          g = {},
          y = {},
          v = 0,
          b = [],
          x = [];
        if (!i) {
          i = [];
          for (u in t) t.hasOwnProperty(u) && i.push(u);
        }
        for (u in t)
          if (t.hasOwnProperty(u)) {
            for (f = t[u].exportPenalty || 0; h.length < f + 1; ) h.push([]);
            h[f].push(u);
          }
        for (f = 0; f < h.length; f++) {
          var _ = {};
          for (c = 0; c < h[f].length; c++) {
            u = h[f][c];
            var E = t[u].getLegalExports(e);
            for (l = 0; l < E.length; l++)
              ((p = E[l]),
                r[p] ||
                  d[p] ||
                  ((_[p] = _[p] || []),
                  _[p].push(u),
                  _[p].length > 1 && (m[p] = !0)));
          }
          for (p in _) d[p] = _[p];
        }
        for (c = 0; c < i.length; c++) y.hasOwnProperty(i[c]) || a(i[c]);
        return { resolved: x, multiplyDefined: m, cyclicallyDefined: g };
      }
      var r = e("math/builtinframe"),
        n = e("underscore");
      return t;
    },
  ),
  define(
    "math/findIntersections",
    ["require", "graphing/graphmode", "./plotter", "parsenodes", "./distance"],
    function (e) {
      function t(e) {
        for (var t = [], r = 0; r < e; r++)
          t[r] = { x: [], y: [], intersects: [] };
        return t;
      }
      function r(e, t, r, n) {
        return (r === l.X && n === l.X) || (r === l.Y && n === l.Y)
          ? function (r) {
              return t(r) - e(r);
            }
          : ((r === l.X && n === l.Y) || (r === l.Y && n === l.X)) &&
              function (r) {
                return r - t(e(r));
              };
      }
      function n(e) {
        e instanceof f.SolvedEquation
          ? (e = e._expression)
          : e instanceof f.OptimizedRegression && (e = e.model);
        var t = [],
          r = [];
        return (
          e instanceof f.DoubleInequality
            ? f.List.eachArgs(e._expressions, function (e) {
                (t.push(e[0].getCompiledFunction()),
                  r.push(e[0].isConstant && e[1].isNaN()),
                  t.push(e[1].getCompiledFunction()),
                  r.push(e[1].isConstant && e[1].isNaN()));
              })
            : f.List.wrap(e).eachElement(function (e) {
                (t.push(e.getCompiledFunction()),
                  r.push(e.isConstant && e.isNaN()));
              }),
          { functions: t, skipIntersecting: r }
        );
      }
      function i(e, t) {
        var r = [];
        for (var i in e)
          if (
            e.hasOwnProperty(i) &&
            String(i) !== String(t) &&
            e[i].shouldIntersect()
          ) {
            var a = e[i],
              s = n(a.concreteTree);
            r.push({
              id: i,
              graphMode: a.getGraphMode(),
              functions: s.functions,
              skipIntersecting: s.skipIntersecting,
            });
          }
        return r;
      }
      function a(e, t) {
        e.intersects = Array(e.x.length);
        for (var r = 0; r < e.x.length; r++) e.intersects[r] = t;
      }
      function s(e, t) {
        if (t === l.X) {
          var r = e.y;
          ((e.y = e.x), (e.x = r));
        }
      }
      function o(e, t) {
        (Array.prototype.push.apply(e.x, t.x),
          Array.prototype.push.apply(e.y, t.y),
          Array.prototype.push.apply(e.intersects, t.intersects));
      }
      function u(e, t, r) {
        var n = p.sampleXY(e, t),
          i = n.poi.zeros,
          a = n.poi.extrema,
          s = [],
          o = 0,
          u = 0;
        for (o = 0; o < i.x.length; o++) {
          for (; u < a.x.length && a.x[u] < i.x[o]; u++)
            h.approx(a.y[u], 0) && s.push(a.x[u]);
          s.push(i.x[o]);
        }
        for (; u < a.x.length; u++) h.approx(a.y[u], 0) && s.push(a.x[u]);
        return { x: s, y: s.map(r) };
      }
      function c(e, c, l) {
        var f = e[l],
          h = f.getGraphInfo(),
          m = f.getGraphMode(),
          g = n(f.concreteTree),
          y = t(g.functions.length),
          v = i(e, l);
        if (!v) return y;
        for (var b = 0, x = 0; x < v.length; x++)
          for (var _ = v[x], E = 0; E < g.functions.length; E++)
            if (!g.skipIntersecting[E])
              for (
                var S = g.functions[E].fn, w = p.computeDomain(c, h, S), M = 0;
                M < _.functions.length;
                M++
              )
                if (!v[x].skipIntersecting[M]) {
                  var I = _.functions[M].fn,
                    P = r(S, I, m, _.graphMode);
                  if (P) {
                    var T = u(P, w, S);
                    if (((b += T.x.length), b > d))
                      return t(g.functions.length);
                    (a(T, _.id), s(T, m), o(y[E], T));
                  }
                }
        return y;
      }
      var l = e("graphing/graphmode"),
        p = e("./plotter").default,
        f = e("parsenodes"),
        h = e("./distance"),
        d = 100;
      return { findIntersections: c, findIndicatorZeros: u };
    },
  ),
  define(
    "math/interpolatedlabel",
    ["require", "exports", "parsenodes", "math/types", "graphing/label"],
    function (e, t, r, n, i) {
      "use strict";
      function a(e) {
        return !(e.length < 2) && "`" === e[0] && "`" === e[e.length - 1];
      }
      function s(e) {
        for (
          var t,
            r = [
              "[a-zA-Z][0-9]*",
              "[a-zA-Z]_[a-zA-Z0-9]+",
              "[a-zA-Z]_\\{[a-zA-Z0-9]+\\}",
            ],
            n = "\\$({" + r.join("})|\\$({") + "})",
            i = new RegExp(n, "g"),
            a = [],
            s = 0,
            o = 0;
          (t = i.exec(e));

        ) {
          ((o = t.index), o > s && a.push(e.substr(s, o - s)));
          var u = t[0],
            c = u
              .replace(/[{}\$]/g, "")
              .replace(/^([a-zA-Z])([0-9]+)$/, "$1_$2");
          (a.push({ symbol: c, str: u }), (s = t.index + u.length));
        }
        return (s < e.length && a.push(e.substr(s)), { raw: e, parts: a });
      }
      function o(e, t) {
        return t
          ? "{" + i.truncatedLatexLabel(e, { bigCutoff: 1e7, digits: 8 }) + "}"
          : i.truncatedPlainmathLabel(e, { bigCutoff: 1e7, digits: 8 });
      }
      function u(e, t, i) {
        for (var s = [], u = a(e.raw), c = 0, l = e.parts; c < l.length; c++) {
          var p = l[c];
          if ("string" == typeof p) s.push(p);
          else {
            var f = r.Identifier(p.symbol).tryGetConcreteTree(t);
            if (f.valueType === n.Number) {
              var h = f.constantValue;
              if ("number" == typeof h) {
                s.push(o(h, u));
                continue;
              }
            } else if (f.valueType === n.ListOfNumber && f.args[i]) {
              var h = f.args[i].constantValue;
              if ("number" == typeof h) {
                s.push(o(h, u));
                continue;
              }
            }
            u ? s.push("{?}") : s.push("?");
          }
        }
        return s.join("");
      }
      (Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.isMathLabel = a),
        (t.parse = s),
        (t.interpolate = u));
    },
  ),
  define("math/policyFourFunction", ["require"], function (e) {
    var t = {
      assignmentForbidden: function (e) {
        return "ans" !== e.slice(0, 3);
      },
      sliderForbidden: function (e) {
        return !0;
      },
      sliderVariables: function () {
        return [];
      },
      graphingEnabled: function () {
        return !1;
      },
      ansEnabled: function () {
        return !0;
      },
      disabledFeatures: function () {
        return [
          "Sum",
          "Product",
          "Integral",
          "List",
          "Derivative",
          "Piecewise",
          "Exponent",
          "PercentOf",
        ];
      },
    };
    return t;
  }),
  define("math/policyScientific", ["require"], function (e) {
    var t = {
      assignmentForbidden: function (e) {
        return "tmp" === e.slice(0, 3);
      },
      sliderForbidden: function (e) {
        return !0;
      },
      sliderVariables: function () {
        return [];
      },
      graphingEnabled: function () {
        return !1;
      },
      ansEnabled: function () {
        return !0;
      },
      disabledFeatures: function () {
        return ["Sum", "Product", "Integral", "Derivative", "Piecewise"];
      },
    };
    return t;
  }),
  define("math/policySingleExpressionScientific", ["require"], function (e) {
    var t = {
      assignmentForbidden: function (e) {
        return "ans" !== e.slice(0, 3);
      },
      sliderForbidden: function (e) {
        return !0;
      },
      sliderVariables: function () {
        return [];
      },
      graphingEnabled: function () {
        return !1;
      },
      ansEnabled: function () {
        return !1;
      },
      disabledFeatures: function () {
        return [
          "Sum",
          "Product",
          "Integral",
          "Derivative",
          "Piecewise",
          "PercentOf",
        ];
      },
    };
    return t;
  }),
  define(
    "math/policyGraphing",
    ["require", "graphing/graphmode", "math/parsenode/builtinfunction"],
    function (e) {
      var t = e("graphing/graphmode"),
        r = e("math/parsenode/builtinfunction"),
        n = {
          assignmentForbidden: function (e) {
            return (
              "x" === e ||
              "y" === e ||
              "theta" === e ||
              "tmp" === e.slice(0, 3) ||
              r.hasOwnProperty(e)
            );
          },
          sliderForbidden: function (e) {
            return n.assignmentForbidden(e) || "ans" === e.slice(0, 3);
          },
          sliderVariables: function (e) {
            return (
              e.indexOf("theta") !== -1 &&
                (e = e.filter(function (e) {
                  return "r" !== e;
                })),
              e.filter(function (e) {
                return !n.sliderForbidden(e);
              })
            );
          },
          graphingEnabled: function () {
            return !0;
          },
          ansEnabled: function () {
            return !1;
          },
          validRegressionParameter: function (e) {
            return "x" !== e && "y" !== e;
          },
          validLHS: function (e) {
            return "theta" !== e;
          },
          unplottablePolarFunction: function (e, t) {
            return "theta" === e && t.indexOf("r") !== -1;
          },
          validDoubleInequalitySymbol: function (e) {
            return "x" === e || "y" === e;
          },
          validDoubleInequalityVariables: function (e) {
            return !(e.length > 2) && e.every(n.validDoubleInequalitySymbol);
          },
          validExpressionVariable: function (e) {
            return "x" === e;
          },
          validSolvedVariable: function (e) {
            return "x" === e || "y" === e || "r" === e;
          },
          validImplicitVariables: function (e) {
            switch (e.length) {
              case 1:
                return "x" === e[0] || "y" === e[0] || "r" === e[0];
              case 2:
                return (
                  ("x" === e[0] && "y" === e[1]) ||
                  ("y" === e[0] && "x" === e[1]) ||
                  ("r" === e[0] && "theta" === e[1]) ||
                  ("theta" === e[0] && "r" === e[1])
                );
              default:
                return !1;
            }
          },
          graphableListVariables: function (e, t) {
            return (
              "x" === e || "y" === e || "r" === e || "x" === t || "y" === t
            );
          },
          validParametricVariable: function (e) {
            return "t" === e;
          },
          validParametricVariables: function (e) {
            return 1 === e.length && n.validParametricVariable(e[0]);
          },
          validInequalityVariables: function (e) {
            switch (e.length) {
              case 1:
                return "x" === e[0] || "y" === e[0] || "r" === e[0];
              case 2:
                return n.validImplicitVariables(e);
              default:
                return !1;
            }
          },
          validFirstColumnVariable: function (e) {
            return (
              "y" !== e && "r" !== e && "theta" !== e && !e.match(/y_(\d+)/)
            );
          },
          complicatedPolarImplicit: function (e, t) {
            return "theta" === e || ("r" === e && 1 !== t);
          },
          constantGraphMode: function (e) {
            return "x" === e ? t.X : "r" === e ? t.POLAR : t.Y;
          },
          graphMode: function (e, r) {
            return "y" === r
              ? t.X
              : "x" === e
                ? t.X
                : "r" === e && "theta" === r
                  ? t.POLAR
                  : t.Y;
          },
          tableableAsConstant: function (e) {
            return "x" !== e && "r" !== e && "theta" !== e;
          },
          implicitIndependent: function (e) {
            return "x";
          },
          implicitDependency: function (e) {
            return "y" === e ? "x" : "theta" === e ? "r" : "y";
          },
          graphableAsConstant: function (e) {
            return "y" === e || "x" === e || "r" === e;
          },
          graphableAsBareIdentifier: function (e) {
            return "x" === e;
          },
          disabledFeatures: function () {
            return [];
          },
        };
      return n;
    },
  ),
  define("math/frameFourFunction", ["require"], function (e) {
    return { frame: {}, restrictedFunctionsFrame: {} };
  }),
  define(
    "math/frameScientific",
    ["require", "math/builtinconstants", "math/parsenode/builtinfunction"],
    function (e) {
      function t(e, t) {
        for (var r = 0; r < e.length; r++) {
          var n = e[r];
          if (!t.hasOwnProperty(n))
            throw new Error(
              "Programming Error: key '" +
                n +
                "' does not exist in table. Must be one of:\n" +
                Object.keys(t).join("\n"),
            );
        }
      }
      function r(e, r, n, i) {
        (t(r, i), t(n, i));
        for (var a = 0; a < r.length; a++) {
          var s = r[a];
          n.indexOf(s) === -1 && (e[s] = i[s]);
        }
      }
      var n = e("math/builtinconstants"),
        i = e("math/parsenode/builtinfunction"),
        a = {},
        s = ["pi", "e", "trigAngleMultiplier"],
        o = [
          "sqrt",
          "nthroot",
          "abs",
          "ln",
          "sin",
          "cos",
          "tan",
          "log",
          "arcsin",
          "arccos",
          "arctan",
          "mean",
          "round",
          "stdev",
          "stdevp",
          "nCr",
          "nPr",
          "exp",
          "factorial",
        ];
      return (
        r(a, s, [], n),
        r(a, o, [], i),
        { frame: a, restrictedFunctionsFrame: a }
      );
    },
  ),
  define(
    "math/frameSingleExpressionScientific",
    ["require", "math/builtinconstants", "math/parsenode/builtinfunction"],
    function (e) {
      function t(e, t) {
        for (var r = 0; r < e.length; r++) {
          var n = e[r];
          if (!t.hasOwnProperty(n))
            throw new Error(
              "Programming Error: key '" +
                n +
                "' does not exist in table. Must be one of:\n" +
                Object.keys(t).join("\n"),
            );
        }
      }
      function r(e, r, n, i) {
        (t(r, i), t(n, i));
        for (var a = 0; a < r.length; a++) {
          var s = r[a];
          n.indexOf(s) === -1 && (e[s] = i[s]);
        }
      }
      var n = e("math/builtinconstants"),
        i = e("math/parsenode/builtinfunction"),
        a = {},
        s = ["pi", "e", "trigAngleMultiplier"],
        o = [
          "sqrt",
          "nthroot",
          "abs",
          "ln",
          "sin",
          "cos",
          "tan",
          "log",
          "arcsin",
          "arccos",
          "arctan",
          "exp",
          "factorial",
        ];
      return (
        r(a, s, [], n),
        r(a, o, [], i),
        { frame: a, restrictedFunctionsFrame: a }
      );
    },
  ),
  define(
    "math/frameGraphing",
    ["require", "math/builtinconstants", "math/parsenode/builtinfunction"],
    function (e) {
      var t,
        r = e("math/builtinconstants"),
        n = e("math/parsenode/builtinfunction"),
        i = [
          "csc",
          "sec",
          "cot",
          "arccsc",
          "arcsec",
          "arccot",
          "csch",
          "sech",
          "coth",
          "arccsch",
          "arcsech",
          "arccoth",
          "mad",
          "cov",
        ],
        a = {},
        s = {};
      for (t in r) r.hasOwnProperty(t) && ((a[t] = r[t]), (s[t] = r[t]));
      for (t in n)
        n.hasOwnProperty(t) &&
          ((a[t] = n[t]), i.indexOf(t) === -1 && (s[t] = n[t]));
      return { frame: a, restrictedFunctionsFrame: s };
    },
  ),
  define(
    "math/context",
    [
      "require",
      "console",
      "pjs",
      "underscore",
      "./plotter",
      "parser",
      "math/parsenode/constant",
      "math/parsenode/image",
      "math/parsenode/table",
      "math/parsenode/tablecolumn",
      "math/parsenode/freevariable",
      "math/parsenode/builtinfunction",
      "math/finddependencyorder",
      "math/errormsg",
      "graphing/graphmode",
      "worker/workerconfig",
      "./findIntersections",
      "./interpolatedlabel",
      "math/types",
      "math/policyFourFunction",
      "math/policyScientific",
      "math/policySingleExpressionScientific",
      "math/policyGraphing",
      "math/frameFourFunction",
      "math/frameScientific",
      "math/frameSingleExpressionScientific",
      "math/frameGraphing",
    ],
    function (e) {
      function t(e, t, r) {
        r || (r = []);
        var n;
        return (
          (n = t ? _[e].restrictedFunctionsFrame : _[e].frame),
          r.indexOf("sqrt") !== -1 &&
            ((n = Object.create(n)), (n.sqrt = f.sqrt)),
          n
        );
      }
      var r = e("console"),
        n = e("pjs"),
        i = e("underscore"),
        a = e("./plotter").default,
        s = e("parser"),
        o = e("math/parsenode/constant"),
        u = e("math/parsenode/image"),
        c = e("math/parsenode/table"),
        l = e("math/parsenode/tablecolumn"),
        p = e("math/parsenode/freevariable"),
        f = e("math/parsenode/builtinfunction"),
        h = e("math/finddependencyorder"),
        d = e("math/errormsg"),
        m = e("graphing/graphmode"),
        g = e("worker/workerconfig"),
        y = e("./findIntersections").findIntersections,
        v = e("./interpolatedlabel"),
        b = e("math/types"),
        x = {
          fourFunction: e("math/policyFourFunction"),
          scientific: e("math/policyScientific"),
          singleExpressionScientific: e(
            "math/policySingleExpressionScientific",
          ),
          graphing: e("math/policyGraphing"),
        },
        _ = {
          fourFunction: e("math/frameFourFunction"),
          scientific: e("math/frameScientific"),
          singleExpressionScientific: e("math/frameSingleExpressionScientific"),
          graphing: e("math/frameGraphing"),
        };
      return n(function (e) {
        function n(e) {
          return "ans" !== e.slice(0, 3);
        }
        function f(e, t) {
          var r,
            i = e.multiplyDefined,
            a = e.cyclicallyDefined;
          for (r in i) i.hasOwnProperty(r) && (t[r] = d.multiplyDefined(r));
          for (r in a) a.hasOwnProperty(r) && (t[r] = d.cycle(a[r].filter(n)));
        }
        ((e.triggerGraphComputed = function () {}),
          (e.triggerStatusChange = function () {}),
          (e.triggerRemoveGraph = function () {}),
          (e.triggerRender = function () {}),
          (e.triggerRenderSlowly = function () {}),
          (e.triggerDidAddStatement = function () {}),
          (e.triggerDidRemoveStatement = function () {}),
          (e.triggerDidUpdateIntersections = function () {}),
          (e.init = function () {
            ((this.statements = {}),
              (this.analysis = {}),
              (this.currentStatus = {}),
              (this.currentLabel = {}),
              (this.unanalyzedIds = {}),
              (this.unpublishedIds = {}),
              (this.intersectIds = {}),
              this.setEvaluationMode("graphing"),
              this.setRestrictedFunctions(!1),
              this.setFunctionDefinition(!0),
              this.invalidate());
          }),
          (e.processChangeSet = function (e) {
            (e.isCompleteState &&
              (this.invalidate(),
              (this.statements = {}),
              (this.currentLabel = {})),
              e.viewState && this.setViewState(e.viewState),
              e.hasOwnProperty("degreeMode") &&
                this.setDegreeMode(e.degreeMode),
              e.hasOwnProperty("evaluationMode") &&
                this.setEvaluationMode(e.evaluationMode),
              e.hasOwnProperty("additionalFunctions") &&
                this.setAdditionalFunctions(e.additionalFunctions),
              e.hasOwnProperty("restrictedFunctions") &&
                this.setRestrictedFunctions(e.restrictedFunctions),
              e.hasOwnProperty("functionDefinition") &&
                this.setFunctionDefinition(e.functionDefinition),
              e.hasOwnProperty("pointsOfInterest") &&
                this.setPointsOfInterest(e.pointsOfInterest),
              e.hasOwnProperty("plotSingleVariableImplicitEquations") &&
                this.setPlotSingleVariableImplicitEquations(
                  e.plotSingleVariableImplicitEquations,
                ),
              e.hasOwnProperty("intersectIds") &&
                (this.intersectIds = e.intersectIds),
              this.processStatements(e),
              this.updateAnalysis(),
              e.hasOwnProperty("intersectId") &&
                this._updateIntersections(e.intersectId),
              this._publishAllStatuses(),
              this._computeAllLabels(),
              this._graphAllChanged(),
              (this.unpublishedIds = {}),
              e.isCompleteState
                ? this.triggerRenderSlowly()
                : this.triggerRender());
          }),
          (e.processStatements = function (e) {
            var t;
            if (e.statements)
              for (var r in e.statements) {
                var n = e.statements[r];
                if (null === n) {
                  if (
                    (!e.isCompleteState &&
                      this.statements.hasOwnProperty(r) &&
                      (t = this.statements[r].getAllIds()),
                    this.removeStatement(r),
                    !e.isCompleteState && t)
                  ) {
                    for (var i = 0; i < t.length; i++)
                      this.triggerRemoveGraph(t[i]);
                    this.triggerDidRemoveStatement(r);
                  }
                } else
                  (this.addStatement(n),
                    e.isCompleteState || this.triggerDidAddStatement(n));
              }
          }),
          (e.setViewState = function (e) {
            if (!i.isEqual(e, this.viewState)) {
              this.viewState = e;
              for (var t in this.statements)
                this.statements.hasOwnProperty(t) &&
                  (this.unpublishedIds[t] = !0);
            }
          }),
          (e.getViewState = function () {
            if (this.viewState) {
              var e = Object.create(this.viewState);
              return (
                this.parent_frame && this.parent_frame.trigAngleMultiplier
                  ? (e.trigAngleMultiplier =
                      this.parent_frame.trigAngleMultiplier.constantValue)
                  : (e.trigAngleMultiplier = 1),
                e
              );
            }
          }),
          (e.setDegreeMode = function (e) {
            ((this.use_degrees = e), this.invalidate());
          }),
          (e.setEvaluationMode = function (e) {
            ((this.evaluationMode = e),
              (this.policy = x[e]),
              this.invalidate());
          }),
          (e.setAdditionalFunctions = function (e) {
            ((this.additionalFunctions = e), this.invalidate());
          }),
          (e.setRestrictedFunctions = function (e) {
            ((this.restrictedFunctions = e), this.invalidate());
          }),
          (e.setFunctionDefinition = function (e) {
            ((this.functionDefinition = e), this.invalidate());
          }),
          (e.setPointsOfInterest = function (e) {
            e !== g.pointsOfInterest &&
              ((g.pointsOfInterest = e), this.invalidate());
          }),
          (e.setPlotSingleVariableImplicitEquations = function (e) {
            e !== g.plotSingleVariableImplicitEquations &&
              ((g.plotSingleVariableImplicitEquations = e), this.invalidate());
          }),
          (e._publishAllStatuses = function () {
            var e = {},
              t = this.currentStatus;
            this.currentStatus = {};
            for (var r in this.unpublishedIds)
              if (this.analysis.hasOwnProperty(r)) {
                var n = this.analysis[r].evaluationState;
                (JSON.stringify(n) !== JSON.stringify(t[r]) && (e[r] = n),
                  (this.currentStatus[r] = n));
              }
            this.triggerStatusChange(e);
          }),
          (e._computeAllLabels = function () {
            for (var e in this.currentLabel) {
              var t = this.statements[e];
              if (t) {
                var r = t.tryGetConcreteTree(this.frame),
                  n = 1;
                r.valueType === b.ListOfPoint && (n = r.args.length);
                for (var a = [], s = 0; s < n; s++)
                  a.push(v.interpolate(this.currentLabel[e], this.frame, s));
                i.isEqual(a, t.computedLabels) ||
                  ((t.computedLabels = a), (this.unpublishedIds[e] = !0));
              }
            }
          }),
          (e._graphAllChanged = function () {
            var e = this.getViewState();
            if (a.validateViewState(e)) {
              for (var t in this.unpublishedIds)
                if (this.analysis.hasOwnProperty(t)) {
                  var r = this.analysis[t];
                  if (r.rawTree.isTable)
                    for (
                      var n = r.graph(e), s = r.rawTree.getAllIds(), o = 0;
                      o < s.length;
                      o++
                    )
                      n[s[o]]
                        ? this.triggerGraphComputed(s[o], n[s[o]])
                        : this.triggerRemoveGraph(s[o]);
                  else
                    r.evaluationState.is_graphable &&
                    (r.rawTree.userData.shouldGraph ||
                      r.rawTree.userData.showLabel)
                      ? (this.triggerGraphComputed(t, r.graph(e)),
                        this.intersectIds.hasOwnProperty(t) &&
                          this._updateIntersections(t))
                      : this.triggerRemoveGraph(t);
                }
              if (i.keys(this.unpublishedIds).length)
                for (var u in this.intersectIds)
                  this.unpublishedIds.hasOwnProperty(u) ||
                    (this.intersectIds.hasOwnProperty(u) &&
                      this._updateIntersections(u));
            }
          }),
          (e._updateIntersections = function (e) {
            if (this.viewState) {
              if (!this.analysis[e] || !this.analysis[e].shouldIntersect())
                return void this.triggerDidUpdateIntersections(e, []);
              var t = y(this.analysis, this.viewState, e);
              this.triggerDidUpdateIntersections(e, t);
            }
          }),
          (e.getDisabledFeatures = function () {
            var e,
              t = this.policy.disabledFeatures();
            e =
              this.functionDefinition === !1
                ? t.concat("FunctionDefinition")
                : t;
            var r = this.additionalFunctions || [];
            return (e = e.filter(
              function (e) {
                return (
                  ("Exponent" !== e || r.indexOf("exponent") === -1) &&
                  ("PercentOf" !== e || r.indexOf("percent") === -1)
                );
              }.bind(this),
            ));
          }),
          (e.addStatement = function (e) {
            if (e) {
              var t = e.id;
              this.markDirty(t);
              var r = {
                index: this.policy.ansEnabled() ? e.index : void 0,
                disabledFeatures: this.getDisabledFeatures(),
              };
              switch (e.type) {
                case "table":
                  var n = [];
                  (this.statements.hasOwnProperty(t) &&
                    (n = this.statements[t].getAllIds()),
                    (e.shouldGraph = !0));
                  for (
                    var i, a, p, f = e.columns, h = [], d = 0, m = 0;
                    m < f.length;
                    m++
                  )
                    d = Math.max(f[m].values.length, d);
                  for (var g = 0; g < f.length; g++) {
                    ((i = s.parse(f[g].latex, r)), (a = []));
                    for (var y = -1, b = 0; b < f[g].values.length; b++)
                      f[g].values[b].replace(/\\space/g, "").match(/\S/)
                        ? (a.push(s.parse(f[g].values[b], r)), (y = b))
                        : a.push(o(NaN));
                    ((a = a.slice(0, y + 1)),
                      (p = l(i, d, a)),
                      (p.id = f[g].id),
                      p.header && (p.header.userData = f[g]),
                      h.push(p));
                  }
                  this.statements[t] = c(h);
                  var x = this,
                    _ = this.statements[t].getAllIds();
                  n.forEach(function (e) {
                    _.indexOf(e) === -1 && x.triggerRemoveGraph(e);
                  });
                  break;
                case "image":
                  var E =
                    "-\\trigAngleMultiplier*\\arctan(\\sin(" +
                    e.angle +
                    "),\\cos(" +
                    e.angle +
                    "))";
                  this.statements[t] = u({
                    center: s.parse(e.center, r),
                    radianAngle: s.parse(E, r),
                    width: s.parse(e.width, r),
                    height: s.parse(e.height, r),
                  });
                  break;
                default:
                  this.statements[t] = s.parse(e.latex, r);
              }
              if (((this.statements[t].userData = e), e.label)) {
                var S = this.currentLabel[t];
                (S && S.raw === e.label) ||
                  (this.currentLabel[t] = v.parse(e.label));
              } else delete this.currentLabel[t];
              (this.markClean(e.id), this.markDirty(e.id));
            }
          }),
          (e.removeStatement = function (e) {
            if (this.statements.hasOwnProperty(e)) {
              var t = this.statements[e];
              if ((this.markDirty(e), t.isTable)) {
                var r = this;
                t.getAllIds().forEach(function (e) {
                  r.triggerRemoveGraph(e);
                });
              } else this.triggerRemoveGraph(e);
              (delete this.currentLabel[e], delete this.statements[e]);
            }
          }),
          (e.invalidate = function () {
            for (var e in this.statements)
              this.statements.hasOwnProperty(e) && this.markDirty(e, {});
            ((this.currentStatus = {}),
              (this.parent_frame = Object.create(
                t(
                  this.evaluationMode,
                  this.restrictedFunctions,
                  this.additionalFunctions,
                ),
              )),
              (this.parent_frame.trigAngleMultiplier = o(
                this.use_degrees ? Math.PI / 180 : 1,
              )),
              (this.frame = Object.create(this.parent_frame)),
              (this.lastFrame = Object.create(this.parent_frame)),
              (this.regressionFrame = Object.create(this.parent_frame)));
          }),
          (e.buildSymbolToExpressionDirtyMap = function () {
            var e,
              t,
              r = {};
            for (var n in this.statements)
              if (this.statements.hasOwnProperty(n)) {
                var i = this.statements[n].getDependencies();
                for (e = 0; e < i.length; e++)
                  ((t = i[e]), r[t] || (r[t] = []), r[t].push(n));
                var a = this.statements[n].getExports();
                for (e = 0; e < a.length; e++)
                  ((t = a[e]), r[t] || (r[t] = []), r[t].push(n));
              }
            return r;
          }),
          (e.markDirty = function (e, t) {
            if (this.statements[e] && !this.unanalyzedIds[e]) {
              (t || (t = this.buildSymbolToExpressionDirtyMap()),
                (this.unanalyzedIds[e] = !0),
                (this.unpublishedIds[e] = !0),
                delete this.analysis[e]);
              for (
                var r = this.statements[e],
                  n = r.getLegalExports(this.policy),
                  i = 0;
                i < n.length;
                i++
              )
                this.markSymbolDirty(n[i], t);
              if (r.isRegression) {
                var a = this.lastFrame;
                (this.invalidate(), (this.lastFrame = a));
              }
            }
          }),
          (e.markSymbolDirty = function (e, t) {
            (delete this.frame[e], delete this.regressionFrame[e]);
            var r = t[e];
            if (r) for (var n = 0; n < r.length; n++) this.markDirty(r[n], t);
          }),
          (e.markClean = function (e) {
            delete this.unanalyzedIds[e];
          }),
          (e.getFrame = function () {
            return (this.updateAnalysis(), this.frame);
          }),
          (e.getAnalysis = function () {
            return (this.updateAnalysis(), this.analysis);
          }),
          (e.getStatus = function (e) {
            if ((this.updateAnalysis(), this.analysis[e]))
              return this.analysis[e].status;
          }),
          (e.getEvaluationState = function (e) {
            if ((this.updateAnalysis(), this.analysis[e]))
              return this.analysis[e].evaluationState;
          }),
          (e._updateRegressions = function (e) {
            var t,
              r = this.frame,
              n = this.lastFrame,
              i = this.regressionFrame,
              a = [];
            for (t in e) e.hasOwnProperty(t) && e[t].isRegression && a.push(t);
            var s = this;
            a.sort(function (e, t) {
              var r =
                  s.statements[e].userData &&
                  s.statements[e].userData.residualVariable,
                n =
                  s.statements[t].userData &&
                  s.statements[t].userData.residualVariable;
              return r && !n ? -1 : n && !r ? 1 : 0;
            });
            var o = h(this.policy, e, a);
            f(o, i);
            for (var u = o.resolved, c = {}, l = 0; l < u.length; l++)
              if (((t = u[l]), this.statements[t].isRegression))
                ((this.analysis[t] = e[t].analyze(this.policy, i, r, n, c)),
                  this.analysis[t].exportTo(this.policy, r),
                  delete e[t]);
              else {
                var p = e[t].tryGetConcreteTree(i);
                (e[t].exportTo(this.policy, p, i),
                  (c[t] = { rawTree: e[t], concreteTree: p }));
              }
          }),
          (e.updateAnalysis = function () {
            var e,
              t = {};
            for (e in this.unanalyzedIds)
              this.unanalyzedIds.hasOwnProperty(e) &&
                this.statements[e] &&
                (t[e] = this.statements[e]);
            "graphing" === this.evaluationMode && this._updateRegressions(t);
            var r = this.analysis,
              n = this.frame,
              i = h(this.policy, t);
            f(i, n);
            for (var a = i.resolved, s = 0; s < a.length; s++)
              switch (((e = a[s]), this.evaluationMode)) {
                case "fourFunction":
                  ((r[e] = this.statements[e].analyzeFourFunction(
                    this.policy,
                    n,
                    r,
                  )),
                    r[e].exportTo(this.policy, n));
                  break;
                case "scientific":
                  ((r[e] = this.statements[e].analyzeScientific(
                    this.policy,
                    n,
                    r,
                  )),
                    r[e].exportTo(this.policy, n));
                  break;
                case "singleExpressionScientific":
                  ((r[e] = this.statements[e].analyzeSingleExpressionScientific(
                    this.policy,
                    n,
                    r,
                  )),
                    r[e].exportTo(this.policy, n));
                  break;
                case "graphing":
                  if (n.r) {
                    var o = Object.create(n);
                    if (
                      ((o.r = p("r")),
                      (r[e] = this.statements[e].analyze(this.policy, o, r)),
                      r[e].getGraphMode() === m.POLAR)
                    ) {
                      r[e].exportTo(this.policy, n);
                      continue;
                    }
                  }
                  ((r[e] = this.statements[e].analyze(this.policy, n, r)),
                    r[e].exportTo(this.policy, n));
              }
            ((this.unanalyzedIds = {}),
              (this.lastFrame = Object.create(this.parent_frame)));
            for (var u in n) n.hasOwnProperty(u) && (this.lastFrame[u] = n[u]);
          }),
          (e.evaluateOnce = function (e) {
            return (
              r.log(
                "Deprecated console.evaluateOnce - this should not run in production code",
              ),
              this.analysis[e].concreteTree.constantValue
            );
          }),
          (e.compile = function (e) {
            return (
              r.log(
                "Deprecated console.compile - this should not run in production code",
              ),
              this.analysis[e].concreteTree.getCompiledFunction()
            );
          }),
          (e.evalStrings = function (e) {
            return (
              r.log(
                "Deprecated console.evalStrings - this should not run in production code",
              ),
              this.analysis[e].concreteTree.getEvalStrings()
            );
          }));
      });
    },
  ),
  define(
    "worker/workercore",
    ["require", "math/context", "math/functions"],
    function (e) {
      var t = e("math/context"),
        r = e("math/functions");
      return function (e) {
        var n = t();
        return (
          (n.triggerGraphComputed = function (t, n) {
            (r.dehydrateGraphData(n),
              e("graphComputed", { id: t, graphData: n }));
          }),
          (n.triggerDidUpdateIntersections = function (t, r) {
            e("updateIntersections", { id: t, intersections: r });
          }),
          (n.triggerRender = function () {
            e("render");
          }),
          (n.triggerRenderSlowly = function () {
            e("renderSlowly");
          }),
          (n.triggerRemoveGraph = function (t) {
            e("removeGraph", t);
          }),
          (n.triggerStatusChange = function (t) {
            e("statusChange", t);
          }),
          {
            processChangeSet: function (t) {
              (n.processChangeSet(t), e("processChangeSet", t));
            },
          }
        );
      };
    },
  ),
  define(
    "worker/worker",
    ["require", "worker/workercore", "console"],
    function (e) {
      var t = e("worker/workercore"),
        r = {},
        n = e("console");
      n.log = function (e) {
        self.postMessage({ log: JSON.stringify(e) });
      };
      var i = self;
      ((i.window = i),
        (i.onmessage = function (e) {
          var n = e.data && e.data.connectionId;
          if (n)
            if ("destroy" === e.data.originalMessage.type) delete r[n];
            else {
              var a = r[n];
              (a ||
                ((a = t(function (e, t) {
                  i.postMessage({
                    connectionId: n,
                    originalMessage: { type: e, payload: t },
                  });
                })),
                (r[n] = a)),
                a.processChangeSet(e.data.originalMessage));
            }
        }),
        i.loadMessageQueue &&
          (i.loadMessageQueue.forEach(function (e) {
            i.onmessage(e);
          }),
          delete i.loadMessageQueue));
    },
  ),
  "undefined" == typeof window &&
    ("undefined" == typeof requirejs &&
      (importScripts("../vendor/require.js"), importScripts("config.js")),
    (self.loadMessageQueue = []),
    (self.onmessage = function (e) {
      self.loadMessageQueue.push(e);
    }),
    requirejs(["worker/worker"])),
  define("toplevel/worker", function () {}));
