var expect = require("chai").expect;
var doctorService = require("../service/doctor-service.js");
var bookingService = require("../service/booking-service.js");
var patientService = require("../service/patient-service.js");
describe ("book", function(){
  it("Book slot that is already booked",function(){

    /*
        case description
          - Tries to book the same slot that is booked in the previous test case, should result in error
    */

    var date = new Date();
    date.setDate(date.getDate() + (1 + 7 - date.getDay()) % 7);
    var dateString = date.toString();
    var bookingRequest = {
      doctor:"1",
      patient:"1",
      slot:"8",
      date:dateString //upcoming monday
    }
    bookingService.book(bookingRequest, function(bookingResponse){
      console.log("Booking response::"+JSON.stringify(bookingResponse));
      expect(bookingResponse.status).to.be.equal("failure");
    });
  });
});
