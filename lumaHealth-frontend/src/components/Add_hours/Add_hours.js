import React, {Component} from 'react';
import axios from 'axios';
import {Redirect} from 'react-router';
import Select from 'react-select';

class Add_hours extends Component{
        state = {
          doctors: [],
          selecteddoctor: "",
          day: "",
          S1: false,
          S2: false,
          S3: false,
          S4 : false
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
        toggleChangeS1 = () => {
          this.setState(prevState => ({
            S1: !prevState.S1,
          }));
        }
      
        toggleChangeS2 = () => {
          this.setState(prevState => ({
            S2: !prevState.S2,
          }));
        }
      
        toggleChangeS3 = () => {
          this.setState(prevState => ({
            S3: !prevState.S3,
          }));
        }

        toggleChangeS4 = () => {
          this.setState(prevState => ({
            S4:  !prevState.S4,
          }));
        }
      
        onSubmit = (e) => {
          e.preventDefault();
          let arr = [];
            if(this.state.S1=== true) 
              arr.push("S1");
            if(this.state.S2=== true) 
                arr.push("S2");
            if(this.state.S3=== true) 
                  arr.push("S3");
            if(this.state.S4=== true) 
                    arr.push("S4");
          let data = {
            slots: arr,
            selecteddoctor: this.state.selecteddoctor,
            day: this.state.day 
          };
          axios.post('http://localhost:3001/add_hours', data)
                .then(res => console.log(res.data));
        }
      

        DayChangeHandler = (val) => {
          console.log(val);
          this.setState({
              day: val
          })
      }
       
        render() {
          const options = [
            // ...
            { value: 'Monday', label: 'Monday' },
            { value: 'Tuesday', label: 'Tuesday' },
            { value: 'Wednesday', label: 'Wednesday' },
            { value: 'Thursday', label: 'Thursday' },
            { value: 'Friday', label: 'Friday' },
            // ...
        ];
          return (
            <div class="container">
               <h3>Select Doctor</h3>
        <hr />
            <div style={{ width: '30%' }} class="form-group">
              <select value={this.state.selecteddoctor} 
                      name="Doctor name"
                      onChange={(e) => this.setState({selecteddoctor: e.target.value})}>
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
                                   <h3>Select Shift Timings</h3>
        <hr />
                                   <div className="form-check">
                                   <label className="form-check-label">
              <input type="checkbox"
                checked={this.state.S1}
                onChange={this.toggleChangeS1}
                className="form-check-input"
              />
              S1 (11:00 AM to 12:00 PM)
            </label>
          </div>
          <div className="form-check">
            <label className="form-check-label">
              <input type="checkbox"
                checked={this.state.S2}
                onChange={this.toggleChangeS2}
                className="form-check-input"
              />
              S2 (12:00 PM to 1:00 PM)
            </label>
          </div>
          <div className="form-check">
            <label className="form-check-label">
              <input type="checkbox"
                checked={this.state.S3}
                onChange={this.toggleChangeS3}
                className="form-check-input"
              />
              S3 (1:00 PM to 2:00 PM)
            </label>
          </div>
          <div className="form-check">
            <label className="form-check-label">
              <input type="checkbox"
                checked={this.state.S4}
                onChange={this.toggleChangeS4}
                className="form-check-input"
              />
              S4 (2:00 PM to 3:00 PM)
            </label>
          </div>
          <div className="form-group">
            <button className="btn btn-primary" onClick = {this.onSubmit}>
              Submit
            </button>
          </div>
         </div>
          )
        }
      }


export default Add_hours;