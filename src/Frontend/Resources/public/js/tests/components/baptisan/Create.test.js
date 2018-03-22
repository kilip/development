import React, { Component } from 'react';
import { mount } from 'enzyme';

import Create from '../../../components/baptisan/Create';
import { Provider } from 'react-redux';
import { mockStore } from "../../util";
import { HashRouter } from 'react-router-dom';

class RedirectMock extends Component {
    render(){
        return <div>Redirected</div>
    }
}

Create.__Rewire__('Redirect',RedirectMock);

function getComponent(props ={},state = {},reducers=null, context = {}) {
    return mount(
        <Provider store={mockStore(state)}>
            <HashRouter>
                <Create {...props}/>
            </HashRouter>
        </Provider>,
        {context}
    );
}

describe('<Create/> Component', () => {
    const mockItem = {
        id: 'some-id',
        nama: 'some nama',
        ayah: 'Nama Ayah',
        ibu: 'Nama Ibu',
        tempatLahir: 'balikpapan',
        jenisKelamin: 1
    };
    const state = {
        app: {
            loading: true
        },
        baptisan: {
        }
    };
    const props = {
        item: {}
    };

    it('should rendered properly',() => {
        let wrapper = getComponent(props,state);
        expect(wrapper.text()).toContain('Menambah data Baptisan');
        expect(wrapper.text()).toContain('Nama Lengkap');
        expect(wrapper.text()).toContain('Nama Baptis');
        expect(wrapper.text()).toContain('Ayah');
        expect(wrapper.text()).toContain('Ibu');
    });

    it('should handle submit form properly', () => {
        const wrapper = getComponent(props,state);
        const form = wrapper.find('form');
        const mockCreate = jest.fn();
        fetch.mockResponse(JSON.stringify({id: 'test-id'}));
        wrapper.setProps('create',mockCreate);
        wrapper.update();
        form.simulate('submit');
        expect(mockCreate.mock.calls.length).toBe(1);
    });

    it('should redirect when baptisan created', () => {
        state.baptisan.created = {id: 'some-id'};
        const wrapper = getComponent(props,state);
        expect(wrapper.text()).toContain('Redirected');
    });
});