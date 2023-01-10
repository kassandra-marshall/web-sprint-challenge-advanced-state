// ❗ You don't need to add extra reducers to achieve MVP
import { combineReducers } from 'redux'
import { CLEAR_MESSAGE, INPUT_CHANGE, IS_LOADING, MOVE_CLOCKWISE, MOVE_COUNTERCLOCKWISE, RESET_FORM, SET_FORM_MESSAGE, SET_INFO_MESSAGE, SET_QUIZ_INTO_STATE, SET_SELECTED_ANSWER } from './action-types'

// const initialState = [
//   wheelState= 0,
//   quizState= {
//     quiz_id: '',
//     question: '',
//     trueAnswer_id: '',
//     trueAnswer: '',
//     falseAnswer_id: '',
//     falseAnswer: '',
//     updatedButtonText: 'select',
//     updatedButton2Text: 'select'
//   },
//     selectAnswerState = {
//     className: 'select',
//     buttonText: 'select',
//     button2Text: 'select',
//     button1: false,
//     button2: false,
//     answerMessage: ''
//   },
//   messageState = {
//     quizState: '',
//     quizFormState: ''
//   },
//   formState = {
//     newQuestion: '',
//     newTrueAnswer: '',
//     newFalseAnswer: '',
//   }
// ]
  
// consider splitting the state up

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
  quiz_id: '',
  question: '',
  trueAnswer_id: '',
  trueAnswer: '',
  falseAnswer_id: '',
  falseAnswer: '',
  updatedButtonText: 'select',
  updatedButton2Text: 'select',
}
function quiz(state = initialQuizState, action) {
  switch(action.type) {
    case SET_QUIZ_INTO_STATE:
      return({
        ...state,
        quiz_id: action.payload.quiz_id,
        question: action.payload.question,
        trueAnswer_id: action.payload.answers[0].answer_id,
        trueAnswer: action.payload.answers[0].text,
        falseAnswer_id: action.payload.answers[1].answer_id,
        falseAnswer: action.payload.answers[1].text
      })
      case RESET_FORM:
        console.log(state)
        return state
    default:
    return state
  }
  
}

const initialSelectedAnswerState = {
  className: 'select',
  buttonText: 'Select',
  button2Text: 'Select',
  button1: false,
  button2: false,
  answerMessage: '',
  selectedAnswer: ''
}
function selectedAnswer(state = initialSelectedAnswerState, action) {
  switch(action.type){
    case SET_SELECTED_ANSWER:
      if(action.payload.button1 === true){
        return{...state, 
          button2Text: 'Select', 
          buttonText: 'SELECTED', 
          className: 'selected', 
          button1: true, 
          button2: false, 
          answerMessage: '', 
          selectedAnswer: action.payload.answer_id}
      }else if (action.payload.button2 === true){
        return{...state, 
          buttonText: 'Select', 
          button2Text: 'SELECTED', 
          className: 'selected', 
          button2: true, 
          button1: false, 
          answerMessage: '', 
          selectedAnswer: action.payload.answer_id}
      } else if (action.payload.button1 === false && action.payload.button2 === false){
        return {...state, 
          button1: false, 
          button2: false, 
          buttonText:'Select', 
          button2Text: 'Select', 
          classname: 'select'}
      }
    default:
      return state
  }
  
}

const initialMessageState = {
  quizState: ''
}
function infoMessage(state = initialMessageState, action) {
  switch(action.type){
    case SET_INFO_MESSAGE:
      console.log(action.payload)
      return {...state, quizState: action.payload}
    case CLEAR_MESSAGE:
      return {...state, quizState: ''}
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
    case RESET_FORM:
      return{
        newQuestion: '',
        newTrueAnswer: '',
        newFalseAnswer: ''
      }
    case INPUT_CHANGE:
      console.log(action.payload)
      return{
        newQuestion: action.payload.newQuestion,
        newTrueAnswer: action.payload.newTrueAnswer,
        newFalseAnswer: action.payload.newFalseAnswer
      }
    case SET_QUIZ_INTO_STATE:
      return{...state, 
      newQuestion: action.payload.newQuestion,
      newTrueAnswer: action.payload.newTrueAnswer,
      newFalseAnswer: action.payload.newFalseAnswer}
    default:
      return state
  }
}

// const initialLoadingState='Loading next quiz...'
// function loading(state=initialLoadingState, action){
//   switch(action.type){
//     case IS_LOADING:
//       return state
//   }
// }

export default combineReducers({ wheel, quiz, selectedAnswer, infoMessage, form, })
