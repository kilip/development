import { retrieve, update, reset } from '../../../actions/user/update';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import expect from 'expect';
import { SubmissionError } from 'redux-form';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('user update actions', () => {
    const mockUserData = {
        '@id': '/api/some-id',
        id: 'some-id',
        fullName: 'some full name'
    };

    it('should handle reset', () => {
        const store = mockStore({});
        const expected = [
            {type: 'USER_UPDATE_RESET'},
        ];

        store.dispatch(reset());
        expect(store.getActions()).toEqual(expected);
    });

    it('should handle retrieve', () => {
        fetch.mockResponse(JSON.stringify(mockUserData));
        const store = mockStore({});
        const expected = [
            {type: 'USER_UPDATE_RETRIEVE_LOADING', retrieveLoading: true },
            {type: 'USER_UPDATE_RETRIEVE_LOADING', retrieveLoading: false },
            {type: 'USER_UPDATE_RETRIEVE_SUCCESS', retrieved: mockUserData },
        ];

        return store.dispatch(retrieve('some-id'))
            .then(() => {
                expect(store.getActions()).toEqual(expected);
            })
        ;
    });

    it('should handle retrieve error', () => {
        fetch.mockReject(new Error('some error'));
        const store = mockStore({});
        const expected = [
            {type: 'USER_UPDATE_RETRIEVE_LOADING', retrieveLoading: true },
            {type: 'USER_UPDATE_RETRIEVE_LOADING', retrieveLoading: false },
            {type: 'USER_UPDATE_RETRIEVE_ERROR', retrieveError: 'some error' },
        ];

        return store.dispatch(retrieve('some-id'))
            .then(() => {
                expect(store.getActions()).toEqual(expected);
            })
        ;
    });

    it('should handle update', () => {
        fetch.mockResponse(JSON.stringify(mockUserData));
        const store = mockStore({});
        const expected = [
            { type: 'USER_UPDATE_UPDATE_ERROR', updateError: null },
            { type: 'USER_CREATE_SUCCESS', created: null },
            { type: 'USER_UPDATE_UPDATE_LOADING', updateLoading: true },
            { type: 'USER_UPDATE_UPDATE_SUCCESS', updated: null },
            { type: 'USER_UPDATE_UPDATE_LOADING', updateLoading: false },
            { type: 'USER_UPDATE_UPDATE_SUCCESS', updated: mockUserData },
        ];

        return store.dispatch(update(mockUserData,{}))
            .then(() => {
                expect(store.getActions()).toEqual(expected);
            })
        ;
    });

    it('should handle update error', () => {
        fetch.mockReject(new Error('some error'));
        const store = mockStore({});
        const expected = [
            { type: 'USER_UPDATE_UPDATE_ERROR', updateError: null },
            { type: 'USER_CREATE_SUCCESS', created: null },
            { type: 'USER_UPDATE_UPDATE_LOADING', updateLoading: true },
            { type: 'USER_UPDATE_UPDATE_SUCCESS', updated: null },
            { type: 'USER_UPDATE_UPDATE_LOADING', updateLoading: false },
            { type: 'USER_UPDATE_UPDATE_ERROR', updateError: 'some error' },
        ];

        return store.dispatch(update(mockUserData,{}))
            .then(() => {
                expect(store.getActions()).toEqual(expected);
            })
        ;
    });

    it('should handle update submission error', () => {
        const errors = {_error: 'some error'};
        fetch.mockReject(new SubmissionError(errors));
        const store = mockStore({});
        const expected = [
            { type: 'USER_UPDATE_UPDATE_ERROR', updateError: null },
            { type: 'USER_CREATE_SUCCESS', created: null },
            { type: 'USER_UPDATE_UPDATE_LOADING', updateLoading: true },
            { type: 'USER_UPDATE_UPDATE_SUCCESS', updated: null },
            { type: 'USER_UPDATE_UPDATE_LOADING', updateLoading: false },
            { type: 'USER_UPDATE_UPDATE_ERROR', updateError: 'some error' },
        ];

        return store.dispatch(update(mockUserData,{}))
            .catch(() => {
                expect(store.getActions()).toEqual(expected);
            })
        ;
    });
});
