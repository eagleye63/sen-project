import React,{Component} from 'react';
import Publicpage from './public-page/PublicPage';
// import SendProps from './SendProps';
// import SlotBooking from './SlotBooking'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css'
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import AuthorizedRoute from './AuthorizedRoute';
import Home from './home-page/homepage';

export const Context = React.createContext();

class App extends Component{
    constructor(props){
        super(props);
        this.state={
            isAuthenticated: true,
            user:'clinic'
            //user: patient or clinic 
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
            <Context.Provider value={
                {
                    user:this.state.user
                }
            }>

            
            <Router>
                <React.Fragment>
                    <Switch>
                    {/* <Publicpage /> */}
                    <AuthorizedRoute permission={true} excat path="/" 
                        component={isAuthenticated ? Home : Publicpage }
                        user={this.state.user} />
                   
                    {/* <AuthorizedRoute permission={} excat path="/" 
                        component={isAuthenticated ? Home : Publicpage }>
                    </AuthorizedRoute> */}
                    </Switch>
                </React.Fragment>
             
            </Router>
            </Context.Provider>
            
             //<SendProps doctorName="Parth Patel"/>
        );
    }
}

export default App;