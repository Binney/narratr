import { useCallback, useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Chapter } from "./stories/Story";
import './CurrentChapter.css';

interface ChapterProps {
    chapter: Chapter;
    onSelect: (anchor?: string, next?: number) => void;
    onUpdate: () => void;
}

const timeoutNormal = 50;
const timeoutBreath = 300;

export default function CurrentChapter(props: ChapterProps) {
    const [textProgress, setTextProgress] = useState(0);
    const [showChoices, setShowChoices] = useState(false);

    const words = props.chapter.prose.split(' ');
    const getText = useCallback((progress: number) => {
        return words.slice(0, progress).join(' ');
    }, [words]);

    useEffect(() => {
        let hasPause = getText(textProgress).match(/[,.?!]$/);
        setTimeout(() => {
            if (textProgress >= words.length) {
                setShowChoices(true);
            } else {
                setTextProgress(textProgress + 1);
            }
            props.onUpdate();
        }, hasPause ? timeoutBreath : timeoutNormal);
    }, [textProgress, getText, words]);

    function ActiveChoices(chapter: Chapter) {
        if (chapter.choices) {
            return chapter.choices.map((choice, i) =>
                <button key={i} onClick={() => props.onSelect(choice.link, i)}>{choice.option}</button>
            )
        } else {
            return <button onClick={() => props.onSelect(chapter.link)}>Next &gt;</button>
        }
    }

    return <div className="current-chapter">
        <div className="current-section">
            <ReactMarkdown>{getText(textProgress)}</ReactMarkdown>
        </div>
        <div className={`choices ${showChoices && 'visible'}`}>
            {ActiveChoices(props.chapter)}
        </div>
    </div>
}
