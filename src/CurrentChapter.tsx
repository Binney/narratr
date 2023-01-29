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
    const { chapter, onSelect, onUpdate } = props;

    const words = chapter.prose.split(' ');
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
            onUpdate();
        }, hasPause ? timeoutBreath : timeoutNormal);
    }, [textProgress, getText, words, onUpdate]);

    function ActiveChoices(chapter: Chapter) {
        if (chapter.ending) {
            return <div className="endmark" />
        }
        if (chapter.choices) {
            return chapter.choices.map((choice, i) =>
                <button key={i} onClick={() => onSelect(choice.link, i)}>{choice.option}</button>
            )
        } else {
            return <button onClick={() => onSelect(chapter.link)}>Next &gt;</button>
        }
    }

    return <div className="current-chapter">
        <div className="current-section">
            <ReactMarkdown>{getText(textProgress)}</ReactMarkdown>
        </div>
        <div className={`choices ${showChoices && 'visible'}`}>
            {ActiveChoices(chapter)}
        </div>
    </div>
}
