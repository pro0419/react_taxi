import * as VehicleAPI from "../api/vehicle.js"
import * as Actions from "../constants/actions.js";
import { GenericError } from "../constants/texts.js";

/**
* Add a new license Plate
**/

const initiateAddition = () => {
  return {
    type: Actions.PLATE_ADDITION_INITIATE
  };
};

const plateAdded = (data) => {
  return {
    type: Actions.PLATE_ADDITION_SUCCESS,
    data
  };
};


const plateAdditionFailed = (error) => {
  return {
    type: Actions.PLATE_ADDITION_FAIL,
    error
  };
};

export const addPlate = (plateInfo) => {
  return dispatch => {
    dispatch(initiateAddition());
    return VehicleAPI.addPlate(plateInfo)
      .then((response) => {
        const data = response.data;
        dispatch(plateAdded({
          plateId: data.resource[0].id
        }));
      })
      .catch((response) => {
        dispatch(plateAdditionFailed({
          errorCode: "503",
          errorMessage: GenericError
        }));
      });
  }
};

/**
* Get My Vehicle License Plates List
**/

const initiateFetchVehicles = () => {
  return {
    type: Actions.FETCH_VEHICLES_INITIATE
  };
};

const retrievedVehicles = (data) => {
  return {
    type: Actions.FETCH_VEHICLES_SUCCESS,
    data
  }
};

const retrievalFailure = (error) => {
  return {
    type: Actions.FETCH_VEHICLES_FAIL,
    error
  }
}

export const getVehicles = (user_id) => {
  return dispatch => {
    dispatch(initiateFetchVehicles());
    return VehicleAPI.getVehicles(user_id)
      .then((response) => {
        console.log(response);
        const { resource } = response.data;
        dispatch(retrievedVehicles({
          vehicles: resource
        }));
      })
      .catch((response) => {
        dispatch(retrievalFailure({
          errorCode: "503",
          errorMessage: GenericError
        }));
      });
  }
}

const initiateFetchVehicle = () => {
  return {
    type: Actions.FETCH_VEHICLE_INITIATE
  };
};

const retrievedVehicle = (data) => {
  return {
    type: Actions.FETCH_VEHICLE_SUCCESS,
    data
  }
};

const vehicleRetrievalFailure = (error) => {
  return {
    type: Actions.FETCH_VEHICLE_FAIL,
    error
  }
};

export const getVehicle = (vehicle_id) => {
  return dispatch => {
    dispatch(initiateFetchVehicle());
    return VehicleAPI.getVehicle(vehicle_id)
      .then((response) => {
        console.log(response);
        const { resource } = response.data;
        dispatch(retrievedVehicle({
          vehicle: resource[0]
        }));
      })
      .catch((response) => {
        console.log(response);
        dispatch(vehicleRetrievalFailure({
          errorCode: "503",
          errorMessage: GenericError
        }));
      });
  }
};

const deletingVehicle = (status) => {
  return {
    type: Actions.DELETING_VEHICLE,
    status
  }
};

export const deleteVehicle = (vehicle_id) => {
  return dispatch => {
    dispatch(deletingVehicle(true));
    return VehicleAPI.deleteVehicle(vehicle_id)
      .then((response) => {
        dispatch(deletingVehicle(false));
        window.location = "/my-vehicles";
      })
      .catch((response) => {
        dispatch(deletingVehicle(false));
        dispatch(vehicleDeletionFailure({
          errorCode: "503",
          errorMessage: GenericError
        }));
      });
  }
};