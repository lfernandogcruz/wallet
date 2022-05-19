import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { userAction } from '../actions/index';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      btnDisabled: true,
    };

    // this.history = props.history;

    this.handleChange = this.handleChange.bind(this);
    this.btnOnOff = this.btnOnOff.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  btnOnOff() {
    const FIVE = 5;
    const { password, email } = this.state;
    // O email está no formato válido, como 'alguem@alguem.com'.
    const emailCheck = (toBeChecked) => {
      const re = /\S+@\S+\.\S+/;
      return re.test(toBeChecked);
    }; // REFERÊNCIA AO regex UTILIZADO NO FINAL DO ARQUIVO.
    // A senha possui 6 ou mais caracteres.
    const passwordCheck = password.length > FIVE;
    if (passwordCheck && emailCheck(email)) {
      this.setState({ btnDisabled: false });
    } else {
      this.setState({ btnDisabled: true });
    }
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value }, () => this.btnOnOff());
  }

  handleClick() {
    const { userForm, history } = this.props;
    const { email } = this.state;
    userForm(email);
    history.push('/carteira');
  }

  render() {
    const { password, email, btnDisabled } = this.state;

    return (
      <form>
        <label htmlFor="email">
          <input
            type="email"
            data-testid="email-input"
            onChange={ this.handleChange }
            value={ email }
            name="email"
            required
          />
        </label>
        <label htmlFor="password">
          <input
            type="password"
            data-testid="password-input"
            onChange={ this.handleChange }
            value={ password }
            name="password"
            required
          />
        </label>
        <button
          type="button"
          label="Enviar"
          disabled={ btnDisabled }
          onClick={ () => this.handleClick() }
        >
          Entrar
        </button>
      </form>
    );
  }
}

// export default Login;

const mapDispatchToProps = (dispatch) => ({
  userForm: (state) => dispatch(userAction(state)),
});

export default connect(null, mapDispatchToProps)(Login);

Login.propTypes = {
  userForm: PropTypes.func.isRequired,
  history: PropTypes.shape().isRequired,
};

// REFERÊNCIA:
// - Regex para verificação de email válido postado no canal do Slack da tribo A,
// por Caio Galvão (t20-A), dia 18 de maio de 2022 às 15:08, contendo também
// link para o tópico do Stackoverflow consultado.
// Links abaixo:
// - thread:
// https://trybecourse.slack.com/archives/C02T5FNGN07/p1652897297121379
// - Stackoverflow:
// https://stackoverflow.com/a/48800/4832311
