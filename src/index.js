require("dotenv").config();
const express = require("express");
const bot = require("./bot");
const { COMMANDS } = require("./constants");
const {
  startHandler,
  helpHandler,
  howItWorksHandler,
  whyHandler,
  calcHandler,
  notFoundHandler,
  processHandler,
  salaryHandler,
} = require("./handlers");
const { STATES, State } = require("./state");

const app = express();
const appState = new State();

bot.on("message", (msg) => {
  const text = msg.text;

  if (RegExp(COMMANDS.START.COMMAND).test(text)) {
    appState.reset();
    return startHandler(msg);
  }

  if (RegExp(COMMANDS.HELP.COMMAND).test(text)) {
    appState.reset();
    return helpHandler(msg);
  }

  if (RegExp(`(${COMMANDS.HOW.COMMAND}|${COMMANDS.HOW.DESC})`).test(text)) {
    appState.reset();
    return howItWorksHandler(msg);
  }

  if (RegExp(`(${COMMANDS.WHY.COMMAND}|${COMMANDS.WHY.DESC})`).test(text)) {
    appState.reset();
    return whyHandler(msg);
  }

  if (
    RegExp(`(${COMMANDS.PROCESS.COMMAND}|${COMMANDS.PROCESS.DESC})`).test(text)
  ) {
    appState.reset();
    return processHandler(msg);
  }

  if (RegExp(`(${COMMANDS.CALC.COMMAND}|${COMMANDS.CALC.DESC})`).test(text)) {
    appState.state = STATES.ENTER_SALARY;
    return calcHandler(msg);
  }

  if (appState.state === STATES.ENTER_SALARY) {
    const success = salaryHandler(msg);

    if (success) {
      appState.reset();
    }

    return;
  }

  notFoundHandler(msg);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, function () {
  console.log(`Server is running at port ${PORT}`);
});
