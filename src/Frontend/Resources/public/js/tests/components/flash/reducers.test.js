import flash from '../../../components/flash/reducers';
import * as constants from '../../../components/flash/constants';
import {reducerTest} from "../../util";

describe('flash reducers', () => {
    const initialState = {
        error: [],
        success: [],
        info: []
    };
    const testActions = [
        {
            type: constants.FLASH_ADD_INFO,
            expectedState: {
                info: [
                    {
                        id: 'some-id',
                        message: 'some info',
                        namespace: 'global'
                    }
                ]
            },
            action: { message: 'some info', id: 'some-id', namespace: 'global' }
        },
        {
            type: constants.FLASH_REMOVE_INFO,
            expectedState: { info:
                [
                    {id:'some-id2', message: 'info2'}
                ]
            },
            action: { removed: 'some-id1' },
            customState: {
                info: [
                    {id: 'some-id1', message: 'info1'},
                    {id: 'some-id2', message: 'info2'}
                ]
            }
        }
    ];
    reducerTest(flash,initialState,testActions);
});