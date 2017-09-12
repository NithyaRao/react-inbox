import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import 'font-awesome/css/font-awesome.css';
// import 'materialize-css/dist/css/materialize.min.css';
import store from './store';
import { Provider } from 'react-redux';
import { fetchMessages, composeMessage } from './actions';
import { BrowserRouter, Route, Link } from 'react-router-dom'

store.dispatch(fetchMessages())

ReactDOM.render(
  <Provider store={store}>
  <BrowserRouter>
  <Route path="/" component={App} />
  </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
