// ❗ You don't need to add extra reducers to achieve MVP
import { combineReducers } from 'redux'
import { MOVE_CLOCKWISE, MOVE_COUNTERCLOCKWISE, SET_INFO_MESSAGE, SET_QUIZ_INTO_STATE, SET_SELECTED_ANSWER } from './action-types'
import axios from 'axios'

// const initialState = {
//   wheelState: 0,
//   quizState: null,
//   selectedAnswerState: null,
//   messageState: '',
//   formState: {
//     newQuestion: '',
//     newTrueAnswer: '',
//     newFalseAnswer: '',
//   }
// consider splitting the state up
// }

const initialWheelState = 0
function wheel(state = initialWheelState, action) {
  switch (action.type){
    case MOVE_CLOCKWISE:
       if (state === 5) {
        return state = 0
       } else{
        return  state += 1}
    case MOVE_COUNTERCLOCKWISE:
      if (state === 0) {
        return state = 5
      } else{
        return state -= 1
      }
    default:
      return state
  } 
}

const initialQuizState = {
  question: "What is a closure?",
  trueAnswer: "A Function",
  falseAnswer: "An Elephant"
}
function quiz(state = initialQuizState, action) {
  switch(action.type) {
    case SET_QUIZ_INTO_STATE:
      axios.get('http://localhost:9000/api/quiz/next')
      .then(res => {
        return {...state, question: res.question, trueAnswer: res.answers[0].text, falseAnswer: res.answers[1].text}
      })
    default:
    return state
  }
  
}

const initialSelectedAnswerState = {
  className: 'select',
  buttonText: 'select',
  button2Text: 'select',
  selected: ''
}
function selectedAnswer(state = initialSelectedAnswerState, action) {
  switch(action.type){
    case SET_SELECTED_ANSWER:
      console.log(state)
      if(action.payload.button1 === true){
        console.log('if')
        return{...state,button2Text: 'select', buttonText: 'SELECTED', className: 'selected'}
      }if (action.payload.button2 === true){
        console.log('else if')
        return{...state, buttonText: 'select', button2Text: 'SELECTED', className: 'selected'}
      }
    default:
      return state
  }
  
}

const initialMessageState = ''
function infoMessage(state = initialMessageState, action) {
  switch(action.type){
    case SET_INFO_MESSAGE:
      // check all of the logic
      if (quiz.falseAnswer === true){
        return state = 'What a shame! That was the incorrect answer'
      } else if (quiz.trueAnswer === true){
        return state = 'Nice job! That was the correct answer'
      } else if (form.newQuestion === true){
        return state = `Congrats: "${form.newQuestion}" is a great question!`
      }
    default:
      return state
  }
  
}

const initialFormState = {
  newQuestion: '',
  newTrueAnswer: '',
  newFalseAnswer: '',
}
function form(state = initialFormState, action) {
  switch(action.type){
    case SET_QUIZ_INTO_STATE:
      // what else do I add to put quiz into state? Do I need a payload for this action creator?
      return{...state, }
    default:
      return state
  }
}

export default combineReducers({ wheel, quiz, selectedAnswer, infoMessage, form })
