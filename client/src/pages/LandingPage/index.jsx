import React from 'react';

export function LandingPage(props){
    const login = () => window.location.href = 'http://localhost:8080/api/auth/discord'
    return(
        <button onClick = {login}>Login</button>    
    )
}