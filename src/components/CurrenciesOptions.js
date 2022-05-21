import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class CurrenciesOptions extends Component {
  render() {
    const { currenciesList } = this.props;
    // console.log(currenciesList);
    return (
      currenciesList.map((currency) => (
        <option value={ currency } key={ currency }>{ currency }</option>
      ))
    );
  }
}

const mapStateToProps = (state) => ({
  currenciesList: state.wallet.currencies,
});

// export default ExpensesForm;
export default connect(mapStateToProps, null)(CurrenciesOptions);

CurrenciesOptions.propTypes = {
  currenciesList: PropTypes.arrayOf(PropTypes.string).isRequired,
};
