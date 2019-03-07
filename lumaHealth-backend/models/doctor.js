var mongoose =require('mongoose');

var Doctors= mongoose.model('Doctors',{
    Email : {
        type : String, index : {unique : true}
    },
    Name : {
        type : String
    },
    Monday : [{
        slot : {type : String} , status : {type : String}
    }],
    Tuesday : [{
        slot : {type : String} , status : {type : String}
    }],
    Wednesday :[{
        slot : {type : String} , status : {type : String}
    }],
    Thursday :[{
        slot : {type : String} , status : {type : String}
    }],
    Friday :[{
        slot : {type : String} , status : {type : String}
    }]
})

module.exports = {Doctors};