import { combineReducers } from "redux";
import { GenericError } from "../constants/texts.js";

const initialState = {
    loading: false,
    current_location: "",
    locationsList: [],
    errorMessage: ""
}

const NewLocation = (state = initialState, action) => {
    console.log(action);
  switch(action.type) {
    case "FETCH_LOCATION_DETAILS_INITIATE":
      return {
        ...state,
        loading: true
      };
    case "FETCH_LOCATION_DETAILS_SUCCESS":
      return {
        ...state,
        loading : false,
        current_location: action.data
      };
    case "FETCH_LOCATION_DETAILS_FAIL":
      return {
        ...state,
        loading : false,
        errorMessage: GenericError
      };
    case "SEARCH_LOCATION_INITIATE":
      return {
        ...state,
        loading: true
      }
    case "SEARCH_LOCATION_SUCCESS":
      return {
        ...state,
        loading : false,
        locationsList: action.data
      }
    case "LOCATION_NOT_FOUND":
      return {
        ...state,
        loading: false,
        errorMessage: SearchLocationError
      }
    case "SEARCH_LOCATION_FAILS":
      return {
        ...state,
        loading : false,
        errorMessage: action.errorMessage
      }
    default:
      return state;
  }
};

const NewLocationReducers = combineReducers({
  newLocation : NewLocation,
});

export default NewLocationReducers;