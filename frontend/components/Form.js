import axios from 'axios'
import React, { useState } from 'react'
import { connect } from 'react-redux'
import * as actionCreators from '../state/action-creators'

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
  }
  const onSubmit = evt => {
    evt.preventDefault()
    console.log(values);
    const request = {question_text: values.newQuestion, true_answer_text: values.newTrueAnswer, false_answer_text: values.newFalseAnswer}
    // http://localhost:9000/api/quiz/new
    // post request to above 
    axios.post("http://localhost:9000/api/quiz/new", request)
    .then(res => {
      console.log(res)
    }).catch(err => {
      console.log(err)
    })
  }

  return (
    <form id="form" onSubmit={onSubmit}>
      <h2>Create New Quiz</h2>
      <input maxLength={50} onChange={onChange} id="newQuestion" placeholder="Enter question" />
      <input maxLength={50} onChange={onChange} id="newTrueAnswer" placeholder="Enter true answer" />
      <input maxLength={50} onChange={onChange} id="newFalseAnswer" placeholder="Enter false answer" />
      <button id="submitNewQuizBtn">Submit new quiz</button>
    </form>
  )
}

export default connect(st => st, actionCreators)(Form)
