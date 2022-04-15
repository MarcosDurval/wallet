// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { VALOR, EXPENSE, DELETE, EDIT } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editId: undefined,

};

const wallet = (state = INITIAL_STATE, actions) => {
  switch (actions.type) {
  case VALOR:
    return { ...state,
      currencies: Object.keys(actions.payload).filter((a) => a !== 'USDT') };
  case EXPENSE:
    return { ...state, expenses: actions.payload };
  case DELETE:
    return { ...state,
      expenses:
      state.expenses.filter((item) => item.id !== actions.payload) };
  case EDIT:
    return { ...state,
      editId:
      state.expenses.find((item) => item.id === actions.payload.id) };
  default:
    return state;
  }
};

export default wallet;
