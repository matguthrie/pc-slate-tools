"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOptionIndex = exports.fetchRelatedSection = exports.fetchRelated = void 0;
var ajax_1 = require("../ajax");
exports.fetchRelated = function (product_id, limit) {
    if (limit === void 0) { limit = 4; }
    return (ajax_1.ajaxRequest("/recommendations/products.json", 'GET', { product_id: product_id, limit: limit }));
};
exports.fetchRelatedSection = function (params) {
    return ajax_1.ajaxRequest(params.product_recommendations_url, 'GET', params);
};
exports.getOptionIndex = function (params) { return (params.product.options_with_values.findIndex(function (o) { return (params.options.some(function (po) { return po.toLowerCase() == o.name.toLowerCase(); })); })); };
//# sourceMappingURL=index.js.map