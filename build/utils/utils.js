"use strict";
exports.__esModule = true;
exports.c = void 0;
var ActionType;
(function (ActionType) {
    ActionType[ActionType["ACCEPT"] = 0] = "ACCEPT";
    ActionType[ActionType["SHIFT"] = 1] = "SHIFT";
    ActionType[ActionType["REDUCE"] = 2] = "REDUCE";
})(ActionType || (ActionType = {}));
function c(str) {
    console.log(str);
}
exports.c = c;
