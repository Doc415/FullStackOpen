import Part from './part'

const Parts=({parts})=>{
    console.log(parts)
    return(
      parts.map(part=>
        <Part key={part.id} part={part}/>
      )
    )
  }

  export default Parts