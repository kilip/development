import { combineReducers } from 'redux'

export function retrieveError(state = null, action) {
  switch (action.type) {
    case 'USER_CHANGE_PASSWORD_RETRIEVE_ERROR':
      return action.retrieveError;

    case 'USER_CHANGE_PASSWORD_RESET':
      return null;

    default:
      return state;
  }
}

export function retrieved(state = null, action) {
  switch (action.type) {
    case 'USER_CHANGE_PASSWORD_RETRIEVE_SUCCESS':
      return action.retrieved;

    case 'USER_CHANGE_PASSWORD_RESET':
      return null;

    default:
      return state;
  }
}

export function error(state = null, action) {
  switch (action.type) {
    case 'USER_CHANGE_PASSWORD_ERROR':
      return action.error;

    case 'USER_CHANGE_PASSWORD_RESET':
      return null;

    default:
      return state;
  }
}

export function updated(state = null, action) {
  switch (action.type) {
    case 'USER_CHANGE_PASSWORD_SUCCESS':
      return action.updated;

    case 'USER_CHANGE_PASSWORD_RESET':
      return null;

    default:
      return state;
  }
}

export default combineReducers({
    retrieveError,
    retrieved,
    error,
    updated
});
