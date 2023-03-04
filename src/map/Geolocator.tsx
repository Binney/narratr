interface GeolocatorProps {
    onUpdate: (coords: GeolocationCoordinates) => void;
}

export default function Geolocator(props: GeolocatorProps) {
    navigator.geolocation.watchPosition((position) => {
        props.onUpdate(position.coords);
    }, (err) => {
        console.error(JSON.stringify(err));
    })

    return <div>You're being geolocated!</div>
}
