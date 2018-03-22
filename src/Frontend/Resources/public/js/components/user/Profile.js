import React, {Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { error, updateSuccess, retrieve, update, reset } from '../../actions/user/profile';
import { loading } from "../../actions/global";
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
} from 'reactstrap';

import ChangePassword from './ChangePassword';
import ProfileForm from './forms/profile';

import classNames from 'classnames';

class Profile extends Component {
    constructor(props){
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            activeTab: 'profil'
        };

    }

    componentDidMount() {
        this.props.retrieve(this.props.currentUser);
    }

    componentWillUnmount() {
        this.props.reset();
    }

    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }

    render() {
        //if (this.props.deleted) return <Redirect to="/users"/>;

        const item = this.props.updated ? this.props.updated : this.props.retrieved;

        return (
            <div className="animated fadeIn">
                <Card>
                    <CardHeader>
                        <strong>Profil Saya</strong>
                    </CardHeader>
                    <CardBody>
                        <Row className="mh-300">
                            <Col xs="12" md="12" className="mb-4">
                                <Nav tabs>
                                    <NavItem>
                                        <NavLink
                                            className={classNames({active: this.state.activeTab==='profil'})}
                                            onClick={()  => this.toggle('profil')}
                                        >
                                            Data Pribadi
                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink
                                            className={classNames({active: this.state.activeTab==='password'})}
                                            onClick={()  => this.toggle('password')}
                                        >
                                            Ubah Password
                                        </NavLink>
                                    </NavItem>
                                </Nav>
                                <TabContent activeTab={this.state.activeTab}>
                                    <TabPane tabId="profil">
                                        {
                                            this.props.updated &&
                                            <div className="alert alert-success">
                                                Perubahan profil berhasil disimpan.
                                            </div>
                                        }
                                        {
                                            this.props.loading &&
                                            <div className="alert alert-info" role="status">
                                                Memproses data...
                                            </div>
                                        }
                                        {
                                            this.props.error &&
                                            <div className="alert alert-danger" role="alert">
                                                <span className="fa fa-exclamation-triangle" aria-hidden="true"></span>
                                                &nbsp;{this.props.error}
                                            </div>
                                        }
                                        {
                                            item &&
                                            <ProfileForm
                                                method="POST"
                                                onSubmit={values => this.props.update(item, values)}
                                                initialValues={item}
                                                context="profile"
                                                id="formUserUpdate"
                                            />
                                        }
                                    </TabPane>
                                    <TabPane tabId="password">
                                        {
                                            item &&
                                            <ChangePassword
                                                currentUser={item}
                                                context="profile"
                                            />
                                        }
                                    </TabPane>
                                </TabContent>
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
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
    reset: PropTypes.func.isRequired,
    currentUser: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
    return {
        updated: state.users.profile.updated,
        retrieved: state.users.profile.retrieved,
        error: state.users.profile.error,
        loading: state.users.profile.loading,
        currentUser: state.security.auth
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        retrieve: (id) => dispatch(retrieve(id)),
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
