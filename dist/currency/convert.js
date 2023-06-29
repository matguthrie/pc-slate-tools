"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convert = exports.setUserCurrency = exports.getUserCurrency = exports.getShopCurrency = exports.CURRENCY_COOKIE_NAME = void 0;
var Cookies = require("js-cookie");
exports.CURRENCY_COOKIE_NAME = 'currency';
exports.getShopCurrency = function () {
    var c = window['Currency'];
    if (!c || !c.currency)
        throw new Error('You have not defined your shops currency onto window.Currency.currency!');
    return c.currency;
};
exports.getUserCurrency = function () {
    if (Cookies.get(exports.CURRENCY_COOKIE_NAME))
        return Cookies.get(exports.CURRENCY_COOKIE_NAME);
    return exports.getShopCurrency();
};
exports.setUserCurrency = function (currency) {
    var current = exports.getUserCurrency();
    if (current === currency)
        return;
    Cookies.set(exports.CURRENCY_COOKIE_NAME, currency);
    $(document).trigger('onCurrencyChange', currency);
};
exports.convert = function (money, from, to) {
    var c = window['Currency'];
    from = from || exports.getShopCurrency();
    to = to || exports.getShopCurrency();
    if (from === to)
        return money;
    if (!c || !c.convert)
        throw new Error('You havent imported the Shopify currencies script in your header scripts!');
    return c.convert(money, from, to);
};
//# sourceMappingURL=convert.js.map