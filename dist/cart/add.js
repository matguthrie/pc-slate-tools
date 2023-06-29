"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addToCartCB = exports.addToCart = exports.cartAdd = void 0;
var $ = require("jquery");
var queue_1 = require("./queue");
var events_1 = require("./events");
;
;
exports.cartAdd = function (params) {
    return new Promise(function (resolve, reject) {
        var o = {
            url: '/cart/add.js',
            dataType: "json",
            method: 'POST',
            data: params,
            action: 'add'
        };
        o.success = function (data) {
            resolve(data);
            queue_1.addFinishTrigger({ event: events_1.ON_ITEM_ADDED, data: data });
            queue_1.removeTask(this);
            queue_1.nextTask();
        }.bind(o);
        o.error = function (e, i, a) {
            reject(e ? e.responseJSON || e : 'Unknown Error');
            queue_1.removeTask(this);
            queue_1.errorQueue();
        }.bind(o);
        o.task = function () {
            $.ajax(this);
        }.bind(o);
        queue_1.addTask(o);
    });
};
//Promise Flavour
/** @deprecated */
exports.addToCart = function (variant, quantity, properties) {
    if (quantity === void 0) { quantity = 1; }
    return new Promise(function (resolve, reject) {
        exports.addToCartCB(variant, quantity, properties, resolve, reject);
    });
};
//Callback flavour
/** @deprecated */
exports.addToCartCB = function (variant, quantity, properties, callback, errorCallback) {
    if (quantity === void 0) { quantity = 1; }
    var o = {
        variant: variant,
        quantity: quantity,
        callback: callback,
        errorCallback: errorCallback,
        url: '/cart/add.js',
        dataType: "json",
        method: 'POST',
        data: {
            id: variant,
            quantity: quantity,
            properties: properties
        },
        action: 'add'
    };
    o.success = function (data) {
        if (this.callback)
            this.callback(data);
        queue_1.addFinishTrigger({ event: events_1.ON_ITEM_ADDED, data: data });
        queue_1.removeTask(this);
        queue_1.nextTask();
    }.bind(o);
    o.error = function (e, i, a) {
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
//# sourceMappingURL=add.js.map