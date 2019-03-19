import React from 'react';
import NavigationBar from '../navigationbar';
import  List from './List';
import firebase from '../../config/configuration';
import _ from 'lodash';
import Datalist from './datalist';
import Slotbook from '../slots/slotbooking';
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";
class Home extends React.Component{
    constructor(props){
        super(props);
        this.state={
            cliniclist:[],
            iscurrappoitmentopen :false,
            isrevisappoitmentopen :false

        }
        this.opencurrapp = this.opencurrapp.bind(this);
    }
    componentDidMount(){
        this.getclinic();
    }

    getclinic=()=>{
        let clinicsref=firebase.database().ref('/clinic').orderByKey();
        clinicsref.on("value",snapshot=>{
           
            this.setState({
                cliniclist : snapshot.val()
            })
                     
        })  
    }
    opencurrapp=()=>{
        console.log('open currappoitment ');
        this.setState({
            iscurrappoitmentopen: !this.state.iscurrappoitmentopen
        });
    }
    openrevisapp=()=>{
        console.log('open currappoitment ');
        this.setState({
            isrevisappoitmentopen: !this.state.isrevisappoitmentopen
        });
    }
    render(){
        const {user}=this.props;
        //console.log('home-page i am '+user);
        return(

            <React.Fragment>
                <NavigationBar/>
                <h1>Thsi is home page</h1>
                <buttton className='btn btn-outline-dark btn-lg' type='button' onClick={this.opencurrapp}>
                {this.state.iscurrappoitmentopen ? 'close current appointment' : 'open current appointment '}</buttton>
                <buttton className='btn btn-outline-dark btn-lg' type='button' onClick={this.openrevisapp}>
                {this.state.isrevisappoitmentopen ? 'close revisit appointment' : 'open revisit appointment '}</buttton>
                {
                    this.state.iscurrappoitmentopen === true ?
                   <div className='jumbotron text -center'> 
                    <div className='container'>
                    <h2 className='page-header'>
                    print current appoitment 
                    </h2>
                    </div> 
                   </div>
                    : ''
                }

            
                {
                    this.state.isrevisappoitmentopen === true ?
                   <div className='jumbotron text -center'> 
                    <div className='container'>
                    <h2 className='page-header'>
                    print revisit appoitment 
                    </h2>
                    </div> 
                   </div>
                    : ''
                }

                         
                <Datalist data={this.state.cliniclist} user={this.props.user} />
               

            </React.Fragment>
        )
    }
}

export default Home;