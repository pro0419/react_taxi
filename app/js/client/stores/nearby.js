import { createStore, applyMiddleware } from "redux";
import promiseMiddleware from "redux-promise";
import thunkMiddleware from 'redux-thunk';
import NearbyReducers from "../reducers/nearby.js";

const NearbyStore = createStore(NearbyReducers, applyMiddleware(thunkMiddleware));
export default NearbyStore;