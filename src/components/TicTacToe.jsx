import React, { useState } from 'react'
import Board from './Board';

const PLAYER_X = 'X';
const PLAYER_O = 'O';

function TicTacToe() {
  const [tiles, setTiles] = useState(new Array(9).fill(null));
  const [playerTurn, setPlayerTurn] = useState(PLAYER_X);
  const [strikeClass, setStrikeClass] = useState();

  const handleTileClick = (index) => {
    if (tiles[index] !== null) {
      return;
    }

    const newTiles = [...tiles];
    newTiles[index] = playerTurn;
    setTiles(prev => newTiles);

    setPlayerTurn(prev => {
      const currentPlayer = prev === PLAYER_X ? PLAYER_O : PLAYER_X;
      return currentPlayer;
    });
  };
  return (
    <div>
      <h1>Tic Tac Toe</h1>
      <Board
       playerTurn={playerTurn} 
       tiles={tiles} 
       onTileClick={handleTileClick}
       strikeClass={strikeClass}
      />
    </div>
  )
}

export default TicTacToe;