import React from 'react';
import { mount } from 'enzyme';
import { mockStore } from "../../util";
import { Provider } from 'react-redux';

import Create from '../../../components/user/Create';

function getComponent(props ={},state = {}, context = {}){
    return mount(
        <Provider store={mockStore(state)}>
            <Create {...props}/>
        </Provider>,
        {context}
    );
}

describe('<Create/> Component', () => {

    const props = {

    };
    const state = {
        users: {
            create: {
                created: null,
                error: null,
            }
        },
        app: {
            loading: false,
        }
    };

    it('should rendered properly', () => {
        const wrapper = getComponent(props,state);
        expect(wrapper.text()).toContain('User Baru');
    });
});