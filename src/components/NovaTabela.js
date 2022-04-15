import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteUser, editDepesa } from '../actions';

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
    Object.keys(exchangeRates).forEach((element) => {
      if (currency === element) {
        teste = exchangeRates[element].name;
      }
    });
    const name = teste.split('/');
    return name[0];
  }

  Moeda({ currency, exchangeRates }) {
    const code = Object.keys(exchangeRates).reduce((acc, curr) => {
      if (currency === curr) {
        acc = exchangeRates[curr].name;
      }
      return acc;
    }, '');
    const name = code.split('/');
    return name[1];
  }

  Cambio({ currency, exchangeRates }) {
    const number = Object.keys(exchangeRates).reduce((acc, cur) => {
      if (currency === cur) {
        acc += parseFloat(exchangeRates[cur].ask);
      }
      return acc;
    }, 0).toFixed(2);
    return number;
  }

  valor({ currency, exchangeRates, value }) {
    const number = Object.keys(exchangeRates).reduce((acc, cur) => {
      if (currency === cur) {
        acc += exchangeRates[cur].ask;
      }
      return acc;
    }, 0);
    return (number * value).toFixed(2);
  }

  delete({ id }) {
    const { remove } = this.props;
    remove(id);
  }

  edit(dados) {
    const { edit } = this.props;
    edit(dados);
  }

  render() {
    const { expense } = this.props;
    return (
      <tbody>
        <tr>
          <td>{expense.description}</td>
          <td>{expense.tag}</td>
          <td>{expense.method}</td>
          <td>{expense.value}</td>
          <td>{this.nameMoeda(expense)}</td>
          <td>{ this.Cambio(expense) }</td>
          <td>{this.valor(expense)}</td>
          <td>Real</td>
          <td>
            <button
              onClick={ () => this.edit(expense) }
              type="button"
              data-testid="edit-btn"
            >
              edit
            </button>
            <button
              onClick={ () => this.delete(expense) }
              type="button"
              data-testid="delete-btn"
            >
              deletar
            </button>
          </td>
        </tr>
      </tbody>
    );
  }
}
NovaTabela.propTypes = {
  expense: PropTypes.shape({
    description: PropTypes.string,
    tag: PropTypes.string,
    method: PropTypes.string,
    value: PropTypes.string,
  }).isRequired,
  edit: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
};
const dispatchToProps = (dispatch) => ({
  remove: (payload) => dispatch(deleteUser(payload)),
  edit: (payload) => dispatch(editDepesa(payload)),
});

export default connect(null, dispatchToProps)(NovaTabela);
