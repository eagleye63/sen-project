import React, { Component } from 'react';
import ReactDOM from 'react-dom';
//import { MenuElementKind } from 'react-navbar'
import { Collapse, NavbarToggler, NavbarBrand } from 'react-bootstrap';
import { NavDropdown, Navbar, Nav, NavItem, NavLink, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'react-bootstrap';
import { FormControl } from 'react-bootstrap';
import { Spinner, Col, Button, Form, FormGroup, Label, Input, FormText, Container } from 'reactstrap';
//import './Clin.css'
import { CardBody, Card } from 'reactstrap';
import firebase from './../../config/configuration';
import FlipMove from "react-flip-move";
import Clinic from './Clinic';
import DatePicker from "react-datepicker";
import NavigationBar from './../navigationbar';
import {Redirect} from 'react-router-dom';

import "react-datepicker/dist/react-datepicker.css";


class ClinicDate extends Component {

    constructor(props) {
        super(props)
        this.state = {
          date: new Date(),
          actualdate: new Date().getDate() + "-" + (new Date().getMonth() + 1) + "-" + new Date().getFullYear(),
          refresher:true,
          clinicname:'',
          redirect:false,
          bld:'select'
        };
    }


    handleChange=(date)=> {
        var actualdate = date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear();
        this.setState({
            startDate: date,
            actualdate:actualdate,
            refresher:!this.state.refresher
        });
        
    }

    handler=(event)=>{
      this.setState({
        bld:event.target.value
      })
    }

    submithandler=(event)=>{
      event.preventDefault();
      if(this.state.bld=='select')
      {
        alert('enter blood group');
      }
      else
      {
          this.setState({
            redirect:true
          })
      }
     
    }

    componentDidMount=()=>{
      firebase.database().ref('clinic').child(this.props.id).once('value').then(snapshot=>{
        this.setState({
          clinicname:snapshot.val().clinicname
        })
      })
    }
    
    
    render() {
      let propdate = this.state.actualdate;
      if(this.state.redirect==true)
      {
        return (
        <Redirect push
          to={{
            pathname: "/BloodGroup",
            state: { bloodgroup: this.state.bld }
          }}
        />
        )
      }

        return (
          <div>
            

           

            <form class="form-inline" onSubmit={this.submithandler}>
              <select value={this.state.bld} onChange={this.handler} required className="form-control">
                <option value="select">Select an Option</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
              </select>


              <button type="submit">Search</button>
            </form>


            <h2>List Of Appointments</h2>
           
              <label>
                <b>DATE: </b>
              </label>
            <DatePicker selected={this.state.startDate}
                        onChange={this.handleChange}/>
             
          

            <Clinic date={propdate} clinic={this.props.id} clinicname={this.state.clinicname} refresh={this.state.refresher} ></Clinic> 
          </div>
        );
    }
}

export default ClinicDate;