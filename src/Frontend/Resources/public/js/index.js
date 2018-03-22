import React from 'react';
import ReactDOM from 'react-dom';

import { createStore, applyMiddleware,compose } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import reducers from './reducers';
import SIAP from './siap';

var enhancer = compose(
    applyMiddleware(thunkMiddleware)
);
if(process.env.APP_ENV !== 'prod'){
    enhancer = compose(
        applyMiddleware(thunkMiddleware),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );
}

const store = createStore(reducers, enhancer);

ReactDOM.render(
    <Provider store={store}>
        <SIAP/>
    </Provider>,
    document.getElementById('root')
);
