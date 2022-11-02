// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
};

function walletReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'GET_CURRENCIES':
    return { ...state, currencies: action.payload };
  case 'SUBMIT_EXPENSE':
    return { ...state, expenses: [...state.expenses, action.payload] };
  default:
    return state;
  }
}

export default walletReducer;
