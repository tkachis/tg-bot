require("dotenv").config();
const express = require("express");
const bot = require("./bot");
const { handler, handlerWithKeyboard, salaryHandler } = require("./handlers");
const { COMMANDS_KEYS } = require("./constants");
const { check } = require("./helpers");
const { STATES, State } = require("./state");

const app = express();
const appState = new State();

bot.on("message", (msg) => {
  const text = msg.text;
  const userId = msg.from.id;

  appState.initFor(userId);

  if (check(text, COMMANDS_KEYS.START)) {
    appState.resetFor(userId);
    return handlerWithKeyboard(msg, COMMANDS_KEYS.START);
  }

  if (check(text, COMMANDS_KEYS.HELP)) {
    appState.resetFor(userId);
    return handlerWithKeyboard(msg, COMMANDS_KEYS.HELP);
  }

  if (check(text, COMMANDS_KEYS.HOW)) {
    appState.resetFor(userId);
    return handler(msg, COMMANDS_KEYS.HOW);
  }

  if (check(text, COMMANDS_KEYS.PROCESS)) {
    appState.resetFor(userId);
    return handler(msg, COMMANDS_KEYS.PROCESS);
  }

  if (check(text, COMMANDS_KEYS.CALC)) {
    appState.setFor(userId, STATES.ENTER_SALARY);
    return handler(msg, COMMANDS_KEYS.CALC);
  }

  if (check(text, COMMANDS_KEYS.BENEFITS)) {
    appState.resetFor(userId);
    return handler(msg, COMMANDS_KEYS.BENEFITS);
  }

  if (check(text, COMMANDS_KEYS.SERVICES)) {
    appState.resetFor(userId);
    return handler(msg, COMMANDS_KEYS.SERVICES);
  }

  if (check(text, COMMANDS_KEYS.TAXES)) {
    appState.resetFor(userId);
    return handler(msg, COMMANDS_KEYS.TAXES);
  }

  if (appState.getFor(userId) === STATES.ENTER_SALARY) {
    const success = salaryHandler(msg);

    if (success) {
      appState.resetFor(userId);
    }

    return;
  }

  handlerWithKeyboard(msg, COMMANDS_KEYS.NOT_FOUND);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, function () {
  console.log(`Server is running at port ${PORT}`);
});
