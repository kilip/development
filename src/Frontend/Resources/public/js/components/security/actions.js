import * as constants from './constants';
import {USER_LOGGED_IN, USER_LOGIN_ERROR} from "./constants";
import {API_LOGIN_CHECK} from "../../config/global";
import { decodeToken } from './util';

export function login(data, options={}){
    return function(dispatch){
        if ('undefined' === typeof options.headers){
            options.headers = new Headers();
        }
        options.headers.set('Accept','application/ld+json');
        options.headers.set('Content-Type','application/json');
        options.body = JSON.stringify(data);
        options.method = 'POST';


        fetch(API_LOGIN_CHECK,options).then(response => {
            if(response.ok){
                response.json().then(json => {
                    const token = json.token;
                    const payload = decodeToken(token);
                    payload.token = token;
                    localStorage.setItem('token',json.token);
                    dispatch({type: USER_LOGGED_IN,payload: payload});
                });
            }else{
                response.json().then(json => {
                    dispatch({type: USER_LOGIN_ERROR, payload: json})
                })
            }
        });
    }
}

export function logout() {
    return {
        type: constants.USER_LOGGED_OUT
    }
}
