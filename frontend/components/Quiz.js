import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { selectAnswer, fetchQuiz, postAnswer, setQuiz } from '../state/action-creators';
import { createBrowserHistory } from 'history';

// figure out how to persist state when navigating away from page

function Quiz(props) {
  const [select, setSelect] = useState({
    button1: false,
    button2: false,
    answer_id: ''
  })

  const [answer_id, setAnswer_id] = useState('')

  // useEffect(() => {
  //   setSavedQuiz(JSON.parse(window.localStorage.getItem('quiz')))
  // }, [])
  
  // setCount(JSON.parse(window.localStorage.getItem('count')));

  // const saveToLocalStorage = (quiz) => {
  //   try {
  //     localStorage.setItem('quiz', JSON.stringify(quiz));
  //   }catch (e) {
  //     console.error(e);
  //   }
  // };

  // const loadFromLocalStorage = () => {
  //   try {
  //     const quizStr = localStorage.getItem('quiz');
  //     return quizStr ? JSON.parse(quizStr) : undefined;
  //   }catch (e) {
  //     console.error(e);
  //     return undefined;
  //   }
  // };

  // const persistedStore = loadFromLocalStorage();
  // const store = createStore(reducer, persistedStore);

  // store.subscribe(() => {
  // saveToLocalStorage(store.getState());  
  //});


  useEffect(()=> {
    // props.fetchQuiz()
    // window.localStorage.setItem('quiz', quiz)
    // KM: tried using ternary with new answerMessage state but state did not persist
    {props.question === '' ? props.fetchQuiz() : '' }
    
    
    // KM: tried using new answerMessage state in dependency array but state did not persist
    // KM: maybe try useHistory or localStorage to persist state data
    
    // KM: experiment with state here
  }, [])

  // state won't update 
  // const [quiz, setSavedQuiz] = useState({
  //   quiz_id: props.quiz_id,
  //   trueAnswer_id: props.trueAnswer_id,
  //   falseAnswer_id: props.falseAnswer_id,
  //   trueAnswer: props.trueAnswer,
  //   falseAnswer: props.falseAnswer,
  //   question: props.question
  // })
  
  useEffect(() => {
    props.selectAnswer(select)
  }, [select])
 
  const answerSelected = (e) => {
    e.preventDefault()
    if (e.target.id === `${props.trueAnswer_id}` ){
      setSelect({
      button2: false, button1: true, answer_id: props.trueAnswer_id})
      setAnswer_id(props.trueAnswer_id)
      
      
      
    } else if (e.target.id === `${props.falseAnswer_id}`) {
        setSelect({
        button1: false, button2: true, answer_id: props.falseAnswer_id})
        setAnswer_id(props.falseAnswer_id)
    }
  }
  const onSubmit = (e) => {
    e.preventDefault()
    console.log('click')
    const request = {quiz_id: props.quiz_id, answer_id: answer_id}
    console.log(select)
    props.postAnswer(request)
    setSelect({
      button1: false,
      button2: false
    })
  }

  // const disabled = () => {
  //   if (select.button1 === true || select.button2 === true){
  //     return false
  //   }else {
  //     return true
  //   }
  // }

  // the submit button stays active but won't submit

  return (
    <div id="wrapper">
      {
        // quiz already in state? Let's use that, otherwise render "Loading next quiz..."
        props.question ? (
          <>
            <h2>{props.question}</h2>

            <div id="quizAnswers">
              <div className={`answer ${ props.button1 ? 'selected' : ''}`}>
                {props.trueAnswer}
                <button id={props.trueAnswer_id} onClick={answerSelected}>
                {props.buttonText}
                </button>
              </div>

              <div className={`answer ${ props.button2 ? 'selected' : ''}`}>
                {props.falseAnswer}
                <button id={props.falseAnswer_id} onClick={answerSelected}>
                  {props.button2Text}
                </button>
              </div>
            </div>

            <button onClick={onSubmit} id="submitAnswerBtn">Submit answer</button>
          </>
        ) : <p>Loading next quiz...</p>
      }
    </div>
  )
}

const mapStateToProps = state => {
  console.log(state)
  return {
   question: state.quiz.question,
   quiz_id: state.quiz.quiz_id,
   trueAnswer: state.quiz.trueAnswer,
   trueAnswer_id: state.quiz.trueAnswer_id,
   falseAnswer: state.quiz.falseAnswer,
   falseAnswer_id: state.quiz.falseAnswer_id,
   updatedButtonText: state.quiz.updatedButtonText,
   updatedButton2Text: state.quiz.updatedButton2Text,
   selectedAnswer: state.selectedAnswer.selectedAnswer,
   answerMessage: state.selectedAnswer.answerMessage,
   buttonText: state.selectedAnswer.buttonText,
   button2Text: state.selectedAnswer.button2Text,
   className: state.selectedAnswer.className,
   button1: state.selectedAnswer.button1,
   button2: state.selectedAnswer.button2

  }
}

export default connect(mapStateToProps, {selectAnswer, fetchQuiz, postAnswer, setQuiz})(Quiz)