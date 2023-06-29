"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setCartDetailsCB = exports.setCartDetails = exports.setCartAttributes = exports.addCartAttributes = exports.setCartNote = void 0;
var $ = require("jquery");
var queue_1 = require("./queue");
var get_1 = require("./get");
var events_1 = require("./events");
exports.setCartNote = function (note) { return exports.setCartDetails(undefined, note); };
exports.addCartAttributes = function (attributes) { return exports.setCartDetails(attributes); };
exports.setCartAttributes = function (attributes) {
    var cart = get_1.getCurrentCart();
    cart.attributes = cart.attributes || {};
    Object.keys(cart.attributes).forEach(function (key) { return attributes[key] = ''; });
    return exports.setCartDetails(attributes);
};
exports.setCartDetails = function (attributes, note) {
    return new Promise(function (resolve, reject) { return exports.setCartDetailsCB(attributes, note, resolve, reject); });
};
exports.setCartDetailsCB = function (attributes, note, callback, errorCallback) {
    //A null note will be undefined (so it won't update), use "" instead for empty.
    if (note == null)
        note = undefined;
    var o = {
        callback: callback, errorCallback: errorCallback,
        url: "/cart.js",
        method: 'POST',
        dataType: 'json',
        data: { note: note, attributes: attributes },
        action: 'details'
    };
    o.success = function (data) {
        get_1.setCurrentCart(data); //The returned value is the full cart, we can use it to update the cart
        if (this.callback)
            this.callback(data);
        queue_1.addFinishTrigger({ event: events_1.ON_DETAILS_SET, data: data });
        queue_1.addFinishTrigger({ event: events_1.ON_CART_FETCHED, data: data });
        queue_1.removeTask(this);
        queue_1.nextTask();
    }.bind(o);
    o.error = function (e, i, a) {
        if (this.errorCallback)
            this.errorCallback(e ? e.responseJSON || e : 'Unknown Error');
        queue_1.removeTask(this);
        queue_1.errorQueue();
    }.bind(o);
    o.task = function () {
        $.ajax(this);
    }.bind(o);
    queue_1.addTask(o);
};
//# sourceMappingURL=details.js.map