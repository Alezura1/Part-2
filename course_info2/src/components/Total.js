import React from 'react'

const Total = ({parts}) => {
    const initialValue=0;
    const total = 
    parts.reduce((sum, part) => sum + part.exercises, initialValue)

  return (
    <h4>total of {total} exercises</h4>
  )
  }

export default Total