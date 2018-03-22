import * as actions from "../../../actions/security/authentication";
import * as siapActions from '../../../actions/global';
import expect from 'expect';
import jwt from 'jsonwebtoken';
import { mockStore } from "../../util";

describe('login actions', () => {
    const iat = Math.floor(Date.now() / 1000);
    const exp = Math.floor(Date.now() / 1000)+30;
    const user = {
        username: 'admin',
        iat: iat,
        exp: exp
    };
    const token = jwt.sign(user,'secret');

    const credentials = {
        username: 'admin',
        password: 'admin'
    };

    it('should login user properly',() => {
        const credentials = {
            username: 'admin',
            password: 'admin'
        };
        fetch.mockResponse(JSON.stringify({token: token}));

        const store = mockStore({});
        const expectedActions = [
            { type: actions.LOGIN_RESET},
            { type: actions.LOGIN_REQUEST, fetching: true },
            { type: siapActions.SIAP_LOADING, loading: true},
            { type: siapActions.SIAP_LOADING, loading: false},
            { type: actions.LOGIN_SUCCESS, user: user}
        ];

        return store.dispatch(actions.login(credentials))
            .then(() => {
                expect(store.getActions()).toEqual(expectedActions);
                expect(localStorage.getItem('token')).toEqual(token);
            })
        ;
    });

    it('should handle login error',() => {
        const store = mockStore({});

        fetch.mockReject(new Error('some message'));
        const expectedActions = [
            { type: actions.LOGIN_RESET},
            { type: actions.LOGIN_REQUEST, fetching: true },
            { type: siapActions.SIAP_LOADING, loading: true },
            { type: siapActions.SIAP_LOADING, loading: false },
            { type: actions.LOGIN_REQUEST, fetching: false},
            { type: actions.LOGIN_FAILURE, error: 'some message'}
        ];

        return store.dispatch(actions.login(credentials))
            .then(() => {
                expect(store.getActions()).toEqual(expectedActions);
            })
        ;
    });

    it('should handle bad credentials',() => {
        const store = mockStore({});
        fetch.mockResponse(
            JSON.stringify({
                code: 401,
                message: 'Bad credentials'
            }),
            {status: 401,'content-type':'application/json'}
        );
        const expectedActions = [
            { type: actions.LOGIN_RESET},
            { type: actions.LOGIN_REQUEST, fetching: true },
            { type: siapActions.SIAP_LOADING, loading: true },
            { type: siapActions.SIAP_LOADING, loading: false },
            { type: actions.LOGIN_REQUEST, fetching: false},
            { type: actions.LOGIN_FAILURE, error: 'Username atau password anda salah'}
        ];

        return store.dispatch(actions.login(credentials))
            .catch((e) => {
                expect(store.getActions()).toEqual(expectedActions);
                expect(e.message).toBe('Submit Validation Failed');
            })
        ;
    });

    it('should logout user properly',() => {
        const expectedActions = [
            { type: actions.LOGIN_RESET }
        ];
        const store = mockStore({});
        localStorage.setItem('token','some value');
        store.dispatch(actions.logout());
        expect(store.getActions()).toEqual(expectedActions);
    });
});