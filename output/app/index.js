const platform = "app";
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
/**
 * ***App*** : Class for initial settings of the application.
 */
class App {
}
exports.App = App;
/**
 * ***routeType*** : Method for page transition.
 * - **application** : A mode for building apps. Screen transition history is managed and operated by the app.
 * - **web** : Change the browser URL and move to the page. You can go back by pressing the back button on the browser.
 */
App.routeType = AppRouteType.web;
/**
 * ***delay*** : Specify the delay time for screen transitions.
 * Default is 100 (ms).
 * If you specify 0, the button will transition immediately without executing the animation when pressed.
 */
App.delay = 100;
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
const Lib_1 = require("Lib");
/**
 * ***Background*** : Classes that execute and manipulate business logic in the background.
 * This class starts executing immediately after the app is launched, regardless of each screen transition.
 * To use it in advance, you need to list it in backgrounds in ``app/config/App.ts``
 *
 * ```typescript
 * public backgrounds : Array<string> = [
 *    "Sample1",
 *    "Sample2",
 *    ...
 * ];
 * ```
 */
class Background {
    static load() {
        return __awaiter(this, void 0, void 0, function* () {
            const MyApp = use("app/config/App").MyApp;
            // background class method load.
            if (MyApp.backgrounds) {
                for (let n = 0; n < MyApp.backgrounds.length; n++) {
                    const backgroundName = Lib_1.Lib.getModulePath(MyApp.backgrounds[n]);
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
/**
 * ***Controller*** : Main class for each screen.
 * handlers for multiple screens can be managed collectively using public methods.
 */
class Controller {
    constructor() {
        /**
         * ***beginStatus*** :
         */
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
     * ***vdo*** : Virtual Dom for content.
     */
    get vdo() {
        return this.myMjs;
    }
    /**
     * ***vdos*** : Virtual DOM List of ModernJS Classes.
     */
    get vdos() {
        return this.mjs;
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
     * ***setHead*** : If there is a UI to set in the head tag, you can specify it.
     * @param headName
     */
    setHead(headName) {
        this.head = headName;
        const routes = Routes_1.Routes.getRoute();
        Response_1.Response.__rendering(routes, this);
    }
    /**
     * ***setHeader*** : If there is a UI to set in the header tag, you can specify it.
     * @param headerName
     */
    setHeader(headerName) {
        this.header = headerName;
        const routes = Routes_1.Routes.getRoute();
        Response_1.Response.__rendering(routes, this);
    }
    /**
     * ***setFooter*** : If there is a UI to set in the footer tag, you can specify it.
     * @param footerName
     */
    setFooter(footerName) {
        this.header = footerName;
        const routes = Routes_1.Routes.getRoute();
        Response_1.Response.__rendering(routes, this);
    }
    /**
     * ***handleBefore*** : A handler executed just before transitioning to the page.
     */
    handleBefore() { }
    /**
     * ***handleAfter*** : A handler executed immediately after transitioning to the page
     */
    handleAfter() { }
    /**
     * ***handleRenderBefore*** : A handler executed immediately after page transition and rendering process to the screen is completed
     */
    handleRenderBefore() { }
    /**
     * ***handleRenderAfter*** : A handler that is executed after page transition, after rendering process to the screen is completed,
     * and after the event for each action is completed.
     */
    handleRenderAfter() { }
    /**
     * ***handleLeave*** : A handler executed when leaving the page
     * @param {string} action before access controller action name
     */
    handleLeave(action) { }
    /**
     * ***handleLeaveBack*** : Handler that is executed when returning to the previous screen.
     * @param {string} action before access controller action name
     */
    handleLeaveBack(action) { }
    /**
     * ***handleLeaveNext*** : Handler that runs when proceeding to the next screen
     * @param {string} action before access controller action name
     */
    handleLeaveNext(action) { }
    /**
     * ***handleTemplateChanged*** : A handler that runs when the template specified in the member variable template changes.
     */
    handleTemplateChanged(template) { }
    /**
     * ***handleHeadChanged*** : A handler that runs when the template specified in the member variable head tag changes.
     */
    handleHeadChanged(head) { }
    /**
     * ***handleHeaderChanged*** : A handler that runs when the template specified in the member variable header tag changes.
     */
    handleHeaderChanged(header) { }
    /**
     * ***handleFooterChanged*** : A handler that runs when the template specified in the member variable footer tag changes.
     */
    handleFooterChanged(footer) { }
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
/**
 * ***Dialog*** : A class for displaying or manipulating a dialog screen.
 */
class Dialog {
    /**
     * ***vdo*** : Virtual Dom for content.
     */
    get vdo() {
        return this.myMjs;
    }
    /**
     * ***vdos*** : Virtual DOM List of ModernJS Classes.
     */
    get vdos() {
        return this.mjs;
    }
    /**
     * ***handle*** : An event handler that runs when the dialog is opened.
     * @param {any} sendData
     * @returns {void}
     */
    handle(sendData) { }
    /**
     * ***close*** : Method for closing the dialog.
     */
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
exports.dom = exports.ModernJS = void 0;
/**
 * ***ModernJS*** : Virtual DOM Classes.
 * When you specify the v attribute in an HTML tag, it is recognized as a virtual DOM.
 * The v attribute is considered a globally available virtual DOM.
 * ```html
 * <div v="test"></div>
 * ```
 */
class ModernJS {
    constructor() {
        /**
         * ***els*** : List of target Element classes in the virtual DOM class.
         */
        this.els = [];
        /**
         * ***childs*** : The child ModernJS class for this virtual DOM.
         * The ModernJS class of the child can be set by specifying it in the v attribute of the HTML tag, separated by .
         * ```html
         * <div v="main.sub"></div>
         * ```
         * In the above case, the following code can be used to manipulate the DOM as a child ModernJS
         * ```typescript
         * mjs.main.childs.sub.text = "Sub Text....";
         * ```
         */
        this.childs = {};
        /**
         * ***datas*** : Virtual Data Objects.
         */
        this.datas = {};
        this.fileBuffers = [];
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
    /**
     * ***dom*** : Finds an element for the specified query path and returns the virtual DOM class that contains the element.
     * For example, prepare the following HTML:
     * ```html
     * <div class="item"></div>
     * ```
     * To get the tag with the class attribute item as a virtual DOM, write the following code in TypeScript:
     * ```typescript
     * const subQuery : ModernJS = ModernJS.dom(".item");
     * ```
     * @param {string} queryString QueryString
     * @returns {ModernJS}
     */
    static dom(queryString) {
        const mjs = new ModernJS();
        const qss = document.querySelectorAll(queryString);
        qss.forEach((el) => {
            mjs.addEl(el);
        });
        return mjs;
    }
    /**
     * ***addEl*** : Manually adding elements to the Virtual DOM.
     * For example, after getting the p tag as an element,
     * write the following code in TypeScript to create an empty ModernJS class and add the p tag element to it.
     * ```typescript
     * const el = document.querySelector("p");
     * const mjs = ModernJS.create();
     * mjs.addEl(el);
     * ```
     * @param {HTMLElement} el HTMLElement
     * @returns {MOdernJS}
     */
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
        return this;
    }
    /**
     * ***reload*** : Get the virtual DOM of the v attribute from the virtual DOM element.
     * The results can be obtained in children.
     * @param {ModernJS?} context
     */
    reload(context) {
        if (!context)
            context = this;
        this.virtualAttributes("v", context, (parent, attrValue, el) => {
            if (parent) {
                if (!parent.childs[attrValue])
                    parent.childs[attrValue] = new ModernJS();
                parent.childs[attrValue].addEl(el);
            }
            else {
                if (!context.childs[attrValue])
                    context.childs[attrValue] = new ModernJS();
                context.childs[attrValue].addEl(el);
            }
        });
    }
    virtualAttributes(target, context, handler) {
        const qss = document.querySelectorAll("[" + target + "]");
        qss.forEach((el) => {
            let attrValue = el.attributes[target].value;
            el.removeAttribute(target);
            let parent;
            const attrValues = attrValue.split(".");
            if (attrValues.length > 1) {
                attrValue = attrValues[attrValues.length - 1];
                attrValues.forEach((a_, index) => {
                    if (index == (attrValues.length - 1))
                        return;
                    if (index == 0) {
                        if (!context.childs[a_])
                            context.childs[a_] = new ModernJS();
                        parent = context.childs[a_];
                        if (!parent.els.length)
                            parent.addEl(el);
                    }
                    else {
                        if (!parent.childs[a_])
                            parent.childs[a_] = new ModernJS();
                        parent = parent.childs[a_];
                    }
                });
            }
            handler(parent, attrValue, el);
        });
    }
    /**
     * ***length*** : Get the number of elements.
     */
    get length() {
        return this.els.length;
    }
    /**
     * ***first*** : Get the virtual DOM class that contains the first element
     * A code sample of TypeScript is shown below.
     * ```typescript
     * const first : ModernJS = mjs.first;
     * ```
     */
    get first() {
        const mjs = new ModernJS();
        mjs.addEl(this.els[0]);
        return mjs;
    }
    /**
     * ***last*** : Get the virtual DOM class that contains the last element.
     * A code sample of TypeScript is shown below.
     * ```typescript
     * const last : ModernJS = mjs.last;
     * ```
     */
    get last() {
        const mjs = new ModernJS();
        mjs.addEl(this.els[this.els.length - 1]);
        return mjs;
    }
    /**
     * ***index*** : Gets the virtual DOM class that contains the element at the specified index.
     * A code sample of TypeScript is shown below.
     * ```typescript
     * const three : ModernJS = mjs.index(2);
     * ```
     * @param {number} index Element Index Number
     * @returns {ModernJS}
     */
    index(index) {
        const mjs = new ModernJS();
        if (!this.els[index])
            return;
        mjs.addEl(this.els[index]);
        return mjs;
    }
    /**
     * ***prev*** : Get the prev element in the virtual DOM by its virtual DOM class.
     */
    get prev() {
        // @ts-ignore
        const prevEl = this.els[0].previousElementSibling;
        const mjs = new ModernJS();
        mjs.addEl(prevEl);
        return mjs;
    }
    /**
     * ***next*** : Get the next element in the virtual DOM by its virtual DOM class.
     */
    get next() {
        // @ts-ignore
        const prevEl = this.els[0].nextElementSibling;
        const mjs = new ModernJS();
        mjs.addEl(prevEl);
        return mjs;
    }
    /**
     * ***tagName*** : Get tag name.
     */
    get tagName() {
        return this.els[0].tagName;
    }
    /**
     * ***querySelector*** : Searches for an element in the virtual DOM for the specified query path and returns the Virtual DOM Class that contains that element.
     * For example, prepare the following HTML:
     * ```html
     * <div v="main">
     *      <div class="item"></div>
     * </div>
     * ```
     * To get the tag with the class attribute item as a virtual DOM, write the following code in TypeScript:
     * (The variable main is the ModernJS class v="main" above.)
     * ```typescript
     * const item : ModernJS = main.querySelector(".item");
     * ```
     * @param {string} queryString QueryString
     * @returns {ModernJS}
     */
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
    /**
     * ***text*** : Gets or sets the specified text.
     * The following is an example of how to set text:
     * ```typescript
     * mjs.text = "Text Area Sample Text.....";
     * ```
     * The following is an example of how to get text:
     * ```typescript
     * const text : string = mjs.text;
     * ```
     */
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
        if (!noReload)
            this.reload();
        return this;
    }
    /**
     * ***html*** : Gets or sets an HTML tag.
     * The following is an example of how to set text:
     * ```typescript
     * mjs.html = "<h1>HTML Tag Test Sample ....</h1>";
     * ```
     * The following is an example of how to get text:
     * ```typescript
     * const html : string = mjs.html;
     * ```
     */
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
        if (!noReload)
            this.reload();
        return this;
    }
    /**
     * ***outerHTML*** : Get or set the outerHTML.
     * The following is an example of how to set text:
     * ```typescript
     * mjs.outerHTML = "<h1>Outer HTML Tag Test Sample ....</h1>";
     * ```
     * The following is an example of how to get text:
     * ```typescript
     * const outerHTML : string = mjs.outerHTML;
     * ```
     */
    set outerHtml(value) {
        this.els.forEach((el) => {
            el.childNodes.forEach((c) => {
                el.removeChild(c);
            });
            el.outerHTML = value;
        });
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
        if (!noReload)
            this.reload();
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
        if (!noReload)
            this.reload();
        return this;
    }
    /**
     * ***remove*** : Delete the target element.
     * A code sample of TypeScript is shown below.
     * ```typescript
     * mjs.remove();
     * ```
     * @returns {ModernJS}
     */
    remove() {
        this.els.forEach((el) => {
            el.remove();
        });
        return this;
    }
    /**
     * ***style*** : Setting style(stylesheets) attributes for an element.
     * A code sample of TypeScript is shown below.
     * ```typescript
     * mjs.style({ background: "rgb(255,100,0" });
     * ```
     * @param {[name : string] : string | number} stylesheets Style attribute information
     * @returns {ModernJS}
     */
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
    /**
     * ***getStyle*** : Get style information for the specified selector.
     * A code sample of TypeScript is shown below.
     * ```typescript
     * const background : string = mjs.getStyle("background");
     * ```
     * @param {string} name selector
     * @returns {string | number}
     */
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
    /**
     * ***isAttr*** : Whether the specified attribute name exists for the element.
     * A code sample of TypeScript is shown below.
     * ```typescript
     * const exists : boolean = mjs.isAttr("min");
     * ```
     * @param {string} name attribute name
     * @returns {boolean}
     */
    isAttr(name) {
        if (!this.els[0])
            return false;
        if (this.els[0].attributes[name])
            return true;
        return false;
    }
    /**
     * ***removeAttr*** : Remove attribute information from an element.
     * A code sample of TypeScript is shown below.
     * ```typescript
     * mjs.removeAttr("min");
     * ```
     * @param {string} name The name of the attribute to be deleted.
     * @returns {ModernJS}
     */
    removeAttr(name) {
        this.els.forEach((el) => {
            el.removeAttribute(name);
        });
        return this;
    }
    /**
     * ***src*** : Get or set the src attribute value.
     * A code sample of TypeScript is shown below.
     * An example of setting the src attribute is as follows:
     * ```typescript
     * mjs.src = "img/sample.png";
     * ```
     * An example of getting the src attribute is below.
     * ```typescript
     * const src : string = mjs.src;
     * ```
     */
    set src(value) {
        this.attr("src", value);
    }
    get src() {
        return this.attr("src");
    }
    /**
     * ***placeHolder*** : Get or set the placeholder attribute value.
     * A code sample of TypeScript is shown below.
     * An example of setting the src attribute is as follows:
     * ```typescript
     * mjs.placeHolder = "Placeholder text.....";
     * ```
     * An example of getting the src attribute is below.
     * ```typescript
     * const placeHolder : string = mjs.placeHolder;
     * ```
     */
    set placeHolder(value) {
        this.attr("placeholder", value);
    }
    get placeHolder() {
        return this.attr("placeholder");
    }
    /**
     * ***href*** : Get or set the href attribute value.
     * A code sample of TypeScript is shown below.
     * An example of setting the src attribute is as follows:
     * ```typescript
     * mjs.href = "css/style.css";
     * ```
     * An example of getting the src attribute is below.
     * ```typescript
     * const href : string = mjs.href;
     * ```
     */
    set href(value) {
        this.attr("href", value);
    }
    get href() {
        return this.attr("href");
    }
    /**
     * ***display*** : Set whether elements are visible or hidden.
     * A code sample of TypeScript is shown below.
     * ```typescript
     * mjs.display = true;
     * ```
     */
    set display(status) {
        if (status) {
            this.style({ display: null });
        }
        else {
            this.style({ display: "none" });
        }
    }
    /**
     * ***id*** : Gets or sets the ID attribute value of an element.
     * A code sample of TypeScript is shown below.
     * An example of setting the src attribute is as follows:
     * ```typescript
     * mjs.id = "ancher1";
     * ```
     * An example of getting the src attribute is below.
     * ```typescript
     * const id : string = mjs.id;
     * ```
     */
    set id(value) {
        this.attr("id", value);
    }
    get id() {
        return this.attr("id");
    }
    /**
     * ***name*** : Gets or sets the name attribute value of an element.
     * A code sample of TypeScript is shown below.
     * An example of setting the src attribute is as follows:
     * ```typescript
     * mjs.name = "tagname1";
     * ```
     * An example of getting the src attribute is below.
     * ```typescript
     * const name : string = mjs.name;
     * ```
     */
    set name(value) {
        this.attr("name", value);
    }
    get name() {
        return this.attr("name");
    }
    /**
     * ***isClass*** : Gets whether the class attribute of an element exists.
     * A code sample of TypeScript is shown below.
     * ```typescript
     * const exists : boolean = mjs.isClass("class1");
     * ```
     * @param {string} className Target class attribute
     * @returns {boolean}
     */
    isClass(className) {
        return this.els[0].classList.contains(className);
    }
    /**
     * ***addClass*** : Adds the specified class attribute to an element.
     * A code sample of TypeScript is shown below.
     * ```typescript
     * mjs.addClass("class2");
     * ```
     * @param {string} className add class attribute
     * @returns {ModernJS}
     */
    addClass(className) {
        this.els.forEach((el) => {
            el.classList.add(className);
        });
        return this;
    }
    /**
     * ***removeClass*** : Remove a class attribute from an element.
     * A code sample of TypeScript is shown below.
     * ```typescript
     * mjs.removeClass("class2");
     * ```
     * @param {string} className delete class attribute
     * @returns {ModernJS}
     */
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
    /**
     * ***removeData*** : Deletes data stored in the virtual DOM.
     * A code sample of TypeScript is shown below.
     * ```typescript
     * mjs.removeData("data01");
     * ```
     * @param {string} name delete data name
     * @returns {ModernJS}
     */
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
    /**
     * ***onClick*** : Set an event listener for when an element is clicked.
     * A code sample of TypeScript is shown below.
     * ```typescript
     * mjs.onClick = (e: Event, context: ModernJS) => {
     *      console.log("click event...");
     *      context.style({ color: "red" });
     * };
     * ```
     */
    set onClick(listener) {
        this.on("click", listener);
    }
    /**
     * ***onDblClick*** : Sets an event listener for when an element is double-clicked.
     * A code sample of TypeScript is shown below.
     * ```typescript
     * mjs.onDblClick = (e: Event, context: ModernJS) => {
     *      console.log("double click event...");
     *      context.style({ color: "red" });
     * };
     * ```
     */
    set onDblClick(listener) {
        this.on("dblclick", listener);
    }
    /**
     * ***onFocus*** : Sets an event listener for when an element is focused.
     * A code sample of TypeScript is shown below.
     * ```typescript
     * mjs.onFocus = (e: Event, context: ModernJS) => {
     *      console.log("focus event...");
     *      context.style({ color: "red" });
     * };
     * ```
     */
    set onFocus(listener) {
        this.on("focus", listener);
    }
    /**
     * ***onChange*** : Sets an event listener for when an element's input value is changed.
     * A code sample of TypeScript is shown below.
     * ```typescript
     * mjs.onChange = (e: Event, context: ModernJS) => {
     *      console.log("change event...");
     *      context.style({ color: "red" });
     * };
     * ```
     */
    set onChange(listener) {
        this.on("change", listener);
    }
    /**
     * ***onMouseDown*** : Sets an event listener for when the mouse button is pressed on an element.
     * A code sample of TypeScript is shown below.
     * ```typescript
     * mjs.onMouseDown = (e: Event, context: ModernJS) => {
     *      console.log("mouse down event...");
     *      context.style({ color: "red" });
     * };
     * ```
     */
    set onMouseDown(listener) {
        this.on("mousedown", listener);
    }
    /**
     * ***onMouseUp*** : Sets an event listener for when a mouse button is released on an element.
     * A code sample of TypeScript is shown below.
     * ```typescript
     * mjs.onMouseUp = (e: Event, context: ModernJS) => {
     *      console.log("mouse up event...");
     *      context.style({ color: "red" });
     * };
     * ```
     */
    set onMouseUp(listener) {
        this.on("mouseup", listener);
    }
    /**
     * ***onMouseMove*** : Sets an event listener for when the mouse cursor moves within an element.
     * A code sample of TypeScript is shown below.
     * ```typescript
     * mjs.onMouseMove = (e: Event, context: ModernJS) => {
     *      console.log("mouse move event...");
     *      context.style({ color: "red" });
     * };
     * ```
     */
    set onMouseMove(listener) {
        this.on("mousemove", listener);
    }
    /**
     * ***dispatch*** : Executes a specified event on an element.
     * A code sample of TypeScript is shown below.
     * ```typescript
     * mjs.dispatch("click");
     * ```
     * @param {HTMLElementEventMap} eventName dispatch event name
     * @returns {ModernJS}
     */
    dispatch(eventName) {
        this.els.forEach((el) => {
            let event = new Event(eventName);
            el.dispatchEvent(event);
        });
        return this;
    }
    /**
     * ***value*** : If the element is an input field, gets the entered or selected value.
     * A code sample of TypeScript is shown below.
     * ```typescript
     * const value = mjs.value;
     * ```
     */
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
    /**
     * ***value*** : If the element is an input field, set the input value or selected value.
     * A code sample of TypeScript is shown below.
     * An example of setting the src attribute is as follows:
     * ```typescript
     * mjs.value("value text ....");
     * ```
     * An example of getting the src attribute is below.
     * ```typescript
     * const value = mjs.value;
     * ```
     */
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
        this.dispatch("change");
    }
    /**
     * ***checked*** : If the element is a checkbox, sets whether it can be selected.
     * A code sample of TypeScript is shown below.
     * An example of setting the src attribute is as follows:
     * ```typescript
     * mjs.checked = true;
     * ```
     * An example of getting the src attribute is below.
     * ```typescript
     * const checked : boolean = mjs.checked;
     * ```
     */
    set checked(status) {
        // @ts-ignore
        const el = this.els[0];
        el.checked = status;
    }
    get checked() {
        // @ts-ignore
        const el = this.els[0];
        return el.checked;
    }
    /**
     * ***reset*** : If the element is an input field, resets the input or selected value.
     * A code sample of TypeScript is shown below.
     * ```typescript
     * mjs.reset();
     * ```
     * @returns {ModernJS}
     */
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
    /**
     * ***selectEmpty*** : If the element is a select tag, set the empty selection.
     * A code sample of TypeScript is shown below.
     * ```typescript
     * mjs.selectEmpty("--- Select ----");
     * ```
     * @param {string} text Selection Text Name
     * @returns {ModernJS}
     */
    selectEmpty(text) {
        const optionEl = document.createElement("option");
        optionEl.value = "";
        optionEl.innerHTML = text;
        this.els.forEach((el) => {
            el.insertAdjacentElement("afterbegin", optionEl);
        });
        return this;
    }
    /**
     * ***selectResetParam*** : If the element is a Select tag, reset the options.
     * A code sample of TypeScript is shown below.
     * ```typescript
     * mjs.selectResetParam();
     * ```
     * @returns {ModernJS}
     */
    selectResetParam() {
        this.text = "";
        return this;
    }
    /**
     * ***selectedText*** : If the element is a checkbox, gets the display text of the selected item.
     * A code sample of TypeScript is shown below.
     * ```typescript
     * const selected : string = mjs.selectedText;
     * ```
     */
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
    /**
     * ***childValues*** : Get all input values ​​of virtual DOM of childs.
     */
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
/**
 * ***dom*** : Finds an element for the specified query path and returns the virtual DOM class that contains the element.
 * For example, prepare the following HTML:
 * ```html
 * <div class="item"></div>
 * ```
 * To get the tag with the class attribute item as a virtual DOM, write the following code in TypeScript:
 * ```typescript
 * const subQuery : ModernJS = dom(".item");
 * ```
 * @param {string} queryString QueryString
 * @returns {ModernJS}
 */
exports.dom = ModernJS.dom;
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
const Lib_1 = require("Lib");
const Data_1 = require("Data");
const UI_1 = require("UI");
const ModernJS_1 = require("ModernJS");
const Shortcode_1 = require("Shortcode");
const Dialog_1 = require("Dialog");
class Response {
    static get routeType() {
        const MyApp = require("app/config/App").MyApp;
        return MyApp.routeType;
    }
    /**
     * ***back*** : Return to the previous screen.
     * However, this cannot be used if there is no history of the previous screen
     * or if screen transitions are disabled using lock.
     * The return value indicates whether the return to the previous screen was successful.
     * @returns {boolean}
     */
    static back() {
        if (Response.lock)
            return false;
        if (this.isBack)
            return false;
        this.isBack = true;
        let backUrl;
        if (this.routeType == App_1.AppRouteType.application) {
            if (Data_1.Data.getLength("history") == 1)
                return false;
            Data_1.Data.pop("history");
            backUrl = Data_1.Data.now("history");
        }
        else if (this.routeType == App_1.AppRouteType.web) {
            history.back();
            return true;
        }
        const route = Routes_1.Routes.searchRoute(backUrl);
        Response.rendering(route).then(() => {
            this.isBack = false;
        });
        return true;
    }
    static next(url, send) {
        if (Response.lock)
            return;
        this.isBack = false;
        Data_1.Data.push("history", url);
        const route = Routes_1.Routes.searchRoute(url);
        Response.rendering(route, send);
        if (this.routeType == App_1.AppRouteType.web)
            location.href = "#" + url;
    }
    /**
     * ***addhistory*** : Add root path to screen transition history.
     * It will only be added to the history and will not change the screen.
     * @param {string} url route path
     * @returns {void}
     */
    static addHistory(url) {
        if (Response.lock)
            return;
        this.isBack = false;
        Data_1.Data.push("history", url);
    }
    /**
     * ***historyClear*** : Clear screen transition history
     * @returns {void}
     */
    static historyClear() {
        Data_1.Data.set("history", []);
    }
    /**
     * ***pop*** : Go back to the previous screen transition.
     * @returns {void}
     */
    static pop() {
        Data_1.Data.pop("history");
    }
    static replace(url, send) {
        this.pop();
        this.next(url, send);
    }
    /**
     * ***now*** : Get current route path.
     * @returns {string}
     */
    static now() {
        return Routes_1.Routes.getRoute().url;
    }
    /**
     * ***isNext*** : A flag that determines if you have proceeded from the next screen.
     */
    static get isNext() {
        return !this.isBack;
    }
    /**
     * ***nowView*** : Get the current View class object if there is one.
     */
    static get nowView() {
        if (Data_1.Data.get("beforeView"))
            return Data_1.Data.get("beforeView");
    }
    /**
     * ***nowController*** : Get the current Controller class object if there is one.
     */
    static get nowController() {
        if (Data_1.Data.get("beforeController"))
            return Data_1.Data.get("beforeController");
    }
    // rendering....
    static rendering(route, send) {
        return __awaiter(this, void 0, void 0, function* () {
            const MyApp = require("app/config/App").MyApp;
            try {
                // Controller & View Leave 
                const befCont = Data_1.Data.get("beforeController");
                if (befCont) {
                    const befContAction = Data_1.Data.get("beforeControllerAction");
                    const res = yield befCont.handleLeave(befContAction);
                    if (typeof res == "boolean" && res === false)
                        return;
                    if (this.isBack) {
                        const resBack = yield befCont.handleLeaveBack(befContAction);
                        if (typeof resBack == "boolean" && resBack === false)
                            return;
                    }
                    if (this.isNext) {
                        const resNext = yield befCont.handleLeaveNext(befContAction);
                        if (typeof resNext == "boolean" && resNext === false)
                            return;
                    }
                }
                const befView = Data_1.Data.get("beforeView");
                if (befView) {
                    const res = yield befView.handleLeave();
                    if (typeof res == "boolean" && res === false)
                        return;
                    if (this.isBack) {
                        const resBack = yield befView.handleLeaveBack();
                        if (typeof resBack == "boolean" && resBack === false)
                            return;
                    }
                    if (this.isNext) {
                        const resNext = yield befView.handleLeaveNext();
                        if (typeof resNext == "boolean" && resNext === false)
                            return;
                    }
                }
                if (MyApp.animationCloseClassName)
                    (0, ModernJS_1.dom)("main").addClass(MyApp.animationCloseClassName);
                if (MyApp.animationOpenClassName)
                    (0, ModernJS_1.dom)("main").removeClass(MyApp.animationOpenClassName);
                if (MyApp.delay)
                    yield Lib_1.Lib.sleep(MyApp.delay);
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
            const controllerName = Lib_1.Lib.getModuleName(route.controller + "Controller");
            const controllerPath = "app/controller/" + Lib_1.Lib.getModulePath(route.controller + "Controller");
            if (!useExists(controllerPath)) {
                throw ("\"" + controllerPath + "\" Class is not found.");
            }
            const controllerClass = use(controllerPath);
            const cont = new controllerClass[controllerName]();
            cont.sendData = send;
            const viewName = route.action + "View";
            const viewPath = "app/view/" + route.controller + "/" + Lib_1.Lib.getModulePath(viewName);
            let vw;
            if (useExists(viewPath)) {
                const View_ = use(viewPath);
                if (!View_[Lib_1.Lib.getModuleName(viewName)]) {
                    console.error("[WARM] \"" + Lib_1.Lib.getModuleName(viewName) + "\"View Class not exists.");
                }
                else {
                    vw = new View_[Lib_1.Lib.getModuleName(viewName)]();
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
            const viewName = Lib_1.Lib.getModuleName(route.view + "View");
            const viewPath = "app/view/" + Lib_1.Lib.getModulePath(route.view + "View");
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
            const MyApp = require("app/config/App").MyApp;
            if (MyApp.animationCloseClassName)
                (0, ModernJS_1.dom)("main").removeClass(MyApp.animationCloseClassName);
            if (MyApp.animationOpenClassName)
                (0, ModernJS_1.dom)("main").addClass(MyApp.animationOpenClassName);
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
                    const template = this.bindTemplate((0, ModernJS_1.dom)("body"), context.template);
                    if (context.handleTemplateChanged)
                        yield context.handleTemplateChanged(template);
                }
            }
            else {
                Data_1.Data.set("beforeTemplate", null);
            }
            // View Rendering...
            const viewHtml = Response.view(context.view);
            if (!(0, ModernJS_1.dom)("main").length)
                (0, ModernJS_1.dom)("body").append("<main></main>");
            const main = (0, ModernJS_1.dom)("main");
            main.html = "<article>" + viewHtml + "</article>";
            context.mjs = main.childs;
            const beforeHead = Data_1.Data.get("beforeHead");
            if (beforeHead != context.head) {
                Data_1.Data.set("beforeHead", context.head);
                if (context.head) {
                    const head = this.bindUI((0, ModernJS_1.dom)("head"), context.head);
                    if (context.handleHeadChanged)
                        yield context.handleHeadChanged(head);
                }
                else {
                    (0, ModernJS_1.dom)("head").html = "";
                }
            }
            const beforeHeader = Data_1.Data.get("beforeHeader");
            if (beforeHeader != context.header) {
                Data_1.Data.set("beforeHeader", context.header);
                if (context.header) {
                    const header = this.bindUI((0, ModernJS_1.dom)("header"), context.header);
                    if (context.handleHeaderChanged)
                        yield context.handleHeaderChanged(header);
                }
                else {
                    (0, ModernJS_1.dom)("header").html = "";
                }
            }
            const beforeFooter = Data_1.Data.get("beforeFooter");
            if (beforeFooter != context.footer) {
                Data_1.Data.set("beforeFooter", context.footer);
                if (context.footer) {
                    const footer = this.bindUI((0, ModernJS_1.dom)("footer"), context.footer);
                    if (context.handleFooterChanged)
                        yield context.handleFooterChanged(footer);
                }
                else {
                    (0, ModernJS_1.dom)("footer").html = "";
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
        content = Lib_1.Lib.base64Decode(content);
        content = this.renderConvert(content);
        ;
        return content;
    }
    /**
     * ***view *** : Get View's content information.
     * @param {string} viewName View Name
     * @returns {string} view contents
     */
    static view(viewName) {
        return this.renderHtml("view/" + viewName);
    }
    static bindView(mjs, viewName, sendData) {
        mjs.html = this.view(viewName);
        return this.loadClass("View", viewName, mjs, sendData);
    }
    /**
     * ***template*** : Get template content information.
     * @param {string} templateName Template Name
     * @returns {string} template contents
     */
    static template(templateName) {
        return this.renderHtml("template/" + templateName);
    }
    static bindTemplate(mjs, templateName, sendData) {
        mjs.html = this.template(templateName);
        return this.loadClass("Template", templateName, mjs, sendData);
    }
    /**
     * ***UI*** : Get UI content information.
     * @param {string} uiName UI Name
     * @returns {string} UI contents
     */
    static UI(uiName) {
        return this.renderHtml("ui/" + uiName);
    }
    static bindUI(mjs, UIName, sendData) {
        mjs.html = this.UI(UIName);
        return this.loadClass("UI", UIName, mjs, sendData);
    }
    static appendUI(mjs, UIName, sendData) {
        mjs.append(this.UI(UIName), true);
        const myMjs = new ModernJS_1.ModernJS();
        mjs.reload(myMjs);
        return this.loadClass("UI", UIName, myMjs, sendData);
    }
    /**
     * ***dialog*** : Get Dialog content information.
     * @param {string} dialogName dialog name
     * @returns {string}
     */
    static dialog(dialogName) {
        return this.renderHtml("dialog/" + dialogName);
    }
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
        (0, ModernJS_1.dom)("body").append(dialogMjs, true);
        dialogMjs.reload();
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
        const className = Lib_1.Lib.getModuleName(loadClassName + classType);
        const classPath = Lib_1.Lib.getModulePath("app/" + classType.toLowerCase() + "/" + loadClassName + classType);
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
            if (!Lib_1.Lib.existResource(href))
                return;
            const resource = Lib_1.Lib.getResourceDataUrl(href);
            el.setAttribute("href", resource);
        });
        // image tag check...
        const imgs = el0.querySelectorAll("img");
        imgs.forEach((el) => {
            const src = el.attributes["src"].value;
            if (!Lib_1.Lib.existResource(src))
                return;
            const resource = Lib_1.Lib.getResourceDataUrl(src);
            el.setAttribute("src", resource);
        });
        // shortcode analysis
        el0.innerHTML = Shortcode_1.Shortcode.analysis(el0.innerHTML);
        return el0.innerHTML;
    }
}
exports.Response = Response;
/**
 * ***isBack*** : A flag that determines if you are back from the previous screen.
 * True if you return from the previous screen, false if you proceed from the previous screen
 */
Response.isBack = false;
/**
 * ***lock*** : Flag to lock screen transition operations.
 * If set to true, back operations such as Response.back will be temporarily disabled.
 */
Response.lock = false;
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
const Lib_1 = require("Lib");
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
            yield Background_1.Background.load();
            let url = "/";
            if (this.MyApp.routeType == App_1.AppRouteType.web) {
                if (location.hash)
                    url = location.hash.substring(1);
            }
            Response_1.Response.next(url);
        }))();
    }
    clickHandleDelegate(e) {
        if (Response_1.Response.lock)
            return false;
        // @ts-ignore
        let target = e.target;
        for (let n = 0; n < 10; n++) {
            try {
                if (!target.tagName)
                    return;
            }
            catch (error) {
                return;
            }
            if (target.tagName == "A")
                break;
            // @ts-ignore
            target = target.parentNode;
        }
        try {
            if (!target.attributes)
                return;
        }
        catch (error) {
            return;
        }
        if (!target.attributes["url"])
            return;
        // @ts-ignore
        let url = target.getAttribute("url");
        if (!url)
            return;
        Response_1.Response.next(url);
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
            Response_1.Response.rendering(route).then(() => {
                Response_1.Response.isBack = false;
            });
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
            return Lib_1.Lib.getResource(args.url);
        });
        Shortcode_1.Shortcode.add("resource_dataurl", (args) => {
            if (!args.url)
                return;
            return Lib_1.Lib.getResourceDataUrl(args.url);
        });
        Shortcode_1.Shortcode.add("resource_mimtype", (args) => {
            if (!args.url)
                return;
            return Lib_1.Lib.getResourceMimeType(args.url);
        });
        Shortcode_1.Shortcode.add("uniqId", (args) => {
            if (!args.length)
                args.length = "";
            return Lib_1.Lib.uniqId(parseInt(args.length));
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
/**
 * ***Shortcode*** : Classes for creating shortcodes
 */
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
/**
 * ***Template*** : Template classes
 * If there is anything you want to execute before using the template, prepare it here.
 */
class Template {
    /**
     * ***vdo*** : Virtual Dom for content.
     */
    get vdo() {
        return this.myMjs;
    }
    /**
     * ***vdos*** : Virtual DOM List of ModernJS Classes.
     */
    get vdos() {
        return this.mjs;
    }
    /**
     * ***handle*** : Event handler for when the template is displayed.
     * @param {any} sendData> Transmission data contents
     * @returns {void}
     */
    handle(sendData) { }
}
exports.Template = Template;
;
return exports;});
sfa.setFn("Lib", ()=>{var exports = {};
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SbnDateTime = exports.Lib = void 0;
const Shortcode_1 = require("Shortcode");
class Lib {
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
exports.Lib = Lib;
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
sfa.setFn("Validation", ()=>{var exports = {};
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidateMethod = exports.Validation = exports.ValidateErrorResult = exports.ValidateRule = void 0;
/**
 * ***ValidateRule*** : Validation check rule enumeration.
 */
var ValidateRule;
(function (ValidateRule) {
    /**
     * ***required*** : If no value is entered, an error is detected.
     *
     * ```typescript
     * {
     *   rule: ValidateRule.required,
     * }
     * ```
     */
    ValidateRule["required"] = "required";
    /**
     * ***length*** : If the length of the value (string) is not the specified length, an error is detected.
     *
     * Below is an example of an error being detected if the value is not 20 characters.
     * ```typescript
     * {
     *   rule: ValidateRule.length,
     *   args: [ 20 ],
     * }
     * ```
     */
    ValidateRule["length"] = "length";
    /**
     * ***lengthMin*** : If the length of the value (string) is less than the specified length, an error is detected.
     *
     * Below is an example of an error being detected if the value is 10 characters or less.
     * ```typescript
     * {
     *   rule: ValidateRule.lengthMin,
     *   args: [ 10 ],
     * }
     * ```
     */
    ValidateRule["lengthMin"] = "lengthMin";
    /**
     * ***lengthMax*** : If the length of the value (string) is greater than or equal to the specified length, an error is detected.
     *
     * Below is an example of an error being detected if the value is 128 characters or more.
     * ```typescript
     * {
     *   rule: ValidateRule.lengthMax,
     *   args: [ 128 ],
     * }
     * ```
     */
    ValidateRule["lengthMax"] = "lengthMax";
    /**
     * ***lengthBetween*** : If the length of the value (string) is outside the specified length range, an error is detected.
     *
     * Below is an example of an error being detected if the value is outside the range of 10 to 128 characters.
     * ```typescript
     * {
     *   rule: ValidateRule.lengthBetween,
     *   args: [ 10, 128 ],
     * }
     * ```
     */
    ValidateRule["lengthBetween"] = "lengthBetween";
    /**
     * ***byteLength*** : If the length of the value (string) is not the specified byte length, an error is detected.
     *
     * Below is an example of an error being detected if the value is not 20 byte.
     * ```typescript
     * {
     *   rule: ValidateRule.byteLength,
     *   args: [ 20 ],
     * }
     * ```
     */
    ValidateRule["byteLength"] = "byteLength";
    /**
     * ***byteLengthMin*** : If the length of the value (string) is less than the specified byte length, an error is detected.
     *
     * Below is an example of an error being detected if the value is 10 byte or less.
     * ```typescript
     * {
     *   rule: ValidateRule.byteLengthMin,
     *   args: [ 20 ],
     * }
     * ```
     */
    ValidateRule["byteLengthMin"] = "byteLengthMin";
    /**
     * ***byteLengthMax*** : If the length of the value (string) is greater than or equal to the specified byte length, an error is detected.
     *
     * Below is an example of an error being detected if the value is 128 byte or more.
     * ```typescript
     * {
     *   rule: ValidateRule.byteLengthMax,
     *   args: [ 128 ],
     * }
     * ```
     */
    ValidateRule["byteLengthMax"] = "byteLengthMax";
    /**
     * ***byteLengthBetween*** : If the length of the value (string) is outside the specified byte length range, an error is detected.
     *
     * Below is an example of an error being detected if the value is outside the range of 10 to 128 byte.
     * ```typescript
     * {
     *   rule: ValidateRule.byteLengthBetween,
     *   args: [ 10, 128 ],
     * }
     * ```
     */
    ValidateRule["byteLengthBetween"] = "byteLengthBetween";
    /**
     * ***value*** : If the value is not equal to the specified value, an error occurs.
     *
     * Below is an example of an error being detected if the value is other than 20.
     * ```typescript
     * {
     *   rule: ValidateRule.value,
     *   args: [ 30 ],
     * }
     * ```
     */
    ValidateRule["value"] = "value";
    /**
     * ***valueMin*** : If the value is less than or equal to the specified value, an error occurs.
     *
     * Below is an example of an error being detected if the value is less than 10.
     * ```typescript
     * {
     *   rule: ValidateRule.valueMin,
     *   args: [ 10 ],
     * }
     * ```
     */
    ValidateRule["valueMin"] = "valueMin";
    /**
     * ***valueMax*** : If the value is greater than or equal to the specified value, an error occurs.
     *
     * Below is an example of an error being detected if the value is 255 or more.
     * ```typescript
     * {
     *   rule: ValidateRule.valueMax,
     *   args: [ 255 ],
     * }
     * ```
     */
    ValidateRule["valueMax"] = "valueMax";
    /**
     * ***valueBetween*** : If the value is outside the specified range, an error is detected.
     *
     * Below is an example of an error being detected if the value is outside the range of 10 to 255.
     * ```typescript
     * {
     *   rule: ValidateRule.valueBetween,
     *   args: [ 10, 255 ],
     * }
     * ```
     */
    ValidateRule["valueBetween"] = "valueBetween";
    /**
     * ***selected*** : If the value is not one of the options, an error occurs.
     * ```typescript
     * {
     *    rule: ValidateRule.selected,
     *    args: [ "apple", "orange", "kiwi", "banana" ],
     * }
     * ```
     */
    ValidateRule["selected"] = "selected";
    /**
     * ***selectedLength*** : If the value (array value) does not select the specified number of items, an error will be detected.
     * ```typescript
     * {
     *    rule: ValidateRule.selectedLength,
     *    args: [ 3 ],
     * }
     * ```
     */
    ValidateRule["selectedLength"] = "selectedLength";
    /**
     * ***selectedLengthMin*** : If the number of values ​​(array values) selected is less than the specified number, an error will be detected.
     * ```typescript
     * {
     *    rule: ValidateRule.selectedLengthMin,
     *    args: [ 4 ],
     * }
     * ```
     */
    ValidateRule["selectedLengthMin"] = "selectedLengthMin";
    /**
     * ***selectedLengthMax*** : If the number of selected values ​​(array values) is greater than the specified number, an error will occur.
     * ```typescript
     * {
     *    rule: ValidateRule.selectedLengthMax,
     *    args: [ 10 ],
     * }
     * ```
    */
    ValidateRule["selectedLengthMax"] = "selectedLengthMax";
    /**
     * ***selectedLengthBetween*** : If you select a number of values ​​(array values) outside the specified range, an error will be detected.
     * ```typescript
     * {
     *    rule: ValidateRule.selectedLengthBetween,
     *    args: [ 5, 10 ],
     * }
     * ```
    */
    ValidateRule["selectedLengthBetween"] = "selectedLengthBetween";
    /**
     * ***confirmed*** : If the value is not the same as the specified value, an error occurs.
     * ```typescript
     * {
     *    rule: ValidateRule.confirmed,
     *    args: [ "password" ],
     * }
     * ```
     */
    ValidateRule["confirmed"] = "confirmed";
    /**
     * ***like*** : If the value does not contain the specified string, an error occurs.
     * ```typescript
     * {
     *    rule: ValidateRule.like,
     *    args: [ "word" ],
     * }
     * ```
     */
    ValidateRule["like"] = "like";
    /**
     * ***characterExists*** : If the value contains characters that do not exist in the specified string, an error occurs..
     * ```typescript
     * {
     *    rule: ValidateRule.characterExists,
     *    args: [ "0123456789" ],
     * }
     * ```
    */
    ValidateRule["characterExists"] = "characterExists";
    /**
     * ***alphaNumeric*** : If the value contains any characters other than half-width alphanumeric characters and specified special characters, an error is detected.
     * ```typescript
     * {
     *    rule: ValidateRule.alphaNumeric,
     * }
     * ```
     * Special characters can be allowed in args
     * ```typescript
     * {
     *    rule: ValidateRule.alphaNumeric,
     *    args: [ "-_=+/.," ],
     * }
     * ```
    */
    ValidateRule["alphaNumeric"] = "alphaNumeric";
    /**
     * ***alphaNumericLower*** : If the value contains any characters other than half-width alphanumeric characters and specified special characters, an error is detected.
     * Lowercase letters are allowed, but uppercase letters are not allowed.
     * ```typescript
     * {
     *    rule: ValidateRule.alphaNumericLower,
     * }
     * ```
     * Special characters can be allowed in args
     * ```typescript
     * {
     *    rule: ValidateRule.alphaNumericLower,
     *    args: [ "-_=+/.," ],
     * }
     * ```
     */
    ValidateRule["alphaNumericLower"] = "alphaNumericLower";
    /**
     * ***alphaNumericUpper*** : If the value contains any characters other than half-width alphanumeric characters and specified special characters, an error is detected.
     * Uppercase letters are allowed, but lowercase letters are not allowed.
     * ```typescript
     * {
     *    rule: ValidateRule.alphaNumericUpper,
     * }
     * ```
     * Special characters can be allowed in args
     * ```typescript
     * {
     *    rule: ValidateRule.alphaNumericUpper,
     *    args: [ "-_=+/.," ],
     * }
     * ```
     */
    ValidateRule["alphaNumericUpper"] = "alphaNumericUpper";
    /**
     * ***alpha*** : An error is detected if the value contains any characters other than half-width English characters and the specified special characters.
     * ```typescript
     * {
     *    rule: ValidateRule.alpha,
     * }
     * ```
     * Special characters can be allowed in args
     * ```typescript
     * {
     *    rule: ValidateRule.alpha,
     *    args: [ "-_=+/.," ],
     * }
     * ```
     */
    ValidateRule["alpha"] = "alpha";
    /**
     * ***alphaLower*** : An error is detected if the value contains any characters other than half-width English characters and the specified special characters.
     * Lowercase letters are allowed, but uppercase letters are not allowed.
     * ```typescript
     * {
     *    rule: ValidateRule.alphaLower,
     * }
     * ```
     * Special characters can be allowed in args
     * ```typescript
     * {
     *    rule: ValidateRule.alphaLower,
     *    args: [ "-_=+/.," ],
     * }
     * ```
     */
    ValidateRule["alphaLower"] = "alphaLower";
    /**
     * ***alphaUpper*** : An error is detected if the value contains any characters other than half-width English characters and the specified special characters.
     * Uppercase letters are allowed, but lowercase letters are not allowed.
     * ```typescript
     * {
     *    rule: ValidateRule.alphaUpper,
     * }
     * ```
     * Special characters can be allowed in args
     * ```typescript
     * {
     *    rule: ValidateRule.alphaUpper,
     *    args: [ "-_=+/.," ],
     * }
     * ```
     */
    ValidateRule["alphaUpper"] = "alphaUpper";
    /**
     * ***numeric*** : If the value contains any characters other than numeric characters and the specified special characters, an error is detected.
     * ```typescript
     * {
     *    rule: ValidateRule.numeric,
     * }
     * ```
     * Special characters can be allowed in args
     * ```typescript
     * {
     *    rule: ValidateRule.numeric,
     *    args: [ "-_=+/.," ],
     * }
     * ```
     */
    ValidateRule["numeric"] = "numeric";
    /**
     * ***isHiranaga*** : If the value contains hiragana and any other characters than the specified special characters, an error is detected.
     * ```typescript
     * {
     *    rule: ValidateRule.isHiranaga,
     * }
     * ```
     * Special characters can be allowed in args
     * ```typescript
     * {
     *    rule: ValidateRule.isHiranaga,
     *    args: [ "-_=+/.," ],
     * }
     * ```
     */
    ValidateRule["isHiranaga"] = "isHiranaga";
    /**
     * ***isKatakana*** : If the value contains katakana and any characters other than the specified special characters, an error is detected.
     * ```typescript
     * {
     *    rule: ValidateRule.isKatakana,
     * }
     * ```
     * Special characters can be allowed in args
     * ```typescript
     * {
     *    rule: ValidateRule.isKatakana,
     *    args: [ "-_=+/.," ],
     * }
     * ```
     */
    ValidateRule["isKatakana"] = "isKatakana";
    /**
     * ***custom*** : For custom validation
     * Execute validation using the specified function.
     *
     * ```typescript
     * {
     *   rule: ValidateRule.custom,
     *   args: [ "customValidate" ],
     * }
     * ```
     *
     * Then, place the customValidate method in the Validation-derived class as follows:
     *
     * ```typescript
     * public customValidate (value : string, args :Array<string>, context : ValidateMethod) {
     *    if (value === "custom value") {
     *        return true;
     *    }
     * }
     * ```
     *
     */
    ValidateRule["custom"] = "custom";
})(ValidateRule || (exports.ValidateRule = ValidateRule = {}));
class ValidateErrorResult {
    constructor() {
        /**
         * ***status*** : Verification check result flag.
         * ``false`` means there is an error,  ``true`` means there is no error
         */
        this.status = true;
        this.fields = [];
        this.fieldIndexs = {};
        this.errors = {};
    }
    get(name, index) {
        let res;
        if (name) {
            res = [];
            const errors = this.errors[name];
            if (!errors)
                return;
            errors.forEach((error) => {
                if (index && index != error.index)
                    return;
                let message = error.message;
                if (!message) {
                    message = "rule = " + error.rule;
                    if (error.args)
                        message += ", args = [" + error.args.join(",") + "]";
                    if (index)
                        message += ", index = " + index;
                }
                res.push(message);
            });
        }
        else {
            res = {};
            this.fields.forEach((field) => {
                const fieldCount = this.fieldIndexs[field];
                if (fieldCount) {
                    for (let n = 0; n < fieldCount; n++) {
                        const buffer = this.get(field, n);
                        if (buffer) {
                            if (!res[field])
                                res[field] = [];
                            res[field] = buffer;
                        }
                    }
                }
                else {
                    const buffer = this.get(field);
                    if (buffer) {
                        res[field] = buffer;
                    }
                }
            });
        }
        return res;
    }
    bind(mjs, name, index) {
        if (name) {
            if (!mjs.error)
                return;
            if (!mjs.error.childs[name])
                return;
            let target = mjs.error.childs[name];
            let result;
            if (index) {
                if (target.index(index)) {
                    target = target.index(index);
                    result = this.get(name, index);
                }
                else {
                    result = this.get(name);
                }
            }
            else {
                result = this.get(name);
            }
            if (!target)
                return;
            if (result) {
                target.addClass("active").text = result.join("\n");
            }
            else {
                target.removeClass("active").text = "";
            }
        }
        else {
            this.fields.forEach((field) => {
                if (this.fieldIndexs[field]) {
                    const fieldCount = this.fieldIndexs[field];
                    for (let n = 0; n < fieldCount; n++) {
                        this.bind(mjs, field, n);
                    }
                }
                else {
                    this.bind(mjs, field);
                }
            });
        }
    }
}
exports.ValidateErrorResult = ValidateErrorResult;
/**
 * ***Validation*** : Class used for input data validation checks.
 * There are two ways to set validation check rules:
 * Create a Validation derived class in the ``app/validation`` directory and place it there, or
 * Specify validation check rules directly using the ``verify`` method, etc.
 */
class Validation {
    static verify(data, rules) {
        const my = new this();
        if (rules)
            my.rules = rules;
        return my.verify(data);
    }
    /**
     * ***verify*** : Runs validation checks on given input data.
     * @param {any} data Input data
     * @returns {ValidateErrorResult}
     */
    verify(data) {
        const vm = new ValidateMethod(data, this);
        const c = Object.keys(this.rules);
        let result = new ValidateErrorResult();
        for (let n = 0; n < c.length; n++) {
            const name = c[n];
            const rules = this.rules[name];
            result.fields.push(name);
            rules.forEach((rule) => {
                if (!vm[rule.rule])
                    return;
                const value = data[name];
                if (Array.isArray(value) && rule.rule.indexOf("selectedLength") === -1) {
                    result.fieldIndexs[name] = value.length;
                    value.forEach((v_, index) => {
                        const status = vm[rule.rule](v_, rule.args);
                        if (!status) {
                            if (!result.errors[name])
                                result.errors[name] = [];
                            result.errors[name].push({
                                rule: rule.rule,
                                index: index,
                                args: rule.args,
                                message: rule.message,
                            });
                        }
                    });
                }
                else {
                    const status = vm[rule.rule](data[name], rule.args);
                    if (!status) {
                        if (!result.errors[name])
                            result.errors[name] = [];
                        result.errors[name].push({
                            rule: rule.rule,
                            args: rule.args,
                            message: rule.message,
                        });
                    }
                }
            });
        }
        if (Object.keys(result.errors).length)
            result.status = false;
        return result;
    }
    static verifyBind(mjs, data, rules) {
        const my = new this();
        if (rules)
            my.rules = rules;
        return my.verifyBind(mjs, data);
    }
    /**
     * ***verifyBind*** : After checking the input data for validity, the error content is automatically bound using the virtual DOM.
     * @param {ModernJSList} mjs Virtual DOM Class List
     * @param {any} data input data
     * @returns {ValidateErrorResult}
     */
    verifyBind(mjs, data) {
        const result = this.verify(data);
        result.bind(mjs);
        return result;
    }
}
exports.Validation = Validation;
/**
 * ***ValidateMethod*** : Preset functions for validation checks.
 */
class ValidateMethod {
    constructor(input, context) {
        this.input = input;
        this.context = context;
    }
    getArgValue(args, index) {
        if (!args)
            return;
        if (!args[index])
            return;
        if (args[index].toString().indexOf("@") === 0) {
            return this.input[args[index].toString().substring(0)];
        }
        return args[index];
    }
    required(value) {
        if (value === undefined ||
            value === null ||
            value === "") {
            return false;
        }
        return true;
    }
    length(value, args) {
        if (!this.required(value))
            return true;
        const target = this.getArgValue(args, 0);
        if (value.length !== target)
            return false;
        return true;
    }
    lengthMin(value, args) {
        if (!this.required(value))
            return true;
        const target = this.getArgValue(args, 0);
        if (value.length < target)
            return false;
        return true;
    }
    lengthMax(value, args) {
        if (!this.required(value))
            return true;
        const target = this.getArgValue(args, 0);
        if (value.length > target)
            return false;
        return true;
    }
    lengthBetween(value, args) {
        if (!this.required(value))
            return true;
        const targetMin = this.getArgValue(args, 0);
        const targetMax = this.getArgValue(args, 1);
        if (value.length < targetMin)
            return false;
        if (value.length > targetMax)
            return false;
        return true;
    }
    byteLength(value, args) {
        if (!this.required(value))
            return true;
        const target = this.getArgValue(args, 0);
        const byteValue = new TextEncoder().encode(value);
        if (byteValue.byteLength !== target)
            return false;
        return true;
    }
    byteLengthMin(value, args) {
        if (!this.required(value))
            return true;
        const target = this.getArgValue(args, 0);
        const byteValue = new TextEncoder().encode(value);
        if (byteValue.byteLength < target)
            return false;
        return true;
    }
    byteLengthMax(value, args) {
        if (!this.required(value))
            return true;
        const target = this.getArgValue(args, 0);
        const byteValue = new TextEncoder().encode(value);
        if (byteValue.byteLength > target)
            return false;
        return true;
    }
    byteLengthBetween(value, args) {
        if (!this.required(value))
            return true;
        const targetMin = this.getArgValue(args, 0);
        const targetMax = this.getArgValue(args, 1);
        const byteValue = new TextEncoder().encode(value);
        if (byteValue.byteLength < targetMin)
            return false;
        if (byteValue.byteLength > targetMax)
            return false;
        return true;
    }
    value(value, args) {
        if (!this.required(value))
            return true;
        const target = this.getArgValue(args, 0);
        if (value !== target)
            return false;
        return true;
    }
    valueMin(value, args) {
        if (!this.required(value))
            return true;
        const target = this.getArgValue(args, 0);
        if (value < target)
            return false;
        return true;
    }
    valueMax(value, args) {
        if (!this.required(value))
            return true;
        const target = this.getArgValue(args, 0);
        if (value > target)
            return false;
        return true;
    }
    valueBetween(value, args) {
        if (!this.required(value))
            return true;
        const targetMin = this.getArgValue(args, 0);
        const targetMax = this.getArgValue(args, 1);
        if (value < targetMin)
            return false;
        if (value > targetMax)
            return false;
        return true;
    }
    selected(value, args) {
        if (!this.required(value))
            return true;
        if (args.indexOf(value) === -1)
            return false;
        return true;
    }
    selectedLength(value, args) {
        if (!this.required(value))
            return true;
        const target = this.getArgValue(args, 0);
        if (value.length !== target)
            return false;
        return true;
    }
    selectedLengthMin(value, args) {
        if (!this.required(value))
            return true;
        const target = this.getArgValue(args, 0);
        if (value.length < target)
            return false;
        return true;
    }
    selectedLengthMax(value, args) {
        if (!this.required(value))
            return true;
        const target = this.getArgValue(args, 0);
        if (value.length > target)
            return false;
        return true;
    }
    selectedLengthBetween(value, args) {
        if (!this.required(value))
            return true;
        const targetMin = this.getArgValue(args, 0);
        const targetMax = this.getArgValue(args, 1);
        if (value.length < targetMin)
            return false;
        if (value.length > targetMax)
            return false;
        return true;
    }
    confirmed(value, args) {
        if (!this.required(value))
            return true;
        const target = this.getArgValue(args, 0);
        if (value != target)
            return false;
        return true;
    }
    like(value, args) {
        if (!this.required(value))
            return true;
        const target = this.getArgValue(args, 0);
        if (value.indexOf(target) === -1)
            return false;
        return true;
    }
    characterExists(value, args) {
        if (!this.required(value))
            return true;
        const target = this.getArgValue(args, 0);
        let status = true;
        for (let n = 0; n < value.toString().length; n++) {
            const v = value.toString()[n];
            if (target.indexOf(v) === -1) {
                status = false;
                break;
            }
        }
        return status;
    }
    alphaNumeric(value, args) {
        if (!this.required(value))
            return true;
        const addChars = this.getArgValue(args, 0);
        let target = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
        if (addChars)
            target += addChars;
        return this.characterExists(value, [target]);
    }
    alphaNumericLower(value, args) {
        if (!this.required(value))
            return true;
        const addChars = this.getArgValue(args, 0);
        let target = "0123456789abcdefghijklmnopqrstuvwxyz";
        if (addChars)
            target += addChars;
        return this.characterExists(value, [target]);
    }
    alphaNumericUpper(value, args) {
        if (!this.required(value))
            return true;
        const addChars = this.getArgValue(args, 0);
        let target = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        if (addChars)
            target += addChars;
        return this.characterExists(value, [target]);
    }
    alpha(value, args) {
        if (!this.required(value))
            return true;
        const addChars = this.getArgValue(args, 0);
        let target = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
        if (addChars)
            target += addChars;
        return this.characterExists(value, [target]);
    }
    alphaLower(value, args) {
        if (!this.required(value))
            return true;
        const addChars = this.getArgValue(args, 0);
        let target = "abcdefghijklmnopqrstuvwxyz";
        if (addChars)
            target += addChars;
        return this.characterExists(value, [target]);
    }
    alphaUpper(value, args) {
        if (!this.required(value))
            return true;
        const addChars = this.getArgValue(args, 0);
        let target = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        if (addChars)
            target += addChars;
        return this.characterExists(value, [target]);
    }
    numeric(value, args) {
        if (!this.required(value))
            return true;
        const addChars = this.getArgValue(args, 0);
        let target = "0123456789";
        if (addChars)
            target += addChars;
        return this.characterExists(value, [target]);
    }
    isHiranaga(value, args) {
        if (!this.required(value))
            return true;
        const addChars = this.getArgValue(args, 0);
        let target = "あいうえおかきくけこがぎぐげござじずぜそただちつてとだぢづでとなにぬねのはひふへほばびぶべぼぱぴぷぺぽまみむめもやゆよらりるれろわをん";
        if (addChars)
            target += addChars;
        return this.characterExists(value, [target]);
    }
    isKatakana(value, args) {
        if (!this.required(value))
            return true;
        const addChars = this.getArgValue(args, 0);
        let target = "アイウエオカキクケコガギグゲゴザジズゼソタダチツテトダヂヅデトナニヌネノハヒフヘホバビブベボパピプペポマミムメモヤユヨラリルレロワヲン";
        if (addChars)
            target += addChars;
        return this.characterExists(value, [target]);
    }
    custom(value, args) {
        const custom = this.context[args[0]];
        if (!custom)
            return true;
        return custom(value, args, this);
    }
}
exports.ValidateMethod = ValidateMethod;
;
return exports;});
sfa.setFn("View", ()=>{var exports = {};
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.View = void 0;
const Routes_1 = require("Routes");
const Response_1 = require("Response");
/**
 * ***View*** : Main class for each screen.
 */
class View {
    constructor() {
        /**
         * ***beginStatus*** :
         */
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
     * ***vdo*** : Virtual Dom for content.
     */
    get vdo() {
        return this.myMjs;
    }
    /**
     * ***vdos*** : Virtual DOM List of ModernJS Classes.
     */
    get vdos() {
        return this.mjs;
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
     * ***setHead*** : If there is a UI to set in the head tag, you can specify it.
     * @param headName
     */
    setHead(headName) {
        this.head = headName;
        const routes = Routes_1.Routes.getRoute();
        Response_1.Response.__rendering(routes, this);
    }
    /**
     * ***setHeader*** : If there is a UI to set in the header tag, you can specify it.
     * @param headerName
     */
    setHeader(headerName) {
        this.header = headerName;
        const routes = Routes_1.Routes.getRoute();
        Response_1.Response.__rendering(routes, this);
    }
    /**
     * ***setFooter*** : If there is a UI to set in the footer tag, you can specify it.
     * @param footerName
     */
    setFooter(footerName) {
        this.header = footerName;
        const routes = Routes_1.Routes.getRoute();
        Response_1.Response.__rendering(routes, this);
    }
    /**
     * ***handle*** :
     * A handler that runs automatically when the view is drawn on the screen.
     * This event is executed only when rendered.
     */
    handle(...aregment) { }
    /**
     * ***handleAlways*** : A handler that runs automatically when the View is displayed on screen.
     * This event is always executed even if the same View has already been rendered..
     */
    handleAlways() { }
    /**
     * ***handleBegin*** : A handler executed just before transitioning to the page.
     */
    handleBegin() { }
    /**
     * ***handleBefore*** : A handler executed just before transitioning to the page.
     */
    handleBefore(beginStatus) { }
    /**
     * ***handleAfter*** : A handler executed immediately after transitioning to the page
     */
    handleAfter(beginStatus) { }
    /**
     * ***handleRenderBefore*** : A handler executed immediately after page transition and rendering process to the screen is completed
     */
    handleRenderBefore(beginStatus) { }
    /**
     * ***handleRenderAfter*** : A handler that is executed after page transition, after rendering process to the screen is completed,
     * and after the event for each action is completed.
     */
    handleRenderAfter(beginStatus) { }
    /**
     * ***handleLeave*** : A handler executed when leaving the page.
     */
    handleLeave() { }
    /**
     * ***handleLeaveBack*** : Handler that is executed when returning to the previous screen.
     */
    handleLeaveBack() { }
    /**
     * ***handleLeaveNext*** : Handler that runs when proceeding to the next screen
     */
    handleLeaveNext() { }
    /**
     * ***handleTemplateChanged*** : A handler that runs when the template specified in the member variable template changes.
     */
    handleTemplateChanged(template) { }
    /**
     * ***handleHeadChanged*** : A handler that runs when the template specified in the member variable head tag changes.
     */
    handleHeadChanged(head) { }
    /**
     * ***handleHeaderChanged*** : A handler that runs when the template specified in the member variable header tag changes.
     */
    handleHeaderChanged(header) { }
    /**
     * ***handleFooterChanged*** : A handler that runs when the template specified in the member variable footer tag changes.
     */
    handleFooterChanged(footer) { }
}
exports.View = View;
;
return exports;});
sfa.setFn("UI", ()=>{var exports = {};
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UI = void 0;
class UI {
    /**
     * ***vdo*** : Virtual Dom for content.
     */
    get vdo() {
        return this.myMjs;
    }
    /**
     * ***vdos*** : Virtual DOM List of ModernJS Classes.
     */
    get vdos() {
        return this.mjs;
    }
    /**
     * ***handle*** : Event handler for when the UI is displayed.
     * @param {any} sendData? Transmission data contents
     * @returns {void}
     */
    handle(sendData) { }
}
exports.UI = UI;
;
return exports;});
sfa.setFn("CORERES/dialog/style.css", ()=>{ return "ZGlhbG9nIHsKICAgIGRpc3BsYXk6YmxvY2s7CiAgICBwb3NpdGlvbjpmaXhlZDsKICAgIGxlZnQ6MDsKICAgIHRvcDowOwogICAgd2lkdGg6MTAwJTsKICAgIGhlaWdodDoxMDAlOwogICAgei1pbmRleDoxMDA7CiAgICBiYWNrZ3JvdW5kOnJnYmEoMCwwLDAsMC42KTsKICAgIG9wYWNpdHk6MDsKICAgIHRyYW5zaXRpb24tZHVyYXRpb246MzAwbXM7CiAgICB0cmFuc2l0aW9uLXByb3BlcnR5OiBvcGFjaXR5Owp9CmRpYWxvZy5vcGVuIHsKICAgIG9wYWNpdHk6IDE7Cn0KZGlhbG9nIGR3aW5kb3cgewogICAgcG9zaXRpb246Zml4ZWQ7CiAgICBsZWZ0OjUwJTsKICAgIHRvcDo1MCU7CiAgICB3aWR0aDoxMDAlOwogICAgbWF4LXdpZHRoOjgwJTsKICAgIHRyYW5zZm9ybTp0cmFuc2xhdGVYKC01MCUpIHRyYW5zbGF0ZVkoLTUwJSk7CiAgICBiYWNrZ3JvdW5kOndoaXRlOwogICAgY29sb3I6YmxhY2s7Cn0="});
sfa.setFn("app/config/App", ()=>{var exports = {};
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyApp = void 0;
const App_1 = require("App");
const Routes_1 = require("app/config/Routes");
/**
 * ***App Initial Setup***
 */
class MyApp extends App_1.App {
}
exports.MyApp = MyApp;
// routeType
MyApp.routeType = App_1.AppRouteType.application;
// routes
MyApp.routes = Routes_1.MyRoutes;
;
return exports;});
sfa.setFn("app/config/Routes", ()=>{var exports = {};
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyRoutes = void 0;
/**
 * Routing for each screen
 */
exports.MyRoutes = {
    "/": "home", // Home
    "/page1": {
        "/": "page1",
        "/type1": "page1/type1",
    },
    "/page2": {
        "/": "page2",
        "/{id}": "page2/detail",
    },
    "/page3": "page3",
    "/page4": {
        "/": "page4",
        "/{id}": "page4/detail",
    },
    "/page5": "page5",
    "/page6": "page6",
};
;
return exports;});
sfa.setFn("app/dialog/AlertDialog", ()=>{var exports = {};
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlertDialog = void 0;
const Dialog_1 = require("Dialog");
const Response_1 = require("Response");
/**
 * Alert Dialog Class
 */
class AlertDialog extends Dialog_1.Dialog {
    static open(arg1, arg2, arg3, arg4) {
        let title;
        let message;
        let closeText;
        let closeHandle;
        if (arg4 != undefined) {
            title = arg1;
            message = arg2;
            closeText = arg3;
            closeHandle = arg4;
        }
        else {
            if (typeof arg3 == "string") {
                title = arg1;
                message = arg2;
                closeText = arg3;
            }
            else {
                message = arg1;
                closeText = arg2;
                closeHandle = arg3;
            }
        }
        const context = Response_1.Response.openDialog("alert");
        context.mjs.title.display = false;
        if (title) {
            context.mjs.title.display = true;
            context.mjs.title.text = title;
        }
        context.mjs.message.text = message;
        context.mjs.close.text = closeText;
        context.mjs.close.onClick = () => {
            if (closeHandle)
                closeHandle();
            context.close();
        };
    }
}
exports.AlertDialog = AlertDialog;
;
return exports;});
sfa.setFn("app/dialog/ConfirmDialog", ()=>{var exports = {};
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfirmDialog = void 0;
const Dialog_1 = require("Dialog");
const Response_1 = require("Response");
/**
 * Confirm Dialog Class
 */
class ConfirmDialog extends Dialog_1.Dialog {
    /**
     * ***open** : Opens an confirm dialog.
     * @param {string} message message
     * @param {string} nextText next button text
     * @param {string} closeText close button text
     * @param {() => void} nextHandle next button click handle
     * @param {() => void} closeHandle Close button click handle
     */
    static open(message, nextText, closeText, nextHandle, closeHandle) {
        const context = Response_1.Response.openDialog("confirm");
        context.mjs.message.text = message;
        context.mjs.next.text = nextText;
        context.mjs.next.onClick = () => {
            nextHandle();
            context.close();
        };
        context.mjs.close.text = closeText;
        context.mjs.close.onClick = () => {
            closeHandle();
            context.close();
        };
    }
}
exports.ConfirmDialog = ConfirmDialog;
;
return exports;});
sfa.setFn("app/dialog/LoadingDialog", ()=>{var exports = {};
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoadingDialog = void 0;
const Dialog_1 = require("Dialog");
const Response_1 = require("Response");
/**
 * Loading Icon Dialog Class
 */
class LoadingDialog extends Dialog_1.Dialog {
    /**
     * ***open** : Opens an loading Icon dialog.
     * @param message
     * @returns
     */
    static open(message) {
        const loadingDialog = Response_1.Response.openDialog("loading");
        loadingDialog.mjs.message.text = message;
        return loadingDialog;
    }
}
exports.LoadingDialog = LoadingDialog;
;
return exports;});
sfa.setFn("app/ui/HeaderUI", ()=>{var exports = {};
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HeaderUI = void 0;
const Response_1 = require("Response");
const UI_1 = require("UI");
/**
 * Header UI Class
 */
class HeaderUI extends UI_1.UI {
    /**
     * Set the header title
     */
    static set setTitle(title) {
        this.title.text = title;
    }
    /**
     * Show/hide back button
     */
    static set setBack(status) {
        if (status) {
            this.back.display = true;
        }
        else {
            this.back.display = false;
        }
    }
    handle() {
        HeaderUI.title = this.mjs.title;
        HeaderUI.back = this.mjs.back;
        this.mjs.back.onClick = () => {
            Response_1.Response.back();
        };
    }
}
exports.HeaderUI = HeaderUI;
;
return exports;});
sfa.setFn("app/validation/Page5Validation", ()=>{var exports = {};
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Page5Validation = void 0;
const Validation_1 = require("Validation");
class Page5Validation extends Validation_1.Validation {
    constructor() {
        super(...arguments);
        this.rules = {
            input1: [
                {
                    rule: Validation_1.ValidateRule.required,
                    message: "未入力です",
                },
            ],
            input2: [
                {
                    rule: Validation_1.ValidateRule.length,
                    args: [4],
                    message: "4文字で入力してください",
                },
            ],
            input3: [
                {
                    rule: Validation_1.ValidateRule.lengthMin,
                    args: [4],
                    message: "4文字以上で入力してください",
                },
            ],
            input4: [
                {
                    rule: Validation_1.ValidateRule.lengthMax,
                    args: [4],
                    message: "4文字以下で入力してください",
                },
            ],
            input5: [
                {
                    rule: Validation_1.ValidateRule.lengthBetween,
                    args: [4, 12],
                    message: "4 - 12文字の範囲で入力してください",
                },
            ],
        };
    }
}
exports.Page5Validation = Page5Validation;
;
return exports;});
sfa.setFn("app/view/HomeView", ()=>{var exports = {};
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HomeView = void 0;
const Response_1 = require("Response");
const View_1 = require("app/view/View");
const LoadingDialog_1 = require("app/dialog/LoadingDialog");
/**
 * Home View Class
 * Display screen immediately after launching the app.
 */
class HomeView extends View_1.View {
    handle() {
        this.back = false;
        this.title = "Home";
        // When the page1 button is pressed.
        this.mjs.page1.onClick = () => {
            // next to Page1.
            Response_1.Response.next("/page1");
        };
        // When the page2 button is pressed.
        this.mjs.page2.onClick = () => {
            // next to Page2.
            Response_1.Response.next("/page2");
        };
        // When the page3 button is pressed.
        this.mjs.page3.onClick = () => {
            // next to Page3.
            Response_1.Response.next("/page3");
        };
        // When the page4 button is pressed.
        this.mjs.page4.onClick = () => {
            // next to Page4.
            Response_1.Response.next("/page4");
        };
        // When the page5 button is pressed.
        this.mjs.page5.onClick = () => {
            // next to Page5.
            Response_1.Response.next("/page5");
        };
        // When the page6 button is pressed.
        this.mjs.page6.onClick = () => {
            // next to Page5.
            // Lock and stop screen transition function
            Response_1.Response.lock = true;
            // Loading Dialog Open
            const load = LoadingDialog_1.LoadingDialog.open("3s wait...");
            setTimeout(() => {
                // delay 3s...
                // Loading Dialog Close.
                load.close();
                // Unlock screen transitions
                Response_1.Response.lock = false;
                // next to Page6..
                Response_1.Response.next("/page6");
            }, 3000);
        };
    }
}
exports.HomeView = HomeView;
;
return exports;});
sfa.setFn("app/view/Page1View", ()=>{var exports = {};
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Page1View = void 0;
const Response_1 = require("Response");
const View_1 = require("app/view/View");
/**
 * Page1 View Class
 */
class Page1View extends View_1.View {
    handle() {
        this.title = "Page1";
        // When you press the next button
        this.mjs.btn.childs.next.onClick = () => {
            // move to type1
            Response_1.Response.next("/page1/type1");
        };
        // When you press the replace button
        this.mjs.btn.childs.replace.onClick = () => {
            // move to type1 (replace)
            Response_1.Response.replace("/page1/type1");
        };
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
/**
 * Page2 View Class
 */
class Page2View extends View_1.View {
    handle() {
        this.title = "Page2";
        this.mjs.description.text = "Description Text Text Text...";
        // item (first)
        const first = this.mjs.item.first;
        first.text += "(First)";
        first.style({ color: "pink" });
        // item (last)
        const last = this.mjs.item.last;
        last.text += "(Last)";
        last.style({ color: "lightgreen" });
        // item (index = 2)
        const id3 = this.mjs.item.index(2);
        id3.text += "(target)";
        id3.style({ color: "yellow" });
        // button1
        const button1 = this.mjs.button1;
        button1.datas.alertMessage = "Alert Message Test Sample ....";
        button1.onClick = (_, my) => {
            setTimeout(() => {
                alert(my.datas.alertMessage);
            }, 200);
        };
        // link 
        this.mjs.link1.onClick = () => {
            Response_1.Response.next("/page2/1");
        };
        this.mjs.link2.onClick = () => {
            Response_1.Response.next("/page2/2");
        };
        this.mjs.link3.onClick = () => {
            Response_1.Response.next("/page2/3");
        };
    }
}
exports.Page2View = Page2View;
;
return exports;});
sfa.setFn("app/view/Page3View", ()=>{var exports = {};
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Page3View = void 0;
const Response_1 = require("Response");
const View_1 = require("app/view/View");
const AlertDialog_1 = require("app/dialog/AlertDialog");
const ConfirmDialog_1 = require("app/dialog/ConfirmDialog");
const LoadingDialog_1 = require("app/dialog/LoadingDialog");
class Page3View extends View_1.View {
    handle() {
        this.title = "Page3";
        this.mjs.d1.onClick = () => {
            // open dialog (test dialog)
            const testDialog = Response_1.Response.openDialog("test");
            testDialog.mjs.close.onClick = () => {
                testDialog.close();
            };
        };
        this.mjs.d2.onClick = () => {
            // open alert dialog1
            AlertDialog_1.AlertDialog.open("Dialog Title", "description text sample \n ... OK!", "Close");
        };
        this.mjs.d3.onClick = () => {
            // open alert dialog2
            AlertDialog_1.AlertDialog.open("alert dialog2 description text sample....", "Next", () => {
                AlertDialog_1.AlertDialog.open("ok", "close", () => { });
            });
        };
        this.mjs.d4.onClick = () => {
            // open confirm dialog
            ConfirmDialog_1.ConfirmDialog.open("Confirm dialog description text sample....", "Next", "Cancel", () => {
                AlertDialog_1.AlertDialog.open("OK", "close", () => { });
            }, () => { });
        };
        this.mjs.d5.onClick = () => {
            // loading dialog...
            const ld = LoadingDialog_1.LoadingDialog.open("Loading Test...");
            setTimeout(() => {
                ld.close();
            }, 4000);
        };
    }
}
exports.Page3View = Page3View;
;
return exports;});
sfa.setFn("app/view/Page4View", ()=>{var exports = {};
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Page4View = void 0;
const Response_1 = require("Response");
const View_1 = require("app/view/View");
class Page4View extends View_1.View {
    handle() {
        this.title = "Page4";
        Page4View.stub.forEach((s_) => {
            const item = Response_1.Response.appendUI(this.mjs.list, "page4item");
            item.mjs.name.text = s_.name;
            item.mjs.code.text = s_.code;
            item.mjs.link.datas.id = s_.id;
            item.mjs.link.onClick = (_, my) => {
                Response_1.Response.next("/page4/" + my.datas.id);
            };
        });
    }
}
exports.Page4View = Page4View;
Page4View.stub = [
    {
        id: 0,
        name: "Item Name 00",
        code: "00000",
        description: "item 00 description text sample....",
    },
    {
        id: 1,
        name: "Item Name 01",
        code: "00001",
        description: "item 01 description text sample....",
    },
    {
        id: 2,
        name: "Item Name 02",
        code: "00002",
        description: "item 02 description text sample....",
    },
    {
        id: 3,
        name: "Item Name 03",
        code: "00003",
        description: "item 03 description text sample....",
    },
    {
        id: 4,
        name: "Item Name 04",
        code: "00004",
        description: "item 04 description text sample....",
    },
];
;
return exports;});
sfa.setFn("app/view/Page5View", ()=>{var exports = {};
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Page5View = void 0;
const View_1 = require("app/view/View");
const Page5Validation_1 = require("app/validation/Page5Validation");
const AlertDialog_1 = require("app/dialog/AlertDialog");
class Page5View extends View_1.View {
    handle() {
        this.title = "Page5";
        this.mjs.submit.onClick = () => {
            const post = {
                input1: this.mjs.input1.value,
                input2: this.mjs.input2.value,
                input3: this.mjs.input3.value,
                input4: this.mjs.input4.value,
                input5: this.mjs.input5.value,
            };
            const vres = Page5Validation_1.Page5Validation.verifyBind(this.mjs, post);
            if (!vres.status)
                return;
            AlertDialog_1.AlertDialog.open("Submit OK!", "OK", () => { });
        };
    }
}
exports.Page5View = Page5View;
;
return exports;});
sfa.setFn("app/view/Page6View", ()=>{var exports = {};
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Page6View = void 0;
const View_1 = require("app/view/View");
class Page6View extends View_1.View {
    handle() {
        this.title = "Page6";
    }
}
exports.Page6View = Page6View;
;
return exports;});
sfa.setFn("app/view/View", ()=>{var exports = {};
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.View = void 0;
const View_1 = require("View");
const HeaderUI_1 = require("app/ui/HeaderUI");
class View extends View_1.View {
    constructor() {
        super(...arguments);
        this.template = "default";
        this.header = "header";
        this.head = "head";
    }
    /**
     * ***title*** : Sets the header title text.
     */
    set title(title) {
        HeaderUI_1.HeaderUI.setTitle = title;
    }
    /**
     * ***back*** : header Back button visibility flag.
     */
    set back(status) {
        HeaderUI_1.HeaderUI.setBack = status;
    }
    handleRenderBefore() {
        this.back = true;
    }
}
exports.View = View;
;
return exports;});
sfa.setFn("app/view/page1/Type1View", ()=>{var exports = {};
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Type1View = void 0;
const View_1 = require("app/view/View");
class Type1View extends View_1.View {
    handle() {
        this.title = "Page1 Type1";
        this.setDt();
        this.interval = setInterval(() => {
            this.setDt();
        }, 1000);
    }
    setDt() {
        const d_ = new Date();
        this.vdos.datetime.text = "DateTime = " +
            d_.getFullYear() + "/" +
            ("00" + (d_.getMonth() + 1)).slice(-2) + "/" +
            ("00" + d_.getDate()).slice(-2) + " " +
            ("00" + d_.getHours()).slice(-2) + ":" +
            ("00" + d_.getMinutes()).slice(-2) + ":" +
            ("00" + d_.getSeconds()).slice(-2);
    }
    // Screen-off handler.
    handleLeave() {
        // Interval Stop.
        clearInterval(this.interval);
    }
}
exports.Type1View = Type1View;
;
return exports;});
sfa.setFn("app/view/page2/DetailView", ()=>{var exports = {};
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DetailView = void 0;
const View_1 = require("app/view/View");
class DetailView extends View_1.View {
    handle(id) {
        this.title = "Page2(ID = " + id + ")";
    }
}
exports.DetailView = DetailView;
;
return exports;});
sfa.setFn("app/view/page4/DetailView", ()=>{var exports = {};
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DetailView = void 0;
const View_1 = require("app/view/View");
const Page4View_1 = require("app/view/Page4View");
class DetailView extends View_1.View {
    handle(id) {
        this.title = "Page4 (index = " + id + ")";
        let item;
        Page4View_1.Page4View.stub.forEach((s_) => {
            if (s_.id != id)
                return;
            item = s_;
        });
        this.mjs.name.text = item.name;
        this.mjs.code.text = item.code;
        this.mjs.description.text = item.description;
    }
}
exports.DetailView = DetailView;
;
return exports;});
sfa.setFn("rendering/dialog/alert.html", ()=>{ return "PGRpdiBjbGFzcz0ibTIwIj4KICAgIDxoMyBjbGFzcz0idGl0bGUiIHY9InRpdGxlIj48L2gzPgogICAgPHAgdj0ibWVzc2FnZSI+PC9wPgogICAgPGRpdiBzdHlsZT0idGV4dC1hbGlnbjpyaWdodCI+CiAgICAgICAgPGEgdj0iY2xvc2UiPmNsb3NlPC9hPgogICAgPC9kaXY+CjwvZGl2Pgo=";});
sfa.setFn("rendering/dialog/confirm.html", ()=>{ return "PGRpdiBjbGFzcz0ibTIwIj4KICAgIDxwIHY9Im1lc3NhZ2UiPjwvcD4KICAgIDxkaXYgc3R5bGU9InRleHQtYWxpZ246cmlnaHQiPgogICAgICAgIDxhIHY9ImNsb3NlIiBjbGFzcz0ibXIxMCI+Y2xvc2U8L2E+CiAgICAgICAgPGEgdj0ibmV4dCI+bmV4dDwvYT4KICAgIDwvZGl2Pgo8L2Rpdj4K";});
sfa.setFn("rendering/dialog/loading.html", ()=>{ return "PGRpdiBjbGFzcz0ibTIwIj4KICAgIDxkaXYgY2xhc3M9ImxvYWRpbmciPgogICAgICAgIDxkaXYgY2xhc3M9ImltYWdlIj48L2Rpdj4KICAgICAgICA8ZGl2IGNsYXNzPSJtZXNzYWdlIiB2PSJtZXNzYWdlIj48L2Rpdj4gICAgCiAgICA8L2Rpdj4KPC9kaXY+Cg==";});
sfa.setFn("rendering/dialog/test.html", ()=>{ return "PGRpdiBjbGFzcz0ibTIwIj4KICAgIDxwPlRlc3QgRGlhbG9nLi4uLk9LPC9wPgogICAgPGRpdiBzdHlsZT0idGV4dC1hbGlnbjpyaWdodCI+CiAgICAgICAgPGEgdj0iY2xvc2UiPmNsb3NlPC9hPgogICAgPC9kaXY+CjwvZGl2Pgo=";});
sfa.setFn("rendering/template/default.html", ()=>{ return "PGhlYWRlcj48L2hlYWRlcj4KPG1haW4+PGFydGljbGU+PC9hcnRpY2xlPjwvbWFpbj4=";});
sfa.setFn("rendering/ui/head.html", ()=>{ return "PG1ldGEgY2hhcnNldD0idXRmOCI+CjxtZXRhIG5hbWU9InZpZXdwb3J0IiBjb250ZW50PSJ3aWR0aD1kZXZpY2Utd2lkdGgsIGluaXRpYWwtc2NhbGU9MS4wIj4KPHRpdGxlPkFwcCBTYW1wbGU8L3RpdGxlPgo8bGluayByZWw9InN0eWxlc2hlZXQiIGhyZWY9ImNzcy9zdHlsZS5jc3MiPg==";});
sfa.setFn("rendering/ui/header.html", ()=>{ return "PGRpdj4KICAgIDxsYWJlbCB2PSJiYWNrIiBjbGFzcz0iYXJyb3cgYmFjayI+PC9sYWJlbD4KPC9kaXY+CjxkaXYgY2xhc3M9Im1heCI+CiAgICA8aDEgdj0idGl0bGUiPjwvaDE+ICAgIAo8L2Rpdj4KCg==";});
sfa.setFn("rendering/ui/page4item.html", ()=>{ return "PGxpPgogICAgPGEgdj0ibGluayI+CiAgICAgICAgPGRpdiB2PSJuYW1lIj48L2Rpdj4KICAgICAgICA8ZGl2IHY9ImNvZGUiPjwvZGl2PgogICAgPC9hPgo8L2xpPg==";});
sfa.setFn("rendering/view/home.html", ()=>{ return "PHRhYmxlIGNsYXNzPSJ3aW5kb3ciPgogICAgPHRyIGNsYXNzPSJtaWRkbGUiPgogICAgICAgIDx0ZD4KICAgICAgICAgICAgPGRpdiBjbGFzcz0ibTEwIj4KICAgICAgICAgICAgICAgIDxwPkFwcGxpY2F0aW9uIFRlc3QgU2FtcGxlLi4uPC9wPgogICAgICAgICAgICAgICAgPHA+PGEgY2xhc3M9ImJ0biIgdj0icGFnZTEiPk5leHQgUGFnZTE8L2E+PC9wPgogICAgICAgICAgICAgICAgPHA+PGEgY2xhc3M9ImJ0biIgdj0icGFnZTIiPk5leHQgUGFnZTIgKE1vZGVybkpTKTwvYT48L3A+CiAgICAgICAgICAgICAgICA8cD48YSBjbGFzcz0iYnRuIiB2PSJwYWdlMyI+TmV4dCBQYWdlMyAoRGlhbG9nKTwvYT48L3A+CiAgICAgICAgICAgICAgICA8cD48YSBjbGFzcz0iYnRuIiB2PSJwYWdlNCI+TmV4dCBQYWdlNCAoTGlzdCk8L2E+PC9wPgogICAgICAgICAgICAgICAgPHA+PGEgY2xhc3M9ImJ0biIgdj0icGFnZTUiPk5leHQgUGFnZTUgKFZhbGlkYXRpb24pPC9hPjwvcD4KICAgICAgICAgICAgICAgIDxwPjxhIGNsYXNzPSJidG4iIHY9InBhZ2U2Ij4zcyBMb2FkLi4uLiA9PiBQYWdlNjwvYT48L3A+CiAgICAgICAgICAgIDwvZGl2PiAgICAgICAgICAgIAogICAgICAgIDwvdGQ+CiAgICA8L3RyPgo8L3RhYmxlPgo=";});
sfa.setFn("rendering/view/page1/type1.html", ()=>{ return "PGRpdiBjbGFzcz0ibTEwIj4KICAgIDxoMj5UeXBlMSAuLi4uIE9LPC9oMj4KICAgIDxoNCB2PSJkYXRldGltZSI+PC9oND4KPC9kaXY+";});
sfa.setFn("rendering/view/page1.html", ()=>{ return "PHRhYmxlIGNsYXNzPSJ3aW5kb3ciPgogICAgPHRyPgogICAgICAgIDx0ZD4KICAgICAgICAgICAgPGRpdiBjbGFzcz0ibTEwIj4KICAgICAgICAgICAgICAgIDxwPlBhZ2UxIFRleHQgU2FtcGxlLi4uPC9wPgogICAgICAgICAgICA8L2Rpdj4gICAgICAgICAgICAKICAgICAgICA8L3RkPgogICAgPC90cj4KICAgIDx0ciBjbGFzcz0iYm90dG9tIj4KICAgICAgICA8dGQ+CiAgICAgICAgICAgIDxkaXYgY2xhc3M9Im0xMCI+CiAgICAgICAgICAgICAgICA8YSBjbGFzcz0iYnRuIiB2PSJidG4ubmV4dCI+TmV4dCBUeXBlMS4uLjwvYT4KICAgICAgICAgICAgPC9kaXY+CiAgICAgICAgICAgIDxkaXYgY2xhc3M9Im0xMCI+CiAgICAgICAgICAgICAgICA8YSBjbGFzcz0iYnRuIiB2PSJidG4ucmVwbGFjZSI+UmVwbGFjZSBUeXBlMi4uLjwvYT4KICAgICAgICAgICAgPC9kaXY+CiAgICAgICAgPC90ZD4KICAgIDwvdHI+CjwvdGFibGU+Cg==";});
sfa.setFn("rendering/view/page2/detail.html", ()=>{ return "PGRpdiBjbGFzcz0ibTEwIj4KICAgIDxwPlRleHQgU2FtcGxlIFRleHQgU2FtcGxlIC4uLi4uLi48L3A+CjwvZGl2Pg==";});
sfa.setFn("rendering/view/page2.html", ()=>{ return "PGRpdiBjbGFzcz0ibTEwIj4KICAgIDxwIHY9ImRlc2NyaXB0aW9uIj48L3A+CiAgICA8dWw+CiAgICAgICAgPGxpIHY9Iml0ZW0iPlRleHQgU2FtcGxlIC4uLi48L2xpPgogICAgICAgIDxsaSB2PSJpdGVtIj5UZXh0IFNhbXBsZSAuLi4uPC9saT4KICAgICAgICA8bGkgdj0iaXRlbSI+VGV4dCBTYW1wbGUgLi4uLjwvbGk+CiAgICAgICAgPGxpIHY9Iml0ZW0iPlRleHQgU2FtcGxlIC4uLi48L2xpPgogICAgICAgIDxsaSB2PSJpdGVtIj5UZXh0IFNhbXBsZSAuLi4uPC9saT4KICAgICAgICA8bGkgdj0iaXRlbSI+VGV4dCBTYW1wbGUgLi4uLjwvbGk+CiAgICAgICAgPGxpIHY9Iml0ZW0iPlRleHQgU2FtcGxlIC4uLi48L2xpPgogICAgPC91bD4KICAgIDxhIGNsYXNzPSJidG4iIHY9ImJ1dHRvbjEiPkJ1dHRvbjE8L2E+CgogICAgPHVsPgogICAgICAgIDxsaT48cD48YSBjbGFzcz0iYnRuIiB2PSJsaW5rMSI+TmV4dCBQYWdlMihpZCA9IDEpPC9hPjwvcD48L2xpPgogICAgICAgIDxsaT48cD48YSBjbGFzcz0iYnRuIiB2PSJsaW5rMiI+TmV4dCBQYWdlMihpZCA9IDIpPC9hPjwvcD48L2xpPgogICAgICAgIDxsaT48cD48YSBjbGFzcz0iYnRuIiB2PSJsaW5rMyI+TmV4dCBQYWdlMihpZCA9IDMpPC9hPjwvcD48L2xpPgogICAgPC91bD4KPC9kaXY+";});
sfa.setFn("rendering/view/page3.html", ()=>{ return "PGRpdiBjbGFzcz0ibTEwIj4KICAgIDxwPmFsZXJ0IGRpYWxvZzwvcD4KICAgIDxwPjxhIGNsYXNzPSJidG4iIHY9ImQxIj5PcGVuIERpYWxvZzEgKFRlc3QpPC9hPjwvcD4KICAgIDxwPjxhIGNsYXNzPSJidG4iIHY9ImQyIj5PcGVuIERpYWxvZzIgKEFsZXJ0MSk8L2E+PC9wPgogICAgPHA+PGEgY2xhc3M9ImJ0biIgdj0iZDMiPk9wZW4gRGlhbG9nMyAoQWxlcnQyKTwvYT48L3A+CiAgICA8cD48YSBjbGFzcz0iYnRuIiB2PSJkNCI+T3BlbiBEaWFsb2c0IChDb25maXJtKTwvYT48L3A+CiAgICA8cD48YSBjbGFzcz0iYnRuIiB2PSJkNSI+T3BlbiBEaWFsb2c1IChMb2FkaW5nKTwvYT48L3A+CjwvZGl2PgoK";});
sfa.setFn("rendering/view/page4/detail.html", ()=>{ return "PGRpdiBjbGFzcz0ibTEwIj4KICAgIDx0YWJsZT4KICAgICAgICA8dHI+CiAgICAgICAgICAgIDx0aD5uYW1lPC90aD4KICAgICAgICAgICAgPHRkIHY9Im5hbWUiPjwvdGQ+CiAgICAgICAgPC90cj4KICAgICAgICA8dHI+CiAgICAgICAgICAgIDx0aD5jb2RlPC90aD4KICAgICAgICAgICAgPHRkIHY9ImNvZGUiPjwvdGQ+CiAgICAgICAgPC90cj4KICAgICAgICA8dHI+CiAgICAgICAgICAgIDx0aD5kZXNjcmlwdGlvbjwvdGg+CiAgICAgICAgICAgIDx0ZCB2PSJkZXNjcmlwdGlvbiI+PC90ZD4KICAgICAgICA8L3RyPgogICAgPC90YWJsZT4KPC9kaXY+Cg==";});
sfa.setFn("rendering/view/page4.html", ()=>{ return "PGJyPgo8dWwgY2xhc3M9Imxpc3QiIHY9Imxpc3QiPjwvdWw+";});
sfa.setFn("rendering/view/page5.html", ()=>{ return "PGRpdiBjbGFzcz0ibTEwIj4KICAgIDxwPnJlcXVpcmVkPC9wPgogICAgPGlucHV0IHR5cGU9InRleHQiIHY9ImlucHV0MSI+CiAgICA8ZGl2IGNsYXNzPSJlcnJvci1tZXNzYWdlIiB2PSJlcnJvci5pbnB1dDEiPjwvZGl2Pgo8L2Rpdj4KPGRpdiBjbGFzcz0ibTEwIj4KICAgIDxwPmxlbmd0aCAoNCBjaGFycyk8L3A+CiAgICA8aW5wdXQgdHlwZT0idGV4dCIgdj0iaW5wdXQyIj4KICAgIDxkaXYgY2xhc3M9ImVycm9yLW1lc3NhZ2UiIHY9ImVycm9yLmlucHV0MiI+PC9kaXY+CjwvZGl2Pgo8ZGl2IGNsYXNzPSJtMTAiPgogICAgPHA+TWluIGxlbmd0aCAoNCBjaGFycyBvdmVyKTwvcD4KICAgIDxpbnB1dCB0eXBlPSJ0ZXh0IiB2PSJpbnB1dDMiPgogICAgPGRpdiBjbGFzcz0iZXJyb3ItbWVzc2FnZSIgdj0iZXJyb3IuaW5wdXQzIj48L2Rpdj4KPC9kaXY+CjxkaXYgY2xhc3M9Im0xMCI+CiAgICA8cD5NaW4gbGVuZ3RoICg0IGNoYXJzIHVuZGVyKTwvcD4KICAgIDxpbnB1dCB0eXBlPSJ0ZXh0IiB2PSJpbnB1dDQiPgogICAgPGRpdiBjbGFzcz0iZXJyb3ItbWVzc2FnZSIgdj0iZXJyb3IuaW5wdXQ0Ij48L2Rpdj4KPC9kaXY+CjxkaXYgY2xhc3M9Im0xMCI+CiAgICA8cD5CZXR3ZWVuIExlbmd0aCAoQmV0d2VlbiA0IC0gMTIgY2hhcnMpPC9wPgogICAgPGlucHV0IHR5cGU9InRleHQiIHY9ImlucHV0NSI+CiAgICA8ZGl2IGNsYXNzPSJlcnJvci1tZXNzYWdlIiB2PSJlcnJvci5pbnB1dDUiPjwvZGl2Pgo8L2Rpdj4KPGRpdiBjbGFzcz0ibTEwIj4KICAgIDxhIGNsYXNzPSJidG4iIHY9InN1Ym1pdCI+U3VibWl0PC9hPgo8L2Rpdj4=";});
sfa.setFn("rendering/view/page6.html", ()=>{ return "PGRpdiBjbGFzcz0ibTEwIj4KICAgIDxwPlBsZWFzZSBsb29rIGF0IHRoZSBjYXRzIGFuZCBmZWVsIHJlZnJlc2hlZC4uLi48L3A+CiAgICA8aW1nIHNyYz0iaW1nL2NhdC5qcGciPgo8L2Rpdj4K";});
sfa.setFn("resource/css/style.css", ()=>{ return "text/css|OnJvb3QgewogICAgLS1tYWluX2JhY2tncm91bmQ6IHJnYig3MCw3MCw3MCk7CiAgICAtLW1haW5fY29sb3I6IHJnYigyMjAsMjIwLDIyMCk7CiAgICAtLWhlYWRlcl9iYWNrZ3JvdW5kOiByZ2IoNTAsNTAsNTApOwogICAgLS1oZWFkZXJfY29sb3I6IHJnYigyMjAsMjIwLDIyMCk7OwogICAgLS1oZWFkZXJfYm9yZGVyX3NpemU6IHNvbGlkIDFweCByZ2IoMTYwLDE2MCwxNjApOwogICAgLS1hcnJvd19ib3JkZXI6c29saWQgMXB4IHJnYigyMjAsMjIwLDIyMCk7CiAgICAtLWFjdGl2ZV9iYWNrZ3JvdW5kOnJnYmEoMCwwLDAsMC40KTsKICAgIC0tYnV0dG9uX2JhY2tncm91bmQ6cmdiKDUsMTEwLDE2MCk7CiAgICAtLWJ1dHRvbl9jb2xvcjpyZ2IoMjQwLDI0MCwyNDApOwogICAgLS1idXR0b25fYm9yZGVyOnNvbGlkIDNweCB2YXIoLS1idXR0b25fYmFja2dyb3VuZCk7CiAgICAtLWRpYWxvZ19iYWNrZ3JvdW5kOnJnYigzMCwzMCwzMCk7CiAgICAtLWRpYWxvZ19jb2xvcjp2YXIoLS1tYWluX2NvbG9yKTsKfQoqIHsKICAgIGJveC1zaXppbmc6Ym9yZGVyLWJveDsKICAgIGZvbnQtZmFtaWx5OiBzeXN0ZW0tdWksIC1hcHBsZS1zeXN0ZW0sICJTZWdvZSBVSSIsIFJvYm90bywgIkhlbHZldGljYSBOZXVlIiwgIk5vdG8gU2FucyIsICJMaWJlcmF0aW9uIFNhbnMiLCBBcmlhbCwgc2Fucy1zZXJpZiwgIkFwcGxlIENvbG9yIEVtb2ppIiwgIlNlZ29lIFVJIEVtb2ppIiwgIlNlZ29lIFVJIFN5bWJvbCIsICJOb3RvIENvbG9yIEVtb2ppIjsKICAgIGxpbmUtaGVpZ2h0OjEuOHJlbTsKfQpoMSwgaDIsIGgzLCBoNCwgaDUgewogICAgZm9udC13ZWlnaHQ6bm9ybWFsOwp9CmJvZHkgewogICAgYmFja2dyb3VuZDp2YXIoLS1tYWluX2JhY2tncm91bmQpOwogICAgY29sb3I6dmFyKC0tbWFpbl9jb2xvcik7Cn0KaGVhZGVyIHsKICAgIGJhY2tncm91bmQ6dmFyKC0taGVhZGVyX2JhY2tncm91bmQpOwogICAgY29sb3I6dmFyKC0taGVhZGVyX2NvbG9yKTsKICAgIGJvcmRlci1ib3R0b206dmFyKC0taGVhZGVyX2JvcmRlcl9zaXplKTsKICAgIHBvc2l0aW9uOmZpeGVkOwogICAgZGlzcGxheTp0YWJsZTsKICAgIGxlZnQ6MDsKICAgIHRvcDowOwogICAgd2lkdGg6MTAwJTsKICAgIGhlaWdodDo1MHB4OwogICAgZm9udC1zaXplOjE2cHg7CiAgICB6LWluZGV4OjI7Cn0KaGVhZGVyID4gKiB7CiAgICBkaXNwbGF5OnRhYmxlLWNlbGw7CiAgICB2ZXJ0aWNhbC1hbGlnbjptaWRkbGU7CiAgICB3aWR0aDphdXRvOwp9CmhlYWRlciA+ICoubWF4IHsKICAgIHdpZHRoOjEwMCU7Cn0KaGVhZGVyIGgxIHsKICAgIG1hcmdpbjowOwogICAgcGFkZGluZzowIDEwcHg7CiAgICBmb250LXNpemU6MjRweDsKfQptYWluIGFydGljbGUgewogICAgcG9zaXRpb246Zml4ZWQ7CiAgICBmb250LXNpemU6MThweDsKICAgIGxlZnQ6MDsKICAgIHRvcDowOwogICAgd2lkdGg6MTAwJTsKICAgIGhlaWdodDoxMDAlOwogICAgb3ZlcmZsb3c6YXV0bzsKfQpoZWFkZXIgfiBtYWluIGFydGljbGUgewogICAgdG9wOjUwcHg7CiAgICBoZWlnaHQ6Y2FsYygxMDAlIC0gNTBweCk7Cn0KbGFiZWwsCmEgewogICAgY29sb3I6ZGFya2N5YW47CiAgICB0cmFuc2l0aW9uLWR1cmF0aW9uOjEwMG1zOwogICAgZGlzcGxheTppbmxpbmUtYmxvY2s7Cn0KLmFycm93IHsKICAgIHdpZHRoOjQwcHg7CiAgICBoZWlnaHQ6NDBweDsKICAgIHBvc2l0aW9uOnJlbGF0aXZlOwp9Ci5hcnJvdzpiZWZvcmUgewogICAgY29udGVudDoiIjsKICAgIGRpc3BsYXk6YmxvY2s7CiAgICBwb3NpdGlvbjphYnNvbHV0ZTsKICAgIGxlZnQ6NTAlOwogICAgdG9wOjUwJTsKICAgIHdpZHRoOjE2cHg7CiAgICBoZWlnaHQ6MTZweDsKICAgIGJvcmRlci1sZWZ0OnZhcigtLWFycm93X2JvcmRlcik7CiAgICBib3JkZXItdG9wOnZhcigtLWFycm93X2JvcmRlcik7CiAgICB0cmFuc2Zvcm06dHJhbnNsYXRlWSgtNTAlKSByb3RhdGUoMTM1ZGVnKTsKICAgIG1hcmdpbi1sZWZ0Oi0xNnB4Owp9Ci5hcnJvdy5iYWNrOmJlZm9yZSB7CiAgICB0cmFuc2Zvcm06dHJhbnNsYXRlWSgtNTAlKSByb3RhdGUoLTQ1ZGVnKTsKICAgIG1hcmdpbi1sZWZ0Oi0zcHg7Cn0KbWFpbiBhcnRpY2xlIHRhYmxlIHRyIHRoLAptYWluIGFydGljbGUgdGFibGUgdHIgdGQgewogICAgdmVydGljYWwtYWxpZ246dG9wOwogICAgcGFkZGluZzoxMHB4Owp9Cm1haW4gYXJ0aWNsZSB0YWJsZSB0ciB0aCB7CiAgICB0ZXh0LWFsaWduOnJpZ2h0Owp9Cm1haW4gYXJ0aWNsZSB0YWJsZS53aW5kb3d7CiAgICBwb3NpdGlvbjphYnNvbHV0ZTsKICAgIGxlZnQ6MDsKICAgIHRvcDowOwogICAgd2lkdGg6MTAwJTsKICAgIGhlaWdodDoxMDAlOwp9Cm1haW4gYXJ0aWNsZSB0YWJsZS53aW5kb3cgdHIgdGQgewogICAgcGFkZGluZzowOwogICAgaGVpZ2h0OjEwMCU7CiAgICB2ZXJ0aWNhbC1hbGlnbjp0b3A7CiAgICBoZWlnaHQ6MTAwJTsKfQptYWluIGFydGljbGUgdGFibGUud2luZG93IHRyLm1pZGRsZSB0ZHsKICAgIHZlcnRpY2FsLWFsaWduOm1pZGRsZTsKfQptYWluIGFydGljbGUgdGFibGUud2luZG93IHRyLmJvdHRvbSB0ZHsKICAgIHZlcnRpY2FsLWFsaWduOmJvdHRvbTsKfQoKLm0xMCB7IG1hcmdpbjoxMHB4OyB9Ci5tMjAgeyBtYXJnaW46MjBweDsgfQoubWwxMCB7IG1hcmdpbi1sZWZ0OjEwcHg7IH0KLm1sMjAgeyBtYXJnaW4tbGVmdDoyMHB4OyB9Ci5tcjEwIHsgbWFyZ2luLXJpZ2h0OjEwcHg7IH0KLm1yMjAgeyBtYXJnaW4tcmlnaHQ6MjBweDsgfQoubXQxMCB7IG1hcmdpbi10b3A6MTBweDsgfQoubXQyMCB7IG1hcmdpbi10b3A6MjBweDsgfQoubWIxMCB7IG1hcmdpbi1ib3R0b206MTBweDsgfQoubWIyMCB7IG1hcmdpbi1ib3R0b206MjBweDsgfQoKLmJ0biB7CiAgICBiYWNrZ3JvdW5kOnZhcigtLWJ1dHRvbl9iYWNrZ3JvdW5kKTsKICAgIGNvbG9yOnZhcigtLWJ1dHRvbl9jb2xvcik7CiAgICBsaW5lLWhlaWdodDo1MHB4OwogICAgaGVpZ2h0OjUwcHg7CiAgICBib3JkZXItcmFkaXVzOjVweDsKICAgIGJvcmRlcjp2YXIoLS1idXR0b25fYm9yZGVyKTsKICAgIGRpc3BsYXk6YmxvY2s7CiAgICBmb250LXNpemU6MThweDsKICAgIGZvbnQtd2VpZ2h0OmJvbGQ7CiAgICB0ZXh0LWFsaWduOmNlbnRlcjsKICAgIGJvcmRlci1yYWRpdXM6MTBweDsKfQouYnRuOmFjdGl2ZSB7CiAgICBiYWNrZ3JvdW5kOnZhcigtLWFjdGl2ZV9iYWNrZ3JvdW5kKTsKfQpkaWFsb2cgZHdpbmRvdyB7CiAgICBiYWNrZ3JvdW5kOnZhcigtLWRpYWxvZ19iYWNrZ3JvdW5kKTsKICAgIGNvbG9yOnZhcigtLWRpYWxvZ19jb2xvcik7CiAgICBmb250LXNpemU6MjBweDsKICAgIGJvcmRlci1yYWRpdXM6IDEwcHg7CiAgICBib3gtc2hhZG93OiAwIDAgNHB4IHdoaXRlOwp9CmRpYWxvZyBkd2luZG93IHRhYmxlIHsKICAgIHdpZHRoOjEwMCU7CiAgICBoZWlnaHQ6MTAwJTsKfQpkaWFsb2cgZHdpbmRvdyB0YWJsZSB0ciB0ZCB7CiAgICBoZWlnaHQ6MTAwJTsKICAgIHZlcnRpY2FsLWFsaWduOnRvcDsKfQpkaWFsb2cgZHdpbmRvdyB0YWJsZSB0ciB0ZC5taWRkbGV7CiAgICB2ZXJ0aWNhbC1hbGlnbjptaWRkbGU7Cn0KZGlhbG9nIGR3aW5kb3cgdGFibGUgdHIgdGQuY2VudGVyewogICAgdGV4dC1hbGlnbjpjZW50ZXI7Cn0KZGlhbG9nIGR3aW5kb3cgdGFibGUgdHIgdGQucmlnaHR7CiAgICB0ZXh0LWFsaWduOnJpZ2h0Owp9CmRpYWxvZyBkd2luZG93IC50aXRsZSB7CiAgICBmb250LXdlaWdodDpib2xkOwogICAgcGFkZGluZzoxMHB4IDA7Cn0KYSB7CiAgICBjb2xvcjpjeWFuOwp9CmRpYWxvZyBkd2luZG93IC5sb2FkaW5newogICAgZGlzcGxheTp0YWJsZTsKICAgIHdpZHRoOjEwMCU7Cn0KZGlhbG9nIGR3aW5kb3cgLmxvYWRpbmcgPiAqIHsKICAgIGRpc3BsYXk6dGFibGUtY2VsbDsKICAgIHZlcnRpY2FsLWFsaWduOm1pZGRsZTsKfQpkaWFsb2cgZHdpbmRvdyAubG9hZGluZyAuaW1hZ2UgewogICAgd2lkdGg6NTBweDsKICAgIGhlaWdodDo1MHB4Owp9CmRpYWxvZyBkd2luZG93IC5sb2FkaW5nIC5pbWFnZTphZnRlcnsKICAgIGNvbnRlbnQ6IiI7CiAgICBkaXNwbGF5OmJsb2NrOwogICAgd2lkdGg6NTBweDsKICAgIGhlaWdodDo1MHB4OwogICAgYm9yZGVyLXJhZGl1czo1MCU7CiAgICBib3JkZXI6c29saWQgNXB4IHJnYig0MCwxMzAsMTUwKTsKICAgIGJvcmRlci1yaWdodDpzb2xpZCA1cHggcmdiYSgwLDAsMCwwKTsKICAgIGFuaW1hdGlvbjogbG9hZGluZ3MgMXMgbGluZWFyIGluZmluaXRlOwp9CmRpYWxvZyBkd2luZG93IC5sb2FkaW5nIC5tZXNzYWdlIHsKICAgIHBhZGRpbmctbGVmdDoxNXB4Owp9CkBrZXlmcmFtZXMgbG9hZGluZ3MgewogICAgMCV7CiAgICAgICAgdHJhbnNmb3JtOnJvdGF0ZSgwZGVnKTsKICAgIH0KICAgIDEwMCV7CiAgICAgICAgdHJhbnNmb3JtOnJvdGF0ZSgzNjBkZWcpOwogICAgfQp9CnVsLmxpc3R7CiAgICBtYXJnaW46MDsKICAgIHBhZGRpbmc6MDsKfQp1bC5saXN0IGxpIHsKICAgIG1hcmdpbjowOwogICAgbWFyZ2luOjA7CiAgICBsaXN0LXN0eWxlLXR5cGU6bm9uZTsKICAgIGJhY2tncm91bmQ6cmdiKDUwLDUwLDUwKTsKICAgIGJvcmRlci1ib3R0b206c29saWQgMXB4IHJnYigxODAsMTgwLDE4MCk7Cn0KdWwubGlzdCBsaTpmaXJzdC1jaGlsZHsgCiAgICBib3JkZXItdG9wOnNvbGlkIDFweCByZ2IoMTgwLDE4MCwxODApOwp9CnVsLmxpc3QgbGkgYSB7CiAgICBjb2xvcjp2YXIoLS1tYWluX2NvbG9yKTsKICAgIGRpc3BsYXk6YmxvY2s7CiAgICBwYWRkaW5nOjEwcHg7Cn0KdWwubGlzdCBsaSBhOmFjdGl2ZSB7CiAgICBiYWNrZ3JvdW5kOnJnYig4MCw4MCw4MCk7Cn0KCmlucHV0LAp0ZXh0YXJlYSwKc2VsZWN0IHsKICAgIGJhY2tncm91bmQ6IzMzMzsKICAgIGNvbG9yOndoaXRlOwogICAgaGVpZ2h0OjUwcHg7CiAgICBsaW5lLWhlaWdodDo1MHB4OwogICAgcGFkZGluZzowIDIwcHg7CiAgICBib3JkZXI6c29saWQgMXB4ICM5OTk7CiAgICB3aWR0aDoxMDAlOwogICAgZm9udC1zaXplOjE4cHg7Cn0KaW5wdXQ6Zm9jdXMtdmlzaWJsZSB7CiAgICBvdXRsaW5lOnNvbGlkIDFweCAjMjljOwp9CgouZXJyb3ItbWVzc2FnZXsKICAgIGxpbmUtaGVpZ2h0OjIwcHg7CiAgICBtaW4taGVpZ2h0OjIwcHg7CiAgICBjb2xvcjojZmY3NzMzOwogICAgcGFkZGluZzo1cHggMDsKfQppbWcgewogICAgd2lkdGg6MTAwJTsKfQ=="});
sfa.setFn("resource/img/cat.jpg", ()=>{ return "image/jpeg|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/wD16oRz3kia4jUFNoGcsPut6Z7d/wBKnnQJGQrsSvT2+hxVLYT3GAkguxQNnuOR+OfXPagwvIF5JIPJ/wDrYpisUH3zSMm1irj5Sep6npTZW2EpMv3Rjv8Ap+n+eK5zQaTuDOJGCRknBzjHr+lSxziS0adXO1lUjOeRnrjH+eKAGgsHyhIxw2Ace3H4VEIyzqASvUcjr+Q5xRYBqmRCrxoFIGN2CG6HkAD8/wAPWrfmyxJuSdQpUMFPJI9uMdu/bHXs7gLFrVx5zLJI5X5gSDlmPck+oyec1YbWycK7MQEC7WGSG5y3XP1BOOO2ad0BftNftSF4eIkDJGQA3Yf5NXTfW0krLz5rs218YGN2fu4wOc+n4g80mJomWASFmaQOow3LdTnPX+lIPnXyimBESdzKRxnpn8e3pQhEsMnlg7wBlcY3YxgfX3zwP8KwtWuxLPsjOBgIABnaeeoz17/nTAq2NnJY2SrcSGR2HL427jjk4z6inPIA3zbmzwxJIP0/z7VoSycJ8oZWA4w3Y0zYQ5Ktg4zk9Pw70gP/2f/tArxQaG90b3Nob3AgMy4wADhCSU0D7QAAAAAAEABIAAAAAQACAEgAAAABAAI4QklNBA0AAAAAAAQAAAAeOEJJTQQZAAAAAAAEAAAAHjhCSU0D8wAAAAAACQAAAAAAAAAAAQA4QklNBAoAAAAAAAEAADhCSU0nEAAAAAAACgABAAAAAAAAAAI4QklNA/UAAAAAAEgAL2ZmAAEAbGZmAAYAAAAAAAEAL2ZmAAEAoZmaAAYAAAAAAAEAMgAAAAEAWgAAAAYAAAAAAAEANQAAAAEALQAAAAYAAAAAAAE4QklNA/gAAAAAAHAAAP////////////////////////////8D6AAAAAD/////////////////////////////A+gAAAAA/////////////////////////////wPoAAAAAP////////////////////////////8D6AAAOEJJTQQIAAAAAAAQAAAAAQAAAkAAAAJAAAAAADhCSU0EHgAAAAAABAAAAAA4QklNBBoAAAAAAHEAAAAGAAAAAAAAAAAAAAHCAAACWAAAAAgAZABzAGMAMAAwADgAMwA2AAAAAQAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAJYAAABwgAAAAAAAAAA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"});
sfa.start(()=>{ const st = use("Startor");  new st.Startor(); });