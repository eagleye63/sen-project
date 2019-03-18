import React,{Component} from 'react';
import _ from 'lodash';
class Datalist extends  React.Component{
    constructor(props){
        super(props);
        
    }

    render(){
        const {data}=this.props;
        return(
            <div>
                <div className='list-group'>
                    {
                        data.length !==0
                        ? _.map(data,(data,i)=>{
                            return(
                                <div key={data.key}>
                                <h3>{data.name}</h3>
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