import axios from 'axios'
const baseUrl='http://localhost:3001/persons/'

const getAll= ()=> {
    const request=axios.get(baseUrl)
    return request.then(response=>response.data)
}

const createPerson= (newPerson) => {
    return axios.post(baseUrl,newPerson)
}

const deletePerson=  (id) => {
    return axios.delete(`${baseUrl}${id}`)
}

const updatePerson= (person) => {
    return axios.put(`${baseUrl}${person.id}`,person)    
}

export default { getAll, createPerson, deletePerson, updatePerson}
