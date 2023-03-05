import { useEffect, useState } from "react";
import { defaultLocation } from "./map/geography";
import Map from "./map/Map";
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
        <Map lat={lat} lon={lon}
            westEdge={-0.149554}
            eastEdge={-0.142024}
            northEdge={51.564606}
            southEdge={51.5611356}
            background='fantasy_map_demo' />
        <Player story={props.story} lat={lat} lon={lon} />
    </div>
}
