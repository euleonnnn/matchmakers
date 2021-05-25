import axios from 'axios';

import { setAlert } from './alert';

import {
    GET_PROFILE,
    GET_PROFILES,
    PROFILE_FAIL,
    CLEAR_PROFILE,
} from './types';


//get profile of requested user 
export const getCurrentProfile = () => async dispatch => {
    try {
        const res = await axios.get('/api/profile/me');
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });
    } catch (error) {
        dispatch({
            type: PROFILE_FAIL,
            payload: { msg: error.response.statusText, status: error.response.status}
        })
    }
}


//  Create or update profile
export const createProfile = (formData, hist, edit= false) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const res = await axios.post('/api/profile', formData, config);
        
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });

        dispatch(setAlert(edit ? 'Your Profile is Updated' : 
        'Your Profile is Created'));
        
        if (!edit){
            hist.push('/dashboard')
        } else {
            hist.push('/my-profile')
        }
        

    } catch (error) {
        const errors = error.response.data.errors;

        if (errors) {
            errors.forEach(err => dispatch(setAlert(err.msg, 'danger')));
        }

        dispatch({
            type: PROFILE_FAIL,
            payload: { msg: error.response.statusText, status: error.response.status}
        })
    }
}


//Get all profiles
export const getProfiles = () => async dispatch => {
    dispatch({ type: CLEAR_PROFILE });
    try {
        const res = await axios.get('/api/profile');
        dispatch({
            type: GET_PROFILES,
            payload: res.data
        });
    } catch (error) {
        dispatch({
            type: PROFILE_FAIL,
            payload: { msg: error.response.statusText, status: error.response.status}
        })
    }
}


//Get profile by ID
export const getProfilesById = id => async dispatch => {
    try {
        const res = await axios.get(`/api/profile/user/${id}`);
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });
    } catch (error) {
        dispatch({
            type: PROFILE_FAIL,
            payload: { msg: error.response.statusText, status: error.response.status}
        })
    }
}



