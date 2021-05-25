import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    FOLLOW_USER
} from '../actions/types';

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null, //will be set to true when successfully registered
    loading: true,
    user: null
}


export default function(state = initialState, action) {
    const { type, payload } = action;

    switch(type) {
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: payload //payload includes the user name, email, avatar
            }
        case FOLLOW_USER:
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: {
                    ...state.user,
                    followings: [...state.user.followings, action.payload]
                }
            }
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            localStorage.setItem('token', payload.token); //set token if successfully registered
            return {
                ...state,
                ...payload,
                isAuthenticated: true,
                loading: false
            }
        case REGISTER_FAIL:
        case AUTH_ERROR:   
        case LOGIN_FAIL:
        case LOGOUT:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false,
                user: null
            }
        default: 
            return state;
    }
}