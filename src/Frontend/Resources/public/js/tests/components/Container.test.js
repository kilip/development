import React from 'react';
import { mount } from 'enzyme';

import Loader from '../../components/Loader';
import { Provider } from 'react-redux';
import {mockStore} from "../util";

function getComponent(props ={},state = {}, context = {}) {
    return mount(
        <Provider store={mockStore(state)}>
            <Loader {...props}/>
        </Provider>,
        {context}
    );
}

describe('<Loader/> Component', () => {
    const state = {
        app: {
            loading: true
        }
    };
    const props = {};
    it('should rendered properly',() => {
        let wrapper = getComponent(props,state);
        expect(wrapper.find('.loading').length).toBe(1);

        state.app.loading = false;
        wrapper = getComponent(props,state);
        expect(wrapper.find('.loading').length).toBe(0);
    });
});