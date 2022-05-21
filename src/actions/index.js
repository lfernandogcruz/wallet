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

// 4. Implemente a lógica para armazenar no estado global as siglas das moedas que vêm da API
// Os valores da chave currencies no estado global devem ser puxados através de uma requisição à API, que deve ser feita ao entrar na página /carteira, sendo representado pela sigla de cada moeda, exemplo: 'USD', 'CAD', 'EUR'...

// O endpoint utilizado deve ser: https://economia.awesomeapi.com.br/json/all

// Remova das informações trazidas pela API a opção 'USDT' (Moeda Tether).

// A chave currencies do estado global deve ser um array.

// O que será verificado:
// A API é chamada com o end point https://economia.awesomeapi.com.br/json/all
// O valor da chave currencies no estado global é um array que possui as siglas das moedas que vieram da API.
