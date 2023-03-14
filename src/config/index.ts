import { config } from "dotenv";
import { cleanEnv, email, str } from "envalid";

config();

const env = cleanEnv(process.env, {
  COMMAND_PREFIX: str({ default: "!" }),
  DISCORD_BOT_TOKEN: str(),
  OPENAI_API_EMAIL: email(),
  OPENAI_API_PASSWORD: str(),
});

export const {
  COMMAND_PREFIX,
  DISCORD_BOT_TOKEN,
  OPENAI_API_EMAIL,
  OPENAI_API_PASSWORD,
} = env;
