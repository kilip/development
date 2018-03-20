import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import _ from 'lodash';

export function mockStore(state = {}){
    const middlewares = [thunk];
    const store = configureMockStore(middlewares);

    return store(state);
}

export function reducerTest(reducers,initialState,actions){
    _.each(actions,function(value){
        it(`should handle ${value.type}`, () => {
            const { type, expectedState, action } = value;
            const expected = {...initialState,...expectedState};
            action.type = type;

            expect(reducers(undefined,action)).toEqual(expected);
        });

    });

    it('should handle initial state', () => {
        expect(reducers(undefined,{})).toEqual(initialState);
    });
}