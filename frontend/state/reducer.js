// ❗ You don't need to add extra reducers to achieve MVP
import { combineReducers } from 'redux'
import { INPUT_CHANGE, MOVE_CLOCKWISE, MOVE_COUNTERCLOCKWISE, SET_INFO_MESSAGE, SET_QUIZ_INTO_STATE, SET_SELECTED_ANSWER } from './action-types'

const initialState = {
  quizState: {
    quiz_id: '',
    question: '',
    trueAnswer_id: '',
    trueAnswer: '',
    falseAnswer_id: '',
    falseAnswer: '',
    updatedButtonText: 'select',
    updatedButton2Text: 'select'
  },
  selectedAnswerState: {
    className: 'select',
    buttonText: 'select',
    button2Text: 'select',
    button1: false,
    button2: false,
    answerMessage: ''
  },
  messageState: {
    quizState: '',
    quizFormState: ''
  },
  formState: {
    newQuestion: '',
    newTrueAnswer: '',
    newFalseAnswer: '',
  }
}
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
      console.log(action.payload)
      return({
        ...state,
        quiz_id: action.payload.quiz_id,
        question: action.payload.question,
        trueAnswer_id: action.payload.answers[0].answer_id,
        trueAnswer: action.payload.answers[0].text,
        falseAnswer_id: action.payload.answers[1].answer_id,
        falseAnswer: action.payload.answers[1].text
      })
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
  answerMessage: null,
  selectedAnswer: ''
}
function selectedAnswer(state = initialSelectedAnswerState, action) {
  switch(action.type){
    case SET_SELECTED_ANSWER:
      console.log(state)
      if(action.payload.button1 === true){
        return{...state, 
          button2Text: 'Select', 
          buttonText: 'SELECTED', 
          className: 'selected', 
          button1: true, 
          button2: false, 
          answerMessage: true, 
          selectedAnswer: action.payload.answer_id}
      }else if (action.payload.button2 === true){
        return{...state, buttonText: 'Select', button2Text: 'SELECTED', className: 'selected', button2: true, button1: false, answerMessage: false, selectedAnswer: action.payload.answer_id}
      } else if (action.payload.button1 === false && action.payload.button2 === false){
        return {...state, button1: false, button2: false, buttonText:'Select', button2Text: 'Select', classname: 'select'}
      }
    default:
      return state
  }
  
}

const initialMessageState = {
  quizState: '',
  quizFormState: ''
}
// {
//   falseAnswerMessage: 'What a shame! That was the incorrect answer',
//   trueAnswerMessage: 'Nice job! That was the correct answer',
//   newQuizForm: `Congrats: "${form.newQuestion}" is a great question!`,
//   noMessage: 'no message'
// }
function infoMessage(state = initialMessageState, action) {
  switch(action.type){
    case SET_INFO_MESSAGE:
      console.log(action.payload)
      return {...state, quizState: action.payload}
      // if (action.payload === 'SELECTED')
    //   // check all of the logic
    //   // infoMessage is not connected for some reason
    //   if (quiz.falseAnswer === true){
    //     return state.falseAnswerMessage
    //   } else if (quiz.trueAnswer === true){
    //     return state.trueAnswerMessage
    //   // } else if(form.question === true){
    //   //   return state.newQuizForm
    //   }else
    //   {
    //     return state.noMessage
    //   }
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
    case INPUT_CHANGE:
      console.log(action.payload)
      return{
        newQuestion: action.payload.newQuestion,
        newTrueAnswer: action.payload.newTrueAnswer,
        newFalseAnswer: action.payload.newFalseAnswer
      }
    case SET_QUIZ_INTO_STATE:
      console.log(action.payload)
      return{...state, 
      newQuestion: action.payload.newQuestion,
      newTrueAnswer: action.payload.newTrueAnswer,
      newFalseAnswer: action.payload.newFalseAnswer}
    default:
      return state
  }
}

export default combineReducers({ wheel, quiz, selectedAnswer, infoMessage, form })
