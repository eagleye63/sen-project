import React ,{Component} from 'react';
import SignupPage from './SignUpPage';
import '../../Style/PublicPage.css';
import Button from 'react-bootstrap/Button';
import { Form } from 'react-bootstrap';
import FormControl from 'react-bootstrap/FormControl'


class PublicPage extends Component{
    constructor(){
        super();

    }
    render(){

        return(
           <React.Fragment>
            <div className="loginbox">
                <div className="logo">
                <strong><p>Login /sign up </p></strong>
                </div>
                <div className="userid">
                  <div className="title">  <i className="fa fa-user-circle"></i> User ID </div>
                     <div className="input-group mb-3">
                       <input type="text" className="form-control"
                            placeholder="User/Email ID"
                            aria-label="username"
                            name="userId"
                            aria-describedby="basic-addon"/>
                    </div>
                </div>
                <div className="password">
                  <div className="title">  <i className="fa fa-lock"></i> Password</div>
                  <div className="input-group mb-3">
                  <input className="form-control" type="password" 
                  name="password" />
                  </div>
                </div>
                <div className="enterbutton"><input type="submit" value="ENTER"/></div>
                <div className="notregistred">
                <span className="title">Not Registred??</span>
                <input type="button" className="signup"
                           value="Sign Up"
                           />
                </div>
            </div>
           </React.Fragment>
        );
    }   
}

export default PublicPage;