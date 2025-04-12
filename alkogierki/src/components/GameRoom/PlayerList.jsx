import React from 'react'
import { ListGroup } from 'react-bootstrap'


const PlayerList = ({players}) => {
    return (
        <>
            <h4 className='mt-4 mb-2 text-white'>Gracze:</h4>
            <ListGroup className="player-list">
                {players.map((player, idx) => (
                    <ListGroup.Item key={idx}>{player.nickname}</ListGroup.Item>
                ))}
            </ListGroup>
        </>
    )
}

export default PlayerList
