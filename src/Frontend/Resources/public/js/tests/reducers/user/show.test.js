import reducers from '../../../reducers/user/show';
const initialState = {
    error: null,
    loading: false,
    retrieved: null
};
import {reducerTest} from "../../util";

describe('user show reducers', () => {
    const actions = [
        {
            type: 'USER_SHOW_RESET',
            expectedState: initialState,
            action: {}
        },
        {
            type: 'USER_SHOW_LOADING',
            expectedState: { loading: true },
            action: { loading: true }
        },
        {
            type: 'USER_SHOW_ERROR',
            expectedState: { error: null },
            action: { error: null }
        },
        {
            type: 'USER_SHOW_RETRIEVED_SUCCESS',
            expectedState: { retrieved: 'some data' },
            action: { retrieved: 'some data' }
        }
    ];

    reducerTest(reducers,initialState,actions);
});