import React, {Component} from 'react';
import axios from 'axios';
import {Redirect} from 'react-router';
import Select from 'react-select';

class Book extends Component{
    constructor(props){
        super(props);
        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangeName = this.handleChangeName.bind(this);
        this.handlepatientCreate = this.handlepatientCreate.bind(this);
       
        this.state = {
            email : null,
            name : null,
            patientCreated : false,
            doctors: [],
          selecteddoctor: "",
          day: "",
          slots: [],
          selectedslot: ""
        }
    }
    
    componentDidMount() {
        axios.get('http://localhost:3001/home')
        .then((response) => {
        console.log("Response : ",response.data.Doctors);
        this.setState({
            doctors : response.data.Doctors
        });
    });
      }

      DayChangeHandler = (val) => {
        console.log(val.value);
        this.setState({
            day: val
       })
       var x = val.value;
       var arr = this.state.doctors;
       var y = this.state.selecteddoctor;
       var res = null;
       arr.forEach(function (arrayItem) {
        if(arrayItem.Name == y)
        res = arrayItem;
    });  
       if(res!=null){ 
       this.setState({
           slots: res[x]
       }) 
    }   
    }

    handleChangeEmail = (e) => {
        this.setState({
            email : e.target.value
        })
    }

    handleChangeName = (e) => {
        this.setState({
            name : e.target.value
        })
    }

    handlepatientCreate = (e) => {
        var data = {
            email : this.state.email,
            name : this.state.name,
            selecteddoctor: this.state.selecteddoctor,
            day: this.state.day,
            selectedslot: this.state.selectedslot
        }
        axios.post('http://localhost:3001/book',data)
            .then(response => {
                if(response.status == 200){
                    this.setState({
                        patientCreated : true
                    })
                }else{
                    this.setState({
                        patientCreated : false
                    })
                }
            })
    }

    render(){

        const options = [
            // ...
            { value: 'Monday', label: 'Monday' },
            { value: 'Tuesday', label: 'Tuesday' },
            { value: 'Wednesday', label: 'Wednesday' },
            { value: 'Thursday', label: 'Thursday' },
            { value: 'Friday', label: 'Friday' },
            // ...
        ];

        return(
                <div class="container">
                        <div style={{width: '30%'}} class="form-group">
                            <input onChange = {this.handleChangeEmail} type="text" class="form-control" name="email" placeholder="Patient Email"/>
                        </div>
                        <br/>
                        <div style={{width: '30%'}} class="form-group">
                                <input onChange = {this.handleChangeName} type="text" class="form-control" name="name" placeholder="Patient Name"/>
                        </div>
                        <br/>              
                <h3>Select Doctor</h3>
        <hr />
            <div style={{ width: '30%' }} class="form-group">
              <select value={this.state.selecteddoctor} 
                      name="Doctor name"
                      onChange={(e) => this.setState({selecteddoctor: e.target.value })}>
                options = {this.state.doctors.map((doctor) => <option key={doctor.Name} value={doctor.Name}>{doctor.Name}</option>)}
              </select>
            </div><br />
            <div style={{ width: '30%' }} class="form-group">
            <h3>Select Day</h3>
        <hr />
              <Select
                                           value = {this.state.day}
                                           name="day"
                                           options={options}
                                           onChange={val => this.DayChangeHandler(val)}
                                           placeholder="Day"  
                                       />
           
                                   </div>
                                   <h3>Select Available Slot</h3>
        <hr />
            <div style={{ width: '30%' }} class="form-group">
              <select value={this.state.selectedslot} 
                      name="slot name"
                      onChange={(e) => this.setState({selectedslot: e.target.value})}>
        options = {this.state.slots.map((z) => <option key={z.slot} value={z.slot}>{z.slot} ({z.status})</option>)}
              </select>
            </div><br /> 
                                   <div style={{width: '30%'}}>
                            <button onClick = {this.handlepatientCreate} class="btn btn-success" type="submit">Book</button>
                        </div> 
                                   </div>
        )
    }
}

export default Book;