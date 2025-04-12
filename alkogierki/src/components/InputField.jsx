import React from 'react'

const InputField = ({value, onChange, placeholder}) => {
    return (
        <input
            type="text"
            placeholder={placeholder}
            className="form-control"
            value={value}
            onChange={onChange}
        />
    )
}

export default InputField
