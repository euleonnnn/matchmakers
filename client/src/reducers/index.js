import {combineReducers} from 'redux';
import alertReducer from './alert';
import auth from  './auth';
import profile from './profile';

const allReducers = combineReducers({
    alert : alertReducer,
    auth : auth,
    profile: profile
});


export default allReducers;
