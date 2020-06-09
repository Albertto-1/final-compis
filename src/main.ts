import { LLParser } from "./parser/LLParser";
// import { Lexer } from "./lexer/Lexer";
// import { Tag } from "./lexer/Tag";

let goodFileName = 'Examples/good1.txt';
let otherFileName = 'Examples/';
let fileName = goodFileName;
if (process.argv[2] !== undefined) {
  otherFileName += process.argv[2] + '.txt';
  fileName = otherFileName
}
const lr = new LLParser(fileName);
lr.start();
// const lexer = new Lexer();
// lexer.openFile(fileName);
// let token = lexer.scan();
// do{
//   console.log(token.toString());
//   token = lexer.scan();
// } while(token.tag !== Tag.EOF);
// console.log(token.toString());
