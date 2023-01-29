import { useRef, useState } from "react";
import CurrentChapter from "./CurrentChapter";
import LockedChapter, { HistoryItem } from "./LockedChapter";
import { Story } from "./stories/Story";
import "./Player.css";

interface PlayerProps {
    story: Story
}

function findChapterFromAnchor(story: Story, anchor: string): number {
    for (var i = 0; i < story.chapters.length; i++) {
        if (story.chapters[i].anchor === anchor) {
            return i;
        }
    }
    throw new Error(`Couldn't find chapter with anchor ${anchor}`);
}

export default function Player(props: PlayerProps) {
    const [current, setCurrent] = useState(0);
    const [history, setHistory] = useState<HistoryItem[]>([]);

    const containerElement = useRef<HTMLDivElement>(null);

    const handleSelect = (anchor?: string, choice?: number) => {
        history.push({ chapter: props.story.chapters[current], choice });
        setHistory(history);

        const next = anchor ? findChapterFromAnchor(props.story, anchor) : current + 1;
        setCurrent(next);
    };

    const handleUpdate = () => {
        const { current } = containerElement;
        if (!current) return;
        console.log(`${current.scrollTop} vs ${current?.scrollHeight}`);
        current.scrollTop = current.scrollHeight;
    }

    return <div ref={containerElement} className="player">
        {history.map((historyItem, i) => <div key={i}>{LockedChapter(historyItem)}</div>)}
        <CurrentChapter key={current} chapter={props.story.chapters[current]}
            onUpdate={handleUpdate}
            onSelect={handleSelect}></CurrentChapter>
    </div>
}
