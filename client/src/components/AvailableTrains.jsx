import React , {useEffect, useState} from 'react';
import Trains from './Trains';

function AvailableTrains() {

    useEffect(()=>{
        callWhenload();
    },[]);

    let [trainArr,setTrainArr] = useState([]);

    async function callWhenload(){
        let trains = await fetch("http://localhost:5000/api/data/trains",{
          method: "GET",
        });
        
        let json  = await trains.json();
        setTrainArr(json);
      }

      async function handleBook(trainID){
          console.log(trainID);
          
          let response = await fetch("http://localhost:5000/api/data/trains/"+ trainID,{
            method : "GET",
          });
             
          let trainInfo = await response.json();
      
          let passengerResult = await fetch("http://localhost:5000/api/data/tickets",{
              method : "GET",
              headers: {
                "auth-token": localStorage.getItem("token")
              }
          });

          let passenger = await passengerResult.json();


         await fetch("http://localhost:5000/api/data/tickets/booking",{
          method : "POST",
          headers : {
            "auth-token" : localStorage.getItem('token'),
            "Content-Type": "application/json"
          },
          body : JSON.stringify({from : trainInfo.from , to : trainInfo.to , train : trainInfo.name , passengerID : passenger.name})
        });
        // await res.json();
        
      }

  return (
       <>
       <h1 className="text-center">Available Trains</h1>
       {
           trainArr.map((element)=>{
            return <Trains name={element.name} id={element._id} date={element.date} bookTicket={handleBook} key={element._id} from={element.from} to={element.to}/>
          })
       }
       </>
  )
}

export default AvailableTrains;