const { COMMANDS } = require("./constants");

function getMsgWithEscape(msg) {
  return msg.replace(/[-.=+?!^$[\](){}\\]/g, "\\$&");
}

function check(text, key) {
  return RegExp(`(${COMMANDS[key].COMMAND}|${COMMANDS[key].DESC})`).test(text);
}

function getGeneralKeyboardOptions(message_id) {
  return {
    reply_to_message_id: message_id,
    reply_markup: {
      keyboard: getKeyboardCommands(),
      resize_keyboard: true,
    },
  };
}

function getKeyboardCommands() {
  const keyboardCommands = [];

  Object.values(COMMANDS).map((el) => {
    if (!el.KEYBOARD) {
      return;
    }

    keyboardCommands.push([{ text: el.DESC }]);
  });

  return keyboardCommands;
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
  const incomeTax = (salary / 100) * incomeTaxPrc;

  return Math.round(incomeTax);
}

function getPensionTax(salary) {
  const maxPensionTax = 1020000;

  if (salary >= maxPensionTax) {
    return 74500;
  }

  const maxSalary = 500000;
  const salaryLessThenMax = salary <= maxSalary;
  const pensionTaxPrc = salaryLessThenMax ? 4.5 : 10;
  const governmentAssistance = salaryLessThenMax ? 0 : 27500;
  const pensionTax = (salary / 100) * pensionTaxPrc - governmentAssistance;

  return Math.round(pensionTax);
}

function getServiceFee(salary) {
  // if (salary <= 1020000) {
  //   return 50000;
  // } else {
  //   return 60000;
  // }

  return 50000;
}

module.exports = {
  check,
  getMyCommands,
  getGeneralKeyboardOptions,
  getMsgWithEscape,
  getMilitaryTax,
  getIncomeTax,
  getPensionTax,
  getServiceFee,
};
