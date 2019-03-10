
var doctorDao = require('../dao/doctor-dao.js');

var dayOfWeek = {
  0:"sunday",
  1:"monday",
  2:"tuesday",
  3:"wednesday",
  4:"thursday",
  5:"friday",
  6:"saturday",
}

var doctorService = {

    getList: function(callback){
        doctorDao.getList(function(doctorList){
            callback(doctorList);
        });
    },
    getDoctor:function(id, callback){

      doctorDao.getDoctor(id,function(doctor){
          callback(doctor);
      });
    },
    getWorkingHours:function(id,callback){
      doctorDao.getWorkingHours(id,function(hours){
          callback(hours);
      });
    },
    getWorkingHourSlots:function(id, dateString, callback){
      var workingSlots = [];
      this.getWorkingHours(id, function(workingHours){
          console.log("Working hours ibs is::"+JSON.stringify(workingHours));
          var date = new Date(dateString);
          console.log("Day num is::"+date.getDay());
          var day = dayOfWeek[date.getDay()];
          console.log("Day of week is::"+day);
          var hours = workingHours[day];
          console.log("working hours is::"+hours);
          if(hours){
              hours.forEach(function(duration){
                  var start = parseInt(duration.start);
                  var end = parseInt(duration.end);
                  //assuming each slot to be one hour
                  for (slot = start;slot<end;slot++){
                      workingSlots.push(slot);
                  }
              });
          }
      });
      callback(workingSlots);
    },
    getAvailableHours:function(id, dateString, callback){
        this.getWorkingHours(id, function(workingHours){
            var date = new Date(dateString);
            var day = dayOfWeek[date.getDay()];
            var hours = workingHours[day];
            console.log("working hours is::"+hours);
            var workingSlots = [];
            var response = {
              "slotduration":"1 hr",
              "slots":[]
            };
            if(hours){
              doctorDao.getBookingByDate(id, dateString, function(bookedSlots){
                console.log("Booked slots::"+bookedSlots);
                hours.forEach(function(duration){
                    var start = parseInt(duration.start);
                    var end = parseInt(duration.end);
                    //assuming each slot to be one hour
                    for (slot = start;slot<end;slot++){
                        console.log("Checking for slot::"+slot);
                        var slotDetail = {
                            "start":slot
                        }
                        var slotStatus = "available";
                        if(bookedSlots && bookedSlots.indexOf(slot.toString())!=-1){
                            slotStatus = "not-available";
                        }
                        slotDetail["status"] = slotStatus;
                        workingSlots.push(slotDetail);
                    }
                });
                response.slots = workingSlots;
              });
            }
            callback(response);
        });
    },
    addDoctor: function(request, callback){

        doctorDao.addDoctor(request, function(doctor){
            callback(doctor);
        });
    },
    updateDoctor: function(id, request, callback){

        doctorDao.updateDoctor(id, request, function(doctor){
            callback(doctor);
        });
    },
    getBookedSlots:function(id,date, callback){
        doctorDao.getBookingByDate(id, date, function(bookedSlots){
              callback(bookedSlots);
        });
    },
    updateBookedSlots:function(id, date, slot){
        console.log("Doctor service update updateBookedHours::"+id+"::"+date+"::"+slot);
        doctorDao.updateBookedHours(id, date, slot);
    }
}

module.exports = doctorService;
