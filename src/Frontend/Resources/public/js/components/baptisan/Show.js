import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
} from 'reactstrap';

export class Show extends Component {
    render(){
        const item = this.props.retrieved;
        return (
            <Card>
                <CardHeader>
                    <strong>{item['nama'] ? item['nama']:''}</strong>
                </CardHeader>
                <CardBody>
                    {
                        item
                        &&
                        <table className="table table-responsive table-striped table-hover">
                            <tbody>
                                <tr>
                                    <th scope="row">Nama Lengkap</th>
                                    <td>{item['nama']}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Nama Baptis</th>
                                    <td>{item['namaBaptis']}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Tempat Lahir</th>
                                    <td>{item['tempatLahir']}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Tanggal Lahir</th>
                                    <td>{item['tanggalLahir']}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Jenis Kelamin</th>
                                    <td>{item['jenisKelamin']===1 ? 'Laki-Laki':'Perempuan'}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Ayah</th>
                                    <td>{item['ayah']}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Ibu</th>
                                    <td>{item['ibu']}</td>
                                </tr>
                            </tbody>
                        </table>
                    }
                </CardBody>
                <CardFooter>

                </CardFooter>
            </Card>
        );
    }
}

Show.propTypes = {
    retrieved: PropTypes.object
};

const mapStateToProps = (state) => {
    return {
        retrieved: state.baptisan.retrieved
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Show);