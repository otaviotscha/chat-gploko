import { COMMAND_PREFIX } from "../config";

export enum Commands {
  CHAT = "chat",
}

export const isCommand = (toCompare: string, command: Commands): boolean =>
  toCompare.startsWith(COMMAND_PREFIX + command);

export const getFirstArg = (text: string, command: Commands): string => {
  const args = text.trim().split(Commands.CHAT);
  return args[1].replace(/ /g, "");
};
