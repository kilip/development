import { combineReducers } from 'redux'

export function error(state = null, action) {
  switch (action.type) {
    case 'USER_CREATE_ERROR':
      return action.error;

    default:
      return state;
  }
}


export function created(state = null, action) {
  switch (action.type) {
    case 'USER_CREATE_SUCCESS':
      return action.created;

    default:
      return state;
  }
}

export default combineReducers({error, created});
