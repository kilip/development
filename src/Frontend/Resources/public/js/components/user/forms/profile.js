import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import _ from 'lodash';
import {
    Form as StrapForm,
    FormGroup,
    Label,
    Input
} from 'reactstrap';
import {renderFormGroup} from "../../../utils/form-helper";

class ProfileForm extends Component {

    renderRoles(data){
        const hasRole = function(roles,type){
            let found = false;
            _.each(roles,function(value){
                if(value === type){
                    found = true;
                }
            });
            return found;
        };
        let inputField = (
            <div>
                <FormGroup check className="radio">
                    <Input
                        {...data.input}
                        id="roles-admin"
                        className="form-check-input"
                        value="ADMIN"
                        type="radio"
                        name={data.input.name}
                        checked={hasRole(data.input.value,'ADMIN')}
                    />
                    <Label check className="form-check-label" htmlFor="roles-admin">
                        Administrator
                    </Label>
                </FormGroup>
                <FormGroup check className="radio">
                    <Input
                        {...data.input}
                        id="roles-admin-paroki"
                        className="form-check-input"
                        value="ADMIN_PAROKI"
                        type="radio"
                        name={data.input.name}
                        checked={hasRole(data.input.value,'ADMIN_PAROKI')}
                    />
                    <Label check className="form-check-label" htmlFor="roles-admin-paroki">
                        Administrator Paroki
                    </Label>
                </FormGroup>
            </div>
        );
        return renderFormGroup(data,inputField);
    }

    renderEnabled(data){
        let inputField = (
            <div>
                <FormGroup check className="radio">
                    <Input
                        {...data.input}
                        id="enabled-yes"
                        className="form-check-input"
                        value={true}
                        type="radio"
                        name={data.input.name}
                        checked={data.input.value}
                    />
                    <Label check className="form-check-label" htmlFor="enabled-yes">
                        Ya
                    </Label>
                </FormGroup>
                <FormGroup check className="radio">
                    <Input
                        {...data.input}
                        id="enabled-no"
                        className="form-check-input"
                        value={false}
                        type="radio"
                        name={data.input.name}
                        checked={!data.input.value}
                    />
                    <Label check className="form-check-label" htmlFor="enabled-no">
                        Tidak
                    </Label>
                </FormGroup>
            </div>
        );

        return renderFormGroup(data,inputField);
    }

    normalizeRoles = (values) => {
        let roles = [];
        roles[0] = values;
        return roles;
    };

    normalizeEnabled = (value) => {
        if(value==='true'){
            return true;
        }else{
            return false;
        }
    };

    render() {
        const { handleSubmit} = this.props;

        return (
            <StrapForm onSubmit={handleSubmit} className="form-horizontal">
                <Field
                    component={(data) => renderFormGroup(data)}
                    name="username"
                    type="text"
                    placeholder="masukkan nama pengguna user"
                    label="Nama Pengguna"
                />
                <Field
                    component={(data) => renderFormGroup(data)}
                    name="fullName"
                    type="text"
                    placeholder="masukkan nama lengkap user"
                    label="Nama Lengkap"
                />
                <Field
                    component={(data) => renderFormGroup(data)}
                    name="email"
                    type="text"
                    placeholder="masukkan alamat email"
                    label="Alamat Email"
                />
                {
                    this.props.context === 'admin' &&
                    <Field component={this.renderRoles} name="roles" placeholder="" normalize={this.normalizeRoles} />
                }
                {
                    this.props.context === 'admin' &&
                    <Field component={this.renderEnabled} name="enabled" placeholder="" normalize={this.normalizeEnabled} />
                }
                {
                    this.props.isCreateNew &&
                    <Field component={(data) => renderFormGroup(data)} name="plainPassword" label="Password" type="password" placeholder=""/>
                }
                <button type="submit" className="btn btn-success">
                    Simpan
                </button>
            </StrapForm>
        );
    }
}



export default reduxForm({form: 'user', enableReinitialize: true, keepDirtyOnReinitialize: true})(ProfileForm);
