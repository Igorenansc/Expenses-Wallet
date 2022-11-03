import { act, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import mockFetch from './helpers/mockFetch';
import mockData from './helpers/mockData';
import { renderWithRouterAndRedux } from './helpers/renderWith';

const mockInitialState = {
  user: {
    email: '', // string que armazena o email da pessoa usuária
  },
  wallet: {
    currencies: [Object.keys(mockData).filter((curr) => curr !== 'USDT')], // array de string
    expenses: [
      {
        description: 'descrição teste',
        tag: 'Alimentação',
        value: '100',
        method: 'Dinheiro',
        currency: 'USD',
        id: 0,
        exchangeRates: mockData,
      },
    ], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
    editor: false, // valor booleano que indica de uma despesa está sendo editada
    idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
    globalId: 0,
  },
};

describe('Wallet page', () => {
  beforeEach(() => {
    cleanup();
    global.fetch = jest.fn(mockFetch);
  });

  afterEach(() => {
    global.fetch.mockClear();
  });

  test('if the component is rendered correctly', () => {
    const {
      getByTestId,
      getByText,
      getByRole,
      getAllByTestId,
    } = renderWithRouterAndRedux(<App />, { initialState: mockInitialState });

    const emailInput = getByTestId('email-input');
    const passwordInput = getByTestId('password-input');

    userEvent.type(emailInput, 'test@email.com');
    userEvent.type(passwordInput, '123456');

    const loginButton = getByRole('button');
    act(() => userEvent.click(loginButton));

    expect(global.fetch).toHaveBeenCalledTimes(1);

    const totalField = getByTestId('total-field');
    expect(totalField).toBeInTheDocument();
    expect(parseFloat(totalField.innerHTML)).toBe(475.31);

    const emailField = getByTestId('email-field');
    expect(emailField.innerHTML).toBe('test@email.com');

    const formSubmitBtn = getByText(/adicionar despesa/i);
    expect(formSubmitBtn).toBeInTheDocument();
    act(() => userEvent.click(formSubmitBtn));

    const deleteBtns = getAllByTestId('delete-btn');
    expect(deleteBtns[0]).toBeInTheDocument();
    act(() => userEvent.click(deleteBtns[0]));
  });
});
