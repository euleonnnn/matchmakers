import axios from 'axios';

import {
    GET_CHATS,
    CHAT_FAIL
} from './types';

//Get games
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
