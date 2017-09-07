import React from 'react';
import { connect } from 'react-redux'
import Message from '../components/Message';
import { checkedMessage } from '../actions'

const Messages = ({messages, onChangeMsgSelected , onClickMsgStarred}) => {
return (
    <div className="container">
     { messages.map( (message, i) => <Message key= { i } message= { message } onChangeMsgSelected= {onChangeMsgSelected} onClickMsgStarred= {onClickMsgStarred} />) }
    </div>
)}

export default connect(
  null,
  {onChangeMsgSelected: checkedMessage}
)(Messages)
