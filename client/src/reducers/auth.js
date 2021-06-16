import {
    REG_SUCCESS,
    REG_FAIL,
    AUTH_SUCCESS,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    CHANGE_PW,
} from '../actions/types';

const initialState = {
    token: localStorage.getItem('token'),
    loading: true,
    user: null,
    isAuthenticated: null 
}


/**
 * Reducer function for auth, to authenticate registration
 * and logging in
 * @param state initial state cotaining token, loading, user and isAuthenticated
 * @param action Will be the dispatched action from auth.js in actions
 */
// eslint-disable-next-line
export default function(state = initialState, action) {
    const { type, payload } = action;

    switch(type) {
        case AUTH_SUCCESS:
            return {
                ...state,
                loading: false,
                user: payload,
                isAuthenticated: true 
            }
        case REG_SUCCESS:
        case LOGIN_SUCCESS:
        case CHANGE_PW:
            localStorage.setItem('token', payload.token); //set token if successfully registered
            return {
                ...state,
                ...payload,
                loading: false,
                isAuthenticated: true
            }
        case REG_FAIL:
        case AUTH_ERROR:   
        case LOGIN_FAIL:
        case LOGOUT:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                loading: false,
                user: null,
                isAuthenticated: false
            }
        default: 
            return state;
    }
}