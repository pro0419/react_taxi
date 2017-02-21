import { createStore, applyMiddleware } from 'redux';
import reducers from '../reducers'; 
import ReduxThunk from 'redux-thunk';
import ReduxPromise from 'redux-promise';


const createStoreWithMiddleware = applyMiddleware(ReduxThunk, ReduxPromise)(createStore);
const store = createStoreWithMiddleware(reducers);

export default store;
