import { createStore, applyMiddleware } from "redux";
import promiseMiddleware from "redux-promise";
import thunkMiddleware from 'redux-thunk';
import NewLocationReducers from "../reducers/new-location.js";

const NewLocationStore = createStore(NewLocationReducers, applyMiddleware(thunkMiddleware));
export default NewLocationStore;