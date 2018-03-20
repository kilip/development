import reducers from '../../../reducers/user/list';
import _ from 'lodash';
const initialState = {
    error: null,
    loading: false,
    data: {}
};

describe('user list reducers', () => {

    const actions = [
        {
            type: 'USER_LIST_RESET',
            expectedState: {
                ...initialState
            },
            action: {}
        },
        {
            type: 'USER_LIST_LOADING',
            expectedState: {
                ...initialState,
                loading: true
            },
            action: { loading: true }
        },
        {
            type: 'USER_LIST_ERROR',
            expectedState: {
                ...initialState,
                error: 'some error'
            },
            action: { error: 'some error' }
        },
        {
            type: 'USER_LIST_SUCCESS',
            expectedState: {
                ...initialState,
                data: 'some data'
            },
            action: { data: 'some data' }
        }
    ];

    _.each(actions,function(value){
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