import React,{PureComponent} from 'react';
import {Context} from "./App";
import {Link,withRouter} from 'react-router-dom';
import AuthorizedComponent from './AuthorizedComponent';

function NavLink ({path,text,onClick,className,currPath,icon}){
    console.log('currPath'+currPath);
    if(currPath){
        currPath="./"+currPath.split('/')[1];
    }
    console.log('currPath second '+currPath);
    return(
        <li className={"nav-item"+(currPath==path ? "active" : " ")+" "+className}>
            <Link className="nav-link" onClick={onClick} to={{
                pathname: path,
            }}>
            <i className={"fa fa-"+icon} style={{marginRight:"5px"}}/>
            {text}
            </Link>
        </li>
    )
}

class navigationbar extends PureComponent{
    

    render(){
        return(
            <Context.Consumer>{

                value=>{
                    return(
                        <div>
                            
                        <nav ref={(input) => {
                                this.input = input
                        }} className="navbar navbar-expand-lg navbar-dark bg-dark">
                            <button className="navbar-toggler" type="button" data-toggle="collapse"
                                            data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown"
                                            aria-expanded="false" aria-label="Toggle navigation">
                                        <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse" id="navbarNavDropdown">
                            <ul  className="navbar-nav ml-3 mr-3">
                                <NavLink path={'/'}
                                                 text={"Home"}
                                                 icon='home'
                                                 currPath={this.props.location.pathname}
                                                 id="home1"/>
                                  {/* <NavLink path={'/myappointment'}
                                                 text={'My Appointment'}
                                                 icon={'medkit'}
                                                 currPath={this.props.location.pathname}/>
                                     <NavLink text={(value.user=='isdoctor') ? "My Slot" : "My App"}
                                                 icon={(value.user=='isdoctor') ? 'list-ul' : 'shopping-basket'}
                                                 path={'/order'}
                                                 currPath={this.props.location.pathname}/> */}
                                    <NavLink path={'./Myprofile'} 
                                                text={'Profile'}  
                                                icon={'user'} 
                                                currPath={this.props.location.pathname} />
                                     <AuthorizedComponent permission={(value.user=='clinic') ? true : false}
                                                             path={'/slotsettng'}
                                                             currPath={this.props.location.pathname}
                                                             component={NavLink}
                                                             icon={'cog'}
                                                             text={"Slot Setting"}/>                
                            </ul>

                            </div>

                        </nav>       
                        </div>    
                    );
                }
            }
            </Context.Consumer>
        )
    }

}

export default  withRouter(navigationbar);
