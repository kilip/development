import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import {
    Form as StrapForm,
    FormGroup,
    Label,
    Card,
    CardBody,
    CardHeader,
    CardFooter,
    FormText,
    Col,
    Input
} from 'reactstrap';

class Form extends Component {
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

        const hasRole = function(roles,type){
            let found = false;
            _.each(roles,function(value){
                if(value === type){
                    found = true;
                }
            });
            return found;
        };

        if('roles' === data.input.name){

            inputField = (
                <div>
                    <FormGroup check className="radio">
                        <Input
                            {...data.input}
                            value="SUPER_ADMIN"
                            id="roles-super-admin"
                            type="radio"
                            name={data.input.name}
                            className="form-check-input"
                            checked={hasRole(data.input.value,'SUPER_ADMIN')}
                        />
                        <Label check className="form-check-label" htmlFor="roles-super-admin">
                            Super Administrator
                        </Label>
                    </FormGroup>
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
        }

        if('enabled' === data.input.name){
            inputField = (
                <div>
                    <FormGroup check className="radio">
                        <Input
                            {...data.input}
                            id="enabled-yes"
                            className="form-check-input"
                            value="true"
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
                            value="false"
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
        }

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

    normalizeRoles = (values) => {
        let roles = [];
        roles[0] = values;
        return roles;
    };

    render() {
        const { handleSubmit } = this.props;

        return (
            <StrapForm onSubmit={handleSubmit} className="form-horizontal">
                <Field component={this.renderField} name="username" type="text" placeholder="" />
                <Field component={this.renderField} name="fullName" type="text" placeholder="" />
                <Field component={this.renderField} name="roles" placeholder="" normalize={this.normalizeRoles} />
                <Field component={this.renderField} name="email" type="text" placeholder="" />
                <Field component={this.renderField} name="enabled" placeholder="" />
            </StrapForm>
        );
    }
}



export default reduxForm({form: 'user', enableReinitialize: true, keepDirtyOnReinitialize: true})(Form);
