import { haversine } from "./map/geography";
import { Story, Conversation } from "./stories/Story";

interface ConversationStarterProps {
    lat?: number;
    lon?: number;
    story: Story;
    startConversation: (i: number) => void;
}

export default function ConversationStarter(props: ConversationStarterProps) {
    function hasOverlap(lat: number | undefined, lon: number | undefined, conversation: Conversation) {
        if (!conversation.trigger || !lat || !lon) return false; // these won't meaningfully ever be 0
        const distance = haversine(lat, lon, conversation.trigger?.location.lat, conversation.trigger.location.lon);
        return distance < conversation.trigger.radius;
    }

    return <div className="container">
        <p>Waiting for another conversation...</p>
        <p>({props.lat}, {props.lon})</p>
        {props.story.conversations.map((conversation, i) =>
            hasOverlap(props.lat, props.lon, conversation) &&
                <button onClick={() => props.startConversation(i)} key={i}>{conversation.lines[0].prose}</button>
        )}
    </div>
}
