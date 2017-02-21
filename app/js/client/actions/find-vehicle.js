import * as FindVehicleAPI from "../api/find-vehicle.js";
import * as ParkingAPI from "../api/parking.js";
import * as Actions from "../constants/actions.js";

const setLoading = (status) => {
  return {
    type: Actions.SET_LOADING,
    status
  };
};

const setParkedCarsList = (list) => {
  return {
    type: Actions.SET_PARKED_CARS_LIST,
    list
  }
};

export const getParkedVehicles = (userId) => {
  return dispatch => {
    dispatch(setLoading(true));
    return FindVehicleAPI.getParkedVehicles(userId)
      .then((response) => {
        console.log(response.data);
        const { resource } = response.data;
        dispatch(setParkedCarsList(resource));
        dispatch(setLoading(false));
      })
      .catch((response) => {
        console.log("failed");
        //dispatch(fetchNearbyParkingFailed(response));
      });
  };
};

const setParkedCarData = (parkedCar) => {
  return {
    type: Actions.SET_PARKED_CAR_DETAIL,
    parkedCar
  }
};

export const getParkedVehicle = (recordId) => {
  return dispatch => {
    dispatch(setLoading(true));
    return FindVehicleAPI.getParkedVehicle(recordId)
      .then((response) => {
        console.log(response.data);
        const { resource } = response.data;
        dispatch(setParkedCarData(resource[0]));
        dispatch(setLoading(false));
      })
      .catch((response) => {
        console.log("failed");
        //dispatch(fetchNearbyParkingFailed(response));
      });
  };
};

export const exitVehicle = (confirmationId, exit_date_time) => {
  return dispatch => {
    dispatch(setLoading(true));
    return ParkingAPI.exitVehicle(confirmationId, exit_date_time)
      .then((response) => {
        const { data } = response;
        const { resource } = data;
        console.log("Vehicle Exited");
        dispatch(setLoading(false));
        
        if(type == "existing") {
          dispatch(setAlreadyParked(false, null));
        } else {
          dispatch(exitParkingFlow());
        }
      })
      .catch((response) => {
        //dispatch(fetchChargesFailed());
      });
  };
};