import * as constants from './constants';
import { uuid }from '../../utils';

export function addSuccess(message,namespace='global',id=undefined){
    if(!id){
        id = uuid();
    }
    return (dispatch) => {
        dispatch({
            type: constants.FLASH_ADD_SUCCESS,
            message,
            id,
            namespace
        });
    };
}

export function removeSuccess(removed,namespace='global'){
    return (dispatch) => {
        dispatch({
            type: constants.FLASH_REMOVE_SUCCESS,
            removed,
            namespace
        })
    }
}

export function addError(message, namespace='global', id=undefined){
    if(!id){
        id = uuid();
    }
    return (dispatch) => {
        dispatch({
            type: constants.FLASH_ADD_ERROR,
            id,
            message,
            namespace
        });
    }
}

export function removeError(removed, namespace='global'){
    return (dispatch) => {
        dispatch({
            type: constants.FLASH_REMOVE_ERROR,
            removed,
            namespace
        });
    }
}

export function addInfo(message, namespace='global', id = undefined){
    if(!id){
        id = uuid();
    }
    return (dispatch) => {
        dispatch({
            type: constants.FLASH_ADD_INFO,
            id: id,
            message,
            namespace
        });
    }
}

export function removeInfo(removed, namespace='global'){
    return (dispatch) => {
        dispatch({
            type: constants.FLASH_REMOVE_INFO,
            removed,
            namespace
        });
    }
}