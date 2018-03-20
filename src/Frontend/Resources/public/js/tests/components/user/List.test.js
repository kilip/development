import React from 'react';
import { mount } from 'enzyme';
import { mockStore } from "../../util";
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import List from '../../../components/user/List';

function getComponent(props ={},state = {}, context = {}){
    return mount(
        <Provider store={mockStore(state)}>
            <BrowserRouter>
            <List {...props}/>
            </BrowserRouter>
        </Provider>,
        {context}
    );
}

describe('<Create/> Component', () => {

    const mockData = {
        'hydra:member': [
            { '@id': '@some-id', id: 'some-id',fullName: 'some full name', username: 'username', email: 'email@example.com'}
        ],
        'hydra:view': {
            'hydra:previous': '/some/url/2',
            'hydra:first': '/some/url/1',
            'hydra:next': '/some/url/4',
            'hydra:last': '/some/url/5'
        }

    };
    const props = {
        match: {
            params: {
                page: 1
            }
        }
    };

    const state = {
        userAdmin: {
            list: {
                data: mockData,
                loading: false,
            },
            del: {},
        },
        security: {
            user: {}
        }
    };

    it('should rendered properly', () => {
        const wrapper = getComponent(props,state);
        expect(wrapper.text()).toContain('Daftar User');
        expect(wrapper.text()).toContain('some full name');
        expect(wrapper.text()).toContain('username');
        expect(wrapper.text()).toContain('email@example.com');

        // test pagination
        expect(wrapper.text()).toContain('First');
        expect(wrapper.text()).toContain('Previous');
        expect(wrapper.text()).toContain('Next');
        expect(wrapper.text()).toContain('Last');
    });
});
