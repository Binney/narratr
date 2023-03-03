import { useCallback, useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import './CurrentLine.css';
import { Line } from "./stories/Story";

interface LineProps {
    line: Line;
    onSelect: (anchor?: string, next?: number) => void;
    onUpdate: () => void;
    onComplete: () => void;
}

const timeoutNormal = 50;
const timeoutBreath = 300;

export default function CurrentLine(props: LineProps) {
    const [textProgress, setTextProgress] = useState(0);
    const [showChoices, setShowChoices] = useState(false);
    const { line, onSelect, onUpdate, onComplete } = props;

    const words = line.prose.split(' ');
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

    function ActiveChoices(line: Line) {
        if (line.ending) {
            return <button onClick={() => onComplete()}>o</button>
        }
        if (line.choices) {
            return line.choices.map((choice, i) =>
                <button key={i} onClick={() => onSelect(choice.link, i)}>{choice.option}</button>
            )
        } else {
            return <button onClick={() => onSelect(line.link)}>Next &gt;</button>
        }
    }

    return <div className="current-line container">
        <div className="current-section">
            <ReactMarkdown>{getText(textProgress)}</ReactMarkdown>
        </div>
        <div className={`choices ${showChoices && 'visible'}`}>
            {ActiveChoices(line)}
        </div>
    </div>
}
