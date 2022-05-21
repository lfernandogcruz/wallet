// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas.
const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

const walletReducer = (store = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'WALLET_ACTION':
    return {
      ...store,
      currencies: action.payload,
      expenses: action.payload,
    };
  case 'CURRENCIES_ACTION':
    return {
      ...store,
      currencies: action.payload,
    };
  case 'EXPENSES_ACTION':
    return {
      ...store,
      expenses: action.payload,
    };
  default:
    return store;
  }
};

export default walletReducer;
