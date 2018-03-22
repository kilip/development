import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import { reducer as form } from 'redux-form';

import security from './security';
import users from './user';
import app from './global';
import baptisan from './baptisan';

export default combineReducers({
    routing,
    form,
    security,
    users,
    app,
    baptisan
});