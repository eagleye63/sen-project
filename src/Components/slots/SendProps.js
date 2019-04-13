import React, { PureComponent } from 'react'
import SlotBooking from './slotbooking';
import TempPage from './TempPage'
import firebase from '../../config/configuration'
import { Spinner } from 'reactstrap';
import { isNull } from 'util';

 class SendProps extends PureComponent {

    

    constructor(props) {
      super(props)
      console.log('I am in SendProps '+this.props.searchDate);
      this.getDateString();
      this.dayObject={'Mon':0,'Tue':1,'Wed':2,'Thu':3,'Fri':4,'Sat':5,'Sun':6};
      this.willWork=true;
      this.state= {
          isData1Available:true,
          isData2Available:true,
      };
    }

  componentDidMount=()=>{

    let patients=firebase.database().ref('/clinic').child(this.props.doctorName+"");
    patients.on("value",snapshot=>{
        const val=snapshot.val();
        this.workingtime=val.working_time;
        this.workingdays=val.working_days;
        this.willWork=(this.workingdays.charAt(this.dayObject[this.day],1)=='1')?true:false;
        console.log(this.workingdays.substring(this.dayObject[this.day],1)+ "  this will work on "+this.willWork);
        this.slotInterval=val.slot_time;
        this.breaktime=val.breaktime;
        this.description=val.description;
        this.setState(
            {
                isData1Available:false
            });
        });
      console.log(this.dateString);

      //check here if child is NULL, make new child else update itand pass
      patients=firebase.database().ref('/clinic').child(this.props.doctorName+"").child("date").child(this.dateString);
        console.log('patient is null '+ isNull(patients));
        console.log(patients);
      patients.once("value").then(snapshot=>{
        const val=snapshot.val();
        if(isNull(val))
        {
          this.patient_booking=[];
          this.temptime=(this.workingtime);
          console.log(this.workingtime+"  "+typeof this.workingtime);
          this.temparr=this.temptime.split(' ');
          console.log(this.temparr+"  temparr");
          //starttime is temparr[0] and endtime is temparr[2]
          this.startminutes=0;
          this.endminutes=0;
          this.startingtime=this.temparr[0].split(':');
          this.endingtime=this.temparr[2].split(':');
          console.log(this.startingtime+"  printing "+this.endingtime);
          this.startminutes=parseInt(this.startingtime[0],10)*60+parseInt(this.startingtime[1],10);
          this.endminutes=parseInt(this.endingtime[0],10)*60+parseInt(this.endingtime[1],10);
          console.log(this.startminutes+"   "+this.endminutes+"  minutes  ");
          this.length=Math.ceil(Math.floor(this.endminutes-this.startminutes)/this.slotInterval);

          this.slotsDatabase="";
          for(var xx=0;xx<this.length;xx++)
          {
            this.slotsDatabase=this.slotsDatabase+"0";
          }
          let val=firebase.database().ref('/clinic').child(this.props.doctorName).child("date").child(this.dateString);
          this.arr=[];
          

          val.set({slot_string:this.slotsDatabase});
          this.setState(
            {
                isData2Available:false
            });
        }
        else
        {
        this.patient_booking=val.patient_booking;
        this.slotsDatabase=val.slot_string;
        this.setState(
          {
              isData2Available:false
          });
        }
    });
  }
     
   getDateString = ()=>{
      var str=this.props.searchDate.toDateString();
      str=str.split(" ");
      console.log("datestring is "+str);
      this.day=str[0];
      this.dateString=str[2]+'-'+(this.props.searchDate.getMonth()+1)+'-'+str[3];
      this.offsetTime=this.props.searchDate.getHours()*60+this.props.searchDate.getMinutes();
      console.log(this.offsetTime);
    };
    
//pass dateString and offsetTime to SlotBooking
  render() {
    /*console.log('returning');
    console.log('state is '+this.state.isDataAvailable);
    console.log(this.slotsDatabase);
     console.log(this.workingtime);
     console.log(this.slotInterval);
     console.log(this.breaktime);*/
     if(!this.state.isData1Available && !this.state.isData2Available)
     {
       //will work only if all data is available
       console.log('returning');
      console.log('state is '+this.state.isData1Available+" "+this.state.isData2Available);
      console.log(this.patient_booking);
     console.log(this.slotsDatabase);
        console.log(this.workingtime);
      console.log(this.slotInterval);
      console.log(this.breaktime);
      return (
        <div>
          <SlotBooking doctorName={this.props.doctorName} slotsDatabase={this.slotsDatabase} 
              workingtime={this.workingtime} slotInterval={this.slotInterval} 
              breaktime={this.breaktime} patient_booking={this.patient_booking} 
              patientId={this.props.patientId} 
              dateString={this.dateString} offsetTime={this.offsetTime} description={this.description}
          />
        </div>
      )
    }
    else
    {
      return (
      <div> 
      <Spinner color="primary" />
       </div>
      )
    }
  }
}

export default SendProps