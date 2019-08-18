export enum Type {
  String,
  Function,
  Number,
}

export interface Param {
  type: Type,
  value: string,
}
