import {
    GET_GAMES,
    GAME_FAIL
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
        case GAME_FAIL:
            return {
                ...state, 
                error: payload,
                loading: false
             };
        default: 
            return state;
    }
}