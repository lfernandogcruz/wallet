// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas.
const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  rates: {},
};

const walletReducer = (store = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'EDIT_EXPENSES_ACTION':
    return {
      ...store,
      expenses: action.payload,
    };
  case 'CURRENCIES_ACTION':
    return {
      ...store,
      currencies: action.payload,
    };
  case 'RATES_ACTION':
    return {
      ...store,
      rates: action.payload,
    };
  case 'EXPENSES_ACTION':
    return {
      ...store,
      expenses: [...store.expenses, action.payload],
    };
  case 'ID_COUNTER_ACTION':
    return {
      ...store,
      idCounter: action.payload,
    };
  case 'TOTAL_SUM_ACTION':
    return {
      ...store,
      totalSum: action.payload,
    };
  default:
    return store;
  }
};

export default walletReducer;
