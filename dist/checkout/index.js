"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshCheckout = void 0;
exports.refreshCheckout = function () {
    return new Promise(function (resolve, reject) {
        try {
            window['OrderSummaryUpdater'].prototype.refresh(function () {
                resolve();
            });
        }
        catch (e) {
            reject(e);
        }
    });
};
//# sourceMappingURL=index.js.map