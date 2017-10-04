import reducer from './index'
import * as actions from '../actions'
import deepFreeze from 'deep-freeze'

const msgs = [ {
        id: 1,
        subject: 'Hi',
        selected: false,
        read: true,
        labels: ['dev', 'personal'],
      },
      {
        id: 2,
        subject: 'Hello',
        starred: false,
        read: false,
        labels: ['dev', 'work'],
      },
      {
        id: 3,
        subject: 'Hi',
        starred: true,
        selected: true,
        read: true,
        labels: ['dev'],
      }
]

const expectedmsgs = [ {
        id: 1,
        subject: 'Hi',
        starred: true,
        selected: true,
        read: true,
        labels: ['dev', 'personal'],
      },
      {
        id: 2,
        subject: 'Hello',
        starred: false,
        read: false,
        labels: ['dev', 'work'],
      },
      {
        id: 3,
        subject: 'Hi',
        starred: true,
        selected: true,
        read: true,
        labels: ['dev'],
      }
]

describe('messages reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      messages: { all: [] },
             ui: { labelDefault: '', displayCompose: false, displayMsgBody: true },
             message: []
    })
  })

  it('should handle MESSAGES_RECEIVED', () => {
    const currentState = {}
    deepFreeze(currentState)
    expect(
      reducer(currentState, {
        type: actions.MESSAGES_RECEIVED,
        messages: msgs
      })
    ).toEqual({
      messages: { all: msgs },
             ui: { labelDefault: '', displayCompose: false, displayMsgBody: true },
             message: []
    })
  })

  it('should handle MESSAGE_CHECKED', () => {
    const currentState = {
      messages: { all: msgs },
             ui: { labelDefault: '', displayCompose: false, displayMsgBody: true },
             message: []
    }
    deepFreeze(currentState)
    expect(
      reducer(currentState, {
        type: actions.MESSAGE_CHECKED,
        message: {
                id: 1,
                subject: 'Hi',
                starred: true,
                selected: true,
                read: true,
                labels: ['dev', 'personal'],
              }
      })
    ).toEqual({
      messages: { all: expectedmsgs },
             ui: { labelDefault: '', displayCompose: false, displayMsgBody: true },
             message: []
    })
  })

  it('should handle MESSAGE_STARRED', () => {
    const currentState = {
      messages: { all: msgs },
             ui: { labelDefault: '', displayCompose: false, displayMsgBody: true },
             message: []
    }
    deepFreeze(currentState)
    expect(
      reducer(currentState, {
        type: actions.MESSAGE_STARRED,
        message: {
                id: 1,
                subject: 'Hi',
                starred: true,
                selected: true,
                read: true,
                labels: ['dev', 'personal'],
              }
      })
    ).toEqual({
      messages: { all: expectedmsgs },
             ui: { labelDefault: '', displayCompose: false, displayMsgBody: true },
             message: []
    })
  })

  it('should handle MESSAGE_MARKREAD', () => {
    const expectedmsgs = [ {
            id: 1,
            subject: 'Hi',
            selected: false,
            read: true,
            labels: ['dev', 'personal'],
          },
          {
            id: 2,
            subject: 'Hello',
            starred: false,
            read: true,
            labels: ['dev', 'work'],
          },
          {
            id: 3,
            subject: 'Hi',
            starred: true,
            selected: true,
            read: true,
            labels: ['dev'],
          }
    ]
    const currentState = {
      messages: { all: msgs },
             ui: { labelDefault: '', displayCompose: false, displayMsgBody: true },
             message: []
    }
    deepFreeze(currentState)
    expect(
      reducer(currentState, {
        type: actions.MESSAGE_MARKREAD,
        msgIds: [2]
      })
    ).toEqual({
      messages: { all: expectedmsgs },
             ui: { labelDefault: '', displayCompose: false, displayMsgBody: true },
             message: []
    })
  })
})
