import React from 'react'

const SelectField = ({value, onChange, options}) => {
    return (
        <select
            className="form-select"
            value={value}
            onChange={onChange}
        >
        {options.map((option) => <option key={option}>{option}</option>)}
        </select>
    )
}

export default SelectField
