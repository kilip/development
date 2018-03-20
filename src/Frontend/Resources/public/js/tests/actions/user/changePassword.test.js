import expect from 'expect';
import { mockStore } from "../../util";
import { changePassword, generateApiUrl, reset, retrieve } from "../../../actions/user/changePassword";
import { SubmissionError } from 'redux-form';

describe('user changePassword actions', () => {

    const mockUserData = {
        id: 'some-id',
        fullName: 'some full name'
    };

    it('should generateApiUrl based on context', () => {
        expect(generateApiUrl('some-id','admin')).toEqual('/users/some-id/change-password');
        expect(generateApiUrl('some-id','profile')).toEqual('/profiles/some-id/password');
        expect(() => {
            generateApiUrl('some-id','invalid');
        }).toThrow();
    });

    it('should handle reset', () => {
        const store = mockStore();

        store.dispatch(reset());
        expect(store.getActions()).toEqual([
            { type: 'USER_CHANGE_PASSWORD_RESET' }
        ]);
    });


    it('should handle retrieve', () => {
        const store = mockStore();
        fetch.mockResponse(JSON.stringify(mockUserData));
        const expected = [
            {type: 'USER_CHANGE_PASSWORD_RETRIEVE_ERROR', retrieveError: null},
            {type: 'USER_CHANGE_PASSWORD_RETRIEVE_SUCCESS', retrieved: null},
            {type: 'USER_CHANGE_PASSWORD_RETRIEVE_LOADING', retrieveLoading: true},
            {type: 'USER_CHANGE_PASSWORD_RETRIEVE_LOADING', retrieveLoading: false},
            {type: 'USER_CHANGE_PASSWORD_RETRIEVE_SUCCESS', retrieved: mockUserData},
        ];

        return store.dispatch(retrieve(mockUserData))
            .then(() => {
                expect(store.getActions()).toEqual(expected);
            })
        ;
    });

    it('should handle retrieve error', () => {
        const store = mockStore();
        fetch.mockReject(new Error('some error'));
        const expected = [
            {type: 'USER_CHANGE_PASSWORD_RETRIEVE_ERROR', retrieveError: null},
            {type: 'USER_CHANGE_PASSWORD_RETRIEVE_SUCCESS', retrieved: null},
            {type: 'USER_CHANGE_PASSWORD_RETRIEVE_LOADING', retrieveLoading: true},
            {type: 'USER_CHANGE_PASSWORD_RETRIEVE_LOADING', retrieveLoading: false},
            {type: 'USER_CHANGE_PASSWORD_RETRIEVE_ERROR', retrieveError: 'some error'},
        ];

        return store.dispatch(retrieve(mockUserData))
            .then(() => {
                expect(store.getActions()).toEqual(expected);
            })
            ;
    });


    it('should handle change password',() => {
        const store = mockStore();
        fetch.mockResponse(JSON.stringify(mockUserData));
        const expected = [
            {type: 'USER_CHANGE_PASSWORD_ERROR', error: null},
            {type: 'USER_CHANGE_PASSWORD_LOADING', loading: true},
            {type: 'USER_CHANGE_PASSWORD_SUCCESS', updated: null},
            {type: 'USER_CHANGE_PASSWORD_LOADING', loading: false},
            {type: 'USER_CHANGE_PASSWORD_SUCCESS', updated: mockUserData},
        ];

        return store.dispatch(changePassword(mockUserData,{}))
            .then(() => {
                expect(store.getActions()).toEqual(expected);
            })
        ;
    });

    it('should handle change password error',() => {
        const store = mockStore();
        fetch.mockReject(new Error('some error'))
        const expected = [
            {type: 'USER_CHANGE_PASSWORD_ERROR', error: null},
            {type: 'USER_CHANGE_PASSWORD_LOADING', loading: true},
            {type: 'USER_CHANGE_PASSWORD_SUCCESS', updated: null},
            {type: 'USER_CHANGE_PASSWORD_LOADING', loading: false},
            {type: 'USER_CHANGE_PASSWORD_ERROR', error: 'some error'},
        ];

        return store.dispatch(changePassword(mockUserData,{}))
            .catch(() => {
                expect(store.getActions()).toEqual(expected);
            })
        ;
    });

    it('should handle change password submission error',() => {
        const store = mockStore();
        const errors = { _error: 'some error'};
        fetch.mockReject(new SubmissionError(errors));
        const expected = [
            {type: 'USER_CHANGE_PASSWORD_ERROR', error: null},
            {type: 'USER_CHANGE_PASSWORD_LOADING', loading: true},
            {type: 'USER_CHANGE_PASSWORD_SUCCESS', updated: null},
            {type: 'USER_CHANGE_PASSWORD_LOADING', loading: false},
            {type: 'USER_CHANGE_PASSWORD_ERROR', error: 'some error'},
        ];

        return store.dispatch(changePassword(mockUserData,{}))
            .catch(() => {
                expect(store.getActions()).toEqual(expected);
            })
        ;
    });

});