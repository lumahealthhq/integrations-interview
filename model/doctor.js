
// var id;
// var firstName;
// var lastName;


var doctor = {

    create:function(request, callback){

        var doctor  = {};
        doctor['firstName'] = request.firstName;
        doctor['lastName'] = request.lastName;
    }

}

function Doctor(firstName, lastName){

  this.firstName = firstName;
  this.lastName = lastName;
}
