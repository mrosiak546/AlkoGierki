import React from 'react'
import { Button } from 'react-bootstrap'

const RoomFormButtons = ({onPrimaryClick, onBackClick, primaryLabel}) => {
    return (
        <>
            <Button
                className='btnCreateRoom'
                onClick={onPrimaryClick}
            >
                {primaryLabel}
            </Button>

            <Button className='btnBack' onClick={onBackClick}>
                Wroc
            </Button>
        </>
    )
}

export default RoomFormButtons
