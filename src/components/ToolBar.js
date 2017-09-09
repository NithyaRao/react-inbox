import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { displaycomposeForm , onClickBulkMsg, onClickMarkRead, onClickMarkUnRead, onClickDeleteMsgs, onAddMsgLabel, onRemoveMsgLabel } from '../actions'

const ToolBar = ({messages, onClickBulkMsg, onClickMarkRead, onClickMarkUnRead, onClickDeleteMsgs, onAddMsgLabel, onRemoveMsgLabel, displaycomposeForm,displayCompose, labelDefault}) => {

const msgUnSelected = messages.every((msg)=> msg.selected !== true)
const msgSelected = messages.reduce((sum, i) => (sum *= i.selected), 1) >0
const showDivIcon = msgSelected? 'fa fa-check-square-o': ( msgUnSelected? 'fa fa-square-o':'fa fa-minus-square-o')
const showUnReadMsgCnt = messages.reduce((sum, i) => (sum += !i.read*1), 0)
const disabled = msgUnSelected ? 'disabled' : ''
const msgIds = messages.filter(msg => Boolean(msg.selected)).map(msg => msg.id)

const onClickIcon = (e) => {
  onClickBulkMsg(msgSelected)
}
const onClickReadBtn = (e) => {
  onClickMarkRead(msgIds)
}
const onClickUnReadBtn = (e) => {
  onClickMarkUnRead(msgIds)
}
const onClickDeleteBtn = (e) => {
  onClickDeleteMsgs(msgIds)
}
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
const onClickPlus = (e) => {
  const currentState = displayCompose;
  displaycomposeForm(currentState );
}

return (
  <div className="row toolbar">
    <div className="col-md-12">
      <p className="pull-right">
        <span className="badge badge">  {showUnReadMsgCnt}</span>
        unread messages
      </p>

      <a className="btn btn-danger" onClick= {onClickPlus}>
            <i className="fa fa-plus"></i>
      </a>

      <button className="btn btn-default" onClick= {onClickIcon}>
        <i className= {showDivIcon} ></i>
      </button>

      <button className="btn btn-default" disabled= {disabled} onClick= {onClickReadBtn}>
        Mark As Read
      </button>

      <button className="btn btn-default" disabled= {disabled} onClick= {onClickUnReadBtn}>
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

      <button className="btn btn-default" disabled= {disabled} onClick= {onClickDeleteBtn}>
        <i className="fa fa-trash-o" ></i>
      </button>
    </div>
  </div>
)}

const mapDispatchToProps = dispatch => bindActionCreators({
  displaycomposeForm,
  onClickBulkMsg,
  onClickMarkRead,
  onClickMarkUnRead,
  onClickDeleteMsgs,
  onAddMsgLabel,
  onRemoveMsgLabel
}, dispatch)

export default connect(
  null,
  mapDispatchToProps
)(ToolBar)
