import { 
  INPUT_CHANGE, 
  CLEAR_MESSAGE, 
  MOVE_CLOCKWISE, 
  MOVE_COUNTERCLOCKWISE, 
  RESET_FORM, 
  SET_INFO_MESSAGE, 
  SET_QUIZ_INTO_STATE, 
  SET_SELECTED_ANSWER 
} from "./action-types"
import axios from "axios"

// ❗ You don't need to add extra action creators to achieve MVP
export function moveClockwise() {
  return({type: MOVE_CLOCKWISE})
 }

export function moveCounterClockwise() {
  return({type: MOVE_COUNTERCLOCKWISE})
 }

export function selectAnswer(answer) { 
  return({type: SET_SELECTED_ANSWER, payload: answer})
}

export function setMessage(answer) {
  return({type: SET_INFO_MESSAGE, payload: answer})
 }

 export function setFormMessage(question) {
  return({type: SET_FORM_MESSAGE, payload: question})
 }

 export function clearMessage() {
  return({type: CLEAR_MESSAGE})
 }

export function setQuiz(quiz) { 
  return({type: SET_QUIZ_INTO_STATE, payload: quiz})
}

export function inputChange(evt) {
  return{type: INPUT_CHANGE, payload: evt}
 }

export function resetForm() { 
  return{type: RESET_FORM}
}

// ❗ Async action creators
export function fetchQuiz() {
  return function (dispatch) {
    // First, dispatch an action to reset the quiz state (so the "Loading next quiz..." message can display)
    // On successful GET:
    // - Dispatch an action to send the obtained quiz to its state
    const loadingQuiz = {
      quiz_id: null,
      question: null,
      answers: [
        {answer_id: null, text: null},
        {answer_id: null, text: null}
      ],
    }
    dispatch(setQuiz(loadingQuiz))
    axios.get('http://localhost:9000/api/quiz/next')
      .then(res => 
        {
          dispatch(setQuiz(res.data))
        return { 
          quiz_id: res.data.quiz_id, 
          question: res.data.question, 
          trueAnswer_id: res.data.answers[0].answer_id,
          trueAnswer: res.data.answers[0].text, 
          falseAnswer_id: res.data.answers[1].answer_id, 
          falseAnswer: res.data.answers[1].text,
          selectedAnswer: ''
        }
      }).catch(err => console.log(err))
  }
}
export function postAnswer(request) {
  return function (dispatch) {
    // On successful POST:
    // - Dispatch an action to reset the selected answer state
    // - Dispatch an action to set the server message to state
    // - Dispatch the fetching of the next quiz
    const resetAnswer = {
      answer_id: "",
      button1: false,
      button2: false
    }
    dispatch(selectAnswer(resetAnswer))
    axios.post('http://localhost:9000/api/quiz/answer', request)
    .then(res => {
      dispatch(setMessage(res.data.message))
      dispatch(fetchQuiz())
    })
      
    .catch(res => {console.log(res.data.message)
      dispatch(setMessage(res.data.message))})
    // .finally(dispatch(fetchQuiz()))
  }
}
export function postQuiz(request) {
  return function (dispatch) {
    // On successful POST:
    // - Dispatch the correct message to the the appropriate state
    // - Dispatch the resetting of the form
    axios.post("http://localhost:9000/api/quiz/new", request)
    .then(res => {
      dispatch(setMessage(`Congrats: "${res.data.question}" is a great question!`))
      dispatch(resetForm())
    }).catch(err => {
      console.log(err)
    })
  }
}
// ❗ On promise rejections, use log statements or breakpoints, and put an appropriate error message in state
