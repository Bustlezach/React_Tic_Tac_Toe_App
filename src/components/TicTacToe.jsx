import React, { useState, useEffect } from 'react'
import Board from './Board';
import GameOver from './GameOver';
import GameState from './GameState';
import ResetGame from './ResetGame';
import clickSoundAsset from '../sound/click.wav';
import gameOverSoundAsset from '../sound/game_over.wav';


const gameOverSound = new Audio(gameOverSoundAsset);
gameOverSound.volume = 0.2;
const clickSound = new Audio(clickSoundAsset);
clickSound.volume = 0.5;
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
  const [gameState, setGameState] = useState(GameState.inProgress);

  const handleTileClick = (index) => {
    if (gameState !== GameState.inProgress) {
      return;
    }

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

  const handleReset = () => {
    setTiles(prev => (new Array(9).fill(null)));
    setPlayerTurn(prev => PLAYER_X);
    setStrikeClass(prev => null);
    setGameState(prev => GameState.inProgress);
  };

  const checkWinner = (tiles, setStrikeClass) => {
    for(const winningCombo of winningCombinations) {
      const {combo, strikeClass} = winningCombo;
      const tileValue1 = tiles[combo[0]];
      const tileValue2 = tiles[combo[1]];
      const tileValue3 = tiles[combo[2]];

      if (
          tileValue1 !== null && 
          tileValue1 === tileValue2 && 
          tileValue1 === tileValue3
        ) {
        setStrikeClass(strikeClass);
        if (tileValue1 === PLAYER_X) {
         setGameState(GameState.playerXWins)
        } else {
         setGameState(GameState.playerOWins);
        }
        return;
      }
    }

    const allTileFilled = tiles.every(tile => tile !== null);
    if (allTileFilled) {
      setGameState(GameState.draw);
    }
  };



  useEffect(() => {
    checkWinner(tiles, setStrikeClass);
  }, [tiles]);

  useEffect(() => {
    if (tiles.some((tile) => tile !== null)) {
      clickSound.play();
    }
  }, [tiles]);

  useEffect(() => {
    if (gameState !== GameState.inProgress) {
      gameOverSound.play();
    }
  }, [gameState]);

  return (
    <div>
      <h1>Tic Tac Toe</h1>
      <Board
       playerTurn={playerTurn} 
       tiles={tiles} 
       onTileClick={handleTileClick}
       strikeClass={strikeClass}
      />
      <GameOver gameState={gameState} />
      <ResetGame gameState={gameState} handleReset={handleReset} />
    </div>
  )
}

export default TicTacToe;