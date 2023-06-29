"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.changeCartCb = exports.changeCart = void 0;
var $ = require("jquery");
var queue_1 = require("./queue");
var events_1 = require("./events");
//Promise
exports.changeCart = function (changes) {
    return new Promise(function (resolve, reject) {
        exports.changeCartCb(changes, resolve, reject);
    });
};
exports.changeCartCb = function (changes, callback, errorCallback) {
    if (!Array.isArray(changes))
        changes = [changes];
    var updates = changes.reduce(function (x, c) {
        var v = c.variant || c.key;
        var q = c.quantity;
        x[v] = q;
        return x;
    }, {});
    var o = {
        updates: updates,
        callback: callback,
        errorCallback: errorCallback,
        url: '/cart/update.js',
        dataType: "json",
        method: 'POST',
        data: { updates: updates },
        action: 'change'
    };
    o.success = function (data) {
        if (this.callback)
            this.callback(data);
        queue_1.addFinishTrigger({ event: events_1.ON_ITEM_CHANGED, data: data });
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
//# sourceMappingURL=change.js.map