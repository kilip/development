import React, {Component} from 'react';
import {Container, Row, Col, CardGroup, Card, CardBody, Button, Input, InputGroup, InputGroupAddon, InputGroupText} from 'reactstrap';

import { connect } from 'react-redux';
import { login } from '../components/security/actions';
import PropTypes from 'prop-types';

class Login extends Component {

    constructor(props){
        super(props);

        this.state = {
            username: '',
            password: ''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e){
        this.setState({[e.target.name]: e.target.value});
    }

    handleSubmit = () =>{
        this.props.login({
            username: this.state.username,
            password: this.state.password
        });
    };

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
                                        <p className="text-muted">Sign In to your account</p>
                                        {
                                            security.user.error &&
                                            <div className="alert alert-danger">
                                                {security.user.error.message}
                                            </div>
                                        }
                                        <InputGroup className="mb-3">
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    <i className="icon-user"></i>
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <Input type="text" placeholder="Username" name="username" value={this.state.username} onChange={(e) => this.handleChange(e)}/>
                                        </InputGroup>
                                        <InputGroup className="mb-4">
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    <i className="icon-lock"></i>
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <Input type="password" placeholder="Password" name="password" value={this.state.password} onChange={(e) => this.handleChange(e)}/>
                                        </InputGroup>
                                        <Row>
                                            <Col xs="6">
                                                <Button color="primary" className="px-4" onClick={this.handleSubmit}>Login</Button>
                                            </Col>
                                            <Col xs="6" className="text-right">
                                                <Button color="link" className="px-0">Forgot password?</Button>
                                            </Col>
                                        </Row>
                                    </CardBody>
                                </Card>
                                <Card className="text-white bg-primary py-5 d-md-down-none" style={{ width: 44 + '%' }}>
                                    <CardBody className="text-center">
                                        <div>
                                            <h2>SIAP</h2>
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
