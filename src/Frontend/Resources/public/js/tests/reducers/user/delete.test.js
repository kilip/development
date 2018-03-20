import reducers from '../../../reducers/user/delete';
import _ from 'lodash';
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