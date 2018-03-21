import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';
import PropTypes from 'prop-types';
import {retrieve, reset} from '../../actions/user/show';
import { del, loading, error } from '../../actions/user/delete';

class Show extends Component {
    componentDidMount() {
        this.props.retrieve('/users/'+this.props.match.params.id);
    }

    componentWillUnmount() {
        this.props.reset();
    }

    del(){
        if (window.confirm('Are you sure you want to delete this item?')) this.props.del(this.props.retrieved);
    };

    render() {
        if (this.props.deleted) return <Redirect to=".."/>;

        const item = this.props.retrieved;

        return (
            <div>
              <h1>Show {item && item['@id']}</h1>

                {this.props.loading && <div className="alert alert-info" role="status">Loading...</div>}
                {this.props.error && <div className="alert alert-danger" role="alert"><span className="fa fa-exclamation-triangle" aria-hidden="true"></span> {this.props.error}</div>}
                {this.props.deleteError && <div className="alert alert-danger" role="alert"><span className="fa fa-exclamation-triangle" aria-hidden="true"></span> {this.props.deleteError}</div>}

                {
                    item
                    &&
                    <table className="table table-responsive table-striped table-hover">
                        <thead>
                        <tr>
                            <th>Field</th>
                            <th>Value</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <th scope="row">fullName</th>
                            <td>{item['fullName']}</td>
                        </tr>
                        <tr>
                            <th scope="row">username</th>
                            <td>{item['username']}</td>
                        </tr>
                        <tr>
                            <th scope="row">email</th>
                            <td>{item['email']}</td>
                        </tr>
                        </tbody>
                    </table>
                }
              <Link to="/users/" className="btn btn-primary">Back to list</Link>
                {item && <Link to={`/users/edit/${item['id']}`}>
                  <button className="btn btn-warning">Edit</button>
                </Link>
                }
              <button onClick={this.del} className="btn btn-danger">Delete</button>
            </div>
        );
    }
}

Show.propTypes = {
    error: PropTypes.string,
    loading: PropTypes.bool.isRequired,
    retrieved: PropTypes.object,
    retrieve: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired,
    deleteError: PropTypes.string,
    deleteLoading: PropTypes.bool.isRequired,
    deleted: PropTypes.object,
    del: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
    return {
        error: state.users.show.error,
        loading: state.users.show.loading,
        retrieved:state.users.show.retrieved,
        deleteError: state.users.del.error,
        deleteLoading: state.users.del.loading,
        deleted: state.users.del.deleted,
};
};

const mapDispatchToProps = (dispatch) => {
    return {
        retrieve: id => dispatch(retrieve(id)),
        del: item => dispatch(del(item)),
        reset: () => {
            dispatch(reset());
            dispatch(error(null));
            dispatch(loading(false));
        },
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Show);
