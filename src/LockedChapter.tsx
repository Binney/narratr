import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { Chapter } from "./stories/Story"
import "./LockedChapter.css";

export interface HistoryItem {
    chapter: Chapter,
    choice?: number
}

export default function LockedChapter(props: HistoryItem) {
    function LockedChoice(choice: number) {
        if (!props.chapter.choices) {
            return; // nothing
        } else {
            return <p className="locked-choice">{props.chapter.choices[choice].option}</p>
        }
    }

    return <div>
        <ReactMarkdown>{props.chapter.prose}</ReactMarkdown>
        {LockedChoice(props.choice || 0)}
    </div>
}
