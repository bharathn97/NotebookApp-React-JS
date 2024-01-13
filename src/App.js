import {useState} from "react"
import './App.css';
import NavBar from "./components/NavBar"
import Home from "./components/Home"
import About from "./components/About"
import NoteState from "./context/notes/NoteState"
import Alert from "./components/Alert"
import Signup from './components/Signup';
import Login from './components/Login';
import {
  BrowserRouter as Router,
Routes,
Route,
Link }from "react-router-dom"
function App() {
  const [alert,setAlert]=useState(null);
  const showAlert=(message,type)=>
  {setAlert({
    msg:message,
    type:type
  })
   setTimeout(()=>
   {
     setAlert(null);
   },1500);
}

  return (
    <>
    <NoteState>
    <Router>
    <NavBar/>
    <Alert alert={alert}/>
    <div className="container">
    <Routes>
    <Route exact path="/" element={<Home showAlert={showAlert}/>}/>
    <Route exact path="/about" element={<About/>}/>
    <Route exact path="/signup" element={<Signup  showAlert={showAlert}/>}/>
    <Route exact path="/login" element={<Login  showAlert={showAlert}/>}/>
    </Routes>
    </div>
    </Router>
    </NoteState>
    </>
  );
}

export default App;
