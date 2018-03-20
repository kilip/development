import React from 'react';
import { mount } from 'enzyme';
import SIAP from '../siap';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

const mockStore = configureStore();
function getComponent(props ={},state = {}, context = {}){
    return mount(
        <Provider {...props} store={mockStore(state)}>
          <SIAP/>
        </Provider>, {context}
    );
}

describe('<SIAP/> Component', () => {
    const mcLogin = function(){};
    const props = {
        login: mcLogin
    };
    const state = {
        security: {
            auth: null,
            fetching: false,
            authenticated: false
        }
    };
    it('should display login when user not authenticated', () => {
        const wrapper = getComponent(props,state);
        expect(wrapper.text()).toContain('Login');
        expect(wrapper.text()).toContain('Forgot password?');
    });
});
