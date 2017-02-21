import { combineReducers } from "redux";
import Location from "./location.js";
import LocationsList from "./locations.js";
import { GenericError } from "../constants/texts.js";

const initialState = {
  loading: false,
  location: "",
  mode: "",
  origin: "",
  destination: "",
  directions: "",
  errorMessage: ""
};

const Directions = (state = initialState, action) => {
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
        location: action.data
      };
    case "FETCH_LOCATION_DETAILS_FAIL":
      return {
        ...state,
        loading : false,
        errorMessage: GenericError
      };
    case "SET_DIRECTIONS_MODE":
      return {
        ...state,
        loading : false,
        mode: action.data
      };
    case "SET_DIRECTIONS_ORIGIN":
      return {
        ...state,
        loading : false,
        origin: action.data
      };
    case "SET_DIRECTIONS_DESTINATION":
      return {
        ...state,
        loading : false,
        destination: action.data
      };
    case "SET_DIRECTIONS_RESULT":
      return {
        ...state,
        loading : false,
        directions: action.data
      };
    default:
      return state;
  }
};

const TransitReducers = combineReducers({
  directions : Directions,
  location: Location,
  LocationsList : LocationsList
});

export default TransitReducers;