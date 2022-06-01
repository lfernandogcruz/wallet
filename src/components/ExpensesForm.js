import React, { Component } from 'react';
import { connect } from 'react-redux';
// import CurrenciesOptions from './CurrenciesOptions';
import PropTypes from 'prop-types';
import { expensesAction, fetchRates,
  editExpensesAction, editButtonAction, editFormAction } from '../actions';

const ALIMENTACAO = 'Alimentação';

class ExpensesForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: ALIMENTACAO,
      exchangeRates: {},
    };
  }

  handleChange = ({ target }) => {
    const { id, value } = target;
    this.setState({
      [id]: value,
    });
  }

  resetInputs = () => {
    this.setState({
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: ALIMENTACAO,
      exchangeRates: {},
    });
  }

  expenseSetup = () => {
    const { sendExpenses } = this.props;
    sendExpenses(this.state);
    this.updateCounter();
  }

  updateCounter = () => {
    this.setState((prevState) => ({
      id: prevState.id + 1,
    }));
    this.resetInputs();
  }

  handleClick = async () => {
    const { setRates } = this.props;
    await setRates();
    const { ratesList } = this.props;
    this.setState({
      exchangeRates: ratesList,
    }, () => {
      this.expenseSetup();
    });
  };

  handleEdit = () => {
    const {
      editFormContent, editExpenses, editButtonFunc, expenses, editForm,
    } = this.props;
    const { id, exchangeRates } = editFormContent;
    const { value, description, currency, method, tag } = this.state;
    const editedExpense = {
      id,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates,
    };
    const newExpenses = expenses.filter((expense) => expense.id !== id);
    newExpenses.push(editedExpense);
    newExpenses.sort((a, b) => a.id - b.id);
    editExpenses(newExpenses);
    editButtonFunc(false);
    this.resetInputs();
    editForm({});
  }

  render() {
    const { value, description } = this.state;
    // const { value, description, currency, method, tag } = this.state;
    const { currenciesList, editButton } = this.props;
    // const { editFormContent } = this.props;
    // const {
    //   value: valueEdit, description: descriptionEdit, currency: currencyEdit,
    //   method: methodEdit, tag: tagEdit,
    // } = editFormContent;
    const buttonAdd = (
      <button
        type="button"
        name="adicionar"
        onClick={ () => this.handleClick() }
      >
        Adicionar despesa
      </button>
    );
    const buttonEdit = (
      <button
        type="button"
        name="editar"
        onClick={ () => this.handleEdit() }
      >
        Editar despesa
      </button>
    );

    return (
      <form>
        <label htmlFor="value">
          valor
          <input
            type="number"
            name="valor"
            data-testid="value-input"
            id="value"
            value={ value }
            // value={ editButton ? valueEdit : value }
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="currency">
          moeda
          <select
            name="moedas"
            id="currency"
            onChange={ this.handleChange }
            // value={ currency }
            // value={ editButton ? currencyEdit : currency }
          >
            {
              currenciesList.map((curr) => (
                <option value={ curr } key={ curr }>{ curr }</option>
              ))
            }
          </select>
        </label>
        <label htmlFor="method">
          método de pagamento
          <select
            name="metodo"
            data-testid="method-input"
            id="method"
            onChange={ this.handleChange }
            // value={ method }
            // value={ editButton ? methodEdit : method }
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag">
          categoria
          <select
            name="tag"
            data-testid="tag-input"
            id="tag"
            onChange={ this.handleChange }
            // value={ tag }
            // value={ editButton ? tagEdit : tag }
          >
            <option value={ ALIMENTACAO }>Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>
        <label htmlFor="description">
          descrição
          <input
            type="text"
            name="descricao"
            data-testid="description-input"
            id="description"
            value={ description }
            // value={ editButton ? descriptionEdit : description }
            onChange={ this.handleChange }
          />
        </label>
        { editButton ? buttonEdit : buttonAdd }
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currenciesList: state.wallet.currencies,
  ratesList: state.wallet.rates,
  expenses: state.wallet.expenses,
  editButton: state.edit.editBtn,
  editFormContent: state.edit.editForm,
});

const mapDispatchToProps = (dispatch) => ({
  setRates: () => dispatch(fetchRates()),
  sendExpenses: (state) => dispatch(expensesAction(state)),
  editExpenses: (state) => dispatch(editExpensesAction(state)),
  editButtonFunc: (state) => dispatch(editButtonAction(state)),
  editForm: (state) => dispatch(editFormAction(state)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesForm);

ExpensesForm.defaultProps = {
  ratesList: {},
  editFormContent: {},
};

ExpensesForm.propTypes = {
  currenciesList: PropTypes.arrayOf(PropTypes.string).isRequired,
  ratesList: PropTypes.objectOf(PropTypes.shape()),
  setRates: PropTypes.func.isRequired,
  sendExpenses: PropTypes.func.isRequired,
  editButton: PropTypes.bool.isRequired,
  editFormContent: PropTypes.shape(),
  editExpenses: PropTypes.func.isRequired,
  editButtonFunc: PropTypes.func.isRequired,
  editForm: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};
