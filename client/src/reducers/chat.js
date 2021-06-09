import {
    GET_CHATS,
    CHAT_FAIL
} from '../actions/types'

const initialState = {
    chats: [],
    chat: null,
    loading: true,
    error: {}
}

// eslint-disable-next-line
function chatReducer(state = initialState, action) {
    const {type, payload} = action;

    switch(type) {
        case GET_CHATS:
            return {
                ...state, 
                chats: payload,
                loading: false
            };
        case CHAT_FAIL:
            return {
                ...state, 
                error: payload,
                loading: false
             }
        default: 
            return state;
    }
}

export default chatReducer;