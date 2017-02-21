import { createStore, applyMiddleware } from "redux";
import promiseMiddleware from "redux-promise";
import thunkMiddleware from 'redux-thunk';
import PermitsReducers from "../reducers/permits.js";

const PermitsStore = createStore(PermitsReducers, applyMiddleware(thunkMiddleware));
export default PermitsStore;