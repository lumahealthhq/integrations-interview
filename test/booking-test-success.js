var expect = require("chai").expect;
var doctorService = require("../service/doctor-service.js");
var bookingService = require("../service/booking-service.js");
var patientService = require("../service/patient-service.js");
describe ("book", function(){
  it("book available slot",function(){
      /*
        intial set up
          - Doctor with working days as Monday(8am-11am, 1pm to 4pm), Tuesday(9am-11am, 1pm-3pm)
        case description
          - Tries to book a slot that is not already booked and is within the doctor's working hours
      */
      var doctorToCreate = {
          firstName: "Jon",
          lastName: "Snow",
          workingHours: {
              sunday: [],
              monday: [
                  {
                      "start": "8",
                      "end": "11"
                  },
                  {
                      "start": "13",
                      "end": "16"
                  }
              ],
              tuesday: [
                  {
                      "start": "9",
                      "end": "11"
                  },
                  {
                      "start": "13",
                      "end": "15"
                  }
              ]
          }
        };
        doctorService.addDoctor(doctorToCreate, function(createdDoctor){

            var patientToCreate = {
                firstName:"Tyrion",
                lastName:"Lannister"
            }
            patientService.addPatient(patientToCreate, function(createdPatient){
                var doctorId = createdDoctor.id;
                var patientId = createdPatient.id;
                var date = new Date();
                date.setDate(date.getDate() + (1 + 7 - date.getDay()) % 7);
                var dateString = date.toString();
                var bookingRequest1 = {
                	doctor:"1",
                	patient:"1",
                	slot:"8",
                	date:dateString //upcoming monday
                }
                //Book the slot
                bookingService.book(bookingRequest1, function(bookingResponse){
                  console.log("Booking response::"+JSON.stringify(bookingResponse));
                  expect(bookingResponse.status).to.be.equal("success");
                });
            })
        });
  });
});
