import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import _ from 'lodash';
import {
    Form as StrapForm,
    FormGroup,
    Label,
    FormText,
    Col,
    Input
} from 'reactstrap';

class ChangePasswordForm extends Component {
    renderField(data){
        const hasError = data.meta.touched && !!data.meta.error;
        data.input.className = 'form-control';

        if (hasError) {
            data.input.className += ' is-invalid';
            data.input['aria-invalid'] = true;
        }else{
            data.input.className += ' is-valid';
        }

        let inputField = (
            <input
                {...data.input}
                type={data.type}
                step={data.step}
                required={data.required}
                placeholder={data.placeholder}
                id={`user_${data.input.name}`}
            />
        );
        return (
            <div className={`form-group`}>
                <FormGroup row>
                    <Col md="3">
                        <label htmlFor={`user_${data.input.name}`} className="form-control-label">
                            {_.startCase(data.input.name.replace('_',' '))}
                        </label>
                    </Col>
                    <Col xs="12" md="9">
                        {inputField}
                        {
                            hasError &&
                            <FormText className="error-block">
                                {data.meta.error}
                            </FormText>
                        }
                    </Col>
                </FormGroup>
            </div>
        );
    }

    render(){
        const { handleSubmit} = this.props;

        return (
            <StrapForm onSubmit={handleSubmit} className="form-horizontal">
                <Field component={this.renderField} type="password" name="plainPassword" placeholder="Password baru" />
                <Field component={this.renderField} type="password" name="plainPasswordConfirm" placeholder="Ulangi password" />
                <button type="submit" className="btn btn-success">
                    Change Password
                </button>
            </StrapForm>
        );
    }
}

export default reduxForm({form: 'userChangePassword', enableReinitialize: true, keepDirtyOnReinitialize: true})(ChangePasswordForm);