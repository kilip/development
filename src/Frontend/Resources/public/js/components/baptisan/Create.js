import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
} from 'reactstrap';
import { create } from "../../actions/baptisan";

import Form from './Form';
import { Redirect } from 'react-router-dom';

export class Create extends Component {
    render(){
        if (this.props.created){
            return (<Redirect to={`/baptisans/edit/${this.props.created['id']}`}/>);
        }
        return (
            <Card>
                <CardHeader>
                    <strong>Menambah data Baptisan</strong>
                </CardHeader>
                <CardBody>
                    <Form
                        onSubmit={this.props.create}
                        item={this.props.item}
                        id="formBaptisanCreate"
                    />
                </CardBody>
            </Card>
        );
    }
}


Create.propTypes = {
    create: PropTypes.func.isRequired,
    created: PropTypes.object,
    error: PropTypes.string,
    item: PropTypes.object
};

const mapStateToProps = (state) => {
    return {
        error: state.baptisan.error,
        created: state.baptisan.created
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        create: (values) => dispatch(create(values))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Create);