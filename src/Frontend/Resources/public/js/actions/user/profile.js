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

export function retrieve(currentUser) {
    let url = `/profiles/${currentUser['id']}`;
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

export function updateSuccess(updated) {
    return {type: 'USER_PROFILE_UPDATED_SUCCESS', updated};
}

export function update(item, values) {
    let url = `/profiles/${item['id']}`;
    return (dispatch) => {
        dispatch(error(null));
        dispatch(loading(true));
        dispatch(updateSuccess(null));
        return fetch(url, {
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
                    dispatch(error(e.errors._error));
                    throw e;
                }

                dispatch(error(e.message));
            });
    };
}

export function reset() {
    return {type: 'USER_PROFILE_RESET'};
}