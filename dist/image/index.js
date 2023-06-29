"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pictureGenerateElement = exports.pictureGenerate = exports.generateIcon = exports.generatePicture = exports.SHOPIFY_VALID_IMG_SIZE_NAMES = void 0;
var string_1 = require("./../string/");
var url_1 = require("./../url/");
exports.SHOPIFY_VALID_IMG_SIZE_NAMES = [
    'master', 'large', 'medium', 'small'
];
/**
 * @deprecated In favour of pictureGenerate() as of 20201010
 */
exports.generatePicture = function (image, width, sizes, clazz, alt, attributes, lazy, lazyExpand) {
    if (width === void 0) { width = 1400; }
    if (sizes === void 0) { sizes = [500, 750, 1000]; }
    attributes = attributes && attributes.length ? attributes : null;
    var ratios = [1, 2, 4];
    //TODO: Maybe we can enable some way of fetching the information about the
    //image here. (Mainly the image src, alt and dimensions if we can)
    var x = '<picture>';
    sizes.forEach(function (s, i) {
        x += '<source media="(';
        if (i != (sizes.length - 1)) {
            x += 'max-width';
        }
        else {
            x += 'min-width';
        }
        x += ":" + s + "px)\" " + (lazy ? "data-srcset" : "srcset") + " =\"";
        ratios.forEach(function (r, y) {
            x += url_1.getImageUrl(image, s * r);
            if (r != 1)
                x += " " + r + "x";
            if (y < (ratios.length - 1))
                x += ', ';
        });
        if (alt)
            return x += "\" " + (lazy ? "data-sizes=\"auto\"" : "") + " alt=\"" + alt + "\" />";
        x += "\" " + (lazy ? "data-sizes=\"auto\"" : "") + " />";
    });
    x += "<img " + (lazy ? "data-src" : "src") + "=\"" + url_1.getImageUrl(image, width) + "\" ";
    if (alt)
        x += "alt=\"" + string_1.escapeString(alt) + "\" ";
    if (clazz)
        x += "class=\"" + clazz + " " + (lazy ? "lazyload" : "") + "\"";
    if (attributes)
        x += attributes + " ";
    x += " " + (lazyExpand ? "data-expand=\"" + lazyExpand + "\"" : "") + "/></picture>";
    return x;
};
exports.generateIcon = function (icon, clazz, title, alt, attributes) {
    if (clazz === void 0) { clazz = ""; }
    if (title === void 0) { title = ""; }
    if (alt === void 0) { alt = ""; }
    if (attributes === void 0) { attributes = ""; }
    var iconHandle = string_1.handlize(icon);
    clazz = "o-icon o-icon--" + iconHandle + " " + clazz;
    return "<img\n    class=\"" + clazz + "\" " + (alt ? 'alt="' + string_1.escapeString(alt) + '"' : '') + "\n    src=\"" + url_1.getAssetUrl("icon-" + icon + ".svg") + "\"\n    " + (title ? 'title="' + string_1.escapeString(title) + '"' : '') + " " + attributes + " data-icon\n  />";
};
exports.pictureGenerate = function (params) {
    var buffer = "<picture>";
    //@deprecated
    if (typeof params['cloudinarySrc'] !== typeof undefined) {
        params.src = params['cloudinarySrc'];
    }
    //Random version number, used to disable cache
    var versionNumber = params.cache == false ? Math.floor(Math.random() * 1000000000) : '';
    //Append the largest size twice so that it can become the last "max width"
    var sizes = __spreadArrays((params.sizes || []));
    if (sizes.length > 1) {
        var largestSize = sizes[sizes.length - 1];
        sizes.push(largestSize);
        //Generate media sources
        sizes.forEach(function (size, si) {
            var isLast = si === params.sizes.length - 1;
            buffer += '<source media="';
            if (typeof size.screen === 'string') {
                buffer += size.screen;
            }
            else {
                var w = size.screen || (typeof size.size === 'number' ? size.size : null);
                if (!w)
                    return;
                buffer += "(" + (isLast ? 'min' : 'max') + "-width:" + w + "px)";
            }
            buffer += "\" " + (params.lazy && params.lazy.dataSrc ? 'data-src' : 'src') + "=\"";
            buffer += url_1.getImageUrl(params.src, size.size);
            buffer += (versionNumber ? "?v=" + versionNumber : "") + "\"";
            if (params.alt)
                buffer += "alt=\"" + params.alt + "\" ";
            if (params.lazy && params.lazy.dataSizes)
                buffer += "data-sies=\"auto\" ";
            buffer += '/>';
        });
    }
    //Add the base image
    var attributes = {};
    attributes[params.lazy && params.lazy.dataSrc ? 'data-src' : 'src'] = "" + url_1.getImageUrl(params.src, params.srcSize) + (versionNumber ? "?v=" + versionNumber : "");
    attributes['class'] = [
        params.class,
        params.lazy && params.lazy.class ? (params.lazy.className || 'lazyload') : null
    ].filter(function (f) { return f; }).join(' ');
    if (params.alt)
        attributes['alt'] = string_1.escapeString(params.alt);
    if (params.lazy) {
        if (params.lazy.dataExpand) {
            attributes['data-expand'] = params.lazy.dataExpand + '';
        }
    }
    buffer += "<img " + Object.keys(attributes).reduce(function (x, key) {
        return x + " " + key + "=\"" + attributes[key] + "\"";
    }, '') + " " + (params.attributes || '') + " />";
    buffer += "</picture>";
    return buffer;
};
exports.pictureGenerateElement = function (params) {
    var div = document.createElement('div');
    div.innerHTML = exports.pictureGenerate(params);
    return div.querySelector('picture');
};
//# sourceMappingURL=index.js.map