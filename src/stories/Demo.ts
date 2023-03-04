import { Story } from "./Story";

const demo: Story = {
    title: 'Demo',
    conversations: [{
        lines: [
            {
                prose: 'Welcome to the demo',
                ending: true,
            }
        ]
    },
    {
        trigger: {
            location: {
                lat: 51.56248823286438,
                lon: -0.15565685592091935,
            },
            radius: 200
        },
        lines: [
            {
                prose: 'You\'re by the ponds',
                ending: true,
            }
        ]
    },
    {
        trigger: {
            location: {
                lat: 51.55675193248302,
                lon: -0.15182666147868007,
            },
            radius: 100
        },
        lines: [
            {
                prose: 'You\'re down by the Lido',
                ending: true,
            }        
        ]
    }]
}

export default demo;
