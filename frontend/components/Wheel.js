import React from 'react'
import { connect } from 'react-redux';
import { moveClockwise, moveCounterClockwise } from '../state/action-creators';

function Wheel(props) {
  const { initialWheelState, moveClockwise, moveCounterClockwise } = props
  const handleClockWise = (e) => {
    e.preventDefault();
    moveClockwise()
  }

  const handleCounterClockWise = (e) => {
    e.preventDefault();
    moveCounterClockwise()
  }

  return (
    <div id="wrapper">
      <div id="wheel">
        <div className={`cog ${initialWheelState === 0 ? 'active' : ''}`} style={{ "--i": 0 }}>{initialWheelState === 0 ? 'B' : null}</div>
        {/* {`cog ${initialWheelState === 0 ? 'active' : ''}`}
        turns B blue instead of orange
        {initialWheelState === 0 ? 'B' : null}
        takes B out completely
        should I create a state for current index? */}
        <div className={`cog ${initialWheelState === 1 ? 'active' : ''}`} style={{ "--i": 1 }} >{initialWheelState === 1 ? 'B' : null}</div>
        <div className={`cog ${initialWheelState === 2 ? 'active' : ''}`} style={{ "--i": 2 }} >{initialWheelState === 2 ? 'B' : null}</div>
        <div className={`cog ${initialWheelState === 3 ? 'active' : ''}`} style={{ "--i": 3 }} >{initialWheelState === 3 ? 'B' : null}</div>
        <div className={`cog ${initialWheelState === 4 ? 'active' : ''}`} style={{ "--i": 4 }} >{initialWheelState === 4 ? 'B' : null}</div>
        <div className={`cog ${initialWheelState === 5 ? 'active' : ''}`} style={{ "--i": 5 }} >{initialWheelState === 5 ? 'B' : null}</div>{/* --i is a custom CSS property, no need to touch that nor the style object */}
      </div>
      <div id="keypad">
        <button onClick={handleCounterClockWise} id="counterClockwiseBtn" >Counter clockwise</button>
        <button onClick={handleClockWise}id="clockwiseBtn">Clockwise</button>
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return{
    // initialWheelState: state.initialWheelState
    // state: state.initialWheelState
    // both returns undefined
    initialWheelState: state.wheel
    // returns all state
  }
}

export default connect(mapStateToProps, {moveClockwise, moveCounterClockwise})(Wheel)