import React from 'react'

const TimerBar = ({progress}) => {
    return (
        <div className="timer-bar bg-secondary rounded overflow-hidden mb-3" style={{ height: '8px', width: '100%' }}>
            <div
                className="bg-warning"
                style={{
                    height: '100%',
                    width: `${progress}%`,
                    transition: 'width 0.1s linear'
                }}
            ></div>
        </div>
    )
}

export default TimerBar
