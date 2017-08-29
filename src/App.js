import React from 'react';
import Messages from './components/Messages';
import ToolBar from './components/ToolBar';

const messages = [
  {
    "id": 1,
    "subject": "You can't input the protocol without calculating the mobile RSS protocol!",
    "read": false,
    "starred": true,
    "labels": ["dev", "personal"]
  },
  {
    "id": 2,
    "subject": "connecting the system won't do anything, we need to input the mobile AI panel!",
    "read": false,
    "starred": false,
    "selected": true,
    "labels": []
  },
  {
    "id": 3,
    "subject": "Use the 1080p HTTP feed, then you can parse the cross-platform hard drive!",
    "read": false,
    "starred": true,
    "labels": ["dev"]
  },
  {
    "id": 4,
    "subject": "We need to program the primary TCP hard drive!",
    "read": true,
    "starred": false,
    "selected": true,
    "labels": []
  },
  {
    "id": 5,
    "subject": "If we override the interface, we can get to the HTTP feed through the virtual EXE interface!",
    "read": false,
    "starred": false,
    "labels": ["personal"]
  },
  {
    "id": 6,
    "subject": "We need to back up the wireless GB driver!",
    "read": true,
    "starred": true,
    "labels": []
  },
  {
    "id": 7,
    "subject": "We need to index the mobile PCI bus!",
    "read": true,
    "starred": false,
    "labels": ["dev", "personal"]
  },
  {
    "id": 8,
    "subject": "If we connect the sensor, we can get to the HDD port through the redundant IB firewall!",
    "read": true,
    "starred": true,
    "labels": []
  }
]

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {messages: messages,
                  labelDefault: ""};
  }

  onChangeMsgSelected = ( message) => {
    const updatedMessages = [...this.state.messages];
    updatedMessages.splice(updatedMessages.indexOf(message),1, message)
    this.setState({
     messages: updatedMessages
    });
  }

  onClickMsgStarred = ( message) => {
   const updatedMessages = [...this.state.messages];

   updatedMessages.splice(updatedMessages.indexOf(message),1, message)
   this.setState({
     messages: updatedMessages
   });
  }

  onClickBulkMsg = (msgSelected) => {
    const updatedMessages = [...this.state.messages]
    Object.keys(updatedMessages).map(function(key, index) {
      msgSelected? updatedMessages[key].selected = false : updatedMessages[key].selected = true
    });

    this.setState({
      messages: updatedMessages
    });
  }

  onClickMarkRead = () => {
      const updatedMessages = [...this.state.messages]
      Object.keys(updatedMessages).map(function(key, index) {
        if ( updatedMessages[key].selected) {
            updatedMessages[key].read = true
            }
        });
      this.setState({
        messages: updatedMessages
      });
  }

  onClickMarkUnRead = () => {
      const updatedMessages = [...this.state.messages]
      Object.keys(updatedMessages).map(function(key, index) {
        if ( updatedMessages[key].selected) {
            updatedMessages[key].read = false
            }
        });
      this.setState({
        messages: updatedMessages
      });
  }

  onClickDeleteMsgs = () => {
    const msgs = [...this.state.messages];
    const  updatedMessages = msgs.filter((msg) => msg.selected !== true)

    this.setState({
       messages: updatedMessages
    });
  }

  onAddMsgLabel = (label) => {
      const updatedMessages = [...this.state.messages]
      Object.keys(updatedMessages).map(function(key, index) {
        if ( updatedMessages[key].labels.indexOf(label) === -1 && updatedMessages[key].selected )
                  updatedMessages[key].labels.push(label)
        });
      this.setState({
        messages: updatedMessages,
        labelDefault: ""
      });
  }

  onRemoveMsgLabel = (label) => {
      const updatedMessages = [...this.state.messages]
      Object.keys(updatedMessages).map(function(key, index) {
        if ( updatedMessages[key].labels.indexOf(label) > -1  && updatedMessages[key].selected ) {
            updatedMessages[key].labels.splice(updatedMessages[key].labels.indexOf(label),1)
          }
        });
      this.setState({
        messages: updatedMessages,
        labelDefault: ""
      });
  }


  render() {
    return (
      <div className="App">
        <div className="container" >
          <div className="jumbotron">
            <h1>React Inbox</h1>
          </div>
          <div className="row" >
            <ToolBar messages= {this.state.messages} onClickBulkMsg= {this.onClickBulkMsg} onClickMarkRead= {this.onClickMarkRead}
                                onClickMarkUnRead= {this.onClickMarkUnRead} onClickDeleteMsgs= {this.onClickDeleteMsgs}
                                onAddMsgLabel= {this.onAddMsgLabel} onRemoveMsgLabel= {this.onRemoveMsgLabel} labelDefault= {this.state.labelDefault}/>
            <Messages messages={ this.state.messages } onChangeMsgSelected={ this.onChangeMsgSelected } onClickMsgStarred= {this.onClickMsgStarred}  />
          </div>
        </div>
      </div>
  )
  }
}


export default App
