import {
    GET_GAMECHAT,
    CHAT_FAIL,
    CREATE_GAMECHAT
} from '../actions/types'

const initialState = {
    gamechat: null,
    loading: true,
    error: {}
}

// eslint-disable-next-line
function gamechatReducer(state = initialState, action) {
    const {type, payload} = action;

    switch(type) {
        case GET_GAMECHAT:
            return {
                ...state, 
                gamechat: payload,
                loading: false
            };
        case CHAT_FAIL:
            return {
                ...state, 
                error: payload,
                loading: false
             }
        case CREATE_GAMECHAT:
            return {
                ...state, 
                gamechat: payload,
                loading: false
            }
        default: 
            return state;
    }
}

export default gamechatReducer;