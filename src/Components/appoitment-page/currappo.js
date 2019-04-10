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
            city:'',
            flag:false ,
            appointmentlist :[],
            clinicdetail : []
            
         }

     }
     componentDidMount(){
         this.getcurrentappo();
         //this.getclinics();
        
     }
     componentWillMount(){
       // this.getclinic();
     }
     getcurrentappo=()=>{
         console.log('in curr apoo'+this.props.patientid);
        let clinicsref=firebase.database().ref('/patient').child(this.props.patientid).child("current_appointment");
        clinicsref.once("value").then(snapshot=>{
          //  if(!snapshot.val().max) {
            
            snapshot.forEach(child1=>{
                let arr=this.state.appointmentlist;
                if(child1.key!='max')  {
                let obj ={'clinic': child1.val().clinic ,'date' : child1.val().date,'slot_time' :child1.val().slot_time}
                arr.push(obj);
                this.setState({
                    appointmentlist : arr
    
                })
                }
            })
          
           // console.log(arr);
           
        }).then(()=>{
            this.getclinics();
            console.log('fuck uuu');
            console.log(this.state.appointmentlist);
        })
        console.log('fuck uuu');
        console.log(this.state.appointmentlist);
        
        }
        getclinics=()=>{
            console.log('fuc');
            let clinicsref=firebase.database().ref('/clinic');
            console.log('appointment'+this.state.appointmentlist.length);
            this.state.appointmentlist.map(obj1=>{
               // console.log(obj1);
              //  console.log(obj1['clinic']);
                let key =obj1.clinic ;
                console.log('key '+key);
                let a1=clinicsref.child(key).on("value",snapshot=>{
                    const val=snapshot.val();
                    let arr=this.state.clinicdetail;
                    let obj={'clinicname':val.name ,'slot_time':obj1.slot_time,'date':obj1.date,'doname': val.doctor ,'phone': val.phone ,'area' : val.area ,'city':val.city };
                    arr.push(obj);
                    this.setState({
                        clinicdetail : arr,
                        flag :true
                        
                    })
                });
               

                console.log(this.state.clinicdetail);
                
            })

        }
        // console.log('in curr apoo'+clinicsref);
        // clinicsref.on("value",snapshot=>{
        //     const val=snapshot.val();
        //     console.log(snapshot.val());
        //     this.setState({
        //         clinickey : val.clinic
                
        //     },()=>{
        //         console.log('callback key  ' +this.state.clinickey) ; 
        //         let clinicdetail=firebase.database().ref('/clinic').child(this.state.clinickey);
        //         clinicdetail.on("value",snapshot=>{
        //             const val2=snapshot.val(); 
        //              this.setState({
        //                 clinicname : val2.name ,
        //                 flag : true 
        //             })
                          
        //         })
        //     })
                     
        // })

        

     
     render(){

        let print= this.state.clinicdetail.map(obj1=>{
            return (
            <div>
            <h2>{obj1.clinicname}</h2>
            <h2>{obj1.doname}</h2>
            <h2>{obj1.phone}</h2>
            <h2>{obj1.area}</h2>
            <h2>{obj1.date}</h2>
            <h2>{obj1.slot_time}</h2>
            
            <br></br>
            </div>
            )});

        console.log('currappo key  ' +this.state.clinickey) ; 
        console.log('currappo name length ' +this.state.clinicname.length) ; 
        console.log('currappo name  ' +this.state.clinicname) ; 
       // console.log(`${this.state.clinickey}`);
         return(
             this.state.flag  && 
             <div>
                <NavigationBar/> 

                {print}

               {/*  <h1>current appoitment{this.state.clinickey} </h1>
                 <h1>current appoitment clinic name   {this.state.clinicname} </h1> */
         }

             </div>
         )
     }
 }
 export default (Currappo);