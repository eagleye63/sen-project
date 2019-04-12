import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { MenuElementKind } from 'react-navbar'
import { Collapse, NavbarToggler, NavbarBrand } from 'react-bootstrap';
import { NavDropdown, Navbar, Nav, NavItem, NavLink, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'react-bootstrap';
import { FormControl } from 'react-bootstrap';
import { Spinner, Col, Button, Form, FormGroup, Label, Input, FormText, Container } from 'reactstrap';
import './Clin.css'
import { CardBody, Card } from 'reactstrap';
import firebase from './firebase';
import FlipMove from "react-flip-move";
import Clinic from './Clinic';
import DatePicker from "react-datepicker";

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
        },console.log(this.state.actualdate+'  '+this.state.refresher));
        
    }
    
    
    render() {
      let propdate = this.state.actualdate;

        return (
          <div>
            <Navbar
              bg="primary"
              className="bg-primary justify-content-between"
              expand="lg"
              sticky="tops"
              variant="dark"
            >
              <Navbar.Brand href="#home">
                <h5>Clinic Name</h5>
              </Navbar.Brand>
              <Nav className="mr-auto">
                <Nav.Link href="#home">
                  <h5>Home</h5>
                </Nav.Link>
                <Nav.Link href="#features">
                  <h5>Features</h5>
                </Nav.Link>
                <Nav.Link href="#pricing">
                  <h5>Pricing</h5>
                </Nav.Link>
              </Nav>
              <form class="form-inline">
                <input
                  type=""
                  id="email"
                  placeholder="Enter blood group"
                  name="bld"
                  onChange={this.handler}
                />
                <button type="submit">Search</button>
              </form>
            </Navbar>

            <h2>List Of Appointments</h2>
           
              <label>
                <b>DATE: </b>
              </label>
            <DatePicker selected={this.state.startDate}
                        onChange={this.handleChange}/>
             
          

            <Clinic date={propdate} clinic={'navkar12 gmail com'} refresh={this.state.refresher} ></Clinic> 
          </div>
        );
    }
}

export default ClinicDate;
