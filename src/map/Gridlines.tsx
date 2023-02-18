import { Line } from "react-konva"
import { SpaceProps } from "./geography"

interface GridlinesProps extends SpaceProps {
    canvasWidth: number;
    canvasHeight: number;
}

export default function Gridlines(props: GridlinesProps) {
    // TODO maths for spacing @ 100m regardless of size
    return <>
        {Array.from({ length: 10 }).map((_, i) => <Line stroke='green' strokeWidth={1} points={[0, i * 100, props.canvasWidth, i * 100]}/>)}
        {Array.from({ length: 10 }).map((_, i) => <Line stroke='green' strokeWidth={1} points={[i * 100, 0, i * 100, props.canvasHeight]}/>)}
    </>
}
