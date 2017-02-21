import axios from 'axios';
import {reset} from 'redux-form';

import * as types from '../constants/actionTypes.js';
import * as apiTownship from '../api/api-township.js';
import {API_CONFIG} from '../config/api.js';

const AXIOS_INSTANCE = axios.create(API_CONFIG);

export function fetchInspectorParkingField(townshipCode) {
  const URL = `parked_cars?filter=(township_code=${townshipCode})`;

  return function(dispatch) {
    dispatch(apiTownship.requestData(types.INSPECTOR_PARKING_FIELD_GET_REQ));
    return AXIOS_INSTANCE.get(URL)
    .then(function(response) {
      dispatch(apiTownship.receiveData(response.data, types.INSPECTOR_PARKING_FIELD_GET_SUCCESS));
    })
    .catch(function(response){
      dispatch(apiTownship.receiveError(response.data, types.INSPECTOR_PARKING_FIELD_GET_ERROR));
    })
  }
}

export function editInspectorParkingField(data, id) {
  const URL = `parked_cars?ids=` + id;

  return function(dispatch) {
    dispatch(apiTownship.requestData(types.INSPECTOR_PARKING_FIELD_PUT_REQ));
    return AXIOS_INSTANCE.put(URL, data)
    .then(function(response) {
      dispatch(apiTownship.receiveData(response.data, types.INSPECTOR_PARKING_FIELD_PUT_SUCCESS));
      dispatch(reset(`parking-field-edit`));
    })
    .catch(function(response) {
      dispatch(apiTownship.receiveError(response.data, types.INSPECTOR_PARKING_FIELD_PUT_ERROR));
      console.log(response);
    })
  }
}

export function createInspectorParkingField(data) {
  
  const URL = `parked_cars`;
  
  return function(dispatch) {
    dispatch(apiTownship.requestData(types.INSPECTOR_PARKING_FIELD_POST_REQ));
    return AXIOS_INSTANCE.post(URL, data)
    .then(function(response) {
      dispatch(apiTownship.receiveData(response.data, types.INSPECTOR_PARKING_FIELD_POST_SUCCESS));
      dispatch(reset(`parking-payment`));
    })
    .catch(function(response){
      console.log(response);
      dispatch(apiTownship.receiveError(response.data, types.INSPECTOR_PARKING_FIELD_POST_ERROR));
    })
  }
}

export function fetchInspectorPlate(townshipCode) {
  const URL = `parked_cars`;

  return function(dispatch) {
    dispatch(apiTownship.requestData(types.INSPECTOR_PLATE_GET_REQ));
    return AXIOS_INSTANCE.get(URL)
    .then(function(response) {
      dispatch(apiTownship.receiveData(response.data, types.INSPECTOR_PLATE_GET_SUCCESS));
    })
    .catch(function(response){
      dispatch(apiTownship.receiveError(response.data, types.INSPECTOR_PLATE_GET_ERROR));
    })
  }
}

export function editInspectorPlate(data, id) {
  const URL = `parked_cars?ids=` + id;

  return function(dispatch) {
    dispatch(apiTownship.requestData(types.INSPECTOR_PLATE_PUT_REQ));
    return AXIOS_INSTANCE.put(URL, data)
    .then(function(response) {
      dispatch(apiTownship.receiveData(response.data, types.INSPECTOR_PLATE_PUT_SUCCESS));
      dispatch(reset(`parking-payment`));
    })
    .catch(function(response){
      dispatch(apiTownship.receiveError(response.data, types.INSPECTOR_PLATE_PUT_ERROR));
      console.log(response);
    })
  }
}

export function createInspectorPlate(data) {
  
  const URL = `parked_cars`;
  
  return function(dispatch) {
    dispatch(apiTownship.requestData(types.INSPECTOR_PLATE_POST_REQ));
    return AXIOS_INSTANCE.post(URL, data)
    .then(function(response) {
      dispatch(apiTownship.receiveData(response.data, types.INSPECTOR_PLATE_POST_SUCCESS));
      dispatch(reset(`parking-payment`));
    })
    .catch(function(response){
      dispatch(apiTownship.receiveError(response.data, types.INSPECTOR_PLATE_POST_ERROR));
    })
  }
}

export function fetchInspectorTicket(townshipCode) {
  const URL = `parking_violations?filter=(township_code=${townshipCode})`;

  return function(dispatch) {
    dispatch(apiTownship.requestData(types.INSPECTOR_PARKING_FIELD_GET_REQ));
    return AXIOS_INSTANCE.get(URL)
    .then(function(response) {
      dispatch(apiTownship.receiveData(response.data, types.INSPECTOR_TICKET_GET_SUCCESS));
    })
    .catch(function(response){
      dispatch(apiTownship.receiveError(response.data, types.INSPECTOR_TICKET_GET_ERROR));
    })
  }
}

export function editInspectorTicket(data, id) {
  const URL = `parking_violations?ids=` + id;

  return function(dispatch) {
    dispatch(apiTownship.requestData(types.INSPECTOR_TICKET_PUT_REQ));
    return AXIOS_INSTANCE.put(URL, data)
    .then(function(response) {
      dispatch(apiTownship.receiveData(response.data, types.INSPECTOR_TICKET_PUT_SUCCESS));
      dispatch(reset(`parking-payment`));
    })
    .catch(function(response){
      dispatch(apiTownship.receiveError(response.data, types.INSPECTOR_TICKET_PUT_ERROR));
      console.log(response);
    })
  }
}

export function createInspectorTicket(data) {
  
  const URL = `parking_violations`;
  
  return function(dispatch) {
    dispatch(apiTownship.requestData(types.INSPECTOR_TICKET_POST_REQ));
    return AXIOS_INSTANCE.post(URL, data)
    .then(function(response) {
      dispatch(apiTownship.receiveData(response.data, types.INSPECTOR_TICKET_POST_SUCCESS));
      dispatch(reset(`parking-payment`));
    })
    .catch(function(response){
      dispatch(apiTownship.receiveError(response.data, types.INSPECTOR_TICKET_POST_ERROR));
    })
  }
}

export function updateMapView(data) {
  /*
  return function(dispatch) {
    dispatch(apiTownship.requestData(types.INSPECTOR_TICKET_POST_REQ));
  }
  */

  return {
    type: 'UPDATE_MAP_VIEW',
    data: data
  }
}


export function resetLoading() {
  return {
    type: types.RESET_LOADING
  };
}



