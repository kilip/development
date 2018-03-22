import * as actions from '../actions/global';
import { combineReducers } from 'redux';

export function loading(state=false, action){
    switch(action.type){
        case actions.SIAP_LOADING:
            return action.loading;
        default:
            return state;
    }
}

export default combineReducers({loading});