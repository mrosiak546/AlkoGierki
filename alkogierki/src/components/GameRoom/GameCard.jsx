import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const GameCard = ({question, gameName, animation,icon}) => {
    return (
        <div className={`game-card text-center mb-4 ${animation ? 'swipe-out' : ''}`}>
            <h5 className='mb-3'>{gameName.toUpperCase()}</h5>
            <FontAwesomeIcon icon={icon} className="bottle-icon mb-3" />
            <p>{question.toUpperCase()}</p>
        </div>
    )
}

export default GameCard
