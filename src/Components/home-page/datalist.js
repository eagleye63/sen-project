import React,{Component} from 'react';
import _ from 'lodash';
import {Link} from 'react-router-dom';
import Slotbook from '../slots/slotbooking';
import Gotoslot from '../slots/Gotoslot';
import AuthorizedComponent from '../AuthorizedComponent';
import { withRouter } from 'react-router-dom';
class Datalist extends  React.PureComponent{
    constructor(props){
        super(props);
        
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
redirect(data){
    this.props.history.push({
        pathname: "/slotbook"
     });
     console.log('i am inn datalist'+data);
}

    render(){
        const {data,user}=this.props;
        console.log('i am in data list '+ user);
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
                                <h3>Age: {data.age}</h3>

                                <h4>{data.area}, {data.city}</h4>
                                <AuthorizedComponent
                                    component={Gotoslot} permission={true} /> 
                                </div> 
                                {/* <button className='btn btn-outline-primary' style={{'fontSize' :'13px' }} onClick={() => this.redirect(data.area)}>
                                Book Slot
                                </button> */}
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