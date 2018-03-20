import { combineReducers } from 'redux';

import * as actions from '../actions/security/authentication';
import { checkToken } from "../components/security/util";

export function error(state=null, action){
    switch(action.type){
        case actions.LOGIN_FAILURE:
            return action.error;
        case actions.LOGIN_RESET:
            return null;
        default:
            return state;
    }
}

export function fetching(state = false, action){
    switch(action.type){
        case actions.LOGIN_REQUEST:
            return action.fetching;
        case actions.LOGIN_FAILURE:
            return false;
        case actions.LOGIN_RESET:
            return false;
        default:
            return state;
    }
}

export function authenticated(state = false,action){
    switch(action.type){
        case actions.LOGIN_REQUEST:
            return false;
        case actions.LOGIN_SUCCESS:
            return true;
        case actions.LOGIN_FAILURE:
            return false;
        case actions.LOGIN_RESET:
            return false;
        default:
            return state;
    }
}

export function auth(state = null,action){
    if(!state){
        state = checkToken();
    }
    switch(action.type){
        case actions.LOGIN_REQUEST:
            return null;
        case actions.LOGIN_SUCCESS:
            return action.user;
        case actions.LOGIN_RESET:
            return null;
        default:
            return state;
    }
}

export function token(state=null,action){
    if(action.type === actions.LOGIN_RESET){
        localStorage.clear();
    }
    return localStorage.getItem('token');
}

export default combineReducers({auth,fetching,authenticated,error,token});