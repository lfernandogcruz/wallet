// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas.
const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

export const walletReducer = (store = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'WALLET_ACTION':
      return {
        ...store,
        ...action.payload,
      };
    default:
      return store;
  }
};

// export default { walletReducer };
