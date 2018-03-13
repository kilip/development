import * as constants from './constants';
import axios from 'axios';
import {USER_LOGGED_IN} from "./constants";
import { decodeToken } from './util';
import * as globals from '../../config/global';

export function login(data){
    console.log(globals.API_LOGIN_CHECK);
    return function(dispatch){
        const config = {
            headers: {
                'Accept': 'application/ld+json',
                'Content-Type': 'application/json'
            },
            json: true
        };
        axios.post(globals.API_LOGIN_CHECK,JSON.stringify(data),config)
            .then(response => {
                const token = response.data.token;
                const payload = decodeToken(token);
                payload.token = token;
                dispatch({type: USER_LOGGED_IN,payload: payload});
                localStorage.setItem('token',response.data.token);
            })
            .catch((e) => {

                console.log(e);
            })
        ;
    }
}

export function logout() {
    return {
        type: constants.USER_LOGGED_OUT
    }
}
