import {
    GET_CHATS,
    CHAT_FAIL,
    CREATE_CHAT
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
        case CREATE_CHAT:
            return {
                ...state, 
                chats: [payload,...state.chats],
                loading: false
            }
        default: 
            return state;
    }
}

export default chatReducer;