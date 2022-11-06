import React, { useContext } from "react";
import notesContext  from "../context/notes/notesContext";

const NoteItem = (props) => {
  const context = useContext(notesContext);
  const {delNote} = context;
  const { note,updateNote} = props;

  const handleDel = () =>{
    delNote(note._id);
  } 

  const handldeUpdate = () =>{
    updateNote(note);
  }

  return (
    <div className="col-md-3">
      <div className="card my-3">
       <div className="card-body">
          <h5 className="card-title">{note.title}</h5>
          <p className="card-text">
           {note.description}
          </p>
          <i className="fa-solid fa-trash-can mx-2" onClick={handleDel}></i>
          <i className="fa-regular fa-pen-to-square mx-2" onClick={handldeUpdate}></i>
        </div>  
      </div>
    </div>
  );
};

export default NoteItem;
