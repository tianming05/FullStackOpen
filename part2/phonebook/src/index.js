import React, { useState, useEffect } from "react";
import ReactDOM from 'react-dom'
import './index.css'
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Filter from "./components/Filter";
import Notification from "./components/Notification";
import personService from "./services/personService"

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterValue, setFilterValue] = useState("");
	const [msg, setMsg] = useState({msgType:"notification", msgContent:null});

  const handleNameChange = event => {
    setNewName(event.target.value);
  };

  const handleNumberChange = event => {
    setNewNumber(event.target.value);
  };
  
  const handleAddPerson = event => {
		event.preventDefault();
		const prevPerson = persons.find(p => p.name === newName);
		const newPerson = {
				name: newName,
				number: newNumber
		};
		if(prevPerson){
			if(window.confirm(`${newName} is already in the phonebook, replace the number with the new one ?`))
			personService.update(prevPerson.id, newPerson)
				.then(response => {
					setPersons(persons.map(p => p.name === newName ? response : p ));
					setNewName("");
					setNewNumber("");
					setMsg({msgType:"notification", msgContent:`phone number of ${newName} updated`});
					})
				.catch(error => {
					console.log(error.response.data);
					setMsg({msgType:"error", msgContent:`Cannot update phone number of ${newName}`});
				});
		}else{
			personService.create(newPerson)
				.then(response => {
					setPersons(persons.concat(response));
					setNewName("");
					setNewNumber("");
					setMsg({msgType:"notification", msgContent:`${newName} is added.`});
					})
				.catch(error => {
					console.log(error.response.data);
					setMsg({msgType:"error", msgContent:`Cannot add ${newName}`});
				});
		}
		setTimeout(() => {
      setMsg({msgType:"notification", msgContent:null});
    }, 5000);
  }
  
  const handleDeletePerson = (id, name) => {
	  return ()=>{
			if (window.confirm(`Delete ${name}?`)) {
				personService.deletePerson(id)
				.then(() => {
					setPersons(persons.filter(p => p.id !== id));
					setMsg({msgType:"notification", msgContent:`${name} is deleted.`});
				})
				.catch(error => {
					console.log(error.response.data);
					setMsg({msgType:"error", msgContent:`Cannot delete ${name}`});
				});
				setTimeout(() => {
          setMsg({msgType:"notification", msgContent:null});
        }, 5000);
			}
	  }
  }
  
  const handleFilterChange = event => {
	  var filterVal = event.target.value;
	  setFilterValue(filterVal);
  }

  useEffect(() => {
		personService.getAll()
		.then(response=>{setPersons(response)})
		.catch(error => {
			console.log(error.response.data);
		});
  }, [])

  return (
    <div>
			<h2>Phone book</h2>
			<Notification message={msg}/>
			<Filter handleFilterChange={handleFilterChange}/>
			<h3>Add a new person</h3>
			<PersonForm 
				newName={newName}
				newNumber={newNumber}
				handleNameChange={handleNameChange}
				handleNumberChange={handleNumberChange}
				addPerson={handleAddPerson}
			/>
			<h3>Numbers</h3>
			<Persons
				persons={persons}
				filter={filterValue}
				handleDeletePerson={handleDeletePerson}
			/>
    </div>
  );
};

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
