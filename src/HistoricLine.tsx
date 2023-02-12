import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { Line } from "./stories/Story"
import "./HistoricLine.css";

export interface HistoryItem {
    line: Line,
    choice?: number
}

export default function HistoricLine(props: HistoryItem) {
    function LockedChoice(choice: number) {
        if (!props.line.choices) {
            return; // nothing
        } else {
            return <p className="locked-choice">{props.line.choices[choice].option}</p>
        }
    }

    return <div>
        <ReactMarkdown>{props.line.prose}</ReactMarkdown>
        {LockedChoice(props.choice || 0)}
    </div>
}
