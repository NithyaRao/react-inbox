import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { withRouter, Redirect , Route, Link} from 'react-router-dom';
import { showMsgBody } from '../actions';

class MessageBody extends React.Component {

    componentDidMount(){
          this.props.showMsgBody(this.props.message);
    }

    render() {
      if (!this.props.msg) {
            return (
                <div>Loading...</div>
            );
        }

      return (
        <div className="row message-body">
          <div className="col-xs-11 col-xs-offset-1">
              {this.props.msg.body}
          </div>
        </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
      msg: state.message
    };
}

const mapDispatchToProps = dispatch => bindActionCreators({
  showMsgBody
}, dispatch)


export default withRouter (connect(mapStateToProps, mapDispatchToProps)(MessageBody));
