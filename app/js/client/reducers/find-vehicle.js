import { combineReducers } from 'redux';

const initialState = {
  loading: false,
  parkedVehicleList: [],
  vehicleData: {},
  errorCode: null,
  errorMessage: null,
  subErrorMessage: null,
};

const FindVehicle = (state = initialState, action) => {
  switch(action.type) {
    case "SET_LOADING":
      return {
        ...state,
        loading: action.status
      }
    case "SET_PARKED_CARS_LIST":
      return {
        ...state,
        parkedVehicleList: action.list
      }
    case "SET_PARKED_CAR_DETAIL":
      return {
        ...state,
        vehicleData: action.parkedCar
      }
    default:
      return state;
  }
};

const FindVehicleReducers = combineReducers({
  FindVehicle
});

export default FindVehicleReducers;