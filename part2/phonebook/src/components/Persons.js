import React from 'react'
import Person from './Person'

const Persons = (props) => {
	var filtered = props.persons.filter(person => person.name.toLowerCase().includes(props.filter.toLowerCase()));
    return (
      <ul>
				{filtered.map(person => (
					<Person key={person.id} name={person.name} number={person.number} handleDeletePerson={props.handleDeletePerson(person.id, person.name)}/> ))}
      </ul> 
    ) 
}

export default Persons