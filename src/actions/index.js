// Coloque aqui suas actions
export const userAction = (state) => ({
  type: 'USER_ACTION',
  payload: state,
});

export const walletAction = (state) => ({
  type: 'WALLET_ACTION',
  payload: state,
});

export const currenciesAction = (state) => ({
  type: 'CURRENCIES_ACTION',
  payload: state,
});

export const ratesAction = (state) => ({
  type: 'RATES_ACTION',
  payload: state,
});

export const updateIdAction = (state) => ({
  type: 'ID_COUNTER_ACTION',
  payload: state,
});

export const expensesAction = (state) => ({
  type: 'EXPENSES_ACTION',
  payload: state,
});

export const totalSumAction = (state) => ({
  type: 'TOTAL_SUM_ACTION',
  payload: state,
});

export const editExpensesAction = (state) => ({
  type: 'EDIT_EXPENSES_ACTION',
  payload: state,
});

export const fetchCurrencies = () => async (dispatch) => {
  try {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const result = await response.json();
    const filtered = Object.keys(result).filter((key) => key !== 'USDT');
    dispatch(currenciesAction(filtered));
  } catch (error) {
    console.log(error);
  }
};

export const fetchRates = () => async (dispatch) => {
  try {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const result = await response.json();
    // const remount = result.reduce((acc, curr) => {
    //   acc[curr] = result[curr];
    //   return acc;
    // }, {});
    dispatch(ratesAction(result));
  } catch (error) {
    console.log(error);
  }
};
