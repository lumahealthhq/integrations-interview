// import require packages
var express = require('express')
var app = express()

// for remote access allowance
var cors = require('cors')

// to parse Http request data
var bodyParser = require('body-parser')

app.use(bodyParser.json())

app.use(cors
    ({
        origin : 'http://localhost:3000',
        credentials : true
    })
)
module.exports = app

// static data to stora doctors and their timings
var doctors = [
    {  
        'name' : 'Dr Hulk',
        hours : [
            {
                '10AM to 12PM' : true ,
                '2PM to 5PM' : false 
            },
            {
                '10AM to 12PM' : false ,
                '2PM to 5PM' : true 
            },
            {
                '10AM to 12PM' : false,
                '2PM to 5PM' : false 
            },
            {
                '10AM to 12PM' : true,
                '2PM to 5PM' : true
            },
            {   
                '10AM to 12PM' : true,
                '2PM to 5PM' : true 
            }
        ]
    },
    {  
        'name' : 'Dr Thanos',
        hours : [
            {
                '10AM to 12PM' : true ,
                '2PM to 5PM' : false 
            },
            {
                '10AM to 12PM' : true,
                '2PM to 5PM' : true 
            },
            {
                '10AM to 12PM' : false,
                '2PM to 5PM' : false 
            },
            {
                '10AM to 12PM' : 'none',
                '2PM to 5PM' : 'none' 
            },
            {   
                '10AM to 12PM' : true,
                '2PM to 5PM' : true 
            }
        ]
    }
]

// store all appointments
var appointments = {}

// array to store days
var days = ['Monday','Tuesday','Wednesday','Thursday','Friday']

// convert day to apporpriate id
function idForDay(day) {
    var id = 0;
    if(day == 'Monday')
        id = 0;
    else  if(day == 'Tuesday')
        id = 1;
    else if(day == 'Wednesday')
        id = 2;
    else if(day == 'Thursday')
        id = 3;
    else if(day == 'Thursday')
        id = 4;
    return id;
}

// find the doctor from dictionory
function findDoctor(doctor) {
    var doctor_hours = null
    for(let i = 0; i < doctors.length; i++) {
        if(doctors[i].name == doctor) {
            doctor_hours = doctors[i].hours
        }
    }
    return doctor_hours
}

// #1: get doctor's working hours
app.get('/doctors/getAvailableHours', function(req,res){

    // data from REST request
    var doctor = req.body.doctor    

    console.log(' This is method to get doctor\'s hours ')
    console.log(' name of doctor : ' + doctor)

    // find the doctor
    var doctor_hours = null
    var flag = false
    for(let i = 0; i < doctors.length; i++) {
        if(doctors[i].name == doctor) {
            doctor_hours = doctors[i].hours
            flag = true
        }
    }

    var sendData = {}
    if(flag == false) {             // if no any doctor found
        sendData = {
            status : 400
        }
    } else {
        // fetching hours to show
        // static data entry
        for(var i = 0; i < doctor_hours.length; i++) {
            var p = doctor_hours[i];
            if(p['10AM to 12PM'] != 'none' && p['2PM to 5PM'] != 'none' ){
                if(doctor_hours[i]['10AM to 12PM'] != false || doctor_hours[i]['2PM to 5PM'] != false) {
                    if(p['10AM to 12PM'] == true && p['2PM to 5PM'] == true)
                        sendData[days[i]] = '10AM to 12PM , 2PM to 5PM';
                    if(p['10AM to 12PM'] == true && p['2PM to 5PM'] == false)
                        sendData[days[i]] = '10AM to 12PM';
                    if(p['10AM to 12PM'] == false && p['2PM to 5PM'] == true)
                        sendData[days[i]] = '2PM to 5PM';
                    }
                }
            }
        }

    console.log(sendData)

    res.send(JSON.stringify(sendData))
})


// #2: Book an doctor opening 
// or book an appointment
app.post('/appointment/book', function(req,res){

    // data from REST request
    var doctor = req.body.doctor
    var day = req.body.day
    var patient = req.body.patient
    var timing = req.body.timing

    console.log(' This is method to book an appointment ')
   // storing the data into appointment Object
   appointments['doctor_name'] = doctor
   appointments['patient_name'] = patient
   appointments['day'] = day
   appointments['timing'] = timing
ba

   let id = idForDay(day)

    var doctor_hours = findDoctor(doctor)

    console.log(' before change : ' + JSON.stringify(doctor_hours[id]))

    // changes in doctor's available hours
    doctor_hours[id][timing] = false
    
    console.log(' before change : ' + JSON.stringify(doctor_hours[id]))
    console.log(" Appointments : " + JSON.stringify(appointments))

    res.sendStatus(200)
})

// #3.1: add doctor's working hours
app.post('/doctors/addHours', function(req,res){
    
    // data from REST request
    var doctor = req.body.doctor
    var day = req.body.day
    var addHour = req.body.addHour
    
    console.log(' This is method to add doctor\'s hours ')
    var doctor_hours = findDoctor(doctor)

    let id = idForDay(day)

    console.log(' before change : ' + JSON.stringify(doctor_hours[id]))

    // add hours in appropriate day entry
    doctor_hours[id][addHour] = true
   
    console.log(' After change : ' + JSON.stringify(doctor_hours[id]))

    res.sendStatus(200)
})

// #3.2 update doctor's working hours
app.put('/doctors/updateHours', function(req,res) {
    
    // data from REST request
    var doctor = req.body.doctor
    var day = req.body.day
    var addHour = req.body.addHour
    
    // fetching updated hours
    let arr = addHour.split(',')
    
    const updatedHours = {}
    for(let k = 0; k < arr.length; k++) 
        updatedHours[arr[k]] = true

  
    var doctor_hours = findDoctor(doctor)
    
    let id = idForDay(day)

    console.log(' before change : ' + JSON.stringify(doctor_hours[id]))
 
    doctor_hours[id] = updatedHours

    console.log(' after change : ' + JSON.stringify(doctor_hours[id]))

    res.sendStatus(200)
})

// port number to run where node application listen the incoming calls
app.listen(3001)
console.log(' Listening on port #3001 ')
