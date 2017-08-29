import React from 'react';

const Message = ({message, onChangeMsgSelected, onClickMsgStarred}) => {
  const onChange = (e) => {
    e.preventDefault()
    let msg = message
    msg.selected= e.target.checked
    onChangeMsgSelected(msg)
  }

  const onClick = (e) => {
    e.preventDefault()
    let msg = message
    msg.starred = !message.starred
    onClickMsgStarred(msg)
  }

const showDivCheckbox = message.selected ? 'col-xs-11 message selected': 'col-xs-11'
const showDivMsgType =  message.read? 'row message read': 'row message unread'
const showDivStarred = message.starred? 'star fa fa-star': 'star fa fa-star-o'

return (
  <div className={showDivMsgType}>
    <div className="col-xs-1">
      <div className="row">
        <div className="col-xs-2">
          <input type="checkbox" value= {message.selected} checked={!!message.selected} onChange= {onChange} />
        </div>
        <div className="col-xs-2">
          <i className={showDivStarred} onClick= {onClick}></i>
        </div>
      </div>
    </div>
    <div className= {showDivCheckbox}>
    { message.labels.map( (label, i) => <span key={ i } className="label label-warning">{label}</span>) }
      <a href="#">
          { message.subject }
      </a>
    </div>
 </div>

)}

export default Message
