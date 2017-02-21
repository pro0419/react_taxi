import { createStore, applyMiddleware } from "redux";
import promiseMiddleware from "redux-promise";
import thunkMiddleware from 'redux-thunk';
import FindVehicleReducers from "../reducers/find-vehicle.js";

const FindVehicleStore = createStore(FindVehicleReducers, applyMiddleware(thunkMiddleware));
export default FindVehicleStore;