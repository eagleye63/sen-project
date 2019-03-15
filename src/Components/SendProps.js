import React, { PureComponent } from 'react'
import SlotBooking from './SlotBooking';
import firebase from './firebase'

class SendProps extends PureComponent {

   constructor(props) {
     super(props)

     this.state= {
         isDataAvailable:false
     };
      
     const patients=firebase.database().ref('/clinic').child("navkar12 gmail com");
   patients.on("value",snapshot=>{
       const val=snapshot.val();
       this.slotsDatabase=val.slot_string;
       this.workingtime=val.working_time;
       this.slotInterval=val.slot_time;
       this.breaktime=val.breaktime;
       this.setState(
           {
               isDataAvailable:true
           },
           ()=>
           {
               console.log('state is '+this.state.isDataAvailable);
       console.log(this.slotsDatabase);
        console.log(this.workingtime);
        console.log(this.slotInterval);
        console.log(this.breaktime);
           }
       );
      

   });

   }
  

 render() {
   return (
       this.state.isDataAvailable &&
     <div>
       <SlotBooking doctorName={this.props.doctorName} slotsDatabase={this.slotsDatabase}
           workingtime={this.workingtime} slotInterval={this.slotInterval}
           breaktime={this.breaktime}
       />
     </div>
   )
 }
}

export default SendProps


