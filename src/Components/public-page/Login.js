import React, { Component } from 'react'
import firebase from './firebase';
import { Col,Button, Form, FormGroup, Label, Input, FormText ,Container} from 'reactstrap';

import Stylee from './Stylee.css'


 class Login extends Component {

    constructor(props) {
      super(props)
    
      this.state = {
         email:"",
         password:""
      }
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
      console.log('hii'); 
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
            {console.log('patient')}
            else
            console.log('doctor')
            }
              )
        }
      })
    }

  render() {
    return (
      <body className="BACK">
         
      <form  onSubmit={this.submitHandler}  className='container'>
          <h1 className="t1">Login</h1>
              <br/>
           <FormGroup row>
           <Label className="email" sm={3}><b>Email:</b></Label>
           <Col sm={5}>
           <Input type="text" placeholder="Enter Email" name="email" onChange={this.handleChage}
            value={this.state.email} required/><hr/>
            </Col>
           </FormGroup>

           <FormGroup row>
           <Label className="psw"  sm={3}><b>Password:</b></Label>
           <Col sm={5}>
           <Input type="password" placeholder="Enter Password" name="password" onChange={this.handleChage}
            value={this.state.password} required/><hr/>
            </Col>
           </FormGroup>
           <div className="clearfix">
            {/* <button type="button" class="cancelbtn">Cancel</button> */}
            <Button type="submit" className="btn55" color='primary'  >Login</Button>
            <br/><br/><br/>
            </div>
            <h5><b>Are you patient?</b> <a className='linking' href="#">Click Here</a> </h5>
           <h5><b>Are you doctor?</b> <a className='linking' href="#">Click Here</a></h5>
           </form>
           
           </body>
    )
  }
}

export default Login;


