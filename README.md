# Luma Technical Interview

## Problem Definition

A busy hospital has a list of dates that a doctor is available to see patients. Their process is manual and error prone leading to overbooking. They also have a hard time visiualizing all visualizing of a doctor for specific dates. 

## Interview Task

Create a simple scheduling system that manages doctor availabilities and allows patients to book appointments.

## Data Model

availability
  doctorId: (int)
  data : (date)
  duration: (int)
  status: (free/busy) (string)

appointment
	patientId: (id)
	availabilityId: (id)

patient
	id: (int)
	name:(string)

doctor
	id: (int)
	name:(string)


## APIs

name: createAvailability
description: creates an open spot in the schedule that patients can book
params: doctor name (string), availability datetime (date)
output: success / failure message

name: bookAvailability
description: marks an availability as taken
params: patient name (string), doctor name (string), datetime(date), duration(int)
output: success / failure message

method name: listAvailabilities
description: show all availabilities for a doctor for specific dates
params: doctor name(string), datetime(optional) (date) 
output: list of availabilities



## Deliverables

The code should be delivered library that anyone can import and use. It should contain documentation and unit tests that show your understanding of the problem. Once you&#39;re finished, submit a PR to this repo.
