import { useRef, useState } from "react";
import CurrentLine from "./CurrentLine";
import HistoricLine, { HistoryItem } from "./HistoricLine";
import { Story } from "./stories/Story";
import "./Player.css";
import ConversationStarter from "./ConversationStarter";
import { useNavigate } from "react-router-dom";
import Geolocator from "./map/Geolocator";
import { defaultLocation } from "./map/geography";

interface PlayerProps {
    story: Story
}

export default function Player(props: PlayerProps) {
    const [line, setLine] = useState(0);
    const [conversation, setConversation] = useState(0);
    const [history, setHistory] = useState<HistoryItem[]>([]);
    const [lat, setLat] = useState(defaultLocation.lat);
    const [lon, setLon] = useState(defaultLocation.lon);
    const navigate = useNavigate();

    const containerElement = useRef<HTMLDivElement>(null);

    function findLineFromAnchor(story: Story, anchor: string): number {
        for (var i = 0; i < story.conversations[conversation].lines.length; i++) {
            if (story.conversations[conversation].lines[i].anchor === anchor) {
                return i;
            }
        }
        throw new Error(`Couldn't find line with anchor ${anchor}`);
    }

    function handleSelect(anchor?: string, choice?: number) {
        history.push({ line: props.story.conversations[conversation].lines[line], choice });
        setHistory(history);

        if (anchor && anchor.startsWith("/")) {
            navigate(anchor);
            return;
        }

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
        handleSelect();
        setConversation(-1);
    };

    function startConversation(i: number) {
        setLine(0);
        setConversation(i);
    }

    function handleLocationUpdate(coords: GeolocationCoordinates) {
        setLat(coords.latitude);
        setLon(coords.longitude);
    }

    return <div ref={containerElement} className="player">
        <Geolocator onUpdate={handleLocationUpdate} />
        {history.map((historyItem, i) => <HistoricLine key={i} line={historyItem.line} choice={historyItem.choice}/>)}
        {conversation >= 0 &&
        <CurrentLine key={line} line={props.story.conversations[conversation].lines[line]}
            onUpdate={handleUpdate}
            onSelect={handleSelect}
            onComplete={handleComplete}></CurrentLine>
        }
        {conversation === -1 &&
            <ConversationStarter lat={lat} lon={lon} story={props.story} startConversation={startConversation}/>
        }
    </div>
}
