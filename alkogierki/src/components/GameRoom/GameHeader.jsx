import React from 'react'

const GameHeader = ({roomId, game}) => {
    return (
        <>
            <h1 className="title mb-4" style={{ fontSize: '2.2rem' }}>Pokój: {roomId}</h1>
            <strong className='typeOfGame mb-4' style={{fontSize:'1.9rem'}}>{game}</strong>
        </>
    )
}

export default GameHeader
