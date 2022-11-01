import { arrayOf, func } from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCurrencies } from '../redux/actions';
import './WalletForm.css';

class WalletForm extends Component {
  constructor() {
    super();

    this.state = {
      description: '',
      tag: 'Alimentação',
      value: '0',
      method: 'Dinheiro',
      currency: 'USD',
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;

    dispatch(fetchCurrencies());
  }

  handleChange = ({ target: { name, value } }) => this.setState({ [name]: value });

  render() {
    const expenseType = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
    const paymentMtd = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
    const { description, tag, value, method, currency } = this.state;
    const { currencies } = this.props;

    return (
      <form className="wallet-form">
        <div>
          <div>
            <label htmlFor="description-input">
              Descrição da despesa
              <input
                type="text"
                data-testid="description-input"
                id="description-input"
                name="description"
                value={ description }
                onChange={ this.handleChange }
              />
            </label>

            <label htmlFor="tag-input">
              Categoria da despesa
              <select
                data-testid="tag-input"
                id="tag-input"
                name="tag"
                value={ tag }
                onChange={ this.handleChange }
              >
                {expenseType.map(
                  (type, i) => <option key={ i } value={ type }>{type}</option>,
                )}
              </select>
            </label>
          </div>

          <div>
            <label htmlFor="value-input">
              Valor
              <input
                id="value-input"
                type="number"
                data-testid="value-input"
                name="value"
                value={ value }
                onChange={ this.handleChange }
              />
            </label>

            <label htmlFor="method-input">
              Método de pagamento
              <select
                data-testid="method-input"
                id="method-input"
                name="method"
                value={ method }
                onChange={ this.handleChange }
              >
                {paymentMtd.map(
                  (mtd, i) => <option key={ i } value={ mtd }>{mtd}</option>,
                )}
              </select>
            </label>

            <label htmlFor="currency-input">
              Moeda
              <select
                data-testid="currency-input"
                id="currency-input"
                name="currency"
                value={ currency }
                onChange={ this.handleChange }
              >
                {currencies.map(
                  (curr, i) => <option key={ i } value={ curr }>{curr}</option>,
                )}
              </select>
            </label>
          </div>
        </div>
        <button type="button">Adicionar despesa</button>
      </form>
    );
  }
}

WalletForm.propTypes = {
  currencies: arrayOf(Number).isRequired,
  dispatch: func.isRequired,
};

const mapStateToProps = ({ wallet: { currencies } }) => ({
  currencies,
});

export default connect(mapStateToProps)(WalletForm);
