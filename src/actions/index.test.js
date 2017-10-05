import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as actions from './index'
import fetchMock from 'fetch-mock'

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)
const msgs = [ {
        id: 1,
        subject: 'Hi',
        starred: true,
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

const messages = [ {"_links": {
  "self": {
    "href": "http://testhost.example.com/api/messages/1"
  }
},
"id":1,
"subject":"You can't input the protocol without calculating the mobile RSS protocol!",
"starred":true,
"selected": true,
"read":false,
"labels":["dev","personal"]
},
{"_links": {
"self": {
  "href": "http://testhost.example.com/api/messages/2"
}
},
"id":2,
"subject":"connecting the system won't do anything, we need to input the mobile AI panel!",
"starred":false,
"read":true,
"msg-body": "This is a test",
"labels":[]
}
]
describe('async actions', () => {
  afterEach(() => {
    fetchMock.restore()
  })

  it('creates MESSAGES_RECEIVED when fetching all the messages', async () => {
    fetchMock.get(`${process.env.REACT_APP_API_URL}/api/messages`, {
      "_links": {
        "self": {
          "href": `${process.env.REACT_APP_API_URL}/api/messages`
        }
      },
      "_embedded": { messages }
    })

    const expectedActions = [
      { type: actions.MESSAGES_RECEIVED , messages}
    ]
    const store = mockStore( {} )

    await store.dispatch(actions.fetchMessages())
    expect(store.getActions()).toEqual(expectedActions)
  })

  it('creates MESSAGE_MARKREAD AND MESSAGES_RECEIVED when showing the message body', async () => {
    fetchMock.patch(`${process.env.REACT_APP_API_URL}/api/messages`, {} )
    fetchMock.get(`${process.env.REACT_APP_API_URL}/api/messages/2`,
      {
    "_links":{
      "self":
        { "href":"http://testhost.example.com/api/messages/2"
        }
      },
      "msg-body": "This is a test",
      "id":2,
      "subject":"connecting the system won't do anything, we need to input the mobile AI panel!",
      "starred":false,
      "read":true,
      "labels":[],
     }
   )

    const expectedActions = [
      { type: actions.MESSAGE_MARKREAD , msgIds: [2]},
      { type: actions.MESSAGEID_RECEIVED , message: messages[1] }
    ]
    const store = mockStore( {
      messages: { all: msgs },
      ui: { labelDefault: '', displayCompose: false, displayMsgBody: true },
      message: []
   } )

    await store.dispatch(actions.showMsgBody(messages[1]))
    expect(store.getActions()).toEqual(expectedActions)
  })
})
