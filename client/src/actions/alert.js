import { v4 as uuidv4 } from 'uuid';
import { SEND_ALERT, REMOVE_ALERT } from './types';

/**
 * Function sendAlert, which dispatches the action setAlert
 * to the reducer alert.js
 * @param msg Message in the alert
 * @param alertType Alert Type, either SET_ALERT or REMOVE_ALERT
 * @param timeout Time taken before timeout and alert is removed
 */
export const setAlert = (msg, alertType, timeout = 5000) => dispatch => {
    const id = uuidv4();
    dispatch({
        type: SEND_ALERT, 
        payload: { msg, alertType, id } 
    });

    setTimeout(() => dispatch({
        type: REMOVE_ALERT, 
        payload: id}), timeout);
}