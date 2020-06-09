"use strict";
exports.__esModule = true;
var Lexer_1 = require("./lexer/Lexer");
var Tag_1 = require("./lexer/Tag");
var defaultFile = 'Examples/Example1.pas';
var goodFileName = 'Examples/good.txt';
var wrongFileName = 'Examples/wrong';
var fileName = goodFileName;
console.log(process.argv[2]);
if (process.argv[2] !== undefined) {
    wrongFileName += process.argv[2] + '.txt';
    fileName = wrongFileName;
}
var lexer = new Lexer_1.Lexer();
lexer.openFile(fileName);
var token = lexer.scan();
do {
    console.log(token.toString());
    token = lexer.scan();
} while (token.tag !== Tag_1.Tag.EOF);
console.log(token.toString());
