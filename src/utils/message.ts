import { Message as DiscordMessage } from "discord.js";

export class Message extends DiscordMessage {}

export const sendMessage = (receivedCommand: Message, reply: string) => {
  receivedCommand.delete().catch(() => {
    // do nothing
  });
  console.log(reply);
  receivedCommand.channel.send(reply);
};

export const replyMessage = (receivedCommand: Message, reply: string) => {
  console.log(reply);
  receivedCommand.reply(reply);
};
