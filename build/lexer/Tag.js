"use strict";
exports.__esModule = true;
exports.Tag = void 0;
var Tag = (function () {
    function Tag() {
    }
    Tag.TYPE = 0;
    Tag.ASIGN = 1;
    Tag.LT = 2;
    Tag.IF = 3;
    Tag.THEN = 4;
    Tag.END = 5;
    Tag.PRODUCT = 6;
    Tag.POINT = 7;
    Tag.PLUS = 8;
    Tag.MINUS = 9;
    Tag.DIVISION = 10;
    Tag.LP = 11;
    Tag.RP = 12;
    Tag.EOF = 13;
    Tag.ERROR = 14;
    Tag.ID = 15;
    Tag.NUM = 16;
    Tag.TRUE = 17;
    Tag.FALSE = 18;
    Tag.PRINT = 19;
    return Tag;
}());
exports.Tag = Tag;
