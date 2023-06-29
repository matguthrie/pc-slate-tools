"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.nextTask = exports.removeFinishTrigger = exports.addFinishTrigger = exports.errorQueue = exports.removeTask = exports.addTask = exports.getCartState = exports.FINISH_TRIGGERS = exports.CART_QUEUE = void 0;
var $ = require("jquery");
var events_1 = require("./events");
var get_1 = require("./get");
//Constants
exports.CART_QUEUE = [];
exports.FINISH_TRIGGERS = [];
;
//Task Management
exports.getCartState = function () {
    return exports.CART_QUEUE.length ? 'pending' : 'finished';
};
/** @deprecated */
exports.addTask = function (task) {
    exports.CART_QUEUE.push(task);
    if (exports.CART_QUEUE.length === 1) {
        //First task
        $(document).trigger(events_1.ON_CART_PENDING);
        exports.nextTask();
    }
};
/** @deprecated */
exports.removeTask = function (task) {
    var action = task.action;
    var i = exports.CART_QUEUE.indexOf(task);
    //This will be called every time a task finished OR fails, if the final task
    //is not a GET cart, then we're going to do a get cart
    var isLast = exports.CART_QUEUE.length === 1;
    if (isLast && !(action == 'get' || action == 'details' || action == 'clear'))
        get_1.getCartCB(); //This will add a get cart task
    if (i !== -1)
        return exports.CART_QUEUE.splice(i, 1);
    exports.nextTask();
};
/** @deprecated */
exports.errorQueue = function () {
    var queue = __spreadArrays(exports.CART_QUEUE);
    exports.CART_QUEUE.splice(0, exports.CART_QUEUE.length);
    queue.forEach(function (e) {
        if (!e.errorCallback)
            return;
        e.errorCallback("Another task failed");
        exports.removeTask(e);
    });
    $(document).trigger(events_1.ON_CART_FINISHED);
};
//Trigger Management
/** @deprecated */
exports.addFinishTrigger = function (trigger) {
    if (exports.FINISH_TRIGGERS.indexOf(trigger) !== -1)
        return;
    exports.FINISH_TRIGGERS.push(trigger);
};
/** @deprecated */
exports.removeFinishTrigger = function (trigger) {
    var i = exports.FINISH_TRIGGERS.indexOf(trigger);
    if (i === -1)
        return;
    exports.FINISH_TRIGGERS.splice(i, 1);
};
//Queue Management
/** @deprecated */
exports.nextTask = function () {
    //Is the task list finished?
    if (!exports.CART_QUEUE.length) {
        __spreadArrays(exports.FINISH_TRIGGERS).forEach(function (trigger) {
            $(document).trigger(trigger.event, trigger.data);
            exports.removeFinishTrigger(trigger);
        });
        $(document).trigger(events_1.ON_CART_FINISHED);
        return;
    }
    //Fetch the next task
    var task = exports.CART_QUEUE[0];
    task.task();
};
//# sourceMappingURL=queue.js.map