import { Vector2d } from "konva/lib/types";
import { useState } from "react"
import { Stage, Circle, Layer, Rect, Arrow, Image } from "react-konva";
import useImage from "use-image";
import { metresPerDegreeLon, SpaceProps } from "./geography";
import Gridlines from "./Gridlines";

interface MapProps extends SpaceProps {
    // TODO markers[]
    background: string;
}

interface arrowProps {
    towardsX: number;
    towardsY: number;
}


export default function Map(props: MapProps) {
    const scale = metresPerDegreeLon; // 1px = 1m

    const viewportWidth = 375;
    const viewportHeight = 300;

    // Scale lines of longitude because they get closer together the closer you get to the North Pole
    const mapWidth = (props.eastEdge - props.westEdge) * props.southEdge / 90;
    // ...whereas lines of latitude remain at constant spacing
    const mapHeight = props.northEdge - props.southEdge;

    const actualWidth = mapWidth * scale;
    const actualHeight = mapHeight * scale;

    const [location, setLocation] = useState('');
    const [error, setError] = useState('');
    const [lat, setLat] = useState(51.5628);
    const [lon, setLon] = useState(-0.1445);

    const [backgroundImage] = useImage(`/maps/${props.background}.jpg`);

    function OffscreenArrow({ towardsX, towardsY }: arrowProps) {
        // TODO stick arrow on separate Stage and make it not pan
        // TODO also update arrow on pan and show if you're offscreen, not off map
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

    function lockToBounds(pos: Vector2d): Vector2d {
        let resX = pos.x;
        let resY = pos.y;

        if (pos.x > 0) {
            resX = 0;
        } else if (pos.x < viewportWidth - actualWidth) {
            resX = viewportWidth - actualWidth;
        }
        if (pos.y > 0) {
            resY = 0;
        } else if (pos.y < viewportHeight - actualHeight) {
            resY = viewportHeight - actualHeight;
        }

        return {
            x: resX,
            y: resY
        };
    }

    navigator.geolocation.watchPosition((position) => {
        console.log("Setting to " + JSON.stringify(position));
        setLat(position.coords.latitude);
        setLon(position.coords.longitude);
        setLocation(`Latitude: ${position.coords.latitude}, longitude: ${position.coords.longitude}`);
    }, (err) => {
        console.log(JSON.stringify(err));
        setError(JSON.stringify(err));
    })
    return <div>
        <Stage width={viewportWidth} height={viewportHeight} draggable dragBoundFunc={lockToBounds}>
            <Layer>
                <Rect x={0} y={0} width={actualWidth} height={actualHeight} fill={'grey'}></Rect>
                <Image image={backgroundImage} width={actualWidth} height={actualHeight}></Image>
                <Gridlines eastEdge={props.eastEdge} westEdge={props.westEdge}
                    northEdge={props.northEdge} southEdge={props.southEdge}
                    canvasWidth={actualWidth} canvasHeight={actualHeight}
                    colour='green' />
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
