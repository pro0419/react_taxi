import { createStore, applyMiddleware } from "redux";
import promiseMiddleware from "redux-promise";
import thunkMiddleware from 'redux-thunk';
import WalletReducers from "../reducers/wallet.js";

const WalletStore = createStore(WalletReducers, applyMiddleware(thunkMiddleware));
export default WalletStore;