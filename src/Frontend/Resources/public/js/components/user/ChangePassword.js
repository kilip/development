import React, {Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ChangePasswordForm from './forms/password';
import { retrieve, changePassword,reset, success,error,loading } from '../../actions/user/changePassword';

class ChangePassword extends Component {
    componentDidMount() {
        this.props.retrieve(this.props.currentUser['id']);
    }

    componentWillUnmount(){
        this.props.reset();
    }

    render(){
        if(this.props.currentUser && !this.props.retrieved){
            this.props.retrieve(this.props.currentUser['id']);
        }
        const item = this.props.retrieved;
        const context = this.props.context;
        return (
            <div className="animated fadeIn">
                {
                    this.props.loading &&
                    <div className="alert alert-info" role="alert">
                        <span className="fa fa-exclamation-triangle" aria-hidden="true"/>
                        &nbsp;Memproses data
                    </div>
                }
                {
                    this.props.error &&
                    <div className="alert alert-danger" role="alert">
                        <span className="fa fa-exclamation-triangle" aria-hidden="true"/>
                        {this.props.error}
                    </div>
                }
                {
                    this.props.success &&
                    <div className="alert alert-success" role="alert">
                        Password berhasil diubah.
                    </div>
                }
                {
                    item &&
                    <ChangePasswordForm
                        method="POST"
                        onSubmit={values => this.props.changePassword(item, values,context)}
                        initialValues={item}
                        context={context}
                        id="formChangePassword"
                    />
                }
            </div>
        );
    }
}

ChangePassword.propTypes = {
    retrieved: PropTypes.object,
    currentUser: PropTypes.object,
    retrieveError: PropTypes.string,
    error: PropTypes.string,
    loading: PropTypes.bool,
    success: PropTypes.object,
    retrieve: PropTypes.func.isRequired,
    changePassword: PropTypes.func.isRequired,
    context: PropTypes.string
};

const mapStateToProps = (state) => {
    return {
        error: state.userAdmin.changePassword.error,
        loading: state.userAdmin.changePassword.loading,
        success: state.userAdmin.changePassword.success,
        retrieved: state.userAdmin.changePassword.retrieved,
        retrieveError: state.userAdmin.changePassword.retrieveError
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        retrieve: id => dispatch(retrieve(id)),
        changePassword: (item,values,context) => dispatch(changePassword(item,values,context)),
        reset:  () => {
            dispatch(reset());
            dispatch(error(null));
            dispatch(loading(false));
            dispatch(success(null));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);