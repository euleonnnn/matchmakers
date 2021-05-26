import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import allReducers from './reducers';

const initialState = {};

const middleware = [thunk];

/**
 * Create redux store
 * @param allReducers all the reducers which we will be using
 * @param initialState initial state empty object
 */
const store = createStore(
  allReducers,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);


export default store;