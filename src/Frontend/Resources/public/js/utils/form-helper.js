import React from 'react';
import _ from 'lodash';
import {
    Form as StrapForm,
    FormGroup,
    Label,
    FormText,
    Col,
    Input
} from 'reactstrap';

export function generateLabel(data){
    let label = data.label;
    if(!label){
        label = _.startCase(data.input.name.replace('_',' '));
    }
    return label;
}

export function renderFormGroup(data,inputField=false){
    const hasError = data.meta.touched && !!data.meta.error;
    data.input.className = 'form-control';

    let label = generateLabel(data);

    if (hasError) {
        data.input.className += ' is-invalid';
        data.input['aria-invalid'] = true;
    }else{
        data.input.className += ' is-valid';
    }
    if(!inputField){
        inputField = (
            <input
                {...data.input}
                type={data.type}
                step={data.step}
                required={data.required}
                placeholder={data.placeholder}
                id={`user_${data.input.name}`}
            />
        );
    }
    return (
        <div className={`form-group`}>
            <FormGroup row>
                <Col md="3">
                    <label htmlFor={`user_${data.input.name}`} className="form-control-label">
                        {label}
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