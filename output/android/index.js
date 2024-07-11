var platform = "android";
var FrontControl = /** @class */ (function () {
    function FrontControl() {
        this.__fn = {};
        this.__fn_static = {};
    }
    FrontControl.prototype.setFn = function (name, callback) {
        this.__fn[name] = callback;
    };
    FrontControl.prototype.getFn = function (name) {
        if (this.__fn_static[name])
            return this.__fn_static[name];
        if (!this.__fn[name])
            throw ("No data available. Check if the file exists in the source file \"" + name + "\".");
        var buffer = this.__fn[name]();
        if (this.__fn_static[name] == undefined)
            this.__fn_static[name] = buffer;
        return buffer;
    };
    FrontControl.prototype.exists = function (name) {
        if (this.__fn_static[name])
            return true;
        if (this.__fn[name])
            return true;
        return false;
    };
    FrontControl.prototype.start = function (callback) {
        var _this = this;
        window.onload = function () {
            if (callback) {
                callback.bind(_this)();
            }
            else {
                use("app/index");
            }
        };
    };
    return FrontControl;
}());
var use = function (name) {
    return sfa.getFn(name);
};
var useExists = function (name) {
    return sfa.exists(name);
};
// @ts-ignore
require = use;
var sfa = new FrontControl();
sfa.setFn("App", ()=>{var exports = {};
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
var App = /** @class */ (function () {
    function App() {
    }
    return App;
}());
exports.App = App;
;
return exports;});sfa.setFn("Background", ()=>{var exports = {};
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Background = void 0;
var Util_1 = require("Util");
var Background = /** @class */ (function () {
    function Background() {
    }
    Background.load = function () {
        return __awaiter(this, void 0, void 0, function () {
            var MyApp, n, backgroundName, backgroundPath, bg;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        MyApp = use("app/config/App").MyApp;
                        if (!MyApp.backgrounds) return [3 /*break*/, 4];
                        n = 0;
                        _a.label = 1;
                    case 1:
                        if (!(n < MyApp.backgrounds.length)) return [3 /*break*/, 4];
                        backgroundName = Util_1.Util.getModulePath(MyApp.backgrounds[n]);
                        backgroundPath = "app/background/" + backgroundName;
                        if (!useExists(backgroundPath))
                            return [3 /*break*/, 3];
                        bg = use(backgroundPath);
                        return [4 /*yield*/, bg.handle()];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        n++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * ***handle*** : A handler that is executed immediately after the application starts.
     */
    Background.prototype.handle = function () { };
    return Background;
}());
exports.Background = Background;
;
return exports;});sfa.setFn("Controller", ()=>{var exports = {};
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Controller = void 0;
var Routes_1 = require("Routes");
var Response_1 = require("Response");
var Controller = /** @class */ (function () {
    function Controller() {
        /**
         * ***view*** : Change the view name to be displayed.
         * If not specified, the "rendering/View/{ControllerName}/{ActionName}.html" file will be displayed as the HTML source by default.
         */
        this.view = null;
        /**
         * ***template*** : If you have a template HTML file, specify it here.
         */
        this.template = null;
    }
    /**
     * ***setView*** : Set the page view path to display.
     * If not specified, automatically determined by "{Controller Name}/{action name}"
     * If you use it, place the HTML file in the path "rendering/View/{Controller Name}/{action Name}.html".
     * @param {string} viewName view name
     * @returns {void}
     */
    Controller.prototype.setView = function (viewName) {
        this.view = viewName;
        var routes = Routes_1.Routes.getRoute();
        Response_1.Response.__rendering(routes, this);
    };
    /**
     * ***setTemplate*** : Specifies the template name to use on the displayed page.
     * When using it, place the TML file for the template with the specified name in the "rendering/Template" directory.
     * @param {string} templateName template name
     * @returns {void}
    */
    Controller.prototype.setTemplate = function (templateName) {
        this.template = templateName;
        var routes = Routes_1.Routes.getRoute();
        Response_1.Response.__rendering(routes, this);
    };
    /**
     * ***setHead*** :
     * @param headName
     */
    Controller.prototype.setHead = function (headName) {
        this.head = headName;
        var routes = Routes_1.Routes.getRoute();
        Response_1.Response.__rendering(routes, this);
    };
    /**
     * ***setHeader*** :
     * @param headerName
     */
    Controller.prototype.setHeader = function (headerName) {
        this.header = headerName;
        var routes = Routes_1.Routes.getRoute();
        Response_1.Response.__rendering(routes, this);
    };
    /**
     * ***setFooter*** :
     * @param footerName
     */
    Controller.prototype.setFooter = function (footerName) {
        this.header = footerName;
        var routes = Routes_1.Routes.getRoute();
        Response_1.Response.__rendering(routes, this);
    };
    /**
     * ***handleBefore*** : Event handler executed just before transitioning to the page.
     */
    Controller.prototype.handleBefore = function (beginStatus) { };
    /**
     * ***handleAfter*** : Event handler executed immediately after transitioning to the page
     */
    Controller.prototype.handleAfter = function (beginStatus) { };
    /**
     * ***handleRenderBefore*** : Event handler executed immediately after page transition and rendering process to the screen is completed
     */
    Controller.prototype.handleRenderBefore = function (beginStatus) { };
    /**
     * ***handleRenderAfter*** : Event handler that is executed after page transition, after rendering process to the screen is completed,
     * and after the event for each action is completed.
     */
    Controller.prototype.handleRenderAfter = function (beginStatus) { };
    /**
     * ***handleLeave*** : Event handler executed when leaving the page
     * @param {string} action before access controller action name
     */
    Controller.prototype.handleLeave = function (action) { };
    return Controller;
}());
exports.Controller = Controller;
;
return exports;});sfa.setFn("Data", ()=>{var exports = {};
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Data = void 0;
var Data = /** @class */ (function () {
    function Data() {
    }
    Data.get = function (name) {
        return this.__data[name];
    };
    Data.set = function (name, value) {
        this.__data[name] = value;
        return this;
    };
    Data.__data = {};
    return Data;
}());
exports.Data = Data;
;
return exports;});sfa.setFn("Dom", ()=>{var exports = {};
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VDom = exports.Dom = exports.DomControl = exports.DomStatic = void 0;
var Util_1 = require("Util");
/*
const EventTypes = [
    "click",
    "dblclick",
    "contextmenu",
    "change",
    "focus",
    "mousemove",
    "mouseup",
    "mousedown",
    "keyup",
    "keydown",
    "keypress",
] as const;
*/
var DomStatic = /** @class */ (function () {
    function DomStatic() {
    }
    DomStatic.uids = {};
    DomStatic.events = {};
    return DomStatic;
}());
exports.DomStatic = DomStatic;
var DomControl = /** @class */ (function () {
    function DomControl(qs) {
        this._qs = null;
        this._virtual = false;
        this.renderingRefreshStatus = true;
        this._qs = qs;
        for (var n = 0; n < this._qs.length; n++) {
            var qs_ = this._qs[n];
            if (!qs_.uid) {
                var uid = Util_1.Util.uniqId();
                qs_.uid = uid;
            }
        }
    }
    DomControl.load = function (selector) {
        var fullSelector = "";
        if (selector) {
            if (typeof selector == "string") {
                fullSelector = "html " + selector;
            }
            else {
                var selectList = [];
                if (!Array.isArray(selector)) {
                    if (selector instanceof NodeList) {
                        // @ts-ignore
                        selectList = selector;
                    }
                    else {
                        selectList = [selector];
                    }
                }
                else {
                    selectList = selector;
                }
                return new DomControl(selectList);
            }
        }
        else {
            fullSelector = "html *";
        }
        var qs = document.querySelectorAll(fullSelector);
        return new DomControl(qs);
    };
    DomControl.loadOnVirtual = function (refName) {
        var v = [];
        if (refName) {
            var v1 = void 0;
            var v2 = void 0;
            v1 = DomControl.load().findOnVirtual("__ref", refName);
            for (var n = 0; n < v1._qs.length; n++) {
                var q_ = v1._qs[n];
                v.push(q_);
            }
            if (refName.indexOf("*") > -1) {
                var rns = refName.split("*");
                var selector = "";
                if (!rns[0].trim()) {
                    selector = "[ref$=\"" + rns[1] + "\"]";
                }
                else {
                    selector = "[ref^=\"" + rns[0] + "\"]";
                }
                v2 = DomControl.load(selector);
                for (var n = 0; n < v2.length; n++) {
                    var v2_ = v2.index(n);
                    var refName2 = v2_.attr("ref");
                    v2_.virtual("__ref", refName2);
                }
            }
            else {
                v2 = DomControl.load("[ref=\"" + refName + "\"]");
                v2.virtual("__ref", refName);
            }
            v2.removeAttr("ref");
            for (var n = 0; n < v2._qs.length; n++) {
                var q_ = v2._qs[n];
                v.push(q_);
            }
        }
        var vdo = new DomControl(v);
        vdo._virtual = true;
        return vdo;
    };
    Object.defineProperty(DomControl.prototype, "get", {
        /**
         * ***get*** :
         * Get the document information of the get DOM.
         */
        get: function () {
            return this._qs;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DomControl.prototype, "length", {
        /**
         * ***length*** :
         * Get the number of elements in the get DOM.
         * @returns {number} length
         */
        get: function () {
            return this._qs.length;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DomControl.prototype, "exists", {
        /**
         * ***exists*** :
         * Determine whether an element exists.
         * @returns {bolean} judgment result
         */
        get: function () {
            if (this._qs.length) {
                return true;
            }
            return false;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DomControl.prototype, "first", {
        /**
         * ***first*** :
         * Specifies the first element.
         * @returns {DomControl} DomControl Class Object
         */
        get: function () {
            var res = new DomControl([this._qs[0]]);
            res._virtual = this._virtual;
            res.renderingRefreshStatus = this.renderingRefreshStatus;
            return res;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DomControl.prototype, "last", {
        /**
         * ***last*** :
         * Specifies the last element.
         * @returns {DomControl} DomControl Class Object
         */
        get: function () {
            var res = new DomControl([this._qs[this._qs.length - 1]]);
            res._virtual = this._virtual;
            res.renderingRefreshStatus = this.renderingRefreshStatus;
            return res;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DomControl.prototype, "parent", {
        /**
         * ***parent*** :
         * Specifies the parent element one level above.
         * @returns {DomControl} DomControl Class Object
         */
        get: function () {
            var res = new DomControl([this._qs[this._qs.length - 1].parentNode]);
            res._virtual = this._virtual;
            res.renderingRefreshStatus = this.renderingRefreshStatus;
            return res;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * ***index*** :
     * Specifies the element at the index specified by the argument
     * @param {number} index element index
     * @returns {DomControl} DomControl Class Object
     */
    DomControl.prototype.index = function (index) {
        var res = new DomControl([this._qs[index]]);
        res._virtual = this._virtual;
        res.renderingRefreshStatus = this.renderingRefreshStatus;
        return res;
    };
    Object.defineProperty(DomControl.prototype, "even", {
        /**
         * ***even*** :
         * Extract even element information only.
         * @returns {DomControl} DomControl Class Object
         */
        get: function () {
            var qs_ = [];
            for (var n = 0; n < this._qs.length; n++) {
                var q_ = this._qs[n];
                if (n % 2 == 0) {
                    qs_.push(q_);
                }
            }
            var res = new DomControl(qs_);
            res._virtual = this._virtual;
            res.renderingRefreshStatus = this.renderingRefreshStatus;
            return res;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DomControl.prototype, "odd", {
        /**
         * ***odd*** :
         * Extract only odd element information
         * @returns {DomControl} DomControl Class Object
         */
        get: function () {
            var qs_ = [];
            for (var n = 0; n < this._qs.length; n++) {
                var q_ = this._qs[n];
                if (n % 2 == 1) {
                    qs_.push(q_);
                }
            }
            var res = new DomControl(qs_);
            res._virtual = this._virtual;
            res.renderingRefreshStatus = this.renderingRefreshStatus;
            return res;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * ***findOnAttr*** :
     * Specifies only elements that contain attribute information that matches the conditions of the argument.
     * @param {string} name attribute name
     * @param {string|number} value attribute value
     * @returns {DomControl} DomControl Class Object
     */
    DomControl.prototype.findOnAttr = function (name, value) {
        var qss = [];
        for (var n = 0; n < this._qs.length; n++) {
            var qs = this._qs[n];
            if (!qs.attributes[name]) {
                continue;
            }
            if (qs.attributes[name].value == value) {
                qss.push(qs);
            }
        }
        var res = new DomControl(qss);
        res._virtual = this._virtual;
        res.renderingRefreshStatus = this.renderingRefreshStatus;
        return res;
    };
    /**
     * ***findOnVirtual*** :
     * Specify only elements that contain Virtual attribute information that matches the argument conditions.
     * @param {string} name virtual attribute name
     * @param {any} value virtual attribute value
     * @returns {DomControl} DomControl Class Object
     */
    DomControl.prototype.findOnVirtual = function (name, value) {
        var qss = [];
        for (var n = 0; n < this._qs.length; n++) {
            var qs = this._qs[n];
            if (!qs.uid) {
                continue;
            }
            if (!DomStatic.uids[qs.uid]) {
                continue;
            }
            var uids = DomStatic.uids[qs.uid];
            if (!uids.virtual) {
                continue;
            }
            if (!uids.virtual[name]) {
                continue;
            }
            var targetValue = uids.virtual[name].toString();
            if (value.toString().indexOf("*") > -1) {
                var vns = value.split("*");
                var judge = false;
                if (!vns[0].trim()) {
                    if (targetValue.indexOf(vns[1]) > 0) {
                        judge = true;
                    }
                }
                else {
                    if (targetValue.indexOf(vns[0]) === 0) {
                        judge = true;
                    }
                }
                if (!judge) {
                    continue;
                }
            }
            else {
                if (uids.virtual[name] != value) {
                    continue;
                }
            }
            qss.push(qs);
        }
        var res = new DomControl(qss);
        res._virtual = this._virtual;
        res.renderingRefreshStatus = this.renderingRefreshStatus;
        return res;
    };
    DomControl.prototype.child = function (selector) {
        if (this._virtual) {
            return this.childVirtual(selector);
        }
        else {
            return this.childDom(selector);
        }
    };
    DomControl.prototype.childDom = function (selector) {
        var qss = [];
        for (var n = 0; n < this._qs.length; n++) {
            var qs = this._qs[n];
            var buff = void 0;
            if (selector) {
                buff = qs.querySelectorAll(selector);
            }
            else {
                buff = qs.childNodes;
            }
            buff.forEach(function (b_) {
                qss.push(b_);
            });
        }
        var res = new DomControl(qss);
        res._virtual = this._virtual;
        res.renderingRefreshStatus = this.renderingRefreshStatus;
        return res;
    };
    DomControl.prototype.childVirtual = function (refName) {
        var v = [];
        var v1;
        var v2;
        v1 = this.childDom().findOnVirtual("__ref", refName);
        for (var n = 0; n < v1._qs.length; n++) {
            var q_ = v1._qs[n];
            v.push(q_);
        }
        if (!refName) {
            refName = "*";
        }
        if (refName.indexOf("*") > -1) {
            var rns = refName.split("*");
            if (!rns[0].trim()) {
                v2 = this.childDom("[ref$=\"" + rns[1] + "\"]");
            }
            else {
                v2 = this.childDom("[ref^=\"" + rns[0] + "\"]");
            }
            for (var n = 0; n < v2.length; n++) {
                var v2_ = v2.index(n);
                var ref = v2_.attr("ref");
                v2_.virtual("__ref", ref);
            }
        }
        else {
            v2 = this.childDom("[ref=\"" + refName + "\"]");
            v2.virtual("__ref", refName);
        }
        v2.removeAttr("ref");
        for (var n = 0; n < v2._qs.length; n++) {
            var q_ = v2._qs[n];
            v.push(q_);
        }
        var res = new DomControl(v);
        res._virtual = this._virtual;
        res.renderingRefreshStatus = this.renderingRefreshStatus;
        return res;
    };
    Object.defineProperty(DomControl.prototype, "text", {
        /**
         * ***text*** :
         * get/set the text inside the element tag
         */
        get: function () {
            return this._qs[this._qs.length - 1].innerText;
        },
        set: function (text) {
            for (var n = 0; n < this._qs.length; n++) {
                var qs = this._qs[n];
                qs.innerText = text;
            }
            this.renderingRefresh();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DomControl.prototype, "html", {
        /**
         * ***html*** :
         * Get/Set the HTML inside the element tag (innerHTML)
         */
        get: function () {
            return this._qs[this._qs.length - 1].innerHTML;
        },
        set: function (html) {
            for (var n = 0; n < this._qs.length; n++) {
                var qs = this._qs[n];
                qs.innerHTML = html;
            }
            this.renderingRefresh();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DomControl.prototype, "outerHtml", {
        /**
         * ***outerHtml*** :
         * Get/Set the HTML inside the element tag (outerHTML)
         */
        get: function () {
            return this._qs[this._qs.length - 1].outerHTML;
        },
        set: function (html) {
            for (var n = 0; n < this._qs.length; n++) {
                var qs = this._qs[n];
                qs.outerHtml = html;
            }
            this.renderingRefresh();
        },
        enumerable: false,
        configurable: true
    });
    DomControl.prototype.append = function (contents) {
        this._qs.forEach(function (qs) {
            if (typeof contents == "string") {
                qs.insertAdjacentHTML("beforeend", contents);
            }
            else {
                qs.append(contents);
            }
        });
        this.renderingRefresh();
        return this;
    };
    /**
     * ***stamp*** :
     *
     * @param {string} stampSource
     * @param {Function} callback
     * @returns {DomControl} DomControl Class Object
     */
    DomControl.prototype.stamp = function (stampSource, callback) {
        this.append(stampSource);
        var target = this.childDom().last;
        callback(target);
        return this;
    };
    DomControl.prototype.before = function (contents) {
        this._qs.forEach(function (qs) {
            if (typeof contents == "string") {
                qs.insertAdjacentHTML("beforebegin", contents);
            }
            else {
                qs.before(contents);
            }
        });
        this.renderingRefresh();
        return this;
    };
    DomControl.prototype.after = function (contents) {
        this._qs.forEach(function (qs) {
            if (typeof contents == "string") {
                qs.insertAdjacentHTML("afterend", contents);
            }
            else {
                qs.after(contents);
            }
        });
        this.renderingRefresh();
        return this;
    };
    /**
     * ***remove*** :
     * remove the element
     * @returns {DomControl} DomControl Class Object
     */
    DomControl.prototype.remove = function () {
        for (var n = 0; n < this._qs.length; n++) {
            var qs = this._qs[n];
            qs.remove();
        }
        return this;
    };
    /**
     * ***empty*** :
     * clear inside element
     * @returns {DomControl} DomControl Class Object
     */
    DomControl.prototype.empty = function () {
        this.html = "";
        return this;
    };
    /**
     * ***on*** :
     * set the event handler.
     * @param {DocumentEventMap} eventName event name
     * @param {Function} callback callback function
     * @returns {DomControl} DomControl Class Object
     */
    DomControl.prototype.on = function (eventName, callback, bindClass) {
        var eventCallback = function (e) {
            var targetDom = new DomControl([e.target]);
            if (bindClass) {
                callback = callback.bind(bindClass);
            }
            callback(targetDom, e);
        };
        for (var n = 0; n < this._qs.length; n++) {
            var qs = this._qs[n];
            qs.addEventListener(eventName, eventCallback);
        }
        if (!DomStatic.events[qs.uid])
            DomStatic.events[qs.uid] = {};
        if (!DomStatic.events[qs.uid][eventName])
            DomStatic.events[qs.uid][eventName] = [];
        DomStatic.events[qs.uid][eventName].push(eventCallback);
        console.log(DomStatic.events);
        return this;
    };
    Object.defineProperty(DomControl.prototype, "onClick", {
        /**
         * ***onClick*** :
         * Wrapper function when eventname of on method is set to "click".
         * @param {Function} callback callback function
         */
        set: function (callback) {
            this.on("click", callback);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DomControl.prototype, "onContextmenu", {
        /**
         * ***onContextmenu*** :
         * Wrapper function when eventname of on method is set to "contextmenu".
         * @param {Function} callback callback function
         */
        set: function (callback) {
            this.on("contextmenu", callback);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DomControl.prototype, "onChange", {
        /**
         * ***onChange*** :
         * Wrapper function when eventname of on method is set to "change".
         * @param {Function} callback callback function
         */
        set: function (callback) {
            this.on("change", callback);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DomControl.prototype, "onKeyUp", {
        /**
         * ***onKeyUp*** :
         * Wrapper function when eventname of on method is set to "keyup".
         * @param {Function} callback callback function
         */
        set: function (callback) {
            this.on("keyup", callback);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DomControl.prototype, "onKeyDown", {
        /**
         * ***onKeyDown*** :
         * Wrapper function when eventname of on method is set to "onKeyDown".
         * @param {Function} callback callback function
         */
        set: function (callback) {
            this.on("keyup", callback);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DomControl.prototype, "onKeyPress", {
        /**
         * ***onKeyPress*** :
         * Wrapper function when eventname of on method is set to "keypress".
         * @param {Function} callback callback function
         */
        set: function (callback) {
            this.on("keypress", callback);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DomControl.prototype, "onMouseUp", {
        /**
         * ***onMouseUp**** :
         * Wrapper function when eventname of on method is set to "mouseup".
         * @param {Function} callback callback function
         */
        set: function (callback) {
            this.on("mouseup", callback);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DomControl.prototype, "onMouseDown", {
        /**
         * ***onMouseDown*** :
         * Wrapper function when eventname of on method is set to "mousedown".
         * @param {Function} callback callback function
         */
        set: function (callback) {
            this.on("mousedown", callback);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DomControl.prototype, "onMouseMove", {
        /**
         * ***onMouseMove*** :
         * Wrapper function when eventname of on method is set to "mousemove".
         * @param {Function} callback callback function
         */
        set: function (callback) {
            this.on("mousemove", callback);
        },
        enumerable: false,
        configurable: true
    });
    DomControl.prototype.attribute = function (name, value) {
        if (value == undefined) {
            return this._qs[this._qs.length - 1].attributes[name].value;
        }
        else {
            for (var n = 0; n < this._qs.length; n++) {
                var qs = this._qs[n];
                qs.setAttribute(name, value);
            }
            return this;
        }
    };
    DomControl.prototype.attr = function (name, value) {
        return this.attribute(name, value);
    };
    /**
     * ***removeAttribute*** :
     * Delete attribute information
     * @param {string} name attribute name
     * @returns {DomControl} DomControl Class Object
     */
    DomControl.prototype.removeAttribute = function (name) {
        for (var n = 0; n < this._qs.length; n++) {
            var qs = this._qs[n];
            qs.removeAttribute(name);
        }
        return this;
    };
    /**
     * ***removeAttr*** :
     * Delete attribute information
     * @param {string} name attribute name
     * @returns {DomControl} DomControl Class Object
     */
    DomControl.prototype.removeAttr = function (name) {
        return this.removeAttribute(name);
    };
    DomControl.prototype.virtual = function (name, value) {
        if (this._qs.length == 0) {
            return;
        }
        if (value == undefined) {
            var qs = this._qs[this._qs.length - 1];
            if (!DomStatic.uids[qs.uid]) {
                return null;
            }
            var uids = DomStatic.uids[qs.uid];
            if (!uids.virtual) {
                return null;
            }
            if (!uids.virtual[name]) {
                return null;
            }
            return uids.virtual[name];
        }
        else {
            for (var n = 0; n < this._qs.length; n++) {
                var qs = this._qs[n];
                if (!DomStatic.uids[qs.uid]) {
                    DomStatic.uids[qs.uid] = {};
                }
                if (!DomStatic.uids[qs.uid].virtual) {
                    DomStatic.uids[qs.uid].virtual = {};
                    DomStatic.uids[qs.uid].target = qs;
                }
                DomStatic.uids[qs.uid].virtual[name] = value;
            }
            return this;
        }
    };
    /**
     * ***removeVirtual*** :
     * Delete virtual attribute information
     * @param {string} name virtual attribute name
     * @returns {DomControl} DomControl Class Object
     */
    DomControl.prototype.removeVirtual = function (name) {
        for (var n = 0; n < this._qs.length; n++) {
            var qs = this._qs[n];
            if (!DomStatic.uids[qs.uid]) {
                continue;
            }
            if (!DomStatic.uids[qs.uid].virtual) {
                continue;
            }
            delete DomStatic.uids[qs.uid].virtual[name];
            // @ts-ignore
            if (DomStatic.uids[qs.uid].virtual == {}) {
                delete DomStatic.uids[qs.uid].virtual;
            }
            // @ts-ignore
            if (DomStatic.uids[qs.uid] == {}) {
                delete DomStatic.uids[qs.uid];
            }
        }
        return this;
    };
    /**
     * ***style*** :
     * Sets stylesheet information.
     * @param {object} options stylesheet attribute information
     * @returns {DomControl} DomControl Class Object
     */
    DomControl.prototype.style = function (options) {
        for (var n = 0; n < this._qs.length; n++) {
            var qs = this._qs[n];
            var columns = Object.keys(options);
            for (var n2 = 0; n2 < columns.length; n2++) {
                var key = columns[n2];
                var val = options[key];
                qs.style[key] = val;
            }
        }
        return this;
    };
    DomControl.prototype.getStyle = function (name) {
        var qs = this._qs[this._qs.length - 1];
        if (name) {
            if (!qs.style[name]) {
                return null;
            }
            return qs.style[name];
        }
        else {
            return qs.style;
        }
    };
    DomControl.prototype.addClass = function (className) {
        if (typeof className == "string") {
            className = [className];
        }
        for (var n = 0; n < this._qs.length; n++) {
            var qs = this._qs[n];
            for (var n2 = 0; n2 < className.length; n2++) {
                var c = className[n2];
                qs.classList.add(c);
            }
        }
        return this;
    };
    /**
     * ***removeClass*** :
     * remove the class attribute
     * @param {string} className Delete class name
     * @returns {DomControl} DomControl Class Object
     */
    DomControl.prototype.removeClass = function (className) {
        for (var n = 0; n < this._qs.length; n++) {
            var qs = this._qs[n];
            qs.classList.remove(className);
        }
        return this;
    };
    /**
     * ***isClass*** :
     * Checks if the specified class exists in the element
     * @param {string} className Delete class name
     * @returns {boolean} exists status
     */
    DomControl.prototype.isClass = function (className) {
        var qs = this._qs[this._qs.length - 1];
        return qs.classList.contains(className);
    };
    DomControl.prototype.value = function (value) {
        if (value == undefined) {
            return this.get_value_default(0);
        }
        else {
            return this.set_value_Default(0, value);
        }
    };
    DomControl.prototype.default = function (value) {
        if (value == undefined) {
            return this.get_value_default(1);
        }
        else {
            return this.set_value_Default(1, value);
        }
    };
    DomControl.prototype.get_value_default = function (mode) {
        var qs = this._qs[this._qs.length - 1];
        if (qs.type == "radio") {
            for (var n = 0; n < this._qs.length; n++) {
                var qs = this._qs[n];
                if (qs.checked == true) {
                    return qs.value;
                }
            }
        }
        else if (qs.type == "checkbox") {
            var result = [];
            for (var n = 0; n < this._qs.length; n++) {
                var qs = this._qs[n];
                if (qs.checked == true) {
                    result.push(qs.value);
                }
            }
            return result;
        }
        else {
            return qs.value;
        }
    };
    DomControl.prototype.set_value_Default = function (mode, value) {
        for (var n = 0; n < this._qs.length; n++) {
            var qs = this._qs[n];
            var type = qs.type;
            if (type == "radio") {
                if (qs.value == value) {
                    if (mode == 0) {
                        qs.checked = true;
                    }
                    else {
                        qs.setAttribute("checked", true);
                    }
                }
                else {
                    if (mode == 0) {
                        qs.checked = false;
                    }
                    else {
                        qs.removeAttribute("checked");
                    }
                }
            }
            else if (type == "checkbox") {
                if (typeof value == "string") {
                    value = [value];
                }
                if (mode == 0) {
                    qs.checked = false;
                }
                else {
                    qs.removeAttribute("checked");
                }
                for (var n2 = 0; n2 < value.length; n2++) {
                    var v = value[n2];
                    if (qs.value == v) {
                        if (mode == 0) {
                            qs.checked = true;
                        }
                        else {
                            qs.setAttribute("checked", true);
                        }
                    }
                }
            }
            else {
                if (mode == 0) {
                    qs.value = value;
                }
                else {
                    qs.setAttribute("value", value);
                }
            }
        }
        return this;
    };
    DomControl.prototype.valueIncrement = function (step) {
        var value = this.value();
        if (!step) {
            step = parseInt(this.attr("step"));
        }
        var min = this.attr("min");
        var max = this.attr("max");
        value++;
        if (min) {
            if (value < min) {
                value = min;
            }
        }
        if (max) {
            if (value > max) {
                value = max;
            }
        }
        return this.value(value);
    };
    DomControl.prototype.valueDecrement = function (step) {
        var value = this.value();
        if (!step) {
            step = parseInt(this.attr("step"));
        }
        var min = this.attr("min");
        var max = this.attr("max");
        value--;
        if (min) {
            if (value < min) {
                value = min;
            }
        }
        if (max) {
            if (value > max) {
                value = max;
            }
        }
        return this.value(value);
    };
    Object.defineProperty(DomControl.prototype, "nodeName", {
        /**
         * ***nodeName*** :
         * get the node name of an element.
         */
        get: function () {
            var qs = this._qs[this._qs.length - 1];
            return qs.localName;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DomControl.prototype, "type", {
        /**
         * ***type*** :
         * get the type attribute.
         */
        get: function () {
            return this.attr("type");
        },
        enumerable: false,
        configurable: true
    });
    /**
     * ***click*** :
     * performs a click on an element.
     * @returns {DomControl} DomControl Class Object
     */
    DomControl.prototype.click = function () {
        for (var n = 0; n < this._qs.length; n++) {
            var qs = this._qs[n];
            qs.click();
        }
        return this;
    };
    /**
     * ***dblclick*** :
     * Performs a double click on an element.
     * @returns {DomControl} DomControl Class Object
     */
    DomControl.prototype.dblclick = function () {
        for (var n = 0; n < this._qs.length; n++) {
            var qs = this._qs[n];
            qs.dblclick();
        }
        return this;
    };
    /**
     * ***submit*** :
     * Executes element submission.
     * @returns {DomControl} DomControl Class Object
     */
    DomControl.prototype.submit = function () {
        for (var n = 0; n < this._qs.length; n++) {
            var qs = this._qs[n];
            qs.dblclick();
        }
        return this;
    };
    /**
     * ***focus*** :
     * Performs element focus.
     * @returns {DomControl} DomControl Class Object
     */
    DomControl.prototype.focus = function () {
        for (var n = 0; n < this._qs.length; n++) {
            var qs = this._qs[n];
            qs.focus();
        }
        return this;
    };
    /**
   * ***refresh*** :
   * @returns {VDomControl} VDomCOntrol Class Object
   */
    DomControl.prototype.refresh = function () {
        if (!this._virtual)
            return this;
        var c = Object.keys(DomStatic.uids);
        for (var n = 0; n < c.length; n++) {
            var uid = c[n];
            var obj = DomStatic.uids[uid];
            if (!document.body.contains(obj.target)) {
                delete DomStatic.uids[uid];
            }
        }
        return this;
    };
    Object.defineProperty(DomControl.prototype, "ref", {
        get: function () {
            if (this._virtual) {
                return this.virtual("__ref");
            }
        },
        enumerable: false,
        configurable: true
    });
    DomControl.prototype.renderingRefresh = function () {
        if (this.renderingRefreshStatus)
            return;
        /*
        for(let n = 0 ; n < EventTypes.length; n++){
            const eventType = EventTypes[n];
            const target = "v-on-" + eventType;
            const search = DomControl.load("[" + target + "]");
            for(let n2 = 0 ; n2 < search.length ; n2++){
                const s_ = search.index(n2);
                const handleName = s_.attribute(target);
                s_.removeAttribute(target);
                if(Data.__before_controller){
                    if(Data.__before_controller[handleName]){
                        s_.on(eventType, Data.__before_controller[handleName], Data.__before_controller);
                    }
                }
                if(Data.__before_view){
                    if(Data.__before_view[handleName]){
                        s_.on(eventType, Data.__before_view[handleName], Data.__before_view);
                    }
                }

                if(Data.__child_classs){
                    const c = Object.keys(Data.__child_classs);
                    for(let n = 0 ; n < c.length ; n++){
                        const classPath = c[n];
                        const childClass = Data.__child_classs[classPath];
                        if(childClass[handleName]){
                            s_.on(eventType, childClass[handleName], childClass);
                        }
                    }
                }
            }
        }
        */
    };
    return DomControl;
}());
exports.DomControl = DomControl;
exports.Dom = DomControl.load;
exports.VDom = DomControl.loadOnVirtual;
;
return exports;});sfa.setFn("Exception", ()=>{var exports = {};
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Exception = void 0;
var View_1 = require("View");
var Exception = /** @class */ (function (_super) {
    __extends(Exception, _super);
    function Exception() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = "exception";
        return _this;
    }
    /**
     * ***handle*** :
     * Event handler when an error occurs.
     * @param {Exception} exception Error Exception
     * @returns {void}
    */
    Exception.prototype.handle = function (exception) { };
    return Exception;
}(View_1.View));
exports.Exception = Exception;
;
return exports;});sfa.setFn("KeyEvent", ()=>{var exports = {};
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeyEvent = void 0;
var KeyEvent = /** @class */ (function () {
    function KeyEvent() {
        this._callback_down = {};
        this._callback_up = {};
        var cont = this;
        document.addEventListener("keydown", function (e) {
            var keyCode = e.code;
            if (cont._callback_down[keyCode]) {
                cont._callback_down[keyCode](e);
            }
        });
        document.addEventListener("keyup", function (e) {
            var keyCode = e.code;
            if (cont._callback_up[keyCode]) {
                cont._callback_up[keyCode](e);
            }
        });
    }
    KeyEvent.prototype.on = function (fullKeyName, keyDownCallback, keyUpCallback) {
        this._callback_down[fullKeyName] = keyDownCallback;
        if (keyUpCallback) {
            this._callback_up[fullKeyName] = keyUpCallback;
        }
        return this;
    };
    KeyEvent.prototype.onArrowUp = function (keyDownCallback, keyUpCallback) {
        return this.on("ArrowUp", keyDownCallback, keyUpCallback);
    };
    KeyEvent.prototype.onArrowDown = function (keyDownCallback, keyUpCallback) {
        return this.on("ArrowDown", keyDownCallback, keyUpCallback);
    };
    KeyEvent.prototype.onArrowLeft = function (keyDownCallback, keyUpCallback) {
        return this.on("ArrowLeft", keyDownCallback, keyUpCallback);
    };
    KeyEvent.prototype.onArrowRight = function (keyDownCallback, keyUpCallback) {
        return this.on("ArrowRight", keyDownCallback, keyUpCallback);
    };
    KeyEvent.prototype.onEnter = function (keyDownCallback, keyUpCallback) {
        return this.on("Enter", keyDownCallback, keyUpCallback);
    };
    KeyEvent.prototype.onSpace = function (keyDownCallback, keyUpCallback) {
        return this.on("Space", keyDownCallback, keyUpCallback);
    };
    KeyEvent.prototype.onChar = function (keyword, keyDownCallback, keyUpCallback) {
        return this.on("Key" + keyword, keyDownCallback, keyUpCallback);
    };
    KeyEvent.prototype.onNumber = function (number, keyDownCallback, keyUpCallback) {
        return this.on("Number" + number, keyDownCallback, keyUpCallback);
    };
    return KeyEvent;
}());
exports.KeyEvent = KeyEvent;
;
return exports;});sfa.setFn("Response", ()=>{var exports = {};
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Response = void 0;
var Routes_1 = require("Routes");
var Util_1 = require("Util");
var Data_1 = require("Data");
var Dom_1 = require("Dom");
var Response = /** @class */ (function () {
    function Response() {
    }
    Response.rendering = function (route) {
        return __awaiter(this, void 0, void 0, function () {
            var befCont, befView, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 9, , 10]);
                        befCont = Data_1.Data.get("beforeController");
                        if (!befCont) return [3 /*break*/, 2];
                        return [4 /*yield*/, befCont.handleLeave(Data_1.Data.get("beforeControllerAction"))];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        befView = Data_1.Data.get("beforeView");
                        if (!befView) return [3 /*break*/, 4];
                        return [4 /*yield*/, befView.handleLeave()];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        if (route.mode == Routes_1.DecisionRouteMode.Notfound)
                            throw ("Page Not found");
                        if (!route.controller) return [3 /*break*/, 6];
                        return [4 /*yield*/, Response.renderingOnController(route)];
                    case 5:
                        _a.sent();
                        return [3 /*break*/, 8];
                    case 6:
                        if (!route.view) return [3 /*break*/, 8];
                        return [4 /*yield*/, Response.renderingOnView(route)];
                    case 7:
                        _a.sent();
                        _a.label = 8;
                    case 8: return [3 /*break*/, 10];
                    case 9:
                        error_1 = _a.sent();
                        console.error(error_1);
                        return [3 /*break*/, 10];
                    case 10: return [2 /*return*/];
                }
            });
        });
    };
    Response.renderingOnController = function (route) {
        return __awaiter(this, void 0, void 0, function () {
            var controllerName, controllerPath, controllerClass, cont, viewName, viewPath, vw, View_, beginStatus, method, method;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        controllerName = Util_1.Util.getModuleName(route.controller + "Controller");
                        controllerPath = "app/controller/" + Util_1.Util.getModulePath(route.controller + "Controller");
                        if (!useExists(controllerPath)) {
                            throw ("\"" + controllerPath + "\" Class is not found.");
                        }
                        controllerClass = use(controllerPath);
                        cont = new controllerClass[controllerName]();
                        viewName = route.action + "View";
                        viewPath = "app/view/" + route.controller + "/" + Util_1.Util.getModulePath(viewName);
                        if (useExists(viewPath)) {
                            View_ = use(viewPath);
                            vw = new View_();
                        }
                        beginStatus = false;
                        if (Data_1.Data.get("beforeControllerPath") != controllerPath) {
                            Data_1.Data.set("beforeControllerPath", controllerPath);
                            beginStatus = true;
                        }
                        return [4 /*yield*/, cont.handleBefore(beginStatus)];
                    case 1:
                        _a.sent();
                        if (!vw) return [3 /*break*/, 3];
                        return [4 /*yield*/, vw.handleBefore(beginStatus)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        Data_1.Data.set("beforeController", cont);
                        Data_1.Data.set("beforeControllerAction", route.action);
                        Data_1.Data.set("beforeView", null);
                        Data_1.Data.set("beforeViewPath", null);
                        Data_1.Data.set("childClasss", {});
                        if (!cont["before_" + route.action]) return [3 /*break*/, 7];
                        method = "before_" + route.action;
                        if (!route.args) return [3 /*break*/, 5];
                        return [4 /*yield*/, cont[method].apply(cont, route.args)];
                    case 4:
                        _a.sent();
                        return [3 /*break*/, 7];
                    case 5: return [4 /*yield*/, cont[method]()];
                    case 6:
                        _a.sent();
                        _a.label = 7;
                    case 7: return [4 /*yield*/, cont.handleAfter(beginStatus)];
                    case 8:
                        _a.sent();
                        if (!vw) return [3 /*break*/, 10];
                        return [4 /*yield*/, vw.handleAfter(beginStatus)];
                    case 9:
                        _a.sent();
                        _a.label = 10;
                    case 10:
                        console.log("rendring ready?");
                        return [4 /*yield*/, Response.__rendering(route, cont)];
                    case 11:
                        _a.sent();
                        console.log("rendring?");
                        return [4 /*yield*/, cont.handleRenderBefore(beginStatus)];
                    case 12:
                        _a.sent();
                        if (!vw) return [3 /*break*/, 14];
                        return [4 /*yield*/, vw.handleRenderBefore(beginStatus)];
                    case 13:
                        _a.sent();
                        _a.label = 14;
                    case 14:
                        if (!cont[route.action]) return [3 /*break*/, 18];
                        method = route.action;
                        if (!route.args) return [3 /*break*/, 16];
                        return [4 /*yield*/, cont[method].apply(cont, route.args)];
                    case 15:
                        _a.sent();
                        return [3 /*break*/, 18];
                    case 16: return [4 /*yield*/, cont[method]()];
                    case 17:
                        _a.sent();
                        _a.label = 18;
                    case 18:
                        if (!vw) return [3 /*break*/, 22];
                        if (!route.args) return [3 /*break*/, 20];
                        return [4 /*yield*/, vw.handle.apply(vw, route.args)];
                    case 19:
                        _a.sent();
                        return [3 /*break*/, 22];
                    case 20: return [4 /*yield*/, vw.handle()];
                    case 21:
                        _a.sent();
                        _a.label = 22;
                    case 22: return [4 /*yield*/, cont.handleRenderAfter(beginStatus)];
                    case 23:
                        _a.sent();
                        if (!vw) return [3 /*break*/, 25];
                        return [4 /*yield*/, vw.handleRenderAfter(beginStatus)];
                    case 24:
                        _a.sent();
                        _a.label = 25;
                    case 25: return [2 /*return*/];
                }
            });
        });
    };
    Response.renderingOnView = function (route) {
        return __awaiter(this, void 0, void 0, function () {
            var viewName, viewPath, View_, vm;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        viewName = Util_1.Util.getModuleName(route.view + "View");
                        viewPath = "app/view/" + Util_1.Util.getModulePath(route.view + "View");
                        if (!useExists(viewPath)) {
                            throw ("\"" + viewName + "\" Class is not found.");
                        }
                        View_ = use(viewPath);
                        vm = new View_[viewName]();
                        if (!(Data_1.Data.get("beforeViewPath") != viewPath)) return [3 /*break*/, 2];
                        Data_1.Data.set("beforeViewPath", viewPath);
                        if (!vm.handleBegin) return [3 /*break*/, 2];
                        return [4 /*yield*/, vm.handleBegin()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        Data_1.Data.set("beforeView", vm);
                        Data_1.Data.set("beforeController", null);
                        Data_1.Data.set("beforeControllerPath", null);
                        Data_1.Data.set("beforeControllerAction", null);
                        Data_1.Data.set("childClasss", {});
                        return [4 /*yield*/, vm.handleBefore()];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, vm.handleAfter()];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, Response.__rendering(route, vm)];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, vm.handleRenderBefore()];
                    case 6:
                        _a.sent();
                        if (!route.args) return [3 /*break*/, 8];
                        return [4 /*yield*/, vm.handle.apply(vm, route.args)];
                    case 7:
                        _a.sent();
                        return [3 /*break*/, 10];
                    case 8: return [4 /*yield*/, vm.handle()];
                    case 9:
                        _a.sent();
                        _a.label = 10;
                    case 10: return [4 /*yield*/, vm.handleRenderAfter()];
                    case 11:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Response.__rendering = function (route, context) {
        return __awaiter(this, void 0, void 0, function () {
            var beforeTemplate, templateHtml, viewHtml, viewHtml, beforeHead, headHtml, beforeHeader, headerHtml, beforeFooter, foooterHtml;
            return __generator(this, function (_a) {
                if (!context.view) {
                    if (route.controller) {
                        context.view = route.controller + "/" + route.action;
                    }
                    else if (route.view) {
                        context.view = route.view;
                    }
                }
                if (context.template) {
                    beforeTemplate = Data_1.Data.get("beforeTemplate");
                    if (beforeTemplate != context.template) {
                        Data_1.Data.set("beforeTemplate", context.template);
                        templateHtml = Response.template(context.template);
                        (0, Dom_1.Dom)("body").html = templateHtml;
                        //                await Response.loadRenderingClass("Template", context.template);
                    }
                    viewHtml = Response.view(context.view);
                    (0, Dom_1.Dom)("content").html = viewHtml;
                }
                else {
                    Data_1.Data.set("beforeTemplate", null);
                    viewHtml = Response.view(context.view);
                    (0, Dom_1.Dom)("body").html = viewHtml;
                }
                beforeHead = Data_1.Data.get("beforeHead");
                if (beforeHead != context.head) {
                    Data_1.Data.set("beforeHead", context.head);
                    if (context.head) {
                        headHtml = Response.viewPart(context.head);
                        (0, Dom_1.Dom)("head").html = headHtml;
                    }
                }
                beforeHeader = Data_1.Data.get("beforeHeader");
                if (beforeHeader != context.header) {
                    Data_1.Data.set("beforeHeader", context.header);
                    if (context.header) {
                        headerHtml = Response.viewPart(context.header);
                        (0, Dom_1.Dom)("header").html = headerHtml;
                    }
                }
                beforeFooter = Data_1.Data.get("beforeFooter");
                if (beforeFooter != context.footer) {
                    Data_1.Data.set("beforeFooter", context.footer);
                    if (context.footer) {
                        foooterHtml = Response.viewPart(context.footer);
                        (0, Dom_1.Dom)("footer").html = foooterHtml;
                    }
                }
                //      Response.setBindView();
                //        Response.setBindTemplate();
                //      Response.setBindViewPart();
                (0, Dom_1.VDom)().refresh();
                return [2 /*return*/];
            });
        });
    };
    /**
     * *** view *** :
     * Get View's content information.
     * @param {string} viewName View Name
     * @returns {string} view contents
     */
    Response.view = function (viewName) {
        var viewPath = "rendering/view/" + viewName + ".html";
        if (!useExists(viewPath)) {
            return "<div style=\"font-weight:bold;\">[Rendering ERROR] View data does not exist. Check if source file \"" + viewPath + "\" exists.</div>";
        }
        var content = use(viewPath);
        content = Util_1.Util.base64Decode(content);
        content = this.renderConvert(content);
        return content;
    };
    /**
     * ***template*** :
     * Get template content information.
     * @param {string} templateName Template Name
     * @returns {string} template contents
     */
    Response.template = function (templateName) {
        var templatePath = "rendering/template/" + templateName + ".html";
        if (!useExists(templatePath)) {
            return "<div style=\"font-weight:bold;\">[Rendering ERROR] Template data does not exist. Check if source file \"" + templatePath + "\" exists.</div>";
        }
        var content = use(templatePath);
        content = Util_1.Util.base64Decode(content);
        content = this.renderConvert(content);
        return content;
    };
    /**
     * ***viewPart*** :
     * Get viewPart content information.
     * @param {string} viewPartName ViewPart Name
     * @returns {string} viewPart contents
     */
    Response.viewPart = function (viewPartName) {
        var viewPartPath = "rendering/viewpart/" + viewPartName + ".html";
        if (!useExists(viewPartPath)) {
            return "<div style=\"font-weight:bold;\">ViewPart data does not exist. Check if source file \"" + viewPartPath + "\" exists.</div>";
        }
        var content = use(viewPartPath);
        content = Util_1.Util.base64Decode(content);
        content = this.renderConvert(content);
        var vw = document.createElement("template");
        vw.innerHTML = content;
        //        Response.setBindViewPart(vw);
        return vw.innerHTML;
    };
    Response.renderConvert = function (content) {
        var contentDom = document.createElement("div");
        contentDom.innerHTML = content;
        // link tag check...
        var links = contentDom.querySelectorAll("link");
        for (var n = 0; n < links.length; n++) {
            var link = links[n];
            var href = link.attributes["href"].value;
            if (!Util_1.Util.existPublic(href))
                continue;
            var resource = Util_1.Util.getPublic(href);
            link.setAttribute("href", resource);
        }
        // image tag check...
        var imgs = contentDom.querySelectorAll("img");
        for (var n = 0; n < imgs.length; n++) {
            var img = imgs[n];
            var src = img.attributes["src"].value;
            if (!Util_1.Util.existPublic(src))
                continue;
            var resource = Util_1.Util.getPublic(src);
            img.setAttribute("src", resource);
        }
        content = contentDom.innerHTML;
        return content;
    };
    return Response;
}());
exports.Response = Response;
;
return exports;});sfa.setFn("Routes", ()=>{var exports = {};
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Routes = exports.DecisionRouteMode = void 0;
var DecisionRouteMode;
(function (DecisionRouteMode) {
    DecisionRouteMode["Success"] = "success";
    DecisionRouteMode["Notfound"] = "notfound";
})(DecisionRouteMode || (exports.DecisionRouteMode = DecisionRouteMode = {}));
var Routes = /** @class */ (function () {
    function Routes() {
    }
    Routes.searchRoute = function (url) {
        if (url === void 0) { url = null; }
        var MyApp = use("app/config/App").MyApp;
        if (!this._routes) {
            Routes._routes = Routes.routeConvert(MyApp.routes);
        }
        var targetUrl = location.hash.substring(1);
        if (url)
            targetUrl = url;
        if (!targetUrl) {
            targetUrl = "/";
        }
        else {
            if (targetUrl != "/") {
                if (targetUrl.substring(targetUrl.length - 1) == "/") {
                    targetUrl = targetUrl.substring(0, targetUrl.length - 1);
                }
            }
        }
        Routes._decision = Routes.routeSelect(targetUrl);
        return Routes._decision;
    };
    Routes.getRoute = function () {
        return Routes._decision;
    };
    Routes.routeConvert = function (routes) {
        var res = {};
        var columns = Object.keys(routes);
        for (var n = 0; n < columns.length; n++) {
            var url = columns[n];
            var val = routes[url];
            if (typeof val == "string") {
                var vals = val.split(",");
                var buffer = {
                    controller: null,
                    view: null,
                    action: null,
                };
                for (var n2_1 = 0; n2_1 < vals.length; n2_1++) {
                    var v_ = vals[n2_1];
                    v_ = v_.trim();
                    if (v_.indexOf("controller:") === 0) {
                        buffer.controller = v_.substring("controller:".length).trim();
                    }
                    else if (v_.indexOf("c:") === 0) {
                        buffer.controller = v_.substring("c:".length).trim();
                    }
                    else if (v_.indexOf("action:") === 0) {
                        buffer.action = v_.substring("action:".length).trim();
                    }
                    else if (v_.indexOf("a:") === 0) {
                        buffer.action = v_.substring("a:".length).trim();
                    }
                    else if (v_.indexOf("view:") === 0) {
                        buffer.view = v_.substring("view:".length).trim();
                    }
                    else if (v_.indexOf("v:") === 0) {
                        buffer.view = v_.substring("v:".length).trim();
                    }
                }
                if (!buffer.controller &&
                    !buffer.view &&
                    !buffer.action) {
                    buffer.view = val;
                }
                res[url] = buffer;
            }
            else {
                var buffers = Routes.routeConvert(val);
                var columns2 = Object.keys(buffers);
                for (var n2 = 0; n2 < columns2.length; n2++) {
                    var url2 = columns2[n2];
                    var val2 = buffers[url2];
                    if (url2 == "/") {
                        url2 = "";
                    }
                    res[url + url2] = val2;
                }
            }
        }
        return res;
    };
    Routes.routeSelect = function (targetUrl) {
        var sect0 = targetUrl.split("/");
        var decision = null;
        var columns = Object.keys(this._routes);
        for (var n = 0; n < columns.length; n++) {
            var url = columns[n];
            var val = this._routes[url];
            var sect1 = url.split("/");
            var status1 = true;
            var status2 = true;
            for (var n2 = 0; n2 < sect0.length; n2++) {
                var aregment = [];
                if (!sect1[n2]) {
                    sect1[n2] = "";
                }
                if (sect0[n2] != sect1[n2]) {
                    if (sect1[n2].indexOf("{") === 0 && sect1[n2].indexOf("}") === (sect1[n2].length - 1)) {
                        if (sect1[n2].indexOf("?}") !== (sect1[n2].length - 2)) {
                            if (!sect0[n2]) {
                                status1 = false;
                            }
                        }
                    }
                    else {
                        status1 = false;
                    }
                }
            }
            for (var n2 = 0; n2 < sect1.length; n2++) {
                if (!sect0[n2]) {
                    sect0[n2] = "";
                }
                if (sect0[n2] != sect1[n2]) {
                    if (sect1[n2].indexOf("{") === 0 && sect1[n2].indexOf("}") === (sect1[n2].length - 1)) {
                        if (sect1[n2].indexOf("?}") !== (sect1[n2].length - 2)) {
                            if (!sect0[n2]) {
                                status1 = false;
                            }
                        }
                        aregment.push(sect0[n2]);
                    }
                    else {
                        status2 = false;
                    }
                }
            }
            if (status1 && status2) {
                decision = val;
                decision.aregment = aregment;
            }
        }
        var res = {};
        if (decision) {
            res = {
                url: targetUrl,
                mode: DecisionRouteMode.Success,
                controller: decision.controller,
                action: decision.action,
                args: decision.aregment,
                view: decision.view,
            };
        }
        else {
            res = {
                url: targetUrl,
                mode: DecisionRouteMode.Notfound,
            };
        }
        return res;
    };
    Routes._routes = null;
    Routes._decision = null;
    return Routes;
}());
exports.Routes = Routes;
;
return exports;});sfa.setFn("Startor", ()=>{var exports = {};
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.string = exports.Startor = void 0;
var Routes_1 = require("Routes");
var Data_1 = require("Data");
var Background_1 = require("Background");
var Response_1 = require("Response");
var Startor = /** @class */ (function () {
    function Startor() {
        var _this = this;
        (function () { return __awaiter(_this, void 0, void 0, function () {
            var route;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        window.addEventListener("click", function (e) {
                            _this.cliekHandleDelegate(e);
                        });
                        window.addEventListener("popstate", function (e) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, this.popStateHandleDelegate(e)];
                                    case 1:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        return [4 /*yield*/, Background_1.Background.load()];
                    case 1:
                        _a.sent();
                        route = Routes_1.Routes.searchRoute();
                        Response_1.Response.rendering(route);
                        return [2 /*return*/];
                }
            });
        }); })();
    }
    Startor.prototype.cliekHandleDelegate = function (e) {
        var target = e.target;
        // @ts-ignore
        if (target.localName !== "a")
            return;
        // @ts-ignore
        var href = target.getAttribute("href");
        if (!href)
            return;
        if (href.indexOf("#") !== 0)
            return;
        Data_1.Data.set("stepMode", true);
    };
    Startor.prototype.popStateHandleDelegate = function (e) {
        return __awaiter(this, void 0, void 0, function () {
            var beforeUrl, url, route;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (Data_1.Data.get("pageDisable")) {
                            beforeUrl = Data_1.Data.get("beforeUrl");
                            if (beforeUrl) {
                                history.pushState(null, null, beforeUrl);
                            }
                            else {
                                history.pushState(null, null);
                            }
                            return [2 /*return*/, false];
                        }
                        Data_1.Data.set("beforeUrl", location.hash);
                        url = location.hash.substring(1);
                        if (!url)
                            url = "/";
                        route = Routes_1.Routes.searchRoute(url);
                        return [4 /*yield*/, Response_1.Response.rendering(route)];
                    case 1:
                        _a.sent();
                        Data_1.Data.set("stepMode", false);
                        return [2 /*return*/];
                }
            });
        });
    };
    return Startor;
}());
exports.Startor = Startor;
exports.string = Startor.toString();
;
return exports;});sfa.setFn("Storage", ()=>{var exports = {};
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocalStorage = exports.SessionStorage = void 0;
var SessionStorage = /** @class */ (function () {
    function SessionStorage() {
        this.__name = "sbn_";
        var MyApp = use("app/config/App").MyApp;
        if (MyApp.sessionStorage) {
            this.__name = MyApp.sessionStorage;
        }
    }
    SessionStorage.prototype._get = function () {
        var buff = sessionStorage.getItem(this.__name);
        return JSON.parse(buff);
    };
    SessionStorage.prototype.read = function (name) {
        var buff = this._get();
        if (buff[name]) {
            return buff[name];
        }
        else {
            return buff;
        }
    };
    SessionStorage.prototype.write = function (name, value) {
        var buff = this._get();
        buff[name] = value;
        sessionStorage.setItem(this.__name, JSON.stringify(buff));
        return this;
    };
    SessionStorage.prototype.delete = function (name) {
        var buff = this._get();
        delete buff[name];
        sessionStorage.setItem(this.__name, JSON.stringify(buff));
        return this;
    };
    return SessionStorage;
}());
exports.SessionStorage = SessionStorage;
var LocalStorage = /** @class */ (function () {
    function LocalStorage() {
        this.__name = "sbn";
        var MyApp = use("app/config/App").MyApp;
        if (MyApp.localStorage) {
            this.__name = MyApp.localStorage;
        }
    }
    LocalStorage.prototype._get = function () {
        var buff = localStorage.getItem(this.__name);
        return JSON.parse(buff);
    };
    LocalStorage.prototype.read = function (name) {
        var buff = this._get();
        if (buff[name]) {
            return buff[name];
        }
        else {
            return buff;
        }
    };
    LocalStorage.prototype.write = function (name, value) {
        var buff = this._get();
        buff[name] = value;
        localStorage.setItem(this.__name, JSON.stringify(buff));
        return this;
    };
    LocalStorage.prototype.delete = function (name) {
        var buff = this._get();
        delete buff[name];
        localStorage.setItem(this.__name, JSON.stringify(buff));
        return this;
    };
    return LocalStorage;
}());
exports.LocalStorage = LocalStorage;
;
return exports;});sfa.setFn("Template", ()=>{var exports = {};
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Template = void 0;
var Template = /** @class */ (function () {
    function Template() {
    }
    return Template;
}());
exports.Template = Template;
;
return exports;});sfa.setFn("Util", ()=>{var exports = {};
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SbnDateTime = exports.Util = void 0;
var Util = /** @class */ (function () {
    function Util() {
    }
    /**
     * ***getHtml*** : Gets the prepared rendering data for each
     * @param {string} path rendering data path
     * @returns {string}
     */
    Util.getHtml = function (path) {
        var mainView = use("rendering/" + path + ".html");
        mainView = this.base64Decode(mainView);
        return mainView;
    };
    Util.existPublic = function (path) {
        return useExists("public/" + path);
    };
    /**
     * ***getPublic*** : Get prepared static content data
     * Content is retrieved in dataURL format
     * @param {string} path static content data path
     * @returns {string}
     */
    Util.getPublic = function (path) {
        return use("public/" + path);
    };
    Util.getModulePath = function (path) {
        var paths = path.split("/");
        paths.forEach(function (p_, index) {
            if (index == paths.length - 1) {
                p_ = p_.substring(0, 1).toUpperCase() + p_.substring(1);
                paths[index] = p_;
            }
        });
        return paths.join("/");
    };
    Util.getModuleName = function (string) {
        var strings = string.split("/");
        var string2 = strings[strings.length - 1];
        return string2.substring(0, 1).toUpperCase() + string2.substring(1);
    };
    /**
     * ***base64Decode*** : Decode base64 text to plaintext.
     * @param {string} b64text base64 text
     * @returns {string} plain text content
     */
    Util.base64Decode = function (b64text) {
        return decodeURIComponent(escape(atob(b64text)));
    };
    Util.uniqId = function (length) {
        if (!length)
            length = 64;
        var lbn = "0123456789ABCDEFGHIJKNLMOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        var str = "";
        for (var n = 0; n < length; n++) {
            var index = parseInt((Math.random() * 10000).toString());
            var s = lbn[index % lbn.length];
            str += s;
        }
        return str;
    };
    Util.datetime = function (datetime) {
        return new SbnDateTime(datetime);
    };
    /**
     * ***sleep*** :  Stop processing for a certain period of time.(Synchronous processing)
     * This method is synchronized by executing it with await inside the asynced function.
     *
     * Example)
     * ```typescript
     * await sleep(1000);        // <= Stop processing for 1000ms
     * ```
     * @param {number} time Stop time
     * @returns {promise<unknown>} Promise Object
     */
    Util.sleep = function (time) {
        return new Promise(function (resolve) {
            setTimeout(function () {
                resolve();
            }, time);
        });
    };
    return Util;
}());
exports.Util = Util;
var SbnDateTime = /** @class */ (function () {
    function SbnDateTime(datetime) {
        if (datetime) {
            this.d = new Date(datetime);
        }
        else {
            this.d = new Date();
        }
    }
    SbnDateTime.prototype.format = function (format) {
        if (format == undefined)
            format = "YYYY/MM/DD HH:II:SS";
        format = format.split("YYYY").join(this.getYear());
        format = format.split("MM").join(this.getMonth());
        format = format.split("DD").join(this.getDate());
        format = format.split("W").join(this.getDay());
        format = format.split("HH").join(this.getHours());
        format = format.split("II").join(this.getMinutes());
        format = format.split("SS").join(this.getSeconds());
        format = format.split("U").join(this.getTime());
        return format;
    };
    SbnDateTime.prototype.getYear = function () {
        return this.d.getFullYear().toString();
    };
    ;
    SbnDateTime.prototype.getMonth = function () {
        return ("00" + (this.d.getMonth() + 1)).slice(-2);
    };
    SbnDateTime.prototype.getDate = function () {
        return ("00" + this.d.getDate()).slice(-2);
    };
    SbnDateTime.prototype.getDay = function () {
        return this.d.getDay().toString();
    };
    SbnDateTime.prototype.getHours = function () {
        return ("00" + this.d.getHours()).slice(-2);
    };
    SbnDateTime.prototype.getMinutes = function () {
        return ("00" + this.d.getMinutes()).slice(-2);
    };
    SbnDateTime.prototype.getSeconds = function () {
        return ("00" + this.d.getSeconds()).slice(-2);
    };
    SbnDateTime.prototype.getTime = function () {
        return this.d.getTime().toString();
    };
    return SbnDateTime;
}());
exports.SbnDateTime = SbnDateTime;
;
return exports;});sfa.setFn("View", ()=>{var exports = {};
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.View = void 0;
var Routes_1 = require("Routes");
var Response_1 = require("Response");
var View = /** @class */ (function () {
    function View() {
        /**
         * ***view*** : Change the view name to be displayed.
         * If not specified, the "rendering/View/{viewName}.html" file will be displayed as the HTML source by default.
         */
        this.view = null;
        /**
         * ***template*** :
         * If you have a template HTML file, specify it here.
         */
        this.template = null;
    }
    /**
     * ***setView*** :
     * Set the page view path to display.
     * If not specified, automatically determined by "{viewName}"
     * If you use it, place the HTML file in the path "rendering/View/{viewName}.html".
     */
    View.prototype.setView = function (value) {
        this.view = value;
        var routes = Routes_1.Routes.getRoute();
        Response_1.Response.__rendering(routes, this);
    };
    /**
     * ***setTemplate*** :
     * Specifies the template name to use on the displayed page.
     * When using it, place the TML file for the template with the specified name in the "rendering/Template" directory.
     */
    View.prototype.setTemplate = function (value) {
        this.template = value;
        var routes = Routes_1.Routes.getRoute();
        Response_1.Response.__rendering(routes, this);
    };
    /**
     * ***setHead*** :
     * @param headName
     */
    View.prototype.setHead = function (headName) {
        this.head = headName;
        var routes = Routes_1.Routes.getRoute();
        Response_1.Response.__rendering(routes, this);
    };
    /**
     * ***setHeader*** :
     * @param headerName
     */
    View.prototype.setHeader = function (headerName) {
        this.header = headerName;
        var routes = Routes_1.Routes.getRoute();
        Response_1.Response.__rendering(routes, this);
    };
    /**
     * ***setFooter*** :
     * @param footerName
     */
    View.prototype.setFooter = function (footerName) {
        this.header = footerName;
        var routes = Routes_1.Routes.getRoute();
        Response_1.Response.__rendering(routes, this);
    };
    /**
     * ***handle*** :
     * An event handler that runs automatically when the view is drawn on the screen.
     * This event is executed only when rendered.
     */
    View.prototype.handle = function () {
        var aregment = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            aregment[_i] = arguments[_i];
        }
    };
    /**
     * ***handleAlways*** : An event handler that runs automatically when the View is displayed on screen.
     * This event is always executed even if the same View has already been rendered..
     */
    View.prototype.handleAlways = function () { };
    View.prototype.handleBegin = function () { };
    /**
     * ***handleBefore*** : Event handler executed just before transitioning to the page.
     */
    View.prototype.handleBefore = function (beginStatus) { };
    /**
     * ***handleAfter*** : Event handler executed immediately after transitioning to the page
     */
    View.prototype.handleAfter = function (beginStatus) { };
    /**
     * ***handleRenderBefore*** : Event handler executed immediately after page transition and rendering process to the screen is completed
     */
    View.prototype.handleRenderBefore = function (beginStatus) { };
    /**
     * ***handleRenderAfter*** : Event handler that is executed after page transition, after rendering process to the screen is completed,
     * and after the event for each action is completed.
     */
    View.prototype.handleRenderAfter = function (beginStatus) { };
    /**
     * ***handleLeave*** : Event handler executed when leaving the page.
     */
    View.prototype.handleLeave = function () { };
    return View;
}());
exports.View = View;
;
return exports;});sfa.setFn("ViewPart", ()=>{var exports = {};
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ViewPart = void 0;
var ViewPart = /** @class */ (function () {
    function ViewPart() {
    }
    return ViewPart;
}());
exports.ViewPart = ViewPart;
;
return exports;});sfa.setFn("app/Special", ()=>{var exports = {};
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Special = void 0;
var Special = /** @class */ (function () {
    function Special() {
    }
    Special.run = function () { };
    return Special;
}());
exports.Special = Special;
;
return exports;});sfa.setFn("app/config/App", ()=>{var exports = {};
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyApp = void 0;
var App_1 = require("App");
var MyApp = /** @class */ (function (_super) {
    __extends(MyApp, _super);
    function MyApp() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MyApp.routes = {
        "/": "c:main, a:index",
        "/page1": "c:main, a:page1",
        "/page2/{id}": "c:main, a:page2",
        "/page3/{id1}/{id2?": "c:main, a:page3",
        "/page4/{?id}": "c:main, a:page4",
        "/view_test": "viewTest",
    };
    return MyApp;
}(App_1.App));
exports.MyApp = MyApp;
;
return exports;});sfa.setFn("app/controller/MainController", ()=>{var exports = {};
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.MainController = void 0;
var Dom_1 = require("Dom");
var Controller_1 = require("Controller");
var Special_1 = require("app/Special");
var MainController = /** @class */ (function (_super) {
    __extends(MainController, _super);
    function MainController() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.template = "default";
        _this.head = "head";
        return _this;
    }
    MainController.prototype.handleBefore = function (beginStatus) {
        console.log("Main Controller Before .... OK");
    };
    MainController.prototype.handleAfter = function (beginStatus) {
        console.log("Main Controller After .... OK");
    };
    MainController.prototype.index = function () {
        console.log(Special_1.Special.run());
        console.log("Main Controller Index ...OK");
    };
    MainController.prototype.page1 = function () {
        var a = (0, Dom_1.VDom)("button1");
        a.on("click", function () {
            alert("Page1 Click ... OK");
        });
    };
    return MainController;
}(Controller_1.Controller));
exports.MainController = MainController;
;
return exports;});sfa.setFn("app/view/ViewTestView", ()=>{var exports = {};
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.ViewTestView = void 0;
var View_1 = require("View");
var ViewTestView = /** @class */ (function (_super) {
    __extends(ViewTestView, _super);
    function ViewTestView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.template = "default";
        _this.head = "head";
        return _this;
    }
    ViewTestView.prototype.handle = function () {
        console.log("view test ..... ok");
    };
    return ViewTestView;
}(View_1.View));
exports.ViewTestView = ViewTestView;
;
return exports;});sfa.setFn("app/Special", ()=>{var exports = {};
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Special = void 0;
var Special = /** @class */ (function () {
    function Special() {
    }
    Special.run = function () {
        return "Android Special Class ..... ok";
    };
    return Special;
}());
exports.Special = Special;
;
return exports;});sfa.setFn("rendering/template/default.html", ()=>{ return "PGhlYWRlcj5IZWFkZXIuLi48L2hlYWRlcj4KPGNvbnRlbnQ+PC9jb250ZW50Pgo8Zm9vdGVyPkZvb3Rlci4uPC9mb290ZXI+";});sfa.setFn("rendering/view/viewTest.html", ()=>{ return "PHA+VmlldyBUZXN0IFBhZ2UuLi4uLiBPSzwvcD4=";});sfa.setFn("rendering/viewpart/head.html", ()=>{ return "PHRpdGxlPkhlYWQgVGl0bGUuLi4uPC90aXRsZT4KPGxpbmsgcmVsPSJzdHlsZXNoZWV0IiBocmVmPSJjc3Mvc3R5bGUuY3NzIj4=";});sfa.setFn("rendering/view/main/index.html", ()=>{ return "PGgxPkhhbGxvIFdvcmxkISE8L2gxPgo8cD7jgojjgYbjgZPjgZ0gU2FpYmVyaWFuIOOBruS4lueVjOOBuDwvcD4KCjxpbWcgc3R5bGU9IndpZHRoOjMwMHB4IiBzcmM9ImltYWdlMS5wbmciPgo8cD48YSBocmVmPSIjL3BhZ2UxIj5QYWdlMTwvYT4=";});sfa.setFn("rendering/view/main/page1.html", ()=>{ return "PGgyPlBhZ2UxPC9oMj4KCjxwPjxhIHJlZj0iYnV0dG9uMSI+Q2xpY2sgSGVyZSE8L2E+PC9wPgo8cD48YSBocmVmPSIjL3BhZ2UyLzIyMiI+UGFnZTI8L2E+PC9wPg==";});sfa.setFn("public/image1.png", ()=>{ return "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAAEsCAYAAAB5fY51AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAIcwAACHMBXj1cIQAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAACAASURBVHic7N13fJPV/sDxz8lom3RvOoBSykZkKFsBB05wj+se161XuV73vO6f3Ou+br1uBbd4FQdLkCUgIGWWUqAUSvdKmjbJ+f2RgECfpGmbZpTzfr3yKj4neZ7TmnxznjO+BxRFURRFURRFURRFURRFURRFURRFURRFURRFURRFURRFURRFURRFURRFURRFURRFURRFURRFURRFURRFURRFURRFURRFURRFURRFURRFURRFURRFURRFURRFURRFURRFURRFURRFURRFURRFURRFURRFURRFURRFURRFURRFURRFURRFURRFURRFURRFURRFURRFURRFURRFURRFURRFURRFURRFURRFURRFURRFURRFURRFURRFURQlTIlgV0DpOqSUEUD0AYdqhRCOYNVH6XpUwFI0SSmTgQygB9AN6A5kuh9ZQDxgAGIBIxDj5XS1gAOoAZxAObAb2On+WQyUuB/FQoha//9GSlegAtZhTkoZD+QBg4ARwEDgCCA9iNWqAtYDK4F8979/F0I0BLFOSghQAeswIqU0AkcBxwLjgSNxtZzCgRMoBFYAC4FfgHwhhAxqrZSAUgGrC5NSGnAFpRNwBahjcN3KdRV1wDLgZ+BXYLkQoim4VVI6kwpYXYyUMh2Y6n6cAEQFt0YBVQV8B3wNzBZC1AW5PoqfqYDVBUgpe+EKUKcDE3F1hh/u7LhaX58CnwkhdgW5PoofdPmA5e63SXc/4gGdu8gGWHDdVhQLISzBqWH7SCmzgcuBi4EBnXGNRpuN0rIKyiurKC0rp7yyirKKSkrLKqhraKDBYsHhcGKxWLE7HFisVux2O9ZGGzHRZoQQxMZEoxM6YmLMrp/RZhLi40hJSiQ9NZmUpERSk5NJTU4kNSmJiAhjZ/wqElgKvAd8IoSo7oyLdAb3+zfN/YjANSq7T437EXbv3/bqcgFLStkbOBMYhauDOQfffs9aYAewAViHa3RqHbBVCGHvlMq2kZQyEjgDuBI4EdD747wWayPbdhRTsG07hdt3UlC0na3bd1JZFfjPdUZ6Grk9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"});sfa.setFn("public/css/style.css", ()=>{ return "data:text/css;base64,Ym9keXsKICAgIGJhY2tncm91bmQ6cmdiKDQxLCAxMTAsIDEwMSk7CiAgICBjb2xvcjojZmZmOwp9"});sfa.setFn("public/css/style.css", ()=>{ return "data:text/css;base64,Ym9keXsKICAgIGJhY2tncm91bmQ6cmdiKDIwNSwgMTA2LCA3Nik7CiAgICBjb2xvcjojZmZmOwp9"});sfa.start(()=>{ const st = use("Startor");  new st.Startor(); });