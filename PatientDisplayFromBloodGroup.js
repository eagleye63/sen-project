import React, { Component } from 'react'
import { Spinner } from 'reactstrap';
import firebase from './firebase'
import './PatientDisplay.css'



class PatientDisplayFromBloodGroup extends Component {

    constructor(props) {
      super(props);
      this.patientkeys=[];
      this.state = {
         bloodgroup:this.props.bloodgroup,
         isDataAvailable:false,
         display:[]
      }
      
    }

    componentDidMount()
    {
        let patient=firebase.database().ref('blood group').child(this.state.bloodgroup);
        patient.once("value",snapshot=>{
            const val=snapshot.val();
            var keys=Object.keys(val);
            for(let i=0;i<keys.length;i++)
            {
              this.patientkeys.push(keys[i]);
            }
            this.displayPatientdetails();
            });
            console.log('component mounted')
    }

    displayPatientdetails= () => {
      let arr=[];

      console.log(this.patientkeys)
        //console.log('called')
        let patient=firebase.database().ref('patient');
        for(let i=0;i<this.patientkeys.length;i++)
        {
         // console.log(typeof this.patientkeys[i]);
          let temppatient=patient.child(this.patientkeys[i]);
          //console.log(temppatient);
          var name,age,area,gender;
          temppatient.once("value").then(snapshot=>{
            const val=snapshot.val();
            //console.log(val);
            name=val.name;
            age=val.age;
            area=val.area;
            gender=val.gender;
            console.log(name+" "+age+" "+area+" ");
            //console.log(this.display);
           // this.display.push(<button>hello</button>)
            arr.push({
              'name':name,
              'age':age,
              'gender':gender,
              'area':area
            })
            this.setState({
              display: arr,
            })

            
          })

         

          //console.log(i==(this.patientkeys.length-1))
          if(i===(this.patientkeys.length-1))
            {
              this.setState({
                isDataAvailable:true,
              })
            }
        }

    }
    

  render() {

    var patientdetails=this.state.display.map(name1=>{
      return (
        <div className="list-group-item ">
          <p4 className="list-group-item-text">name:{name1.name}</p4>
          <p className="list-group-item-text">gender:{name1.gender}</p>
          <p className="list-group-item-text">age:{name1.age}</p>
          <p className="list-group-item-text">area:{name1.area}</p>
        </div>
      );
     })


    return (
        (!this.state.isDataAvailable && 
        (<div> 
        <Spinner color="primary" />
         </div>)) ||
        
        (this.state.isDataAvailable && 
        (<div>  
          <h1>Display</h1> 
          <br></br>
            {
              patientdetails
            }
        </div>
        ))
  )
}
}

export default PatientDisplayFromBloodGroup;