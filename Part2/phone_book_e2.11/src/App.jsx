/* eslint-disable react/prop-types */
import { useState,useEffect } from 'react'
import axios from 'axios'

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
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newPhoneNumber,setNewPhoneNumber]=useState('')
  const [searchInput, setSearchInput]=useState('')
  const personList= searchInput===''? persons: persons.filter(person=> person.name.toLowerCase().startsWith(searchInput.toLowerCase()))

  useEffect(()=> {axios.get('http://localhost:3001/persons')
                      .then(response=> {
                        setPersons(response.data)}
                      )},[]                      
)

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
