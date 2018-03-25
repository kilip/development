import * as constants from './constants';
import { combineReducers } from 'redux';

function addFlash(state,action){
    const flash = {
        id: action.id,
        namespace: action.namespace,
        message: action.message,
        //createdAt: Math.floor(Date.now())
    };
    return [ ...state, flash ];
}

function removeFlash(state,action){
    for(let i=0;i<state.length;i++){
        let current = state[i];
        if(current.id === action.removed){
            state.splice(i,1);
            return state;
        }
    }
    return state;
}

function error(state = [],action){
    switch(action.type){
        case constants.FLASH_ADD_ERROR:
            return addFlash(state,action);
        case constants.FLASH_REMOVE_ERROR:
            return removeFlash(state,action);
        default:
            return state;
    }
}

function success(state = [], action){
    switch(action.type){
        case constants.FLASH_ADD_SUCCESS:
            return addFlash(state,action);
        case constants.FLASH_REMOVE_SUCCESS:
            return removeFlash(state,action);
        default:
            return state;
    }
}

function info(state = [], action){
    switch(action.type){
        case constants.FLASH_ADD_INFO:
            return addFlash(state,action);
        case constants.FLASH_REMOVE_INFO:
            return removeFlash(state,action);
        default:
            return state;
    }
}

export default combineReducers({
    success, info, error
});