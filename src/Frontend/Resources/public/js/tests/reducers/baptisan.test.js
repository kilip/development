import reducers from '../../reducers/baptisan';
import * as constants from '../../actions/constants';
import {reducerTest} from "../util";

describe('security reducers', () => {
    const initialState = {
        list: {},
        error: null,
        retrieved: null,
        updated: null,
        removed: null
    };

    const testActions = [
        {
            type: constants.BAPTISAN_LIST_RETRIEVED,
            expectedState: {
                ...initialState,
                list: 'some data'
            },
            action: { retrieved: 'some data' }
        },
        {
            type: constants.BAPTISAN_LIST_RESET,
            expectedState: {
                ...initialState,
            },
            action: { }
        },
        {
            type: constants.BAPTISAN_RESET,
            expectedState: initialState,
            action: { }
        },
        {
            type: constants.BAPTISAN_ERROR,
            expectedState: {
                ...initialState,
                error: 'some error'
            },
            action: { error: 'some error' }
        },
        {
            type: constants.BAPTISAN_RETRIEVED,
            expectedState: {
                ...initialState,
                retrieved: 'some data'
            },
            action: { retrieved: 'some data' }
        },
        {
            type: constants.BAPTISAN_UPDATED,
            expectedState: {
                ...initialState,
                updated: 'some data'
            },
            action: { updated: 'some data' }
        },
        {
            type: constants.BAPTISAN_REMOVED,
            expectedState: {
                ...initialState,
                removed: 'some data'
            },
            action: { removed: 'some data' }
        },
    ];
    reducerTest(reducers,initialState,testActions);
});