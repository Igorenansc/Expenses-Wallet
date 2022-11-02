import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Table.css';
import { arrayOf, shape } from 'prop-types';

const tableHeading = ['Descrição', 'Tag', 'Método de pagamento', 'Valor', 'Moeda',
  'Câmbio utilizado', 'Valor convertido', 'Moeda de conversão', 'Editar/Excluir'];

class Table extends Component {
  render() {
    const { expenses } = this.props;
    return (
      <section className="expenses-table">
        <table>
          <thead>
            <tr className="table-heading">
              {tableHeading.map((h, i) => <th key={ i }>{h}</th>)}
            </tr>
          </thead>
          <tbody>
            { expenses.map((expense, i) => (
              <tr key={ i } className="table-body">
                <td>{expense.description}</td>
                <td>{expense.tag}</td>
                <td>{expense.method}</td>
                <td>{parseFloat((expense.value) ? expense.value : 0).toFixed(2)}</td>
                <td>
                  {expense.exchangeRates[expense.currency].name}
                </td>
                <td>
                  {parseFloat(expense.exchangeRates[expense.currency].ask).toFixed(2)}
                </td>
                <td>
                  {(expense.value * expense.exchangeRates[expense.currency].ask)
                    .toFixed(2)}
                </td>
                <td>Real</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    );
  }
}

Table.propTypes = {
  expenses: arrayOf(shape({})).isRequired,
};

const mapStateToProps = ({ wallet: { expenses } }) => ({
  expenses,
});

export default connect(mapStateToProps)(Table);
