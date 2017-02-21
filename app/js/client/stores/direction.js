import { createStore, applyMiddleware } from "redux";
import promiseMiddleware from "redux-promise";
import thunkMiddleware from 'redux-thunk';
import DirectionReducers from "../reducers/direction.js";

const DirectionStore = createStore(DirectionReducers, applyMiddleware(thunkMiddleware));
export default DirectionStore;