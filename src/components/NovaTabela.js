import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteUser } from '../actions';

class NovaTabela extends React.Component {
  constructor() {
    super();
    this.nameMoeda = this.nameMoeda.bind(this);
    this.Moeda = this.Moeda.bind(this);
    this.Cambio = this.Cambio.bind(this);
    this.delete = this.delete.bind(this);
  }

  nameMoeda({ currency, exchangeRates }) {
    let teste = 0;
    // console.log(exchangeRates[currency]);
    Object.keys(exchangeRates).forEach((element) => {
      if (currency === element) {
        teste = exchangeRates[element].name;
      }
    });
    const name = teste.split('/');
    return name[0];
  }

  Moeda({ currency, exchangeRates }) {
    let code = 0;
    Object.keys(exchangeRates).forEach((element) => {
      if (currency === element) {
        code = exchangeRates[element].name;
      }
    });
    const name = code.split('/');
    return name[1];
  }

  Cambio({ currency, exchangeRates }) {
    let teste = 0;
    Object.keys(exchangeRates).forEach((element) => {
      if (currency === element) {
        teste = exchangeRates[element].ask;
      }
    });
    return Math.round((teste) * 100) / 100;
  }

  valor({ currency, exchangeRates, value }) {
    let valor = 0;
    Object.keys(exchangeRates).forEach((element) => {
      if (currency === element) {
        valor = exchangeRates[element].ask;
      }
    });
    return Math.round((valor * value) * 100) / 100;
  }

  delete({ id }) {
    const { remove } = this.props;
    remove(id);
  }

  render() {
    const { expense } = this.props;
    return (
      <tr>
        <td>{expense.description}</td>
        <td>{expense.tag}</td>
        <td>{expense.method}</td>
        <td>{expense.value}</td>
        <td>{this.nameMoeda(expense)}</td>
        <td>{ this.Cambio(expense) }</td>
        <td>{this.valor(expense)}</td>
        <td>Real</td>
        <button onClick={ () => this.delete(expense) } type="button">deletar</button>
      </tr>
    );
  }
}
NovaTabela.propTypes = {
  expense: PropTypes.shape({
    description: PropTypes.string,
    tag: PropTypes.string,
    method: PropTypes.string,
    value: PropTypes.number,
  }).isRequired,
};
const dispatchToProps = (dispatch) => ({
  remove: (payload) => dispatch(deleteUser(payload)),
});

export default connect(null, dispatchToProps)(NovaTabela);
