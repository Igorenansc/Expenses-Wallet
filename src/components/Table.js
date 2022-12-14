import { arrayOf, func, shape, bool, number } from 'prop-types';
import React, { Component } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { connect } from 'react-redux';
import { removeExpense, editExpense } from '../redux/actions';
import './Table.css';

const tableHeading = ['Descrição', 'Tag', 'Método de pagamento', 'Valor', 'Moeda',
  'Câmbio utilizado', 'Valor convertido', 'Moeda de conversão', 'Editar/Excluir'];

class Table extends Component {
  removeExpense = (id) => {
    const { dispatch } = this.props;
    dispatch(removeExpense(id));
  };

  editExpense = (id) => {
    const { dispatch } = this.props;
    dispatch(editExpense(id));
  };

  render() {
    const { expenses, editor, idToEdit } = this.props;
    return (
      <section className="expenses-table">
        <table>
          <thead>
            <tr className="table-heading">
              {tableHeading.map((value, i) => <th key={ i }><p>{value}</p></th>)}
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
                    disabled={ (editor && (idToEdit !== expense.id)) }
                    onClick={ () => this.editExpense(expense.id) }
                  >
                    <FaEdit />
                  </button>
                  <button
                    type="button"
                    data-testid="delete-btn"
                    className="delete-btn"
                    onClick={ () => this.removeExpense(expense.id) }
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
  editor: bool.isRequired,
  idToEdit: number.isRequired,
  dispatch: func.isRequired,
};

const mapStateToProps = ({ wallet: { expenses, editor, idToEdit } }) => ({
  idToEdit,
  editor,
  expenses,
});

export default connect(mapStateToProps)(Table);
