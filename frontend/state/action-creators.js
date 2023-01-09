import { INPUT_CHANGE, MOVE_CLOCKWISE, MOVE_COUNTERCLOCKWISE, SET_INFO_MESSAGE, SET_QUIZ_INTO_STATE, SET_SELECTED_ANSWER } from "./action-types"
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

export function setQuiz(quiz) { 
  return({type: SET_QUIZ_INTO_STATE, payload: quiz})
  // should I add a payload?
}

export function inputChange(quiz) {
  // KM: for quiz form
  return{type: INPUT_CHANGE, payload: quiz}
 }

export function resetForm() { 
  // KM: for quiz form
}

// ❗ Async action creators
export function fetchQuiz() {
  return function (dispatch) {
    // First, dispatch an action to reset the quiz state (so the "Loading next quiz..." message can display)
    // On successful GET:
    // - Dispatch an action to send the obtained quiz to its state
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
    // KM: Submit answer: http://localhost:9000/api/quiz/answer
    axios.post('http://localhost:9000/api/quiz/answer', request)
    .then(res => {
      console.log(res.data.message)
      dispatch(setMessage(res.data.message))})
    .catch(res => {console.log(res.data.message)
      dispatch(setMessage(res.data.message))})
    dispatch(fetchQuiz())
  }
}
export function postQuiz(request) {
  return function (dispatch) {
    // On successful POST:
    // - Dispatch the correct message to the the appropriate state
    // - Dispatch the resetting of the form
    // KM: How do I structure the post request payload?
    // KM: Make a new quiz: http://localhost:9000/api/quiz/new
    axios.post("http://localhost:9000/api/quiz/new", request)
    .then(res => {
      console.log(res)
      const formMessage = `Congrats: "${res.data.question}" is a great question!`
      dispatch(setMessage(formMessage))
    }).catch(err => {
      console.log(err)
    })
  }
}
// ❗ On promise rejections, use log statements or breakpoints, and put an appropriate error message in state
