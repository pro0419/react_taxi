import { createStore, applyMiddleware } from "redux";
import promiseMiddleware from "redux-promise";
import thunkMiddleware from 'redux-thunk';
import UserReducers from "../reducers/user.js";

const UserStore = createStore(UserReducers, applyMiddleware(thunkMiddleware));
export default UserStore;