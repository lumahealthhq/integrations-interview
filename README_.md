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

Documentation: [Click Here](https://documenter.getpostman.com/view/6757338/S11LsHR9)