"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearCartCB = exports.clearCart = void 0;
var $ = require("jquery");
var queue_1 = require("./queue");
var get_1 = require("./get");
var events_1 = require("./events");
exports.clearCart = function () {
    return new Promise(function (resolve, reject) { return exports.clearCartCB(resolve, reject); });
};
exports.clearCartCB = function (callback, errorCallback) {
    var o = {
        callback: callback, errorCallback: errorCallback,
        url: '/cart/clear.js',
        dataType: 'json',
        method: 'GET',
        data: {},
        action: 'clear'
    };
    o.success = function (data) {
        get_1.setCurrentCart(data); //The returned value is the full cart, we can use it to update the cart
        if (this.callback)
            this.callback(data);
        queue_1.addFinishTrigger({ event: events_1.ON_CART_CLEARED, data: data });
        queue_1.addFinishTrigger({ event: events_1.ON_CART_FETCHED, data: data });
        queue_1.removeTask(this);
        queue_1.nextTask();
    }.bind(o);
    o.error = function (e, i, a) {
        if (this.errorCallback)
            this.errorCallback(e ? e.responseJSON || e : "Unknown Error");
        queue_1.removeTask(this);
        queue_1.errorQueue();
    }.bind(o);
    o.task = function () {
        $.ajax(this);
    }.bind(o);
    queue_1.addTask(o);
};
//# sourceMappingURL=clear.js.map