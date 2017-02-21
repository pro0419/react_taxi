import axios from "axios";
import * as Config from "../utils/api.js";

export const addPlate = (plateInfo) => {
  const { plate_no, registered_state, user_id, id } = plateInfo;
  const requestMethod = id ? "put" : "post";
  const newPlatePayload = {
    plate_no: plate_no,
    registered_state: registered_state.value,
    user_id: user_id,
    date_time: ""
  };
  const updatePlatePayload = {
    plate_no: plate_no,
    registered_state: registered_state.value,
    id: id,
    date_time: ""
  };
  return axios(
    Object.assign(
      {
        method: requestMethod,
        url: "/new_pzly02live7/_table/user_vehicles",
        data : id ? updatePlatePayload : newPlatePayload
      }, Config.APIConfig
    )
  );
};

export const getVehicles = (userId) => {
  const user_id = userId;
  return axios(
    Object.assign(
      {
        method: "get",
        url: "/new_pzly02live7/_table/user_vehicles?filter=user_id="+user_id
      }, Config.APIConfig
    )
  );
};

export const getVehicle = (vehicleId) => {
  const id = vehicleId;
  return axios(
    Object.assign(
      {
        method: "get",
        url: "/new_pzly02live7/_table/user_vehicles?filter=id="+id
      }, Config.APIConfig
    )
  );
};

export const saveVehicle = (plateInfo) => {
  const { plate_no, registered_state, id } = plateInfo;
  return axios(
    Object.assign(
      {
        method: "put",
        url: "/new_pzly02live7/_table/user_vehicles",
        data : {
          plate_no: plate_no,
          registered_state: registered_state,
          id: id
        }
      }, Config.APIConfig
    )
  );
};

export const deleteVehicle = (vehicleId) => {
  return axios(
    Object.assign(
      {
        method: "delete",
        url: "/new_pzly02live7/_table/user_vehicles",
        data:{
          id: vehicleId
        }
      }, Config.APIConfig
    )
  );
}; 
