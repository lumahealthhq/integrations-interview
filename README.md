## Synopsis

A busy hospital has a list of dates that a doctor is available to see patients. Their process is manual and error prone leading to overbooking. They also have a hard time visualizing all of the available time for a doctor for specific dates.

## REST API

Implement the following functionality:

* Find a doctor's working hours
* Book an doctor opening
* Create and update the list of doctor's working hours

## API Reference

- Find a doctor's working hours
```
URL: /:doctorId/:date  
METHOD: GET 
PARAMS:
a. doctorId
b. date
```

- Book an doctor opening
```
URL: /:patientId/create/
METHOD: POST
PARAMS:
a. doctorId
b. date
c. duration
```

- Create and update the list of doctor's working hours
```
# Create a working hour
URL: '/:doctorId/create/'
METHOD: POST  
PARAMS:
a. doctorId
b. date
c. duration

# Delete a working hour
URL: '/:doctorId/delete/'
METHOD: DELETE
PARAMS:
a. doctorId
b. date
c. duration
```

## Installation
```
npm i luma-eng-interview-xingcheng-sun -S
```

## Configuration

### How to Configure
This library is using MongoDB(mLab) as database so the configuration can be loaded from an external configure file called config.json. Sample config shows below.
```
# DATABASE CONFIG
{
    DB_URI: YOUR_MONGODB_URI,
    USERNAME: YOUR_MONGODB_USERNAME,
    PASSWORD: YOUR_MONGODB_PASSWORD
}
```

### How to Use

```
# In your project's app.js
app = require('luma-eng-interview-xingcheng-sun')

app.listen(8081, "0.0.0.0");
```

## Tests

### 1. How to Test

```
npm test
```

### 2. Test case
![Test case](https://cdn1.imggmi.com/uploads/2019/3/4/460ae83f525d81bfd83d6d4e3b154b60-full.png)

