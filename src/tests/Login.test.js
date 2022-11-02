import { cleanup, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';

describe('Login page', () => {
  beforeEach(cleanup);
  test('if the page renders correctly', () => {
    renderWithRouterAndRedux(<App />);

    const logo = screen.getByRole('img', { name: 'logo' });
    expect(logo).toBeInTheDocument();

    const emailInput = screen.getByTestId('email-input');
    expect(emailInput).toBeInTheDocument();

    const passwordInput = screen.getByTestId('password-input');
    expect(passwordInput).toBeInTheDocument();
  });

  test('if the page redirects correctly', () => {
    renderWithRouterAndRedux(<App />);

    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');

    userEvent.type(emailInput, 'test@email.com');
    userEvent.type(passwordInput, '123456');

    const loginButton = screen.getByRole('button');
    userEvent.click(loginButton);
  });
});
