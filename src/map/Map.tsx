import { Vector2d } from "konva/lib/types";
import { useState } from "react"
import { Stage, Circle, Layer, Rect, Arrow, Image, Group, Text } from "react-konva";
import useImage from "use-image";
import DebugTooltip from "./DebugTooltip";
import { scale, SpaceProps } from "./geography";
import Gridlines from "./Gridlines";

interface MapProps extends SpaceProps {
    // TODO markers[]
    background: string;
}

interface arrowProps {
    towardsX: number;
    towardsY: number;
}

interface MapMarkerProps {
    lat: number;
    lon: number;
    name: string;
}

export default function Map(props: MapProps) {
    const viewportWidth = window.innerWidth;
    const viewportHeight = 300; // TODO ??

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

    const [mouseX, setMouseX] = useState(0);
    const [mouseY, setMouseY] = useState(0);
    function updateTracker(e: any) {
        // TODO only works because map starts at (0,0) - fix
        setMouseX(e.evt.offsetX);
        setMouseY(e.evt.offsetY);
    }

    function updateTapper(e: any) {
        setMouseX(e.evt?.changedTouches[0]?.clientX);
        setMouseY(e.evt?.changedTouches[0]?.clientY);
        // console.log(e);
    }

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

    function lon2x(pos: number) {
        return normalise(pos, props.westEdge, mapWidth, actualWidth) * props.southEdge / 90;
    }

    function lat2y(pos: number) {
        return actualHeight - normalise(pos, props.southEdge, mapHeight, actualHeight);
    }

    function y2lat(pos: number) { // only 90s kids will remember
        return ((pos * mapWidth) / actualWidth) + props.westEdge;
    }

    function x2lon(pos: number) {
        return (((actualHeight - pos) * mapHeight) / actualHeight) + props.southEdge;
    }

    function MapMarker(props: MapMarkerProps) {
        return <Group x={lon2x(props.lon)} y={lat2y(props.lat)}>
                <Circle radius={5} fill='orange'/>
                <Text text={props.name} x={10} y={-5} />
            </Group>
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
        setLat(position.coords.latitude);
        setLon(position.coords.longitude);
        setLocation(`Longitude: ${position.coords.longitude}, latitude: ${position.coords.latitude}`);
    }, (err) => {
        console.log(JSON.stringify(err));
        setError(JSON.stringify(err));
    })
    return <div>
        {/* TODO this makes gridlines update on every mousemove, fix */}
        <Stage onMouseMove={updateTracker} onTap={updateTapper} width={viewportWidth} height={viewportHeight} draggable dragBoundFunc={lockToBounds}>
            <Layer>
                {/* TODO center on starting point, not (0, 0) */}
                <Rect x={0} y={0} width={actualWidth} height={actualHeight} fill={'grey'}></Rect>
                <Image image={backgroundImage} width={actualWidth} height={actualHeight}></Image>
                <Gridlines eastEdge={props.eastEdge} westEdge={props.westEdge}
                    northEdge={props.northEdge} southEdge={props.southEdge}
                    canvasWidth={actualWidth} canvasHeight={actualHeight}
                    colour='green' />
            </Layer>
            <Layer>
                <OffscreenArrow towardsX={normalise(lon, props.westEdge, mapWidth, actualWidth)}
                    towardsY={actualHeight - normalise(lat, props.southEdge, mapHeight, actualHeight)} />
                <Circle x={lon2x(lon)}
                    y={lat2y(lat)}
                    fill={"red"} stroke={'black'} radius={10} strokeWidth={2}></Circle>
                <DebugTooltip mouseX={mouseX} mouseY={mouseY} textX={y2lat(mouseX)} textY={x2lon(mouseY)} />
                <MapMarker lat={51.5629} lon={-0.146386} name='Holly Grove' />
                <MapMarker lat={51.56340} lon={-0.14411} name='Circus' />
                <MapMarker lat={51.562624} lon={-0.144457} name='Wassail Zone' />
            </Layer>
        </Stage>

        <p>{location}</p>
        <p>👆 Yep, that's your location alright</p>
        <p>{error}</p>
    </div>
}
