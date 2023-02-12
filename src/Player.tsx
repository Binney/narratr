import { useRef, useState } from "react";
import CurrentLine from "./CurrentLine";
import HistoricLine, { HistoryItem } from "./HistoricLine";
import { Story } from "./stories/Story";
import "./Player.css";
import ConversationStarter from "./ConversationStarter";

interface PlayerProps {
    story: Story
}

export default function Player(props: PlayerProps) {
    const [line, setLine] = useState(0);
    const [conversation, setConversation] = useState(0);
    const [history, setHistory] = useState<HistoryItem[]>([]);

    const containerElement = useRef<HTMLDivElement>(null);

    function findLineFromAnchor(story: Story, anchor: string): number {
        for (var i = 0; i < story.conversations.length; i++) {
            if (story.conversations[conversation].lines[i].anchor === anchor) {
                return i;
            }
        }
        throw new Error(`Couldn't find line with anchor ${anchor}`);
    }

    function handleSelect(anchor?: string, choice?: number) {
        history.push({ line: props.story.conversations[conversation].lines[line], choice });
        setHistory(history);

        const next = anchor ? findLineFromAnchor(props.story, anchor) : line + 1;
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
        handleSelect();
        setConversation(-1);
    };

    return <div ref={containerElement} className="player">
        {history.map((historyItem, i) => <div key={i}>{HistoricLine(historyItem)}</div>)}
        {conversation >= 0 &&
        <CurrentLine key={line} line={props.story.conversations[conversation].lines[line]}
            onUpdate={handleUpdate}
            onSelect={handleSelect}
            onComplete={handleComplete}></CurrentLine>
        }
        {conversation === -1 &&
            <ConversationStarter />
        }
    </div>
}
