import React from 'react';

export function MenuComponent({
    guilds,
}){
    console.log(guilds)
    return(
        <div>
            <h1>hello</h1>
            {guilds.map(guild => {
                return (
                <div>
                    <li>{guild.name}</li>
                    <a href={`/dashboard/${guild.id}`}>View Dashboard</a>
                </div>
                )
            })}
        </div>
    )
}