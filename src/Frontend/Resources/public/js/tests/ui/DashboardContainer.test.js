import React from 'react';
import { mount, shallow } from 'enzyme';
import DashboardContainer from '../../ui/DashboardContainer';
import configureStore from "redux-mock-store";
import { Provider } from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
const mockStore = configureStore();
function getComponent(props ={},state = {}, context = {}){
    return mount(
        <BrowserRouter>
            <DashboardContainer {...props} store={mockStore(state)}/>
        </BrowserRouter>
        , {context}
    );
}

describe('<DashboardContainer/>', () => {
    const mcLogin = function(){};
    const props = {
        login: mcLogin
    };
    const state = {
        security: {
            user: {
                data: {
                    user: {}
                },
                isLoading: false
            }
        }
    };

    it('should render properly', () => {
        const wrapper = getComponent(props,state);
        expect(wrapper.find('nav').hasClass('sidebar-nav')).toBeTruthy();
        expect(wrapper.find('header').hasClass('app-header')).toBeTruthy();
    });
});