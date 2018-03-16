import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Form from './Form';
import { success } from '../../actions/baptisan/create';
import { retrieve, update, reset } from '../../actions/baptisan/update';
import { del, loading, error } from '../../actions/baptisan/delete';

class Update extends Component {
    componentDidMount() {
        this.props.retrieve('/baptisans/'+this.props.match.params.id);
    }

    componentWillUnmount() {
        this.props.reset();
    }

    del(){
        if (window.confirm('Are you sure you want to delete this item?')){
            this.props.del(this.props.retrieved);
        }
    };

    render() {
        if (this.props.deleted) return <Redirect to="/baptisans"/>;

        const item = this.props.updated ? this.props.updated : this.props.retrieved;

        return (
            <div>
              <h1>Edit {item && item['@id']}</h1>

                {this.props.created && <div className="alert alert-success" role="status">{this.props.created['@id']} created.</div>}
                {this.props.updated && <div className="alert alert-success" role="status">{this.props.updated['@id']} updated.</div>}
                {(this.props.retrieveLoading || this.props.updateLoading || this.props.deleteLoading) && <div className="alert alert-info" role="status">Loading...</div>}
                {this.props.retrieveError && <div className="alert alert-danger" role="alert"><span className="fa fa-exclamation-triangle" aria-hidden="true"></span> {this.props.retrieveError}</div>}
                {this.props.updateError && <div className="alert alert-danger" role="alert"><span className="fa fa-exclamation-triangle" aria-hidden="true"></span> {this.props.updateError}</div>}
                {this.props.deleteError && <div className="alert alert-danger" role="alert"><span className="fa fa-exclamation-triangle" aria-hidden="true"></span> {this.props.deleteError}</div>}

                {item && <Form onSubmit={values => this.props.update(item, values)} initialValues={item}/>}
              <Link to="/baptisans" className="btn btn-primary">Back to list</Link>
              <button onClick={this.del} className="btn btn-danger">Delete</button>
            </div>
        );
    }
}

Update.propTypes = {
    retrieveError: PropTypes.string,
    retrieveLoading: PropTypes.bool.isRequired,
    updateError: PropTypes.string,
    updateLoading: PropTypes.bool.isRequired,
    deleteError: PropTypes.string,
    deleteLoading: PropTypes.bool.isRequired,
    retrieved: PropTypes.object,
    updated: PropTypes.object,
    deleted: PropTypes.object,
    retrieve: PropTypes.func.isRequired,
    update: PropTypes.func.isRequired,
    del: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
    return {
        retrieveError: state.baptisan.update.retrieveError,
        retrieveLoading: state.baptisan.update.retrieveLoading,
        updateError: state.baptisan.update.updateError,
        updateLoading: state.baptisan.update.updateLoading,
        deleteError: state.baptisan.del.error,
        deleteLoading: state.baptisan.del.loading,
        created: state.baptisan.create.created,
        deleted: state.baptisan.del.deleted,
        retrieved: state.baptisan.update.retrieved,
        updated: state.baptisan.update.updated
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        retrieve: id => dispatch(retrieve(id)),
        update: (item, values) => dispatch(update(item, values)),
        del: item => dispatch(del(item)),
        reset: () => {
            dispatch(reset());
            dispatch(error(null));
            dispatch(loading(false));
            dispatch(success(null));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Update);
