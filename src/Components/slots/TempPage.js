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
import NavigationBar from '../navigationbar'
import DatePicker from 'react-custom-date-picker'



////// WARNING : PASS ALL THE PROPS RECEIVED IN THIS COMPONENT TO SLOT BOOKING PAGE OTHERWISE IT WILL NOT WORK/////

class TempPage extends Component {
 
    constructor(props) {
    super(props);
    this.state = ({
        date:new Date(),
        bookSlot:false,
    });
    this.timeGone=false;

    }

    onChange = (date) =>{
        this.timeGone=date < new Date();
        this.setState({
            date:date
        },()=>{
            if(this.state.date.toDateString()==new Date().toDateString())
            {
                this.setState({
                    date:new Date()
                });
                this.timeGone=false;
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
      var link='https://www.google.com/maps/place/Nidhi+Multispeciality+Hospital/@23.0401044,72.5592146,17z/data=!3m1!4b1!4m15!1m7!3m6!1s0x395e84f521440d4b:0x6853ee97a9a2996b!2sNavrangpura,+Ahmedabad,+Gujarat!3b1!8m2!3d23.0365437!4d72.5611395!3m6!1s0x395e848c996426c3:0x915350ab1da7fe78!8m2!3d23.0400999!4d72.5614035!9m1!1b1'
    /*  Props of doctorName and other doctor details  will be send by Parent Page */
    return (

        <React.Fragment>
            <NavigationBar/>

            <div className="d-flex justify-content-center">
                <div  className="d-flex justify-content-center">
                <h3><button className="btn btn" style={{backgroundColor:'#114466',height:'70%',marginBottom:'10%',fontSize:'70%',padding:'1%'}}><b>Book a Slot</b></button></h3>
                </div>
            </div>
            
            <div className="d-flex justify-content-center">
                <div className="d-flex justify-content-center" style={{width:'50%'}}>
                <form style={{border:"3px solid grey",marginTop:'1%',borderRadius:'4%',padding:'0.5%',backgroundColor:'#254e58',borderBottomLeftRadius:'4%' }}>
                <div className='list-group' style={{border:"3px solid grey"}}>
                <div className='list-group-item' style={{backgroundColor:'#f1f1f1'}}>
                <h2 style={{textAlign:"center"}}>Clinic Details</h2>
                <h4 style={{fontSize:'14px',marginTop:'1%'}}><b>Clinic Name: </b>{/*data.doctor*/}</h4> 
                                <h4 style={{fontSize:'14px'}}><b>Doctor Name: </b>{/*data.doctor*/}</h4> 
                                <h4 style={{fontSize:'14px'}}><b>Specialist: </b>{/*data.doctor*/}</h4>
                                <h4 style={{fontSize:'14px'}}><b>Degree: </b>{/*data.doctor*/}</h4>
                                <h4 style={{fontSize:'14px'}}><b>Gender: </b>{/*data.doctor*/}</h4>
                                <h4 style={{fontSize:'14px'}}><b>Age: </b>{/*data.doctor*/}</h4>
                                <h4 style={{fontSize:'14px'}}><b>Phone: </b>{/*data.doctor*/}</h4>                                
                                <h4 style={{fontSize:'14px'}}><b>Clinicfees: </b>{/*data.doctor*/}</h4>
                                <h4 style={{fontSize:'14px'}}><b>Street: </b>{/*data.doctor*/} </h4>
                                <h4 style={{fontSize:'14px'}}><b>Area: </b>{/*data.doctor*/} </h4>
                                <h4 style={{fontSize:'14px'}}><b>City: </b>{/*data.doctor*/}</h4>
                                {/* <AuthorizedRoute permission={this.state.user === 'patient' ? true : false }  path="/slotbook" exact strict 
                                 component={Slotbook} patientId={this.state.key}  />  */}
                                {/* <AuthorizedComponent
                                    component={Gotoslot} permission={true}  />                                */}
                                 {/* <Link to="/slotbook/john" >go to sloot book</Link>    */}
                                <div className="d-flex justify-content-between" style={{marginTop:'2%'}}>
                                <div className="d-flex justify-content-start">
                                <form action={link} method="get" target="_blank">
                                 <button className="btn btn" style={{borderRadius:'5%',height:"70%",borderEndStartRadius:'5%',backgroundColor:"#3aafa9",fontSize:'70%'}}   >Locate<i style={{marginLeft:'10%'}} className={'fas fa-map-marker-alt'} color="green"/></button>
                                </form>
                                 </div>
                                </div>

                                
                </div>
                </div>        
                </form>
                
               
                </div>
            </div> 

            <div className="d-flex justify-content-center" style={{marginTop:'3%'}}>
                                <div className="d-flex justify-content-center">
                                  <form style={{height:'100%'}}>
                                  <h4><b style={{fontSize:'20px'}}>Date: </b><DatePicker date={this.state.startDate}
                                            handleDateChange={this.onChange} inputStyle={{height:'30px',backgroundColor:'white'}}/></h4>
                                </form>
                                </div>
                                </div>           


        </React.Fragment>



    //   <div> 
    //     { !this.state.bookSlot && 
    //     <div>
    //     <div>
    //       <h2 align="center">{this.props.computedMatch.params.id}</h2>
    //       <br></br>
    //     </div>

    //     <div>
    //     <button type="button" className="btn btn-primary" onClick={this.onTodayClick}>Today</button>
    //     <button type="button" className="btn btn-primary" onClick={this.onTomorrowClick}>Tomorrow</button>
    //     </div>
    //     <Calendar className="calendar" onChange={this.onChange}/> 
    //    <br></br>
    //    <br></br>
    //     <button type="button" className="btn btn-primary btn-lg btn-block" onClick={this.bookSlot}>Proceed for Booking</button>
    //     </div>
    //     } 
    //     <div>
    //     { this.state.bookSlot && <SendProps doctorName={this.props.computedMatch.params.id} patientId={this.props.patientId} searchDate={this.state.date}
    //         timeGone={this.timeGone}
    //     />}
    //     </div>
    // </div>
    );
  }
}

export default TempPage;