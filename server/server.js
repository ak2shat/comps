const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "hack_kar_ke_dikha";
let fetchuser = require('./midlleware/fetchuser');

               // we have not used the validation criteria yet, to use please refer express-validator

app.use(express.json());                    // for post requests to get data from req.body

app.use(bodyParser.urlencoded({extended : true}));

app.use(cors());

mongoose.connect("mongodb://localhost:27017/myProject");

const userSchema = new mongoose.Schema({
    username :{
        type : String,
        unique :true,
        require : true,
     },                                                                 
    password : String, 
 });
                                                                                    // userSchema
const User = mongoose.model("User",userSchema);

const ticketSchema = new mongoose.Schema({
   from : String,
   to : String,
   date : Date,
   train : String,
   passengerID : {
       type : mongoose.Schema.Types.ObjectId,
       ref : 'user'
   },
//    passengerName : {
//        type : mongoose.Schema.Types.username,
//        res : 'user'
//    }
});

const Ticket = mongoose.model("Ticket",ticketSchema);

const trainSchema = new mongoose.Schema({
    from : String,
    to : String,
    name : String,
    date : Date,
 });
 
const Train = mongoose.model("Train",trainSchema);


app.get("/api/data/userdetails", fetchuser ,async (req, res) => {
    
    let passengerID = req.user.id;
    let user = await User.findById(passengerID).select("-password");

    // let details = await user.json();
    // res.json(details);

    res.send(user);

});

app.post("/api/auth/login", async function (req, res) {
    let success = false;
                      
    let userXname = req.body.username;

    
    let userX = await User.findOne({ username: userXname });

    if(!userX){
          res.status(400).json({success : success});
    }
    else{

        let bcryptPass = await bcrypt.compare(req.body.password , userX.password);

        if(!bcryptPass){
            res.status(400).json({success: success});
        }
        else{
            success = true;

            let data = {
                user : {
                    id : userX.id
                }
            }
            // user ki id woh kardo jo response is id ayi hai kyuki zyada fast ho jayega data retrieval
            let authtoken = jwt.sign(data , JWT_SECRET);

            res.json({success : success , authtoken: authtoken}).status(200);
        }

    }

});

app.post("/api/auth/createUser", async function (req, res) {

    let userXname = req.body.username;
    
    
    let userX = await User.findOne({ username: userXname });

    if(userX){
          res.status(400).send("please enter valid credentials");
    }
    else{

        const salt = await bcrypt.genSalt(10);    // 10 is how many permutation of a salt
        let sercuredPassword = await bcrypt.hash(req.body.password, salt);

        let newUser = new User({
            username : req.body.username,
            password : sercuredPassword
        });
    
        let response = await newUser.save();

        let data = {
            user : {
                id : response.id
            }
        }
        // user ki id woh kardo jo response is id ayi hai kyuki zyada fast ho jayega data retrieval
        let authtoken = jwt.sign(data , JWT_SECRET);

        res.json({authtoken});

    }
});

// get user's details , this will require authentication and will return the booked tickets
app.get("/api/data/tickets",fetchuser,async (req,res)=>{

    let passengerID = req.user.id;
    let passenger = await Ticket.find({passengerID: passengerID});
    
    res.json({name : passengerID,tickets : passenger});

});

app.post("/api/data/tickets/booking",fetchuser,async (req,res)=>{
    
    let passengerID = req.user.id;
    let date = new Date();

    let newTicket = await Ticket({
        from : req.body.from,
        to : req.body.to,
        train : req.body.train,
        date : date,
        passengerID : passengerID,
    });
     await newTicket.save();
     res.send(newTicket).status(200);

});

app.post("/api/data/tickets/cancel/:ticketID",fetchuser,async (req,res)=>{
    
    let passengerID = req.user.id;
    await Ticket.findByIdAndDelete(req.params.ticketID);
    let updatedTickets = await Ticket.find({passengerID: passengerID});
    res.json({name : passengerID,tickets : updatedTickets});
    
});

// trains will show upsdflknsdocih
app.get("/api/data/trains", async (req,res)=>{

    let trains = await Train.find();

    res.json(trains);

});


app.get("/api/data/trains/:TrainID", async (req,res)=>{

   let train = await Train.findById(req.params.TrainID);

    res.json(train);

});

// ADMIN (in this IRCTC have access)

app.post("/api/data/trains", async (req,res)=>{

    let date = new Date();

    let train = new Train({
        from : req.body.from,
        to : req.body.to,
        name : req.body.name,
        date : date
    });

    await train.save();
    res.send("train has been added");

});

app.listen(5000,()=>{
 console.log("Server is running on port 5000");
});