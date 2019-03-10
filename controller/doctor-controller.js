
const request = require("request");
const routes = require("express").Router();


var doctorService = require("../service/doctor-service.js");

routes.get("/", (req,res) =>{
    doctorService.getList(function(doctorList){
        res.send(doctorList);
    });
});

routes.get("/:id", (req,res) =>{
    console.log("Get doctor by id");
    doctorService.getDoctor(req.params.id,function(doctor){
      res.send(doctor);
    })
});

routes.get("/:id/working-hours", (req,res) =>{


    console.log("Get doctor workingHours");
    doctorService.getWorkingHours(req.params.id,function(hours){
      res.send(hours);
    })
});

routes.get("/:id/availability", (req,res) =>{

    console.log("Date string is::"+req.query.date);
    console.log("Get doctor workingHours");
    var dateString = req.query.date;
    doctorService.getAvailableHours(req.params.id, dateString, function(availableHours){
      res.send(availableHours);
    })
});

routes.post("/",function(req, res){
    //send created object as response
    console.log("Inside post requedst");
    console.log(req.body);
    // res.send("success");
    doctorService.addDoctor(req.body, function(response){
        res.send(response);
    });
});

routes.put("/:id",function(req, res){

    //send updated object as response
    console.log("Inside post request");
    console.log(req.body);
    // res.send("success");
    doctorService.updateDoctor(req.params.id, req.body, function(response){
        res.send(response);
    });
});

// request.post("/book/:id")

// routes.post("/",(req,res)=> function(){
//
//   console.log("Input is");
//   res.send("success");
//   // console.log(req.body);
// });

module.exports = routes;
