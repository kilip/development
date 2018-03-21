import fetch from '../../utils/fetch';
import {loading } from "../global";

export function error(error) {
  return {type: 'USER_DELETE_ERROR', error};
}

export function success(deleted) {
  return {type: 'USER_DELETE_SUCCESS', deleted};
}

export function del(item) {
  return (dispatch) => {
    dispatch(loading(true));

    return fetch(item['@id'], {method: 'DELETE'})
      .then(() => {
        dispatch(loading(false));
        dispatch(success(item))
      })
      .catch(e => {
        dispatch(loading(false));
        dispatch(error(e.message))
      });
  };
}
