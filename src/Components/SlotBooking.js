import React, { Component } from "react";
import "./DoctorDescription.css";
import firebase from './firebase'

class SlotBooking extends Component {
   constructor(props) {
   super(props);
  // console.log('loop');
   //fetches the string from database of doctor


   /*const patients=firebase.database().ref('/clinic').child("navkar12 gmail com").once("value").then(snapshot=>{
       const val=snapshot.val();
       this.slotsDatabase=val.slot_string;
       this.workingtime=val.working_time;
       this.slotInterval=val.slot_time;
       this.breaktime=val.breaktime;
        console.log(this.slotsDatabase);
        console.log('hello'+this.workingtime);
        console.log(this.slotInterval);
        console.log(this.breaktime);

   })*/
   this.slotsDatabase=this.props.slotsDatabase;
   this.workingtime=this.props.workingtime;
   this.slotInterval=this.props.slotInterval;
   this.breaktime=this.props.breaktime;
  /* console.log("new "+this.slotsDatabase);
   console.log("new "+this.workingtime);
   console.log("new "+this.slotInterval);
   console.log("new "+this.breaktime); 
   */
   // var slotsDatabase = "00000011110000000000";
  // var slotInterval=20; //fetches from database
  this.slotInterval=parseInt(this.slotInterval,10);
  // var workingtime = "10:00 to 15:00"; //fetches from database
 
   var arrayWorkingtime = this.workingtime.split(" ");
   //   console.log(arrayWorkingtime);
   var startHour = arrayWorkingtime[0].split(":")[0];
   var startMinute = arrayWorkingtime[0].split(":")[1];
   //console.log(startTimeHour+" "+startMinute);
   var endHour = arrayWorkingtime[2].split(":")[0];
   var endMinute = arrayWorkingtime[2].split(":")[1];
   // console.log(endHour+" "+endMinute);
  // this.breaktime = ["12:00 to 13:00", "14:00 to 15:00"]; //fetches array of string from database
   /*Array for break times of Doctor
       contains object with properties: starthour,startminute,endhour,endminute
      */
    //console.log('hello '+this.breaktime);
    // this.breaktime=this.breaktime.split(",");
      this.breakArray = [];
   for (let i = 0; i < this.breaktime.length; i++) {
     let tempObj = this.breaktime[i].split(" ");
     this.breakArray.push({
       startHour: tempObj[0].split(":")[0],
       startMinute: tempObj[0].split(":")[1],
       endHour: tempObj[2].split(":")[0],
       endMinute: tempObj[2].split(":")[1]
     });
   }
    //console.log(this.breakArray);

   //rows is an Array which contains all the rows that are to be printed for slots
   this.rows = [];
   var currentHour=parseInt(startHour,10);
   var currentMinute=parseInt(startMinute,10);
   for (let i = 0; i < this.slotsDatabase.length; i++) {
       if(currentMinute>=60)
       {
          
           currentHour+=Math.floor(currentMinute/60);
           //console.log(Math.floor(currentMinute/60));
           currentMinute=currentMinute%60;
       }
       var NextMoment=(parseInt(currentMinute,10)+60*parseInt(currentHour,10))+parseInt(this.slotInterval,10);
       var NextHour=Math.floor(NextMoment/60);
       console.log(NextHour+" "+NextMoment);
       var NextMinute=NextMoment%60;
       var isInBreak=this.checkIsInBreak(currentHour,currentMinute,NextHour,NextMinute);
       var alreadyBooked=(this.slotsDatabase[i]===1); //Check Here Might Cause Bug
       if(currentHour.toString().length<2)
       {
         currentHour='0'+currentHour.toString();
       }
       if(currentMinute.toString().length<2)
       {
         currentMinute='0'+currentMinute.toString();
       }
       if(NextHour.toString().length<2)
       {
         NextHour='0'+NextHour.toString();
       }
       if(NextMinute.toString().length<2)
       {
         NextMinute='0'+NextMinute.toString();
       }
       if(isInBreak || alreadyBooked)
       {
           //booked
           this.rows.push(<button key={i} id="Booked" onClick={this.giveErrorPrompt}>{currentHour}:{currentMinute} - {NextHour}:{NextMinute}</button>);
       }
       else
       {
           //not booked
           this.rows.push(<button key={i} id="notBooked" onClick={this.bookThisSlot}>{currentHour}:{currentMinute} - {NextHour}:{NextMinute}</button>);
       }
       currentHour=NextHour;
       currentMinute=NextMinute;
   }

   this.state = {
     slots:  this.slotsDatabase
   };
 }

 /////// Function to give error prompt for selecting booked Slot ///////
 giveErrorPrompt = () =>
 {
   alert('You can\'t book this slot, It is not available for Booking');
 }

 ////// Function to book the current slot selected By User///////
 bookThisSlot = ()=>
 {

 }

   ///// Function to check if current time is in Break or not//////
  checkIsInBreak = (currentHour,currentMinute,NextHour,NextMinute) => {

   console.log(this.breakArray);
   for(let j=0;j<this.breakArray.length;j++)
   {
      // console.log('loop')
       var breakStartHour=parseInt(this.breakArray[j].startHour,10);
       var breakStartMinute=parseInt(this.breakArray[j].startMinute,10);
    //   console.log(breakStartHour+" breakstart "+breakStartMinute);
       var breakEndHour=parseInt(this.breakArray[j].endHour,10);
       var breakEndMinute=parseInt(this.breakArray[j].endMinute,10);
      // console.log(breakEndHour+" breakend "+breakEndMinute);
       var minutesOfBreakStart=breakStartMinute+60*breakStartHour;
       var minutesOfBreakEnd=breakEndMinute+60*breakEndHour;
    // console.log('hello'+ minutesOfBreakStart+" "+minutesOfBreakEnd);
       for(;;)
       {
           if(currentHour>NextHour || (currentHour==NextHour && currentMinute>=NextMinute))
           break;
           if(currentMinute>=60)
           {
               currentHour+=Math.floor(currentMinute/60);
               currentMinute=currentMinute%60;
           }
           var minuteOfCurrentMinute=parseInt(currentMinute,10)+60*parseInt(currentHour,10);
           //console.log('hello '+minuteOfCurrentMinute);
           currentMinute++;
           if(minuteOfCurrentMinute>=minutesOfBreakStart && minuteOfCurrentMinute<=minutesOfBreakEnd)
               return true;
       }
       return false;
   }

 }

 render() {
   return (
     <div>
       {/*  Props of doctorName and other doctor details  will be send by Parent Page */}
       <div id="doctorDescription">
         <h1>{this.props.doctorName}</h1>
         <br />
         <p> Enter the specialities of Doctor here</p>
         <br />
         <br />
       </div>

       <div>

       {
         this.rows.map(row=>row)
       }

       </div>
    
     </div>
   );
 }
}

export default SlotBooking;


