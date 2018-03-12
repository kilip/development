import React, { Component } from 'react';
import {HashRouter as Router, Route, Switch} from 'react-router-dom';
import DashboardContainer from './ui/DashboardContainer';
import { connect } from 'react-redux';

class SIAP extends Component {
    render(){
        return (
            <Router>
                <Switch>
                    <Route path="/" name="Dashboard" component={DashboardContainer}/>
                </Switch>
            </Router>
        );
    }
}

function mapStateToProps(state){
    return {
        user: state.user
    };
}
export default connect(mapStateToProps)(SIAP);
