// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  globalId: 0,
  editor: false,
  idToEdit: 0,
};

function walletReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'GET_CURRENCIES':
    return { ...state, currencies: action.payload };
  case 'SUBMIT_EXPENSE':
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
      globalId: state.globalId + 1,
    };
  case 'REMOVE_EXPENSE':
    return {
      ...state,
      expenses: state.expenses.filter(({ id }) => id !== action.payload),
    };
  case 'EDIT_EXPENSE':
    return {
      ...state,
      editor: true,
      idToEdit: action.payload,
    };
  case 'UPDATE_EXPENSES':
    return {
      ...state,
      expenses: state.expenses.map((expense) => (
        (expense.id === action.payload.id) ? action.payload : expense)),
    };
  case 'END_EDIT':
    return {
      ...state,
      editor: false,
    };
  default:
    return state;
  }
}

export default walletReducer;
