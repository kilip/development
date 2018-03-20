import reducers from '../../reducers/security';
import * as actions from '../../actions/security/authentication';
import _ from 'lodash';

describe('security reducers', () => {
    const initialState = {
        auth: null,
        authenticated: false,
        error: null,
        fetching: false,
        token: null
    };

    const testActions = [
        {
            type: actions.LOGIN_SUCCESS,
            expectedState: {
                ...initialState,
                auth: 'some data',
                authenticated: true
            },
            action: { user: 'some data' }
        },
        {
            type: actions.LOGIN_RESET,
            expectedState: {
                ...initialState
            },
            action: {}
        },
        {
            type: actions.LOGIN_REQUEST,
            expectedState: {
                ...initialState,
                fetching: true
            },
            action: {fetching: true}
        },
        {
            type: actions.LOGIN_FAILURE,
            expectedState: {
                ...initialState,
                error: 'some error'
            },
            action: {error: 'some error'}
        }
    ];

    _.each(testActions,function(value){
        it(`should handle ${value.type}`, () => {
            const { type, expectedState, action } = value;
            action.type = type;

            expect(reducers(undefined,action)).toEqual(expectedState);
        });

    });

    it('should handle initial state', () => {
        expect(reducers(undefined,{})).toEqual(initialState);
    });
});