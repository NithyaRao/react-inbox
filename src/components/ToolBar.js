import React from 'react';

const ToolBar = ({messages, onClickBulkMsg, onClickMarkRead, onClickMarkUnRead, onClickDeleteMsgs, onAddMsgLabel, onRemoveMsgLabel, onClickCompose,displayCompose, labelDefault}) => {

const msgUnSelected = messages.every((msg)=> msg.selected !== true)
const msgSelected = messages.reduce((sum, i) => (sum *= i.selected), 1) >0
const showDivIcon = msgSelected? 'fa fa-check-square-o': ( msgUnSelected? 'fa fa-square-o':'fa fa-minus-square-o')
const showUnReadMsgCnt = messages.reduce((sum, i) => (sum += !i.read*1), 0)
const disabled = msgUnSelected ? 'disabled' : ''

const onClickIcon = (e) => {
  e.preventDefault()
  onClickBulkMsg(msgSelected)
}
const onClickReadBtn = (e) => {
  e.preventDefault()
  onClickMarkRead(true)
}
const onClickUnReadBtn = (e) => {
  e.preventDefault()
  onClickMarkUnRead(false)
}
const onClickDeleteBtn = (e) => {
  e.preventDefault()
  onClickDeleteMsgs()
}
const onSelectAddLabel = (e) => {
  e.preventDefault()
  const label = e.target.value
  onAddMsgLabel(label)
}
const onSelectRemoveLabel = (e) => {
  e.preventDefault()
  const label = e.target.value
  onRemoveMsgLabel(label)
}
const onClickPlus = (e) => {
  e.preventDefault()
  const currentState = displayCompose;
  onClickCompose(currentState );
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

export default ToolBar
