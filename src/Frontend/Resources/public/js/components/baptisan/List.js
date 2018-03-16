import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { list, reset } from '../../actions/baptisan/list';
import { success } from '../../actions/baptisan/delete';
import { itemToLinks } from '../../utils/helpers';
import _ from 'lodash';

class List extends Component {
    componentDidMount() {
        this.props.list(
            this.props.match.params.page
            && '/baptisans?page=' + this.props.match.params.page
        );
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.match.params.page !== nextProps.match.params.page) {
            nextProps.list(
                nextProps.match.params.page
                && '/baptisans?page=' + nextProps.match.params.page
            );
        }
    }

    componentWillUnmount() {
        this.props.reset();
    }

    render() {
        return (
            <div>
              <h1>Baptisan List</h1>

                {this.props.loading && <div className="alert alert-info">Loading...</div>}
                {this.props.deletedItem && <div className="alert alert-success">{this.props.deletedItem['@id']} deleted.</div>}
                {this.props.error && <div className="alert alert-danger">{this.props.error}</div>}

              <p><Link to="create" className="btn btn-primary">Create</Link></p>

              <table className="table table-responsive table-striped table-hover">
                <thead>
                <tr>
                    <th>nama</th>
                    <th>namaBaptis</th>
                    <th>ayah</th>
                    <th>ibu</th>
                    <th>jenisKelamin</th>
                    <th colSpan={2}></th>
                </tr>
                </thead>
                <tbody>
                {this.props.data['hydra:member'] && this.props.data['hydra:member'].map(item =>
                    <tr key={item['@id']}>
                        <td>{item['nama'] ? itemToLinks(item['nama']) : ''}</td>
                        <td>{item['namaBaptis'] ? itemToLinks(item['namaBaptis']) : ''}</td>
                        <td>{item['ayah'] ? itemToLinks(item['ayah']) : ''}</td>
                        <td>{item['ibu'] ? itemToLinks(item['ibu']) : ''}</td>
                        <td>{item['jenisKelamin'] ? itemToLinks(item['jenisKelamin']) : ''}</td>
                        <td>
                            <Link to={`/baptisans/show/${encodeURIComponent(item['id'])}`}>
                                <span className="fa fa-search" aria-hidden="true"/>
                                <span className="sr-only">Show</span>
                            </Link>
                        </td>
                        <td>
                            <Link to={`/baptisans/edit/${item['id']}`}>
                                <span className="fa fa-pencil" aria-hidden="true"/>
                                <span className="sr-only">Edit</span>
                            </Link>
                        </td>
                    </tr>
                )}
                </tbody>
              </table>

                {this.pagination()}
            </div>
        );
    }

    pagination() {
        const view = this.props.data['hydra:view'];
        if (!view) return;

        _.each(view,function(value,key,view){
            value = value.replace('/api/baptisans?page=','/baptisans/');
            view[key] = value
        });

        const {'hydra:first': first, 'hydra:previous': previous,'hydra:next': next, 'hydra:last': last} = view;

        return (
            <nav aria-label="Page navigation">
              <Link to='.' className={`btn btn-primary${previous ? '' : ' disabled'}`}><span aria-hidden="true">&lArr;</span> First</Link>
              <Link to={!previous || previous === first ? '.' : previous} className={`btn btn-primary${previous ? '' : ' disabled'}`}><span aria-hidden="true">&larr;</span> Previous</Link>
              <Link to={next ? next : '#'} className={`btn btn-primary${next ? '' : ' disabled'}`}>Next <span aria-hidden="true">&rarr;</span></Link>
              <Link to={last ? last : '#'} className={`btn btn-primary${next ? '' : ' disabled'}`}>Last <span aria-hidden="true">&rArr;</span></Link>
            </nav>
        );
    }
}

List.propTypes = {
    error: PropTypes.string,
    loading: PropTypes.bool.isRequired,
    data: PropTypes.object.isRequired,
    deletedItem: PropTypes.object,
    list: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
    return {
        data: state.baptisan.list.data,
        error: state.baptisan.list.error,
        loading: state.baptisan.list.loading,
        deletedItem: state.baptisan.del.deleted,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        list: (page) => dispatch(list(page)),
        reset: () => {
            dispatch(reset());
            dispatch(success(null));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(List);
