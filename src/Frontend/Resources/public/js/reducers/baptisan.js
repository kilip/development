import { combineReducers } from 'redux';
import * as constants from '../actions/constants';

export function error(state=null,action){
    switch(action.type){
        case constants.BAPTISAN_ERROR:
            return action.error;
        case constants.BAPTISAN_LIST_RESET:
        case constants.BAPTISAN_RESET:
            return null;
        default:
            return state;
    }
}

export function list(state={}, action){
    switch(action.type){
        case constants.BAPTISAN_LIST_RETRIEVED:
            return action.retrieved;
        case constants.BAPTISAN_LIST_RESET:
            return {};
        default:
            return state;
    }
}

export function retrieved(state=null, action){
    switch(action.type){
        case constants.BAPTISAN_RETRIEVED:
            return action.retrieved;
        default:
            return state;
    }
}

export function updated(state=null, action){
    switch(action.type){
        case constants.BAPTISAN_UPDATED:
            return action.updated;
        case constants.BAPTISAN_RESET:
            return null;
        default:
            return state;
    }
}

export function removed(state=null,action){
    switch(action.type){
        case constants.BAPTISAN_REMOVED:
            return action.removed;
        case constants.BAPTISAN_RESET:
            return null;
        default:
            return state;
    }
}

export default combineReducers({list,error,retrieved,updated,removed});