import axios from "axios";
import { placesAPIConfig } from "../utils/api.js";

export const getPlaces = (lat, lon) => {
  return axios(
    Object.assign(
      {
        method: "post",
        url: "nearby",
        data: {
          lat: lat,
          lng: lon
        }
      }, placesAPIConfig
    )
  );
};

export const getLocationDetails = (lat, lon) => {
  return axios(
    Object.assign(
      {
        method: "post",
        url: "get-location-details",
        data: {
          lat: lat,
          lng: lon
        }
      }, placesAPIConfig
    )
  );
};


