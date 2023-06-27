import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) =>{
  //localhost 35.78.198.145
  const host = "http://35.78.198.145:5000"
    // const notesInitial =[
    //     {
    //       "_id": "63b6ed450273fc0725f3c60c",
    //       "user": "63b5d83e565d4c83300150a8",
    //       "title": "MY app",
    //       "description": "Thiis is a app",
    //       "tag": "Make Application",
    //       "date": "2023-01-05T15:31:17.069Z",
    //       "__v": 0
    //     },
    //     {
    //       "_id": "63b7080a1675375a36fb992e",
    //       "user": "63b5d83e565d4c83300150a8",
    //       "title": "MY app",
    //       "description": "Thiis is a app",
    //       "tag": "Make Application",
    //       "date": "2023-01-05T17:25:30.170Z",
    //       "__v": 0
    //     },
    //     {
    //         "_id": "63b7080a1675375a36fb1992e",
    //         "user": "63b5d83e565d4c83300150a8",
    //         "title": "MY app",
    //         "description": "Thiis is a app",
    //         "tag": "Make Application",
    //         "date": "2023-01-05T17:25:30.170Z",
    //         "__v": 0
    //       },
    //       {
    //         "_id": "63b7080a16753725a36fb992e",
    //         "user": "63b5d83e565d4c83300150a8",
    //         "title": "MY app",
    //         "description": "Thiis is a app",
    //         "tag": "Make Application",
    //         "date": "2023-01-05T17:25:30.170Z",
    //         "__v": 0
    //       },
    //       {
    //         "_id": "63b7080a16735375a36fb992e",
    //         "user": "63b5d83e565d4c83300150a8",
    //         "title": "MY app",
    //         "description": "Thiis is a app",
    //         "tag": "Make Application",
    //         "date": "2023-01-05T17:25:30.170Z",
    //         "__v": 0
    //       },
    //       {
    //         "_id": "63b7080a16754375a36fb992e",
    //         "user": "63b5d83e565d4c83300150a8",
    //         "title": "MY app",
    //         "description": "Thiis is a app",
    //         "tag": "Make Application",
    //         "date": "2023-01-05T17:25:30.170Z",
    //         "__v": 0
    //       }
    //   ]
      const notesInitial =[]
      const [notes,setNotes] = useState(notesInitial)
       //Get all notes
       const getNotes = async () =>{
          const response = await fetch(`${host}/api/notes/fetchnotes`, {
            method: 'GET', 
            headers: {
              // 'Content-Type': 'application/json',
              'auth-token':localStorage.getItem('token')
            },
          // body: JSON.stringify({title,description,tag}) 
          });
          const json = await response.json()
          // console.log(json);
          setNotes(json);
      }

      //Add a note
      const addNote = async (title,description,tag) =>{
  
        ///api call
          const response = await fetch(`${host}/api/notes/addnote`, {
            method: 'POST', 
            headers: {
              'Content-Type': 'application/json',
              'auth-token':localStorage.getItem('token'),

            },
          body: JSON.stringify({title,description,tag}) 
          });
          const note = await response.json();
          // getNotes()
          setNotes(notes.concat(note));
      }


      //Delete a note
      const deleteNote = async (id) =>{
        // Api call
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
          method: 'DELETE', 
          headers: {
            'Content-Type': 'application/json',
            'auth-token':localStorage.getItem('token'),

          },
        });
        const json = response.json(); 
        console.log(json)

        // console.log("delete "+id);
        const newNotes = notes.filter((note)=>{return note._id!==id})
        setNotes(newNotes)
      }


      //Edit a note
      const editNote = async (id,title,description,tag) =>{
        ///api call
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
          method: 'PUT', 
          headers: {
            'Content-Type': 'application/json',
            'auth-token':localStorage.getItem('token'),

          },
         body: JSON.stringify({id,title,description,tag}) 
        });
        const json = await response.json(); 
        console.log(json);
        let newNotes = JSON.parse(JSON.stringify(notes));
        //logic to edit in client
      for (let index=0;index<newNotes.length;index++){
          const element = newNotes[index];
          if(element.id===id){
            newNotes.title=title;
            newNotes.description=description;
            newNotes.tag=tag;
            break;
          }
      }
      setNotes(newNotes);
      getNotes()

    }

    return(
        <NoteContext.Provider value={{notes,addNote,getNotes,editNote,deleteNote,setNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;