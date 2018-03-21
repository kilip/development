import reducers from '../../reducers/global';
import * as actions from '../../actions/global';
import {reducerTest} from "../util";


describe('global reducers', () => {
    const initialState = {
        loading: false
    };

    const testActions = [
        {
            type: actions.SIAP_LOADING,
            expectedState: {
                ...initialState,
                loading: true
            },
            action: { loading: true }
        }
    ];

    reducerTest(reducers,initialState,testActions);
});