const STATES = {
  START: "START",
  ENTER_SALARY: "ENTER_SALARY",
};

class State {
  constructor(initState = STATES.START) {
    this.state = initState;
  }

  reset() {
    this.state = STATES.START;
  }
}

module.exports = {
  State,
  STATES,
};
