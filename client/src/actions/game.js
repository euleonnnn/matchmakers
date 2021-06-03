import axios from 'axios';

import {
    GET_GAMES,
    GAME_FAIL,
    GET_GAME,
    CLEAR_GAME,
    REMOVE_GAME,
    CREATE_GAME
} from './types';

import { setAlert } from './alert';


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

export const clearGame = () => async dispatch => {
    dispatch({ type: CLEAR_GAME });
}


// //Join game
// export const joinGame = gameID => async dispatch => {
//     try {
//         const res = await axios.put('/api/games/join/' + {gameID});

//         dispatch({
//             type: JOIN_UNJOIN,
//             payload: { gameID, players: res.data}
//         })
//     } catch (error) {
//         dispatch({
//             type: GAME_FAIL,
//             payload: { msg: error.response.statusText, status: error.response.status}
//         })        
//     }
// }

// //Quit game
// export const quitGame = gameID => async dispatch => {
//     try {
//         const res = await axios.put('/api/games/quit/' + {gameID});

//         dispatch({
//             type: JOIN_UNJOIN,
//             payload: { gameID, players: res.data}
//         })
//     } catch (error) {
//         dispatch({
//             type: GAME_FAIL,
//             payload: { msg: error.response.statusText, status: error.response.status}
//         })        
//     }
// }



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


// Delete Game
export const deleteGame = gameID => async dispatch => {
    try {
      await axios.delete(`/api/games/${gameID}`);
      dispatch({
        type: REMOVE_GAME,
        payload: gameID
      });
      dispatch(setAlert('Game Deleted', 'danger'));
    } catch (error) {
      dispatch({
        type: GAME_FAIL,
        payload: { msg: error.response.statusText, status: error.response.status }
      });
    }
  };
  

// create game
export const createGame = formData => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    try {
        const res = await axios.post('/api/games', formData, config);
        dispatch({
            type: CREATE_GAME,
            payload: res.data
        });
        dispatch(setAlert('Created Game', 'success'));
    } catch (error) {
        dispatch({
            type: GAME_FAIL,
            payload: { msg: error.response.statusText, status: error.response.status }
          });
    }
  };