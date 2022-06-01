import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { editExpensesAction, editFormAction, editButtonAction } from '../actions';

class ExpensesTable extends Component {
  deleteExpense = (it) => {
    const { expenses, editExpenses } = this.props;
    const newExpenses = expenses.filter((expense) => expense.id !== it);
    editExpenses(newExpenses);
  };

  editExpense = (it) => {
    const { expenses, editForm, editButton } = this.props;
    const editThisExpense = expenses.filter((expense) => expense.id === it)[0];
    editForm(editThisExpense);
    editButton(true);
  };

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
              <tr
                key={ expense.id }
                className={ `table-row-${expense.id}` }
              >
                <td>{ expense.description }</td>
                <td>{ expense.tag }</td>
                <td>{ expense.method }</td>
                <td>{ fixedValue }</td>
                <td>{ splitName }</td>
                <td>{ fixedCurrencyExchange }</td>
                <td>{ fixedExchangedValue }</td>
                <td>Real</td>
                <td>
                  <button
                    type="button"
                    data-testid="edit-btn"
                    onClick={ () => this.editExpense(expense.id) }
                  >
                    Editar
                  </button>
                  <button
                    type="button"
                    data-testid="delete-btn"
                    onClick={ () => this.deleteExpense(expense.id) }
                  >
                    Excluir
                  </button>
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

const mapDispatchToProps = (dispatch) => ({
  editExpenses: (state) => dispatch(editExpensesAction(state)),
  editForm: (state) => dispatch(editFormAction(state)),
  editButton: (state) => dispatch(editButtonAction(state)),
});

ExpensesTable.defaultProps = {
  expenses: [],
};

ExpensesTable.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.shape()),
  editExpenses: PropTypes.func.isRequired,
  editForm: PropTypes.func.isRequired,
  editButton: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesTable);
