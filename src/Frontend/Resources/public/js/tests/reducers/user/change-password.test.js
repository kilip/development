import reducers from '../../../reducers/user/change-password';
import {reducerTest} from "../../util";
const initialState = {
    retrieveError: null,
    retrieveLoading: false,
    retrieved: null,
    error: null,
    loading: false,
    updated: null,
};

describe('user change password reducers', () => {

    it('should handle initial state', () => {
        expect(reducers(undefined,{})).toEqual(initialState);
    });

    const actions = [
        {
            type: 'USER_CHANGE_PASSWORD_RESET',
            expectedState: { ...initialState },
            action: {}
        },
        {
            type: 'USER_CHANGE_PASSWORD_RETRIEVE_LOADING',
            expectedState: { ...initialState, retrieveLoading: true},
            action: { retrieveLoading: true }
        },
        {
            type: 'USER_CHANGE_PASSWORD_RETRIEVE_ERROR',
            expectedState: { ...initialState, retrieveError: 'some error'},
            action: { retrieveError: 'some error' }
        },
        {
            type: 'USER_CHANGE_PASSWORD_RETRIEVE_SUCCESS',
            expectedState: { ...initialState, retrieved: 'some data'},
            action: { retrieved: 'some data' }
        },
        {
            type: 'USER_CHANGE_PASSWORD_LOADING',
            expectedState: { ...initialState, loading: true},
            action: { loading: true }
        },
        {
            type: 'USER_CHANGE_PASSWORD_ERROR',
            expectedState: { ...initialState, error: 'some error'},
            action: { error: 'some error' }
        },
        {
            type: 'USER_CHANGE_PASSWORD_SUCCESS',
            expectedState: { ...initialState, updated: 'bar'},
            action: { updated: 'bar'}
        }
    ];

    reducerTest(reducers,initialState,actions);

});