import * as WalletAPI from "../api/wallet.js"
import * as Actions from "../constants/actions.js";

const initiateTransactionFetch = () => {
  return {
    type: Actions.FETCH_TRANSACTION_INITIATE
  };
};

const receivedTransactions = (data) => {
  return {
    type: Actions.FETCH_TRANSACTION_SUCCESS,
    data
  };
};

const fetchTransactionsFailed = (error) => {
  return {
    type: Actions.FETCH_TRANSACTION_FAIL,
    error
  };
};

export const getWalletTransactions = (user_id) => {
  return dispatch => {
    dispatch(initiateTransactionFetch());
    return WalletAPI.getWalletTransactions(user_id)
      .then((response) => {
        dispatch(receivedTransactions(response.data.resource));
      })
      .catch((response) => {
        dispatch(fetchTransactionsFailed(response));
      });
  };
};

export const setLoading = (status) => {
  return {
    type: Actions.SET_ADDING_FUNDS,
    status
  };
};
