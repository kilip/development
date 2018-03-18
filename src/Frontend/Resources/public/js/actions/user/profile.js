import fetch from '../../utils/fetch';
import { SubmissionError } from 'redux-form';

export function error(error) {
    return {type: 'USER_PROFILE_ERROR', error};
}

export function loading(loading) {
    return {type: 'USER_PROFILE_LOADING', loading};
}

export function retrieved(retrieved) {
    return {type: 'USER_PROFILE_RETRIEVED_SUCCESS', retrieved};
}

export function retrieve() {
    let url = '/me';
    return (dispatch) => {
        dispatch(loading(true));

        return fetch(url)
            .then(response => response.json())
            .then(data => {
                dispatch(loading(false));
                dispatch(retrieved(data));
            })
            .catch(e => {
                dispatch(loading(false));
                dispatch(error(e.message));
            });
    };
}

export function updateError(error) {
    return {type: 'USER_PROFILE_ERROR', error};
}

export function updateLoading(updateLoading) {
    return {type: 'USER_PROFILE_UPDATE_LOADING', updateLoading};
}

export function updateSuccess(updated) {
    return {type: 'USER_PROFILE_UPDATED_SUCCESS', updated};
}

export function update(item, values) {
    return (dispatch) => {
        dispatch(updateError(null));
        dispatch(updateLoading(true));
        dispatch(updateSuccess(null));

        return fetch(item['@id'], {
                method: 'PUT',
                headers: new Headers({'Content-Type': 'application/ld+json'}),
                body: JSON.stringify(values),
            }
        )
            .then(response => response.json())
            .then(data => {
                dispatch(updateLoading(false));
                dispatch(updateSuccess(data));
            })
            .catch(e => {
                dispatch(updateLoading(false));

                if (e instanceof SubmissionError) {
                    dispatch(updateError(e.errors._error));
                    throw e;
                }

                dispatch(updateError(e.message));
            });
    };
}

export function reset() {
    return {type: 'USER_PROFILE_RESET'};
}