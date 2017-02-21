import axios from 'axios';
import {reset} from 'redux-form';

import * as types from '../constants/actionTypes.js';
import * as apiTownship from '../api/api-township.js';
import {API_CONFIG} from '../config/api.js';

const AXIOS_INSTANCE = axios.create(API_CONFIG);

export function fetchBursarParkingPayment(locationCode) {
  const URL = 'pay_for_parking';

  return function(dispatch) {
    dispatch(apiTownship.requestData(types.BURSAR_PARKING_PAYMENT_GET_REQ));
    return AXIOS_INSTANCE.get(URL)
    .then(function(response) {
      dispatch(apiTownship.receiveData(response.data, types.BURSAR_PARKING_PAYMENT_GET_SUCCESS));
    })
    .catch(function(response){
      dispatch(apiTownship.receiveError(response.data, types.BURSAR_PARKING_PAYMENT_GET_ERROR));
    })
  }
}

export function editBursarParkingPayment(data, id) {
  const URL = 'pay_for_parking?ids=' + id;

  return function(dispatch) {
    dispatch(apiTownship.requestData(types.BURSAR_PARKING_PAYMENT_PUT_REQ));
    return AXIOS_INSTANCE.put(URL, data)
    .then(function(response) {
      dispatch(apiTownship.receiveData(response.data, types.BURSAR_PARKING_PAYMENT_PUT_SUCCESS));
      dispatch(reset('parking-payment'));
    })
    .catch(function(response){
      dispatch(apiTownship.receiveError(response.data, types.BURSAR_PARKING_PAYMENT_PUT_ERROR));
      console.log(response);
    })
  }
}

export function createBursarParkingPayment(data) {
  
  const URL = 'pay_for_parking';
  
  return function(dispatch) {
    dispatch(apiTownship.requestData(types.BURSAR_PARKING_PAYMENT_POST_REQ));
    return AXIOS_INSTANCE.post(URL, data)
    .then(function(response) {
      dispatch(apiTownship.receiveData(response.data, types.BURSAR_PARKING_PAYMENT_POST_SUCCESS));
      dispatch(reset('parking-payment'));
    })
    .catch(function(response){
      dispatch(apiTownship.receiveError(response.data, types.BURSAR_PARKING_PAYMENT_POST_ERROR));
    })
  }
}






export function fetchBursarPermitPayment(locationCode) {
  const URL = 'pay_for_permit';

  return function(dispatch) {
    dispatch(apiTownship.requestData(types.BURSAR_PERMIT_PAYMENT_GET_REQ));
    return AXIOS_INSTANCE.get(URL)
    .then(function(response) {
      dispatch(apiTownship.receiveData(response.data, types.BURSAR_PERMIT_PAYMENT_GET_SUCCESS));
    })
    .catch(function(response){
      dispatch(apiTownship.receiveError(response.data, types.BURSAR_PERMIT_PAYMENT_GET_ERROR));
    })
  }
}

export function editBursarPermitPayment(data, id) {
  const URL = 'pay_for_permit?ids=' + id;

  return function(dispatch) {
    dispatch(apiTownship.requestData(types.BURSAR_PERMIT_PAYMENT_PUT_REQ));
    return AXIOS_INSTANCE.put(URL, data)
    .then(function(response) {
      dispatch(apiTownship.receiveData(response.data, types.BURSAR_PERMIT_PAYMENT_PUT_SUCCESS));
      dispatch(reset('permit-payment'));
    })
    .catch(function(response){
      dispatch(apiTownship.receiveError(response.data, types.BURSAR_PERMIT_PAYMENT_PUT_ERROR));
      console.log(response);
    })
  }
}

export function createBursarPermitPayment(data) {
  
  const URL = 'pay_for_permit';
  
  return function(dispatch) {
    dispatch(apiTownship.requestData(types.BURSAR_PERMIT_PAYMENT_POST_REQ));
    return AXIOS_INSTANCE.post(URL, data)
    .then(function(response) {
      dispatch(apiTownship.receiveData(response.data, types.BURSAR_PERMIT_PAYMENT_POST_SUCCESS));
      dispatch(reset('permit-payment'));
    })
    .catch(function(response){
      dispatch(apiTownship.receiveError(response.data, types.BURSAR_PERMIT_PAYMENT_POST_ERROR));
    })
  }
}






export function fetchBursarTicketPayment(locationCode) {
  const URL = 'ticket_payments';

  return function(dispatch) {
    dispatch(apiTownship.requestData(types.BURSAR_TICKET_PAYMENT_GET_REQ));
    return AXIOS_INSTANCE.get(URL)
    .then(function(response) {
      dispatch(apiTownship.receiveData(response.data, types.BURSAR_TICKET_PAYMENT_GET_SUCCESS));
    })
    .catch(function(response){
      dispatch(apiTownship.receiveError(response.data, types.BURSAR_TICKET_PAYMENT_GET_ERROR));
    })
  }
}

export function editBursarTicketPayment(data, id) {
  const URL = 'ticket_payments?ids=' + id;

  return function(dispatch) {
    dispatch(apiTownship.requestData(types.BURSAR_TICKET_PAYMENT_PUT_REQ));
    return AXIOS_INSTANCE.put(URL, data)
    .then(function(response) {
      dispatch(apiTownship.receiveData(response.data, types.BURSAR_TICKET_PAYMENT_PUT_SUCCESS));
      dispatch(reset('ticket-payment'));
    })
    .catch(function(response){
      dispatch(apiTownship.receiveError(response.data, types.BURSAR_TICKET_PAYMENT_PUT_ERROR));
      console.log(response);
    })
  }
}

export function createBursarTicketPayment(data) {
  
  const URL = 'ticket_payments';
  
  return function(dispatch) {
    dispatch(apiTownship.requestData(types.BURSAR_TICKET_PAYMENT_POST_REQ));
    return AXIOS_INSTANCE.post(URL, data)
    .then(function(response) {
      dispatch(apiTownship.receiveData(response.data, types.BURSAR_TICKET_PAYMENT_POST_SUCCESS));
      dispatch(reset('ticket-pay-ment'));
    })
    .catch(function(response){
      dispatch(apiTownship.receiveError(response.data, types.BURSAR_TICKET_PAYMENT_POST_ERROR));
    })
  }
}





export function fetchBursarWalletPayment(locationCode) {
  const URL = 'pay_for_wallet';

  return function(dispatch) {
    dispatch(apiTownship.requestData(types.BURSAR_WALLET_PAYMENT_GET_REQ));
    return AXIOS_INSTANCE.get(URL)
    .then(function(response) {
      dispatch(apiTownship.receiveData(response.data, types.BURSAR_WALLET_PAYMENT_GET_SUCCESS));
    })
    .catch(function(response){
      dispatch(apiTownship.receiveError(response.data, types.BURSAR_WALLET_PAYMENT_GET_ERROR));
    })
  }
}

export function editBursarWalletPayment(data, id) {
  const URL = 'pay_for_wallet?ids=' + id;

  return function(dispatch) {
    dispatch(apiTownship.requestData(types.BURSAR_WALLET_PAYMENT_PUT_REQ));
    return AXIOS_INSTANCE.put(URL, data)
    .then(function(response) {
      dispatch(apiTownship.receiveData(response.data, types.BURSAR_WALLET_PAYMENT_PUT_SUCCESS));
      dispatch(reset('wallet-payment'));
    })
    .catch(function(response){
      dispatch(apiTownship.receiveError(response.data, types.BURSAR_WALLET_PAYMENT_PUT_ERROR));
      console.log(response);
    })
  }
}

export function createBursarWalletPayment(data) {
  
  const URL = 'pay_for_wallet';
  
  return function(dispatch) {
    dispatch(apiTownship.requestData(types.BURSAR_WALLET_PAYMENT_POST_REQ));
    return AXIOS_INSTANCE.post(URL, data)
    .then(function(response) {
      dispatch(apiTownship.receiveData(response.data, types.BURSAR_WALLET_PAYMENT_POST_SUCCESS));
      dispatch(reset('wallet-payment'));
    })
    .catch(function(response){
      dispatch(apiTownship.receiveError(response.data, types.BURSAR_WALLET_PAYMENT_POST_ERROR));
    })
  }
}






export function fetchBursarTicketRates(locationCode) {
  const URL = 'parking_violations';

  return function(dispatch) {
    dispatch(apiTownship.requestData(types.BURSAR_TICKET_RATES_GET_REQ));
    return AXIOS_INSTANCE.get(URL)
    .then(function(response) {
      dispatch(apiTownship.receiveData(response.data, types.BURSAR_TICKET_RATES_GET_SUCCESS));
    })
    .catch(function(response){
      dispatch(apiTownship.receiveError(response.data, types.BURSAR_TICKET_RATES_GET_ERROR));
    })
  }
}

export function editBursarTicketRates(data, id) {
  const URL = 'parking_violations?ids=' + id;

  return function(dispatch) {
    dispatch(apiTownship.requestData(types.BURSAR_TICKET_RATES_PUT_REQ));
    return AXIOS_INSTANCE.put(URL, data)
    .then(function(response) {
      dispatch(apiTownship.receiveData(response.data, types.BURSAR_TICKET_RATES_PUT_SUCCESS));
      dispatch(reset('ticket-rates'));
    })
    .catch(function(response){
      dispatch(apiTownship.receiveError(response.data, types.BURSAR_TICKET_RATES_PUT_ERROR));
      console.log(response);
    })
  }
}

export function createBursarTicketRates(data) {
  
  const URL = 'parking_violations';
  
  return function(dispatch) {
    dispatch(apiTownship.requestData(types.BURSAR_TICKET_RATES_POST_REQ));
    return AXIOS_INSTANCE.post(URL, data)
    .then(function(response) {
      dispatch(apiTownship.receiveData(response.data, types.BURSAR_TICKET_RATES_POST_SUCCESS));
      dispatch(reset('ticket-rates'));
    })
    .catch(function(response){
      dispatch(apiTownship.receiveError(response.data, types.BURSAR_TICKET_RATES_POST_ERROR));
    })
  }
}


export function resetLoading() {
  return {
    type: types.RESET_LOADING
  };
}



