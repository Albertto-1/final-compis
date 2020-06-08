"use strict";
exports.__esModule = true;
exports.LRParser = void 0;
var utils_1 = require("../utils/utils");
var Lexer_1 = require("../lexer/Lexer");
var fs = require("fs");
var Tag_1 = require("../lexer/Tag");
var LRParser = (function () {
    function LRParser(fileName) {
        this.actionTable = {};
        this.gotosTable = {};
        this.grammarTable = {};
        this.stack = [0];
        this.symbols = ['$'];
        this.lexer = new Lexer_1.Lexer();
        this.accepted = false;
        this.error = false;
        this.lexer.openFile(fileName);
        this.loadActions();
        this.loadGotos();
        this.loadGrammar();
        this.start();
    }
    LRParser.prototype.loadActions = function () {
        var _this = this;
        utils_1.c('loadingActions...');
        var lines = fs.readFileSync('src/parser/utils/actions_table.txt', 'utf-8')
            .split('\n')
            .filter(Boolean);
        lines.forEach(function (line) {
            var _a;
            var elements = line.split(',');
            var state = +elements[0];
            var input = elements[1];
            var actionType = +elements[2];
            var nextState = +elements[3];
            if (_this.actionTable[state]) {
                _this.actionTable[state][input] = {
                    type: actionType,
                    state: nextState
                };
            }
            else {
                _this.actionTable[state] = (_a = {},
                    _a[input] = {
                        type: actionType,
                        state: nextState
                    },
                    _a);
            }
        });
    };
    LRParser.prototype.loadGotos = function () {
        var _this = this;
        utils_1.c('loadingGotos...');
        var lines = fs.readFileSync('src/parser/utils/gotos_table.txt', 'utf-8')
            .split('\n')
            .filter(Boolean);
        lines.forEach(function (line) {
            var _a;
            var elements = line.split(',');
            var state = +elements[0];
            var input = elements[1];
            var nextState = +elements[2];
            if (_this.gotosTable[state]) {
                _this.gotosTable[state][input] = {
                    state: nextState
                };
            }
            else {
                _this.gotosTable[state] = (_a = {},
                    _a[input] = {
                        state: nextState
                    },
                    _a);
            }
        });
    };
    LRParser.prototype.loadGrammar = function () {
        var _this = this;
        utils_1.c('loadingGrammar...');
        var lines = fs.readFileSync('src/parser/utils/grammar.txt', 'utf-8')
            .split('\n')
            .filter(Boolean);
        lines.forEach(function (line) {
            var elements = line.split(',');
            var state = +elements[0];
            var input = elements[1];
            var positions = +elements[2];
            _this.grammarTable[state] = {
                head: input,
                positions: positions
            };
        });
    };
    LRParser.prototype.start = function () {
        this.token = this.lexer.scan();
        while (this.eval())
            ;
        if (this.accepted) {
            utils_1.c('SE ACEPTA');
        }
        else if (this.error) {
            utils_1.c('Error en la línea: ' + this.lexer.line);
        }
        else {
            utils_1.c('SE RECHAZA');
        }
    };
    LRParser.prototype.eval = function () {
        utils_1.c('----------------------------------------------');
        utils_1.c('Evaluando token: "' + this.token.value + '"');
        if (this.token.tag === Tag_1.Tag.ERROR) {
            this.error = true;
            return false;
        }
        if (this.token.tag === Tag_1.Tag.EOF) {
            return false;
        }
        if (this.token.tag === Tag_1.Tag.ID) {
            this.token.value = 'identifier';
        }
        if (this.actionTable[this.stack[this.stack.length - 1]][this.token.value]) {
            var action = this.actionTable[this.stack[this.stack.length - 1]][this.token.value];
            if (action.type === 0) {
                this.accepted = true;
            }
            else if (action.type === 1) {
                utils_1.c('SHIFT: ' + action.state);
                this.stack.push(action.state);
                this.symbols.push(this.token.value);
                this.token = this.lexer.scan();
            }
            else if (action.type === 2) {
                utils_1.c('REDUCE: ' + action.state);
                var prod = this.grammarTable[action.state];
                utils_1.c('prod: ' + JSON.stringify(prod));
                for (var i = 0; i < prod.positions; i++) {
                    this.stack.pop();
                    this.symbols.pop();
                    this.printStacks();
                }
                this.symbols.push(prod.head);
                if (this.gotosTable[this.stack[this.stack.length - 1]] && this.gotosTable[this.stack[this.stack.length - 1]][this.symbols[this.symbols.length - 1]]) {
                    this.stack.push(this.gotosTable[this.stack[this.stack.length - 1]][this.symbols[this.symbols.length - 1]]);
                }
                else {
                    this.error = true;
                    return false;
                }
            }
            this.printStacks();
            return true;
        }
        else {
            this.error = true;
            return false;
        }
    };
    LRParser.prototype.printStacks = function () {
        utils_1.c('Stack: ' + this.stack);
        utils_1.c('Symbols: ' + this.symbols);
    };
    return LRParser;
}());
exports.LRParser = LRParser;
