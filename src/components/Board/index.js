import React from 'react';
import Square from '../Square';

function Board(props)
{
  const renderSquare = (i) => {
    const winLine = props.winLine;
    let onWinLine = false;
    if (winLine) {
      for (const position of winLine) {
        if (position === i) {
          onWinLine = true;
        }
      }
    }

    return (
      <Square
        value={props.squares[i]}
        onClick={() => props.onClick(i)}
        onWinline={onWinLine}
      />
    );
  }

  let boardSquares = [];

  for(let row = 0; row < 3; row++){
    let boardRow = [];

    for(let col = 0; col < 3; col++){
      boardRow.push(<span key={(row * 3) + col}>{renderSquare((row * 3) + col)}</span>); 
    }
    
    boardSquares.push(<div className="board-row" key={row}>{boardRow}</div>);
  }

  return (
    <div>
      {boardSquares}
    </div>
  );
}

export default Board;