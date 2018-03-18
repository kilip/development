import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { error, loading, updateSuccess, retrieve, update, reset } from '../../actions/user/profile';
import {
    Col,
    Row,
    Nav,
    NavLink,
    NavItem,
    TabPane,
    TabContent,
    Card,
    CardBody,
    CardHeader,
    CardFooter
} from 'reactstrap';

import classNames from 'classnames';

class Profile extends Component {

    componentDidMount() {
        this.props.retrieve();
    }

    componentWillUnmount() {
        this.props.reset();
    }

    render() {
        //if (this.props.deleted) return <Redirect to="/users"/>;

        //const item = this.props.updated ? this.props.updated : this.props.retrieved;

        return (
            <div>
                "Hello WOrld"
            </div>
        );
    }
}

Profile.propTypes = {
    updated: PropTypes.object,
    retrieved: PropTypes.object,
    error: PropTypes.string,
    loading: PropTypes.bool,
    retrieve: PropTypes.func.isRequired,
    update: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
    return {
        updated: state.userAdmin.profile.updated,
        retrieved: state.userAdmin.profile.retrieved,
        error: state.userAdmin.profile.error,
        loading: state.userAdmin.profile.loading
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        retrieve: () => dispatch(retrieve()),
        update: (item, values) => dispatch(update(item, values)),
        reset: () => {
            dispatch(reset());
            dispatch(error(null));
            dispatch(loading(false));
            dispatch(updateSuccess(null));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
