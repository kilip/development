import {loading} from "./global";
import * as constants from './constants';
import fetch from '../utils/fetch';
import { SubmissionError } from 'redux-form';
import { addSuccess } from "../components/flash/actions";

export function listRetrieved(retrieved){
    return {
        type: constants.BAPTISAN_LIST_RETRIEVED,
        retrieved
    }
}

export function error(error){
    return {
        type: constants.BAPTISAN_ERROR,
        error
    }
}

export function listRetrieve(page=1){
    return (dispatch) => {
        const url = `/baptisans?page=${page}`;
        dispatch(listReset());
        dispatch(loading(true));
        return fetch(url)
            .then(response => response.json())
            .then(data => {
                dispatch(loading(false));
                dispatch(listRetrieved(data));
            })
            .catch(e => {
                dispatch(loading(false));
                dispatch(error(e.message));
            })
        ;
    }
}

export function listReset(){
    return {
        type: constants.BAPTISAN_LIST_RESET
    }
}


export function retrieveSuccess(retrieved){
    return {
        type: constants.BAPTISAN_RETRIEVED,
        retrieved
    }
}

export function retrieve(id){
    return (dispatch) => {
        dispatch(reset());
        dispatch(loading(true));
        const url = `/baptisans/${id}`;
        return fetch(url)
            .then(response => response.json())
            .then(data => {
                dispatch(loading(false));
                dispatch(retrieveSuccess(data));
            })
            .catch(e => {
                dispatch(loading(false));
                dispatch(error(e.message));
            })
        ;
    };
}

export function createSuccess(created){
    return {
        type: constants.BAPTISAN_CREATED,
        created
    }
}

export function create(values){
    return (dispatch) => {
        dispatch(loading(true));
        return fetch('/baptisans',{
            method: 'POST',
            body: JSON.stringify(values)
        })
            .then(response => {
                dispatch(loading(false));
                return response.json();
            })
            .then(data => dispatch(createSuccess(data)))
            .catch(e => {
                dispatch(loading(false));
                if (e instanceof SubmissionError) {
                    dispatch(error(e.errors._error));
                    throw e;
                }
                dispatch(error(e.message));
            })
        ;
    };
}

export function updateSuccess(data){
    return {
        type: constants.BAPTISAN_UPDATED,
        updated: data
    }
}

export function update(item,values){
    return (dispatch) => {
        dispatch(reset());
        dispatch(loading(true));

        return fetch(item['@id'],{
            method: 'PUT',
            body: JSON.stringify(values)
        })
            .then(response => response.json())
            .then(data => {
                dispatch(loading(false));
                dispatch(updateSuccess(data));
                dispatch(addSuccess(`Perubahan <strong>${data['nama']}</strong> berhasil disimpan`,'baptisan'));
            })
            .catch(e => {
                dispatch(loading(false));
                if(e instanceof SubmissionError){
                    dispatch(error(e.errors._error));
                    throw e;
                }
                dispatch(error(e.message));
            })
        ;
    };
}

export function removeSuccess(removed) {
    return {
        type: constants.BAPTISAN_REMOVED,
        removed
    };
}

export function remove(item){
    return (dispatch) => {
        dispatch(loading(true));
        return fetch(item['@id'],{method: 'DELETE'})
            .then(() => {
                dispatch(loading(false));
                dispatch(removeSuccess(item));
            })
            .catch(e => {
                dispatch(loading(false));
                dispatch(error(e.message))
            })
        ;
    }
}

export function reset(){
    return {
        type: constants.BAPTISAN_RESET
    }
}