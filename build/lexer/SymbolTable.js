"use strict";
exports.__esModule = true;
exports.SymbolTable = void 0;
var Tag_1 = require("./Tag");
var Entry_1 = require("./Entry");
var SymbolTable = (function () {
    function SymbolTable() {
        this.entries = {};
        this.addEntry('program', Tag_1.Tag.PROGRAM);
        this.addEntry('begin', Tag_1.Tag.BEGIN);
        this.addEntry('end', Tag_1.Tag.END);
        this.addEntry('writeln', Tag_1.Tag.WRITELN);
        this.addEntry('readln', Tag_1.Tag.READLN);
        this.addEntry('var', Tag_1.Tag.VAR);
        this.addEntry('const', Tag_1.Tag.CONST);
        this.addEntry('true', Tag_1.Tag.TRUE);
        this.addEntry('false', Tag_1.Tag.FALSE);
        this.addEntry('if', Tag_1.Tag.IF);
        this.addEntry('else', Tag_1.Tag.ELSE);
        this.addEntry('else if', Tag_1.Tag.ELSEIF);
        this.addEntry('then', Tag_1.Tag.THEN);
        this.addEntry('repeat', Tag_1.Tag.REPEAT);
        this.addEntry('until', Tag_1.Tag.UNTIL);
        this.addEntry('procedure', Tag_1.Tag.PROCEDURE);
        this.addEntry('function', Tag_1.Tag.FUNCTION);
        this.addEntry(':=', Tag_1.Tag.ASIGN);
        this.addEntry('=', Tag_1.Tag.EQ);
        this.addEntry('<=', Tag_1.Tag.LE);
        this.addEntry('>=', Tag_1.Tag.GE);
        this.addEntry('<', Tag_1.Tag.LT);
        this.addEntry('>', Tag_1.Tag.GT);
        this.addEntry('or', Tag_1.Tag.OR);
        this.addEntry('and', Tag_1.Tag.AND);
        this.addEntry('(', Tag_1.Tag.LP);
        this.addEntry(')', Tag_1.Tag.RP);
        this.addEntry('boolean', Tag_1.Tag.TYPE);
        this.addEntry('integer', Tag_1.Tag.TYPE);
        this.addEntry('real', Tag_1.Tag.TYPE);
        this.addEntry('string', Tag_1.Tag.TYPE);
        this.addEntry(':', Tag_1.Tag.OFTYPE);
        this.addEntry(';', Tag_1.Tag.SEMICOLON);
        this.addEntry(',', Tag_1.Tag.COMA);
        this.addEntry('.', Tag_1.Tag.POINT);
        this.addEntry('+', Tag_1.Tag.PLUS);
        this.addEntry('-', Tag_1.Tag.MINUS);
        this.addEntry('*', Tag_1.Tag.PRODUCT);
        this.addEntry('/', Tag_1.Tag.DIVISION);
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
