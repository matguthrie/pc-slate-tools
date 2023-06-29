"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCartCB = exports.updateCart = void 0;
var $ = require("jquery");
var queue_1 = require("./queue");
var events_1 = require("./events");
//Promise Flavour
exports.updateCart = function (lineIndex, quantity) {
    if (quantity === void 0) { quantity = 1; }
    return new Promise(function (resolve, reject) {
        exports.updateCartCB(lineIndex, quantity, resolve, reject);
    });
};
//Callback flavour
exports.updateCartCB = function (line, quantity, callback, errorCallback) {
    if (quantity === void 0) { quantity = 1; }
    var o = {
        line: line,
        quantity: quantity,
        callback: callback,
        errorCallback: errorCallback,
        url: '/cart/change.js',
        dataType: "json",
        method: 'POST',
        data: {
            line: line,
            quantity: quantity
        },
        action: 'update'
    };
    o.success = function (data) {
        if (this.callback)
            this.callback(data);
        queue_1.addFinishTrigger({ event: events_1.ON_ITEM_UPDATED, data: data });
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
//# sourceMappingURL=update.js.map