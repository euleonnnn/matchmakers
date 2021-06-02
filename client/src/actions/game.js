import axios from 'axios';
import { setAlert } from './alert';
import {
    GET_GAMES,
    GAME_FAIL,
    JOIN_UNJOIN,
    GET_GAME
} from './types';


//Get games
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


//Join game
export const joinGame = gameID => async dispatch => {
    try {
        const res = await axios.put('/api/games/join/' + {gameID});

        dispatch({
            type: JOIN_UNJOIN,
            payload: { gameID, players: res.data}
        })
    } catch (error) {
        dispatch({
            type: GAME_FAIL,
            payload: { msg: error.response.statusText, status: error.response.status}
        })        
    }
}

//Quit game
export const quitGame = gameID => async dispatch => {
    try {
        const res = await axios.put('/api/games/quit/' + {gameID});

        dispatch({
            type: JOIN_UNJOIN,
            payload: { gameID, players: res.data}
        })
    } catch (error) {
        dispatch({
            type: GAME_FAIL,
            payload: { msg: error.response.statusText, status: error.response.status}
        })        
    }
}



//Get game by ID
export const getGameById = gameID => async dispatch => {
    try {
        const res = await axios.get(`/api/games/${gameID}`);
        dispatch({
            type: GET_GAME,
            payload: res.data
        });
    } catch (error) {
        dispatch({
            type: GAME_FAIL,
            payload: { msg: error.response.statusText, status: error.response.status}
        })
    }
}