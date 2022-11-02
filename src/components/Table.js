import React, { Component } from 'react';
import './Table.css';

const tableHeading = ['Descrição', 'Tag', 'Método de pagamento', 'Valor', 'Moeda',
  'Câmbio utilizado', 'Valor convertido', 'Moeda de conversão', 'Editar/Excluir'];

class Table extends Component {
  render() {
    return (
      <section className="expenses-table">
        <table>
          <thead>
            <tr className="table-heading">
              {tableHeading.map((h, i) => <th key={ i }>{h}</th>)}
            </tr>
          </thead>
        </table>
      </section>
    );
  }
}

export default Table;
