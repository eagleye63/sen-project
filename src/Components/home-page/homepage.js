import React from 'react';
import NavigationBar from '../navigationbar';
import  List from './List';
import firebase from '../../config/configuration';
import _ from 'lodash';
import Datalist from './datalist';
import Slotbook from '../slots/jeettmp';
import {BrowserRouter as Router, Redirect, Route, Switch,Link} from "react-router-dom";
import AuthorizedComponent from '../AuthorizedComponent';
import Clinicdate from './ClinicDate';
import { CLIENT_RENEG_LIMIT } from 'tls';
class Home extends React.Component{
    constructor(props){
        super(props);
        this.state={
            cliniclist:[],
            iscurrappoitmentopen :false,
            isrevisappoitmentopen :false,
            isloading:false,
            refresh:false

        }
        this.opencurrapp = this.opencurrapp.bind(this);
    }
    componentDidMount(){
        this.getclinic();
    }

    getclinic=()=>{
        this.setState({isloading:false,refresh:!this.state.refresh});
        let clinicsref=firebase.database().ref('/clinic').orderByKey();
        // clinicsref.once("value").then(snapshot=>{
           
        //     this.setState({
        //         cliniclist : snapshot.val()
        //     },()=>{
        //      //   console.log(this.state);
        //     })
                     
        // })  
        clinicsref.once("value").then(snapshot=>{
           // console.log('hiiiiiiiiiiiiiiiiiii');
            snapshot.forEach(child1=>{
              //  console.log('child key '+child1.key);
                let l2=firebase.database().ref('/clinic').child(child1.key).once("value").then(snapshot1=>{
                 //   console.log()
                    let currentcliniclist=this.state.cliniclist;
                    //currentcliniclist.push(snapshot1.val());
               //     console.log('parent key'+snapshot1.key)
                    currentcliniclist.push({
                        'name':snapshot1.val().name,
                        'age':snapshot1.val().age,
                        'doctorkey':snapshot1.key
                    })
                 //   console.log(currentcliniclist[currentcliniclist.length-1].age)
                    this.setState({
                        cliniclist : currentcliniclist,
                        refresh:!this.state.refresh
                    },()=>{ //console.log('clinic lsit data')
                        }
                    )
                })
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
        if(this.state.isloading)
        {
            return (<div>loading</div>)
        }
        const {user}=this.props;
    //    console.log('home-page i am '+user);
        return(

            <React.Fragment>
                <NavigationBar/>
                <h1>Thsi is home page </h1>
                {       
                    this.props.user==='patient' ?
                    <div>
                    <Link to={'/currappoitment'}>
                    <button className="btn btn-outline-dark btn-lg">
                        <span className="mr-2">Current Appoitment</span>
                        <i className="fa fa-angle-right"></i>
                    </button>
                      </Link>
                     <Link to={'/reviappoitment'}>
                    <button className="btn btn-outline-dark btn-lg">
                        <span className="mr-2">Revisit Appoitment</span>
                        <i className="fa fa-angle-right"></i>
                    </button>
                     </Link> 
                     <AuthorizedComponent   data={this.state.cliniclist}  refresh={this.state.refresh}
                     permission={(this.props.user === 'patient') ? true : false }
                    component={Datalist}  user={this.props.user} id={this.props.id}  /> 
                     </div> 
                 : <div>
                     <AuthorizedComponent    permission={(this.props.user === 'clinic') ? true : false }
                    component={Clinicdate}  user={this.props.user} id={this.props.id} /> 
                     
                 </div>
                    
                }
               
                
                {/* <buttton className='btn btn-outline-dark btn-lg' type='button' onClick={this.opencurrapp}>
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
                } */}
                
                    
                             

            </React.Fragment>

           


        )
    }
}

export default Home;