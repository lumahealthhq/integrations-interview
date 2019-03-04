# Luma Technical Interview

## Problem Definition

A busy hospital has a list of dates that a doctor is available to see patients. Their process is manual and error prone leading to overbooking. They also have a hard time visualizing all of the available time for a doctor for specific dates. 

## REST API

Implemented CRUD for the following functionality:

* Doctors
* Patients
* Appointments
* Schedule

## How to run

```
npm install
npm index.js
```

## How to use as a module

```
var schedule_app = require('luma-eng-interview')
app.use('/api', schedule_app)
```
Reference - https://derickbailey.com/2016/02/17/using-express-sub-apps-to-keep-your-code-clean/

## How to run tests

```
npm test
```

## API

* Create a new doctor - POST `/doctor` { "name" : "Doctor" }
* Create a new patient - POST `/patient` { "name" : "Doctor" }
* Create schedule for a doctor - POST `/doctor` { "doctor_id" : 1, "date": "2019-03-03 09:00:00", slots: 4, duration: 20 }
* Create an appointment - POST `/appointment` { "patient_id" : 1, "schedule_id" : 1 }

Get/Update/Delete works trivially.
Get accepts query params for special queries as needed e.g. GET `/schedule?status=1` for all booked slots
