import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Form from './Form';
import { create, loading, error } from '../actions/create';

class Create extends Component {
  componentWillUnmount() {
    this.props.reset();
  }

  render() {
    if (this.props.created) return <Redirect to={`edit/${encodeURIComponent(this.props.created['@id'])}`}/>;

    return (
        <div>
          <h1>Buat Data Baru</h1>

            {this.props.loading && <div className="alert alert-info" role="status">Loading...</div>}
            {this.props.error && <div className="alert alert-danger" role="alert"><span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span> {this.props.error}</div>}
          <Form onSubmit={this.props.create} values={this.props.item}/>
          <Link to="." className="btn btn-default">Back to list</Link>
        </div>
    )
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
    created: state.baptisan.create.created,
    error: state.baptisan.create.error,
    loading: state.baptisan.create.loading,
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
