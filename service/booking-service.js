
var doctorService = require("../service/doctor-service.js");
var patientService = require("../service/patient-service.js");
var bookingDao = require("../dao/booking-dao.js");

var bookingService = {

  book: function(request, callback){

      var doctorId = request.doctor;
      var date = new Date(request.date);
      var patientId = request.patient;
      var slot = request.slot;
      doctorService.getWorkingHourSlots(doctorId, date, function(workingHourSlots){
        console.log("Working slots for::"+date+"::is"+workingHourSlots);
        console.log("Booking for slot::"+slot+"::"+workingHourSlots.indexOf(parseInt(slot)));
        if(!workingHourSlots || workingHourSlots.length == 0 || workingHourSlots.indexOf(parseInt(slot)) == -1){
          return callback({"status":"failure", "message":"Outside of working hours"});
        }
        doctorService.getBookedSlots(doctorId, date, function(bookedSlots){
          if(bookedSlots && bookedSlots.indexOf(slot)!=-1){
            return callback({"status":"failure", "message":"Slot already booked"});
          }
          else{
            var booking = bookingDao.addBooking(doctorId, patientId, slot, date, function(){
              doctorService.updateBookedSlots(doctorId, date, slot);
              callback({"status":"success", "message":"Slot booked!!"});
            });
          }
        });
      });
  },
  getBookings: function(request, callback){

      bookingDao.getBookings(function(bookingList){
        var processedBookings = [];
        bookingList.forEach(function(booking){
              var processedBooking = new bookingDao.Booking();
              doctorService.getDoctor(booking.doctor,function(doctor){
                console.log("Doctor");
                console.log(booking.doctor);
                var doctorName = doctor.firstName;
                if(doctor.lastName){
                  doctorName = doctorName + " "+doctor.lastName;
                }
                patientService.getPatient(booking.patient,function(patient){
                  processedBooking.doctor = doctorName;
                  var patientName = patient.firstName;
                  if(patient.lastName){
                    patientName = patientName + " "+patient.lastName;
                  }
                  processedBooking.patient = patientName;
                  processedBooking.date = booking.date;
                  processedBooking.slot = booking.slot;
                });
              });
              processedBookings.push(processedBooking);
        });
        callback(processedBookings);
      });
  }
}

module.exports = bookingService;
