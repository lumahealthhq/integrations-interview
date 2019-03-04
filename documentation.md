# Luma Technical Interview

This is a simple REST API to manage appointments with doctors and manage their schedules for upto a week.

## Features
* view all the doctors and track their hours of availability.
* book an appointment with a doctor of your choice.
* track the appointments.


## Instructions

### Start the server

Go to the root directory of the application and run the following command to start the server (at port 1234).  
```
npm start
``` 

### API usage

#### Add a doctor

Each doctor by default has a set working hours which are stored in `data/defaulthours.json`. To add a doctor, all you need is his name. The following are the strcutures of the POST request and its body.    

```
POST http://localhost:1234/doctors/add
```  
```
{ name: NAME-OF-THE-DOCTOR }
```  

This way, you can add as many doctorrs as you want.

#### View all the doctors' information

The data corresponding to all the doctors (id, name, and available hours) is sent as a JSON on using the following `GET` request.    
```
GET http://localhost:1234/doctors/all
```

#### Book an appointment

To book an appointment with a doctor, use the `PUT` request as below.
```
PUT http://localhost:1234/doctors/bookappointment
```

The body of the request is 
```
{
    id: ID-OF-THE-DOCTOR,
    day: DAY,
    start: START-TIME,
    end: END-TIME
}
```

An example of the body would be
```
{
    id: '5c7afc46c897704ec32c227d',
    day: 'Monday',
    start: '09:00',
    end: '09:30'
}
```
The `start` and the `end` times are in 24-hour format and day could be one of `{Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday}`. You can also verify the appointment by checking the doctor's available hours later. This request would return a JSON that looks like
```
{
    "_id": ID-OF-THE-APPOINTMENT,
    "doctor": NAME-OF-THE-DOCTOR,
    "start": "09:00",
    "end": "09:30",
    "day": "Monday"
}
```

#### View appointments

To fetch all the appointments in a JSON, use the `GET` request as below.  
```
GET http://localhost:1234/appointments/all
```

### Testing

To run the tests, run the following command in the project's root direectory.
```
npm test
```

## Tools used
 
**REST API**: Node.JS, Express  
**Database:** MongoDB, Mongoose  
**Testing:** Mocha, Chai


## Limitations

* This API suppports booking an appointment with a doctor and managing his schedule only for a week.
* The working hours of a doctor are initially set to a default value.