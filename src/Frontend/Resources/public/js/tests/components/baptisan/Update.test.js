import React, {Component} from 'react';
import { mount } from 'enzyme';

import Update from '../../../components/baptisan/Update';
import { Provider } from 'react-redux';
import { mockStore } from "../../util";
import { BrowserRouter } from 'react-router-dom';

class RedirectMock extends Component {
    render(){
        return <div>Redirected</div>
    }
}

Update.__Rewire__('Redirect',RedirectMock);

function getComponent(props ={},state = {}, context = {}) {
    return mount(
        <Provider store={mockStore(state)}>
            <BrowserRouter>
                <Update {...props}/>
            </BrowserRouter>
        </Provider>,
        {context}
    );
}

describe('<Update/> Component', () => {

    const mockItem = {
        '@id': '/api/some-id',
        id: 'some-id',
        nama: 'Ignatius Loyola',
        namaBaptis: 'Ignatius',
        ayah: 'Fransiskus',
        ibu: 'Maria',
        tempatLahir: 'balikpapan',
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
        },
        flash: {}
    };

    it('should rendered properly', () => {
        const wrapper = getComponent(props,state);
        expect(wrapper.text()).toContain('Edit Ignatius Loyola');
        expect(wrapper.text()).toContain('Laki-Laki');
        expect(wrapper.text()).toContain('Perempuan');
    });

    it('should handle submit form properly', () => {
        const wrapper = getComponent(props,state);
        const form = wrapper.find('form');
        const mockCreate = jest.fn();
        fetch.mockResponse(JSON.stringify({id: 'test-id'}));
        wrapper.setProps('update',mockCreate);
        wrapper.update();
        form.simulate('submit');
        expect(mockCreate.mock.calls.length).toBe(1);
    });

    it('should redirect when baptisan deleted', () => {
        state.baptisan.removed = {id: 'some-id'};
        const wrapper = getComponent(props,state);
        expect(wrapper.text()).toContain('Redirected');
    });
});