import { useCallback, useEffect, useState } from "react";
import { Chapter } from "./stories/Story";

interface ChapterProps {
    chapter: Chapter,
    onSelect: (anchor?: string, next?: number) => void
}

const timeoutNormal = 50;
const timeoutBreath = 300;

export default (props: ChapterProps) => {
    const [textProgress, setTextProgress] = useState(0);
    const [showChoices, setShowChoices] = useState(false);

    const words = props.chapter.prose.split(' ');
    function getText(progress: number) {
        return words.slice(0, progress).join(' ');
    }

    useEffect(() => {
        let hasPause = getText(textProgress).match(/[,.?!]$/);
        setTimeout(() => {
            if (textProgress >= words.length) {
                setShowChoices(true);
            } else {
                setTextProgress(textProgress + 1);
            }
        }, hasPause ? timeoutBreath : timeoutNormal);
    }, [textProgress]);

    function ActiveChoices(chapter: Chapter) {
        if (chapter.choices) {
            return <div>
                {chapter.choices.map((choice, i) => {
                    return <button key={i} onClick={() => props.onSelect(choice.link, i)}>{choice.option}</button>
                })}
            </div>
        } else {
            return <div>
                <button onClick={() => props.onSelect(chapter.link)}>Next &gt;</button>
            </div>
        }

    }

    return <div>
        {getText(textProgress)}
        {showChoices && ActiveChoices(props.chapter)}
    </div>

}
