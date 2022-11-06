import React from 'react'
import { useContext } from 'react'
import notesContext from '../context/notes/notesContext'
const About = () => {
  
    const a = useContext(notesContext)

    return (
    <div>
      
      
      About {a.name} {a.class}</div>
  )
}

export default About