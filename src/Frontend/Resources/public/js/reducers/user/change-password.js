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

export function retrieveLoading(state = false, action) {
  switch (action.type) {
    case 'USER_CHANGE_PASSWORD_RETRIEVE_LOADING':
      return action.retrieveLoading;

    case 'USER_CHANGE_PASSWORD_RESET':
      return false;

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

export function loading(state = false, action) {
  switch (action.type) {
    case 'USER_CHANGE_PASSWORD_LOADING':
      return action.loading;

    case 'USER_CHANGE_PASSWORD_RESET':
      return false;

    default:
      return state;
  }
}

export function success(state = null, action) {
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
    retrieveLoading,
    retrieved,
    error,
    loading,
    success
});
