import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import NovaTabela from './NovaTabela';

class Tabela extends React.Component {
  render() {
    const { expenses } = this.props;
    return (
      <table className="table table-borderless">
        <thead>
          <tr>
            <th scope="col">Descrição</th>
            <th scope="col">Tag</th>
            <th scope="col">Método de pagamento</th>
            <th scope="col">Valor</th>
            <th scope="col">Moeda</th>
            <th scope="col">Câmbio utilizado</th>
            <th scope="col">Valor convertido</th>
            <th scope="col">Moeda de conversão</th>
            <th scope="col">Editar/Excluir</th>
          </tr>
        </thead>
        {expenses.map((expense) => (<NovaTabela
          expense={ expense }
          key={ expense.id }
        />)) }
      </table>
    );
  }
}
const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});
Tabela.propTypes = {
  expenses: PropTypes.objectOf({}),
}.isRequired;
export default connect(mapStateToProps)(Tabela);
