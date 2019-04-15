import React,{Component} from 'react';
import  Modal from "react-bootstrap4-modal";
class Edit extends Component {
    constructor(props){
        super(props);
        this.state ={
            name:this.props.alldata.name,
            email:this.props.alldata.email,
            password:this.props.alldata.password,
            age:this.props.alldata.age,
            phone:this.props.alldata.phone,
            city:this.props.alldata.city,
            pincode:this.props.alldata.pincode,
           // state:'gujarat',
           // country:'india',
            area:this.props.alldata.area,
            blood_group:this.props.alldata.blood_group,
           // gender:'m',
            street:this.props.alldata.street,
            workingtime:this.props.alldata.workingtime,
            breaktime:this.props.alldata.breaktime,
            slot_time:this.props.alldata.slot_time

           
        }
    }


    
    getdetail=()=>{
        const filledform={
            name : this.state.name,
             email :this.state.email,
             password:this.state.password,
            age:this.state.age,
            phone:this.state.phone,
            
            city:this.state.city,
            pincode:this.state.pincode,
           // state:'gujarat',
           // country:'india',
            area:this.state.area,
            blood_group:this.state.blood_group,
            //gender:this.state.gender,            
            workingtime:this.state.workingtime,
            breaktime:this.state.breaktime,
            street:this.state.street,
            slot_time:this.state.slot_time
        };
        console.log('getdetail');
        return filledform;
    };
    handleChange = ({target}) => {
        this.setState({
            [target.name]: target.value
        })
        console.log(target.name);
        console.log(target.value);
    };
    handlesubmit=(e)=>{
        e.preventDefault();
        this.props.submitedit(this.getdetail());
        
    }
    render(){
        console.log('i am in edit page');
        return(
            <Modal visible={this.props.open}>
            <form onSubmit={this.handlesubmit}>
            <div className={'modal-body'} style={{color: 'black'}}>
            <div className={'form-group'} >
                <label>Name:</label>
                <input name="name"
                        value={this.state.name}
                        onChange={this.handleChange}
                        
                        className={'form-control'} type={'text'}/>
            </div>
            <div className={'form-group'} >
                <label>Age:</label>
                <input name="age"
                        value={this.state.age}
                        onChange={this.handleChange}
                        
                        className={'form-control'} type={'text'}/>
            </div>
            <div className={'form-group'} >
                <label>Phone:</label>
                <input name="phone"
                        value={this.state.phone}
                        onChange={this.handleChange}
                        
                        className={'form-control'} type={'text'}/>
            </div>
            <div className={'form-group'} >
                <label>Street:</label>
                <input name="street"
                        value={this.state.street}
                        onChange={this.handleChange}
                        
                        className={'form-control'} type={'text'}/>
            </div>
            <div className={'form-group'} >
                <label>Area:</label>
                <input name="area"
                        value={this.state.area}
                        onChange={this.handleChange}
                        
                        className={'form-control'} type={'text'}/>
            </div>
            <div className={'form-group'} >
                <label>City:</label>
                <input name="city"
                        value={this.state.city}
                        onChange={this.handleChange}
                        
                        className={'form-control'} type={'text'}/>
            </div>
            <div className={'form-group'} >
                <label>Pincode:</label>
                <input name="pincode"
                        value={this.state.pincode}
                        onChange={this.handleChange}
                        
                        className={'form-control'} type={'text'}/>
            </div>
            <div className={'form-group'} >
                <label>Slot_time:</label>
                <input name="slot_time"
                        value={this.state.slot_time}
                        onChange={this.handleChange}
                        
                        className={'form-control'} type={'text'}/>
            </div>
            <div className={'form-group'} >
                <label>Work_time:</label>
                <input name="Work_time"
                        value={this.state.workingtime}
                        onChange={this.handleChange}
                        
                        className={'form-control'} type={'text'}/>
            </div>
            <div className={'form-group'} >
                <label>Break_time:</label>
                <input name="Break_time" 
                        value={this.state.breaktime}
                        onChange={this.handleChange}
                        //placeholder='write in formate 12:00 to 13:00,14:00 to 15:00'
                        className={'form-control'} type={'text'}/>
            </div>

                    
                        
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-danger" onClick={this.props.close}>Close</button>
                <button type="submit" className="btn btn-primary">Submit
                 </button>
             </div>
           </form>          

            </Modal>
        )
    }
}

export default (Edit);