import { combineReducers } from 'redux';

const initialState = {
  plateId: null,
  selectedPlate: "",
  state: null,
  vehicleList: [],
  errorCode: null,
  errorMessage: null,
  subErrorMessage: null,
};

const Vehicle = (state = {}, action) => {
  switch(action.type) {
    case "PLATE_ADDITION_INITIATE":
      return {
        loading: true
      }
    case "PLATE_ADDITION_SUCCESS":
      return {
        loading: false,
        ...action.data
      };
    case "PLATE_ADDITION_FAIL":
      return {
        loading: false,
        ...action.error
      }
    case "FETCH_VEHICLES_INITIATE":
      return {
        loading: true
      }
    case "FETCH_VEHICLES_SUCCESS":
      return {
        loading: false,
        vehicleList: action.data
      }
    case "FETCH_VEHICLES_FAIL":
      return {
        loading: false,
        ...action.error
      }
    case "FETCH_VEHICLE_INITIATE":
      return {
        loading: true
      }
    case "FETCH_VEHICLE_SUCCESS":
      return {
        loading: false,
        selectedPlate: action.data.vehicle.plate_no,
        state: action.data.vehicle.registered_state
      }
    case "FETCH_VEHICLE_FAIL":
      return {
        loading: false,
        ...action.error
      }
    case "DELETING_VEHICLE":
      return {
        ...state,
        loading: action.status
      }
    default:
      return state;
  }
};

const VehicleReducers = combineReducers({
  Vehicle
});

export default VehicleReducers;