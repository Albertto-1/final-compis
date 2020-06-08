import { LRParser } from "./parser/LRParser";

let fileName = 'Examples/Example';
if (process.argv[2] !== undefined) {
  fileName += process.argv[2] + '.pas';
} else {
  fileName += '.pas';
}
const lr = new LRParser(fileName);
