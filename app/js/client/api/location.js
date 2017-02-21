import axios from "axios";
import { placesAPIConfig } from "../utils/api.js";

export const getLocationCoordinates = (address) => {
  return axios(
    Object.assign(
      {
        method: "post",
        url: "get-location-coordinates",
        data: {
          address: encodeURIComponent(address)
        }
      }, placesAPIConfig
    )
  );
};