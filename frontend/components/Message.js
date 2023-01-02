import React from 'react'
import { connect } from 'react-redux'
import { setMessage } from '../state/action-creators'

function Message(props) {
  return <div id="message">{props.initialMessageState}</div>
  // make messages match what is expected
  // props is question that was sent
}

const mapStateToProps = state => {
  return {
    initialMessageState: state.infoMessage.initialMessageState
  }
}

export default connect(mapStateToProps, {setMessage})(Message)