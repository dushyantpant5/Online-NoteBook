import React ,{useContext,useState}from 'react'
import noteContext from "../context/notes/notesContext";
const AddNote = () => {
    const context = useContext(noteContext);
    const {addNote} = context;
    const [note, setnote] = useState({title:"",description:"",tag:""})
    const handleClick = (e) =>{
        e.preventDefault();
        addNote(note.title,note.description);
        setnote({title:"",description:"",tag:""});
    }

    const handleChange = (e)=>{
        setnote({...note,[e.target.name] : e.target.value})
    }

    return (
    <div>
         <div className="container my-3">
        <h2>Enter a Note</h2>

        <form className="my-3">
          <div className="mb-3">
            <label htmlFor="title" className="form-label" >
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              value={note.title}
              aria-describedby="emailHelp"
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <input
              type="text"
              className="form-control"
              id="description"
              name="description"
              value={note.description}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label">
              Tag
            </label>
            <input
              type="text"
              className="form-control"
              id="tag"
              name="tag"
              value={note.tag}
              onChange={handleChange}
            />
          </div>
          
          <button disabled = {note.title.length<5 || note.description.length<5}  type="submit" className="btn btn-primary" onClick={handleClick}>
            Add Note
          </button>
        </form>

        
      </div>
    </div>
  )
}

export default AddNote