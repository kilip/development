import { retrieve, reset} from '../../../actions/user/show';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import expect from 'expect';
import * as siap from "../../../actions/global";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('user show actions',() => {
    const userData = {
        id: 'some-id',
        fullName: 'some full name'
    };

    it('should handle reset', () => {
        const store = mockStore({});

        store.dispatch(reset());
        expect(store.getActions()).toEqual([{
            type: 'USER_SHOW_RESET'
        }]);
    });

    it('should handle retrieve', () => {
        fetch.mockResponse(JSON.stringify(userData));

        const expectedActions = [
            { type: siap.SIAP_LOADING, loading: true },
            { type: siap.SIAP_LOADING, loading: false },
            { type: 'USER_SHOW_RETRIEVED_SUCCESS', retrieved: userData },
        ];

        const store = mockStore({});

        return store.dispatch(retrieve('some-id',))
            .then(()=>{
                expect(store.getActions()).toEqual(expectedActions);
            })
        ;
    });

    it('should handle retrieve error', () => {
        fetch.mockReject(new Error('some error'));

        const expectedActions = [
            { type: siap.SIAP_LOADING, loading: true },
            { type: siap.SIAP_LOADING, loading: false },
            { type: 'USER_SHOW_ERROR', error: 'some error' },
        ];

        const store = mockStore({});

        return store.dispatch(retrieve('some-id',))
            .then(()=>{
                expect(store.getActions()).toEqual(expectedActions);
            })
        ;
    });
});