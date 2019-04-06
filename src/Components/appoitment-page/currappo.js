import React,{Component} from 'react';
import NavigationBar from '../navigationbar';
import firebase from '../../config/configuration';
 class Currappo extends Component{
     constructor(props){
         super(props);
         this.state={
            clinickey:'',
            clinicname:'',            
            area:'',
            city:''
            
         }

     }
     componentDidMount(){
         this.getcurrentappo();
        
     }
     componentWillMount(){
       // this.getclinic();
     }
     getcurrentappo=()=>{
        let clinicsref=firebase.database().ref('/patient').child("sengroup31 gmail com").child("current_appointment");
        clinicsref.on("value",snapshot=>{
            const val=snapshot.val();
            this.setState({
                clinickey : val.clinic
            },()=>{
                let clinicdetail=firebase.database().ref('/clinic').child(this.state.clinickey);
                clinicdetail.on("value",snapshot=>{
                    const val2=snapshot.val(); 
                     this.setState({
                        clinicname : val2.name
                    })
                          
                })
            })
                     
        })
       

     }
    //  getclinic=()=>{
    //      console.log('print clinic key length'+ this.state.clinickey.length);
    //     let clinicsref=firebase.database().ref('/clinic').child(this.state.clinickey);
    //     clinicsref.on("value",snapshot=>{
    //         const val=snapshot.val();
    //         this.setState({
    //             clinicname : val.name
    //         })
                     
    //     })  
    //  }
     render(){
        console.log('currappo key  ' +this.state.clinickey) ; 
        console.log('currappo name length ' +this.state.clinicname.length) ; 
        console.log('currappo name  ' +this.state.clinicname) ; 
       // console.log(`${this.state.clinickey}`);
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