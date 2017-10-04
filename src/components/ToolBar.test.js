import React from 'react';
import ReactDOM from 'react-dom';
import ToolBar from './ToolBar';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom'
// import store from '../store';
import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
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
// const store = mockStore({
//   messages: { all: msgs },
//          ui: { labelDefault: '', displayCompose: false, displayMsgBody: true },
//          message: []
// })

describe('ToolBar', () => {
  // afterEach(() => {
  //   fetchMock.restore()
  // })

it('renders with Some messages selected', () => {
  // fetchMock.get('end:/api/messages', {
  //   "_links": {
  //     "self": {
  //       "href": "http://localhost:8000/api/messages"
  //     }
  //   },
  //   "_embedded": {
  //     "messages":[
  //       {"_links": {
  //         "self": {
  //           "href": "http://localhost:8000/api/messages/1"
  //         }
  //       },
  //       "id":1,
  //       "subject":"You can't input the protocol without calculating the mobile RSS protocol!",
  //       "starred":true,
  //       "selected": true,
  //       "read":false,
  //       "labels":["dev","personal"]
  //     },
  //     {"_links": {
  //       "self": {
  //         "href": "http://localhost:8000/api/messages/2"
  //       }
  //     },
  //     "id":2,
  //     "subject":"connecting the system won't do anything, we need to input the mobile AI panel!",
  //     "starred":false,
  //     "read":true,
  //     "labels":[]
  //     }
  //   ]
  //   }
  // })
  const store = mockStore({
    messages: { all: msgs },
           ui: { labelDefault: '', displayCompose: false, displayMsgBody: true },
           message: []
  })
  const div = document.createElement('div');
  const renderedComponent = ReactDOM.render(  <Provider store={store}>
      <MemoryRouter>
         <ToolBar />
      </MemoryRouter>
      </Provider>, div);
});

it('renders with no messages selected', () => {
  msgs[2].selected = false
  const store = mockStore({
    messages: { all: msgs },
           ui: { labelDefault: '', displayCompose: false, displayMsgBody: true },
           message: []
  })
  const div = document.createElement('div');
  const renderedComponent = ReactDOM.render(  <Provider store={store}>
      <MemoryRouter>
         <ToolBar />
      </MemoryRouter>
      </Provider>, div);
});

it('renders with all messages selected', () => {
  msgs.map( (message) => { message.selected = true })
  const store = mockStore({
    messages: { all: msgs },
           ui: { labelDefault: '', displayCompose: false, displayMsgBody: true },
           message: []
  })
  const div = document.createElement('div');
  const renderedComponent = ReactDOM.render(  <Provider store={store}>
      <MemoryRouter>
         <ToolBar />
      </MemoryRouter>
      </Provider>, div);
});
});
