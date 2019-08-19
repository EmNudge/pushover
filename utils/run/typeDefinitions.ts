export enum Type {
  String,
  Function,
  Number,
}

export interface Arg {
  type: Type,
  value: string,
}
