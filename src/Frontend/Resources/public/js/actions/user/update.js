import { SubmissionError } from 'redux-form';
import fetch from '../../utils/fetch';
import { success as createSuccess } from './create';
import { loading } from "../global";

export function retrieveError(retrieveError) {
    return {type: 'USER_UPDATE_RETRIEVE_ERROR', retrieveError};
}

export function retrieveSuccess(retrieved) {
    return {type: 'USER_UPDATE_RETRIEVE_SUCCESS', retrieved};
}

export function retrieve(id) {
    return (dispatch) => {
        dispatch(loading(true));

        return fetch(id)
            .then(response => response.json())
            .then(data => {
                dispatch(loading(false));
                dispatch(retrieveSuccess(data));
            })
            .catch(e => {
                dispatch(loading(false));
                dispatch(retrieveError(e.message));
            });
    };
}

export function updateError(updateError) {
    return {type: 'USER_UPDATE_UPDATE_ERROR', updateError};
}

export function updateSuccess(updated) {
    return {type: 'USER_UPDATE_UPDATE_SUCCESS', updated};
}

export function update(item, values) {
    return (dispatch) => {
        dispatch(updateError(null));
        dispatch(createSuccess(null));
        dispatch(loading(true));
        dispatch(updateSuccess(null));

        return fetch(item['@id'], {
                method: 'PUT',
                headers: new Headers({'Content-Type': 'application/ld+json'}),
                body: JSON.stringify(values),
            }
        )
            .then(response => response.json())
            .then(data => {
                dispatch(loading(false));
                dispatch(updateSuccess(data));
            })
            .catch(e => {
                dispatch(loading(false));

                if (e instanceof SubmissionError) {
                    dispatch(updateError(e.errors._error));
                    throw e;
                }

                dispatch(updateError(e.message));
            });
    };
}

export function reset() {
    return {type: 'USER_UPDATE_RESET'};
}
