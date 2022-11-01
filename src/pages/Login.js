import { func } from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { submitUser } from '../redux/actions';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      isDisabled: true,
    };
  }

  handleChange = ({ target: { name, value } }) => (
    this.setState({ [name]: value }, () => this.setState({ isDisabled: this.checkBtn() }))
  );

  checkBtn = () => {
    const { email, password } = this.state;
    const emailRegex = /[\w+\-.]+@[a-z\d\-.]+\.[a-z]+/i;
    const minLenght = 5;

    return !(email.match(emailRegex) && password.length > minLenght);
  };
  // 01.LoginPage.cy.js npm run cy -- --spec cypress/e2e/_requirements/01.LoginPage.cy.js

  handleClick = () => {
    const { dispatch, history } = this.props;
    const { email } = this.state;

    dispatch(submitUser(email));
    history.push('/carteira');
  };

  render() {
    const { email, password, isDisabled } = this.state;
    return (
      <form>
        <main>
          <div>
            <input
              type="email"
              name="email"
              data-testid="email-input"
              value={ email }
              onChange={ this.handleChange }
            />
            <input
              type="password"
              name="password"
              data-testid="password-input"
              value={ password }
              onChange={ this.handleChange }
            />
          </div>
          <button
            type="button"
            disabled={ isDisabled }
            onClick={ this.handleClick }
          >
            Entrar
          </button>
        </main>
      </form>
    );
  }
}

Login.propTypes = {
  dispatch: func.isRequired,
  history: func.isRequired,
};

export default connect()(Login);
