# Luma Technical Interview

To develop this REST API, I have used Node.js, Express.js, Sequelize(ORM) and MySQL.
I have written a small integration test covering all the basic functionality.

## Data Model:
### Appointment:
    Appointment model has many to one relationship to a Doctor and a Patient.
### Doctor:
    Doctor model contains basic details of a doctor.
### Patient:
    Doctor model contains basic details of a doctor.
### Schedule:
    Schedule model contains the availabilities of a doctor.   
    These availabilities are stored as `availableFrom`, `availableTo` having DATETIME datatype.
    
### How to run:
```javascript
// development
yarn dev

// run tests(mocha)
yarn test

// production build or start production build
yarn build
yarn start
```

Postman API Documentation: [Click Here](https://web.postman.co/collections/6757338-eca29ef1-43cb-40b8-9c73-9a9773a3fd86?workspace=53f3e7dc-6c38-47be-8236-d52db1866a64)