import React from 'react'
import { connect } from 'react-redux'
import { setMessage } from '../state/action-creators'

function Message(props) {
  return <div id="message">Nice job!</div>
  // make messages match what is expected
  // props is question that was sent
  console.log(props)
}

const mapStateToProps = state => {
  return {
    
  }
}

export default connect(mapStateToProps, {setMessage})(Message)