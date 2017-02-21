import { combineReducers } from 'redux';

const initialState = {
  loading: false,
  ticketList: [],
  selectedTicket: {},
  errorMessage: null
};

const Tickets = (state = initialState, action) => {
  switch(action.type) {
    case "FETCH_TICKETS_INITIATE":
      return {
        ...state,
        loading: true
      }
    case "FETCH_TICKETS_SUCCESS":
      return {
        ...state,
        loading: false,
        ticketList: action.data
      };
    case "FETCH_TICKETS_FAIL":
      return {
        ...state,
        loading: false,
        errorMessage: action.data
      };
    case "SET_MODAL_DATA":
      return {
        ...state,
        selectedTicket: action.modalData
      }
    default:
      return state;
  }
};

const TicketReducers = combineReducers({
  Tickets
});

export default TicketReducers;