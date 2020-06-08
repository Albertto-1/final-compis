"use strict";
exports.__esModule = true;
var LRParser_1 = require("./parser/LRParser");
var fileName = 'Examples/Example';
if (process.argv[2] !== undefined) {
    fileName += process.argv[2] + '.pas';
}
else {
    fileName += '.pas';
}
var lr = new LRParser_1.LRParser(fileName);
