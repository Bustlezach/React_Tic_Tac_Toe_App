import React, { useState, useEffect } from 'react'
import Board from './Board';

const PLAYER_X = 'X';
const PLAYER_O = 'O';

const winningCombinations = [
  {combo: [0, 1, 2], strikeClass: 'strike-row-1'},
  {combo: [3, 4, 5], strikeClass: 'strike-row-2'},
  {combo: [6, 7, 8], strikeClass: 'strike-row-3'},
  {combo: [0, 3, 6], strikeClass: 'strike-column-1'},
  {combo: [1, 4, 7], strikeClass: 'strike-column-2'},
  {combo: [2, 5, 8], strikeClass: 'strike-column-3'},
  {combo: [0, 4, 8], strikeClass: 'strike-diagonal-1'},
  {combo: [2, 4, 6], strikeClass: 'strike-diagonal-2'},
];

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

  const checkWinner = () => {
    console.log('Check Winner');
  };

  useEffect(() => {
    checkWinner();
  }, [tiles]);

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