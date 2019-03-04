const express = require("express");
const router = express.Router();
const request = require("request");

// Expected output: Should return an array of json objects containg the doctors working hours
router.get("/test1", (req, res) => {
  request(
    "http://localhost:3000/api/doctor/hours/5c7c76e9a357665466050fe8",
    (error, response, body) => {
      res.status(response.statusCode).json(body);
    }
  );
});

// Expected output: Should return an error message since the provided doctor id doesn't exist
router.get("/test2", (req, res) => {
  request(
    "http://localhost:3000/api/doctor/hours/xnxks7cbddne9a35",
    (error, response, body) => {
      res.status(response.statusCode).json(body);
    }
  );
});

// Expected output: Should create and update the doctors working hours and return a json object
//                  containing the doctors updated working hours
router.get("/test3", (req, res) => {
  request.post(
    {
      url: "http://localhost:3000/api/doctor/workinghours",
      body: {
        doctor_id: "5c7c76e9a357665466050fe8",
        date: "2019-03-08",
        from: "10:00:00",
        to: "18:00:00"
      },
      json: true
    },
    (error, response, body) => {
      res.status(response.statusCode).json(body);
    }
  );
});

// Expected output: Should create a new doctor appointment and return a json object containing
//                  details of the booked appointment
router.get("/test4", (req, res) => {
  request.post(
    {
      url: "http://localhost:3000/api/appointment",
      body: {
        doctor_id: "5c7c76e9a357665466050fe8",
        patient_id: "5c7adea693680d46df6b1849",
        date: "2019-03-07",
        from: "15:00:00",
        to: "16:00:00"
      },
      json: true
    },
    (error, response, body) => {
      res.status(response.statusCode).json(body);
    }
  );
});

// Expected output: Should give an error message since the doctor doesn't have working hours
//                  on the entered date
router.get("/test5", (req, res) => {
  request.post(
    {
      url: "http://localhost:3000/api/appointment",
      body: {
        doctor_id: "5c7a4656a7a46140fcc6d888",
        patient_id: "5c7adea693680d46df6b1849",
        date: "2019-03-20",
        from: "15:00:00",
        to: "16:00:00"
      },
      json: true
    },
    (error, response, body) => {
      res.status(response.statusCode).json(body);
    }
  );
});

// Expected output: Should give an error message since the entered time overlaps with another appointment
router.get("/test6", (req, res) => {
  request.post(
    {
      url: "http://localhost:3000/api/appointment",
      body: {
        doctor_id: "5c7a4656a7a46140fcc6d888",
        patient_id: "5c7adea693680d46df6b1849",
        date: "2019-03-03",
        from: "13:00:00",
        to: "14:00:00"
      },
      json: true
    },
    (error, response, body) => {
      res.status(response.statusCode).json(body);
    }
  );
});

module.exports = router;
