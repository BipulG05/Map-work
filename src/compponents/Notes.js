import React, { useContext,useState,useEffect,useRef }  from 'react'
import { useHistory } from 'react-router-dom';
import noteContext from "../context/notes/noteContext"
import { Addnote } from './Addnote';
import { Noteitem } from './Noteitem';


export const Notes = (props) => {
    const context =useContext(noteContext);
    const {notes,getNotes,editNote} = context;
    let history = useHistory();
    useEffect(()=>{
      if(localStorage.getItem('token')){
        getNotes();
      }else{
        history.push("/login");
      }
       // eslint-disable-next-line
    },[])
    const ref = useRef(null)
    const refClose = useRef(null)
    const updateNote =(currentNote) =>{
      ref.current.click();
      setNote({id:currentNote._id,Etitle:currentNote.title,Edescription:currentNote.description,Etag:currentNote.tag});
      
    }
    const [note,setNote] =useState({id:"",Etitle:"",Edescription:"",Etag:""})

    const onChange = (e) =>{
      setNote({...note,[e.target.name]:e.target.value});
     // eslint-disable-next-line
    }
    const handleclick = (e) =>{
        // console.log("starys",note);
        editNote(note.id,note.Etitle,note.Edescription,note.Etag);
        refClose.current.click();
        props.showAlert("Note Updated Successfully","success");

        // e.preventDefault()
        // addNote(note.title,note.description,note.tag);
    }
  return (
    <>
        <Addnote showAlert={props.showAlert} />
        <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
          Launch demo modal
        </button>
        <div className="modal fade" id="exampleModal" tabIndex="-1"  aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <form className='card-body'>
                  <div className="mb-3">
                      <label htmlFor="Etitle" className="form-label">Title</label>
                      <input type="text" name='Etitle' className="form-control" minLength={3} onChange={onChange} id="Etitle" value={note.Etitle}  required/>
                  </div>
                  <div className="mb-3">
                      <label htmlFor="Etag" className="form-label">Tag</label>
                      <input type="text" name='Etag'  className="form-control" minLength={3} onChange={onChange} value={note.Etag}  id="Etag" required/>
                  </div>
                  <div className="mb-3">
                      <label htmlFor="Edescription" className="form-label">Description</label>
                      <input type="text" name='Edescription' minLength={3}  className="form-control" onChange={onChange} value={note.Edescription}  id="Edescription" required/>
                  </div>
              </form>
              </div>
              <div className="modal-footer">
                <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" onClick={handleclick} className="btn btn-primary">Update Note</button>
              </div>
            </div>
          </div>
        </div>
        <div className="row my-3">
            <h2>Your Note</h2>
            <div className="mx-3" style={{color:'red'}}>
            {notes.length ===0 && 'No notes to display'}</div>
            {notes.map((note)=>{
            return <Noteitem key={note._id} updateNote={updateNote} notes={note} showAlert={props.showAlert} />
            })}
        </div>
    </>
  )
}
