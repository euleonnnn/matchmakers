import {combineReducers} from 'redux';
import alertReducer from './alert';
import auth from  './auth';
import profile from './profile';
import game from './game';

const allReducers = combineReducers({
    game: game,
    alert : alertReducer,
    auth : auth,
    profile: profile
});


export default allReducers;
