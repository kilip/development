import React from 'react';
import {Route} from 'react-router-dom';
import {List,Create, Update, Show} from './pages';

export default [
    <Route path='/baptisans/create' component={Create} exact={true} key='create'/>,
    <Route path='/baptisans/:id/edit' component={Update} exact={true} key='update'/>,
    <Route path='/baptisans/:id' component={Show} exact={true} key='show'/>,
    <Route path='/baptisans/:page?' component={List} strict={true} key='list'/>,
];
