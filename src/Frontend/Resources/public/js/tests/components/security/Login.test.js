import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import LoginForm from '../../../components/security/Login';
import { mockStore } from "../../util";

function getComponent(props ={},state = {}, context = {}){
    return mount(
        <Provider store={mockStore(state)}>
            <LoginForm {...props}/>
        </Provider>, {context}
    );
}

describe('<LoginForm/> Component', () => {
    const props = {
        login: jest.fn()
    };
    const state = {
        security: {
            auth: null,
            fetching: false,
            authenticated: false
        }
    };
    it('should rendered properly', () => {
        const wrapper = getComponent(props,state);
        expect(wrapper.text()).toContain('Login to SIAP');
    });

    it('should render error', () => {
        state.security.error = 'some error';
        const  wrapper = getComponent(props,state);
        expect(wrapper.text()).toContain('some error');
    });

});