import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { checkedMessage, starredMessage } from '../actions'


const Message = ({message, checkedMessage, starredMessage}) => {
  const onChange = (e) => {
    let msg = message
    msg.selected= e.target.checked
    checkedMessage(msg)
  }

  const onClick = (e) => {
    let msg = message
    msg.starred = !message.starred
    starredMessage(msg)
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

const mapDispatchToProps = dispatch => bindActionCreators({
  starredMessage,
  checkedMessage
}, dispatch)

export default connect(
  null,
  mapDispatchToProps
)(Message)
