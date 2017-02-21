import axios from "axios";
import * as Config from "../utils/api.js";
import { locationAPIConfig } from "../utils/api.js";

export const getLocations = (user_id) => {
  return axios(
    Object.assign(
      {
        method: "get",
        url: "/new_pzly02live7/_table/user_locations?filter=user_id="+user_id
      }, Config.APIConfig
    )
  );
};

export const addLocation = (locationInfo) => {
  const { lat, lng, location_address, location_name, user_id } = locationInfo;
  const newLocation = {
    lat: lat,
    lng: lng,
    location_address: location_address,
    location_name: location_name,
    user_id: user_id
  };
  return axios(
    Object.assign(
      {
        method: "post",
        url: "/new_pzly02live7/_table/user_locations",
        data : newLocation
      }, Config.APIConfig
    )
  );
};

export const deleteLocation = (id) => {
  return axios(
    Object.assign(
      {
        method: "delete",
        url: "/new_pzly02live7/_table/user_locations",
        data:{
          id: id
        }
      }, Config.APIConfig
    )
  );
};

export const searchNewLocation = (name_keyword) => {
  return axios(
    Object.assign(
      {
        method: "get",
        url: "json?address=" + name_keyword
      }, locationAPIConfig
    )
  );
};
