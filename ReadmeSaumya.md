# Luma Technical Interview

## Problem Definition

A busy hospital has a list of dates that a doctor is available to see patients. Their process is manual and error prone leading to overbooking. They also have a hard time visualizing all of the available time for a doctor for specific dates. 

## Data Model

Creaed the Database in Mlabs in MongoDB and implemented three table:
1. Patients: to keep track of patients
2. Doctors: to keep track of doctors and their working days and shifts
3. User: User table where only authorized users can sign in to the app

## REST API

Front-End:
Frontent is developed in React.js and express framework of javascript to book and add the doctors

Backend:
Implemented following REST API's:
* Find a doctor's working hours
* Book an doctor opening
* Create and update the list of doctor's working hours

## How to run the code:
1. Copy both the folders in a directory.
2. Install npm in your system
3. To run lumaHealth-Frontend:
   Open the folder in terminal and run npm start, the service will start on localhost
4. To run lumaHealth-Backend:
   Open the folder in terminal and run node index.js, the service will start.
5. To run the unit test cases, go to the backend folder and type command "npm test"
