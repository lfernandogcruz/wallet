import React, { Component } from 'react';
import { connect } from 'react-redux';
// import CurrenciesOptions from './CurrenciesOptions';
import PropTypes from 'prop-types';
import { expensesAction, fetchRates, updateIdAction, totalSumAction } from '../actions';

class ExpensesForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      value: '',
      description: '',
      currency: 'USD',
      method: 'dinheiro',
      tag: 'alimentacao',
      exchangeRates: {},
      totalSum: 0,
    };
  }

  componentDidMount() {
    const { idCount } = this.props;
    this.setState({ id: idCount });
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
    const { id,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates } = this.state;
    const liveConvertion = value * exchangeRates[currency].ask;
    const expenseObj = {
      id,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates,
      liveConvertion,
    };
    const { sendExpenses } = this.props;
    sendExpenses(expenseObj);
  }

  updateCounter = () => {
    const { addToIdCounter } = this.props;
    this.setState((prevState) => ({
      id: prevState.id + 1,
    }), () => {
      const { id } = this.state;
      addToIdCounter(id);
    });
  }

  calculateTotalSum = () => {
    const { expenses } = this.props;
    if (!expenses.length) {
      return;
    }
    // expenses.forEach((expense) => {
    //   this.setState((prevState) => ({
    //     totalSum: prevState.totalSum + expense.liveConvertion,
    //   }), () => {
    //     sendTotalSum(totalSum);
    //   });
    // });
    const calcSum = expenses.reduce((acc, curr) => acc + curr.liveConvertion, 0);
    // console.log(expenses);
    // console.log(totalSum);
    this.setState({ totalSum: calcSum }, () => {
      const { sendTotalSum } = this.props;
      const { totalSum } = this.state;
      sendTotalSum(totalSum.toFixed(2));
    });
  }

  handleClick = async () => {
    const { setRates } = this.props;
    await setRates();
    const { ratesList } = this.props;
    this.setState({
      exchangeRates: ratesList,
    }, () => {
      // console.log(this.state);
      this.expenseSetup();
      this.updateCounter();
      this.resetInputs();
      this.calculateTotalSum();
    });
  };

  render() {
    const { value, description } = this.state;
    const { currenciesList } = this.props;
    return (
      <form>
        <label htmlFor="valor">
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
        <label htmlFor="moedas">
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
        <label htmlFor="metodo">
          método de pagamento
          <select
            name="metodo"
            data-testid="method-input"
            id="method"
            onChange={ this.handleChange }
          >
            <option value="dinheiro">Dinheiro</option>
            <option value="credito">Cartão de crédito</option>
            <option value="debito">Cartão de débito</option>
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
            <option value="alimentacao">Alimentação</option>
            <option value="lazer">Lazer</option>
            <option value="trabalho">Trabalho</option>
            <option value="transporte">Transporte</option>
            <option value="saude">Saúde</option>
          </select>
        </label>
        <label htmlFor="descricao">
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
  idCount: state.wallet.idCounter,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  setRates: () => dispatch(fetchRates()),
  addToIdCounter: (state) => dispatch(updateIdAction(state)),
  sendExpenses: (state) => dispatch(expensesAction(state)),
  sendTotalSum: (state) => dispatch(totalSumAction(state)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesForm);

ExpensesForm.propTypes = {
  currenciesList: PropTypes.arrayOf(PropTypes.string).isRequired,
  ratesList: PropTypes.objectOf(PropTypes.shape()).isRequired,
  setRates: PropTypes.func.isRequired,
  idCount: PropTypes.number.isRequired,
  addToIdCounter: PropTypes.func.isRequired,
  sendExpenses: PropTypes.func.isRequired,
  sendTotalSum: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

// expenses: [{
//   "id": 0,
//   "value": "3",
//   "description": "Hot Dog",
//   "currency": "USD",
//   "method": "Dinheiro",
//   "tag": "Alimentação",
//   "exchangeRates": {
//     "USD": {
//       "code": "USD",
//       "name": "Dólar Comercial",
//       "ask": "5.6208",
//       ...
//     },
//     "CAD": {
//       "code": "CAD",
//       "name": "Dólar Canadense",
//       "ask": "4.2313",
//       ...
//     },
//   }
// }]
