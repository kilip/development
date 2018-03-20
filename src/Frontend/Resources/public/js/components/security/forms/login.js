import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import {
    Form as StrapForm,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Row,
    Col,
    Button
} from 'reactstrap';

class LoginForm extends Component {
    renderField(data){
        return (
            <input
                {...data.input}
                type={data.type}
                step={data.step}
                required={data.required}
                placeholder={data.placeholder}
                id={`login_${data.input.name}`}
                className="form-control"
            />
        );
    }

    render(){
        const { handleSubmit } = this.props;
        return (
            <StrapForm onSubmit={handleSubmit}>
                <InputGroup className="mb-3">
                    <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                            <i className="icon-user"></i>
                        </InputGroupText>
                    </InputGroupAddon>
                    <Field
                        component={this.renderField}
                        type="text"
                        name="username"
                    />
                </InputGroup>
                <InputGroup className="mb-4">
                    <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                            <i className="icon-lock"></i>
                        </InputGroupText>
                    </InputGroupAddon>
                    <Field
                        component={this.renderField}
                        type="password"
                        name="password"
                    />
                </InputGroup>
                <Row>
                    <Col xs="6">
                        <Button color="primary" className="px-4" type="submit">Login</Button>
                    </Col>
                    <Col xs="6" className="text-right">
                        <Button color="link" className="px-0">Forgot password?</Button>
                    </Col>
                </Row>
            </StrapForm>
        );
    }
}

export default reduxForm({form: 'login', enableReinitialize: true, keepDirtyOnReinitialize: true})(LoginForm);