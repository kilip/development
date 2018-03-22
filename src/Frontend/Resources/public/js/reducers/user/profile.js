import { combineReducers } from 'redux'

export function error(state = null, action) {
    switch (action.type) {
        case 'USER_PROFILE_ERROR':
            return action.error;

        case 'USER_PROFILE_RESET':
            return null;

        default:
            return state;
    }
}

export function retrieved(state = null, action) {
    switch (action.type) {
        case 'USER_PROFILE_RETRIEVED_SUCCESS':
            return action.retrieved;

        case 'USER_PROFILE_RESET':
            return null;

        default:
            return state;
    }
}

export function updated(state = null, action){
    switch (action.type) {
        case 'USER_PROFILE_UPDATED_SUCCESS':
            return action.updated;

        case 'USER_PROFILE_RESET':
            return null;

        default:
            return state;
    }
}

export default combineReducers({error, retrieved,updated});
