import { combineReducers } from 'redux'
import { MESSAGE_COMPOSED , MESSAGES_RECEIVED, MESSAGE_CHECKED} from '../actions'

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
    let updatedMessages = state.all.map(msg => {
        if (msg.id === action.id){
          return { ...msg, ...action.message }
        }
        return msg
      })
        return {
        ...state,
        all: updatedMessages
      }

    default:
      return state
  }
}

export default combineReducers({
 messages
})
