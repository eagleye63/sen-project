import React, { Component } from "react";
//import "./DoctorDescription.css";
//import "./todaytomorrow.css";
//import "./TempPage.scss";
import PropTypes from "prop-types";
import firebase from '../../config/configuration'
import Calendar from 'react-calendar';
import Button from 'react-bootstrap/Button'
import SlotBooking from "./jeettmp";
import SendProps from "./SendProps";
import 'bootstrap/dist/css/bootstrap.min.css';



////// WARNING : PASS ALL THE PROPS RECEIVED IN THIS COMPONENT TO SLOT BOOKING PAGE OTHERWISE IT WILL NOT WORK/////

class TempPage extends Component {
 
    constructor(props) {
    super(props);
    this.state = ({
        date:new Date(),
        bookSlot:false,
    });
    
    }

    onChange = (date) =>{
        this.setState({
            date:date
        },()=>{
            if(this.state.date.toDateString()==new Date().toDateString())
            {
                this.setState({
                    date:new Date()
                });
            }
            console.log('new state is '+this.state.date);
        });
    };

    onTodayClick = ()=>{
        var today=new Date();
        this.setState({
            date:today
        },()=>{
            console.log('todays date is '+this.state.date);
        });
    }

    onTomorrowClick = ()=>{
        var tomorrow=new Date();
        tomorrow.setDate(tomorrow.getDate()+1);
        tomorrow.setHours(0,0,0,0);
        this.setState({
            date:tomorrow
        },()=>{
            console.log('tomorrow date is '+this.state.date);
        });
    }

    bookSlot = ()=>
    {
        this.setState({
            bookSlot:true,
        });
    }


  render() {
      console.log(this.state.bookSlot);
      console.log(' in temp page doctor key '+  this.props.computedMatch.params.id);
      console.log('in temppage patient key '+this.props.patientId);
    /*  Props of doctorName and other doctor details  will be send by Parent Page */
    return (
      <div className="bodypage"> 
        { !this.state.bookSlot && 
        <div>
        <div>
          <h2 align="center">{this.props.computedMatch.params.id}</h2>
          <p> Enter the specialities of Doctor here</p>
          <br></br>
        </div>

        <div className="todaytomorrow">
        <button type="button" className="btn btn-primary" onClick={this.onTodayClick}>Today</button>
        <button id="b5" type="button" className="btn btn-primary" onClick={this.onTomorrowClick}>Tomorrow</button>
        </div>
        <Calendar className="calendar" onChange={this.onChange}/> 
       <br></br>
       <br></br>
        <button type="button" className="btn btn-primary btn-lg btn-block" onClick={this.bookSlot}>Proceed for Booking</button>
        </div>
        } 
        <div>
        { this.state.bookSlot && <SendProps doctorName={this.props.computedMatch.params.id} patientId={this.props.patientId} searchDate={this.state.date}/>}
        </div>
    </div>
    );
  }
}

export default TempPage;