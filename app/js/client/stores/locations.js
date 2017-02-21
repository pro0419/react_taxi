import { createStore, applyMiddleware } from "redux";
import promiseMiddleware from "redux-promise";
import thunkMiddleware from 'redux-thunk';
import LocationReducers from "../reducers/locations.js";

const LocationStore = createStore(LocationReducers, applyMiddleware(thunkMiddleware));
export default LocationStore;