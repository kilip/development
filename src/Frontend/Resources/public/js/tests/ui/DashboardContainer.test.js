import React from 'react';
import { mount, shallow } from 'enzyme';
import DashboardContainer from '../../ui/DashboardContainer';
import configureStore from "redux-mock-store";
import { Provider } from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
const mockStore = configureStore();
function getComponent(props ={},state = {}, context = {}){
    return mount(
        <Provider store={mockStore(state)}>
            <BrowserRouter>
                <DashboardContainer {...props}/>
            </BrowserRouter>
        </Provider>
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
        },
        app: {
            loading: false
        },
        flash: {}
    };

    it('should render properly', () => {
        const wrapper = getComponent(props,state);
        expect(wrapper.find('nav').hasClass('sidebar-nav')).toBeTruthy();
        expect(wrapper.find('header').hasClass('app-header')).toBeTruthy();
    });
});