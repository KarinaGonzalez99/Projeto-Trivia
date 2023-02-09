import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getToken from '../services/getTokenAPI';
import { user } from '../redux/actions';

class Login extends Component {
  state = {
    name: '',
    email: '',
    disabled: true,
  };

  verifyFields = () => {
    const { name, email } = this.state;
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    const nameMinLength = 1;
    if ((emailRegex.test(email)) && name.length >= nameMinLength) {
      this.setState({
        disabled: false,
      });
    } else this.setState({ disabled: true });
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value }, this.verifyFields);
  };

  handleSubmit = async () => {
    const { name, email } = this.state;
    const { dispatch, history } = this.props;
    const token = await getToken();
    localStorage.setItem('token', token);
    dispatch(user({ name, email }));
    history.push('/game');
  };

  render() {
    const { history } = this.props;
    const { disabled, name, email } = this.state;
    return (
      <>
        <Header />
        <div>
          <label htmlFor="playerName">
            <input
              type="text"
              data-testid="input-player-name"
              id="playerName"
              name="name"
              value={ name }
              onChange={ this.handleChange }
              placeholder="Digite seu nome"
            />
          </label>
          <label htmlFor="playerEmail">
            <input
              type="email"
              data-testid="input-gravatar-email"
              id="playerEmail"
              name="email"
              value={ email }
              onChange={ this.handleChange }
              placeholder="Digite seu email"
            />
          </label>
          <button
            type="button"
            data-testid="btn-play"
            disabled={ disabled }
            onClick={ this.handleSubmit }
          >
            Play
          </button>
          <button
            type="button"
            data-testid="btn-settings"
            onClick={ () => history.push('./settings') }
          >
            Configurações
          </button>
        </div>
      </>
    );
  }
}

Login.propTypes = {
  name: PropTypes.string,
  email: PropTypes.string,
  disabled: PropTypes.bool,
  history: PropTypes.shape({ push: PropTypes.func.isRequired }),
}
  .isRequired;

export default connect()(Login);
