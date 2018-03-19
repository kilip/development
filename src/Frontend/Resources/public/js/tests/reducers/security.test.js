import reducers from '../../reducers/security';
import _ from 'lodash';

describe('security reducers', () => {
    it('should handle initial state', () => {
        expect(reducers(undefined,{})).toEqual({
            auth: null,
            authenticated: false,
            error: null,
            fetching: false,
            token: null
        });
    });
});