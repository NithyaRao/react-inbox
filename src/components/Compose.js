import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { composeMessage } from '../actions'
import { withRouter, Redirect , Route, Link} from 'react-router-dom'

export function Compose ({composeMessage, displayCompose, displaycomposeForm, history} )  {

  const onSubmit = (e) => {
    e.preventDefault()
    let message = { subject: e.target.subject.value, body: e.target.body.value, read: false, starred: false,labels: [] }
    composeMessage(message, history, displayCompose)
}

return (
    <form className="form-horizontal well" onSubmit= {onSubmit} >
      <div className="form-group">
        <div className="col-sm-8 col-sm-offset-2">
          <h4>Compose Message</h4>
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="subject" className="col-sm-2 control-label">Subject</label>
        <div className="col-sm-8">
          <input type="text" className="form-control" id="subject" placeholder="Enter a subject" name="subject"></input>
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="body" className="col-sm-2 control-label">Body</label>
        <div className="col-sm-8">
          <textarea name="body" id="body" className="form-control"></textarea>
        </div>
      </div>
      <div className="form-group">
          <input type="submit" value="Send" className="btn btn-primary"></input>
      </div>
    </form>
)}

const mapStateToProps = state => ({
  displayCompose: state.ui.displayCompose
})
const mapDispatchToProps = dispatch => bindActionCreators({
  composeMessage,
}, dispatch)

export default withRouter ( connect(
  mapStateToProps,
  mapDispatchToProps
)(Compose))
