export type Line = {
    anchor?: string,
    prose: string,
    link?: string,
    choices?: {
        option: string,
        link: string,
    }[],
    ending?: boolean;
}

export type Conversation = {
    lines: Line[],
}

export type Story = {
    title: string,
    conversations: Conversation[],
}
