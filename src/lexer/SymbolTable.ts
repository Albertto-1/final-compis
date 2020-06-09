import { Tag } from "./Tag";
import { Entry } from "./Entry";
import { hash } from "../utils/utils";

export class SymbolTable {
  private entries: hash = {};

  constructor() {
    this.addEntry('int', Tag.TYPE);
    this.addEntry('bool', Tag.TYPE);
    this.addEntry('#t', Tag.TRUE, 'boolean');
    this.addEntry('#f', Tag.FALSE, 'boolean');
    this.addEntry('=', Tag.ASIGN, 'assign');
    this.addEntry('<', Tag.LT, 'operator');
    this.addEntry('&', Tag.AND, 'operator');
    this.addEntry('if', Tag.IF);
    this.addEntry('end', Tag.END);
    this.addEntry('then', Tag.THEN);
    this.addEntry('print', Tag.PRINT);
    this.addEntry('*', Tag.PRODUCT, 'operator');
    this.addEntry('+', Tag.PLUS, 'operator');
    this.addEntry('-', Tag.MINUS, 'minus');
    this.addEntry('*', Tag.PRODUCT, 'operator');
    this.addEntry('/', Tag.DIVISION, 'operator');
    this.addEntry('(', Tag.LP, 'lp');
    this.addEntry(')', Tag.RP, 'rp');
    this.addEntry('$', Tag.EOF, '$');
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
