import reducers from '../../../reducers/user/update';
const initialState = {
    retrieveError: null,
    retrieved: null,
    updateError: null,
    updated: null
};
import {reducerTest} from "../../util";

describe('user update reducers', () => {
    const actions = [
        {
            type: 'USER_UPDATE_RESET',
            expectedState: initialState,
            action: {}
        },
        {
            type: 'USER_UPDATE_RETRIEVE_ERROR',
            expectedState: { retrieveError: 'some error'},
            action: { retrieveError: 'some error' }
        },
        {
            type: 'USER_UPDATE_RETRIEVE_SUCCESS',
            expectedState: { retrieved: 'some data'},
            action: { retrieved: 'some data' }
        },
        {
            type: 'USER_UPDATE_UPDATE_ERROR',
            expectedState: { updateError: 'some error' },
            action: { updateError: 'some error' }
        },
        {
            type: 'USER_UPDATE_UPDATE_SUCCESS',
            expectedState: { updated: 'some data' },
            action: { updated: 'some data' }
        }
    ];

    reducerTest(reducers,initialState,actions);
});