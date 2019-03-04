# Luma Smart Health APIs

## Solution

Luma SmartHealth Schedule will help you manage doctor's work schedules, calculate total workhour of the doctor, track patient's appointments both in the past and upcoming.
It will also help you to easily find free schedule of any doctor and allow the patient to book on an empty slot based on the doctor work hour.
With the solution, you can totally track all doctor appointments, patient appointments, and calculate total hours of work of the doctor.

Here's a sample story at the hospital.
1. First, start with finding doctor free schedules from start date to end date. (API: findFreeSchedule)
2. Then a patient want to book an appointment for doctor "A" which can also be any specific doctor. (API: addAppointment)
3. After booked the appointment, the patient can also check all their appointments with the hospital. (API: getPatientAppointments)
4. But the patient want to change their appointment time to another day. (API: updateAppointment)
5. Another patient want to cancel one of their appointment at the pospital. (API: updateAppointment)
6. the third patient want to book an appointment for doctor "A", but the system replied "Doctor's Schedule already booked!" (API: addAppointment)
7. The doctor want to see all his current and previous appointments. (API: getDoctorAppointments)
8. The doctor finally want to know his total work hours for this month. (API: getWorkHour)

There are a lot more cases, please find APIs for more details

## Tech Stack

1. Node.js
2. MongoDB - The databaseis deployed on Cloud (MongoDB Atlas)
3. Mocha - Test Framework

## Code Structure
App.js --> routes --> controllers --> models (logic)

## Data Model
The data models include:

* Appointment
Schema({
  details : {
    doctorId : {
      type :     Number,
      required : true,
    },
    patientId : {
      type :     Number,
      required : true,
    }
  },
  assistant :             {type: [Number], required: false}, // Assists doctors
  start :                 {type: Date, required: true},
  end :                   {type: Date, required: true},
  hour :                  {type: Number, required: false}, // Will be recorded after finished the appointment
  min :                   {type: Number, required: false},
  diagnose :              {type: String, required: false},
  parrent :               {type: String, required: false}, // another case _id
  cancel :                {type: Boolean, required: true}, //false : not cancel, true: canceled
  updatedAt :             {type: Date, required: false},
})

* doctor
Schema({
  doctorId :              {type: Number, required: true, unique: true},
  firstName :             {type: String, required: true},
  lastName :              {type: String, required: true},
  gender :                {type: String, required: true},
  scheduleType :          {type: Number, required: true}, //1. 8:00 - 17:00 2. 17:00 - 24:00
  specialties :           {type: [Number], required: false}, //1. Cardiothoracic Radiology 2. Hand Surgery 
  updatedAt :             {type: Date, required: false}
})

* patient
Schema({
  patientId :             {type: Number, required: true, unique: true},
  firstName :             {type: String, required: true},
  lastName :              {type: String, required: true},
  gender :                {type: String, required: true},
  weight :                {type: Number, required: true},
  height :                {type: Number, required: true},
  origin :                {type: Number, required: true}, //1. Asian 2. Latino
  allergic :              {type: [Number], required: false},
  updatedAt :             {type: Date, required: false}
})

* Schedule
Schema({
  scheduleId :              {type: Number, required: true, unique: true},
  from :                    {type: Number, required: true},
  to :                      {type: Number, required: true},
  details :                 {type: String, required: false},
  updatedAt :               {type: Date, required: false}
})

The Hilight part is in the appointment model

## APIs List (17 services)

Appointments
* [GET] appointment/                    - Get all appointments
* [GET] appointment/doctorAppointments  - Get doctor's upcoming appointments (patient's id can be specified)
* [GET] appointment/patientAppointments - Get patient's upcoming appointments (doctor's id can be specified)
* [GET] appointment/workhour            - Get doctor's total workhours
* [GET] appointment/freeSchedule        - Get doctor's free schedule
* [POST] appointment/                   - Create an appointment
* [POST] appointment/updateAppointment  - Update an appointment

Doctor
* [GET] doctor/     - Get all doctors
* [GET] doctor/:id  - Get a doctor by id
* [POST] doctor/    - Create a new doctor

Patient
* [GET] patient/     - Get all patients
* [GET] patient/:id  - Get a patient by id
* [POST] patient/    - Create a new patient

Schedule (Type)
* [GET] schedule/           - Get all schedules
* [GET] schedule/:id        - Get a schedule type by id
* [POST] schedule/          - Create a new schedule
* [POST] schedule/update    - Update a schedule by id

Invoking example: http://127.0.0.1:3000/doctor/

## Deliverables
To run the app
1. npm install
2. node app.js

To test the app
1. npm test

**This is not a perfect solution, but we can discuss more about the rationals behind each API and trade-offs**