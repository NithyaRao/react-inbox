import React from 'react';
import Messages from './components/Messages';
import ToolBar from './components/ToolBar';
import Compose from './components/Compose';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom'

const App = ({ messages, displayCompose, labelDefault}) => (
  (!messages.length ) ?  (<div>Loading...</div>) :
      (
          <div className="App">
          <div className="container" >
          <div className="jumbotron">
          <h1>React Inbox</h1>
          </div>
          <div className="row" >
          <ToolBar messages= {messages}
          displayCompose= {displayCompose} labelDefault= {labelDefault}/>
          {displayCompose && <Route path="/compose" render={ props =>
                <Compose displayCompose= {displayCompose} {...props} />} /> }
          <Messages messages={ messages }  />
          </div>
          </div>
          </div>
        )
)

const mapStateToProps = state => ({
  messages: state.messages.all,
  labelDefault: state.ui.labelDefault,
  displayCompose: state.ui.displayCompose
})

const mapDispatchToProps = () => ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
