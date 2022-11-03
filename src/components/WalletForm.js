import { arrayOf, bool, func, number, shape, string } from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  endEdit, fetchCurrencies, getValues, saveExpense, updateExpenses,
} from '../redux/actions';
import './WalletForm.css';

const expenseType = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
const paymentMtd = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];

class WalletForm extends Component {
  constructor() {
    super();

    this.state = {
      description: '',
      tag: expenseType[0],
      value: '',
      method: paymentMtd[0],
      currency: 'USD',
      exchangeRates: {},
      formsFilled: false,
    };
  }

  async componentDidMount() {
    const { dispatch } = this.props;
    const rawCurrencies = await dispatch(fetchCurrencies());

    dispatch(getValues(rawCurrencies));
  }

  componentDidUpdate() {
    const { idToEdit, expenses, editor } = this.props;
    const { formsFilled } = this.state;

    if (!formsFilled && editor) {
      const newFormData = expenses.find(({ id }) => id === idToEdit);
      if (newFormData) {
        this.setState({ ...newFormData, formsFilled: true });
      }
    }
  }

  handleChange = ({ target: { name, value } }) => this.setState({ [name]: value });

  handleSubmit = async () => {
    const { dispatch, currencies, globalId, editor, idToEdit } = this.props;
    const rawCurrencies = await dispatch(fetchCurrencies());
    const formData = this.state;
    delete formData.formsFilled;

    formData.exchangeRates = rawCurrencies;

    formData.id = (editor) ? idToEdit : globalId;
    dispatch((editor) ? updateExpenses(formData) : saveExpense(formData));
    if (editor)dispatch(endEdit());

    this.setState({
      description: '',
      tag: expenseType[0],
      value: '',
      method: paymentMtd[0],
      currency: currencies[0],
      exchangeRates: {},
      formsFilled: false,
    });
  };

  render() {
    const { description, tag, value, method, currency } = this.state;
    const { currencies, editor } = this.props;

    return (
      <form className="wallet-form">
        <div className="form-container">
          <div>
            <label htmlFor="description-input" className="description">
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

            <label htmlFor="tag-input" className="tag">
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
            <label htmlFor="value-input" className="value">
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

            <label htmlFor="method-input" className="method">
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

            <label htmlFor="currency-input" className="currency">
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
        <button type="button" onClick={ this.handleSubmit }>
          {editor ? 'Editar despesa' : 'Adicionar despesa'}
        </button>
      </form>
    );
  }
}

WalletForm.propTypes = {
  currencies: arrayOf(string).isRequired,
  globalId: number.isRequired,
  editor: bool.isRequired,
  idToEdit: number.isRequired,
  expenses: arrayOf(shape({})).isRequired,
  dispatch: func.isRequired,
};

const mapStateToProps = ({
  wallet: { currencies, globalId, editor, idToEdit, expenses },
}) => ({
  currencies,
  globalId,
  editor,
  idToEdit,
  expenses,
});

export default connect(mapStateToProps)(WalletForm);
