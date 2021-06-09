import {combineReducers} from 'redux';
import alertReducer from './alert';
import auth from  './auth';
import profile from './profile';
import game from './game';
import chatReducer from './chat';

const allReducers = combineReducers({
    game: game,
    alert : alertReducer,
    auth : auth,
    profile: profile,
    chat: chatReducer,
});


export default allReducers;
