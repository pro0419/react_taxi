import * as LocationAPI from "../api/location.js"
import {
  SET_CURRENT_LOCATION,
  SET_INITIAL_LOCATION,
  FETCH_LAT_LNG_INITIATE,
  RECEIVED_LAT_LNG,
  RECEIVE_LAT_LNG_FAILED
} from "../constants/actions.js";
import { getNearbyParking, getLocation, setLocationAddress, getParkingRules } from "./parking.js";

export const setPosition = (lat, lon) => {
  return {
    type: SET_CURRENT_LOCATION,
    location: {
      lat: lat,
      lon: lon
    }
  };
};

export const setInitialPosition = (lat, lon) => {
  return {
    type: SET_INITIAL_LOCATION,
    location: {
      lat: lat,
      lon: lon
    }
  };
};

const initiateLatLngFetch = () => {
  return {
    type: FETCH_LAT_LNG_INITIATE
  };
};


const receiveLatLngFailed = () => {
  return {
    type: RECEIVE_LAT_LNG_FAILED
  };
};

export const getLocationCoordinates = (address) => {
  return dispatch => {
    dispatch(initiateLatLngFetch());
    return LocationAPI.getLocationCoordinates(address)
      .then((response) => {
        const { data } = response;
        const { results } = data;
        dispatch(setPosition(results[0].geometry.location.lat, results[0].geometry.location.lng));
        dispatch(getNearbyParking(results[0].geometry.location));
        const location = getLocation(response.data.results[0].address_components);
        console.log(location);
        dispatch(setLocationAddress(location));
        dispatch(getParkingRules(location.city, location.state));
      })
      .catch((response) => {
        dispatch(receiveLatLngFailed(response));
      });
  };
};
