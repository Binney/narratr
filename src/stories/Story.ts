export type Chapter = {
    anchor?: string,
    prose: string,
    link?: string,
    choices?: {
        option: string,
        link: string,
    }[],
    ending?: boolean;
}

export type Story = {
    title: string,
    chapters: Chapter[],
}