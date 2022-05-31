import React, { useState} from "react";
import {useNavigate} from 'react-router-dom';
import "./login.css";


function Signin() {
  
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

    async function handleClick(event){

        event.preventDefault();

        await fetch("http://localhost:5000/api/auth/createUser",{
         method: "POST",
         headers: {
           "Content-Type": "application/json"
         },  
         body : JSON.stringify({username: username , password : password})
        });
        
        

         alert("Successfully created , Now login!");
         navigate("/");
    }

  return (
    <>
    <div className="text-center bodyHtml">
    <form onSubmit={handleClick} class="form-signin">
  <h1 class="h3 mb-3 font-weight-normal">Signin</h1>
  <input onChange={handleChangeUsername} value={username} type="text" id="inputEmail" className="form-control" placeholder="Username" required autoFocus/>
  <input onChange={handleChangePassword} value={password} type="text" id="inputPassword" className="form-control" placeholder="Password" required autoFocus/>
  <button class="btn btn-primary btn-block my-2 buttons" type="submit" >create</button>
  <div className="d-flex flex-row my-3" >
  </div>
</form>
</div>
    </>
  );
}

export default Signin;