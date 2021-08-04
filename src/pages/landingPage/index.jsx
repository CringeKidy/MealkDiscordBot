import {Link} from 'react-router-dom';
const loginUrl = process.env.loginURL || "http://localhost:3001"

export default function LandingPage(){
    return(
        <div>
            <button onClick={this.window.href = loginUrl+"/api/auth/discord"}>Login</button>
            <h1>Landing page</h1>
            <Link to="/menu">
                <p>Menu page</p>
            </Link>
        </div>
    )
}