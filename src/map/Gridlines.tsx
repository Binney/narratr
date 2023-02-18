import { Line } from "react-konva"
import { SpaceProps } from "./geography"

interface GridlinesProps extends SpaceProps {
    canvasWidth: number;
    canvasHeight: number;
    colour?: string;
}

export default function Gridlines(props: GridlinesProps) {
    // Approximate to a flat surface => gridlines are square
    // => use lon for everything
    const mapWidthDegrees = props.eastEdge - props.westEdge;

    const lineSpacingMetres = 100;
    const metresPerDegreeLon = 6371 * 1000 * 2 * Math.PI / 360;
    const pxPerDegreeLon = props.canvasWidth / mapWidthDegrees;
    const pxSpacing = lineSpacingMetres * pxPerDegreeLon / metresPerDegreeLon;

    const numGridlinesV = Math.ceil(props.canvasWidth / pxSpacing) + 1;
    const numGridlinesH = Math.ceil(props.canvasHeight / pxSpacing) + 1;

    // For a e s t h e t i c reasons, offset the whole grid by (pxSpacing / 2, pxSpacing / 3) -
    // looks better than perfectly aligning in the top left
    return <>
        {Array.from({ length: numGridlinesH }).map((_, i) => <Line y={pxSpacing / 2} key={i} stroke={props.colour || 'lightgrey'} strokeWidth={1} points={[0, i * pxSpacing, props.canvasWidth, i * pxSpacing]}/>)}
        {Array.from({ length: numGridlinesV }).map((_, i) => <Line x={pxSpacing / 3} key={i} stroke={props.colour || 'lightgrey'} strokeWidth={1} points={[i * pxSpacing, 0, i * pxSpacing, props.canvasHeight]}/>)}
    </>
}
