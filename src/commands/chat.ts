import { ChatGPTUnofficialProxyAPI } from "chatgpt";

import { Message, replyMessage, sendMessage } from "../utils/message";

const chat = async (
  openAIAccessToken: string,
  message: Message,
  text: string
) => {
  const api = new ChatGPTUnofficialProxyAPI({
    accessToken: openAIAccessToken,
    apiReverseProxyUrl: "https://gpt.pawan.krd/backend-api/conversation",
  });

  const response = await api.sendMessage(text).catch((error) => {
    const errorText =
      "encontrei um erro ao tentar me comunicar com o ChatGPT. Tente novamente mais tarde!";
    console.error(error);
    replyMessage(message, errorText);
  });
  if (!response) return;

  sendMessage(message, response.text);
};

export default chat;
