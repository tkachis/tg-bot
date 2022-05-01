const bot = require("./bot");
const { COMMANDS } = require("./constants");
const {
  getGeneralKeyboardOptions,
  getMilitaryTax,
  getIncomeTax,
  getPensionTax,
  getServiceFee,
} = require("./helpers");

function startHandler(msg) {
  const chatId = msg.chat.id;

  const opts = getGeneralKeyboardOptions(msg.message_id);

  bot.sendMessage(chatId, COMMANDS.START.ANSWER(msg), opts);
}

function helpHandler(msg) {
  const chatId = msg.chat.id;

  const opts = getGeneralKeyboardOptions(msg.message_id);

  bot.sendMessage(chatId, COMMANDS.HELP.ANSWER(msg), opts);
}

function howItWorksHandler(msg) {
  const chatId = msg.chat.id;

  bot.sendMessage(chatId, COMMANDS.HOW.ANSWER(msg));
}

function whyHandler(msg) {
  const chatId = msg.chat.id;

  bot.sendMessage(chatId, COMMANDS.WHY.ANSWER(msg));
}

function processHandler(msg) {
  const chatId = msg.chat.id;

  bot.sendMessage(chatId, COMMANDS.PROCESS.ANSWER(msg));
}

function calcHandler(msg) {
  const chatId = msg.chat.id;

  bot.sendMessage(chatId, COMMANDS.CALC.ANSWER(msg));
}

function salaryHandler(msg) {
  const chatId = msg.chat.id;
  const salary = parseFloat(msg.text.replace(",", "."));

  if (isNaN(salary)) {
    bot.sendMessage(chatId, "Это точно ваш доход? Попробуйте еще раз.");
    return false;
  }

  const militaryTax = getMilitaryTax(salary);
  const incomeTax = getIncomeTax(salary);
  const pensionTax = getPensionTax(salary);
  const serviceFee = getServiceFee(salary);
  const allTaxes = militaryTax + incomeTax + pensionTax;
  const salaryWithoutTaxes = salary - allTaxes;
  const salaryWithoutTaxesAndService = salaryWithoutTaxes - serviceFee;

  const incomeTaxText = `Подоходный налог: ${incomeTax} драм.`;
  const pensionTaxText = `Пенсионный взнос: ${pensionTax} драм.`;
  const militaryTaxText = `Взнос в фонд армии: ${militaryTax} драм.`;
  const serviceFeeText = `Стоимость наших услуг: ${serviceFee} драм.`;
  var yourSalaryText = `Ваш доход, после выплаты всех налогов и оплаты наших услуг: ${salaryWithoutTaxesAndService} драм.`;

  if (salaryWithoutTaxesAndService <= 0) {
    yourSalaryText = "Советую поискать в округе хороший мусорный ящик.";
  }

  bot.sendMessage(
    chatId,
    `${incomeTaxText}\n${pensionTaxText}\n${militaryTaxText}\n${serviceFeeText}\n\n${yourSalaryText}`
  );
  return true;
}

function notFoundHandler(msg) {
  const chatId = msg.chat.id;

  const opts = getGeneralKeyboardOptions(msg);

  bot.sendMessage(chatId, COMMANDS.NOT_FOUND.ANSWER(), opts);
}

module.exports = {
  startHandler,
  helpHandler,
  howItWorksHandler,
  whyHandler,
  calcHandler,
  salaryHandler,
  processHandler,
  notFoundHandler,
};
