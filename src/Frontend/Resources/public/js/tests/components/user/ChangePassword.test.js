import React from 'react';
import { mount } from 'enzyme';

import ChangePassword from '../../../components/user/ChangePassword';
import { mockStore } from "../../util";
import { Provider } from 'react-redux';
function getComponent(props ={},state = {}, context = {}){
    return mount(
        <Provider store={mockStore(state)}>
            <ChangePassword {...props}/>
        </Provider>,
        {context}
    );
}

describe('<ChangePassword/> Component', () => {

    const mockCurrentUser = {
        id: 'some-id'
    };
    const props = {
        currentUser: mockCurrentUser,
        context: 'profile'
    };
    const state = {
        userAdmin: {
            changePassword: {
                retrieved: mockCurrentUser,
            }
        }
    };

    it('should rendered properly', () => {
        fetch.mockResponse(JSON.stringify(mockCurrentUser));
        let wrapper = getComponent(props,state);
        expect(wrapper.text()).toContain('Password lama anda');
        expect(wrapper.text()).toContain('Password baru');

        state.userAdmin.changePassword.loading = true;
        wrapper = getComponent(props,state);
        expect(wrapper.text()).toContain('Memproses data');

        state.userAdmin.changePassword.error = 'some error';
        wrapper = getComponent(props,state);
        expect(wrapper.text()).toContain('some error');

        state.userAdmin.changePassword.updated = mockCurrentUser;
        wrapper = getComponent(props,state);
        expect(wrapper.text()).toContain('Password berhasil diubah');
    });
});