import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  totalSum = () => {
    const { expenses } = this.props;

    const calcSum = expenses.reduce((total, expense) => {
      const convertion = expense.value * expense.exchangeRates[expense.currency].ask;
      return total + convertion;
    }, 0);
    return calcSum.toFixed(2);
  }

  render() {
    const { email } = this.props;
    return (
      <header>
        {/* O elemento com o 'data-testid="email-field"' renderiza o email
        salvo no estado global. */}
        <p data-testid="email-field">{ Object.entries(email) }</p>
        {/* O elemento com o 'data-testid="total-field"' inicialmente
        renderiza o valor "0". */}
        <p data-testid="total-field">{ this.totalSum() }</p>
        {/* O elemento com o 'data-testid="header-currency-field"'
        renderiza o texto "BRL". */}
        <p data-testid="header-currency-field">BRL</p>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user,
  totalSum: state.wallet.totalSum,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps, null)(Header);

Header.propTypes = {
  email: PropTypes.shape().isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};
