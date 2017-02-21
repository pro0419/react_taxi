import axios from "axios";
import { APIConfig, placesAPIConfig } from "../utils/api.js";

export const getParkedVehicles = (userId) => {
  return axios(
    Object.assign(
      {
        method: "get",
        url: "new_pzly02live7/_table/parked_cars?filter=(user_id="+userId+")%20AND%20parking_status='ENTRY'",
      }, APIConfig
    )
  );
};

export const getParkedVehicle = (recordId) => {
  return axios(
    Object.assign(
      {
        method: "get",
        url: "new_pzly02live7/_table/parked_cars?filter=(id="+recordId+")",
      }, APIConfig
    )
  );
};