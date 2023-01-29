import { Chapter } from "./stories/Story"

export interface HistoryItem {
    chapter: Chapter,
    choice?: number
}

export default function LockedChapter(props: HistoryItem) {
    function LockedChoice(choice: number) {
        if (!props.chapter.choices) {
            return; // nothing
        } else {
            return <div>{props.chapter.choices[choice].option}</div>
        }
    }

    return <div>
        {props.chapter.prose}
        {LockedChoice(props.choice || 0)}
    </div>
}
