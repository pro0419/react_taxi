import { combineReducers } from "redux";
import LocationsList from "./locations.js";
import { WeatherLocationError, GenericError } from "../constants/texts.js";

const initialState = {
  loading: false,
  weatherData: null,
  errorMessage: ""
};

const Weather = (state = initialState, action) => {
  switch(action.type) {
    case "FETCH_WEATHER_INITIATE":
      return {
        ...state,
        loading: true
      }
    case "FETCH_WEATHER_SUCCESS":
      return {
        ...state,
        loading : false,
        weatherData: action.data
      };
    case "LOCATION_NOT_FOUND":
      return {
        ...state,
        loading: false,
        errorMessage: WeatherLocationError
      }
    case "FETCH_WEATHER_FAIL":
      return {
        ...state,
        loading: false,
        errorMessage: GenericError
      }
    default:
      return state;
  }
};

const WeatherReducers = combineReducers({
  Weather : Weather,
  LocationsList : LocationsList
});

export default WeatherReducers;