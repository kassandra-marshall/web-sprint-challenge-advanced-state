import e from 'cors'
import React, { useState } from 'react'
import { connect } from 'react-redux'
import { selectAnswer } from '../state/action-creators';


function Quiz(props) {
  const [select, setSelect] = useState({
    button1: false,
    button2: false
  }
  )
  const { selectAnswer, question, trueAnswer, falseAnswer, buttonText, button2Text } = props
  console.log(props)
  const answerSelected = (e) => {
    e.preventDefault()
    if (e.target.id === "button1" ){
      setSelect({
      button2: false, button1: true})
      selectAnswer(select)
    } else if (e.target.id === "button2") {
        setSelect({
        button1: false, button2: true})
        selectAnswer(select)
    }
    
  }
  return (
    <div id="wrapper">
      {
        // quiz already in state? Let's use that, otherwise render "Loading next quiz..."
        true ? (
          <>
            <h2>{props.question}</h2>

            <div id="quizAnswers">
              <div className={`answer ${ select.button1 ? 'selected' : ''}`}>
                {props.trueAnswer}
                <button id="button1" onClick={answerSelected}>
                {props.buttonText}
                </button>
              </div>

              <div className={`answer ${ select.button2 ? 'selected' : ''}`}>
                {props.falseAnswer}
                <button id="button2" onClick={answerSelected}>
                  {props.button2Text}
                  {/* figure out how to stop both buttons from being selected */}
                </button>
              </div>
            </div>

            <button id="submitAnswerBtn">Submit answer</button>
          </>
        ) : 'Loading next quiz...'
      }
    </div>
  )
}

const mapStateToProps = state => {
  return {
   question: state.quiz.question,
   trueAnswer: state.quiz.trueAnswer,
   falseAnswer: state.quiz.falseAnswer,
   buttonText: state.selectedAnswer.buttonText,
   button2Text: state.selectedAnswer.button2Text,
   className: state.selectedAnswer.className
  }
}

export default connect(mapStateToProps, {selectAnswer})(Quiz)