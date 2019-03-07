# Luma Technical Interview

Note: original repo with commit history is at [original](https://github.com/hiteshsantwani/Luma_Health)
# install the library with following command:

npm install doctorappointmentscheduler

# Postman Test Cases are included in this repo under Postman directory

### Technical and Functional Design is mentioned and expanded on the Readme.

The solution for this library is punlished on public npm repo.
Name: doctorappointmentscheduler.

Things that i can add while a PR is open:
Authentication using passport.
Method and class documentation.
More test cases!

## Problem Definition

A busy hospital has a list of dates that a doctor is available to see patients. Their process is manual and error prone leading to overbooking. They also have a hard time visualizing all of the available time for a doctor for specific dates. 

## Interview Task

Create a REST API that enables a simple scheduling system that manages doctor availabilities and allows patients to book appointments.

## Data Model

Define a set of data models that include:

* a way track assign booked appointments
* a way to track patients
* a way to track doctors 
* a way to track a doctor's working hours and days

## REST API

Implement the following functionality:

* Find a doctor's working hours
* Book an doctor opening
* Create and update the list of doctor's working hours

## Deliverables

The code should be delivered as a library that anyone can import and use. It should contain documentation and unit tests that show your understanding of the problem. Once you&#39;re finished, submit a PR to this repo.

## Functional Design:

The Solution is layered as Standard MVC pattern with an additional Service layer for making the solution reusable.

The app.js file is the entry point for this REST api.

Flow for the requests:

app -> Routes -> Controller -> Service

The core logic is in the file: appointmentSchedulerService.

The BDD Test are contained in the file appointmentSchedulerTest under test folder.

The core Functionality is defined as follows:

# addNewDoctor:

### User posts the Doctor Details in the request body.
### this method stores the Doctor Details in the Doctor_Detail collection.

# getWorkingHoursDoctor:

### Method gets the email of doctor as parameter
### Returns the list of Shedule of Doctor for eg:

6/6/2018 01:00:00 YES <- This means that Doctor is Available on the 6th june at 01 hours.

# bookDoctorOpening:
### User posts the Date Time and email info to this Method.
### Method Fetches the Doctor from the collection using email then gets the schedule availability.
### Method then goes on finding the requested Date and Time in the Schedule if found it check if the Doctor is available
### If the Doctor is available it changes the Doctor availability to NO.
### Method then creates the new Appointment in appointment collection with following information:

Patient phone no, Doctor email, Date and Time.

# createUpdateWorkingHoursDoctor:
### User posts the The Schedule and Email of the Doctor.
### Method then fetched the Doctor by email it then updates the schedule.
## For eg:

User posts the availability as:
Doctor_Email : hiteshka@buffalo.edu
YES : 6/6/2018
YES : 9/9/2018
YES : 2/2/2018
NO : 1/1/2018
NO : 3/2/2018

This will create the Schedule of the doctor with above entries in the Availability.
This will also update the exsisting entries for eg:

if the earlier "NO : 9/9/2018" but since now the user has posted the new schedule as : YES : 9/9/2018 this will update the info in the schedule.

# Tests:
 I am following the BDD.
 Mocha and chai are used for test cases.
 You can clone the repo on the local and load the test config from config folder.
