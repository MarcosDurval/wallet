import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      valor: [],
      soma: 0,
    };
    this.auxiliar = this.auxiliar.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.dados) {
      this.auxiliar();
    }
  }

  auxiliar() {
    const { props: { dados }, state: { valor } } = this;
    if (dados !== valor) {
      let final = 0;
      dados.forEach((element) => {
        const value = parseFloat(element.value);
        const name = element.currency;
        Object.keys(element.exchangeRates).forEach((moeda) => {
          if (name === moeda) {
            const cotacao = parseFloat(element.exchangeRates[moeda].ask);
            final += Math.round((cotacao * value) * 100) / 100;
          }
        });
      });
      this.setState(() => ({ valor: dados, soma: final }));
    }
  }

  render() {
    const { props: { emailUser }, state: { soma } } = this;
    return (
      <div>
        <h6 data-testid="email-field">
          {`Bem Vindo ${emailUser}`}
        </h6>
        <h6>
          Depesas totais:
        </h6>
        <p data-testid="total-field">{soma.toFixed(2)}</p>
        <p data-testid="header-currency-field">BRL</p>
      </div>
    );
  }
}
Header.propTypes = {
  emailUser: PropTypes.string.isRequired,
  dados: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

const mapStateToProps = (state) => ({
  emailUser: state.user.email,
  dados: state.wallet.expenses,
});

export default connect(mapStateToProps)(Header);
