import reducers from '../../../reducers/user/profile';
import _ from 'lodash';
const initialState = {
    error: null,
    loading: false,
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
            type: 'USER_PROFILE_LOADING',
            expectedState: { ...initialState, loading: true},
            action: { loading: true }
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