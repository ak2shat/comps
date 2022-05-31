import React from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from './Navbar'

function User(props) {
    let navigate = useNavigate();

    function handleClick(){
        navigate("/");
    }

  return (
    <>
    <Navbar state={"in"} onClick={handleClick} />
    <h3 className="text-center">bookings</h3>
    </>
  )
}

export default User