import { uuid } from '../../../utils';
import * as constants from '../../../components/flash/constants';
import * as actions from '../../../components/flash/actions';
import { mockStore } from "../../util";

describe('flash actions', () => {

    it('should handle add and remove info flash',() => {
        const store = mockStore();
        const expected =[
            {
                type: constants.FLASH_ADD_INFO,
                id: 'some-id',
                message: 'some message',
                namespace: 'global'
            },
            {
                type: constants.FLASH_REMOVE_INFO,
                removed: 'some-id',
                namespace: 'global'
            }
        ];
        store.dispatch(actions.addInfo('some message','global','some-id'));
        store.dispatch(actions.removeInfo('some-id'));
        expect(store.getActions()).toEqual(expected);
    });

    it('should handle add and remove error flash', () => {
        const store = mockStore();
        const expected =[
            {
                type: constants.FLASH_ADD_ERROR,
                id: 'some-id',
                message: 'some error',
                namespace: 'global'
            },
            {
                type: constants.FLASH_REMOVE_ERROR,
                removed: 'some-id',
                namespace: 'global'
            }
        ];
        store.dispatch(actions.addError('some error','global','some-id'));
        store.dispatch(actions.removeError('some-id'));
        expect(store.getActions()).toEqual(expected);
    });

    it('should handle add and remove success flash', () => {
        const store = mockStore();
        const expected =[
            {
                type: constants.FLASH_ADD_SUCCESS,
                id: 'some-id',
                message: 'some success',
                namespace: 'global'
            },
            {
                type: constants.FLASH_REMOVE_SUCCESS,
                removed: 'some-id',
                namespace: 'global'
            }
        ];
        store.dispatch(actions.addSuccess('some success','global','some-id'));
        store.dispatch(actions.removeSuccess('some-id'));
        expect(store.getActions()).toEqual(expected);
    });
});