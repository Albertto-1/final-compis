export class Entry {
  tag: number;
  value: any;

  constructor(tag: number, value?: any) {
    this.tag = tag;
    this.value = value || '';
  }
}