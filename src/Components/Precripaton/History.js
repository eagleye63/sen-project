import React, { Component } from 'react';
import firebase from '../../config/configuration';
import {Spinner} from 'reactstrap';
import FlipMove from "react-flip-move";


 class History extends Component {

    constructor(props) {
      super(props)
    
      this.state = {
       prescription:[],
       isloading:false
      }
    }

    componentDidMount=()=>{
        this.setState({isloading:true});
       console.log(this.props);
       let patient;
        //  this.props.user ?
        //  patient=this.props.patientid
        //  : patient=this.props.computedMatch.params.id
         
         if(this.props.user==='clinic'){
          patient =this.props.computedMatch.params.id
         }else{
          patient=this.props.patientid
         }
       
       console.log('patientid'+patient)
       
       let db=firebase.database().ref('storage').child(patient);
       console.log(db);
       if(db)
       {
       db.once('value').then(snapshot=>{
         if(snapshot.val()==null)
         this.setState({isloading:false});
         snapshot.forEach(child1=>{
           if(!child1.val().max)
           {
           firebase.storage().ref(patient).child(child1.val().filename).getDownloadURL().then(url=>{
             firebase.storage().ref(patient).child(child1.val().filename).getMetadata().then(metadata=>{
               console.log(new Date(metadata.timeCreated));

               let prescription1=this.state.prescription;
               prescription1.push({
                  'clinic':child1.val().clinic,
                  'link':url,
                  'description':child1.val().description,
                  'time':metadata.timeCreated
               })

               prescription1.sort(function(a,b){return b.time-a.time});
               this.setState({
                 prescription:prescription1,
                 isloading:false
               })
               console.log(this.state.prescription)
              

             })
           })
          }
         })
        
        
       }).catch(()=>{console.log('i am in catch')});
      
      }
      else
      {
        console.log('i am in null')
        this.setState({isloading:false});
      }
       

    }
    

  render() {

      if(this.state.isloading)
      {
         return (
          <div>
            <Spinner color="primary" />
          </div>
        )
      }


        let arrayofhistory=this.state.prescription.map(prescription=>{
          return (
            <div href="#" className="list-group-item ">
              <h4 className="list-group-item-heading">
                {prescription.clinic}hiiiiiiiiii
              </h4>
              <p className="list-group-item-text">
                <text style={{color:'blue'}}> Time:&nbsp; &nbsp; &nbsp;  </text>
                {new Date(prescription.time).toString()}
              </p>
              <p className="list-group-item-text">
                <text style={{ color: 'blue' }}>Description:&nbsp; &nbsp; &nbsp;</text>
                {prescription.description}
              </p>
              <a
                href={prescription.link}
                className="list-group-item-text"
                target="_blank"
              >
                <button className="download">Download</button>
              </a>
            </div>
          );
        })
      
    return (
      <div>
        <h2 style={{ color: "red", textAlign: "center" }}>
          Past Appointments
        </h2>
        <FlipMove duration={500} easing="cubic-bezier(0,0,1,1)">
          {arrayofhistory}
        </FlipMove>
      </div>
    );
  }
}
export default History;