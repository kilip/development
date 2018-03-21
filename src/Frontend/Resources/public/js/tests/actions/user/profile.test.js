import { update,retrieve,reset } from '../../../actions/user/profile';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import expect from 'expect';
import {SubmissionError} from 'redux-form';
import * as siap from "../../../actions/global";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('user profile actions', () => {
    it('should handle user profile update', () => {
        const returns = {"@context":"\/api\/contexts\/User","@id":"\/api\/users\/84ca0c6a-05c9-4e17-86fa-bdb7f712ad68","@type":"User","id":"84ca0c6a-05c9-4e17-86fa-bdb7f712ad68","fullName":"Super Administrator Test","username":"admin","email":"admin@example.com"};
        fetch.mockResponse(JSON.stringify(returns));

        const item = {
            id: 'some-id'
        };
        const expectedActions = [
            {type: 'USER_PROFILE_ERROR', error: null},
            {type: siap.SIAP_LOADING, loading: true},
            {type: 'USER_PROFILE_UPDATED_SUCCESS', updated: null},
            {type: siap.SIAP_LOADING, loading: false},
            {type: 'USER_PROFILE_UPDATED_SUCCESS', updated: returns},
        ];

        const store = mockStore({ config: {token: "" } });
        return store.dispatch(update(item,{}))
            .then(() => {
                expect(store.getActions()).toEqual(expectedActions);
            })
        ;
    });

    it('should handle user profile submission error', () => {
        const item = {
            id: 'some-id'
        };
        fetch.mockReject(new SubmissionError({_error: 'hello'}));
        const expectedActions = [
            {type: 'USER_PROFILE_ERROR', error: null},
            {type: siap.SIAP_LOADING, loading: true},
            {type: 'USER_PROFILE_UPDATED_SUCCESS', updated: null},
            {type: siap.SIAP_LOADING, loading: false},
            {type: 'USER_PROFILE_ERROR', error: 'hello'},
        ];

        const store = mockStore({ config: {token: "" } });
        return store.dispatch(update(item,{}))
            .catch(() => {
                expect(store.getActions()).toEqual(expectedActions);
            })
        ;
    });

    it('should handle user profile error', () => {
        const item = {
            id: 'some-id'
        };
        fetch.mockReject(new Error('some error'));
        const expectedActions = [
            {type: 'USER_PROFILE_ERROR', error: null},
            {type: siap.SIAP_LOADING, loading: true},
            {type: 'USER_PROFILE_UPDATED_SUCCESS', updated: null},
            {type: siap.SIAP_LOADING, loading: false},
            {type: 'USER_PROFILE_ERROR', error: 'some error'}
        ];

        const store = mockStore({ config: {token: "" } });
        return store.dispatch(update(item,{}))
            .then(() => {
                expect(store.getActions()).toEqual(expectedActions);
            })
        ;
    });

    it('should handle retrieving user profile', () => {
        const returns = {data: 'some-data'};
        fetch.mockResponse(JSON.stringify(returns));

        const item = {
            id: 'some-id'
        };
        const expectedActions = [
            {type: siap.SIAP_LOADING, loading: true},
            {type: 'USER_PROFILE_ERROR', error: null},
            {type: 'USER_PROFILE_RETRIEVED_SUCCESS', retrieved: null},
            {type: siap.SIAP_LOADING, loading: false},
            {type: 'USER_PROFILE_RETRIEVED_SUCCESS', retrieved: returns},
        ];

        const store = mockStore({ config: {token: "" } });
        return store.dispatch(retrieve(item,{}))
            .then(() => {
                expect(store.getActions()).toEqual(expectedActions);
            })
        ;
    });

    it('should handle retrieving user profile error', () => {
        const item = {
            id: 'some-id'
        };
        fetch.mockReject(new SubmissionError());
        const expectedActions = [
            {type: siap.SIAP_LOADING, loading: true},
            {type: 'USER_PROFILE_ERROR', error: null},
            {type: 'USER_PROFILE_RETRIEVED_SUCCESS', retrieved: null},
            {type: siap.SIAP_LOADING, loading: false},
            {type: 'USER_PROFILE_ERROR', error: 'Submit Validation Failed'},
        ];

        const store = mockStore({ config: {token: "" } });
        return store.dispatch(retrieve(item,{}))
            .then(() => {
                expect(store.getActions()).toEqual(expectedActions);
            })
        ;
    });

    it('should reset profile state', () => {
        expect(reset()).toEqual({type: 'USER_PROFILE_RESET'});
    });
});