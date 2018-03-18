import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import {
    Form as StrapForm
} from 'reactstrap';

import {renderFormGroup} from "../../../utils/form-helper";

class ChangePasswordForm extends Component {
    render(){
        const { handleSubmit,context} = this.props;

        return (
            <StrapForm onSubmit={handleSubmit} className="form-horizontal">
                {
                    context==='profil' &&
                    <Field
                        component={(data) => renderFormGroup(data)}
                        type="password"
                        name="currentPassword"
                        placeholder="Masukkan password lama anda"
                        label="Password lama anda"
                    />
                }
                <Field
                    component={(data) => renderFormGroup(data)}
                    type="password"
                    name="plainPassword"
                    placeholder="Masukkan password baru"
                    label="Password baru"
                />
                <Field
                    component={(data) => renderFormGroup(data)}
                    type="password"
                    name="plainPasswordConfirm"
                    placeholder="Masukkan ulang password baru"
                    label="Konfirmasi password baru"
                />
                <button type="submit" className="btn btn-success">
                    Ubah Password
                </button>
            </StrapForm>
        );
    }
}


export default reduxForm({form: 'userChangePassword', enableReinitialize: true, keepDirtyOnReinitialize: true})(ChangePasswordForm);