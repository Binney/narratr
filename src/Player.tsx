import { useState } from "react"
import { Chapter, Story } from "./stories/Story"

interface PlayerProps {
    story: Story
}

export default (props: PlayerProps) => {
    const [current, setCurrent] = useState(0);

    function findChapterFromAnchor(anchor: string) {
        for (var i = 0; i < props.story.chapters.length; i++) {
            if (props.story.chapters[i].anchor === anchor) {
                return i;
            }
        }
        throw new Error(`Couldn't find chapter with anchor ${anchor}`);
    }

    function Choices(chapter: Chapter) {
        if (chapter.choices) {
            return <div>
                {chapter.choices.map(choice => {
                    return <button onClick={() => setCurrent(findChapterFromAnchor(choice.link))}>{choice.option}</button>
                })}
            </div>
        } else {
            return <div>
                <button onClick={() => setCurrent(current + 1)}>Next &gt;</button>
            </div>
        }
    }

return <div>
        {props.story.chapters[current].prose}
        {Choices(props.story.chapters[current])}
    </div>
}
