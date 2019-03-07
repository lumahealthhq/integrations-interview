import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import Login from './Login/Login';
import Home from './Home/Home';
import Create from './Create/Create';
import Add_hours from './Add_hours/Add_hours';
import Book from './Book/Book'
import Navbar from './LandingPage/Navbar';
//Create a Main Component
class Main extends Component {
    render(){
        return(
            <div>
                {/*Render Different Component based on Route*/}
                <Route path="/" component={Navbar}/>
                <Route path="/login" component={Login}/>
                <Route path="/home" component={Home}/>
                <Route path="/create" component={Create}/>
                <Route path="/add_hours" component={Add_hours}/>
                <Route path="/book" component={Book}/>
            </div>
        )
    }
}
//Export The Main Component
export default Main;