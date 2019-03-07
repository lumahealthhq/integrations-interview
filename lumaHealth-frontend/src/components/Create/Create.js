import React, {Component} from 'react';
import axios from 'axios';
import {Redirect} from 'react-router';

class Create extends Component{
    constructor(props){
        super(props);
        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangeName = this.handleChangeName.bind(this);
        this.handledoctorCreate = this.handledoctorCreate.bind(this);

        this.state = {
            email : null,
            name : null,
            doctorCreated : false
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

    handledoctorCreate = (e) => {
        var data = {
            email : this.state.email,
            name : this.state.name
        }
        axios.post('http://localhost:3001/create',data)
            .then(response => {
                if(response.status == 200){
                    this.setState({
                        doctorCreated : true
                    })
                }else{
                    this.setState({
                        doctorCreated : false
                    })
                }
            })
    }

    render(){
        let redirect = null;
        if(this.state.doctorCreated){
            redirect = <Redirect to= "/home"/>
        }
        return(
            <div>
                {redirect}
                <br/>
                <div class="container">
                        <div style={{width: '30%'}} class="form-group">
                            <input onChange = {this.handleChangeEmail} type="text" class="form-control" name="email" placeholder="Doctor Email"/>
                        </div>
                        <br/>
                        <div style={{width: '30%'}} class="form-group">
                                <input onChange = {this.handleChangeName} type="text" class="form-control" name="name" placeholder="Doctor name"/>
                        </div>
                        <br/>
                        <div style={{width: '30%'}}>
                            <button onClick = {this.handledoctorCreate} class="btn btn-success" type="submit">Create</button>
                        </div> 
                </div>
            </div>
        )
    }
}

export default Create;