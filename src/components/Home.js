import React from "react";
import {useContext} from "react";
import noteContext from "../context/notes/NoteContext"
import Notes from "./Notes";
import Alert from "./Alert"

 const Home=(props)=>{
   const {showAlert}=props;
     return (<div >
     <Notes showAlert={showAlert}/>
    </div>)
}
export default Home;
