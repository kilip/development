import * as actions from "../../../actions/security/authentication";
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import expect from 'expect';
import jwt from 'jsonwebtoken';


const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('login actions', () => {
    const iat = Math.floor(Date.now() / 1000);
    const exp = Math.floor(Date.now() / 1000)+30;
    const user = {
        username: 'admin',
        iat: iat,
        exp: exp
    };
    const token = jwt.sign(user,'secret');

    it('should login user properly',() => {
        const credentials = {
            username: 'admin',
            password: 'admin'
        };
        const store = mockStore({});

        fetch.mockResponse(JSON.stringify({token: token}));

        const expectedActions = [
            { type: actions.LOGIN_RESET},
            { type: actions.LOGIN_REQUEST, fetching: true },
            { type: actions.LOGIN_SUCCESS, user: user}
        ];

        return store.dispatch(actions.login(credentials))
            .then(() => {
                expect(store.getActions()).toEqual(expectedActions);
            })
        ;
    });
});