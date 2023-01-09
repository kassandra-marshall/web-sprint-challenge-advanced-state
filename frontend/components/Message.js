import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { selectAnswer, setMessage } from '../state/action-creators'



function Message(props) {
  console.log(props.setMessage)
  // useEffect(() => {
  //   props.setMessage()
  // }, [props.trueAnswerQuiz])
  return <div id="message">{props.quizState}</div>
  // make messages match what is expected
  // props is question that was sent
}

const mapStateToProps = state => {
  return {
    quizState: state.infoMessage.quizState,
    button1: state.selectedAnswer.button1,
    button2: state.selectedAnswer.button2
    // this is connected now
    // won't let me use initialMessageState instead of noMessage
  }
}

export default connect(mapStateToProps, {setMessage, selectAnswer})(Message)