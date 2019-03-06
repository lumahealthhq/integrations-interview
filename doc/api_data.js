define({ "api": [
  {
    "type": "get",
    "url": "/deleteAllBookings/",
    "title": "",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "ErrorCode",
            "description": "<p>0</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "Message",
            "description": "<p>All bookings deleted successfully</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/routes/router.js",
    "group": "_home_riya_Doctor_Appointments_Scheduling_System_server_routes_router_js",
    "groupTitle": "_home_riya_Doctor_Appointments_Scheduling_System_server_routes_router_js",
    "name": "GetDeleteallbookings"
  },
  {
    "type": "get",
    "url": "/deleteAllDocs/",
    "title": "",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "ErrorCode",
            "description": "<p>0</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "Message",
            "description": "<p>All doctors deleted successfully</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/routes/router.js",
    "group": "_home_riya_Doctor_Appointments_Scheduling_System_server_routes_router_js",
    "groupTitle": "_home_riya_Doctor_Appointments_Scheduling_System_server_routes_router_js",
    "name": "GetDeletealldocs"
  },
  {
    "type": "get",
    "url": "/deleteAllPatients/",
    "title": "",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "ErrorCode",
            "description": "<p>0</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "Message",
            "description": "<p>All Patients deleted successfully</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/routes/router.js",
    "group": "_home_riya_Doctor_Appointments_Scheduling_System_server_routes_router_js",
    "groupTitle": "_home_riya_Doctor_Appointments_Scheduling_System_server_routes_router_js",
    "name": "GetDeleteallpatients"
  },
  {
    "type": "get",
    "url": "/getBookingsList/",
    "title": "",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "ErrorCode",
            "description": "<p>0</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "ListofBookings",
            "description": "<p>[ { &quot;_id&quot;: &quot;5c7da7133ee36e2ea50d13a8&quot;, &quot;doc_id&quot;: &quot;5c7d5fc1b63e5c14bc737053&quot;, &quot;pat_id&quot;: &quot;5c7d605dbdf508166faaeb6e&quot;, &quot;timings&quot;: [ { &quot;_id&quot;: &quot;5c7da7133ee36e2ea50d13a9&quot;, &quot;day&quot;: &quot;Monday&quot; } ], &quot;created_at&quot;: &quot;2019-03-04T22:30:43.693Z&quot;, &quot;updated_at&quot;: &quot;2019-03-04T22:30:43.693Z&quot;, &quot;__v&quot;: 0 } ]</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/routes/router.js",
    "group": "_home_riya_Doctor_Appointments_Scheduling_System_server_routes_router_js",
    "groupTitle": "_home_riya_Doctor_Appointments_Scheduling_System_server_routes_router_js",
    "name": "GetGetbookingslist"
  },
  {
    "type": "get",
    "url": "/getDoctorsList/",
    "title": "",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "ErrorCode",
            "description": "<p>0</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "Listofdoctors",
            "description": "<p>[ { &quot;_id&quot;: &quot;5c7d4d6d63b1c60f30e0fc1a&quot;, &quot;name&quot;: &quot;Mr Z&quot;, &quot;created_at&quot;: &quot;2019-03-04T16:08:13.427Z&quot;, &quot;updated_at&quot;: &quot;2019-03-04T16:08:13.427Z&quot;, &quot;__v&quot;: 0 }, { &quot;_id&quot;: &quot;5c7d5fc1b63e5c14bc737053&quot;, &quot;name&quot;: &quot;Mr BAC&quot;, &quot;created_at&quot;: &quot;2019-03-04T17:26:25.772Z&quot;, &quot;updated_at&quot;: &quot;2019-03-04T17:26:25.772Z&quot;, &quot;__v&quot;: 0 } ]</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/routes/router.js",
    "group": "_home_riya_Doctor_Appointments_Scheduling_System_server_routes_router_js",
    "groupTitle": "_home_riya_Doctor_Appointments_Scheduling_System_server_routes_router_js",
    "name": "GetGetdoctorslist"
  },
  {
    "type": "get",
    "url": "/getPatientsList/",
    "title": "",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "ErrorCode",
            "description": "<p>0</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "ListofPatients",
            "description": "<p>&quot;List of patients &quot;: [ { &quot;name&quot;: { &quot;firstName&quot;: &quot;Camillo&quot;, &quot;lastName&quot;: &quot;Cabilli&quot; }, &quot;_id&quot;: &quot;5c7b298aec0f2d6ebcbef0b0&quot;, &quot;age&quot;: &quot;64&quot;, &quot;blood_group&quot;: &quot;O+&quot;, &quot;created_at&quot;: &quot;2019-03-03T01:10:34.128Z&quot;, &quot;updated_at&quot;: &quot;2019-03-03T01:10:34.128Z&quot;, &quot;__v&quot;: 0 }, { &quot;name&quot;: { &quot;firstName&quot;: &quot;Tan&quot;, &quot;lastName&quot;: &quot;Pan&quot; }, &quot;_id&quot;: &quot;5c7d605dbdf508166faaeb6e&quot;, &quot;age&quot;: &quot;68&quot;, &quot;blood_group&quot;: &quot;O+&quot;, &quot;created_at&quot;: &quot;2019-03-04T17:29:01.594Z&quot;, &quot;updated_at&quot;: &quot;2019-03-04T17:29:01.594Z&quot;, &quot;__v&quot;: 0 } ]</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/routes/router.js",
    "group": "_home_riya_Doctor_Appointments_Scheduling_System_server_routes_router_js",
    "groupTitle": "_home_riya_Doctor_Appointments_Scheduling_System_server_routes_router_js",
    "name": "GetGetpatientslist"
  },
  {
    "type": "post",
    "url": "/createBooking/",
    "title": "",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "doc_id",
            "description": "<p>Mandatory id{Unique} of the doctor with whom you want to take appointment with.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "pat_id",
            "description": "<p>Mandatory id{Unique} of the patient who is making the appointment.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "day",
            "description": "<p>Mandatory &quot;Monday&quot; or &quot;Tuesday&quot; or &quot;Wednesday&quot; or &quot;Thurday&quot; or &quot;Friday&quot; or &quot;Saturday&quot; or &quot;Sunday&quot;.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "slot",
            "description": "<p>Mandatory &quot;17-18&quot; or &quot;10-11&quot;.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "ErrorCode",
            "description": "<p>0</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "Message",
            "description": "<p>Booking created</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/routes/router.js",
    "group": "_home_riya_Doctor_Appointments_Scheduling_System_server_routes_router_js",
    "groupTitle": "_home_riya_Doctor_Appointments_Scheduling_System_server_routes_router_js",
    "name": "PostCreatebooking"
  },
  {
    "type": "post",
    "url": "/createDoctor/",
    "title": "",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Json",
            "optional": true,
            "field": "timings",
            "description": "<p>={ &quot;Monday&quot;: [{&quot;slot&quot;:&quot;13-14&quot;,&quot;noOfPatients&quot;:3,&quot;availability&quot;:&quot;Y&quot;},{&quot;slot&quot;:&quot;18-19&quot;,&quot;noOfPatients&quot;:&quot;3&quot;,&quot;availability&quot;:&quot;Y&quot;}], &quot;Tuesday&quot;: [{&quot;slot&quot;:&quot;17-15&quot;,&quot;noOfPatients&quot;:3,&quot;availability&quot;:&quot;Y&quot;},{&quot;slot&quot;:&quot;13-14&quot;,&quot;noOfPatients&quot;:2,&quot;availability&quot;:&quot;Y&quot;},{&quot;slot&quot;:&quot;11-12&quot;,&quot;noOfPatients&quot;:3,&quot;availability&quot;:&quot;Y&quot;}] } Mandatory with default value {<br> &quot;Monday&quot;:[], &quot;Tuesday&quot;:[], &quot;Wednesday&quot;:[], &quot;Thursday&quot;:[], &quot;Friday&quot;:[], &quot;Saturday&quot;:[], &quot;Sunday&quot;:[] }.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Mandatory Lastname.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "specialisation",
            "description": "<p>Mandatory specialisation.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "ErrorCode",
            "description": "<p>0</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "Message",
            "description": "<p>Doctor created</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/routes/router.js",
    "group": "_home_riya_Doctor_Appointments_Scheduling_System_server_routes_router_js",
    "groupTitle": "_home_riya_Doctor_Appointments_Scheduling_System_server_routes_router_js",
    "name": "PostCreatedoctor"
  },
  {
    "type": "post",
    "url": "/createPatient/",
    "title": "",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "firstName",
            "description": "<p>Mandatory firstName.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "lastName",
            "description": "<p>Mandatory lastName.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "age",
            "description": "<p>Optional age.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "blood_group",
            "description": "<p>Optional blood_group.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "contact",
            "description": "<p>Optional contact.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "address",
            "description": "<p>Optional address.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "ErrorCode",
            "description": "<p>0</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "Message",
            "description": "<p>Patient created</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/routes/router.js",
    "group": "_home_riya_Doctor_Appointments_Scheduling_System_server_routes_router_js",
    "groupTitle": "_home_riya_Doctor_Appointments_Scheduling_System_server_routes_router_js",
    "name": "PostCreatepatient"
  },
  {
    "type": "post",
    "url": "/findWorkingHours/",
    "title": "",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Mandatory id{Unique} of the doctor, working hours of the doctor corresponding to this id will be shown.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "ErrorCode",
            "description": "<p>0</p>"
          },
          {
            "group": "Success 200",
            "type": "Json",
            "optional": false,
            "field": "WorkingHours",
            "description": "<p>{ &quot;Monday&quot;: [ { &quot;slot&quot;: &quot;13-14&quot;, &quot;noOfPatients&quot;: 3, &quot;availability&quot;: &quot;Y&quot; }, { &quot;slot&quot;: &quot;18-19&quot;, &quot;noOfPatients&quot;: 3, &quot;availability&quot;: &quot;Y&quot; }, { &quot;slot&quot;: &quot;14-15&quot;, &quot;noOfPatients&quot;: 0, &quot;availability&quot;: &quot;N&quot; } ], &quot;Tuesday&quot;: [ { &quot;slot&quot;: &quot;17-15&quot;, &quot;noOfPatients&quot;: 0, &quot;availability&quot;: &quot;N&quot; }, { &quot;slot&quot;: &quot;13-14&quot;, &quot;noOfPatients&quot;: 2, &quot;availability&quot;: &quot;Y&quot; }, { &quot;slot&quot;: &quot;11-12&quot;, &quot;noOfPatients&quot;: 3, &quot;availability&quot;: &quot;Y&quot; } ], &quot;Wednesday&quot;: [], &quot;Thursday&quot;: [], &quot;Friday&quot;: [], &quot;Saturday&quot;: [], &quot;Sunday&quot;: [] }</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/routes/router.js",
    "group": "_home_riya_Doctor_Appointments_Scheduling_System_server_routes_router_js",
    "groupTitle": "_home_riya_Doctor_Appointments_Scheduling_System_server_routes_router_js",
    "name": "PostFindworkinghours"
  },
  {
    "type": "post",
    "url": "/updateWorkingHours/",
    "title": "",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Mandatory id{Unique} of the doctor, working hours of the doctor corresponding to this id will be updated.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "day",
            "description": "<p>Mandatory &quot;Monday&quot; or &quot;Tuesday&quot; or &quot;Wednesday&quot; or &quot;Thurday&quot; or &quot;Friday&quot; or &quot;Saturday&quot; or &quot;Sunday&quot;. Days of the week corresponding to which schedule will be updated</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "slot",
            "description": "<p>Mandatory Eg -&quot;17-18&quot; or &quot;10-11&quot; etc.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "noOfPatients",
            "description": "<p>Optional Number of Patients that Doctor want to attend in this particular slot Default=3.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "availability",
            "description": "<p>Optional Eg -&quot;Y&quot; or &quot;N&quot; Default=&quot;Y&quot; i.e by default doctor will be considered available for this slot.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "ErrorCode",
            "description": "<p>0</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "Message",
            "description": "<p>Updated Successfully</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/routes/router.js",
    "group": "_home_riya_Doctor_Appointments_Scheduling_System_server_routes_router_js",
    "groupTitle": "_home_riya_Doctor_Appointments_Scheduling_System_server_routes_router_js",
    "name": "PostUpdateworkinghours"
  }
] });
