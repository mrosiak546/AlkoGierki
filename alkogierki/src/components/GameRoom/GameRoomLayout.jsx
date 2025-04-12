import React from 'react'
import GameHeader from './GameHeader'

const GameRoomLayout = ({children, roomId, game}) => {
  return (
    <div className="home-wrapper d-flex flex-column align-items-center">
      <GameHeader roomId={roomId} game={game}/>
      <div className="d-flex flex-column mt-5 gap-3 w-100 px-4" style={{ maxWidth: '400px' }}>
            {children}
      </div>
    </div>
  )
}

export default GameRoomLayout
