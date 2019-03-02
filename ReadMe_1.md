# Luma Technical Interview

##LumaApi

LumaApi is a RESTful api which is used for booking Doctor's appointment, viewing doctor's work hours, updating list of doctors's work hours and creating new enteries for doctors.

### Methods
- GET | POST | PATCH

### Installation
- Clone the repo by using git clone.
- Run npm install on the cloned directory.
- Add APIs using the instructions below to suit your needs.
- Make sure node is intalled on your machine.

### Running the app
- Use either of the following to run :
```node server.js ```
or
``` nodemon server.js (requires nodemon to be installed)```

### Please follow the documentation below to understand how the api works:
## - [Documentation](https://documenter.getpostman.com/view/6806985/S11LrcgX#2602f977-3e23-441c-9930-a85a40405d8d)


## Configuration
- Mongoose is used to load and persist data into mongo db cloud database, if one wants to configure their own mongodb then configuration can be set in app.js in mongoose.connect() method
