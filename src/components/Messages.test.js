import React from 'react';
import { Messages } from './Messages';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme'

describe('Test Message Component', () => {
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
  it('renders message ', () => {
    const wrapper = shallow(<Messages msgs= {msgs} />)
    expect(wrapper.find('withRouter(Connect(Message))')).toHaveLength(3)
    expect(wrapper.find('withRouter(Connect(Message))').get(0).props).toHaveProperty('message.subject', 'Hi')
    expect(wrapper.find('withRouter(Connect(Message))').get(1).props).toHaveProperty('message.subject', 'Hello')
    expect(wrapper.find('withRouter(Connect(Message))').get(2).props).toHaveProperty('message.subject', 'Hi')
    expect(wrapper.find('withRouter(Connect(Message))').get(0).props).toHaveProperty('message.starred', true)
    expect(wrapper.find('withRouter(Connect(Message))').get(1).props).toHaveProperty('message.starred', false)
    expect(wrapper.find('withRouter(Connect(Message))').get(2).props).toHaveProperty('message.starred', true)
    expect(wrapper.find('withRouter(Connect(Message))').get(0).props).toHaveProperty('message.id', 1)
    expect(wrapper.find('withRouter(Connect(Message))').get(1).props).toHaveProperty('message.id', 2)
    expect(wrapper.find('withRouter(Connect(Message))').get(2).props).toHaveProperty('message.id', 3)
  })
});
