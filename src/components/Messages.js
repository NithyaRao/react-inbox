import React from 'react';
import { connect } from 'react-redux';
import Message from '../components/Message';
import { withRouter } from 'react-router-dom'

export function Messages({msgs }) {
return (
    <div className="container">
     { msgs.map( (message, i) => <Message key= { i } message= { message } />) }
    </div>
)}

const mapStateToProps = state => ({
  msgs: state.messages.all
})
const mapDispatchToProps = () => ({})

export default withRouter (connect(
  mapStateToProps,
  mapDispatchToProps
)(Messages))
