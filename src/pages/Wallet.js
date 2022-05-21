import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { fetchCurrencies } from '../actions';
import ExpensesForm from '../components/ExpensesForm';

class Wallet extends React.Component {
  componentDidMount() {
    const { setCurrencies } = this.props;
    setCurrencies();
    // console.log(currencies);
  }

  render() {
    return (
      <div>
        <Header />
        <main>
          <ExpensesForm />
        </main>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setCurrencies: () => dispatch(fetchCurrencies()),
});

// export default Wallet;
export default connect(null, mapDispatchToProps)(Wallet);

Wallet.propTypes = {
  setCurrencies: PropTypes.func.isRequired,
};
