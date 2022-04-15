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
    const teste = exchangeRates[currency].name;
    const name = teste.split('/');
    return name[0];
  }

  Moeda({ currency, exchangeRates }) {
    const code = exchangeRates[currency].name;
    const name = code.split('/');
    return name[1];
  }

  Cambio({ currency, exchangeRates }) {
    const number = parseFloat(exchangeRates[currency].ask);

    return number.toLocaleString('pt-BR', { maximumFractionDigits: 2 });
  }

  valor({ currency, exchangeRates, value }) {
    const number = (exchangeRates[currency].ask * value);

    return number.toLocaleString('pt-BR', { maximumFractionDigits: 2 });
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
