"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setQueryParams = exports.getQueryParams = void 0;
exports.getQueryParams = function (url) {
    url = url || window.location.href;
    var _a = url.split('?'), origin = _a[0], searchAndHash = _a[1];
    searchAndHash = searchAndHash || "";
    var search = searchAndHash.split('#')[0];
    return (search || '').split('&').reduce(function (o, e) {
        var _a = e.split('=').map(function (x) { return decodeURIComponent(x); }), key = _a[0], value = _a[1];
        if (!key || !value)
            return o;
        o[key] = value;
        return o;
    }, {});
};
exports.setQueryParams = function (params, url) {
    params = params || {};
    url = url || window.location.href;
    var qp = __assign(__assign({}, exports.getQueryParams(url)), params);
    //Remove undefined
    Object.keys(qp).forEach(function (key) {
        if (typeof qp[key] !== typeof undefined)
            return;
        delete qp[key];
    });
    var _a = url.split('?'), origin = _a[0], searchAndHash = _a[1];
    searchAndHash = searchAndHash || "";
    var _b = searchAndHash.split('#'), search = _b[0], hash = _b[1];
    var qs = Object.keys(qp).reduce(function (x, key, i) {
        var value = qp[key];
        if (i != 0)
            x += '&';
        return x += encodeURIComponent(key) + '=' + encodeURIComponent(value);
    }, '') + (hash ? '#' + hash : '');
    return "" + (origin || '') + (qs ? "?" + qs : '');
};
//# sourceMappingURL=index.js.map