"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
function merge(base, partial) {
    if (partial === void 0) { partial = {}; }
    var result = __assign({}, base);
    for (var _i = 0, _a = Object.keys(partial); _i < _a.length; _i++) {
        var key = _a[_i];
        var value = partial[key];
        if (value !== undefined) {
            result[key] = __assign(__assign({}, result[key]), value);
        }
    }
    return result;
}
exports.merge = merge;
