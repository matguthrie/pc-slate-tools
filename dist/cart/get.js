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
exports.getCartCB = exports.getCart = exports.getCurrentCart = exports.setCurrentCart = void 0;
var $ = require("jquery");
var jquery_1 = require("./../jquery/");
var events_1 = require("./events");
var queue_1 = require("./queue");
//Internal method only, do not use unless you know what you're doing!!
exports.setCurrentCart = function (cart) {
    window["Cart"].data = cart;
    return cart;
};
/*** Current Cart ***/
exports.getCurrentCart = function () {
    //Using JavaScript
    if (window["Cart"] && window["Cart"].data)
        return window["Cart"].data;
    //Using JSON+jQuery
    var cartElement = $('[data-cart-json]');
    if (cartElement.length)
        return window["Cart"].data = jquery_1.jsonFromjQuery(cartElement);
    //using Ajax...
    console.warn('No default cart was loaded, app will get cart via ajax and be blocking!! Dump the cart json into window.Cart before requesting it.');
    exports.getCartCB(null, null, { async: false });
    return exports.getCurrentCart();
};
//Promise Flavour
exports.getCart = function () {
    return new Promise(function (resolve, reject) { return exports.getCartCB(resolve, reject); });
};
//Callback Flavour
exports.getCartCB = function (callback, errorCallback, params) {
    var o = {
        callback: callback, errorCallback: errorCallback,
        url: '/cart.js',
        method: 'GET',
        dataType: 'json',
        data: {},
        action: 'get'
    };
    if (params)
        o = __assign(__assign({}, o), { params: params });
    o.success = function (data) {
        exports.setCurrentCart(data);
        if (this.callback)
            this.callback(data);
        queue_1.addFinishTrigger({ event: events_1.ON_CART_FETCHED, data: data });
        queue_1.removeTask(this);
        queue_1.nextTask();
    }.bind(o);
    o.error = function (e, i) {
        if (typeof this.errorCallback === "function") {
            this.errorCallback(e ? e.responseJSON || e : 'Unknown Error');
        }
        queue_1.removeTask(this);
        queue_1.errorQueue();
    }.bind(o);
    o.task = function () {
        $.ajax(this);
    }.bind(o);
    queue_1.addTask(o);
};
//# sourceMappingURL=get.js.map