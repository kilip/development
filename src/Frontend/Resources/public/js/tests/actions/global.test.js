import expect from 'expect';
import * as actions from '../../actions/global';
import {mockStore} from "../util";

describe('global actions', () => {
    it('should handle loading',() => {
        const store = mockStore();

        store.dispatch(actions.loading(true));
        expect(store.getActions()).toEqual([
            {
                type: actions.SIAP_LOADING,
                loading: true
            }
        ]);
    });
});