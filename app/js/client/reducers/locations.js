import { combineReducers } from 'redux';

const initialState = {
  loading: false,
  locationsList: [],
  errorMessage: ""
};

const Locations = (state = initialState, action) => {
  switch(action.type) {
    case "FETCH_LOCATION_INITIATE":
      return {
        ...state,
        loading: true
      }
    case "FETCH_LOCATION_SUCCESS":
      return {
        ...state,
        loading : false,
        locationsList: action.data
      };
    case "FETCH_LOCATION_FAIL":
      return {
        ...state,
        loading : false,
        errorMessage: action.errorMessage
      }
    default:
      return state;
  }
};

const LocationsReducers = combineReducers({
  Locations
});

export default LocationsReducers;