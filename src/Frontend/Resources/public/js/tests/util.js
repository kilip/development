import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import _ from 'lodash';
import expect from 'expect';

export function mockStore(state = {}){
    const middlewares = [thunk];
    const store = configureMockStore(middlewares);

    return store(state);
}

export function reducerTest(reducers,initialState,actions){
    _.each(actions,function(value){
        it(`should handle ${value.type}`, () => {
            const { type, expectedState, action } = value;
            action.type = type;
            let expected = {...initialState,...expectedState};
            let state = undefined;
            if(typeof value.customState !== 'undefined'){
                state = {...initialState,...value.customState};
            }

            expect(reducers(state,action)).toEqual(expected);
        });

    });

    it('should handle initial state', () => {
        expect(reducers(undefined,{})).toEqual(initialState);
    });
}

export function expectAction(actions,expected){
    _.each(expected,function(item){
        expect(actions).toContain(item);
    });
}