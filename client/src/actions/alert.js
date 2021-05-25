import { v4 as uuidv4 } from 'uuid';
import { SET_ALERT, REMOVE_ALERT } from './types';


export const setAlert = (msg, alertType, timeout = 5000) => dispatch => {
    const id = uuidv4();
    dispatch({
        type: SET_ALERT,  //this will this the type SET ALERT under alert.js in reducers
        payload: { msg, alertType, id } //payload is essentially an object with attributes like msg, alerType, id 
    });

    //after 5s disptach remove alert
    setTimeout(()=> dispatch({type: REMOVE_ALERT, payload: id}), timeout);
}