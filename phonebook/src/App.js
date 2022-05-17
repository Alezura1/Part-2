import { useState, useEffect} from 'react'
import axios from 'axios'
import Person from './components/Person'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import personService from './services/Persons'
import Notification from './components/Notification'


const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterParam, setFilterParam] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      id: persons.length +1,
      number: newNumber
    }

    const isPersonInList = persons.find(person => person.name === personObject.name)
    if (isPersonInList){
      window.confirm(`${personObject.name} is already added to phonebook,replace the old number with a new one?`)
      const changedPerson = { ...isPersonInList, number: newNumber }
      personService
      .update(isPersonInList.id, changedPerson)
      .then(returnedPerson => {
        setPersons(persons.map(person => person.name === returnedPerson.name  ? returnedPerson : person))
      })
      .then(() => { 
        setMessage(
      `Updated ${personObject.name}`
      )
      setTimeout(success => {
        setMessage(null)
      }, 5000
      )
    })
      .catch(() => {
      setMessage(
        `ERROR: Information of ${personObject.name} has already been removed from the server`
      )
      setTimeout(error => {
        setMessage(null)
      }, 5000
      )
    })

    }
    else{
      personService
      .create(personObject)
      .then(setPersons(persons.concat(personObject)),
        setNewName(''),
        setNewNumber('')
      )
      .catch(success => {
        setMessage(
          `Added '${personObject.name}'`
        )
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })
      
      } 
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilterParam(event.target.value)  
  }  

  const deletePerson = (id) => {
   if(window.confirm(`Delete ${persons[id-1].name}?`)){
    personService.remove(id)
    .then(setPersons(persons.filter(
      person => person.id !== id
      )))
    }
  }
  
  const filteredPerson = filterParam === ''
  ? persons
  : persons.filter((person)=> person.name.toLowerCase().startsWith(filterParam.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
        <Filter filterParam={filterParam} handleFilterChange={handleFilterChange}/>
      <h2>add a new</h2>
        <PersonForm onSubmit={addPerson} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <ul>
        {filteredPerson.map(person=>
          <Person key={person.id} person={person} deletePerson={deletePerson}/>
          )}
      </ul>
  
    </div>
  )
}

export default App;
