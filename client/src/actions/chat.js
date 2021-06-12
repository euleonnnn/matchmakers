import axios from 'axios';

import {
    GET_CHATS,
    CHAT_FAIL,
    CREATE_CHAT
} from './types';

//Get chats
export const getChats = () => async dispatch => {
    try {
        const res = await axios.get('/api/chat');

        dispatch({
            type: GET_CHATS,
            payload: res.data
        })

    } catch (error) {
        dispatch({
            type: CHAT_FAIL,
            payload: { msg: error.response.statusText, status: error.response.status}
        })        
    }
}


export const createChat = (formData, hist) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    try {
        const res = await axios.post('/api/chat', formData, config);
        dispatch({
            type: CREATE_CHAT,
            payload: res.data
        });
        hist.push('/messagebox')

    } catch (error) {
        dispatch({
            type: CHAT_FAIL,
            payload: { msg: error.response.statusText, status: error.response.status}
        })        
    }
  };
