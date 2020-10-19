import React, { useState } from 'react';
import Board from '../Board';
import calculateWinner from './gameServices';

function Game() {
  const [history, setHistory] = useState([{squares: Array(9).fill(null)}]);
  const [xIsNext, setXIsNext] = useState(true);
  const [stepNumber, setStepNumber] = useState(0);
  const [isAscending, setIsAscending] = useState(true);

  const handleClick = (i) => {
    const newHistory = history.slice(0, stepNumber + 1);
    const current = newHistory[newHistory.length - 1];
    const squares = current.squares.slice();

    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    squares[i] = xIsNext ? 'X' : 'O';

    setHistory(newHistory.concat([{
      squares: squares
    }]));
    setStepNumber(newHistory.length);
    setXIsNext(!xIsNext);
  }

  const jumpTo = (step) => {
    setStepNumber(step);
    setXIsNext((step % 2) === 0);
  }

  const getPosition = (currentSquares, previousSquares) => {
    if (!currentSquares || !previousSquares) {
      return {};
    }
    for (let index = 0; index < currentSquares.length; index++) {
      const element = currentSquares[index];
      if (element !== previousSquares[index]) {
        return {
          value: element,
          index: index
        }
      }
    }
    return {};
  }

  const current = history[stepNumber];
  const winLine = calculateWinner(current.squares);
  const winner = winLine ? current.squares[winLine[0]] : null;

  const moves = history.map((step, move) => {
    // const description = move ? 'Go to move #' + move : 'Go to game start';
    let description;
    if (move) {
      const {value, index} = getPosition(step.squares, history[move - 1].squares);
      description = 'Go to move have ' + value + ' at row ' + (parseInt(index / 3) + 1) + ' and col ' + (index % 3 + 1);
    } else {
      description = 'Go to game start';
    }
    return (move === stepNumber) ? ( 
      <li key = {move}>
        <button className = "currentStep" onClick = {() => jumpTo(move)}> {description} </button>
      </li>
    ) : (
      <li key = {move}>
        <button onClick = {() => jumpTo(move)}> {description} </button>
      </li>
    )
  });

  let buttonContent = 'Change sort type to ';

  if (isAscending === false) {
    moves.reverse();
    buttonContent += 'Ascending';
  } else {
    buttonContent += 'Descending';
  }

  let status;

  if (winner) {
    status = 'Winner: ' + winner;
  } else if (history.length === 10 && stepNumber === 9) {
    status = 'Draw';
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  return (
    <div className = "game" >
      <div className = "game-board" >
        <Board squares = {current.squares} winLine = {winLine} onClick = {(i) => handleClick(i)}/>
      </div>
      <div className = "game-info">
        <div>
          <b>{status}</b>
        </div >
        <button onClick = {() => setIsAscending(!isAscending)}> {buttonContent} </button>
        <ol> {moves} </ol>
      </div>
    </div>
  );
}

export default Game;