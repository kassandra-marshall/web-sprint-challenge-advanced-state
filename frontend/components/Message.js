import React from 'react'
import { connect } from 'react-redux'
import { setMessage } from '../state/action-creators'



function Message(props) {

  return <div id="message">{props.quizState}</div>
  
}

const mapStateToProps = state => {
  return {
    quizState: state.infoMessage.quizState,
  }
}

export default connect(mapStateToProps, {setMessage})(Message)