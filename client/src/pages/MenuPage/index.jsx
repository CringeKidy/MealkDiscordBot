import React from 'react';
import {getUserDetails} from '../../util/api.js'

export function MenuPage(props){
    
    const [user, setUser] = React.useState(null)
    
    React.useEffect(() => {
        getUserDetails()
        .then( ({data}) => {
            console.log(data)
        }).catch( (err) => console.log(err))
    })

    return <h1>Menu Page</h1>
}