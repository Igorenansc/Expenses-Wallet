// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
  isFetching: false,
};

function walletReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'REQUEST_CURRENCIES':
    return { ...state, isFetching: true };
  case 'GET_CURRENCIES':
    return { ...state, currencies: action.payload, isFetching: false };
  default:
    return state;
  }
}

export default walletReducer;
