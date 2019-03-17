import React from 'react';
import NavigationBar from '../navigationbar';
class home extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        const {user}=this.props
        console.log('home-page i am '+user);
        return(

            <div>
                <NavigationBar/>
                <h1>Thsi is home page</h1>

            </div>
        )
    }
}

export default home;