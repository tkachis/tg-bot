const bot = require("./bot");
const { COMMANDS, DEFAULT_OPTIONS } = require("./constants");
const {
  getGeneralKeyboardOptions,
  getMilitaryTax,
  getIncomeTax,
  getPensionTax,
  getServiceFee,
  getMsgWithEscape,
} = require("./helpers");

function handler(msg, answerKey) {
  const chatId = msg.chat.id;

  const answer = COMMANDS[answerKey].ANSWER(msg);
  const answerWithEscape = getMsgWithEscape(answer);

  bot.sendMessage(chatId, answerWithEscape, DEFAULT_OPTIONS);
}

function handlerWithKeyboard(msg, answerKey) {
  const chatId = msg.chat.id;

  const opts = {
    ...DEFAULT_OPTIONS,
    ...getGeneralKeyboardOptions(msg.message_id),
  };
  const answer = COMMANDS[answerKey].ANSWER(msg);
  const answerWithEscape = getMsgWithEscape(answer);

  bot.sendMessage(chatId, answerWithEscape, opts);
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
  // const salaryWithoutTaxesAndService = salaryWithoutTaxes - serviceFee;

  const incomeTaxText = `Подоходный налог: ${incomeTax} драм.`;
  const pensionTaxText = `Пенсионный взнос: ${pensionTax} драм.`;
  const militaryTaxText = `Взнос в фонд армии: ${militaryTax} драм.`;
  const serviceFeeText = `Стоимость наших услуг: ${serviceFee} драм.`;
  var yourSalaryText = `Ваш доход, после выплаты всех налогов: ${salaryWithoutTaxes} драм.`;

  if (salaryWithoutTaxes <= 0) {
    yourSalaryText = "Советую поискать в округе хороший мусорный ящик 🥹";
  }

  bot.sendMessage(
    chatId,
    `${incomeTaxText}\n${pensionTaxText}\n${militaryTaxText}\n${serviceFeeText}\n\n${yourSalaryText}`
  );

  return true;
}

module.exports = {
  handler,
  handlerWithKeyboard,
  salaryHandler,
};
