import { Story } from "./Story";

const preview: Story = {
    title: "Demo story",
    conversations: [{
        lines: [{
            anchor: "beginning",
            prose: "Well, hi.",
        },
        {
            prose: "I didn't think anyone would be here this early, but hey, treat this as a sneak preview, ok?",
        },
        {
            prose: "Do you want me to explain what's going on, or what?",
            choices: [
                {
                    option: "Yes please.",
                    link: "tutorial"
                },
                {
                    option: "Nah, skip tutorial.",
                    link: "skip_tutorial"
                }
            ]
        },
        {
            anchor: "tutorial",
            prose: "Well, my name is Narratr. I'll be your guide through the story.",
        },
        {
            prose: "We're going to go on a journey together, us two. I'll talk you through what's happening and make sure you have all the clues you need. What you do with those, though? That's up to you."
        },
        {
            prose: "We don't have no graphics budget for this video game, though. Instead, I've gotta introduce you to a little thing we in the industry call the _real world_."
        },
        {
            prose: "The action takes place on the streets of London, and you'll need to follow the trail the story has set out for you."
        },
        {
            prose: "Plus, to progress certain points in the story, you'll need answers that can only be found in that particular place. So I'll know if you're just guessing from your sofa."
        },
        {
            prose: "At other moments, you'll need to be in a particular place or area, so I'll be asking for permission to read your device location. But if you don't want to give me that, or your device doesn't support it, you can just drop a pin on the map roughly in the right place and I suppose I'll have to trust you."
        },
        {
            prose: "That's about it. You trust me, don't you? I'm sure you'll have solved it all in no time.",
            link: "tutorial_done"
        },
        {
            anchor: "skip_tutorial",
            prose: "OK, smartarse, we'll just jump straight in, then."
        },
        {
            anchor: "tutorial_done",
            prose: "Ready?"
        },
        {
            prose: "Then we'll begin.",
            choices: [
                {
                    option: ">",
                    link: "/comingsoon"
                }
            ]
        }
    ]}]
};

export default preview;
