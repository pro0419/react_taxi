import { createStore, applyMiddleware } from "redux";
import promiseMiddleware from "redux-promise";
import thunkMiddleware from 'redux-thunk';
import VehicleReducers from "../reducers/vehicle.js";

const VehicleStore = createStore(VehicleReducers, applyMiddleware(thunkMiddleware));
export default VehicleStore;