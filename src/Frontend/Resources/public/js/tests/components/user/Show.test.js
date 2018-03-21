import React from 'react';
import { mount } from 'enzyme';
import { mockStore } from "../../util";
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import Show from '../../../components/user/Show';

function getComponent(props ={},state = {}, context = {}){
    return mount(
        <Provider store={mockStore(state)}>
            <BrowserRouter>
                <Show {...props}/>
            </BrowserRouter>
        </Provider>,
        {context}
    );
}

describe('<Show/> Component', () => {
    const mockUser = {
        '@id': '/api/some-id',
        'id': 'some-id',
        fullName: 'Full Name',
        username: 'username',
        email: 'email@example.com',
    };

    const props = {
        match: {
            params: {
                id: 'some-id'
            }
        }
    };

    const state = {
        users: {
            show: {
                error: 'Show Error',
                loading: true,
                retrieved: mockUser,
            },
            del: {
                error: 'Delete Error',
                loading: true,
            }
        }
    };

    it('should rendered properly', () => {
        const wrapper = getComponent(props,state);
        expect(wrapper.text()).toContain('Show Error');
        expect(wrapper.text()).toContain('Delete Error');
        expect(wrapper.text()).toContain('Full Name');
        expect(wrapper.text()).toContain('username');
        expect(wrapper.text()).toContain('email@example.com');
    });
});
