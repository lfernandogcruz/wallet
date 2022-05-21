import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { email } = this.props;
    return (
      <header>
        {/* O elemento com o 'data-testid="email-field"' renderiza o email
        salvo no estado global. */}
        <p data-testid="email-field">{ Object.entries(email) }</p>
        {/* O elemento com o 'data-testid="total-field"' inicialmente
        renderiza o valor "0". */}
        <p data-testid="total-field">0</p>
        {/* O elemento com o 'data-testid="header-currency-field"'
        renderiza o texto "BRL". */}
        <p data-testid="header-currency-field">BRL</p>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user,
});

export default connect(mapStateToProps, null)(Header);

Header.propTypes = {
  email: PropTypes.shape().isRequired,
};
