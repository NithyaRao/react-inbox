import React from 'react';
import { connect } from 'react-redux'
import Message from '../components/Message';
import { checkedMessage } from '../actions'

const Messages = ({messages }) => {
return (
    <div className="container">
     { messages.map( (message, i) => <Message key= { i } message= { message } />) }
    </div>
)}
 export default Messages
