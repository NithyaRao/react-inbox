import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { displaycomposeForm ,onClickBulkMsg, onClickMarkRead, onClickMarkUnRead, onClickDeleteMsgs, onAddMsgLabel, onRemoveMsgLabel } from '../actions'
import { Link, Route, Switch, withRouter} from 'react-router-dom'

export function ToolBar({messages, onClickBulkMsg, onClickMarkRead, onClickMarkUnRead, onClickDeleteMsgs, onAddMsgLabel, onRemoveMsgLabel, displaycomposeForm,displayMsgBody,displayCompose, labelDefault, history}) {

const msgUnSelected = messages.every((msg)=> msg.selected !== true)
const msgSelected = messages.reduce((sum, i) => (sum *= i.selected), 1) >0
const showDivIcon = msgSelected? 'fa fa-check-square-o': ( msgUnSelected? 'fa fa-square-o':'fa fa-minus-square-o')
const showUnReadMsgCnt = messages.reduce((sum, i) => (sum += !i.read*1), 0)
const disabled = msgUnSelected ? 'disabled' : ''
const msgIds = messages.filter(msg => Boolean(msg.selected)).map(msg => msg.id)

const onSelectAddLabel = (e) => {
  const label = e.target.value
  const msgIds = messages.filter(msg => Boolean(msg.selected && !msg.labels.includes(label)) ).map(msg => msg.id)
  onAddMsgLabel(msgIds,label)
}
const onSelectRemoveLabel = (e) => {
  const label = e.target.value
  const msgIds = messages.filter(msg => Boolean(msg.selected && msg.labels.includes(label)) ).map(msg => msg.id)
  onRemoveMsgLabel(msgIds,label)
}

return (
  <div className="row toolbar">
    <div className="col-md-12">
      <p className="pull-right">
        <span className="badge badge">  {showUnReadMsgCnt}</span>
        unread messages
      </p>
      <Switch>
        <Route exact path='/compose' render= { () => (
          <Link className="btn btn-danger" to='/'>
                <i className="fa fa-plus"></i>
          </Link>
        )
        }/>
        <Route path='/' render= { () => (
          <Link className="btn btn-danger" to='/compose'>
                <i className="fa fa-plus"></i>
          </Link>
        )
        }/>
      </Switch>

      <button className="btn btn-default" onClick= {() => onClickBulkMsg(msgSelected)}>
        <i className= {showDivIcon} ></i>
      </button>

      <button className="btn btn-default" disabled= {disabled} onClick= {() => onClickMarkRead(msgIds)}>
        Mark As Read
      </button>

      <button className="btn btn-default" disabled= {disabled} onClick= {() => onClickMarkUnRead(msgIds, history)}>
        Mark As Unread
      </button>

      <select className="form-control label-select" value={labelDefault} disabled= {disabled} onChange={onSelectAddLabel} >
        <option value="" disabled >Apply label</option>
        <option value="dev">dev</option>
        <option value="personal">personal</option>
        <option value="gschool">gschool</option>
        <option value="work">work</option>
      </select>

      <select className="form-control label-select" value={labelDefault} disabled= {disabled} onChange={onSelectRemoveLabel}>
        <option value="" disabled >Remove label</option>
        <option value="dev">dev</option>
        <option value="personal">personal</option>
        <option value="gschool">gschool</option>
        <option value="work">work</option>
      </select>

      <button className="btn btn-default" disabled= {disabled} onClick= {() => onClickDeleteMsgs(msgIds)}>
        <i className="fa fa-trash-o" ></i>
      </button>
    </div>
  </div>
)}

const mapStateToProps = state => ({
  messages: state.messages.all,
  displayCompose: state.ui.displayCompose,
  labelDefault: state.ui.labelDefault
})

const mapDispatchToProps = dispatch => bindActionCreators({
  displaycomposeForm,
  onClickBulkMsg,
  onClickMarkRead,
  onClickMarkUnRead,
  onClickDeleteMsgs,
  onAddMsgLabel,
  onRemoveMsgLabel
}, dispatch)

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(ToolBar))
