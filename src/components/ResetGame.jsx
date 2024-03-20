import React from 'react'
import GameState from './GameState'

export default function ResetGame({ gameState, handleReset }) {
  if (gameState !== GameState.inProgress) {
    return (
      <button onClick={handleReset} className='reset-button'>Play Again</button>
    )
  }
}
