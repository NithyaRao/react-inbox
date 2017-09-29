import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import 'font-awesome/css/font-awesome.css';
import './index.css';
// import 'materialize-css/dist/css/materialize.min.css';
import store from './store';
import { Provider } from 'react-redux';
import { fetchMessages } from './actions';
import { BrowserRouter, Route } from 'react-router-dom'
import 'core-js/es6/map';
import 'core-js/es6/set';

store.dispatch(fetchMessages())

ReactDOM.render(
  <Provider store={store}>
  <BrowserRouter  >
  <Route path="/" component={App} />
  </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
