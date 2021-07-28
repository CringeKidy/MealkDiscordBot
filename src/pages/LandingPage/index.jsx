import React from 'react';
require('dotenv').config({path:'../.env'})

export function LandingPage(props){
    const login = () => window.location.href = `http://${window.location.hostname}:3001/api/auth/discord`
    return(
        <button onClick = {login}>Login</button>    
    )
}