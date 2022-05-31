import React, { useState} from "react";
import {useNavigate} from 'react-router-dom';
import AvailableTrains from "./AvailableTrains";
import "./login.css";


function Login() {

  
  
  let navigate = useNavigate();

    let [username,setUsername] = useState("");
    let [password,setPassword] = useState("");
   
 
    function handleChangeUsername(event) {
        setUsername(event.target.value);                                   // set username and password
        console.log(event.target.value);
    }

    function handleChangePassword(event) {
        setPassword(event.target.value);
        console.log(event.target.value);
    }

    function handleSign(event){
           event.preventDefault();
           navigate("/signin");
    }

    async function handleClick(event){
        event.preventDefault();

        let userx = await fetch("http://localhost:5000/api/auth/login",{
         method: "POST",
         headers: {
           "Content-Type": "application/json"
         },  
         body : JSON.stringify({username: username , password : password})
        });
        
        const newUser = await userx.json();
             console.log(userx);

        if(newUser.success) {
          localStorage.removeItem('token');
          localStorage.setItem('token', newUser.authtoken); 
          navigate("/portal");
        }
        else{
          navigate("/cancel");
        }    
    }

  return (
    <>
    <div className="text-center bodyHtml">
    <form onSubmit={handleClick} class="form-signin">
  <h1 class="h3 mb-3 font-weight-normal">Login</h1>
  <input onChange={handleChangeUsername} value={username} type="text" id="inputEmail" className="form-control" placeholder="Username" required autoFocus/>
  <input onChange={handleChangePassword} value={password} type="text" id="inputPassword" className="form-control" placeholder="Password" required autoFocus/>
  <button class="btn btn-primary btn-block my-2" type="submit" >Log in</button>
  <div className="d-flex flex-row my-3" >
  <p className="mx-1">Don't have an account</p> 
  <a href="#" onClick={handleSign}>create</a>
  </div>
</form>
</div>

<AvailableTrains/>

    </>
  );
}

export default Login;

