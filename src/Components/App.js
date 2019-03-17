import React,{Component} from 'react';
import Publicpage from './public-page/PublicPage';
// import SendProps from './SendProps';
// import SlotBooking from './SlotBooking'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css'
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import AuthorizedRoute from './AuthorizedRoute';
import Home from './home-page/homepage';

class App extends Component{
    constructor(props){
        super(props);
        this.state={
            isAuthenticated: false,
            isuser:'ispatient'
            //user: ispatient or isdoctor 
        }

    }
    login=()=>{

    }

    logout=()=>{

    }
    
  
    render(){
        const {isAuthenticated}=this.state;
        console.log(isAuthenticated);
        if(isAuthenticated){
            document.body.style.background = "#ffffff";
        }
        else{
        var urlString = 'url(' + require('../images/publicpage2.jpg') + ')';
        //urlString.style.width=100;
        document.body.style.background = urlString;
        document.body.style.backgroundSize = "cover";
        document.body.style.backgroundPositionY= "-50px";
        document.body.style.backgroundRepeat = "no-repeat";
        }
    
        return(
            <Router>
                <React.Fragment>
                    <switch>
                    {/* <Publicpage /> */}
                    <AuthorizedRoute permission={true} excat path="/" 
                        component={isAuthenticated ? Home : Publicpage }
                         />
                   
                    {/* <AuthorizedRoute permission={} excat path="/" 
                        component={isAuthenticated ? Home : Publicpage }>
                    </AuthorizedRoute> */}
                    </switch>
                </React.Fragment>
             
            </Router>
            
             //<SendProps doctorName="Parth Patel"/>
        );
    }
}

export default App;