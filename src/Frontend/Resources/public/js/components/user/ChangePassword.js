import React, {Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ChangePasswordForm from './forms/password';
import { retrieve, changePassword,reset, success,error } from '../../actions/user/changePassword';
import { loading } from "../../actions/global";

class ChangePassword extends Component {
    componentDidMount() {
        this.props.retrieve(this.props.currentUser['id'],this.props.context);
    }

    componentWillUnmount(){
        this.props.reset();
    }

    render(){
        const item = this.props.retrieved;
        const { context } = this.props;
        return (
            <div className="animated fadeIn">
                {
                    this.props.error &&
                    <div className="alert alert-danger" role="alert">
                        <span className="fa fa-exclamation-triangle" aria-hidden="true"/>
                        {this.props.error}
                    </div>
                }
                {
                    this.props.updated &&
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
    updated: PropTypes.object,
    retrieve: PropTypes.func.isRequired,
    changePassword: PropTypes.func.isRequired,
    context: PropTypes.string
};

const mapStateToProps = (state) => {
    return {
        error: state.users.changePassword.error,
        loading: state.app.loading,
        updated: state.users.changePassword.updated,
        retrieved: state.users.changePassword.retrieved,
        retrieveError: state.users.changePassword.retrieveError
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        retrieve: (id,context) => dispatch(retrieve(id,context)),
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