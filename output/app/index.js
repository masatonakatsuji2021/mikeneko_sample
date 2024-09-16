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
 * application = A mode for building apps. Screen transition history is managed and operated by the app.
 * web = Change the browser URL and move to the page. You can go back by pressing the back button on the browser.
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
const Util_1 = require("Util");
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
/**
 * ***Controller*** : Main class for each screen.
 * Event handlers for multiple screens can be managed collectively using public methods.
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
    /**
     * ***handleTemplateChanged*** : An event handler that runs when the template specified in the member variable template changes.
     */
    handleTemplateChanged() { }
    /**
     * ***handleHeadChanged*** : An event handler that runs when the template specified in the member variable head tag changes.
     */
    handleHeadChanged() { }
    /**
     * ***handleHeaderChanged*** : An event handler that runs when the template specified in the member variable header tag changes.
     */
    handleHeaderChanged() { }
    /**
     * ***handleFooterChanged*** : An event handler that runs when the template specified in the member variable footer tag changes.
     */
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
/**
 * ***Dialog*** : A class for displaying or manipulating a dialog screen.
 */
class Dialog {
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
exports.mjs = exports.dom = exports.ModernJS = void 0;
/**
 * ***ModernJS*** : Virtual DOM Classes.
 * When you specify the v attribute or v-child attribute in an HTML tag, it is recognized as a virtual DOM.
 * The v attribute is considered a globally available virtual DOM.
 * ```html
 * <div v="test"></div>
 * ```
 * The v-child attribute is recognized as a separate virtual DOM in UI, Dialog, etc.
 * ```html
 * <div v-child="name"></div>
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
        this.virtualAttributes("v", (parent, attrValue, el) => {
            if (parent) {
                if (!parent.childs[attrValue])
                    parent.childs[attrValue] = new ModernJS();
                parent.childs[attrValue].addEl(el);
            }
            else {
                if (!this.buffers[attrValue])
                    this.buffers[attrValue] = new ModernJS();
                this.buffers[attrValue].addEl(el);
            }
        });
        return this.buffers;
    }
    static virtualAttributes(target, handler) {
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
                        if (!this.buffers[a_])
                            this.buffers[a_] = new ModernJS();
                        parent = this.buffers[a_];
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
     * ***reload*** : Get the virtual DOM of the v-child attribute from the virtual DOM element.
     * The results can be obtained in children.
     * @param {ModernJS?} context
     */
    reload(context) {
        ModernJS.reload();
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
        if (!noReload) {
            this.reload();
        }
        return this;
    }
    /**
     * ***brText*** : Set the text content.
     * Line breaks will be converted to line break tags.
     * A code sample of TypeScript is shown below.
     * (The \n part is converted to a line break tag.)
     * ```typescript
     * mjs.brText = "Text Area \n Sample Text .....";
     * ```
     */
    set brText(value) {
        value = value.toString().split("\n").join("<br>");
        this.text = value;
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
        if (!noReload) {
            this.reload();
        }
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
        if (!noReload) {
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
            this.reload();
        }
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
ModernJS.buffers = {};
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
            if (MyApp.delay)
                yield Util_1.Util.sleep(MyApp.delay);
            try {
                // Controller & View Leave 
                const befCont = Data_1.Data.get("beforeController");
                if (befCont) {
                    const res = yield befCont.handleLeave(Data_1.Data.get("beforeControllerAction"));
                    if (typeof res == "boolean" && res === false)
                        return;
                }
                const befView = Data_1.Data.get("beforeView");
                if (befView) {
                    const res = yield befView.handleLeave();
                    if (typeof res == "boolean" && res === false)
                        return;
                }
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
     * ***view *** : Get View's content information.
     * @param {string} viewName View Name
     * @returns {string} view contents
     */
    static view(viewName) {
        return this.renderHtml("view/" + viewName);
    }
    static bindView(mjs, viewName, sendData) {
        mjs.html = this.view(viewName);
        mjs.reload();
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
        mjs.reload();
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
        mjs.reload();
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
     * ***handle*** : Event handler for when the template is displayed.
     * @param {any} sendData> Transmission data contents
     * @returns {void}
     */
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
     * An event handler that runs automatically when the view is drawn on the screen.
     * This event is executed only when rendered.
     */
    handle(...aregment) { }
    /**
     * ***handleAlways*** : An event handler that runs automatically when the View is displayed on screen.
     * This event is always executed even if the same View has already been rendered..
     */
    handleAlways() { }
    /**
     * ***handleBegin*** : Event handler executed just before transitioning to the page.
     */
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
    /**
     * ***handleTemplateChanged*** : An event handler that runs when the template specified in the member variable template changes.
     */
    handleTemplateChanged() { }
    /**
     * ***handleHeadChanged*** : An event handler that runs when the template specified in the member variable head tag changes.
     */
    handleHeadChanged() { }
    /**
     * ***handleHeaderChanged*** : An event handler that runs when the template specified in the member variable header tag changes.
     */
    handleHeaderChanged() { }
    /**
     * ***handleFooterChanged*** : An event handler that runs when the template specified in the member variable footer tag changes.
     */
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
sfa.setFn("CORERES/dialog/style.css", ()=>{ return "ZGlhbG9nIHsKICAgIGRpc3BsYXk6YmxvY2s7CiAgICBwb3NpdGlvbjpmaXhlZDsKICAgIGxlZnQ6MDsKICAgIHRvcDowOwogICAgd2lkdGg6MTAwJTsKICAgIGhlaWdodDoxMDAlOwogICAgei1pbmRleDoxMDA7CiAgICBiYWNrZ3JvdW5kOnJnYmEoMCwwLDAsMC42KTsKICAgIG9wYWNpdHk6MDsKICAgIHRyYW5zaXRpb24tZHVyYXRpb246MzAwbXM7CiAgICB0cmFuc2l0aW9uLXByb3BlcnR5OiBvcGFjaXR5Owp9CmRpYWxvZy5vcGVuIHsKICAgIG9wYWNpdHk6IDE7Cn0KZGlhbG9nIGR3aW5kb3cgewogICAgcG9zaXRpb246Zml4ZWQ7CiAgICBsZWZ0OjUwJTsKICAgIHRvcDo1MCU7CiAgICB3aWR0aDoxMDAlOwogICAgbWF4LXdpZHRoOjgwJTsKICAgIHRyYW5zZm9ybTp0cmFuc2xhdGVYKC01MCUpIHRyYW5zbGF0ZVkoLTUwJSk7CiAgICBiYWNrZ3JvdW5kOndoaXRlOwogICAgY29sb3I6YmxhY2s7Cn0KZGlhbG9nIHRhYmxlIHsKICAgIHdpZHRoOjEwMCU7CiAgICBoZWlnaHQ6MTAwJTsKfQpkaWFsb2cgdGFibGUgdHIgdGQgewogICAgaGVpZ2h0OjEwMCU7CiAgICB2ZXJ0aWNhbC1hbGlnbjp0b3A7Cn0KZGlhbG9nIHRhYmxlIHRyIHRkLm1pZGRsZXsKICAgIHZlcnRpY2FsLWFsaWduOm1pZGRsZTsKfQpkaWFsb2cgdGFibGUgdHIgdGQuY2VudGVyewogICAgdGV4dC1hbGlnbjpjZW50ZXI7Cn0KZGlhbG9nIHRhYmxlIHRyIHRkLnJpZ2h0ewogICAgdGV4dC1hbGlnbjpyaWdodDsKfQ=="});
sfa.setFn("app/config/App", ()=>{var exports = {};
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyApp = void 0;
const App_1 = require("App");
const Routes_1 = require("app/config/Routes");
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
    "/page7": "page7",
    "/page8": "page8",
    "/page9": "page9",
};
;
return exports;});
sfa.setFn("app/dialog/AlertDialog", ()=>{var exports = {};
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlertDialog = void 0;
const Dialog_1 = require("Dialog");
const Response_1 = require("Response");
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
class LoadingDialog extends Dialog_1.Dialog {
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
class HeaderUI extends UI_1.UI {
    static set setTitle(title) {
        this.title.text = title;
    }
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
sfa.setFn("app/view/HomeView", ()=>{var exports = {};
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HomeView = void 0;
const Response_1 = require("Response");
const View_1 = require("app/view/View");
class HomeView extends View_1.View {
    handle() {
        this.back = false;
        this.title = "Home";
        this.mjs.page1.onClick = () => {
            // next to Page1.
            Response_1.Response.next("/page1");
        };
        this.mjs.page2.onClick = () => {
            // next to Page2.
            Response_1.Response.next("/page2");
        };
        this.mjs.page3.onClick = () => {
            // next to Page3.
            Response_1.Response.next("/page3");
        };
        this.mjs.page4.onClick = () => {
            // next to Page4.
            Response_1.Response.next("/page4");
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
class Page1View extends View_1.View {
    handle() {
        this.title = "Page1";
        this.mjs.btn.childs.next.onClick = () => {
            // move to type1
            Response_1.Response.next("/page1/type1");
        };
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
sfa.setFn("rendering/dialog/alert.html", ()=>{ return "PGRpdiBjbGFzcz0ibTIwIj4KICAgIDxoMyB2LWNoaWxkPSJ0aXRsZSI+PC9oMz4KICAgIDxwIHYtY2hpbGQ9Im1lc3NhZ2UiPjwvcD4KICAgIDxkaXYgc3R5bGU9InRleHQtYWxpZ246cmlnaHQiPgogICAgICAgIDxhIHYtY2hpbGQ9ImNsb3NlIj5jbG9zZTwvYT4KICAgIDwvZGl2Pgo8L2Rpdj4K";});
sfa.setFn("rendering/dialog/confirm.html", ()=>{ return "PGRpdiBjbGFzcz0ibTIwIj4KICAgIDxwIHYtY2hpbGQ9Im1lc3NhZ2UiPjwvcD4KICAgIDxkaXYgc3R5bGU9InRleHQtYWxpZ246cmlnaHQiPgogICAgICAgIDxhIHYtY2hpbGQ9ImNsb3NlIj5jbG9zZTwvYT4KICAgICAgICA8YSB2LWNoaWxkPSJuZXh0Ij5uZXh0PC9hPgogICAgPC9kaXY+CjwvZGl2Pgo=";});
sfa.setFn("rendering/dialog/loading.html", ()=>{ return "PGRpdiBjbGFzcz0ibTIwIj4KICAgIDxkaXYgY2xhc3M9ImxvYWRpbmciPgogICAgICAgIDxkaXYgY2xhc3M9ImltYWdlIj48L2Rpdj4KICAgICAgICA8ZGl2IGNsYXNzPSJtZXNzYWdlIiB2LWNoaWxkPSJtZXNzYWdlIj48L2Rpdj4gICAgCiAgICA8L2Rpdj4KPC9kaXY+Cg==";});
sfa.setFn("rendering/dialog/test.html", ()=>{ return "PGRpdiBjbGFzcz0ibTIwIj4KICAgIDxwPlRlc3QgRGlhbG9nLi4uLk9LPC9wPgogICAgPGRpdiBzdHlsZT0idGV4dC1hbGlnbjpyaWdodCI+CiAgICAgICAgPGEgdi1jaGlsZD0iY2xvc2UiPmNsb3NlPC9hPgogICAgPC9kaXY+CjwvZGl2Pgo=";});
sfa.setFn("rendering/template/default.html", ()=>{ return "PGhlYWRlcj48L2hlYWRlcj4KPG1haW4+PGFydGljbGU+PC9hcnRpY2xlPjwvbWFpbj4=";});
sfa.setFn("rendering/ui/head.html", ()=>{ return "PG1ldGEgY2hhcnNldD0idXRmOCI+CjxtZXRhIG5hbWU9InZpZXdwb3J0IiBjb250ZW50PSJ3aWR0aD1kZXZpY2Utd2lkdGgsIGluaXRpYWwtc2NhbGU9MS4wIj4KPHRpdGxlPkFwcCBTYW1wbGU8L3RpdGxlPgo8bGluayByZWw9InN0eWxlc2hlZXQiIGhyZWY9ImNzcy9zdHlsZS5jc3MiPg==";});
sfa.setFn("rendering/ui/header.html", ()=>{ return "PGRpdj4KICAgIDxsYWJlbCB2LWNoaWxkPSJiYWNrIiBjbGFzcz0iYXJyb3cgYmFjayI+PC9sYWJlbD4KPC9kaXY+CjxkaXYgY2xhc3M9Im1heCI+CiAgICA8aDEgdi1jaGlsZD0idGl0bGUiPjwvaDE+ICAgIAo8L2Rpdj4KCg==";});
sfa.setFn("rendering/ui/page4item.html", ()=>{ return "PGxpPgogICAgPGEgdi1jaGlsZD0ibGluayI+CiAgICAgICAgPGRpdiB2LWNoaWxkPSJuYW1lIj48L2Rpdj4KICAgICAgICA8ZGl2IHYtY2hpbGQ9ImNvZGUiPjwvZGl2PgogICAgPC9hPgo8L2xpPg==";});
sfa.setFn("rendering/view/home.html", ()=>{ return "PHRhYmxlIGNsYXNzPSJ3aW5kb3ciPgogICAgPHRyIGNsYXNzPSJtaWRkbGUiPgogICAgICAgIDx0ZD4KICAgICAgICAgICAgPGRpdiBjbGFzcz0ibTEwIj4KICAgICAgICAgICAgICAgIDxwPkFwcGxpY2F0aW9uIFRlc3QgU2FtcGxlLi4uPC9wPgogICAgICAgICAgICAgICAgPHA+PGEgY2xhc3M9ImJ0biIgdj0icGFnZTEiPk5leHQgUGFnZTE8L2E+PC9wPgogICAgICAgICAgICAgICAgPHA+PGEgY2xhc3M9ImJ0biIgdj0icGFnZTIiPk5leHQgUGFnZTIgKE1vZGVybkpTKTwvYT48L3A+CiAgICAgICAgICAgICAgICA8cD48YSBjbGFzcz0iYnRuIiB2PSJwYWdlMyI+TmV4dCBQYWdlMyAoRGlhbG9nKTwvYT48L3A+CiAgICAgICAgICAgICAgICA8cD48YSBjbGFzcz0iYnRuIiB2PSJwYWdlNCI+TmV4dCBQYWdlNCAoTGlzdCk8L2E+PC9wPgogICAgICAgICAgICAgICAgPHA+PGEgY2xhc3M9ImJ0biIgdj0icGFnZTUiPk5leHQgUGFnZTUgKFZhbGlkYXRpb24pPC9hPjwvcD4KICAgICAgICAgICAgPC9kaXY+ICAgICAgICAgICAgCiAgICAgICAgPC90ZD4KICAgIDwvdHI+CjwvdGFibGU+Cg==";});
sfa.setFn("rendering/view/page1/type1.html", ()=>{ return "PGRpdiBjbGFzcz0ibTEwIj4KICAgIDxoMj5UeXBlMSAuLi4uIE9LPC9oMj4KPC9kaXY+";});
sfa.setFn("rendering/view/page1.html", ()=>{ return "PHRhYmxlIGNsYXNzPSJ3aW5kb3ciPgogICAgPHRyPgogICAgICAgIDx0ZD4KICAgICAgICAgICAgPGRpdiBjbGFzcz0ibTEwIj4KICAgICAgICAgICAgICAgIDxwPlBhZ2UxIFRleHQgU2FtcGxlLi4uPC9wPgogICAgICAgICAgICA8L2Rpdj4gICAgICAgICAgICAKICAgICAgICA8L3RkPgogICAgPC90cj4KICAgIDx0ciBjbGFzcz0iYm90dG9tIj4KICAgICAgICA8dGQ+CiAgICAgICAgICAgIDxkaXYgY2xhc3M9Im0xMCI+CiAgICAgICAgICAgICAgICA8YSBjbGFzcz0iYnRuIiB2PSJidG4ubmV4dCI+TmV4dCBUeXBlMS4uLjwvYT4KICAgICAgICAgICAgPC9kaXY+CiAgICAgICAgICAgIDxkaXYgY2xhc3M9Im0xMCI+CiAgICAgICAgICAgICAgICA8YSBjbGFzcz0iYnRuIiB2PSJidG4ucmVwbGFjZSI+UmVwbGFjZSBUeXBlMi4uLjwvYT4KICAgICAgICAgICAgPC9kaXY+CiAgICAgICAgPC90ZD4KICAgIDwvdHI+CjwvdGFibGU+Cg==";});
sfa.setFn("rendering/view/page2/detail.html", ()=>{ return "PGRpdiBjbGFzcz0ibTEwIj4KICAgIDxwPlRleHQgU2FtcGxlIFRleHQgU2FtcGxlIC4uLi4uLi48L3A+CjwvZGl2Pg==";});
sfa.setFn("rendering/view/page2.html", ()=>{ return "PGRpdiBjbGFzcz0ibTEwIj4KICAgIDxwIHY9ImRlc2NyaXB0aW9uIj48L3A+CiAgICA8dWw+CiAgICAgICAgPGxpIHY9Iml0ZW0iPlRleHQgU2FtcGxlIC4uLi48L2xpPgogICAgICAgIDxsaSB2PSJpdGVtIj5UZXh0IFNhbXBsZSAuLi4uPC9saT4KICAgICAgICA8bGkgdj0iaXRlbSI+VGV4dCBTYW1wbGUgLi4uLjwvbGk+CiAgICAgICAgPGxpIHY9Iml0ZW0iPlRleHQgU2FtcGxlIC4uLi48L2xpPgogICAgICAgIDxsaSB2PSJpdGVtIj5UZXh0IFNhbXBsZSAuLi4uPC9saT4KICAgICAgICA8bGkgdj0iaXRlbSI+VGV4dCBTYW1wbGUgLi4uLjwvbGk+CiAgICAgICAgPGxpIHY9Iml0ZW0iPlRleHQgU2FtcGxlIC4uLi48L2xpPgogICAgPC91bD4KICAgIDxhIGNsYXNzPSJidG4iIHY9ImJ1dHRvbjEiPkJ1dHRvbjE8L2E+CgogICAgPHVsPgogICAgICAgIDxsaT48cD48YSBjbGFzcz0iYnRuIiB2PSJsaW5rMSI+TmV4dCBQYWdlMihpZCA9IDEpPC9hPjwvcD48L2xpPgogICAgICAgIDxsaT48cD48YSBjbGFzcz0iYnRuIiB2PSJsaW5rMiI+TmV4dCBQYWdlMihpZCA9IDIpPC9hPjwvcD48L2xpPgogICAgICAgIDxsaT48cD48YSBjbGFzcz0iYnRuIiB2PSJsaW5rMyI+TmV4dCBQYWdlMihpZCA9IDMpPC9hPjwvcD48L2xpPgogICAgPC91bD4KPC9kaXY+";});
sfa.setFn("rendering/view/page3.html", ()=>{ return "PGRpdiBjbGFzcz0ibTEwIj4KICAgIDxwPmFsZXJ0IGRpYWxvZzwvcD4KICAgIDxwPjxhIGNsYXNzPSJidG4iIHY9ImQxIj5PcGVuIERpYWxvZzEgKFRlc3QpPC9hPjwvcD4KICAgIDxwPjxhIGNsYXNzPSJidG4iIHY9ImQyIj5PcGVuIERpYWxvZzIgKEFsZXJ0MSk8L2E+PC9wPgogICAgPHA+PGEgY2xhc3M9ImJ0biIgdj0iZDMiPk9wZW4gRGlhbG9nMyAoQWxlcnQyKTwvYT48L3A+CiAgICA8cD48YSBjbGFzcz0iYnRuIiB2PSJkNCI+T3BlbiBEaWFsb2c0IChDb25maXJtKTwvYT48L3A+CiAgICA8cD48YSBjbGFzcz0iYnRuIiB2PSJkNSI+T3BlbiBEaWFsb2c1IChMb2FkaW5nKTwvYT48L3A+CjwvZGl2PgoK";});
sfa.setFn("rendering/view/page4/detail.html", ()=>{ return "PGRpdiBjbGFzcz0ibTEwIj4KICAgIDx0YWJsZT4KICAgICAgICA8dHI+CiAgICAgICAgICAgIDx0aD5uYW1lPC90aD4KICAgICAgICAgICAgPHRkIHY9Im5hbWUiPjwvdGQ+CiAgICAgICAgPC90cj4KICAgICAgICA8dHI+CiAgICAgICAgICAgIDx0aD5jb2RlPC90aD4KICAgICAgICAgICAgPHRkIHY9ImNvZGUiPjwvdGQ+CiAgICAgICAgPC90cj4KICAgICAgICA8dHI+CiAgICAgICAgICAgIDx0aD5kZXNjcmlwdGlvbjwvdGg+CiAgICAgICAgICAgIDx0ZCB2PSJkZXNjcmlwdGlvbiI+PC90ZD4KICAgICAgICA8L3RyPgogICAgPC90YWJsZT4KPC9kaXY+Cg==";});
sfa.setFn("rendering/view/page4.html", ()=>{ return "PGJyPgo8dWwgY2xhc3M9Imxpc3QiIHY9Imxpc3QiPjwvdWw+";});
sfa.setFn("resource/css/style.css", ()=>{ return "text/css|OnJvb3QgewogICAgLS1tYWluX2JhY2tncm91bmQ6IHJnYig3MCw3MCw3MCk7CiAgICAtLW1haW5fY29sb3I6IHJnYigyMjAsMjIwLDIyMCk7CiAgICAtLWhlYWRlcl9iYWNrZ3JvdW5kOiByZ2IoNTAsNTAsNTApOwogICAgLS1oZWFkZXJfY29sb3I6IHJnYigyMjAsMjIwLDIyMCk7OwogICAgLS1oZWFkZXJfYm9yZGVyX3NpemU6IHNvbGlkIDFweCByZ2IoMTYwLDE2MCwxNjApOwogICAgLS1hcnJvd19ib3JkZXI6c29saWQgMXB4IHJnYigyMjAsMjIwLDIyMCk7CiAgICAtLWFjdGl2ZV9iYWNrZ3JvdW5kOnJnYmEoMCwwLDAsMC40KTsKICAgIC0tYnV0dG9uX2JhY2tncm91bmQ6cmdiKDUsMTEwLDE2MCk7CiAgICAtLWJ1dHRvbl9jb2xvcjpyZ2IoMjQwLDI0MCwyNDApOwogICAgLS1idXR0b25fYm9yZGVyOnNvbGlkIDNweCB2YXIoLS1idXR0b25fYmFja2dyb3VuZCk7CiAgICAtLWRpYWxvZ19iYWNrZ3JvdW5kOnJnYigzMCwzMCwzMCk7CiAgICAtLWRpYWxvZ19jb2xvcjp2YXIoLS1tYWluX2NvbG9yKTsKfQoqIHsKICAgIGJveC1zaXppbmc6Ym9yZGVyLWJveDsKfQpoMSwgaDIsIGgzLCBoNCwgaDUgewogICAgZm9udC13ZWlnaHQ6bm9ybWFsOwp9CmJvZHkgewogICAgYmFja2dyb3VuZDp2YXIoLS1tYWluX2JhY2tncm91bmQpOwogICAgY29sb3I6dmFyKC0tbWFpbl9jb2xvcik7Cn0KaGVhZGVyIHsKICAgIGJhY2tncm91bmQ6dmFyKC0taGVhZGVyX2JhY2tncm91bmQpOwogICAgY29sb3I6dmFyKC0taGVhZGVyX2NvbG9yKTsKICAgIGJvcmRlci1ib3R0b206dmFyKC0taGVhZGVyX2JvcmRlcl9zaXplKTsKICAgIHBvc2l0aW9uOmZpeGVkOwogICAgZGlzcGxheTp0YWJsZTsKICAgIGxlZnQ6MDsKICAgIHRvcDowOwogICAgd2lkdGg6MTAwJTsKICAgIGhlaWdodDo1MHB4OwogICAgZm9udC1zaXplOjE2cHg7CiAgICB6LWluZGV4OjI7Cn0KaGVhZGVyID4gKiB7CiAgICBkaXNwbGF5OnRhYmxlLWNlbGw7CiAgICB2ZXJ0aWNhbC1hbGlnbjptaWRkbGU7CiAgICB3aWR0aDphdXRvOwp9CmhlYWRlciA+ICoubWF4IHsKICAgIHdpZHRoOjEwMCU7Cn0KaGVhZGVyIGgxIHsKICAgIG1hcmdpbjowOwogICAgcGFkZGluZzowIDEwcHg7CiAgICBmb250LXNpemU6MjRweDsKfQptYWluIGFydGljbGUgewogICAgcG9zaXRpb246Zml4ZWQ7CiAgICBsZWZ0OjA7CiAgICB0b3A6MDsKICAgIHdpZHRoOjEwMCU7CiAgICBoZWlnaHQ6MTAwJTsKfQpoZWFkZXIgfiBtYWluIGFydGljbGUgewogICAgdG9wOjUwcHg7CiAgICBoZWlnaHQ6Y2FsYygxMDAlIC0gNTBweCk7Cn0KbGFiZWwsCmEgewogICAgY29sb3I6ZGFya2N5YW47CiAgICB0cmFuc2l0aW9uLWR1cmF0aW9uOjEwMG1zOwogICAgZGlzcGxheTppbmxpbmUtYmxvY2s7Cn0KLmFycm93IHsKICAgIHdpZHRoOjQwcHg7CiAgICBoZWlnaHQ6NDBweDsKICAgIHBvc2l0aW9uOnJlbGF0aXZlOwp9Ci5hcnJvdzpiZWZvcmUgewogICAgY29udGVudDoiIjsKICAgIGRpc3BsYXk6YmxvY2s7CiAgICBwb3NpdGlvbjphYnNvbHV0ZTsKICAgIGxlZnQ6NTAlOwogICAgdG9wOjUwJTsKICAgIHdpZHRoOjE2cHg7CiAgICBoZWlnaHQ6MTZweDsKICAgIGJvcmRlci1sZWZ0OnZhcigtLWFycm93X2JvcmRlcik7CiAgICBib3JkZXItdG9wOnZhcigtLWFycm93X2JvcmRlcik7CiAgICB0cmFuc2Zvcm06dHJhbnNsYXRlWSgtNTAlKSByb3RhdGUoMTM1ZGVnKTsKICAgIG1hcmdpbi1sZWZ0Oi0xNnB4Owp9Ci5hcnJvdy5iYWNrOmJlZm9yZSB7CiAgICB0cmFuc2Zvcm06dHJhbnNsYXRlWSgtNTAlKSByb3RhdGUoLTQ1ZGVnKTsKICAgIG1hcmdpbi1sZWZ0Oi0zcHg7Cn0KbWFpbiBhcnRpY2xlIHRhYmxlIHRyIHRoLAptYWluIGFydGljbGUgdGFibGUgdHIgdGQgewogICAgdmVydGljYWwtYWxpZ246dG9wOwogICAgcGFkZGluZzoxMHB4Owp9Cm1haW4gYXJ0aWNsZSB0YWJsZSB0ciB0aCB7CiAgICB0ZXh0LWFsaWduOnJpZ2h0Owp9Cm1haW4gYXJ0aWNsZSB0YWJsZS53aW5kb3d7CiAgICBwb3NpdGlvbjphYnNvbHV0ZTsKICAgIGxlZnQ6MDsKICAgIHRvcDowOwogICAgd2lkdGg6MTAwJTsKICAgIGhlaWdodDoxMDAlOwp9Cm1haW4gYXJ0aWNsZSB0YWJsZS53aW5kb3cgdHIgdGQgewogICAgcGFkZGluZzowOwogICAgaGVpZ2h0OjEwMCU7CiAgICB2ZXJ0aWNhbC1hbGlnbjp0b3A7CiAgICBoZWlnaHQ6MTAwJTsKfQptYWluIGFydGljbGUgdGFibGUud2luZG93IHRyLm1pZGRsZSB0ZHsKICAgIHZlcnRpY2FsLWFsaWduOm1pZGRsZTsKfQptYWluIGFydGljbGUgdGFibGUud2luZG93IHRyLmJvdHRvbSB0ZHsKICAgIHZlcnRpY2FsLWFsaWduOmJvdHRvbTsKfQoKLm0xMCB7IG1hcmdpbjoxMHB4OyB9Ci5tMjAgeyBtYXJnaW46MjBweDsgfQoubWwxMCB7IG1hcmdpbi1sZWZ0OjEwcHg7IH0KLm1sMjAgeyBtYXJnaW4tbGVmdDoyMHB4OyB9Ci5tcjEwIHsgbWFyZ2luLXJpZ2h0OjEwcHg7IH0KLm1yMjAgeyBtYXJnaW4tcmlnaHQ6MjBweDsgfQoubXQxMCB7IG1hcmdpbi10b3A6MTBweDsgfQoubXQyMCB7IG1hcmdpbi10b3A6MjBweDsgfQoubWIxMCB7IG1hcmdpbi1ib3R0b206MTBweDsgfQoubWIyMCB7IG1hcmdpbi1ib3R0b206MjBweDsgfQoKLmJ0biB7CiAgICBiYWNrZ3JvdW5kOnZhcigtLWJ1dHRvbl9iYWNrZ3JvdW5kKTsKICAgIGNvbG9yOnZhcigtLWJ1dHRvbl9jb2xvcik7CiAgICBsaW5lLWhlaWdodDo1MHB4OwogICAgaGVpZ2h0OjUwcHg7CiAgICBib3JkZXItcmFkaXVzOjVweDsKICAgIGJvcmRlcjp2YXIoLS1idXR0b25fYm9yZGVyKTsKICAgIGRpc3BsYXk6YmxvY2s7CiAgICBmb250LXNpemU6MThweDsKICAgIGZvbnQtd2VpZ2h0OmJvbGQ7CiAgICB0ZXh0LWFsaWduOmNlbnRlcjsKfQouYnRuOmFjdGl2ZSB7CiAgICBiYWNrZ3JvdW5kOnZhcigtLWFjdGl2ZV9iYWNrZ3JvdW5kKTsKfQpkaWFsb2cgZHdpbmRvdyB7CiAgICBiYWNrZ3JvdW5kOnZhcigtLWRpYWxvZ19iYWNrZ3JvdW5kKTsKICAgIGNvbG9yOnZhcigtLWRpYWxvZ19jb2xvcik7CiAgICBib3JkZXI6c29saWQgMXB4IHdoaXRlOwogICAgZm9udC1zaXplOjE2cHg7Cn0KYSB7CiAgICBjb2xvcjpjeWFuOwp9CmRpYWxvZyBkd2luZG93IC5sb2FkaW5newogICAgZGlzcGxheTp0YWJsZTsKICAgIHdpZHRoOjEwMCU7Cn0KZGlhbG9nIGR3aW5kb3cgLmxvYWRpbmcgPiAqIHsKICAgIGRpc3BsYXk6dGFibGUtY2VsbDsKICAgIHZlcnRpY2FsLWFsaWduOm1pZGRsZTsKfQpkaWFsb2cgZHdpbmRvdyAubG9hZGluZyAuaW1hZ2UgewogICAgd2lkdGg6NTBweDsKICAgIGhlaWdodDo1MHB4Owp9CmRpYWxvZyBkd2luZG93IC5sb2FkaW5nIC5pbWFnZTphZnRlcnsKICAgIGNvbnRlbnQ6IiI7CiAgICBkaXNwbGF5OmJsb2NrOwogICAgd2lkdGg6NTBweDsKICAgIGhlaWdodDo1MHB4OwogICAgYm9yZGVyLXJhZGl1czo1MCU7CiAgICBib3JkZXI6c29saWQgNXB4IHJnYig0MCwxMzAsMTUwKTsKICAgIGJvcmRlci1yaWdodDpzb2xpZCA1cHggcmdiYSgwLDAsMCwwKTsKICAgIGFuaW1hdGlvbjogbG9hZGluZ3MgMXMgbGluZWFyIGluZmluaXRlOwp9CmRpYWxvZyBkd2luZG93IC5sb2FkaW5nIC5tZXNzYWdlIHsKICAgIHBhZGRpbmctbGVmdDoxMHB4Owp9CkBrZXlmcmFtZXMgbG9hZGluZ3MgewogICAgMCV7CiAgICAgICAgdHJhbnNmb3JtOnJvdGF0ZSgwZGVnKTsKICAgIH0KICAgIDEwMCV7CiAgICAgICAgdHJhbnNmb3JtOnJvdGF0ZSgzNjBkZWcpOwogICAgfQp9CnVsLmxpc3R7CiAgICBtYXJnaW46MDsKICAgIHBhZGRpbmc6MDsKfQp1bC5saXN0IGxpIHsKICAgIG1hcmdpbjowOwogICAgbWFyZ2luOjA7CiAgICBsaXN0LXN0eWxlLXR5cGU6bm9uZTsKICAgIGJhY2tncm91bmQ6cmdiKDUwLDUwLDUwKTsKICAgIGJvcmRlci1ib3R0b206c29saWQgMXB4IHJnYigxODAsMTgwLDE4MCk7Cn0KdWwubGlzdCBsaTpmaXJzdC1jaGlsZHsgCiAgICBib3JkZXItdG9wOnNvbGlkIDFweCByZ2IoMTgwLDE4MCwxODApOwp9CnVsLmxpc3QgbGkgYSB7CiAgICBjb2xvcjp2YXIoLS1tYWluX2NvbG9yKTsKICAgIGRpc3BsYXk6YmxvY2s7CiAgICBwYWRkaW5nOjEwcHg7Cn0K"});
sfa.start(()=>{ const st = use("Startor");  new st.Startor(); });