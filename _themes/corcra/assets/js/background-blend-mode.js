function BackgroundBlendModePolyfill(a) { if (this.options = { selector: "*", usePolyfillIf: function () { if ("Microsoft Internet Explorer" == navigator.appName) return !0; var a = window.getComputedStyle(document.body, null)["background-blend-mode"]; return void 0 === a } }, a) { var b = this; $.each(a, function (a, c) { b.options[a] = c }) } this.options.usePolyfillIf() && this.walk_css_tree() } !function (a, b) { "function" == typeof define && define.amd ? define(["exports"], b) : b("undefined" != typeof exports ? exports : a) }(this, function (a) { function b(a) { function x() { switch (k.tokenType) { case "(": case "[": case "{": return y(); case "FUNCTION": return z(); default: return k } } function y() { for (var a = { "(": ")", "[": "]", "{": "}" }[k.tokenType], b = new h(k.tokenType); ;)switch (o(), k.tokenType) { case "EOF": case a: return b; default: b.append(x()) } } function z() { for (var a = new i(k.value), b = new j; ;)switch (o(), k.tokenType) { case "EOF": case ")": return a.append(b), a; case "DELIM": "," == k.value ? (a.append(b), b = new j) : b.append(k); break; default: b.append(x()) } } for (var k, b = "top-level", c = -1, l = new d, m = [l], n = m[0], o = function (b) { return void 0 === b && (b = 1), c += b, k = c < a.length ? a[c] : new EOFToken, !0 }, p = function () { return c-- , !0 }, q = function () { return a[c + 1] }, r = function (a) { return void 0 === a ? "" !== n.fillType ? b = n.fillType : "STYLESHEET" == n.type ? b = "top-level" : (console.log("Unknown rule-type while switching to current rule's content mode: ", n), b = "") : b = a, !0 }, s = function (a) { return n = a, m.push(n), !0 }, t = function (a) { return console.log("Parse error at token " + c + ": " + k + ".\n" + a), !0 }, u = function () { var a = m.pop(); return n = m[m.length - 1], n.append(a), !0 }, v = function () { return m.pop(), n = m[m.length - 1], !0 }, w = function () { for (; m.length > 1;)u() }; ;)switch (o(), b) { case "top-level": switch (k.tokenType) { case "CDO": case "CDC": case "WHITESPACE": break; case "AT-KEYWORD": s(new e(k.value)) && r("at-rule"); break; case "{": t("Attempt to open a curly-block at top-level.") && x(); break; case "EOF": return w(), l; default: s(new f) && r("selector") && p() }break; case "at-rule": switch (k.tokenType) { case ";": u() && r(); break; case "{": "" !== n.fillType ? r(n.fillType) : t("Attempt to open a curly-block in a statement-type at-rule.") && v() && r("next-block") && p(); break; case "EOF": return w(), l; default: n.appendPrelude(x()) }break; case "rule": switch (k.tokenType) { case "WHITESPACE": break; case "}": u() && r(); break; case "AT-KEYWORD": s(new e(k.value)) && r("at-rule"); break; case "EOF": return w(), l; default: s(new f) && r("selector") && p() }break; case "selector": switch (k.tokenType) { case "{": r("declaration"); break; case "EOF": return v() && w(), l; default: n.appendSelector(x()) }break; case "declaration": switch (k.tokenType) { case "WHITESPACE": case ";": break; case "}": u() && r(); break; case "AT-RULE": s(new e(k.value)) && r("at-rule"); break; case "IDENT": s(new g(k.value)) && r("after-declaration-name"); break; case "EOF": return w(), l; default: t() && v() && r("next-declaration") }break; case "after-declaration-name": switch (k.tokenType) { case "WHITESPACE": break; case ":": r("declaration-value"); break; case ";": t("Incomplete declaration - semicolon after property name.") && v() && r(); break; case "EOF": return v() && w(), l; default: t("Invalid declaration - additional token after property name") && v() && r("next-declaration") }break; case "declaration-value": switch (k.tokenType) { case "DELIM": "!" == k.value && "IDENTIFIER" == q().tokenType && "important" == q().value.toLowerCase() ? (o(), n.important = !0, r("declaration-end")) : n.append(k); break; case ";": u() && r(); break; case "}": u() && u() && r(); break; case "EOF": return w(), l; default: n.append(x()) }break; case "declaration-end": switch (k.tokenType) { case "WHITESPACE": break; case ";": u() && r(); break; case "}": u() && u() && r(); break; case "EOF": return w(), l; default: t("Invalid declaration - additional token after !important.") && v() && r("next-declaration") }break; case "next-block": switch (k.tokenType) { case "{": x() && r(); break; case "EOF": return w(), l; default: x() }break; case "next-declaration": switch (k.tokenType) { case ";": r("declaration"); break; case "}": r("declaration") && p(); break; case "EOF": return w(), l; default: x() }break; default: return void console.log("Unknown parsing mode: " + b) } } function c() { return this } function d() { return this.value = [], this } function e(a) { return this.name = a, this.prelude = [], this.value = [], a in e.registry && (this.fillType = e.registry[a]), this } function f() { return this.selector = [], this.value = [], this } function g(a) { return this.name = a, this.value = [], this } function h(a) { return this.name = a, this.value = [], this } function i(a) { return this.name = a, this.value = [], this } function j() { return this.value = [], this } c.prototype.fillType = "", c.prototype.toString = function (a) { return JSON.stringify(this.toJSON(), null, a) }, c.prototype.append = function (a) { return this.value.push(a), this }, d.prototype = new c, d.prototype.type = "STYLESHEET", d.prototype.toJSON = function () { return { type: "stylesheet", value: this.value.map(function (a) { return a.toJSON() }) } }, e.prototype = new c, e.prototype.type = "AT-RULE", e.prototype.appendPrelude = function (a) { return this.prelude.push(a), this }, e.prototype.toJSON = function () { return { type: "at", name: this.name, prelude: this.prelude.map(function (a) { return a.toJSON() }), value: this.value.map(function (a) { return a.toJSON() }) } }, e.registry = { import: "", media: "rule", "font-face": "declaration", page: "declaration", keyframes: "rule", namespace: "", "counter-style": "declaration", supports: "rule", document: "rule", "font-feature-values": "declaration", viewport: "", "region-style": "rule" }, f.prototype = new c, f.prototype.type = "STYLE-RULE", f.prototype.fillType = "declaration", f.prototype.appendSelector = function (a) { return this.selector.push(a), this }, f.prototype.toJSON = function () { return { type: "selector", selector: this.selector.map(function (a) { return a.toJSON() }), value: this.value.map(function (a) { return a.toJSON() }) } }, g.prototype = new c, g.prototype.type = "DECLARATION", g.prototype.toJSON = function () { return { type: "declaration", name: this.name, value: this.value.map(function (a) { return a.toJSON() }) } }, h.prototype = new c, h.prototype.type = "BLOCK", h.prototype.toJSON = function () { return { type: "block", name: this.name, value: this.value.map(function (a) { return a.toJSON() }) } }, i.prototype = new c, i.prototype.type = "FUNCTION", i.prototype.toJSON = function () { return { type: "func", name: this.name, value: this.value.map(function (a) { return a.toJSON() }) } }, j.prototype = new c, j.prototype.type = "FUNCTION-ARG", j.prototype.toJSON = function () { return this.value.map(function (a) { return a.toJSON() }) }, a.parse = b }), function (a, b) { "function" == typeof define && define.amd ? define(["exports"], b) : b("undefined" != typeof exports ? exports : a) }(this, function (a) { function c(a) { return b(a, 48, 57) } function d(a) { return c(a) || b(a, 65, 70) || b(a, 97, 102) } function e(a) { return b(a, 65, 90) } function f(a) { return b(a, 97, 122) } function g(a) { return e(a) || f(a) } function h(a) { return a >= 160 } function i(a) { return g(a) || h(a) || 95 == a } function j(a) { return i(a) || c(a) || 45 == a } function k(a) { return b(a, 0, 8) || b(a, 14, 31) || b(a, 127, 159) } function l(a) { return 10 == a || 12 == a } function m(a) { return l(a) || 9 == a || 32 == a } function n(a) { return l(a) || isNaN(a) } function p(a, b) { void 0 == b && (b = { transformFunctionWhitespace: !1, scientificNotation: !1 }); for (var h, p, e = -1, f = [], g = "data", q = 0, r = 0, H = 0, S = function () { q += 1, H = r, r = 0 }, T = { line: q, column: r }, U = function (b) { return void 0 === b && (b = 1), a.charCodeAt(e + b) }, V = function (b) { return void 0 === b && (b = 1), e += b, h = a.charCodeAt(e), l(h) ? S() : r += b, !0 }, W = function () { return e -= 1, l(h) ? (q -= 1, r = H) : r -= 1, T.line = q, T.column = r, !0 }, X = function () { return e >= a.length }, Y = function () { }, Z = function (a) { return a ? a.finish() : a = p.finish(), b.loc === !0 && (a.loc = {}, a.loc.start = { line: T.line, column: T.column }, T = { line: q, column: r }, a.loc.end = T), f.push(a), p = void 0, !0 }, $ = function (a) { return p = a, !0 }, _ = function () { return console.log("Parse error at index " + e + ", processing codepoint 0x" + h.toString(16) + " in state " + g + "."), !0 }, aa = function (a) { return console.log("MAJOR SPEC ERROR: " + a), !0 }, ba = function (a) { return g = a, !0 }, ca = function () { if (V(), d(h)) { for (var a = [], b = 0; b < 6 && d(h); b++)a.push(h), V(); var c = parseInt(a.map(String.fromCharCode).join(""), 16); return c > o && (c = 65533), m(h) || W(), c } return h }; ;) { if (e > 2 * a.length) return "I'm infinite-looping!"; switch (V(), g) { case "data": if (m(h)) for (Z(new u); m(U());)V(); else if (34 == h) ba("double-quote-string"); else if (35 == h) ba("hash"); else if (39 == h) ba("single-quote-string"); else if (40 == h) Z(new D); else if (41 == h) Z(new E); else if (43 == h) c(U()) || 46 == U() && c(U(2)) ? ba("number") && W() : Z(new G(h)); else if (45 == h) 45 == U(1) && 62 == U(2) ? V(2) && Z(new w) : c(U()) || 46 == U(1) && c(U(2)) ? ba("number") && W() : ba("ident") && W(); else if (46 == h) c(U()) ? ba("number") && W() : Z(new G(h)); else if (47 == h) 42 == U() ? V() && ba("comment") : Z(new G(h)); else if (58 == h) Z(new x); else if (59 == h) Z(new y); else if (60 == h) 33 == U(1) && 45 == U(2) && 45 == U(3) ? V(3) && Z(new v) : Z(new G(h)); else if (64 == h) ba("at-keyword"); else if (91 == h) Z(new B); else if (92 == h) n(U()) ? _() && Z(new G(h)) : ba("ident") && W(); else if (93 == h) Z(new C); else if (123 == h) Z(new z); else if (125 == h) Z(new A); else if (c(h)) ba("number") && W(); else if (85 == h || 117 == h) 43 == U(1) && d(U(2)) ? V() && ba("unicode-range") : ba("ident") && W(); else if (i(h)) ba("ident") && W(); else { if (X()) return Z(new F), f; Z(new G(h)) } break; case "double-quote-string": void 0 == p && $(new M), 34 == h ? Z() && ba("data") : X() ? _() && Z() && ba("data") && W() : l(h) ? _() && Z(new s) && ba("data") && W() : 92 == h ? n(U()) ? _() && Z(new s) && ba("data") : l(U()) ? V() : p.append(ca()) : p.append(h); break; case "single-quote-string": void 0 == p && $(new M), 39 == h ? Z() && ba("data") : X() ? _() && Z() && ba("data") : l(h) ? _() && Z(new s) && ba("data") && W() : 92 == h ? n(U()) ? _() && Z(new s) && ba("data") : l(U()) ? V() : p.append(ca()) : p.append(h); break; case "hash": j(h) ? $(new L(h)) && ba("hash-rest") : 92 == h ? n(U()) ? _() && Z(new G(35)) && ba("data") && W() : $(new L(ca())) && ba("hash-rest") : Z(new G(35)) && ba("data") && W(); break; case "hash-rest": j(h) ? p.append(h) : 92 == h ? n(U()) ? _() && Z() && ba("data") && W() : p.append(ca()) : Z() && ba("data") && W(); break; case "comment": 42 == h ? 47 == U() ? V() && ba("data") : Y() : X() ? _() && ba("data") && W() : Y(); break; case "at-keyword": 45 == h ? i(U()) ? $(new K(45)) && ba("at-keyword-rest") : 92 != U(1) || n(U(2)) ? _() && Z(new G(64)) && ba("data") && W() : $(new AtKeywordtoken(45)) && ba("at-keyword-rest") : i(h) ? $(new K(h)) && ba("at-keyword-rest") : 92 == h ? n(U()) ? _() && Z(new G(35)) && ba("data") && W() : $(new K(ca())) && ba("at-keyword-rest") : Z(new G(64)) && ba("data") && W(); break; case "at-keyword-rest": j(h) ? p.append(h) : 92 == h ? n(U()) ? _() && Z() && ba("data") && W() : p.append(ca()) : Z() && ba("data") && W(); break; case "ident": 45 == h ? i(U()) ? $(new I(h)) && ba("ident-rest") : 92 != U(1) || n(U(2)) ? Z(new G(45)) && ba("data") : $(new I(h)) && ba("ident-rest") : i(h) ? $(new I(h)) && ba("ident-rest") : 92 == h ? n(U()) ? _() && ba("data") && W() : $(new I(ca())) && ba("ident-rest") : aa("Hit the generic 'else' clause in ident state.") && ba("data") && W(); break; case "ident-rest": j(h) ? p.append(h) : 92 == h ? n(U()) ? _() && Z() && ba("data") && W() : p.append(ca()) : 40 == h ? p.ASCIImatch("url") ? ba("url") : Z(new J(p)) && ba("data") : m(h) && b.transformFunctionWhitespace ? ba("transform-function-whitespace") && W() : Z() && ba("data") && W(); break; case "transform-function-whitespace": m(U()) ? Y() : 40 == h ? Z(new J(p)) && ba("data") : Z() && ba("data") && W(); break; case "number": $(new O), 45 == h ? c(U()) ? V() && p.append([45, h]) && ba("number-rest") : 46 == U(1) && c(U(2)) ? V(2) && p.append([45, 46, h]) && ba("number-fraction") : ba("data") && W() : 43 == h ? c(U()) ? V() && p.append([43, h]) && ba("number-rest") : 46 == U(1) && c(U(2)) ? V(2) && p.append([43, 46, h]) && ba("number-fraction") : ba("data") && W() : c(h) ? p.append(h) && ba("number-rest") : 46 == h && c(U()) ? V() && p.append([46, h]) && ba("number-fraction") : ba("data") && W(); break; case "number-rest": c(h) ? p.append(h) : 46 == h ? c(U()) ? V() && p.append([46, h]) && ba("number-fraction") : Z() && ba("data") && W() : 37 == h ? Z(new P(p)) && ba("data") : 69 == h || 101 == h ? c(U()) ? V() && p.append([37, h]) && ba("sci-notation") : 43 != U(1) && 45 != U(1) || !c(U(2)) ? $(new Q(p, h)) && ba("dimension") : p.append([37, U(1), U(2)]) && V(2) && ba("sci-notation") : 45 == h ? i(U()) ? V() && $(new Q(p, [45, h])) && ba("dimension") : 92 == U(1) && n(U(2)) ? _() && Z() && ba("data") && W() : 92 == U(1) ? V() && $(new Q(p, [45, ca()])) && ba("dimension") : Z() && ba("data") && W() : i(h) ? $(new Q(p, h)) && ba("dimension") : 92 == h ? n(U) ? _() && Z() && ba("data") && W() : $(new Q(p, ca)) && ba("dimension") : Z() && ba("data") && W(); break; case "number-fraction": p.type = "number", c(h) ? p.append(h) : 37 == h ? Z(new P(p)) && ba("data") : 69 == h || 101 == h ? c(U()) ? V() && p.append([101, h]) && ba("sci-notation") : 43 != U(1) && 45 != U(1) || !c(U(2)) ? $(new Q(p, h)) && ba("dimension") : p.append([101, U(1), U(2)]) && V(2) && ba("sci-notation") : 45 == h ? i(U()) ? V() && $(new Q(p, [45, h])) && ba("dimension") : 92 == U(1) && n(U(2)) ? _() && Z() && ba("data") && W() : 92 == U(1) ? V() && $(new Q(p, [45, ca()])) && ba("dimension") : Z() && ba("data") && W() : i(h) ? $(new Q(p, h)) && ba("dimension") : 92 == h ? n(U) ? _() && Z() && ba("data") && W() : $(new Q(p, ca())) && ba("dimension") : Z() && ba("data") && W(); break; case "dimension": j(h) ? p.append(h) : 92 == h ? n(U()) ? _() && Z() && ba("data") && W() : p.append(ca()) : Z() && ba("data") && W(); break; case "sci-notation": p.type = "number", c(h) ? p.append(h) : Z() && ba("data") && W(); break; case "url": X() ? _() && Z(new t) && ba("data") : 34 == h ? ba("url-double-quote") : 39 == h ? ba("url-single-quote") : 41 == h ? Z(new N) && ba("data") : m(h) ? Y() : ba("url-unquoted") && W(); break; case "url-double-quote": p instanceof N || $(new N), X() ? _() && Z(new t) && ba("data") : 34 == h ? ba("url-end") : l(h) ? _() && ba("bad-url") : 92 == h ? l(U()) ? V() : n(U()) ? _() && Z(new t) && ba("data") && W() : p.append(ca()) : p.append(h); break; case "url-single-quote": p instanceof N || $(new N), X() ? _() && Z(new t) && ba("data") : 39 == h ? ba("url-end") : l(h) ? _() && ba("bad-url") : 92 == h ? l(U()) ? V() : n(U()) ? _() && Z(new t) && ba("data") && W() : p.append(ca()) : p.append(h); break; case "url-end": X() ? _() && Z(new t) && ba("data") : m(h) ? Y() : 41 == h ? Z() && ba("data") : _() && ba("bad-url") && W(); break; case "url-unquoted": p instanceof N || $(new N), X() ? _() && Z(new t) && ba("data") : m(h) ? ba("url-end") : 41 == h ? Z() && ba("data") : 34 == h || 39 == h || 40 == h || k(h) ? _() && ba("bad-url") : 92 == h ? n(U()) ? _() && ba("bad-url") : p.append(ca()) : p.append(h); break; case "bad-url": X() ? _() && Z(new t) && ba("data") : 41 == h ? Z(new t) && ba("data") : 92 == h ? n(U()) ? Y() : ca() : Y(); break; case "unicode-range": for (var da = [h], ea = [h], fa = 1; fa < 6 && d(U()); fa++)V(), da.push(h), ea.push(h); if (63 == U()) { for (; fa < 6 && 63 == U(); fa++)V(), da.push("0".charCodeAt(0)), ea.push("f".charCodeAt(0)); Z(new R(da, ea)) && ba("data") } else if (45 == U(1) && d(U(2))) { V(), V(), ea = [h]; for (var fa = 1; fa < 6 && d(U()); fa++)V(), ea.push(h); Z(new R(da, ea)) && ba("data") } else Z(new R(da)) && ba("data"); break; default: aa("Unknown state '" + g + "'") } } } function q(a) { return String.fromCharCode.apply(null, a.filter(function (a) { return a })) } function r(a) { return this } function s() { return this } function t() { return this } function u() { return this } function v() { return this } function w() { return this } function x() { return this } function y() { return this } function z() { return this } function A() { return this } function B() { return this } function C() { return this } function D() { return this } function E() { return this } function F() { return this } function G(a) { return this.value = String.fromCharCode(a), this } function H() { return this } function I(a) { this.value = [], this.append(a) } function J(a) { this.value = a.finish().value } function K(a) { this.value = [], this.append(a) } function L(a) { this.value = [], this.append(a) } function M(a) { this.value = [], this.append(a) } function N(a) { this.value = [], this.append(a) } function O(a) { this.value = [], this.append(a), this.type = "integer" } function P(a) { a.finish(), this.value = a.value, this.repr = a.repr } function Q(a, b) { a.finish(), this.num = a.value, this.unit = [], this.repr = a.repr, this.append(b) } function R(a, b) { return a = parseInt(q(a), 16), b = void 0 === b ? a + 1 : parseInt(q(b), 16), a > o && (b = a), b < a && (b = a), b > o && (b = o), this.start = a, this.end = b, this } var b = function (a, b, c) { return a >= b && a <= c }, o = 1114111; r.prototype.finish = function () { return this }, r.prototype.toString = function () { return this.tokenType }, r.prototype.toJSON = function () { return this.toString() }, s.prototype = new r, s.prototype.tokenType = "BADSTRING", t.prototype = new r, t.prototype.tokenType = "BADURL", u.prototype = new r, u.prototype.tokenType = "WHITESPACE", u.prototype.toString = function () { return "WS" }, v.prototype = new r, v.prototype.tokenType = "CDO", w.prototype = new r, w.prototype.tokenType = "CDC", x.prototype = new r, x.prototype.tokenType = ":", y.prototype = new r, y.prototype.tokenType = ";", z.prototype = new r, z.prototype.tokenType = "{", A.prototype = new r, A.prototype.tokenType = "}", B.prototype = new r, B.prototype.tokenType = "[", C.prototype = new r, C.prototype.tokenType = "]", D.prototype = new r, D.prototype.tokenType = "(", E.prototype = new r, E.prototype.tokenType = ")", F.prototype = new r, F.prototype.tokenType = "EOF", G.prototype = new r, G.prototype.tokenType = "DELIM", G.prototype.toString = function () { return "DELIM(" + this.value + ")" }, H.prototype = new r, H.prototype.append = function (a) { if (a instanceof Array) for (var b = 0; b < a.length; b++)this.value.push(a[b]); else this.value.push(a); return !0 }, H.prototype.finish = function () { return this.value = this.valueAsString(), this }, H.prototype.ASCIImatch = function (a) { return this.valueAsString().toLowerCase() == a.toLowerCase() }, H.prototype.valueAsString = function () { return "string" == typeof this.value ? this.value : q(this.value) }, H.prototype.valueAsCodes = function () { if ("string" == typeof this.value) { for (var a = [], b = 0; b < this.value.length; b++)a.push(this.value.charCodeAt(b)); return a } return this.value.filter(function (a) { return a }) }, I.prototype = new H, I.prototype.tokenType = "IDENT", I.prototype.toString = function () { return "IDENT(" + this.value + ")" }, J.prototype = new H, J.prototype.tokenType = "FUNCTION", J.prototype.toString = function () { return "FUNCTION(" + this.value + ")" }, K.prototype = new H, K.prototype.tokenType = "AT-KEYWORD", K.prototype.toString = function () { return "AT(" + this.value + ")" }, L.prototype = new H, L.prototype.tokenType = "HASH", L.prototype.toString = function () { return "HASH(" + this.value + ")" }, M.prototype = new H, M.prototype.tokenType = "STRING", M.prototype.toString = function () { return '"' + this.value + '"' }, N.prototype = new H, N.prototype.tokenType = "URL", N.prototype.toString = function () { return "URL(" + this.value + ")" }, O.prototype = new H, O.prototype.tokenType = "NUMBER", O.prototype.toString = function () { return "integer" == this.type ? "INT(" + this.value + ")" : "NUMBER(" + this.value + ")" }, O.prototype.finish = function () { return this.repr = this.valueAsString(), this.value = 1 * this.repr, Math.abs(this.value) % 1 != 0 && (this.type = "number"), this }, P.prototype = new r, P.prototype.tokenType = "PERCENTAGE", P.prototype.toString = function () { return "PERCENTAGE(" + this.value + ")" }, Q.prototype = new r, Q.prototype.tokenType = "DIMENSION", Q.prototype.toString = function () { return "DIM(" + this.num + "," + this.unit + ")" }, Q.prototype.append = function (a) { if (a instanceof Array) for (var b = 0; b < a.length; b++)this.unit.push(a[b]); else this.unit.push(a); return !0 }, Q.prototype.finish = function () { return this.unit = q(this.unit), this.repr += this.unit, this }, R.prototype = new r, R.prototype.tokenType = "UNICODE-RANGE", R.prototype.toString = function () { return this.start + 1 == this.end ? "UNICODE-RANGE(" + this.start.toString(16).toUpperCase() + ")" : this.start < this.end ? "UNICODE-RANGE(" + this.start.toString(16).toUpperCase() + "-" + this.end.toString(16).toUpperCase() + ")" : "UNICODE-RANGE()" }, R.prototype.contains = function (a) { return a >= this.start && a < this.end }, a.tokenize = p }), BackgroundBlendModePolyfill.initialize = function (a) { return null == BackgroundBlendModePolyfill.singleton && (BackgroundBlendModePolyfill.singleton = new BackgroundBlendModePolyfill(a)), BackgroundBlendModePolyfill.singleton }, BackgroundBlendModePolyfill.prototype.walk_css_tree = function () { $(this.options.selector).each(function (a) { function j(a, b) { return a[b % a.length] } function k(a) { return a = a.replace(/([^a-zA-Z0-9_\- ])|^[_0-9]+/g, "").trim().toLowerCase(), a = a.replace(/([ -]+)([a-zA-Z0-9])/g, function (a, b, c) { return c.toUpperCase() }), a = a.replace(/([0-9]+)([a-zA-Z])/g, function (a, b, c) { return b + c.toUpperCase() }) } var b = window.getComputedStyle(this, null), c = b["background-blend-mode"]; if (c || (c = this.attributes.backgroundblend, c && (c = c.value)), c && "normal" != c) { var e = (b.backgroundImage, function (a) { for (var c = "bar{", d = 0; d < a.length; d++)c += b[a[d]] ? a[d] + ":" + b[a[d]] + ";\n" : a[d] + ":" + b[k(a[d])] + ";\n"; return c += "}" }), f = function (a) { for (var b = 0; b < a.value.length; b++)if ("NUMBER" == a.value[b].tokenType) return a.value[b].value; return 0 }, g = function (a) { for (var b = [], c = 0; c < a.value.length; c++)"DELIM" != a.value[c].tokenType && "WHITESPACE" != a.value[c].tokenType && ("URL" == a.value[c].tokenType ? b.push(a.value[c].value) : "FUNCTION" == a.value[c].type && b.push(a.value[c])); return b }, h = function (a) { var b = ""; if ("FUNCTION" == Object.getPrototypeOf(a).type) { b += a.name + "("; for (var c = 0; c < a.value.length; c++)c && (b += ", "), b += f(a.value[c]); b += ")" } return b }, i = function (a) { if ("IDENT" == Object.getPrototypeOf(a).tokenType) return a.value; for (var b = a.name + "(", c = 0; c < a.value.length; c++) { c && (b += ", "); for (var d, e = 0; e < a.value[c].value.length; e++)"WHITESPACE" != a.value[c].value[e].tokenType && (d = a.value[c].value[e].value); b += d } return b += ")" }, l = e(["background-image", "background-blend-mode", "background-color", "background-size", "background-repeat", "background-position"]), m = tokenize(l), n = parse(m).value[0].value, o = $(this).width(), p = $(this).height(); void 0 === l["background-blend-mode"] && (l["background-blend-mode"] = c.replace(",", " ").split(" ").filter(Boolean)); for (var q = function () { var a = {}; a.images = g(n[0]); var b = a.images.length, d = 0, e = n[3].value; a.sizes = []; for (var f = 0; f < b; f++ , d++) { var h = e[d]; if (h) { for (; "DELIM" == h.tokenType || "WHITESPACE" == h.tokenType;)h = e[++d]; var i = h.value, j = !1; if ("DIMENSION" == h.tokenType ? i = h.num : "PERCENTAGE" == h.tokenType ? i = o * h.value / 100 : "cover" != h.value && "contain" != h.value || (i = o, j = !0), h = e[++d], void 0 == h) k = j ? p : i; else { for (; "DELIM" == h.tokenType || "WHITESPACE" == h.tokenType;)h = e[++d]; var k = h.value; "DIMENSION" == h.tokenType ? k = h.num : "PERCENTAGE" == h.tokenType && (k = p * h.value / 100) } var l, m } "auto" == i && "auto" == k ? v[f] ? (l = v[f].width, m = v[f].height) : (l = o, m = p) : "auto" == i ? (m = k, l = v[f] ? v[f].width / v[f].height * m : o) : "auto" == k ? (l = i, m = v[f] ? v[f].height / v[f].width * l : p) : (l = i, m = k), a.sizes[f] = { width: l, height: m } } a.repeat = []; var q = n[4].value; d = 0; for (var f = 0; f < b; f++ , d++) { for (var h = q[d]; "DELIM" == h.tokenType || "WHITESPACE" == h.tokenType;)h = q[++d]; a.repeat[f] = h.value } a.position = []; var r = n[5].value; d = 0; for (var f = 0; f < b; f++ , d++) { for (var h = r[d], s = !0; "DELIM" == h.tokenType || "WHITESPACE" == h.tokenType;)h = r[++d]; var t = h.value; if ("IDENT" == h.tokenType) { for ("repeat" == a.repeat[f] || "repeat-x" == a.repeat[f] ? t = 0 : "left" == h.value ? t = 0 : "right" == h.value ? (t = o - a.sizes[f].width, s = !1) : "center" == h.value && (t = o / 2), h = r[++d]; "WHITESPACE" == h.tokenType;)h = r[++d]; "DIMENSION" == h.tokenType && (t += s ? h.num : -h.num), s = !0 } else "DIMENSION" == h.tokenType ? t = h.num : "PERCENTAGE" == h.tokenType && (t = (o - a.sizes[f].width) * h.value / 100); for (h = r[++d]; "DELIM" == h.tokenType || "WHITESPACE" == h.tokenType;)h = r[++d]; var u = h.value; if ("IDENT" == h.tokenType) { for ("repeat" == a.repeat[f] || "repeat-y" == a.repeat[f] ? u = 0 : "top" == h.value ? u = 0 : "bottom" == h.value ? (u = p - a.sizes[f].height, s = !1) : "center" == h.value && (u = p / 2), h = r[++d]; "WHITESPACE" == h.tokenType;)h = r[++d]; "DIMENSION" == h.tokenType && (u += s ? h.num : -h.num) } else "DIMENSION" == h.tokenType ? u = h.num : "PERCENTAGE" == h.tokenType && (u = (p - a.sizes[f].height) * h.value / 100); a.position[f] = { x: t, y: u } } a.blendmodes = []; var w = n[1].value; d = 0; for (var f = 0; f < w.length; f++) { var h = w[f]; "IDENT" == h.tokenType && a.blendmodes.push(h.value) } return a.blendmodes.length > 0 && "undefined" == a.blendmodes[0] && (a.blendmodes = c.replace(",", " ").split(" ").filter(Boolean)), a }, r = function (a) { return a * Math.PI / 180 }, s = function (a) { return a / Math.PI * 180 }, t = function (a) { switch (a.unit) { case "px": return a.num; case "em": return a.num * parseFloat(b["font-size"]); case "cm": return a.num / 2.54 * 96; case "mm": return a.num / 2.54 * 96 / 10; case "in": return a.num / 96; case "pt": return a.num / 72 * 96; case "ct": return a.num / 6 * 96 }return 0 }, u = g(n[0]), v = [], w = 0, x = function (a, b, c) { var d; "linear-gradient" != a.name && "radial-gradient" != a.name || (d = document.createElement("canvas"), d.width = b, d.height = c); var f = [], g = [], h = [], j = 180, k = NaN, l = NaN, m = NaN, n = NaN, o = !0, p = !1; if ("linear-gradient" == a.name) for (var q = 0; q < a.value.length; q++) { for (var v, u = a.value[q], w = NaN, x = !1, y = 0; y < u.value.length; y++)"WHITESPACE" != u.value[y].tokenType && ("DIMENSION" == u.value[y].tokenType ? (x = !0, j = u.value[y].num) : "PERCENTAGE" == u.value[y].tokenType ? w = u.value[y].value / 100 : v = u.value[y]); x || (h.push(p), f.push(w), g.push(i(v))) } else if ("radial-gradient" == a.name) { for (var q = 0; q < a.value.length; q++) { for (var v, u = a.value[q], p = !1, w = NaN, x = !1, z = !1, y = 0; y < u.value.length; y++)"WHITESPACE" != u.value[y].tokenType && ("IDENT" != u.value[y].tokenType || "at" != u.value[y].value && "circle" != u.value[y].value && "ellipse" != u.value[y].value ? "DIMENSION" == u.value[y].tokenType ? z ? isNaN(k) ? (k = t(u.value[y]), l = t(u.value[y]), o = !1, z = !0) : isNaN(m) ? m = t(u.value[y]) : n = t(u.value[y]) : (w = t(u.value[y]), p = !0) : "PERCENTAGE" == u.value[y].tokenType ? z ? isNaN(m) ? m = u.value[y].value / 100 * b : n = u.value[y].value / 100 * c : w = u.value[y].value / 100 : z ? isNaN(m) ? m = u.value[y].value : n = u.value[y].value : v = u.value[y] : (k = 1 / 0, l = 1 / 0, z = !0, "circle" == u.value[y].value && (o = !1))); v && (h.push(p), f.push(w), g.push(i(v))), isNaN(m) && (m = b / 2), isNaN(n) && (n = c / 2) } if (isNaN(k) || !isFinite(k)) var k = m > b / 2 ? m : b - m, l = n > c / 2 ? n : c - n } var A, B; if ("linear-gradient" == a.name) { for (var C = Math.sqrt(b * b / 4 + c * c / 4), D = s(Math.asin(b / 2 / C)); j < 0;)j += 360; j %= 360; var E, F = j % 180; F > 90 && (F = 180 - F), E = F <= D ? C * Math.cos(r(D - F)) : C * Math.cos(r(F - D)), B = 2 * E; var G = Math.sin(r(j)) * E, H = Math.cos(r(j)) * E, I = d.getContext("2d"); A = I.createLinearGradient(b / 2 - G, c / 2 + H, b / 2 + G, c / 2 - H) } else if ("radial-gradient" == a.name) { var I = d.getContext("2d"), J = k / l; A = o ? I.createRadialGradient(m / J, n, 0, m / J, n, Math.sqrt(2) * l) : I.createRadialGradient(m, n, 0, m, n, Math.sqrt(k * k + l * l)), B = Math.sqrt(k * k + l * l) } for (var q = 0; q < f.length; q++)h[q] && (f[q] /= B); isNaN(f[0]) && (f[0] = 0), isNaN(f[f.length - 1]) && (f[f.length - 1] = 1); for (var K = 0, q = 0; q < f.length; q++)f[q] < K && (f[q] = K), f[q] > 1 && (f[q] = 1), isNaN(f[q]) || (K = f[q]); for (var q = 0; q < f.length; q++)if (isNaN(f[q])) { for (var L = f[q - 1], y = q + 1; isNaN(f[y]);)y++; f[q] = L + (f[y] - L) / (y - q + 1), f[q] > 1 && (f[q] = 1) } for (var q = 0; q < f.length; q++)A.addColorStop(f[q], g[q]); return I.save(), o && I.scale(J, 1), I.fillStyle = A, I.fillRect(0, 0, b + c, b + c), I.restore(), d }, y = this, z = function () { if (w++ , !(w < u.length)) { var a = q(), b = document.createElement("canvas"); b.width = o, b.height = p; var d, c = b.getContext("2d"); c.fillStyle = h(n[2].value[0]), c.fillRect(0, 0, o, p); for (var e = u.length - 1; e >= 0; e--) { c.save(); var f = j(a.blendmodes, e); "normal" == f && (f = "source-over"), "normal" != f && (c.globalCompositeOperation = f); var g = Object.prototype.toString.call(window.HTMLElement).indexOf("Constructor") > 0, i = !1; if (g && (i = "hue" == f || "saturation" == f || "color" == f || "luminosity" == f), f != c.globalCompositeOperation || i) { d = c; var k = document.createElement("canvas"); k.width = o, k.height = p, c = k.getContext("2d") } var m, r, l = v[e]; if (l ? (m = v[e].width, r = v[e].height) : (l = x(u[e], j(a.sizes, e).width, j(a.sizes, e).height), m = j(a.sizes, e).width, r = j(a.sizes, e).height), "no-repeat" == j(a.repeat, e)) c.drawImage(l, 0, 0, m, r, j(a.position, e).x, j(a.position, e).y, j(a.sizes, e).width, j(a.sizes, e).height); else { var s = j(a.repeat, e), t = c.createPattern(l, j(a.repeat, e)); c.save(); var z = j(a.sizes, e).width / m, A = j(a.sizes, e).height / r; c.translate(j(a.position, e).x, j(a.position, e).y), c.scale(z, A), c.fillStyle = t; var B = 0, C = 0; "repeat" != s && "repeat-x" != s || (B -= o / z), "repeat" != s && "repeat-y" != s || (C -= p / A), c.fillRect(B, C, o / z * 2 - j(a.position, e).x, p / A * 2 - j(a.position, e).y), c.restore() } if (f != c.globalCompositeOperation || i) { var D = function (a, b) { return b }, E = function (a) { return 77 * a.r + 150 * a.g + 28 * a.b >> 8 }, F = function (a) { var b = E(a), c = Math.min(a.r, Math.min(a.g, a.b)), d = Math.max(a.r, Math.max(a.g, a.b)); return c < 0 && (a.r = b + (a.r - b) * b / (b - c), a.g = b + (a.g - b) * b / (b - c), a.b = b + (a.b - b) * b / (b - c)), d > 255 && (a.r = b + (a.r - b) * (255 - b) / (d - b), a.g = b + (a.g - b) * (255 - b) / (d - b), a.b = b + (a.b - b) * (255 - b) / (d - b)), a }, G = function (a, b) { var c = b - E(a), d = {}; return d.r = a.r + c, d.g = a.g + c, d.b = a.b + c, F(d) }, H = function (a) { return Math.max(a.r, Math.max(a.g, a.b)) - Math.min(a.r, Math.min(a.g, a.b)) }, I = function (a, b, c, d) { var e = {}; return c > a ? (e.Cmid = (b - a) * d / (c - a), e.Cmax = d) : (e.Cmax = 0, e.Cmid = 0), e.Cmin = 0, e }, J = function (a, b) { if (a.r <= a.g) { if (a.g <= a.b) { var c = I(a.r, a.g, a.b, b); return { r: c.Cmin, g: c.Cmid, b: c.Cmax } } if (a.r <= a.b) { var c = I(a.r, a.b, a.g, b); return { r: c.Cmin, b: c.Cmid, g: c.Cmax } } var c = I(a.b, a.r, a.g, b); return { b: c.Cmin, r: c.Cmid, g: c.Cmax } } if (a.r <= a.b) { var c = I(a.g, a.r, a.b, b); return { g: c.Cmin, r: c.Cmid, b: c.Cmax } } if (a.g <= a.b) { var c = I(a.g, a.b, a.r, b); return { g: c.Cmin, b: c.Cmid, r: c.Cmax } } var c = I(a.b, a.g, a.r, b); return { b: c.Cmin, g: c.Cmid, r: c.Cmax } }, K = function (a, b) { return a * b >> 8 }, L = function (a, b) { return 255 * (a + b) - a * b >> 8 }, M = function (a, b) { if (a /= 255, b /= 255, b <= .5) return 255 * (a - (1 - 2 * b) * a * (1 - a)); if (a <= .25) var c = ((16 * a - 12) * a + 4) * a; else var c = Math.sqrt(a); return 255 * (a + (2 * b - 1) * (c - a)) }, N = !1; switch (f) { case "multiply": D = K; break; case "screen": D = L; break; case "overlay": D = function (a, b) { return a <= 127 ? K(b, 2 * a) : L(b, 2 * a - 255) }; break; case "darken": D = function (a, b) { return a < b ? a : b }; break; case "lighten": D = function (a, b) { return a < b ? a : b }; break; case "color-dodge": D = function (a, b) { return 0 == a ? 0 : 255 == b ? 255 : Math.min(255, a / (255 - b) * 255) }; break; case "color-burn": D = function (a, b) { return 255 == a ? 255 : 0 == b ? 0 : 255 - Math.min(255, (255 - a) / b * 255) }; break; case "hard-light": D = function (a, b) { return b <= 127 ? K(a, 2 * b) : L(a, 2 * b - 255) }; break; case "soft-light": D = M; break; case "difference": D = function (a, b) { return Math.abs(a - b) }; break; case "exclusion": D = function (a, b) { return Math.abs(a - b) }; break; case "hue": D = function (a, b) { return G(J(a, H(b)), E(b)) }, N = !0; break; case "saturation": D = function (a, b) { return G(J(b, H(a)), E(b)) }, N = !0; break; case "color": D = function (a, b) { return G(a, E(b)) }, N = !0; break; case "luminosity": D = function (a, b) { return G(b, E(a)) }, N = !0 }var O = c.getImageData(0, 0, o, p), P = O.data, Q = d.getImageData(0, 0, o, p), R = Q.data; if (N) { for (var S = 0; S < o * p; S++)if (0 != P[4 * S + 3]) { var T = { r: P[4 * S + 0], g: P[4 * S + 1], b: P[4 * S + 2] }, U = { r: R[4 * S + 0], g: R[4 * S + 1], b: R[4 * S + 2] }, V = D(T, U), W = R[4 * S + 3]; P[4 * S + 0] = (255 - W) * T.r + W * Math.floor(V.r) >> 8, P[4 * S + 1] = (255 - W) * T.g + W * Math.floor(V.g) >> 8, P[4 * S + 2] = (255 - W) * T.b + W * Math.floor(V.b) >> 8 } } else for (var S = 0; S < o * p; S++)0 != P[4 * S + 3] && (P[4 * S + 0] = (255 - R[4 * S + 3]) * P[4 * S + 0] + R[4 * S + 3] * D(R[4 * S + 0], P[4 * S + 0]) >> 8, P[4 * S + 1] = (255 - R[4 * S + 3]) * P[4 * S + 1] + R[4 * S + 3] * D(R[4 * S + 1], P[4 * S + 1]) >> 8, P[4 * S + 2] = (255 - R[4 * S + 3]) * P[4 * S + 2] + R[4 * S + 3] * D(R[4 * S + 2], P[4 * S + 2]) >> 8); c.putImageData(O, 0, 0), d.drawImage(c.canvas, 0, 0), c = d } c.restore() } var X = b.toDataURL("image/jpeg"); y.style.backgroundImage = "url(" + X + ")", y.style.backgroundPosition = "0 0", y.style.backgroundSize = "100% 100%", y.style.backgroundColor = "transparent", y.style.backgroundBlendMode = "normal" } }, A = !0, B = 0; B < u.length; B++)if ("string" == typeof u[B]) { A = !1; var C = new Image; v.push(C), C.onload = z, C.src = u[B] } else v.push(void 0); A && (w = u.length, z()) } }) };