import { Tag } from "./Tag";
import { Entry } from "./Entry";
import { hash } from "../utils/utils";

export class SymbolTable {
  private entries: hash = {};

  constructor() {
    this.addEntry('int', Tag.TYPE);
    this.addEntry('bool', Tag.TYPE);
    this.addEntry('#t', Tag.TRUE);
    this.addEntry('#f', Tag.FALSE);
    this.addEntry('=', Tag.ASIGN);
    this.addEntry('<', Tag.LT);
    this.addEntry('if', Tag.IF);
    this.addEntry('end', Tag.END);
    this.addEntry('then', Tag.THEN);
    this.addEntry('print', Tag.PRINT);
    this.addEntry('*', Tag.PRODUCT);
    this.addEntry('.', Tag.POINT);
    this.addEntry('+', Tag.PLUS);
    this.addEntry('-', Tag.MINUS);
    this.addEntry('*', Tag.PRODUCT);
    this.addEntry('/', Tag.DIVISION);
    this.addEntry('(', Tag.LP);
    this.addEntry(')', Tag.RP);
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
