import fetch from '../../utils/fetch';
import { loading } from "../global";

export function error(error) {
  return {type: 'USER_SHOW_ERROR', error};
}

export function retrieved(retrieved) {
  return {type: 'USER_SHOW_RETRIEVED_SUCCESS', retrieved};
}

export function retrieve(id) {
  return (dispatch) => {
    dispatch(loading(true));

    return fetch(id)
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

export function reset() {
  return {type: 'USER_SHOW_RESET'};
}
