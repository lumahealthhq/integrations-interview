# Zheng Hong Tan: Luma Technical Interview Response

## Prerequisites
Basic understanding of MongoDB, REST APIs, CRUD, MVC design pattern and Node.js

## Basic Setup
For basic setup for installation, we use npm for package management. Installing the packages and dependencies can be done with
```
npm install
```
This command will install:
* body-parser: ^1.18.3
* chai: ^4.2.0
* chai-http: ^4.2.1
* express: ^4.16.4
* mocha: ^6.0.2
* mongodb: ^3.1.13
* mongoose: ^5.4.16

I have also published the library, so running ```npm install zheng_luma-challenge@1.0.0``` should work.

After running the above command, you should have all the necessary packages installed. However, you still need to configure the database URL in the app.js file. Change the dev_db_url variable to your dedicated connection string of your MongoDB cluster. For more information, please refer to "Further Info" section below.

## Overview
For this REST API project, I used the MVC design pattern that has 3 models, namely the Doctor, Opening and Patient models. These models would define the MongoDB schema, while the controllers would perform the necessary actions based on the endpoints given. There is no view component in this project. The doctor model contains information about the name of a doctor and his/her working hours, the opening model contains information about available appointments for patients to book, while the patient model contains information about the patient.

## Endpoints
### Patient:
* GET 	/patients		              : get a list of all patients
* POST 	/patients		              : create a new patient record and saves it to the database
* DELETE	/patients/:patientName	: delete a patient record and reflects this change onto the database
* GET 	/patients/:patientName	  : get details of a patient by patient name

### Doctor:
* GET 	/doctors		              : get a list of all doctors and their working hours
* POST 	/doctors		              : create a new doctor record
* GET	/doctors/:doctorName	      : get details of a doctor by doctor name
* DELETE 	/doctors/:doctorName	  : delete a given doctor record
* PUT	/doctors/:doctorName	      : update a doctor's working hours

### Opening:
* GET 	/openings		    : get a list of all available openings for patients to book
* POST 	/openings/new		: post a new opening
* POST 	/openings/book	: book an existing opening
* DELETE 	/openings		  : delete an opening

## API Documentation
[API docs](https://documenter.getpostman.com/view/6684234/S11NLwSm)

## Challenges
One of the main challenges that I faced while developing this API was connecting it to the cluster and the database. I figured that it would make the most sense to just connect to the cluster instead of running the database locally. Otherwise, this project is pretty doable.

## Further Info & Useful Links
By default, Mongoose would produce a collection name that pluralizes the model name. Therefore, 3 collections would be produced, namely doctors, openings and patients in my database under my cluster. However, you can still configure the names to your liking. 

I included the links below to aid you in connecting this API with the database. Remember to configure your IP entries under the Security Tab of your dedicated MongoDB cluster. Here are some of the issues that I faced while writing this project:

* [Mongo couldn't connect to server](https://stackoverflow.com/questions/13312358/mongo-couldnt-connect-to-server-127-0-0-127017)
* [No data/db folder](https://stackoverflow.com/questions/7948789/mongod-complains-that-there-is-no-data-db-folder)

Here are some resources that I found helpful when developing this project:
* [Express Routing](https://expressjs.com/en/guide/routing.html)
* [Writing a CRUD App](https://codeburst.io/writing-a-crud-app-with-node-js-and-mongodb-e0827cbbdafb)
* [API testing](https://ubuverse.com/introduction-to-node-js-api-unit-testing-with-mocha-and-chai/)


