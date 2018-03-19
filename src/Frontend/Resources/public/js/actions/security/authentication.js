import {API_LOGIN_CHECK} from "../../config/global";
import jwt from 'jsonwebtoken';

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

export function receiveLogin(data){
    return {
        type: LOGIN_SUCCESS,
        user: data.user
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
    console.log(credentials);
    options.headers = new Headers();
    options.headers.set('Accept','application/ld+json');
    options.headers.set('Content-Type','application/json');
    options.body = JSON.stringify(credentials);
    options.method = 'POST';

    return (dispatch) => {
        dispatch(reset());
        dispatch(requestLogin(true));

        return fetch(API_LOGIN_CHECK,options)
            .then(response => response.json().then(data => {
                if (!response.ok) {
                    // If there was a problem, we want to
                    // dispatch the error condition
                    console.log(data);
                    let message = "Gagal login";
                    if(data.code === 401){
                        message = 'Username atau password anda salah';
                    }
                    dispatch(loginError(message));
                } else {
                    // If login was successful, set the token in local storage
                    data.user = jwt.decode(data.token);
                    localStorage.setItem('token', data.token);

                    // Dispatch the success action
                    dispatch(receiveLogin(data))
                }
            }))
            .catch(err => {
                dispatch(loginError(err.message));
            })
        ;
    };
}

export function logout(){
    return (dispatch) => {
        dispatch(reset());
        localStorage.clear();
    }
}