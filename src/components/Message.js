import React, {Component} from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import MessageBody from '../components/MessageBody';
import { checkedMessage, starredMessage  } from '../actions'
import { withRouter,Route, Link} from 'react-router-dom'

export function Message ({message, checkedMessage,starredMessage}) {
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

let showDivCheckbox = message.selected ? 'row message selected': 'row message'
const showDivMsgType =  message.read? ' read': ' unread'
showDivCheckbox = showDivCheckbox.concat(showDivMsgType)
const showDivStarred = message.starred? 'star fa fa-star': 'star fa fa-star-o'

return (
  <div>
  <div className={showDivCheckbox}>
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
    <div className= "col-xs-11">
    { message.labels && message.labels.map( (label, i) => <span key={ i } className="label label-warning">{label}</span>) }
      <Link  to={`/messages/${message.id}`} >
            {message.subject}
      </Link>
   </div>
 </div>
 <Route exact path= {`/messages/${message.id}`} render={props => <MessageBody message= {message} {...props} /> } />
</div>
)}

const mapDispatchToProps = dispatch => bindActionCreators({
  starredMessage,
  checkedMessage
}, dispatch)

export default withRouter (connect(
  null,
  mapDispatchToProps
)(Message))
