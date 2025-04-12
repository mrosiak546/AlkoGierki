import React from 'react'
import { Button } from 'react-bootstrap'

const GameControls = ({startClick, drawClick, canStartTimer, game}) => {
    return (
        <>
            {canStartTimer && game === "5 Sekund" && (
                <Button className='btn-random mb-4' onClick={startClick}>
                    ▶️ Start
                </Button>
            )}

            <Button
                className="btn-random mb-4"
                onClick={drawClick}
            //disabled={currentPlayerIndex !== players.findIndex(player => player.nickname === nickname)}  // Tylko gracz na swojej turze może kliknąć
            >
                🎲 Losuj pytanie
            </Button>
        </>
    )
}

export default GameControls
