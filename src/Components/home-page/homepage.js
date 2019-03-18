import React from 'react';
import NavigationBar from '../navigationbar';
import  List from './List';
import firebase from '../../config/configuration';
import _ from 'lodash';
import Datalist from './datalist';
class home extends React.Component{
    constructor(props){
        super(props);
        this.state={
            cliniclist:[]
        }
    }
    componentDidMount(){
        this.getclinic();
    }

    getclinic=()=>{
        let clinicsref=firebase.database().ref('/clinic').orderByKey();
        clinicsref.on("value",snapshot=>{
            // snapshot.forEach(child=>{
            //     console.log('i am in getclinic key '+child.key);
            //     console.log('i am in getclinic area '+child.val());
            // })
            // let clinic={text:snapshot.val(),id:snapshot.key};
            this.setState({
                cliniclist : snapshot.val()
            })
                     
        })

    //     let messagesRef = firebase.database().ref('clinic');
    // messagesRef.on("value", snapshot => {
    //   /* Update React state when message is added at Firebase Database */
    //   let message = { text: snapshot.val(), id: snapshot.key };
    //   this.setState({ cliniclist: [message].concat(this.state.cliniclist) });
    // })

        console.log('i am in getclinic'+ this.state.cliniclist)
    }
    render(){
        const {user}=this.props;
        console.log('home-page i am '+user);
        return(

            <React.Fragment>
                <NavigationBar/>
                <h1>Thsi is home page</h1>
                <Datalist data={this.state.cliniclist} />
             
                 {/* <ul>
            
             {
            this.state.cliniclist.map( message => <li key={message.key}>{message.val().area}</li> )
          }
        </ul>  */}
        {/* this.state.clinic.length !==0 
        ? _.map(this.state.message(this.state.message,i)=>{
            return (
                <div key={this.state.message.key}>
                ldfkldsd
                </div>
            )
        }) */}


            </React.Fragment>
        )
    }
}

export default home;