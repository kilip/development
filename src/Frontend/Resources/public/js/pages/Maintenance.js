import React, {Component} from 'react';
import {Container, Row, Col, Button, Input, InputGroup, InputGroupAddon, InputGroupText} from 'reactstrap';

class Maintenance extends Component {
    render() {
        return (
            <div className="app flex-row align-items-center">
                <Container>
                    <Row className="justify-content-center">
                        <Col md="6">
                            <div className="clearfix">
                                <h1 className="float-left display-3 mr-4">503</h1>
                                <h4 className="pt-3">Maintenance</h4>
                                <p className="text-muted float-left">
                                    Aplikasi sedang dalam perawatan.
                                </p>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default Maintenance;
