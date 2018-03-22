import {combineReducers} from 'redux'

export function error(state = null, action) {
  switch (action.type) {
    case 'USER_LIST_ERROR':
      return action.error;

    case 'USER_LIST_RESET':
      return null;

    default:
      return state;
  }
}

export function data(state = {}, action) {
  switch (action.type) {
    case 'USER_LIST_SUCCESS':
      return action.data;

    case 'USER_LIST_RESET':
      return {};

    default:
      return state;
  }
}

export default combineReducers({error, data});
