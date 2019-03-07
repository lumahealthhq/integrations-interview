var mongoose =require('mongoose');

var Patients= mongoose.model('Patients',{
    Email : {
        type : String, index : {unique : true}
    },
    Name : {
        type : String
    }
})

module.exports = {Patients};