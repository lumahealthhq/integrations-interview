
var nextBookingId = 1;


var bookingDao = {

  bookingList:[],
  //Booking model
  Booking: function(doctor, patient, slot, date){

        this.doctor = doctor;
        this.patient = patient;
        this.slot = slot;
        this.date = date;
        this.id = nextBookingId;
  },
  addBooking: function(doctor, patient, slot, date, callback){

      var booking = new this.Booking(doctor, patient, slot, date);
      nextBookingId = nextBookingId+1;
      this.bookingList.push(booking);
      callback(booking);
  },
  getBookings: function(callback){
      callback(this.bookingList);
  }
}
module.exports = bookingDao;
