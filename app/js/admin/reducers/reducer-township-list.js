import * as types from '../constants/actionTypes.js'
import _ from 'lodash';

const initialState = {
  isLoading: true,
  data: [],
  error: false
};

export function townshipListFetched(state = initialState, action) {
  switch(action.type) {
    case types.TOWNSHIP_FETCH_GET_ERROR:
      return _.assign({}, state, {isLoading: false, data: action.data, error: true});
    case types.TOWNSHIP_FETCH_GET_SUCCESS:
      return _.assign({}, state, {isLoading: false, data: action.data, error: false });
    case types.TOWNSHIP_FETCH_GET_REQ:
      return _.assign({}, state, {isLoading: true, error: false });
    default:
      return state;
  }
};

export function townshipListEdited(state = initialState, action) {
  switch(action.type) {
    case types.TOWNSHIP_EDIT_PUT_ERROR:
      return _.assign({}, state, {isLoading: false, data: action.data, error: true});
    case types.TOWNSHIP_EDIT_PUT_SUCCESS:
      return _.assign({}, state, {isLoading: false, data: action.data, error: false });
    case types.TOWNSHIP_EDIT_PUT_REQ:
      return _.assign({}, state, {isLoading: true, error: false });
    case types.RESET_LOADING:
      return _.assign({}, state, initialState);
    default:
      return state;
  }
}

export function townshipImageEdited(state = initialState, action) {
  switch(action.type) {
    case types.TOWNSHIP_IMAGE_PUT_ERROR:
      return _.assign({}, state, {isLoading: false, data: action.data, error: true});
    case types.TOWNSHIP_IMAGE_PUT_SUCCESS:
      return _.assign({}, state, {isLoading: false, data: action.data, error: false });
    case types.TOWNSHIP_IMAGE_PUT_REQ:
      return _.assign({}, state, {isLoading: true, error: false });
    case types.RESET_LOADING:
      return _.assign({}, state, initialState);
    default:
      return state;
  }
}

export function townshipCreate(state = initialState, action) {
  switch(action.type) {
    case types.TOWNSHIP_CREATE_POST_ERROR:
      return _.assign({}, state, {isLoading: false, data: action.data, error: true});
    case types.TOWNSHIP_CREATE_POST_SUCCESS:
      return _.assign({}, state, {isLoading: false, data: action.data, error: false });
    case types.TOWNSHIP_CREATE_POST_REQ:
      return _.assign({}, state, {isLoading: true, error: false });
    case types.RESET_LOADING:
      return _.assign({}, state, initialState);
    default:
      return state;
  }
}


export function townshipDetailsFetched(state = initialState, action) {
  switch(action.type) {
    case types.DETAILS_FETCH_GET_ERROR:
      return _.assign({}, state, {isLoading: false, data: action.data, error: true});
    case types.DETAILS_FETCH_GET_SUCCESS:
      return _.assign({}, state, {isLoading: false, data: action.data, error: false });
    case types.DETAILS_FETCH_GET_REQ:
      return _.assign({}, state, {isLoading: true, error: false });
    case types.RESET_LOADING:
      return _.assign({}, state, initialState);
    default:
      return state;
  }
}

export function uploadedImage(state = initialState, action) {
  switch(action.type) {
    case types.UPLOAD_TOWNSHIP_IMAGE_ERROR:
      return _.assign({}, state, {isLoading: false, data: action.data, error: true});
    case types.UPLOAD_TOWNSHIP_IMAGE_SUCCESS:
      return _.assign({}, state, {isLoading: false, data: action.data, error: false });
    case types.UPLOAD_TOWNSHIP_IMAGE_REQ:
      return _.assign({}, state, {isLoading: true, error: false });
    case types.RESET_LOADING:
      return _.assign({}, state, initialState);
    default:
      return state;
  }
}

const initialStateDetails = {
  resetDetails: false,
  data: null,
  error: false
};

export function townshipDetails(state = initialStateDetails, action) {
    switch(action.type) {
    case 'SEND_TOWNSHIP_DETAILS':
      return _.assign({}, state, {resetDetails: false, data: action.data, error: false});
    default:
      return state;
    }
}
