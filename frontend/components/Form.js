import axios from 'axios'
import React, { useState } from 'react'
import { connect } from 'react-redux'
import { inputChange, postQuiz, setMessage } from '../state/action-creators'

export function Form(props) {
  const [values, setValues] = useState({
    newQuestion: "",
    newTrueAnswer: "",
    newFalseAnswer: ""
  })

  

  const onChange = evt => {
    setValues({...values, 
    [evt.target.id]: evt.target.value
    });
    inputChange(evt.target.value)
  }

  const onSubmit = evt => {
    evt.preventDefault()
    console.log(values);
    const request = {question_text: values.newQuestion, true_answer_text: values.newTrueAnswer, false_answer_text: values.newFalseAnswer}
    props.postQuiz(request)
    console.log("submit")
    const newQuestion = document.querySelector("#newQuestion");
    newQuestion.value = "";
    const newTrueAnswer = document.querySelector("#newTrueAnswer");
    newTrueAnswer.value = "";
    const newFalseAnswer = document.querySelector("#newFalseAnswer");
    newFalseAnswer.value= "";
  }

  return (
    <form id="form" onSubmit={onSubmit}>
      <h2>Create New Quiz</h2>
      <input maxLength={50} onChange={onChange} id="newQuestion" placeholder="Enter question" />
      <input maxLength={50} onChange={onChange} id="newTrueAnswer" placeholder="Enter true answer" />
      <input maxLength={50} onChange={onChange} id="newFalseAnswer" placeholder="Enter false answer" />
      <button id="submitNewQuizBtn" disabled={!values.newQuestion.trim() || !values.newTrueAnswer.trim() || !values.newFalseAnswer.trim()}>Submit new quiz</button>
    </form>
  )
}

const mapStateToProps = state => {
  return {
    initialMessageState: state.infoMessage.initialMessageState
  }
}

export default connect(mapStateToProps, {setMessage, postQuiz, inputChange})(Form)
