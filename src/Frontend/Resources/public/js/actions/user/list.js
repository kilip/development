import fetch from '../../utils/fetch';
import { loading } from "../global";

export function error(error) {
    return {type: 'USER_LIST_ERROR', error};
}

export function success(data) {
    return {type: 'USER_LIST_SUCCESS', data};
}

export function list(page = '/users') {
    return (dispatch) => {
        dispatch(loading(true));
        dispatch(error(''));

        return fetch(page)
            .then(response => response.json())
            .then(data => {
                dispatch(loading(false));
                dispatch(success(data));
            })
            .catch(e => {
                dispatch(loading(false));
                dispatch(error(e.message))
            });
    };
}

export function reset() {
    return {type: 'USER_LIST_RESET'};
}