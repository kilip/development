import expect from 'expect';
import { mockStore } from "../../util";
import { del } from '../../../actions/user/delete';
import * as siap from "../../../actions/global";

describe('user delete actions', () => {
    const mockUserData = {
        '@id': '/api/some-id',
        id: 'some-id',
        fullName: 'some full name'
    };

    it('should handle delete', () => {
        fetch.mockResponse({message: 'some response'});
        const store = mockStore({});
        const expected = [
            { type: siap.SIAP_LOADING, loading: true },
            { type: siap.SIAP_LOADING, loading: false },
            { type: 'USER_DELETE_SUCCESS', deleted: mockUserData }
        ];
        return store.dispatch(del(mockUserData))
            .then(() => {
                expect(store.getActions()).toEqual(expected);
            })
        ;
    });

    it('should handle delete error', () => {
        fetch.mockReject(new Error('some error'));
        const store = mockStore({});
        const expected = [
            { type: siap.SIAP_LOADING, loading: true },
            { type: siap.SIAP_LOADING, loading: false },
            { type: 'USER_DELETE_ERROR', error: 'some error' }
        ];
        return store.dispatch(del(mockUserData))
            .catch(() => {
                expect(store.getActions()).toEqual(expected);
            })
        ;
    });
});