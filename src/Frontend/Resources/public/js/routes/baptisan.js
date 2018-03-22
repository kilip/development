import React from 'react';
import {Route} from 'react-router-dom';
import { List, Create, Update, Show } from '../components/baptisan';

export default [
    <Route path='/baptisans/create' component={Create} strict={true} key='baptisan-create'/>,
    <Route path='/baptisans/edit/:id' component={Update} strict={true} key='baptisan-edit'/>,
    <Route path='/baptisans/show/:id' component={Show} strict={true} key='baptisan-show'/>,
    <Route path='/baptisans/:page?' component={List} strict={true} key='baptisan-list'/>
];