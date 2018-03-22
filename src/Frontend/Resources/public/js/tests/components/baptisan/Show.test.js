import React, {Component} from 'react';
import { mount } from 'enzyme';

import Show from '../../../components/baptisan/Show';
import { Provider } from 'react-redux';
import { mockStore } from "../../util";
import { BrowserRouter } from 'react-router-dom';


function getComponent(props ={},state = {}, context = {}) {
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
    const mockItem = {
        '@id': '/api/some-id',
        id: 'some-id',
        nama: 'Ignatius Loyola',
        namaBaptis: 'Ignatius Saja',
        ayah: 'Fransiskus',
        ibu: 'Clara',
        tempatLahir: 'Balikpapan',
        jenisKelamin: 1
    };

    const props={
        match: {
            params: {}
        }
    };

    const state={
        baptisan: {
            retrieved: mockItem
        }
    };

    it('should render properly',() => {
        const wrapper = getComponent(props,state);

        expect(wrapper.text()).toContain('Ignatius Loyola');
        expect(wrapper.text()).toContain('Ignatius Saja');

        expect(wrapper.text()).toContain('Fransiskus');
        expect(wrapper.text()).toContain('Clara');
        expect(wrapper.text()).toContain('Balikpapan');
        expect(wrapper.text()).toContain('Laki-Laki');
    });
});