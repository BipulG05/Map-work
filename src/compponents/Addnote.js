import React, { useContext, useState } from 'react'
import noteContext from "../context/notes/noteContext"


export const Addnote = (props) => {
    const context =useContext(noteContext);
    const {addNote} = context; 
    const [note,setNote] =useState({title:"",description:"",tag:""})
    const handleclick = (e) =>{
         e.preventDefault()
        addNote(note.title,note.description,note.tag);
        setNote({title:"",description:"",tag:""})
        props.showAlert("Note Added Successfully","success");

    }
    const onChange = (e) =>{
        setNote({...note,[e.target.name]:e.target.value});
       // eslint-disable-next-line
    }
  return (
    <div>
        <div className="container card my-3">
            <h2 className='mx-3 my-2'>Add a Note</h2>
            <form className='card-body' onSubmit={handleclick}>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" name='title' className="form-control" minLength={3} onChange={onChange} value={note.title} id="title"  required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" name='tag'  className="form-control" onChange={onChange} minLength={3} value={note.tag} id="tag" required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" name='description'  className="form-control" onChange={onChange} minLength={6} value={note.description} id="description" required/>
                </div>
                <button  type="submit" className="btn btn-primary">Add Note</button>
            </form>
        </div>
    </div>
  )
}
