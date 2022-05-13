import React from 'react'

const Filter = ({ filterParam, handleFilterChange}) => 
    <div>
        filter shown with <input value={filterParam} onChange={handleFilterChange} />
    </div>

export default Filter