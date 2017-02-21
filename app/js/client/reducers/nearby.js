import { combineReducers } from "redux";
import Location from "./location.js";
import LocationsList from "./locations.js";
import { NearByPlacesError, GenericError } from "../constants/texts.js";

const initialState = {
  loading: false,
  location: "",
  errorMessage: ""
};

const NearbyPlaces = (state = initialState, action) => {
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
    default:
      return state;
  }
};

const NearbyPlacesReducers = combineReducers({
  nearbyPlaces : NearbyPlaces,
  location: Location,
  LocationsList : LocationsList
});

export default NearbyPlacesReducers;