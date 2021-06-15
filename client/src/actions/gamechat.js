import axios from 'axios';

import {
    GET_GAMECHAT,
    CREATE_GAMECHAT,
    CHAT_FAIL
} from './types';


export const createGameChat = (formData) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    try {
        const res = await axios.post('/api/gamechat', formData, config);
        dispatch({
            type: CREATE_GAMECHAT,
            payload: res.data
        });
      
    } catch (error) {
        dispatch({
            type: CHAT_FAIL,
            payload: { msg: error.response.statusText, status: error.response.status}
        })        
    }
  };



  export const getGameChat = gameid => async dispatch => {
    try {
        const res = await axios.get(`/api/gamechat/${gameid}`);
        dispatch({
            type: GET_GAMECHAT,
            payload: res.data
        });
      
    } catch (error) {
        dispatch({
            type: CHAT_FAIL,
            payload: { msg: error.response.statusText, status: error.response.status}
        })        
    }
  };

