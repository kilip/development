import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { list, reset } from '../../actions/user/list';
import { success } from '../../actions/user/delete';
import { itemToLinks } from '../../utils/helpers';
import _ from 'lodash';
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter
} from 'reactstrap';

class List extends Component {
    componentDidMount() {
        this.props.list(
            this.props.match.params.page
            && '/users?page=' + this.props.match.params.page
        );
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.match.params.page !== nextProps.match.params.page) {
            nextProps.list(
                nextProps.match.params.page
                && '/users?page=' + nextProps.match.params.page
            );
        }
    }

    componentWillUnmount() {
        this.props.reset();
    }

    render() {
        return (
            <Card>
                <CardHeader>
                    <strong>Daftar User</strong>
                </CardHeader>
                <CardBody>
                    {this.props.loading && <div className="alert alert-info">Loading...</div>}
                    {this.props.deletedItem && <div className="alert alert-success">{this.props.deletedItem['fullName']} deleted.</div>}
                    {this.props.error && <div className="alert alert-danger">{this.props.error}</div>}
                    <table className="table table-responsive table-striped table-hover">
                        <thead>
                            <tr>
                                <th>Full Name</th>
                                <th>username</th>
                                <th>email</th>
                                <th colSpan={2}></th>
                            </tr>
                        </thead>
                        <tbody>
                        {this.props.data['hydra:member'] && this.props.data['hydra:member'].map(item =>
                            <tr key={item['@id']}>
                                <td>{item['fullName'] ? itemToLinks(item['fullName']) : ''}</td>
                                <td>{item['username'] ? itemToLinks(item['username']) : ''}</td>
                                <td>{item['email'] ? itemToLinks(item['email']) : ''}</td>
                                <td>
                                    <Link to={`/users/show/${encodeURIComponent(item['id'])}`}>
                                        <span className="fa fa-search" aria-hidden="true"/>
                                        <span className="sr-only">Show</span>
                                    </Link>
                                </td>
                                <td>
                                    <Link to={`/users/edit/${item['id']}`}>
                                        <span className="fa fa-pencil" aria-hidden="true"/>
                                        <span className="sr-only">Edit</span>
                                    </Link>
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </CardBody>
                <CardFooter>
                    <Link to="/users/create" className="btn btn-primary">User Baru</Link>
                    {this.pagination()}
                </CardFooter>
            </Card>
        );
    }

    pagination() {
        const view = this.props.data['hydra:view'];
        if (!view) return;

        _.each(view,function(value,key,view){
            value = value.replace('/api/users?page=','/users/');
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
        data: state.userAdmin.list.data,
        error: state.userAdmin.list.error,
        loading: state.userAdmin.list.loading,
        deletedItem: state.userAdmin.del.deleted,
        user: state.security.user
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
