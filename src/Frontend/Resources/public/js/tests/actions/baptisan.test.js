import expect from 'expect';
import * as actions from '../../actions/baptisan';
import * as constants from '../../actions/constants';
import { mockStore } from "../util";
import { SubmissionError } from 'redux-form';

describe('baptisan actions', () => {
    const mockList = [
        {id: 'some id'}
    ];

    const mockItem = {
        '@id': '/some-id',
        id: 'some/id'
    };

    it('should handle reset', () => {
        const store = mockStore();
        const expected = [
            { type: constants.BAPTISAN_RESET },
        ];

        store.dispatch(actions.reset());
        expect(store.getActions()).toEqual(expected);
    });

    it('should handle list retrieve',() => {

        fetch.mockResponse(JSON.stringify(mockList));
        const store = mockStore();
        const expected = [
            { type: constants.BAPTISAN_LIST_RESET },
            { type: constants.LOADING, loading: true },
            { type: constants.LOADING, loading: false },
            { type: constants.BAPTISAN_LIST_RETRIEVED, retrieved: mockList },
        ];

        return store.dispatch(actions.listRetrieve())
            .then(() => {
                expect(store.getActions()).toEqual(expected);
            })
        ;
    });

    it('should handle list retrieve error',() => {
        fetch.mockReject(new Error('some error'));
        const store = mockStore();
        const expected = [
            { type: constants.BAPTISAN_LIST_RESET },
            { type: constants.LOADING, loading: true },
            { type: constants.LOADING, loading: false },
            { type: constants.BAPTISAN_ERROR, error: 'some error' },
        ];

        return store.dispatch(actions.listRetrieve())
            .then(() => {
                expect(store.getActions()).toEqual(expected);
            })
        ;
    });

    it('should handle retrieve', () => {
        fetch.mockResponse(JSON.stringify(mockItem));
        const store = mockStore();
        const expected = [
            { type: constants.BAPTISAN_RESET },
            { type: constants.LOADING, loading: true },
            { type: constants.LOADING, loading: false },
            { type: constants.BAPTISAN_RETRIEVED, retrieved: mockItem },
        ];

        return store.dispatch(actions.retrieve('/some-id'))
            .then(() => {
                expect(store.getActions()).toEqual(expected);
            })
        ;
    });

    it('should handle retrieve error', () => {
        fetch.mockReject(new Error('some error'));
        const store = mockStore();
        const expected = [
            { type: constants.BAPTISAN_RESET },
            { type: constants.LOADING, loading: true },
            { type: constants.LOADING, loading: false },
            { type: constants.BAPTISAN_ERROR, error: 'some error' },
        ];

        return store.dispatch(actions.retrieve(mockItem))
            .then(() => {
                expect(store.getActions()).toEqual(expected);
            })
        ;
    });

    it('should handle create', () => {
        fetch.mockResponse(JSON.stringify(mockItem));
        const store = mockStore();
        const expected = [
            { type: constants.LOADING, loading: true },
            { type: constants.LOADING, loading: false },
            { type: constants.BAPTISAN_CREATED, created: mockItem },
        ];

        return store.dispatch(actions.create(mockItem))
            .then(() => {
                expect(store.getActions()).toEqual(expected);
            })
        ;
    });

    it('should handle create error', () => {
        fetch.mockReject(new Error('some error'));
        const store = mockStore();
        const expected = [
            { type: constants.LOADING, loading: true },
            { type: constants.LOADING, loading: false },
            { type: constants.BAPTISAN_ERROR, error: 'some error' },
        ];

        return store.dispatch(actions.create(mockItem))
            .then(() => {
                expect(store.getActions()).toEqual(expected);
            })
        ;
    });

    it('should handle create submission error', () => {
        fetch.mockReject(new SubmissionError({_error: 'some error'}));
        const store = mockStore();
        const expected = [
            { type: constants.LOADING, loading: true },
            { type: constants.LOADING, loading: false },
            { type: constants.BAPTISAN_ERROR, error: 'some error' },
        ];

        return store.dispatch(actions.create(mockItem))
            .catch(() => {
                expect(store.getActions()).toEqual(expected);
            });
    });

    it('should handle update', () => {
        fetch.mockResponse(JSON.stringify(mockItem));
        const store = mockStore();
        const expected = [
            { type: constants.BAPTISAN_RESET },
            { type: constants.LOADING, loading: true },
            { type: constants.LOADING, loading: false },
            { type: constants.BAPTISAN_UPDATED, updated: mockItem },
        ];

        return store.dispatch(actions.update(mockItem))
            .then(() => {
                expect(store.getActions()).toEqual(expected);
            })
        ;
    });

    it('should handle update error', () => {
        fetch.mockReject(new Error('some error'));
        const store = mockStore();
        const expected = [
            { type: constants.BAPTISAN_RESET },
            { type: constants.LOADING, loading: true },
            { type: constants.LOADING, loading: false },
            { type: constants.BAPTISAN_ERROR, error: 'some error' },
        ];

        return store.dispatch(actions.update(mockItem))
            .then(() => {
                expect(store.getActions()).toEqual(expected);
            })
        ;
    });

    it('should handle update submission error', () => {
        fetch.mockReject(new SubmissionError({_error: 'some error'}));
        const store = mockStore();
        const expected = [
            { type: constants.BAPTISAN_RESET },
            { type: constants.LOADING, loading: true },
            { type: constants.LOADING, loading: false },
            { type: constants.BAPTISAN_ERROR, error: 'some error' },
        ];

        return store.dispatch(actions.update(mockItem))
            .catch(() => {
                expect(store.getActions()).toEqual(expected);
            })
        ;
    });

    it('should handle remove', () => {
        fetch.mockResponse(JSON.stringify(mockItem));
        const store = mockStore();
        const expected = [
            { type: constants.LOADING, loading: true },
            { type: constants.LOADING, loading: false },
            { type: constants.BAPTISAN_REMOVED, removed: mockItem },
        ];

        return store.dispatch(actions.remove(mockItem))
            .then(() => {
                expect(store.getActions()).toEqual(expected);
            })
        ;
    });

    it('should handle remove', () => {
        fetch.mockReject(new Error('some error'));
        const store = mockStore();
        const expected = [
            { type: constants.LOADING, loading: true },
            { type: constants.LOADING, loading: false },
            { type: constants.BAPTISAN_ERROR, error: 'some error' },
        ];

        return store.dispatch(actions.remove(mockItem))
            .then(() => {
                expect(store.getActions()).toEqual(expected);
            })
        ;
    });
});