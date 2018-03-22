import React from 'react';
import {Route} from 'react-router-dom';
import {List, Profile, Create, Update, Show} from '../components/user/';
import {userIsAdminRedir} from "../components/security/auth";

export default [
  <Route path='/users/create' component={Create} exact={true} key='create'/>,
  <Route path='/users/edit/:id' component={Update} exact={true} key='update'/>,
  <Route path='/users/show/:id' component={Show} exact={true} key='show'/>,
  <Route path='/users/:page?' component={List} strict={true} key='list'/>,
  <Route path='/profile' component={Profile} strict={true} key='profile'/>,
];