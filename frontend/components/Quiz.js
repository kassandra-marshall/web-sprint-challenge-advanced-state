import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { selectAnswer, fetchQuiz, postAnswer, clearMessage } from '../state/action-creators';

function Quiz(props) {
  const { 
    fetchQuiz, 
    selectAnswer, 
    clearMessage, 
    postAnswer, 
    question, 
    quiz_id,
    trueAnswer_id, 
    falseAnswer_id, 
    selectedAnswer, 
    trueAnswer, 
    falseAnswer, 
    button1, 
    button2,
    buttonText,
    button2Text
   } = props
  const selectInitial = {
    button1: false,
    button2: false,
    answer_id: ''
  }

  useEffect(()=> {
    {question === '' ? fetchQuiz() : '' }
  }, [])
  
  useEffect(() => {
    selectAnswer(selectInitial)
  }, [])
 
  const answerSelected = (e) => {
    e.preventDefault()
    if (e.target.id === `${trueAnswer_id}` ){
      const select = {
        button1: true,
        button2: false,
        answer_id: trueAnswer_id
      }
      selectAnswer(select)
      clearMessage()

    } else if (e.target.id === `${falseAnswer_id}`) {
          const select = {
            button1: false,
            button2: true,
            answer_id: falseAnswer_id
          }
          selectAnswer(select)
          clearMessage()
    }
  }
  const onSubmit = (e) => {
    e.preventDefault()
    console.log('click')
    const request = {quiz_id: quiz_id, answer_id: selectedAnswer}
    postAnswer(request)
  }

  return (
    <div id="wrapper">
      {
        // quiz already in state? Let's use that, otherwise render "Loading next quiz..."
        question ? (
          <>
            <h2>{question}</h2>

            <div id="quizAnswers">
              <div className={`answer ${ button1 ? 'selected' : ''}`}>
                {trueAnswer}
                <button id={trueAnswer_id} onClick={answerSelected}>
                {buttonText}
                </button>
              </div>

              <div className={`answer ${ button2 ? 'selected' : ''}`}>
                {falseAnswer}
                <button id={falseAnswer_id} onClick={answerSelected}>
                  {button2Text}
                </button>
              </div>
            </div>

            <button disabled={selectedAnswer === '' ? true : false} onClick={onSubmit} id="submitAnswerBtn">Submit answer</button>
          </>
        ) : 'Loading next quiz...'
      }
    </div>
  )
}

const mapStateToProps = state => {
  return {
   question: state.quiz.question,
   quiz_id: state.quiz.quiz_id,
   trueAnswer: state.quiz.trueAnswer,
   trueAnswer_id: state.quiz.trueAnswer_id,
   falseAnswer: state.quiz.falseAnswer,
   falseAnswer_id: state.quiz.falseAnswer_id,
   selectedAnswer: state.selectedAnswer.selectedAnswer,
   buttonText: state.selectedAnswer.buttonText,
   button2Text: state.selectedAnswer.button2Text,
   button1: state.selectedAnswer.button1,
   button2: state.selectedAnswer.button2

  }
}

export default connect(mapStateToProps, {selectAnswer, fetchQuiz, postAnswer, clearMessage})(Quiz)