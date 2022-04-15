import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { allMoedas } from '../actions';
import Forms from '../components/Forms';
import Header from '../components/Header';
import Tabela from '../components/Tabela';
import Load from './Load';

class Wallet extends React.Component {
  componentDidMount() {
    const { dispatchFetch } = this.props;
    dispatchFetch();
  }

  render() {
    const { currencies } = this.props;
    if (currencies && currencies.length === 0) {
      return (
        <Load />
      );
    }
    return (
      <>
        <div>TrybeWallet</div>
        <Header />
        <Forms />
        <Tabela />
      </>
    );
  }
}
const mapDispatchToprops = () => (dispatch) => ({
  dispatchFetch: () => dispatch(allMoedas()),
});
const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,

});
Wallet.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  dispatchFetch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToprops)(Wallet);
