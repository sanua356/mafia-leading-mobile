var app = (function () {
    "use strict";
    function t() {}
    function e(t) {
        return t();
    }
    function n() {
        return Object.create(null);
    }
    function r(t) {
        t.forEach(e);
    }
    function o(t) {
        return "function" == typeof t;
    }
    function s(t, e) {
        return t != t
            ? e == e
            : t !== e || (t && "object" == typeof t) || "function" == typeof t;
    }
    let c, a;
    function u(e, ...n) {
        if (null == e) return t;
        const r = e.subscribe(...n);
        return r.unsubscribe ? () => r.unsubscribe() : r;
    }
    function l(t) {
        let e;
        return u(t, (t) => (e = t))(), e;
    }
    function i(t, e, n) {
        t.$$.on_destroy.push(u(e, n));
    }
    function d(t, e, n, r) {
        if (t) {
            const o = $(t, e, n, r);
            return t[0](o);
        }
    }
    function $(t, e, n, r) {
        return t[1] && r
            ? (function (t, e) {
                  for (const n in e) t[n] = e[n];
                  return t;
              })(n.ctx.slice(), t[1](r(e)))
            : n.ctx;
    }
    function f(t, e, n, r) {
        if (t[2] && r) {
            const o = t[2](r(n));
            if (void 0 === e.dirty) return o;
            if ("object" == typeof o) {
                const t = [],
                    n = Math.max(e.dirty.length, o.length);
                for (let r = 0; r < n; r += 1) t[r] = e.dirty[r] | o[r];
                return t;
            }
            return e.dirty | o;
        }
        return e.dirty;
    }
    function p(t, e, n, r, o, s) {
        if (o) {
            const c = $(e, n, r, s);
            t.p(c, o);
        }
    }
    function m(t) {
        if (t.ctx.length > 32) {
            const e = [],
                n = t.ctx.length / 32;
            for (let t = 0; t < n; t++) e[t] = -1;
            return e;
        }
        return -1;
    }
    function h(t, e) {
        t.appendChild(e);
    }
    function g(t, e, n) {
        t.insertBefore(e, n || null);
    }
    function y(t) {
        t.parentNode.removeChild(t);
    }
    function v(t, e) {
        for (let n = 0; n < t.length; n += 1) t[n] && t[n].d(e);
    }
    function b(t) {
        return document.createElement(t);
    }
    function x(t) {
        return document.createTextNode(t);
    }
    function C() {
        return x(" ");
    }
    function w() {
        return x("");
    }
    function k(t, e, n, r) {
        return (
            t.addEventListener(e, n, r), () => t.removeEventListener(e, n, r)
        );
    }
    function P(t, e, n) {
        null == n
            ? t.removeAttribute(e)
            : t.getAttribute(e) !== n && t.setAttribute(e, n);
    }
    function j(t, e) {
        (e = "" + e), t.wholeText !== e && (t.data = e);
    }
    function E(t, e, n, r) {
        null === n
            ? t.style.removeProperty(e)
            : t.style.setProperty(e, n, r ? "important" : "");
    }
    function O(t) {
        a = t;
    }
    function R(t) {
        (function () {
            if (!a)
                throw new Error(
                    "Function called outside component initialization"
                );
            return a;
        })().$$.on_mount.push(t);
    }
    const N = [],
        L = [],
        z = [],
        _ = [],
        A = Promise.resolve();
    let T = !1;
    function H(t) {
        z.push(t);
    }
    const q = new Set();
    let B = 0;
    function M() {
        const t = a;
        do {
            for (; B < N.length; ) {
                const t = N[B];
                B++, O(t), S(t.$$);
            }
            for (O(null), N.length = 0, B = 0; L.length; ) L.pop()();
            for (let t = 0; t < z.length; t += 1) {
                const e = z[t];
                q.has(e) || (q.add(e), e());
            }
            z.length = 0;
        } while (N.length);
        for (; _.length; ) _.pop()();
        (T = !1), q.clear(), O(t);
    }
    function S(t) {
        if (null !== t.fragment) {
            t.update(), r(t.before_update);
            const e = t.dirty;
            (t.dirty = [-1]),
                t.fragment && t.fragment.p(t.ctx, e),
                t.after_update.forEach(H);
        }
    }
    const F = new Set();
    let D;
    function I() {
        D = { r: 0, c: [], p: D };
    }
    function W() {
        D.r || r(D.c), (D = D.p);
    }
    function K(t, e) {
        t && t.i && (F.delete(t), t.i(e));
    }
    function U(t, e, n, r) {
        if (t && t.o) {
            if (F.has(t)) return;
            F.add(t),
                D.c.push(() => {
                    F.delete(t), r && (n && t.d(1), r());
                }),
                t.o(e);
        }
    }
    function V(t) {
        t && t.c();
    }
    function G(t, n, s, c) {
        const {
            fragment: a,
            on_mount: u,
            on_destroy: l,
            after_update: i,
        } = t.$$;
        a && a.m(n, s),
            c ||
                H(() => {
                    const n = u.map(e).filter(o);
                    l ? l.push(...n) : r(n), (t.$$.on_mount = []);
                }),
            i.forEach(H);
    }
    function J(t, e) {
        const n = t.$$;
        null !== n.fragment &&
            (r(n.on_destroy),
            n.fragment && n.fragment.d(e),
            (n.on_destroy = n.fragment = null),
            (n.ctx = []));
    }
    function Q(t, e) {
        -1 === t.$$.dirty[0] &&
            (N.push(t), T || ((T = !0), A.then(M)), t.$$.dirty.fill(0)),
            (t.$$.dirty[(e / 31) | 0] |= 1 << e % 31);
    }
    function X(e, o, s, c, u, l, i, d = [-1]) {
        const $ = a;
        O(e);
        const f = (e.$$ = {
            fragment: null,
            ctx: null,
            props: l,
            update: t,
            not_equal: u,
            bound: n(),
            on_mount: [],
            on_destroy: [],
            on_disconnect: [],
            before_update: [],
            after_update: [],
            context: new Map(o.context || ($ ? $.$$.context : [])),
            callbacks: n(),
            dirty: d,
            skip_bound: !1,
            root: o.target || $.$$.root,
        });
        i && i(f.root);
        let p = !1;
        if (
            ((f.ctx = s
                ? s(e, o.props || {}, (t, n, ...r) => {
                      const o = r.length ? r[0] : n;
                      return (
                          f.ctx &&
                              u(f.ctx[t], (f.ctx[t] = o)) &&
                              (!f.skip_bound && f.bound[t] && f.bound[t](o),
                              p && Q(e, t)),
                          n
                      );
                  })
                : []),
            f.update(),
            (p = !0),
            r(f.before_update),
            (f.fragment = !!c && c(f.ctx)),
            o.target)
        ) {
            if (o.hydrate) {
                const t = (function (t) {
                    return Array.from(t.childNodes);
                })(o.target);
                f.fragment && f.fragment.l(t), t.forEach(y);
            } else f.fragment && f.fragment.c();
            o.intro && K(e.$$.fragment),
                G(e, o.target, o.anchor, o.customElement),
                M();
        }
        O($);
    }
    class Y {
        $destroy() {
            J(this, 1), (this.$destroy = t);
        }
        $on(t, e) {
            const n = this.$$.callbacks[t] || (this.$$.callbacks[t] = []);
            return (
                n.push(e),
                () => {
                    const t = n.indexOf(e);
                    -1 !== t && n.splice(t, 1);
                }
            );
        }
        $set(t) {
            var e;
            this.$$set &&
                ((e = t), 0 !== Object.keys(e).length) &&
                ((this.$$.skip_bound = !0),
                this.$$set(t),
                (this.$$.skip_bound = !1));
        }
    }
    const Z = [];
    function tt(e, n = t) {
        let r;
        const o = new Set();
        function c(t) {
            if (s(e, t) && ((e = t), r)) {
                const t = !Z.length;
                for (const t of o) t[1](), Z.push(t, e);
                if (t) {
                    for (let t = 0; t < Z.length; t += 2) Z[t][0](Z[t + 1]);
                    Z.length = 0;
                }
            }
        }
        return {
            set: c,
            update: function (t) {
                c(t(e));
            },
            subscribe: function (s, a = t) {
                const u = [s, a];
                return (
                    o.add(u),
                    1 === o.size && (r = n(c) || t),
                    s(e),
                    () => {
                        o.delete(u), 0 === o.size && (r(), (r = null));
                    }
                );
            },
        };
    }
    const { set: et, subscribe: nt } = tt({}),
        rt = {
            subscribe: nt,
            set: et,
            remove: () => {
                et({});
            },
        },
        ot = (t, e = "") => {
            const n = new URL(t);
            function r() {
                return s(e).reduce(
                    (t, e, n) => (
                        ":" === e[0] && t.push({ value: e.slice(1), index: n }),
                        t
                    ),
                    []
                );
            }
            function o() {
                return s(n.pathname);
            }
            function s(t) {
                return "/" === t || 0 === t.trim().length
                    ? [t]
                    : ("/" === t.slice(-1) && (t = t.slice(0, -1)),
                      "/" === t[0] && (t = t.slice(1)),
                      t.split("/"));
            }
            return Object.freeze({
                hash: n.hash,
                host: n.host,
                hostname: n.hostname,
                namedParams: (function () {
                    const t = o();
                    return r().reduce(
                        (e, n) => ((e[n.value] = t[n.index]), e),
                        {}
                    );
                })(),
                namedParamsKeys: r().reduce((t, e) => (t.push(e.value), t), []),
                namedParamsValues: (function () {
                    const t = o();
                    return r().reduce((e, n) => (e.push(t[n.index]), e), []);
                })(),
                pathNames: o(),
                port: n.port,
                pathname: n.pathname,
                protocol: n.protocol,
                search: n.search,
                queryParams: (function () {
                    const t = {};
                    return (
                        n.searchParams.forEach((e, n) => {
                            t[n] = e;
                        }),
                        t
                    );
                })(),
                queryParamsKeys: (function () {
                    const t = [];
                    return (
                        n.searchParams.forEach((e, n) => {
                            t.push(n);
                        }),
                        t
                    );
                })(),
                queryParamsValues: (function () {
                    const t = [];
                    return (
                        n.searchParams.forEach((e) => {
                            t.push(e);
                        }),
                        t
                    );
                })(),
            });
        },
        st = (t) => {
            let e = !1;
            return (
                0 === Object.keys(t).length ||
                (t.childRoute && 0 === Object.keys(t.childRoute).length
                    ? (e = !0)
                    : t.childRoute && (e = st(t.childRoute)),
                e)
            );
        },
        ct = (t, e) =>
            (e = it(e)).includes(":") ? e.includes(t) : e.startsWith(t),
        at = (t, e, n) => {
            let r = !1;
            if (n)
                return {
                    exists: e.lang && e.lang[n] && e.lang[n].includes(t),
                    language: n,
                };
            if (
                ((r = ct(t, e.name)), !r && e.lang && "object" == typeof e.lang)
            )
                for (const [o, s] of Object.entries(e.lang))
                    ct(t, s) && ((r = !0), (n = o));
            return { exists: r, language: n };
        },
        ut = (t) =>
            "/" === t || 0 === t.trim().length
                ? [t]
                : (t = it(t, "both")).split("/"),
        lt = (t = "") => {
            let e;
            return "/" === t || 0 === t.trim().length
                ? t
                : ((e = (t = it(t, "lead")).split(":")[0]),
                  (e = it(e, "trail")),
                  e.toLowerCase());
        },
        it = (t, e = "lead") => (
            ("trail" !== e && "both" !== e) || (t = t.replace(/\/$/, "")),
            ("lead" !== e && "both" !== e) || (t = t.replace(/^\//, "")),
            t
        ),
        dt = (t, e = null) => (e && t.lang && t.lang[e] ? t.lang[e] : t.name),
        $t = (t) => {
            const e = t || !1;
            let n = "";
            const r = (t, n) => {
                    if ("undefined" != typeof window) {
                        const r = ((t) => {
                            let e = [];
                            if (t.queryParams)
                                for (let [n, r] of Object.entries(
                                    t.queryParams
                                ))
                                    e.push(`${n}=${r}`);
                            const n = t.hash ? t.hash : "";
                            return e.length > 0
                                ? `${t.path}?${e.join("&")}${n}`
                                : t.path + n;
                        })(t);
                        n && window.history.pushState({ page: r }, "", r),
                            e && o(r);
                    }
                },
                o = (t) => {
                    "undefined" != typeof ga &&
                        (ga("set", "page", t), ga("send", "pageview"));
                };
            return Object.freeze({
                active: () => n,
                isActive: (t, e = !1) => {
                    "/" !== t[0] && (t = "/" + t);
                    let r = ot(`http://fake.com${t}`).pathname,
                        o = ot(`http://fake.com${n}`).pathname;
                    return (
                        (r = it(r, "trail")),
                        (o = it(o, "trail")),
                        e ? o.includes(r) : o === r
                    );
                },
                setActive: (t, e) => {
                    (n = t.path), r(t, e);
                },
            });
        },
        ft = (t, e) => {
            const n = ((t) => {
                const e = t;
                return Object.freeze({
                    valid: () => e && e.guard && "function" == typeof e.guard,
                    redirect: () => !e.guard(),
                    redirectPath: () => {
                        let t = "/";
                        return (
                            e.redirect &&
                                e.redirect.length > 0 &&
                                (t = e.redirect),
                            t
                        );
                    },
                });
            })(t.onlyIf);
            return Object.freeze({
                path: () => {
                    let r = e;
                    return (
                        t.redirectTo &&
                            t.redirectTo.length > 0 &&
                            (r = t.redirectTo),
                        n.valid() && n.redirect() && (r = n.redirectPath()),
                        r
                    );
                },
            });
        };
    function pt({
        basePath: t,
        basePathName: e,
        pathNames: n,
        convert: r,
        currentLanguage: o,
    }) {
        let s,
            c,
            a = o;
        function u() {
            return dt(c, a);
        }
        function l() {
            return lt(u());
        }
        function i() {
            return lt(s.result);
        }
        return Object.freeze({
            basePathSameAsLocalised: function () {
                return i() === l();
            },
            updatedPath: function (t) {
                return (
                    (c = t),
                    (s = ((t, e, n, r, o = !1) => {
                        if ("/" === t || 0 === t.trim().length)
                            return { result: t, language: null };
                        let s = t,
                            c = n.name,
                            a = r;
                        if (
                            (o && (a = ""),
                            (c = it(c)),
                            (s = it(s)),
                            n.childRoute)
                        )
                            return { result: t, language: a };
                        {
                            let t = at(s, n, a);
                            t.exists && o && (s = dt(n, r));
                            let u = c.split(":")[0];
                            return (
                                (u = it(u, "trail")),
                                (u = u.split("/")),
                                u.shift(),
                                u.forEach(() => {
                                    const c = e[0];
                                    if (
                                        ((t = at(`${s}/${c}`, n, a)),
                                        !c || !t.exists)
                                    )
                                        return {
                                            result: s,
                                            language: t.language,
                                        };
                                    (s = o ? dt(n, r) : `${s}/${c}`), e.shift();
                                }),
                                { result: s, language: t.language }
                            );
                        }
                    })(e, n, c, a, r)),
                    (a = r ? o : s.language),
                    s
                );
            },
            basePathNameWithoutNamedParams: i,
            localisedPathName: u,
            localisedRouteWithoutNamedParams: l,
            namedPath: function () {
                let e = u();
                return (
                    e && !e.startsWith("/") && (e = "/" + e), t ? `${t}${e}` : e
                );
            },
            pathNames: n,
            routeLanguage: function () {
                return a;
            },
            routePath: function () {
                let e = `${t}/${i()}`;
                "//" === e && (e = "/"),
                    a &&
                        (n = ((t, e) => {
                            const n = e.split("/");
                            return (
                                n.length > 1 &&
                                    n.forEach(function (e, n) {
                                        e.length > 0 && n > 0 && t.shift();
                                    }),
                                t
                            );
                        })(n, l()));
                const r = ((t = "") =>
                    0 === t.trim().length
                        ? []
                        : ut(t).reduce(
                              (t, e) => (":" === e[0] && t.push(e.slice(1)), t),
                              []
                          ))(u());
                return (
                    r &&
                        r.length > 0 &&
                        r.forEach(function () {
                            n.length > 0 && (e += `/${n.shift()}`);
                        }),
                    e
                );
            },
        });
    }
    function mt({ routes: t, currentUrl: e, routerOptions: n, convert: r }) {
        const o = n.defaultLanguage,
            s = n.prefix ? n.prefix.toLowerCase() : "",
            c = (function (t, e) {
                if (e && e.trim().length > 0) {
                    const n = t.endsWith(e) ? e : e + "/",
                        r = t.replace(n, "");
                    return ot(r);
                }
                return ot(t);
            })(e, s);
        let a = "",
            u = {},
            l = !1;
        function i(t, e, n, r, s) {
            let d = {};
            const $ = pt({
                basePath: e,
                basePathName: n.shift().toLowerCase(),
                pathNames: n,
                convert: s,
                currentLanguage: r,
            });
            return (
                (l = !1),
                t.forEach(function (t) {
                    if (
                        ($.updatedPath(t),
                        (function (t, e) {
                            const n = t.basePathSameAsLocalised();
                            n && (l = !0);
                            return (
                                n || (!l && ((t) => it(t).startsWith(":"))(e))
                            );
                        })($, t.name))
                    ) {
                        let e = $.routePath();
                        if (
                            ((a = ft(t, a).path()),
                            d.name !== e &&
                                (d = (function ({
                                    route: t,
                                    routePath: e,
                                    routeLanguage: n,
                                    urlParser: r,
                                    namedPath: s,
                                }) {
                                    const c = (function ({
                                        routeInfo: t,
                                        path: e,
                                        routeNamedParams: n,
                                        urlParser: r,
                                        namedPath: o,
                                        language: s,
                                    }) {
                                        const c = () => {
                                            const t = ot(
                                                `https://fake.com${r.pathname}`,
                                                o
                                            ).namedParams;
                                            return { ...n, ...t };
                                        };
                                        return Object.freeze({
                                            get: () => ({
                                                name: e,
                                                component: t.component,
                                                hash: r.hash,
                                                layout: t.layout,
                                                queryParams: r.queryParams,
                                                namedParams: c(),
                                                path: e,
                                                language: s,
                                            }),
                                            namedParams: c,
                                        });
                                    })({
                                        routeInfo: t,
                                        urlParser: r,
                                        path: e,
                                        routeNamedParams: u,
                                        namedPath: s,
                                        language: n || o,
                                    });
                                    return (u = c.namedParams()), c.get();
                                })({
                                    route: t,
                                    routePath: e,
                                    routeLanguage: $.routeLanguage(),
                                    urlParser: c,
                                    namedPath: $.namedPath(),
                                })),
                            t.nestedRoutes &&
                                t.nestedRoutes.length > 0 &&
                                $.pathNames.length > 0)
                        )
                            (d.childRoute = i(
                                t.nestedRoutes,
                                e,
                                $.pathNames,
                                $.routeLanguage(),
                                s
                            )),
                                (d.path = d.childRoute.path),
                                (d.language = d.childRoute.language);
                        else if (
                            (function (t, e) {
                                return (
                                    t.nestedRoutes &&
                                    t.nestedRoutes.length > 0 &&
                                    0 === e.length
                                );
                            })(t, $.pathNames)
                        ) {
                            const n = i(
                                t.nestedRoutes,
                                e,
                                ["index"],
                                $.routeLanguage(),
                                s
                            );
                            n &&
                                Object.keys(n).length > 0 &&
                                ((d.childRoute = n),
                                (d.language = d.childRoute.language));
                        }
                    }
                }),
                a && (d.redirectTo = a),
                d
            );
        }
        const d = (e) => {
            const n = t.find((t) => "404" == t.name),
                r = e || o || "";
            return n
                ? { ...n, language: r, path: "404" }
                : {
                      name: "404",
                      component: "",
                      path: "404",
                      redirectTo: "/404.html",
                  };
        };
        return Object.freeze({
            findActiveRoute: function () {
                let e = i(t, "", c.pathNames, n.lang, r);
                return (
                    e && Object.keys(e).length && !st(e)
                        ? ((e.path = e.path.split("?")[0]),
                          s && (e.path = `/${s}${e.path}`))
                        : "undefined" != typeof window && (e = d(n.lang)),
                    e
                );
            },
        });
    }
    const ht = "/404.html";
    let gt,
        yt = [],
        vt = {};
    const bt = (t, e, n = {}) => {
            (vt = { ...n }),
                (void 0 !== e && "" !== e) || (e = document.location.href),
                (gt = $t(vt.gaPageviews)),
                (e = it(e, "trail")),
                (yt = t);
            const r = () => {
                let n = !1;
                return (
                    vt.langConvertTo &&
                        ((vt.lang = vt.langConvertTo), (n = !0)),
                    mt({
                        routes: t,
                        currentUrl: e,
                        routerOptions: vt,
                        convert: n,
                    }).findActiveRoute()
                );
            };
            return Object.freeze({
                setActiveRoute: (t = !0) => {
                    const e = r();
                    return e.redirectTo
                        ? ((t, e) => (
                              "undefined" != typeof window &&
                                  (t === ht
                                      ? gt.setActive({ path: ht }, e)
                                      : xt(t)),
                              t
                          ))(e.redirectTo, t)
                        : (gt.setActive(e, t), rt.set(e), e);
                },
                findActiveRoute: r,
            });
        },
        xt = (t, e = null, n = !0) => (
            (t = it(t, "lead")),
            e && (vt.langConvertTo = e),
            bt(yt, "http://fake.com/" + t, vt).setActiveRoute(n)
        );
    function Ct(t) {
        let e, n;
        return (
            (e = new Et({
                props: { currentRoute: t[0].childRoute, params: t[1] },
            })),
            {
                c() {
                    V(e.$$.fragment);
                },
                m(t, r) {
                    G(e, t, r), (n = !0);
                },
                p(t, n) {
                    const r = {};
                    1 & n && (r.currentRoute = t[0].childRoute),
                        2 & n && (r.params = t[1]),
                        e.$set(r);
                },
                i(t) {
                    n || (K(e.$$.fragment, t), (n = !0));
                },
                o(t) {
                    U(e.$$.fragment, t), (n = !1);
                },
                d(t) {
                    J(e, t);
                },
            }
        );
    }
    function wt(t) {
        let e, n, r;
        var o = t[0].component;
        function s(t) {
            return {
                props: {
                    currentRoute: { ...t[0], component: "" },
                    params: t[1],
                },
            };
        }
        return (
            o && (e = new o(s(t))),
            {
                c() {
                    e && V(e.$$.fragment), (n = w());
                },
                m(t, o) {
                    e && G(e, t, o), g(t, n, o), (r = !0);
                },
                p(t, r) {
                    const c = {};
                    if (
                        (1 & r && (c.currentRoute = { ...t[0], component: "" }),
                        2 & r && (c.params = t[1]),
                        o !== (o = t[0].component))
                    ) {
                        if (e) {
                            I();
                            const t = e;
                            U(t.$$.fragment, 1, 0, () => {
                                J(t, 1);
                            }),
                                W();
                        }
                        o
                            ? ((e = new o(s(t))),
                              V(e.$$.fragment),
                              K(e.$$.fragment, 1),
                              G(e, n.parentNode, n))
                            : (e = null);
                    } else o && e.$set(c);
                },
                i(t) {
                    r || (e && K(e.$$.fragment, t), (r = !0));
                },
                o(t) {
                    e && U(e.$$.fragment, t), (r = !1);
                },
                d(t) {
                    t && y(n), e && J(e, t);
                },
            }
        );
    }
    function kt(t) {
        let e, n, r;
        var o = t[0].layout;
        function s(t) {
            return {
                props: { currentRoute: { ...t[0], layout: "" }, params: t[1] },
            };
        }
        return (
            o && (e = new o(s(t))),
            {
                c() {
                    e && V(e.$$.fragment), (n = w());
                },
                m(t, o) {
                    e && G(e, t, o), g(t, n, o), (r = !0);
                },
                p(t, r) {
                    const c = {};
                    if (
                        (1 & r && (c.currentRoute = { ...t[0], layout: "" }),
                        2 & r && (c.params = t[1]),
                        o !== (o = t[0].layout))
                    ) {
                        if (e) {
                            I();
                            const t = e;
                            U(t.$$.fragment, 1, 0, () => {
                                J(t, 1);
                            }),
                                W();
                        }
                        o
                            ? ((e = new o(s(t))),
                              V(e.$$.fragment),
                              K(e.$$.fragment, 1),
                              G(e, n.parentNode, n))
                            : (e = null);
                    } else o && e.$set(c);
                },
                i(t) {
                    r || (e && K(e.$$.fragment, t), (r = !0));
                },
                o(t) {
                    e && U(e.$$.fragment, t), (r = !1);
                },
                d(t) {
                    t && y(n), e && J(e, t);
                },
            }
        );
    }
    function Pt(t) {
        let e, n, r, o;
        const s = [kt, wt, Ct],
            c = [];
        function a(t, e) {
            return t[0].layout
                ? 0
                : t[0].component
                ? 1
                : t[0].childRoute
                ? 2
                : -1;
        }
        return (
            ~(e = a(t)) && (n = c[e] = s[e](t)),
            {
                c() {
                    n && n.c(), (r = w());
                },
                m(t, n) {
                    ~e && c[e].m(t, n), g(t, r, n), (o = !0);
                },
                p(t, [o]) {
                    let u = e;
                    (e = a(t)),
                        e === u
                            ? ~e && c[e].p(t, o)
                            : (n &&
                                  (I(),
                                  U(c[u], 1, 1, () => {
                                      c[u] = null;
                                  }),
                                  W()),
                              ~e
                                  ? ((n = c[e]),
                                    n
                                        ? n.p(t, o)
                                        : ((n = c[e] = s[e](t)), n.c()),
                                    K(n, 1),
                                    n.m(r.parentNode, r))
                                  : (n = null));
                },
                i(t) {
                    o || (K(n), (o = !0));
                },
                o(t) {
                    U(n), (o = !1);
                },
                d(t) {
                    ~e && c[e].d(t), t && y(r);
                },
            }
        );
    }
    function jt(t, e, n) {
        let { currentRoute: r = {} } = e,
            { params: o = {} } = e;
        return (
            (t.$$set = (t) => {
                "currentRoute" in t && n(0, (r = t.currentRoute)),
                    "params" in t && n(1, (o = t.params));
            }),
            [r, o]
        );
    }
    "undefined" != typeof window &&
        (window.addEventListener("click", (t) => {
            if ("a" !== t.target.localName.toLowerCase()) return;
            if (t.metaKey || t.ctrlKey || t.shiftKey) return;
            const e = vt.prefix ? `/${vt.prefix.toLowerCase()}` : "",
                n = t.target.pathname && t.target.host === window.location.host,
                r = !(e.length > 1) || t.target.pathname.startsWith(e);
            if (n && r) {
                t.preventDefault();
                const e =
                    t.target.pathname +
                    t.target.search +
                    t.target.search +
                    t.target.hash;
                "_blank" === t.target.target ? window.open(e, "newTab") : xt(e);
            }
        }),
        (window.onpopstate = function (t) {
            let e =
                window.location.pathname +
                window.location.search +
                window.location.hash;
            xt(e, null, !1);
        }));
    class Et extends Y {
        constructor(t) {
            super(), X(this, t, jt, Pt, s, { currentRoute: 0, params: 1 });
        }
    }
    function Ot(t) {
        let e, n;
        return (
            (e = new Et({ props: { currentRoute: t[0] } })),
            {
                c() {
                    V(e.$$.fragment);
                },
                m(t, r) {
                    G(e, t, r), (n = !0);
                },
                p(t, [n]) {
                    const r = {};
                    1 & n && (r.currentRoute = t[0]), e.$set(r);
                },
                i(t) {
                    n || (K(e.$$.fragment, t), (n = !0));
                },
                o(t) {
                    U(e.$$.fragment, t), (n = !1);
                },
                d(t) {
                    J(e, t);
                },
            }
        );
    }
    function Rt(t, e, n) {
        let r;
        i(t, rt, (t) => n(0, (r = t)));
        let { routes: o = [] } = e,
            { options: s = {} } = e;
        return (
            R(() => {
                bt(o, document.location.href, s).setActiveRoute();
            }),
            (t.$$set = (t) => {
                "routes" in t && n(1, (o = t.routes)),
                    "options" in t && n(2, (s = t.options));
            }),
            [r, o, s]
        );
    }
    class Nt extends Y {
        constructor(t) {
            super(), X(this, t, Rt, Ot, s, { routes: 1, options: 2 });
        }
    }
    function Lt(t) {
        let e, n;
        const r = t[2].default,
            o = d(r, t, t[1], null);
        return {
            c() {
                (e = b("section")),
                    o && o.c(),
                    P(e, "class", "layout svelte-qy02jl"),
                    P(e, "style", t[0]);
            },
            m(t, r) {
                g(t, e, r), o && o.m(e, null), (n = !0);
            },
            p(t, [s]) {
                o &&
                    o.p &&
                    (!n || 2 & s) &&
                    p(o, r, t, t[1], n ? f(r, t[1], s, null) : m(t[1]), null),
                    (!n || 1 & s) && P(e, "style", t[0]);
            },
            i(t) {
                n || (K(o, t), (n = !0));
            },
            o(t) {
                U(o, t), (n = !1);
            },
            d(t) {
                t && y(e), o && o.d(t);
            },
        };
    }
    function zt(t, e, n) {
        let { $$slots: r = {}, $$scope: o } = e,
            { customStyles: s = "" } = e;
        return (
            (t.$$set = (t) => {
                "customStyles" in t && n(0, (s = t.customStyles)),
                    "$$scope" in t && n(1, (o = t.$$scope));
            }),
            [s, o, r]
        );
    }
    class _t extends Y {
        constructor(t) {
            super(), X(this, t, zt, Lt, s, { customStyles: 0 });
        }
    }
    const At = { primary: "#FF002F", secondary: "#111111" };
    function Tt(t) {
        let e, n, r, s, c;
        const a = t[5].default,
            u = d(a, t, t[4], null);
        return {
            c() {
                (e = b("button")),
                    u && u.c(),
                    P(e, "type", t[3]),
                    P(
                        e,
                        "style",
                        (n =
                            (void 0 !== t[1] ? t[1] : "") +
                            " background-color:" +
                            At[t[2]] +
                            ";")
                    ),
                    P(e, "class", "svelte-vrclat");
            },
            m(n, a) {
                g(n, e, a),
                    u && u.m(e, null),
                    (r = !0),
                    s ||
                        ((c = k(e, "click", function () {
                            o(t[0]) && t[0].apply(this, arguments);
                        })),
                        (s = !0));
            },
            p(o, [s]) {
                (t = o),
                    u &&
                        u.p &&
                        (!r || 16 & s) &&
                        p(
                            u,
                            a,
                            t,
                            t[4],
                            r ? f(a, t[4], s, null) : m(t[4]),
                            null
                        ),
                    (!r || 8 & s) && P(e, "type", t[3]),
                    (!r ||
                        (6 & s &&
                            n !==
                                (n =
                                    (void 0 !== t[1] ? t[1] : "") +
                                    " background-color:" +
                                    At[t[2]] +
                                    ";"))) &&
                        P(e, "style", n);
            },
            i(t) {
                r || (K(u, t), (r = !0));
            },
            o(t) {
                U(u, t), (r = !1);
            },
            d(t) {
                t && y(e), u && u.d(t), (s = !1), c();
            },
        };
    }
    function Ht(t, e, n) {
        let { $$slots: r = {}, $$scope: o } = e,
            {
                clickEvent: s,
                style: c,
                color: a = "primary",
                type: u = "button",
            } = e;
        return (
            (t.$$set = (t) => {
                "clickEvent" in t && n(0, (s = t.clickEvent)),
                    "style" in t && n(1, (c = t.style)),
                    "color" in t && n(2, (a = t.color)),
                    "type" in t && n(3, (u = t.type)),
                    "$$scope" in t && n(4, (o = t.$$scope));
            }),
            [s, c, a, u, o, r]
        );
    }
    class qt extends Y {
        constructor(t) {
            super(),
                X(this, t, Ht, Tt, s, {
                    clickEvent: 0,
                    style: 1,
                    color: 2,
                    type: 3,
                });
        }
    }
    function Bt(t) {
        let e;
        return {
            c() {
                e = x("Начнём!");
            },
            m(t, n) {
                g(t, e, n);
            },
            d(t) {
                t && y(e);
            },
        };
    }
    function Mt(t) {
        let e, n, r, o, s, c, a;
        return (
            (c = new qt({
                props: {
                    clickEvent: t[0],
                    $$slots: { default: [Bt] },
                    $$scope: { ctx: t },
                },
            })),
            {
                c() {
                    (e = b("div")),
                        (n = b("h1")),
                        (n.textContent = "Мафия"),
                        (r = C()),
                        (o = b("span")),
                        (o.textContent =
                            "Приложение для ведущего в карточной игре - мафия"),
                        (s = C()),
                        V(c.$$.fragment),
                        P(n, "class", "svelte-1bvjxk7"),
                        P(o, "class", "svelte-1bvjxk7"),
                        P(e, "class", "info svelte-1bvjxk7");
                },
                m(t, u) {
                    g(t, e, u),
                        h(e, n),
                        h(e, r),
                        h(e, o),
                        h(e, s),
                        G(c, e, null),
                        (a = !0);
                },
                p(t, e) {
                    const n = {};
                    2 & e && (n.$$scope = { dirty: e, ctx: t }), c.$set(n);
                },
                i(t) {
                    a || (K(c.$$.fragment, t), (a = !0));
                },
                o(t) {
                    U(c.$$.fragment, t), (a = !1);
                },
                d(t) {
                    t && y(e), J(c);
                },
            }
        );
    }
    function St(t) {
        let e, n;
        return (
            (e = new _t({
                props: { $$slots: { default: [Mt] }, $$scope: { ctx: t } },
            })),
            {
                c() {
                    V(e.$$.fragment);
                },
                m(t, r) {
                    G(e, t, r), (n = !0);
                },
                p(t, [n]) {
                    const r = {};
                    2 & n && (r.$$scope = { dirty: n, ctx: t }), e.$set(r);
                },
                i(t) {
                    n || (K(e.$$.fragment, t), (n = !0));
                },
                o(t) {
                    U(e.$$.fragment, t), (n = !1);
                },
                d(t) {
                    J(e, t);
                },
            }
        );
    }
    function Ft(t) {
        return [() => xt("home")];
    }
    function Dt(t) {
        let e;
        return {
            c() {
                e = x("Автоматическая");
            },
            m(t, n) {
                g(t, e, n);
            },
            d(t) {
                t && y(e);
            },
        };
    }
    function It(t) {
        let e;
        return {
            c() {
                e = x("Ручная");
            },
            m(t, n) {
                g(t, e, n);
            },
            d(t) {
                t && y(e);
            },
        };
    }
    function Wt(t) {
        let e, n, r, o, s, c, a;
        return (
            (o = new qt({
                props: {
                    style: "margin-bottom: 20px;",
                    clickEvent: t[0],
                    $$slots: { default: [Dt] },
                    $$scope: { ctx: t },
                },
            })),
            (c = new qt({
                props: {
                    clickEvent: t[1],
                    color: "secondary",
                    $$slots: { default: [It] },
                    $$scope: { ctx: t },
                },
            })),
            {
                c() {
                    (e = b("div")),
                        (n = b("h1")),
                        (n.textContent = "Выберите тип раздачи"),
                        (r = C()),
                        V(o.$$.fragment),
                        (s = C()),
                        V(c.$$.fragment),
                        P(n, "class", "svelte-zw2zjr"),
                        P(e, "class", "selectTypeDistribution svelte-zw2zjr");
                },
                m(t, u) {
                    g(t, e, u),
                        h(e, n),
                        h(e, r),
                        G(o, e, null),
                        h(e, s),
                        G(c, e, null),
                        (a = !0);
                },
                p(t, e) {
                    const n = {};
                    4 & e && (n.$$scope = { dirty: e, ctx: t }), o.$set(n);
                    const r = {};
                    4 & e && (r.$$scope = { dirty: e, ctx: t }), c.$set(r);
                },
                i(t) {
                    a || (K(o.$$.fragment, t), K(c.$$.fragment, t), (a = !0));
                },
                o(t) {
                    U(o.$$.fragment, t), U(c.$$.fragment, t), (a = !1);
                },
                d(t) {
                    t && y(e), J(o), J(c);
                },
            }
        );
    }
    function Kt(t) {
        let e, n;
        return (
            (e = new _t({
                props: { $$slots: { default: [Wt] }, $$scope: { ctx: t } },
            })),
            {
                c() {
                    V(e.$$.fragment);
                },
                m(t, r) {
                    G(e, t, r), (n = !0);
                },
                p(t, [n]) {
                    const r = {};
                    4 & n && (r.$$scope = { dirty: n, ctx: t }), e.$set(r);
                },
                i(t) {
                    n || (K(e.$$.fragment, t), (n = !0));
                },
                o(t) {
                    U(e.$$.fragment, t), (n = !1);
                },
                d(t) {
                    J(e, t);
                },
            }
        );
    }
    function Ut(t) {
        return [() => xt("auto-distribution"), () => xt("manual-distribution")];
    }
    function Vt(t) {
        let e;
        return {
            c() {
                e = x("На главную");
            },
            m(t, n) {
                g(t, e, n);
            },
            d(t) {
                t && y(e);
            },
        };
    }
    function Gt(t) {
        let e, n, r, o, s, c;
        return (
            (s = new qt({
                props: {
                    clickEvent: xt("/"),
                    $$slots: { default: [Vt] },
                    $$scope: { ctx: t },
                },
            })),
            {
                c() {
                    (e = b("h1")),
                        (e.textContent = "УПС"),
                        (n = C()),
                        (r = b("p")),
                        (r.textContent =
                            "Вы попали на страницу, функции для которой ещё в разработке. Пожалуйста\r\n        вернитесь на главную."),
                        (o = C()),
                        V(s.$$.fragment);
                },
                m(t, a) {
                    g(t, e, a),
                        g(t, n, a),
                        g(t, r, a),
                        g(t, o, a),
                        G(s, t, a),
                        (c = !0);
                },
                p(t, e) {
                    const n = {};
                    1 & e && (n.$$scope = { dirty: e, ctx: t }), s.$set(n);
                },
                i(t) {
                    c || (K(s.$$.fragment, t), (c = !0));
                },
                o(t) {
                    U(s.$$.fragment, t), (c = !1);
                },
                d(t) {
                    t && y(e), t && y(n), t && y(r), t && y(o), J(s, t);
                },
            }
        );
    }
    function Jt(t) {
        let e, n;
        return (
            (e = new _t({
                props: { $$slots: { default: [Gt] }, $$scope: { ctx: t } },
            })),
            {
                c() {
                    V(e.$$.fragment);
                },
                m(t, r) {
                    G(e, t, r), (n = !0);
                },
                p(t, [n]) {
                    const r = {};
                    1 & n && (r.$$scope = { dirty: n, ctx: t }), e.$set(r);
                },
                i(t) {
                    n || (K(e.$$.fragment, t), (n = !0));
                },
                o(t) {
                    U(e.$$.fragment, t), (n = !1);
                },
                d(t) {
                    J(e, t);
                },
            }
        );
    }
    function Qt(e) {
        let n, r, s;
        return {
            c() {
                (n = b("input")),
                    P(n, "type", e[4]),
                    P(n, "placeholder", e[5]),
                    (n.value = e[1]),
                    P(n, "min", e[6]),
                    P(n, "max", e[7]),
                    P(n, "id", e[3]),
                    P(n, "style", e[0]),
                    P(n, "class", "svelte-1fnif30");
            },
            m(t, c) {
                g(t, n, c),
                    r ||
                        ((s = k(n, "input", function () {
                            o(e[2]) && e[2].apply(this, arguments);
                        })),
                        (r = !0));
            },
            p(t, [r]) {
                (e = t),
                    16 & r && P(n, "type", e[4]),
                    32 & r && P(n, "placeholder", e[5]),
                    2 & r && n.value !== e[1] && (n.value = e[1]),
                    64 & r && P(n, "min", e[6]),
                    128 & r && P(n, "max", e[7]),
                    8 & r && P(n, "id", e[3]),
                    1 & r && P(n, "style", e[0]);
            },
            i: t,
            o: t,
            d(t) {
                t && y(n), (r = !1), s();
            },
        };
    }
    function Xt(t, e, n) {
        let {
            style: r,
            value: o,
            onChange: s,
            id: c,
            type: a = "text",
            placeholder: u = "",
            min: l = 1,
            max: i = 100,
        } = e;
        return (
            (t.$$set = (t) => {
                "style" in t && n(0, (r = t.style)),
                    "value" in t && n(1, (o = t.value)),
                    "onChange" in t && n(2, (s = t.onChange)),
                    "id" in t && n(3, (c = t.id)),
                    "type" in t && n(4, (a = t.type)),
                    "placeholder" in t && n(5, (u = t.placeholder)),
                    "min" in t && n(6, (l = t.min)),
                    "max" in t && n(7, (i = t.max));
            }),
            [r, o, s, c, a, u, l, i]
        );
    }
    class Yt extends Y {
        constructor(t) {
            super(),
                X(this, t, Xt, Qt, s, {
                    style: 0,
                    value: 1,
                    onChange: 2,
                    id: 3,
                    type: 4,
                    placeholder: 5,
                    min: 6,
                    max: 7,
                });
        }
    }
    function Zt(t) {
        let e, n;
        const r = t[1].default,
            o = d(r, t, t[0], null);
        return {
            c() {
                (e = b("div")),
                    o && o.c(),
                    P(e, "class", "modal svelte-fa7zts");
            },
            m(t, r) {
                g(t, e, r), o && o.m(e, null), (n = !0);
            },
            p(t, [e]) {
                o &&
                    o.p &&
                    (!n || 1 & e) &&
                    p(o, r, t, t[0], n ? f(r, t[0], e, null) : m(t[0]), null);
            },
            i(t) {
                n || (K(o, t), (n = !0));
            },
            o(t) {
                U(o, t), (n = !1);
            },
            d(t) {
                t && y(e), o && o.d(t);
            },
        };
    }
    function te(t, e, n) {
        let { $$slots: r = {}, $$scope: o } = e;
        return (
            (t.$$set = (t) => {
                "$$scope" in t && n(0, (o = t.$$scope));
            }),
            [o, r]
        );
    }
    class ee extends Y {
        constructor(t) {
            super(), X(this, t, te, Zt, s, {});
        }
    }
    const ne = {
        mafia: "Мафия",
        civilian: "Мирный житель",
        doctor: "Доктор",
        commissioner: "Комиссар",
        exmafia: "Дон мафии",
        maniac: "Маньяк",
        prostitute: "Путана",
        boss: "Босс",
        yakuza: "Якудза",
        thief: "Вор",
    };
    const re = (function () {
        const { subscribe: t, update: e } = tt({
            playersCount: 1,
            cards: [],
            cardsCount: {},
        });
        return {
            subscribe: t,
            update: e,
            calculateDistribution: () => {
                let t = l(re).playersCount,
                    n = [];
                for (let e = 0; e < Math.ceil(t / 4); e++) n.push("Мафия");
                (t -= Math.ceil(t / 4)),
                    t >= 4 && (n.push("Доктор"), t--),
                    t > 0 && (n.push("Комиссар"), t--);
                for (let e = 0; e < t; e++) n.push("Мирный житель");
                e((t) => ({ ...t, cards: n }));
            },
            calculateCardsCount: () => {
                const t = l(re).cards,
                    n = {};
                for (let e = 0; e < t.length; e++)
                    void 0 === n[t[e]] ? (n[t[e]] = 1) : n[t[e]]++;
                e((t) => ({ ...t, cardsCount: n }));
            },
            loadCardsManual: (t) => {
                let n = [];
                Object.keys(t).forEach((e) => {
                    for (let r = 0; r < t[e]; r++) n.push(ne[e]);
                }),
                    console.log(n),
                    e((t) => ({ ...t, cards: n }));
            },
            onChangePlayersCount(t) {
                e((e) => ({ ...e, playersCount: t.target.value }));
            },
            reset: () => {
                e((t) => ({ ...t, cards: [] }));
            },
        };
    })();
    function oe() {
        let t = {};
        return (
            Object.keys(ne).forEach((e) => {
                t[e] = 0;
            }),
            t
        );
    }
    const se = (function () {
        const { update: t, subscribe: e } = tt({ cards: oe() });
        return {
            subscribe: e,
            update: t,
            onCardCountChanged: (e, n) => {
                let r = l(se).cards;
                n.target.value.toString().length > 0 &&
                Number(n.target.value) > 0
                    ? (r[e] = Number(n.target.value))
                    : (r[e] = 0),
                    t((t) => ({ ...t, cards: r }));
            },
            incrementCardCount: (e) => {
                let n = l(se).cards;
                (n[e] = Number(n[e]) + 1), t((t) => ({ ...t, cards: n }));
            },
            decrementCardCount: (e) => {
                let n = l(se).cards;
                n[e] > 0 &&
                    ((n[e] = Number(n[e]) - 1), t((t) => ({ ...t, cards: n })));
            },
            loadCardsFromAutoDistribution: (e) => {
                let n = l(se).cards;
                const r = Object.entries(ne),
                    o = Object.entries(e);
                for (let t = 0; t < o.length; t++)
                    for (let e = 0; e < r.length; e++)
                        r[e][1].toLowerCase() === o[t][0].toLowerCase() &&
                            (n[r[e][0]] = o[t][1]);
                t((t) => ({ ...t, cards: n }));
            },
        };
    })();
    function ce(t) {
        let e, n;
        const r = t[1].default,
            o = d(r, t, t[0], null);
        return {
            c() {
                (e = b("div")), o && o.c(), P(e, "class", "container");
            },
            m(t, r) {
                g(t, e, r), o && o.m(e, null), (n = !0);
            },
            p(t, [e]) {
                o &&
                    o.p &&
                    (!n || 1 & e) &&
                    p(o, r, t, t[0], n ? f(r, t[0], e, null) : m(t[0]), null);
            },
            i(t) {
                n || (K(o, t), (n = !0));
            },
            o(t) {
                U(o, t), (n = !1);
            },
            d(t) {
                t && y(e), o && o.d(t);
            },
        };
    }
    function ae(t, e, n) {
        let { $$slots: r = {}, $$scope: o } = e;
        return (
            (t.$$set = (t) => {
                "$$scope" in t && n(0, (o = t.$$scope));
            }),
            [o, r]
        );
    }
    class ue extends Y {
        constructor(t) {
            super(), X(this, t, ae, ce, s, {});
        }
    }
    function le(t) {
        let e, n;
        const r = t[1].default,
            o = d(r, t, t[0], null);
        return {
            c() {
                (e = b("table")), o && o.c(), P(e, "class", "table");
            },
            m(t, r) {
                g(t, e, r), o && o.m(e, null), (n = !0);
            },
            p(t, [e]) {
                o &&
                    o.p &&
                    (!n || 1 & e) &&
                    p(o, r, t, t[0], n ? f(r, t[0], e, null) : m(t[0]), null);
            },
            i(t) {
                n || (K(o, t), (n = !0));
            },
            o(t) {
                U(o, t), (n = !1);
            },
            d(t) {
                t && y(e), o && o.d(t);
            },
        };
    }
    function ie(t, e, n) {
        let { $$slots: r = {}, $$scope: o } = e;
        return (
            (t.$$set = (t) => {
                "$$scope" in t && n(0, (o = t.$$scope));
            }),
            [o, r]
        );
    }
    class de extends Y {
        constructor(t) {
            super(), X(this, t, ie, le, s, {});
        }
    }
    const $e = (function () {
        const {
            set: t,
            subscribe: e,
            update: n,
        } = tt({ cardsHiddened: [], cardsOpened: [] });
        return {
            subscribe: e,
            update: n,
            loadCards: (e) => {
                let n,
                    r = e.length;
                for (; 0 != r; )
                    (n = Math.floor(Math.random() * r)),
                        r--,
                        ([e[r], e[n]] = [e[n], e[r]]);
                t({ cardsHiddened: e, cardsOpened: [] });
            },
            pushToHistoryDistribution: (t) => {
                const e = l($e).cardsOpened;
                n((n) => ({ ...n, cardsOpened: [...e, t] }));
            },
            deleteOpenedCard: (t) => {
                const e = l($e).cardsHiddened;
                e.shift(), n((t) => ({ ...t, cardsHiddened: e }));
            },
            returnOpenedCardInRotation: () => {
                const t = l($e).cardsHiddened,
                    e = l($e).cardsOpened;
                n((n) => ({ ...n, cardsHiddened: [e[e.length - 1], ...t] }));
            },
        };
    })();
    function fe(t, e, n) {
        const r = t.slice();
        return (r[5] = e[n][0]), (r[6] = e[n][1]), r;
    }
    function pe(t) {
        let e,
            n,
            r,
            o,
            s,
            c = t[5] + "",
            a = t[6] + "";
        return {
            c() {
                (e = b("tr")),
                    (n = b("td")),
                    (r = x(c)),
                    (o = b("td")),
                    (s = x(a)),
                    P(o, "align", "right");
            },
            m(t, c) {
                g(t, e, c), h(e, n), h(n, r), h(e, o), h(o, s);
            },
            p(t, e) {
                2 & e && c !== (c = t[5] + "") && j(r, c),
                    2 & e && a !== (a = t[6] + "") && j(s, a);
            },
            d(t) {
                t && y(e);
            },
        };
    }
    function me(t) {
        let e,
            n,
            r,
            o = Object.entries(t[1].cardsCount),
            s = [];
        for (let e = 0; e < o.length; e += 1) s[e] = pe(fe(t, o, e));
        return {
            c() {
                (e = b("thead")),
                    (e.innerHTML =
                        '<th align="left">Название карты</th> \n                    <th align="right">Количество</th>'),
                    (n = C());
                for (let t = 0; t < s.length; t += 1) s[t].c();
                r = w();
            },
            m(t, o) {
                g(t, e, o), g(t, n, o);
                for (let e = 0; e < s.length; e += 1) s[e].m(t, o);
                g(t, r, o);
            },
            p(t, e) {
                if (2 & e) {
                    let n;
                    for (
                        o = Object.entries(t[1].cardsCount), n = 0;
                        n < o.length;
                        n += 1
                    ) {
                        const c = fe(t, o, n);
                        s[n]
                            ? s[n].p(c, e)
                            : ((s[n] = pe(c)),
                              s[n].c(),
                              s[n].m(r.parentNode, r));
                    }
                    for (; n < s.length; n += 1) s[n].d(1);
                    s.length = o.length;
                }
            },
            d(t) {
                t && y(e), t && y(n), v(s, t), t && y(r);
            },
        };
    }
    function he(t) {
        let e;
        return {
            c() {
                e = x("Раздать");
            },
            m(t, n) {
                g(t, e, n);
            },
            d(t) {
                t && y(e);
            },
        };
    }
    function ge(t) {
        let e;
        return {
            c() {
                e = x("Назад");
            },
            m(t, n) {
                g(t, e, n);
            },
            d(t) {
                t && y(e);
            },
        };
    }
    function ye(t) {
        let e, n, r, o, s, c, a, u, l, i, $;
        o = new de({
            props: { $$slots: { default: [me] }, $$scope: { ctx: t } },
        });
        const v = t[3].default,
            x = d(v, t, t[4], null);
        return (
            (u = new qt({
                props: {
                    clickEvent: t[2],
                    style: "font-size: 1rem;",
                    $$slots: { default: [he] },
                    $$scope: { ctx: t },
                },
            })),
            (i = new qt({
                props: {
                    style: "font-size: 1rem;",
                    color: "secondary",
                    clickEvent: t[0],
                    $$slots: { default: [ge] },
                    $$scope: { ctx: t },
                },
            })),
            {
                c() {
                    (e = b("div")),
                        (e.innerHTML =
                            "<h1>Ваша колода</h1> \n            <hr/>"),
                        (n = C()),
                        (r = b("div")),
                        V(o.$$.fragment),
                        (s = C()),
                        (c = b("div")),
                        x && x.c(),
                        (a = C()),
                        V(u.$$.fragment),
                        (l = C()),
                        V(i.$$.fragment),
                        E(r, "flex", "1 1 auto"),
                        P(c, "class", "buttons"),
                        E(c, "width", "80%");
                },
                m(t, d) {
                    g(t, e, d),
                        g(t, n, d),
                        g(t, r, d),
                        G(o, r, null),
                        g(t, s, d),
                        g(t, c, d),
                        x && x.m(c, null),
                        h(c, a),
                        G(u, c, null),
                        h(c, l),
                        G(i, c, null),
                        ($ = !0);
                },
                p(t, e) {
                    const n = {};
                    18 & e && (n.$$scope = { dirty: e, ctx: t }),
                        o.$set(n),
                        x &&
                            x.p &&
                            (!$ || 16 & e) &&
                            p(
                                x,
                                v,
                                t,
                                t[4],
                                $ ? f(v, t[4], e, null) : m(t[4]),
                                null
                            );
                    const r = {};
                    16 & e && (r.$$scope = { dirty: e, ctx: t }), u.$set(r);
                    const s = {};
                    1 & e && (s.clickEvent = t[0]),
                        16 & e && (s.$$scope = { dirty: e, ctx: t }),
                        i.$set(s);
                },
                i(t) {
                    $ ||
                        (K(o.$$.fragment, t),
                        K(x, t),
                        K(u.$$.fragment, t),
                        K(i.$$.fragment, t),
                        ($ = !0));
                },
                o(t) {
                    U(o.$$.fragment, t),
                        U(x, t),
                        U(u.$$.fragment, t),
                        U(i.$$.fragment, t),
                        ($ = !1);
                },
                d(t) {
                    t && y(e),
                        t && y(n),
                        t && y(r),
                        J(o),
                        t && y(s),
                        t && y(c),
                        x && x.d(t),
                        J(u),
                        J(i);
                },
            }
        );
    }
    function ve(t) {
        let e, n;
        return (
            (e = new ue({
                props: { $$slots: { default: [ye] }, $$scope: { ctx: t } },
            })),
            {
                c() {
                    V(e.$$.fragment);
                },
                m(t, r) {
                    G(e, t, r), (n = !0);
                },
                p(t, n) {
                    const r = {};
                    19 & n && (r.$$scope = { dirty: n, ctx: t }), e.$set(r);
                },
                i(t) {
                    n || (K(e.$$.fragment, t), (n = !0));
                },
                o(t) {
                    U(e.$$.fragment, t), (n = !1);
                },
                d(t) {
                    J(e, t);
                },
            }
        );
    }
    function be(t) {
        let e, n;
        return (
            (e = new _t({
                props: { $$slots: { default: [ve] }, $$scope: { ctx: t } },
            })),
            {
                c() {
                    V(e.$$.fragment);
                },
                m(t, r) {
                    G(e, t, r), (n = !0);
                },
                p(t, [n]) {
                    const r = {};
                    19 & n && (r.$$scope = { dirty: n, ctx: t }), e.$set(r);
                },
                i(t) {
                    n || (K(e.$$.fragment, t), (n = !0));
                },
                o(t) {
                    U(e.$$.fragment, t), (n = !1);
                },
                d(t) {
                    J(e, t);
                },
            }
        );
    }
    function xe(t, e, n) {
        let r;
        i(t, re, (t) => n(1, (r = t)));
        let { $$slots: o = {}, $$scope: s } = e;
        let { backBtnEvent: c = () => xt("manual-distribution") } = e;
        return (
            (t.$$set = (t) => {
                "backBtnEvent" in t && n(0, (c = t.backBtnEvent)),
                    "$$scope" in t && n(4, (s = t.$$scope));
            }),
            [
                c,
                r,
                function () {
                    $e.loadCards(r.cards), xt("show-distribution");
                },
                o,
                s,
            ]
        );
    }
    class Ce extends Y {
        constructor(t) {
            super(), X(this, t, xe, be, s, { backBtnEvent: 0 });
        }
    }
    function we(t) {
        let e, n;
        return (
            (e = new ee({
                props: { $$slots: { default: [je] }, $$scope: { ctx: t } },
            })),
            {
                c() {
                    V(e.$$.fragment);
                },
                m(t, r) {
                    G(e, t, r), (n = !0);
                },
                p(t, n) {
                    const r = {};
                    134 & n && (r.$$scope = { dirty: n, ctx: t }), e.$set(r);
                },
                i(t) {
                    n || (K(e.$$.fragment, t), (n = !0));
                },
                o(t) {
                    U(e.$$.fragment, t), (n = !1);
                },
                d(t) {
                    J(e, t);
                },
            }
        );
    }
    function ke(t) {
        let e;
        return {
            c() {
                e = x("Сохранить");
            },
            m(t, n) {
                g(t, e, n);
            },
            d(t) {
                t && y(e);
            },
        };
    }
    function Pe(t) {
        let e;
        return {
            c() {
                e = x("Назад");
            },
            m(t, n) {
                g(t, e, n);
            },
            d(t) {
                t && y(e);
            },
        };
    }
    function je(t) {
        let e, n, r, o, s, c, a, u, l, i, d, $, f, p;
        return (
            (s = new Yt({
                props: {
                    id: "playersCount",
                    type: "number",
                    value: t[2].playersCount,
                    onChange: re.onChangePlayersCount,
                    style: "margin-bottom: 15px;",
                },
            })),
            (a = new qt({
                props: {
                    clickEvent: t[3],
                    style: "font-size: 1rem;",
                    $$slots: { default: [ke] },
                    $$scope: { ctx: t },
                },
            })),
            (l = new qt({
                props: {
                    clickEvent: t[5],
                    style: "font-size: 1rem;",
                    color: "secondary",
                    $$slots: { default: [Pe] },
                    $$scope: { ctx: t },
                },
            })),
            {
                c() {
                    (e = b("div")),
                        (n = b("div")),
                        (r = b("label")),
                        (r.textContent = "Количество игроков"),
                        (o = C()),
                        V(s.$$.fragment),
                        (c = C()),
                        V(a.$$.fragment),
                        (u = C()),
                        V(l.$$.fragment),
                        (i = C()),
                        (d = b("span")),
                        ($ = x(
                            "Недопустимое число игроков. Введите корректное число."
                        )),
                        P(r, "for", "playersCount"),
                        P(r, "class", "svelte-1mi7xd4"),
                        P(
                            n,
                            "class",
                            "playersCountArea buttons svelte-1mi7xd4"
                        ),
                        P(
                            d,
                            "class",
                            (f =
                                "error " + (t[1] && "show") + " svelte-1mi7xd4")
                        ),
                        P(e, "class", "modalArea svelte-1mi7xd4");
                },
                m(t, f) {
                    g(t, e, f),
                        h(e, n),
                        h(n, r),
                        h(n, o),
                        G(s, n, null),
                        h(n, c),
                        G(a, n, null),
                        h(n, u),
                        G(l, n, null),
                        h(e, i),
                        h(e, d),
                        h(d, $),
                        (p = !0);
                },
                p(t, e) {
                    const n = {};
                    4 & e && (n.value = t[2].playersCount), s.$set(n);
                    const r = {};
                    128 & e && (r.$$scope = { dirty: e, ctx: t }), a.$set(r);
                    const o = {};
                    128 & e && (o.$$scope = { dirty: e, ctx: t }),
                        l.$set(o),
                        (!p ||
                            (2 & e &&
                                f !==
                                    (f =
                                        "error " +
                                        (t[1] && "show") +
                                        " svelte-1mi7xd4"))) &&
                            P(d, "class", f);
                },
                i(t) {
                    p ||
                        (K(s.$$.fragment, t),
                        K(a.$$.fragment, t),
                        K(l.$$.fragment, t),
                        (p = !0));
                },
                o(t) {
                    U(s.$$.fragment, t),
                        U(a.$$.fragment, t),
                        U(l.$$.fragment, t),
                        (p = !1);
                },
                d(t) {
                    t && y(e), J(s), J(a), J(l);
                },
            }
        );
    }
    function Ee(t) {
        let e;
        return {
            c() {
                e = x("Изменить раздачу");
            },
            m(t, n) {
                g(t, e, n);
            },
            d(t) {
                t && y(e);
            },
        };
    }
    function Oe(t) {
        let e, n;
        return (
            (e = new qt({
                props: {
                    clickEvent: t[4],
                    style: "font-size: 1rem;",
                    color: "secondary",
                    $$slots: { default: [Ee] },
                    $$scope: { ctx: t },
                },
            })),
            {
                c() {
                    V(e.$$.fragment);
                },
                m(t, r) {
                    G(e, t, r), (n = !0);
                },
                p(t, n) {
                    const r = {};
                    128 & n && (r.$$scope = { dirty: n, ctx: t }), e.$set(r);
                },
                i(t) {
                    n || (K(e.$$.fragment, t), (n = !0));
                },
                o(t) {
                    U(e.$$.fragment, t), (n = !1);
                },
                d(t) {
                    J(e, t);
                },
            }
        );
    }
    function Re(t) {
        let e,
            n,
            r,
            o = (t[2].playersCount <= 0 || t[0]) && we(t);
        return (
            (n = new Ce({
                props: {
                    backBtnEvent: t[6],
                    $$slots: { default: [Oe] },
                    $$scope: { ctx: t },
                },
            })),
            {
                c() {
                    o && o.c(), (e = C()), V(n.$$.fragment);
                },
                m(t, s) {
                    o && o.m(t, s), g(t, e, s), G(n, t, s), (r = !0);
                },
                p(t, [r]) {
                    t[2].playersCount <= 0 || t[0]
                        ? o
                            ? (o.p(t, r), 5 & r && K(o, 1))
                            : ((o = we(t)),
                              o.c(),
                              K(o, 1),
                              o.m(e.parentNode, e))
                        : o &&
                          (I(),
                          U(o, 1, 1, () => {
                              o = null;
                          }),
                          W());
                    const s = {};
                    1 & r && (s.backBtnEvent = t[6]),
                        128 & r && (s.$$scope = { dirty: r, ctx: t }),
                        n.$set(s);
                },
                i(t) {
                    r || (K(o), K(n.$$.fragment, t), (r = !0));
                },
                o(t) {
                    U(o), U(n.$$.fragment, t), (r = !1);
                },
                d(t) {
                    o && o.d(t), t && y(e), J(n, t);
                },
            }
        );
    }
    function Ne(t, e, n) {
        let r;
        i(t, re, (t) => n(2, (r = t))),
            R(() => {
                re.reset();
            });
        let o = !0,
            s = !1;
        return [
            o,
            s,
            r,
            function () {
                r.playersCount.toString() > 0 && Number(r.playersCount) >= 1
                    ? (n(1, (s = !1)),
                      n(0, (o = !1)),
                      re.calculateDistribution(),
                      re.calculateCardsCount())
                    : n(1, (s = !0));
            },
            function () {
                se.loadCardsFromAutoDistribution(r.cardsCount),
                    xt("manual-distribution");
            },
            () => xt("/home"),
            () => n(0, (o = !0)),
        ];
    }
    function Le(t, e, n) {
        const r = t.slice();
        return (r[6] = e[n][0]), (r[7] = e[n][1]), r;
    }
    function ze(t) {
        let e,
            n,
            o,
            s,
            c,
            a,
            u,
            l,
            i,
            d,
            $,
            f,
            p,
            m,
            v,
            w,
            j = t[7] + "";
        function E() {
            return t[2](t[6]);
        }
        function O(...e) {
            return t[3](t[6], ...e);
        }
        function R() {
            return t[4](t[6]);
        }
        return {
            c() {
                (e = b("tr")),
                    (n = b("td")),
                    (o = x(j)),
                    (s = C()),
                    (c = b("td")),
                    (a = b("button")),
                    (a.textContent = "+"),
                    (u = C()),
                    (l = b("input")),
                    (f = C()),
                    (p = b("button")),
                    (p.textContent = "-"),
                    (m = C()),
                    P(a, "class", "changeCardCountBtn svelte-gjm1kn"),
                    P(l, "type", "number"),
                    P(l, "min", "0"),
                    P(l, "max", "100"),
                    P(l, "name", (i = t[6])),
                    (l.value = d = t[0].cards[t[6]]),
                    P(
                        l,
                        "class",
                        ($ =
                            "cardCountInput " +
                            (0 !== t[0].cards[t[6]] ? "activeCard" : "") +
                            " svelte-gjm1kn")
                    ),
                    P(p, "class", "changeCardCountBtn svelte-gjm1kn"),
                    P(c, "align", "right"),
                    P(c, "class", "cardCounterColumn svelte-gjm1kn");
            },
            m(t, r) {
                g(t, e, r),
                    h(e, n),
                    h(n, o),
                    h(e, s),
                    h(e, c),
                    h(c, a),
                    h(c, u),
                    h(c, l),
                    h(c, f),
                    h(c, p),
                    h(e, m),
                    v ||
                        ((w = [
                            k(a, "click", E),
                            k(l, "input", O),
                            k(p, "click", R),
                        ]),
                        (v = !0));
            },
            p(e, n) {
                (t = e),
                    1 & n &&
                        d !== (d = t[0].cards[t[6]]) &&
                        l.value !== d &&
                        (l.value = d),
                    1 & n &&
                        $ !==
                            ($ =
                                "cardCountInput " +
                                (0 !== t[0].cards[t[6]] ? "activeCard" : "") +
                                " svelte-gjm1kn") &&
                        P(l, "class", $);
            },
            d(t) {
                t && y(e), (v = !1), r(w);
            },
        };
    }
    function _e(t) {
        let e,
            n,
            r,
            o = Object.entries(ne),
            s = [];
        for (let e = 0; e < o.length; e += 1) s[e] = ze(Le(t, o, e));
        return {
            c() {
                (e = b("thead")),
                    (e.innerHTML =
                        '<th align="left">Название карты</th> \n                    <th align="right">Количество</th>'),
                    (n = C());
                for (let t = 0; t < s.length; t += 1) s[t].c();
                r = w();
            },
            m(t, o) {
                g(t, e, o), g(t, n, o);
                for (let e = 0; e < s.length; e += 1) s[e].m(t, o);
                g(t, r, o);
            },
            p(t, e) {
                if (1 & e) {
                    let n;
                    for (o = Object.entries(ne), n = 0; n < o.length; n += 1) {
                        const c = Le(t, o, n);
                        s[n]
                            ? s[n].p(c, e)
                            : ((s[n] = ze(c)),
                              s[n].c(),
                              s[n].m(r.parentNode, r));
                    }
                    for (; n < s.length; n += 1) s[n].d(1);
                    s.length = o.length;
                }
            },
            d(t) {
                t && y(e), t && y(n), v(s, t), t && y(r);
            },
        };
    }
    function Ae(t) {
        let e;
        return {
            c() {
                e = x("Подтвердить");
            },
            m(t, n) {
                g(t, e, n);
            },
            d(t) {
                t && y(e);
            },
        };
    }
    function Te(t) {
        let e;
        return {
            c() {
                e = x("Назад");
            },
            m(t, n) {
                g(t, e, n);
            },
            d(t) {
                t && y(e);
            },
        };
    }
    function He(t) {
        let e,
            n,
            r,
            o,
            s,
            c,
            a,
            u,
            l,
            i,
            d,
            $,
            f,
            p,
            m = Object.values(t[0].cards).reduce(Me, 0) + "";
        return (
            (o = new de({
                props: { $$slots: { default: [_e] }, $$scope: { ctx: t } },
            })),
            (d = new qt({
                props: {
                    clickEvent: t[1],
                    $$slots: { default: [Ae] },
                    $$scope: { ctx: t },
                },
            })),
            (f = new qt({
                props: {
                    color: "secondary",
                    clickEvent: t[5],
                    $$slots: { default: [Te] },
                    $$scope: { ctx: t },
                },
            })),
            {
                c() {
                    (e = b("div")),
                        (e.innerHTML =
                            "<h1>Выберите карты</h1> \n            <hr/>"),
                        (n = C()),
                        (r = b("div")),
                        V(o.$$.fragment),
                        (s = C()),
                        (c = b("h2")),
                        (a = x("Количество игроков: ")),
                        (u = x(m)),
                        (l = C()),
                        (i = b("div")),
                        V(d.$$.fragment),
                        ($ = C()),
                        V(f.$$.fragment),
                        P(r, "class", "roles svelte-gjm1kn"),
                        P(c, "class", "cardCounterIndicator svelte-gjm1kn"),
                        P(i, "class", "buttons svelte-gjm1kn");
                },
                m(t, m) {
                    g(t, e, m),
                        g(t, n, m),
                        g(t, r, m),
                        G(o, r, null),
                        g(t, s, m),
                        g(t, c, m),
                        h(c, a),
                        h(c, u),
                        g(t, l, m),
                        g(t, i, m),
                        G(d, i, null),
                        h(i, $),
                        G(f, i, null),
                        (p = !0);
                },
                p(t, e) {
                    const n = {};
                    1025 & e && (n.$$scope = { dirty: e, ctx: t }),
                        o.$set(n),
                        (!p || 1 & e) &&
                            m !==
                                (m =
                                    Object.values(t[0].cards).reduce(Me, 0) +
                                    "") &&
                            j(u, m);
                    const r = {};
                    1024 & e && (r.$$scope = { dirty: e, ctx: t }), d.$set(r);
                    const s = {};
                    1024 & e && (s.$$scope = { dirty: e, ctx: t }), f.$set(s);
                },
                i(t) {
                    p ||
                        (K(o.$$.fragment, t),
                        K(d.$$.fragment, t),
                        K(f.$$.fragment, t),
                        (p = !0));
                },
                o(t) {
                    U(o.$$.fragment, t),
                        U(d.$$.fragment, t),
                        U(f.$$.fragment, t),
                        (p = !1);
                },
                d(t) {
                    t && y(e),
                        t && y(n),
                        t && y(r),
                        J(o),
                        t && y(s),
                        t && y(c),
                        t && y(l),
                        t && y(i),
                        J(d),
                        J(f);
                },
            }
        );
    }
    function qe(t) {
        let e, n;
        return (
            (e = new ue({
                props: { $$slots: { default: [He] }, $$scope: { ctx: t } },
            })),
            {
                c() {
                    V(e.$$.fragment);
                },
                m(t, r) {
                    G(e, t, r), (n = !0);
                },
                p(t, n) {
                    const r = {};
                    1025 & n && (r.$$scope = { dirty: n, ctx: t }), e.$set(r);
                },
                i(t) {
                    n || (K(e.$$.fragment, t), (n = !0));
                },
                o(t) {
                    U(e.$$.fragment, t), (n = !1);
                },
                d(t) {
                    J(e, t);
                },
            }
        );
    }
    function Be(t) {
        let e, n;
        return (
            (e = new _t({
                props: { $$slots: { default: [qe] }, $$scope: { ctx: t } },
            })),
            {
                c() {
                    V(e.$$.fragment);
                },
                m(t, r) {
                    G(e, t, r), (n = !0);
                },
                p(t, [n]) {
                    const r = {};
                    1025 & n && (r.$$scope = { dirty: n, ctx: t }), e.$set(r);
                },
                i(t) {
                    n || (K(e.$$.fragment, t), (n = !0));
                },
                o(t) {
                    U(e.$$.fragment, t), (n = !1);
                },
                d(t) {
                    J(e, t);
                },
            }
        );
    }
    const Me = (t, e) => t + e;
    function Se(t, e, n) {
        let r;
        i(t, se, (t) => n(0, (r = t)));
        return [
            r,
            function () {
                re.loadCardsManual(r.cards),
                    re.calculateCardsCount(),
                    xt("preview-distribution");
            },
            (t) => se.incrementCardCount(t),
            (t, e) => se.onCardCountChanged(t, e),
            (t) => se.decrementCardCount(t),
            () => xt("/home"),
        ];
    }
    function Fe(t) {
        let e,
            n,
            r,
            o,
            s,
            a,
            u,
            l,
            i,
            d,
            $,
            f,
            p,
            m,
            v,
            w,
            E,
            O,
            R,
            N = t[2].cardsHiddened.length + "";
        return {
            c() {
                var h, g;
                (e = b("div")),
                    (n = b("h1")),
                    (n.textContent =
                        "Нажмите на карту, чтобы получить свою роль"),
                    (r = C()),
                    (o = b("div")),
                    (s = b("div")),
                    (a = b("img")),
                    (i = C()),
                    (d = b("div")),
                    ($ = b("span")),
                    (f = x(t[1])),
                    (m = C()),
                    (v = b("span")),
                    (w = x("Осталось карт: ")),
                    (E = x(N)),
                    P(n, "class", "svelte-1ddq6x6"),
                    (h = a.src),
                    (g = u =
                        "https://sanua356.github.io/mafia-leading-mobile/public/assets/logo2.png"),
                    c || (c = document.createElement("a")),
                    (c.href = g),
                    h !== c.href &&
                        P(
                            a,
                            "src",
                            "https://sanua356.github.io/mafia-leading-mobile/public/assets/logo2.png"
                        ),
                    P(a, "alt", "Логотип"),
                    P(
                        s,
                        "class",
                        (l =
                            "cardFront" +
                            (t[0] ? " cardFrontHiddened" : "") +
                            " svelte-1ddq6x6")
                    ),
                    P(
                        d,
                        "class",
                        (p =
                            "cardBack" +
                            (t[0] ? " cardBackOpened" : "") +
                            " svelte-1ddq6x6")
                    ),
                    P(o, "class", "card svelte-1ddq6x6"),
                    P(v, "class", "cardsCounter svelte-1ddq6x6"),
                    P(e, "class", "cardsArea svelte-1ddq6x6");
            },
            m(c, u) {
                g(c, e, u),
                    h(e, n),
                    h(e, r),
                    h(e, o),
                    h(o, s),
                    h(s, a),
                    h(o, i),
                    h(o, d),
                    h(d, $),
                    h($, f),
                    h(e, m),
                    h(e, v),
                    h(v, w),
                    h(v, E),
                    O || ((R = k(o, "click", t[3])), (O = !0));
            },
            p(t, e) {
                1 & e &&
                    l !==
                        (l =
                            "cardFront" +
                            (t[0] ? " cardFrontHiddened" : "") +
                            " svelte-1ddq6x6") &&
                    P(s, "class", l),
                    2 & e && j(f, t[1]),
                    1 & e &&
                        p !==
                            (p =
                                "cardBack" +
                                (t[0] ? " cardBackOpened" : "") +
                                " svelte-1ddq6x6") &&
                        P(d, "class", p),
                    4 & e &&
                        N !== (N = t[2].cardsHiddened.length + "") &&
                        j(E, N);
            },
            d(t) {
                t && y(e), (O = !1), R();
            },
        };
    }
    function De(t) {
        let e, n;
        return (
            (e = new _t({
                props: { $$slots: { default: [Fe] }, $$scope: { ctx: t } },
            })),
            {
                c() {
                    V(e.$$.fragment);
                },
                m(t, r) {
                    G(e, t, r), (n = !0);
                },
                p(t, [n]) {
                    const r = {};
                    39 & n && (r.$$scope = { dirty: n, ctx: t }), e.$set(r);
                },
                i(t) {
                    n || (K(e.$$.fragment, t), (n = !0));
                },
                o(t) {
                    U(e.$$.fragment, t), (n = !1);
                },
                d(t) {
                    J(e, t);
                },
            }
        );
    }
    function Ie(t, e, n) {
        let r;
        i(t, $e, (t) => n(2, (r = t)));
        let o = !1,
            s = "",
            c = !1;
        return [
            o,
            s,
            r,
            function () {
                r.cardsHiddened.length > 0
                    ? (!1 === o &&
                          (n(1, (s = r.cardsHiddened[0])),
                          $e.deleteOpenedCard(),
                          $e.pushToHistoryDistribution(s)),
                      n(0, (o = !o)))
                    : (!0 === c && (console.log(r.cardsOpened), xt("/")),
                      n(
                          1,
                          (s =
                              "Раздача окончена. Нажмите ещё раз для выхода в меню.")
                      ),
                      n(0, (o = !0)),
                      (c = !0));
            },
        ];
    }
    const We = [
        {
            name: "/",
            component: class extends Y {
                constructor(t) {
                    super(), X(this, t, Ft, St, s, {});
                }
            },
        },
        {
            name: "home",
            component: class extends Y {
                constructor(t) {
                    super(), X(this, t, Ut, Kt, s, {});
                }
            },
        },
        {
            name: "404",
            path: "404",
            component: class extends Y {
                constructor(t) {
                    super(), X(this, t, null, Jt, s, {});
                }
            },
        },
        {
            name: "auto-distribution",
            component: class extends Y {
                constructor(t) {
                    super(), X(this, t, Ne, Re, s, {});
                }
            },
        },
        {
            name: "manual-distribution",
            component: class extends Y {
                constructor(t) {
                    super(), X(this, t, Se, Be, s, {});
                }
            },
        },
        {
            name: "show-distribution",
            component: class extends Y {
                constructor(t) {
                    super(), X(this, t, Ie, De, s, {});
                }
            },
        },
        { name: "preview-distribution", component: Ce },
    ];
    function Ke(e) {
        let n, r;
        return (
            (n = new Nt({ props: { routes: We } })),
            {
                c() {
                    V(n.$$.fragment);
                },
                m(t, e) {
                    G(n, t, e), (r = !0);
                },
                p: t,
                i(t) {
                    r || (K(n.$$.fragment, t), (r = !0));
                },
                o(t) {
                    U(n.$$.fragment, t), (r = !1);
                },
                d(t) {
                    J(n, t);
                },
            }
        );
    }
    return new (class extends Y {
        constructor(t) {
            super(), X(this, t, null, Ke, s, {});
        }
    })({ target: document.body });
})();
//# sourceMappingURL=bundle.js.map
