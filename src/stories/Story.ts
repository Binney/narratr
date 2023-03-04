export type Line = {
    anchor?: string;
    prose: string;
    link?: string;
    choices?: {
        option: string;
        link: string;
    }[];
    ending?: boolean;
}

export type Conversation = {
    trigger?: {
        location: {
            lat: number;
            lon: number;
        };
        radius: number;
    };
    lines: Line[];
}

export type Story = {
    title: string;
    conversations: Conversation[];
}
