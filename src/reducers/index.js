import { combineReducers } from 'redux'
import { MESSAGE_COMPOSED , MESSAGES_RECEIVED, MESSAGE_CHECKED, MESSAGE_STARRED, MESSAGE_MARKREAD,MESSAGE_MARKUNREAD,MESSAGE_DELETE,MESSAGE_ADDLABEL,MESSAGE_REMOVELABEL,MESSAGE_CLICKALL, DISPLAY_COMPOSE, } from '../actions'

function messages(state = { all: [] }, action) {
  switch (action.type) {
    case MESSAGES_RECEIVED:
      return {
        ...state,
        all: action.messages
      }
    case MESSAGE_COMPOSED:
      return {
        ...state,
        all: [
          action.message,
          ...state.all,
        ]
      }
    case MESSAGE_CHECKED:
      let checkedMessages = state.all.map(msg => {
        if (msg.id === action.message.id){
          return { ...msg, ...action.message }
        }
        return msg
      })
        return {
        ...state,
        all: checkedMessages
      }
    case MESSAGE_STARRED:
      let starredMessages = state.all.map(msg => {
          if (msg.id === action.message.id){
            return { ...msg, ...action.message }
          }
          return msg
        })
          return {
          ...state,
          all: starredMessages
        }
    case MESSAGE_CLICKALL:
     let clickMessages = state.all.map(msg => {
        if (action.msgSelected) {
          return { ...msg, selected: false }
        }
          return { ...msg, selected: true }
     })
     return {
     ...state,
     all: clickMessages
   }
   case MESSAGE_MARKREAD:
     let markreadMessages = state.all.map(msg => {
         if (action.msgIds.includes(msg.id)){
           return { ...msg, read: true }
         }
         return msg
       })
      return {
         ...state,
         all: markreadMessages
       }
    case MESSAGE_MARKUNREAD:
    let markunreadMessages = state.all.map(msg => {
        if (action.msgIds.includes(msg.id)){
          return { ...msg, read: false }
        }
        return msg
      })
     return {
        ...state,
        all: markunreadMessages
      }
    case MESSAGE_DELETE:
    let markdeletedMessages = state.all.filter(msg => {
          if (!action.msgIds.includes(msg.id)){
            return { ...msg }
          }
        })
    return {
          ...state,
          all: markdeletedMessages
        }
    case MESSAGE_ADDLABEL:
    let addLabelMessages = state.all.map(msg => {
        if (action.msgIds.includes(msg.id)){
          return { ...msg, labels: [...msg.labels, action.label ] }
        }
        return msg
      })
     return {
        ...state,
        all: addLabelMessages
      }
    case MESSAGE_REMOVELABEL:
    let removeLabelMessages = state.all.map(msg => {
        if (action.msgIds.includes(msg.id)){
            return { ...msg, labels: msg.labels.filter(lbl => lbl !== action.label) }
        }
        return msg
    })
    return {
       ...state,
       all: removeLabelMessages
    }
    default:
      return state
  }
}

function ui(state = { labelDefault: "", displayCompose: false }, action) {
  switch (action.type) {
      case DISPLAY_COMPOSE:
        return {
          ...state,
          displayCompose: !action.display
        }
      default:
      return state
  }
}

export default combineReducers({
 messages,
 ui
})
