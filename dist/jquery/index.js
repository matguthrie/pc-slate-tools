"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jsonFromjQuery = void 0;
exports.jsonFromjQuery = function (jQueryElement) {
    //Validate element
    if (!jQueryElement || !jQueryElement.length)
        throw new Error("Invalid jQuery Element for parsing");
    //Get HTML contents
    var contents = jQueryElement.html();
    //Attempt to parse
    return JSON.parse(contents);
};
//# sourceMappingURL=index.js.map