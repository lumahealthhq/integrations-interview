import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';

class Home extends Component {
    constructor(){
        super();
        this.state = {  
            doctors : []
        }
    }  
    //get the doctors data from backend  
    componentDidMount(){
        axios.get('http://localhost:3001/home')
                .then((response) => {
                console.log("Response : ",response.data.Doctors);
                this.setState({
                    doctors : response.data.Doctors 
                });
            });
    }

    render(){
        //iterate over doctors to create a table row
         let details = this.state.doctors.map(doctor => {
            return(
                <tr>
                    <td>{doctor.Email}</td>
                    <td>{doctor.Name}</td>
                </tr>
            )
        }) 
        //if not logged in go to login page
        let redirectVar = null;
        if(!cookie.load('cookie')){
            redirectVar = <Redirect to= "/login"/>
        }
        return(
            <div>
                {redirectVar}
                <div class="container">
                    <h2>List of All Doctors</h2>
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>Doctor Email</th>
                                    <th>Name</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/*Display the Tbale row based on data recieved*/}
                                 {details} 
                            </tbody>
                        </table>
                </div> 
            </div> 
        )
    }
}
//export Home Component
export default Home;