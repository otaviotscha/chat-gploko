/**
 * Loads .env file
 */
import "./config";

import * as Discord from "discord.js";
import Authenticator from "openai-token";

import {
  COMMAND_PREFIX,
  DISCORD_BOT_TOKEN,
  OPENAI_API_EMAIL,
  OPENAI_API_PASSWORD,
} from "./config";

import { Commands, isCommand, getFirstArg } from "./commands";
import chat from "./commands/chat";

import { replyMessage } from "./utils/message";

export const client = new Discord.Client();

const auth = new Authenticator(OPENAI_API_EMAIL, OPENAI_API_PASSWORD);
const openAIAccessTokenPromise = auth.begin().then(() => auth.getAccessToken());

client.on("ready", () => {
  console.log(`Logged in as ${client.user?.tag}!`);
});

client.on("message", async (message: Discord.Message) => {
  const openAIAccessToken = await openAIAccessTokenPromise.catch((error) => {
    const errorText =
      "encontrei um erro ao tentar fazer o login no ChatGPT. Tente novamente mais tarde!";
    console.error(error);
    replyMessage(message, errorText);
  });
  if (!openAIAccessToken) return;

  if (!message.content.startsWith(COMMAND_PREFIX) || message.author.bot) return;
  const lowrcaseMessage = message.content.toLocaleLowerCase();

  if (isCommand(lowrcaseMessage, Commands.CHAT)) {
    const text = getFirstArg(lowrcaseMessage, Commands.CHAT);
    return chat(openAIAccessToken, message, text);
  }

  replyMessage(
    message,
    `comando desconhecido! Use o comando ${COMMAND_PREFIX}${Commands.CHAT}`
  );
});

client.login(DISCORD_BOT_TOKEN);
