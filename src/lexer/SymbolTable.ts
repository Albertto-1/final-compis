import { Tag } from "./Tag";
import { Entry } from "./Entry";
import { hash } from "../utils/utils";

export class SymbolTable {
  private entries: hash = {};

  constructor() {
    this.addEntry('program', Tag.PROGRAM);
    this.addEntry('begin', Tag.BEGIN);
    this.addEntry('end', Tag.END);
    this.addEntry('writeln', Tag.WRITELN);
    this.addEntry('readln', Tag.READLN);
    this.addEntry('var', Tag.VAR);
    this.addEntry('const', Tag.CONST);
    this.addEntry('true', Tag.TRUE);
    this.addEntry('false', Tag.FALSE);
    this.addEntry('if', Tag.IF);
    this.addEntry('else', Tag.ELSE);
    this.addEntry('else if', Tag.ELSEIF);
    this.addEntry('then', Tag.THEN);
    this.addEntry('repeat', Tag.REPEAT);
    this.addEntry('until', Tag.UNTIL);
    this.addEntry('procedure', Tag.PROCEDURE);
    this.addEntry('function', Tag.FUNCTION);
    this.addEntry(':=', Tag.ASIGN);
    this.addEntry('=', Tag.EQ);
    this.addEntry('<=', Tag.LE);
    this.addEntry('>=', Tag.GE);
    this.addEntry('<', Tag.LT);
    this.addEntry('>', Tag.GT);
    this.addEntry('or', Tag.OR);
    this.addEntry('and', Tag.AND);
    this.addEntry('(', Tag.LP);
    this.addEntry(')', Tag.RP);
    this.addEntry('boolean', Tag.TYPE);
    this.addEntry('integer', Tag.TYPE);
    this.addEntry('real', Tag.TYPE);
    this.addEntry('string', Tag.TYPE);
    this.addEntry(':', Tag.OFTYPE);
    this.addEntry(';', Tag.SEMICOLON);
    this.addEntry(',', Tag.COMA);
    this.addEntry('.', Tag.POINT);
    this.addEntry('+', Tag.PLUS);
    this.addEntry('-', Tag.MINUS);
    this.addEntry('*', Tag.PRODUCT);
    this.addEntry('/', Tag.DIVISION);
  }

  isInTable(identifier: string) {
    return (
      identifier in this.entries ||
      identifier.toLowerCase() in this.entries
    );
  }

  private addEntry(identifier: string, tag: number, value?: any) {
    this.entries[identifier] = new Entry(tag, value || identifier);
    return this.entries[identifier];
  }

  getOrAddEntry(identifier: string, tag?: number, value?: any) {
    if (this.isInTable(identifier)) {
      return (
        this.entries[identifier] ||
        this.entries[identifier.toLowerCase()]
      );
    } else {
      return this.addEntry(identifier,tag,value);
    }
  }
}
