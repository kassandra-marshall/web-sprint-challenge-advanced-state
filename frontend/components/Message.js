import React from 'react'
import { connect } from 'react-redux'
import { setMessage } from '../state/action-creators'



function Message(props) {
  const { quizState } = props
  return <div id="message">{quizState}</div>
  
}

const mapStateToProps = state => {
  return {
    quizState: state.infoMessage.quizState,
  }
}

export default connect(mapStateToProps, {setMessage})(Message)