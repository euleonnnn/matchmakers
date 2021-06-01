import axios from 'axios';
import { setAlert } from './alert';
import {
    GET_GAMES,
    GAME_FAIL
} from './types';

//Get posts
export const getGames = () => async dispatch => {
    try {
        const res = await axios.get('/api/games');

        dispatch({
            type: GET_GAMES,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: GAME_FAIL,
            payload: { msg: error.response.statusText, status: error.response.status}
        })        
    }
}