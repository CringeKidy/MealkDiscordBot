import axios from 'axios';

export function getUserDetails(){
    return axios.get(`http://${window.location.hostname}:3001/api/auth`,{withCredentials: true})
}

export function getGuilds(){
    return axios.get(`http://${window.location.hostname}:3001/api/discord/guilds`,{withCredentials: true})
}