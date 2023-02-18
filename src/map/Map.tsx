import { useState } from "react"
import { Stage, Circle, Layer, Rect, Arrow, Line } from "react-konva";
import { SpaceProps } from "./geography";
import Gridlines from "./Gridlines";
import testMap from './stories/maps/testMap.jpg';

interface MapProps extends SpaceProps {
    // TODO background image
    // TODO markers
}

interface arrowProps {
    towardsX: number;
    towardsY: number;
}


export default function Map(props: MapProps) {
    const actualWidth = 800;
    const actualHeight = 500;

    const mapWidth = props.eastEdge - props.westEdge;
    const mapHeight = props.northEdge - props.southEdge;

    const [location, setLocation] = useState('');
    const [error, setError] = useState('');
    const [lat, setLat] = useState(51.5628);
    const [lon, setLon] = useState(-0.1445);

    function OffscreenArrow({ towardsX, towardsY }: arrowProps) {
        if (towardsX > 0 && towardsY > 0 && towardsX < actualWidth && towardsY < actualHeight) {
            return <></>;
        }
        let deltaX = towardsX - (actualWidth / 2);
        let deltaY = towardsY - (actualHeight / 2);
        const edgeMargin = 100;
        let scale = Math.sqrt(deltaX * deltaX + deltaY * deltaY) * 2 / (actualHeight - edgeMargin);
        const arrowShortness = 0.4;
        return <Arrow
            x={actualWidth / 2}
            y={actualHeight / 2}
            points={[arrowShortness * deltaX / scale, arrowShortness * deltaY / scale, deltaX / scale, deltaY / scale]}
            pointerLength={20}
            pointerWidth={20}
            fill='black'
            stroke='black'
            strokeWidth={30}
        ></Arrow>
    }

    function normalise(pos: number, min: number, mapSize: number, actualSize: number): number {
        return (pos - min) * actualSize / mapSize;
    }

    function normaliseX(pos: number) {
        return normalise(pos, props.westEdge, mapWidth, actualWidth);
    }

    function normaliseY(pos: number) {
        return actualHeight - normalise(pos, props.southEdge, mapHeight, actualHeight);
    }

    navigator.geolocation.watchPosition((position) => {
        console.log("Setting to " + JSON.stringify(position));
        setLat(position.coords.latitude);
        setLon(position.coords.longitude);
        setLocation(JSON.stringify({ "latitude": position.coords.latitude, "longitude": position.coords.longitude }));
    }, (err) => {
        console.log(JSON.stringify(err));
        setError(JSON.stringify(err));
    })
    return <div>
        <Stage width={actualWidth} height={actualHeight}>
            <Layer>
                <Rect x={0} y={0} width={actualWidth} height={actualHeight} fill={'grey'}></Rect>
                <Gridlines eastEdge={props.eastEdge} westEdge={props.westEdge}
                    northEdge={props.northEdge} southEdge={props.southEdge}
                    canvasWidth={actualWidth} canvasHeight={actualHeight} />
            </Layer>
            <Layer>
                <Circle x={normaliseX(lon)}
                    y={normaliseY(lat)}
                    fill={"red"} stroke={'black'} radius={10} strokeWidth={2}></Circle>
                    <OffscreenArrow towardsX={normalise(lon, props.westEdge, mapWidth, actualWidth)}
                        towardsY={actualHeight - normalise(lat, props.southEdge, mapHeight, actualHeight)} />
                </Layer>
        </Stage>

        <p>{location}</p>
        <p>👆 Yep, that's your location alright</p>
        <p>{error}</p>
    </div>
}
