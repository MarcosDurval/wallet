import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../Css/Header.css';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      dados: [],
      soma: 0,
    };
    this.auxiliar = this.auxiliar.bind(this);
  }

  componentDidUpdate(prevProps, props) {
    if (prevProps.dados !== props.dados) {
      this.auxiliar();
    }
  }

  auxiliar() {
    const { props: { dados } } = this;
    const sum = dados.reduce((acc, { value, currency, exchangeRates }) => {
      acc += (parseFloat(exchangeRates[currency].ask) * value);
      return acc;
    }, 0);
    this.setState(() => ({ dados, soma: sum }));
  }

  render() {
    const emailUser = JSON.parse(sessionStorage.getItem('email'));
    const { state: { soma } } = this;
    return (
      <div className="infos">
        <div>
          <h6 data-testid="email-field">
            {`Bem Vindo ${emailUser}`}
          </h6>
        </div>
        <div className="sum">
          <h6>
            Depesas totais:
          </h6>
          <p data-testid="total-field">
            {soma.toLocaleString('pt-BR',
              { style: 'currency', currency: 'BRL' })}
          </p>
        </div>
      </div>
    );
  }
}
Header.propTypes = {
  // emailUser: PropTypes.string.isRequired,
  dados: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

const mapStateToProps = (state) => ({
  emailUser: state.user.email,
  dados: state.wallet.expenses,
});

export default connect(mapStateToProps)(Header);
