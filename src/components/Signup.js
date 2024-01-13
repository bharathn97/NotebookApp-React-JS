import React, {useState} from 'react'
import { useNavigate } from "react-router";
import Alert from "./Alert"

const Signup = (props) => {
  const [credentials, setCredentials] = useState({name:"",email: "", password: "",confirmpassword:""})
  let history = useNavigate();
  const handleSubmit = async (e) => {
      e.preventDefault();
      const response = await fetch("http://localhost:6400/api/auth/createuser", {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({name: credentials.name,email: credentials.email, password: credentials.password})
      });
      const json = await response.json()
      console.log(json);
      if (json.success){
          localStorage.setItem('token', json.authtoken);
          history("/");
          props.showAlert("Account created successfully","success");
      }
      else{
          props.showAlert("Invalid Credentials","danger");
      }
  }

  const onChange = (e)=>{
      setCredentials({...credentials, [e.target.name]: e.target.value})
  }

    return (
        <div className="mt-3">
        <h2>SignUp to iNoteBook</h2>>
        <form onSubmit={handleSubmit}>
        <div class="form-group">
        <label htmlFor="name">Name</label>
        <input type="text" class="form-control" id="name" aria-describedby="emailHelp" name="name" onChange={onChange} placeholder="Enter Name"/>
        </div>
<div class="form-group">
<label htmlFor="exampleInputEmail1">Email address</label>
<input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="email" onChange={onChange} placeholder="Enter email"/>
<small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
</div>
<div class="form-group">
<label htmlFor="exampleInputPassword1">Password</label>
<input type="password" class="form-control" id="exampleInputPassword1" name="password" onChange={onChange} placeholder="Password"/>
</div>
<div class="form-group">
<label htmlFor="ConfirmPassword">Confirm Password</label>
<input type="password" class="form-control" id="ConfirmPassword" onChange={onChange} name="confirmpassword" placeholder="Confirm Password"/>
</div>
<button type="submit" class="btn btn-primary">Submit</button>
</form>
        </div>
    )
}

export default Signup
