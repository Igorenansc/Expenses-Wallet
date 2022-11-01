// Coloque aqui suas actions
export const submitUser = (data) => ({
  type: 'USER_LOGIN',
  payload: data,
});

function getValues(values) {
  return {
    type: 'GET_CURRENCIES',
    payload: values,
  };
}

function requestCurrencies() {
  return { type: 'REQUEST_CURRENCIES' };
}

export function fetchCurrencies() {
  return (dispatch) => {
    dispatch(requestCurrencies());
    return fetch('https://economia.awesomeapi.com.br/json/all')
      .then((response) => response.json())
      .then((json) => {
        delete json.USDT;
        return json;
      }).then((json) => dispatch(getValues(Object.keys(json))));
  };
}
