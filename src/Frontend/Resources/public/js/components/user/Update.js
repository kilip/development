import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Form from './Form';
import { success } from '../../actions/user/create';
import { retrieve, update, reset } from '../../actions/user/update';
import { del, loading, error } from '../../actions/user/delete';

class Update extends Component {
    componentDidMount() {
        this.props.retrieve('/users/'+this.props.match.params.id);
    }

    componentWillUnmount() {
        this.props.reset();
    }

    del = () =>{
        if (window.confirm('Are you sure you want to delete this item?')){
            this.props.del(this.props.retrieved);
        }
    };

    render() {
        if (this.props.deleted) return <Redirect to="/users"/>;

        const item = this.props.updated ? this.props.updated : this.props.retrieved;

        return (
            <div className="animated fadeIn">
                {
                    item &&
                    <Form
                        method="POST"
                        onSubmit={values => this.props.update(item, values)}
                        initialValues={item}
                        cardTitle={item && item['fullName']}
                        {...this.props}
                        delete={this.del}
                        id="formUserUpdate"
                    />
                }
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
        retrieveError: state.userAdmin.update.retrieveError,
        retrieveLoading: state.userAdmin.update.retrieveLoading,
        updateError: state.userAdmin.update.updateError,
        updateLoading: state.userAdmin.update.updateLoading,
        deleteError: state.userAdmin.del.error,
        deleteLoading: state.userAdmin.del.loading,
        created: state.userAdmin.create.created,
        deleted: state.userAdmin.del.deleted,
        retrieved: state.userAdmin.update.retrieved,
        updated: state.userAdmin.update.updated
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
