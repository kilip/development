import React from 'react';
import { mount, shallow } from 'enzyme';

import List from '../../../components/baptisan/List';
import { Provider } from 'react-redux';
import { mockStore } from "../../util";
import { BrowserRouter } from 'react-router-dom';

function getComponent(props ={},state = {}, context = {}) {
    return mount(
        <Provider store={mockStore(state)}>
            <BrowserRouter>
                <List {...props}/>
            </BrowserRouter>
        </Provider>,
        {context}
    );
}

describe('<List/> Component', () => {
    const mockItem = {
        id: 'some id',
        nama: 'some nama',
        ayah: 'Nama Ayah',
        ibu: 'Nama Ibu',
        tempatLahir: 'balikpapan',
        jenisKelamin: 1
    };
    const mockItems = {
        'hydra:member': [
            mockItem
        ],
        'hydra:view': {
            'hydra:previous': '/some/url/2',
            'hydra:first': '/some/url/1',
            'hydra:next': '/some/url/4',
            'hydra:last': '/some/url/5'
        }
    };
    const state = {
        app: {
            loading: true
        },
        baptisan: {
            list: mockItems,
            error: null,
        }
    };
    const props = {
        match: {
            params: {
                page: null
            }
        }
    };

    it('should rendered properly',() => {
        let wrapper = getComponent(props,state);

        fetch.mockResponse(JSON.stringify(mockItems));
        expect(wrapper.text()).toContain('Buku Baptis');
        expect(wrapper.text()).toContain('some nama');
        expect(wrapper.text()).toContain('Nama Ayah');
        expect(wrapper.text()).toContain('Nama Ibu');
        expect(wrapper.text()).toContain('balikpapan');
    });
});