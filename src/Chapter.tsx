import { useState } from "react";
import { Chapter } from "./stories/Story";

interface ChapterProps {
    chapter: Chapter,
    onSelect: (next?: number, anchor?: string) => void
}

export default (props: ChapterProps) => {
    function advance() {
        props.onSelect();
    }

    function choose(next: number, link: string) {
        props.onSelect(next, link);
    }

    function ActiveChoices(chapter: Chapter) {
        if (chapter.choices) {
            return <div>
                {chapter.choices.map((choice, i) => {
                    return <button key={i} onClick={() => choose(i, choice.link)}>{choice.option}</button>
                })}
            </div>
        } else {
            return <div>
                <button onClick={() => advance()}>Next &gt;</button>
            </div>
        }

    }

    return <div>
        {props.chapter.prose}
        {ActiveChoices(props.chapter)}
    </div>

}
