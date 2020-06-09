// import { LRParser } from "./parser/LRParser";

import { Lexer } from "./lexer/Lexer";
import { Tag } from "./lexer/Tag";

// let fileName = 'Examples/Example';
// if (process.argv[2] !== undefined) {
//   fileName += process.argv[2] + '.pas';
// } else {
//   fileName += '.pas';
// }
// const lr = new LRParser(fileName);
const defaultFile = 'Examples/Example1.pas';

let goodFileName = 'Examples/good.txt';
let wrongFileName = 'Examples/wrong';
let fileName = goodFileName;
console.log(process.argv[2]);
if (process.argv[2] !== undefined) {
  wrongFileName += process.argv[2] + '.txt';
  fileName = wrongFileName
}
const lexer = new Lexer();
lexer.openFile(fileName);
let token = lexer.scan();
do{
  console.log(token.toString());
  token = lexer.scan();
} while(token.tag !== Tag.EOF);
console.log(token.toString());