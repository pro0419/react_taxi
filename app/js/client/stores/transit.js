import { createStore, applyMiddleware } from "redux";
import promiseMiddleware from "redux-promise";
import thunkMiddleware from 'redux-thunk';
import TransitReducers from "../reducers/transit.js";

const TransitStore = createStore(TransitReducers, applyMiddleware(thunkMiddleware));
export default TransitStore;