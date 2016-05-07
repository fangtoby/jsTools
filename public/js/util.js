/**
 * 兼容低级浏览器,没有全局对象
 */

if(typeof console === undefined){
    window.console = {
        log:function (msg) {},
        warn:function (msg) {},
        error:function (msg) {}
    }
}
/**
 * 兼容未使用模块化
 */
if(typeof define === undefined){
    window.define = function () {

    }
    console.warn('define undefined')
}

/**
 *
 * 工具类
 *
 * Created by toby on 5/7/16.
 * tool_dom 操作方法
 *
 * var _d = require('tool_dom')
 *
 * tool_util 常用方法
 *
 * var _u = require('tool_util')
 *
 * tool_events 事件方法
 *
 * var _d = require('tool_events')
 *
 * tool_browser 判断浏览器
 *
 * var _b = require('tool_browser')
 *
 */

/**
 *
 * tool_util 工具模块会使用domin
 * 读写cookie|页面重定向跳转
 *
 * 在使用该工具模块时,请设置项目开发域名
 * 在生产环境中许更改域名配置
 *
 * @type {string}
 *
 */
var projectDomin = '.iloveyou.com'


define('tool_util',function(require, exports, module) {
    module.exports = {
        readCookie: function(a) {
            var b = "";
            a += "=";
            if (document.cookie.length > 0 &&
                (offset = document.cookie.indexOf(a),offset != -1)) {
                offset += a.length;
                end = document.cookie.indexOf(";", offset);
                if (end == -1)
                    end = document.cookie.length;
                b = unescape(document.cookie.substring(offset, end))
            }
            return b
        },
        writeCookie: function(a, b, d, e, c) {
            var h = "";
            d != null  && (h = new Date((new Date).getTime() + d * 36E5),
                h = "; expires=" + h.toGMTString());
            document.cookie = a + "=" + escape(b) + h + (c == null  ? "" : "; path=" + c) +
                (e == null  ? "" : ";domain=" + e)
        },
        getHistory: function(a) {
            if (!a)
                return [];
            eval("var items=" + (this.readCookie(a) || "[]"));
            return items
        },
        updateHistory: function(a, b) {
            try {
                if (b) {
                    var d = this.getHistory(a)
                        , e = {};
                    e.q = encodeURIComponent(b);
                    for (var c = 0; c < d.length; c++) {
                        var h = d[c];
                        for (k in h)
                            k == "q" && h[k] == e.q && d.splice(c, 1)
                    }
                    for (d.unshift(e); d.length > 10; )
                        d.pop();
                    e = "[";
                    for (c = 0; c < d.length; c++) {
                        h = d[c];
                        c > 0 && (e += ",");
                        e += "{";
                        var m = 0;
                        for (k in h)
                            m > 0 && (e += ","),
                                m++,
                                e += '"' + k + '":"' + h[k] + '"';
                        e += "}"
                    }
                    e += "]";
                    this.writeCookie(a, e, 720, projectDomin,
                        "/")
                }
            } catch (n) {}
        },
        cleanHistory: function(a) {
            this.writeCookie(a, "", 720, projectDomin, "/")
        },
        timeOut: function(a, b, d) {
            if (typeof a === "function") {
                if (!this.timeOutContext)
                    this.timeOutContext = {};
                var b = b || 100
                    , d = d || null
                    , c = this.sample(a);
                this.timeOutContext[c] && window.clearTimeout(this.timeOutContext[c]);
                this.timeOutContext[c] = window.setTimeout(function() {
                    a.apply(d)
                }, b);
                return this.timeOutContext[c]
            }
        },
        interval: function(a, b, d) {
            if (typeof a === "function") {
                if (!this.intervalContext)
                    this.intervalContext = {};
                var b = b || 100
                    ,
                    d = d || null
                    , c = this
                    , g = this.sample(a);
                this.intervalContext[g] && window.clearInterval(this.intervalContext[g]);
                this.intervalContext[g] = window.setInterval(function() {
                    a.apply(d) && window.clearInterval(c.intervalContext[g])
                }, b);
                return this.intervalContext[g]
            }
        },
        delayLocation: function(a) {
            this.timeOut(function() {
                document.location = a
            }, 100)
        },
        debounce: function(a, b, d) {
            var c = this;
            return function() {
                c.timeOut(a, b, d)
            }
        },
        sample: function(a, b) {
            if (!a)
                return "";
            var b = b || 30
                , d = a.toString().match(/[a-zA-Z]/g).join("")
                , c = Math.floor(d.length /
                6)
                , g = d.length - c;
            return d.substring(c, g - c > b ? c + b : g)
        },
        localServer: function() {
            return (window.location.protocol ? window.location.protocol : "http:") +
                "//" +
                (window.location.hostname ? window.location.host : ("www"+projectDomin))
        },
        localPath: function(a) {
            for (var b = "", d = document.getElementsByTagName("script"), c = 0; d && c < d.length; c++) {
                var g = this.trim(d[c].src);
                if (g && g.indexOf("js/sk-box") > -1) {
                    b = g.indexOf("js/sk-box");
                    b = g.substring(0, b) + (a || "");
                    break
                }
            }
            return b
        },
        isFunction: function(a) {
            return Object.prototype.toString.call(a) === "[object Function]"
        },
        isArray: function(a) {
            return Object.prototype.toString.call(a) === "[object Array]"
        },
        isNodeList: function(a) {
            return Object.prototype.toString.call(a) === "[object NodeList]"
        },
        isObject: function(a) {
            return Object.prototype.toString.call(a) === "[object Object]"
        },
        isString: function(a) {
            return Object.prototype.toString.call(a) === "[object String]"
        },
        trim: function(a) {
            return String.prototype.trim ? a == null  || a == void 0 ? "" : String.prototype.trim.call(a) : a == null  || a == void 0 ? "" : a.toString().replace(/^[\s\xA0]+/,
                "").replace(/[\s\xA0]+$/, "")
        },
        equalsIgnoreCase: function(a, b) {
            a = a ? a.toLowerCase() : "";
            b = b ? b.toLowerCase() : "";
            return a == b
        },
        extend: function(a, b) {
            for (var d in b)
                b.hasOwnProperty(d) && b[d] != null  && b[d] != void 0 && (a[d] = b[d])
        },
        contain: function(a, b) {
            if (!a || !b)
                return !1;
            for (k in a)
                if (a[k] == b)
                    return !0;
            return !1
        },
        strLength: function(a, b, d) {
            var c = 0;
            if (!a)
                return c;
            for (i = 0; i < a.length; i++) {
                var g = a.charAt(i);
                c += this.isEn(g) ? d : b
            }
            return c
        },
        substr: function(a, b, d, e) {
            a = c.util.trim(a);
            if (a == "" || b <= 0)
                return a;
            b = this.isEn(a) ? d :
                b;
            if (a.length <= b)
                return a;
            return a.substring(0, b) + (e || "")
        },
        isEn: function(a) {
            return /^[0-9a-zA-Z\[\]\/\s.,')("!&?:-]+$/.test(a)
        },
        isEmptyFun: function(a) {
            return !a || a.toString().replace(/[\s]+/g, "") == "function(){}"
        },
        htmlEscape: function(a) {
            if (!a)
                return a;
            return a.replace(/[<\">&]/g, function(a) {
                switch (a) {
                    case "<":
                        return "&lt;";
                    case ">":
                        return "&gt;";
                    case '"':
                        return "&quot;";
                    case "&":
                        return "&amp;"
                }
            })
        },
        isEmptyObject: function(a) {
            if (!a)
                return !0;
            for (k in a)
                return !1;
            return !0
        },
        isEmpty: function(a) {
            return !c.util.isNotEmpty(a)
        },
        isNotEmpty: function(a) {
            return (this.isArray(a) || this.isNodeList(a) || this.isObject(a)) && a.length && a.length > 0
        }
    }
})

define('tool_events',function (require, exports, module) {
    module.exports = {
        ev: function(a) {
            return a ? a : window.event
        },
        element: function(a) {
            a = this.ev(a);
            return a.target || a.srcElement
        },
        stopDefault: function(a) {
            a = this.ev(a);
            a.preventDefault ? a.preventDefault() : a.returnValue = !1
        },
        stopBubble: function(a) {
            a = this.ev(a);
            a.stopPropagation ? a.stopPropagation() : a.cancelBubble = !0
        },
        bind: function(a, b) {
            var d = arguments.length > 2 ? Array.prototype.slice.call(arguments, 2) : null ;
            return function() {
                var e =
                    c.util.isString(a) ? b[a] : a
                    , g = d ? d.concat(Array.prototype.slice.call(arguments, 0)) : arguments;
                return e.apply(b || e, g)
            }
        },
        attachEvent: function(a, b, d, c, g) {
            if (a) {
                if (b == "keypress" && (navigator.appVersion.match(/Konqueror|Safari|rv:11|KHTML/) || a.attachEvent))
                    b = "keydown";
                a.addEventListener ? a.addEventListener(b, d, c) : a.attachEvent && (a["e" + b + (g || "") + d] = d,
                    a[b + (g || "") + d] = function() {
                        return a["e" + b + (g || "") + d](window.event)
                    }
                    ,
                    a.attachEvent("on" + b, a[b + (g || "") + d]))
            }
        },
        listen: function(a, b, d) {
            c.events.attachEvent(a, b, d, !1,
                null )
        },
        listenLive: function(a, b, d, e, g) {
            c.events.attachEvent(a, d, this.bind(function(a) {
                var d = c.events.element(a);
                (d.getAttribute("sk_live") == b || b == "") && e.apply(d, arguments)
            }, this), g || !1, b)
        }
    }
})

define('tool_browser',function (require, exports, module) {
    module.exports = {
        ua: navigator.userAgent.toLowerCase(),
        isOpera: function() {
            return this.ua.indexOf("opera") > -1
        },
        isChrome: function() {
            return /chrome/.test(this.ua)
        },
        isSafari: function() {
            return !this.isChrome() && /safari/.test(this.ua)
        },
        isIE: function() {
            return !this.isOpera() && this.ua.indexOf("msie") > -1
        },
        isIE6: function() {
            return !this.isOpera() &&
                this.ua.indexOf("msie 6") > -1
        },
        isIE7: function() {
            return !this.isOpera() && this.ua.indexOf("msie 7") > -1
        },
        isIE8: function() {
            return !this.isOpera() && this.ua.indexOf("msie 8") > -1
        },
        isGecko: function() {
            return !this.isSafari() && this.ua.indexOf("gecko") > -1
        }
    }
})

define('tool_dom',function (require, exports, module) {
    module.exports = {
        g: function(a) {
            if ("string" == typeof a || a instanceof String)
                return document.getElementById(a);
            else if (a && a.nodeName && (a.nodeType == 1 || a.nodeType == 9))
                return a;
            return null
        },
        visible: function(a) {
            return this.g(a).style.display != "none"
        },
        hide: function() {
            for (var a =
                0; a < arguments.length; a++)
                this.g(arguments[a]).style.display = "none"
        },
        show: function() {
            for (var a = 0; a < arguments.length; a++)
                this.g(arguments[a]).style.display = "block"
        },
        getHeight: function(a) {
            a = this.g(a);
            return a.offsetHeight
        },
        addClass: function(a, b) {
            if (a = this.g(a))
                a.className = "" == a.className ? b : a.className + " " + b
        },
        removeClass: function(a, b) {
            if (a = this.g(a))
                a.className = a.className.replace(RegExp("(^| )" + b + "( |$)"), "$1").replace(/ $/, "")
        },
        hasClass: function(a, b) {
            for (var d = a.className.split(/\s+/), c = 0; c < d.length; c++)
                if (d[c] ==
                    b)
                    return !0;
            return !1
        },
        attr: function(a, b, d) {
            var c = b;
            if (typeof b === "string")
                if (d === void 0)
                    return a && a.getAttribute(b);
                else
                    c = {},
                        c[b] = d;
            for (var g in c)
                a.setAttribute(g, c[g])
        },
        isTag: function(a, b) {
            if (!a)
                return !1;
            return a.tagName.toLowerCase() == b.toLowerCase()
        },
        cleanChild: function(a) {
            for (; a.childNodes.length > 0; )
                a.removeChild(a.firstChild)
        },
        selectText: function(a, b, d) {
            a.createTextRange ? (a = a.createTextRange(),
                a.moveStart("character", b),
                a.moveEnd("character", d),
                a.select()) : (a.setSelectionRange(b, d),
                a.focus())
        },
        gc: function(a, b, d) {
            var e = [], g, h, m;
            if (!(a = c.util.trim(a)))
                return null ;
            if ("undefined" == typeof b)
                b = document;
            else if (b = this.g(b),
                    !b)
                return e;
            d && (d = c.util.trim(d).toUpperCase());
            if (b.getElementsByClassName) {
                h = b.getElementsByClassName(a);
                b = h.length;
                for (g = 0; g < b; g++)
                    m = h[g],
                    d && m.tagName != d || (e[e.length] = m)
            } else {
                a = RegExp("(^|\\s)" + a + "(\\s|$)");
                h = d ? b.getElementsByTagName(d) : b.all || b.getElementsByTagName("*");
                b = h.length;
                for (g = 0; g < b; g++)
                    m = h[g],
                    a.test(m.className) && (e[e.length] = m)
            }
            return e
        }
    }
})
