import React from 'react';

function Square(props) {
  if (props.onWinline) {
    return (
      <button className="squareWin" onClick={props.onClick}>
        {props.value}
      </button>
    )
  } else {
    return (
      <button className="square" onClick={props.onClick}>
        {props.value}
      </button>
    );
  }
}

export default Square;