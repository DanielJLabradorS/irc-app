import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
// Importing the Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';
//Redux
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import reducers from './reducers';
//General Styles
import './index.css';
const store = createStore(
    reducers, // Reducers
    {}, // Estado inicial
    applyMiddleware(reduxThunk)
);
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,

    document.getElementById('root')
);
