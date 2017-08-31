import React from 'react';
import Message from '../components/Message';

const Messages = ({messages, onChangeMsgSelected , onClickMsgStarred}) => {
return (
    <div className="container">
     { messages.map( (message, i) => <Message key= { i } message= { message } onChangeMsgSelected= {onChangeMsgSelected} onClickMsgStarred= {onClickMsgStarred} />) }
    </div>
)}

export default Messages
