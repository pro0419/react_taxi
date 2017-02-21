import { createStore, applyMiddleware } from "redux";
import promiseMiddleware from "redux-promise";
import thunkMiddleware from 'redux-thunk';
import TrafficReducers from "../reducers/traffic.js";

const TrafficStore = createStore(TrafficReducers, applyMiddleware(thunkMiddleware));
export default TrafficStore;