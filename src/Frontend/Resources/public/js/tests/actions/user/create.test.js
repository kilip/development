import expect from 'expect';
import { mockStore } from "../../util";
import { create } from "../../../actions/user/create";
import { SubmissionError } from 'redux-form';
import * as siap from "../../../actions/global";

describe('user create actions', () => {
    const mockUserData = {
        '@id': '/api/some-id',
        id: 'some-id',
        fullName: 'some full name'
    };

    it('should handle create', () => {
        fetch.mockResponse(JSON.stringify(mockUserData));
        const store = mockStore({});
        const expected = [
            { type: siap.SIAP_LOADING, loading: true},
            { type: siap.SIAP_LOADING, loading: false},
            { type: 'USER_CREATE_SUCCESS', created: mockUserData }
        ];

        return store.dispatch(create(mockUserData))
            .then(() => {
                expect(store.getActions()).toEqual(expected);
            })
        ;
    });

    it('should handle error', () => {
        fetch.mockReject(new Error('some error'));
        const store = mockStore();
        const expected = [
            { type: siap.SIAP_LOADING, loading: true},
            { type: siap.SIAP_LOADING, loading: false},
            { type: 'USER_CREATE_ERROR', error: 'some error' }
        ];
        return store.dispatch(create(mockUserData))
            .catch(() => {
                expect(store.getActions()).toEqual(expected);
            })
        ;
    });

    it('should handle submission error', () => {
        const errors = { _error: 'some error'};
        fetch.mockReject(new SubmissionError(errors));
        const store = mockStore();
        const expected = [
            { type: siap.SIAP_LOADING, loading: true},
            { type: siap.SIAP_LOADING, loading: false},
            { type: 'USER_CREATE_ERROR', error: 'some error' }
        ];
        return store.dispatch(create(mockUserData))
            .catch(() => {
                expect(store.getActions()).toEqual(expected);
            })
        ;
    });
});