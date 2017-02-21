import { combineReducers } from "redux";
import Location from "./location.js";
import LocationsList from "./locations.js";
import { NearByPlacesError, GenericError } from "../constants/texts.js";

const initialState = {
  loading: false,
  location: "",
  errorMessage: "",
  origin: "",
  destination: "",
  traffic: "",
};

const Traffics = (state = initialState, action) => {
  switch(action.type) {
    case "FETCH_LOCATION_DETAILS_INITIATE":
      return {
        ...state,
        loading: true
      }
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
      }
    case "SET_TRAFFIC_ORIGIN":
      return {
        ...state,
        loading : false,
        origin: action.data
      };
    case "SET_TRAFFIC_DESTINATION":
      return {
        ...state,
        loading : false,
        destination: action.data
      };
    case "SET_TRAFFIC_RESULT":
      return {
        ...state,
        loading : false,
        traffic: action.data
      };
    default:
      return state;
  }
};

const TrafficReducers = combineReducers({
  traffic : Traffics,
  location: Location,
  LocationsList : LocationsList
});

export default TrafficReducers;