import * as types from '../constants/actionTypes.js';
import _ from 'lodash';

const initialState = {
  isLoading: true,
  data: [],
  error: false
};

export function bursarParkingPaymentFetched(state = initialState, action) {
  switch(action.type) {
    case types.BURSAR_PARKING_PAYMENT_GET_ERROR:
      return _.assign({}, state, {isLoading: false, data: action.data, error: true});
    case types.BURSAR_PARKING_PAYMENT_GET_SUCCESS:
      return _.assign({}, state, {isLoading: false, data: action.data, error: false });
    case types.BURSAR_PARKING_PAYMENT_GET_REQ:
      return _.assign({}, state, {isLoading: true, error: false });
    default:
      return state;
  }
};

export function bursarParkingPaymentEdited(state = initialState, action) {
  switch(action.type) {
    case types.BURSAR_PARKING_PAYMENT_PUT_ERROR:
      return _.assign({}, state, {isLoading: false, data: action.data, error: true});
    case types.BURSAR_PARKING_PAYMENT_PUT_SUCCESS:
      return _.assign({}, state, {isLoading: false, data: action.data, error: false });
    case types.BURSAR_PARKING_PAYMENT_PUT_REQ:
      return _.assign({}, state, {isLoading: true, error: false });
    case types.RESET_LOADING:
      return _.assign({}, state, initialState);
    default:
      return state;
  }
}

export function bursarParkingPaymentCreated(state = initialState, action) {
  switch(action.type) {
    case types.BURSAR_PARKING_PAYMENT_POST_ERROR:
      return _.assign({}, state, {isLoading: false, data: action.data, error: true});
    case types.BURSAR_PARKING_PAYMENT_POST_SUCCESS:
      return _.assign({}, state, {isLoading: false, data: action.data, error: false });
    case types.BURSAR_PARKING_PAYMENT_POST_REQ:
      return _.assign({}, state, {isLoading: true, error: false });
    case types.RESET_LOADING:
      return _.assign({}, state, initialState);
    default:
      return state;
  }
}





export function bursarPermitPaymentFetched(state = initialState, action) {
  switch(action.type) {
    case types.BURSAR_PERMIT_PAYMENT_GET_ERROR:
      return _.assign({}, state, {isLoading: false, data: action.data, error: true});
    case types.BURSAR_PERMIT_PAYMENT_GET_SUCCESS:
      return _.assign({}, state, {isLoading: false, data: action.data, error: false });
    case types.BURSAR_PERMIT_PAYMENT_GET_REQ:
      return _.assign({}, state, {isLoading: true, error: false });
    default:
      return state;
  }
};

export function bursarPermitPaymentEdited(state = initialState, action) {
  switch(action.type) {
    case types.BURSAR_PERMIT_PAYMENT_PUT_ERROR:
      return _.assign({}, state, {isLoading: false, data: action.data, error: true});
    case types.BURSAR_PERMIT_PAYMENT_PUT_SUCCESS:
      return _.assign({}, state, {isLoading: false, data: action.data, error: false });
    case types.BURSAR_PERMIT_PAYMENT_PUT_REQ:
      return _.assign({}, state, {isLoading: true, error: false });
    case types.RESET_LOADING:
      return _.assign({}, state, initialState);
    default:
      return state;
  }
}

export function bursarPermitPaymentCreated(state = initialState, action) {
  switch(action.type) {
    case types.BURSAR_PERMIT_PAYMENT_POST_ERROR:
      return _.assign({}, state, {isLoading: false, data: action.data, error: true});
    case types.BURSAR_PERMIT_PAYMENT_POST_SUCCESS:
      return _.assign({}, state, {isLoading: false, data: action.data, error: false });
    case types.BURSAR_PERMIT_PAYMENT_POST_REQ:
      return _.assign({}, state, {isLoading: true, error: false });
    case types.RESET_LOADING:
      return _.assign({}, state, initialState);
    default:
      return state;
  }
}





export function bursarTicketPaymentFetched(state = initialState, action) {
  switch(action.type) {
    case types.BURSAR_TICKET_PAYMENT_GET_ERROR:
      return _.assign({}, state, {isLoading: false, data: action.data, error: true});
    case types.BURSAR_TICKET_PAYMENT_GET_SUCCESS:
      return _.assign({}, state, {isLoading: false, data: action.data, error: false });
    case types.BURSAR_TICKET_PAYMENT_GET_REQ:
      return _.assign({}, state, {isLoading: true, error: false });
    default:
      return state;
  }
};

export function bursarTicketPaymentEdited(state = initialState, action) {
  switch(action.type) {
    case types.BURSAR_TICKET_PAYMENT_PUT_ERROR:
      return _.assign({}, state, {isLoading: false, data: action.data, error: true});
    case types.BURSAR_TICKET_PAYMENT_PUT_SUCCESS:
      return _.assign({}, state, {isLoading: false, data: action.data, error: false });
    case types.BURSAR_TICKET_PAYMENT_PUT_REQ:
      return _.assign({}, state, {isLoading: true, error: false });
    case types.RESET_LOADING:
      return _.assign({}, state, initialState);
    default:
      return state;
  }
}

export function bursarTicketPaymentCreated(state = initialState, action) {
  switch(action.type) {
    case types.BURSAR_TICKET_PAYMENT_POST_ERROR:
      return _.assign({}, state, {isLoading: false, data: action.data, error: true});
    case types.BURSAR_TICKET_PAYMENT_POST_SUCCESS:
      return _.assign({}, state, {isLoading: false, data: action.data, error: false });
    case types.BURSAR_TICKET_PAYMENT_POST_REQ:
      return _.assign({}, state, {isLoading: true, error: false });
    case types.RESET_LOADING:
      return _.assign({}, state, initialState);
    default:
      return state;
  }
}





export function bursarWalletPaymentFetched(state = initialState, action) {
  switch(action.type) {
    case types.BURSAR_WALLET_PAYMENT_GET_ERROR:
      return _.assign({}, state, {isLoading: false, data: action.data, error: true});
    case types.BURSAR_WALLET_PAYMENT_GET_SUCCESS:
      return _.assign({}, state, {isLoading: false, data: action.data, error: false });
    case types.BURSAR_WALLET_PAYMENT_GET_REQ:
      return _.assign({}, state, {isLoading: true, error: false });
    default:
      return state;
  }
};

export function bursarWalletPaymentEdited(state = initialState, action) {
  switch(action.type) {
    case types.BURSAR_WALLET_PAYMENT_PUT_ERROR:
      return _.assign({}, state, {isLoading: false, data: action.data, error: true});
    case types.BURSAR_WALLET_PAYMENT_PUT_SUCCESS:
      return _.assign({}, state, {isLoading: false, data: action.data, error: false });
    case types.BURSAR_WALLET_PAYMENT_PUT_REQ:
      return _.assign({}, state, {isLoading: true, error: false });
    case types.RESET_LOADING:
      return _.assign({}, state, initialState);
    default:
      return state;
  }
}

export function bursarWalletPaymentCreated(state = initialState, action) {
  switch(action.type) {
    case types.BURSAR_WALLET_PAYMENT_POST_ERROR:
      return _.assign({}, state, {isLoading: false, data: action.data, error: true});
    case types.BURSAR_WALLET_PAYMENT_POST_SUCCESS:
      return _.assign({}, state, {isLoading: false, data: action.data, error: false });
    case types.BURSAR_WALLET_PAYMENT_POST_REQ:
      return _.assign({}, state, {isLoading: true, error: false });
    case types.RESET_LOADING:
      return _.assign({}, state, initialState);
    default:
      return state;
  }
}




export function bursarTicketRatesFetched(state = initialState, action) {
  switch(action.type) {
    case types.BURSAR_TICKET_RATES_GET_ERROR:
      return _.assign({}, state, {isLoading: false, data: action.data, error: true});
    case types.BURSAR_TICKET_RATES_GET_SUCCESS:
      return _.assign({}, state, {isLoading: false, data: action.data, error: false });
    case types.BURSAR_TICKET_RATES_GET_REQ:
      return _.assign({}, state, {isLoading: true, error: false });
    default:
      return state;
  }
};

export function bursarTicketRatesEdited(state = initialState, action) {
  switch(action.type) {
    case types.BURSAR_TICKET_RATES_PUT_ERROR:
      return _.assign({}, state, {isLoading: false, data: action.data, error: true});
    case types.BURSAR_TICKET_RATES_PUT_SUCCESS:
      return _.assign({}, state, {isLoading: false, data: action.data, error: false });
    case types.BURSAR_TICKET_RATES_PUT_REQ:
      return _.assign({}, state, {isLoading: true, error: false });
    case types.RESET_LOADING:
      return _.assign({}, state, initialState);
    default:
      return state;
  }
}

export function bursarTicketRatesCreated(state = initialState, action) {
  switch(action.type) {
    case types.BURSAR_TICKET_RATES_POST_ERROR:
      return _.assign({}, state, {isLoading: false, data: action.data, error: true});
    case types.BURSAR_TICKET_RATES_POST_SUCCESS:
      return _.assign({}, state, {isLoading: false, data: action.data, error: false });
    case types.BURSAR_TICKET_RATES_POST_REQ:
      return _.assign({}, state, {isLoading: true, error: false });
    case types.RESET_LOADING:
      return _.assign({}, state, initialState);
    default:
      return state;
  }
}

