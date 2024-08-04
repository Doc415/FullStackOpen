/* eslint-disable react/prop-types */
import { useState } from 'react'

const PersonForm =(props) => {
  return(
    <div>
    <form onSubmit={props.onSubmit}>
        <div>
          name: <input value={props.name} onChange={props.onNameChange}/>          
        </div>
        <div>number: <input value={props.number} onChange={props.onNumberChange} /></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  )
}

const Persons = ({list}) => {
  return(
    <div>
      {list.map( person=>
      <div key={person.id}> <span>{person.name}</span> <span>{person.number}</span></div>
    )}
    </div>
 
  )
}

const SearchBox = (props) => {
  return(
      <div>
        search: <input value={props.input} onChange={props.onChange}/>
      </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newPhoneNumber,setNewPhoneNumber]=useState('')
  const [searchInput, setSearchInput]=useState('')
  const personList= searchInput===''? persons: persons.filter(person=> person.name.toLowerCase().startsWith(searchInput.toLowerCase()))

  const updateSearchResult= (event)=>{
    setSearchInput(event.target.value)

  }
  
  const submitNewName= (event) => {
      event.preventDefault()
      const newPerson={ 
        name: newName,
        number: newPhoneNumber,
        id: persons.length+1
      }
      if (persons.some(person=> person.name===newPerson.name)){
        alert(`${newName} is already recorded!`)
        return
      }
      console.log(newPerson)
      setPersons(persons.concat(newPerson))
      setNewName('')
      setNewPhoneNumber('')
  }

  const updateNewPhoneNumber=(event)=>{
    setNewPhoneNumber(event.target.value)
  }

  const updateNewName=(event) => {
    setNewName(event.target.value)
  }

  return (
    
    <div>
      <SearchBox input={searchInput} onChange={updateSearchResult}/>
      <h2>Phonebook</h2>
      <PersonForm name={newName} number={newPhoneNumber} onNameChange={updateNewName} onNumberChange={updateNewPhoneNumber} onSubmit={submitNewName}/>
      <h2>Numbers</h2>
      <Persons list={personList}/>
      
    </div>
  )
}

export default App
