"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.printMoney = exports.getFormat = exports.formatMoney = void 0;
var convert_1 = require("./convert");
var formats_1 = require("./formats");
exports.formatMoney = function (cents, format) {
    if (window['Shopify'] && window['Shopify'].formatMoney)
        return window['Shopify'].formatMoney(cents, format);
    if (typeof cents == 'string')
        cents = cents.replace('.', '');
    var value = '';
    var placeholderRegex = /\{\{\s*(\w+)\s*\}\}/;
    var formatString = format || '${{amount}}';
    var formatWithDelimiters = function (number, precision, thousands, decimal) {
        if (precision === void 0) { precision = 2; }
        if (thousands === void 0) { thousands = ','; }
        if (decimal === void 0) { decimal = '.'; }
        var n = parseFloat(number);
        if (isNaN(n) || number == null)
            return "0";
        number = (n / 100.0).toFixed(precision);
        var parts = number.split('.'), dollars = parts[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1' + thousands), cents = parts[1] ? (decimal + parts[1]) : '';
        return dollars + cents;
    };
    switch (formatString.match(placeholderRegex)[1]) {
        case 'amount':
            value = formatWithDelimiters(cents, 2);
            break;
        case 'amount_no_decimals':
            value = formatWithDelimiters(cents, 0);
            break;
        case 'amount_with_comma_separator':
            value = formatWithDelimiters(cents, 2, '.', ',');
            break;
        case 'amount_no_decimals_with_comma_separator':
            value = formatWithDelimiters(cents, 0, '.', ',');
            break;
    }
    return formatString.replace(placeholderRegex, value);
};
exports.getFormat = function (currency, format) {
    currency = currency || convert_1.getUserCurrency();
    //Default format
    if (!format) {
        //Get the currency settings
        var cs = window && window['Currency'] ? window['Currency'] : null;
        if (currency != convert_1.getShopCurrency()) {
            format = cs && cs.convertedFormat ? cs.convertedFormat : 'money_with_currency_format';
        }
        else if (cs && cs.shopFormat && currency == convert_1.getShopCurrency()) {
            return cs.shopFormat;
        }
        else if (cs && cs.format) {
            return cs.format;
        }
        else {
            format = 'money_format';
        }
    }
    var c = formats_1.MONEY_FORMATS[currency];
    if (c[format])
        return c[format];
    return c['money_with_currency_format'];
};
exports.printMoney = function (money, format, currency) {
    currency = currency || convert_1.getUserCurrency();
    var f = exports.getFormat(currency, format);
    var v = convert_1.convert(money, null, currency);
    return exports.formatMoney(v, f);
};
//# sourceMappingURL=format.js.map