import React,{Component} from 'react';
import Publicpage from './public-page/PublicPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css'

class App extends Component{
    constructor(props){
        super(props);

    }
    
  
    render(){
        var urlString = 'url(' + require('../images/publicpage2.jpg') + ')';
        //urlString.style.width=100;
        document.body.style.background = urlString;
        document.body.style.backgroundSize = "cover";
        document.body.style.backgroundPositionY= "-50px";
        document.body.style.backgroundRepeat = "no-repeat";
    
        return(
            <Publicpage />
        );
    }
}

export default App;