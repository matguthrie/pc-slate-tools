"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCountOfVariantInCart = void 0;
var get_1 = require("./get");
exports.getCountOfVariantInCart = function (variantId) { return get_1.getCurrentCart().items.reduce(function (x, item) {
    if (item.variant_id != variantId)
        return x;
    return x += item.quantity;
}, 0); };
//# sourceMappingURL=count.js.map