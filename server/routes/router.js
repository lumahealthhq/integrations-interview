const express = require("express");
var  docController = require('../controllers/doctorController');
var  patController = require('../controllers/patientController');
var  bookController = require('../controllers/bookingController');

var router = express.Router();


/*** Deliverable APIs ***/


/**
 * @api {post} /findWorkingHours/
 * @apiParam {String} id    Mandatory id{Unique} of the doctor, working hours of the doctor corresponding to this id will be shown.
 * @apiSuccess {Number} ErrorCode 0
 * @apiSuccess {Json} WorkingHours {
        "Monday": [
            {
                "slot": "13-14",
                "noOfPatients": 3,
                "availability": "Y"
            },
            {
                "slot": "18-19",
                "noOfPatients": 3,
                "availability": "Y"
            },
            {
                "slot": "14-15",
                "noOfPatients": 0,
                "availability": "N"
            }
        ],
        "Tuesday": [
            {
                "slot": "17-15",
                "noOfPatients": 0,
                "availability": "N"
            },
            {
                "slot": "13-14",
                "noOfPatients": 2,
                "availability": "Y"
            },
            {
                "slot": "11-12",
                "noOfPatients": 3,
                "availability": "Y"
            }
        ],
        "Wednesday": [],
        "Thursday": [],
        "Friday": [],
        "Saturday": [],
        "Sunday": []
    }
 *
 */

router.post('/findWorkingHours', docController.findWorkingHoursOfDoc);
/**
 * @api {post} /createBooking/
 * @apiParam {String} doc_id    Mandatory id{Unique} of the doctor with whom you want to take appointment with.
 * @apiParam {String} pat_id    Mandatory id{Unique} of the patient who is making the appointment.
 * @apiParam {String} day    Mandatory "Monday" or "Tuesday" or "Wednesday" or "Thurday" or "Friday" or "Saturday" or "Sunday".
 * @apiParam {String} slot    Mandatory "17-18" or "10-11".
 * @apiSuccess {Number} ErrorCode 0
 * @apiSuccess {String} Message Booking created
 *
 */
router.post('/createBooking', bookController.createBooking);

/**
 * @api {post} /updateWorkingHours/
 * @apiParam {String} id    Mandatory id{Unique} of the doctor, working hours of the doctor corresponding to this id will be updated.
 * @apiParam {String} day    Mandatory "Monday" or "Tuesday" or "Wednesday" or "Thurday" or "Friday" or "Saturday" or "Sunday". Days of the week corresponding to which schedule will be updated
 * @apiParam {String} slot    Mandatory Eg -"17-18" or "10-11" etc.
 * @apiParam {Number} noOfPatients    Optional Number of Patients that Doctor want to attend in this particular slot Default=3.
 * @apiParam {String} availability    Optional Eg -"Y" or "N" Default="Y" i.e by default doctor will be considered available for this slot.
 * @apiSuccess {Number} ErrorCode 0
 * @apiSuccess {String} Message Updated Successfully
 *
 */
router.post('/updateWorkingHours', docController.updateWorkingHoursOfDoc);


/**
 * @api {post} /createDoctor/
 * @apiParam {Json} [timings]={
 "Monday":
  [{"slot":"13-14","noOfPatients":3,"availability":"Y"},{"slot":"18-19","noOfPatients":"3","availability":"Y"}],
 "Tuesday":
  [{"slot":"17-15","noOfPatients":3,"availability":"Y"},{"slot":"13-14","noOfPatients":2,"availability":"Y"},{"slot":"11-12","noOfPatients":3,"availability":"Y"}]
 } 
 Mandatory with default value {  
 	"Monday":[],
    "Tuesday":[],
    "Wednesday":[],
    "Thursday":[],
    "Friday":[],
    "Saturday":[],
    "Sunday":[]
   }.
 * @apiParam {String} name    Mandatory Lastname.
 * @apiParam {String} specialisation    Mandatory specialisation.
 * @apiSuccess {Number} ErrorCode 0
 * @apiSuccess {String} Message Doctor created
 *
 */
router.post('/createDoctor', docController.createDoctor);

/**
 * @api {get} /getDoctorsList/
 * @apiSuccess {Number} ErrorCode 0
 * @apiSuccess {Array} Listofdoctors [
        {
            "_id": "5c7d4d6d63b1c60f30e0fc1a",
            "name": "Mr Z",
            "created_at": "2019-03-04T16:08:13.427Z",
            "updated_at": "2019-03-04T16:08:13.427Z",
            "__v": 0
        },
        {
            "_id": "5c7d5fc1b63e5c14bc737053",
            "name": "Mr BAC",
            "created_at": "2019-03-04T17:26:25.772Z",
            "updated_at": "2019-03-04T17:26:25.772Z",
            "__v": 0
        }
    ]
 *
 */
router.get('/getDoctorsList', docController.getAllDoctors);

/**
 * @api {get} /deleteAllDocs/
 * @apiSuccess {Number} ErrorCode 0
 * @apiSuccess {String} Message All doctors deleted successfully
 *
 */
router.get('/deleteAllDocs', docController.deleteAll);

/**
 * @api {post} /createPatient/
 * @apiParam {String} firstName    Mandatory firstName.
 * @apiParam {String} lastName    Mandatory lastName.
 * @apiParam {String} age    Optional age.
 * @apiParam {String} blood_group    Optional blood_group.
 * @apiParam {String} contact    Optional contact.
 * @apiParam {String} address    Optional address.
 * @apiSuccess {Number} ErrorCode 0
 * @apiSuccess {String} Message Patient created
 *
 */
router.post('/createPatient', patController.createPatient);

/**
 * @api {get} /getPatientsList/
 * @apiSuccess {Number} ErrorCode 0
 * @apiSuccess {Array} ListofPatients "List of patients ": [
        {
            "name": {
                "firstName": "Camillo",
                "lastName": "Cabilli"
            },
            "_id": "5c7b298aec0f2d6ebcbef0b0",
            "age": "64",
            "blood_group": "O+",
            "created_at": "2019-03-03T01:10:34.128Z",
            "updated_at": "2019-03-03T01:10:34.128Z",
            "__v": 0
        },
        {
            "name": {
                "firstName": "Tan",
                "lastName": "Pan"
            },
            "_id": "5c7d605dbdf508166faaeb6e",
            "age": "68",
            "blood_group": "O+",
            "created_at": "2019-03-04T17:29:01.594Z",
            "updated_at": "2019-03-04T17:29:01.594Z",
            "__v": 0
        }
    ]
 *
 */
router.get('/getPatientsList', patController.getAllPatients);

/**
 * @api {get} /deleteAllPatients/
 * @apiSuccess {Number} ErrorCode 0
 * @apiSuccess {String} Message All Patients deleted successfully
 *
 */
router.get('/deleteAllPatients', patController.deleteAll);

/**
 * @api {get} /getBookingsList/
 * @apiSuccess {Number} ErrorCode 0
 * @apiSuccess {Array} ListofBookings [
        {
            "_id": "5c7da7133ee36e2ea50d13a8",
            "doc_id": "5c7d5fc1b63e5c14bc737053",
            "pat_id": "5c7d605dbdf508166faaeb6e",
            "timings": [
                {
                    "_id": "5c7da7133ee36e2ea50d13a9",
                    "day": "Monday"
                }
            ],
            "created_at": "2019-03-04T22:30:43.693Z",
            "updated_at": "2019-03-04T22:30:43.693Z",
            "__v": 0
        }
    ]
 *
 */
router.get('/getBookingsList', bookController.getAllBookings);

/**
 * @api {get} /deleteAllBookings/
 * @apiSuccess {Number} ErrorCode 0
 * @apiSuccess {String} Message All bookings deleted successfully
 *
 */
router.get('/deleteAllBookings', bookController.deleteAll);

module.exports=router;
