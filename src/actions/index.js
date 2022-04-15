import fetchApi from '../serviceApi/fetchApi';

// Coloque aqui suas actions
export const LOGIN = 'LOGIN';
export const VALOR = 'VALOR';
export const EXPENSE = 'EXPENSE';
export const DELETE = 'DELETE';
export const EDIT = 'EDIT';

export const recordUser = (user) => ({ type: LOGIN, user });

export const moedas = (payload) => ({ type: VALOR, payload });

export const despesaUser = (payload) => ({ type: EXPENSE, payload });

export const deleteUser = (payload) => ({ type: DELETE, payload });

export const editDepesa = (payload) => ({ type: EDIT, payload });

export const allMoedas = () => (dispatch) => {
  fetchApi().then((data) => {
    delete data.USDT;
    dispatch(moedas(data));
  });
};
