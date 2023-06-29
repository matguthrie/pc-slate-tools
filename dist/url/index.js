"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getImageUrl = exports.getCdnUrl = exports.getAssetUrl = void 0;
var image_1 = require("../image");
var CDN_URL = '//cdn.shopify.com';
exports.getAssetUrl = function (asset) {
    if (!window['Asset'])
        throw new Error("You have not setup a same asset url for the script to use! Ensure window.Asset has been set with any asset url!");
    var a = window['Asset'];
    var y = a.split('/');
    y.splice(-1, 1);
    y.push(asset);
    return y.join('/');
};
exports.getCdnUrl = function () {
    var y = exports.getAssetUrl('').split('/');
    y.splice(y.length - 4, y.length);
    return y.join('/');
};
exports.getImageUrl = function (src, size) {
    if (!src) {
        //Source not specified / valid, return the no-image image.
        return CDN_URL + "/s/assets/no-image-2048-5e88c1b20e087fb7bbe9a3771824e743c244f437e4f8ba93bbf7b11b53f7824c.gif";
    }
    //Resize Cloudinary
    var srcFirst = Array.isArray(src) ? src[0] : src;
    var isCloudinary = typeof srcFirst['cloudinary_src'] !== typeof undefined;
    if (isCloudinary) {
        var img = srcFirst;
        if (!size)
            return img.original_src;
        return img.cloudinary_src + 'w_' + size;
    }
    var strSrc = src;
    var removeProtocol = function (path) {
        var str = path.replace(/http(s)?:/, '');
        if (!str.startsWith(CDN_URL))
            str = "" + CDN_URL + str;
        if (str.indexOf('?') !== -1) {
            var bits = str.split('?');
            bits.pop();
            str = bits.join('?');
        }
        return str;
    };
    size = size ? "" + size : null; //Convert to string
    if (!size)
        return removeProtocol(strSrc);
    if (image_1.SHOPIFY_VALID_IMG_SIZE_NAMES.some(function (vimg) { return size === vimg; })) {
    }
    else {
        if (!size.endsWith('x'))
            size += 'x';
    }
    if (strSrc.indexOf('.') !== -1) {
        var bits = removeProtocol(strSrc).split('.');
        var ext = bits.pop(); //Remove extension
        var possiblyHasSize = bits.pop(); //Get the last . element
        if (possiblyHasSize && possiblyHasSize.length) {
            var pathSplit = possiblyHasSize.split('/'); //Remove paths 
            var splitByUnderscore = pathSplit.pop().split('_');
            var end_1 = splitByUnderscore.pop(); //this is possibly a valid size string
            //Remove string
            if ((image_1.SHOPIFY_VALID_IMG_SIZE_NAMES.some(function (s) { return end_1 === s; }) ||
                end_1.endsWith('x') && end_1.replace(/\d/g, '').length === 1)) {
                strSrc = [
                    bits.join('.'),
                    bits.length ? '.' : '',
                    pathSplit.join('/'),
                    pathSplit.length ? '/' : '',
                    splitByUnderscore.filter(function (f) { return f && f.length; }).join('_'),
                    "." + ext
                ].join('');
            }
        }
    }
    var match = strSrc.match(/\.(jpg|jpeg|gif|png|bmp|bitmap|tiff|tif)(\?v=\d+)?$/i);
    if (!match)
        return null;
    var prefix = strSrc.split(match[0]);
    var suffix = match[0];
    return removeProtocol([
        [
            prefix[0].trim(),
            size === 'master' ? null : size.trim(),
        ].filter(function (f) { return f; }).join('_'),
        suffix
    ].filter(function (f) { return f && f.length; }).join('')) + '?v=' + (new Date().getTime() / (1000 * 60 * 10)).toFixed(0);
};
//# sourceMappingURL=index.js.map