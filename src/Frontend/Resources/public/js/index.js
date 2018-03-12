import React from 'react';
import ReactDOM from 'react-dom';

import { reducer as form } from 'redux-form';
import { routerReducer as routing } from 'react-router-redux';
import { createStore, combineReducers, applyMiddleware,compose } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import security from './components/security/reducers';

import SIAP from './siap';
const reducers = combineReducers({routing,security});
const enhancer = compose(
    applyMiddleware(thunkMiddleware)
    //window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
const store = createStore(reducers, enhancer);

ReactDOM.render(
    <Provider store={store}>
        <SIAP/>
    </Provider>,
    document.getElementById('root')
);
