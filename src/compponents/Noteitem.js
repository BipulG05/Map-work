import React,{useContext} from 'react'
import noteContext from "../context/notes/noteContext"


export const Noteitem = (props) => {
        const context =useContext(noteContext);
        const {deleteNote} = context; 
        const {notes,updateNote} = props;
  return (
    <div className='col-md-4'>
        <div className="card my-3">
            <div className="card-body">
                <h5 className="card-title"><strong>Title : </strong>{notes.title}</h5>
            </div>
            <ul className="list-group list-group-flush">
                <li className="list-group-item"><strong>Tag : </strong>{notes.tag}</li>
                <li className="list-group-item"><p className="card-text"><strong>Description : </strong>{notes.description}</p></li>
                <li className="list-group-item"><strong>Date : </strong>{notes.date}</li>
            </ul>
            <div className="card-body">
                <i className="fa-sharp fa-solid fa-file-pen card-link mx-2" onClick={()=>{updateNote(notes)}}></i>
                <i className="fa-solid fa-trash-can card-link " onClick={()=>{deleteNote(notes._id);props.showAlert("Note Deleted Successfully","success");}}></i>
            </div>
        </div>
    </div>
  )
}
