import React from 'react';
import ReactDOM from 'react-dom';
import {App} from './App';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom'
import { mount } from 'enzyme'
// import store from './store';
import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
import sinon from 'sinon';
import fetchMock from 'fetch-mock'

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)
const checkedMessage = jest.fn();
const starredMessage = jest.fn();
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
const store = mockStore({
  messages: { all: msgs },
         ui: { labelDefault: '', displayCompose: false, displayMsgBody: true },
         message: []
})
describe('App Functions', function(){
// beforeEach(() => {
//     clickInputSpy = sinon.spy(App.prototype, 'onChange')
//   });
//
//   // after running each test, restore to the original method to
//   // prevent "TypeError: Attempted to wrap logout which is already wrapped"
//   // error when executing subsequent specs.
//   afterEach(() => {
//     clickInputSpy.restore();
  // });
  afterEach(() => {
    fetchMock.restore()
  })

it('renders without crashing', () => {
  const renderedComponent = mount(  <Provider store={store}>
      <MemoryRouter>
         <App />
      </MemoryRouter>
      </Provider>);
    expect(renderedComponent.find('div').first()).toHaveClassName('App')
    expect(renderedComponent.find('h1')).toHaveText('React Inbox')
});

it('mounts the app and renders 3 messages', () => {
  const renderedComponent = mount(  <Provider store={store}>
      <MemoryRouter>
         <App />
      </MemoryRouter>
      </Provider>);
    expect(renderedComponent.find('div').first()).toHaveClassName('App')
    expect(renderedComponent.find('h1')).toHaveText('React Inbox')
    const messagesComponent = renderedComponent.find('Messages').props()
    expect(messagesComponent.msgs).toHaveLength(3)
    expect(messagesComponent.msgs[0].subject).toBe('Hi')
    expect(messagesComponent.msgs[1].subject).toBe('Hello')
    expect(messagesComponent.msgs[2].subject).toBe('Hi')
});

it('mounts the app and selects a message', () => {
  const store = mockStore({
    messages: { all: msgs },
           ui: { labelDefault: '', displayCompose: false, displayMsgBody: true },
           message: []
  })
  const renderedComponent = mount(  <Provider store={store}>
      <MemoryRouter>
         <App />
      </MemoryRouter>
      </Provider>);
    expect(renderedComponent.containsMatchingElement(
          <input type="checkbox" />
      )).toEqual(true);
  const checkbox = renderedComponent.find('input [type="checkbox"]').first();
  expect(store.getActions().length).toBe(0);
  checkbox.simulate('change', {
    target: { checked: true },
  });
  // console.log(store.getState().messages.all)
  expect(store.getActions().length).toBe(1);
  expect(store.getState().messages.all[0].selected).toBe(true);
});

// it('finds and clicks the deletes button', async () => {
//   const store = mockStore({
//     messages: { all: msgs },
//            ui: { labelDefault: '', displayCompose: false, displayMsgBody: true },
//            message: []
//   })
//   fetchMock.patch(`${process.env.REACT_APP_API_URL}/api/messages`, {} )
//   fetchMock.get(`${process.env.REACT_APP_API_URL}/api/messages`, {
//     "_links": {
//       "self": {
//         "href": "http://localhost:8000/api/messages"
//       }
//     },
//     "_embedded": {
//       "messages":[
//         {"_links": {
//           "self": {
//             "href": "http://localhost:8000/api/messages/1"
//           }
//         },
//         "id":1,
//         "subject":"You can't input the protocol without calculating the mobile RSS protocol!",
//         "starred":true,
//         "selected": true,
//         "read":false,
//         "labels":["dev","personal"]
//       },
//       {"_links": {
//         "self": {
//           "href": "http://localhost:8000/api/messages/2"
//         }
//       },
//       "id":2,
//       "subject":"connecting the system won't do anything, we need to input the mobile AI panel!",
//       "starred":false,
//       "read":true,
//       "labels":[]
//       }
//     ]
//     }
//   })
//   const renderedComponent = mount(  <Provider store={store}>
//       <MemoryRouter>
//          <App />
//       </MemoryRouter>
//       </Provider>);
//     expect(renderedComponent.containsMatchingElement(
//         <i className="fa fa-trash-o" ></i>
//       )).toEqual(true);
//   const deleteBtn = renderedComponent.find('button[id="del-btn"]');
//   // const deleteBtn = renderedComponent.find('i [className="fa fa-trash-o"]');
//   console.log(store.getState().messages)
//   expect(store.getActions().length).toBe(0);
//   deleteBtn.simulate('click' , 1);
//   await timeout( () => { console.log(store.getActions())} )
//   expect(store.getActions().length).toBe(1);
// });
// });
//
// function timeout(fn) {
//   return new Promise((resolve, reject) => {
//     setTimeout( () => {
//       fn()
//       resolve(true)
//     }, 0)
//   })
// }

 it('finds and clicks the deletes button', () => {
  const store = mockStore({
    messages: { all: msgs },
           ui: { labelDefault: '', displayCompose: false, displayMsgBody: true },
           message: []
  })
  fetchMock.patch(`${process.env.REACT_APP_API_URL}/api/messages`, {} )
  fetchMock.get(`${process.env.REACT_APP_API_URL}/api/messages`, {
    "_links": {
      "self": {
        "href": "http://localhost:8000/api/messages"
      }
    },
    "_embedded": {
      "messages":[
        {"_links": {
          "self": {
            "href": "http://localhost:8000/api/messages/1"
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
          "href": "http://localhost:8000/api/messages/2"
        }
      },
      "id":2,
      "subject":"connecting the system won't do anything, we need to input the mobile AI panel!",
      "starred":false,
      "read":true,
      "labels":[]
      }
    ]
    }
  })
  const renderedComponent = mount(  <Provider store={store}>
      <MemoryRouter>
         <App />
      </MemoryRouter>
      </Provider>);
  expect(renderedComponent.containsMatchingElement(
        <i className="fa fa-trash-o" ></i>
      )).toEqual(true);
  const deleteBtn = renderedComponent.find('button[id="del-btn"]');
  // const deleteBtn = renderedComponent.find('i [className="fa fa-trash-o"]');
  // console.log(store.getState().messages)
  expect(store.getActions().length).toBe(0);
  deleteBtn.simulate('click' , 1);
  // await timeout( () => { console.log(store.getActions())} )
  setTimeout(() => {
      expect(store.getActions().length).toBe(1);
   }, 0)

});

it('one of the toolbar buttons is disabled', () => {
  msgs[2].selected = false;
  msgs[0].selected = false;
 const store = mockStore({
   messages: { all: msgs },
          ui: { labelDefault: '', displayCompose: false, displayMsgBody: true },
          message: []
 })
 const renderedComponent = mount(  <Provider store={store}>
     <MemoryRouter>
        <App />
     </MemoryRouter>
     </Provider>);
 expect(renderedComponent.containsMatchingElement(
       <i className="fa fa-trash-o" ></i>
     )).toEqual(true);
 const deleteBtn = renderedComponent.find('button[id="del-btn"]');
 // console.log(store.getState().messages)
 expect(deleteBtn.getElement().props.disabled).toBe('disabled')
});
});
