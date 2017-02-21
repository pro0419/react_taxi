import { createStore, applyMiddleware } from "redux";
import promiseMiddleware from "redux-promise";
import thunkMiddleware from 'redux-thunk';
import ParkingReducers from "../reducers/parking.js";

const ParkingStore = createStore(ParkingReducers, applyMiddleware(thunkMiddleware));
export default ParkingStore;