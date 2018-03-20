import reducers from '../../../reducers/user/create';
import _ from 'lodash';
const initialState = {
    error: null,
    loading: false,
    created: null
};

describe('user create reducers', () => {

    const actions = [
        {
            type: 'USER_CREATE_LOADING',
            expectedState: {
                ...initialState,
                loading: true
            },
            action: {loading: true}
        },
        {
            type: 'USER_CREATE_ERROR',
            expectedState: {
                ...initialState,
                error: 'some error'
            },
            action: {error: 'some error'}
        },
        {
            type: 'USER_CREATE_SUCCESS',
            expectedState: {
                ...initialState,
                created: 'some data'
            },
            action: { created: 'some data'}
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