import React,{Component} from 'react';

class Slotbook extends Component{
    constructor(props){
        super(props);

    }
    componentDidMount(){
        console.log(' componutdid monut'+ this.props.match.params.doctorid);
    }
    


    
    render(){
       // console.log('fuck you i am in slotboking props '+ this.props); 
        console.log( this.props);   
    //     console.log('fuck you i am in slotboking params.id '+ this.props.id);
    //     console.log('fuck you i am in slotboking patientId'+ this.props.patientId);
    //     console.log('fuck you i am in slotboking params'+ this.props.computedMatch.params.id);
    //    console.log('fuck you i am in slotboking props.match.params.id '+ this.props.match.params.id);
       //   console.log('fuck you i am in sl length '+ this.props.match.params.length());
        return (
            <div>
                <h1>i am in  slotbook area { this.props.computedMatch.params.id}</h1>
            </div>                                      
        )
    }
}

export default Slotbook;

