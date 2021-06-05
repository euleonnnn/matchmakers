import {
    GET_GAMES,
    GAME_FAIL,
    GET_GAME,
    CLEAR_GAME,
    REMOVE_GAME,
    CREATE_GAME
} from '../actions/types'

const initialState = {
    games: [],
    game: null,
    loading: true,
    error: {}
}

export default function (state = initialState, action) {
    const {type, payload} = action;

    switch(type) {
        case GET_GAMES:
            return {
                ...state, 
                games: payload,
                loading: false
            };
        case CREATE_GAME:
            return {
                ...state, 
                games: [payload,...state.games],
                loading: false
            }
        case CLEAR_GAME:
            return {
                ...state,
                game: null,
                loading: false
            }
        case GET_GAME: 
            return {
                ...state, 
                game: payload,
                loading: false
            }
        case GAME_FAIL:
            return {
                ...state, 
                error: payload,
                loading: false
             }
        case REMOVE_GAME:
            return {
                ...state,
                games: state.games.filter(game => game._id !== payload),
                loading: false
            }
        default: 
            return state;
    }
}