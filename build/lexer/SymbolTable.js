"use strict";
exports.__esModule = true;
exports.SymbolTable = void 0;
var Tag_1 = require("./Tag");
var Entry_1 = require("./Entry");
var SymbolTable = (function () {
    function SymbolTable() {
        this.entries = {};
        this.addEntry('int', Tag_1.Tag.TYPE);
        this.addEntry('bool', Tag_1.Tag.TYPE);
        this.addEntry('#t', Tag_1.Tag.TRUE);
        this.addEntry('#f', Tag_1.Tag.FALSE);
        this.addEntry('=', Tag_1.Tag.ASIGN);
        this.addEntry('<', Tag_1.Tag.LT);
        this.addEntry('if', Tag_1.Tag.IF);
        this.addEntry('end', Tag_1.Tag.END);
        this.addEntry('then', Tag_1.Tag.THEN);
        this.addEntry('print', Tag_1.Tag.PRINT);
        this.addEntry('*', Tag_1.Tag.PRODUCT);
        this.addEntry('.', Tag_1.Tag.POINT);
        this.addEntry('+', Tag_1.Tag.PLUS);
        this.addEntry('-', Tag_1.Tag.MINUS);
        this.addEntry('*', Tag_1.Tag.PRODUCT);
        this.addEntry('/', Tag_1.Tag.DIVISION);
        this.addEntry('(', Tag_1.Tag.LP);
        this.addEntry(')', Tag_1.Tag.RP);
    }
    SymbolTable.prototype.isInTable = function (identifier) {
        return (identifier in this.entries ||
            identifier.toLowerCase() in this.entries);
    };
    SymbolTable.prototype.addEntry = function (identifier, tag, value) {
        this.entries[identifier] = new Entry_1.Entry(tag, value || identifier);
        return this.entries[identifier];
    };
    SymbolTable.prototype.getOrAddEntry = function (identifier, tag, value) {
        if (this.isInTable(identifier)) {
            return (this.entries[identifier] ||
                this.entries[identifier.toLowerCase()]);
        }
        else {
            return this.addEntry(identifier, tag, value);
        }
    };
    return SymbolTable;
}());
exports.SymbolTable = SymbolTable;
