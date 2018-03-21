import reducers from '../../../reducers/user/delete';
import _ from 'lodash';
import {reducerTest} from "../../util";
const initialState = {
    error: null,
    loading: false,
    deleted: null
};

describe('user delete reducers', () => {
    const actions = [
        {
            type: 'USER_DELETE_LOADING',
            expectedState: {
                ...initialState,
                loading: true
            },
            action: { loading: true }
        },
        {
            type: 'USER_DELETE_ERROR',
            expectedState: {
                ...initialState,
                error: 'some error'
            },
            action: { error: 'some error' }
        },
        {
            type: 'USER_DELETE_SUCCESS',
            expectedState: {
                ...initialState,
                deleted: 'some data'
            },
            action: { deleted: 'some data' }
        }
    ];

    reducerTest(reducers,initialState,actions);
});