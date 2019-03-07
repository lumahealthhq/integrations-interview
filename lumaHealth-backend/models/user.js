var mongoose = require('mongoose');

var Users = mongoose.model('Users',{
    username :{
        type : String
    },
    password : {
        type : String
    }
});

module.exports = {Users};