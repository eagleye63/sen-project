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

import "react-datepicker/dist/react-datepicker.css";


class ClinicDate extends Component {

    constructor(props) {
        super(props)
        this.state = {
          date: new Date(),
          actualdate: new Date().getDate() + "-" + (new Date().getMonth() + 1) + "-" + new Date().getFullYear(),
          refresher:true
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
    
    
    render() {
      let propdate = this.state.actualdate;

        return (
          <div>
            
            {/* <form class="form-inline">
                <input
                  type=""
                  id="email"
                  placeholder="Enter blood group"
                  name="bld"
                  onChange={this.handler}
                />
                <button type="submit">Search</button>
              </form> */}

            <h2>List Of Appointments</h2>
           
              <label>
                <b>DATE: </b>
              </label>
            <DatePicker selected={this.state.startDate}
                        onChange={this.handleChange}/>
             
          

            <Clinic date={propdate} clinic={this.props.id} refresh={this.state.refresher} ></Clinic> 
          </div>
        );
    }
}

export default ClinicDate;