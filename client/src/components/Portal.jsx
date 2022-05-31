import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import AvailableTrains from './AvailableTrains';
import Navbar from './Navbar';
import Booking from './Booking';

function Portal(props) {
  useEffect(()=>{
    callWhenload();
},[]);

  let navigate = useNavigate();

  let [username,setUsername] = useState("");
  let [tickets,setTicket] = useState([]);
  let [state,setState] = useState(false);

  function handleClick(){
    localStorage.removeItem("token");
      navigate("/");
  }

  async function callWhenload(){
    // console.log("your true name is " + username);

         let response = await fetch("http://localhost:5000/api/data/tickets",{
           method : "GET",
           headers : {
             "auth-token" : localStorage.getItem("token")
           }
         });
        //  console.log("your true name is 2nd" + username);
          // console.log(response);

        let json = await response.json();

        let userdetails = await fetch("http://localhost:5000/api/data/userdetails",{
          method : "GET",
          headers : {
            "auth-token" : localStorage.getItem("token")
          }
        });
        let res = await userdetails.json();
        setUsername(res.username);
        setTicket(json.tickets);
  }
  async function handleCancelTicket(id){
    alert("Are you sure you want to cancel");
    console.log("ticket id is " + id);

    console.log("Cancelled");

   
    let cancelledTicket = await fetch("http://localhost:5000/api/data/tickets/cancel/" + id,{
       method : "POST",
       headers : {
         "auth-token" : localStorage.getItem('token')
       }
    });

    console.log("Cancelled1");
   
    let updatedArray = await cancelledTicket.json();

    setTicket(updatedArray.tickets);
    // callWhenload();

    console.log("ticket id is " + id);
  }
  function handleState(){
         setState(!state);
  }
  // let [tickets,setTicket] = useState([]);

  return (
    <>
    <Navbar state={"out"} name={username} onClick={handleClick} />
    <h3 className="text-center">Your Bookings</h3>
    <div>
    {
       tickets.map((element)=>{
        return <Booking name={element.train} id={element._id} key={element._id} cancelTicket={handleCancelTicket} from={element.from} to={element.to}/>
      })
    }
    </div>
    <div  className="text-center">
      
    
    <button onClick={handleState} className="btn btn-primary">{!state ? "Show Trains" : "hide Trains"}</button>
    </div>
    {
      state ? <AvailableTrains/> : null
    }
    </>
  )
}

export default Portal;