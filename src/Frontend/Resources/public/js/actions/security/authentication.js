import {API_LOGIN_CHECK} from "../../config/global";
import jwt from 'jsonwebtoken';
import { SubmissionError } from 'redux-form';
import { loading } from "../../actions/global";
import { addSuccess } from "../../components/flash/actions";

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGIN_RESET   = 'LOGIN_RESET';

export function requestLogin(fetching){
    return {
        type: LOGIN_REQUEST,
        fetching: fetching
    };
}

export function receiveLogin(user){
    return {
        type: LOGIN_SUCCESS,
        user
    }
}

export function loginError(message){
    return {
        type: LOGIN_FAILURE,
        error: message
    }
}

export function reset(){
    return {
        type: LOGIN_RESET
    }
}

export function login(credentials,options={}){
    options.headers = new Headers();
    options.headers.set('Accept','application/ld+json');
    options.headers.set('Content-Type','application/json');
    options.body = JSON.stringify(credentials);
    options.method = 'POST';

    return (dispatch) => {
        dispatch(reset());
        dispatch(requestLogin(true));
        dispatch(loading(true));

        return fetch(API_LOGIN_CHECK,options)
            .then(response => response.json().then(data => {
                if (!response.ok) {
                    // If there was a problem, we want to
                    // dispatch the error condition
                    let message = "Gagal login";
                    if(data.code === 401){
                        message = 'Username atau password anda salah';
                    }
                    let errors = {
                        _error: message,
                    };
                    throw new SubmissionError(errors);
                } else {
                    // If login was successful, set the token in local storage
                    const user = jwt.decode(data.token);
                    localStorage.setItem('token', data.token);

                    // Dispatch the success action
                    dispatch(loading(false));
                    dispatch(receiveLogin(user));
                    const flashMessage = `Selamat datang <strong>${user['fullName']}</strong> di SIAP`;
                    dispatch(addSuccess(flashMessage));
                }
            }))
            .catch(err => {
                dispatch(loading(false));
                dispatch(requestLogin(false));
                if(err instanceof SubmissionError){
                    dispatch(loginError(err.errors._error));
                    throw err;
                }
                dispatch(loginError(err.message));
            })
        ;
    };
}

export function logout(){
    return (dispatch) => {
        dispatch(reset());
    };
}