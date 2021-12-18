import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import NovaTabela from './NovaTabela';

class Tabela extends React.Component {
  render() {
    const { expenses } = this.props;
    return (
      <table>
        <tr>
          <th>Descrição</th>
          <th>Tag</th>
          <th>Método de pagamento</th>
          <th>Valor</th>
          <th>Moeda</th>
          <th>Câmbio utilizado</th>
          <th>Valor convertido</th>
          <th>Moeda de conversão</th>
          <th>Editar/Excluir</th>
        </tr>
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
