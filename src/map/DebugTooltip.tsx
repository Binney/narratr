import { Circle, Text } from "react-konva";

interface DebugTooltipProps {
    mouseX: number;
    mouseY: number;
    textX: number;
    textY: number;
}

export default function DebugTooltip(props: DebugTooltipProps) {
    return <>
        <Circle x={props.mouseX} y={props.mouseY} fill='yellow' radius={5} stroke='black' strokeWidth={2}></Circle>
        <Text x={props.mouseX + 10} y={props.mouseY - 5} text={`${props.textX.toFixed(5)}, ${props.textY.toFixed(5)}`}></Text>
    </>
}
