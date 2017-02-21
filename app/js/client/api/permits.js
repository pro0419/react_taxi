import axios from "axios";
import * as Config from "../utils/api.js";

export const getPermits = (user_id) => {
  return axios(
    Object.assign(
      {
        method: "get",
        url: "/new_pzly02live7/_table/subscriptions?filter=user_id="+user_id
      }, Config.APIConfig
    )
  );
};

export const getLocations = () => {
  return axios(
    Object.assign(
      {
        method: "get",
        url: "/new_pzly02live7/_table/manage_locations"
      }, Config.APIConfig
    )
  );
};
