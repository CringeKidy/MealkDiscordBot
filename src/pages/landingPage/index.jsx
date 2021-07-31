import {useState, useEffect} from 'react';
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
            <h1>Menu page</h1>
            <h2>{apiData?.msg}</h2>
        </div>
    )
}