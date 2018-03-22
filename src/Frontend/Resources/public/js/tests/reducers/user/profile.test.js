import reducers from '../../../reducers/user/profile';
import {reducerTest} from "../../util";
const initialState = {
    error: null,
    retrieved: null,
    updated: null
};

describe('user profile reducers', () => {

    const actions = [
        {
            type: 'USER_PROFILE_RESET',
            expectedState: initialState,
            action: {}
        },
        {
            type: 'USER_PROFILE_ERROR',
            expectedState: { ...initialState, error: 'some error'},
            action: {error: 'some error'}
        },
        {
            type: 'USER_PROFILE_RETRIEVED_SUCCESS',
            expectedState: { ...initialState, retrieved: 'some data'},
            action: { retrieved: 'some data' }
        },
        {
            type: 'USER_PROFILE_UPDATED_SUCCESS',
            expectedState: { ...initialState, updated: 'some data' },
            action: { updated: 'some data' }
        }
    ];

    reducerTest(reducers,initialState,actions);
});