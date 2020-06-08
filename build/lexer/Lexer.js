"use strict";
exports.__esModule = true;
exports.Lexer = void 0;
var SymbolTable_1 = require("./SymbolTable");
var Tag_1 = require("./Tag");
var fs = require("fs");
var Lexer = (function () {
    function Lexer() {
        this.index = -1;
        this.char = ' ';
        this.line = 1;
        this.symbolTable = new SymbolTable_1.SymbolTable();
    }
    Lexer.prototype.openFile = function (file) {
        this.buffer = fs.readFileSync(file, 'utf8');
    };
    Lexer.prototype.next = function () {
        this.index++;
        this.char = this.buffer[this.index];
    };
    Lexer.prototype.scan = function () {
        if (this.char === undefined) {
            return this.symbolTable.getOrAddEntry('eof', Tag_1.Tag.EOF);
        }
        while (this.char === ' ' ||
            this.char === '\t' ||
            this.char === '\n') {
            if (this.char === '\n') {
                this.line++;
            }
            this.next();
        }
        if (!isNaN(+this.char)) {
            return this.analyzeNumber();
        }
        else if (this.isLetter(this.char)) {
            return this.analyzeString();
        }
        switch (this.char) {
            case '<':
                return this.analyzeLower();
            case '>':
                return this.analyzeGreater();
            case ':':
                return this.analyzePoits();
            case '=':
            case ';':
            case ',':
            case '.':
            case '(':
            case ')':
            case '+':
            case '-':
            case '*':
            case '/':
                return this.analyzeSimbols();
            case "'":
                return this.analyzePhrase();
        }
        this.next();
        if (this.char === undefined) {
            return this.symbolTable.getOrAddEntry('eof', Tag_1.Tag.EOF);
        }
        return this.symbolTable.getOrAddEntry('error', Tag_1.Tag.ERROR, 'Error: ' + this.line);
    };
    Lexer.prototype.analyzeSimbols = function () {
        var entry = this.symbolTable.getOrAddEntry(this.char);
        this.next();
        return entry;
    };
    Lexer.prototype.analyzeLower = function () {
        this.next();
        if (this.char === '=') {
            this.next();
            return this.symbolTable.getOrAddEntry('<=');
        }
        return this.symbolTable.getOrAddEntry('<');
    };
    Lexer.prototype.analyzeGreater = function () {
        this.next();
        if (this.char === '=') {
            this.next();
            return this.symbolTable.getOrAddEntry('>=');
        }
        return this.symbolTable.getOrAddEntry('>');
    };
    Lexer.prototype.analyzePoits = function () {
        this.next();
        if (this.char === '=') {
            this.next();
            return this.symbolTable.getOrAddEntry(':=');
        }
        return this.symbolTable.getOrAddEntry(':');
    };
    Lexer.prototype.analyzePhrase = function () {
        var str = '';
        do {
            str = str + this.char;
            this.next();
        } while (this.char !== "'");
        str = str + this.char;
        this.next();
        return this.symbolTable.getOrAddEntry(str, Tag_1.Tag.STR, str);
    };
    Lexer.prototype.analyzeString = function () {
        var str = '';
        do {
            str = str + this.char;
            this.next();
        } while (this.isAlphanumericOr_(this.char));
        if (this.symbolTable.isInTable(str)) {
            if (str.toLowerCase() === 'else') {
                return this.analyzeElse();
            }
            return this.symbolTable.getOrAddEntry(str);
        }
        return this.symbolTable.getOrAddEntry(str, Tag_1.Tag.ID);
    };
    Lexer.prototype.analyzeElse = function () {
        var index = this.index;
        var line = this.line;
        if (this.scan().tag === Tag_1.Tag.IF) {
            return this.symbolTable.getOrAddEntry('else if');
        }
        this.index = index;
        this.line = line;
        return this.symbolTable.getOrAddEntry('else');
    };
    Lexer.prototype.analyzeNumber = function () {
        var num = '';
        var hadPoint = false;
        do {
            num = num + this.char;
            if (this.char === '.')
                hadPoint = true;
            this.next();
        } while (!isNaN(+this.char) || (this.char === '.' && !hadPoint));
        return this.symbolTable.getOrAddEntry(num, Tag_1.Tag.NUM, +num);
    };
    Lexer.prototype.isLetter = function (str) {
        if (str === undefined)
            return false;
        var letter = /^[a-zA-Z]+$/;
        if (str.match(letter)) {
            return true;
        }
        else {
            return false;
        }
    };
    Lexer.prototype.isAlphanumericOr_ = function (str) {
        if (str === undefined)
            return false;
        var letterNumber = /^[0-9a-zA-Z_]+$/;
        if (str.match(letterNumber)) {
            return true;
        }
        else {
            return false;
        }
    };
    return Lexer;
}());
exports.Lexer = Lexer;
