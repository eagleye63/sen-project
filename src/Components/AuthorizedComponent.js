import React from 'react';

const AuthorizedComponent =({component:Component,permission , ...rest})=>(
    permission ? (
        <Component {...rest}/>
        )
       : ''
     
);

export default AuthorizedComponent;