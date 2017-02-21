import axios from 'axios';
import {reset} from 'redux-form';

import * as types from '../constants/actionTypes.js';
import * as apiTownship from '../api/api-township.js';
import {API_CONFIG} from '../config/api.js';

const AXIOS_INSTANCE = axios.create(API_CONFIG);


export function fetchTownshipSchemeTypes(townshipCode) {
  const URL = 'scheme_type';

  return function(dispatch) {
    dispatch(apiTownship.requestData(types.TOWNSHIP_SCHEME_TYPES_GET_REQ));
    return AXIOS_INSTANCE.get(URL)
    .then(function(response) {
      dispatch(apiTownship.receiveData(response.data, types.TOWNSHIP_SCHEME_TYPES_GET_SUCCESS));
    })
    .catch(function(response){
      dispatch(apiTownship.receiveError(response.data, types.TOWNSHIP_SCHEME_TYPES_GET_ERROR));
    })
  }
}

// Generic
export function fetchData(table) {
  const URL = table; //?filter=(township_code=${townshipCode})&include_schema=true

  return function(dispatch) {
    dispatch(apiTownship.requestData(types.DATA_GET_REQ));
    return AXIOS_INSTANCE.get(URL)
    .then(function(response) {
      dispatch(apiTownship.receiveData(response.data, types.DATA_GET_SUCCESS));
    })
    .catch(function(response){
      console.log(response);
      dispatch(apiTownship.receiveError(response, types.DATA_GET_ERROR));
    })
  }
}

export function editData(table, id, data, componentFunction) {
  const URL = `${table}&ids=${id}`;
  return function(dispatch) {
    dispatch(apiTownship.requestData(types.DATA_PUT_REQ));
    return AXIOS_INSTANCE.put(URL, data)
    .then(function(response) {
      if(componentFunction) {
        componentFunction();
      }
      dispatch(apiTownship.receiveData(response.data, types.DATA_PUT_SUCCESS));
    })
    .catch(function(response){
      dispatch(apiTownship.receiveError(response.data, types.DATA_PUT_ERROR));
      console.log(response);
    })
  }
}

export function createData(table, data, componentFunction) {
  const URL = table;
  
  return function(dispatch) {
    dispatch(apiTownship.requestData(types.DATA_POST_REQ));
    return AXIOS_INSTANCE.post(URL, data)
    .then(function(response) {
      if(componentFunction) {
        componentFunction();
      }
      dispatch(apiTownship.receiveData(response.data, types.DATA_POST_SUCCESS));
      console.log(response);
    })
    .catch(function(response){
      dispatch(apiTownship.receiveError(response.data, types.DATA_POST_ERROR));
      console.log(response);
    })
  }
}

export function resetLoading() {
  return {
    type: types.RESET_LOADING
  };
}