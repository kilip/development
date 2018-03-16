import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';
import PropTypes from 'prop-types';
import {retrieve, reset} from '../../actions/baptisan/show';
import { del, loading, error } from '../../actions/baptisan/delete';

class Show extends Component {
    componentDidMount() {
        this.props.retrieve('/baptisans/'+this.props.match.params.id);
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

                {item && <table className="table table-responsive table-striped table-hover">
                  <thead>
                  <tr>
                    <th>Field</th>
                    <th>Value</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr>
                    <th scope="row">nama</th>
                    <td>{item['nama']}</td>
                  </tr>
                  <tr>
                    <th scope="row">namaBaptis</th>
                    <td>{item['namaBaptis']}</td>
                  </tr>
                  <tr>
                    <th scope="row">ayah</th>
                    <td>{item['ayah']}</td>
                  </tr>
                  <tr>
                    <th scope="row">ibu</th>
                    <td>{item['ibu']}</td>
                  </tr>
                  <tr>
                    <th scope="row">jenisKelamin</th>
                    <td>{item['jenisKelamin']}</td>
                  </tr>
                  </tbody>
                </table>
                }
              <Link to="/baptisans/" className="btn btn-primary">Back to list</Link>
                {item && <Link to={`/baptisans/edit/${encodeURIComponent(item['id'])}`}>
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
        error: state.baptisan.show.error,
        loading: state.baptisan.show.loading,
        retrieved:state.baptisan.show.retrieved,
        deleteError: state.baptisan.del.error,
        deleteLoading: state.baptisan.del.loading,
        deleted: state.baptisan.del.deleted,
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
