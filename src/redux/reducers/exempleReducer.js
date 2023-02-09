const INITIAL_STATE = {
  player:
  {
    name: '',
    assertions: 0,
    score: 0,
    gravatarEmail: '',
  },
};

const exampleReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  default:
    return state;
  }
};

export default exampleReducer;
