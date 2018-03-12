import React from 'react';
import { mount } from 'enzyme';
import SIAP from '../siap';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

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
            user: {
                data: null,
                isLoading: false
            }
        }
    };
    it('should display login when user not authenticated', () => {
        const wrapper = getComponent(props,state);
        expect(wrapper.text()).toContain('Under Construction');
    });
});
