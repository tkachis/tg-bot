const { COMMANDS } = require("./constants");

function getGeneralKeyboardOptions(message_id) {
  return {
    reply_to_message_id: message_id,
    reply_markup: {
      keyboard: [
        [{ text: COMMANDS.HOW.DESC }],
        [{ text: COMMANDS.WHY.DESC }],
        [{ text: COMMANDS.CALC.DESC }],
        [{ text: COMMANDS.PROCESS.DESC }],
      ],
      resize_keyboard: true,
    },
  };
}

function getMyCommands() {
  const myCommands = [];

  Object.values(COMMANDS).map((el) => {
    if (el.COMMAND === null) {
      return;
    }

    myCommands.push({ command: el.COMMAND, description: el.DESC });
  });

  return myCommands;
}

function getMilitaryTax(salary) {
  if (salary <= 100000) {
    return 1500;
  }

  if (salary <= 200000) {
    return 3000;
  }

  if (salary <= 500000) {
    return 5500;
  }

  if (salary <= 1000000) {
    return 8500;
  }

  return 15000;
}

function getIncomeTax(salary) {
  const incomeTaxPrc = 10;
  return (salary / 100) * incomeTaxPrc;
}

function getPensionTax(salary) {
  const maxSalary = 500000;
  const maxPensionTax = 1020000;
  const salaryLessThenMax = salary <= maxSalary;
  const pensionTaxPrc = salaryLessThenMax ? 4.5 : 10;
  const governmentAssistance = salaryLessThenMax ? 0 : 27500;
  const pensionTax = (salary / 100) * pensionTaxPrc - governmentAssistance;

  if (pensionTax <= maxPensionTax) {
    return pensionTax;
  }

  return maxPensionTax;
}

function getServiceFee(salary) {
  if (salary <= 1000000) {
    return 50000;
  }

  if (salary <= 2000000) {
    return 65000;
  }

  if (salary <= 3000000) {
    return 80000;
  }

  return 95000;
}

module.exports = {
  getMyCommands,
  getGeneralKeyboardOptions,
  getMilitaryTax,
  getIncomeTax,
  getPensionTax,
  getServiceFee,
};
