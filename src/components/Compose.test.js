import React from 'react';
import { shallow } from 'enzyme';
import MessageBody from './MessageBody';
import { MemoryRouter } from 'react-router-dom'

describe('Test Message Component', () => {
  const message = {
          subject: 'Hi',
          starred: true,
          read: true,
          labels: ['dev', 'personal'],
        }
  const showMsgBody = jest.fn()
  const props = {
  composeMessage,
  displayCompose,
  displaycomposeForm,
  history  };
  
it('should ', () => {
  const renderedComponent = shallow(
    <MemoryRouter>
       <MessageBody {...props}/>
    </MemoryRouter>
  );
  expect(renderedComponent.find('withRouter(Connect(MessageBody))')).toHaveLength(1)
  expect(renderedComponent.find('withRouter(Connect(MessageBody))').get(0).props).toHaveProperty('message.subject', 'Hi')
  // console.log(renderedComponent.debug())
  // const divs=  renderedComponent.find('div')
  //   console.log(divs.debug())
  // expect(divs).toHaveLength(2)
  //
  // expect(divs.get(1).props.className.includes('col-xs-11 col-xs-offset-1')).toEqual(true)

})
})
