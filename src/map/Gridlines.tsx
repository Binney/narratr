import { Line } from "react-konva"
import { metresPerDegreeLon, SpaceProps } from "./geography"

interface GridlinesProps extends SpaceProps {
    canvasWidth: number;
    canvasHeight: number;
    colour?: string;
}

export default function Gridlines(props: GridlinesProps) {
    const lineSpacingMetres = 100;

    // Approximate to a flat surface => gridlines are square
    // => use lon for everything
    const mapWidthDegrees = props.eastEdge - props.westEdge;
    const pxPerDegreeLon = props.canvasWidth / mapWidthDegrees;
    const pxSpacingLon = lineSpacingMetres * pxPerDegreeLon / metresPerDegreeLon;

    const mapHeightDegrees = props.northEdge - props.southEdge;
    const pxPerDegreeLat = (props.southEdge / 90) * props.canvasHeight / mapHeightDegrees;
    const pxSpacingLat = lineSpacingMetres * pxPerDegreeLat / metresPerDegreeLon;

    const numGridlinesV = Math.ceil(props.canvasWidth / pxSpacingLon);
    const numGridlinesH = Math.ceil(props.canvasHeight / pxSpacingLon);

    // For a e s t h e t i c reasons, offset the whole grid by (pxSpacing / 2, pxSpacing / 3) -
    // looks better than perfectly aligning in the top left
    return <>
        {Array.from({ length: numGridlinesH }).map((_, i) => <Line y={pxSpacingLat / 2} key={i} stroke={props.colour || 'lightgrey'} strokeWidth={1} points={[0, i * pxSpacingLat, props.canvasWidth, i * pxSpacingLat]}/>)}
        {Array.from({ length: numGridlinesV }).map((_, i) => <Line x={pxSpacingLon / 3} key={i} stroke={props.colour || 'lightgrey'} strokeWidth={1} points={[i * pxSpacingLon, 0, i * pxSpacingLon, props.canvasHeight]}/>)}
    </>
}
