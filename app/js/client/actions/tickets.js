import * as TicketsAPI from "../api/tickets.js"
import * as Actions from "../constants/actions.js";

const initiateFetch = () => {
  return {
    type: Actions.FETCH_TICKETS_INITIATE
  };
};

const ticketsRetrieved = (data) => {
  return {
    type: Actions.FETCH_TICKETS_SUCCESS,
    data
  };
};


const ticketsRetrievalFailed = (error) => {
  return {
    type: Actions.FETCH_TICKETS_FAIL,
    error
  };
};

export const getTickets = (user_id) => {
  return dispatch => {
    dispatch(initiateFetch());
    return TicketsAPI.getTickets(user_id)
      .then((response) => {
        const { data } = response;
        dispatch(ticketsRetrieved(data.resource));
      })
      .catch((response) => {
        dispatch(ticketsRetrievalFailed());
      });
  }
};

export const setModalData = (modalData) => {
  return {
    type: Actions.SET_MODAL_DATA,
    modalData
  };
}