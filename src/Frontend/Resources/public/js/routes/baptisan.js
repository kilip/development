import React from 'react';
import {Route} from 'react-router-dom';
import {List,Create, Update, Show} from '../components/baptisan';

export default [
  <Route path='/baptisans/create' component={Create} exact={true} key='create'/>,
  <Route path='/baptisans/edit/:id' component={Update} exact={true} key='update'/>,
  <Route path='/baptisans/show/:id' component={Show} exact={true} key='show'/>,
  <Route path='/baptisans/:page?' component={List} strict={true} key='list'/>,
];
