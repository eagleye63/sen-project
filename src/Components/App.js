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
import Slotbook from './slots/slotbooking';
import Currappo from './appoitment-page/currappo';
import Reviappo from './appoitment-page/reviappo';
import Profile from './profile/Profile';
import { CLIENT_RENEG_LIMIT } from 'tls';

export const Context = React.createContext();

class App extends React.PureComponent{
    constructor(props){
        super(props);
        this.state={
            isAuthenticated: false,
            user:'patient',
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
                firebase.auth().signInWithEmailAndPassword(this.state.email,this.state.password).catch((error)=>{
              var errorCode = error.code;
              var errorMessage = error.message;
              alert(errorMessage+'\n'+'please try again');
              flag=0;
          }).then(()=>{
              var user=firebase.auth().currentUser.uid;
              if(flag)
              {
                firebase.database().ref('list').child(user).once('value').then(function(snapshot){
              if(snapshot.val().type=='patient')
              {console.log('patient');
              console.log('i am in logi '+snapshot.key);
              this.setState({
                  user: 'patient',
                  isAuthenticated: true,
                  key:snapshot.key

              },()=>{
                  console.log('fuck bc '+this.state.isAuthenticated);
                  this.forceUpdate();
              })

             
            }
              else{
                console.log('i am in logi doctor');
                console.log('i am in logi '+snapshot.key);
                console.log(this);
                this.setState(prevState=>{
                    prevState['user']= 'doctor';
                    prevState['isAuthenticated']= true;
                    prevState['key']=snapshot.key;
                    return prevState;
  
                },()=>{

                    console.log('fuck bc ');
                   // this.forceUpdate();
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
        console.log('i am in render isauthancated '+this.state.isAuthenticated);
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
                    user:this.state.user
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
                        />
                   
                    <AuthorizedRoute permission={this.state.user === 'patient' ? true : false }  path="/slotbook" exact strict 
                        component={Slotbook}/>
                    <AuthorizedRoute permission={this.state.user === 'patient' ? true : false } path="/currappoitment" exact strict 
                        component={Currappo} />
                        <AuthorizedRoute permission={this.state.user === 'patient' ? true : false } path="/reviappoitment" exact strict 
                        component={Reviappo} />
                        <AuthorizedRoute permission={true} path="/reviappoitment" exact strict 
                        component={Profile} user={this.state.user} />
                        <Route render={() => <Redirect to='/'/>}/>
                   
                    {/* <Route render={() => <Redirect to='/'/>}/> */}
                    </Switch>
                </React.Fragment>
             
            </Router>
            </Context.Provider>
            
             //<SendProps doctorName="Parth Patel"/>
        );
    }
}

export default App;