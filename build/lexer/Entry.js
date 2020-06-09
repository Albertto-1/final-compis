"use strict";
exports.__esModule = true;
exports.Entry = void 0;
var Tag_1 = require("./Tag");
var Entry = (function () {
    function Entry(tag, value) {
        this.tag = tag;
        this.value = value || '';
    }
    Entry.prototype.toString = function () {
        var str = '';
        var extra = '';
        switch (this.tag) {
            case Tag_1.Tag.ERROR:
                str = 'Error';
                break;
            case Tag_1.Tag.NUM:
                str = 'Number';
                break;
            case Tag_1.Tag.PRINT:
                str = 'Print';
                extra = '\t';
                break;
            case Tag_1.Tag.ID:
                str = 'ID';
                extra = '\t';
                break;
            case Tag_1.Tag.IF:
                str = 'IF';
                extra = '\t';
                break;
            case Tag_1.Tag.EOF:
                str = 'End Of File';
                break;
            case Tag_1.Tag.ASIGN:
                str = 'Asigned to';
                break;
            case Tag_1.Tag.LT:
                str = 'is lower than';
                break;
            case Tag_1.Tag.LP:
                str = 'Left (';
                break;
            case Tag_1.Tag.RP:
                str = 'Right (';
                break;
            case Tag_1.Tag.POINT:
                str = 'Point';
                extra = '\t';
                break;
            case Tag_1.Tag.PLUS:
                str = 'Plus';
                extra = '\t';
                break;
            case Tag_1.Tag.MINUS:
                str = 'Minus';
                extra = '\t';
                break;
            case Tag_1.Tag.PRODUCT:
                str = 'Product';
                break;
            case Tag_1.Tag.DIVISION:
                str = 'Division';
                break;
            case Tag_1.Tag.THEN:
                str = 'Then';
                extra = '\t';
                break;
            case Tag_1.Tag.TYPE:
                str = 'Type';
                extra = '\t';
                break;
            case Tag_1.Tag.END:
            case Tag_1.Tag.TRUE:
            case Tag_1.Tag.FALSE:
                extra = '\t';
            default:
                str = this.value;
                break;
        }
        return str + ': \t' + extra + this.value;
    };
    return Entry;
}());
exports.Entry = Entry;
