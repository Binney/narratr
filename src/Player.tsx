import { useRef, useState } from "react";
import CurrentChapter from "./CurrentChapter";
import LockedChapter, { HistoryItem } from "./LockedChapter";
import { Story } from "./stories/Story";
import "./Player.css";

interface PlayerProps {
    story: Story
}

export default function Player(props: PlayerProps) {
    const [line, setLine] = useState(0);
    const [chapter, setChapter] = useState(0);
    const [history, setHistory] = useState<HistoryItem[]>([]);

    const containerElement = useRef<HTMLDivElement>(null);

    function findChapterFromAnchor(story: Story, anchor: string): number {
        for (var i = 0; i < story.chapters.length; i++) {
            if (story.chapters[chapter].lines[i].anchor === anchor) {
                return i;
            }
        }
        throw new Error(`Couldn't find chapter with anchor ${anchor}`);
    }

    function handleSelect(anchor?: string, choice?: number) {
        history.push({ line: props.story.chapters[chapter].lines[line], choice });
        setHistory(history);

        const next = anchor ? findChapterFromAnchor(props.story, anchor) : line + 1;
        setLine(next);
    };

    function handleUpdate() {
        const { current } = containerElement;
        if (!current) return;
        console.log(`${current.scrollTop} vs ${current?.scrollHeight}`);
        current.scrollTop = current.scrollHeight;
    };

    function handleComplete() {
        console.log('Well, it was a boring conversation anyway');
    };

    return <div ref={containerElement} className="player">
        {history.map((historyItem, i) => <div key={i}>{LockedChapter(historyItem)}</div>)}
        <CurrentChapter key={line} line={props.story.chapters[chapter].lines[line]}
            onUpdate={handleUpdate}
            onSelect={handleSelect}
            onComplete={handleComplete}></CurrentChapter>
        { /* TODO section to set conversation */}
    </div>
}
