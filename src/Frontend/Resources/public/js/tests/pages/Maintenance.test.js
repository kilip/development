import React from 'react';
import { mount } from 'enzyme';
import Maintenance from '../../pages/Maintenance';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

const mockStore = configureStore();
function getComponent(props ={},state = {}, context = {}){
    return mount(
        <Maintenance/>
    );
}

describe('<Maintenance/> Component', () => {
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
    it('should show maintenance text', () => {
        const wrapper = getComponent(props,state);
        expect(wrapper.text()).toContain('503');
        expect(wrapper.text()).toContain('Aplikasi sedang dalam perawatan');
    });
});
