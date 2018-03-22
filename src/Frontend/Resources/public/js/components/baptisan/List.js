import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter
} from 'reactstrap';
import { listRetrieve } from "../../actions/baptisan";
import Paginator from '../Paginator';
import { Link } from 'react-router-dom';


export class List extends Component {
    componentDidMount() {
        this.props.listRetrieve(
            this.props.match.params.page
            && this.props.match.params.page
        );
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.match.params.page !== nextProps.match.params.page) {
            nextProps.listRetrieve(
                nextProps.match.params.page
                && nextProps.match.params.page
            );
        }
    }

    renderItem = (item) => {
        return (
            <tr key={item['id']}>
                <td>
                    <Link to={`/baptisans/edit/${item['id']}`}>
                        <span className="fa fa-pencil" aria-hidden="true"/>
                        <span className="sr-only">Edit</span>
                    </Link>
                </td>
                <td>{item['nama'] ? item['nama']:''}</td>
                <td>{item['jenisKelamin'] ? (item['jenisKelamin']===1 ? 'Laki-Laki':'Perempuan'):''}</td>
                <td>{item['ayah'] ? item['ayah']:''}</td>
                <td>{item['ibu'] ? item['ibu']:''}</td>
                <td>{item['tempatLahir'] ? item['tempatLahir']:''}</td>
                <td>{item['tanggalLahir'] ? item['tanggalLahir']:''}</td>
            </tr>
        );
    };

    render() {

        return (
            <Card>
                <CardHeader>
                    <strong>Buku Baptis</strong>
                </CardHeader>
                <CardBody>
                    <table className="table table-responsive table-striped table-hover mh-300">
                        <thead>
                            <tr>
                                <th/>
                                <th>Nama</th>
                                <th>Jenis Kelamin</th>
                                <th>Ayah</th>
                                <th>Ibu</th>
                                <th>Tempat Lahir</th>
                                <th>Tanggal Lahir</th>
                            </tr>
                        </thead>
                        <tbody>
                        {this.props.list['hydra:member'] && this.props.list['hydra:member'].map((item) => this.renderItem(item))}
                        </tbody>
                    </table>
                    <Paginator items={this.props.list}/>
                </CardBody>
                <CardFooter>
                    <Link to="/baptisans/create" className="btn btn-primary">User Baru</Link>
                </CardFooter>
            </Card>
        );
    }
}

List.propTypes = {
    match: PropTypes.object,
    listRetrieve: PropTypes.func.isRequired,
    list: PropTypes.object,
    error: PropTypes.string,
};

const mapStateToProps = (state) => {
    return {
        list: state.baptisan.list,
        error: state.baptisan.error,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        listRetrieve: (page) => dispatch(listRetrieve(page))
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(List);