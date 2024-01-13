import React from "react";
import { useNavigate } from "react-router";
import {Link, useLocation} from "react-router-dom";
 const NavBar=()=>{
   let history=useNavigate();
   const handleClick=()=>
   {
     localStorage.removeItem("token");
     history("/login");
   }
   let location = useLocation();
  return (<div>
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">iNoteBook</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname==="/"? "active": ""}`} aria-current="page" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname==="/about"? "active": ""}`} aria-current="page"  to="/about">About</Link>
            </li>
          </ul>
          {!localStorage.getItem('token')?
          <form className="d-flex">
          <Link className="btn btn-primary mx-1" to="/login" role="button">Login</Link>
                     <Link className="btn btn-primary mx-1" to="/signup" role="button">Signup</Link>
          </form>:<button className="btn btn-primary" onClick={handleClick}>Logout</button>}
        </div>
      </div>
    </nav>


    </div>)
}
export default NavBar
