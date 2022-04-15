import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { despesaUser, editDepesa } from '../actions';
import Select from './itemForm/Select';
import fetchApi from '../serviceApi/fetchApi';
import Input from './itemForm/Input';

class Forms extends React.Component {
  constructor() {
    super();
    this.state = {
      id: 0,
      status: false,
    };
    this.addDespesa = this.addDespesa.bind(this);
    this.valor = this.valor.bind(this);
    this.moeda = this.moeda.bind(this);
    this.method = this.method.bind(this);
    this.tag = this.tag.bind(this);
    this.description = this.description.bind(this);
    this.logica = this.logica.bind(this);
    this.adicionarItem = this.adicionarItem.bind(this);
    this.editItem = this.editItem.bind(this);
  }

  componentDidUpdate() {
    const { editId } = this.props;

    if (editId) {
      this.help(editId);
    }
  }

  addDespesa({ target }) {
    const { value, name } = target;
    this.setState({
      [name]: value,
    });
  }

  valor() {
    const { value } = this.state;
    return (
      <Input
        type="Number"
        name="value"
        id="valor"
        label="valor: "
        value={ value }
        onChange={ this.addDespesa }
      />
    );
  }

  moeda() {
    const { props: { currencies }, state: { currency } } = this;
    return (
      <Select
        value={ currency }
        name="currency"
        id="Moeda"
        label="Moeda: "
        onChange={ this.addDespesa }
        data={ currencies }
      />

    );
  }

  method() {
    const teste = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
    const { method } = this.state;
    return (
      <Select
        value={ method }
        name="method"
        id="Metodo"
        label="Método de pagamento: "
        onChange={ this.addDespesa }
        data={ teste }
      />
    );
  }

  tag() {
    const { tag } = this.state;
    const data = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
    return (
      <Select
        value={ tag }
        name="tag"
        id="Tag"
        label="Tag: "
        onChange={ this.addDespesa }
        data={ data }
      />
    );
  }

  description() {
    const { description } = this.state;
    return (
      <Input
        type="text"
        name="description"
        id="descricao"
        label="Descrição: "
        value={ description }
        onChange={ this.addDespesa }
      />
    );
  }

  async logica(e) {
    e.preventDefault();
    const { props: { expenses, despesa } } = this;
    const data = await fetchApi();
    this.setState({ exchangeRates: data },
      () => {
        const { status, exchangeRates, ...outros } = this.state;
        const itens = { ...outros, exchangeRates };
        const concExpenses = expenses.concat(itens);
        this.setState((prevent) => ({ id: prevent.id + 1 }));
        despesa(concExpenses);
      });
  }

  editItem(e) {
    e.preventDefault();
    const LASTITEM = -1;
    const { props: { expenses, despesa } } = this;
    const { status, ...state } = this.state;
    const allItens = expenses.map((el) => (el.id === state.id ? state : el));
    this.setState({ status: false, id: allItens.at(LASTITEM).id + 1 });
    despesa(allItens);
  }

  adicionarItem() {
    const { status } = this.state;
    return (
      <form onSubmit={ status ? this.editItem : this.logica }>
        {this.valor()}
        {this.moeda()}
        {this.method()}
        {this.tag()}
        {this.description()}
        <button type="submit">
          {status ? 'Editar despesa' : 'Adicionar despesa' }
        </button>
      </form>
    );
  }

  help(itens) {
    const { edit } = this.props;
    edit({ id: -1 });

    this.setState({ ...itens }, () => {
      this.setState({ status: true });
    });
  }

  render() {
    return (
      <>
        { this.adicionarItem() }
      </>
    );
  }
}
const mapDispathToProps = (dispatch) => ({
  despesa: (payload) => dispatch(despesaUser(payload)),
  edit: (payload) => dispatch(editDepesa(payload)),

});

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
  editId: state.wallet.editId,
});
Forms.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string),
  expenses: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  despesa: PropTypes.func.isRequired,
  edit: PropTypes.func.isRequired,
  editId: PropTypes.shape({}),
};
Forms.defaultProps = {
  editId: undefined,
  currencies: undefined,
};
export default connect(mapStateToProps, mapDispathToProps)(Forms);
