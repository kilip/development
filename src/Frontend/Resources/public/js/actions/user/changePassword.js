import { SubmissionError } from 'redux-form';
import fetch from '../../utils/fetch';

const USER_ADMIN_CONTEXT = 'admin';
const USER_PROFILE_CONTEXT = 'profile';

export function retrieveError(retrieveError) {
    return {type: 'USER_CHANGE_PASSWORD_RETRIEVE_ERROR', retrieveError};
}

export function retrieveLoading(retrieveLoading) {
    return {type: 'USER_CHANGE_PASSWORD_RETRIEVE_LOADING', retrieveLoading};
}

export function retrieveSuccess(retrieved) {
    return {type: 'USER_CHANGE_PASSWORD_RETRIEVE_SUCCESS', retrieved};
}

export function retrieve(id,context=USER_ADMIN_CONTEXT) {
    const url = generateApiUrl(id,context);
    return (dispatch) => {
        dispatch(retrieveError(null));
        dispatch(retrieveSuccess(null));
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

export function changePassword(item, values,context=USER_ADMIN_CONTEXT) {
    return (dispatch) => {
        dispatch(error(null));
        dispatch(loading(true));
        dispatch(success(null));

        const url = generateApiUrl(item['id'],context);
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
                dispatch(loading(false));

                if (e instanceof SubmissionError) {
                    dispatch(error(e.errors._error));
                    throw e;
                }

                dispatch(error(e.message));
            });
    };
}

export function generateApiUrl(id, context=USER_ADMIN_CONTEXT){
    if(context===USER_ADMIN_CONTEXT){
        return `/users/${id}/change-password`;
    }
    if(context===USER_PROFILE_CONTEXT){
        return `/profiles/${id}/password`;
    }
    throw new Error(`Can't generate api url, context not valid: ${context}`);
}

export function reset() {
    return {type: 'USER_CHANGE_PASSWORD_RESET'};
}
