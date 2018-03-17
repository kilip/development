import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Form from './Form';
import { create, loading, error } from '../../actions/user/create';

class Create extends Component {
    componentWillUnmount() {
        this.props.reset();
    }

    render() {
        if (this.props.created){
            return <Redirect to={`/users/edit/${this.props.created['id']}`}/>;
        }

        return (
            <div className="animated fadeIn">
                <Form
                    {...this.props}
                    cardTitle="Pengguna Baru"
                    onSubmit={this.props.create}
                    values={this.props.item}
                    isCreateNew={true}
                />
            </div>
        );
    }
}

Create.propTypes = {
    error: PropTypes.string,
    loading: PropTypes.bool.isRequired,
    created: PropTypes.object,
    create: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
    return {
        created: state.userAdmin.create.created,
        error: state.userAdmin.create.error,
        loading: state.userAdmin.create.loading,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        create: values => dispatch(create(values)),
        reset: () => {
            dispatch(loading(false));
            dispatch(error(null));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Create);
