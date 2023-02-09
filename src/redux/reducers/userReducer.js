import { USER } from '../actions';

const INITIAL_STATE = {
  player:
  {
    name: '',
    assertions: 0,
    score: 0,
    gravatarEmail: '',
  },
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case USER:
    return {
      ...state,
      player:
        {
          name: action.payload.name,
          gravatarEmail: action.payload.email,
          score: 0,
        },
    };
  default:
    return state;
  }
};

export default userReducer;
