import { arrayOf, number, string } from 'prop-types';
import React, { Component } from 'react';
import { FaUserCircle, FaCoins } from 'react-icons/fa';
import { connect } from 'react-redux';
import logo from '../imgs/logo.png';
import './Header.css';

class Header extends Component {
  render() {
    const { email, expenses } = this.props;
    return (
      <header className="header">
        <img src={ logo } alt="trybe wallet logo" />
        <div className="expenses-field">
          <FaCoins />
          <p>
            <strong>Total de despesas:</strong>
            {' '}
            <span data-testid="total-field">
              {expenses.length ? expenses.reduce((acc, curr) => acc + curr, 0) : 0}
            </span>
            {' '}
            <span data-testid="header-currency-field">BRL</span>
          </p>
        </div>
        <div className="email-field">
          <FaUserCircle />
          <p data-testid="email-field">{ email }</p>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  email: string.isRequired,
  expenses: arrayOf(number).isRequired,
};

const mapStateToProps = ({ user, wallet }) => ({
  email: user.email,
  expenses: wallet.expenses,
});

export default connect(mapStateToProps)(Header);
