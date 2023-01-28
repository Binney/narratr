import { useState } from "react";
import ChapterPlayer from "./Chapter";
import LockedChapter, { HistoryItem } from "./LockedChapter";
import { Story } from "./stories/Story";

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

export default (props: PlayerProps) => {
    const [current, setCurrent] = useState(0);
    const [history, setHistory] = useState<HistoryItem[]>([]);

    const handleSelect = (choice?: number, anchor?: string) => {
        history.push({ chapter: props.story.chapters[current], choice });
        setHistory(history);

        const next = anchor ? findChapterFromAnchor(props.story, anchor) : current + 1;
        setCurrent(next);
    };

    return <div>
        {history.map((historyItem, i) => <div key={i}>{LockedChapter(historyItem)}</div>)}
        <ChapterPlayer chapter={props.story.chapters[current]} onSelect={handleSelect}></ChapterPlayer>
    </div>
}
