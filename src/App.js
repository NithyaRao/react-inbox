import React from 'react';
import Messages from './components/Messages';
import ToolBar from './components/ToolBar';
import Compose from './components/Compose';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom'

const App = () => (
          <div className="App">
          <div className="container" >
          <div className="jumbotron">
          <h1>React Inbox</h1>
          </div>
          <div className="row" >
          <ToolBar />
          <Route path='/compose' render={props => <Compose /> } />
          <Messages  />
          </div>
          </div>
          </div>
)

const mapDispatchToProps = () => ({})

export default connect(
  null,
  mapDispatchToProps
)(App)
