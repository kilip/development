import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
    Card,
    CardHeader,
    CardBody,
} from 'reactstrap';
import { retrieve, update } from "../../actions/baptisan";
import { Redirect } from 'react-router-redux';
import Form from './Form';

class Update extends Component{
    componentDidMount(){
        this.props.retrieve(this.props.match.params.id);
    }

    render(){
        if (this.props.deleted){
            return <Redirect to="/baptisans"/>;
        }
        const item = this.props.updated ? this.props.updated : this.props.retrieved;
        return (
            <Card>
                <CardHeader>
                    <strong>Edit {item && item['nama']}</strong>
                </CardHeader>
                <CardBody>
                    {this.props.created && <div className="alert alert-success" role="status">Data berhasil ditambahkan.</div>}
                    {this.props.updated && <div className="alert alert-success" role="status">Data berhasil diperbaharui.</div>}
                    {this.props.error && <div className="alert alert-danger" role="alert"><span className="fa fa-exclamation-triangle" aria-hidden="true"></span> {this.props.error}</div>}
                    <Form
                        onSubmit={values => this.props.update(item,values)}
                        initialValues={item}
                        id="formBaptisanUpdate"
                    />
                </CardBody>
            </Card>
        );

    }
}

Update.propTypes = {
    retrieved: PropTypes.object,
    updated: PropTypes.object,
    deleted: PropTypes.object,
    retrieve: PropTypes.func.isRequired,
    update: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
    return {
        retrieved: state.baptisan.retrieved,
        updated: state.baptisan.updated,
        deleted: state.baptisan.deleted
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        retrieve: (id) => dispatch(retrieve(id)),
        update: (item,values) => dispatch(update(item,values))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Update);