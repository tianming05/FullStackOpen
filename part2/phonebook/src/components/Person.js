import React from 'react'

const Person = (props) => {
    return (
      <li>{props.name}  {props.number} <button onClick={props.handleDeletePerson}>Delete</button></li>
    )
}

export default Person