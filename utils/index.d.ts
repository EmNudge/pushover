export enum Type {
  String,
  Function,
  Number,
}

export interface Arg {
  type: Type,
  value: string,
}


export interface Command {
  name: string;
  description: string;
  syntax: string;
  execute: Function;
}

