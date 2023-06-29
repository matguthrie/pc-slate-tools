"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeFromCartCB = exports.removeFromCart = void 0;
var $ = require("jquery");
var queue_1 = require("./queue");
var events_1 = require("./events");
//Promise based
exports.removeFromCart = function (line) {
    return new Promise(function (resolve, reject) {
        exports.removeFromCartCB(line, resolve, reject);
    });
};
exports.removeFromCartCB = function (line, callback, errorCallback) {
    var o = {
        line: line,
        callback: callback,
        errorCallback: errorCallback,
        url: '/cart/change.js',
        dataType: 'json',
        method: 'POST',
        data: {
            line: line,
            quantity: 0
        },
        action: 'remove'
    };
    o.success = function (data) {
        if (this.callback)
            this.callback(data);
        queue_1.addFinishTrigger({ event: events_1.ON_ITEM_REMOVED, data: data });
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
//# sourceMappingURL=remove.js.map