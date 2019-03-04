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
