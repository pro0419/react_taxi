import { createStore, applyMiddleware } from "redux";
import promiseMiddleware from "redux-promise";
import thunkMiddleware from 'redux-thunk';
import WeatherReducers from "../reducers/weather.js";

const WeatherStore = createStore(WeatherReducers, applyMiddleware(thunkMiddleware));
export default WeatherStore;