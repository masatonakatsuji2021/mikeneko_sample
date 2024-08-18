const platform = "web";
class FrontControl {
    constructor() {
        this.__fn = {};
        this.__fn_static = {};
    }
    setFn(name, callback) {
        this.__fn[name] = callback;
    }
    getFn(name) {
        if (this.__fn_static[name])
            return this.__fn_static[name];
        if (!this.__fn[name])
            throw ("No data available. Check if the file exists in the source file \"" + name + "\".");
        let buffer = this.__fn[name]();
        if (this.__fn_static[name] == undefined)
            this.__fn_static[name] = buffer;
        return buffer;
    }
    exists(name) {
        if (this.__fn_static[name])
            return true;
        if (this.__fn[name])
            return true;
        return false;
    }
    start(callback) {
        window.onload = () => {
            if (callback) {
                callback.bind(this)();
            }
            else {
                use("app/index");
            }
        };
    }
}
const use = (name) => {
    return sfa.getFn(name);
};
const useExists = (name) => {
    return sfa.exists(name);
};
// @ts-ignore
require = use;
let sfa = new FrontControl();
sfa.setFn("Ajax", ()=>{var exports = {};
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ajax = exports.AjaxMethod = void 0;
var AjaxMethod;
(function (AjaxMethod) {
    AjaxMethod["GET"] = "GET";
    AjaxMethod["POST"] = "POST";
    AjaxMethod["PUT"] = "PUT";
    AjaxMethod["DELETE"] = "DELETE";
})(AjaxMethod || (exports.AjaxMethod = AjaxMethod = {}));
class Ajax {
    static send(params) {
    }
}
exports.Ajax = Ajax;
;
return exports;});
sfa.setFn("App", ()=>{var exports = {};
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = exports.AppRouteType = void 0;
var AppRouteType;
(function (AppRouteType) {
    AppRouteType["web"] = "web";
    AppRouteType["application"] = "application";
})(AppRouteType || (exports.AppRouteType = AppRouteType = {}));
class App {
}
exports.App = App;
/**
 * ***routeType*** : Method for page transition.
 * web = Change the browser URL and move to the page. You can go back by pressing the back button on the browser.
 * application =
 */
App.routeType = AppRouteType.web;
;
return exports;});
sfa.setFn("Background", ()=>{var exports = {};
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Background = void 0;
const Util_1 = require("Util");
class Background {
    static load() {
        return __awaiter(this, void 0, void 0, function* () {
            const MyApp = use("app/config/App").MyApp;
            // background class method load.
            if (MyApp.backgrounds) {
                for (let n = 0; n < MyApp.backgrounds.length; n++) {
                    const backgroundName = Util_1.Util.getModulePath(MyApp.backgrounds[n]);
                    const backgroundPath = "app/background/" + backgroundName;
                    if (!useExists(backgroundPath))
                        continue;
                    const background = use(backgroundPath);
                    const bg = new background[backgroundName]();
                    yield bg.handle();
                }
            }
        });
    }
    /**
     * ***handle*** : A handler that is executed immediately after the application starts.
     */
    handle() { }
}
exports.Background = Background;
;
return exports;});
sfa.setFn("Controller", ()=>{var exports = {};
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Controller = void 0;
const Routes_1 = require("Routes");
const Response_1 = require("Response");
class Controller {
    constructor() {
        this.beginStatus = false;
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
    setView(viewName) {
        this.view = viewName;
        const routes = Routes_1.Routes.getRoute();
        Response_1.Response.__rendering(routes, this);
    }
    /**
     * ***setTemplate*** : Specifies the template name to use on the displayed page.
     * When using it, place the TML file for the template with the specified name in the "rendering/Template" directory.
     * @param {string} templateName template name
     * @returns {void}
    */
    setTemplate(templateName) {
        this.template = templateName;
        const routes = Routes_1.Routes.getRoute();
        Response_1.Response.__rendering(routes, this);
    }
    /**
     * ***setHead*** :
     * @param headName
     */
    setHead(headName) {
        this.head = headName;
        const routes = Routes_1.Routes.getRoute();
        Response_1.Response.__rendering(routes, this);
    }
    /**
     * ***setHeader*** :
     * @param headerName
     */
    setHeader(headerName) {
        this.header = headerName;
        const routes = Routes_1.Routes.getRoute();
        Response_1.Response.__rendering(routes, this);
    }
    /**
     * ***setFooter*** :
     * @param footerName
     */
    setFooter(footerName) {
        this.header = footerName;
        const routes = Routes_1.Routes.getRoute();
        Response_1.Response.__rendering(routes, this);
    }
    /**
     * ***handleBefore*** : Event handler executed just before transitioning to the page.
     */
    handleBefore() { }
    /**
     * ***handleAfter*** : Event handler executed immediately after transitioning to the page
     */
    handleAfter() { }
    /**
     * ***handleRenderBefore*** : Event handler executed immediately after page transition and rendering process to the screen is completed
     */
    handleRenderBefore() { }
    /**
     * ***handleRenderAfter*** : Event handler that is executed after page transition, after rendering process to the screen is completed,
     * and after the event for each action is completed.
     */
    handleRenderAfter() { }
    /**
     * ***handleLeave*** : Event handler executed when leaving the page
     * @param {string} action before access controller action name
     */
    handleLeave(action) { }
    handleTemplateChanged() { }
    handleHeadChanged() { }
    handleHeaderChanged() { }
    handleFooterChanged() { }
}
exports.Controller = Controller;
;
return exports;});
sfa.setFn("Data", ()=>{var exports = {};
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Data = void 0;
class Data {
    static get(name) {
        return this.__data[name];
    }
    static set(name, value) {
        this.__data[name] = value;
        return this;
    }
    static push(name, value) {
        if (!this.__data[name])
            this.__data[name] = [];
        this.__data[name].push(value);
        return this;
    }
    static getLength(name) {
        if (!this.__data[name])
            return;
        return this.__data[name].length;
    }
    static pop(name) {
        if (!this.__data[name])
            return this;
        this.__data[name].pop();
        return this;
    }
    static now(name) {
        if (!this.__data[name])
            return;
        const length = this.__data[name].length;
        return this.__data[name][length - 1];
    }
}
exports.Data = Data;
Data.__data = {};
;
return exports;});
sfa.setFn("Dialog", ()=>{var exports = {};
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dialog = void 0;
class Dialog {
    handle(sendData) { }
    close() {
        this.myMjs.removeClass("open");
        setTimeout(() => {
            this.myMjs.remove();
        }, 300);
    }
}
exports.Dialog = Dialog;
;
return exports;});
sfa.setFn("ModernJS", ()=>{var exports = {};
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mjs = exports.dom = exports.ModernJS = void 0;
class ModernJS {
    constructor() {
        this.els = [];
        this.childs = {};
        this.datas = {};
        this.fileBuffers = [];
    }
    static reload() {
        const c = Object.keys(this.buffers);
        for (let n = 0; n < c.length; n++) {
            const name = c[n];
            const buffer = this.buffers[name];
            buffer.els.forEach((el, index) => {
                if (!document.body.contains(el))
                    buffer.els.splice(index);
            });
            if (!buffer.els.length)
                delete this.buffers[name];
        }
        this.virtualAttributes("v", (attrValue, el) => {
            if (!this.buffers[attrValue])
                this.buffers[attrValue] = new ModernJS();
            this.buffers[attrValue].addEl(el);
        });
        return this.buffers;
    }
    static virtualAttributes(target, handler) {
        const qss = document.querySelectorAll("[" + target + "]");
        qss.forEach((el) => {
            const attrValue = el.attributes[target].value;
            el.removeAttribute(target);
            handler(attrValue, el);
        });
    }
    static create(text, tagName) {
        const mjs = new ModernJS();
        if (!tagName)
            tagName = "div";
        if (text.indexOf("<tr") === 0 || text.indexOf("<td") === 0)
            tagName = "table";
        const el = document.createElement(tagName);
        mjs.addEl(el);
        if (text)
            mjs.html = text;
        return mjs;
    }
    static dom(queryString) {
        const mjs = new ModernJS();
        const qss = document.querySelectorAll(queryString);
        qss.forEach((el) => {
            mjs.addEl(el);
        });
        return mjs;
    }
    addEl(el) {
        this.els.push(el);
        if (el.tagName != "INPUT")
            return;
        if (!el.attributes["type"])
            return;
        if (el.attributes["type"].value != "file")
            return;
        this.fileBuffers = [];
        el.addEventListener("change", (e) => {
            // @ts-ignore
            const el = e.target;
            for (let n = 0; n < el.files.length; n++) {
                const file = el.files[n];
                const reader = new FileReader();
                reader.onload = (e) => {
                    const file_ = file;
                    const content = e.target.result;
                    file_.result = content;
                    this.fileBuffers.push(file_);
                };
                reader.readAsText(file);
            }
        });
    }
    reload(context) {
        this.els.forEach((el) => {
            const qss = el.querySelectorAll("[v-child]");
            qss.forEach((el2) => {
                const vname = el2.attributes["v-child"].value;
                el2.removeAttribute("v-child");
                if (context) {
                    if (!context.childs[vname])
                        context.childs[vname] = new ModernJS();
                    context.childs[vname].parent = this;
                    context.childs[vname].addEl(el2);
                }
                else {
                    if (!this.childs[vname])
                        this.childs[vname] = new ModernJS();
                    this.childs[vname].parent = this;
                    this.childs[vname].addEl(el2);
                }
            });
        });
    }
    get length() {
        return this.els.length;
    }
    get first() {
        const mjs = new ModernJS();
        mjs.addEl(this.els[0]);
        return mjs;
    }
    get last() {
        const mjs = new ModernJS();
        mjs.addEl(this.els[this.els.length - 1]);
        return mjs;
    }
    index(index) {
        const mjs = new ModernJS();
        mjs.addEl(this.els[index]);
        return mjs;
    }
    get prev() {
        // @ts-ignore
        const prevEl = this.els[0].previousElementSibling;
        const mjs = new ModernJS();
        mjs.addEl(prevEl);
        return mjs;
    }
    get next() {
        // @ts-ignore
        const prevEl = this.els[0].nextElementSibling;
        const mjs = new ModernJS();
        mjs.addEl(prevEl);
        return mjs;
    }
    get tagName() {
        return this.els[0].tagName;
    }
    querySelector(queryString) {
        const mjs = new ModernJS();
        this.els.forEach((el) => {
            const qss = el.querySelectorAll(queryString);
            qss.forEach((qs) => {
                mjs.addEl(qs);
            });
        });
        return mjs;
    }
    set text(value) {
        this.setText(value);
    }
    get text() {
        return this.els[0].innerText;
    }
    setText(value, noReload) {
        this.els.forEach((el) => {
            el.childNodes.forEach((c) => {
                el.removeChild(c);
            });
            el.innerText = value.toString();
        });
        if (!noReload) {
            ModernJS.reload();
            this.reload();
        }
        return this;
    }
    set html(value) {
        this.setHtml(value);
    }
    get html() {
        return this.els[0].innerHTML;
    }
    setHtml(value, noReload) {
        this.els.forEach((el) => {
            el.childNodes.forEach((c) => {
                el.removeChild(c);
            });
            if (typeof value == "string") {
                el.innerHTML = value;
            }
            else if (value instanceof HTMLElement) {
                el.append(value);
            }
            else if (value instanceof ModernJS) {
                el.append(value.els[0]);
                const c = Object.keys(value.childs);
                for (let n = 0; n < c.length; n++) {
                    const cname = c[n];
                    const child = value.childs[cname];
                    this.childs[cname] = child;
                }
            }
        });
        if (!noReload) {
            ModernJS.reload();
            this.reload();
        }
        return this;
    }
    set outerHtml(value) {
        this.els.forEach((el) => {
            el.childNodes.forEach((c) => {
                el.removeChild(c);
            });
            el.outerHTML = value;
        });
        ModernJS.reload();
        this.reload();
    }
    get outerHtml() {
        return this.els[0].outerHTML;
    }
    afterBegin(value, noReload) {
        this.els.forEach((el) => {
            if (typeof value == "string") {
                el.insertAdjacentHTML("afterbegin", value);
            }
            else if (value instanceof HTMLElement) {
                el.insertAdjacentElement("afterbegin", value);
            }
            else if (value instanceof ModernJS) {
                el.insertAdjacentElement("afterbegin", value.els[0]);
                const c = Object.keys(value.childs);
                for (let n = 0; n < c.length; n++) {
                    const cname = c[n];
                    const child = value.childs[cname];
                    this.childs[cname] = child;
                }
            }
        });
        if (!noReload) {
            ModernJS.reload();
            this.reload();
        }
        return this;
    }
    append(value, noReload) {
        this.els.forEach((el) => {
            if (typeof value == "string") {
                el.insertAdjacentHTML("beforeend", value);
            }
            else if (value instanceof HTMLElement) {
                el.append(value);
            }
            else if (value instanceof ModernJS) {
                el.append(value.els[0]);
                const c = Object.keys(value.childs);
                for (let n = 0; n < c.length; n++) {
                    const cname = c[n];
                    const child = value.childs[cname];
                    this.childs[cname] = child;
                }
            }
        });
        if (!noReload) {
            ModernJS.reload();
            this.reload();
        }
        return this;
    }
    remove() {
        this.els.forEach((el) => {
            el.remove();
        });
        return this;
    }
    style(stylesheets) {
        const c = Object.keys(stylesheets);
        for (let n = 0; n < c.length; n++) {
            const name = c[n];
            const value = stylesheets[name];
            this.els.forEach((el) => {
                el.style[name] = value;
            });
        }
        return this;
    }
    getStyle(name) {
        return this.els[0].style[name];
    }
    attr(name, value) {
        if (value != undefined) {
            this.els.forEach((el) => {
                el.setAttribute(name, value.toString());
            });
            return this;
        }
        else {
            return this.els[0].attributes[name].value;
        }
    }
    removeAttr(name) {
        this.els.forEach((el) => {
            el.removeAttribute(name);
        });
        return this;
    }
    isClass(className) {
        return this.els[0].classList.contains(className);
    }
    addClass(className) {
        this.els.forEach((el) => {
            el.classList.add(className);
        });
        return this;
    }
    removeClass(className) {
        this.els.forEach((el) => {
            el.classList.remove(className);
        });
        return this;
    }
    data(name, value) {
        if (value != undefined) {
            this.datas[name] = value;
            return this;
        }
        else {
            return this.datas[name];
        }
    }
    removeData(name) {
        delete this.datas[name];
        return this;
    }
    on(event, listener, options) {
        this.els.forEach((el) => {
            const listener_ = (event) => {
                const my = new ModernJS();
                my.addEl(el);
                my.datas = this.datas;
                listener(event, my);
            };
            el.addEventListener(event, listener_, options);
        });
        return this;
    }
    set onClick(listener) {
        this.on("click", listener);
    }
    set onDblClick(listener) {
        this.on("dblclick", listener);
    }
    set onFocus(listener) {
        this.on("focus", listener);
    }
    set onChange(listener) {
        this.on("change", listener);
    }
    set onMouseDown(listener) {
        this.on("mousedown", listener);
    }
    set onMouseUp(listener) {
        this.on("mouseup", listener);
    }
    set onMouseMove(listener) {
        this.on("mousemove", listener);
    }
    dispatch(eventName) {
        this.els.forEach((el) => {
            let event = new Event(eventName);
            el.dispatchEvent(event);
        });
        return this;
    }
    get value() {
        if (!(this.tagName == "INPUT" ||
            this.tagName == "SELECT" ||
            this.tagName == "TEXTAREA"))
            return;
        // @ts-ignore
        let value;
        if (this.tagName == "INPUT") {
            if (this.attr("type") == "radio") {
                this.els.forEach((el) => {
                    if (el.checked)
                        value = el.value;
                });
            }
            else if (this.attr("type") == "checkbox") {
                let values = [];
                this.els.forEach((el) => {
                    if (el.checked)
                        values.push(el.value);
                });
                value = values;
            }
            else if (this.attr("type") == "file") {
                value = this.fileBuffers;
            }
            else {
                if (this.length > 1) {
                    let values = [];
                    this.els.forEach((el) => {
                        values.push(el.value);
                    });
                    value = values;
                }
                else {
                    // @ts-ignore
                    const el = this.els[0];
                    value = el.value;
                }
            }
        }
        else {
            if (this.length > 1) {
                let values = [];
                this.els.forEach((el) => {
                    values.push(el.value);
                });
                value = values;
            }
            else {
                // @ts-ignore
                const el = this.els[0];
                value = el.value;
            }
        }
        return value;
    }
    set value(value) {
        if (!(this.tagName == "INPUT" ||
            this.tagName == "SELECT" ||
            this.tagName == "TEXTAREA"))
            return;
        if (typeof value == "number")
            value = value.toString();
        // @ts-ignore
        if (this.tagName == "INPUT") {
            if (this.attr("type") == "radio") {
                this.els.forEach((el) => {
                    if (value === el.value)
                        el.checked = true;
                });
            }
            else if (this.attr("type") == "checkbox") {
                if (typeof value == "string")
                    value = [value];
                value.forEach((v, index) => {
                    value[index] = v.toString();
                });
                this.els.forEach((el) => {
                    // @ts-ignore
                    if (value.indexOf(el.value) > -1) {
                        el.checked = true;
                    }
                    else {
                        el.checked = false;
                    }
                });
            }
            else if (this.attr("type") == "file") {
                return;
            }
            else {
                this.els.forEach((el, index) => {
                    if (typeof value == "string") {
                        el.value = value;
                    }
                    else {
                        if (value[index]) {
                            el.value = value[index].toString();
                        }
                        else {
                            el.value = "";
                        }
                    }
                });
            }
        }
        else {
            this.els.forEach((el, index) => {
                if (typeof value == "string") {
                    el.value = value;
                }
                else {
                    if (value[index]) {
                        el.value = value[index].toString();
                    }
                    else {
                        el.value = "";
                    }
                }
            });
        }
    }
    reset() {
        if (this.tagName == "INPUT") {
            if (this.attr("type") == "radio") {
                this.els.forEach((el) => {
                    el.checked = false;
                });
            }
            else if (this.attr("type") == "checkbox") {
                this.els.forEach((el) => {
                    el.checked = false;
                });
            }
            else {
                this.els.forEach((el, index) => {
                    el.value = "";
                });
                if (this.attr("type") == "file") {
                    this.fileBuffers = [];
                }
            }
        }
        else {
            this.els.forEach((el, index) => {
                if (this.tagName == "SELECT") {
                    // @ts-ignore
                    el.selectedIndex = 0;
                }
                else {
                    el.value = "";
                }
            });
        }
        return this;
    }
    selectAddParam(params, optgroup) {
        const c = Object.keys(params);
        for (let n = 0; n < c.length; n++) {
            const value = c[n];
            const text = params[value];
            if (typeof text == "string" || typeof text == "number") {
                const optionEL = document.createElement("option");
                optionEL.value = value;
                optionEL.innerHTML = text;
                if (optgroup) {
                    optgroup.append(optionEL);
                }
                else {
                    this.append(optionEL);
                }
            }
            else {
                const optGroupEL = document.createElement("optgroup");
                optGroupEL.label = value;
                this.selectAddParam(text, optGroupEL);
                this.append(optGroupEL);
            }
        }
        return this;
    }
    selectEmpty(text) {
        const optionEl = document.createElement("option");
        optionEl.value = "";
        optionEl.innerHTML = text;
        this.els.forEach((el) => {
            el.insertAdjacentElement("afterbegin", optionEl);
        });
        return this;
    }
    selectResetParam() {
        this.text = "";
        return this;
    }
    get selectedText() {
        const values = [];
        this.els.forEach((el) => {
            const value = el.options[el.selectedIndex].text;
            values.push(value);
        });
        if (this.length > 1) {
            return values;
        }
        else {
            return values[0];
        }
    }
    get childValues() {
        const c = Object.keys(this.childs);
        let values = {};
        for (let n = 0; n < c.length; n++) {
            const name = c[n];
            const child = this.childs[name];
            values[name] = child.value;
        }
        return values;
    }
}
exports.ModernJS = ModernJS;
ModernJS.buffers = {};
exports.dom = ModernJS.dom;
exports.mjs = ModernJS.reload;
;
return exports;});
sfa.setFn("Exception", ()=>{var exports = {};
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Exception = void 0;
const View_1 = require("View");
class Exception extends View_1.View {
    constructor() {
        super(...arguments);
        this.view = "exception";
    }
    /**
     * ***handle*** :
     * Event handler when an error occurs.
     * @param {Exception} exception Error Exception
     * @returns {void}
    */
    handle(exception) { }
}
exports.Exception = Exception;
;
return exports;});
sfa.setFn("KeyEvent", ()=>{var exports = {};
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeyEvent = void 0;
class KeyEvent {
    constructor() {
        this._callback_down = {};
        this._callback_up = {};
        const cont = this;
        document.addEventListener("keydown", function (e) {
            let keyCode = e.code;
            if (cont._callback_down[keyCode]) {
                cont._callback_down[keyCode](e);
            }
        });
        document.addEventListener("keyup", function (e) {
            let keyCode = e.code;
            if (cont._callback_up[keyCode]) {
                cont._callback_up[keyCode](e);
            }
        });
    }
    on(fullKeyName, keyDownCallback, keyUpCallback) {
        this._callback_down[fullKeyName] = keyDownCallback;
        if (keyUpCallback) {
            this._callback_up[fullKeyName] = keyUpCallback;
        }
        return this;
    }
    onArrowUp(keyDownCallback, keyUpCallback) {
        return this.on("ArrowUp", keyDownCallback, keyUpCallback);
    }
    onArrowDown(keyDownCallback, keyUpCallback) {
        return this.on("ArrowDown", keyDownCallback, keyUpCallback);
    }
    onArrowLeft(keyDownCallback, keyUpCallback) {
        return this.on("ArrowLeft", keyDownCallback, keyUpCallback);
    }
    onArrowRight(keyDownCallback, keyUpCallback) {
        return this.on("ArrowRight", keyDownCallback, keyUpCallback);
    }
    onEnter(keyDownCallback, keyUpCallback) {
        return this.on("Enter", keyDownCallback, keyUpCallback);
    }
    onSpace(keyDownCallback, keyUpCallback) {
        return this.on("Space", keyDownCallback, keyUpCallback);
    }
    onChar(keyword, keyDownCallback, keyUpCallback) {
        return this.on("Key" + keyword, keyDownCallback, keyUpCallback);
    }
    onNumber(number, keyDownCallback, keyUpCallback) {
        return this.on("Number" + number, keyDownCallback, keyUpCallback);
    }
}
exports.KeyEvent = KeyEvent;
;
return exports;});
sfa.setFn("Response", ()=>{var exports = {};
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Response = void 0;
const App_1 = require("App");
const Routes_1 = require("Routes");
const Util_1 = require("Util");
const Data_1 = require("Data");
const UI_1 = require("UI");
const ModernJS_1 = require("ModernJS");
const Shortcode_1 = require("Shortcode");
const Dialog_1 = require("Dialog");
class Response {
    static back() {
        const MyApp = require("app/config/App").MyApp;
        if (MyApp.routeType == App_1.AppRouteType.application) {
            if (Data_1.Data.getLength("history") == 1)
                return false;
            Data_1.Data.pop("history");
            const backUrl = Data_1.Data.now("history");
            const route = Routes_1.Routes.searchRoute(backUrl);
            Response.rendering(route).then(() => {
                Data_1.Data.set("stepMode", false);
            });
        }
        else if (MyApp.routeType == App_1.AppRouteType.web) {
            history.back();
        }
        return true;
    }
    static next(url, send) {
        const MyApp = require("app/config/App").MyApp;
        if (MyApp.routeType == App_1.AppRouteType.application) {
            Data_1.Data.set("stepMode", true);
            Data_1.Data.push("history", url);
            const route = Routes_1.Routes.searchRoute(url);
            Response.rendering(route, send).then(() => {
                Data_1.Data.set("stepMode", false);
            });
        }
        else {
            location.hash = "#" + url;
        }
    }
    static historyClear() {
        Data_1.Data.set("history", []);
    }
    static isNext() {
        if (Data_1.Data.get("stepMode"))
            return true;
        return false;
    }
    static isBack() {
        return !this.isNext();
    }
    static rendering(route, send) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Controller & View Leave 
                const befCont = Data_1.Data.get("beforeController");
                if (befCont) {
                    yield befCont.handleLeave(Data_1.Data.get("beforeControllerAction"));
                }
                const befView = Data_1.Data.get("beforeView");
                if (befView)
                    yield befView.handleLeave();
                if (route.mode == Routes_1.DecisionRouteMode.Notfound)
                    throw ("Page Not found");
                if (route.controller) {
                    yield Response.renderingOnController(route, send);
                }
                else if (route.view) {
                    yield Response.renderingOnView(route, send);
                }
            }
            catch (error) {
                console.error(error);
            }
        });
    }
    static renderingOnController(route, send) {
        return __awaiter(this, void 0, void 0, function* () {
            const controllerName = Util_1.Util.getModuleName(route.controller + "Controller");
            const controllerPath = "app/controller/" + Util_1.Util.getModulePath(route.controller + "Controller");
            if (!useExists(controllerPath)) {
                throw ("\"" + controllerPath + "\" Class is not found.");
            }
            const controllerClass = use(controllerPath);
            const cont = new controllerClass[controllerName]();
            cont.sendData = send;
            const viewName = route.action + "View";
            const viewPath = "app/view/" + route.controller + "/" + Util_1.Util.getModulePath(viewName);
            let vw;
            if (useExists(viewPath)) {
                const View_ = use(viewPath);
                if (!View_[Util_1.Util.getModuleName(viewName)]) {
                    console.error("[WARM] \"" + Util_1.Util.getModuleName(viewName) + "\"View Class not exists.");
                }
                else {
                    vw = new View_[Util_1.Util.getModuleName(viewName)]();
                    vw.sendData = send;
                }
            }
            if (Data_1.Data.get("beforeControllerPath") != controllerPath) {
                Data_1.Data.set("beforeControllerPath", controllerPath);
                cont.beginStatus = true;
            }
            yield cont.handleBefore();
            if (vw)
                yield vw.handleBefore();
            Data_1.Data.set("beforeController", cont);
            Data_1.Data.set("beforeControllerAction", route.action);
            Data_1.Data.set("beforeView", null);
            Data_1.Data.set("beforeViewPath", null);
            Data_1.Data.set("childClasss", {});
            if (cont["before_" + route.action]) {
                const method = "before_" + route.action;
                if (route.args) {
                    yield cont[method](...route.args);
                }
                else {
                    yield cont[method]();
                }
            }
            yield cont.handleAfter();
            if (vw)
                yield vw.handleAfter();
            yield Response.__rendering(route, cont);
            yield cont.handleRenderBefore();
            if (vw)
                yield vw.handleRenderBefore();
            if (cont[route.action]) {
                const method = route.action;
                if (route.args) {
                    yield cont[method](...route.args);
                }
                else {
                    yield cont[method]();
                }
            }
            if (vw) {
                if (route.args) {
                    yield vw.handle(...route.args);
                }
                else {
                    yield vw.handle();
                }
            }
            yield cont.handleRenderAfter();
            if (vw)
                yield vw.handleRenderAfter();
        });
    }
    static renderingOnView(route, send) {
        return __awaiter(this, void 0, void 0, function* () {
            const viewName = Util_1.Util.getModuleName(route.view + "View");
            const viewPath = "app/view/" + Util_1.Util.getModulePath(route.view + "View");
            if (!useExists(viewPath)) {
                throw ("\"" + viewName + "\" Class is not found.");
            }
            const View_ = use(viewPath);
            const vm = new View_[viewName]();
            vm.sendData = send;
            if (Data_1.Data.get("beforeViewPath") != viewPath) {
                Data_1.Data.set("beforeViewPath", viewPath);
                if (vm.handleBegin)
                    yield vm.handleBegin();
            }
            Data_1.Data.set("beforeView", vm);
            Data_1.Data.set("beforeController", null);
            Data_1.Data.set("beforeControllerPath", null);
            Data_1.Data.set("beforeControllerAction", null);
            Data_1.Data.set("childClasss", {});
            yield vm.handleBefore();
            yield vm.handleAfter();
            yield Response.__rendering(route, vm);
            yield vm.handleRenderBefore();
            if (route.args) {
                yield vm.handle(...route.args);
            }
            else {
                yield vm.handle();
            }
            yield vm.handleRenderAfter();
        });
    }
    static __rendering(route, context) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!context.view) {
                if (route.controller) {
                    context.view = route.controller + "/" + route.action;
                }
                else if (route.view) {
                    context.view = route.view;
                }
            }
            if (context.template) {
                const beforeTemplate = Data_1.Data.get("beforeTemplate");
                if (beforeTemplate != context.template) {
                    // Template Rendering...
                    Data_1.Data.set("beforeTemplate", context.template);
                    this.bindTemplate((0, ModernJS_1.dom)("body"), context.template);
                    context.mjs = ModernJS_1.ModernJS.reload();
                    if (context.handleTemplateChanged)
                        yield context.handleTemplateChanged();
                }
            }
            else {
                Data_1.Data.set("beforeTemplate", null);
            }
            // View Rendering...
            const viewHtml = Response.view(context.view);
            if (!(0, ModernJS_1.dom)("main").length)
                (0, ModernJS_1.dom)("body").append("<main></main>");
            (0, ModernJS_1.dom)("main").html = "<article>" + viewHtml + "</article>";
            context.mjs = ModernJS_1.ModernJS.reload();
            const beforeHead = Data_1.Data.get("beforeHead");
            if (beforeHead != context.head) {
                Data_1.Data.set("beforeHead", context.head);
                if (context.head) {
                    this.bindUI((0, ModernJS_1.dom)("head"), context.head);
                    context.mjs = ModernJS_1.ModernJS.reload();
                    if (context.handleHeadChanged)
                        yield context.handleHeadChanged();
                }
                else {
                    (0, ModernJS_1.dom)("head").html = "";
                    context.mjs = ModernJS_1.ModernJS.reload();
                }
            }
            const beforeHeader = Data_1.Data.get("beforeHeader");
            if (beforeHeader != context.header) {
                Data_1.Data.set("beforeHeader", context.header);
                if (context.header) {
                    this.bindUI((0, ModernJS_1.dom)("header"), context.header);
                    context.mjs = ModernJS_1.ModernJS.reload();
                    if (context.handleHeaderChanged)
                        yield context.handleHeaderChanged();
                }
                else {
                    (0, ModernJS_1.dom)("header").html = "";
                    context.mjs = ModernJS_1.ModernJS.reload();
                }
            }
            const beforeFooter = Data_1.Data.get("beforeFooter");
            if (beforeFooter != context.footer) {
                Data_1.Data.set("beforeFooter", context.footer);
                if (context.footer) {
                    this.bindUI((0, ModernJS_1.dom)("footer"), context.footer);
                    context.mjs = ModernJS_1.ModernJS.reload();
                    if (context.handleFooterChanged)
                        yield context.handleFooterChanged();
                }
                else {
                    (0, ModernJS_1.dom)("footer").html = "";
                    context.mjs = ModernJS_1.ModernJS.reload();
                }
            }
        });
    }
    /**
     * ***renderHtml** : Get Rendering HTML content information.
     * @param {string} renderName rendering html Name
     * @returns {string}
     */
    static renderHtml(renderName) {
        const renderPath = "rendering/" + renderName + ".html";
        if (!useExists(renderPath)) {
            console.error("[Rendering ERROR] Rendering data does not exist. Check if source file \"" + renderPath + "\" exists.");
            return;
        }
        let content = use(renderPath);
        content = Util_1.Util.base64Decode(content);
        content = this.renderConvert(content);
        ;
        return content;
    }
    /**
     * *** view *** : Get View's content information.
     * @param {string} viewName View Name
     * @returns {string} view contents
     */
    static view(viewName) {
        return this.renderHtml("view/" + viewName);
    }
    /**
     * ***bindView***
     * @param mjs
     * @param viewName
     * @param sendData
     * @returns
     */
    static bindView(mjs, viewName, sendData) {
        mjs.html = this.view(viewName);
        mjs.reload();
        return this.loadClass("View", viewName, mjs, sendData);
    }
    /**
     * ***template*** :
     * Get template content information.
     * @param {string} templateName Template Name
     * @returns {string} template contents
     */
    static template(templateName) {
        return this.renderHtml("template/" + templateName);
    }
    /**
     * ***bindTemplate***
     * @param mjs
     * @param templateName
     * @param sendData
    * @returns
     */
    static bindTemplate(mjs, templateName, sendData) {
        mjs.html = this.template(templateName);
        mjs.reload();
        return this.loadClass("Template", templateName, mjs, sendData);
    }
    /**
     * ***UI*** :
     * Get UI content information.
     * @param {string} uiName UI Name
     * @returns {string} UI contents
     */
    static UI(uiName) {
        return this.renderHtml("ui/" + uiName);
    }
    /**
     * ***bindUI***
     * @param mjs
     * @param UIName
     * @param sendData
     * @returns
     */
    static bindUI(mjs, UIName, sendData) {
        mjs.html = this.UI(UIName);
        mjs.reload();
        return this.loadClass("UI", UIName, mjs, sendData);
    }
    /**
     * ***appendUI***
     * @param mjs
     * @param UIName
     * @param sendData
     * @returns
     */
    static appendUI(mjs, UIName, sendData) {
        mjs.append(this.UI(UIName), true);
        const myMjs = new ModernJS_1.ModernJS();
        mjs.reload(myMjs);
        return this.loadClass("UI", UIName, myMjs, sendData);
    }
    /**
     * ***dialog***
     * @param dialogName
     * @returns
     */
    static dialog(dialogName) {
        return this.renderHtml("dialog/" + dialogName);
    }
    /**
     * ***openDialog***
     * @param dialogName
     * @param option
     * @returns
     */
    static openDialog(dialogName, option) {
        if (!option)
            option = {};
        this.setDialogCss();
        const dialogStr = "<dwindow>" + this.dialog(dialogName) + "</dwindow>";
        const dialogMjs = ModernJS_1.ModernJS.create(dialogStr, "dialog");
        if (option.class) {
            if (typeof option.class == "string")
                option.class = [option.class];
            option.class.forEach((c) => {
                dialogMjs.addClass(c);
            });
        }
        (0, ModernJS_1.dom)("body").append(dialogMjs);
        setTimeout(() => {
            dialogMjs.addClass("open");
        }, 100);
        let dialog = this.loadClass("Dialog", dialogName, dialogMjs, option.sendData);
        if (!dialog) {
            dialog = new Dialog_1.Dialog();
            dialog.myMjs = dialogMjs;
            dialog.mjs = dialogMjs.childs;
        }
        if (option.handle)
            option.handle(dialog);
        return dialog;
    }
    static openDialogOrigin(dialogHtml, option) {
        if (!option)
            option = {};
        this.setDialogCss();
        const dialogStr = "<dwindow>" + dialogHtml + "</dwindow>";
        const dialogMjs = ModernJS_1.ModernJS.create(dialogStr, "dialog");
        if (option.class) {
            if (typeof option.class == "string")
                option.class = [option.class];
            option.class.forEach((c) => {
                dialogMjs.addClass(c);
            });
        }
        (0, ModernJS_1.dom)("body").append(dialogMjs);
        setTimeout(() => {
            dialogMjs.addClass("open");
        }, 100);
        let dialog = new Dialog_1.Dialog();
        dialog.myMjs = dialogMjs;
        dialog.mjs = dialogMjs.childs;
        if (option.handle)
            option.handle(dialog);
        return dialog;
    }
    static setDialogCss() {
        if ((0, ModernJS_1.dom)("head").querySelector("link[m=dl]").length > 0)
            return;
        const style = require("CORERES/dialog/style.css");
        (0, ModernJS_1.dom)("head").afterBegin("<link rel=\"stylesheet\" m=\"dl\" href=\"data:text/css;base64," + style + "\">");
    }
    static loadClass(classType, loadClassName, mjs, sendData) {
        const className = Util_1.Util.getModuleName(loadClassName + classType);
        const classPath = Util_1.Util.getModulePath("app/" + classType.toLowerCase() + "/" + loadClassName + classType);
        let classObj;
        try {
            const classObj_ = require(classPath);
            classObj = new classObj_[className]();
            classObj.myMjs = mjs;
            classObj.mjs = mjs.childs;
        }
        catch (error) {
            if (classType == "UI") {
                classObj = new UI_1.UI();
                classObj.myMjs = mjs;
                classObj.mjs = mjs.childs;
            }
            else if (classType == "Dialog") {
                classObj = new Dialog_1.Dialog();
                classObj.myMjs = mjs;
                classObj.mjs = mjs.childs;
            }
            return classObj;
        }
        if (classObj.handle)
            classObj.handle(sendData);
        return classObj;
    }
    static renderConvert(content) {
        let tagName = "div";
        if (content.indexOf("<tr") === 0 || content.indexOf("<td") === 0)
            tagName = "tbody";
        let el0 = document.createElement(tagName);
        el0.innerHTML = content;
        // link tag check...
        const links = el0.querySelectorAll("link");
        links.forEach((el) => {
            const href = el.attributes["href"].value;
            if (!Util_1.Util.existResource(href))
                return;
            const resource = Util_1.Util.getResourceDataUrl(href);
            el.setAttribute("href", resource);
        });
        // image tag check...
        const imgs = el0.querySelectorAll("img");
        imgs.forEach((el) => {
            const src = el.attributes["src"].value;
            if (!Util_1.Util.existResource(src))
                return;
            const resource = Util_1.Util.getResourceDataUrl(src);
            el.setAttribute("src", resource);
        });
        // shortcode analysis
        el0.innerHTML = Shortcode_1.Shortcode.analysis(el0.innerHTML);
        return el0.innerHTML;
    }
}
exports.Response = Response;
;
return exports;});
sfa.setFn("Routes", ()=>{var exports = {};
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Routes = exports.DecisionRouteMode = void 0;
var DecisionRouteMode;
(function (DecisionRouteMode) {
    DecisionRouteMode["Success"] = "success";
    DecisionRouteMode["Notfound"] = "notfound";
})(DecisionRouteMode || (exports.DecisionRouteMode = DecisionRouteMode = {}));
class Routes {
    static searchRoute(url = null) {
        const MyApp = use("app/config/App").MyApp;
        if (!this._routes) {
            Routes._routes = Routes.routeConvert(MyApp.routes);
        }
        let targetUrl = location.hash.substring(1);
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
    }
    static getRoute() {
        return Routes._decision;
    }
    static routeConvert(routes) {
        let res = {};
        var columns = Object.keys(routes);
        for (var n = 0; n < columns.length; n++) {
            let url = columns[n];
            let val = routes[url];
            if (typeof val == "string") {
                let vals = val.split(",");
                let buffer = {
                    controller: null,
                    view: null,
                    action: null,
                };
                for (let n2 = 0; n2 < vals.length; n2++) {
                    let v_ = vals[n2];
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
    }
    static routeSelect(targetUrl) {
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
        let res = {};
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
    }
}
exports.Routes = Routes;
Routes._routes = null;
Routes._decision = null;
;
return exports;});
sfa.setFn("Startor", ()=>{var exports = {};
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.string = exports.Startor = void 0;
const App_1 = require("App");
const Routes_1 = require("Routes");
const Util_1 = require("Util");
const Data_1 = require("Data");
const Background_1 = require("Background");
const Response_1 = require("Response");
const Shortcode_1 = require("Shortcode");
class Startor {
    constructor() {
        const MyApp = require("app/config/App");
        if (!MyApp) {
            throw Error("App Class is not found.");
        }
        if (!MyApp.MyApp) {
            throw Error("App Class is not found.");
        }
        this.MyApp = MyApp.MyApp;
        this.setShortcode();
        (() => __awaiter(this, void 0, void 0, function* () {
            window.addEventListener("click", (e) => {
                return this.clickHandleDelegate(e);
            });
            window.addEventListener("popstate", (e) => __awaiter(this, void 0, void 0, function* () {
                yield this.popStateHandleDelegate(e);
            }));
            if (this.MyApp.routeType == App_1.AppRouteType.application)
                Data_1.Data.push("history", "/");
            yield Background_1.Background.load();
            var route = Routes_1.Routes.searchRoute();
            Response_1.Response.rendering(route);
        }))();
    }
    clickHandleDelegate(e) {
        // @ts-ignore
        let target = e.target;
        for (let n = 0; n < 10; n++) {
            if (!target.tagName)
                return;
            if (target.tagName == "A")
                break;
            // @ts-ignore
            target = target.parentNode;
        }
        if (!target.attributes)
            return;
        if (!target.attributes["url"])
            return;
        // @ts-ignore
        let url = target.getAttribute("url");
        if (!url)
            return;
        if (this.MyApp.routeType == App_1.AppRouteType.application) {
            e.preventDefault();
            Data_1.Data.set("stepMode", true);
            Data_1.Data.push("history", url);
            const route = Routes_1.Routes.searchRoute(url);
            Response_1.Response.rendering(route).then(() => {
                Data_1.Data.set("stepMode", false);
            });
            return false;
        }
        else {
            Data_1.Data.set("stepMode", true);
            return true;
        }
    }
    popStateHandleDelegate(e) {
        return __awaiter(this, void 0, void 0, function* () {
            if (Data_1.Data.get("pageDisable")) {
                const beforeUrl = Data_1.Data.get("beforeUrl");
                if (beforeUrl) {
                    history.pushState(null, null, beforeUrl);
                }
                else {
                    history.pushState(null, null);
                }
                return false;
            }
            Data_1.Data.set("beforeUrl", location.hash);
            let url = location.hash.substring(1);
            if (!url)
                url = "/";
            const route = Routes_1.Routes.searchRoute(url);
            yield Response_1.Response.rendering(route);
            Data_1.Data.set("stepMode", false);
        });
    }
    setShortcode() {
        Shortcode_1.Shortcode.add("rendering", (args) => {
            if (!args.path)
                return;
            return Response_1.Response.renderHtml(args.path);
        });
        Shortcode_1.Shortcode.add("view", (args) => {
            if (!args.path)
                return;
            return Response_1.Response.view(args.path);
        });
        Shortcode_1.Shortcode.add("ui", (args) => {
            if (!args.path)
                return;
            return Response_1.Response.UI(args.path);
        });
        Shortcode_1.Shortcode.add("template", (args) => {
            if (!args.path)
                return;
            return Response_1.Response.template(args.path);
        });
        Shortcode_1.Shortcode.add("resource", (args) => {
            if (!args.url)
                return;
            return Util_1.Util.getResource(args.url);
        });
        Shortcode_1.Shortcode.add("resource_dataurl", (args) => {
            if (!args.url)
                return;
            return Util_1.Util.getResourceDataUrl(args.url);
        });
        Shortcode_1.Shortcode.add("resource_mimtype", (args) => {
            if (!args.url)
                return;
            return Util_1.Util.getResourceMimeType(args.url);
        });
        Shortcode_1.Shortcode.add("uniqId", (args) => {
            if (!args.length)
                args.length = "";
            return Util_1.Util.uniqId(parseInt(args.length));
        });
    }
}
exports.Startor = Startor;
exports.string = Startor.toString();
;
return exports;});
sfa.setFn("Storage", ()=>{var exports = {};
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocalStorage = exports.SessionStorage = void 0;
class SessionStorage {
    constructor() {
        this.__name = "sbn_";
        const MyApp = use("app/config/App").MyApp;
        if (MyApp.sessionStorage) {
            this.__name = MyApp.sessionStorage;
        }
    }
    _get() {
        var buff = sessionStorage.getItem(this.__name);
        return JSON.parse(buff);
    }
    read(name) {
        var buff = this._get();
        if (buff[name]) {
            return buff[name];
        }
        else {
            return buff;
        }
    }
    write(name, value) {
        var buff = this._get();
        buff[name] = value;
        sessionStorage.setItem(this.__name, JSON.stringify(buff));
        return this;
    }
    delete(name) {
        var buff = this._get();
        delete buff[name];
        sessionStorage.setItem(this.__name, JSON.stringify(buff));
        return this;
    }
}
exports.SessionStorage = SessionStorage;
class LocalStorage {
    constructor() {
        this.__name = "sbn";
        const MyApp = use("app/config/App").MyApp;
        if (MyApp.localStorage) {
            this.__name = MyApp.localStorage;
        }
    }
    _get() {
        var buff = localStorage.getItem(this.__name);
        return JSON.parse(buff);
    }
    read(name) {
        var buff = this._get();
        if (buff[name]) {
            return buff[name];
        }
        else {
            return buff;
        }
    }
    write(name, value) {
        var buff = this._get();
        buff[name] = value;
        localStorage.setItem(this.__name, JSON.stringify(buff));
        return this;
    }
    delete(name) {
        var buff = this._get();
        delete buff[name];
        localStorage.setItem(this.__name, JSON.stringify(buff));
        return this;
    }
}
exports.LocalStorage = LocalStorage;
;
return exports;});
sfa.setFn("Shortcode", ()=>{var exports = {};
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Shortcode = void 0;
class Shortcode {
    static add(name, handle) {
        this.shortCodes[name] = handle;
    }
    static getHandle(name) {
        return this.shortCodes[name];
    }
    static analysis(codeString) {
        const regex = /\[short_(.*?)\]/g;
        const matchs = codeString.match(regex);
        if (!matchs)
            return codeString;
        matchs.forEach((match) => {
            const match_ = match.substring("[short_".length, match.length - 1);
            const ms = match_.split(",");
            let name;
            let args = {};
            for (let n = 0; n < ms.length; n++) {
                const ms_ = ms[n];
                if (n == 0) {
                    name = ms_;
                    continue;
                }
                const ms__ = ms_.split("=");
                const field = ms__[0].trim();
                const value = ms__[1].trim();
                args[field] = value;
            }
            if (!this.shortCodes[name])
                return;
            let result = this.shortCodes[name](args);
            if (!result)
                result = "";
            codeString = codeString.split(match).join(result);
        });
        return codeString;
    }
}
exports.Shortcode = Shortcode;
Shortcode.shortCodes = {};
;
return exports;});
sfa.setFn("Template", ()=>{var exports = {};
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Template = void 0;
class Template {
    handle(sendData) { }
}
exports.Template = Template;
;
return exports;});
sfa.setFn("Util", ()=>{var exports = {};
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SbnDateTime = exports.Util = void 0;
const Shortcode_1 = require("Shortcode");
class Util {
    /**
     * ***existResource** :Determine whether resource data exists in the specified path.
     * @param {string} path
     * @returns
     */
    static existResource(path) {
        return useExists("resource/" + path);
    }
    /**
     * ***getResource*** : Get prepared static content data
     * Content is retrieved in dataURL format
     * @param {string} path static content data path
     * @returns {string}
     */
    static getResource(path) {
        const data = use("resource/" + path);
        const datas = data.split("|");
        const mimeType = datas[0];
        let content = datas[1];
        content = this.base64Decode(content);
        if (mimeType == "text/css" ||
            mimeType == "text/plain" ||
            mimeType == "text/html" ||
            mimeType == "application/json" ||
            mimeType == "text/javascript") {
            content = Shortcode_1.Shortcode.analysis(content);
        }
        return content;
    }
    /**
     * ***getResourceDataUrl*** :
     * @param path
     * @returns
     */
    static getResourceDataUrl(path) {
        const data = use("resource/" + path);
        const datas = data.split("|");
        const mimeType = datas[0];
        let content = datas[1];
        if (mimeType == "text/css" ||
            mimeType == "text/plain" ||
            mimeType == "text/html" ||
            mimeType == "application/json" ||
            mimeType == "text/javascript") {
            content = this.base64Decode(content);
            content = Shortcode_1.Shortcode.analysis(content);
            content = this.base64Encode(content);
        }
        return "data:" + mimeType + ";base64," + content;
    }
    /**
     * ***getResourceMimeType*** :
     * @param path
     * @returns
     */
    static getResourceMimeType(path) {
        const data = use("resource/" + path);
        return data.split("|")[0];
    }
    static getModulePath(path) {
        const paths = path.split("/");
        paths.forEach((p_, index) => {
            if (index == paths.length - 1) {
                p_ = p_.substring(0, 1).toUpperCase() + p_.substring(1);
                paths[index] = p_;
            }
        });
        return paths.join("/");
    }
    static getModuleName(string) {
        const strings = string.split("/");
        const string2 = strings[strings.length - 1];
        return string2.substring(0, 1).toUpperCase() + string2.substring(1);
    }
    /**
     * ***base64Decode*** : Decode base64 text to plaintext.
     * @param {string} b64text base64 text
     * @returns {string} plain text content
     */
    static base64Decode(b64text) {
        return decodeURIComponent(escape(atob(b64text)));
    }
    /**
     * ***base64Encode*** :  Encode the text to base64 format.
     * @param {string} text text content
     * @returns {string} base64 encode content
     */
    static base64Encode(text) {
        return btoa(unescape(encodeURIComponent(text)));
    }
    static uniqId(length) {
        if (!length)
            length = 64;
        const lbn = "0123456789ABCDEFGHIJKNLMOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        let str = "";
        for (var n = 0; n < length; n++) {
            let index = parseInt((Math.random() * 10000).toString());
            let s = lbn[index % lbn.length];
            str += s;
        }
        return str;
    }
    static datetime(datetime) {
        return new SbnDateTime(datetime);
    }
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
    static sleep(time) {
        return new Promise(function (resolve) {
            setTimeout(function () {
                resolve();
            }, time);
        });
    }
    static importResourceScript(scriptName, resultVars) {
        let script = this.getResource(scriptName);
        if (resultVars) {
            if (typeof resultVars == "string")
                resultVars = [resultVars];
            script += "\n evalRes = {" + resultVars.join(",") + "};";
        }
        let evalRes;
        eval(script);
        return evalRes;
    }
}
exports.Util = Util;
class SbnDateTime {
    constructor(datetime) {
        if (datetime) {
            this.d = new Date(datetime);
        }
        else {
            this.d = new Date();
        }
    }
    format(format) {
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
    }
    getYear() {
        return this.d.getFullYear().toString();
    }
    ;
    getMonth() {
        return ("00" + (this.d.getMonth() + 1)).slice(-2);
    }
    getDate() {
        return ("00" + this.d.getDate()).slice(-2);
    }
    getDay() {
        return this.d.getDay().toString();
    }
    getHours() {
        return ("00" + this.d.getHours()).slice(-2);
    }
    getMinutes() {
        return ("00" + this.d.getMinutes()).slice(-2);
    }
    getSeconds() {
        return ("00" + this.d.getSeconds()).slice(-2);
    }
    getTime() {
        return this.d.getTime().toString();
    }
}
exports.SbnDateTime = SbnDateTime;
;
return exports;});
sfa.setFn("View", ()=>{var exports = {};
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.View = void 0;
const Routes_1 = require("Routes");
const Response_1 = require("Response");
class View {
    constructor() {
        this.beginStatus = false;
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
    setView(value) {
        this.view = value;
        const routes = Routes_1.Routes.getRoute();
        Response_1.Response.__rendering(routes, this);
    }
    /**
     * ***setTemplate*** :
     * Specifies the template name to use on the displayed page.
     * When using it, place the TML file for the template with the specified name in the "rendering/Template" directory.
     */
    setTemplate(value) {
        this.template = value;
        const routes = Routes_1.Routes.getRoute();
        Response_1.Response.__rendering(routes, this);
    }
    /**
     * ***setHead*** :
     * @param headName
     */
    setHead(headName) {
        this.head = headName;
        const routes = Routes_1.Routes.getRoute();
        Response_1.Response.__rendering(routes, this);
    }
    /**
     * ***setHeader*** :
     * @param headerName
     */
    setHeader(headerName) {
        this.header = headerName;
        const routes = Routes_1.Routes.getRoute();
        Response_1.Response.__rendering(routes, this);
    }
    /**
     * ***setFooter*** :
     * @param footerName
     */
    setFooter(footerName) {
        this.header = footerName;
        const routes = Routes_1.Routes.getRoute();
        Response_1.Response.__rendering(routes, this);
    }
    /**
     * ***handle*** :
     * An event handler that runs automatically when the view is drawn on the screen.
     * This event is executed only when rendered.
     */
    handle(...aregment) { }
    /**
     * ***handleAlways*** : An event handler that runs automatically when the View is displayed on screen.
     * This event is always executed even if the same View has already been rendered..
     */
    handleAlways() { }
    handleBegin() { }
    /**
     * ***handleBefore*** : Event handler executed just before transitioning to the page.
     */
    handleBefore(beginStatus) { }
    /**
     * ***handleAfter*** : Event handler executed immediately after transitioning to the page
     */
    handleAfter(beginStatus) { }
    /**
     * ***handleRenderBefore*** : Event handler executed immediately after page transition and rendering process to the screen is completed
     */
    handleRenderBefore(beginStatus) { }
    /**
     * ***handleRenderAfter*** : Event handler that is executed after page transition, after rendering process to the screen is completed,
     * and after the event for each action is completed.
     */
    handleRenderAfter(beginStatus) { }
    /**
     * ***handleLeave*** : Event handler executed when leaving the page.
     */
    handleLeave() { }
    handleTemplateChanged() { }
    handleHeadChanged() { }
    handleHeaderChanged() { }
    handleFooterChanged() { }
}
exports.View = View;
;
return exports;});
sfa.setFn("UI", ()=>{var exports = {};
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UI = void 0;
class UI {
    handle(sendData) { }
}
exports.UI = UI;
;
return exports;});
sfa.setFn("CORERES/dialog/style.css", ()=>{ return "ZGlhbG9nIHsKICAgIGRpc3BsYXk6YmxvY2s7CiAgICBwb3NpdGlvbjpmaXhlZDsKICAgIGxlZnQ6MDsKICAgIHRvcDowOwogICAgd2lkdGg6MTAwJTsKICAgIGhlaWdodDoxMDAlOwogICAgei1pbmRleDoxMDA7CiAgICBiYWNrZ3JvdW5kOnJnYmEoMCwwLDAsMC42KTsKICAgIG9wYWNpdHk6MDsKICAgIHRyYW5zaXRpb24tZHVyYXRpb246MzAwbXM7CiAgICB0cmFuc2l0aW9uLXByb3BlcnR5OiBvcGFjaXR5Owp9CmRpYWxvZy5vcGVuIHsKICAgIG9wYWNpdHk6IDE7Cn0KZGlhbG9nIGR3aW5kb3cgewogICAgcG9zaXRpb246Zml4ZWQ7CiAgICBsZWZ0OjUwJTsKICAgIHRvcDo1MCU7CiAgICB3aWR0aDoxMDAlOwogICAgbWF4LXdpZHRoOjgwJTsKICAgIHRyYW5zZm9ybTp0cmFuc2xhdGVYKC01MCUpIHRyYW5zbGF0ZVkoLTUwJSk7CiAgICBiYWNrZ3JvdW5kOndoaXRlOwogICAgY29sb3I6YmxhY2s7Cn0KZGlhbG9nIHRhYmxlIHsKICAgIHdpZHRoOjEwMCU7CiAgICBoZWlnaHQ6MTAwJTsKfQpkaWFsb2cgdGFibGUgdHIgdGQgewogICAgaGVpZ2h0OjEwMCU7CiAgICB2ZXJ0aWNhbC1hbGlnbjp0b3A7Cn0KZGlhbG9nIHRhYmxlIHRyIHRkLm1pZGRsZXsKICAgIHZlcnRpY2FsLWFsaWduOm1pZGRsZTsKfQpkaWFsb2cgdGFibGUgdHIgdGQuY2VudGVyewogICAgdGV4dC1hbGlnbjpjZW50ZXI7Cn0KZGlhbG9nIHRhYmxlIHRyIHRkLnJpZ2h0ewogICAgdGV4dC1hbGlnbjpyaWdodDsKfQ=="});
sfa.setFn("app/config/App", ()=>{var exports = {};
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyApp = void 0;
const App_1 = require("App");
class MyApp extends App_1.App {
}
exports.MyApp = MyApp;
MyApp.routeType = App_1.AppRouteType.application;
MyApp.routes = {
    "/": "home",
    "/page1": "page1",
    "/page2": "page2",
    "/page3": {
        "/": "page3/list",
        "/{id}": "page3/detail",
    },
    "/page4": "page4",
};
;
return exports;});
sfa.setFn("app/dialog/Test1Dialog", ()=>{var exports = {};
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Test1Dialog = void 0;
const Dialog_1 = require("Dialog");
const Response_1 = require("Response");
class Test1Dialog extends Dialog_1.Dialog {
    static open(arg1, arg2) {
        let message, title;
        if (arg2) {
            title = arg1;
            message = arg2;
        }
        else {
            message = arg1;
        }
        Response_1.Response.openDialog("test1", {
            sendData: {
                message: message,
                title: title,
            },
        });
    }
    handle(sendData) {
        this.mjs.title.style({ display: "none" });
        this.mjs.message.text = sendData.message;
        if (sendData.title) {
            this.mjs.title.style({ display: null });
            this.mjs.title.text = sendData.title;
        }
        this.mjs.close.onClick = () => {
            // close button click....
            this.close();
        };
    }
}
exports.Test1Dialog = Test1Dialog;
;
return exports;});
sfa.setFn("app/ui/HeaderUI", ()=>{var exports = {};
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HeaderUI = void 0;
const UI_1 = require("UI");
class HeaderUI extends UI_1.UI {
    handle() {
    }
}
exports.HeaderUI = HeaderUI;
;
return exports;});
sfa.setFn("app/view/HomeView", ()=>{var exports = {};
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HomeView = void 0;
const View_1 = require("app/view/View");
class HomeView extends View_1.View {
    handle() {
        this.title = "Saiberian";
        this.backMode = false;
    }
}
exports.HomeView = HomeView;
;
return exports;});
sfa.setFn("app/view/Page1View", ()=>{var exports = {};
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Page1View = void 0;
const View_1 = require("app/view/View");
class Page1View extends View_1.View {
    handle() {
        this.title = "Page1";
        this.backMode = true;
    }
}
exports.Page1View = Page1View;
;
return exports;});
sfa.setFn("app/view/Page2View", ()=>{var exports = {};
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Page2View = void 0;
const Response_1 = require("Response");
const View_1 = require("app/view/View");
const Test1Dialog_1 = require("app/dialog/Test1Dialog");
class Page2View extends View_1.View {
    handle() {
        this.title = "Page2";
        this.backMode = true;
        this.mjs.dialog1.onClick = () => {
            const dialog = Response_1.Response.openDialogOrigin("<div class=\"m10\">Dialog1 OK....</div>");
            setTimeout(() => {
                dialog.close();
            }, 4000);
        };
        this.mjs.dialog2.onClick = () => {
            Test1Dialog_1.Test1Dialog.open("Dialog Message 1 .... ok");
        };
        this.mjs.dialog2a.onClick = () => {
            Test1Dialog_1.Test1Dialog.open("Title Test", "Dialog Message 2 .... ok");
        };
        this.mjs.dialog3.onClick = () => {
            const dialog = Response_1.Response.openDialog("loading");
            setTimeout(() => {
                dialog.close();
            }, 4000);
        };
    }
}
exports.Page2View = Page2View;
;
return exports;});
sfa.setFn("app/view/Page4View", ()=>{var exports = {};
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Page4View = void 0;
const View_1 = require("app/view/View");
class Page4View extends View_1.View {
    handle() {
        this.title = "Page4";
        this.backMode = true;
        this.mjs.send.onClick = () => {
            console.log({
                value1: this.mjs.value1.value,
                value2: this.mjs.value2.value,
                value3: this.mjs.value3.value,
                value4: this.mjs.value4.value,
                value5: this.mjs.value5.value,
                value6: this.mjs.value6.value,
            });
        };
        this.mjs.reset.onClick = () => {
            this.mjs.value1.reset();
            this.mjs.value2.reset();
            this.mjs.value3.reset();
            this.mjs.value4.reset();
            this.mjs.value5.reset();
            this.mjs.value6.reset();
        };
    }
}
exports.Page4View = Page4View;
;
return exports;});
sfa.setFn("app/view/View", ()=>{var exports = {};
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.View = void 0;
const View_1 = require("View");
const Response_1 = require("Response");
class View extends View_1.View {
    constructor() {
        super(...arguments);
        this.template = "default";
        this.head = "head";
        this.header = "header";
    }
    set title(title) {
        this.mjs.headerTitle.text = title;
    }
    set backMode(status) {
        if (status) {
            this.mjs.headerBackBtn.style({ display: null });
        }
        else {
            this.mjs.headerBackBtn.style({ display: "none" });
        }
    }
    handleHeaderChanged() {
        this.mjs.headerBackBtn.onClick = () => {
            Response_1.Response.back();
        };
    }
}
exports.View = View;
;
return exports;});
sfa.setFn("app/view/page3/DetailView", ()=>{var exports = {};
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DetailView = void 0;
const View_1 = require("app/view/View");
class DetailView extends View_1.View {
    handle(index) {
        this.title = "Page3";
        this.backMode = true;
        this.mjs.index.text = index;
    }
}
exports.DetailView = DetailView;
;
return exports;});
sfa.setFn("app/view/page3/ListView", ()=>{var exports = {};
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListView = void 0;
const Response_1 = require("Response");
const View_1 = require("app/view/View");
class ListView extends View_1.View {
    constructor() {
        super(...arguments);
        this.index = 0;
    }
    handle() {
        this.title = "Page3";
        this.backMode = true;
        if (Response_1.Response.isNext())
            ListView.buffers = [];
        ListView.buffers.forEach((data) => {
            this.addItem(data);
        });
        this.mjs.add.onClick = () => {
            const data = {
                index: this.index,
                name: "Item Name " + this.index,
                code: ("000" + this.index).slice(-4),
            };
            this.addItem(data);
            ListView.buffers.push(data);
            this.index++;
        };
    }
    addItem(data) {
        const item = Response_1.Response.appendUI(this.mjs.list, "listItem");
        item.mjs.name.text = data.name;
        item.mjs.code.text = data.code;
        item.mjs.link
            .data("index", data.index)
            .onClick = (_, my) => {
            Response_1.Response.next("/page3/" + my.data("index"));
        };
    }
}
exports.ListView = ListView;
ListView.buffers = [];
;
return exports;});
sfa.setFn("rendering/dialog/loading.html", ()=>{ return "PGRpdiBjbGFzcz0idGV4dF9jZW50ZXIiPgogICAgPGRpdiBjbGFzcz0ibG9hZGluZyI+PC9kaXY+CiAgICA8ZGl2PkxvYWRpbmcuLi48L2Rpdj4KPC9kaXY+Cg==";});
sfa.setFn("rendering/dialog/test1.html", ()=>{ return "PGgzIHYtY2hpbGQ9InRpdGxlIj48L2gzPgo8ZGl2IGNsYXNzPSJtZXNzYWdlIiB2LWNoaWxkPSJtZXNzYWdlIj48L2Rpdj4KPGRpdiBjbGFzcz0idGV4dF9yaWdodCI+CiAgICA8YSB2LWNoaWxkPSJjbG9zZSI+Q2xvc2U8L2E+CjwvZGl2PiAgICAK";});
sfa.setFn("rendering/template/default.html", ()=>{ return "PGhlYWRlcj48L2hlYWRlcj4KPG1haW4+PC9tYWluPg==";});
sfa.setFn("rendering/ui/head.html", ()=>{ return "PG1ldGEgbmFtZT0idmlld3BvcnQiIGNvbnRlbnQ9IndpZHRoPWRldmljZS13aWR0aCwgaW5pdGlhbC1zY2FsZT0xIj4KPGxpbmsgcmVsPSJzdHlsZXNoZWV0IiBocmVmPSJjc3Mvc3R5bGUuY3NzIj4KPHRpdGxlPlNhaWJlcmlhbjwvdGl0bGU+";});
sfa.setFn("rendering/ui/header.html", ()=>{ return "PGRpdiBjbGFzcz0iYXV0byI+CiAgICA8ZGl2IGNsYXNzPSJhcnJvdyIgdj0iaGVhZGVyQmFja0J0biI+PC9kaXY+CjwvZGl2Pgo8aDEgdj0iaGVhZGVyVGl0bGUiPjwvaDE+CjxkaXY+CiAgICA8bGFiZWw+4peLPC9sYWJlbD4KPC9kaXY+";});
sfa.setFn("rendering/ui/listItem.html", ()=>{ return "PGxpPgogICAgPGEgdi1jaGlsZD0ibGluayI+CiAgICAgICAgPGRpdiBzdHlsZT0id2lkdGg6NzAlIj4KICAgICAgICAgICAgPGRpdiBjbGFzcz0ibWwxMCIgdi1jaGlsZD0ibmFtZSI+PC9kaXY+CiAgICAgICAgPC9kaXY+CiAgICAgICAgPGRpdiBjbGFzcz0idGV4dF9yaWdodCIgc3R5bGU9IndpZHRoOjMwJSI+CiAgICAgICAgICAgIDxzcGFuIHYtY2hpbGQ9ImNvZGUiIGNsYXNzPSJpbmxpbmUtYmxvY2sgdmVydGljYWxfbWlkZGxlIj48L3NwYW4+CiAgICAgICAgICAgIDxzcGFuIGNsYXNzPSJhcnJvdyByaWdodCBpbmxpbmUtYmxvY2sgdmVydGljYWxfbWlkZGxlIj48L3NwYW4+CiAgICAgICAgPC9kaXY+CiAgICA8L2E+CjwvbGk+ICA=";});
sfa.setFn("rendering/view/home.html", ()=>{ return "PHRhYmxlPgogICAgPHRyPgogICAgICAgIDx0ZCBjbGFzcz0idGV4dF9jZW50ZXIgdmVydGljYWxfbWlkZGxlIj4KICAgICAgICAgICAgPGgxPkhhbGxvIFNhaWJlcmlhbiE8L2gxPgogICAgICAgICAgICA8cD5UZXh0IFNhbXBsZSBUZXh0IFNhbXBsZSAuLi48L3A+CiAgICAgICAgICAgIDxkaXYgY2xhc3M9InRleHRfbGVmdCBpbmxpbmUtYmxvY2siIHN0eWxlPSJ3aWR0aDoyMDBweCI+CiAgICAgICAgICAgICAgICA8cD4tIDxhIHVybD0iL3BhZ2UxIj5QYWdlMTwvYT48L3A+CiAgICAgICAgICAgICAgICA8cD4tIDxhIHVybD0iL3BhZ2UyIj5QYWdlMiAoRGlhbG9nKTwvYT48L3A+CiAgICAgICAgICAgICAgICA8cD4tIDxhIHVybD0iL3BhZ2UzIj5QYWdlMyAoTGlzdCk8L2E+PC9wPgogICAgICAgICAgICAgICAgPHA+LSA8YSB1cmw9Ii9wYWdlNCI+UGFnZTQgKEZvcm0pPC9hPjwvcD4gICAgCiAgICAgICAgICAgIDwvZGl2PgogICAgICAgIDwvdGQ+CiAgICA8L3RyPgo8L3RhYmxlPgo=";});
sfa.setFn("rendering/view/page1.html", ()=>{ return "Cjx0YWJsZT4KICAgIDx0cj4KICAgICAgICA8dGQ+CiAgICAgICAgICAgIDxkaXYgY2xhc3M9Im0xMCI+CiAgICAgICAgICAgICAgICA8cD5QYWdlMSBUZXh0IFNhbXBsZSBUZXh0IDxicj4KICAgICAgICAgICAgICAgICAgICBTYW1wbGUgVGV4dCBTYW1wbGUgVGV4dCBTYW1wbGUgVGV4dCBTYW1wbGUgVGV4dCBTYW1wbGUgVGV4dCBTYW1wbGUgVGV4dCBTYW1wbGUgVGV4dCBTYW1wbGUgVGV4dCBTYW1wbGUgVGV4dCBTYW1wbGUgVGV4dCBTYW1wbGUgVGV4dCBTYW1wbGUgVGV4dCBTYW1wbGUgVGV4dCBTYW1wbGUgVGV4dCBTYW1wbGUgVGV4dCBTYW1wbGUgLi4uPC9wPgogICAgICAgICAgICA8L2Rpdj4KICAgICAgICA8L3RkPgogICAgPC90cj4KICAgIDx0cj4KICAgICAgICA8dGQ+CiAgICAgICAgICAgIDxkaXYgY2xhc3M9Im0xMCI+CiAgICAgICAgICAgICAgICA8YSBjbGFzcz0iYnRuIj5CdXR0b24xPC9hPgogICAgICAgICAgICA8L2Rpdj4KICAgICAgICA8L3RkPgogICAgPC90cj4KPC90YWJsZT4K";});
sfa.setFn("rendering/view/page2.html", ()=>{ return "PHVsPgogICAgPGxpPgogICAgICAgIDxhIHY9ImRpYWxvZzEiPgogICAgICAgICAgICA8ZGl2IGNsYXNzPSJwbDEwIj5kaWFsb2cxPC9kaXY+CiAgICAgICAgICAgIDxkaXYgY2xhc3M9InJpZ2h0Ij4KICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9ImFycm93IHJpZ2h0Ij48L2Rpdj4KICAgICAgICAgICAgPC9kaXY+CiAgICAgICAgPC9hPgogICAgPC9saT4KICAgIDxsaT4KICAgICAgICA8YSB2PSJkaWFsb2cyIj4KICAgICAgICAgICAgPGRpdiBjbGFzcz0icGwxMCI+ZGlhbG9nMjwvZGl2PgogICAgICAgICAgICA8ZGl2IGNsYXNzPSJyaWdodCI+CiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPSJhcnJvdyByaWdodCI+PC9kaXY+CiAgICAgICAgICAgIDwvZGl2PgogICAgICAgIDwvYT4KICAgIDwvbGk+CiAgICA8bGk+CiAgICAgICAgPGEgdj0iZGlhbG9nMmEiPgogICAgICAgICAgICA8ZGl2IGNsYXNzPSJwbDEwIj5kaWFsb2cyICh0aXRsZSk8L2Rpdj4KICAgICAgICAgICAgPGRpdiBjbGFzcz0icmlnaHQiPgogICAgICAgICAgICAgICAgPGRpdiBjbGFzcz0iYXJyb3cgcmlnaHQiPjwvZGl2PgogICAgICAgICAgICA8L2Rpdj4KICAgICAgICA8L2E+CiAgICA8L2xpPgogICAgPGxpPgogICAgICAgIDxhIHY9ImRpYWxvZzMiPgogICAgICAgICAgICA8ZGl2IGNsYXNzPSJwbDEwIj5kaWFsb2czIChsb2FkaW5nKTwvZGl2PgogICAgICAgICAgICA8ZGl2IGNsYXNzPSJyaWdodCI+CiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPSJhcnJvdyByaWdodCI+PC9kaXY+CiAgICAgICAgICAgIDwvZGl2PgogICAgICAgIDwvYT4KICAgIDwvbGk+CjwvdWw+";});
sfa.setFn("rendering/view/page3/detail.html", ()=>{ return "PGRpdiBjbGFzcz0ibTEwIj4KICAgIDxoMz5JbmRleCA9IDxzcGFuIHY9ImluZGV4Ij48L3NwYW4+PC9oMz4KPC9kaXY+";});
sfa.setFn("rendering/view/page3/list.html", ()=>{ return "Cjx1bCB2PSJsaXN0Ij48L3VsPgo8ZGl2IGNsYXNzPSJtMTAiPgogICAgPGJ1dHRvbiB2PSJhZGQiIGNsYXNzPSJidG4iPisgQWRkPC9idXR0b24+CjwvZGl2Pg==";});
sfa.setFn("rendering/view/page4.html", ()=>{ return "PHRhYmxlPgogICAgPHRyPgogICAgICAgIDx0ZD4KICAgICAgICAgICAgPGRpdiBjbGFzcz0ibTEwIj4KICAgICAgICAgICAgICAgIFZhbHVlXzEKICAgICAgICAgICAgPC9kaXY+CiAgICAgICAgICAgIDxkaXYgY2xhc3M9Im0xMCI+CiAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT0idGV4dCIgdj0idmFsdWUxIiBwbGFjZWhvbGRlcj0iVmFsdWUxLi4uLiI+CiAgICAgICAgICAgIDwvZGl2PgogICAgICAgICAgICA8ZGl2IGNsYXNzPSJtMTAiPgogICAgICAgICAgICAgICAgVmFsdWVfMgogICAgICAgICAgICA8L2Rpdj4KICAgICAgICAgICAgPGRpdiBjbGFzcz0ibTEwIj4KICAgICAgICAgICAgICAgIDxzZWxlY3Qgdj0idmFsdWUyIj4KICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPSIiPi0tLSBWYWx1ZTIgU2VsZWN0IC0tLTwvb3B0aW9uPgogICAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9IjAiPlNlbGVjdDAwMTwvb3B0aW9uPgogICAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9IjEiPlNlbGVjdDAwMjwvb3B0aW9uPgogICAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9IjIiPlNlbGVjdDAwMzwvb3B0aW9uPgogICAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9IjMiPlNlbGVjdDAwNDwvb3B0aW9uPgogICAgICAgICAgICAgICAgPC9zZWxlY3Q+CiAgICAgICAgICAgIDwvZGl2PgogICAgICAgICAgICA8ZGl2IGNsYXNzPSJtMTAiPlZhbHVlXzM8L2Rpdj4KICAgICAgICAgICAgPGRpdiBjbGFzcz0ibTEwIj4KICAgICAgICAgICAgICAgIDx0ZXh0YXJlYSB2PSJ2YWx1ZTMiPjwvdGV4dGFyZWE+CiAgICAgICAgICAgIDwvZGl2PgogICAgICAgICAgICA8ZGl2IGNsYXNzPSJtMTAiPlZhbHVlXzQ8L2Rpdj4KICAgICAgICAgICAgPHVsPgogICAgICAgICAgICAgICAgPGxpPgogICAgICAgICAgICAgICAgICAgIDxsYWJlbD4KICAgICAgICAgICAgICAgICAgICAgICAgPGRpdj4KICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPSJyYWRpbyIgbmFtZT0idmFsdWU0IiB2PSJ2YWx1ZTQiIHZhbHVlPSIwIj4KICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPSJtbDUiPlR5cGUwPC9zcGFuPgogICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj4KICAgICAgICAgICAgICAgICAgICA8L2xhYmVsPiAgICAKICAgICAgICAgICAgICAgIDwvbGk+CiAgICAgICAgICAgICAgICA8bGk+CiAgICAgICAgICAgICAgICAgICAgPGxhYmVsPgogICAgICAgICAgICAgICAgICAgICAgICA8ZGl2PgogICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9InJhZGlvIiBuYW1lPSJ2YWx1ZTQiIHY9InZhbHVlNCIgdmFsdWU9IjEiPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9Im1sNSI+VHlwZTE8L3NwYW4+CiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PgogICAgICAgICAgICAgICAgICAgIDwvbGFiZWw+ICAgIAogICAgICAgICAgICAgICAgPC9saT4KICAgICAgICAgICAgICAgIDxsaT4KICAgICAgICAgICAgICAgICAgICA8bGFiZWw+CiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXY+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT0icmFkaW8iIG5hbWU9InZhbHVlNCIgdj0idmFsdWU0IiB2YWx1ZT0iMiI+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz0ibWw1Ij5UeXBlMjwvc3Bhbj4KICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+CiAgICAgICAgICAgICAgICAgICAgPC9sYWJlbD4gICAgCiAgICAgICAgICAgICAgICA8L2xpPgogICAgICAgICAgICAgICAgPGxpPgogICAgICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzcz0ibWIxMCI+CiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXY+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT0icmFkaW8iIG5hbWU9InZhbHVlNCIgIHY9InZhbHVlNCIgdmFsdWU9IjMiPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9Im1sNSI+VHlwZTM8L3NwYW4+ICAgIAogICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj4KICAgICAgICAgICAgICAgICAgICA8L2xhYmVsPgogICAgICAgICAgICAgICAgPC9saT4KICAgICAgICAgICAgPC91bD4KICAgICAgICAgICAgPGRpdiBjbGFzcz0ibTEwIj5WYWx1ZV81PC9kaXY+CiAgICAgICAgICAgIDx1bD4KICAgICAgICAgICAgICAgIDxsaT4KICAgICAgICAgICAgICAgICAgICA8bGFiZWw+CiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXY+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT0iY2hlY2tib3giIHY9InZhbHVlNSIgdmFsdWU9IjAiPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+Q2hlY2tib3ggMDwvc3Bhbj4gICAgCiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PgogICAgICAgICAgICAgICAgICAgIDwvbGFiZWw+CiAgICAgICAgICAgICAgICA8L2xpPgogICAgICAgICAgICAgICAgPGxpPgogICAgICAgICAgICAgICAgICAgIDxsYWJlbD4KICAgICAgICAgICAgICAgICAgICAgICAgPGRpdj4KICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPSJjaGVja2JveCIgdj0idmFsdWU1IiB2YWx1ZT0iMSI+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj5DaGVja2JveCAxPC9zcGFuPiAgICAKICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+CiAgICAgICAgICAgICAgICAgICAgPC9sYWJlbD4KICAgICAgICAgICAgICAgIDwvbGk+CiAgICAgICAgICAgICAgICA8bGk+CiAgICAgICAgICAgICAgICAgICAgPGxhYmVsPgogICAgICAgICAgICAgICAgICAgICAgICA8ZGl2PgogICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9ImNoZWNrYm94IiB2PSJ2YWx1ZTUiIHZhbHVlPSIyIj4KICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPkNoZWNrYm94IDI8L3NwYW4+ICAgIAogICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj4KICAgICAgICAgICAgICAgICAgICA8L2xhYmVsPgogICAgICAgICAgICAgICAgPC9saT4KICAgICAgICAgICAgICAgIDxsaT4KICAgICAgICAgICAgICAgICAgICA8bGFiZWw+CiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXY+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT0iY2hlY2tib3giIHY9InZhbHVlNSIgdmFsdWU9IjMiPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+Q2hlY2tib3ggMzwvc3Bhbj4gICAgCiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PgogICAgICAgICAgICAgICAgICAgIDwvbGFiZWw+CiAgICAgICAgICAgICAgICA8L2xpPgogICAgICAgICAgICAgICAgPGxpPgogICAgICAgICAgICAgICAgICAgIDxsYWJlbD4KICAgICAgICAgICAgICAgICAgICAgICAgPGRpdj4KICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPSJjaGVja2JveCIgdj0idmFsdWU1IiB2YWx1ZT0iNCI+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj5DaGVja2JveCA0PC9zcGFuPgogICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj4KICAgICAgICAgICAgICAgICAgICA8L2xhYmVsPgogICAgICAgICAgICAgICAgPC9saT4KICAgICAgICAgICAgPC91bD4KICAgICAgICAgICAgPGRpdiBjbGFzcz0ibTEwIj5WYWx1ZV82PC9kaXY+CiAgICAgICAgICAgIDxkaXYgY2xhc3M9Im0xMCI+CiAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3M9ImJ0biBjcmVhdGVfYnRuIj4KICAgICAgICAgICAgICAgICAgICBTZXQgSW1hZ2UKICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT0iZmlsZSIgdj0idmFsdWU2IiBwYXR0ZXJuPSIqLnBuZ3wqLmpwZyIgc3R5bGU9ImRpc3BsYXk6bm9uZSI+CiAgICAgICAgICAgICAgICA8L2xhYmVsPgogICAgICAgICAgICA8L2Rpdj4KICAgICAgICA8L3RkPiAgICAgICAgCiAgICA8L3RyPgogICAgPHRyPgogICAgICAgIDx0ZD4KICAgICAgICAgICAgPGRpdiBjbGFzcz0ibTEwIj4KICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9ImNvbHVtbjIiPgogICAgICAgICAgICAgICAgICAgIDxkaXY+CiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9ImJ0biByZXNldF9idG4iIHY9InJlc2V0Ij5SZXNldDwvYnV0dG9uPgogICAgICAgICAgICAgICAgICAgIDwvZGl2PgogICAgICAgICAgICAgICAgICAgIDxkaXY+CiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9ImJ0biIgdj0ic2VuZCI+U2VuZDwvYnV0dG9uPgogICAgICAgICAgICAgICAgICAgIDwvZGl2PiAgICAKICAgICAgICAgICAgICAgIDwvZGl2PgogICAgICAgICAgICA8L2Rpdj4KICAgICAgICA8L3RkPgogICAgPC90cj4KPC90YWJsZT4K";});
sfa.setFn("resource/css/style.css", ()=>{ return "text/css|KiB7CiAgICBmb250LWZhbWlseTogIkhlbHZldGljYSBOZXVlIiwKICAgIEFyaWFsLAogICAgIkhpcmFnaW5vIEtha3UgR290aGljIFByb04iLAogICAgIkhpcmFnaW5vIFNhbnMiLAogICAgTWVpcnlvLAogICAgc2Fucy1zZXJpZjsKICAgIGJveC1zaXppbmc6Ym9yZGVyLWJveDsKfQpib2R5IHsKICAgIG1hcmdpbjowOwp9CmEgewogICAgY29sb3I6bGlnaHRjeWFuOwp9Cjpyb290IHsKICAgIC0tbWFpbi1iZzpyZ2IoNDAsNDAsNDApOwogICAgLS1tYWluLWNvbG9yOnJnYigyMzAsMjMwLDIzMCk7CiAgICAtLW1haW4tbGlzdC1iZzpyZ2IoNjAsNjAsNjApOwogICAgLS1tYWluLWxpc3QtY29sb3I6cmdiKDIzMCwyMzAsMjMwKTsKICAgIC0tYnV0dG9uLWJnOnJnYig0MCw4MCwyMTApOwogICAgLS1idXR0b24tY29sb3I6cmdiKDIzMCwyMzAsMjMwKTsKICAgIC0tYnV0dG9uLWFjdGl2ZS1iZzpyZ2IoMTAwLDE1MCwyNTUpOwogICAgLS1idXR0b24tY3JlYXRlLWJnOnJnYigyMCwxNjAsNDApOwogICAgLS1idXR0b24tY3JlYXRlLWNvbG9yOnJnYigyNTAsMjUwLDI1MCk7CiAgICAtLWJ1dHRvbi1jcmVhdGUtYWN0aXZlLWJnOnJnYigxMDAsMjU1LDE1MCk7CiAgICAtLWJ1dHRvbi1yZXNldC1iZzpyZ2IoODAsODAsODApOwogICAgLS1idXR0b24tcmVzZXQtY29sb3I6cmdiKDI1MCwyNTAsMjUwKTsKICAgIC0tYnV0dG9uLXJlc2V0LWFjdGl2ZS1iZzpyZ2IoMTIwLDEyMCwxMjApOwp9Ci50ZXh0X2xlZnQgewogICAgdGV4dC1hbGlnbjpsZWZ0Owp9Ci50ZXh0X2NlbnRlciB7CiAgICB0ZXh0LWFsaWduOmNlbnRlcjsKfQoudGV4dF9yaWdodCB7CiAgICB0ZXh0LWFsaWduOnJpZ2h0Owp9Ci52ZXJ0aWNhbF90b3AgewogICAgdmVydGljYWwtYWxpZ246IHRvcDsKfQoudmVydGljYWxfbWlkZGxlIHsKICAgIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7Owp9Ci5pbmxpbmUtYmxvY2sgewogICAgZGlzcGxheTppbmxpbmUtYmxvY2s7Cn0KaDEsIGgyLCBoMywgaDQsIGg1IHsKICAgIG1hcmdpbjowOwogICAgZm9udC13ZWlnaHQ6bm9ybWFsOwp9CmhlYWRlciB7CiAgICBoZWlnaHQ6NTBweDsKICAgIGxpbmUtaGVpZ2h0OjUwcHg7CiAgICBwb3NpdGlvbjpmaXhlZDsKICAgIGJhY2tncm91bmQ6dmFyKC0tbWFpbi1iZyk7CiAgICBjb2xvcjp2YXIoLS1tYWluLWNvbG9yKTsKICAgIGJvcmRlci1ib3R0b206c29saWQgMXB4IHJnYigyMDAsMjAwLDIwMCk7CiAgICB3aWR0aDoxMDAlOwogICAgbGVmdDowOwogICAgdG9wOjA7CiAgICB6LWluZGV4OjI7CiAgICBkaXNwbGF5OnRhYmxlOwp9CmhlYWRlciA+ICogewogICAgZm9udC1zaXplOjI0cHg7CiAgICBkaXNwbGF5OnRhYmxlLWNlbGw7CiAgICB2ZXJ0aWNhbC1hbGlnbjptaWRkbGU7CiAgICBoZWlnaHQ6NTBweDsKICAgIGxpbmUtaGVpZ2h0OjUwcHg7CiAgICB3aWR0aDoxMDAlOwp9CmhlYWRlciA+ICouYXV0byB7CiAgICB3aWR0aDphdXRvOwp9CmhlYWRlciBoMSB7CiAgICBmb250LXNpemU6MjRweDsKICAgIGxpbmUtaGVpZ2h0OjUwcHg7CiAgICBwYWRkaW5nOjAgNXB4Owp9Cm1haW4gYXJ0aWNsZSB7CiAgICBwb3NpdGlvbjpmaXhlZDsKICAgIGxlZnQ6MDsKICAgIHRvcDowOwogICAgd2lkdGg6MTAwJTsKICAgIGhlaWdodDoxMDAlOwogICAgZGlzcGxheTpibG9jazsKICAgIGJvcmRlcjpub25lOwogICAgbGluZS1oZWlnaHQ6MS41cmVtOwogICAgYmFja2dyb3VuZDp2YXIoLS1tYWluLWJnKTsKICAgIGNvbG9yOnZhcigtLW1haW4tY29sb3IpOwogICAgb3ZlcmZsb3c6c2Nyb2xsOwogICAgei1pbmRleDoxOwp9CmhlYWRlciArIG1haW4gYXJ0aWNsZSB7CiAgICB0b3A6NTBweDsKICAgIGhlaWdodDpjYWxjKDEwMCUgLSA1MHB4KTsKfQoubTEwIHsgbWFyZ2luOjEwcHg7IH0KLm1sNSB7IG1hcmdpbi1sZWZ0OjVweDsgfQoubWwxMCB7IG1hcmdpbi1sZWZ0OjEwcHg7IH0KLm1yNSB7IG1hcmdpbi1yaWdodDo1cHg7IH0KLm1yMTAgeyBtYXJnaW4tcmlnaHQ6MTBweDsgfQoubWI1IHsgbWFyZ2luLWJvdHRvbTo1cHg7IH0KLm1iMTAgeyBtYXJnaW4tYm90dG9tOjEwcHg7IH0KLm10NSB7IG1hcmdpbi10b3A6NXB4OyB9Ci5tdDEwIHsgbWFyZ2luLXRvcDo1cHg7IH0KLnAxMCB7IHBhZGRpbmc6MTBweDsgfQoucGwxMCB7IHBhZGRpbmctbGVmdDoxMHB4OyB9Ci5wcjEwIHsgcGFkZGluZy1yaWdodDoxMHB4OyB9Ci5wdDEwIHsgcGFkZGluZy10b3A6MTBweDsgfQoucGIxMCB7IHBhZGRpbmctYm90dG9tOjEwcHg7IH0KCm1haW4gYXJ0aWNsZSB0YWJsZSB7CiAgICB3aWR0aDoxMDAlOwogICAgaGVpZ2h0OjEwMCU7Cn0KbWFpbiBhcnRpY2xlIHRhYmxlIHRyIHRkIHsKICAgIGhlaWdodDoxMDAlOwogICAgdmVydGljYWwtYWxpZ246dG9wOwp9CgouYnRuIHsKICAgIGJhY2tncm91bmQ6dmFyKC0tYnV0dG9uLWJnKTsKICAgIGNvbG9yOnZhcigtLWJ1dHRvbi1jb2xvcik7CiAgICBkaXNwbGF5OmJsb2NrOwogICAgbGluZS1oZWlnaHQ6NTBweDsKICAgIGhlaWdodDo1MHB4OwogICAgdGV4dC1hbGlnbjpjZW50ZXI7CiAgICBjdXJzb3I6cG9pbnRlcjsKICAgIGZvbnQtc2l6ZToxOHB4OwogICAgYm9yZGVyOnNvbGlkIDNweCB2YXIoLS1idXR0b24tYmcpOwogICAgYm9yZGVyLXJhZGl1czo1cHg7CiAgICB0cmFuc2l0aW9uLWR1cmF0aW9uOjMwMG1zOwogICAgb3V0bGluZTpub25lOwogICAgcGFkZGluZzogMCAyMHB4OwogICAgLXdlYmtpdC10YXAtaGlnaGxpZ2h0LWNvbG9yOnJnYmEoMCwwLDAsMCk7Cn0KLmJ0bjphY3RpdmUgewogICAgYmFja2dyb3VuZDp2YXIoLS1idXR0b24tYWN0aXZlLWJnKTsKfQouYnRuLmNyZWF0ZV9idG4gewogICAgYmFja2dyb3VuZDp2YXIoLS1idXR0b24tY3JlYXRlLWJnKTsKICAgIGNvbG9yOnZhcigtLWJ1dHRvbi1jcmVhdGUtY29sb3IpOwogICAgYm9yZGVyOnNvbGlkIDNweCB2YXIoLS1idXR0b24tY3JlYXRlLWJnKTsKfQouYnRuLmNyZWF0ZV9idG46YWN0aXZlIHsKICAgIGJhY2tncm91bmQ6dmFyKC0tYnV0dG9uLWNyZWF0ZS1hY3RpdmUtYmcpOwp9Ci5idG4ucmVzZXRfYnRuIHsKICAgIGJhY2tncm91bmQ6dmFyKC0tYnV0dG9uLXJlc2V0LWJnKTsKICAgIGNvbG9yOnZhcigtLWJ1dHRvbi1yZXNldC1jb2xvcik7CiAgICBib3JkZXI6c29saWQgM3B4IHZhcigtLWJ1dHRvbi1yZXNldC1iZyk7Cn0KLmJ0bi5yZXNldF9idG46YWN0aXZlIHsKICAgIGJhY2tncm91bmQ6dmFyKC0tYnV0dG9uLXJlc2V0LWFjdGl2ZS1iZyk7Cn0KCgouYXJyb3cgewogICAgd2lkdGg6NTBweDsKICAgIGhlaWdodDo1MHB4OwogICAgcG9zaXRpb246cmVsYXRpdmU7Cn0KLmFycm93OmFmdGVyewogICAgd2lkdGg6IDIwcHg7CiAgICBoZWlnaHQ6IDIwcHg7CiAgICBjb250ZW50OiAiIjsKICAgIGRpc3BsYXk6IGJsb2NrOwogICAgYm9yZGVyLWxlZnQ6IHNvbGlkIDFweCB2YXIoLS1tYWluLWNvbG9yKTsKICAgIGJvcmRlci10b3A6IHNvbGlkIDFweCB2YXIoLS1tYWluLWNvbG9yKTsKICAgIHRyYW5zZm9ybTogcm90YXRlKC00NWRlZyk7CiAgICBwb3NpdGlvbjogYWJzb2x1dGU7CiAgICBsZWZ0OiAyMHB4OwogICAgdG9wOiAxNXB4Owp9Ci5hcnJvdy5yaWdodDphZnRlciB7CiAgICB0cmFuc2Zvcm06cm90YXRlKDEzNWRlZyk7CiAgICByaWdodDoyMHB4OwogICAgbGVmdDphdXRvOwp9Cm1haW4gYXJ0aWNsZSB1bHsKICAgIHBhZGRpbmc6MDsKICAgIG1hcmdpbjowOwp9Cm1haW4gYXJ0aWNsZSB1bCBsaTpmaXJzdC1jaGlsZCB7CiAgICBib3JkZXItdG9wOnNvbGlkIDFweCBkYXJrZ3JheTsKfQptYWluIGFydGljbGUgdWwgbGkgewogICAgYmFja2dyb3VuZDp2YXIoLS1tYWluLWxpc3QtYmcpOwogICAgY29sb3I6dmFyKC0tbWFpbi1saXN0LWNvbG9yKTsKICAgIGxpc3Qtc3R5bGUtdHlwZTpub25lOwogICAgYm9yZGVyLWJvdHRvbTpzb2xpZCAxcHggZGFya2dyYXk7Cn0KbWFpbiBhcnRpY2xlIHVsIGxpID4gKnsKICAgIGRpc3BsYXk6dGFibGU7CiAgICBjb2xvcjp2YXIoLS1tYWluLWxpc3QtY29sb3IpOwogICAgaGVpZ2h0OjYwcHg7CiAgICBsaW5lLWhlaWdodDo2MHB4OwogICAgdHJhbnNpdGlvbi1kdXJhdGlvbjozMDBtczsKICAgIHdpZHRoOjEwMCU7Cn0KbWFpbiBhcnRpY2xlIHVsIGxpID4gKiA+ICp7CiAgICBkaXNwbGF5OnRhYmxlLWNlbGw7CiAgICB2ZXJ0aWNhbC1hbGlnbjptaWRkbGU7CiAgICB3aWR0aDoxMDAlOwp9Cm1haW4gYXJ0aWNsZSB1bCBsaSA+ICo6YWN0aXZlewogICAgYmFja2dyb3VuZDpyZ2IoMTIwLDEyMCwxMjApOwp9CgpkaWFsb2cgZHdpbmRvdyB7CiAgICBiYWNrZ3JvdW5kOnJnYig0MCw0MCw0MCk7CiAgICBjb2xvcjp3aGl0ZTsKICAgIGJveC1zaGFkb3c6IDAgMCAwIDJweCByZ2IoMTAwLDEwMCwxMDApOwogICAgcGFkZGluZzoyMHB4Owp9CmRpYWxvZyBkd2luZG93IC5tZXNzYWdlIHsKICAgIG1hcmdpbi1ib3R0b206MzBweDsKICAgIGxpbmUtaGVpZ2h0OjEuOHJlbTsKfQpkaWFsb2cgZHdpbmRvdyBoMyB7CiAgICBmb250LXdlaWdodDpib2xkOwogICAgbWFyZ2luLWJvdHRvbToyMHB4Owp9Ci5sb2FkaW5nIHsKICAgIHdpZHRoOjIwMHB4OwogICAgaGVpZ2h0OjIwMHB4OwogICAgYm9yZGVyLXJhZGl1czo1MCU7CiAgICBib3JkZXI6c29saWQgNXB4IGxpZ2h0Z3JheTsKICAgIGJvcmRlci1sZWZ0OnNvbGlkIDVweCByZ2JhKDAsMCwwLDApOwogICAgYW5pbWF0aW9uOmxvYWRpbmcgMXMgbGluZWFyIGluZmluaXRlOwogICAgZGlzcGxheTppbmxpbmUtYmxvY2s7CiAgICBtYXJnaW4tYm90dG9tOjMwcHg7Cn0KQGtleWZyYW1lcyBsb2FkaW5nIHsKICAgIDAlIHsKICAgICAgICB0cmFuc2Zvcm06cm90YXRlKDBkZWcpOwogICAgfQogICAgMTAwJSB7CiAgICAgICAgdHJhbnNmb3JtOnJvdGF0ZSgzNjBkZWcpOwogICAgfQp9CgpidXR0b24gewogICAgd2lkdGg6MTAwJTsKfQoKaW5wdXQsCnNlbGVjdCwKdGV4dGFyZWEgewogICAgYmFja2dyb3VuZDogcmdiYSgzMCwgMzAsIDMwKTsKICAgIGxpbmUtaGVpZ2h0OiA1MHB4OwogICAgaGVpZ2h0OiA1MHB4OwogICAgd2lkdGg6IDEwMCU7CiAgICBib3JkZXI6IHNvbGlkIDFweCByZ2IoMTcwLCAxNzAsIDE3MCk7CiAgICBjb2xvcjogcmdiKDIyMCwyMjAsMjIwKTsKICAgIHBhZGRpbmc6IDAgMTBweDsKICAgIGZvbnQtc2l6ZTogMThweDsKICAgIG91dGxpbmU6bm9uZTsKfQppbnB1dDpmb2N1cyB7CiAgICBib3JkZXI6c29saWQgMXB4IHJnYigxMDAsIDIzMCwgMjUwKTsKfQp0ZXh0YXJlYSB7CiAgICBsaW5lLWhlaWdodDogMS42cmVtOwogICAgcGFkZGluZzogMTBweDsKICAgIGhlaWdodDogMjAwcHg7CiAgICBhcHBlYXJhbmNlOiBub25lOwp9CmlucHV0W3R5cGU9cmFkaW9dLAppbnB1dFt0eXBlPWNoZWNrYm94XXsKICAgIGFwcGVhcmFuY2U6bm9uZTsKICAgIHdpZHRoOmF1dG87CiAgICB2ZXJ0aWNhbC1hbGlnbjptaWRkbGU7CiAgICBkaXNwbGF5OmlubGluZS1ibG9jazsKICAgIHdpZHRoOjIycHg7CiAgICBoZWlnaHQ6MjJweDsKICAgIGJhY2tncm91bmQ6cmdiKDYwLDYwLDYwKTsKICAgIGJvcmRlcjpzb2xpZCAycHggcmdiKDEyMCwxMjAsMTIwKTsKICAgIHBvc2l0aW9uOnJlbGF0aXZlOwogICAgdHJhbnNpdGlvbi1kdXJhdGlvbjozMDBtczsKfQppbnB1dFt0eXBlPXJhZGlvXXsKICAgIGJvcmRlci1yYWRpdXM6NTAlOwp9CmlucHV0W3R5cGU9Y2hlY2tib3hdewogICAgYm9yZGVyLXJhZGl1czo1cHg7Cn0KaW5wdXRbdHlwZT1yYWRpb106Y2hlY2tlZCB7CiAgICBiYWNrZ3JvdW5kOnJnYigyMCwyMCwyMCk7CiAgICBib3JkZXI6c29saWQgMnB4IHJnYig1MCwyMDAsMzApOwp9CmlucHV0W3R5cGU9Y2hlY2tib3hdOmNoZWNrZWQgewogICAgYmFja2dyb3VuZDpyZ2IoNTAsMjAwLDMwKTsKICAgIGJvcmRlcjpzb2xpZCAycHggcmdiKDUwLDIwMCwzMCk7Cn0KaW5wdXRbdHlwZT1yYWRpb106YWZ0ZXJ7CiAgICBjb250ZW50OiIiOwogICAgZGlzcGxheTpibG9jazsKICAgIHdpZHRoOjEzcHg7CiAgICBoZWlnaHQ6MTNweDsKICAgIGJvcmRlci1yYWRpdXM6NTAlOwogICAgYmFja2dyb3VuZDpyZ2IoNTAsMjAwLDMwKTsKICAgIHBvc2l0aW9uOmFic29sdXRlOwogICAgbGVmdDo1MCU7CiAgICB0b3A6NTAlOwogICAgdHJhbnNmb3JtOnRyYW5zbGF0ZVgoLTUwJSkgdHJhbnNsYXRlWSgtNTAlKTsKICAgIG9wYWNpdHk6MDsKICAgIHRyYW5zaXRpb24tZHVyYXRpb246MzAwbXM7Cn0KaW5wdXRbdHlwZT1yYWRpb106Y2hlY2tlZDphZnRlcnsKICAgIG9wYWNpdHk6MTsKfQppbnB1dFt0eXBlPWNoZWNrYm94XTphZnRlcnsKICAgIGNvbnRlbnQ6IlwwMjcxMyI7CiAgICBkaXNwbGF5OmJsb2NrOwogICAgY29sb3I6d2hpdGU7CiAgICBvcGFjaXR5OjA7CiAgICB0cmFuc2l0aW9uLWR1cmF0aW9uOjMwMG1zOwogICAgcG9zaXRpb246YWJzb2x1dGU7CiAgICBsZWZ0OjUwJTsKICAgIHRvcDo1MCU7CiAgICB0cmFuc2Zvcm06dHJhbnNsYXRlWCgtNTAlKSB0cmFuc2xhdGVZKC01MCUpOwogICAgZm9udC1zaXplOiAxNXB4OwogICAgZm9udC13ZWlnaHQ6IGJvbGQ7Cn0KaW5wdXRbdHlwZT1jaGVja2JveF06Y2hlY2tlZDphZnRlcnsKICAgIG9wYWNpdHk6MTsKfQoKCgouY29sdW1uMiB7CiAgICBkaXNwbGF5OnRhYmxlOwogICAgd2lkdGg6MTAwJTsKfQouY29sdW1uMiA+ICogewogICAgZGlzcGxheTp0YWJsZS1jZWxsOwogICAgd2lkdGg6NTAlOwp9Ci5jb2x1bW4yID4gKjpmaXJzdC1jaGlsZCB7CiAgICBwYWRkaW5nLXJpZ2h0OjVweDsKfQouY29sdW1uMiA+ICo6bGFzdC1jaGlsZCB7CiAgICBwYWRkaW5nLWxlZnQ6NXB4Owp9"});
sfa.start(()=>{ const st = use("Startor");  new st.Startor(); });