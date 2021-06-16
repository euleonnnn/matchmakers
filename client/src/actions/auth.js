import axios from 'axios';
import { setAlert } from './alert';

import {
    REG_SUCCESS,
    REG_FAIL,
    AUTH_SUCCESS,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    CLEAR_PROFILE,
    CHANGE_PW
} from './types';

import setAuthToken from '../utils/setAuthToken';


/**
 * Function register, which dispatches the actions REG_SUCCESS or 
 * REG_FAILURE to the reducer auth.js. 
 * @param destructured name, email and password that will be in the form
 */
export const register = ({name, email, password}) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    try {
        const res = await axios.post('/api/users', JSON.stringify({name, email, password}) , config);
        dispatch({
            type: REG_SUCCESS,
            payload: res.data
        });
        dispatch(authUser());

    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.map(error => dispatch(setAlert(error.msg,'danger')));
        }
        dispatch({
            type: REG_FAIL
        });
    }
}

export const changePassword = (formData, hist) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    try {
        const res = await axios.post('/api/users/password', formData , config);
        dispatch({
            type: CHANGE_PW,
            payload: res.data
        });
        dispatch(authUser());
        dispatch(setAlert('Password has been changed','success'));
        hist.push('/dashboard')

    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.map(error => dispatch(setAlert(error.msg,'danger')));
        }
        dispatch({
            type: REG_FAIL
        });
    }
}






/**
 * Function login, which dispatches the actions LOGIN_SUCCESS or 
 * LOGIN_FAIL to the reducer auth.js, based on the email and password
 * provided in the form on the frontend
 * @param email form email keyed in by client
 * @param password form password keyed in by client
 */

export const login = (email, password) => async dispatch => {

  try {
    const res = await axios.post('/api/auth', { email, password });

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });

    dispatch(authUser());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.map(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: LOGIN_FAIL
    });
  }
};

/**
 * Function authUser, which dispatches the action AUTH_SUCCESS
 * to the reducer auth.js. No param, if local storage still has
 * token then load it. Otherwise go to the Get User Auth route
 */
 export const authUser = () => async dispatch => {
    if(localStorage.token) {
        setAuthToken(localStorage.token);
    }
    try {
        const res = await axios.get('/api/auth');
        dispatch({
            type: AUTH_SUCCESS,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: AUTH_ERROR
        })
    }
}   



/**
 * Function logout which dispatches the action types CLEAR_PROFILE and LOGOUT,
 * when user hits the button
 */
export const logout = () => dispatch => {
  dispatch({type: CLEAR_PROFILE});  
  dispatch({type: LOGOUT});  
};


