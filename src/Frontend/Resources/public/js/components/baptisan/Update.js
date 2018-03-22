import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter
} from 'reactstrap';
import { retrieve, update, remove } from "../../actions/baptisan";
import { Redirect } from 'react-router-dom';
import Form from './Form';

class Update extends Component{
    componentDidMount(){
        this.props.retrieve(this.props.match.params.id);
    }

    remove = () =>{
        if (window.confirm('Apakah anda yakin ingin menghapus data ini?')){
            this.props.remove(this.props.retrieved);
        }
    };

    render(){
        if (this.props.removed){
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
                        context="update"
                        id="formBaptisanUpdate"
                    />
                </CardBody>
                <CardFooter>
                    {
                        (this.props.context!=='create' && this.props.remove) &&
                        <button onClick={this.remove} className="btn btn-danger">Hapus</button>
                    }
                </CardFooter>
            </Card>
        );

    }
}

Update.propTypes = {
    retrieved: PropTypes.object,
    updated: PropTypes.object,
    removed: PropTypes.object,
    retrieve: PropTypes.func.isRequired,
    update: PropTypes.func.isRequired,
    remove: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
    return {
        retrieved: state.baptisan.retrieved,
        updated: state.baptisan.updated,
        removed: state.baptisan.removed,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        retrieve: (id) => dispatch(retrieve(id)),
        update: (item,values) => dispatch(update(item,values)),
        remove: (item) => dispatch(remove(item))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Update);