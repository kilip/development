import React, { Component } from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import {Container} from 'reactstrap';
import Header from './components/Header';
import Breadcrumb from './components/Breadcrumb';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import Dashboard from '../pages/Dashboard';
import UserRoutes from '../routes/user';

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
                            <Switch>
                                <Route path="/dashboard" name="Dashboard" component={Dashboard}/>
                                {UserRoutes}
                                <Redirect from="/" to="/dashboard"/>
                            </Switch>
                        </Container>
                    </main>
                </div>
                <Footer />
            </div>
        );
    }
}

export default DashboardContainer;