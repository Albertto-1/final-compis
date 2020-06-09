import { Tag } from "./Tag";

export class Entry {
    tag: number;
    value: any;
  
    constructor(tag: number, value?: any){
      this.tag = tag;
      this.value = value || '';
    }
  
    toString() {
      let str = '';
      let extra = '';
      switch(this.tag) {
        case Tag.ERROR:
          str = 'Error';
          break;
        case Tag.NUM:
          str = 'Number';
          break;
        case Tag.PRINT:
          str = 'Print';
          extra = '\t';
          break;
        case Tag.ID:
          str = 'ID';
          extra = '\t';
          break;
        case Tag.IF:
          str = 'IF';
          extra = '\t';
          break;
        case Tag.EOF:
          str = 'End Of File';
          break;
        case Tag.ASIGN:
          str = 'Asigned to';
          break;
        case Tag.LT:
          str = 'is lower than';
          break;
        case Tag.LP:
          str = 'Left (';
          break;
        case Tag.RP:
          str = 'Right (';
          break;
        case Tag.POINT:
          str = 'Point';
          extra = '\t';
          break;
        case Tag.PLUS:
          str = 'Plus';
          extra = '\t';
          break;
        case Tag.MINUS:
          str = 'Minus';
          extra = '\t';
          break;
        case Tag.PRODUCT:
          str = 'Product';
          break;
        case Tag.DIVISION:
          str = 'Division';
          break;
        case Tag.THEN:
          str = 'Then';
          extra = '\t';
          break;
        case Tag.TYPE:
          str = 'Type';
          extra = '\t';
          break;
        case Tag.END:
        case Tag.TRUE:
        case Tag.FALSE:
          extra = '\t';
        default:
          str = this.value;
          break;
      }
      return str+': \t'+extra+this.value;
    }
  }