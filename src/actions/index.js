export const MESSAGES_RECEIVED = 'MESSAGES_RECEIVED'
export const MESSAGEID_RECEIVED = 'MESSAGEID_RECEIVED'
export const MESSAGE_COMPOSED = 'MESSAGE_COMPOSED'
export const MESSAGE_CHECKED = 'MESSAGE_CHECKED'
export const MESSAGE_STARRED = 'MESSAGE_STARRED'
export const MESSAGE_CLICKALL = 'MESSAGE_CLICKALL'
export const MESSAGE_MARKREAD = 'MESSAGE_MARKREAD'
export const MESSAGE_MARKUNREAD = 'MESSAGE_MARKUNREAD'
export const MESSAGE_DELETE = 'MESSAGE_DELETE'
export const MESSAGE_ADDLABEL = 'MESSAGE_ADDLABEL'
export const MESSAGE_REMOVELABEL = 'MESSAGE_REMOVELABEL'
export const DISPLAY_COMPOSE = 'DISPLAY_COMPOSE'
export const DISPLAY_MSGBODY = 'DISPLAY_MSGBODY'

export function fetchMessages() {
  return async (dispatch) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/messages`)
    const jsonMsg = await response.json()
    dispatch({
      type: MESSAGES_RECEIVED,
      messages: jsonMsg._embedded.messages
    })
  }
}

export function fetchMessagebyId(id) {
  return async (dispatch) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api${id}`)
    const jsonMsg = await response.json()
    dispatch({
      type: MESSAGEID_RECEIVED,
      message: jsonMsg
    })
  }
}

export function composeMessage(message, history, displayCompose) {
    return async (dispatch) => {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/messages`, {
        method: 'POST',
        body: JSON.stringify(message),
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        }
      })
      const composedMessage = await response.json()
      dispatch({
        type: MESSAGE_COMPOSED,
        message: composedMessage
      })
      dispatch( {
        type: DISPLAY_COMPOSE,
        display: displayCompose
      })
      history.push('/')
  }
}

export function checkedMessage(message) {
  return {
    type: MESSAGE_CHECKED,
    message: message
  }
}

export function starredMessage(message) {
   return async (dispatch) => {
    let body = { messageIds: [message.id], command: "star", star: message.starred }
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/messages`, {
          method: 'PATCH',
          body: JSON.stringify(body),
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          }
        })
    dispatch({
      type: MESSAGE_STARRED,
      message: message
    })
  }
}

export function onClickBulkMsg(msgSelected) {
  return {
      type: MESSAGE_CLICKALL,
      msgSelected: msgSelected
    }
}

export function onClickMarkRead(msgIds) {
  return async (dispatch) => {
   let body = { messageIds: msgIds, command: "read", read: true }
   const response = await fetch(`${process.env.REACT_APP_API_URL}/api/messages`, {
         method: 'PATCH',
         body: JSON.stringify(body),
         headers: {
           'Content-Type': 'application/json',
           'Accept': 'application/json',
         }
       })
   dispatch({
     type: MESSAGE_MARKREAD,
     msgIds: msgIds
   })
 }
}

export function onClickMarkUnRead(msgIds, history) {
  return async (dispatch) => {
   let body = { messageIds: msgIds, command: "read", read: false }
   const response = await fetch(`${process.env.REACT_APP_API_URL}/api/messages`, {
         method: 'PATCH',
         body: JSON.stringify(body),
         headers: {
           'Content-Type': 'application/json',
           'Accept': 'application/json',
         }
       })
   dispatch({
     type: MESSAGE_MARKUNREAD,
     msgIds: msgIds
   })
   history.push('/')
 }
}

export function onClickDeleteMsgs(msgIds) {
  return async (dispatch) => {
   let body = { messageIds: msgIds, command: "delete" }
   const response = await fetch(`${process.env.REACT_APP_API_URL}/api/messages`, {
         method: 'PATCH',
         body: JSON.stringify(body),
         headers: {
           'Content-Type': 'application/json',
           'Accept': 'application/json',
         }
       })
   dispatch({
     type: MESSAGE_DELETE,
     msgIds: msgIds
   })
 }
}

export function onAddMsgLabel(msgIds, label) {
  return async (dispatch) => {
   let body = { messageIds: msgIds, command: "addLabel" , label: label}
   const response = await fetch(`${process.env.REACT_APP_API_URL}/api/messages`, {
         method: 'PATCH',
         body: JSON.stringify(body),
         headers: {
           'Content-Type': 'application/json',
           'Accept': 'application/json',
         }
       })
   dispatch({
     type: MESSAGE_ADDLABEL,
     msgIds: msgIds,
     label: label
   })
 }
}

export function onRemoveMsgLabel(msgIds, label) {
  return async (dispatch) => {
   let body = { messageIds: msgIds, command: "removeLabel" , label: label}
   const response = await fetch(`${process.env.REACT_APP_API_URL}/api/messages`, {
         method: 'PATCH',
         body: JSON.stringify(body),
         headers: {
           'Content-Type': 'application/json',
           'Accept': 'application/json',
         }
       })
   dispatch({
     type: MESSAGE_REMOVELABEL,
     msgIds: msgIds,
     label: label
   })
 }
}

export function showMsgBody(message){
 return async (dispatch) => {
   // check for read
   let body = { messageIds: [message.id], command: "read", read: true }
   let response = await fetch(`${process.env.REACT_APP_API_URL}/api/messages`, {
         method: 'PATCH',
         body: JSON.stringify(body),
         headers: {
           'Content-Type': 'application/json',
           'Accept': 'application/json',
         }
       })
   dispatch({
     type: MESSAGE_MARKREAD,
     msgIds: [message.id]
   })
   response = await fetch(`${message._links.self.href}`)
   const jsonMsg = await response.json()
   dispatch({
     type: MESSAGEID_RECEIVED,
     message: jsonMsg
   })
 }
}
export function displaycomposeForm(currentState) {
  return {
    type: DISPLAY_COMPOSE,
    display: currentState
  }
}
