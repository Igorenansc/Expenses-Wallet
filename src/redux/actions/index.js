// Coloque aqui suas actions
export const submitUser = (data) => ({
  type: 'USER_LOGIN',
  payload: data,
});

export function saveExpense(expense) {
  return {
    type: 'SUBMIT_EXPENSE',
    payload: expense,
  };
}

export function manageExpense(id, action = '') {
  return {
    type: `${action.toUpperCase()}_EXPENSE`,
    payload: id,
  };
}

export function endEdit() {
  return {
    type: 'END_EDIT',
  };
}

export function updateExpenses(updatedValue) {
  return {
    type: 'UPDATE_EXPENSES',
    payload: updatedValue,
  };
}

export function getValues(values) {
  return {
    type: 'GET_CURRENCIES',
    payload: Object.keys(values),
  };
}

export function fetchCurrencies() {
  return () => fetch('https://economia.awesomeapi.com.br/json/all')
    .then((response) => response.json())
    .then((json) => {
      delete json.USDT;
      return json;
    });
}
