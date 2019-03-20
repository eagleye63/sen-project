import React,{Component} from 'react';
import NavigationBar from '../navigationbar';
import firebase from '../../config/configuration';
 class Currappo extends Component{
     constructor(props){
         super(props);
         this.state={
            clinickey:'',
            clinicname:''
         }

     }
     componentDidMount(){
         this.getcurrentappo();
         this.getclinic();
     }
     getcurrentappo=()=>{
        let clinicsref=firebase.database().ref('/patient').child("sengroup31 gmail com").child("current_appointment");
        clinicsref.on("value",snapshot=>{
            const val=snapshot.val();
            this.setState({
                clinickey : val.clinic
            })
                     
        })  

     }
     getclinic=()=>{
        let clinicsref=firebase.database().ref('/clinic').child("navkar12 gmail com");
        clinicsref.on("value",snapshot=>{
            const val=snapshot.val();
            this.setState({
                clinicname : val.name
            })
                     
        })  
     }
     render(){
         return(
             <div>
                 <NavigationBar/>
                 <h1>current appoitment{this.state.clinickey} </h1>
                 <h1>current appoitment clinic name   {this.state.clinicname} </h1>

             </div>
         )
     }
 }
 export default (Currappo);