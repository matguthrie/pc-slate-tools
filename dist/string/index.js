"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.t = exports.getLanguageKey = exports.liquid = exports.liquidToDate = exports.handlize = exports.escapeString = void 0;
var TEXT_NODE = document.createTextNode("test");
var TEXT_CONTAINER = document.createElement("span");
TEXT_CONTAINER.appendChild(TEXT_NODE);
/**
 *  Escape String
 *    Takes a given string and converts it to an escaped HTML string.
 *    Replaces items like "<" with "&lt;" and "&" with "&amp;"
 *
 * @param {string} s HTML string
 * @returns {string} Escaped string
 */
exports.escapeString = function (s) {
    TEXT_NODE.nodeValue = s;
    return TEXT_CONTAINER.innerHTML;
};
/**
 *  Handlize
 *    Takes in a string and converts it to a Shopify formatted handle
 *
 * @param {string} s String to handlize
 * @returns {string} Handle
 */
exports.handlize = function (s) {
    var str = s.toLowerCase();
    ['"', "'", "\\", "(", ")", "[", "]"].forEach(function (e) { return str = str.replace(e, ''); });
    str = str.replace(/\W+/g, "-");
    while (str.startsWith('-'))
        str = str.substr(1);
    while (str.endsWith('-'))
        str = str.slice(0, -1);
    return str;
};
/**
 *  Liquid to Date
 *    Convert a Liquid string date to a Javascript Date Object
 *
 * @param {string} strDate Liquid date string
 * @returns {Date} Javascript Date Object
 */
exports.liquidToDate = function (strDate) {
    var _a = strDate.split(' '), date = _a[0], time = _a[1], timezone = _a[2];
    var _b = date.split('-').map(function (e) { return parseInt(e); }), year = _b[0], month = _b[1], day = _b[2];
    var _c = time.split(':').map(function (e) { return parseInt(e); }), hour = _c[0], min = _c[1], sec = _c[2];
    return new Date(year, month - 1, day, hour, min, sec);
};
/**
 *  Liquid
 *    Takes in a string containing liquid-like variables e.g. {{ test }} and
 *    replaces them with the variables provided
 *
 * @param {string} str The liquid string
 * @param {object} vars The variables to replace
 * @returns {string} The formatted string
 */
exports.liquid = function (str, vars) {
    if (vars === void 0) { vars = {}; }
    var keys = Object.keys(vars);
    var keysLower = keys.map(function (k) { return k.toLowerCase(); });
    return str.replace(/({)?{{[^{}]*}}(?!})/g, function ($0, $1) {
        var x = $0.replace(/[\{|\s|\}]/g, '');
        if (!x)
            return $0;
        //Lowercaseify
        x = x.toLowerCase();
        var keyIndex = keysLower.findIndex(function (k) { return k == x; });
        if (keyIndex === -1)
            return $0;
        return vars[keys[keyIndex]];
    });
};
exports.getLanguageKey = function (key, variables) {
    if (variables === void 0) { variables = {}; }
    var str;
    //Try find
    if (window && window['Language'] && window['Language'].strings) {
        str = window['Language'].strings[key];
    }
    if (!str || !str.length)
        return "translation missing: " + key;
    return exports.liquid(str, variables);
};
exports.t = exports.getLanguageKey;
//# sourceMappingURL=index.js.map