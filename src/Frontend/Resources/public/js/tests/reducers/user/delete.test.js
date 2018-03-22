import reducers from '../../../reducers/user/delete';
import {reducerTest} from "../../util";
const initialState = {
    error: null,
    deleted: null
};

describe('user delete reducers', () => {
    const actions = [
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