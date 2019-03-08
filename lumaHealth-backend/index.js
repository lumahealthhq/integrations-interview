var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json());

var {Doctors} = require('./models/doctor');
var {Users} = require('./models/user');
var {Patients} = require('./models/patient');
var {mongoose} = require('./db/mongoose');



app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
});


app.post('/login', (req,res) =>{
    var username = req.body.username;
    var password = req.body.password;
    console.log("Username:",username + " password:",password);
    if(username === "admin" && password === "admin"){
        console.log("Match");
    }
    //console.log(Users.insertMany({username:req.body.username, password:req.body.password}));
    Users.findOne({
        username:req.body.username
    }, function(err,user){
        if (err) {
            res.code = "400";
            res.value = "The email and password you entered did not match our records. Please double-check and try again.";
            console.log(res.value);
            res.sendStatus(400).end(); 
        } else if(user && user.password == req.body.password){
            res.code = "200";
            res.value = user;
            console.log("Login successful");
            res.cookie('cookie',"admin",{maxAge: 900000, httpOnly: false, path : '/'});
            res.sendStatus(200).end();
        }
    })
})

app.get('/home',(req,res)=>{
    Doctors.find().then((Doctors)=>{
        res.code = "200";
        console.log(Doctors);
        res.send({Doctors});
    },(err) => {
        res.code = "400";
        res.send("Bad Request");
    })
})

app.post('/create',(req,res)=>{
    var doctor = new Doctors({
        Email : req.body.email,
        Name : req.body.name,
    });

    doctor.save().then((doctor)=>{
        console.log("Doctor created : ",doctor);
        res.sendStatus(200).end();
    },(err)=>{
        console.log("Error Creating Doctor");
        res.sendStatus(400).end();
    })
})

app.post('/add_hours',(req,res)=>{
    console.log("value :" + req.body.selecteddoctor);
    console.log(req.body.day);
    console.log(req.body.slots);
    var arr = req.body.slots;
    var Day = req.body.day.value;
    var query = {};
    query[Day] = [];
    var x;
   Doctors.findOneAndUpdate({"Name": req.body.selecteddoctor}, {$set :  query},  function(err,doc) {
        if (err) { throw err; }
        else { console.log("Updated"); 
        if (arr!=null){
            console.log(arr);
             for (x in arr){
                console.log("values:" , req.body.slots[x]);
                var query1 = {}; 
                query1[Day] = [{"slot" : req.body.slots[x], "status" : "Available"}]; 
                Doctors.findOneAndUpdate({"Name": req.body.selecteddoctor}, {$push :  query1},  function(err,doc) {
                    if (err) { throw err; }
                    else { console.log("Updated"); }
                  });
            } 
        }}
      });  



})

app.post('/book',(req,res)=>{ 
    var patient = new Patients({
        Email : req.body.email,
        Name : req.body.name,
    });

    patient.save().then((patient)=>{
        console.log("patient created : ",patient);
        res.sendStatus(200).end();
    },(err)=>{
        console.log("Error Creating patient");
        //res.sendStatus(400).end();
    })
    console.log("value :" + req.body.selecteddoctor);
    console.log(req.body.day);
    console.log(req.body.selectedslot);
  var Day = req.body.day.value;
   Doctors.findOne({
       'Name' : req.body.selecteddoctor
   }, (err, user) => {
     for(var i=0;i<user[Day].length;i++){
        if(user[Day][i].slot === req.body.selectedslot){
        if(user[Day][i].status == "Available"){
        user[Day][i].status = "Booked";
        user.save().then((doc) => {
            console.log("User details saved successfully.", doc);
            }, (err) => {
            console.log("Unable to save user details.", err);
            });
    
    }
        else {
        console.log("Appointmemt already booked");
        res.sendStatus(400).end();
        }
        }

        } 
        //console.log(user[Day]);
        });
})

app.listen(3001,()=>{
    console.log("Server Listening on port 3001");
})