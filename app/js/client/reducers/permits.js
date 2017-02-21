import { combineReducers } from 'redux';

const initialState = {
  loading: false,
  permitList: [],
  locations: {},
  errorMessage: null
};

const Permits = (state = initialState, action) => {
  switch(action.type) {
    case "FETCH_PERMITS_INITIATE":
      return {
        ...state,
        loading: true
      }
    case "FETCH_PERMITS_FAIL":
      return {
        ...state,
        loading: false,
        errorMessage: action.data
      };
    case "FETCH_PERMITS_SUCCESS":
      return {
        ...state,
        loading: false,
        permitList: action.data
      };
    case "FETCH_LOCATIONS_SUCCESS":
      return {
        ...state,
        locations: action.locations
      };
    case "FETCH_LOCATIONS_FAIL":
      return {
        ...state,
        errorMessage: action.data
      };
    default:
      return state;
  }
};

const PermitReducers = combineReducers({
  Permits
});

export default PermitReducers;