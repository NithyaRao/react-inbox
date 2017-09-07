export const MESSAGES_RECEIVED = 'MESSAGES_RECEIVED'
export const MESSAGE_COMPOSED = 'MESSAGE_COMPOSED'
export const MESSAGE_CHECKED = 'MESSAGE_CHECKED'
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

export function composeMessage(message) {
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
  }
}

export function checkedMessage(message) {
  return {
    type: MESSAGE_CHECKED,
    message: message
  }
}
