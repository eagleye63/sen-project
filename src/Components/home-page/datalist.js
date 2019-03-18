import React,{Component} from 'react';
import _ from 'lodash';
class Datalist extends  React.Component{
    constructor(props){
        super(props);
        
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

export default (Datalist);