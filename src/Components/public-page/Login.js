import React, { Component } from 'react'
import firebase from '../../config/configuration';
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
    
   


  render() {
    return (
      <body className="BACK">
         
      <form  onSubmit={this.props.submitHandler}  className='container'>
          <h1 className="t1">Login</h1>
              <br/>
           <FormGroup row>
           <Label className="email" sm={3}><b>Email:</b></Label>
           <Col sm={5}>
           <Input type="text" placeholder="Enter Email" name="email" onChange={this.props.handleChage}
            value={this.props.email} required/><hr/>
            </Col>
           </FormGroup>

           <FormGroup row>
           <Label className="psw"  sm={3}><b>Password:</b></Label>
           <Col sm={5}>
           <Input type="password" placeholder="Enter Password" name="password" onChange={this.props.handleChage}
            value={this.props.password} required/><hr/>
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


