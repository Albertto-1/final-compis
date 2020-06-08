export interface hash {
  [key: string]: any;
}

export interface actionTale {
  [key: number]: toAction;
}

interface toAction {
  [key: string]: Action;
}

export interface gotosTable {
  [key: number]: hash;
}

export interface grammarTable {
  [key: number]: next;
}

interface next {
  head: string,
  positions: number
}

export interface Action {
  type: ActionType,
  state: number
}

enum ActionType {
  ACCEPT = 0,
  SHIFT = 1,
  REDUCE = 2
}

export function c(str: string) {
  console.log(str);
}
