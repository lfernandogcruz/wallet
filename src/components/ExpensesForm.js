import React, { Component } from 'react';
import { connect } from 'react-redux';
// import CurrenciesOptions from './CurrenciesOptions';
import PropTypes from 'prop-types';
import { expensesAction, fetchRates } from '../actions';

class ExpensesForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
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

  render() {
    const { value, description } = this.state;
    const { currenciesList } = this.props;
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
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="currency">
          moeda
          <select
            name="moedas"
            id="currency"
            onChange={ this.handleChange }
          >
            {
              currenciesList.map((currency) => (
                <option value={ currency } key={ currency }>{ currency }</option>
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
          >
            <option value="Alimentação">Alimentação</option>
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
            onChange={ this.handleChange }
          />
        </label>
        <button
          type="button"
          name="adicionar"
          onClick={ () => this.handleClick() }
        >
          Adicionar despesa
        </button>
      </form>
    );
  }
}

// export default ExpensesForm;

const mapStateToProps = (state) => ({
  currenciesList: state.wallet.currencies,
  ratesList: state.wallet.rates,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  setRates: () => dispatch(fetchRates()),
  sendExpenses: (state) => dispatch(expensesAction(state)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesForm);

ExpensesForm.defaultProps = {
  ratesList: {},
};

ExpensesForm.propTypes = {
  currenciesList: PropTypes.arrayOf(PropTypes.string).isRequired,
  ratesList: PropTypes.objectOf(PropTypes.shape()),
  setRates: PropTypes.func.isRequired,
  sendExpenses: PropTypes.func.isRequired,
};
