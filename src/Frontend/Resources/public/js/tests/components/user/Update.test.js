import React from 'react';
import { mount } from 'enzyme';
import { mockStore } from "../../util";
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import Update from '../../../components/user/Update';

function getComponent(props ={},state = {}, context = {}){
    return mount(
        <Provider store={mockStore(state)}>
            <BrowserRouter>
                <Update {...props}/>
            </BrowserRouter>
        </Provider>,
        {context}
    );
}

describe('<Update/> Component', () => {

    const mockUser = {
        '@id': '/api/some-id',
        id: 'some-id'
    };
    const props = {
        match: {
            params: {
                id: 'some-id'
            }
        }
    };

    const state = {
        userAdmin: {
            update: {
                retrieveLoading: true,
                retrieveError: 'Retrieve Error',
                retrieved: mockUser,
                updateLoading: true,
                updateError: 'Update Error',
                updated: mockUser,
            },
            del: {
                loading: true,
                error: 'Delete Error',
            },
            create: {
                created: mockUser
            },
            changePassword: {}
        }
    };

    it('should rendered properly', () => {
        const wrapper = getComponent(props,state);

        expect(wrapper.text()).toContain('Data berhasil ditambahkan.');
        expect(wrapper.text()).toContain('Data berhasil diperbaharui.');
        expect(wrapper.text()).toContain('Retrieve Error');
        expect(wrapper.text()).toContain('Update Error');
        expect(wrapper.text()).toContain('Delete Error');
        expect(wrapper.text()).toContain('Profil');
        expect(wrapper.text()).toContain('Password');
    });
});