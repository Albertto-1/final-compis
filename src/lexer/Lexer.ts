import { SymbolTable } from "./SymbolTable";
import { Tag } from './Tag';
import fs = require("fs");

export class Lexer {
  private buffer: string;
  private index: number = -1;
  private char: string = ' ';
  line: number = 1;
  symbolTable: SymbolTable;

  constructor() {
    this.symbolTable = new SymbolTable();
  }

  openFile(file: string){
    this.buffer = fs.readFileSync(file, 'utf8');
  }
  
  private next() {
    this.index++;
    this.char = this.buffer[this.index];
  }

  scan() {
    if (this.char === undefined) {
      return this.symbolTable.getOrAddEntry('eof', Tag.EOF);
    }
    while(
      this.char === ' ' || 
      this.char === '\t' || 
      this.char === '\n' ||
      +this.char === 0
    ){
      if (
        this.char === '\n') {
        this.line++;
      }
      this.next();
    }
    if (this.isNumber(this.char)) {
      return this.analyzeNumber();
    } else if (this.isLetter(this.char)) {
      return this.analyzeString();
    }
    switch (this.char) {
      case '<':
        this.next();
        return this.symbolTable.getOrAddEntry('<');
      case '#':
        return this.analyzeBool();
      case '=':
      case '(':
      case ')':
      case '+':
      case '-':
      case '*':
      case '/':
        return this.analyzeSimbols();
    }
    this.next();
    if (this.char === undefined) {
      return this.symbolTable.getOrAddEntry('eof', Tag.EOF);
    }
    return this.symbolTable.getOrAddEntry('error', Tag.ERROR, 'Error: '+this.line);
  }

  private analyzeSimbols() {
    const entry = this.symbolTable.getOrAddEntry(this.char);
    this.next();
    return entry;
  }

  private analyzeBool() {
    this.next();
    if (this.char === 't') {
      this.next();
      return this.symbolTable.getOrAddEntry('#t');
    }
    if (this.char === 'f') {
      this.next();
      return this.symbolTable.getOrAddEntry('#f');
    }
    return this.symbolTable.getOrAddEntry('error', Tag.ERROR, 'Error: '+this.line);
  }

  private analyzeString() {
    let str = '';
    do {
      str = str + this.char;
      this.next();
    } while(this.isAlphanumericOr_(this.char));
    if (this.symbolTable.isInTable(str)) {
      return this.symbolTable.getOrAddEntry(str);
    }
    return this.symbolTable.getOrAddEntry(str, Tag.ID);
  }

  private analyzeNumber() {
    let num = '';
    let hadPoint = false;
    do {
      num = num + this.char;
      if (this.char === '.') hadPoint = true;
      this.next();
    } while(!isNaN(+this.char) || (this.char === '.' && !hadPoint));
    return this.symbolTable.getOrAddEntry(num, Tag.NUM, +num);
  }

  private isLetter(str: string) {
    if (str === undefined) return false;
    const letter = /^[a-zA-Z]+$/;
    if (str.match(letter)){
      return true;
    } else {
      return false; 
    }
  }

  private isAlphanumericOr_(str: string) {
    if (str === undefined) return false;
    const letterNumber = /^[0-9a-zA-Z_]+$/;
    if (str.match(letterNumber)){
      return true;
    } else {
      return false; 
    }
  }

  private isNumber(str: string) {
    if (str === undefined) return false;
    const letter = /^[0-9]+$/;
    if (str.match(letter)){
      return true;
    } else {
      return false; 
    }
  }
}
