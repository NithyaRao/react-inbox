import React from 'react';
import { shallow } from 'enzyme';
import {Message} from './Message';

describe('Test Message Component', () => {
const message = {
        subject: 'Hi',
        starred: true,
        read: true,
        labels: ['dev', 'personal'],
      }
 const checkedMessage = jest.fn();
 const starredMessage = jest.fn();
 const value = true
 const showDivStarred = 'star fa fa-star'
 const showDivCheckbox = 'row message read'
 const props = {
   message,
   checkedMessage,
   starredMessage,
 };

 const renderedComponent = shallow(
      <Message {...props}/>
 );

 it('should have Div className row message read when message is read and not selected', () => {
   const renderedComponent = shallow(
        <Message {...props}/>
   );
     const divs=  renderedComponent.find('div')
     expect(divs).toHaveLength(7)
     expect(divs.get(1).props.className.includes('row message read')).toEqual(true)
 });

 it('should have Div className row message unread when message is unread and not selected', () => {
   message.read = false;
   const renderedComponent = shallow(
        <Message {...props}/>
   );
     const divs=  renderedComponent.find('div')
     expect(divs).toHaveLength(7)
     expect(divs.get(1).props.className.includes('row message unread')).toEqual(true)
 });

 it('should have Div className row message selected read when message is read and selected', () => {
   message.selected = true
   message.read = true
   const renderedComponent = shallow(
        <Message {...props}/>
   );
     const divs=  renderedComponent.find('div')
     expect(divs).toHaveLength(7)
     expect(divs.get(1).props.className.includes('row message selected read')).toEqual(true)
 });

 it('should have Div className row message selected unread when message is unread and selected', () => {
   message.read = false;
   message.selected = true;
   const renderedComponent = shallow(
        <Message {...props}/>
   );
     const divs=  renderedComponent.find('div')
     expect(divs).toHaveLength(7)
     expect(divs.get(1).props.className.includes('row message selected unread')).toEqual(true)
 });

 it('should have a icon with className star fa fa-star when messages is starred', () => {
   const renderedComponent = shallow(
        <Message {...props}/>
   );
   const icon = renderedComponent.find('i')
   expect(icon).toHaveLength(1)
   expect(icon).toHaveClassName('star fa fa-star')

 });

 it('should have a icon with className star fa fa-star-o when messages is unstarred', () => {
   message.starred = false;
   const renderedComponent = shallow(
        <Message {...props}/>
   );
   const icon = renderedComponent.find('i')
   expect(icon).toHaveLength(1)
   expect(icon).toHaveClassName('star fa fa-star-o')

 });

 it('should render a checkbox input', () => {
   const renderedComponent = shallow(
        <Message {...props}/>
   );
   console.log(renderedComponent.debug())
     expect(renderedComponent.containsMatchingElement(
           <input type="checkbox" />
       )).toEqual(true);
     });
 it('should handle checkbox click event', () => {
   const renderedComponent = shallow(
        <Message {...props}/>
   );
   renderedComponent.find('input[type="checkbox"]').simulate('change', {
     target: { checked: value },
   });
   expect(checkedMessage).toHaveBeenCalled();
  });

  it('should handle starred click event', () => {
    const renderedComponent = shallow(
         <Message {...props}/>
    );
    renderedComponent.find('i').simulate('click') ;
    expect(starredMessage).toHaveBeenCalled();
    // console.log(renderedComponent.node)
   });
 });


// function wrapIt(node) {
// return(
//   <Provider >
//     {node}
//   </Provider>
// )
// }
//
// in code use wrapit(<Message /> )
