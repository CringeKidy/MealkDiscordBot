import {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
const apiUrl = process.env.API_URL || 'http://localhost:3001'

export default function LandingPage(){
    const [apiData, setApiData] = useState()
    
    useEffect(() => {
        FetchApiData()
    })
    
    const FetchApiData = async () => {
        const res = await fetch(`${apiUrl}/api`)
        const data = await res.json()
        setApiData(data)
    }

    return(
        <div>
            <h1>Landing page</h1>
            <Link to="/menu">
                <p>Menu page</p>
            </Link>
            <p>{apiData?.msg}</p>
        </div>
    )
}