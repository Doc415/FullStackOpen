/* eslint-disable react/prop-types */
import { useState,useEffect } from 'react'
import personService from './services/persons'

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

const Persons = ({list,onDelete}) => {

  return(
    <div>
      {list.map( person=>
      <div key={person.id}> <span>{person.name}</span> <span>{person.number}</span>
      <button key={person.id} type='button' onClick={()=>onDelete(person.id)}>Remove</button>
      </div>
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

  useEffect(()=>{personService.getAll().then(initialPersons=> {
                                       setPersons(initialPersons)}
                                    )}     
            ,[])

  const updateSearchResult= (event)=>{
    setSearchInput(event.target.value)

  }
  
  const submitNewName= (event) => {
      event.preventDefault()
      const newPerson={ 
        name: newName,
        number: newPhoneNumber,
        id: `${persons.length+1}`
      }
      if (persons.some(person=> person.name===newPerson.name)){
        alert(`${newName} is already recorded!`)
        return
      }
      personService.createPerson(newPerson)
           .then(response=> {
              console.log(response.data)            
              setPersons(persons.concat(response.data))
              console.log('Recorded successfuly... ')
            })
            .catch(error=> alert('error on creation:',error))

            setNewName('')
            setNewPhoneNumber('')
           
               
  }

  const updateNewPhoneNumber=(event)=>{
    setNewPhoneNumber(event.target.value)
  }

  const updateNewName=(event) => {
    setNewName(event.target.value)
  }

  const onDeletePerson= (id) => {
    if(window.confirm(`This will delete person with id: ${id} Are you sure?`)){
    console.log(id)
    personService.deletePerson(id).then(response=>{
                                            setPersons(persons.filter(person=> person.id!==id))
                                             console.log(response.status) 
                                        })
                                   .catch(error=> alert(error))       
    }                            
  }

  return (
    
    <div>
      <SearchBox input={searchInput} onChange={updateSearchResult}/>
      <h2>Phonebook</h2>
      <PersonForm name={newName} number={newPhoneNumber} onNameChange={updateNewName} onNumberChange={updateNewPhoneNumber} onSubmit={submitNewName}/>
      <h2>Numbers</h2>
      <Persons list={personList} onDelete={onDeletePerson}/>
      
    </div>
  )
}

export default App
