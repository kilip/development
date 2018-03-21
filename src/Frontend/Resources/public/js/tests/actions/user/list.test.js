import { list,reset } from '../../../actions/user/list';
import * as globalActions from "../../../actions/global";
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import expect from 'expect';


const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('user list actions', () =>  {
    it('should returns user lists on success',() =>{
        const returns = {"@context":"\/api\/contexts\/User","@id":"\/api\/users","@type":"hydra:Collection","hydra:member":[{"@id":"\/api\/users\/1c1378db-0946-4969-9a1e-8249a267c18e","@type":"User","id":"1c1378db-0946-4969-9a1e-8249a267c18e","fullName":"Administrator Paroki","username":"admin.paroki","email":"admin-paroki@example.com","roles":["ADMIN_PAROKI"],"enabled":true},{"@id":"\/api\/users\/84ca0c6a-05c9-4e17-86fa-bdb7f712ad68","@type":"User","id":"84ca0c6a-05c9-4e17-86fa-bdb7f712ad68","fullName":"Super Administrator Test","username":"admin","email":"admin@example.com","roles":["SUPER_ADMIN"],"enabled":true},{"@id":"\/api\/users\/8c943464-5e6e-4268-a01d-5420d527ea9f","@type":"User","id":"8c943464-5e6e-4268-a01d-5420d527ea9f","fullName":"Test","username":"admin.test","email":"admin.test@example.com","roles":["ADMIN"],"enabled":false},{"@id":"\/api\/users\/be0e98f9-2cfa-4023-ab08-d975e07e61b3","@type":"User","id":"be0e98f9-2cfa-4023-ab08-d975e07e61b3","fullName":"Test Tambah","username":"test.tambah","email":"test@example.com","roles":["ADMIN"],"enabled":true}],"hydra:totalItems":4};
        fetch.mockResponse(JSON.stringify(returns));
        const expectedActions = [
            {type: globalActions.SIAP_LOADING, loading: true},
            {type: 'USER_LIST_ERROR',error:''},
            {type: globalActions.SIAP_LOADING, loading: false},
            {type: 'USER_LIST_SUCCESS', data: returns}
        ];

        const store = mockStore({});

        return store.dispatch(list())
            .then(()=>{
                expect(store.getActions()).toEqual(expectedActions);
            })
        ;
    });

    it('should handle errors',() => {
        fetch.mockReject(new Error('fake error message'));
        const expectedActions = [
            {type: globalActions.SIAP_LOADING, loading: true},
            {type: 'USER_LIST_ERROR',error:''},
            {type: globalActions.SIAP_LOADING, loading: false},
            {type: 'USER_LIST_ERROR', error: 'fake error message'}
        ];
        const store = mockStore({ config: {token: "" } });
        return store.dispatch(list())
            .then(() => {
                expect(store.getActions()).toEqual(expectedActions);
            })
        ;
    });

    it('should reset state', () => {
        const store = mockStore({ config: {token: "" } });
        expect(reset()).toEqual({type: 'USER_LIST_RESET'});
    });
});