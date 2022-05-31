import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class ExpensesTable extends Component {
  render() {
    const { expenses } = this.props;
    return (
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => {
            const currencyExchange = expense.exchangeRates[expense.currency].ask;
            const fixedCurrencyExchange = Number(currencyExchange).toFixed(2);
            const expenseValue = Number(expense.value);
            const fixedValue = expenseValue.toFixed(2);
            const exchangedValue = expenseValue * Number(currencyExchange);
            const fixedExchangedValue = exchangedValue.toFixed(2);
            const currencyName = expense.exchangeRates[expense.currency].name;
            const splitName = currencyName.split('/Real Brasileiro');
            return (
              <tr key={ expense.id }>
                <td>{ expense.description }</td>
                <td>{ expense.tag }</td>
                <td>{ expense.method }</td>
                <td>{ fixedValue }</td>
                <td>{ splitName }</td>
                <td>{ fixedCurrencyExchange }</td>
                <td>{ fixedExchangedValue }</td>
                <td>Real</td>
                <td>
                  <button type="button">Editar</button>
                  <button type="button">Excluir</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

ExpensesTable.defaultProps = {
  expenses: [],
};

ExpensesTable.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.shape()),
};

export default connect(mapStateToProps)(ExpensesTable);
