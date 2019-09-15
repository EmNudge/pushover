export enum Type {
  String = "string",
  Function = "function",
  CalledFunction = "calledFunction",
  Number = "number",
  ID = "id",
  Link = "link",
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
  channelType?: ChannelType;
}

export enum ChannelType {
  Any,
  DM,
  Guild,
  Group,
}
