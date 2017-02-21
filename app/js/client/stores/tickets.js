import { createStore, applyMiddleware } from "redux";
import promiseMiddleware from "redux-promise";
import thunkMiddleware from 'redux-thunk';
import TicketReducers from "../reducers/tickets.js";

const TicketsStore = createStore(TicketReducers, applyMiddleware(thunkMiddleware));
export default TicketsStore;