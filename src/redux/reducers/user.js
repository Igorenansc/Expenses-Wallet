// Esse reducer será responsável por tratar as informações da pessoa usuária
const INITIAL_STATE = {
  email: '',
};

function userReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'USER_LOGIN':
    return ({ ...state, email: action.payload });
  default:
    return state;
  }
}

export default userReducer;
