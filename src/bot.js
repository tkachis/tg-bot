const TelegramApi = require("node-telegram-bot-api");
const { getMyCommands } = require("./helpers");

const isProd = process.env.NODE_ENV === "prod";

const TOKEN = isProd ? process.env.TG_TOKEN : process.env.DEV_TG_TOKEN;
const OPTIONS = { polling: true };

const bot = new TelegramApi(TOKEN, OPTIONS);

bot.setMyCommands(getMyCommands());

module.exports = bot;
