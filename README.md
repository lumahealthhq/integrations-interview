# Luma Technical Interview

## Problem Definition

A busy hospital has a list of dates that a doctor is available to see patients. Their process is manual and error prone leading to overbooking. They also have a hard time visualizing all of the available time for a doctor for specific dates. 

## Interview Task

Create a simple scheduling system that manages doctor availabilities and allows patients to book appointments.

## Data Model

* calendar
  + id: (int) 
  + doctorId: (int)
  + date: (date)
  + duration: (int)
  + status: (free/busy) (string)

* appointment
  + patientId: (int)
  + calendarId: (int)

* patient
  + id: (int)  
  + name: (string)

* doctor
  + id: (int)
  + name: (string)


## APIs
* createOpenCalendarSpot
  + description: creates an open spot in the calendar that patients can book
  + params: doctorId (int), datetime (date)
  + output: success / failure message

* bookCalendarSpot
  + description: marks an calendar as taken, creates an appointment
  + params: patientId (id), doctorId (id), datetime (date), duration (int)
  + output: success / failure message

* listOpenCalendarSpots
  + description: show all open calendars spots for a doctor for specific dates
  + params: doctorId (id), datetime (optional) (date) 
  + output: list of open calendar sports

## Deliverables

The code should be delivered library that anyone can import and use. It should contain documentation and unit tests that show your understanding of the problem. Once you&#39;re finished, submit a PR to this repo.
