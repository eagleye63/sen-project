import React,{Component} from 'react';
import _ from 'lodash';
import {Link} from 'react-router-dom';
import Slotbook from '../slots/jeettmp';
import Gotoslot from '../slots/Gotoslot';
import AuthorizedComponent from '../AuthorizedComponent';
import AuthorizedRoute from '../AuthorizedRoute';
import { withRouter } from 'react-router-dom';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
class Datalist extends  React.PureComponent{
    constructor(props){
        super(props);
        console.log('in printing'+this.props.data);
        this.state={
            temp:false
        }
        
    }


//    var Gotoslotbook=(
//         <div className={'d-flex justify-content-end mt-5'}>
//                 <Link to={'/slotbook'}>
//                     <button className="btn btn-outline-dark btn-lg">
//                         <span className="mr-2">Go To Cart</span>
//                         <i className="fa fa-angle-right"></i>
//                     </button>
//                 </Link>
//             </div>
//         )

    // componentDidUpdate=(props)=>{
    //     let refresh=this.props.refresh;
    //     if(refresh!=props.refresh)
    //     {
    //         this.setState({temp:!this.state.temp})
    //     }

    // }



redirect(data){
    this.props.history.push({
        pathname: "/slotbook"
     });
   //  console.log('i am inn datalist'+data);
}

    render(){
        const {data,user}=this.props;
        // console.log('i am in data list '+ user);
        // co console.log('i am in data list '+ user);
        // console.log('datalist'+this.props.data);
        return(
            <div>
                <div className='list-group'>
                    {
                        data.length !==0
                        ? _.map(data,(data,i)=>{
                            return(
                                <div className='list-group' key={data.key}>
                                <div className='list-group-item'>
                                <h2 >{data.clinicname}</h2>
                                <h3>Doctor Name: {data.name}</h3> 
                                <h3>Specialist: {data.specialist}</h3>
                                <h3>Gender: {data.gender}</h3>
                                <h3>Age: {data.doctorkey}</h3>

                                <h4>{data.area}, {data.city}</h4>
                                {/* <AuthorizedRoute permission={this.state.user === 'patient' ? true : false }  path="/slotbook" exact strict 
                                 component={Slotbook} patientId={this.state.key}  />  */}
                                {/* <AuthorizedComponent
                                    component={Gotoslot} permission={true}  />                                */}
                                 {/* <Link to="/slotbook/john" >go to sloot book</Link>    */}
                                 <Link to={`/slotbook/${data.doctorkey}`}>go to slot</Link>
                                
                                </div>                                
                                </div>
                            )
                        })
                        : ''
                    }
                </div>
            </div>

        )
    }
}

export default withRouter(Datalist);