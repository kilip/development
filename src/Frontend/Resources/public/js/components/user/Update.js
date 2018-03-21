import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import ProfileForm from './forms/profile';
import ChangePassword from './ChangePassword';
import { success } from '../../actions/user/create';
import { retrieve, update, reset } from '../../actions/user/update';
import { del, loading, error } from '../../actions/user/delete';
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
import {userIsAdmin} from "../security/auth";

class Update extends Component {

    constructor(props){
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            activeTab: '1'
        };

    }

    componentDidMount() {
        this.props.retrieve('/users/'+this.props.match.params.id);
    }

    componentWillUnmount() {
        this.props.reset();
    }

    del = () =>{
        if (window.confirm('Are you sure you want to delete this item?')){
            this.props.del(this.props.retrieved);
        }
    };

    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }

    render() {
        if (this.props.deleted) return <Redirect to="/users"/>;

        const item = this.props.updated ? this.props.updated : this.props.retrieved;

        return (
            <div className="animated fadeIn">
                <Card>
                    <CardHeader>
                        <strong>{item && item['fullName']}</strong>
                    </CardHeader>
                    <CardBody>
                        <Row>
                            <Col xs="12" md="12" className="mb-4">
                                <Nav tabs>
                                    <NavItem>
                                        <NavLink
                                            className={classNames({active: this.state.activeTab==='1'})}
                                            onClick={()  => this.toggle('1')}
                                        >
                                            Profil
                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink
                                            className={classNames({active: this.state.activeTab==='2'})}
                                            onClick={() => this.toggle('2')}
                                        >
                                            Password
                                        </NavLink>
                                    </NavItem>
                                </Nav>
                                <TabContent activeTab={this.state.activeTab}>
                                    <TabPane tabId="1">
                                        {this.props.created && <div className="alert alert-success" role="status">Data berhasil ditambahkan.</div>}
                                        {this.props.updated && <div className="alert alert-success" role="status">Data berhasil diperbaharui.</div>}
                                        {(this.props.retrieveLoading || this.props.updateLoading || this.props.deleteLoading || this.props.loading) && <div className="alert alert-info" role="status">Loading...</div>}
                                        {this.props.retrieveError && <div className="alert alert-danger" role="alert"><span className="fa fa-exclamation-triangle" aria-hidden="true"></span> {this.props.retrieveError}</div>}
                                        {this.props.updateError && <div className="alert alert-danger" role="alert"><span className="fa fa-exclamation-triangle" aria-hidden="true"></span> {this.props.updateError}</div>}
                                        {this.props.deleteError && <div className="alert alert-danger" role="alert"><span className="fa fa-exclamation-triangle" aria-hidden="true"></span> {this.props.deleteError}</div>}
                                        {
                                            item &&
                                            <ProfileForm
                                                method="POST"
                                                onSubmit={values => this.props.update(item, values)}
                                                initialValues={item}
                                                delete={this.del}
                                                id="formUserUpdate"
                                                context="admin"
                                            />
                                        }
                                    </TabPane>
                                    <TabPane tabId="2">
                                        {
                                            item &&
                                            <ChangePassword currentUser={item}/>
                                        }
                                    </TabPane>
                                </TabContent>
                            </Col>
                        </Row>
                    </CardBody>
                    <CardFooter>
                        <Link to="/users" className="btn btn-primary">Back to list</Link>
                        {
                            this.props.del &&
                            <button onClick={this.props.del} className="btn btn-danger">Delete</button>
                        }
                    </CardFooter>
                </Card>
            </div>
        );
    }
}

Update.propTypes = {
    retrieveError: PropTypes.string,
    retrieveLoading: PropTypes.bool.isRequired,
    updateError: PropTypes.string,
    updateLoading: PropTypes.bool.isRequired,
    deleteError: PropTypes.string,
    deleteLoading: PropTypes.bool.isRequired,
    retrieved: PropTypes.object,
    updated: PropTypes.object,
    deleted: PropTypes.object,
    retrieve: PropTypes.func.isRequired,
    update: PropTypes.func.isRequired,
    del: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired,
    activeTab: PropTypes.string
};

const mapStateToProps = (state) => {
    return {
        retrieveError: state.users.update.retrieveError,
        retrieveLoading: state.users.update.retrieveLoading,
        updateError: state.users.update.updateError,
        updateLoading: state.users.update.updateLoading,
        deleteError: state.users.del.error,
        deleteLoading: state.users.del.loading,
        created: state.users.create.created,
        deleted: state.users.del.deleted,
        retrieved: state.users.update.retrieved,
        updated: state.users.update.updated,
        activeTab: state.users.update.activeTab
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        retrieve: id => dispatch(retrieve(id)),
        update: (item, values) => dispatch(update(item, values)),
        del: item => dispatch(del(item)),
        reset: () => {
            dispatch(reset());
            dispatch(error(null));
            dispatch(loading(false));
            dispatch(success(null));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Update);
