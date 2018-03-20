import React from 'react';
import { mount } from 'enzyme';
import { mockStore } from "../../util";
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import Profile from '../../../components/user/Profile';

function getComponent(props ={},state = {}, context = {}){
    return mount(
        <Provider store={mockStore(state)}>
            <Profile {...props}/>
        </Provider>,
        {context}
    );
}

describe('<Profile/> Component', () => {

    const mockUser = {
        id: 'some-id',
    };
    const props = {
        error: null
    };
    const state = {
        userAdmin: {
            profile: {

            },
            changePassword: {}
        },
        security: {
            auth: mockUser
        }
    };

    it('should rendered properly', () => {
        state.userAdmin.profile.retrieved = mockUser;
        let wrapper = getComponent(props,state);
        expect(wrapper.text()).toContain('Profil Saya');
        expect(wrapper.text()).toContain('Data Pribadi');
        expect(wrapper.text()).toContain('Ubah Password');


        state.userAdmin.profile.error = 'some error';
        state.userAdmin.profile.loading = true;
        state.userAdmin.profile.updated = mockUser;
        wrapper = getComponent(props,state);
        expect(wrapper.text()).toContain('some error');
        expect(wrapper.text()).toContain('Memproses data...');
        expect(wrapper.text()).toContain('Perubahan profil berhasil disimpan.');
    });
});