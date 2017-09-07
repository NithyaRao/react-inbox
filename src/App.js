import React from 'react';
import Messages from './components/Messages';
import ToolBar from './components/ToolBar';
import Compose from './components/Compose';
import { connect } from 'react-redux'

// class App extends React.Component {
  // state = { messages: [],
  //   labelDefault: "",
  //   displayCompose: false }

    // async componentDidMount() {
    //   const msgResponse = await fetch(`${process.env.REACT_APP_API_URL}/api/messages`)
    //   const messageJSON = await msgResponse.json()
    //   this.setState({messages: messageJSON._embedded.messages})
    // }

    // onClickBulkMsg = (msgSelected) => {
    //   const updatedMessages = [...this.state.messages]
    //   Object.keys(updatedMessages).map(function(key, index) {
    //     msgSelected? updatedMessages[key].selected = false : updatedMessages[key].selected = true
    //   });
    //   this.setState({messages: updatedMessages});
    // }
    //
    // onClickMsgStarred = async(message) => {
    //   const updatedMessages = [...this.state.messages];
    //   updatedMessages.splice(updatedMessages.indexOf(message),1, message)
    //   let body = { messageIds: [message.id], command: "star", star: message.starred }
    //   const response = await this.fetchResponse(body)
    //   this.setState({messages: updatedMessages})
    // }
    //
    // onClickMarkRead = async() => {
    //   const msgIds = []
    //   const updatedMessages = [...this.state.messages]
    //   Object.keys(updatedMessages).map(function(key, index) {
    //     if ( updatedMessages[key].selected) {
    //       updatedMessages[key].read = true
    //       msgIds.push(updatedMessages[key].id)
    //     }
    //   });
    //   let body = { messageIds: msgIds, command: "read", read: true }
    //   const response = await this.fetchResponse(body)
    //   this.setState({
    //     messages: updatedMessages})
    //   }
    //
    //   onClickMarkUnRead = async() => {
    //     const msgIds = []
    //     const updatedMessages = [...this.state.messages]
    //     Object.keys(updatedMessages).map(function(key, index) {
    //       if ( updatedMessages[key].selected) {
    //         updatedMessages[key].read = false
    //         msgIds.push(updatedMessages[key].id)
    //       }
    //     });
    //     let body = { messageIds: msgIds, command: "read", read: false }
    //     const response = await this.fetchResponse(body)
    //     this.setState({messages: updatedMessages})
    //   }
    //
    //
    //   onClickDeleteMsgs = async() => {
    //     const  msgIds = this.state.messages.filter(msg =>  msg.selected === true  ).map(msg => msg.id)
    //     const  updatedMessages = this.state.messages.filter((msg) => msg.selected !== true)
    //     let body = { messageIds: msgIds, command: "delete" }
    //     const response = await this.fetchResponse(body)
    //     this.setState({ messages: updatedMessages });
    //   }
    //
    //   onAddMsgLabel = async(lbl) => {
    //     const msgIds = []
    //     const updatedMessages = [...this.state.messages]
    //     Object.keys(updatedMessages).map(function(key, index) {
    //       if ( updatedMessages[key].labels.indexOf(lbl) === -1 && updatedMessages[key].selected )
    //       msgIds.push(updatedMessages[key].id)
    //       updatedMessages[key].labels.push(lbl)
    //     });
    //     let body = { messageIds: msgIds, command: "addLabel" , label: lbl}
    //     const response = await this.fetchResponse(body)
    //     this.setState({ messages: updatedMessages, labelDefault: "" });
    //   }
    //
    //   onRemoveMsgLabel = async(lbl) => {
    //     const msgIds = []
    //     const updatedMessages = [...this.state.messages]
    //     Object.keys(updatedMessages).map(function(key, index) {
    //       if ( updatedMessages[key].labels.indexOf(lbl) > -1  && updatedMessages[key].selected ) {
    //         msgIds.push(updatedMessages[key].id)
    //         updatedMessages[key].labels.splice(updatedMessages[key].labels.indexOf(lbl),1)
    //       }
    //     });
    //     let body = { messageIds: msgIds, command: "removeLabel" , label: lbl}
    //     const response = await this.fetchResponse(body)
    //     this.setState({ messages: updatedMessages, labelDefault: "" });
    //   }
    //
    //   onClickCompose = (display) => {
    //     this.setState({  displayCompose: !display  })
    //   }
    //
    //   onSubmitCompose = async(message) => {
    //     const response = await fetch(`${process.env.REACT_APP_API_URL}/api/messages`, {
    //       method: 'POST',
    //       body: JSON.stringify(message),
    //       headers: {
    //         'Content-Type': 'application/json',
    //         'Accept': 'application/json',
    //       }
    //     })
    //     const msg = await response.json()
    //     this.setState({messages: [...this.state.messages, msg], displayCompose: false})
    //   }
    //
    //   fetchResponse = async(body) => {
    //     const response = await fetch(`${process.env.REACT_APP_API_URL}/api/messages`, {
    //       method: 'PATCH',
    //       body: JSON.stringify(body),
    //       headers: {
    //         'Content-Type': 'application/json',
    //         'Accept': 'application/json',
    //       }
    //     })
    //     return response
    //   }

    const App = ({ messages }) => (
      (!messages.length ) ?  (<div>Loading...</div>) :
      (
          <div className="App">
          <div className="container" >
          <div className="jumbotron">
          <h1>React Inbox</h1>
          </div>
          <div className="row" >
          <Messages messages={ messages }  />
          </div>
          </div>
          </div>
        )
    )

const mapStateToProps = state => ({
  messages: state.messages.all,
  labelDefault: "",
  displayCompose: false
})

const mapDispatchToProps = () => ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
