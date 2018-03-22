import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import _ from 'lodash';
import {
    Form as StrapForm,
    FormGroup,
    Label,
    Input
} from 'reactstrap';
import { Link } from 'react-router-dom';

import { renderFormGroup } from "../../utils/form-helper";

class Form extends Component {
    normalizeJenisKelamin = (values) => {
        return Number(values);
    };

    renderJenisKelamin(data){
        const inputField = (
            <div>
                <FormGroup check className="radio">
                    <Input
                        {...data.input}
                        id="jk-l"
                        className="form-check-input"
                        value={1}
                        type="radio"
                        name={data.input.name}
                        checked={data.input.value===1}
                    />
                    <Label check className="form-check-label" htmlFor="jk-l">
                        Laki-Laki
                    </Label>
                </FormGroup>
                <FormGroup check className="radio">
                    <Input
                        {...data.input}
                        id="jk-p"
                        className="form-check-input"
                        value={2}
                        type="radio"
                        name={data.input.name}
                        checked={data.input.value===2}
                    />
                    <Label check className="form-check-label" htmlFor="jk-p">
                        Perempuan
                    </Label>
                </FormGroup>
            </div>
        );

        return renderFormGroup(data,inputField);
    }

    render(){
        const { handleSubmit } = this.props;

        return(
            <StrapForm onSubmit={handleSubmit}>
                <Field
                    component={(data) => renderFormGroup(data)}
                    type="text"
                    placeholder="nama lengkap"
                    label="Nama Lengkap"
                    name="nama"
                />
                <Field
                    component={(data) => renderFormGroup(data)}
                    type="text"
                    placeholder="nama baptis"
                    label="Nama Baptis"
                    name="namaBaptis"
                />
                <Field
                    component={(data) => renderFormGroup(data)}
                    type="text"
                    placeholder="ayah"
                    label="Ayah"
                    name="ayah"
                />
                <Field
                    component={(data) => renderFormGroup(data)}
                    type="text"
                    placeholder="ibu"
                    label="Ibu"
                    name="ibu"
                />
                <Field
                    component={(data) => this.renderJenisKelamin(data)}
                    type="text"
                    placeholder="jenis kelamin"
                    label="Jenis Kelamin"
                    name="jenisKelamin"
                    normalize={this.normalizeJenisKelamin}
                />
                <button type="submit" className="btn btn-success">
                    <i className="fa fa-save"/>
                    Simpan
                </button>

                <Link to="/baptisans" className="btn btn-primary">
                    <i className="fa fa-table"/>
                    Daftar Baptisan
                </Link>
            </StrapForm>
        );
    }
}

export default reduxForm({form: 'baptisan', enableReinitialize: true, keepDirtyOnReinitialize: true})(Form);