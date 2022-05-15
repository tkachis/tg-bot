const STATES = {
  START: "START",
  ENTER_SALARY: "ENTER_SALARY",
};

class State {
  _state = {};

  initFor(userId) {
    if (userId in this._state) {
      return;
    }

    this._state[userId] = STATES.START;
  }

  resetFor(userId) {
    this._state[userId] = STATES.START;
  }

  setFor(userId, newState) {
    this._state[userId] = newState;
  }

  getFor(userId) {
    return this._state[userId];
  }
}

module.exports = {
  State,
  STATES,
};
