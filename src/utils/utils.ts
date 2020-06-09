export interface hash {
  [key: string]: any;
}

export interface grammarTable {
  [key: number]: next;
}

interface next {
  head: string,
  body: string[]
}

export function c(str: string) {
  console.log(str);
}
