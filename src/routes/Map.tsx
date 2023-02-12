import { useState } from "react"

export default function Splash() {
    const [location, setLocation] = useState('');
    const [error, setError] = useState('');
    navigator.geolocation.getCurrentPosition((position) => {
        console.log("Setting to " + JSON.stringify(position));
        setLocation(JSON.stringify(position.coords));
    }, (err) => {
        console.log(JSON.stringify(err));
        setError(JSON.stringify(err));
    })
    return <div>
        <p>{location}</p>
        <p>👆 Yep, that's your location alright</p>
        <p>{error}</p>
    </div>
}
