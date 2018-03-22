import { combineReducers } from 'redux'

export function retrieveError(state = null, action) {
  switch (action.type) {
    case 'USER_UPDATE_RETRIEVE_ERROR':
      return action.retrieveError;

    case 'USER_UPDATE_RESET':
      return null;

    default:
      return state;
  }
}

export function retrieved(state = null, action) {
  switch (action.type) {
    case 'USER_UPDATE_RETRIEVE_SUCCESS':
      return action.retrieved;

    case 'USER_UPDATE_RESET':
      return null;

    default:
      return state;
  }
}

export function updateError(state = null, action) {
  switch (action.type) {
    case 'USER_UPDATE_UPDATE_ERROR':
      return action.updateError;

    case 'USER_UPDATE_RESET':
      return null;

    default:
      return state;
  }
}

export function updated(state = null, action) {
  switch (action.type) {
    case 'USER_UPDATE_UPDATE_SUCCESS':
      return action.updated;

    case 'USER_UPDATE_RESET':
      return null;

    default:
      return state;
  }
}

export default combineReducers({retrieveError, retrieved, updateError,  updated});
