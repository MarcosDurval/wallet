import React from 'react';
import PropTypes from 'prop-types';
import '../Css/Login.css';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import walletIcon from '../wallet.svg';
import { recordUser } from '../actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      button: true,
      senha: '',
      email: '',
      shouldRedirect: true,
    };
    this.login = this.login.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  login(e) {
    e.preventDefault();
    const { state: { email }, props: { dispatchValue } } = this;
    dispatchValue(email);
    this.setState({ shouldRedirect: false });
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value }, () => {
      const { senha, email } = this.state;
      const vali = /\S+@\S+\.\S+/; /* source: https://www.horadecodar.com.br/2020/09/13/como-validar-email-com-javascript/ */
      const num = 6; /* procura por validações de email */
      if (senha.length >= num && vali.test(email)) {
        this.setState({ button: false });
      } else {
        this.setState({ button: true });
      }
    });
  }

  render() {
    const { button, shouldRedirect } = this.state;
    if (!shouldRedirect) {
      return <Redirect to="/carteira" />;
    }
    return (
      <div className="pageLogin">
        <form className="login" onSubmit={ this.login }>
          <img src={ walletIcon } className="icon" alt="" />
          <div className="form-group">
            <label htmlFor="login">
              E-mail
              <input
                onChange={ this.handleChange }
                type="email"
                name="email"
                required
                data-testid="email-input"
                className="form-control"
              />
            </label>
          </div>
          <div className="form-group">
            <label htmlFor="senha">
              Senha
              <input
                type="text"
                required
                minLength="6"
                name="senha"
                onChange={ this.handleChange }
                data-testid="password-input"
                className="form-control"
              />
            </label>
          </div>
          <button type="submit" className="btn-login" disabled={ button }>Entrar</button>
        </form>
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch) => ({
  dispatchValue: (user) => dispatch(recordUser(user)),
});

Login.propTypes = {
  dispatchValue: PropTypes.func.isRequired,
};
export default connect(null, mapDispatchToProps)(Login);
