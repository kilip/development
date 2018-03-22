import React, {Component} from 'react';
import {Row, Col, CardGroup, Card, CardBody, Button, Input, InputGroup, InputGroupAddon, InputGroupText} from 'reactstrap';
import Container from '../Loader';
import { connect } from 'react-redux';
import { login } from '../../actions/security/authentication';
import PropTypes from 'prop-types';
import LoginForm from './forms/login';

class Login extends Component {

    render() {
        const { security } = this.props;
        return (
            <div className="app flex-row align-items-center">
                <Container>
                    <Row className="justify-content-center">
                        <Col md="8">
                            <CardGroup>
                                <Card className="p-4">
                                    <CardBody>
                                        <h1>Login</h1>
                                        <p className="text-muted">Login to SIAP</p>
                                        {
                                            security.error &&
                                            <div className="alert alert-danger">
                                                {security.error}
                                            </div>
                                        }
                                        <LoginForm onSubmit={values => this.props.login(values)} method="POST"/>

                                    </CardBody>
                                </Card>
                                <Card className="text-white bg-primary py-5 d-md-down-none" style={{ width: 44 + '%' }}>
                                    <CardBody className="text-center">
                                        <div>
                                            <h2>Sistim Informasi dan Administrasi Paroki</h2>
                                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                                                labore et dolore magna aliqua.</p>
                                            <Button color="primary" className="mt-3" active>Register Now!</Button>
                                        </div>
                                    </CardBody>
                                </Card>
                            </CardGroup>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

Login.propTypes = {
    login: PropTypes.func.isRequired,
    security: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
    return {
        security: state.security
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        login: (data,options) => dispatch(login(data,options))
    }
};
export default connect(mapStateToProps,mapDispatchToProps)(Login);
