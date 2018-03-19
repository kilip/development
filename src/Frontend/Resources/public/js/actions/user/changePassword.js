import { SubmissionError } from 'redux-form';
import fetch from '../../utils/fetch';

export function retrieveError(retrieveError) {
    return {type: 'USER_CHANGE_PASSWORD_RETRIEVE_ERROR', retrieveError};
}

export function retrieveLoading(retrieveLoading) {
    return {type: 'USER_CHANGE_PASSWORD_RETRIEVE_LOADING', retrieveLoading};
}

export function retrieveSuccess(retrieved) {
    return {type: 'USER_CHANGE_PASSWORD_RETRIEVE_SUCCESS', retrieved};
}

export function retrieve(id,context='admin') {
    const url = getApiUrl(id,context);
    return (dispatch) => {
        dispatch(retrieveLoading(true));

        return fetch(url)
            .then(response => response.json())
            .then(data => {
                dispatch(retrieveLoading(false));
                dispatch(retrieveSuccess(data));
            })
            .catch(e => {
                dispatch(retrieveLoading(false));
                dispatch(retrieveError(e.message));
            });
    };
}

export function error(error) {
    return {type: 'USER_CHANGE_PASSWORD_ERROR', error};
}

export function loading(loading) {
    return {type: 'USER_CHANGE_PASSWORD_LOADING', loading};
}

export function success(updated) {
    return {type: 'USER_CHANGE_PASSWORD_SUCCESS', updated};
}

export function changePassword(item, values,context='admin') {
    return (dispatch) => {
        dispatch(error(null));
        dispatch(loading(true));
        dispatch(success(null));

        const url = getApiUrl(item['id'],context);
        return fetch(url, {
                    method: 'PUT',
                    headers: new Headers({'Content-Type': 'application/ld+json'}),
                    body: JSON.stringify(values),
                }
            )
            .then(response => response.json())
            .then(data => {
                dispatch(loading(false));
                dispatch(success(data));
            })
            .catch(e => {
                console.log(e);
                dispatch(loading(false));

                if (e instanceof SubmissionError) {
                    dispatch(error(e.errors._error));
                    throw e;
                }

                dispatch(error(e.message));
            });
    };
}

function getApiUrl(id,context='admin'){
    let url = `/users/${id}/change-password`;
    if(context==='profile'){
        url = `/profiles/${id}/password`;
    }
    console.log(context);
    return url;
}

export function reset() {
    return {type: 'USER_CHANGE_PASSWORD_RESET'};
}
