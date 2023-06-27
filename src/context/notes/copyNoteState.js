import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) =>{
    const s1 ={
        "name":"bioul",
        "class":"sec"
    }
    const [state, setState]= useState(s1);
    const update = () =>{
        setTimeout(() =>{setState({
            "name":"larry",
            "class":"10lb"
        })
        },1000);
    }

    return(
        <NoteContext.Provider value={{state:state, update:update}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;