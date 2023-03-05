import { useEffect, useState } from "react";
import { defaultLocation } from "./map/geography";
import MapViewer from "./map/MapViewer";
import Player from "./Player";
import { Story } from "./stories/Story";

interface GameProps {
    story: Story;
}

export default function Game(props: GameProps) {
    const [lat, setLat] = useState(defaultLocation.lat);
    const [lon, setLon] = useState(defaultLocation.lon);

    useEffect(() => {
        console.log("Subscribing to geolocation");
        const watchId = navigator.geolocation.watchPosition((position) => {
            setLat(position.coords.latitude);
            setLon(position.coords.longitude);
        }, (err) => {
            console.error('Error getting location');
            console.error(JSON.stringify(err));
        });
        return () => {
            navigator.geolocation.clearWatch(watchId);
        }
    }, []);

    return <div>
        <p>Menu button goes here</p>
        {props.story.map && <MapViewer lat={lat} lon={lon} map={props.story.map} /> }
        <Player story={props.story} lat={lat} lon={lon} />
    </div>
}
