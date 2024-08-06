import Parts from './parts'

const Course= ({course})=> {
    const sum= course.parts.reduce((sum, part)=> sum+part.exercises,0)
  
    return(
      <div>
        <h1>{course.name}</h1>
        <ul>
            <Parts parts={course.parts}/>
        </ul>
      <p>Total of {sum} exercises</p>
      </div>
    )
  }

  export default Course