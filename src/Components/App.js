import React,{Component} from 'react';
import Publicpage from './public-page/PublicPage';
import Login from './public-page/Login';
import Signup from './public-page/SignUp';
import firebase from '../config/configuration';
// import SendProps from './SendProps';
// import SlotBooking from './SlotBooking';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css'
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import AuthorizedRoute from './AuthorizedRoute';
import Home from './home-page/homepage';
import Slotbook from './slots/jeettmp';
import Currappo from './appoitment-page/currappo';
import Reviappo from './appoitment-page/reviappo';
import Profile from './profile/Profile';
import { CLIENT_RENEG_LIMIT } from 'tls';
import Signuppagedoc from './public-page/Signupdoc';
import Signuppagepat from './public-page/SignUp'
import Clinicdate from './home-page/ClinicDate';
import TempPage from './slots/TempPage';
import Precripation from './Precripaton/History';
import ExeRedirect from './profile/ExeRedirect';

export const Context = React.createContext();

class App extends React.PureComponent{
    constructor(props){
        super(props);
        this.state={
            isAuthenticated: false,
            user:'',
            // patient or clinic
            key:'',
            email:"",
            password:""
         }
         this.handleChage = this.handleChage.bind(this);
         this.submitHandler = this.submitHandler.bind(this);
         
         //user: patient or clinic 
        

    }

    handleChage=(event)=>{
        const {name, value} = event.target;
       this.setState(prevState => {
          prevState = JSON.parse(JSON.stringify(this.state));
          prevState[name] = value;
          //console.log(prevState);
          return  prevState;
       })
    }
   
    submitHandler=(event)=>{
        event.preventDefault();
        var flag=1;
       // console.log('hii'); 
       //console.log(this.state);
                firebase.auth().signInWithEmailAndPassword(this.state.email,this.state.password).catch((error)=>{
              var errorCode = error.code;
              var errorMessage = error.message;
              alert(errorMessage+'\n'+'please try again');
              flag=0;
          }).then(()=>{
            //1  
              var user=firebase.auth().currentUser.uid;
              
              if(flag)
              { 
                //1
                firebase.database().ref('list').child(user).on('value',snapshot=>{
                    console.log(this);
               //0    
              if(snapshot.val().type=='patient')
              {console.log('patient');
                 console.log('i am in logi '+snapshot.key);
              this.setState({
                  user: 'patient',
                  isAuthenticated: true,
                  key:snapshot.key

              })

             
            }
              else{
                 console.log('i am in logi doctor');
                // console.log('i am in logi '+snapshot.key);
                //console.log(this.state);
                this.setState({
                    user: 'clinic',
                    isAuthenticated: true,
                    key:snapshot.key
  
                })
                
             
              }
              
              }
                )
          }
        })
        
      }

    logout=()=>{

    }
    
  
    render(){
   //     const {isAuthenticated}=this.state;
        // console.log('i am in render isauthancated '+this.state.isAuthenticated);
        // console.log('i am in render user '+this.state.user);
        // console.log('i am in render key '+this.state.key);
        // console.log('i am in render '+this.state.key);
        // console.log('i am in render user '+this.state.user);
        if(this.state.isAuthenticated){
            document.body.style.background = "#ffffff";
            console.log('fuck you');
        }
        else{
        // var urlString = 'url(' + require('../images/publicpage2.jpg') + ')'; 
        // //urlString.style.width=100;
        // document.body.style.background = urlString;
        // document.body.style.backgroundSize = "cover";
        // document.body.style.backgroundPositionY= "-50px";
        // document.body.style.backgroundRepeat = "no-repeat";
       
       document.body.style.backgroundImage= "linear-gradient(toright, rgba(83, 76, 97, 0.322), rgb(46, 50, 65))";
       document.body.style.backgroundSize= "cover";
      
        /* Control the height of the image */
        
       // console.log('hi i am here'+this.state.isAuthenticated);
        /* Center and scale the image nicely */
        document.body.style.opacity= "1";
        
        }
        
        return(
            <Context.Provider value={
                {
                    user:this.state.user,
                    id:this.state.key
                }
            }>

            
            <Router>
                <React.Fragment>
                    <Switch>
                    {/* <Publicpage />  */}
                    <AuthorizedRoute permission={true}  path="/" exact strict
                        component={this.state.isAuthenticated ? Home : Login }
                        user={this.state.user} email={this.state.email} password={this.state.password} 
                        submitHandler={this.submitHandler} 
                        handleChage={this.handleChage}
                        email={this.state.email} password={this.state.password}
                        id={this.state.key}
                        />
                   <AuthorizedRoute permission={true}  path="/signupclinic" exact strict 
                        component={Signuppagedoc}/>
                        <AuthorizedRoute permission={true}  path="/signuppatient" exact strict 
                        component={Signuppagepat}/>
                    <AuthorizedRoute permission={this.state.user === 'patient' ? true : false }  path={"/slotbook/:id"}  
                        component={TempPage} patientId={this.state.key}  />
                    <AuthorizedRoute permission={this.state.user === 'patient' ? true : false } path="/currappoitment" exact strict 
                        component={Currappo} patientid={this.state.key} />
                        <AuthorizedRoute permission={this.state.user === 'patient' ? true : false}  path="/prescription" exact strict 
                        component={Precripation}  patientid={this.state.key} user={this.state.user} />
                        <AuthorizedRoute permission={this.state.user === 'clinic' ? true : false } path={"/prescription/:id"} exact strict 
                        component={Precripation}  user={this.state.user}/>                        
                    <AuthorizedRoute permission={this.state.user === 'patient' ? true : false }  path={"/slotbook/:id"}  
                        component={TempPage} patientId={this.state.key}  />
                        <AuthorizedRoute permission={true} path="/Myprofile" exact strict 
                        component={Profile} user={this.state.user} id={this.state.key} />
                        

                    {/* <Route render={() => <Redirect to='/'/>}/>                   
                    <Route render={() => <Redirect to='/'/>}/> */}
                    </Switch>
                </React.Fragment>
             
            </Router>
            </Context.Provider>
            
             //<SendProps doctorName="Parth Patel"/>
        );
    }
}

export default App;