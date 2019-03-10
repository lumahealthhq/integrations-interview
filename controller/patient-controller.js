const request = require("request");
const routes = require("express").Router();


var patientService = require("../service/patient-service.js");

routes.get("/", (req,res) =>{
    patientService.getList(function(patientList){
        res.send(patientList);
    });
});

routes.post("/",function(req, res){
    console.log("Inside post requedst");
    console.log(req.body);
    patientService.addPatient(req.body, function(response){
        res.send(response);
    });
});

module.exports = routes;
