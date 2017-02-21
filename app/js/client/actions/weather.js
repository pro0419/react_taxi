import * as WeatherAPI from "../api/weather.js";
import * as LocationAPI from "../api/locations.js"

import {
  FETCH_WEATHER_INITIATE,
  FETCH_WEATHER_SUCCESS,
  FETCH_WEATHER_FAIL
} from "../constants/actions.js";

const initiateWeatherFetch = () => {
  return {
    type: FETCH_WEATHER_INITIATE
  };
};

const receivedWeather = (data) => {
  return {
    type: FETCH_WEATHER_SUCCESS,
    data
  };
};

const locationNotFound = () => {
  return {
    type: LOCATION_NOT_FOUND
  };
}

const fetchWeatherFailed = () => {
  return {
    type: FETCH_WEATHER_FAIL
  };
};

export const getWeather = (lat, lon) => {
  return dispatch => {
    dispatch(initiateWeatherFetch());
    return WeatherAPI.getWeather(lat, lon)
      .then((response) => {
        const { data } = response;
        if(data && data.cod == "404") {
          dispatch(locationNotFound());
        } else {
          dispatch(receivedWeather(data));
        }
        console.log(response);
      })
      .catch((response) => {
        dispatch(fetchWeatherFailed());
      });
  };
};