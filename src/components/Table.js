import { arrayOf, func, shape } from 'prop-types';
import React, { Component } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { connect } from 'react-redux';
import { manageExpense } from '../redux/actions';
import './Table.css';

const tableHeading = ['Descrição', 'Tag', 'Método de pagamento', 'Valor', 'Moeda',
  'Câmbio utilizado', 'Valor convertido', 'Moeda de conversão', 'Editar/Excluir'];

class Table extends Component {
  manageExpense = (id, action) => {
    const { dispatch } = this.props;
    dispatch(manageExpense(id, action));
  };

  render() {
    const { expenses } = this.props;
    return (
      <section className="expenses-table">
        <table>
          <thead>
            <tr className="table-heading">
              {tableHeading.map((value, index) => <th key={ index }>{value}</th>)}
            </tr>
          </thead>
          <tbody>
            { expenses.map((expense) => (
              <tr key={ expense.id } className="table-body">
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
                <td>
                  <button
                    type="button"
                    data-testid="edit-btn"
                    className="edit-btn"
                    onClick={ () => this.manageExpense(expense.id, 'edit') }
                  >
                    <FaEdit />
                  </button>
                  <button
                    type="button"
                    data-testid="delete-btn"
                    className="delete-btn"
                    onClick={ () => this.manageExpense(expense.id, 'remove') }
                  >
                    <FaTrash />
                  </button>
                </td>
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
  dispatch: func.isRequired,
};

const mapStateToProps = ({ wallet: { expenses } }) => ({
  expenses,
});

export default connect(mapStateToProps)(Table);
