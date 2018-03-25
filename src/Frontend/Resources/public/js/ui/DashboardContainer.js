import React, { Component } from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import {Container} from 'reactstrap';
import Header from './components/Header';
import Breadcrumb from './components/Breadcrumb';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import Dashboard from '../pages/Dashboard';
import Loader from '../components/Loader';
import Flash from '../components/flash/Flash';

import UserRoutes from '../routes/user';
import BaptisanRoutes from '../routes/baptisan';

class DashboardContainer extends Component {
    render(){

        return (
            <div className="app">
                <Header/>
                <div className="app-body">
                    <Sidebar {...this.props}/>
                    <main className="main">
                        <Breadcrumb />
                        <Container fluid>
                            <Flash
                                namespace="global"
                            />
                            <Loader>
                                <Switch>
                                    <Route path="/dashboard" name="Dashboard" component={Dashboard}/>
                                    {UserRoutes}
                                    {BaptisanRoutes}
                                    <Redirect from="/" to="/dashboard"/>
                                </Switch>
                            </Loader>
                        </Container>
                    </main>
                </div>
                <Footer />
            </div>
        );
    }
}

export default DashboardContainer;