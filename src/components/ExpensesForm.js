import React, { Component } from 'react';
import CurrenciesOptions from './CurrenciesOptions';

class ExpensesForm extends Component {
  render() {
    return (
      <form>
        <label htmlFor="valor">
          valor
          <input type="number" name="valor" data-testid="value-input" />
        </label>
        <label htmlFor="moedas">
          moeda
          <select name="moedas" id="moedas">
            <CurrenciesOptions />
          </select>
        </label>
        <label htmlFor="metodo">
          método de pagamento
          <select name="metodo" data-testid="method-input">
            <option value="dinheiro">Dinheiro</option>
            <option value="credito">Cartão de crédito</option>
            <option value="debito">Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag">
          categoria
          <select name="tag" data-testid="tag-input">
            <option value="alimentacao">Alimentação</option>
            <option value="lazer">Lazer</option>
            <option value="trabalho">Trabalho</option>
            <option value="transporte">Transporte</option>
            <option value="saude">Saúde</option>
          </select>
        </label>
        <label htmlFor="descricao">
          descrição
          <input type="text" name="descricao" data-testid="description-input" />
        </label>
        <button type="button" name="adicionar">
          Adicionar despesa
        </button>
      </form>
    );
  }
}

export default ExpensesForm;
