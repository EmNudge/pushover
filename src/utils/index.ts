export enum Type {
  String = "string",
  Number = "number",
  Boolean = "boolean",
  Function = "function",
  ID = "id",
  Link = "link",
  Channel = "channel",
  Role = "role",
  User = "user"
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
