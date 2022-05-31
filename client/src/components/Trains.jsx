import React from 'react';
import "../components/tickets.css";

function Trains(props) {


  function handleClick(event){
    event.preventDefault();
    props.bookTicket(props.id);
  }

  return (
    <>
    <div className="container box d-flex flex-column my-3">
        <div className='d-flex flex-row'>
        <h2> Train Name : {props.name} </h2>
        </div>
        <div className='d-flex justify-content-between'>
        <h4>FROM : {props.from}</h4>
        <h4>TO : {props.to}</h4>
        </div>
       
        <div className='text-center my-5'>
           <button onClick={handleClick} className='btn btn-success'>Book ticket</button>
        </div>
    </div>
    </>
  )
}

export default Trains;