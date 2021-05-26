import { SEND_ALERT, REMOVE_ALERT } from '../actions/types';

const initialState = [];

/**
 * Reducer function for alert, where we have cases of setting alert
 * and removing alert. 
 * @param state State will be empty at first
 * @param action Will be the dispatched action setAlert from alert.js in action
 */
function alertReducer(state = initialState, action) {

  switch (action.type) {
    case SEND_ALERT:
      return [...state, action.payload];
    case REMOVE_ALERT:
      return state.filter(alert => alert.id !== action.payload);
    default:
      return state;
  }
}

export default alertReducer;