import React, { Component } from 'react'
import firebase from './firebase';
import { CustomInput,Col,Button, Form, FormGroup, Label, Input, FormText ,Container} from 'reactstrap';

import Stylee from './Stylee.css'
export class Signupdoc extends Component {
    constructor(props) {
      super(props)
        
      this.state = {
         email:"",
         password:"",
         clinicname:"",
         age:"",
         city:"",
         area:"",
         breaktime:"",
         clinicfees:"",
         degree:"",
         doctor:"",
         gender:"",
         phone:"",
         pincode:"",
         street:"",
         specialist:"",
         starttime:"",
         endtime:"",
         sunday:0,
         monday:0,
         tuesday:0,
         wednesday:0,
         thursday:0,
         friday:0,
         saturday:0

      }
    }

    getKeyFromEmail=(email)=>{
      var flag=0,str=email;
      var pos = email.lastIndexOf('.');
      str = str.substring(0,pos) +' '+ str.substring(pos+1)
      var pos = email.lastIndexOf('@');
      str = str.substring(0,pos) +' '+ str.substring(pos+1)
      return str;

    }

    Signup=(event)=>{
        event.preventDefault();
        var workingtime1=this.state.starttime +' to '+this.state.endtime;
        var workingdays1=''+this.state.monday+this.state.tuesday+this.state.wednesday+this.state.thursday+this.state.friday+
        this.state.saturday+this.state.sunday;
        var flag=1;
        console.log('hii');
        firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log('1');
          alert(errorMessage);

          flag=0;
          
          // ...
        }).then(()=>{
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log('2');
          flag=0;
          alert(errorMessage);
          // ...    
        })}).then(()=>{
            if(flag)
            {
        const user=firebase.auth().currentUser.uid;
        console.log('3');
        firebase.database().ref('clinic').child(user).set({
            clinicname:this.state.clinicname,
            email:this.state.email,
            age:this.state.age,
            phone:this.state.phone,
            password:this.state.password,
            city:this.state.city,
            area:this.state.area,
            degree:this.state.degree,
            gender:this.state.gender,
            pincode:this.state.pincode,
            street:this.state.street,
            label:'doctor',
            specialist:this.state.specialist,
            clinicfees:this.state.clinicfees,
            doctor:this.state.doctor,
            workingtime:workingtime1,
            workingdays:workingdays1
        
        })
    }
      }
        )
        
    }

      
    
    handleChage=(event)=> {
      const {name, value} = event.target;
      
       this.setState(prevState => {
          prevState = JSON.parse(JSON.stringify(this.state));
          prevState[name] = value;
          //console.log(prevState);
          return  prevState;
       })
   }

   handleClick=(event)=>{
    const {name, value} = event.target;
   // console.log(name);
    this.setState(prevState => {
        prevState = JSON.parse(JSON.stringify(this.state));
        prevState[name] = prevState[name]^1;
       // console.log(prevState);
        return  prevState;
     })

    }
    
  render() {
    return (
      <div  className="BACK">
       <form  onSubmit={this.Signup} className="container" >
        {/* <div className="Container" color="red" > */}
        <div>
        <Container bg="dark">
            <h1>Sign Up</h1>
            <p>Please fill in this form to create an account.</p>
            <hr/>
            <FormGroup row>
            <Label htmlFor="email" sm={1}><b>Email:</b></Label>
            <Col sm={7}>
            <Input type="text" placeholder="Enter Email" name="email" onChange={this.handleChage}
             value={this.state.email} required/><hr/>
             </Col>
            </FormGroup>


            <FormGroup row>
            <Label htmlFor="psw"  sm={1}><b>Password:</b></Label>
            <Col sm={7}>
            <Input type="password" placeholder="Enter Password" name="password" onChange={this.handleChage}
             value={this.state.password} required/><hr/>
             </Col>
            </FormGroup>


            <FormGroup row>
            <Label htmlFor="clinicname" sm={1}><b>Clinic Name:</b></Label>
            <Col sm={7}>
            <Input type="text" placeholder="Enter Clinic Name" name="clinicname" onChange={this.handleChage}
            value={this.state.clinicname} required/><hr/>
            </Col>
            </FormGroup>


            <FormGroup row>
            <Label htmlFor="doctor" sm={1}><b>Doctor Name:</b></Label>
            <Col sm={7}>
            <Input type="text" placeholder="Enter Doctor Name" name="doctor" onChange={this.handleChage}
            value={this.state.doctor} required/><hr/>
            </Col>
            </FormGroup>


            <FormGroup row>
            <Label htmlFor="gender" sm={1}><b>Gender:</b></Label>
            <Col sm={7}>
            <Input type="text" placeholder="Enter Gender" name="gender" onChange={this.handleChage}
            value={this.state.gender} required/><hr/>
            </Col>
            </FormGroup>


            <FormGroup row>
            <Label htmlFor="degree" sm={1}><b>Degree:</b></Label>
            <Col sm={7}>
            <Input type="text" placeholder="Enter Degree" name="degree" onChange={this.handleChage}
            value={this.state.degree} required/><hr/>
            </Col>
            </FormGroup>


            <FormGroup row>
            <Label htmlFor="specialist" sm={1}><b>speciality:</b></Label>
            <Col sm={7}>
            <Input type="text" placeholder="Enter speciality" name="specialist" onChange={this.handleChage}
             value={this.state.specialist} required/><hr/>
             </Col>
              </FormGroup>


            <FormGroup row>
            <Label htmlFor="age" sm={1}><b>Age:</b></Label>
            <Col sm={7}>
            <Input type="number"  name="age" onChange={this.handleChage}
            value={this.state.age} placeholder="Doctor's age" required/><hr/>
            </Col>
            </FormGroup>


            <FormGroup row>
            <Label htmlFor="phone" sm={1}><b>Phone:</b></Label>
            <Col sm={7}>
            <Input type="number" placeholder="Enter Phone Number" name="phone" onChange={this.handleChage}
            value={this.state.phone} required/><hr/>
            </Col>
            </FormGroup>


            <FormGroup row>
            <Label htmlFor="clinicfees" sm={1}><b>Clinic Fees:</b></Label>
            <Col sm={7}>
            <Input type="number" placeholder="Enter clinicfees" name="clinicfees" onChange={this.handleChage}
             value={this.state.clinicfees} required/><hr/>
             </Col>
              </FormGroup>


            <FormGroup row>
            <Label htmlFor="area" sm={1}><b>Area:</b></Label>
            <Col sm={7}>
            <Input type="text" placeholder="Enter Area" name="area" onChange={this.handleChage} 
            value={this.state.area} required/><hr/>
            </Col>
            </FormGroup>


            <FormGroup row>
            <Label htmlFor="city" sm={1}><b>City:</b></Label>
            <Col sm={7}>
            <Input type="text" placeholder="Enter City" name="city" onChange={this.handleChage}
            value={this.state.city} required/><hr/>
            </Col>
            </FormGroup>


            <FormGroup row>
            <Label htmlFor="street" sm={1}><b>Street:</b></Label>
            <Col sm={7}>
            <Input type="text" placeholder="Enter Street" name="street" onChange={this.handleChage}
            value={this.state.street} required/><hr/>
            </Col>
            </FormGroup>


            <FormGroup row>
            <Label htmlFor="pincode" sm={1}><b>Pincode:</b></Label>
            <Col sm={7}>
            <Input type="text" placeholder="Enter Pincode" name="pincode" onChange={this.handleChage}
            value={this.state.pincode} required/><hr/>
            </Col>
            </FormGroup>
           

            <FormGroup row>
            <Label htmlFor="starttime" sm={1}><b>Start time:</b></Label>
            <Col sm={7}>
            <Input type="time" placeholder="" name="starttime" value="10:00" 
            onChange={this.handleChage} value={this.state.starttime} required/><hr/>
            </Col>
            </FormGroup>

            <FormGroup row>
            <Label htmlFor="endtime" sm={1}><b>End time:</b></Label>
            <Col sm={7}>
            <Input type="time" placeholder="" name="endtime" value="15:00" 
            onChange={this.handleChage} value={this.state.endtime} required/><hr/>
            </Col>
            </FormGroup>
            
            <FormGroup row>
            <Label for="exampleCheckbox"><b>Select Working days from below:</b></Label>
            </FormGroup>
            <FormGroup check inline>
                <Label check>
                    <Input type="checkbox" id="monday" name="monday" value={this.state.monday} onClick={this.handleClick} /><b>Monday  </b>
                </Label>
            </FormGroup>
            

            <FormGroup check inline>
                <Label check>
                    <Input type="checkbox" id="tuesday" name="tuesday" value={this.state.thuesday} onClick={this.handleClick} /><b>Tuesday  </b>
                </Label>
            </FormGroup>

            <FormGroup check inline>
                <Label check>
                    <Input type="checkbox" id="wednesday" name="wednesday" value={this.state.wednesday} onClick={this.handleClick} /><b>Wednesday  </b>
                </Label>
            </FormGroup>

            <FormGroup check inline>
                <Label check>
                    <Input type="checkbox" id="thursday" name="thursday" value={this.state.thursday} onClick={this.handleClick} /><b>Thursday  </b>
                </Label>
            </FormGroup>

            <FormGroup check inline>
                <Label check>
                    <Input type="checkbox" id="friday" name="friday" value={this.state.friday} onClick={this.handleClick} /><b>Friday  </b>
                </Label>
            </FormGroup>

            <FormGroup check inline>
                <Label check>
                    <Input type="checkbox" id="saturday" name="saturday" value={this.state.saturday} onClick={this.handleClick} /><b>Saturday  </b>
                </Label>
            </FormGroup>

            <FormGroup check inline>
                <Label check>
                    <Input type="checkbox" id="sunday" name="sunday" value={this.state.sunday} onClick={this.handleClick} /><b>Sunday  </b>
                </Label>
            </FormGroup>
            <br/><br/><br/>

            <div className="clearfix">
            {/* <button type="button" class="cancelbtn">Cancel</button> */}
            <Button type="submit" className="btn" color='primary'  >Sign Up</Button>
            <br/><br/><br/>
            </div>
            </Container>
            </div>
    </form>
    
      </div>
    )
  }
}

export default Signupdoc
